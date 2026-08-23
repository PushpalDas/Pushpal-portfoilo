"""Orchestration: detect source changes, refresh source dashboards and the master.

Change detection is two-layered to avoid races with Excel Online autosave:
- an eTag change is only a hint that a file was touched;
- the Patents data is then downloaded and content-hashed — a refresh runs only
  when the data actually differs from what was last processed.
After every refresh a verification pass re-downloads the files; if anything was
edited mid-refresh (autosave landing between our download and write), the
refresh repeats with the fresh data, so no edit can be silently absorbed.
"""
import hashlib
import json
import logging
import threading
from datetime import date, datetime, timezone

from . import config
from .dashboard import plan_dashboard_updates
from .dedupe import combine_stats, compute_stats, dedupe, parse_patents
from .graph import GraphClient
from .master import MASTER_SHEET, plan_master_patents_update

log = logging.getLogger("patent-sync")

_lock = threading.Lock()

client = GraphClient(config.AZURE_TENANT_ID, config.AZURE_CLIENT_ID, config.AZURE_CLIENT_SECRET)

MAX_REFRESH_ROUNDS = 3


def _load_state() -> dict:
    try:
        return json.loads(config.STATE_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def _save_state(state: dict) -> None:
    config.STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")


def _norm_cell(v) -> str:
    if v is None:
        return ""
    if isinstance(v, datetime):
        return v.date().isoformat()
    if isinstance(v, date):
        return v.isoformat()
    if isinstance(v, float) and v.is_integer():
        return str(int(v))  # Excel round-trips 0.0 as 0
    return str(v).strip()


def _hash_rows(rows: list[dict]) -> str:
    payload = json.dumps([[_norm_cell(v) for v in r.values()] for r in rows], ensure_ascii=False)
    return hashlib.sha256(payload.encode()).hexdigest()


def preview() -> dict:
    """Compute all stats without writing anything (dry run)."""
    per_source = {}
    stats_list = []
    for src in config.SOURCES:
        item = client.resolve_item(src["share_url"])
        data = client.download(item["drive_id"], item["item_id"])
        _, rows = parse_patents(data)
        stats = compute_stats(dedupe(rows))
        per_source[src["key"]] = {
            "file": item["name"],
            "raw_rows": len(rows),
            **stats.as_dict(),
        }
        stats_list.append(stats)
    master = combine_stats(stats_list)
    return {"sources": per_source, "master": master.as_dict()}


def _apply_updates(item: dict, sheet: str, updates: list[tuple[str, list[list]]]) -> None:
    session = client.create_session(item["drive_id"], item["item_id"])
    try:
        for address, values in updates:
            client.patch_range(item["drive_id"], item["item_id"], sheet, address, values, session)
    finally:
        client.close_session(item["drive_id"], item["item_id"], session)


def _download_source(src: dict, items: dict) -> tuple[bytes, list[dict]]:
    item = items[src["key"]]
    data = client.download(item["drive_id"], item["item_id"])
    _, rows = parse_patents(data)
    return data, rows


def run_sync(force: bool = False) -> dict:
    """Refresh dashboards + master when source data changed; rebuild the master
    whenever it was touched by anyone else (self-healing)."""
    with _lock:
        state = _load_state()
        etags = dict(state.get("etags", {}))
        hashes = dict(state.get("hashes", {}))
        now = datetime.now(timezone.utc).isoformat()

        items = {src["key"]: client.resolve_item(src["share_url"]) for src in config.SOURCES}
        master_item = client.resolve_item(config.MASTER["share_url"])

        downloads: dict[str, bytes] = {}
        parsed: dict[str, list[dict]] = {}
        changed: list[str] = []
        for src in config.SOURCES:
            k = src["key"]
            if force or etags.get(k) != items[k]["etag"]:
                downloads[k], parsed[k] = _download_source(src, items)
                if force or hashes.get(k) != _hash_rows(parsed[k]):
                    changed.append(k)
                else:
                    # file was touched (opened/saved) but the data is identical
                    etags[k] = items[k]["etag"]

        master_drift = force or etags.get("master") != master_item["etag"]

        if not changed and not master_drift:
            state.update({"etags": etags, "last_check": now})
            _save_state(state)
            return {"refreshed": False, "reason": "data unchanged", "changed": []}

        log.info("refreshing (changed=%s master_drift=%s force=%s)", changed, master_drift, force)

        # make sure every source is downloaded (needed to rebuild the master)
        for src in config.SOURCES:
            if src["key"] not in parsed:
                downloads[src["key"]], parsed[src["key"]] = _download_source(src, items)

        update_dashboards = set(changed) if not force else {s["key"] for s in config.SOURCES}
        source_stats: dict = {}
        master_written_rows: list[list] = []

        for round_no in range(MAX_REFRESH_ROUNDS):
            source_stats = {k: compute_stats(dedupe(rows)) for k, rows in parsed.items()}
            source_rows = [(src["label"], parsed[src["key"]]) for src in config.SOURCES]

            # 1. update dashboards of sources whose data changed
            for src in config.SOURCES:
                k = src["key"]
                if k in update_dashboards:
                    src_unlicensed = config.UNLICENSED_GRANTED if k == config.UNLICENSED_SOURCE else 0
                    updates = plan_dashboard_updates(downloads[k], source_stats[k], unlicensed_granted=src_unlicensed)
                    _apply_updates(items[k], "Dashboard", updates)
                    log.info("updated dashboard: %s (%d ranges)", items[k]["name"], len(updates))

            # 2. rebuild the master (Patents + Dashboard) from the sources
            master_bytes = client.download(master_item["drive_id"], master_item["item_id"])
            patents_updates = plan_master_patents_update(master_bytes, source_rows)
            master_written_rows = patents_updates[0][1]
            _apply_updates(master_item, MASTER_SHEET, patents_updates)
            per_source = [(src["label"], source_stats[src["key"]]) for src in config.SOURCES]
            master_stats = combine_stats([source_stats[s["key"]] for s in config.SOURCES])
            per_source_unlicensed = {
                src["label"]: config.UNLICENSED_GRANTED
                for src in config.SOURCES
                if src["key"] == config.UNLICENSED_SOURCE
            }
            dash_updates = plan_dashboard_updates(
                master_bytes,
                master_stats,
                per_source=per_source,
                unlicensed_granted=config.UNLICENSED_GRANTED,
                per_source_unlicensed=per_source_unlicensed,
            )
            _apply_updates(master_item, "Dashboard", dash_updates)
            log.info("updated master: %s", master_item["name"])

            # 3. capture etags, then verify nothing was edited while we worked
            for src in config.SOURCES:
                items[src["key"]] = client.resolve_item(src["share_url"])
            master_item = client.resolve_item(config.MASTER["share_url"])

            stable = True
            for src in config.SOURCES:
                k = src["key"]
                data, rows = _download_source(src, items)
                if _hash_rows(rows) != _hash_rows(parsed[k]):
                    log.info("source %s changed during refresh; reprocessing", k)
                    stable = False
                downloads[k], parsed[k] = data, rows

            mdata = client.download(master_item["drive_id"], master_item["item_id"])
            _, mrows = parse_patents(mdata, MASTER_SHEET)
            written = [[_norm_cell(v) for v in row] for row in master_written_rows]
            while written and not any(c for c in written[-1]):
                written.pop()
            actual = [[_norm_cell(v) for v in r.values()] for r in mrows]
            if actual != written:
                log.info("master changed during refresh; rewriting")
                stable = False

            if stable:
                break
            update_dashboards = {s["key"] for s in config.SOURCES}
        else:
            log.warning("refresh did not stabilize after %d rounds", MAX_REFRESH_ROUNDS)

        # 4. persist state: etags + content hashes of what is now in the files
        new_etags = {src["key"]: items[src["key"]]["etag"] for src in config.SOURCES}
        new_etags["master"] = master_item["etag"]
        new_hashes = {k: _hash_rows(rows) for k, rows in parsed.items()}

        master_stats = combine_stats([source_stats[s["key"]] for s in config.SOURCES])
        state.update(
            {
                "etags": new_etags,
                "hashes": new_hashes,
                "last_check": now,
                "last_refresh": now,
                "last_changed_sources": changed or (["master-drift"] if master_drift and not force else ["forced"]),
                "last_stats": {
                    "sources": {k: v.as_dict() for k, v in source_stats.items()},
                    "master": master_stats.as_dict(),
                },
            }
        )
        _save_state(state)
        return {
            "refreshed": True,
            "changed": changed,
            "master_drift": master_drift,
            "stats": state["last_stats"],
        }


def get_state() -> dict:
    return _load_state()

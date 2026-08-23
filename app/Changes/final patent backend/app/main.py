"""FastAPI app: patent dashboard sync service."""
import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from . import config, sync
from .graph import GraphNetworkError

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
log = logging.getLogger("patent-api")


async def _poller():
    # first check runs immediately on startup, then every POLL_INTERVAL_SECONDS
    while True:
        try:
            result = await asyncio.to_thread(sync.run_sync, False)
            if result.get("refreshed"):
                log.info(
                    "poll refresh: changed=%s master_drift=%s",
                    result["changed"],
                    result.get("master_drift"),
                )
        except GraphNetworkError as e:
            # no internet / Microsoft unreachable — normal transient condition,
            # the next poll picks up anything that changed in the meantime
            log.warning("network unreachable, retrying in %ss: %s", config.POLL_INTERVAL_SECONDS, e)
        except Exception:
            log.exception("background sync failed")
        await asyncio.sleep(config.POLL_INTERVAL_SECONDS)


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = None
    if config.POLL_INTERVAL_SECONDS > 0:
        task = asyncio.create_task(_poller())
        log.info("background poller started (every %ss)", config.POLL_INTERVAL_SECONDS)
    yield
    if task:
        task.cancel()


app = FastAPI(
    title="Ixana Patent Dashboard Sync",
    description=(
        "Keeps the dashboards of the three source patent workbooks up to date "
        "(deduplicated counting: repeated/continuation rows count as one patent, "
        "latest row's status wins) and mirrors everything into the consolidated "
        "master workbook when a source changes."
    ),
    lifespan=lifespan,
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/status")
def status():
    """Last sync state: etags, timestamps, and the stats written on the last refresh."""
    return sync.get_state()


@app.get("/stats")
def stats():
    """Dry run: compute deduplicated stats for all files without writing anything."""
    try:
        return sync.preview()
    except Exception as e:  # surfaced as 502 because it's an upstream Graph problem
        raise HTTPException(status_code=502, detail=str(e))


@app.post("/sync")
def sync_if_changed():
    """Refresh dashboards + master only if one of the three sources changed."""
    try:
        return sync.run_sync(force=False)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@app.post("/refresh")
def refresh():
    """Force a full refresh of all dashboards and the master workbook."""
    try:
        return sync.run_sync(force=True)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

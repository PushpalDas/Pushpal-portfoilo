#!/usr/bin/env python3
"""Regenerate PORTFOLIO-ANALYSIS.md — the single-file, maximum-depth export
built for handing to a model for analysis.

Scope: the products only — Silicon & systems, AI programs & platforms, and the
Prototypes & research inside them. The 17 earlier engineering builds that file
under "Others" on /work are deliberately excluded.

Against PRODUCTS-FULL.md this adds four things that export drops:

    * the `fast` skim layer, with its A/B/C evidence class on every fact
    * the earlier long-form record from data/case-studies.json, where one exists
    * a demo dossier per product: the rewrite, the design note from
      AUDIT/DESIGN-NOTES.md, and the text extracted from the demo file itself
    * the full card record — tier, image, colour, every link

Sources:
    app/work/constants.ts        cards
    data/case-studies-v2.json    the authored bodies
    data/case-studies.json       the earlier records
    AUDIT/DESIGN-NOTES.md        per-demo design identity
    AUDIT/CLAIMS-AUDIT.md        the evidence-class scheme
    next.config.ts               demo rewrites
    public/demo/*.html           the demos themselves

Run from the repo root:  python scripts/export-analysis.py
"""

import html
import io
import json
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------- constants.ts
TS = (ROOT / "app/work/constants.ts").read_text(encoding="utf-8")
body = TS[TS.index("export const workItems"):]

# Biome's `quoteStyle: single` still emits a double-quoted string wherever that
# avoids escaping an apostrophe, so both styles appear in the data file and both
# have to parse. Matching only one silently reads a field as missing.
STR = r"(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")"


def unesc(s):
    return s.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\").strip()


entries = []
depth = 0
start = None
for i, ch in enumerate(body):
    if ch == "{":
        if depth == 0:
            start = i
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth == 0 and start is not None:
            entries.append(body[start : i + 1])
            start = None


def field(block, name):
    m = re.search(name + r"\s*:\s*" + STR, block, re.S)
    if not m:
        return None
    return unesc(m.group(1) if m.group(1) is not None else m.group(2))


def num_field(block, name):
    m = re.search(name + r"\s*:\s*(\d+)", block)
    return int(m.group(1)) if m else None


items = []
for e in entries:
    t = field(e, "title")
    if not t:
        continue
    items.append(
        {
            "title": t,
            "company": field(e, "company"),
            "year": field(e, "year"),
            "domain": field(e, "domain"),
            "category": field(e, "category"),
            "track": field(e, "track"),
            "status": None if re.search(r"status\s*:\s*null", e) else field(e, "status"),
            "outcome": field(e, "outcome"),
            "slug": field(e, "slug"),
            "href": field(e, "href"),
            "demoUrl": field(e, "demoUrl"),
            "image": field(e, "image"),
            "color": field(e, "color"),
            "tier": num_field(e, "tier"),
            "programHead": bool(re.search(r"programHead\s*:\s*true", e)),
        }
    )

products = [i for i in items if i["category"] == "product" and not i["programHead"]]
program = next((i for i in items if i["programHead"]), None)
excluded = [i for i in items if i["category"] != "product"]

# ------------------------------------------------------------------- the data
CS = json.loads((ROOT / "data/case-studies-v2.json").read_text(encoding="utf-8"))
LEGACY = json.loads((ROOT / "data/case-studies.json").read_text(encoding="utf-8"))

# ------------------------------------------------------------- demo rewrites
NEXT_CFG = (ROOT / "next.config.ts").read_text(encoding="utf-8")
REWRITES = dict(
    re.findall(
        r"source:\s*'(/demo/[^']+)',\s*\n\s*destination:\s*'(/demo/[^']+\.html)'",
        NEXT_CFG,
    )
)

# ------------------------------------------------------- design notes by index
NOTES = {}
dn_path = ROOT / "AUDIT/DESIGN-NOTES.md"
if dn_path.exists():
    dn = dn_path.read_text(encoding="utf-8")
    for m in re.finditer(r"(?m)^## P(\d+)\s*—\s*(.+?)$", dn):
        n = int(m.group(1))
        nxt = dn.find("\n## ", m.end())
        NOTES[n] = {
            "label": m.group(2).strip(),
            "text": dn[m.end() : (nxt if nxt > 0 else len(dn))].strip(),
        }

# ------------------------------------------------------------ demo extraction
TAG = re.compile(r"<[^>]+>")
JS_NOISE = re.compile(r"\$\{|'\s*\+|\+\s*'|\bfunction\b|=>")


def demo_dossier(url):
    """Everything readable about one demo file, without dumping its markup."""
    dest = REWRITES.get(url)
    if not dest:
        return None
    f = ROOT / "public" / dest.lstrip("/")
    if not f.exists():
        return {"url": url, "dest": dest, "missing": True}
    raw = f.read_text(encoding="utf-8", errors="replace")
    stripped = re.sub(r"(?is)<script.*?</script>|<style.*?</style>", " ", raw)

    title = ""
    tm = re.search(r"(?is)<title>(.*?)</title>", raw)
    if tm:
        title = html.unescape(TAG.sub("", tm.group(1))).strip()

    heads = []
    for hm in re.finditer(r"(?is)<h([1-6])[^>]*>(.*?)</h\1>", stripped):
        txt = html.unescape(TAG.sub(" ", hm.group(2)))
        txt = re.sub(r"\s+", " ", txt).strip()
        if txt and not JS_NOISE.search(txt) and txt not in heads:
            heads.append(f"h{hm.group(1)}  {txt}")

    text = html.unescape(TAG.sub(" ", stripped))
    text = re.sub(r"\s+", " ", text).strip()

    return {
        "url": url,
        "dest": dest,
        "kb": round(f.stat().st_size / 1024, 1),
        "title": title,
        "headings": heads,
        "text": text,
        "interactive": bool(re.search(r"(?is)<script", raw)),
    }


# ------------------------------------------------------------------ renderers
def esc_cell(v):
    return str(v).replace("|", "\\|").replace("\n", " ")


def md_table(head, rows):
    out = ["| " + " | ".join(esc_cell(h) for h in head) + " |"]
    out.append("|" + "---|" * len(head))
    for r in rows:
        out.append("| " + " | ".join(esc_cell(c) for c in r) + " |")
    return "\n".join(out)


def dict_rows_table(rows, drop=("color", "dim", "own")):
    keys = []
    for r in rows:
        for k in r:
            if k not in keys and k not in drop:
                keys.append(k)
    return md_table(keys, [[r.get(k, "") for k in keys] for r in rows])


def render_chart(c):
    """Any chart -> a readable markdown table (plus threshold/ceiling notes)."""
    lines = []
    form = c.get("form", "")
    if isinstance(c.get("rows"), list) and c["rows"] and isinstance(c["rows"][0], dict):
        lines.append(dict_rows_table(c["rows"]))
    elif isinstance(c.get("stages"), list):
        lines.append(dict_rows_table(c["stages"]))
    elif isinstance(c.get("series"), list) and c["series"] and isinstance(c["series"][0], dict):
        xl = c.get("xLabels") or c.get("columns")
        if xl and all(isinstance(s.get("points"), list) for s in c["series"]):
            head = ["series"] + [str(x) for x in xl]
            rows = [[s.get("name", s.get("label", ""))] + list(s.get("points", [])) for s in c["series"]]
            lines.append(md_table(head, rows))
        else:
            lines.append(dict_rows_table(c["series"]))
    elif isinstance(c.get("bars"), list):
        lines.append(dict_rows_table(c["bars"]))
    elif isinstance(c.get("groups"), list):
        lines.append(dict_rows_table(c["groups"]))
    elif isinstance(c.get("bins"), list):
        lines.append(dict_rows_table(c["bins"]) if isinstance(c["bins"][0], dict)
                     else md_table(["bin"], [[b] for b in c["bins"]]))
    elif isinstance(c.get("points"), list) and c.get("xLabels"):
        lines.append(md_table(c["xLabels"], [c["points"]]))
    elif isinstance(c.get("points"), list):
        pts = c["points"]
        if pts and isinstance(pts[0], dict):
            lines.append(dict_rows_table(pts))
        else:
            lines.append(md_table(["points"], [[", ".join(map(str, pts))]]))
    elif form == "confusion":
        cls = c.get("classes", [])
        head = ["truth \\ model"] + list(cls)
        rows = [[cls[i]] + list(r) for i, r in enumerate(c.get("cells", []))]
        lines.append(md_table(head, rows))
    elif form in ("heatmap", "statusGrid"):
        head = [""] + [str(x) for x in c.get("cols", [])]
        rows = [[str(c.get("rows", [])[i])] + list(r) for i, r in enumerate(c.get("cells", []))]
        lines.append(md_table(head, rows))
    elif form == "waffle":
        lines.append(f"_{c.get('value')} of {c.get('total')} — {c.get('filledLabel','')}; the rest {c.get('emptyLabel','')}_")
    elif form == "marimekko":
        lines.append(dict_rows_table(c.get("columns", [])))
    elif form == "sequence":
        lines.append(dict_rows_table(c.get("events", [])))
    elif form == "radar":
        head = ["axis"] + [s.get("name", "") for s in c.get("series", [])]
        rows = [[a] + [s.get("values", [""] * len(c.get("axes", [])))[i] for s in c.get("series", [])]
                for i, a in enumerate(c.get("axes", []))]
        lines.append(md_table(head, rows))
    for key, label in (("threshold", "Threshold"), ("ceiling", "Ceiling"),
                       ("target", "Target"), ("cutoff", "Cutoff"), ("baseline", "Baseline")):
        v = c.get(key)
        if isinstance(v, dict):
            lines.append(f"_{label}: {v.get('value')} — {v.get('label','')}_")
        elif v not in (None, ""):
            lines.append(f"_{label}: {v}_")
    return "\n\n".join(lines)


def render_block(b):
    k = b.get("kind")
    out = []
    if k == "figure":
        c = b.get("chart", {})
        if c.get("title"):
            out.append(f"**Figure — {c['title']}**  `form: {c.get('form','?')}`")
        t = render_chart(c)
        if t:
            out.append(t)
        if b.get("caption"):
            out.append(f"_{b['caption']}_")
    elif k == "table":
        out.append(md_table(b.get("head", []), b.get("rows", [])))
    elif k == "decisions":
        out.append(f"**{b.get('label','Key decisions')}**")
        out.append("\n".join(f"- **{i.get('lead','')}** {i.get('text','')}" for i in b.get("items", [])))
    elif k == "scope":
        out.append("**Scope**")
        parts = []
        for name, key in (("Shipped", "shipped"), ("Deferred", "deferred"), ("Cut", "cut")):
            if b.get(key):
                parts.append(f"- _{name}:_ " + " · ".join(b[key]))
        out.append("\n".join(parts))
    elif k == "para":
        out.append(b.get("text", ""))
    elif k == "doc":
        head = b.get("lead", "")
        if b.get("bar"):
            head = f"{head} — {b['bar']}" if head else b["bar"]
        out.append(f"**{head}**")
        out.append("\n".join(f"- **{i.get('lead','')}** {i.get('text','')}" for i in b.get("items", [])))
        if b.get("note"):
            out.append(f"_{b['note']}_")
    elif k == "shot":
        if b.get("alt"):
            out.append(f"**Interface — {b['alt']}**")
        if b.get("href"):
            out.append(f"[{b.get('hrefLabel') or 'Open this state in the demo'}]({b['href']})")
        if b.get("callouts"):
            out.append("\n".join(f"- **{i.get('lead','')}** {i.get('text','')}" for i in b["callouts"]))
        if b.get("note"):
            out.append(f"_{b['note']}_")
    elif k == "gallery":
        out.append("**Gallery**")
        rows = []
        for i in b.get("items", []):
            label = i.get("label") or "Untitled"
            link = f" — [{i.get('hrefLabel') or 'Open'}]({i['href']})" if i.get("href") else ""
            cap = f"  {i.get('caption','')}" if i.get("caption") else ""
            rows.append(f"- **{label}**{link}{cap}")
        out.append("\n".join(rows))
        if b.get("note"):
            out.append(f"_{b['note']}_")
    elif k == "metrics":
        out.append("**Metrics**")
        rows = []
        for i in b.get("items", []):
            v = str(i.get("value", ""))
            if i.get("sub"):
                v += f" ({i['sub']})"
            rows.append([v, i.get("label", "")])
        out.append(md_table(["Value", "Measure"], rows))
    elif k == "definition":
        out.append(f"**{b.get('lead','')}** {b.get('text','')}")
    elif k == "config":
        out.append(f"`{b.get('text','')}`")
    else:
        out.append(f"_[{k}]_ " + json.dumps({x: y for x, y in b.items() if x != 'kind'},
                                            ensure_ascii=False)[:600])
    return "\n\n".join(x for x in out if x)


CLASS_NAMES = {
    "A": "A — public & verifiable",
    "B": "B — real but protected",
    "C": "C — reconstructed / invented placeholder",
}


def render_fast(cs):
    """The skim layer. Each fact carries the evidence class that says how far
    the claim can be checked — the single most useful thing for a critic."""
    fast = cs.get("fast")
    if not fast:
        return []
    out = ["**Skim layer — the pull, and the three facts under it**\n"]
    if fast.get("pull"):
        out.append(f"> {fast['pull']}\n")
    rows = [[f.get("cls", "?"), CLASS_NAMES.get(f.get("cls", ""), ""), f.get("text", "")]
            for f in fast.get("facts", [])]
    if rows:
        out.append(md_table(["Class", "Meaning", "Fact"], rows))
        out.append("")
    return out


def render_legacy(slug):
    """The earlier long-form record, where one survives. Superseded by the v2
    body above it — kept because it phrases the same work differently and shows
    what the author chose to drop."""
    rec = LEGACY.get(slug)
    if not rec or not isinstance(rec, dict):
        return []
    out = ["<details>", "<summary><strong>Earlier long-form record</strong> "
           "(data/case-studies.json — superseded by the sections above, kept for "
           "comparison)</summary>\n"]
    meta = [[k, rec.get(k)] for k in ("role", "teamSize", "dateRange", "organization")
            if rec.get(k)]
    if meta:
        out.append(md_table(["Field", "Value"], meta))
        out.append("")
    if rec.get("tags"):
        out.append("**Tags** — " + " · ".join(f"`{t}`" for t in rec["tags"]) + "\n")
    if rec.get("isConfidential") and rec.get("confidentialNote"):
        out.append(f"> **Confidential.** {rec['confidentialNote']}\n")
    for label, key in (("TL;DR", "tldr"), ("Role and approach", "roleAndApproach"),
                       ("What was built", "whatWasBuilt"), ("Impact context", "impactContext"),
                       ("Reflection", "reflection")):
        if rec.get(key):
            out.append(f"**{label}.** {rec[key]}\n")
    if rec.get("keyDecisions"):
        out.append("**Key decisions**\n")
        out.extend(f"- {d}" for d in rec["keyDecisions"])
        out.append("")
    if rec.get("metrics"):
        out.append(md_table(["Value", "Label"],
                            [[m.get("value", ""), m.get("label", "")] for m in rec["metrics"]]))
        out.append("")
    if rec.get("media"):
        out.append("**Media referenced**\n")
        out.extend(f"- `{m.get('type','?')}` {m.get('src','')} {m.get('caption','')}".rstrip()
                   for m in rec["media"])
        out.append("")
    if rec.get("links"):
        out.extend(f"- [{l.get('label','link')}]({l.get('url','')})" for l in rec["links"])
        out.append("")
    out.append("</details>\n")
    return out


def render_demo(p, n):
    """The demo dossier: what it is, how it is wired, how it was designed, and
    what its own file says."""
    url = p.get("demoUrl")
    note = NOTES.get(n)
    if not url and not note:
        return []
    out = ["**Demo**\n"]
    if url and url.startswith("/"):
        d = demo_dossier(url)
        if d and not d.get("missing"):
            out.append(md_table(
                ["Field", "Value"],
                [["Path", f"`{url}`"],
                 ["File", f"`public{d['dest']}`  ({d['kb']} KB)"],
                 ["Served by", "explicit rewrite in `next.config.ts`"],
                 ["Document title", d["title"]],
                 ["Interactive", "yes — the page carries its own script" if d["interactive"] else "static"]],
            ))
            out.append("")
            if d["headings"]:
                out.append("_Screen structure, read out of the demo file:_\n")
                out.append("```")
                out.extend(d["headings"][:40])
                out.append("```\n")
            if d["text"]:
                out.append("_Visible copy in the demo (markup stripped, truncated):_\n")
                out.append("> " + d["text"][:2600].replace("\n", " ") + ("…" if len(d["text"]) > 2600 else ""))
                out.append("")
        elif d:
            out.append(f"`{url}` — **rewrite present but `public{d['dest']}` is missing.**\n")
        else:
            out.append(f"`{url}` — **no rewrite in `next.config.ts`; this path 404s.**\n")
    elif url:
        out.append(f"External: <{url}>\n")
    if note:
        out.append(f"_Design note — {note['label']}:_\n")
        out.append(note["text"] + "\n")
    return out


# ------------------------------------------------------------------- assemble
today = date.today().isoformat()
L = []
A = L.append

A("# Portfolio — complete analysis export\n")
A(f"_Every product in the portfolio at maximum available depth, compiled from the "
  f"repository on {today}. Regenerate with `python scripts/export-analysis.py`._\n")

A("## Scope\n")
A(f"**Included — {len(products)} products** plus the program-overview page: everything "
  "that files under **Silicon & systems** and **AI programs & platforms** on `/work`, "
  "which between them contain everything under **Prototypes & research** (every "
  "prototype and research entry is a product on one of the two tracks).\n")
A(f"**Excluded — {len(excluded)} entries.** The earlier engineering and hardware builds "
  "that file under **Others**. They are card-level only in the source: one sentence "
  "each, no case study, no demo. Excluded at the author's instruction.\n")

A("## How to read this\n")
A("- **Track** — `silicon` (chips, dev kits, hardware systems) or `ai` (AI programs, "
  "internal platforms, automation).")
A("- **Status** — `production` (shipped externally) · `internal` (shipped inside the "
  "company) · `customer-testing` · `prototype` · `research`. Status is the maturity "
  "claim, and the case-study format changes with it.")
A("- **Evidence class**, on every fact in a skim layer — this is the honesty scheme, "
  "and the most important column in the file:")
A("  - **A** — public & verifiable: live spec pages, arXiv/DOI, patents, papers, "
  "anything demonstrable in a linked demo or video.")
A("  - **B** — real but protected: true, but the page cannot show the raw evidence; "
  "figures are anonymised or relative by design.")
A("  - **C** — reconstructed: an invented placeholder for this public sample. The page "
  "says so where it appears.")
A("- **Charts are exported as data tables**, not images, so the underlying numbers are "
  "readable.")
A("- **This is a sample portfolio.** Figures on cards and case-study pages are invented "
  "placeholders and screens are recreations, except where an entry says otherwise. Read "
  "each product's confidentiality and sample notes before treating any number as fact.")
A("- Each product carries, in order: the card record · the skim layer with evidence "
  "classes · the authored case study in full · the earlier long-form record where one "
  "survives · and a demo dossier — the rewrite, the design note, and the text extracted "
  "from the demo file itself.\n")

A("## Index\n")
idx = []
for n, p in enumerate(products, 1):
    cs = CS.get(p["slug"] or "", None)
    idx.append([n, p["title"], (p["company"] or "").strip(), (p["year"] or "").strip(),
                p["track"] or "", p["status"] or "", p["domain"] or "",
                "yes" if cs else "—",
                "internal" if (p.get("demoUrl") or "").startswith("/")
                else ("external" if p.get("demoUrl") else "—")])
A(md_table(["#", "Product", "Company", "Years", "Track", "Status", "Domain",
            "Case study", "Demo"], idx))
A("")

A("## Distribution\n")
tr = Counter(p["track"] for p in products)
st = Counter(p["status"] for p in products)
co = Counter((p["company"] or "").strip() for p in products)
do = Counter(p["domain"] for p in products)
proto = [p for p in products if p["status"] in ("prototype", "research")]
A(f"- **Products exported:** {len(products)} (+ 1 program overview). "
  f"**{len(excluded)} engineering builds excluded.**")
A("- **By track:** " + " · ".join(f"{k} {v}" for k, v in tr.most_common()))
A("- **By status:** " + " · ".join(f"{k} {v}" for k, v in st.most_common()))
A(f"- **Prototypes & research:** {len(proto)} — "
  + " · ".join(f"{k} {v}" for k, v in Counter(p['track'] for p in proto).most_common()))
A("- **By company:** " + " · ".join(f"{k} {v}" for k, v in co.most_common()))
A("- **By domain:** " + " · ".join(f"{k} {v}" for k, v in do.most_common()))
A(f"- **With an authored case study:** {sum(1 for p in products if CS.get(p['slug'] or ''))} "
  f"of {len(products)}")
A(f"- **With a demo:** {sum(1 for p in products if p.get('demoUrl'))} "
  f"({sum(1 for p in products if (p.get('demoUrl') or '').startswith('/'))} interactive "
  "recreations hosted here, the rest external)")
A("\n---\n")
A("## Products\n")

numbered = list(enumerate(products, 1))
if program:
    numbered.append(("P", program))

for n, p in numbered:
    if n == "P":
        A("---\n")
        A("## Program overview\n")
        A("_One page over fourteen chapters, not a 38th product. It fronts the internal "
          "AI program and is deliberately kept off the /work grid._\n")
    cs = CS.get(p["slug"] or "", None)
    A(f"### {n}. {p['title']}\n")

    rec = [["Slug", f"`{p['slug']}`" if p["slug"] else "_(none — slug derived from title)_"],
           ["Company", (p["company"] or "").strip()],
           ["Years", (p["year"] or "").strip()],
           ["Track", p["track"] or ""],
           ["Domain", p["domain"] or ""],
           ["Status", p["status"] or "null"],
           ["Tier", p["tier"] if p["tier"] else "—"],
           ["Card image", f"`{p['image']}`" if p["image"] else "—"],
           ["Card colour", p["color"] or "—"]]
    if cs:
        rec.append(["Context", cs.get("eyebrow", "")])
        m = cs.get("meta", {})
        for label, key in (("Role", "role"), ("Team", "team"),
                           ("Timeline", "timeline"), ("Stage", "stage")):
            if m.get(key):
                rec.append([label, m[key]])
    if p.get("demoUrl"):
        rec.append(["Demo", p["demoUrl"]])
    if p.get("href"):
        rec.append(["External link", p["href"]])
    A(md_table(["Field", "Value"], rec))
    A("")

    if cs and cs.get("deck"):
        A(f"**Positioning.** {cs['deck']}\n")
    if p.get("outcome"):
        A(f"**Outcome (card copy).** {p['outcome']}\n")

    if not cs:
        A("_No long-form case study on file — card-level entry only._\n")
        for chunk in render_demo(p, n if isinstance(n, int) else 0):
            A(chunk)
        A("---\n")
        continue

    for chunk in render_fast(cs):
        A(chunk)

    for s in cs.get("summary", []):
        A(f"**{s.get('lead','')}** {s.get('text','')}\n")
    if cs.get("evidence"):
        A("**Evidence / demos**\n")
        for ev in cs["evidence"]:
            A(f"- [{ev.get('label','link')}]({ev.get('url','')})")
        A("")
    if cs.get("confidentiality"):
        A(f"> **Confidentiality.** {cs['confidentiality']}\n")

    for sec in cs.get("sections", []):
        A(f"#### {sec.get('num','')}. {sec.get('heading','')}\n")
        for para in sec.get("body", []):
            A(para + "\n")
        for b in sec.get("blocks", []):
            r = render_block(b)
            if r:
                A(r + "\n")
        for para in sec.get("after", []):
            A(para + "\n")

    if cs.get("sampleNote"):
        A(f"> **Note on this sample.** {cs['sampleNote']}\n")

    for chunk in render_legacy(p["slug"] or ""):
        A(chunk)
    for chunk in render_demo(p, n if isinstance(n, int) else 0):
        A(chunk)
    A("---\n")

# ------------------------------------------------------------------- appendix
A("## Appendix — demo inventory\n")
A("_Every interactive recreation hosted in this repo. Each is a single self-contained "
  "HTML file in `public/demo/`, served at an extension-less path by an explicit rewrite "
  "in `next.config.ts`. Adding one means both edits; without the rewrite the clean path "
  "404s._\n")
rows = []
for url, dest in sorted(REWRITES.items()):
    f = ROOT / "public" / dest.lstrip("/")
    owner = next((p["title"] for p in items if p.get("demoUrl") == url), "—")
    rows.append([f"`{url}`", f"`{dest}`",
                 f"{round(f.stat().st_size / 1024, 1)} KB" if f.exists() else "**MISSING**",
                 owner])
A(md_table(["Path", "File", "Size", "Linked from"], rows))
A("")

A("## Appendix — what this export leaves out\n")
A("Stated plainly so the analysis knows its own edges.\n")
A(f"- **The {len(excluded)} engineering builds** under Others, excluded by instruction. "
  "They are one-sentence card entries in `app/work/constants.ts` with no case study and "
  "no demo.")
A("- **Images.** No card art, screenshots, or the 15 mermaid architecture diagrams in "
  "`public/static/images/project/`. Chart *numbers* survive as tables; visual evidence "
  "does not.")
A("- **Demo behaviour.** The text and screen structure of each demo are extracted here, "
  "but the demos are script-driven; what a state actually does on click is only visible "
  "by opening it.")
A("- **The site's code.** Architecture, routing, the filter system, the admin CMS and "
  "the known defects live in `PROJECT-REFERENCE.md`; `/work` specifically in "
  "`app/Changes/work-page-reference.md`.")
A("- **The audit trail.** `AUDIT/FINDINGS.md`, `CLAIMS-AUDIT.md` and `INTERVIEW-BRIEF.md` "
  "hold the per-project rubric verdicts, the full evidence-class audit, and the questions "
  "a hostile interviewer would ask.")

out = "\n".join(L)
(ROOT / "PORTFOLIO-ANALYSIS.md").write_text(out, encoding="utf-8")
print(f"PORTFOLIO-ANALYSIS.md written: {len(out.splitlines())} lines, "
      f"{len(out)/1024:.0f} KB, {len(out.split())} words")
print(f"  products: {len(products)} (+{1 if program else 0} program overview)")
print(f"  excluded engineering builds: {len(excluded)}")
print(f"  case studies embedded: {sum(1 for p in products if CS.get(p['slug'] or ''))}")
print(f"  skim layers embedded: {sum(1 for p in products if (CS.get(p['slug'] or '') or {}).get('fast'))}")
print(f"  legacy records embedded: {sum(1 for p in products if LEGACY.get(p['slug'] or ''))}")
print(f"  demo dossiers: {sum(1 for p in products if (p.get('demoUrl') or '').startswith('/'))}")
print(f"  design notes matched: {len(NOTES)}")

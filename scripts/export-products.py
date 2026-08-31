#!/usr/bin/env python3
"""Regenerate PRODUCTS-FULL.md — the single-file export of every product and
its case study — from the two sources of truth:

    app/work/constants.ts      (cards: title, positioning line, outcome, links)
    data/case-studies-v2.json  (the authored nine-section bodies)

Run from the repo root:  python scripts/export-products.py
Charts are rendered as data tables rather than images, so the underlying
numbers stay readable and diffable.
"""

import json
import re
import sys
import io
from datetime import date
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------- constants.ts
TS = (ROOT / "app/work/constants.ts").read_text(encoding="utf-8")
body = TS[TS.index("export const workItems"):]

STR = r"'((?:[^'\\]|\\.)*)'"

def unesc(s):
    return s.replace("\\'", "'").replace("\\\\", "\\").strip()

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
    return unesc(m.group(1)) if m else None

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
        }
    )

products = [i for i in items if i["category"] == "product"]
appendix = [i for i in items if i["category"] != "product"]

# ------------------------------------------------------- case-studies-v2.json
CS = json.loads((ROOT / "data/case-studies-v2.json").read_text(encoding="utf-8"))

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
            out.append(f"**Figure — {c['title']}**")
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
    else:  # future-proof fallback
        out.append(f"_[{k}]_ " + json.dumps({x: y for x, y in b.items() if x != 'kind'},
                                            ensure_ascii=False)[:600])
    return "\n\n".join(x for x in out if x)

# ------------------------------------------------------------------- assemble
today = date.today().isoformat()
L = []
L.append("# Product Portfolio — Pushpal Das (full case-study export)\n")
L.append(f"_Complete export of every product and its case study, compiled from "
         f"`app/work/constants.ts` and `data/case-studies-v2.json` on {today}. "
         "This is the full-depth version: it carries the section prose, decision records, "
         "scope calls, data tables, chart datasets, interface reasoning and technical "
         "configuration — not only the summaries. Regenerate with "
         "`python scripts/export-products.py`._\n")
L.append("## How to read this\n")
L.append("- **Track** — `silicon` (chips, dev kits, hardware systems) or `ai` (AI programs, "
         "internal platforms, automation).")
L.append("- **Status** — `production` (shipped externally) · `internal` (shipped inside the "
         "company) · `customer-testing` · `prototype` · `research`.")
L.append("- Every case study follows the same nine-part structure, so sections are directly "
         "comparable across products.")
L.append("- **Chart data** is rendered as tables rather than images, so the underlying numbers "
         "are readable.")
L.append("- **Confidentiality notes** are quoted on each product. Several internal and silicon "
         "products state outright that certain figures are anonymised, relative, or invented "
         "placeholders for a public sample — read those before treating any number as fact.\n")

L.append("## Index\n")
idx_rows = []
for n, p in enumerate(products, 1):
    idx_rows.append([n, p["title"], (p["company"] or "").strip(), (p["year"] or "").strip(),
                     p["track"] or "", p["status"] or "", p["domain"] or ""])
L.append(md_table(["#", "Product", "Company", "Years", "Track", "Status", "Domain"], idx_rows))
L.append("")

# distribution
from collections import Counter
L.append("## Distribution\n")
tr = Counter(p["track"] for p in products)
st = Counter(p["status"] for p in products)
co = Counter((p["company"] or "").strip() for p in products)
do = Counter(p["domain"] for p in products)
L.append(f"- **Total products:** {len(products)} (plus {len(appendix)} engineering/hardware "
         "builds, in the appendix)")
L.append("- **By track:** " + " · ".join(f"{k} {v}" for k, v in tr.most_common()))
L.append("- **By status:** " + " · ".join(f"{k} {v}" for k, v in st.most_common()))
L.append("- **By company:** " + " · ".join(f"{k} {v}" for k, v in co.most_common()))
L.append("- **By domain:** " + " · ".join(f"{k} {v}" for k, v in do.most_common()))
L.append("\n---\n")
L.append("## Products\n")

for n, p in enumerate(products, 1):
    cs = CS.get(p["slug"] or "", None)
    L.append(f"### {n}. {p['title']}\n")
    meta_rows = [
        ["Slug", f"`{p['slug']}`" if p["slug"] else "_(no case study)_"],
        ["Company", (p["company"] or "").strip()],
        ["Years", (p["year"] or "").strip()],
        ["Track", p["track"] or ""],
        ["Domain", p["domain"] or ""],
        ["Status", p["status"] or ""],
    ]
    if cs:
        meta_rows.append(["Context", cs.get("eyebrow", "")])
        m = cs.get("meta", {})
        for label, key in (("Role", "role"), ("Team", "team"),
                           ("Timeline", "timeline"), ("Stage", "stage")):
            if m.get(key):
                meta_rows.append([label, m[key]])
    link = p.get("demoUrl") or p.get("href")
    if link:
        meta_rows.append(["Link", link])
    L.append(md_table(["Field", "Value"], meta_rows))
    L.append("")
    if cs and cs.get("deck"):
        L.append(f"**Positioning.** {cs['deck']}\n")
    if p.get("outcome"):
        L.append(f"**Outcome (card copy).** {p['outcome']}\n")
    if not cs:
        L.append("_No long-form case study on file — card-level entry only._\n")
        L.append("---\n")
        continue
    for s in cs.get("summary", []):
        L.append(f"**{s.get('lead','')}** {s.get('text','')}\n")
    if cs.get("evidence"):
        L.append("**Evidence / demos**\n")
        for ev in cs["evidence"]:
            L.append(f"- [{ev.get('label','link')}]({ev.get('url','')})")
        L.append("")
    if cs.get("confidentiality"):
        L.append(f"> **Confidentiality.** {cs['confidentiality']}\n")
    for sec in cs.get("sections", []):
        L.append(f"#### {sec.get('num','')}. {sec.get('heading','')}\n")
        for para in sec.get("body", []):
            L.append(para + "\n")
        for b in sec.get("blocks", []):
            r = render_block(b)
            if r:
                L.append(r + "\n")
        for para in sec.get("after", []):
            L.append(para + "\n")
    if cs.get("sampleNote"):
        L.append(f"> **Note on this sample.** {cs['sampleNote']}\n")
    L.append("---\n")

L.append("## Appendix — engineering and hardware builds\n")
L.append("_Earlier engineering work carried as supporting evidence rather than as products._\n")
app_rows = [[a["title"], (a["company"] or "").strip(), (a["year"] or "").strip(),
             a["domain"] or "", a["outcome"] or ""] for a in appendix]
L.append(md_table(["Build", "Company", "Years", "Domain", "Note"], app_rows))
L.append("")

out = "\n".join(L)
(ROOT / "PRODUCTS-FULL.md").write_text(out, encoding="utf-8")
print(f"PRODUCTS-FULL.md written: {len(out.splitlines())} lines, "
      f"{len(products)} products, {len(appendix)} appendix builds")

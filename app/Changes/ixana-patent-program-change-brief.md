# Patent program operations — change brief

**Purpose.** Everything needed to write a *safe, specific* prompt for changing the `ixana-patent-program` case study, without breaking the page, the verifier, or the confidentiality obligations that are stricter here than anywhere else in the portfolio.

**Read order for any change:** `portfolio-decisions.md` (the spec, wins all conflicts) → `case-study-authoring-brief.md` (the authoring contract) → this file (page-specific state and traps) → the entry itself.

---

## 1. Where every piece lives

| Path | What it holds for this page |
|---|---|
| `data/case-studies-v2.json` → key `ixana-patent-program` | The whole page. Last key in the file |
| `app/work/constants.ts` | The grid card. Sits immediately **above** the `Patent dashboard sync` card |
| `public/static/images/project/ixana-patent-program-card.png` | Card image, 1200×750, generated (see §7) |
| `public/static/images/project/ixana-patent-{gantt,tracker,dashboard,ask,approval,pipeline}.png` | **The six shipped visuals.** Routes A/B/C — see §12 |
| `app/work/[slug]/case-study-v2.tsx` + `case-study-v2.css` | The `gallery` block kind (one `case`, one `.cs2 .gallery` grid), added for this page |
| `scripts/verify-case-studies.js` | Gallery checks: at most one per page, 2–6 items, every image resolves |
| `app/work/[slug]/case-study-types.ts` | The `survival` `ChartSpec` variant, added for this page |
| `app/work/[slug]/case-study-charts.tsx` | The `Survival` component + its dispatcher case |
| `app/Changes/case-study-authoring-brief.md` | §6 ledger row `survival`; §7 ledger entries for this page's §02, §04, §05 |
| `app/Changes/final patent backend/` | Source material. `state.json`, `app/dedupe.py`, `app/dashboard.py`, `README.md` |
| `app/Changes/final patent backend/Others/` | The five screenshots + the Gantt HTML. **None publishable** — see §4 |

---

## 2. Current state

**Header.** `internal` · eyebrow `Ixana · 2024–2026 · Patent operations` · title *Patent program operations*
**Deck:** "Fifty-plus filings across six product lines, owned end to end — and disclosure-to-filing cut from fourteen weeks to six on no extra inventor time."
**Meta:** Product manager — patent programme owner and Wi-R product line PM · Founder/CTO on strategy, outside counsel on execution, 1 engineer · Feb 2024 – Aug 2026 · Live, running across three outside firms
**Voice:** "I" (counter reads I 34 / we 22 — see the trap in §6)
**Prose:** 998 words against the internal band of 800–1,000. **There are 2 words of headroom.** Any addition needs a matching subtraction, named.

### Section map

| Section | Prose | Blocks |
|---|---|---|
| summary | 124 | three paragraphs |
| §01 Why this, and why now | 136 | `figure` hbar — options sizing |
| §02 The problem as people experienced it | 106 | `table` evidence · `figure` hbar — places-to-look by role |
| §03 My role and approach | 132 | `decisions` ×4 · `figure` **stackedBars** (intersection, with markers) · `doc` coverage review |
| §04 What I cut | 114 | `scope` · `para` ×2 · `doc` |
| §05 How I got it agreed | 136 | three paragraphs, no blocks |
| §06 What was built | 41 | `shot` **(real image, 4 callouts)** · **`gallery` ×4** · `table` surfaces · **`config`** |
| §07 Tradeoffs | 0 | `table` ×1, four rows |
| §08 Impact and outcomes | 107 | `metrics` ×6 · `figure` **survival** · `definition` |
| §09 How it works | 0 | **`arch`**, one figure, **real mermaid PNG** |
| §10 What I'd do differently | 86 | two paragraphs |

### The number spine — change one, change all of them

Every figure below appears in more than one place. The deck, the summary Result, the §08 tiles and the §08 chart must keep telling the same story.

| Figure | Where it appears | Source |
|---|---|---|
| **54 active matters** | summary Result, §02 table ×2, §08 chart caption | **Real** — `state.json`, tracker screenshot |
| **3 outside firms** | meta, summary, §04 scope, §06, §09, config | **Real** |
| **6 lifecycle stages + unclassified** | §04 scope, §06 callout 3, config | **Real** — tracker screenshot |
| **50+ filings owned, Feb 2024 – Aug 2026** | deck, grid outcome, summary Result, §01 body, §03 figure (n=52) | Invented. **Cumulative filings**, never "50+ patents" — ixana.ai says 40+ patents / 25+ filed annually, and ~20/yr sits inside that rate |
| **Per-line filing counts** (YR23 10 · YR31 11 · NFE2001 9 · NFE3001 10 · ref designs 6 · dev kits 6 = 52) | §03 `stackedBars` figure only | Invented / relative. Column totals 8, 10, 12, 12, 7, 3 |
| **Disclosure markers** (YR23 ships H1 '24 · YR31 + NFE2001 H2 '25 · NFE3001 + ref designs H1 '26) | §03 figure markers + caption | **Real** — taken from the six Wi-R pages' own timelines. **CES deliberately excluded** |
| **5 technology categories** | config | **Real** — `dedupe.py` `CATEGORIES` |
| 25+ filings/yr · 75+ people · 5-month tapeouts | summary, §01 body + after + caption | **Public, verified** on `ixana.ai/company` |
| 14w → 6w disclosure-to-filing | deck, summary, tile 1 | Invented |
| 19 → 2 of 54 no owned next action | §02 table, tile 2 | Invented |
| 95m → 40m inventor minutes *(guardrail)* | §08 body, tile 3 | Invented |
| 26 of 31 named inventors/reviewers | tile 4 | Invented |
| 0 dates disagreeing with counsel's docket | summary, §08 body, tile 5 | Invented |
| 6 → 1 places opened | §02 chart, §02 table, tile 6 | Invented |
| 214 docketed actions, 23 disagreements | §02 body, table, caption, after | Invented |

**50+ filings vs 54 active matters — keep this razor sharp.** 50+ is *cumulative filings owned across the tenure*; 54 is *point-in-time active matters* as the `definition` block defines it. They never appear in the same sentence. A reviewer who conflates them will think the page contradicts itself.

**Headcount note.** This page anchors to the verified **75+**. `Ixana-Wiki` (`xana-multifile-rag-based-data-singularity-platform`) still says **140 employees** and now disagrees with `ixana.ai`. Adoption here is reported against the 31 named inventors and reviewers, not headcount, for that reason. If Ixana-Wiki is ever corrected, nothing on this page needs to move.

### Evidence array — do not touch without re-verifying

Three live Google Patents URLs, all assignee **`Quasistatics Inc`** (dba Ixana), each fetched and confirmed:

- `US12619308B2` — granted, Wearable device for EQS-HBC
- `US20250379663A1` — Communication system for data transfer using human body resonance
- `US20250192915A1` — Error-proportional energy saving in encoding/decoding for BANs

**Rejected, do not add:** `WO2023163840A1` (assignee Purdue Research Foundation) and `WO2024129792A1` (assignee Eli Lilly). Shreyas Sen is an inventor on both; neither is Ixana's. **Verify the assignee on the page itself before adding any patent.** A dead or misattributed link is worse than an empty array.

---

## 3. The thesis — this must survive every edit

At a hardware startup filing 25+ applications a year off a five-month tapeout cadence, **the roadmap and the patent estate are one decision surface, not two.** What gets taped out determines what is patentable; what is already filed determines what is safe to publish or demo; a disclosure date that slips past a filing date destroys protection that cannot be recovered.

The second half is a PM story about instrumenting a flow and **automating only the parts where automation cannot be wrong in an unrecoverable way.** Strategy on the front, defensibility in the middle, an automated spine underneath.

**Failure mode to guard against:** the page becoming a feature tour of seven tools. Items 3–7 of the original scope (dashboard, ask-about-any-patent, invoice tracker, Gantt, tracker) are surfaces of *one* system. They live in the §06 surface table and the §08 data. **None gets its own section or its own paragraph.**

---

## 4. Confidentiality — the hard constraints

This page covers live legal work. It carries obligations the hardware pages do not.

- **No unpublished subject matter.** Nothing about what any unpublished application claims or covers.
- **No attorney, firm or inventor names. No matter numbers. No fee figures tied to real matters.** Invoice work is described by stage and control, never by amount.
- **The three real firm names** in `config.py` (`Purdue, K&K` / `Metayage` / `PIP`) must never appear. The page says "three outside firms".
- **Every source screenshot is still unpublishable** — each carries real matter titles, application numbers, firm names or fee amounts, and the Gantt HTML carries all four. **No raw capture, crop, blur or trace of one has ever shipped, and none may.** Since Aug 2026 the page nonetheless carries six real visuals, produced under the image doctrine in §12 — re-rendered or recreated on a synthetic dataset. `sampleNote` states exactly which is which.
- Structure mined from the screenshots **is** publishable and is already used: stage names, column names, the `MATCHES QUOTE` / auto-match-unconfirmed pattern, the deadline colour bands.

**Regression check after any edit** — all of these must return zero:

```bash
grep -ic "metayage\|purdue\|K&K\|In-brain\|18/840" data/case-studies-v2.json
```

---

## 5. Collisions — what this page may not claim

Eight patent-adjacent pages already exist. This page owns **only the layer above them**.

| Page | Owns | So this page must not claim |
|---|---|---|
| `patent-tracker-generative-ai-engine-for-data-extraction` (Patent dashboard sync) | Dedup counting rules, derived-master sync, the row-by-row reconciliation audit, the paralegal disagreement, `dumbbell`. **Built on the same backend** | Any counting rule, sync mechanism, or dashboard-consolidation thesis |
| `ai-pm-customized-multi-view-for-pms` (Gantt dashboard) | Schedule visualisation, read-only as a permanent constraint | A timeline-rendering thesis. Gantt = one surface-table row |
| `procurement-orchestrator-…` | Approval-chain design, owner-within-a-business-day, kill gates | An approval-chain thesis. Invoices = quote-conformance, one row |
| `ai-lawyer-…` | Machine drafting stopped on a **measured recall bar**; containment; prior-art retrieval | Re-telling the drafting story. §04 here cuts drafting on **bottleneck evidence** (attorney days vs inventor weeks) and names AI Lawyer as where the question went. **Keep that cross-reference** — it is what keeps both pages legitimate |
| `clickup-document-tracker-…` | Hash-based change detection, estate expansion | Change-detection framing |
| `github-for-clickup-automation-…` | Raw-event storage, field-level diffs, who-changed-what | Audit-trail framing |
| `ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic` (Flow Tracker) | Weekly-review preparation | Review-prep framing |
| `xana-multifile-rag-…` (Ixana-Wiki) | Company-wide search; **holds the only "we launched without instrumentation" device in the portfolio** | That honesty device. Never use it here |

The `verify-case-studies.js` checker enforces uniqueness on four axes mechanically: **§08 chart form · metric tile label set · §02 evidence method · §05 disagreement.** Changing any of those four means also updating the matching ledger in `case-study-authoring-brief.md` §6/§7.

---

## 6. Traps — things that actually broke during authoring

1. **The word band is the binding constraint.** The first draft measured **1712** against a band of 800–1,000. Prose counts *only*: summary text, section `body`/`after`, `para` blocks, `decisions` items (lead **and** text), and `definition` text. Tables, scope lists, callouts, doc excerpts, config and figure captions are free. **Moving prose into a callout or a caption is a legitimate way to buy words** — and often improves the page.
2. **Voice is counted, not judged.** `iCount = /\b(I|my|me)\b/g` vs `weCount = /\b(we|our|us)\b/gi` over the whole JSON blob. This page sat at 24/25 and reported as "we" until first-person ownership was restored in §01, §03 and §05. Legitimate collective "we" ("we agreed before build", "how we counted") is correct writing — just keep enough "I". **Re-check the counter after any trim.**
3. **Do not rewrite the whole JSON file.** `JSON.stringify(x, null, 2)` does **not** round-trip: biome formats short arrays inline and the rest of the file is already formatted that way. Splice only this one key, then run `npx biome check --write data/case-studies-v2.json`, then re-run the verifier.
4. **`config` is in §06, not §08.** Deliberate: §08 must contain no configuration of any kind, not in prose and not in a tile. Exactly one `config` block on the page.
5. **Exactly one `arch` block, inside §09.** No diagram may appear above it — the first visual frames the page, and a pipeline diagram frames it as engineering work.
6. **`shot` needs 3–4 callouts**, each naming a **decision**, not a feature.

---

## 7. Regenerating the card image

Not a stock render — a generated typographic card matching the `.cs2` dark palette, showing the lifecycle pipeline with an `Unclassified` pill set apart. Built by composing an SVG string and rendering with `sharp` (already a dependency):

```js
sharp(Buffer.from(svg)).png().toFile('public/static/images/project/ixana-patent-program-card.png')
```

Palette: bg `#08080b`, surface `#101015`, line `#23232d`, ink `#f2f3f6`, muted `#6e7385`, accent `#5b7cfa`, warn `#c9973f`. Fonts must be Windows-available — `Segoe UI` and `Consolas`. Keep the pipeline track inside `1200 - 2×96` px or the last pill clips off the right edge.

---

## 8. The `survival` chart form

Added for this page; it is now in the shared ledger and another page may reuse it at §08 only after rotating.

```ts
{ form: 'survival'; title: string; xTitle: string; xLabels: string[];
  series: { name: string; color: string; points: number[] }[];   // points are % still waiting
  threshold: { index: number; label: string };                   // vertical rule, x-index
  medians: { name: string; index: number; label: string }[] }    // name must match a series
```

y is fixed 0–100 (a share, so no `yMax`). `index` may be fractional — medians sit where the curve crosses 50%. Series names are drawn in a legend at x≈640, so **keep them short** ("Before" / "After"); long names overflow the 700-unit viewBox.

---

## 9. Known open items — the likely change requests

- ~~§09 arch placeholder~~ and ~~§06 shot placeholder~~ — **both resolved Aug 2026.** Six real visuals now ship; see §12.
- **Category coverage is deferred, and it is real.** `state.json` shows all five category counts at zero — categorisation was never populated in the live workbooks. That is an honest, unused story if the page ever needs more substance in §04 or §10.
- **The long tail is unexplained.** The §08 chart deliberately admits the system did nothing past day 60. If inventor-availability data ever exists, that is the natural §10 follow-through.
- Deck, tiles and chart are currently reconciled. **Any figure change must be propagated across every row of the spine table in §2.**

---

## 10. Verification loop — run all four, fix everything reported

```bash
npm run verify:work                 # sections, bands, thresholds, guardrails, differentiation
npx tsc --noEmit                    # ignore app/Changes/ixana-staging/* — vendored, pre-existing
npx biome check                     # run --write on data/case-studies-v2.json after any splice
npm run dev                         # load /work/ixana-patent-program — expect 200, 10 sections
```

Expected verifier row when healthy:

```
ixana-patent-program    internal    996    10    6    survival    I
```

---

## 11. Prompt scaffold

Fill the braces. Keep every section — the constraints block is what stops a well-meaning edit from failing the verifier or leaking a firm name.

> **Task.** Change the `ixana-patent-program` case study: {what to change, and why}.
>
> **Read first.** `app/Changes/ixana-patent-program-change-brief.md`, then `app/Changes/case-study-authoring-brief.md` §3–§7, then the entry itself in `data/case-studies-v2.json`. Do not skim.
>
> **Constraints that override anything else in this prompt.**
> 1. Prose must land inside **800–1,000** words as `verify-case-studies.js` counts them. It is currently **996** — state what you are removing to pay for anything you add.
> 2. Voice stays **"I"**. Re-check the I/we counter after editing.
> 3. **Confidentiality:** no firm, attorney or inventor name, no matter number, no statutory date, no fee amount, no unpublished subject matter. Screens stay `placeholder` recreations. Confirm `grep -ic "metayage\|purdue\|K&K\|In-brain\|18/840"` returns 0.
> 4. Do not claim any thesis owned by the eight patent-adjacent pages listed in §5 of the change brief. Keep the AI Lawyer cross-reference in §04.
> 5. Keep exactly one `config` (in §06), one `arch` (in §09), one `shot` with 3–4 decision callouts, six metric tiles with one marked `(guardrail)`, the pre-agreed threshold in §08, and the `definition` block.
> 6. If you touch a number, propagate it across every row of the number-spine table in §2 of the change brief — deck, summary Result, tiles and chart must not drift.
> 7. If you change the §08 chart form, the §02 evidence method, the §05 disagreement or the tile label set, update the matching ledger in `case-study-authoring-brief.md` §6/§7 in the same change.
> 8. Splice only the `ixana-patent-program` key — never rewrite the whole JSON file. Then `npx biome check --write data/case-studies-v2.json`.
>
> **Then run and fix everything reported:** `npm run verify:work`, `npx tsc --noEmit`, `npx biome check`, and load `/work/ixana-patent-program` (expect 200).
>
> **Report:** what changed, the new prose word count against the band, and confirmation that the number spine still reconciles.

---

## 12. Image doctrine — how the six visuals were made, and how to remake them

**The rule that does not move:** no raw capture from `Others/` is ever published, cropped, blurred or traced. Every one carries real matter titles, application numbers, firm names or fee amounts. The page still ships real-looking visuals, by three routes.

All build scripts live in the session scratchpad, not the repo. The reproducible parts are recorded here.

### The synthetic dataset

18 matters, 115 events, authored from scratch against the schema only — never by editing `state.json`. Firms are `Firm A / B / C`; application numbers use `19/1xx,xxx` and `63/9xx,xxx`, format-correct and outside the real ranges; fees are round invented amounts; dates sit inside Feb 2024 – Aug 2026. Matter `ref` is an informal nickname and `title` a formal-register title, mirroring the real two-name problem the page describes.

**The leak gate is the important part.** Before anything renders, assert against the raw corpus (`state.json`, the Gantt HTML's own `DATA`/`EV` literals, `config.py`):
1. no named identifier survives — the three firm names, `Smartglass`, `combined_patent_tracker`, real totals;
2. no real application number appears;
3. **no 4-word phrase from any real matter title or ref appears.** Single shared words are field vocabulary, not leaks — a token-level gate flags `wearable` and `channel` and is useless. Last run: 628 real phrases + 337 appnos checked, 0 hits.

### Route A — `ixana-patent-gantt.png` (the §06 hero)

The **real** Gantt HTML with only three literals swapped (`DATA`, `EV`, `FIRM`) plus the firm `<option>` markup. Every line of product code runs untouched. Three hardcoded prose strings in the markup describe the real portfolio — the header `.sub`, the chart footnote (which names a real matter and fee) and the source note — and are rebuilt from the synthetic totals. `data-theme="dark"` is set on `<html>`; the Gantt view and the `All` range are selected by clicking the product's own buttons on load, not by reaching into `state`.

### Route B — tracker, dashboard, ask, approval (the §06 gallery)

Hand-built HTML/SVG from the mined structure — same stage names, columns, `MATCHES QUOTE` / auto-match-unconfirmed pattern, deadline colour bands — on the same synthetic dataset, in the `.cs2` dark palette (§7).

### Route C — `ixana-patent-pipeline.png` (the §09 arch)

Real mermaid, `theme:'dark'`, drawn from scratch. Style matches the 15 existing `mermaid-diagram*.png` assets. Note `mermaid-diagram__4_.png` already depicts this same backend for the Patent dashboard sync page — this one is deliberately a **matter-routing** diagram, not a sync-flow diagram.

### Rendering

No Playwright or Puppeteer in the project; Chrome headless is on the machine and is what was used:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu   --hide-scrollbars --no-sandbox --user-data-dir=<temp> --virtual-time-budget=7000   --screenshot="<ABSOLUTE WINDOWS PATH>.png" --window-size=W,H --force-device-scale-factor=2   "file:///<absolute/posix/path>.html"
```

Two traps: `--screenshot` **must** get an absolute Windows path or Chrome fails with `Access is denied`; and mermaid sizes its SVG to natural size, so force `.mermaid svg{width:1240px!important}` and `sharp().trim()` the white margin afterwards.

# Case study authoring brief

**Purpose.** Hand this file to Claude (or any capable model) together with a target project, and it has everything needed to (a) review or critique the case studies already on this site, and (b) write a new one that renders correctly and does not collide with what already exists.

**How to use it.** Paste or attach this file and say one of:

> Read `app/Changes/case-study-authoring-brief.md`. Write a full case study for **[project name]** following it exactly. Add it to `data/case-studies-v2.json` and wire the slug into `app/work/constants.ts`. Then run the two verification scripts in §10 and fix anything they report.

> Read `app/Changes/case-study-authoring-brief.md`. Review the existing case study **[slug]** against §4–§7 and tell me where it is weakest.

Companion files in this folder: `case-study-final-sample.html` is the gold-standard reference page (it *is* the Ixana-Wiki case study, rendered standalone). `portfolio-decisions.md` is the spec that governs everything. **Where this brief and `portfolio-decisions.md` disagree, the decisions doc wins** — with one standing exception noted in §9.

---

## 1. What exists today

- **55 projects** on the Work grid, all with a status, outcome line and domain. No TODOs anywhere.
- **34 full case studies** in the 10-section format.
- **21 card-only** projects (image, status badge, one-sentence outcome, `Company · Year · Domain`).
- Every project's status is one of five values or `null`. There is no sixth status and none should be invented.

Distribution across all 55: production 10 · internal 15 · customer-testing 2 · prototype 4 · research 7 · null 17.

---

## 2. Where things live

| Path | What it is |
|---|---|
| `app/work/constants.ts` | The grid data (`workItems`), plus `STATUS_CONFIG` and `STATUS_ORDER` — the single status lookup the spec requires |
| `app/work/types.ts` | `WorkItem` — the card schema |
| `data/case-studies-v2.json` | **The 34 case studies.** Keyed by slug |
| `data/case-studies.json` | The older format, still rendered for any slug not in v2. Currently every entry has a v2 counterpart |
| `app/work/[slug]/page.tsx` | Route. Checks v2 first, falls back to v1, else 404 |
| `app/work/[slug]/case-study-v2.tsx` | The 10-section renderer |
| `app/work/[slug]/case-study-v2.css` | Styles, ported from the reference, scoped under `.cs2` |
| `app/work/[slug]/case-study-charts.tsx` | The 34 static SVG chart forms |
| `app/work/[slug]/case-study-types.ts` | `CaseStudyV2`, `ChartSpec`, `CaseStudyBlock` — **the contract** |
| `public/static/images/project/` | All imagery, including 15 `mermaid-diagram*.png` architecture diagrams |
| `app/Changes/ixana-staging/` | **Source material for the Ixana hardware pages** — a copy of the public Ixana site. The real specs live in `src/components/products/WiRChipSpecification.tsx`; imagery in `public/chips-v2/`, `public/technology/`, `public/wi-r-ban_v2/`; long-form claims in `content/blog/`. Mine it before inventing. Copy any image you use into `public/static/images/project/` under a kebab-case name and reference only the copy. |

**v2 lives in its own file on purpose.** The admin endpoint does `store[slug] = body`, so anything nested inside `case-studies.json` is destroyed the next time someone saves that project from `/admin`. Do not move v2 data into that file.

---

## 3. The data contract

Read `app/work/[slug]/case-study-types.ts` for the authoritative types. Shape:

```jsonc
"<slug>": {
  "slug": "<same as the key>",
  "eyebrow": "Company · Year · Domain",
  "title": "Short product name",
  "deck": "One line stating the outcome",
  "status": "production | internal | customer-testing | prototype | research",
  "meta": { "role": "", "team": "", "timeline": "", "stage": "" },  // always these four, this order
  "confidentiality": "One line under the meta strip",
  "evidence": [ { "label": "", "url": "" } ],                       // optional; public artifacts only
  "summary": [                                                      // exactly three
    { "lead": "Problem.",     "text": "" },
    { "lead": "What I did.",  "text": "" },
    { "lead": "Result.",      "text": "" }
  ],
  "sections": [ { "num": "01", "heading": "", "body": [""], "blocks": [], "after": [""] } ],
  "sampleNote": "Footer text under the SAMPLE PAGE tag"
}
```

**Block kinds** (rendered in array order; `body` prints before blocks, `after` prints after):

| kind | Fields |
|---|---|
| `para` | `text` — a paragraph *between* two blocks, where ordering matters |
| `figure` | `chart` (a ChartSpec), `caption` |
| `table` | `head: string[]`, `rows: string[][]` — head labels double as mobile row labels |
| `decisions` | `label` (e.g. `"Key decisions"`), `items: [{lead, text}]` |
| `scope` | `shipped[]`, `deferred[]`, `cut[]` |
| `doc` | `bar`, `lead`, `items: [{lead, text}]`, `note` — a cropped page from a working document |
| `shot` | `image` **or** `placeholder`, `alt`, `callouts: [{lead, text}]` (3–4), `note` |
| `metrics` | `items: [{value, sub?, label}]` |
| `definition` | `lead` (usually `"How we counted."`), `text` |
| `config` | `text` — the single monospace configuration line |
| `arch` | `summary`, `figures: [{image? \| placeholder?, caption}]` |
| `gallery` | `items: [{image? \| placeholder?, label?, caption}]` (2–6), `note?` — a captioned grid of product surfaces. **At most one per page**, and it never replaces `shot`: `shot` argues one screen with numbered callouts, `gallery` shows the rest of the system exists. Added for Patent program operations, a platform whose several screens each carry a decision |

Section numbers must be **sequential from 01** with no gaps. When a status drops sections, renumber — do not leave holes.

---

## 4. The skeleton and its per-status variants

Base order, 10 sections:

`01` Why this, and why now · `02` The problem as people experienced it · `03` My role and approach · `04` What I cut · `05` How I got it agreed · `06` What was built · `07` Tradeoffs · `08` Impact and outcomes · `09` How it works · `10` What I'd do differently

| Status | Sections dropped | §08 becomes | Prose words |
|---|---|---|---|
| production | none | Impact and outcomes | 1,000–1,200 |
| internal | none | Impact and outcomes | 800–1,000 |
| customer-testing | none — **add** "What would make me stop" after §08 | Early signal and what I'm watching | 800–1,000 |
| prototype | 04, 05, 07 | What we learned | 500–700 |
| research | 04, 05, 07 | Finding and what it changed | 500–800 |

Status-specific obligations:

- **production** — §01 must name the customer and the commercial stake. Highest evidence bar; this is the claim reviewers probe.
- **internal** — report adoption as a fraction of headcount. Do not inflate it to sound commercial.
- **customer-testing** — never quote a percentage without its n. The extra section carries pre-agreed kill thresholds, each phrased as a stop rather than a discussion.
- **prototype** — say plainly it never went to users.
- **research** — include one line on what the study *could not* tell you.

Sections **01 and 05 are what most reliably read as senior**; §04 is the highest-signal section on the page. Do not thin them to save words.

---

## 5. Content rules

- **One voice per page.** Pick "I" or "we" and hold it. Current pages: "we" on Dāsa and NeuroAdapt (collaborative research), "I" everywhere else.
- **Every page states one pre-agreed threshold** — "we agreed before build that this failed if…" — and **names one guardrail**, a metric watched to be sure one number was not being won by breaking another.
- **Every full case study defines its key metric** in a `definition` block. What counted as "active", and why that definition excludes what it excludes.
- **Configuration appears once, in the `config` block, and nowhere else.** Chunk sizes, model names, board revs, service counts, cache TTLs must never appear in §08 prose or in a metric tile. The original site put embedding dimensions and an IP address under "Impact and outcomes" — that is the failure this rule exists to prevent.
- **Metric tiles are outcomes, not configuration.** Six tiles on production/internal/customer-testing pages, four on prototype/research. At least one tile is the guardrail, labelled `(guardrail)`.
- **Charts sit next to the claim they support**, never in a section of their own: opportunity sizing → §01 · problem evidence → §02 · outcome data → §08 · research findings inline with n and method in the caption.
- **Every figcaption carries period, source, and one line of interpretation.** The interpretation is the PM contribution — "steady rather than spiked; no mandate, so adoption spread department by department."
- **Static charts only.** No live embeds, analytics or demos. A static chart can draw the pre-agreed threshold as a line; a live one cannot, and drifts from the prose.
- **Architecture diagrams go in §09 only, inside the collapsed `arch` block.** Never above it — the first visual frames the page, and a pipeline diagram frames it as engineering work.
- **§06 uses the `shot` block with 3–4 callouts, each naming a decision, not a feature.** The bar: *"Citations sit inline because pilot users wouldn't act on an unverifiable answer."*
- **Screens are recreations, not redactions.** Rebuild in Figma with invented content and label it. Where no image exists, use the `placeholder` field naming what should go there.
- **Honesty devices.** At most one project across the whole portfolio may use "we launched without instrumentation; here's what I'd measure now" — Ixana-Wiki currently holds it. Research pages must state a limitation.

### Inventing figures

Every number on these pages is invented. Anchor each one so it stays plausible:

- Team sizes 2–8. Timelines in quarters. Adoption as a fraction of a stated headcount.
- Hardware figures consistent with Ixana's public Wi-R material — single-digit-mW class power, near-field body-area range.
- Round like a human reports: "under a day", "−61%", "9m → 55s". Never "37.4%".
- **Numbers must reconcile across the page.** The deck, the summary Result, the §08 tiles and the chart all tell the same story with the same figures. A reviewer who cross-checks must find no drift.

### Mandatory on every page

The footer `sampleNote`, rendered under a `SAMPLE PAGE — REPLACE ALL FIGURES` tag, stating that screens are recreations, figures are invented or relative, and offering to walk through the real product in a conversation. This is non-negotiable: the portfolio is a public teaching sample that invents figures about real companies.

---

## 6. Chart forms

All 17 implemented forms live in `case-study-charts.tsx` and share the reference's conventions: `viewBox="0 0 700 H"`, `.g-line` grid, `.g-lbl` axis labels, `.g-name` row names, `.g-val` values, a `<title>` for screen readers, static output only.

**§08 chart form is currently unique per case study.** Reuse is permitted by the spec once more than five case studies exist, but rotate before repeating:

| Form | Used at §08 by |
|---|---|
| `lineArea` | Ixana-Wiki |
| `cumulative` | Wi-R dev kits |
| `pairedBars` | Flow Tracker |
| `funnel` | Video library |
| `stackedBars` | Calendar sync |
| `dumbbell` | Patent dashboard sync |
| `groupedHBar` | Bandwidth reporting |
| `slope` | AMS monthly dashboard |
| `stackedArea` | Gantt dashboard |
| `barsThreshold` | Task change audit trail |
| `dualLine` | Document change intelligence |
| `histogram` | AI planning OS |
| `gateBars` | Procurement orchestrator |
| `hbar` | AI Lawyer |
| `curve` | Quantum simulator |
| `scatter` | NeuroAdapt |
| `dotplot` | Dāsa |
| `pareto` | Wi-R BAN YR23 — descending bars + cumulative-share line + cutoff rule; added for defect/escape analysis, which no existing form covered |
| `heatmap` | Wi-R NFE XA-NFE2001 — row × column grid shaded by value; added for coverage and pass-rate matrices, which no existing form could express |
| `stackedHBar` | Wi-R reference designs — horizontal stacked bars, one per row; added for phase breakdowns where the point is which phase disappears, not just that a total shrank |
| `diverging` | Wi-R BAN YR31 — bars either side of a zero axis, coloured by desirability rather than sign; added so a deliberate regression reads as one instead of hiding among gains |
| `thresholdCurves` | Wi-R NFE XA-NFE3001 — two curves over shared x categories with a shaded acceptance band; added where the story is which series crosses out of a budget, and where |
| `sequence` | SRM UAV ornithopter — one marker per attempt in order, coloured by outcome, with a rule where something changed; added for small test campaigns where the **order** of events is the finding, which a distribution or a matrix throws away |
| `confusion` | Ricky Kids triple riding — actual against predicted with the diagonal read as correct; added because the **direction** of an error is the finding (over- and under-counting are not equally costly), which `heatmap` cannot express since it shades magnitude alone |
| `radar` | Ricky Kids autism toys — several options scored on the same criteria by the same reviewers, one polygon each; added for multi-criteria design reviews, where the shape of a weakness matters more than any single score |
| `intervals` | Ricky Kids ENVI-City — central estimate with an uncertainty interval per row, judged against a decision threshold and coloured by whether the interval clears it; added where the question is not the size of an effect but whether it survives the model’s own error bars |
| `waterfall` | Ricky Kids carbon-positive e-car — a running balance walked from one total to another, one floating bar per contribution, adds and subtractions coloured separately; added for claims that need decomposing, including the terms that turn out to run the wrong way |
| `bands` | Ricky Kids sludge ROV — operating envelopes against a shared regime boundary, one band per option with a vertical rule where the medium itself changes behaviour; added for findings that are a threshold rather than a quantity |
| `statusGrid` | Ricky Kids COVID monitoring — grid of categorical verdicts, one glyph per row × column, coloured by outcome rather than shaded by magnitude; added because a feasibility matrix needs "no path exists" to read differently from "measured badly", which a numeric `heatmap` cannot express |
| `tornado` | Ricky Kids UAV radar calibration — one bar per term spanning the swing it puts into the result, sorted widest first; added for error-budget sensitivity, where the question is which term dominates rather than what the total is. Distinct from `diverging`, which draws a single value out from zero |
| `strips` | EEGRAB condenser microphone — one dot per measured unit along a shared scale, several units per row, with an acceptance band shaded; added to show a population rather than its summary. Distinct from `dotplot`, which carries one dot per category |
| `trajectory` | EEGRAB smart watch — a dashed path through a two-dimensional trade space, one point per board revision, with the agreed corner shaded; added where the route between two competing quantities is the finding and the endpoint alone hides it |
| `marimekko` | EEGRAB WishKey — variable-width stacked columns, width carrying a second quantity; added so a group holding most of the population cannot be outvoted visually by a small group with a tidier split |
| `waffle` | SLB sensor signal generator — one cell per countable item, filled to `value`; added for coverage where the remainder is a specific thing (one uncovered fault mode) rather than a rounding error, so the gap is visible as an empty cell instead of a decimal |
| `gapArea` | Scrum ecosystem — two curves with the area between them shaded, where the *gap* is the finding rather than either line; added because the useful part of a standup never changed and only the read-aloud minutes disappeared, which `dualLine` (two independent series) and `thresholdCurves` (a fixed budget) both flatten into "a number went down" |
| `survival` | Patent program operations — one step curve per cohort showing what share of a population is still waiting at elapsed point N, with a vertical rule at the agreed waiting limit and a median marker per cohort; added because the finding is *where two waiting populations separate*. `dualLine` compares two independent series and `histogram` shows a distribution, but neither answers how much of a population is still open at a given age |

`hbar` is also the workhorse for §01 sizing and §02 evidence on nearly every page — that reuse is fine and expected. Only §08 is constrained.

Adding a new form means adding a component and a `ChartSpec` variant in `case-study-types.ts`, then a case in the dispatcher.

**The §01 sizing chart is the most PM-specific visual available and almost nobody includes it.** Include it wherever the project plausibly competed against alternatives — it shows you *chose* rather than executed.

---

## 7. Differentiation ledger — do not collide with these

This is the check most likely to fail. Every project must read as its own product with its own evidence, not one rubric stamped seventeen times.

### §02 evidence method — all 34 differ. Currently used:

interviews + shadowing · partner-onboarding timings + support-ticket audit · timed observation of weekly reviews · playback log analysis + interviews · two-week diary study · row-by-row data reconciliation · time-and-motion study of a monthly compile · retrospective coding of six months of reports · shadowing sprint plannings + a survey · support-ticket audit · register-vs-workspace reconciliation · structured critique of 24 generated artefacts · requester interviews + email thread analysis · attorney shadowing + a recall gold set · classroom observation + learner survey · literature audit of 22 published analyses · query-log study + expert review · **bench-log audit across a first eval-board population, stalls coded by cause (YR23)** · **coding 18 months of inbound evaluation requests by intended use rather than by part requested (NFE2001)** · **structured post-mortem of 27 stalled evaluations, coded by the stage each died at (reference designs)** · **ranking 63 gen-1 change requests by evaluations-unblocked against validation weeks (YR31)** · **scoring partner-written requirement sheets line by line against our own characterisation data (NFE3001)** · **coding 84 returned-tool failure records by whether the fault was reproducible off-rig, not by whether it was eventually diagnosed (SLB sensor generator)** · **facility-manager and installer interviews plus counting unresolvable rows in twelve months of paper key-register pages against the physical key set (WishKey)** · **buying and tearing down nine competitor watches from the target retail band, costing every identifiable line at our own volume and run-testing each against its printed battery claim (smart watch)** · **measuring sixty capsules from three supplier-certified lots on one rig, to find what the incoming part actually is rather than what any competitor does (condenser microphone)** · **decomposing the error budgets of four published UAV-calibration experiments to find which term sets the achievable accuracy, before any hardware was chosen (UAV radar calibration)** · **shadowing isolation-ward observation rounds and timing every phase of an entry, then bench-comparing each non-contact channel against a commercial contact monitor on the same volunteer in the same minute (COVID monitoring)** · **test-tank trials running one fixed drive down one lane through three sludge analogues graded by density, varying the medium rather than the vehicle (sludge ROV)** · **building a cradle-to-grave carbon model from our own concept’s bill of materials and putting every energy-harvesting claim through a conservation-of-energy check before admitting it to the model (carbon-positive e-car)** · **auditing our own published paper claim by claim against what a reader could check, then modelling only what survived, at one-block scale across four archetypes and three climates (ENVI-City)** · **structured bench design-review sessions with two special-education teachers scoring each interaction against the fourteen-point classroom checklist they already use, with no child present by design (autism toys)** · **hand-labelling survey clips to ground truth with two labellers, scoring the model against them, plus timed gate observation of what riders do on approach (triple riding)** · **unprompted distance-observation trials — flying the airframe past people who had not been told what to expect, at set distances, and asking what they were looking at (ornithopter)** · **freezing each of three hand-maintained ceremony artefacts at the moment its own ceremony ended and diffing it row by row against the task record it described, across six sprints — measuring drift rather than asking anyone how the meeting felt (Scrum ecosystem)** · **counting, for every docketed action over twelve months, the distinct places a person must open to answer “what is owed here, by whom, by when” — walked and timed separately for the founder, for counsel and for the programme owner, because the three returned different answers (patent program operations)**

### §05 disagreement — 23 pages, 23 different stakeholders:

CTO (permissions) · VP Sales (bundling) · RTL engineering lead (shared stage model) · compliance lead (indexing recordings) · IT security admin (credential scope) · patent paralegal (derived workbook) · engineering director (working vs calendar days) · AMS delivery manager (machine-written root causes) · PMO lead (write-back) · engineering manager (hiding bot edits) · documentation owner (register as gate) · CTO (one model for planner and reviewer) · finance controller (approval stages) · **post-silicon validation lead (ship with documented errata vs hold for a respin — YR23)** · **COO (committing a second product line’s build plan on gen-1 demand signal — NFE2001)** · **hardware lead (publishing schematic and layout vs guarding the electrode know-how — reference designs)** · **test/ATE lead (cutting the test program against per-unit test time at volume — YR31)** · **founder (gen-2 for the documented pipeline vs a gen-1 derivative for a new segment — NFE3001)** · **metrology/calibration owner (traceability of a synthesised stimulus: a lab that signs findings cannot feed its calibrated instruments an uncertified signal — SLB sensor generator)** · **channel installer partner (a prerequisites list that turns a plug-and-play cabinet into an IT project his electricians cannot commission — WishKey)** · **sourcing lead (single-source supply risk on a fourteen-week-lead display: not which part is best, but what the product does the day that part is unavailable — smart watch)** · **staff acoustics consultant (a per-unit trim calibrates the printed number, not the microphone: a capsule wrong in response shape can be trimmed into spec and still sound wrong — condenser microphone)** · **campus security office (data custody, not accuracy: footage of students processed into records of who did what makes the office the party answering for it, and they had not agreed to hold anything — triple riding)** · **head of people operations (a per-person blocker log, retained and searchable, is a performance record whatever it is called, and she is the one who would have to defend it in an appraisal; reframed by changing what exists rather than who may see it — ceremony state keyed to the task with no person row in the schema — and conceding no per-person export of any kind plus a ceremony archive visible to every member of a squad rather than to its lead, so anyone who can be measured can read the measure — Scrum ecosystem)** · **outside counsel’s docketing partner (docket-of-record liability: a startup system deriving dates from email creates a second source of truth the firm cannot indemnify; reframed so the system computes no statutory date at all and mirrors the firm’s docket as sole authority, conceding a visible provenance stamp on every date, visually distinct internal dates, and no automated reminder without the firm’s own date attached — patent program operations)**

A new §05 needs a **different role, a different legitimate concern, a reframe rather than a win, and a concession you did not plan to give.**

### Metric tiles — no two pages share a set

Fit the tiles to the domain. A dev kit and an internal platform do not share KPIs:

- **Dev kit / silicon product** — kits shipped, design-ins, eval-to-design conversion, time-to-first-link, support tickets per kit, RMA rate, interop pass rate, power or latency
- **Silicon validation / bring-up** — bring-up time, test escapes, yield deltas, regression coverage
- **Internal software** — weekly actives as a fraction of headcount, time-to-X before/after, a named guardrail
- **Customer testing** — pilot n, task success against pre-agreed thresholds, the kill gates

### §04 hardest cut — 23 pages, 23 different cuts

Each names what was cut, why it failed on a stated constraint, and **what handled the gap instead**. Never "we ran out of time."

Most recent: **the retrospective board, cut from the Scrum ecosystem** — the one cut in the ledger made on a *social* constraint rather than an engineering or ethical one: a retrospective works because people say things in it they would not put in the tool of record, and the problem with a retro board inside that tool is not who can read it but that anyone might, which no permissions arrangement fixes. Covered by keeping retros in an anonymous document outside the system with only action items returning as tasks; the honest cost is that the ceremony most often quietly abandoned is now the only one the product cannot see being abandoned. Before that: **machine-drafted claim language, cut from patent program operations** — it fails two stated constraints (anything a model proposes becomes part of the record of what the applicant considered, and a wrong claim scope is unrecoverable once filed), but the reason it was actually stopped is sharper: **drafting was never the bottleneck.** Attorney turnaround ran in days while inventor input ran in weeks, so automating the fast half of a slow process was the most expensive available way to find the queue. Covered by structured disclosure capture that front-loads the fields counsel asks for anyway, plus a prior-art shortlist that is cited and never written; the honest cost is that legal spend does not move at all, only the schedule does. **Distinct from AI Lawyer**, which is the same subject cut for a different reason — that page stopped a built prototype on a measured recall bar, this one declined to build on bottleneck evidence. Before that: **the number-plate and enforcement pipeline, cut from triple riding** — the first cut in the ledger made on **ethical rather than engineering grounds**: once a plate is extracted a count becomes an automatic accusation about a named student, with no appeal path and a detector 41% accurate after dark, built by a team with no mandate to hold that data. Covered by shipping counts only, with no identifiers extracted and no live camera input; the honest cost is that the tool cannot deter anyone, only measure. Before that: **the matched-pair product, cut from the condenser microphone** — a SKU cut rather than a feature cut: the per-unit trim makes two microphones agree at 1 kHz and says nothing about 8 kHz or thirty degrees off axis, which is what a stereo pair is for. Selling pairs honestly needed a second rejection criterion on response shape plus inventory held while each unit waits for a partner. Covered by shipping singles only; the honest cost is being locked out of every buyer recording in stereo. Before that: **the colour screen, cut from the smart watch** — the tier-defining cut, and what it actually removed was the shop-window demo: a reflective display loses in a lit retail cabinet and wins for the two years afterwards. It failed no engineering constraint; it failed the moment of sale, and was taken anyway because it buys the display line and the battery line at once. Covered by a printable nine-day battery claim against a tier that claims a week and delivers three days; the honest cost is that the argument now lives on the box and in reviews, never in the buyer's hand. Before that: **fingerprint authentication, cut from WishKey v1** — failed on the population rather than on schedule: shift workers and contractors with dirty, wet, damaged or gloved fingertips make a false reject at the cabinet route people to the mechanical override, which is the behaviour the product exists to remove. Covered by employee RFID card plus PIN and the one-time anti-smash seal; the honest cost is that the trail attributes to a card and a PIN, not to a face. Before that: **closed-loop tool emulation, cut from the SLB sensor signal generator** — not a schedule constraint but a requirements one: a loop introduces its own dynamics, so the same fault does not land the same way twice, and the analyst needed repeatability more than realism. Covered by open-loop playback of catalogued fault signatures, with genuine loop behaviour still tested on a rig; the honest cost is that multi-fault interactions stay outside the bench and outside the 56. Before that: **operation through fully conductive enclosures, cut from XA-NFE3001** — not a schedule constraint but a physics boundary; a second inductive front end would have cost die area, a second validation campaign and the RF-silent property itself. Covered by enclosure-material guidance, an aperture pattern in the reference layout, and a datasheet statement that a Faraday cage is out of scope. Before that: **a backward-compatible gen-1 energy mode, cut from YR31** — two separately tuned analogue front ends multiplied the characterisation matrix the same spin had just reduced; covered by interop parity plus keeping YR23 in production. Before that: **a third (medical patient-monitoring) reference design, cut** — failed on isolation-characterisation lead time and on support capacity, since every active design carries a permanent applications cost; covered by an application note plus the dev kit serving that segment. Before that: **runtime-adjustable range, cut from XA-NFE2001** — failed on validation capacity split against the concurrent BAN program, since every extra range setting multiplies the interop matrix; covered by three profiles characterised at provisioning time. Before that: **on-die link encryption, cut from YR23 first silicon** — failed on die area against a closed floorplan and a validation matrix with no bench hours before the committed tapeout; handled by the physical-containment security position plus host-side encryption in the reference driver.

---

## 8. Remaining candidates

Everything below is card-only today. `portfolio-decisions.md` §5 caps full case studies at four; this portfolio already runs 17 under an explicit override, so **adding more is a deliberate choice, not a default.**

### Strongest candidates — the production tier is the thin spot

All ten production projects are hardware, and only the dev kit is written up. Production is the tier reviewers probe hardest.

| Project | Status | What exists to build from |
|---|---|---|
| ~~Wi-R BAN — YR23~~ | — | **Written.** `wi-r-ban-yr23`, production, `pareto` at §08. Its figures now constrain the YR31 page: 0.12 nJ/bit at 5 Mbit/s, 16 devices, sub-1 ms, no respin, 4 pre-dev-kit design-ins. |
| ~~Wi-R NFE — XA-NFE2001~~ | — | **Written.** `wi-r-nfe-xa-nfe2001`, production, `heatmap` at §08. Opens the NFE line and constrains XA-NFE3001: 5 Mbit/s, <1 mW, 5–25 cm across three provisioning-time profiles, sub-1 ms, launched Dec 2025, positioned against NFC. |
| ~~Wi-R BAN — YR31~~ | — | **Written.** `wi-r-ban-yr31`, production, `diverging` at §08. The iteration page: picks up YR23’s own deferred list (higher rate, on-die trim) and states the energy-per-bit regression openly. **Note:** ixana.ai shows YR31 as *In Testing* while the card says production — resolve before publishing. |
| ~~Wi-R NFE — XA-NFE3001~~ | — | **Written.** `wi-r-nfe-xa-nfe3001`, production, `thresholdCurves` at §08. Market-pulled gen-2: specified from partner requirement sheets, not a roadmap. **Note:** the public announcement says *now sampling*, GA unannounced, while the card says production — resolve with the YR31 status question. |
| ~~Wi-R reference designs~~ | — | **Written.** `wi-r-reference-designs`, production, `stackedHBar` at §08. The system-level page: sits on both chip lines and cross-references the dev-kit design-in figure explicitly (six of the same nine) rather than inventing a parallel count. |
| ~~WishKey~~ | — | **Written.** `eegrab-wishkey`, production, `marimekko` at §08. Physical/asset-security product; the only page whose §08 chart weights its columns, because site classes differ tenfold in keys held. Architecture is staging-sourced from the brochure and the slot-controller board photo (per-slot EMLOCK + FET + feedback). Evidence array cites two live public EEGRAB URLs (brochure, demo video). |
| ~~Sensor signal generator (SLB)~~ | — | **Written.** `slb-sensor-signal-generator`, production, `waffle` at §08. Internal-customer page: the buyer is SLB's own 40+ failure-analysis labs, so §01 argues tool availability rather than revenue. Owner ground truth carried unchanged — 98.2% (defined as 55 of 56 catalogued fault modes), 40+ labs. Config cites only what the bench photography supports. |
| ~~Cost-effective smart watch~~ | — | **Written.** `eegrab-smart-watch`, production, `trajectory` at §08. Cost-down consumer page: the §08 chart is the only one in the portfolio that draws a route rather than a state, using the four real board revisions. Architecture is staging-sourced from the rev 1.0 schematic and board views (nRF52840-QFAA-F-R7, six-axis IMU, both crystals, discrete antenna network); display, PPG, battery and charger appear on the sheet only as net labels, so they are described by function with **no part number claimed**. No public page — no `evidence` array. |
| ~~Condenser microphone~~ | — | **Written.** `eegrab-condenser-microphone`, production, `strips` at §08. Spine is **unit-to-unit variance**, deliberately not cost, because the smart-watch page owns the cost-down thesis: §02 measures the incoming capsule population rather than any competitor, and the §04 cut is a SKU (matched pairs) rather than a feature. Circuit is staging-sourced from the rev 1.0 sheet (1:5 transformer, output trim, component values); capsule spec and all figures invented. No public page — **no `evidence` array**, second page in the portfolio with none. |

**Caution on these — partly lifted.** The original caution was that these had photography and public pages but no descriptive content, making a production page ~95% invention. `app/Changes/ixana-staging/` now supplies real public specifications, comparison figures and imagery, so the technical spine of these pages can be sourced rather than invented. What survives: the *program* story — schedule, team, escapes, design-ins, disagreements — is still invention, so label it in `confidentiality` and `sampleNote` as the YR23 page does. And do **not** invent a named customer. Name a plausible segment ("a hearables OEM", "an AR-wearables maker") and lean on the public datasheet pages as the verifiable artifact.

**Consistency chain.** YR23 is written and anchors the BAN line. YR31 must not contradict it: YR23 is 100 kbit/s–5 Mbit/s at 0.12 nJ/bit, sub-1 ms, 16 devices, no respin; YR31's public spec is up to 20 Mbit/s at 0.2 nJ/bit, sub-0.2 ms. The dev-kit page sits downstream of both and is protected — read it, never edit it.

### Others with usable substance

| Project | Status | Note |
|---|---|---|
| AI Salary Generator | customer-testing | The only other pilot; would need its own kill gates, and the customer-testing variant is already used once |
| ~~Scrum ecosystem~~ | — | **Written.** `ixana-scrum-ecosystem`, internal, 9 sections, 6 tiles, 997 words, `gapArea` at §08, voice `I`. The collision risk with the Gantt/multi-view page was resolved by inverting its central rule rather than repeating it: that page is **read-only permanently**, this one is **write-narrow** — four fields, one allow-list module, an open write ledger — and §03 states the contrast explicitly. §02 measures drift (218 rows, 61 disagreements) instead of shadowing meetings, which the multi-view page owns. Five screenshots are recreations of a working demo at `/demo/scrum-desk`, generated from the same invented sprint the demo runs, so the page and the demo cannot drift apart; `evidence` cites the demo. |
| ~~In-house meeting notetaker~~ | — | **Written.** `ixana-meeting-notetaker`, internal, `stackedHBar` at §01, `waffle` at §02, `groupedHBar` at §08 (moved off `barsThreshold`, which the Task change audit trail page owns). Separated from the Video library page by scope, not by subject: that page owns **retrieval** across the archive, this one owns **how the record gets made** — build-vs-buy under a data-residency constraint, the capture path, and what generated minutes may claim. §01 shares the Video library's estate size (212 recordings, Jan 2026) rather than inventing a parallel one; every other figure is new and does not restate that page's (5m50s→90s, 70% transcript entry, 11% published minutes). §05's disagreement is with the head of engineering over buying the vendor product — deliberately not the compliance lead, who owns the disagreement on the Video library page. Four screenshots of the running demo at `/meetingrecordings`. **Rule held on this page: every image is the state its own link opens** — the §06 shot is the untouched landing state of `?tab=notes`, and the three gallery tiles are the note scrolled, the library, and a `?q=` link that arrives already answered. The player gained `?tab=` and `?q=` for this, both read on mount rather than through `useSearchParams`, which would put the route behind a suspense boundary at build. |
| Soil mineral estimation (IIRS-ISRO) | internal | Genuinely distinct domain; remote sensing has its own KPI vocabulary |
| Ornithopter | prototype | Distinct domain, honest "never went to an operator" story |
| ~~UAV weather radar calibration~~ | — | **Written.** `ricky-kids-uav-weather-radar-calibration`, research, 7 sections, 4 tiles, `tornado` at §08, voice `we`. First page whose finding is **negative**: the method fails its own pre-agreed pass mark as proposed, and the value is that it failed cheaply. Staging is unusually rich (ISRO proposal YS/PD-IP/318, April 2022) so the config block and cited literature are fully staging-sourced; the error budget itself is an invented worked illustration — **no flights were ever conducted**, stated in `meta.stage`. Three live public evidence URLs. |
| ~~COVID monitoring~~ | — | **Written.** `ricky-kids-noncontact-covid-monitoring`, research, 7 sections, 4 tiles, `statusGrid` at §08, voice `we`. **Framed strictly as an engineering feasibility study — no diagnostic or clinical claim anywhere, audited.** The finding is conditional against the project's own premise: two of four parameters are reachable without contact, and the two that are not are the escalation ones. Staging is rich (paper, deck, patent disclosure, contact-monitor photo). Note: the card says "thermal and radar pair" but **no radar appears anywhere in staging** — the config block says so explicitly and names no sensor part numbers. |
| ~~Sludge ROV~~ | — | **Written.** `ricky-kids-sludge-traversing-rov`, research, 7 sections, 4 tiles, `bands` at §08, voice `we`. Negative finding taken from the card verbatim (traction fails below a density threshold) and reconciled with staging, which shows a **buoyant** vehicle — the finding is what caused the design. Two genuine SolidWorks figures carved from the project paper; config block is fully staging-sourced with real part numbers. **No evidence array** — both cited sources fail to resolve (CPHEEO times out, ResearchGate 403). Real anchor: La Trobe Technology Infusion Grand Challenge 2021-22, letter of support dated 27 Jan 2022, owner named team Leader. |
| ~~Ornithopter for surveillance~~ | — | **Written.** `srm-uav-ornithopter-for-surveillance`, **prototype (status from the card)**, 7 sections, 4 tiles, 699 words, `sequence` at §08, voice `we`. SRM UAV club era, kept at Q3 2021 – Q2 2022 so it sits inside the student era and does **not** add to the 2023 employer overlap flagged in the reconciliation pass. Thesis is platform-and-pitch, deliberately distinct from the ricky-kids radar-cal page (a method study): different customer, evidence method, tile vocabulary and chart. **DRDO pitch stated as fact; no response claimed anywhere, because none is recorded.** **Empty evidence array** — no public URL exists and none was fabricated. |
| ~~Triple riding avoidance~~ | — | **Written.** `ricky-kids-triple-riding-avoidance`, **internal (status read from the card — not research/prototype as the prompt expected)**, so the **full 10-section skeleton applies** and it appends §04 and §05 to the ledger unlike the other Ricky Kids pages. `confusion` at §08, 6 tiles, 998 words, voice `we`. Thesis is detection-vs-deterrence: the paper describes a full enforcement pipeline, the card says what it became — an internal survey-scoring tool. **No footage, frame, face or plate published**, and an `Identifiers extracted: 0` tile carries that onto the metric strip. |
| ~~Toys for autistic kids~~ | — | **Written.** `ricky-kids-toys-for-autistic-kids`, **prototype (status read from the card)**, 7 sections, 4 tiles, 699 words, `radar` at §08, voice `we`. **Vulnerable-group guard applied and audited**: zero affirmative clinical, therapeutic or efficacy claims (every occurrence of those words is a negation), no child took part, and a `0 — Sessions with children` tile carries the never-went-to-users line onto the metric strip. Educators are the entire evidence base. Named individuals and the care centre are deliberately not named. Real: prototype photo, hardware, SRM Project Expo 10 Dec 2021, IUCEE runner-up. |
| ~~ENVI-City~~ | — | **Written.** `ricky-kids-envi-city`, **research (status read from the card)**, 7 sections, 4 tiles, `intervals` at §08, voice `we`. The page **audits the team’s own published paper**: 11 claims narrowed to 1 testable at block scale, with the cell-tower/bird claim dropped as correlation without mechanism. **Only Ricky Kids page with real public evidence** — ECS Transactions 107(1) 11007 (2022), DOI verified live. Poster published with a personal email redacted. |
| ~~Carbon positive e-car~~ | — | **Written.** `ricky-kids-carbon-positive-ev`, research, 7 sections, 4 tiles, `waterfall` at §08, voice `we`. The page **interrogates its own title**: carbon positive is unreachable because nothing on the vehicle removes CO₂, and the onboard turbine harvests drag the motor already paid for. Card ground truth (answer turns on grid mix) is the surviving conditional claim. Two of the team’s own annotated system diagrams published; carbon model invented but the two physics conclusions are not, and `sampleNote` says which is which. **No evidence array** — no public page exists. |

### Leave as cards

The 17 `null`-status engineering items (Vyorius, MSME, IIT Hyderabad coursework) are exactly what `null` exists for. `portfolio-decisions.md` §7 asks you to audit the 58 for coursework and cut it — these are the candidates for removal, not for case studies.

---

## 9. Decisions already made

Carry these forward rather than relitigating them:

1. **Depth cap overridden.** The spec's four-case-study maximum was deliberately exceeded to 17. Any future trim should keep Dev kits (only production, public evidence), Ixana-Wiki (the reference), Procurement (only customer-testing, carries the kill gates) and AI Lawyer (the only page that says "we stopped").
2. **Three status re-maps**, each justified by the project's own text: AI Lawyer internal→prototype, Procurement internal→customer-testing, Quantum research→prototype.
3. **No named customers** anywhere. Segments only.
4. **Individual silicon parts stayed cards** — see the caution above.
5. **`.cs2` is dark-only**, matching the existing `.cs-page`. If case studies should follow the light/dark toggle, both need doing together.
6. **Years were invented** for 17 previously-undated items, inferred from the career arc. Correct them when you know the real ones.

### Open items

- **The killed project.** `portfolio-decisions.md` §7 asks how it files under the five-status scheme. There is no killed project on the grid and no `killed-project-case-study.html` in the repo. **Do not invent a sixth status.** AI Lawyer is closest in spirit, filed as `prototype` with the kill reason stated plainly.
- **Recreated screens.** 15 of 17 §06 blocks use `placeholder` text naming what belongs there. Only the dev kit uses real photography.
- **Patents.** §4.5 calls a linked patent the strongest artifact a hardware PM has. None are in the repo. If any exist, link them in the header `evidence` array.
- **Header count mismatch.** `work-header.tsx` says "Three shipped commercially" while ten cards read "In production." One of the two is wrong.

---

## 10. How to add a case study, and how to check it

1. Write the entry into `data/case-studies-v2.json`, keyed by slug.
2. Add or update the matching object in `app/work/constants.ts` so the card carries `slug: '<the same slug>'`.
3. Confirm every `image` path in `shot` and `arch` blocks exists under `public/`.
4. Run both checkers:

```bash
npm run verify:work                   # runs both of the below
node scripts/verify-cards.js          # card completeness, sort order, slug wiring
node scripts/verify-case-studies.js   # sections, bands, thresholds, guardrails, differentiation
```

A third script lists the grid by status, useful for deciding what to write next:

```bash
npm run work:status                   # or: node scripts/work-by-status.js production --outcomes
```

`verify-case-studies.js` enforces: sequential numbering · correct sections dropped per status · correct §08 heading · three summary paragraphs · meta field order · confidentiality line · sample footer · exactly one config block · exactly one arch block, inside §09 · every arch image resolves · one shot block with 3–4 callouts · a pre-agreed threshold · a named guardrail · a "how we counted" definition on full pages · research limitation · prototype "never went to users" · correct tile count · and the four differentiation axes.

5. `npx tsc --noEmit` and `npx biome check` on the files you touched.
6. Start the app (`npm run dev`) and load `/work/<slug>` — expect a 200 and the right section count.

### Word counts

Bands in §4 are **narrative prose only**: summary text, section `body`/`after`, `para` blocks, `decisions` items, `definition` text. Tables, scope lists, doc excerpts, callouts and figure captions are excluded. The checker uses this definition.

Calibration: the reference page scores **879** under it, squarely inside its 800–1,000 internal band. If a new page measures 1,300, it is genuinely long — trim §04, §05, §08 and the summary first, which is where length reliably accumulates.

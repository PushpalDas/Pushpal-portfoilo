# AUDIT STATE

> **Handoff note:** PERCEPTION PASS (P6–P10) COMPLETE, on top of the completed launch audit.
> All six QA gates pass; AUDIT/PERCEPTION-READINESS.md is the final report and
> AUDIT/INTERVIEW-BRIEF.md is the author's rehearsal document (with [FILL] slots for real
> numbers). Deliverables: CLAIMS-AUDIT.md (A/B/C for all 37, zero C in headlines),
> IA-MAP.md (tiers + flagship rationale), the program page /work/ixana-internal-ai-program,
> the fast layer on all 36 long-form pages, unified Data notes, ownership-first role rows,
> the About role narrative. Guardrail sweep: zero disclosures weakened (string-diff proven).
> Build clean; tree committed. Remaining human actions: the AUTHOR-CONFIRM lists in
> PERCEPTION-READINESS.md + LAUNCH-READINESS.md (AC-XANA push first).

## Session protocol
Read this file, then FINDINGS.md and CHANGELOG.md, before touching anything. Resume at the first
unchecked item. Update this file after every project. Formats and rules live in the task brief
(§0–§12); source-of-truth map in §3; tiers in §4.

## Phase 0 inventory (2026-08-31)

- **Case-study sources:** `app/work/constants.ts` (cards: title, positioning, outcome, image, slug)
  and `data/case-studies-v2.json` (14k lines, long-form bodies). `data/case-studies.json` is the
  older v1 — check whether still rendered before editing. Export map: `PRODUCTS-FULL.md`
  (product N at the line numbers listed below).
- **Demos:** 16 self-contained HTML files in `public/demo/*.html`, exposed at clean `/demo/<slug>`
  paths via rewrites in `next.config.ts` (all 16 registry demos wired; `/demo/ams-dashboard`
  redirects to `/demo/team-performance`). ENVI-City demo (P37) does not exist yet — to create.
- **Papers:** `public/papers/` — 6 PDFs (ricky-kids ×5, srm-uav ornithopter). All present.
- **Docs:** `public/static/docs/neuroadapt-whitepaper.pdf` present.
- **Snapshot/card images:** `image:` fields in constants.ts → `public/static/images/project/`.
  NOTE: most card images are `Gemini_Generated_Image_*.png` (AI illustrations), not screenshots
  of live surfaces. Phase 3 must decide per-page which images claim to be snapshots.
- **PRODUCTS-FULL.md section offsets:** P1:68 P2:244 P3:418 P4:591 P5:718 P6:888 P7:1015 P8:1191
  P9:1361 P10:1378 P11:1495 P12:1683 P13:1853 P14:2020 P15:2173 P16:2343 P17:2512 P18:2679
  P19:2846 P20:3008 P21:3167 P22:3349 P23:3509 P24:3647 P25:3829 P26:3990 P27:4210 P28:4375
  P29:4537 P30:4689 P31:4825 P32:4969 P33:5119 P34:5259 P35:5422 P36:5567 P37:5717 Appendix:5850.
- **Build:** PASSES (exit 0) after moving app/Changes scratch out of the route tree and excluding scratch dirs from tsconfig type-check. `.next/dev` coupling to a stale dev server was the final blocker (dev server killed; see handoff).
- **Uncommitted work warning:** the repo has extensive uncommitted changes on branch
  `feat/work-highlights` predating this audit (see git status). Do not revert them; audit the
  working tree as-is.

## Checklist — 37 projects × phases
Legend: ph1 = case-study rubric audit + arithmetic + open-Qs; ph2 = demo alignment/parity;
ph3 = snapshot alignment; ph4 = redesign (tier B/C only). ⬜ pending · ✅ done · ➖ n/a ·
⏳ pending-recapture.

| # | Project | Tier | ph1 | ph2 | ph3 | ph4 | notes |
|---|---|---|---|---|---|---|---|
| P0 | Inventory & scaffolding | — | ✅ | | | | |
| 1 | Wi-R BAN YR31 | A-lock | ✅ | ✅ | ✅ | ➖ | open Qs: 63↛67 sum; 6% interop gap |
| 2 | Wi-R Dev Kits | A-lock | ✅ | ✅ | ✅ | ➖ | open Qs: apps-eng 3 vs 1; ticket count |
| 3 | Ixana-Wiki | A-lock | ✅ | ⬜ | ⬜ | ➖ | external xana-nine; headcount open Q |
| 4 | Dāsa | A-lock | ✅ | ✅ | ✅ | ➖ | YouTube walkthrough |
| 5 | Wi-R BAN YR23 | A-lock | ✅ | ✅ | ✅ | ➖ | blocking-at-triage open Q |
| 6 | NeuroAdapt | C-bespoke | ✅ | ✅ | ✅ | ✅ | |
| 7 | Wi-R NFE XA-NFE3001 | A-lock | ✅ | ✅ | ✅ | ➖ | |
| 8 | Wi-R NFE XA-NFE2001 | A-lock | ✅ | ✅ | ✅ | ➖ | verify arXiv |
| 9 | Soil mineral estimation | D-gap | ✅ | ➖ | ✅ | ➖ | card-only, no slug |
| 10 | Quantum Gate Simulator | C-bespoke | ✅ | ✅ | ✅ | ✅ | |
| 11 | Procurement Orchestrator | B-ixana | ✅ | ✅ | ✅ | ✅ | 23/21/2; ?view=gates&as=priya |
| 12 | WishKey KMS | A-lock | ✅ | ✅ | ✅ | ➖ | |
| 13 | Wi-R reference designs | A-lock | ✅ | ✅ | ✅ | ➖ | 2 Vimeo links |
| 14 | Smart watch (EEGRAB) | A/D-gap | ✅ | ➖ | ✅ | ➖ | missing evidence link |
| 15 | Team performance reporting | B-ixana | ✅ | ✅ | ✅ | ✅ | 5 teams × 3 windows |
| 16 | Scrum ecosystem | B-ixana | ✅ | ✅ | ✅ | ✅ | sprint day 6 |
| 17 | Flow Tracker | A-lock | ✅ | ⬜ | ⬜ | ➖ | population-denominator open Qs |
| 18 | ClickUp Activity Tracker | B-ixana | ✅ | ✅ | ✅ | ✅ | ?q=Aug+14; view=feed |
| 19 | Video library | A-lock | ✅ | ⬜ | ⬜ | ➖ | ?q=milliwatts etc. |
| 20 | Calendar sync | D-gap | ✅ | ➖ | ✅ | ➖ | propose Tier-B demo |
| 21 | AI Salary Generator | B-ixana | ✅ | ✅ | ✅ | ✅ | 7 reqs: 3 banded, 4 refused |
| 22 | AI product planning OS | B-ixana | ✅ | ✅ | ✅ | ✅ | 41 briefs etc. |
| 23 | AI Lawyer | B-ixana | ✅ | ✅ | ✅ | ✅ | 507 tests; wrong-art refusal |
| 24 | ClickUp reporting + Gantt | B-ixana | ✅ | ✅ | ✅ | ✅ | pinned Wednesday; view=delays |
| 25 | Meeting notetaker | A-lock | ✅ | ⬜ | ⬜ | ➖ | |
| 26 | Patent program ops | A-lock | ✅ | ⬜ | ⬜ | ➖ | 18 matters / 6-of-15 |
| 27 | Document change intelligence | A-lock | ✅ | ⬜ | ⬜ | ➖ | |
| 28 | Condenser microphone | A/D-gap | ✅ | ➖ | ✅ | ➖ | |
| 29 | Sensor signal generator | D-gap | ✅ | ➖ | ✅ | ➖ | |
| 30 | Ornithopter | C-bespoke | ✅ | ✅ | ✅ | ✅ | 24-sightings open Q; ?preset=flew |
| 31 | Carbon positive e-car | C-optional | ✅ | ➖ | ✅ | ⬜ | propose only |
| 32 | Radar calibration | C-bespoke | ✅ | ✅ | ✅ | ✅ | 5 terms, 1.5 dB |
| 33 | COVID monitoring | C-bespoke | ✅ | ✅ | ✅ | ✅ | campuses 3-vs-4 |
| 34 | Triple riding avoidance | C-bespoke | ✅ | ✅ | ✅ | ✅ | privacy invariant |
| 35 | Autism toys | C-bespoke | ✅ | ✅ | ✅ | ✅ | 105-vs-78 open Q |
| 36 | Sludge ROV | C-bespoke | ✅ | ✅ | ✅ | ✅ | 1.15 vs 1.18 threshold |
| 37 | ENVI-City | C-create | ✅ | ⬜ | ✅ | ✅ | demo to be created |
| — | Appendix (17 builds) | A-lock | ✅ | ➖ | ➖ | ➖ | copy-edit only |
| P5 | QA gates + LAUNCH-READINESS.md | — | ✅ | | | | |


## Perception pass — P6 Curation · P7 Calibration · P8 Role · P9 Skim · P10 QA
Legend: ✅ done · ⬜ pending · ➖ n/a. P7 covers card+deck+Result calibration & data-note unification;
P9 covers fast header/pull line/verify strip/section nav (Tier 1–3 pages).

| # | Project | Tier (P6) | P7 | P8 role row | P9 | notes |
|---|---|---|---|---|---|---|
| 1 | Wi-R BAN YR31 | 1 Flagship | ✅ | ✅ | ✅ | |
| 2 | Wi-R Dev Kits | 3 | ✅ | ✅ | ✅ | |
| 3 | Ixana-Wiki | 1 Flagship | ✅ | ✅ | ✅ | |
| 4 | Dāsa | 1 Flagship | ✅ | ✅ | ✅ | §3.2 worked example |
| 5 | Wi-R BAN YR23 | 3 | ✅ | ✅ | ✅ | |
| 6 | NeuroAdapt | 3 | ✅ | ✅ | ✅ | |
| 7 | NFE XA-NFE3001 | 3 | ✅ | ✅ | ✅ | |
| 8 | NFE XA-NFE2001 | 3 | ✅ | ✅ | ✅ | arXiv = A |
| 9 | Soil mineral | 4 Archive | ✅ | ➖ | ➖ | card-only |
| 10 | Quantum Simulator | 3 | ✅ | ✅ | ✅ | prototypes label |
| 11 | Procurement | 2 chapter | ✅ | ✅ | ✅ | |
| 12 | WishKey | 3 | ✅ | ✅ | ✅ | |
| 13 | Reference designs | 3 | ✅ | ✅ | ✅ | |
| 14 | Smart watch | 3 | ✅ | ✅ | ✅ | |
| 15 | Team performance | 2 chapter | ✅ | ✅ | ✅ | |
| 16 | Scrum ecosystem | 2 chapter | ✅ | ✅ | ✅ | |
| 17 | Flow Tracker | 1 Flagship | ✅ | ✅ | ✅ | |
| 18 | Activity Tracker | 2 chapter | ✅ | ✅ | ✅ | |
| 19 | Video library | 2 chapter | ✅ | ✅ | ✅ | |
| 20 | Calendar sync | 2 chapter | ✅ | ✅ | ✅ | |
| 21 | Salary Generator | 2 chapter | ✅ | ✅ | ✅ | |
| 22 | Planning OS | 2 chapter | ✅ | ✅ | ✅ | |
| 23 | AI Lawyer | 1 Flagship | ✅ | ✅ | ✅ | prototypes label |
| 24 | ClickUp Gantt | 2 chapter | ✅ | ✅ | ✅ | |
| 25 | Meeting notetaker | 2 chapter | ✅ | ✅ | ✅ | |
| 26 | Patent ops | 2 chapter | ✅ | ✅ | ✅ | |
| 27 | Doc intelligence | 2 chapter | ✅ | ✅ | ✅ | |
| 28 | Condenser mic | 3 | ✅ | ✅ | ✅ | |
| 29 | Signal generator | 3 | ✅ | ✅ | ✅ | promoted to Tier 3 (full CS, two real figures) |
| 30 | Ornithopter | 3 | ✅ | ✅ | ✅ | |
| 31 | Carbon e-car | 3 | ✅ | ✅ | ✅ | |
| 32 | Radar calibration | 3 | ✅ | ✅ | ✅ | |
| 33 | COVID bench | 3 | ✅ | ✅ | ✅ | |
| 34 | Triple riding | 1 Flagship | ✅ | ✅ | ✅ | |
| 35 | Autism bench | 3 | ✅ | ✅ | ✅ | |
| 36 | Sludge ROV | 3 | ✅ | ✅ | ✅ | |
| 37 | ENVI-City | 3 | ✅ | ✅ | ✅ | |
| P2pg | Internal AI program page | 2 head | ✅ | ✅ | ✅ | NEW page to write |
| — | Appendix | 4 | ➖ | ➖ | ➖ | stays as-is |
| QA | P10 gates + PERCEPTION-READINESS | — | ✅ | | | |

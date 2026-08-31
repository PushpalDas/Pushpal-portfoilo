# PORTFOLIO ELEVATION RUN — MASTER PROMPT

> Paste this entire file as the task prompt for the agent in Antigravity.
> It is model-agnostic by design: **Claude Fable 5 runs it first; if the session ends, hits a token/context limit, or is interrupted, Claude Opus 5 (or any successor session) resumes it with zero rework** via the state protocol in §0. Save a copy at the repo root as `ELEVATION-MASTER-PROMPT.md` so any resuming agent can re-read it.

---

## 0. SESSION BOOTSTRAP & MODEL HANDOFF PROTOCOL — READ AND EXECUTE THIS BEFORE ANYTHING ELSE

You are the **Elevation Agent** for this repository. You may be Claude Fable 5 starting fresh, or Claude Opus 5 (or a later session of either) resuming mid-run. The run must survive any number of handoffs. Your first action in every session, without exception:

```
1. Check whether AUDIT/ELEVATION-STATE.md exists.
2. If it does NOT exist  → FRESH START: create it from the template in §0.2, then begin Phase 0 (§8).
3. If it DOES exist      → RESUME MODE:
   a. Read AUDIT/ELEVATION-STATE.md in full — especially CONTEXT CAPSULE and NEXT_ACTION.
   b. Run `git log --oneline -10` and `git status` to confirm the last checkpoint matches the state file.
   c. If they disagree, trust the working tree + git; correct the state file first.
   d. Execute NEXT_ACTION. Do not restart completed work. Do not re-plan from scratch.
```

Never announce "I am a different model, let me start over." The state file is the single source of continuity; your model identity is irrelevant to the run.

### 0.1 Checkpoint discipline (this is what makes the handoff lossless)

- **Work in atomic units.** One unit = one project's case study, one demo, one verifier fix, one audit pass over one group. A unit must be completable within a single response. Never begin a unit you cannot finish in the current response.
- **After every completed unit:** (1) run the relevant QA gate from §9; (2) `git add -A && git commit -m "elevate(<slug|area>): <what>"`; (3) update `AUDIT/ELEVATION-STATE.md` — ledger row → `done`, refresh `NEXT_ACTION`, refresh the CONTEXT CAPSULE.
- **Never leave a file half-edited across a checkpoint.** If an edit cannot be finished, revert it before ending the turn and mark the ledger row `blocked` with the reason.
- **Low-context behavior:** if the transcript is getting long or you have just done large file reads, do not start a new unit. Finish the current one, commit, update state, and end your turn with exactly: `CHECKPOINT — state saved. Resume with NEXT_ACTION in AUDIT/ELEVATION-STATE.md.` The next session (any model) picks up from there.
- **Context economy:** never load `data/case-studies-v2.json` (867 KB) or `PRODUCTS-FULL.md` (585 KB) wholesale. Operate per-slug: use `node -e` / `jq` to extract, edit, and write back one entry at a time. Read demos one file at a time. Re-read only the sections of `PORTFOLIO-ANALYSIS.md` for the project currently in scope.

### 0.2 State file template — create verbatim at `AUDIT/ELEVATION-STATE.md`

```markdown
# ELEVATION RUN — STATE
Last updated: <ISO datetime> · Session: <n> · Model: <name> · Branch: <branch>

## CONTEXT CAPSULE (≤ 12 lines — a fresh model reads ONLY this + NEXT_ACTION to re-orient)
- Mission: elevate this sample mid/senior PM portfolio to a global 10/10 benchmark per ELEVATION-MASTER-PROMPT.md.
- Ground truth: PORTFOLIO-ANALYSIS.md (content), PROJECT-REFERENCE.md (code), app/Changes/portfolio-decisions.md (spec — wins conflicts).
- Current phase: <0–6> — <phase name>
- Done so far: <one line per phase completed>
- Key decisions this run: <bullets, newest first, max 5>
- Open risks/blocks: <bullets or "none">

## NEXT_ACTION
<one imperative sentence, specific enough to execute with no other context>

## TASK LEDGER
| ID | Unit | Status | Files touched | QA gate | Commit |
|----|------|--------|---------------|---------|--------|
| P0-1 | Fix verify-case-studies.js crash | todo | | verify:work | |
| ...  | (fill from §6 scope map + §8 phases on fresh start) | | | | |

## DECISIONS LOG
- <datetime> — <decision> — <why>

## BENCHMARK LOG → see AUDIT/BENCHMARKS.md
```

On fresh start, expand the ledger to one row per unit in §8, in order. IDs: `P<phase>-<n>`, then per-project units use the slug (e.g. `P3-team-performance-reporting`).

---

## 1. MISSION

This repository (`pushpaldas.com`, branch per `git status`) is a **sample portfolio of a mid/senior product manager** — 55 catalogued work items, 37 authored case studies, 17 self-contained HTML demos, spanning body-area-network silicon (Ixana) and internal AI programs & platforms. It is explicitly a sample: figures are invented placeholders and screens are recreations, and the site discloses this on-page.

Your mission: make it **the global benchmark of what a great mid/senior PM portfolio looks like** — the reference an experienced PM leader, hiring manager, or design-savvy reviewer would hold up as the standard. Every case study, number, chart, demo, and strategic narrative must read as the best possible outcome of that project: mature judgment, sharp strategic execution, evidence-first storytelling, and craft that never smells AI-generated. "Sample" is a disclosure about the data, never an excuse in the quality.

You improve, enhance, and extend what exists. You do not replace the portfolio's voice, structure, honesty scheme, or information architecture — you raise them to 10/10.

---

## 2. GROUND TRUTH — READ ORDER (per session, read lazily as needed; on fresh start read 1–4 fully)

1. `ELEVATION-MASTER-PROMPT.md` (this file).
2. `PROJECT-REFERENCE.md` — architecture, routes, data layer, filter system, admin CMS, verification scripts, **§14 known issues, §15 invariants**. Where it and the code disagree, the code wins.
3. `PORTFOLIO-ANALYSIS.md` — all 37 products + program page: card record, skim layer with evidence classes, authored case study, legacy record, demo dossier. This is the content corpus you are elevating.
4. `app/Changes/portfolio-decisions.md` — **the spec; wins all conflicts**, including with this prompt, except where this prompt's §3 forbids an action outright.
5. Per-unit, as relevant: `app/Changes/case-study-authoring-brief.md` (the authoring contract — mandatory before editing any case study), `app/Changes/work-page-reference.md`, `AUDIT/DESIGN-BRIEF-COMMON.md`, `AUDIT/DESIGN-NOTES.md`, `AUDIT/DESIGN-SYSTEM-XANA.md` (mandatory before touching any demo), `AUDIT/CLAIMS-AUDIT.md` (evidence classes), `AUDIT/FINDINGS.md`, `AUDIT/INTERVIEW-BRIEF.md`, `AUDIT/LAUNCH-READINESS.md`.

---

## 3. NON-NEGOTIABLES

**Honesty scheme.** The A/B/C evidence-class system and the on-page sample-portfolio disclosure are what make invented figures honest. Preserve both everywhere. Every new or changed figure keeps a correct class label in the skim layer, and shipped-work claims keep exactly one "how we counted" definition line.

**Alignment is the prime directive.** A number, name, date, chart, or screen state may appear in many places — card `outcome`, fast facts, metric tiles, §08 chart tables, prose, demo UI, deep-link params, `PORTFOLIO-ANALYSIS.md` skim layer. **All appearances must agree exactly.** Funnel math must add up; percentages must reconcile with their numerators and denominators; before/after deltas must be arithmetically correct; timelines in `meta` must contain every dated event in the prose; a case-study shot's callouts must describe what the demo actually renders at that state. Any mismatch is a defect, full stop.

**No hallucinations.** Never invent companies, people's names, URLs, papers, patents, or partner products. External links must be real and already present in the corpus (ixana.ai, xana-nine.vercel.app, YouTube, arXiv/DOI/patent links already cited) — do not add new external URLs without verifying them live. Invented *figures* are permitted only inside the evidence-class scheme (§5), never invented *facts of the world*.

**Repo invariants (PROJECT-REFERENCE.md §15) hold at all times**, notably: every `/work` card reachable from a non-All pill (17+20+17=54); engineering builds keep `status: null`; exactly one `programHead: true`; every v2 case study linked from a card; counts derived, never typed; `cardMeta` stays outside the card anchor; filter clicks use `router.replace`; `outcome` is one sentence, `domain` ≤ 3 words; research pages state a limitation; prototype pages say plainly they never went to users; no two case studies share a §08 chart form, a metric-tile set, or a §02 evidence method; the sample-portfolio disclosure stays on the page.

**Forbidden actions.**
- Do not call or rely on the `/api/admin/*` CMS to write content — it regenerates `app/work/constants.ts` wholesale and drops `tier`/`programHead` (PROJECT-REFERENCE §11). Edit source files directly.
- Do not touch `/work/accurate-estimation-of-mineral-present-in-soil` (project #9) in any way — content, card, or demo. Leave exactly as is.
- Do not create demos for **Dāsa** (`dsa-generative-ai-engine-for-a-guided-spiritual-path`) or **Calendar sync** (`calendar-automation-real-time-bi-directional-sync-engine-wit`). Case-study elevation only.
- Do not modify the deployed xana-nine app's UI/UX or replace links to it with local imitations. It is external and its UX is approved as-is.
- Do not touch the 17 engineering builds under **Others**, or `/thoughts`, `/books`, `/certifications`, `/hobby`, `/stats`, `/about` content. Out of scope.
- Do not restructure the five-pill filter row, the status vocabulary, the v2 section format, or the site IA. Elevate within them.
- Never delete `AUDIT/` history; append.

---

## 4. THE QUALITY BAR — WHAT 10/10 MEANS

Review every case study through four lenses before marking its unit done:

1. **The PM-leader lens.** Does §01 argue *why this, why now* with a real forcing function? Is there a visible decision under uncertainty, an explicit "what I cut" with the reasoning a senior PM would defend, a stakeholder path in "how I got it agreed", tradeoffs stated as costs actually paid (not humble-brags), and a "what I'd do differently" that shows self-awareness rather than fake flaws? Would this survive `AUDIT/INTERVIEW-BRIEF.md`'s hostile questions? Strategic maturity signals to strengthen where thin: framing against alternatives considered and rejected, second-order effects anticipated, a named guardrail with the incident or risk that motivated it, a kill-criterion for anything in customer-testing, and sequencing logic (why this order of bets).
2. **The evidence lens.** Every claim carries its class; shipped work shows adoption/impact with the counting method; research shows a limitation; prototypes admit they never met users. Metrics are specific (denominators, windows, cohorts) rather than round vanity numbers. Charts have honest axes, real baselines, and a table a reviewer can re-derive the headline from.
3. **The craft lens.** Prose is tight, concrete, and in the house voice (per the authoring brief and `about-page-brief.md`). No AI tells: no filler transitions, no "delve/leverage/robust" cadence, no symmetrical triads everywhere, no section that restates its heading, no em-dash confetti beyond the house style. Section lengths respect the word-count bands by status enforced by `verify-case-studies.js`.
4. **The differentiation lens.** Across the corpus, each case study keeps a distinct §08 chart form, metric-tile set, and §02 evidence method (verifier-enforced). Elevation must not homogenize.

For demos, 10/10 means: a first-glance reaction of "this is a real internal tool screenshot come alive" — coherent type scale, real spacing grid, product-plausible microcopy and empty/edge states, seeded data that matches the case study to the digit, and interactions that land exactly where the case study's deep links say they do.

---

## 5. DATA RULES — INVENTED, BUT DEFENSIBLE

Instruction from the author: numbers must be the *best possible* while remaining ones an experienced reviewer would nod at. Operationalize that as:

1. **Benchmark before you write.** For every headline metric you strengthen or add, do a quick web search for the industry norm (e.g., internal-tool adoption curves, procurement cycle-time reductions, patent drafting cost/time baselines, RAG retrieval eval norms like nDCG ranges, silicon bring-up/dev-kit program timelines, meeting-minutes automation time savings, HR comp-band tooling accuracy). Log every benchmark in `AUDIT/BENCHMARKS.md`: metric → chosen value → industry range → source URL → access date → one-line justification. This file is the defensibility trail.
2. **Impressive means top-quartile-plausible, not fantasy.** A 30–60% cycle-time cut with a stated method beats "10x" with none. Prefer effects sized to the company stage (Ixana is a startup; internal tools serve tens of users, not thousands) and to the time window the case study claims.
3. **Every figure gets a mechanism.** If adoption rose, the case study says what drove which segment; if a metric is relative-only, that is a class-B choice stated on the page.
4. **Reconcile the web.** When you change a number, grep the entire repo (`data/`, `app/work/constants.ts`, `public/demo/*.html`, `PORTFOLIO-ANALYSIS.md` regeneration inputs, `PRODUCTS*.md` sources) and update every occurrence in the same unit. Then re-run §9 gates.
5. **Charts are tables first.** Author the data table, verify its internal arithmetic, then the chart. Baselines, denominators, and windows appear on or beside the chart.

---

## 6. SCOPE MAP — EXACTLY WHAT TO DO, PER PROJECT

Legend — **CS**: elevate the authored case study to the §4 bar. **DG**: demo glance only (open, verify it loads, matches its case-study claims, and deep links resolve; fix only mismatches). **DK**: demo keep (external xana-nine — do not change UI/UX; only verify links/params and alignment). **DR**: demo rework (font → layout → color → microcopy → data, per §7, keeping stated identity). **DR+**: full identity rebuild (the three flagged as AI-generated). **ND**: no demo — do not create one. **SKIP**: do not touch.

### Silicon & systems (`?filter=silicon`) — instruction 7a

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 1 | Wi-R BAN YR31 (`wi-r-ban-yr31`) | CS | DG (ixana.ai) |
| 2 | Wi-R Dev Kits (`wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001`) | CS | DG (ixana.ai) |
| 5 | Wi-R BAN YR23 (`wi-r-ban-yr23`) | CS | DG (ixana.ai) |
| 7 | Wi-R NFE XA-NFE3001 (`wi-r-nfe-xa-nfe3001`) | CS | DG (ixana.ai) |
| 8 | Wi-R NFE XA-NFE2001 (`wi-r-nfe-xa-nfe2001`) | CS | DG (ixana.ai) |
| 12 | WishKey (`eegrab-wishkey`) | CS | DG (YouTube) |
| 13 | Wi-R reference designs (`wi-r-reference-designs`) | CS | DG (ixana.ai) |
| 14 | Cost-effective smart watch (`eegrab-smart-watch`) | CS | ND unless clearly warranted |
| 28 | Condenser microphone (`eegrab-condenser-microphone`) | CS | ND unless clearly warranted |
| 29 | Sensor signal generator (`slb-sensor-signal-generator`) | CS | ND unless clearly warranted |

### AI programs & platforms (`?filter=ai`) — instructions 7b, 7b1, 8

**Part of the xana-nine app — UI/UX approved, do not change (7b):**

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 3 | Ixana-Wiki (`xana-multifile-rag-based-data-singularity-platform`) | CS | DK — `xana-nine.vercel.app/` |
| 17 | Flow Tracker (`ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic`) | CS | DK — `/efficiency?view=tracker` |
| 19 | Video library (`ixana-video-library-automated-company-video-library`) | CS | DK — `/videolibrary` |
| 25 | Meeting notetaker (`ixana-meeting-notetaker`) | CS | DK — `/meetingrecordings` |
| 26 | Patent program (`ixana-patent-program`) | CS — read `app/Changes/ixana-patent-program-change-brief.md` first | DK — `/patents` |
| 27 | Document change intelligence (`clickup-document-tracker-data-extraction-easy-visibility-for`) | CS | DK — `/myfiles?tab=clickup` |
| P | Program overview (`ixana-internal-ai-program`) | CS (program-page format — it legitimately has no §08) | DK |

**Internal HTML demos, flagged AI-generated — deepest rework (7b1, note):**

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 15 | Team performance reporting (`team-performance-reporting`) | CS | **DR+** `/demo/team-performance` — Ixana identity |
| 16 | Scrum ecosystem (`ixana-scrum-ecosystem`) | CS | **DR+** `/demo/scrum-desk` — Ixana identity |
| 23 | AI Lawyer (`ai-lawyer-multi-agent-multi-llm-shared-memory-generative-sys`) | CS (prototype rules apply) | **DR+** `/demo/ai-lawyer` — Ixana identity |

**Other internal demos on the AI track — improve as well (7b1 tail):**

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 11 | Procurement Orchestrator (`procurement-orchestrator-procurement-process-automation-with`) | CS (customer-testing: keep kill-criteria) | DR `/demo/procurement-desk` — Ixana identity |
| 18 | ClickUp Activity Tracker (`github-for-clickup-automation-on-the-changes-going-outside-p`) | CS | DR `/demo/clickup-audit` — Ixana identity |
| 21 | AI Salary Generator (`ai-salary-generator`) | CS (customer-testing) | DR `/demo/salary-bands` — Ixana identity |
| 22 | AI product planning OS (`ai-prd-multi-agent-multi-llm-shared-memory-generative-system`) | CS | DR `/demo/prd-os` — Ixana identity |
| 24 | ClickUp reporting & Gantt (`ai-pm-customized-multi-view-for-pms`) | CS | DR `/demo/clickup-gantt` — Ixana identity |
| 6 | NeuroAdapt (`neuroadapt-agentic-rag-engine-for-neuroscience-research`) | CS (research: keep limitation) | DR `/demo/neuroadapt` — **its own** research-tool identity, not Ixana |
| 10 | Quantum Gate Simulator (`quantum-circuit-simulator-interactive-10-qubit-delivering-re`) | CS (prototype rules) | DR `/demo/quantum-simulator` — its own identity |
| 34 | Triple riding avoidance (`ricky-kids-triple-riding-avoidance`) | CS | DR `/demo/rider-count` — Ricky Kids-appropriate identity |

**Case study only — never create a demo (instruction 8):**

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 4 | Dāsa (`dsa-generative-ai-engine-for-a-guided-spiritual-path`) | CS (research rules; handle the religious context with restraint and respect) | **ND — hard** |
| 20 | Calendar sync (`calendar-automation-real-time-bi-directional-sync-engine-wit`) | CS | **ND — hard** |

**Untouchable (instruction 9):**

| # | Project | Action |
|---|---|---|
| 9 | Accurate estimation of mineral present in soil (`accurate-estimation-of-mineral-present-in-soil`) | **SKIP entirely** |

### Prototypes & research (`?filter=prototypes`) — instruction 7c
(#6, #10, #23 above already covered; the rest:)

| # | Project (slug) | Case study | Demo |
|---|---|---|---|
| 30 | Ornithopter (`srm-uav-ornithopter-for-surveillance`) | CS (prototype rules) | DR `/demo/ornithopter-concept` — project-native identity |
| 31 | Carbon positive e-car (`ricky-kids-carbon-positive-ev`) | CS (research rules) | ND unless clearly warranted |
| 32 | UAV radar calibration (`ricky-kids-uav-weather-radar-calibration`) | CS (research) | DR `/demo/radar-error-budget` |
| 33 | Non-contact COVID monitoring (`ricky-kids-noncontact-covid-monitoring`) | CS (research) | DR `/demo/covid-bench` |
| 35 | Toys for autistic kids (`ricky-kids-toys-for-autistic-kids`) | CS (prototype) | DR `/demo/autism-bench` — warm, assistive-play-appropriate, never clinical-cold |
| 36 | Sludge-traversing ROV (`ricky-kids-sludge-traversing-rov`) | CS (research) | DR `/demo/sludge-envelope` |
| 37 | ENVI-City (`ricky-kids-envi-city`) | CS (research) | DR `/demo/envi-city` |

"ND unless clearly warranted": default to no new demo. Create one only if, while elevating the case study, a specific claim genuinely needs an interactive artifact to land — and then it must meet the full §7 bar and the two-edit rule. Never for #4 or #20.

---

## 7. DEMO DESIGN RULES

Mandatory reading before the first demo unit: `AUDIT/DESIGN-BRIEF-COMMON.md`, `AUDIT/DESIGN-NOTES.md` (per-demo identity notes), `AUDIT/DESIGN-SYSTEM-XANA.md`. Each demo dossier in `PORTFOLIO-ANALYSIS.md` includes the intended identity in three lines — honor it or consciously supersede it and log the decision.

1. **Identity by owner.** Ixana-owned demos read as native siblings of xana-nine: warm brown-black ground, `#1A1410` bordered-not-shadowed cards, single `#FF6321` accent (gradient `#CD3D00→#FF6321` reserved for primary actions/hero numbers), dense ~13px UI, mono tabular numerics, uppercase tracked kickers, translucent blurred top bar with 2px orange active underline, explicit single-theme dark. Non-Ixana demos (NeuroAdapt, Quantum, and all Ricky Kids/SRM prototypes) get a bespoke identity that looks like a product of *that* project's world — never the Ixana palette, never a generic template.
2. **Kill the AI tells.** No default-Tailwind-blue/purple gradients, no emoji-as-icons, no lorem or `John Doe`, no perfectly uniform cards with identical lengths, no floating rounded-everything, no drop-shadow soup, no Inter-at-16px-everywhere. Instead: a real type scale and spacing grid; deliberate information density; opinionated microcopy in the product's voice; believable seeded data with natural variance (mixed name origins, non-round numbers, plausible timestamps and weekday patterns); designed empty/error/loading states where the flow implies them.
3. **Layout is the product's own.** Match the house design system without copying xana screens — each tool's hero object and navigation grammar should be what that tool would actually foreground (the dossiers describe this per demo).
4. **Alignment with the case study is binding.** Every figure, name, stage label, and state the case study's shots and links describe must exist in the demo exactly, and every demo deep-link parameter (`?panel=`, `?task=`, `?team=`, `?q=` …) must land on the described state. Update whichever side is weaker, then re-verify both.
5. **Mechanics.** Demos stay single self-contained HTML files in `public/demo/` (inline CSS/JS, no external requests). Keep file names and paths stable so existing rewrites in `next.config.ts` keep working. A *new* demo requires both edits — the HTML file and its rewrite — plus the card's `demoUrl`. Keep files performant (< ~200 KB, no giant embedded assets); script-driven states must be keyboard-reachable and legible at laptop widths.
6. **DR+ scope (the three flagged demos):** treat as a ground-up visual rebuild on the same underlying content and interactions — new type/spacing/layout execution to the identity note, upgraded microcopy, re-seeded consistent data — while preserving every state the case study links into.

---

## 8. WORKFLOW — PHASES IN ORDER

**Phase 0 — Make the QA harness real (do this first).**
0.1 Fix `scripts/verify-case-studies.js:164` (guard the missing-§08 dereference or exclude `ixana-internal-ai-program`) so the strict verifier runs corpus-wide — it is your primary alignment gate and is currently dead (PROJECT-REFERENCE §14.1).
0.2 Run `npm run verify:work` and `npm run build`; record the clean baseline in the state file.
0.3 Create `AUDIT/BENCHMARKS.md` (header + table schema).
0.4 Safe corpus-quality fixes that serve the 10/10 goal: add the 37 case-study routes to `app/sitemap.ts`; remove the orphan key `wi-r-body-area-network-yr23` from `data/case-studies.json`. Log both. Leave all other §14 issues alone unless they block a unit.

**Phase 1 — Audit pass.** For each in-scope project (order: the three DR+ items first, then remaining AI track, then Prototypes & research, then Silicon), skim its full entry in `PORTFOLIO-ANALYSIS.md` + `AUDIT/FINDINGS.md` block and write a 5-line gap note into the state file ledger row: weakest sections, weakest numbers, demo mismatches, differentiation risks. This is fast — no fixes yet.

**Phase 2 — Benchmarks.** From the gap notes, list every metric to strengthen; research and fill `AUDIT/BENCHMARKS.md` (§5.1). Batch by domain to minimize searches.

**Phase 3 — Case-study elevation.** One project per unit, in Phase-1 order. Per unit: read the authoring brief section relevant to its status → rewrite/strengthen the v2 entry in place (per-slug JSON surgery, §0.1) → reconcile card `outcome`, fast facts, tiles, chart tables → update skim-layer evidence classes if figures moved → run `verify:work` → commit.

**Phase 4 — Demo elevation.** One demo per unit: DR+ three first, then DR items, then DG/DK verification sweeps. Per unit: read its identity note → rebuild/refine per §7 → re-align case-study shots/links (both directions) → open-check every deep link → commit.

**Phase 5 — Cross-corpus alignment audit.** Grep-driven: for every headline number in every elevated entry, confirm all occurrences agree (case study, card, demo, exports). Confirm differentiation invariants across all 37. Confirm `?filter=` carry, back links, and card counts (17/20/17→54). Write `AUDIT/ELEVATION-AUDIT.md`: per-project one-line verdict + the alignment matrix.

**Phase 6 — Final QA & closeout.** `npm run verify:work` clean · `npm run build` clean · `npx tsc --noEmit` filtered to source (ignore `.next/`) · spot-render 6 case studies (2 per pill) and 6 demos at laptop width · update `AUDIT/CHANGELOG.md` and `AUDIT/ELEVATION-STATE.md` → phase `DONE`, `NEXT_ACTION: none — run complete` · final commit.

---

## 9. QA GATES (a unit is not done until its gate passes)

| Unit type | Gate |
|---|---|
| Any content edit | `npm run verify:work` passes (both scripts, corpus-wide) |
| Case study | + §4 four-lens self-review noted in ledger; word-band + differentiation checks pass; every changed number grepped and reconciled repo-wide |
| Demo | + every case-study deep link into it opens on the described state; §7.2 tell-checklist clean; file self-contained and loads offline |
| Structural (`constants.ts`, `next.config.ts`, sitemap) | + `npm run build` passes; §15 invariants re-checked |
| Every unit | git commit made; state file updated |

---

## 10. DEFINITION OF DONE

- Every project in the §6 scope map carries its listed action, completed to the §4 bar; #9 untouched; #4 and #20 remain demo-less with elevated case studies.
- Zero alignment defects: the Phase-5 matrix in `AUDIT/ELEVATION-AUDIT.md` is all-green, and both verifiers pass corpus-wide.
- Every strengthened figure traces to a row in `AUDIT/BENCHMARKS.md` and a correct evidence class; the sample-portfolio disclosure and "how we counted" lines are intact everywhere.
- The three DR+ demos and all DR demos pass the §7 identity and anti-tell bar; xana-nine-linked and ixana.ai demos verified, unchanged.
- Build, typecheck (source), and spot renders are clean. `AUDIT/ELEVATION-STATE.md` reads `DONE`, and a fresh reviewer could reconstruct every decision from the state file, benchmarks file, audit file, and git history alone.

Begin now with §0. If `AUDIT/ELEVATION-STATE.md` does not exist, this is Session 1: create it, expand the ledger, and start Phase 0.

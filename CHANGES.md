# Home page — PM profile pass

Branch `home/pm-profile`, three commits (one per step) off
`audit/numeric-corrections` — that branch carries the corrected case-study data
this page's numbers are checked against. The earlier report for that pass is
kept below, under "Numeric corrections pass".

## Components touched

| File | What changed |
| --- | --- |
| `app/components/hero/hero.tsx` | positioning line, role line, `/projects` label; two TODOs |
| `app/components/work/workTiles.ts` | four slides, new optional fields, the strip |
| `app/components/work/work-content.tsx` | case-study link, per-slide panel label, public-links list, strip row |
| `app/components/work/work-carousel.tsx` | optional `alt` field (2 lines) |
| `app/components/work/work-right-sections.css` | styles for the links list, footer row and strip |
| `app/layout.tsx` | meta description |
| `app/components/contact.tsx` | footer year, GitHub href, TODO |

Untouched, and confirmed by the branch diff: `ScrollProvider`, `Magnetic`,
`SplashCursor`, `intro.tsx`, `works.tsx`, the `tiles/*` scroll machinery,
`work-left/right/container/background`, `arrow-down`, the navbar, every GSAP
block in `contact.tsx`, and every image asset.

## STEP 0 — blanks detected

All six arrived unfilled. What I could settle from the repo or the open web, I
settled; the rest is held at its current value behind a TODO.

| # | Status |
| --- | --- |
| 0.1 | **Part-settled.** GitHub verified — `github.com/PushpalDas` is a real active account and GitHub usernames are case-insensitive, so the hero and footer spellings were always the same account; canonicalised to `/PushpalDas`. LinkedIn and X **cannot** be verified from here (LinkedIn answers HTTP 999, X answers 402) and the two pages use genuinely different handles. Both left as they are, TODO at each spot. |
| 0.2 | **Default applied.** Role phrasing pulled verbatim from the About page: "Principal PM in the CTO's office at Ixana". |
| 0.3 | **Unfilled → every name removed.** Purdue, NSF, U.S. Army, USSOCOM, Defense Innovation Unit, U.S. Air Force and the three Tier-1 descriptors are all replaced with generic forms. |
| 0.4 | **Unfilled → both names removed.** State Bank of India and Accenture replaced with "Banking and enterprise facilities across India". |
| 0.5 | **Unfilled → proof strip not built.** The three candidate figures are all sourced in-repo; what is missing is clearance to publish them. TODO sits where the strip would go. |
| 0.6 | **Default applied.** Four slides — Wi-R · Patents · XANA · WishKey — plus the strip. |

## STEP 1 — Hero

- Positioning line → "I help deep-tech teams turn complex R&D into products that ship." Chose the prompt's revision over the existing line: "products that ship" echoes the About page's "staying with a product until it ships", where "scalable products" is a register the About page never uses.
- Role line → "Principal PM in the CTO's office at Ixana — I run the Wi-R silicon programs from spec to production, the patent program (50+ filings, first grants issued), and the internal tools the company plans and delivers with." Option A, with the 0.2 substitution.
- "/projects" → "See the work →". Href unchanged.
- Intro section untouched — the optional line-swap is gated on 0.2 being filled, and it was not.

**Two judgment calls worth your eye.** The About page's title is *Principal* PM, which reads more senior than this brief's "senior/mid-level product manager" framing; I followed the About page because it is source of truth (a), but say the word and both pages change together. And the draft's "internal AI tools" became "internal tools" — of the 14 internal Ixana items in the work index, several are automation rather than AI (calendar sync, audit trail), so "AI tools" would have overstated the set.

## STEP 2 — Work section

**Wi-R** keeps its image and headline; the five bullets are replaced with the exact copy given. Links to `/work/wi-r-ban-yr23` — there is no hub page, and YR23 is the foundational production part ("the part under the BAN dev kit and every on-body reference design since"), so it carries the family best.

**Patents** is new, and is the slide a stranger can check. Headline, the four features, and a second panel labelled **Proof** carrying the three Google Patents links from the patent case study. Per-slide panel labels turned out to be straightforward to support, so the links did not have to be folded into Features. Its image is the existing `ixana-patent-tracker.png` — no new asset was created or edited.

**XANA** is rewritten to the given copy. Dropped "the Google of Ixana" as a subline: the About page never reaches for a comparison like that, and the slide already says what the thing is. Adoption is stated exactly as the case study states it.

**WishKey** keeps image, headline and bullets, and gains its two public EEGRAB links.

Each slide carries "Read the case study →" to a route resolved from the repo. The strip under the carousel reads: *35 written-up case studies across 56 projects · silicon to production · developer kits & reference designs · a patent estate · 14 internal tools at Ixana · consumer & industrial hardware → See all work*. I changed the draft's "35 case studies" because the work index holds 56 items of which 35 have written case studies — both numbers are true and the pair is more useful than either alone.

### Confidentiality gate

Nothing named survived, because nothing was confirmed. Restoring any of it is a one-line edit at the TODO:

| Slide | Was | Now |
| --- | --- | --- |
| Wi-R | Purdue University, NSF | University and federal research partners |
| Wi-R | U.S. Army, USSOCOM, Defense Innovation Unit, U.S. Air Force | U.S. defense programs (public engagements via Ixana) — phrasing needs confirming |
| Wi-R | Tier-1 Smartphone OEM / Wearables / Platform Partner | Defense & Tier-1 consumer programs under NDA |
| WishKey | State Bank of India, Accenture | Banking and enterprise facilities across India |

## STEP 3 — Hygiene

- Meta description → "Product manager for deep tech — Wi-R silicon programs, a patent estate, and the AI tools that run delivery at Ixana." (116 characters.)
- Footer edition year now reads `new Date().getFullYear()` rather than being pinned — it renders 2026 today and needs no edit next January.
- GitHub canonicalised in both places. LinkedIn and X untouched, TODO in both.
- Alt text landed with STEP 2 as a separate `alt` field, so it no longer doubles as the printed caption: "Wi-R body-area and near-field devices", "Patent matter lifecycle tracker", "XANA — Ixana's internal AI operating system", "WishKey electronic key cabinet". File paths unchanged.
- The empty tile-level `image.src` is intentional and now says so in a comment: `WorkContent` falls back to it only for a tile with no carousel, so the field is live code, not dead.

## STEP 4 — Verification

**Number-to-source table.** Every figure on the page:

| Figure, as it appears | Source |
| --- | --- |
| 50+ filings across six product lines | Patent case study summary — "Fifty-plus filings across six product lines"; the filings chart sums to 52 |
| First grants issued — US12619308B2 | Patent case-study evidence link; Google Patents returns 200 |
| Disclosure-to-filing ~14 weeks → 6 | Patent case study metric tile "14w → 6w" |
| 5–20 Mbit/s across the family | YR23 (5 Mbit/s) and YR31 (20 Mbit/s) case studies |
| Sub-millisecond links | YR31 "sub-0.2 ms"; NFE2001 tile 0.6 ms |
| Up to 16 devices on one body | YR23 and YR31 — "16-device on-body network" |
| 0.1–0.2 nJ/bit | YR23 0.12 nJ/bit, YR31 0.20 nJ/bit |
| ~50× NFC's efficiency | NFE2001 case study — "over 50× NFC's energy efficiency and ten times its throughput", Ixana's own launch comparison |
| An order of magnitude beyond Bluetooth | YR23 figure — Bluetooth LE energy per bit 83× higher; the page states it conservatively |
| One search across five systems | Ixana-Wiki case study — OneDrive, ClickUp, Teams, efficiency trackers, patent records |
| Adopted company-wide within a quarter | Ixana-Wiki case study — 118 of 140 employees in a quarter |
| 35 written-up case studies | `data/case-studies-v2.json` — 35 entries |
| across 56 projects | `app/work/constants.ts` — 56 work items |
| 14 internal tools at Ixana | `app/work/constants.ts` — 14 Ixana items with status `internal` |
| silicon to production | `app/work/constants.ts` — 4 Silicon items, all status `production` |
| WishKey feature bullets | Unchanged; EEGRAB brochure linked on the slide |

**Greps, all zero hits** across `page.tsx`, `layout.tsx`, `hero/`, `intro.tsx`, `work/`, `contact.tsx`, `navbar/`: "data singularity" · "third party babies" · "I build things for the web" · "self adapting" · "10x" · "the smarter it gets" · "2025 © Edition" · "/projects". One thing to know: the XANA case-study route is `/work/xana-multifile-rag-based-data-singularity-platform`, so the hyphenated form of a banned phrase does sit inside that URL. The grep is clean because the phrase never appears as words, it is never displayed to a reader, and renaming routes is out of scope — but it is there, and renaming that slug would be the way to remove it.

**Links, all resolving.** Internal (dev server): `/`, `/work`, `/work/wi-r-ban-yr23`, `/work/ixana-patent-program`, `/work/xana-multifile-rag-based-data-singularity-platform`, `/work/eegrab-wishkey`, plus every navbar route — 200. External: the three Google Patents pages, the EEGRAB brochure, the WishKey demo, `github.com/PushpalDas` — 200. No link outside STEPs 2 and 3 was altered; LinkedIn and X were deliberately not touched.

**Motion untouched.** The branch diff covers seven files, none of them an animation, provider or layout component. The carousel change is two lines and adds an optional field.

`tsc --noEmit` clean.

## Still needed from you

| # | What |
| --- | --- |
| 0.1 | The current LinkedIn and X handles. Hero and footer disagree and neither host will answer a machine, so I left both rather than guess and risk a dead link on the front page. |
| 0.2 | Confirm "Principal PM in the CTO's office at Ixana" is what you want on the home page — it is the About page's wording, and it reads more senior than this brief's framing. |
| 0.3 | The keep-list for Wi-R partners, and whether "U.S. defense programs (public engagements via Ixana)" is phrasing you are comfortable with. |
| 0.4 | Whether EEGRAB has published State Bank of India and Accenture as customers. |
| 0.5 | Clearance for the proof strip: "4 parts in production", "50+ patent filings", "internal tools used company-wide". All three are sourced; the question is only whether you can show them. Note the filings figure is already in the hero role line and on the Patents slide — if it is not cleared, three places change together. |

A note on the TODO markers: unlike the case-study pass, these are `{/* … */}` and `//` comments in TSX and TS, so they compile away and nothing shows on the page.

---

# Numeric corrections pass — audit response

Branch `audit/numeric-corrections`, three commits (one per step) against `main`.
Today's date for every date check: **2026-08-25**.

## Repository map

| What | Where |
| --- | --- |
| Source of truth | `data/case-studies-v2.json` — 35 authored case studies, one object per slug |
| Renderer | `app/work/[slug]/case-study-v2.tsx` (blocks) + `case-study-charts.tsx` (34 chart forms) + `case-study-types.ts` |
| Route | `app/work/[slug]/page.tsx` — v2 entry wins; falls back to `data/case-studies.json` then `notFound` |
| Work index | `app/work/constants.ts` — grid order and slug wiring (untouched) |
| Images | `public/static/images/project/` (260 files) |
| Structure checker | `scripts/verify-case-studies.js` (`npm run verify:work`) |
| Markdown export | `changes/case-studies.md`, regenerated from the JSON after every step |

`data/case-studies.json` holds 17 legacy records for the same slugs. Every one of
those slugs has a v2 entry, so the v2 file is the only thing the pages render;
the legacy file was not touched.

All editing was done at the source of truth and the export regenerated. The
export generator is the only place where a fault was a rendering fault (STEP 2.2).

## STEP 0 — blanks detected

Every STEP 0 item arrived unfilled (`[FILL]`), so the pass ran as follows:

- Where the item carried an explicit default, the default was applied: **0.4,
  0.5** (W6 sum), **0.10, 0.12, 0.19, 0.20**.
- Where it did not, the current value stands and carries a visible
  `<!-- TODO(pushpal): … -->` at the exact spot: **0.1, 0.2, 0.3, 0.6, 0.7,
  0.8, 0.9, 0.11, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18**.
- **0.8** is report-only and appears under 2.5 below.

37 TODO markers are carried in the data. They are HTML comments, so they are
invisible in the Markdown export — but the React renderer prints text nodes
verbatim, so **they will show as literal text on the live pages**. That is
deliberate for a working branch: a wrong-but-flagged number is acceptable, a
smoothed-over one is not. Answer the list at the end of this file and they all
come out.

---

## STEP 1 — "How it works" removed

Deleted by title from all 35 pages — §09 on twenty-three pages, §06 on eleven,
§10 on Procurement. Surviving sections renumbered sequentially, so
"What I'd do differently" is now §09 / §06 / §10 respectively.

**Migrated into "What was built" first** (image + its caption, as a gallery
block; §06 except Sludge ROV and e-car, where it is §04):

| Page | Image |
| --- | --- |
| YR23 | `wi-r-ban-yr23-network-topology.png` |
| NFE2001 | `wi-r-nfe-xa-nfe2001-coupling-model.png` |
| NFE3001 | `wi-r-nfe-xa-nfe3001-sealed-transfer.png` |
| Reference designs | `wi-r-refdesign-tactical.png` |
| WishKey | `eegrab-wishkey-pcb-3d-view.png` |
| Smart watch | `eegrab-smartwatch-schematic.png` |
| Condenser mic | `eegrab-condenser-mic-gain-simulation.png` |
| SLB | `slb-sensor-pack-can-interface.jpg`, `slb-sensor-pack-bench.jpg` |
| Patent Ops | `ixana-patent-pipeline.png` (appended to the existing gallery) |
| Sludge ROV | `ricky-kids-sludge-rov-top-view.jpg` |
| e-car | `ricky-kids-carbon-positive-ev-solar.jpg` |

Everything else in those sections was deleted: 44 architecture figures, of which
15 were the mermaid diagrams. No image file was deleted from disk.

**In-body reference to a deleted section:** Patent Ops' closing note said "the
pipeline in section 09 is drawn from scratch". That clause is gone. No other
cross-reference pointed at a deleted or renumbered section — every other one
addresses §01–§08, which did not move.

**Checker follow-on (judgment call).** `scripts/verify-case-studies.js` asserted
"exactly one arch block, in the How it works section" and crashed once no page
had one. Its arch rules were replaced with the inverse assertion (zero arch
blocks, no "How it works" heading), and the gallery minimum lowered from 2 items
to 1 so a single migrated image is legal. Without this `npm run verify:work`
throws. `app/Changes/case-study-authoring-brief.md` still documents the old
ten-section structure — updating prose documentation was out of scope, so it is
now stale and worth a follow-up.

---

## STEP 2 — batch fixes

### 2.1 No data from the future

| Page | Field | Before | After |
| --- | --- | --- | --- |
| Flow Tracker | timeline | Feb – Sep 2026 | Feb 2026 – present |
| Audit trail | timeline | May – Sep 2026 | May 2026 – present |
| Video library | timeline | Mar – Oct 2026 | Mar 2026 – present |
| Gantt | timeline | Apr – Oct 2026 | Apr 2026 – present |
| Patent Ops | filings column | H2 '26 | H2 '26 (to date) |

Three measurement windows extend past today and **keep their values under a
TODO**, because truncating them means inventing the real window: Audit trail's
seven-week series (Aug–Sep 2026), Gantt's ten-week session series (Jul–Sep 2026),
and Video library's "six months after launch" logs against a March 2026 launch.

No role, team or employment date was touched anywhere.

### 2.2 Chart bugs — fixed in the generator

All five were export faults, not data faults; the React chart components render
these correctly already.

1. **x-axis labels are ticks, not one-per-point.** Four labels across ten points
   were being paired by index. They now land by stride, on points 1/4/7/10 —
   Ixana-Wiki's weekly actives read 18 / 62 / 94 / 118, which makes both the
   title ("118 by week ten") and the caption ("crossed the floor in week six":
   68 → 84 over the 70 line) true exactly as written. No data changed.
2. **Heatmap** (NFE2001 interop): rows are row *names*, values live in `cells`.
   Now rendered as a rows × cols grid.
3. **statusGrid** (COVID): same fix, plus its legend.
4. **Histogram** (AI Planning OS, WishKey, YR23): `bins` were not read at all.
5. **waffle** (SLB) and **confusion** (triple riding): filled/total split and the
   square `classes` matrix now render.

### 2.3 Cross-page conflicts

- Patent Ops filing rate → **"~25 applications a year"** in all three places, against
  its own chart (18 in 2024, 24 in 2025, 10 in 2026 to date).
- Design-in denominators, extending NFE2001's existing footnote convention, one
  clause each: YR23's four OEM programs are pre-kit direct engagements; the dev
  kits' 34 are kit-mediated only; NFE3001's 14 are gen-2 conversions of
  evaluations that stalled on gen-1, drawn from the same NFE-line population as
  the gen-1 page's 7 of 26 (with a TODO to confirm the subset relation).
- Headcount (0.6), gen-1 latency (0.7) and the patent bridge (0.9) need facts
  that were not supplied — TODO at each spot: Ixana-Wiki, Video library and
  Patent Ops for headcount; NFE2001 and NFE3001 for latency; Patent Sync beside
  the 207 figure for the bridge.

### 2.4 Same-page notes made to agree

On all ten named pages the top note's "figures are relative or anonymised" now
reads "all figures on this page are invented placeholders for this sample",
taking the closing note's wording as canonical. No classification changed and
nothing else was added: Procurement, Flow Tracker, AI Planning OS, AMS,
Bandwidth, Audit trail, Video library, Calendar sync, Gantt, Doc intelligence.

### 2.5 Recycled numbers — reported, not edited

Every collision below is left exactly as it is.

**41 — eight unrelated headline figures**

| Page | What 41 is |
| --- | --- |
| YR23 | escapes found after tapeout |
| Audit trail | change-history requests in a quarter |
| AI Planning OS | briefs taken through to an approved plan |
| Patent Sync | double-counted rows |
| WishKey | % of keys returned same day (and a second 41% in §01, the access-control option's attribution rate) |
| Flow Tracker | median minutes of review preparation |
| Ornithopter | seconds of the best flight |
| Dev kits | support tickets audited across the first six evaluations |

**248 — two unrelated registers:** Patent Sync's 248 workbook rows; Doc
intelligence's 248-row document register.

**214 — two unrelated figures:** Bandwidth's 214 minutes of exporting and
cleaning per cycle; Patent Ops' 214 docketed actions over twelve months.

**340 — twice on one page:** Ixana-Wiki's 340 hours a month lost to knowledge
search (§01) and 340 searches a week by month 3 (§08).

**31 — three populations (0.8), definitions still unconfirmed:** Flow Tracker's
31 leads; Gantt's 31 leads and architects; Patent Ops' 31 named inventors and
reviewers. Both Flow Tracker and Patent Ops report **"26 of 31"** as a tile
value, which makes the coincidence conspicuous.

---

## STEP 3 — per-page fixes

Fixes the page's own data settles:

| Page | Fix |
| --- | --- |
| YR31 | 0.10 default — the §05 clause promising a test-escape figure and its "How we counted" definition both deleted, since the figure is never quoted. Tradeoffs: "60 requests declined in public" → **31** (63 − the 32 in the three shipped categories). |
| Dev kits | Cumulative caption: floor crossed in **Q3 25**, not Q2 (Q2 is 38 against a 40 floor); "one quarter later than planned" still holds. 0.12 — the six-evaluation median is **28.5 days**, not 26, in the summary, the result line and the tile. |
| Ixana-Wiki | §05: "we hit four exclusions" → "we hit four of the five … moved back onto the roadmap pre-emptively, on his terms" — the trigger was more than five. |
| YR23 | Summary → "three initially classed blocking; all three ultimately closed in firmware"; definition scoped to "…at the time of triage" (with a TODO to confirm). "94% of 7 hosts" → "94% of link attempts across 7 host platforms". §03's delivery-tooling bullet: the two named tools post-date the programme, replaced with "instrumented stage and capacity data". |
| NFE3001 | Gate chart shows 3 pass / 3 fail at gen-1, so the summary reads "all six requirement lines are now met, including the three gen-1 missed" and the tile is relabelled "Requirement lines now met". |
| NFE2001 | Caption note that the 22 / 19 / 14 attribute bars overlap within the 54 rather than partition it. |
| Quantum | §05 now processes its own failed bar: ten qubits measures 244 ms against a 200 ms budget, the honest cap was nine, and the budget was revised silently. |
| Video library | 0.4 default — tiles follow the funnel: **70%** (171 of 244) and **11%** (78 of 690); summary updated to match; the before-side 8% reduced to a TODO. |
| Calendar sync | 0.5 default — the stacked series title reads "rising from 71 to **116** events" (W6 = 66+35+15). |
| AMS | Gate tile relabelled "Published causes carrying a signature", with "unconfirmed items publish as 'cause not confirmed'" beside the 100%. |
| Bandwidth | §09's "thirty tasks a cycle" → **34**, matching the two figures elsewhere on the page. |
| Gantt | Session caption → "sampled fortnightly over ten weeks" (five points); tile relabelled "**Distinct** tracking spreadsheets still maintained", consistent with the table's four spreadsheets against 9 of 22 people. |
| Doc intelligence | Derivation stated where it is used: "the 30 that exist only in the workspace — the 53 untracked less the 23 orphaned"; caption notes the §02 bars overlap (the 23 sit inside the 53). |
| Condenser mic | 0.20 default — tier line → "**at or under** about 17 dBA". Transient caption now says the source amplitude is scaled for visibility and the gain is set by turns ratio and loading, hence under 5× on a 1:5 transformer. |
| Ornithopter | Header span → **2021–2022**, matching the timeline field (Q3 2021 – Q2 2022). |
| e-car | Addressable-share caption: the three bars are not exhaustive — "the remaining ~5% sits in levers too small to chart". |
| Triple riding | 0.19 default — the confusion caption is scoped to the two dominant error classes; the §02 evidence cell now distinguishes 31% (of gate approaches) from §01's 12% (of all observed instances). |

Pages carrying only a flag, because the fix needs a fact: WishKey (0.1),
Reference designs (0.2), Flow Tracker (0.3), Dāsa, NeuroAdapt (0.15), UAV radar
(0.18), Sludge ROV (0.17).

### Rule-3 judgment calls (derived text fixed to agree with its data series)

1. **Dev kits, floor crossing.** Caption said Q2 2025; the series says 38 at Q2
   and 52 at Q3. Trusted the series.
2. **Video library tiles.** 64% and 8% → 31% contradicted the funnel they are
   drawn from. Trusted the funnel (70%, 11%) and reduced the unmapped 8% to a TODO.
3. **Calendar sync, W6.** Title said 129; the column stacks to 116. Trusted the
   column.
4. **NFE3001, "six missed lines".** The gate chart shows three passing at gen-1.
   Trusted the chart; the summary and tile moved.
5. **YR31, requests declined.** "60 declined" against 63 total with three
   categories shipped. Took 63 − 32 = 31 as the audit directs; **this number moves
   again if 0.11 changes the category split.**
6. **Flow Tracker, the 12-minute median.** Team medians are 11 / 10 / 16, whose
   median is 11. Kept 12 and stated in the caption that it is the median across
   all leads rather than the median of the three team medians — the only reading
   under which both are true. Worth confirming.
7. **YR23, "blocking".** The summary and the definition could not both stand.
   Applied the audit's default reconciliation (classified blocking at triage,
   closed in firmware later) and flagged it for confirmation rather than
   asserting it silently.
8. **Doc intelligence, overlap.** That the 23 orphaned sit inside the 53
   untracked is derivable — a document whose register row was deleted is by
   definition untracked, and 53 − 23 = 30 is the figure the summary already uses.

### Known side effect

Five pages now sit outside the word bands `verify-case-studies.js` enforces,
because the audit required extra clauses: dev kits (1208 / 1000–1200), Doc
intelligence (1008 / 800–1000), Quantum (735 / 500–700), YR23 (1218) and NFE3001
(1233). Trimming them would mean rewriting sentences no listed fix touches, so
they are reported rather than fixed. The checker's word count now ignores HTML
comments, so open TODOs do not inflate these numbers.

---

## STEP 4 — verification

Acceptance test: 56 assertions, all passing (regression set plus the new checks).

**Regression set, still exactly true.** Dāsa category n's sum to 100 and the
weighted mean is 0.843 ≈ 0.840 · Patent Ops filings sum to 52 across every half
and line, survival reads 61% / 18% at day 30 · Patent Sync 96+84+68 = 248,
dumbbell deltas sum to 41, 17+9+6 = 32 · e-car waterfall 42−36+21+5−2+1+1 = 32
and (42−32)/42 ≈ 24% · UAV tornado altitude 1.33 > 0.45+0.30+0.24+0.11 and
√(1.33²+0.45²) ≈ 1.40 · Bandwidth 214+168+96+62 = 540 min = 9 h · Flow Tracker
19+14+6+2 = 41 · WishKey marimekko columns each sum to 100 · Smart watch
190+195+140+145+150 = 820 · Mic 20·log10(25/17) = 3.35 dB ≈ 3.4 and 20 mV/Pa =
−34 dBV/Pa · SLB 55/56 = 98.2% · NFE3001 transfers 235 / 59 / 118 / 15 s ·
NFE2001 54+42 = 96 · Ornithopter 4+2+3 = 9 · Sludge 27 = 3×3×3 and 7+2 = 9 ·
Toys six radar axes over fourteen criteria · Audit trail 41−31 = 10 and
123/41 ≈ 3 h · ENVI-City 9 ± 7 = [2, 16] · COVID 9.5 / 12.4 / 10.9 · Doc
intelligence 248+53 = 301 and 30+23 = 53 · AMS slope before-mean 21.5, after-mean
84.5 · AI Planning OS histogram covers 41 runs and 68% of 41 ≈ 28.

**New checks.** No "How it works" heading and no arch block anywhere · sections
numbered sequentially from 01 on every page · all twelve migrated images resolve
on disk and sit in "What was built" · no date later than 2026-08 outside a TODO ·
no page keeps both note wordings · every slug still wired into the work grid ·
export TOC titles and eyebrows match the page headers · every STEP 0/3 item
either resolved or carrying a TODO.

**Links.** Diffed against a pre-pass snapshot of every slug, URL and image path.
Evidence URLs and slugs: **identical, none added or removed**. The only image
paths that disappeared are the architecture figures STEP 1 deletes; no path was
renamed and none was added.

---

## Still needed from you

Answer these and the 37 TODO markers come out.

| # | Page | What is needed |
| --- | --- | --- |
| 0.1 | WishKey | True cabinet count / slot configuration / keys figure. 22 × 30 = 660 against "3,400+" and the marimekko's 3,420. Tiles, column widths and the caption all resweep from it. |
| 0.2 | Reference designs | True stage counts and each stage's definition. The table's deaths account for all 27, leaving nobody where the funnel shows 2. |
| 0.3 | Flow Tracker | Define the three populations once (flagship Monday reviews / 31 leads / 11 calendar-sampled), and one sentence on where the ~25% of misclassifications go that the 4.2% correction rate never sees. |
| 0.4 | Video library | The true before-side figure for published minutes — 8% maps to nothing in 212/38/14/6. |
| 0.5 | Calendar sync | Is the 6 double-bookings a month the externally visible rate against the diary's total? Does the tenant hold 12 mailboxes? |
| 0.6 | Wiki, Video library, Patent Ops | The headcount trajectory to state wherever 75 or 140 appears. |
| 0.7 | NFE2001, NFE3001 | Gen-1 latency: 0.6 ms or 0.9 ms, or the clause that distinguishes them. |
| 0.8 | Flow Tracker, Gantt, Patent Ops | Real definitions of the three "31" populations, or confirmation that it is coincidence. |
| 0.9 | Patent Sync | One sentence bridging the 207-patent portfolio to Patent Ops' 52 filings / 54 active matters. |
| 0.11 | YR31 | True category split summing to 63, and true unblock counts. **The "31 requests declined" figure depends on this.** |
| 0.13 | Dev kits | Kit team vs company applications team — the roster says one applications engineer, §01 sizes against three. |
| 0.14 | NFE2001 | How 104 responses came from a coded population of 96. |
| 0.15 | NeuroAdapt | Exclusive audit counts (19 + 4 = 23 of 22), and whether §02's 7 ambiguous-on-synchrony sit inside §01's 11. |
| 0.16 | Ornithopter | 24 sightings in total, or 24 per distance. The bird-rate curve recomputes from the answer. |
| 0.17 | Sludge ROV | True traction threshold — 1.18 g/cm³ sits above the stated 1.15 and still buried the tracks. |
| 0.18 | UAV radar | Three campuses or four. |
| 0.19 | Triple riding | What the remaining 27 of the 105 errors are. |
| — | Dev kits | Ticket count for the copper-tape cluster, or mark it un-ticketed. If the four clusters partition the 41 audited tickets it is 15. |
| — | Dāsa | Whether the 40 spot checks are the same 40 out-of-scope questions used in §01. |
| — | YR23 | Confirm the three escapes were classed blocking at triage. |
| — | YR31 | What the failing 6% of the interop guardrail is. |
| — | NFE3001 | Confirm the fourteen stalled evaluations sit inside the gen-1 page's 26. |
| — | WishKey | What an unattributed removal is mechanically; split values for the merged override/unattributed band. |
| — | e-car | Confirm the unscored remainder is ~5%. |
| — | Audit trail, Gantt, Video library | The real observation windows for the three series that currently run past today. |

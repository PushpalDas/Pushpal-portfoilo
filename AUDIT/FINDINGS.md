# FINDINGS

One block per project: rubric verdict; parity table; open-question resolutions
(before → after → where changed); AUTHOR-CONFIRM items (implemented default + one-line question).

Format for parity rows:
`| Claim (quote + section) | Where demo must show it | MATCH / MISSING-IN-DEMO / CONTRADICTS / DEMO-ONLY |`

---

## Phase 0 findings

- **F0.1** — Card images in `app/work/constants.ts` are predominantly AI-generated illustrations
  (`Gemini_Generated_Image_*.png`), not screenshots of the linked surfaces. Phase 3 must decide
  per project whether the image claims to be a snapshot of the demo (replace with real capture)
  or is explicit card art. Tier B/C snapshots recaptured after Phase 4 regardless.
- **F0.2** — `data/case-studies.json` (v1) coexists with `data/case-studies-v2.json`. RESOLVED:
  `app/work/[slug]/page.tsx` checks v2 first; all 36 audited slugs live in v2. v2 is the edit target.
- **F0.3 — BUILD WAS BROKEN.** `npm run build` failed with 303 Turbopack errors, all from scratch
  project dumps under `app/Changes/` (incl. a full copy of the xana-nine app source at
  `app/Changes/dummy` — useful later for §9A token extraction). Fix: moved `app/Changes` →
  `Changes-archive/` at repo root (couldn't use `Changes/`; Windows case-insensitive collision with
  existing `changes/`). Only comment references existed in real code. Verify build passes after move.
- **F0.4** — Open questions live in source as `<!-- TODO(pushpal): ... -->` HTML comments inside
  JSON strings of case-studies-v2.json (32 at audit start). Each must be resolved and deleted.
- **Canonical cross-page decisions** (use everywhere):
  - Headcount trajectory: **~75 in 2024, ~140 by mid-2025** (TODO 0.6 on P3/P25-area/P26).

---

## P1 — Wi-R BAN YR31 (A-lock)

**Rubric verdict: Pass-with-edits.** Voice, tradeoffs, guardrails, 09 all strong. Arithmetic
recomputed clean (−82/−80/−38/+21/+67 all check; 9+17+6+31=63; 32/34≈94%).
**Open-Q resolutions:**
- 0.11 (categories sum 67≠63; unblock=request-count coincidence) → chart rows now carry request
  counts in names summing to 63 (17+9+6+4+3+24), values decoupled (12/8/7/4/2/2; package stays 4
  per §09; cut line 5 keeps three above), trim n 6→5 so §02 "cost a third as much" holds (5/14≈⅓).
  Title updated to match. TODO deleted.
- Interop 6% → named in How-we-counted: 34 host designs, 2 early eval boards out of timing spec,
  fail identically on YR23 (consistent with YR23's own 94% interop), documented. TODO deleted.
**External to verify (batch):** ixana.ai/products/chips/wi-r-ban. Parity: product-page-only demo
surface; spec claims (20 Mbit/s, <6 mW, sub-0.2 ms) to check against live page.

## P2 — Wi-R Dev Kits (A-lock)

**Rubric verdict: Pass-with-edits.** Median 28.5 of {49,38,31,26,22,18} ✓; floor crossed Q3 25 in
chart {4,13,24,38,52,62} ✓; 9 of 34 → 25 unexplained in §09 ✓.
**Open-Q resolutions:**
- 0.13 (apps-eng 3 vs roster 1) → sizing caption now says company applications function of three,
  kit team borrows one. TODO deleted.
- Missing ticket count → copper-tape row now "6 of 6; 15 tickets" (41−11−9−6=15 partition). Deleted.
**External to verify:** ixana.ai/products/dev-kits, chips/wi-r-ban, chips/wi-r-nfe.

## P3 — Ixana-Wiki (A-lock, external xana-nine)

**Rubric verdict: Pass-with-edits.**
- 0.6 headcount → Result now states "140 being the mid-2025 roster, up from about 75 a year
  earlier". TODO deleted. Same trajectory to be applied at P25-area (line ~1587) and P26 (~12704).
- CONTRADICTION fixed: constants.ts year '2026 ' vs body (eyebrow 2025, timeline Jan–Aug 2025,
  WAU chart Jun–Aug 2025) → constants year now '2025'.
**External to verify (browser batch):** xana-nine.vercel.app/?q=YR31%20power%20budget;
/myfiles/view/doc-walkthrough-video, doc-adoption-sheet, doc-alpha-readout; /myfiles;
github.com/PushpalDas/Ixana-Wiki (card href).

## P4 — Dāsa (A-lock)

**Rubric verdict: Pass-with-edits.** nDCG weighted avg (n=24/21/18/14/12/11, Σ=100) = 0.8427 ≈
0.840 ✓; 37/40 guardrail consistent.
- Open Q (40 spot checks) → declared a separate set from §01's 40 refusal tests (avoids a new
  34=40−6 coincidence). TODO deleted.
- Card copy "up from 17" → "down from 17" (direction error; fabrications fell 17→0).
**External to verify:** YouTube S4G_99Yn2M4 + claims-match against walkthrough.

## P5 — Wi-R BAN YR23 (A-lock)

**Rubric verdict: Pass-with-edits.** Escapes 15+11+7+5+2+1=41 ✓; top-3 33/41=80% ✓; 19/24 trim and
median 11 d match P1's before-values ✓; 26/41 non-silicon consistent in two places ✓; 94% interop
(7 platforms, link attempts) coheres with P1 parity reading (34 designs era-grown from 7).
- Open Q (blocking at triage) → How-we-counted now states the three were blocking as triaged and
  later driver work closed them (reclassification the summary counts). TODO deleted.
**External to verify:** chips/wi-r-ban; blog/wi-r-technology-white-paper.
**Note:** §06 Gallery item labeled "Untitled" — cosmetic; check how it renders (candidate fix:
give the network diagram its caption as title). AUTHOR-CONFIRM if renaming changes meaning.

## P6 — NeuroAdapt (C-bespoke)
**Rubric verdict: Pass.** 102/120=0.85 ✓; 87%≥80% bar ✓; 19/14/11/3 of 22 coherent; four burst
definitions (0.82/0.82/1.00/8.6) ✓. No open Qs. Parity + redesign pending (deep links:
?view=definitions&metric=burst&unit=1, view=run, view=units&unit=1, view=population&pair=4-5,
view=export&format=nwb). Whitepaper + Drive link to verify.

## P9 — Soil mineral (D-gap)
Card copy stands alone. **AUTHOR-CONFIRM AC-9:** keep card-only, or commission a case study?
Implemented default: left as card-only (no slug, renders no detail page).

## P10 — Quantum Gate Simulator (C-bespoke)
**Rubric verdict: Pass-with-edits.** Curve {4,15,62,121,244,610,1420} over x {4,6,8,9,10,11,12} =
~2×/qubit; "about four per qubit" contradicted the data → "roughly doubling with each added qubit"
in JSON caption + demo HTML (public/demo/quantum-simulator.html). 244 ms vs 200 budget ✓; 32=22+10 ✓.

## P11 — Procurement Orchestrator (B-ixana)
**Rubric verdict: Pass.** 21/23, 0/23, 2/23, 3.6→0.6 d, 4 blocked above-ceiling, 4 exceptions/1
silent failure all internally consistent. Parity/redesign pending; 7 deep links incl.
?view=gates&as=priya. Invariant: no supplier/price/requester surfaced beyond invented personas.

## P12 — WishKey (A-lock)
**Rubric verdict: Pass-with-edits.** Open-Q resolutions:
- Marimekko band merge → declared deliberate in caption. TODO deleted.
- 0.1 (660 slots vs 3,420 keys) → keys-per-bunch sentence in How-we-counted (~5 keys per tagged
  bunch behind 660 locks); §06 "thirty tagged keys" → "thirty tagged key bunches".
  **AUTHOR-CONFIRM AC-12:** is the bunch model the real configuration? One-line answer suffices.
- Unattributed removal mechanics → defined (tag-out with no authenticated session).
External: eegrab.com brochure PDF + YouTube 8etIl_0wj0I to verify.

## P13 — Wi-R reference designs (A-lock)
**Rubric verdict: Pass-with-edits.** Open-Q 0.2 (table vs funnel) → funnel now ends at 0
(27→24→11→5→0; drops 3/13/6/5 = exactly the table rows), title + caption state the stage
definitions. Rounding fixed: 79/31/23% → 78/30/22% (21/27, 8/27, 6/27). TODO deleted.
External: 2 Vimeo links + reference-designs page to verify.

## P14 — Smart watch (A/D-gap)
**Rubric verdict: Pass.** BOM shares sum 100 ✓; ₹820<₹900 ✓. Page already states "no public
product page to link" honestly. **AUTHOR-CONFIRM AC-14:** accept absent evidence link as stated,
or add a board-photo gallery item? Default: left as-is (note already covers it).

## P15 — Team performance reporting (B-ixana)
**Rubric verdict: Pass.** 69/82=84% ✓; 32/38=84% ✓; 66 h = four teams without standing report ✓.
Parity/redesign pending; 7 deep links.

## P16 — Scrum ecosystem (B-ixana)
**Rubric verdict: Pass.** 61 of 218 (24+22+15 / 82+71+65) ✓ 28% ✓; 37.4 h split ✓; 61%→11% state
minutes coherent with 18→9 median. Parity/redesign pending (sprint day 6, sprint 41, 4 tabs).

## P17 — Flow Tracker (A-lock, xana-nine)
**Rubric verdict: Pass-with-edits.** Both 0.3 TODOs resolved in How-we-counted: three populations
defined (3 Monday-review leads / 31 adoption denominator / 11 calendar sample); 71%-vs-4.2% gap
closed (accuracy sampled over all tasks, corrections only touch reviewed stages). TODOs deleted.
External deep links to verify: team=rtl&mode=wrong&stage=9; panel=3&task=ps-04; board=1;
?q=Why%20is%20the%20AMS%20layout%20behind%3F; behavioral claims (best-engineer refusal).

## P18 — ClickUp Activity Tracker (B-ixana)
**Rubric verdict: Pass-with-edits.** 123h/41≈3h ✓; 41−31=10 ✓. Open Q (future-dated series) →
caption now "first seven weeks live, Jun–Jul 2026". TODO deleted. Parity/redesign pending
(?q=Aug+14, view=feed 380-entry task, view=questions, view=ingest, raw-event filter link).

## P19 — Video library (A-lock, xana-nine)
**Rubric verdict: Pass-with-edits.** Open-Q resolutions: §09 31% → 11% (78/690); funnel caption →
"Mar–Aug 2026 — the first five months after launch"; 0.6 headcount trajectory added to
How-we-counted. 38/212=18%, 244/690=35% ✓. TODOs deleted.
External: ?q=milliwatts, ?v=meeting-integration&ask=1, &tab=notes.

## P20 — Calendar sync (D-gap)
**Rubric verdict: Pass-with-edits.** Both 0.5 TODOs resolved in How-we-counted: 6/month = externally
visible rate vs diary 11/fortnight all-clash count; Outlook tenant = the smaller 12-mailbox tenant
(keeps §05 CEO line coherent). TODOs deleted.
**AUTHOR-CONFIRM AC-20:** recommend a small Tier-B demo (/demo/calendar-sync): a dry-run preview
screen (per-event action list), the opaque-block rendering, and the 12→1 credential scope panel —
three screens, invented data, xana-nine tokens. Alternatively one line on the page stating why no
public demo exists. Default implemented: neither (page ships as-is); decision is the author's.

## P21 — AI Salary Generator (B-ixana)
**Rubric verdict: Pass-with-edits.** 6/26=23% ✓; 4-of-7 refusals ✓ vs two flat families ✓
(refused families' only reqs). CONTRADICTION fixed: "three job families" (meta.stage) and "seven
families" (tradeoff) vs five in the chart → both now say five. Parity/redesign pending
(?view=floor&role=dv4-sj; evidence/band/equity/cross-market links; slots-unfilled behavior).

## P22 — AI product planning OS (B-ixana)
**Rubric verdict: Pass.** 44 runs − 3 unopened = 41 ✓; 27/30 vs 19/30 demo'd ✓; double→40% cost
story coherent. Parity/redesign pending (6 deep links; SameModelError behavior; 40 in-page rules).

## P23 — AI Lawyer (B-ixana)
**Rubric verdict: Pass.** 34/76≈45% ✓; 0.91×15.4≈14% ✓; 447+60=507 ✓; $1.77–2.31 < $2.50 ✓.
Parity/redesign pending (6 deep links; wrong-art refusal; corpus slider; intake refusal).

## P24 — ClickUp Gantt (B-ixana)
**Rubric verdict: Pass-with-edits.** Open Q (future-dated series) → caption now May–Jul 2026.
26/31 errors fixed via deep links ✓; 22/31 weekly ✓ consistent with P17's 31-lead population.
Parity/redesign pending (pinned Wednesday; view=delays&task=86a2rb4hn; scale=quarter 0-requests
readout; bandwidth refusals).

## P25 — Meeting notetaker (A-lock, xana-nine)
**Rubric verdict: Pass.** 198 of 199 eligible = 99.5% vs 95% floor ✓ (how-we-counted covers);
4/66≈6% ✓; 13/212≈6% ✓; 5→21 of 24 ✓. External deep links: player meeting-power-review tab=notes,
?q=What%20was%20left%20unresolved%3F, /meetingrecordings.

## P26 — Patent program ops (A-lock, xana-nine)
**Rubric verdict: Pass-with-edits.** 0.6 headcount → trajectory stated in Problem (75 in 2024 →
~140 mid-2025). 248 rows/207 families/52 owned filings coherent; filings 8+10+12+12+7+3=52 ✓.
External: /patents, /patents/tracker, /patents/invoices (+?view=upload); 18 lanes; ask "six of
fifteen past internal action date".

## P27 — Document change intelligence (A-lock, xana-nine)
**Rubric verdict: Pass.** 301−248=53; 53−23=30 ✓. External: /myfiles?tab=clickup,
/documents/doc_onboarding.

## P28 — Condenser mic (A/D-gap)
**Rubric verdict: Pass-with-edits.** One capsule datum −3.1 breached the ±3 "in-spec" window →
−2.95. Shipped array within ±0.38 ✓ ±0.4 claim. **AUTHOR-CONFIRM AC-28:** no external evidence
link; note already declares it. Default: ship as stated.

## P29 — Sensor signal generator (D-gap)
**Rubric verdict: Pass.** 55/56=98.2% ✓; three real-figure carve-outs clearly declared.
**AUTHOR-CONFIRM AC-29:** no demo/evidence link; bench photos are in-page. Default: ship as stated.

## P30 — Ornithopter (C-bespoke)
**Rubric verdict: Pass-with-edits.** 0.16 resolved: 24 sightings per distance (96 total); curve
re-computed 29/67/83/88; guardrail tile 68→67%; "two thirds at 40 m" still true (16/24). Parity:
?preset=flew must set 41 s; coverage arithmetic panel.

## P31 — Carbon positive e-car (C-optional)
**Rubric verdict: Pass-with-edits.** Waterfall 42−36+21+5−2+1+1=32 ✓; 32/42→24% below ✓. Open Q
(remainder) → caption names the ~5% unscored tail. **AUTHOR-CONFIRM AC-31:** propose optional
paper-grounded concept demo (energy-conservation checker: the §02 claims table as an interactive
audit, each claim pass/fail with the physics) — NOT built by default; paper remains the demo.

## P32 — Radar calibration (C-bespoke)
**Rubric verdict: Pass-with-edits.** 0.18 → three campuses both places. RSS check: √(0.665²+0.225²)
≈0.70→1.4 dB ✓ of 1.5 budget; five terms present. Parity: ?preset=bom → ±1.5 m → 5.73 dB total.

## P33 — COVID bench (C-bespoke)
**Rubric verdict: Pass.** Registry's "3-vs-4 campuses" already consistent in source (three
universities everywhere). 58+27+15=100 ✓; phase sums 9.5/12.4/10.9 ✓. Parity: ?cond=still with all
params ticked → saving stays zero; channel board; gowning-cycles counter.

## P34 — Rider count (C-bespoke)
**Rubric verdict: Pass-with-edits.** 0.19 → remaining 27 errors named (19 one-rider over-counts +
8 missed-vehicle). 64+14+19+8=105 ✓. Invariant: counts only, no frame anywhere — extends to
placeholder assets in redesign. Parity: ?view=eval&cell=1-2 → the 64 over-counted clips.

## P35 — Autism bench (C-bespoke)
**Rubric verdict: Pass.** Criteria sums 14/14/14 ✓; 2-of-3 sign-off ✓; ₹10k vs ₹5k target ✓.
No open Qs (registry's "105-vs-78" was P34's). Parity: ?i=gantry&letter=A&test=pull → pull-away
finishes the stroke (criterion 01 failure); 3 interactions × 14 criteria.

## P36 — Sludge ROV (C-bespoke)
**Rubric verdict: Pass-with-edits.** Both 0.17 TODOs resolved by adopting the demo's margin story
(1.18 = 0.03 inside the band, spent by a running track; settled at 0.27 margin) into caption and
§06 — densities unchanged everywhere, demo already aligned. 27=3×3×3 ✓.

## P37 — ENVI-City (C-create)
**Rubric verdict: Pass.** 54+31+15=100 ✓; 11→7→4→1 ✓; intervals coherent. No open Qs. Phase 4:
create /demo/envi-city strictly from ECS Trans. 107(1) 11007 claims; add to evidence after the
DOI ("the demo is the paper" stays first).

## Appendix
**Copy-edit pass: clean.** 17 rows counted ✓. Table render check in Phase 5.

## Phase 1 status: COMPLETE for all 37 + appendix. Zero TODO(pushpal) notes remain in source.


---

# PHASE 2 — parity results (in-repo demos, verified by line-level read + re-execution)

## In-repo demo parity verdicts
- **P6 neuroadapt**: all numeric claims MATCH (0.82/0.82/1.00/8.6; CV 3.16/1.07; 102/120=0.85;
  87%; flat correlogram verified by execution). FIXED: ?unit range-checked (was white-screening).
  Phase-4 notes: ?metric/?format unvalidated; view=ask is DEMO-ONLY (acceptable).
- **P10 quantum-simulator**: 32 tests (22+10) pass re-executed; 11-qubit refusal asserted; deep
  links MATCH. FIXED: three residual "quadruples/four times" strings -> doubling.
- **P11 procurement-desk**: dataset exact (23/21/2/0; median 0.6 d; 4 blocked; 4 exceptions).
  Phase-4: gate 3 "1 of 1" hard-coded (count from s.silent); PR-2043 delivered so "next action
  names a person" fails on the s06 deep link (re-seed in-flight w/ 7 transitions); syncUrl strips
  item/amount/try.
- **P15 team-performance**: all MATCH (84%=32/38; 6/8/7 steps; no-cause faller 14->10->6).
  Phase-4: honor ?as before default persona so T-2214 signing refusal is reachable.
- **P16 scrum-desk**: all MATCH (218/61; 82/24 71/22 65/15; 2 blocked; T-4141 2 days).
- **P18 clickup-audit**: all MATCH (380 entries, answer at 268; 9 July records; 9.2%; 401 on
  tamper; Wed 26 Aug 2026 verified). Phase-4: validate ?field.
- **P21 salary-bands**: 3 banded/4 refused; 56k spread; suppression 4<8; zero-weight blr rows all
  MATCH. Phase-4 fixes: (a) self-reported must carry the lowest weight (S5 recruiter currently
  lower), (b) one global per-method weight table, (c) band-strip P25/P50 + floorCheck strings
  through fig() or soften "every figure clickable", (d) cite the hard-coded "25th" numeral.
- **P22 prd-os**: 40 rules pass; 44->41 rows; 6m40s/3.2->1.4/68% re-executed; SameModelError.
  FIXED (case study): scorecard alt text -> "written note under every criterion it objected to".
- **P23 ai-lawyer**: costs/times/corpus re-executed ($1.77/$2.31; 5m12s; 91%<->14%). FIXED (case
  study): engineering-doc run 8-of-9-with-1 -> 5-of-6-with-4 (demo values load-bearing).
  Phase-4: add 507-test (447+60) stat line; align gaps-tab copy (support level vs 112(a) grade);
  validate ?tab.
- **P30 ornithopter**: FIXED: stale bird rates -> 29/67/83/88; two-thirds headline; speed dial
  capped 12 m/s; ?preset=honest deep-links; aria-pressed tracked. 103-min deficit cross-check ok.
- **P32 radar-error-budget**: swings/totals MATCH (1.46/5.73 re-derived). Phase-4: add 0.5 dB
  positioning pass mark (s05 guardrail); name u-blox NEO-M8N on bom preset; add the four
  reported->attributed pairs (1.8->1.5, 1.4->1.1, 1.1->0.9, 2.2->1.9); asymmetric bounds;
  margin framing for demanded 0.35 vs closure 0.36.
- **P33 covid-bench**: all-ticked -> zero saving in every condition MATCHES. Phase-4: footer
  "untick those two" needs pulse too; state "four of these five" design scope; add +/-1.4 breaths,
  3.5/4.8 phase split, and a real gowning-cycles count.
- **P34 rider-count**: privacy invariant VERIFIED (zero img/video/canvas/base64/url() anywhere).
  FIXED (case study): 105 -> 114 with real remainder (20/12/3/1). Phase-4: validate ?cell;
  surface the 31% drop-and-remount figure; 1,840 = daylight+overcast set (framing note).
- **P36 sludge-envelope**: cleanest — densities 1.02/1.18/1.42; margins 0.03/0.27 verbatim.
  Phase-4: stall-events vs runs denominators; bind 7-of-9 to tether extraction.

## External surface verdicts (WebFetch batch)
- ixana.ai chips/wi-r-ban: YR31 + YR23 spec rows MATCH exactly. products/dev-kits: both kits
  listed. chips/wi-r-nfe: XA-NFE2001 row MATCHES (0.08 nJ/bit x 5 Mbit/s ~ 0.4 mW).
- **F2.1 — XA-NFE3001 live page says "Up to 30 Mbit/s, <1 ms"** while the case study and the
  Feb 2026 announcement both say 20 Mbit/s PHY / ~13.5 goodput / <0.2 ms / <6 mW (announcement
  fetched, MATCHES verbatim incl. 100 MB ~ 59 s). Live page lists a newer bin.
  **AUTHOR-CONFIRM AC-7:** keep announcement-anchored figures (default), or update to 30?
- **F2.2 — P8 launch-announcement link 404s**; no equivalent on the live blog. FIXED: link
  removed; notes adjusted. **AUTHOR-CONFIRM AC-8:** restore if a real URL exists.
- blog/wi-r-technology-white-paper OK (sources the 50x NFC claim). reference-designs page OK.
  arXiv 2512.07167 OK. Vimeo x2 reachable, titles match (playback behind bot-check — confirm in
  browser). YouTube S4G_99Yn2M4 title fragment "Bhaja Gauranga" (confirm walkthrough in browser);
  8etIl_0wj0I inconclusive (browser). eegrab WishKey brochure PDF reachable (1.6 MB). ECS DOI OK
  (Pushpal Das first author). ShareOK OK. IEEE DOIs resolve.
- **F2.3 — github.com/PushpalDas/Ixana-Wiki 404s.** FIXED: card href removed.
  **AUTHOR-CONFIRM AC-3b:** restore if private/renamed.
- Pending browser pass: xana-nine deep links (P3/17/19/25/26/27), Drive folder (P6),
  patents.google + mqtt.org (P33), YouTube confirmations.


## Phase 2/3 — xana-nine (P3/P17/P19/P25/P26/P27), source-verified
The deployed app's source lives at Changes-archive/dummy (repo github.com/PushpalDas/xana,
package ixana-wiki-dummy). Verification against that source: overwhelmingly MATCH — including
the hard states (?q= assistant answers, T-2214-style drawers, 6-of-15 overdue with the
readiness-dates caveat, 18 matters, 48 tasks / 4.2% correction rate, the amber invoice gate,
captured/minuted/excluded never summed, the 3.1/4.6 mW figures with conditions, Sam's objection,
"Not decided", the nightly run that checked nothing).

**F2.4 — THE MOST MATERIAL LAUNCH ITEM: the deployed app lags the source.** The dummy working
tree is ~11 files ahead of origin/main (HEAD 1b37b44, 2026-08-30). At deployed HEAD these
case-study promises FAIL live: /myfiles?tab=clickup (no tab deep link), player ?q= answers,
meetingrecordings counts + per-card decision/action counts, the authored Q&A/figures/Not-decided
notes content. This also explains Phase 3: the stored screenshots depict the WORKING-TREE app
(richer than live) — they are not stale; the deployment is.
**AUTHOR-CONFIRM AC-XANA (top of the list):** commit and push Changes-archive/dummy to
github.com/PushpalDas/xana so Vercel redeploys. Until then, six pages' deep links underdeliver.

Fixes I applied to the dummy source so the push carries full parity:
- player [id]/page.tsx: consumes ?t= and seeks once media is ready (citation links already sent it).
- VideoModal.tsx: #ts= citations now render as seek pills in notes and answers (was plain links).
- Home.tsx: superseded badge on search-result rows (flag was returned and dropped).
- TaskTracker.tsx: RTL header now states "54% on a 200-task sample" (was a code comment).
- efficiency-demo-data.ts: best-engineer refusal opens "The ranking does not exist."
- patent-demo-data.ts: overdue answer lists all six matters, not the top three.
- PatentListPanel.tsx: legend line "Overdue is measured against internal readiness dates, never
  statutory ones."

Case-study edits (source cannot support the claim):
- P26 timeline window April→February 2024; P26 "two kinds drawn differently" bullet reworded to
  the docket-mirroring the app actually does.
Accepted as product-stats (no demo change): P19 "690 recordings"/"11% minutes" (describe the real
archive, not the 8-item recreation); P3 "p.2 lands on page two" (pages are stamped; navigation is
route-level) — logged, not edited.

## Phase 3 — Tier A snapshots
24 live captures at 1440x900 compared against stored images: 14 exact/equivalent matches; the
divergent ones all trace to the deployment lag (F2.4) or to interaction-dependent states the
stored images capture correctly (popover open, ask answered, Gantt view, invoice modal, compare
tab). DECISION: stored Tier-A screenshots are KEPT — they depict the source-of-truth app; the
fix is the deploy, not the images. Re-verify against live after the author pushes (one capture
run: scratchpad/capture-xana.mjs).

- **F2.5 — Google Drive evidence links are not public.** Both
  drive.google.com/drive/u/0/folders/1B0mtA9… (P6 "Demo recording and project documents") and
  …/1XhqFiIQ… (P37 card href) 302 to a Google sign-in — a reviewer hits a login wall.
  **AUTHOR-CONFIRM AC-DRIVE:** set both folders to "anyone with the link can view", or drop the
  links. Left in place (they may be intentionally semi-private); flagged for launch.

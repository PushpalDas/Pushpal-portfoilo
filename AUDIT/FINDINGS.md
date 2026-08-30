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

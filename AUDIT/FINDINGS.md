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

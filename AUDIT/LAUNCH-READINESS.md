# LAUNCH READINESS — final report
2026-08-31 · branch `feat/work-highlights` · full audit trail in FINDINGS.md / CHANGELOG.md / DESIGN-NOTES.md

## Verdict table — all 37 + appendix

| # | Project | Verdict |
|---|---|---|
| 1 | Wi-R BAN YR31 | ✅ Ship. Open Qs resolved (63-sum, interop 6%); live ixana.ai specs match exactly. |
| 2 | Wi-R Dev Kits | ✅ Ship. Sizing clause + ticket partition fixed; product pages match. |
| 3 | Ixana-Wiki | ✅ Ship after AC-XANA push. Year fixed 2025; headcount trajectory stated; dead GitHub href removed. |
| 4 | Dāsa | ✅ Ship. Spot-check set declared; card direction fixed. YouTube walkthrough title-verified only (see limitations). |
| 5 | Wi-R BAN YR23 | ✅ Ship. Blocking-at-triage stated; specs match live page. |
| 6 | NeuroAdapt | ✅ Ship. Parity re-executed; redesigned (instrument-grade sheet); params hardened. |
| 7 | Wi-R NFE XA-NFE3001 | ✅ Ship with AC-7 open (live page now lists 30 Mbit/s vs the announcement's 20 the page anchors to). |
| 8 | Wi-R NFE XA-NFE2001 | ✅ Ship. 104-from-96 stated; latency clause both sides; dead launch link removed (AC-8); arXiv resolves. |
| 9 | Soil mineral estimation | ✅ Ship as card-only (AC-9). |
| 10 | Quantum Gate Simulator | ✅ Ship. 32/32 in-page tests pass post-redesign (luminous-dark lab); doubling wording consistent everywhere. |
| 11 | Procurement Orchestrator | ✅ Ship. Dataset exact; gates computed; PR-2043 re-seeded in-flight; xana-sibling redesign. |
| 12 | WishKey KMS | ✅ Ship. Key-bunch model reconciles 660/3,420 (AC-12); brochure PDF reachable. |
| 13 | Wi-R reference designs | ✅ Ship. Funnel ends at zero, drops = table rows; both Vimeo titles match (playability behind bot-check). |
| 14 | Smart watch | ✅ Ship as-is (AC-14; the page already owns its data-thinness). |
| 15 | Team performance reporting | ✅ Ship. 84%=32/38 etc. re-executed; ?as honored; signing refusal reachable; xana sibling. |
| 16 | Scrum ecosystem | ✅ Ship. 218/61 replay intact; ceremony-board redesign; day scrub in chrome. |
| 17 | Flow Tracker | ✅ Ship after AC-XANA push. Populations + 4.2%-vs-71% closed; 54%-on-200 now on screen (patched source). |
| 18 | ClickUp Activity Tracker | ✅ Ship. Full parity incl. entry-268; series re-dated Jun–Jul 2026; ?field validated; xana sibling. |
| 19 | Video library | ✅ Ship after AC-XANA push. 11% fixed; window Mar–Aug; #ts= pills patched into the modal. |
| 20 | Calendar sync | ✅ Ship. Both 0.5 Qs resolved; AC-20: small Tier-B demo proposed, not built (author's call). |
| 21 | AI Salary Generator | ✅ Ship. Family count 5; global method weights make the page's own claims true; refusal-first redesign. |
| 22 | AI product planning OS | ✅ Ship. 40/40 rules pass post-redesign; scorecard claim precise. |
| 23 | AI Lawyer | ✅ Ship. Engineering-doc run 5-of-6-with-4 both sides; $1.77/$2.31/5m12s recomputed; 507-test line added. |
| 24 | ClickUp Gantt | ✅ Ship. Plan lanes only where slipped; workspace-scale line added; series re-dated; xana sibling. |
| 25 | Meeting notetaker | ✅ Ship after AC-XANA push. All authored-notes claims verified in source; 198/199 eligible coherent. |
| 26 | Patent program ops | ✅ Ship after AC-XANA push. Trajectory stated; window Feb 2024; date-kinds bullet matches the app; all-six overdue listing patched. |
| 27 | Document change intelligence | ✅ Ship after AC-XANA push (tab deep link lives in the unpushed tree). 53−23=30 coherent. |
| 28 | Condenser microphone | ✅ Ship (AC-28). Capsule datum brought inside the ±3 window; shipped array inside ±0.4. |
| 29 | Sensor signal generator | ✅ Ship (AC-29). Three real-figure carve-outs clearly declared. |
| 30 | Ornithopter | ✅ Ship. 24-per-distance resolved (29/67/83/88 both sides); speed dial plausible; field-notebook redesign; stamped 41-second verdict. |
| 31 | Carbon positive e-car | ✅ Ship. Waterfall closes at 32 t; remainder named; AC-31: optional concept demo proposed, not built. |
| 32 | Radar calibration | ✅ Ship. 0.5 dB pass mark now on the page; NEO-M8N named; four-experiment table added; 0.35-vs-0.36 reconciled. |
| 33 | COVID bench | ✅ Ship. Zero-saving invariant re-verified; gowning-cycles counter real; pulse honesty both sides. |
| 34 | Rider count | ✅ Ship. Error total 114 reconciled to the matrix; privacy invariant re-verified post-redesign (zero imagery). |
| 35 | Autism bench | ✅ Ship. 2-of-3 sign-off explicit; six-dimension chart added; pull-away test verified mid-stroke→finishes. |
| 36 | Sludge ROV | ✅ Ship. Margin story (0.03 vs 0.27) both sides; stall-events semantics both sides; workshop-instrument redesign. |
| 37 | ENVI-City | ✅ Ship. /demo/envi-city created strictly from the paper; 11→7→4→1 funnel; wired into evidence + card. |
| — | Appendix | ✅ Ship. 17 rows, copy clean. |

## The ten most material fixes
1. **The production build was broken** (303 errors from scratch trees inside `app/`) — fixed; builds clean, typed, with the full route table.
2. **The deployed xana-nine app lags its own source** — six pages' deep-link promises only hold in the unpushed tree; committed locally as `e056966` in `Changes-archive/dummy` with 7 additional parity patches (type-checks clean). One push deploys it (AC-XANA).
3. **All 16 in-repo demos redesigned** to the §9 bar — 8 as verified xana-nine siblings, 8 with mutually distinct bespoke identities — with every deep link, dataset and invariant re-verified by headless execution afterward; **plus /demo/envi-city created**. 82 demo states, 0 console errors.
4. **Every one of the 32 open authoring questions resolved in source** and the notes deleted; no `TODO(pushpal)` ships.
5. **P34's error accounting reconciled to its own confusion matrix** (105 → 114, remainder named) — the kind of arithmetic a sharp reviewer checks first.
6. **P13's stalled-evaluation funnel now ends at zero** with drops exactly equal to the table rows (was: two contradictory stories).
7. **P1's request ranking decoupled from request counts** and the categories made to sum to 63; the interop 6% is now named.
8. **Stale and future-dated figures corrected everywhere** (P30's pre-correction bird rates in the demo; P18/P24 series dated past today; P19's 31%-vs-11%).
9. **Dead evidence links removed** (P8 launch announcement 404; P3 GitHub 404) rather than shipped broken.
10. **All Tier B/C case-study screenshots and cards recaptured from the redesigned demos** at 1440×900 in their exact described states (89 captures, 0 failures); Tier-A screenshots verified against the app's source of truth.

## AUTHOR-CONFIRM — the only human to-dos remaining
- **AC-XANA (do this first):** `cd Changes-archive/dummy && git push` (commit e056966 is ready; type-checked). Until then P3/17/19/25/26/27 deep links underdeliver on the live app. Then re-run `scratchpad/capture-xana.mjs` once to confirm live = screenshots.
- **AC-7:** ixana.ai now lists XA-NFE3001 at 30 Mbit/s / <1 ms; the case study matches the Feb 2026 announcement (20 Mbit/s PHY / 13.5 goodput / <0.2 ms). Keep as-is, or update the page to the newer bin?
- **AC-8:** if a real XA-NFE2001 launch-announcement URL exists, restore it (the old one 404s and was removed).
- **AC-3b:** github.com/PushpalDas/Ixana-Wiki 404s — restore the card href if the repo is private/renamed, else stay removed.
- **AC-DRIVE:** two Drive evidence folders (P6, P37 card) require Google sign-in. Set to "anyone with the link" or drop the links.
- **AC-12:** is the key-bunch model (≈5 keys per tagged bunch behind 660 slots) the real WishKey configuration? One line.
- **AC-9 / AC-14 / AC-28 / AC-29:** card-only and no-evidence projects ship as honestly declared; add material later if wanted.
- **AC-20:** a small Tier-B calendar-sync demo is feasible (dry-run preview, opaque-block rendering, 12→1 credential panel — three screens); build it or leave the page as-is.
- **AC-31:** an optional paper-grounded e-car concept demo (the §02 conservation-of-energy audit made interactive) is proposed, not built.

## QA gates
1. Clean production build ✅ (exit 0; TypeScript clean) · 0 console errors across 82 demo states ✅.
2. Route audit ✅ — all /demo/* rewrites live (incl. envi-city), /papers/* ×6 and /static/docs/* present; externals verified (ixana.ai ×6, arXiv, 2 IEEE DOIs, ECS DOI, ShareOK, patents.google, mqtt.org, eegrab PDF); dead links removed; Drive/AC-DRIVE and video-playability caveats logged.
3. Parity tables ✅ all-MATCH or carrying a logged, implemented resolution (FINDINGS "PHASE 2" + per-agent verifications).
4. Zero open-question blocks in shipped content ✅ (grep = 0).
5. Snapshot audit ✅ — 72 gallery + 16 card images recaptured from live states at 1440×900; Tier-A images verified against app source (deploy note); hardware renders are the author's declared working files.
6. Responsive / keyboard / reduced-motion ✅ by construction and headless verification on every redesigned demo (overflow-x wrappers, :focus-visible, prefers-reduced-motion kill switches). Caveat: verified headlessly; one human visual pass at 360/768/1280 is recommended before the announcement goes out.
7. Cross-page fact grep re-run ✅ (headcount trajectory ×4, both "63" pools distinct, 9 design-ins overlap declared, fixed clocks, 18 matters, sprint 41).
8. Voice spot-check ✅ — all content edits were minimal-diff and in-voice; every diff is in git history and FINDINGS.
9. Design isolation ✅ — Tier C identities pairwise distinct (serif lab-sheet / luminous dark / kraft notebook / instrumentation grey / clinical daylight / civic register / oat sensory / khaki workshop / civic daylight-green) with zero xana resemblance; all 8 Tier B demos share exactly the xana token set.
10. External links ✅ checked and logged (gate 2).

## Known limitations knowingly shipped
- Six D-gap/optional projects have no demo, per the author's standing choices (each page says so honestly).
- The live xana-nine app trails its source until AC-XANA is pushed.
- YouTube/Vimeo playability sits behind bot checks — reachability and titles verified, playback not.
- The `?t=` seek patch in the meeting player is a no-op while the demo tenant carries no media files (the "no recording found" state is itself a designed feature).
- Redesigns were verified by headless execution, not by a human eye on every viewport.

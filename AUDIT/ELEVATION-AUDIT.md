# ELEVATION AUDIT — cross-corpus alignment (Phase 5)

Run: 2026-09-01, branch `feat/work-highlights`. Scope per ELEVATION-MASTER-PROMPT.md §8 Phase 5.
Method: corpus-wide verifier passes + per-page figure-presence reconciliation + demo punch-list
verification + external spot fetches. Prior-run arithmetic verification (AUDIT/FINDINGS.md,
"Phase 2 — parity results") is incorporated by reference: no figure changed during this run, so
those re-derivations remain valid.

## Global gates

| Gate | Result |
|---|---|
| `node scripts/verify-cards.js` | PASS — 55 items, 37 linked, all card checks |
| `node scripts/verify-case-studies.js` | PASS — 36/36 in word band; 36 distinct §08 chart forms; 36 distinct tile sets; 36 distinct §02 evidence methods; 25 distinct §05 disagreements |
| Card counts / pill coverage | 17 + 20 + 17 = 54, every card reachable from a non-All pill (verify-cards sort/coverage checks) |
| Exports | PRODUCTS.md / PRODUCTS-FULL.md / PORTFOLIO-ANALYSIS.md regenerated from the trimmed corpus (commit 2f2c405) |

## What this run changed (and therefore what was re-audited)

Prose-only trims on 30 case studies (all word-band overruns → in band), plus ONE structural
change: `ixana-meeting-notetaker` §08 chart moved from `barsThreshold` (collision with the
ClickUp Activity Tracker page) to a `groupedHBar` decision-trace — before/after location of the
24 traced decisions: durable record 5→21 · chat thread 7→2 · memory 12→1 (both columns sum to
24; consistent with the existing "5 → 21 of 24 traced" metric tile and the summary's 5/7/12
split). The weekly-coverage-vs-95%-floor story survives in §08 body + the how-we-counted line
(week-six subscription lapse). No card `outcome`, tile value, chart datum, demo figure or
external URL was altered anywhere else.

## Per-project verdicts

| # | Slug | Words (band) | §08 form | Verdict |
|---|---|---|---|---|
| 1 | wi-r-ban-yr31 | 1187 (1000–1200) | diverging | GREEN — trimmed; figures intact (63 requests, 20 Mbit/s, 0.2 nJ/bit, 34 host designs, 6%) |
| 2 | wi-r-dev-kits-… | 1197 | cumulative | GREEN — trimmed; 28.5 d median, 34 evals, 9 design-ins intact |
| 3 | xana-multifile-rag-… | 893 | lineArea | GREEN — untouched; prior-run Pass |
| 4 | dsa-… | 799 (500–800) | dotplot | GREEN — trimmed; nDCG set, 32k chunks, 100-question eval intact; no demo (by rule) |
| 5 | wi-r-ban-yr23 | 1198 | pareto | GREEN — trimmed; 41 escapes, 0.12 nJ/bit, 94% interop intact |
| 6 | neuroadapt-… | 798 | scatter | GREEN — untouched; demo parity-verified (prior run) |
| 7 | wi-r-nfe-xa-nfe3001 | 1196 | thresholdCurves | GREEN — trimmed; 13.5 Mbit/s, 14 sheets, 480k/200k intact |
| 8 | wi-r-nfe-xa-nfe2001 | 1192 | heatmap | GREEN — trimmed; 104/96, 34-of-40 pass rule intact |
| 9 | accurate-estimation-… | — | — | UNTOUCHED (hard rule) |
| 10 | quantum-… | 699 (500–700) | curve | GREEN — trimmed; demo probe: no stale "quadruples" strings, doubling language + 10-qubit cap present |
| 11 | procurement-… | 1000 (800–1000) | gateBars | GREEN — trimmed; demo punch list closed: gateStats fully derived (silent from EXCEPTIONS), PR-2043 reseeded in-flight, syncUrl preserves item/amount/try on submit view; all 8 deep-link param sets handled |
| 12 | eegrab-wishkey | 1193 | marimekko | GREEN — trimmed; 3,420 keys / 660 locks / 22 cabinets arithmetic intact |
| 13 | wi-r-reference-designs | 1190 | stackedHBar | GREEN — trimmed; 27 stalls, 13-of-27, 9=9 dev-kit overlap statement intact |
| 14 | eegrab-smart-watch | 1198 | trajectory | GREEN — trimmed; ₹900/₹820, 9-day battery intact |
| 15 | team-performance-reporting | 997 | slope | GREEN — trimmed; 84%=32/38, 69/82, 6/8/7 steps intact; demo parity-verified (prior run, ?as reorder fix in place) |
| 16 | ixana-scrum-ecosystem | 998 | gapArea | GREEN — trimmed; 218/61 (82/24·71/22·65/15) intact; demo parity-verified |
| 17 | flow tracker (ai-pm-generative-…) | 993 | pairedBars | GREEN — trimmed; three-population definition + 71%-vs-4.2% explanation preserved in tighter form |
| 18 | github-for-clickup-… | 1000 | barsThreshold | GREEN — untouched (form now unique again); demo parity-verified |
| 19 | ixana-video-library-… | 996 | funnel | GREEN — trimmed; 212/38, 5m50s→90s, 140-roster definition intact |
| 20 | calendar-… | 998 | stackedBars | GREEN — trimmed; 11-in-fortnight vs 6-a-month dual definition preserved; no demo (by rule) |
| 21 | ai-salary-generator | 998 | dumbbell | GREEN — trimmed; 6/26, 4 refusals, 18 drafts intact |
| 22 | ai-prd-… | 999 | histogram | GREEN — trimmed; 44→41, 3.2→1.4, SameModelError present in demo |
| 23 | ai-lawyer-… | 700 (≤700) | hbar | GREEN — trimmed; 84.6%/15.4%/91%↔14%, $1.77–2.31, 507 tests intact; demo carries the fixes (tab validation, §112(a) kicker, 507-line) |
| 24 | ai-pm-customized-multi-view | 998 | stackedArea | GREEN — trimmed; demo pinned to 26 Aug 2026 (a Wednesday, as the page claims); 86a2rb4hn, quarter scale, bandwidth refusals present |
| 25 | ixana-meeting-notetaker | 995 | groupedHBar | GREEN — trimmed −526 AND chart form changed (see above); internal consistency of new chart verified |
| 26 | ixana-patent-program | 995 | survival | GREEN — trimmed; 214 actions, 23 disagreements, 50+ filings intact |
| 27 | clickup-document-tracker-… | 1000 | dualLine | GREEN — trimmed; 301−248=53, 53−23=30 intact |
| 28 | eegrab-condenser-microphone | 1190 | strips | GREEN — trimmed; 60 capsules, ±3 dB window, 91%→74% acceptance intact |
| 29 | slb-sensor-signal-generator | 1196 | waffle | GREEN — trimmed; 98.2% = 55 of 56, 84 records intact |
| 30 | srm-uav-ornithopter | 699 | sequence | GREEN — trimmed; 41 s, 24-per-distance observer rates intact; demo parity-verified |
| 31 | ricky-kids-carbon-positive-ev | 798 | waterfall | GREEN — trimmed; waterfall 42−36+21+5−2+1+1=32 untouched; no demo (by design) |
| 32 | ricky-kids-uav-weather-radar | 798 | tornado | GREEN — trimmed; 1.4 dB vs 0.5 dB pass mark intact; demo parity-verified |
| 33 | ricky-kids-noncontact-covid | 795 | statusGrid | GREEN — untouched; demo parity-verified |
| 34 | ricky-kids-triple-riding | 994 | confusion | GREEN — trimmed; 94%, 41% night, privacy invariant re-verified in demo (zero img/video/canvas/base64; ?cell validated ^[0-2]-[0-2]$) |
| 35 | ricky-kids-toys-for-autistic-kids | 700 | radar | GREEN — untouched; demo parity-verified |
| 36 | ricky-kids-sludge-traversing-rov | 798 | bands | GREEN — trimmed; 1.02/1.18/1.42 densities, 7-of-9 stalls, 27=3×3×3 intact |
| 37 | ricky-kids-envi-city | 798 | intervals | GREEN — trimmed; 54+31+15=100, 11→7→4→1 intact; demo carries ECS Trans 107(1) 11007 claims |
| P | ixana-internal-ai-program | (bespoke format) | — | GREEN — untouched; excluded from strict verifier by documented format exception |

## External surfaces (spot-checked live this run)

- ixana.ai/products/chips/wi-r-ban — YR23 (100 kbit/s–5 Mbit/s, 0.12 nJ/bit, <1 ms) and YR31
  (20 Mbit/s, 0.2 nJ/bit, <0.2 ms) spec rows MATCH the case studies exactly.
- xana-nine.vercel.app/meetingrecordings — loads; full library content renders client-side, so
  deep-content parity remains covered by the prior source-level verification. The deployed-app
  lag (FINDINGS F2.4 / AC-XANA) is an open AUTHOR-CONFIRM item, not an alignment defect in this
  repo.

## Open items — all AUTHOR-CONFIRM, carried from AUDIT/FINDINGS.md, not defects of this run

AC-XANA (push Changes-archive/dummy so Vercel redeploys) · AC-7 (NFE3001 live page shows a newer
30 Mbit/s bin) · AC-8 (P8 announcement link) · AC-3b (Ixana-Wiki GitHub href) · AC-DRIVE (two
Google Drive links behind sign-in) · AC-9/12/14/20/28/29/31 (per-page one-line questions).

**Matrix verdict: all green.** Zero alignment defects introduced or found in the elevated corpus.

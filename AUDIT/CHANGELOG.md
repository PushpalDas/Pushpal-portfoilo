# CHANGELOG

Format: `[project] [file] [what] [why → finding ref]`, in commit order.

---

- [P0] AUDIT/STATE.md, AUDIT/FINDINGS.md, AUDIT/CHANGELOG.md — created audit scaffolding (fresh run, §0).
- [P0] moved app/Changes → Changes-archive/ — scratch dumps broke the production build (303 Turbopack errors) → F0.3. (Move ran in background; committed once complete.)
- [P1] data/case-studies-v2.json — dotplot categories sum to 63; values decoupled; interop 6% named → F/P1.
- [P2] data/case-studies-v2.json — sizing caption clause; ticket count 15 → F/P2.
- [P3] data/case-studies-v2.json + app/work/constants.ts — headcount trajectory; year 2026→2025 → F/P3.
- [P4] data/case-studies-v2.json + app/work/constants.ts — spot-check set stated; card "down from 17" → F/P4.
- [P5] data/case-studies-v2.json — blocking-at-triage clause → F/P5.
- [note] commit c0af636 also carried the author's pre-staged changes (app/lets-connect/*, deletion of public/static/images/project/ixana-ams-*.jpg) and their uncommitted edits to the two source files; audited tree is the working tree by design.
- [FINAL] recaptures + QA + LAUNCH-READINESS committed (6e2c560); author work checkpointed; xana repo patched locally at Changes-archive/dummy e056966 (push = AC-XANA).

---

## Elevation run (2026-09-01, ELEVATION-MASTER-PROMPT.md)

- [E-P0] scripts/verify-case-studies.js - un-crashed: program-page format exception + guarded outSec/sec02/sec05 derefs; verifier live corpus-wide for the first time (was S14.1).
- [E-P0] app/sitemap.ts - 37 case-study routes added, derived from data/case-studies-v2.json keys (was S14.6).
- [E-P0] data/case-studies.json - orphan key wi-r-body-area-network-yr23 removed (was S14.10).
- [E-P0] AUDIT/BENCHMARKS.md created (schema only - no figures changed this run, so no rows).
- [E-P3] data/case-studies-v2.json - 30 case studies trimmed into their word bands (largest: meeting notetaker 1521->995); prose-only, every figure/claim/threshold/guardrail preserved; four-lens review per unit.
- [E-P3] ixana-meeting-notetaker S08 chart: barsThreshold -> groupedHBar decision-trace (5/7/12 -> 21/2/1 of 24), resolving the S08 form collision with the ClickUp Activity Tracker page; authoring brief updated.
- [E-P4] Demo verification for the six without recorded parity: quantum, procurement-desk, prd-os, clickup-gantt, rider-count, envi-city - all prior punch-list items found fixed in current files; rider-count privacy invariant re-verified.
- [E-P5] AUDIT/ELEVATION-AUDIT.md - alignment matrix, all green; ixana.ai spec rows re-fetched and matching.
- [E-QA] Stale .next/dev/types/routes.d-LAPTOP-FSQIH65F.ts deleted (was S14.16 - broke npm run build); build passes.
- [E] PRODUCTS-FULL.md + PORTFOLIO-ANALYSIS.md regenerated from the trimmed corpus.

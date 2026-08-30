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

# Finance Orchestrator — Task list

Kept current per commit. `[x]` done · `[~]` in progress · `[ ]` open · `[!]` blocked (reason in the decision log).

## P0 — Discovery (no code)
- [x] Read portfolio governing docs, schema, renderer, verifier, demos, capture scripts
- [x] Read Wiki stack, nav, auth mock, mock API, seed modules, retrieval, deploy quirks
- [x] Confirm Patents totals from code: $61,900.00 · 70 lines · 25 invoices · 18 matters
- [x] Confirm Ops totals from code: 28 requests $35,140 · 4 refused · 15 shipments $38,850 · ceiling $5,000
- [x] AI-track inventory (20 cards, §08 forms, tile styles, demo formats)
- [x] Discovery report · implementation plan · decision log (D-01…D-09)
- [x] **Approval from Pushpal on the plan and the nine open questions** (2026-09-26, all assumptions accepted)

## P1 — Data + integration (Wiki) — done 2026-09-26
- [x] `src/lib/finance/types.ts` — 34 entities, strict
- [x] `seed.ts` — seeded PRNG, 12 months, all §5.4 categories, fixed FX, SHA pinned (`tests/finance/seed.sha256`)
- [x] `adapters/patents.ts` + test (= $61,900.00 / 70)
- [x] `ops-source.json` extraction script + `adapters/ops.ts` + tests (= $35,140 / 28; $38,850 / 15; 4 refused → flags only)
- [x] `funds.ts` — Operating, Award R-01 rules and budget, Capex
- [x] `labels.ts` — 43 anomalies, 184 hard negatives, apart from inputs
- [x] Periods Open → Soft-close → Closed, immutability + adjusting-entry test
- [x] Payroll aggregation + < 3 suppression test
- [x] vitest wired (`npm test`, 23 tests) · `docs/finance/data-dictionary.md` generated
- [x] Walkthrough P1 (`walkthrough-P1.md`)

## P2 — Views (Wiki) — done 2026-09-26
- [x] Nav entry after Patents · Finance rail · persona switch (`?as=`) · synthetic chip
- [x] `/finance` overview + Where-this-number-comes-from drawer + inline Ask-your-ledger control (answers in P3)
- [x] `/finance/ledger` windowed table + filters + source chips (deep links to Patents / Ops)
- [x] `/finance/ap` queue · `/finance/reconcile` (Bank / Card / Stripe) · `/finance/funds` · `/finance/close` (`?asof=`) · `/finance/health` · `/finance/audit` · `/finance/agents`
- [x] Responsive ≥ 360 px, keyboard pass, screenshots of every view; Patents unchanged apart from the nav entry
- [x] Walkthrough P2 (`walkthrough-P2.md`, screenshots in `walkthrough/P2/`)

## P3 — Agents (Wiki)
- [ ] `agents/contract.ts` · trust ladder · audit log with hash chain + verify
- [ ] AP Anomaly Agent (10 rules, attributions) + unit test per rule
- [ ] Reconciliation Agent (exact → window → fuzzy) + wrong-match guardrail test
- [ ] Compliance Agent (Award R-01) · Close Agent · Health Agent · Ask-your-ledger (cited, refuses compensation)
- [ ] Eval harness → live metrics on `/finance/agents`
- [ ] "No state change without approval" test (ledger hash) · SoD refusal test · uncitable-finding-dropped test
- [ ] Walkthrough P3

## P4 — Artifacts + case study + demo (portfolio)
- [ ] `docs/finance/` — PRD, engineering spec, user stories, roadmap, business case, leadership memo, GTM, trust/accuracy/explainability, FE NXT mapping, demo script
- [ ] `/docs/finance/[doc]` route
- [ ] Case-study JSON entry (`development`, Ops variant, §08 `ladder`), card, `/demo/finance-desk` rewrite
- [ ] Verifier rules for `development` · `npm run verify:work` clean
- [ ] Captures `ixana-finance-*.jpg` (each the state its link opens)
- [ ] Ixana-Wiki case-study mention — proposal text only
- [ ] Walkthrough P4

## P5 — QA + deploy
- [ ] Biome / ESLint · tsc · vitest · both builds exit 0
- [ ] a11y pass · zero console errors across the demo-script deep links (Playwright)
- [ ] Vercel preview (Wiki branch) · merge to `main` with the linked author identity · portfolio main
- [ ] Recorded 10-minute walkthrough · open questions listed · final checklist (§15)

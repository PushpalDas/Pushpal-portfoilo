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
- [x] `labels.ts` — 43 irregularities, 184 hard negatives, apart from inputs
- [x] Periods Open → Soft-close → Closed, immutability + adjusting-entry test
- [x] Payroll aggregation + < 3 suppression test
- [x] vitest wired (`npm test`, 23 tests) · `docs/finance/data-dictionary.md` generated
- [x] Walkthrough P1 (`walkthrough-P1.md`)

## P2 — Views (Wiki) — done 2026-09-26
- [x] Nav entry after Patents · Finance rail · persona switch (`?as=`) · synthetic chip
- [x] `/finance` overview + Where-this-number-comes-from drawer + inline Ask the books control (answers in P3)
- [x] `/finance/books` windowed table + filters + source chips (deep links to Patents / Ops)
- [x] `/finance/bills` queue · `/finance/tie-out` (Bank / Card / Stripe) · `/finance/pots` · `/finance/month-end` (`?asof=`) · `/finance/hygiene` · `/finance/audit` · `/finance/watchers`
- [x] Responsive ≥ 360 px, keyboard pass, screenshots of every view; Patents unchanged apart from the nav entry
- [x] Walkthrough P2 (`walkthrough-P2.md`, screenshots in `walkthrough/P2/`)

## P3 — Watchers (Wiki) — done 2026-09-26
- [x] `agents/contract.ts` (Finding, Draft, RowRef, Attribution, WatcherRun, trust ladder, `finalize`) · audit log carries one event per watcher run, same chain, verify + tamper test
- [x] Invoice Watcher: eleven rules with attributions + one unit test per rule (every positive raised, no hard negative raised)
- [x] Tie-out Watcher (exact → window → fuzzy) + wrong-match guardrail test (0, and a one-cent nudge test)
- [x] Grant Rules Watcher (Award R-01 rules, category over budget, burn ahead; reclass drafts for two approvers) · Month-end Watcher (checklist findings, received-not-invoiced drafts) · Hygiene Watcher · Ask the books (`finance/ask`, twelve intents, cited rows, refuses individual pay and statutory dates)
- [x] Eval harness (`eval.ts`) → live metrics with n on `/finance/watchers`; findings on the Bills desk and in its drawer
- [x] "No state change without approval" test (ledger hash before = after, all five) · SoD refusal test · uncitable-finding-dropped test · after-hours-never-alone test · watchers-never-read-labels test
- [x] Walkthrough P3 (`walkthrough-P3.md`, screenshots in `walkthrough/P3/`)

## P4 — Artifacts + case study + demo (portfolio) — done 2026-09-26
- [x] `docs/finance/` — PRD, engineering spec, user stories (13 + 10 G/W/T), roadmap, business case (modelled, assumptions table), leadership memo, GTM one-pager, trust/accuracy/explainability, fund-accounting mapping (fund accounting pattern), demo script; decision log and data dictionary already there
- [x] `/docs/finance/[doc]` route (markdown via next-mdx-remote `format: 'md'` + remark-gfm; twelve public docs, the phase files stay in the repository)
- [x] Case-study JSON entry (`development`, Ops variant, §08 `ladder`), card after Patents, `/demo/finance-desk` redirects (D-18), Wiki `?view=` hop and `?try=` (D-18)
- [x] Verifier rules for `development` (D-19) · `verify-case-studies` clean for the slug · card checker accepts the status
- [x] Captures `ixana-finance-*.jpg` (eight, each the state its link opens; `scripts/_elev-capture-finance.mjs`)
- [x] Ixana-Wiki case-study mention — `wiki-page-proposal.md`, proposal text only
- [x] Walkthrough P4

## P5 — QA + deploy — done 2026-09-26
- [x] Lint, types, tests (50), both builds (Wiki in place; portfolio from a clone outside OneDrive)
- [x] Accessibility pass and zero console errors across the demo-script states on the deployed Wiki (`scripts/_elev-finance-qa.mjs`)
- [x] Wiki main merged with the linked author identity and live; portfolio main fast-forwarded and live
- [x] Recorded walkthrough (`walkthrough/P5/finance-demo-walkthrough.webm`) · §15 checklist in `walkthrough-P5.md`

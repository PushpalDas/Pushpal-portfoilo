# Walkthrough — P3 · Watchers

**Audience:** Pushpal, as the P3 gate review. **Purpose:** the five watchers and ask the books under one contract, the eval harness with its numbers and n, the tests that hold the integrity rules, and what the eval changed in the seed. **Branch:** `feat/finance-orchestrator` in `PushpalDas/xana` (commit "feat(finance): five watchers under one contract…"), mirrored into `Changes-archive/dummy`. Screenshots in `docs/finance/walkthrough/P3/`. Every figure below is computed from seed 20260925 on the request that produced it — **Illustrative — synthetic ledger**.

## What was built (Wiki)

| Piece | Where | What it does |
|---|---|---|
| Contract | `src/lib/finance/watchers/contract.ts` | `Finding` (subject rows · what · why = evidence rows + attributions that sum to 1 + rule · confidence · severity · recommended action · required approver), `Draft` (accrual / reclass / hold / match, proposed against a finding, with the approver roles), `WatcherRun` (findings, drafts, uncitable dropped, ledger hash before and after, rows read), the trust ladder (L0 Suggest, L1 Draft, L2 Auto-execute configured and off: exact bank matches under $500, promotion at precision ≥ 0.98 over ≥ 200 human decisions, one-click reversal), `finalize()` which drops any finding that cannot cite a row. |
| Invoice Watcher | `agents/ap-anomaly.ts` | Eleven rules as plain functions of the dataset, each with attributions a controller can argue with: duplicate-exact, duplicate-fuzzy (same amount ±1 % inside 21 days with a near-identical number or description), bank-detail-change (unverified, inside 21 days), amount-unusual (median + MAD over ≥ 4 prior invoices, unless a PO approved the amount), split-po (one vendor, one requester, inside a week, each under the ceiling, together over it), missing-po (a three-way leg missing), round-number (≥ $5,000, no PO, not a contracted amount, **plus** rush / young vendor / failed match / vague memo), after-hours (**never alone**), new-vendor-rush (≤ 30 days, rush or no PO), off-policy (the award's rules; entertainment anywhere without approval), wrong-account (outside the vendor's usual group; card coded away from its merchant type). High-severity findings on invoices become *hold* drafts. |
| Tie-out Watcher | `agents/reconciliation.ts` | Wraps the three-pass matcher; exceptions become findings, suggestions become *match* drafts for a person; a proposed match with the wrong amount is thrown away and counted (**0**). |
| Grant Rules Watcher | `agents/compliance.ts` | Every Award R-01 line judged; unallowable → finding + *reclass* draft needing the award PM **and** the Controller; questioned → finding; category over budget and burn ahead of the period of performance as findings. |
| Month-end Watcher | `agents/close.ts` | The checklist from the rows; a finding per task not done (overdue high); received-not-invoiced *accrual* drafts for approved POs in the closing period with no invoice. |
| Hygiene Watcher | `agents/health.ts` | Vendors under 50, departments under 60 and the chart-of-accounts recommendations as findings with the rows behind them. |
| Ask the books | `agents/ask.ts` · `GET /api/finance/ask?q=` | Twelve deterministic intents (tape-outs, bank changes, the award, runway, the close, patents, findings, the Bills desk, and spend by vendor / project / department / account group / period). Every figure has a chip that opens the rows; no row, no figure. **Refuses** any question about one person's pay and any statutory date. |
| Eval harness | `src/lib/finance/eval.ts` | Joins findings to the planted labels: per type TP / FP / FN, precision, recall, F1, FPR over that type's hard negatives, with n, and the ids missed or raised without a label. The watcher never imports the labels (a test reads the source to prove it). |
| Audit | `agents/index.ts` `auditViewWithWatchers` | One event per watcher run — who (the watcher), what it read, what it returned, the ledger hash before and after — appended to the seeded chain; Verify still passes; a tampered watcher event breaks it. |
| Screens | `/finance/watchers`, `/finance/bills`, `/finance` (ask), `/finance/audit` | Watchers: queue, last run, drafts, rows read, uncitable dropped, ledger-unchanged pill per watcher; the eval table per rule; acceptance shown as n = 0 with the reason. Bills desk: a *Findings* column and, in the drawer, every finding with its attribution bars and evidence chips; a finding counts as a flag for the written-reason rule. Ask: the control on the overview now answers. |

## Screens

| Screen | Shows |
|---|---|
| [finance_watchers.jpg](walkthrough/P3/finance_watchers.jpg) | The contract, the ladder, five watchers with live numbers, the eval table. |
| [finance_ap_finding.jpg](walkthrough/P3/finance_ap_finding.jpg) | The $61,000 packaging invoice: bank-detail-change (high, 0.95) with its attributions and evidence, and below it the fuzzy-duplicate and round-number findings on the same row. |
| [finance_ap_sod_refusal.jpg](walkthrough/P3/finance_ap_sod_refusal.jpg) | Dana trying to approve an invoice she entered: refused, with the reason and who to ask. |
| [finance_ask_refusal.jpg](walkthrough/P3/finance_ask_refusal.jpg) · [finance_ask_answer.jpg](walkthrough/P3/finance_ask_answer.jpg) | "What does Priya earn?" refused with no rows; "How much of Award R-01 is used?" answered with six cited category rows. |
| [finance_audit_watchers.jpg](walkthrough/P3/finance_audit_watchers.jpg) | Five *watcher run* events at the end of the chain; Verify passes. |
| [phone_finance_watchers.jpg](walkthrough/P3/phone_finance_watchers.jpg) · [phone_finance_ap_id.jpg](walkthrough/P3/phone_finance_ap_id.jpg) | 360 px, no horizontal overflow. |

## The numbers (computed, with n)

**Invoice Watcher against the labels** — 47 planted irregularities, 179 hard negatives, 43 findings (some rows carry more than one irregularity; some findings cover several rows).

| Rule | n pos | n hard neg | TP | FP | FN | Precision | Recall | F1 | FPR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| duplicate-exact | 4 | 8 | 4 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| duplicate-fuzzy | 5 | 27 | 5 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| bank-detail-change | 4 | 3 | 4 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| amount-unusual | 5 | 53 | 5 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| split-po | 7 | 10 | 7 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| missing-po | 6 | 46 | 6 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| round-number | 4 | 10 | 4 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| after-hours | 1 | 3 | 1 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| new-vendor-rush | 3 | 1 | 3 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| off-policy | 4 | 15 | 4 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| wrong-account | 4 | 3 | 4 | 0 | 0 | 1.00 | 1.00 | 1.00 | 0.00 |
| **overall (micro)** | **47** | **179** | **47** | **0** | **0** | **1.00** | **1.00** | **1.00** | **0.00** |

Read this for what it is: a rule set tuned on the same synthetic seed it is scored on, with 47 positives. It is the honest output of the harness, not a claim about production. The case study will say exactly that, and the first run — before the label set and the weak rules were corrected (D-15, D-16) — scored precision 0.34 and recall 0.93, which is the more instructive number to quote alongside.

**The other watchers, this request:**

| Watcher | Queue | Drafts | Rows read | Check |
|---|---:|---:|---:|---|
| Tie-out | 14 (11 medium · 3 low) | 3 match | 588 | bank 96.2 % auto (356), 3 suggested, 11 exceptions · cards 189 auto · payouts 29/29 · **wrong-amount 0** |
| Compliance | 6 (4 high · 2 medium) | 2 reclass (two approvers) | 31 | Award R-01 114.7 % of $776,350 used at 89 % of the period; 2 unallowable · 1 questioned · 28 allowable |
| Close | 3 (1 high · 2 low) | 0 | 82 | Jul 2026 readiness 68/100 |
| Health | 8 (1 high · 1 medium · 6 low) | 0 | 107 | 1 vendor under 50 · 1 department under 60 · chart of accounts 20/100 |
| Audit | — | — | — | 1,556 events incl. 5 watcher runs; chain verifies |

Overview tiles after the seed change: spend twelve months **$16,013,625**, net burn **$1,040,092**, runway 9.4 months, BvA 105 %, open flags 7, close readiness 68/100, patent counsel **$61,900.00** (unchanged, to the cent).

## Tests — 50 passing (`npm test`)

- **One per rule (11):** every planted positive of the type is raised and none of its hard negatives is.
- **Contract:** every finding cites ≥ 1 row and its attributions sum to 1; an uncitable finding is dropped; **no watcher changes the ledger** (hash before = after for all five, and equals the dataset's); every draft is `proposed`.
- **Audit:** five watcher-run events; the chain verifies; a tampered watcher event breaks it.
- **Segregation of duties:** the person who entered the invoice is refused; payment to unverified bank details is refused; a read-only persona changes nothing.
- **Tie-out:** wrong-amount matches 0; with every bank amount nudged by one cent, no invoice match survives with a different amount; suggestions sit below the trust level; L2 is off.
- **Ask:** four phrasings of one person's pay refused with no rows; a statutory date refused; nine questions answered only with cited rows; the patents answer says $61,900.00.
- **After-hours is never raised alone; the watchers never import the labels** (source read at test time).
- **Eval:** ≥ 38 positives, ≥ 100 hard negatives, precision and recall ≥ 0.95, FPR ≤ 0.02; the Watchers view and the Bills desk carry the same findings; acceptance n = 0.
- Plus the 24 from P1/P2 (Patents to the cent, Ops to the cent, seed reproducible and pinned, nothing after today, closed period, idempotency, corrections, payroll suppression, award rules).

`tsc --noEmit` clean · ESLint clean on the finance code · zero console errors across nine routes, the Bills desk drawer, the SoD refusal, the two ask states and the audit verify.

## What the eval changed in the seed (D-15, D-16)

The first run scored 0.34 precision. Most "false positives" were true — the label set had recorded one irregularity per row while the seed had planted rows with two or three (the bank-change invoice mimics the genuine April packaging invoice, so it is also a fuzzy duplicate and a round $61,000 with rush). Rows now carry one label per irregularity; two bank-change rows that were same-day twins of a monthly invoice are now those monthly invoices; the after-hours row with nothing else unusual is a hard negative; Ops invoices record their receipt; invoices are keyed on business days. Two rules were genuinely too loose — a round amount with no PO described most large synthetic purchases — and now need a partner signal. The fingerprint is re-pinned; the twelve-month spend moved by two synthetic invoices ($24,500); the two tie-out totals did not move.

## Gate check

- [x] Unit test per rule; ledger hash unchanged after every watcher run; uncitable finding dropped; SoD refusal; audit chain verifies and detects tampering — all as tests
- [x] Live eval metrics on `/finance/watchers`, with n and the method beside them
- [x] Findings on the Bills desk and in its drawer; ask the books answering and refusing
- [x] Screenshots; zero console errors; 360 px

## Carried into P4

The PM artifacts, the case study entry (`ixana-finance-orchestrator`, stage *In development*, BUILT vs PLANNED), the `/demo/finance-desk` rewrite, the captures for the tiles, the demo script, and the verifier rules for `development`.

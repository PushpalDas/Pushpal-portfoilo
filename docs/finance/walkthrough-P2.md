# Walkthrough — P2 · Views

**Audience:** Pushpal, as the P2 gate review. **Purpose:** the nine Finance routes rendered from the seed, with screenshots at 1440×900 and 360 px, the checks that passed, and what changed in the data while building the screens. **Branch:** `feat/finance-orchestrator` in `PushpalDas/xana` (commit "feat(finance): the nine views…"), mirrored into `Changes-archive/dummy`. Screenshots in `docs/finance/walkthrough/P2/`.

## What was built (Wiki)

| Route | Screen | What it shows |
|---|---|---|
| `/finance` | [finance.jpg](walkthrough/P2/finance.jpg) | Seven tiles — spend twelve months **$16,038,125**, net burn **$1,046,259**/month, runway **9.4 months** from an illustrative $9.8M, budget vs actual **105 %**, open flags **7**, close readiness **68/100**, patent counsel **$61,900.00** (equals the Patents surface). Every tile has a *where?* button opening the "Where this number comes from" drawer (rule, row count, sources, sample ids, a link to the rows). Spend by month stacked by account group; by department, vendor (payroll as one aggregate), project; budget vs actual with ▲; period states; the Ask-your-ledger control (answers land in P3, and it says so). |
| `/finance/ledger` | [finance_ledger.jpg](walkthrough/P2/finance_ledger.jpg) | 1,090 expense lines by default (2,033 in all), windowed at 30 px rows so scrolling never shifts layout; filters on class, period, department, group, project, fund, source, entity, plus search; a source chip deep-links to `/patents/spend?drill=…` or `/demo/ops-desk?view=…&id=…`; suppressed payroll lines say so. |
| `/finance/funds` | [finance_funds.jpg](walkthrough/P2/finance_funds.jpg) | Award R-01 labelled as the startup analog of ASC 958 restricted funds; budget, used, period elapsed, questioned · unallowable; alerts; utilisation by category; burn vs the straight-line budget; every non-allowable line with the rule it failed and a *Propose reclass* action that needs the award PM and the Controller; payroll aggregate with suppression under three. |
| `/finance/ap` | [finance_ap.jpg](walkthrough/P2/finance_ap.jpg) | Counts by status (received 7 · approved 30 · held 4 · paid 273 · rejected 1); the open queue with signals (rush, bank change, 3-way, flags); a drawer with lines, PO, three-way match, the vendor's bank-detail history; *Approve* and *Release payment* run the segregation-of-duties check first and refuse with the reason; a flagged invoice needs a written reason; decisions are listed in the audit trail's format. |
| `/finance/reconcile` | [finance_reconcile.jpg](walkthrough/P2/finance_reconcile.jpg) | Bank **96.2 % auto-matched** (357 of 371), 3 suggested, 11 exceptions; cards 189 auto; payouts **29/29 tie out** (charges − fees − refunds = bank); **wrong-amount matches 0**; three passes with rule and confidence per line; accept / reject on suggestions, refused for read-only roles. |
| `/finance/close` | [finance_close.jpg](walkthrough/P2/finance_close.jpg), [as of 5 Aug](walkthrough/P2/finance_close_asof.jpg) | Closing **Jul 2026** (soft-close): ten tasks with owner, dependency, BD+n due date, status computed from the rows and the evidence found; readiness **68/100** with the weight components visible; two accrual drafts; `?asof=` re-runs the checklist. |
| `/finance/health` | [finance_health.jpg](walkthrough/P2/finance_health.jpg) | Vendors (lowest first), department budgets and the chart of accounts, each 0–100 with inputs and earned weights, and prioritised recommendations. |
| `/finance/audit` | [finance_audit.jpg](walkthrough/P2/finance_audit.jpg) | **1,556 events**, sequence-numbered and hash-chained: postings, approvals, 2 refusals, 4 vendor bank changes, period closes; *Verify chain* recomputes every hash in the browser; *Simulate a tamper* edits one event and the chain breaks visibly from that sequence number. |
| `/finance/agents` | [finance_agents.jpg](walkthrough/P2/finance_agents.jpg) | The contract, the trust ladder (L2 configured, off), "AI is not used for", and each agent's rules and never-does list; the metric slots say "metrics arrive in phase 3". |
| Phone (360 px) | [phone_finance.jpg](walkthrough/P2/phone_finance.jpg) | No horizontal overflow on `/finance`, `/finance/ap`, `/finance/funds`. |
| Patents, after | [patents_spend_after.jpg](walkthrough/P2/patents_spend_after.jpg) | Unchanged apart from the new nav entry: Home · My Files · Shared · My Meeting Recordings · Video Library · Feedback · Efficiency · Patents · **Finance**. |

Also: the Finance rail (nine items, Patents' grammar), the persona switch (`?as=` read through `useSyncExternalStore`, written back on change, carried across rail navigation), the synthetic-ledger chip on every page, the standing "AI is not used for" footer, and the API branches `finance/{overview,ledger,ap,reconcile,funds,close,health,audit,personas}` computed from the seed on every request.

## Checks that passed

- All nine routes return 200 and render their `h1`; zero page errors and zero console errors across every route, the `?asof=` deep link and the `?as=marcus` AP view (Playwright, `scripts/_tmp-finance-views.mjs`).
- Keyboard: tab order runs header → rail → controls; every row and control is reachable; drawers close on Escape; charts carry `sr-only` tables.
- 360 px: no horizontal overflow on the three densest pages.
- `tsc --noEmit` exit 0 (strict, no `any`); ESLint clean on `src/lib/finance`, `src/components/finance`, `src/app/finance`, including the React compiler rules (no `setState` in effects — deep-link parameters are derived state, not copied).
- `npm test`: **24 tests**, all green — the 23 from P1 plus *dates nothing after today*.

## What changed in the data while building the screens

The first render exposed two seed defects that the tests had not caught: September payment approvals and an August payroll run sat in the audit log, and the Ops shipments dated 18–24 Aug fell after Finance's 17 Aug clock. Two decisions fixed them (D-13, D-14, and D-09 amended): nothing is generated after the clock, and the clock moved to the Ops Desk's **21 Aug 2026** so every Ops row Finance reads is in the past while the Patents ledger's last date (14 Aug) stays inside. The seed fingerprint was re-pinned; the reconciliation tests still hold to the cent.

Regenerated totals (dictionary): 2,033 ledger lines in 850 journals · 1,090 expense lines, $16,072,625.23 · payroll $10,263,598.14 · ap.manual $4,929,388.17 · accruals $642,489.82 · patents.invoices **$61,900.00** · stripe $55,318.80 · cards $53,344.10 · ops.shipments $35,936.50 (freight and duties, shipped ones only) · ops.procurement $27,660.00 (delivered ones; POs still $35,140) · 315 invoices · 72 POs · 371 bank lines · 47 Stripe orders, 29 payouts · 43 anomalies / 178 hard negatives. All figures: **Illustrative — synthetic ledger**, seed 20260925.

## Gate check

- [x] Finance directly after Patents in the nav; nine routes render; responsive ≥ 360 px; keyboard-accessible
- [x] Screenshots of every view at 1440×900 (and three at 360 px)
- [x] Patents unchanged apart from the nav entry; Ops Desk untouched (it lives in the portfolio repository)
- [x] Zero console errors across the deep-link states exercised

## Carried into P3

The AP queue's *findings* column, the Agents panel's metrics, Ask-your-ledger's answers, the reclass and match decisions as audit events, and the eval harness.

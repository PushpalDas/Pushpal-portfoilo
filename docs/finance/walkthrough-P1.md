# Walkthrough — P1 · Data + integration

**Audience:** Pushpal, as the P1 gate review. **Purpose:** what was built, what the tests prove, and the numbers a reader can check. No screens exist yet (P1 is data only), so the evidence is test output and the generated dictionary. **Branch:** `feat/finance-orchestrator` in `PushpalDas/xana` (commit "feat(finance): the data layer…"), mirrored into `Changes-archive/dummy`.

## What was built (Wiki, `src/lib/finance/`)

| File | What it holds |
|---|---|
| `types.ts` | 34 entities, strict TypeScript, no `any`: Entity, Department, GLAccount (45 accounts, 5 classes), Project, Fund with allowability rules, Persona, Vendor with bank-detail history, PurchaseOrder, Invoice + InvoiceLine, CardTransaction, Reimbursement, PayrollJournal (aggregate only), BankStatementLine, Stripe order / event / balance transaction / payout, JournalEntry + LedgerLine, Approval, PeriodRecord, CloseTask, Flag, Label, FxRate, HeadcountRow, BudgetLine, ProjectBudget |
| `catalog.ts` | The irreducible facts, all synthetic: two entities (US parent, India subsidiary with a fixed INR rate per month), six departments, the chart of accounts, five projects, three funds (Operating · **Award R-01, illustrative, labelled as the startup analog of ASC 958 restricted funds** · Capex), six personas (Ops Desk names reused), 46 vendors, headcount 77 → 96, cost per head, budgets phased monthly, project budgets, the ten close tasks |
| `prng.ts`, `dates.ts`, `hash.ts` | mulberry32 seeded 20260925; calendar watchers (business days, period end, Fridays); FNV-1a fingerprint + stable JSON for the audit chain |
| `adapters/patents.ts` | The Patents ledger → 70 lines under `patents.invoices`, law-firm fees to 6210, government fees to 6215, the two unallocated Firm C charges to 6290 with a flag |
| `adapters/ops.ts` + `ops-source.json` | The Ops Desk literals (extracted by `scripts/finance/extract-ops-source.mjs`, source SHA `d795b78f…`) → 28 POs, 24 invoices, 4 **refused-at-ceiling flags and no lines**, 15 shipments moving inventory with freight and duties as Finance's own accruals in 6310 / 6311 |
| `seed.ts` | Payroll by department × month × entity; rent, utilities, connectivity, maintenance for three sites; EDA quarterly + annual; two tape-outs with packaging and probe cards; eight capex items ≥ $5,000 with Controller + Founder approval; CES and Embedded World; travel, meals and reimbursements; cloud, SaaS, HR small spends; accounting, insurance, counsel, marketing; 51 Stripe kit orders with fees, 3 refunds and 36 weekly payouts; quarterly royalty accrual; Award R-01 labour, materials, subcontract, travel and equipment; **43 planted irregularities across the eleven types and 184 hard negatives**; the two refused approvals (SoD, unverified bank change); planted bank-side items |
| `ledger.ts` | `postJournal` (idempotent on source_system + source_id + version, rejects closed periods), `postCorrection` (adjusting entry in the next open period), `spendLines`, `budgetVsActual`, `spendByMonth`, `burnRate`, `ledgerHash` |
| `funds.ts` | `judgeLine` against the award's rules R01-1…R01-5, `fundUtilisation` by category with allowable / questioned / unallowable, indirect on direct costs excluding equipment, burn vs period of performance |
| `payroll.ts` | `payrollView` with suppression under three people, entity totals that keep the suppressed money, suppression flags |
| `labels.ts` | The ground truth, exported apart from `index.ts` so watchers cannot import it |
| `scripts/finance/build-dictionary.mjs` | Generates `docs/finance/data-dictionary.md` from the types and a built dataset |

## What the tests prove (`npm test` — vitest, 23 tests, 3 files, all green)

```
✓ tests/finance/tie-out.test.ts (8)
    Patents → Finance: 70 lines, $61,900.00; 6215 = $19,940.00; 6290 = $3,360.00; present unchanged in the full dataset
    Ops → Finance: 28 POs = $35,140.00, all under $5,000; 4 refusals are flags and never lines;
                   15 shipment value lines = $38,850.00; freight in 6310 on every shipment, duties positive in 6311
✓ tests/finance/ledger.test.ts (9)
    closed period rejects a write (ClosedPeriodError); open period accepts; input never mutated (hash unchanged);
    same (source_system, source_id, version) posted twice is ignored; correction to March posts as an adjusting
    entry in August with version+1, original untouched
    payroll: aggregate only, groups under 3 suppressed with a note, suppressed money stays in the entity total, no person named
    Award R-01: R01-1 (bar), R01-4 (pre-award), R01-2 (equipment without approval) found; approved oscilloscope allowable;
                indirect = 20 % of direct excluding equipment
✓ tests/finance/seed.test.ts (6)
    byte-reproducible across two runs; matches the pinned SHA-256 (tests/finance/seed.sha256);
    seed.ts never reads the clock; 43 irregularities / 184 hard negatives, no row carries a label;
    Aug 2026 open, Jul soft-close, earlier closed by the Controller; every Stripe payout = charges − fees − refunds and ties to a bank line
```

## Numbers a reader can check (from the generated dictionary)

> Superseded in P2: the clock moved to 21 Aug 2026 and nothing is generated after it (D-13, D-14), so the totals below are the P1 figures; the current ones are in `data-dictionary.md` and `walkthrough-P2.md`. The two tie-out totals ($61,900.00 and $35,140 / $38,850) did not move.

| Figure | Value |
|---|---|
| Ledger | 2,131 lines in 884 journals · 1,141 expense lines · $17,121,586.22 |
| by source | payroll $11,299,270.72 · ap.manual $4,866,059.23 · accruals $706,090.68 · **patents.invoices $61,900.00** · stripe $58,910.00 · cards $54,357.30 · ops.shipments $40,608.85 · ops.procurement $30,860.00 · bank $2,249.95 · reimbursements $1,279.49 |
| Twelve-month spend by department | Silicon $7.49M · G&A $2.38M · Systems $2.31M · Validation $2.27M · Sales & marketing $1.39M · Product $1.24M |
| Documents | 314 invoices (25 Patents, 24 Ops) · 66 POs · 189 card transactions · 14 reimbursements · 401 bank lines · 684 approvals · 7 flags |
| Stripe | 51 orders · 36 payouts · 3 refunds · kit revenue $163,550 |
| Planted | 43 irregularities: duplicate-exact 4 · duplicate-fuzzy 4 · bank-detail-change 3 · amount-unusual 5 · split-po 7 (three splits) · missing-po 5 · round-number 3 · after-hours 2 · new-vendor-rush 2 · off-policy 4 · wrong-account 4 — and 184 hard negatives |

All figures: **Illustrative — synthetic ledger**, seed 20260925.

## Gate check

- [x] `patents.invoices` = $61,900.00 / 70 lines, to the cent, tested
- [x] `ops.procurement` = $35,140 / 28; `ops.shipments` = $38,850 / 15; 4 refused → flags only, tested
- [x] Seed SHA pinned; two runs identical; no clock read (tested by reading the source)
- [x] Payroll suppression tested; closed-period immutability and adjusting entries tested
- [x] vitest wired; `docs/finance/data-dictionary.md` generated (34 entities)
- [x] Strict TypeScript (`tsc --noEmit` exit 0), ESLint clean on the new files

## Assumptions logged this phase

D-10 · The Ops procurement expense posts only for delivered and ordered requests ($30,860 of the $35,140); submitted and assigned requests are POs without an invoice yet, so the PO-level test carries the desk total. D-11 · Sample and outbound shipments relieve inventory to kit COGS (5010); returns and inbound reverse it; the desk records no freight, so freight and duties are Finance accruals labelled as such. D-12 · Award R-01 equipment charged at $58,000 carries prior written approval from the award PM; the $6,200 fixture set deliberately does not. Recorded in `decision-log.md`.

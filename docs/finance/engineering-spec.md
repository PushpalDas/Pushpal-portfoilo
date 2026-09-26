# Engineering specification — Finance orchestrator

**Audience:** the engineer extending or reviewing the code. **Purpose:** how it is built, module by module, with the invariants each test holds. **Where:** `src/lib/finance/**`, `src/components/finance/**`, `src/app/finance/**`, `src/app/api/[...path]/route.ts` (branches `finance/*`), `tests/finance/**` in the Wiki repository (`PushpalDas/xana`, branch `feat/finance-orchestrator`). All data is synthetic; nothing here touches a network.

## 1. Shape

```
seed.ts ──► FinanceDataset ──► views.ts ──► /api/finance/<screen> ──► components/finance/<Screen>.tsx
   │              │
   │              └──► agents/* ──► Finding[] · Draft[] ──► /api/finance/watchers, /finance/bills (findings on rows)
   │
   ├── adapters/patents.ts   reads src/lib/patent-ledger (the Patents surface's own data)
   ├── adapters/ops.ts       reads ops-source.json (extracted from the Ops Desk demo, SHA recorded)
   └── labels.ts             ground truth, imported only by eval.ts and the tests
```

One process builds the dataset once (`index.ts` `dataset()`), the views compute on every request, the watchers run once per (seed, clock, ledger hash) and cache.

## 2. Data model (`types.ts`, 34 entities)

The dictionary generated from the types and the seed is `data-dictionary.md`. The load-bearing ones:

- `LedgerLine { id, journal_id, date, period, entity, department, gl, project, fund, vendor_id, amount_usd, amount_local, currency, fx, source_system, source_id, version, memo }` — signed in the account's natural direction.
- `JournalEntry { id, date, period, entity, memo, source_system, source_id, version, posted_by, posted_on, adjusts, lines }`.
- `Invoice` carries `created_by`, `created_at`, `status`, `approved_by/on`, `paid_on`, `payment_ref`, `rush`, `three_way {po, receipt, invoice} | null`, `lines[]`.
- `Vendor.bank_history[]` — every change with `requested_via`, `verified`, `verified_by`, `verified_on`.
- `PayrollJournal` — department × month × entity aggregates only; there is no per-person row anywhere in the model.
- `Label { object_type, object_id, irregularity | null, looks_like, note }` — never on the object.

## 3. Seed (`seed.ts`, `catalog.ts`, `prng.ts`, `dates.ts`)

- mulberry32 with seed 20260925, consumed in one fixed order; the clock is `FINANCE_TODAY = 2026-08-21` (the Ops Desk's). The seed never reads `Date.now()` (tested by reading its source).
- Nothing is dated after the clock: an invoice, card, order, payout, payroll run or bank line that would land after today is not generated; an approval or payment that would fall after today leaves the document approved-but-unpaid or received (D-13).
- Invoices are keyed on business days; `received_on` and `created_at` shift a weekend arrival to the Monday.
- 47 irregularities and 179 hard negatives are planted with `label()`; a row can carry one label per irregularity (D-15). Planted rows are asserted inside the window with `must()`.
- Fingerprint: `sha256(stableStringify(data))` pinned in `tests/finance/seed.sha256`; regenerate deliberately when the seed changes.

## 4. Adapters

- **Patents** (`adapters/patents.ts`): every invoice line from the Patents ledger becomes an `Invoice` with lines on 6210 (professional), 6215 (office fees) or 6290 (unallocated, the two charges no matter can be named for) and a payables line on 2010; journals `JE-PAT-*`. Tests: 70 lines, $61,900.00; 6215 = $19,940; 6290 = $3,360; unchanged inside the full dataset.
- **Ops** (`adapters/ops.ts`, `ops-source.json`): every request is a purchase order (`source_id` = the request id, vendor `V-040` "Ops Desk suppliers"); only a delivered request with an ETA at or before today has an invoice, and its three-way match records the receipt; a refused request becomes a `refused-at-ceiling` flag and never a line. Shipments post by status: shipped ones on their ship date with freight (6310) and duties (6311); label-only on the submission date with no freight; a cancelled one posts and reverses in the same journal (D-14). Tests: 28 POs / $35,140, all under $5,000; 4 refusals as flags only; 15 value lines / $38,850; freight count = shipped count; cancelled nets zero.

## 5. Ledger (`ledger.ts`)

`postJournal` is idempotent on (source_system, source_id, version) and throws `ClosedPeriodError` on a closed period; `postCorrection` posts the delta as an adjusting entry in the next open period with `adjusts {journal_id, closed_period}`. `ledgerHash` is FNV-1a over `(id, version, lines[id, gl, amount])`. `spendLines`, `budgetVsActual`, `spendByMonth`, `burnRate` are pure over lines and the GL index.

## 6. Views (`views.ts`)

One function per screen; each returns a typed payload the client imports the type of, so the two cannot disagree. Every tile carries `provenance { rule, rows, sources, link, sample }`. `closeView(data, asof)` evaluates CL-1 … CL-10 as predicates over the rows with the evidence string it found; readiness is `Σ earned weight / Σ weight`. `healthView` scores with `inputs[{label, value, weight, earned}]`.

## 7. Watchers (`agents/*`)

### 7.1 Contract (`contract.ts`)

```ts
Finding { id, watcher, rule, subject: RowRef[], what, why: { evidence: RowRef[], attributions: Attribution[], rule }, confidence, severity, recommended_action, required_approver, created_at }
Draft   { id, watcher, kind: 'accrual'|'reclass'|'hold'|'match', finding_id, payload, status: 'proposed'|'approved'|'rejected', approvers: PersonaRole[] }
WatcherRun { watcher, ran_at, findings, drafts, dropped_uncitable, ledger_hash_before, ledger_hash_after, rows_read }
```

`finalize()` drops any finding with no evidence or no subject. `normalise()` makes attribution weights sum to one. `TRUST_LADDER` holds the three levels and the L2 configuration (off).

### 7.2 Invoice Watcher (`ap-anomaly.ts`) — the eleven rules

| Rule | Reads | Raises when | Never when |
|---|---|---|---|
| duplicate-exact | invoices | same vendor, normalised invoice number and amount; the copy is the rejected one, else the later entry | — |
| duplicate-fuzzy | invoices | same vendor, amount within 1 % (min $20), 0–21 days apart, and invoice numbers within Levenshtein 2 / prefix or descriptions with Jaccard ≥ 0.75; the copy is the unpaid one, else the later | the row is already an exact duplicate |
| bank-detail-change | invoices × vendor history | an unverified change inside 21 days before the invoice date or up to the payment date | the change was verified by call-back |
| amount-unusual | invoices per vendor | ≥ 4 prior invoices in the same currency; amount above the median by ≥ 1.8× and robust z > 3.5 (or ≥ 2× when the history is constant) | a PO approved the amount |
| split-po | purchase orders | same vendor and requester, consecutive orders ≤ 7 days apart, each under the ceiling, together ≥ the ceiling | — |
| missing-po | invoices | a three-way record with a leg missing (PO absent or unknown, no receipt, invoice ≠ order) | no three-way record is expected (retainers, rent) |
| round-number | invoices | ≥ $5,000, multiple of $1,000, no PO, not billed at that amount twice before, **and** rush or a vendor ≤ 60 days old or a failed three-way match or a memo naming no project / period / matter / quote / milestone / contract (D-16) | — |
| after-hours | invoices | keyed outside 06:00–20:00 or at the weekend **and** rush, a vendor ≤ 30 days old, or just under the ceiling with no PO | alone — never |
| new-vendor-rush | invoices × vendor | vendor created 0–30 days before the invoice, with rush or without a PO | — |
| off-policy | award lines, 6630 lines | the award's rules (funds.ts) judge the line questioned or unallowable; entertainment anywhere without an approval | — |
| wrong-account | invoices, cards | invoice coded outside the vendor's usual account group (capex exceptions at the $5,000 threshold); a card coded away from its merchant category's group | — |

High-severity invoice findings become `hold` drafts. `runRule(data, type)` runs one rule for the tests and the per-rule metrics.

### 7.3 The other four

- **Tie-out** wraps `reconcile.ts` (exact reference 1.0 → amount inside ±5 days 0.85/0.70 → counterparty and amount 0.55; auto at ≥ 0.9). Exceptions → findings; suggestions → `match` drafts. A candidate whose amount disagrees is dropped and counted (`wrong_amount_rejected`, asserted 0; a one-cent nudge test shows the guardrail catching).
- **Compliance** wraps `funds.ts` (R01-1 … R01-5): verdict findings, `reclass` drafts for two approvers, category-over-budget and burn-ahead findings.
- **Close** wraps `closeView`: a finding per task not done; `accrual` drafts for approved POs in the closing period with no invoice.
- **Health** wraps `healthView`: vendors under 50, departments under 60, chart-of-accounts recommendations.

### 7.4 Ask the books (`ask.ts`)

Refusals first (individual pay: pay words plus a person or "per person" phrasing; statutory dates), then twelve intents by regular expression (tape-outs, bank changes, the award, runway, the close, patents, findings, the Bills desk, and spend by vendor / project / department / account group / period). Every answer cites up to twelve rows with links; `n_rows` is the full count.

### 7.5 Orchestration (`agents/index.ts`)

`runAllWatchers(data)` runs the five, asserts every hash pair equal, and produces one `AuditInput` per run. `watchersView` is the Watchers screen's payload including `evaluate(ap.findings, labels())`. `apViewWithFindings` and `auditViewWithWatchers` compose the Bills desk and the audit log with the runs, so `views.ts` never imports an watcher.

## 8. Eval (`eval.ts`)

Per type: positives (labels with irregularity = T), hard negatives (looks_like = T, irregularity null), TP / FN over positives, FP = findings of type T on rows without a T label, FPR = FP on hard negatives ÷ hard negatives; micro-averaged overall; `missed[]` and `unlabelled[]` ids returned so a disagreement can be read. The watcher modules do not import `labels.ts` — a test reads their source.

## 9. Audit (`audit.ts`)

`AuditEvent { seq, at, who, role, what, object_type, object_id, before, after, why, source, prev_hash, hash }`; `hash = fnv1a64(stableStringify({seq, prev, ...event}))`. `chain` builds from the seed; `append` adds a run; `verify` recomputes and returns the first broken sequence number.

## 10. API and client

`GET /api/finance/{overview, ledger, ap, tie out, funds, close?asof=, health, audit, watchers, personas, ask?q=}`; `api-client.ts` types each fetch by the view's exported interface. The Bills desk payload carries `findings: Record<invoiceId, Finding[]>`.

## 11. Components

`FinanceShell` (header, rail, persona provider, synthetic chip, read-only banner, the footer); `PersonaContext` reads the URL through `useSyncExternalStore` and writes `?as=` back; every screen derives its deep-link state from `params` (`xState ?? params.x`) rather than copying it in an effect, which is what keeps first paint correct and the React compiler rules clean. `FindingCard` renders one finding everywhere.

## 12. Tests (`tests/finance`, vitest, 50)

tie-out (9): Patents and Ops to the cent, nothing after today · seed (6): reproducible, pinned, no clock, labels apart, periods, payouts · ledger (9): closed period, idempotency, correction, payroll suppression, award rules, indirect · watchers (26): one per rule, evidence and attributions, after-hours never alone, watchers never read labels, uncitable dropped, ledger unchanged by all five, audit chain with runs verifies and detects tampering, SoD refusals, wrong-amount 0 and the one-cent nudge, suggestions below trust, ask refusals and cited answers, eval thresholds, Bills desk and Watchers view agree.

## 13. Build and run

`npm run dev` (Turbopack; do not point it at a junctioned `node_modules`), `npm test`, `npx tsc --noEmit`, `npx eslint src/lib/finance src/components/finance src/app/finance`. `scripts/finance/extract-ops-source.mjs` regenerates `ops-source.json` from the Ops Desk demo file; `scripts/finance/build-dictionary.mjs` regenerates the dictionary from the compiled types and the seed.

## 14. Invariants, each with its test

Patents = $61,900.00 · Ops = $35,140 and $38,850 · nothing dated after today · fingerprint pinned · closed periods immutable · postings idempotent · payroll groups under three suppressed · every rule finds its positives and no hard negative · after-hours never alone · watchers never import labels · uncitable findings dropped · ledger hash unchanged by every run · audit chain verifies and breaks on tamper · SoD and unverified-bank refusals · wrong-amount matches 0 · L2 off · individual pay refused with no rows.

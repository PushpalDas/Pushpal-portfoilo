# Product requirements — Finance orchestrator

**Audience:** the engineer who will take the demo to a read-only pilot, and the finance lead who will run it. **Purpose:** what the product must do, for whom, and what it must never do — precise enough to test against. **Status:** in development; every figure in this document is illustrative and computed from a synthetic ledger (seed 20260925). Decisions are logged in `decision-log.md`; the engineering detail is in `engineering-spec.md`.

## 1. The problem

A hundred-person chip company has two honest money surfaces — the patent programme's ledger, where every counsel dollar names its matter, and the Ops Desk, where every request has an owner and a ceiling — and no third surface that reads them. Payroll, supplier bills, corporate cards, the web store and one restricted award live in five exports. Nobody can answer, for an arbitrary number, *where did this come from*, and nobody is sure nothing has paid itself.

The finance lead's words for the job: **"I want to be able to point at any number and see the rows, and I want to know that nothing moved unless a person moved it."**

## 2. Who it is for

| Persona | Role | What they need | What they may do |
|---|---|---|---|
| Yuki (finance lead) | Owns the books and the close, with the founders in the loop | Every number with provenance; a close that reads from the rows; refusals that hold | Approve and release, accept matches, approve reclasses, close a period |
| Dana (Founders-office associate) | Keys invoices and works the Bills desk | A queue with the watcher's findings on the row; a drawer that shows the evidence | Approve invoices she did not enter; accept matches; change vendor bank details (verified) |
| Priya (department head) | Spends a budget | Her department against the phased budget; POs and reimbursements to approve | Approve POs and reimbursements |
| Leila (award PM) | Runs the restricted award | Every award line judged by the award's rules; reclass proposals to approve with the finance lead | Approve reclasses; release restricted funds (with the finance lead) |
| Founders (in the loop) | Read | Runway, burn, the open flags | Nothing — read-only |
| External accountant (advisory) | Verifies | The audit chain and the rows behind any figure | Nothing — read-only |

## 3. Goals

1. **Provenance on every number.** Every tile, chart and total names the rule and the rows behind it, and the rows open.
2. **Findings, never actions.** Watchers raise findings with evidence and attributions, and draft changes; a named person's approval is the only thing that changes state.
3. **Two sources read to the cent.** The Patents ledger and the Ops Desk are carried unchanged; one test each holds their totals.
4. **A close that reads from the rows.** Task status is computed, never stored; readiness is a weighted sum with the weights on screen.
5. **Refusals that hold.** Segregation of duties, unverified bank details, read-only roles, individual pay and statutory dates are refused with the reason.

## 4. Non-goals — what AI is not used for

Releasing payments · changing vendor bank details · closing periods · releasing restricted funds · posting journals · writing back to Ops or Patents · statutory tax or filing dates · individual payroll analytics. These are not settings; they are the contract every watcher returns under, and each has a test.

## 5. Functional requirements

### 5.1 Ledger

- **FR-1** An append-only ledger of journals and lines with date, period, entity, department, GL account, project, fund, vendor, amount in USD and local currency, source system, source id and version.
- **FR-2** Posting is idempotent on (source system, source id, version). A post to a closed period is refused; a correction posts as an adjusting entry in the next open period, referencing the original.
- **FR-3** Payroll enters only as department × month × entity aggregates; a group under three people is suppressed on every screen and the suppression says so.
- **FR-4** The Patents adapter carries every patent invoice line to 6210 / 6215 / 6290 and sums to the Patents surface to the cent. The Ops adapter carries every request as a purchase order and every delivered request as an invoice, and every shipment's item value through inventory at the desk's totals.

### 5.2 Screens (nine, under `/finance`)

| Screen | Must show | Deep link |
|---|---|---|
| Overview | Seven tiles with a where-from drawer each; spend by month, category, department, vendor, project; budget vs actual; period states; ask the books | `?as=` |
| Ledger | Every line, windowed; filters on class, period, department, group, project, fund, source, entity; search; source chips that open Patents or the Ops Desk | `?q= &period= &department= &source= &cls=` |
| Bills desk | Every invoice with status, PO, three-way match, signals, findings; a drawer with lines, PO, bank-detail history, findings with attributions and evidence; Approve and Release with the segregation-of-duties check first | `?id= &status= &try=approve|pay` |
| Tie-out | Bank, card and Stripe payouts; three passes with confidence; auto / suggested / exception; accept and reject on suggestions | `?tab= &filter= &id=` |
| Funds | Utilisation by category, burn vs period of performance, every award line with its verdict and rule, reclass proposals, payroll aggregate | `?fund= &verdict=` |
| Close | Ten tasks with owner, dependency, BD+n due date, computed status and evidence; readiness with components; accrual drafts | `?asof=` |
| Health | Vendor, department and chart-of-accounts scores 0–100 with inputs and earned weights; recommendations | — |
| Audit | Every event, sequence-numbered and hash-chained; Verify; a tamper simulation | — |
| Watchers | The contract, the trust ladder, each watcher's queue, last run, drafts, rows read, hash check; the eval per rule with n; acceptance with n | — |

- **FR-5** Every screen renders any deep-link state on first paint; the persona comes from `?as=` and is carried across navigation.
- **FR-6** Every screen carries the synthetic-ledger chip, the seed and the clock, and the footer that lists what AI is not used for.

### 5.3 Watchers

- **FR-7** Every watcher returns `Finding[]` and `Draft[]` under `agents/contract.ts`. A finding without an evidence row is dropped before return and the drop is counted. Every run records the ledger hash before and after; they must be equal.
- **FR-8** The Invoice Watcher implements eleven rules (see the spec) with per-feature attributions that sum to one; each rule has a unit test that plants the pattern and a hard negative.
- **FR-9** The Tie-out Watcher proposes matches in three passes; it never proposes a match whose amount disagrees to the cent, and the count of such rejections is on screen and asserted zero.
- **FR-10** The Grant Rules Watcher judges every award line under the award's rules and drafts a reclass for each unallowable line, requiring the award PM and the finance lead.
- **FR-11** The Month-end Watcher computes the checklist and drafts received-not-invoiced accruals; it never closes a period.
- **FR-12** The Hygiene Watcher scores vendors, departments and the chart of accounts with visible weights; it never ranks a person.
- **FR-13** Ask the books answers only from cited rows and refuses individual pay and statutory dates with no rows attached.

### 5.4 Trust ladder

- **FR-14** L0 Suggest and L1 Draft are enabled. L2 Auto-execute is configured and off: exact-reference bank matches under $500, promoted only after 200 human decisions at precision ≥ 0.98, every auto action reversible and logged.

### 5.5 Audit

- **FR-15** Every posting, approval, refusal, vendor bank change, month-end and watcher run is an event with who, role, what, when, why, before → after and source, hash-chained; Verify recomputes the chain and reports the first broken link.

## 6. Quality bars

Strict TypeScript, no `any` · WCAG 2.2 AA (keyboard reachable, Escape closes drawers, charts carry text tables) · responsive at 360 px · no network call from any Finance screen · every figure labelled *Illustrative — synthetic ledger* · deterministic: the seed's fingerprint is pinned by test.

## 7. Success measures (pilot, PLANNED)

| Measure | How counted | Threshold agreed before build |
|---|---|---|
| Precision per rule on the first real month | A finance lead labels the month; the harness scores | ≥ 0.90 per rule, or the rule retires to advisory |
| Findings without evidence reaching a screen | Count from the dropped-uncitable counter | 0 |
| Actions taken by an watcher | Count from the audit trail (role = watcher, what ≠ run) | 0 — any breach stops the pilot |
| Wrong-amount matches proposed | Tie-out summary | 0 |
| Finance lead opens the queue | Audit trail | Every week; two missed weeks end the pilot |

On the synthetic ledger today: 47 of 47 planted irregularities raised, 0 of 179 hard negatives, 0 wrong-amount matches, 5 of 5 runs with the hash unchanged, acceptance n = 0.

## 8. Open questions

1. Which export formats the accounting system, the card issuer and the payroll provider can hand over read-only (D-19, pending).
2. Whether the award's sponsor requires a specific allowability rule set beyond the five modelled.
3. Whether the Wiki's demo sign-in is enough for the pilot's external accountant persona, or a separate read-only credential is needed.

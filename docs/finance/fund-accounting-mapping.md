# Mapping to fund accounting — nonprofit fund accounting as the reference pattern

**Audience:** a finance reader who knows nonprofit fund accounting and wants to know whether the demo's "restricted award" is the real thing or a metaphor. **Purpose:** concept by concept, what the demo has, what the fund-accounting pattern (ASC 958, and nonprofit fund accounting as the common implementation of it) calls it, and where the demo stops. Pattern level only: nothing here is a claim about any product's features beyond what the pattern names.

## 1. Why a startup award is modelled as a restricted fund

A sponsored award with a period of performance, category budgets and allowability rules behaves like a nonprofit's *net assets with donor restrictions*: the money may be spent only for the purpose, inside the period, under the rules, and the sponsor can disallow a cost after the fact. Modelling it as a fund, rather than as a project code on the operating books, is what lets every award line be judged on read and lets the indirect base be computed rather than typed.

## 2. Concept map

| Demo concept | Fund-accounting term (ASC 958 / fund accounting pattern) | In the demo | Where it stops |
|---|---|---|---|
| `Fund` with `kind: 'unrestricted'` (operating) | Net assets without donor restrictions; an unrestricted fund | Every line carries a fund; the operating fund has no rules | — |
| `Fund` with `kind: 'restricted'` (Award R-01), `period_of_performance`, `budget[]` by category, `rules[]` | Net assets with donor restrictions; a restricted fund or project with a grant period, a budget by cost category, and allowability terms | `funds.ts` judges every award line on read: allowable / questioned / unallowable, with the rule id | One award; no release of restriction is ever posted by the system (it is a person's action, and it is on the never list) |
| Category budgets (Labor, Materials, Equipment, Travel, Subcontracts, Indirect) | Grant budget by object class; budget vs actual by category | Utilisation by category with allowable / questioned / unallowable split; alerts at 90 % and over | No budget amendment workflow |
| `indirect_rate` 0.2 on direct costs, never on equipment | Indirect cost rate applied to a modified total direct cost base | Computed from allowable direct lines; a test holds the base | Provisional rate only; no rate agreement lifecycle |
| Rules R01-1 … R01-5 | Allowability rules (unallowable costs such as alcohol and entertainment; prior approval for equipment; per-diem; period of performance; indirect base) | Each rule has a positive and a hard negative in the seed and a finding type on the Invoice Watcher | Five rules; a sponsor's full cost principles are not modelled |
| Reclass draft for an unallowable line, approvers `r01-pm` and `controller` | Cost transfer with two approvals | A `Draft { kind: 'reclass' }` waiting on both roles; nothing moves until both approve | The transfer itself is not posted by the demo |
| `Period` states open → soft-close → closed; `postCorrection` as an adjusting entry in the next open period | Period close and lock; prior-period adjustment | Closed periods refuse writes; a correction references the original journal | No fiscal-year rollover |
| Close checklist CL-1 … CL-10 with owner role, dependency, BD+n due date, evidence predicate | Close task management with sign-off | Status computed from the rows; readiness as a weighted sum | The close itself is a person's action |
| Hash-chained audit log with before → after | Audit trail with change history | Verify recomputes every hash; a tampered event breaks the chain | No external anchoring of the chain |
| `PayrollJournal` aggregates, award labour allocation lines | Payroll allocation to a grant by effort | 4.5 FTE at timesheet rates allocated monthly as accrual journals | No effort certification; no per-person allocation anywhere, by design |
| Vendor master with `bank_history[]`, `verified` | Vendor record with banking change control | An unverified change blocks payment; the change is a finding | No vendor portal |

## 3. What fund accounting (the pattern) has that the demo does not

Multiple funds with inter-fund transfers and due-to / due-from balances · release-from-restriction entries · fiscal-year close and net-asset rollforward · sponsor reporting formats · budget amendments with approval · a general ledger that is the statutory ledger of record. The demo is a **review layer** that borrows the fund model; it is not, and does not try to be, the ledger of record.

## 4. What the demo has that the pattern usually leaves to people

Every award line judged on every read, with the rule beside it · a finding per questioned or unallowable line with evidence and a draft for two approvers · burn against the period of performance drawn against straight-line budget · the same provenance drawer on the award's tiles as on every other number.

## 5. If this went to a real award

Load the sponsor's cost principles as rules (the shape is `{id, rule, tests, consequence}`), load the approved budget by category, and point the adapter at the accounting system's export of the award's project code. The verdicts, the reclass drafts and the close task CL-8 work unchanged; the release of restriction and the sponsor report stay in the system of record.

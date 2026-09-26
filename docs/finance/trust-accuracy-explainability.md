# Trust, accuracy and explainability

**Audience:** the finance lead, the external accountant, and anyone deciding whether an agent's finding can be relied on. **Purpose:** what the agents may and may not do, how their accuracy is measured and shown, and how a finding explains itself. Written as commitments, each with the place it is enforced. Every figure is illustrative and from the synthetic ledger (seed 20260925).

## 1. What AI is not used for

Releasing payments · changing vendor bank details · closing periods · releasing restricted funds · posting journals · writing back to the Ops Desk or the Patents ledger · statutory tax or filing dates · individual payroll analytics.

*Enforced by:* the agent contract (agents return findings and drafts only), the persona permissions (`personas.ts`), the refusals in ask-your-ledger, the payroll aggregation in the seed, and the tests named in §6. Shown on every Finance screen's footer and on the Agents screen. Not a setting.

## 2. The contract

A **finding** is: what · why (the evidence rows, the attributions, the rule) · confidence 0–1 · severity · the recommended action · the role that may act. A **draft** is a proposed accrual, reclass, hold or match tied to a finding, waiting for its approvers.

- A finding with no evidence row is dropped before it is returned, and the drop is counted on the Agents screen (today: 0).
- Every run records the ledger hash before and after; they are asserted equal (today: 5 of 5).
- A draft's status changes only when a named person with the role approves it, and that approval is the audit event.

## 3. Accuracy — measured on a labelled set, with n

The seed plants 47 anomalies and 179 hard negatives (legitimate rows that resemble an anomaly) and labels them in a file the agents never import. The harness joins findings to labels per type:

| Term | Meaning here |
|---|---|
| True positive | a planted anomaly with a finding of its type on it |
| False negative | a planted anomaly with none |
| False positive | a finding of a type on a row not labelled with that type |
| False-positive rate | findings on the type's hard negatives ÷ hard negatives |

Today, on the synthetic set: precision 1.00, recall 1.00, FPR 0.00 over 47 + 179. **Read this correctly:** the rules were tuned on the seed they are scored against. The first run read 0.34 precision — most of it true findings the labels had not recorded, some of it two rules that were too loose. The number that matters is the one from the first labelled real month, per rule, with its n; until then every rule is advisory in spirit.

The Agents screen shows the table per rule and the ids the agent missed or raised without a label, so a disagreement is read the same way the first one was.

## 4. The trust ladder

| Level | Means | Status | Promotion |
|---|---|---|---|
| L0 Suggest | The agent raises a finding; a person acts or dismisses | enabled | — |
| L1 Draft | The agent prepares the change; a named person's approval changes state | enabled | a person accepts drafts |
| L2 Auto-execute | Within shown limits the agent executes a reversible, low-value, high-confidence action and logs it | **configured, off** | ≥ 200 human decisions at precision ≥ 0.98 on exact-reference bank matches under $500; every auto action reversible in one click, each a logged event |

Auto-executed so far: 0. Acceptance so far: n = 0, because no person has decided a finding in the demo; it is measured from the audit trail, not estimated.

## 5. Explainability — how a finding explains itself

- **Attributions** are shares of the confidence, one per feature, summing to one, each with the value that earned it: *unverified change 50 % — no call-back on the 20 Apr change; days to invoice 20 % — 1 day; requested via 15 % — email; rush 15 %.* A finance lead can disagree at the weight.
- **Evidence chips** open the rows: the invoice, the original it duplicates, the vendor's bank history, the purchase orders, the ledger line, the bank line.
- **The rule** is printed in words under the attributions and in the engineering spec as a predicate.
- **The recommended action and the approver role** are on the card, so the next step is never "ask the agent".
- **Refusals** carry the reason and the person to ask: *Whoever creates or edits an invoice cannot approve or pay it. Ask Yuki Tanaka (Finance controller).*

## 6. The tests that hold this

| Commitment | Test |
|---|---|
| No agent changes the ledger | `no agent changes the ledger` — hash before = after for all five |
| No finding without evidence | `drops a finding that cannot cite a row` |
| Agents never see the labels | `never reads the labels` — reads the agents' source |
| After-hours never alone | `after-hours is never raised alone` |
| No wrong-amount match | `never proposes a match on a wrong amount` (0, and a one-cent nudge) |
| L2 off | `suggests below the trust level and never auto-accepts there` |
| Segregation of duties, unverified bank details | `refuses the person who entered the invoice, and payment to unverified bank details` |
| Read-only roles | `a read-only persona can change nothing` |
| Individual pay refused, no rows | `refuses a question about one person's pay, with no rows` |
| Statutory dates refused | `refuses statutory dates` |
| Payroll aggregate only | `payroll suppression` tests in `ledger.test.ts` |
| Sources to the cent | `Patents → Finance, to the cent`, `Ops → Finance, to the cent` |
| Audit chain verifies and detects tampering | `every agent run is an audit event and the chain still verifies` |

## 7. What is not covered

A model is not in the system, so there is no prompt, no hallucination path and no drift to monitor — and no recall beyond what a finance lead thought to write as a rule. When a model is added at the edge (roadmap, later), every model output will be held to the same contract: cite rows or be dropped.

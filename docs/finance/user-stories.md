# User stories — AP Anomaly Agent and the Reconciliation workbench

**Audience:** the engineer writing the tests and the finance lead accepting them. **Purpose:** Given / When / Then for the two surfaces a pilot lives or dies on. Each story names its test where one exists in `tests/finance/`; a story marked *pilot* is accepted on the read-only pilot, not on the synthetic ledger. Every id below is from the synthetic ledger (seed 20260925).

## A. AP Anomaly Agent

**A1 — An exact duplicate is raised on the copy, not the original.**
Given two invoices from the same vendor with the same invoice number and amount, one paid and one entered later by another analyst · When the agent runs · Then one finding of type *duplicate-exact* names the later one as its subject, cites both invoices as evidence, and recommends rejecting it — or recovering it as a credit if it was paid. *Test:* `duplicate-exact: raises every planted anomaly and none of its hard negatives`.

**A2 — A recurring bill at the same amount is not a duplicate.**
Given rent invoiced at the same amount every month with a different invoice number · When the agent runs · Then no duplicate finding names any rent invoice. *Test:* the hard negatives of `duplicate-exact` and `duplicate-fuzzy`.

**A3 — A re-issued invoice with a suffixed number is a fuzzy duplicate.**
Given an invoice re-sent a week later with `-R` appended, the same amount · When the agent runs · Then a *duplicate-fuzzy* finding names the re-issue, with attributions for amount, days apart and invoice number that sum to one. *Test:* `duplicate-fuzzy …`, `every finding cites … attributions that sum to one`.

**A4 — An unverified bank change before an invoice is raised, high, and the payment is refused.**
Given a vendor whose bank details changed by email the day before its invoice, with no call-back recorded · When the agent runs and the finance lead tries to release the payment · Then a *bank-detail-change* finding at high severity names the invoice and cites the vendor, and the release is refused with the reason and the call-back to make. *Tests:* `bank-detail-change …`, `refuses … payment to unverified bank details`.

**A5 — A verified change weeks earlier is not raised.**
Given a vendor whose change was verified by phone six weeks before its next invoice · When the agent runs · Then no finding. *Test:* the hard negatives of `bank-detail-change`.

**A6 — An outlier against the vendor's own history is raised unless a purchase order approved it.**
Given a vendor with four or more prior invoices and a new one at four times their median, with no PO · When the agent runs · Then an *amount-unusual* finding with the ratio and the robust z-score as attributions; given the same amount on an approved PO for that amount · Then no finding. *Test:* `amount-unusual …`.

**A7 — Orders split under the ceiling are raised as one finding on all of them.**
Given three orders to one vendor by one requester inside a week, each under $5,000 and together over it · When the agent runs · Then one *split-po* finding whose subject is all three orders and whose evidence includes their invoices. *Test:* `split-po …`.

**A8 — A three-way match with a missing leg is raised; a standing agreement is not.**
Given an invoice referencing a PO with no goods receipt · Then a *missing-po* finding naming the missing leg; given a retainer with no PO by policy and no three-way record · Then no finding. *Test:* `missing-po …`.

**A9 — After-hours is never raised alone.**
Given an invoice keyed at 23:05 from a long-standing vendor, normal terms, on a PO · When the agent runs · Then no finding; given one keyed at 22:40 with rush from a two-day-old vendor · Then an *after-hours* finding whose attributions include the partner signals. *Tests:* `after-hours is never raised alone`, `after-hours …`.

**A10 — The agent never reads the labels and never changes a row.**
Given the dataset · When the agent runs · Then the ledger hash before equals the hash after, and no module under `agents/` imports `labels.ts`. *Tests:* `no agent changes the ledger`, `never reads the labels`.

**A11 — A finding that cannot cite a row is never shown.**
Given a finding with an empty evidence list · When results are finalised · Then it is dropped and the drop is counted on the Agents screen. *Test:* `drops a finding that cannot cite a row`.

**A12 — The queue shows the findings on the row, and a flagged row needs a written reason.**
Given an invoice with a finding · When the Founders-office associate opens it and presses Approve with no reason · Then the approval is refused for want of a reason of at least twelve characters; given the same invoice entered by her · Then it is refused under segregation of duties whatever she writes. *Tests:* `refuses the person who entered the invoice`; the reason rule is exercised in the demo.

**A13 (pilot) — The finance lead can retire a rule.**
Given a rule under 0.90 precision on the first labelled real month · When the finance lead sets it to advisory · Then its findings still appear in the drawer but not in the queue count, and the change is an audit event.

## B. Reconciliation workbench

**B1 — A bank line with the payment reference is auto-matched.**
Given a bank line whose description carries the invoice's payment reference and whose amount agrees to the cent · When the matcher runs · Then the line is matched at confidence 1.0 by *exact-reference* and shown as auto. *Test:* `never proposes a match on a wrong amount` (structure), demo counts 356 of 371.

**B2 — The same amount inside five days is suggested, not accepted, below the trust level.**
Given a bank line with no reference, one invoice of the same amount paid three days earlier · When the matcher runs · Then the match is proposed by *amount-and-date* at 0.70 and shown as suggested with Accept and Reject. *Test:* `suggests below the trust level and never auto-accepts there`.

**B3 — A wrong amount is never proposed.**
Given every bank amount shifted by one cent · When the matcher runs · Then no invoice match survives with a different amount, and the wrong-amount counter is zero. *Test:* `never proposes a match on a wrong amount`.

**B4 — Two candidates of the same amount are a suggestion with both named.**
Given a bank line whose amount matches two unpaid invoices from the same counterparty · When the matcher runs · Then a *fuzzy-counterparty* suggestion at 0.55 says two invoices could be the one, and a person decides.

**B5 — An exception says why.**
Given a bank line with no reference, no known counterparty and no amount that matches · Then the line is an exception with the sentence that says which pass failed, and the Reconciliation Agent raises a finding citing the line.

**B6 — A read-only persona cannot accept a match.**
Given the external accountant persona · When they press Accept on a suggestion · Then the action is refused with the role named. *Test:* `a read-only persona can change nothing`.

**B7 — A payout ties out or it does not.**
Given a Stripe payout · When the workbench recomputes charges − fees − refunds ± adjustments from the balance transactions · Then it agrees with the payout amount and with the bank line carrying the payout id, or the payout is an exception. *Test:* `reconciles every Stripe payout …` (seed), demo 29 of 29.

**B8 — A card line without a receipt is suggested, not exceptional.**
Given a card transaction posted from the feed with no receipt attached · Then it is shown as suggested with the holder asked before the close, and it is not an exception.

**B9 — Accepting a suggestion is an audit event.**
Given a suggested match · When the Founders-office associate accepts it · Then the decision is listed in the audit trail's format with who, what, and the confidence and rule that proposed it.

**B10 (pilot) — L2 stays off until it is earned.**
Given the trust configuration · When 200 human decisions on exact-reference matches under $500 are recorded at precision ≥ 0.98 · Then and only then may L2 be enabled, and every auto action is reversible in one click with an audit event. *Test:* `L2 is off`.

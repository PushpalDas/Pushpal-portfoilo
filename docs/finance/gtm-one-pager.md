# Go-to-market one-pager — if this were a product

**Audience:** whoever asks "why not buy one". **Purpose:** where this sits against the patterns on the market, at pattern level and without claims about any named vendor's numbers. **Status:** an internal tool in development; this page exists to answer the build-vs-buy question, not to sell anything.

## The one-line position

*A review layer over the books you already have: every number with its rows, every finding with its evidence, every change a named person's — and an AI that is allowed to find and draft, never to act.*

## Who it is for

A finance team of one controller and one or two AP people at a company between fifty and two hundred people, with a real accounting system, a restricted grant or award, a card programme, a web store, and at least one internal system that already tracks money well (here: a patent ledger and an operations desk). Not for a company whose accounting system is the whole finance stack, and not for one big enough to have an internal audit function.

## The patterns it sits between

| Pattern | What it does well | Where this differs |
|---|---|---|
| AP automation suites | Capture, coding, approval routing, payment execution | This never executes a payment and never codes a line; it reads the AP export and raises findings on it. The suites' value is in *doing*; this one's is in *reading with evidence* |
| Close management tools | Task lists, owners, due dates, sign-off | Status here is computed from the rows, never stored; a task is done because the ledger says so, not because someone ticked it |
| Spend-analytics dashboards | Charts over spend | Every chart here opens its rows and names its rule; the dashboards' numbers are typed into a model once |
| Fraud and anomaly detection services | Models trained across many customers | Eleven rules a finance lead can read and argue with at the weight; a model is deliberately at the edge, later, and never in the critical path |
| Fund-accounting systems (nonprofit) | Restricted funds, allowability, sponsor reporting | This borrows the model — funds, periods of performance, category budgets, rules — for a startup award, and maps to it (see the mapping note) rather than replacing it |

## What is genuinely different, and what is not

**Different:** the contract (findings and drafts only, with the ledger hash asserted unchanged); provenance on every number; refusals tested (segregation of duties, unverified bank details, individual pay); a trust ladder where auto-execution is configured, off, and gated on human decisions with a stated n.

**Not different:** the rules themselves are the ones every AP reviewer knows; the matcher is the standard three-pass; the close checklist is the standard one. The claim is not novelty of rule but honesty of surface.

## What it would need to be a product

Adapters for the common accounting exports; a labelled-month onboarding that gives every customer their own precision per rule with n before any finding is shown; a customer-visible eval page; and the trust ladder's promotion evidence exportable to an external accountant. None of that is built.

## What it will never do, as a product or otherwise

Release payments · change bank details · close periods · release restricted funds · post journals · write back to source systems · compute statutory dates · analyse individual pay.

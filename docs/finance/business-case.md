# Business case — modelled, not measured

**Audience:** the founder, before agreeing to the read-only pilot. **Purpose:** what the desk could be worth, as a model with every assumption on the table and adjustable, and what it would cost. **Nothing in this document has been measured.** The pilot's fifth step (roadmap) replaces the modelled column with a measured one; until then no figure here should be quoted without the word *modelled*.

## 1. What is being valued

Three things, in the order a controller would rank them:

1. **Money that does not leave wrongly.** A duplicate paid, a payment to a changed bank account, a bar charge on the award that the sponsor disallows at audit.
2. **Hours in the monthly close** that are reconciliation, review and evidence-gathering rather than judgement.
3. **The cost of not being able to answer** — audit findings, sponsor questions, a founder decision made on a stale number.

Only the second is modelled below in hours; the first is modelled as exposure, not as "fraud caught", because nothing has been caught.

## 2. Assumptions — adjust these first

| # | Assumption | Value used | Source | Adjust it if |
|---|---|---|---|---|
| A1 | Invoices per month | 26 (313 over twelve months in the seed) | synthetic ledger | the accounting export says otherwise |
| A2 | Bank lines per month | 31 (371 / 12) | synthetic ledger | — |
| A3 | Controller's fully loaded hour | $95 | placeholder, to be replaced by finance | — |
| A4 | AP specialist's fully loaded hour | $55 | placeholder | — |
| A5 | Hours per close today, by task | see §3, the controller's own estimate | interview, PLANNED — placeholder until then | the pilot's measurement differs |
| A6 | Share of each task the desk carries | see §3 | the demo's screens, judged by what they compute | the controller disagrees on any row |
| A7 | Duplicate exposure | 0.5 % of invoice value paid twice per year, half recovered | industry pattern, unverified here | the first labelled month finds a different rate |
| A8 | Bank-change fraud exposure | one attempt per two years at the median rush invoice ($18,500 in the seed) | pattern, unverified | — |
| A9 | Award disallowance exposure | 2 unallowable lines of 31 in the seed ($3,336) | synthetic ledger | the sponsor's audit history |
| A10 | Build cost to pilot | 6 engineer-weeks (adapters for four exports, a labelled month, pilot instrumentation) | estimate | — |
| A11 | Run cost | Hosting inside the existing Wiki, no model, no licence — $0 incremental | fact for the demo; the pilot's exports may carry a cost | — |

## 3. Hours per close — modelled

| Task | Today (A5, controller's estimate) | With the desk (A6) | Modelled saving | What the desk actually does for the task |
|---|---:|---:|---:|---|
| Bank reconciliation | 14 h | 6 h | 8 h | Three passes propose; a person decides suggestions and works exceptions |
| AP review | 10 h | 5 h | 5 h | Findings on the row with evidence; the reviewer reads the drawer, not the mailbox |
| Award compliance | 8 h | 4 h | 4 h | Every line judged on read; reclass drafts prepared |
| Accrual drafting | 6 h | 3 h | 3 h | Received-not-invoiced drafts from approved POs |
| Audit preparation | 8 h | 3 h | 5 h | Hash-chained log, provenance on every number |
| **Total** | **46 h** | **21 h** | **25 h** | |

Modelled value of the hours: 25 h × a blended $75 (A3, A4) × 12 = **$22,500 a year, modelled**. This is the number most likely to be wrong, in either direction, and it is the one the pilot measures first.

## 4. Exposure — modelled, not caught

| Exposure | Modelled annual amount | Basis |
|---|---:|---|
| Duplicates paid and not recovered | ≈ $12,000 | A7 on $4.9M of ap.manual spend in the seed |
| A payment to unverified bank details | ≈ $9,250 a year, expected value | A8 |
| Award disallowance at audit | ≈ $3,300 | A9, the seed's two unallowable lines |
| **Total modelled exposure** | **≈ $24,500** | none of it observed |

The desk does not "save" this; it makes each of the three a refusal or a finding before the money moves, which is a different claim. The honest statement is: *on the synthetic ledger the rules find every planted instance of these three; whether the real ledger contains any is unknown.*

## 5. Cost

| Item | Modelled |
|---|---:|
| Build to pilot (A10) | 6 engineer-weeks |
| Run (A11) | $0 incremental |
| Controller's time to label one month | ≈ 6 h, once |
| AP specialist's time in the pilot | inside the AP review hours above |

## 6. Sensitivity — the three assumptions that decide it

- **A5 / A6 (hours).** If the controller's real close is 30 h rather than 46, the modelled saving halves. Measure before quoting.
- **A7 (duplicate rate).** At 0.1 % the duplicate exposure is ≈ $2,400; at 1 % it is ≈ $24,000. The first labelled month gives the real rate with an n.
- **A10 (build).** Adapters for real exports are where estimates go wrong; the two adapters that exist took the shape of their sources, and the four planned ones will too.

## 7. What would make this case wrong

A close that is mostly judgement rather than reconciliation (the hours model collapses); an accounting system that already refuses duplicates and unverified bank changes at entry (the exposure model collapses); or a pilot in which the controller does not open the queue (the whole case collapses, and the roadmap says so).

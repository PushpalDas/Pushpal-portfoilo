# Finance Orchestrator — Decision log

**Audience:** anyone reviewing why the build is shaped as it is. **Purpose:** one entry per decision, ADR-style: context, decision, consequences. Assumptions made without an answer from Pushpal are marked *assumed* and can be reversed while they are cheap.

---

## D-01 · Work from a clone outside OneDrive; deploy the Wiki with the Git-linked identity — 2026-09-26
**Context.** The OneDrive clone of the Wiki cannot commit (`.git/logs/HEAD` is a cloud placeholder) or run (`node_modules` placeholders). The Wiki's Vercel project builds only commits authored `Pushpal <pushpaldas2001@gmail.com>`.
**Decision.** All Finance work happens on `feat/finance-orchestrator` in a fresh clone; edits are mirrored to the OneDrive copy for continuity. The final merge to `main` is authored with the linked identity.
**Consequences.** No silent non-deploys; a two-copy discipline that must be kept.

## D-02 · Status `development` gets verifier rules — *assumed*
**Context.** The master prompt requires stage "In development". The status exists (`app/work/status.ts`) but `scripts/verify-case-studies.js` has no rules for it and skips such pages.
**Decision.** Add rules mirroring `customer-testing`: band 800–1,000 words, §08 "Early signal and what I'm watching", §09 "What would make me stop", six tiles with n stated, one guardrail, one definition.
**Consequences.** The new page is checked, not skipped; the three in-development silicon pages will start reporting problems and are out of scope to fix (they can be added to `FORMAT_EXCEPTIONS` if Pushpal prefers).

## D-03 · `/demo/finance-desk` is a rewrite to the Wiki, not a second build — *assumed*
**Context.** Ops Desk is a standalone HTML demo with `?as=`/`?view=`; Patents links straight to the Wiki. Finance's views are large and read one seed.
**Decision.** The Wiki Finance section implements the persona switch and every deep-link parameter (`as`, `view`, `id`, `open`, `asof`); the portfolio's `/demo/finance-desk` rewrites to `xana-nine.vercel.app/finance` with the query string preserved.
**Consequences.** One implementation, one dataset, no drift between demo and product; the demo depends on the Wiki deploy being live.

## D-04 · PM artifacts are served at `/docs/finance/<name>` — *assumed*
**Context.** `docs/finance/*.md` is not web-served; the case study must link the artifacts. `next-mdx-remote` is already a dependency.
**Decision.** A small `app/docs/finance/[doc]/page.tsx` renders the markdown with the `.cs2` prose styles; the files stay the source of truth.
**Consequences.** Links resolve on the live site; markdown stays reviewable in git.

## D-05 · Tests: vitest in the Wiki, node scripts in the portfolio — *assumed*
**Context.** Neither repo has a unit-test runner. The master prompt requires tests for every rule and for the tie-out math.
**Decision.** Add `vitest` (dev dependency) to the Wiki with `npm test`; the portfolio keeps its `node scripts/verify-*.js` style for the new verifier rules.
**Consequences.** One new dev dependency in the Wiki; tests run in CI-less local runs and are part of the P5 gate.

## D-06 · §08 chart is a new `ladder` form — *assumed*
**Context.** The portfolio rotates §08 chart forms and Ops already owns `gateBars`.
**Decision.** Add a `ladder` `ChartSpec` (three rungs L0/L1/L2 with decisions and precision per rung, the promotion threshold drawn as a rule) and its component.
**Consequences.** One new chart form in `case-study-charts.tsx` and the ledger in the authoring brief.

## D-07 · Award R-01 names no agency and no contract number — *assumed*
**Context.** Public sources say Ixana has U.S. Air Force contract work; the mechanism is unconfirmed.
**Decision.** Model an illustrative award "R-01" with a period of performance, category budget, indirect rate and allowability rules; label it "illustrative award, analog of a restricted fund"; never name the agency or a vehicle.
**Consequences.** Nothing on the page can be read as a statement about a real award.

## D-08 · No statutory or filing date is computed anywhere — carried over from Patents
**Context.** The Patents page's spine is "no statutory date computed in-house". Finance's close calendar and tax items could tempt one.
**Decision.** Close tasks use business-day offsets from a chosen `asof`; tax and filing dates appear only as items owned by a person with a "date per adviser" note, never computed.
**Consequences.** Consistent doctrine across the two money surfaces.

## D-09 · Seed 20260925, pinned today, fixed monthly FX
**Context.** Every figure must be synthetic, deterministic and labelled.
**Decision.** `seed.ts` uses mulberry32 seeded with 20260925; `FINANCE_TODAY` is pinned to **2026-08-21, the Ops Desk clock** (amended in P2: Finance reads Ops rows dated up to that day, and the Patents ledger’s latest date, 14 Aug, sits inside); one USD/INR rate per month in a table; a SHA-256 of the generated ledger is asserted in a test.
**Consequences.** Byte-reproducible seeds; captions can cite the seed.

## D-10 · Ops procurement posts an expense only once invoiced — 2026-09-26
**Context.** The desk holds 28 requests ($35,140); four are still submitted or assigned with no invoice.
**Decision.** Every request is a purchase order (so the desk total is asserted at PO level); an expense line posts only for delivered and ordered requests ($30,860). The rest are open commitments.
**Consequences.** Budget-vs-actual shows commitments apart from actuals; the test carries the desk total on the POs.

## D-11 · Shipments move inventory; freight and duties are Finance accruals — 2026-09-26
**Context.** The Ops Desk records item value, weight, service level and destination, never a freight cost.
**Decision.** Sample and outbound shipments relieve inventory to kit COGS; returns and inbound reverse it; freight (6310) and customs/duties (6311) are accrued per shipment from the desk's own service level and weight, labelled as Finance's estimate.
**Consequences.** The $38,850 item value ties out to the desk; logistics cost is visible in its own accounts and never inside the item value.

## D-12 · Award R-01 ground truth — 2026-09-26
**Context.** The compliance watcher needs both a clean line and a violating one per rule.
**Decision.** The $58,000 oscilloscope on the award carries prior written approval from the award PM (allowable); the $6,200 fixture set does not (questioned, R01-2); one bar charge (R01-1) and one pre-award component invoice (R01-4) are planted.
**Consequences.** Every rule has a labelled positive and a hard negative in the seed.

## D-13 · Nothing in the seed is dated after today — 2026-09-26 (P2)
**Context.** The first render showed September payment approvals and an August payroll in the audit log: the seed had generated documents on their natural dates regardless of the pinned clock.
**Decision.** Every generator checks the clock: an invoice, card, reimbursement, order, payout, payroll run or settlement that would land after today is not generated; an approval or payment that would fall after today leaves the document approved-but-unpaid or received; a bank line that would book after today has not booked. A test asserts that no document, approval, journal, bank line or payout is dated after `today`.
**Consequences.** Fewer rows in August (the open period) — which is what an open period looks like — and every audit event sits at or before today.

## D-14 · Ops shipments post by status — 2026-09-26 (P2)
**Context.** The Ops Desk carries fifteen shipments in every state from submitted to delivered, including one cancelled, and its clock runs to 21 Aug.
**Decision.** A shipped one (Delivered, In Transit) posts on its ship date and accrues freight and duties; one with only a label or a submission posts on its submission date with no freight; a cancelled one posts and reverses in the same journal, so the desk’s $38,850 item value still ties out while inventory nets to zero. The test counts freight lines against the shipped count rather than fifteen.
**Consequences.** The Ops total holds to the cent and the accounting says what the desk says.

## D-15 · One label per irregularity, not one per row — 2026-09-26 (P3)
**Context.** The first eval run scored 0.34 precision. Reading the false positives showed most were true: the planted bank-change invoice mimics the genuine April packaging invoice (so it is also a fuzzy duplicate and a round $61,000 with rush), the after-hours invoice is also from a two-day-old vendor with rush, and the quarter-end $5,000 invoice also fails its three-way match. The label set had recorded one irregularity per row.
**Decision.** A row carries one label per irregularity it exhibits; the harness scores each type on its own (TP = a positive with a finding of that type; FP = a finding of that type on a row without that label; FPR over the type's hard negatives). The two bank-change rows that had been generated as same-day twins of a monthly invoice are now the monthly invoices themselves, labelled, one with rush. The after-hours row with nothing else unusual becomes a hard negative, because the rule is never to raise after-hours alone. The Ops invoices — which exist only once a request is delivered — record the receipt leg as true, matching their note. Invoices are keyed on business days, so "weekend" means something.
**Consequences.** 47 positives and 179 hard negatives; the seed fingerprint is re-pinned; the twelve-month spend moves from $16,038,125 to $16,013,625 (two synthetic invoices fewer). The harness reports the missed and the unlabelled ids beside every number so the next disagreement is read the same way.

## D-16 · Weak signals need a partner — 2026-09-26 (P3)
**Context.** A round amount with no purchase order described most of the large synthetic purchases (tape-out packaging, probe cards, trade-show stands, an annual licence): true, and useless as a finding.
**Decision.** *round-number* raises only with rush, a vendor under sixty days old, a failed three-way match or a memo that names no project, period, matter, quote, milestone or contract. *after-hours* raises only with rush, a vendor under thirty days old, or an amount just under the ceiling with no PO — never with "no PO" alone, and never alone. *amount-unusual* does not raise an invoice whose purchase order approved the amount. Inside a duplicate pair, the copy is the unpaid one, else the one entered later; an invoice already rejected is the copy.
**Consequences.** The rules read as a controller would write them; the eval prints per-rule numbers with n, and the case study will quote those, not a headline.

## D-17 · Acceptance has n = 0 until people decide — 2026-09-26 (P3)
**Context.** The watchers panel was designed with an acceptance rate per watcher. The seed records approvals of invoices and purchase orders, but no human decision on an watcher finding.
**Decision.** The panel shows acceptance as n = 0 with the sentence that says why; it is measured from the audit trail once people accept or dismiss findings. Nothing is estimated and nothing is typed in.
**Consequences.** One slot on the panel is honestly empty in the demo; the eval slot is full.

## D-18 · `/demo/finance-desk` is a redirect, not a rewrite — 2026-09-26 (P4)
**Context.** D-03 chose "a rewrite to the Wiki with parameters passed through, the Patents pattern". The Patents card in fact links the Wiki's origin directly, and a cross-origin rewrite of a Next.js page would serve the Wiki's HTML with this site's asset paths, so nothing would load.
**Decision.** `next.config.ts` redirects `/demo/finance-desk` → `https://xana-nine.vercel.app/finance` and `/demo/finance-desk/:path*` → `…/finance/:path*` (temporary redirects, query string preserved). The Wiki's `/finance` honours `?view=<screen>` by hopping to `/finance/<screen>` with every other parameter intact, so both `?view=ap&id=…` and `/ap?id=…` work. The Bills desk gained `?try=approve|pay`, which opens the row with that decision already attempted, so a case-study image can be the refusal its link opens.
**Consequences.** One implementation, one dataset, a clean path in every link; the case study's evidence strip and gallery link `/demo/finance-desk/…`.

## D-19 · The `development` status gets rules, not a skip — 2026-09-26 (P4)
**Context.** The verifier skipped `development` with a warning (Q2 in discovery).
**Decision.** `development` takes the customer-testing shape — band 800–1,000 prose words, §08 "Early signal and what I'm watching", §09 "What would make me stop", six tiles, one definition — plus three rules of its own: the page must separate **BUILT** from **PLANNED**, must say its figures are synthetic, and must quote an n. The card checker accepts the status.
**Consequences.** The Finance page is checked, not skipped; the three in-development silicon cards now report their own problems (missing §02, shared tile sets) instead of a skip line, which is information rather than noise.

## D-20 · The card image is a capture, pending a cover — 2026-09-26 (P4)
**Context.** Every other AI-track card carries a generated cover; none exists for Finance.
**Decision.** The card uses the overview capture (`ixana-finance-overview.jpg`) so the checker passes and the card is honest; a cover prompt is written in `changes/finance-orchestrator-image-prompt.md` in the portfolio's usual pattern for when one is generated.
**Consequences.** Swap one filename in `constants.ts` when the cover exists.

**D-20, amended 2026-09-26.** Pushpal supplied the cover (`Gemini_Generated_Image_r4xu8br4xu8br4xu.png`, already in `public/static/images/project/`); the card uses it and the overview capture stays as the evidence image and the §06 shot's neighbour.

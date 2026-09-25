# Finance Orchestrator — Data dictionary

**Audience:** engineers and the auditor persona. **Purpose:** every entity, field, type, source, an example row and the view that consumes it — generated from `src/lib/finance/types.ts` and a built dataset by `scripts/finance/build-dictionary.mjs`. Regenerate after any change to the types or the seed.

**Illustrative — synthetic ledger.** Seed 20260925, "today" 2026-08-17. Every vendor, amount, date and event is invented. Payroll exists only in department × month aggregate (groups under 3 suppressed). Read-only adapters carry the Patents ledger and the Ops Desk rows unchanged.

## Totals a reader can check

| Figure | Value |
|---|---|
| Ledger lines (all classes) | 2,131 in 884 journals |
| Expense lines | 1,141 · $17,121,586.22 |
| — payroll | $11,299,270.72 |
| — ap.manual | $4,866,059.23 |
| — accruals | $706,090.68 |
| — patents.invoices | $61,900.00 |
| — stripe | $58,910.00 |
| — cards | $54,357.30 |
| — ops.shipments | $40,608.85 |
| — ops.procurement | $30,860.00 |
| — bank | $2,249.95 |
| — reimbursements | $1,279.49 |
| Invoices | 314 (25 from Patents, 24 from Ops) |
| Purchase orders | 66 (28 from Ops) |
| Card transactions | 189 · reimbursements 14 |
| Bank lines | 401 |
| Stripe orders / payouts | 51 / 36 |
| Vendors | 46 (4 with a bank-detail change on file) |
| Planted anomalies / hard negatives | 43 / 184 |
| Periods | 30 (28 closed, 1 soft-close, 1 open) |

## Assumptions behind the magnitudes

- Headcount 77 → 96 over the twelve months, split US / India per department (`HEADCOUNT`); fully loaded monthly cost per head per entity and department (`COST_PER_HEAD`).
- One fixed INR/USD rate per month (`FX`); the India subsidiary keeps USD as functional currency and INR as local.
- Two tape-outs (Nov 2025 NFE3001, Apr 2026 COMBO) with packaging and probe cards; quarterly EDA plus one annual verification licence; eight capex items at or above $5,000 with Controller and Founder approval.
- Kit prices $1,850 and $2,400, COGS $610 and $790; processor fee 2.9 % + $0.30; weekly payouts arriving the following Monday; royalty 3 % of kit revenue accrued quarterly.
- Award R-01: period of performance 1 Oct 2025 → 30 Sep 2026, budget by category, indirect at a provisional 20 % on direct costs excluding equipment; rules R01-1 … R01-5.
- The Ops Desk ceiling ($5,000) and the capex threshold ($5,000) are the same number on purpose: what the desk refuses is what capex approves.

## Persona

**Source:** catalog.ts · **Consumed by:** Persona switch, SoD

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `name` | `string` |  |
| `role` | `PersonaRole` |  |
| `title` | `string` |  |
| `department` | `DepartmentId \| null` |  |
| `read_only` | `boolean` |  |
| `can` | `ApprovalKind[]` | What the persona may do. Segregation of duties is enforced on top of this. |

**Example:** `{"id":"yuki","name":"Yuki Tanaka","role":"controller","title":"Finance controller","department":"ga","read_only":false,"can":["approve-invoice","release-payment","approve-po","approve-capex","approve-reimbursement","accept-match","approve-reclass","release-fund","close-period","change-vendor-bank"]}`

## Entity

**Source:** catalog.ts · **Consumed by:** Overview, Ledger filters

| Field | Type | Notes |
|---|---|---|
| `id` | `EntityId` |  |
| `name` | `string` |  |
| `country` | `string` |  |
| `functional_currency` | `'USD'` |  |
| `local_currency` | `Currency` |  |
| `sites` | `string[]` |  |

**Example:** `{"id":"us","name":"Ixana (US parent)","country":"US","functional_currency":"USD","local_currency":"USD","sites":["West Lafayette, IN (HQ and lab)","Seattle, WA"]}`

## Department

**Source:** catalog.ts · **Consumed by:** Every view

| Field | Type | Notes |
|---|---|---|
| `id` | `DepartmentId` |  |
| `name` | `string` |  |
| `head_persona` | `string` |  |
| `entity_split` | `Partial<Record<EntityId, number>>` |  |

**Example:** `{"id":"silicon","name":"Silicon design","head_persona":"priya","entity_split":{"us":0.8,"in":0.2}}`

## GLAccount

**Source:** catalog.ts (≈45 accounts) · **Consumed by:** Ledger, Health (chart of accounts)

| Field | Type | Notes |
|---|---|---|
| `code` | `string` |  |
| `name` | `string` |  |
| `class` | `GLClass` |  |
| `group` | `string` | Reporting group inside the class — "R&D", "Facilities", "G&A" … |
| `capex?` | `boolean` |  |
| `description` | `string` |  |

**Example:** `{"code":"5010","name":"Kit COGS","class":"expense","group":"COGS","description":"Assembled cost of kits sold"}`

## Project

**Source:** catalog.ts · **Consumed by:** Overview, Ledger

| Field | Type | Notes |
|---|---|---|
| `id` | `ProjectId` |  |
| `name` | `string` |  |
| `line` | `string` |  |

**Example:** `{"id":"YR23","name":"Wi-R BAN — YR23","line":"Body-area network"}`

## FundBudgetLine

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `category` | `string` |  |
| `amount` | `number` |  |

**Example:** `—`

## AllowabilityRule

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `rule` | `string` |  |
| `tests` | `string` | GL codes, merchant categories or fields the rule reads. |
| `consequence` | `'unallowable' \| 'needs-prior-approval' \| 'questioned'` |  |

**Example:** `—`

## Fund

**Source:** catalog.ts · **Consumed by:** Funds

| Field | Type | Notes |
|---|---|---|
| `id` | `FundId` |  |
| `name` | `string` |  |
| `kind` | `FundKind` |  |
| `analog` | `string` | Startup analog of nonprofit restricted funds (ASC 958 "with donor restrictions"). |
| `period_of_performance?` | `{ start: ISODate` |  |
| `end` | `ISODate }` |  |
| `budget` | `FundBudgetLine[]` |  |
| `indirect_rate?` | `number` |  |
| `rules` | `AllowabilityRule[]` |  |
| `approvers` | `PersonaRole[]` |  |

**Example:** `{"id":"award-r01","name":"Award R-01 (illustrative)","kind":"restricted","analog":"Startup analog of nonprofit restricted funds (ASC 958 \"with donor restrictions\"): costs are allowable only inside the period of performance, within the category budget and under the award’s rules.","period_of_performance":{"start":"2025-10-01","end":"2026-09-30"},"budget":[{"category":"Labor","amount":420000},{"category":"Materials","amount":95000},{"category":"Equipment","amount":60000},{"category":"Travel","amount":24000},{"category":"Subcontracts","amount":48000},{"category":"Indirect","amount":129350}],"indirect_rate":0.2,"rules":[{"id":"R01-1","rule":"Alcohol and entertainment are unallowable","tests":"`

## BankDetail

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `bank_name` | `string` |  |
| `country` | `string` |  |
| `account_last4` | `string` |  |

**Example:** `—`

## BankDetailChange

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `changed_on` | `ISODate` |  |
| `from` | `BankDetail` |  |
| `to` | `BankDetail` |  |
| `requested_via` | `'email' \| 'portal' \| 'phone'` |  |
| `verified` | `boolean` |  |
| `verified_by` | `string \| null` |  |
| `verified_on` | `ISODate \| null` |  |

**Example:** `—`

## Vendor

**Source:** catalog.ts + seed.ts (bank history) · **Consumed by:** AP queue, Health (vendors)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `name` | `string` |  |
| `category` | `string` |  |
| `country` | `string` |  |
| `currency` | `Currency` |  |
| `payment_terms_days` | `number` |  |
| `created_on` | `ISODate` |  |
| `created_by` | `string` |  |
| `default_gl` | `string` |  |
| `bank` | `BankDetail` |  |
| `bank_history` | `BankDetailChange[]` |  |

**Example:** `{"id":"V-001","name":"Wabash Commons LLC","category":"Rent — West Lafayette HQ and lab","country":"US","currency":"USD","payment_terms_days":0,"created_on":"2023-04-03","created_by":"dana","default_gl":"6510","bank":{"bank_name":"Alder Bank","country":"US","account_last4":"4471"},"bank_history":[]}`

## PurchaseOrder

**Source:** seed.ts; Ops adapter · **Consumed by:** AP queue (split-PO, three-way match)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `vendor_id` | `string` |  |
| `department` | `DepartmentId` |  |
| `project` | `ProjectId` |  |
| `fund` | `FundId` |  |
| `gl` | `string` |  |
| `requester` | `string` |  |
| `description` | `string` |  |
| `amount_usd` | `number` |  |
| `created_on` | `ISODate` |  |
| `approved_by` | `string \| null` |  |
| `approved_on` | `ISODate \| null` |  |
| `source_system` | `SourceSystem` |  |
| `source_id` | `string` |  |

**Example:** `{"id":"PO-0001","vendor_id":"V-046","department":"silicon","project":"COMBO","fund":"operating","gl":"6140","requester":"nadia","description":"Board build — COMBO rev D","amount_usd":5098.13,"created_on":"2025-09-04","approved_by":"priya","approved_on":"2025-09-05","source_system":"ap.manual","source_id":"PO-0001"}`

## InvoiceLine

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `n` | `number` |  |
| `description` | `string` |  |
| `qty` | `number` |  |
| `unit_price` | `number` |  |
| `amount` | `number` |  |
| `gl` | `string` |  |

**Example:** `—`

## Invoice

**Source:** seed.ts; Patents and Ops adapters · **Consumed by:** AP queue, Ledger

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `vendor_id` | `string` |  |
| `vendor_invoice_no` | `string` | The vendor's own invoice number, as printed. |
| `invoice_date` | `ISODate` |  |
| `received_on` | `ISODate` |  |
| `due_on` | `ISODate` |  |
| `currency` | `Currency` |  |
| `amount_local` | `number` |  |
| `amount_usd` | `number` |  |
| `po_id` | `string \| null` |  |
| `department` | `DepartmentId` |  |
| `project` | `ProjectId` |  |
| `fund` | `FundId` |  |
| `gl` | `string` |  |
| `entity` | `EntityId` |  |
| `created_by` | `string` |  |
| `created_at` | `string` |  |
| `status` | `InvoiceStatus` |  |
| `approved_by` | `string \| null` |  |
| `approved_on` | `ISODate \| null` |  |
| `paid_on` | `ISODate \| null` |  |
| `payment_ref` | `string \| null` |  |
| `rush` | `boolean` | Rush payment requested ahead of terms. |
| `three_way` | `{ po: boolean` |  |
| `receipt` | `boolean` |  |
| `invoice` | `boolean } \| null` |  |
| `lines` | `InvoiceLine[]` |  |
| `memo` | `string` |  |
| `source_system` | `SourceSystem` |  |
| `source_id` | `string` |  |

**Example:** `{"id":"INV-0001","vendor_id":"V-001","vendor_invoice_no":"WC-2025-09","invoice_date":"2025-09-01","received_on":"2025-09-05","due_on":"2025-10-01","currency":"USD","amount_local":28000,"amount_usd":28000,"po_id":null,"department":"ga","project":"INTERNAL","fund":"operating","gl":"6510","entity":"us","created_by":"dana","created_at":"2025-09-05T13:00:00","status":"paid","approved_by":"yuki","approved_on":"2025-09-08","paid_on":"2025-09-08","payment_ref":"ACH-0001","rush":false,"three_way":null,"lines":[{"n":1,"description":"Rent — West Lafayette HQ and lab, 2025-09","qty":1,"unit_price":28000,"amount":28000,"gl":"6510"}],"memo":"Rent — West Lafayette HQ and lab, 2025-09","source_system":"ap.m`

## CardTransaction

**Source:** seed.ts · **Consumed by:** Reconcile (Card), Funds

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `card_holder` | `string` |  |
| `department` | `DepartmentId` |  |
| `project` | `ProjectId` |  |
| `fund` | `FundId` |  |
| `gl` | `string` |  |
| `entity` | `EntityId` |  |
| `merchant` | `string` |  |
| `merchant_category` | `string` |  |
| `posted_on` | `ISODate` |  |
| `posted_time` | `string` |  |
| `currency` | `Currency` |  |
| `amount_local` | `number` |  |
| `amount_usd` | `number` |  |
| `receipt` | `boolean` |  |
| `memo` | `string` |  |

**Example:** `{"id":"CARD-0008","card_holder":"nadia","department":"silicon","project":"NFE3001","fund":"operating","gl":"6130","entity":"us","merchant":"Cleanroom Consumables Co","merchant_category":"industrial supplies","posted_on":"2025-09-01","posted_time":"11:07","currency":"USD","amount_local":253.4,"amount_usd":253.4,"receipt":true,"memo":"Lab consumables"}`

## Reimbursement

**Source:** seed.ts · **Consumed by:** Ledger, Funds

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `person` | `string` |  |
| `department` | `DepartmentId` |  |
| `project` | `ProjectId` |  |
| `fund` | `FundId` |  |
| `gl` | `string` |  |
| `entity` | `EntityId` |  |
| `category` | `string` |  |
| `amount_usd` | `number` |  |
| `submitted_on` | `ISODate` |  |
| `approved_by` | `string \| null` |  |
| `approved_on` | `ISODate \| null` |  |
| `paid_on` | `ISODate \| null` |  |
| `memo` | `string` |  |

**Example:** `{"id":"RB-0001","person":"devika","department":"validation","project":"INTERNAL","fund":"operating","gl":"6610","entity":"us","category":"Ground transport","amount_usd":79.88,"submitted_on":"2025-11-13","approved_by":"clara","approved_on":"2025-11-18","paid_on":"2025-11-25","memo":"Taxis and parking — partner workshop"}`

## PayrollJournal

Payroll only ever exists here in aggregate: department × month.

**Source:** seed.ts (aggregate only) · **Consumed by:** Overview, Funds (labour); suppressed under 3

| Field | Type | Notes |
|---|---|---|
| `period` | `Period` |  |
| `entity` | `EntityId` |  |
| `department` | `DepartmentId` |  |
| `headcount` | `number` |  |
| `gross` | `number` |  |
| `benefits` | `number` |  |
| `taxes` | `number` |  |
| `contractors` | `number` |  |
| `currency` | `Currency` |  |
| `amount_usd` | `number` |  |
| `posted_on` | `ISODate` |  |

**Example:** `{"period":"2025-09","entity":"us","department":"silicon","headcount":17,"gross":241400,"benefits":28050,"taxes":19040,"contractors":0,"currency":"USD","amount_usd":288490,"posted_on":"2025-09-26"}`

## BankStatementLine

**Source:** seed.ts · **Consumed by:** Reconcile (Bank)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `entity` | `EntityId` |  |
| `account` | `string` |  |
| `booked_on` | `ISODate` |  |
| `amount` | `number` | Signed: negative is money out. |
| `currency` | `Currency` |  |
| `description` | `string` |  |
| `counterparty` | `string` |  |
| `reference` | `string` |  |
| `kind` | `BankLineKind` |  |

**Example:** `{"id":"BANK-0001","entity":"us","account":"1010 · Alder Bank ····4471","booked_on":"2024-03-07","amount":-4800,"currency":"USD","description":"ACH-PAT-001 Firm A","counterparty":"Firm A","reference":"INV-A-001","kind":"ach"}`

## StripeOrder

**Source:** seed.ts (Stripe-shaped fixtures) · **Consumed by:** Reconcile (Stripe payouts)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `customer` | `string` |  |
| `sku` | `string` |  |
| `description` | `string` |  |
| `qty` | `number` |  |
| `unit_price` | `number` |  |
| `amount` | `number` |  |
| `created` | `ISODate` |  |
| `charge_id` | `string` |  |
| `refunded` | `boolean` |  |

**Example:** `{"id":"cs_0003","customer":"Sable Instruments","sku":"IXN-WR-200","description":"Wi-R demo kit, rev D","qty":1,"unit_price":1850,"amount":1850,"created":"2025-09-03","charge_id":"ch_0003","refunded":false}`

## StripeEvent

**Source:** seed.ts · **Consumed by:** Ingest log

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `type` | `StripeEventType` |  |
| `created` | `ISODate` |  |
| `object_id` | `string` |  |
| `amount` | `number` |  |

**Example:** `{"id":"evt_00003","type":"checkout.session.completed","created":"2025-09-03","object_id":"cs_0003","amount":1850}`

## StripeBalanceTransaction

**Source:** seed.ts · **Consumed by:** Reconcile (Stripe payouts)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `type` | `StripeBtType` |  |
| `amount` | `number` |  |
| `fee` | `number` |  |
| `net` | `number` |  |
| `created` | `ISODate` |  |
| `available_on` | `ISODate` |  |
| `source` | `string` |  |
| `payout_id` | `string \| null` |  |

**Example:** `{"id":"txn_00003","type":"charge","amount":1850,"fee":53.95,"net":1796.05,"created":"2025-09-03","available_on":"2025-09-05","source":"ch_0003","payout_id":"po_0001"}`

## StripePayout

**Source:** seed.ts · **Consumed by:** Reconcile (Stripe payouts)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `arrival_date` | `ISODate` |  |
| `amount` | `number` |  |
| `charges` | `number` |  |
| `fees` | `number` |  |
| `refunds` | `number` |  |
| `adjustments` | `number` |  |
| `balance_transaction_ids` | `string[]` |  |
| `bank_line_id` | `string \| null` |  |

**Example:** `{"id":"po_0001","arrival_date":"2025-09-08","amount":1796.05,"charges":1850,"fees":53.95,"refunds":0,"adjustments":0,"balance_transaction_ids":["txn_00003"],"bank_line_id":"BANK-0336"}`

## LedgerLine

**Source:** seed.ts; adapters · **Consumed by:** Every view

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `journal_id` | `string` |  |
| `date` | `ISODate` |  |
| `period` | `Period` |  |
| `entity` | `EntityId` |  |
| `department` | `DepartmentId` |  |
| `gl` | `string` |  |
| `project` | `ProjectId` |  |
| `fund` | `FundId` |  |
| `vendor_id` | `string \| null` |  |
| `amount_usd` | `number` | Signed in the account's natural direction: expenses and assets positive when they grow. |
| `amount_local` | `number` |  |
| `currency` | `Currency` |  |
| `fx` | `number` |  |
| `source_system` | `SourceSystem` |  |
| `source_id` | `string` |  |
| `version` | `number` |  |
| `memo` | `string` |  |

**Example:** `{"id":"LL-PAT-L0001","journal_id":"JE-PAT-001","date":"2024-03-06","period":"2024-03","entity":"us","department":"product","gl":"6210","project":"YR23","fund":"operating","vendor_id":"V-037","amount_usd":1200,"amount_local":1200,"currency":"USD","fx":1,"source_system":"patents.invoices","source_id":"L0001","version":1,"memo":"A01Y024USNPV · Drafting a provisional (professional) (INV-A-001 line 1)"}`

## JournalEntry

**Source:** seed.ts; adapters; ledger.ts · **Consumed by:** Ledger, Audit

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `date` | `ISODate` |  |
| `period` | `Period` |  |
| `entity` | `EntityId` |  |
| `memo` | `string` |  |
| `source_system` | `SourceSystem` |  |
| `source_id` | `string` |  |
| `version` | `number` |  |
| `posted_by` | `string` |  |
| `posted_on` | `ISODate` |  |
| `adjusts` | `{ journal_id: string` | Set on an adjusting entry that corrects a closed period. |
| `closed_period` | `Period } \| null` |  |
| `lines` | `LedgerLine[]` |  |

**Example:** `{"id":"JE-PAT-001","date":"2024-03-06","period":"2024-03","entity":"us","memo":"Patent counsel — INV-A-001","source_system":"patents.invoices","source_id":"INV-A-001","version":1,"posted_by":"system","posted_on":"2024-03-06","adjusts":null,"lines":[{"id":"LL-PAT-L0001","journal_id":"JE-PAT-001","date":"2024-03-06","period":"2024-03","entity":"us","department":"product","gl":"6210","project":"YR23","fund":"operating","vendor_id":"V-037","amount_usd":1200,"amount_local":1200,"currency":"USD","fx":1,"source_system":"patents.invoices","source_id":"L0001","version":1,"memo":"A01Y024USNPV · Drafting a provisional (professional) (INV-A-001 line 1)"}]}`

## Approval

**Source:** seed.ts · **Consumed by:** AP queue, Audit

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `kind` | `ApprovalKind` |  |
| `object_id` | `string` |  |
| `by` | `string` |  |
| `role` | `PersonaRole` |  |
| `on` | `ISODate` |  |
| `decision` | `'approved' \| 'rejected' \| 'refused'` |  |
| `reason` | `string \| null` |  |

**Example:** `{"id":"APR-0001","kind":"approve-invoice","object_id":"INV-PAT-001","by":"yuki","role":"controller","on":"2024-03-06","decision":"approved","reason":null}`

## PeriodRecord

**Source:** seed.ts · **Consumed by:** Close

| Field | Type | Notes |
|---|---|---|
| `period` | `Period` |  |
| `state` | `PeriodState` |  |
| `closed_on` | `ISODate \| null` |  |
| `closed_by` | `string \| null` |  |

**Example:** `{"period":"2026-08","state":"open","closed_on":null,"closed_by":null}`

## CloseTask

**Source:** catalog.ts · **Consumed by:** Close

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `title` | `string` |  |
| `owner_role` | `PersonaRole` |  |
| `depends_on` | `string[]` |  |
| `due_bd` | `number` | Business day after period end by which it is due: 1…5. |
| `evidence` | `string` | What must be true in the rows for the task to count as done. |
| `weight` | `number` |  |

**Example:** `{"id":"CL-1","title":"Bank statements loaded for every account","owner_role":"ap-specialist","depends_on":[],"due_bd":1,"evidence":"a bank line dated on or after the last business day of the period exists for each account","weight":10}`

## Flag

**Source:** adapters; payroll.ts · **Consumed by:** AP queue, Overview

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `type` | `FlagType` |  |
| `object_type` | `'request' \| 'invoice' \| 'ledger-line' \| 'payroll'` |  |
| `object_id` | `string` |  |
| `note` | `string` |  |
| `created_on` | `ISODate` |  |

**Example:** `{"id":"FLAG-PAT-INV-C-002","type":"unallocated","object_type":"invoice","object_id":"INV-PAT-006","note":"Professional charges naming no matter; held under 6290 as the Patents ledger holds them, never defaulted into a matter.","created_on":"2025-06-10"}`

## Label

Ground truth for the eval harness. Never carried on the object itself.

**Source:** seed.ts → labels.ts (apart from rows) · **Consumed by:** Agents (eval harness only)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` |  |
| `object_type` | `'invoice' \| 'card' \| 'reimbursement' \| 'po' \| 'ledger-line'` |  |
| `object_id` | `string` |  |
| `anomaly` | `AnomalyType \| null` | null = a hard negative: looks like the type but is legitimate. |
| `looks_like` | `AnomalyType \| null` |  |
| `note` | `string` |  |

**Example:** `{"id":"LBL-001","object_type":"invoice","object_id":"INV-0220","anomaly":"duplicate-exact","looks_like":"duplicate-exact","note":"Same vendor, invoice number, amount and date as INV-0219; entered a second time by a different analyst."}`

## FxRate

**Source:** catalog.ts · **Consumed by:** Ledger

| Field | Type | Notes |
|---|---|---|
| `period` | `Period` |  |
| `inr_per_usd` | `number` | INR per USD, fixed for the month. |

**Example:** `{"period":"2025-09","inr_per_usd":83.9}`

## HeadcountRow

**Source:** catalog.ts · **Consumed by:** Overview

| Field | Type | Notes |
|---|---|---|
| `period` | `Period` |  |
| `entity` | `EntityId` |  |
| `department` | `DepartmentId` |  |
| `headcount` | `number` |  |

**Example:** `{"period":"2025-09","entity":"us","department":"silicon","headcount":17}`

## BudgetLine

**Source:** catalog.ts · **Consumed by:** Overview (budget vs actual)

| Field | Type | Notes |
|---|---|---|
| `department` | `DepartmentId` |  |
| `gl_group` | `string` |  |
| `monthly` | `number[]` | Twelve monthly amounts, Sep 2025 → Aug 2026. |

**Example:** `{"department":"silicon","gl_group":"People","monthly":[310000,310000,310000,310000,310000,310000,310000,310000,310000,310000,310000,310000]}`

## ProjectBudget

**Source:** catalog.ts · **Consumed by:** Overview

| Field | Type | Notes |
|---|---|---|
| `project` | `ProjectId` |  |
| `amount` | `number` |  |
| `note` | `string` |  |

**Example:** `{"project":"YR23","amount":380000,"note":"Sustaining: characterisation, errata, kit support"}`

## FinanceDataset

Everything the seed produces, minus the labels (see labels.ts).

**Source:** — · **Consumed by:** —

| Field | Type | Notes |
|---|---|---|
| `seed` | `number` |  |
| `today` | `ISODate` |  |
| `periods` | `PeriodRecord[]` |  |
| `fx` | `FxRate[]` |  |
| `entities` | `Entity[]` |  |
| `departments` | `Department[]` |  |
| `gl` | `GLAccount[]` |  |
| `projects` | `Project[]` |  |
| `funds` | `Fund[]` |  |
| `personas` | `Persona[]` |  |
| `vendors` | `Vendor[]` |  |
| `purchase_orders` | `PurchaseOrder[]` |  |
| `invoices` | `Invoice[]` |  |
| `cards` | `CardTransaction[]` |  |
| `reimbursements` | `Reimbursement[]` |  |
| `payroll` | `PayrollJournal[]` |  |
| `headcount` | `HeadcountRow[]` |  |
| `bank` | `BankStatementLine[]` |  |
| `stripe` | `{ orders: StripeOrder[]` |  |
| `events` | `StripeEvent[]` |  |
| `balance_transactions` | `StripeBalanceTransaction[]` |  |
| `payouts` | `StripePayout[]` |  |
| `journals` | `JournalEntry[]` |  |
| `approvals` | `Approval[]` |  |
| `flags` | `Flag[]` |  |
| `budgets` | `BudgetLine[]` |  |
| `project_budgets` | `ProjectBudget[]` |  |
| `close_tasks` | `CloseTask[]` |  |
| `cash_balance_usd` | `number` | Illustrative cash balance at `today`, for the runway tile. |

**Example:** `—`


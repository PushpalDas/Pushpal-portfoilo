# Finance Orchestrator — Implementation Plan

**Audience:** Pushpal (approver), then the engineer executing P1–P5. **Purpose:** the architecture, file map, data model, watcher contract, test plan and phase gates, precise enough that each phase can be checked against it. Reads with `00-discovery-report.md`; decisions are logged in `decision-log.md`. **Status:** awaiting approval (P0 gate).

---

## 1. Shape of the build

Two repositories, one dataset.

| Where | What |
|---|---|
| **Ixana-Wiki** (`PushpalDas/xana`) | The Finance section: nine routes under `/finance`, a Finance icon rail, a `finance/*` mock API, the typed seed, the read-only adapters over Patents and Ops, the five watchers, the audit log, the eval harness, the tests. This is the product. |
| **Portfolio** (`Pushpal-portfolio`) | The case study (`ixana-finance-orchestrator`, status `development`), the card, `/demo/finance-desk` (a rewrite to the Wiki with parameters passed through — decision D-03), the PM artifacts under `docs/finance/` served at `/docs/finance/<name>`, the screenshots, the verifier rules for `development`. |

Branches: `feat/finance-orchestrator` in both repos. Small conventional commits (`feat(finance): …`, `docs(finance): …`, `test(finance): …`). Never `main` directly; the Wiki's `main` is deployed by a final merge commit authored with the Git-linked identity.

## 2. Wiki — file map

```
src/lib/finance/
  types.ts            every entity in §5 of the master prompt, strict, no any
  seed.ts             deterministic generator (seed 20260925, mulberry32), 12 months, exports SEED_* consts
  adapters/
    patents.ts        patent-ledger lines → LedgerLine[] (source_system 'patents.invoices')
    ops.ts            Ops Desk REQUESTS / SHIPMENTS (extracted once into ops-source.json) → PO/Invoice/LedgerLine
  ledger.ts           append-only journal + derived views (balances, budget vs actual, period state)
  ingest.ts           typed event bus keyed by (source_system, source_id, version); duplicates logged, never applied
  stripe-fixtures.ts  checkout.session.completed / charge.refunded / payout.paid + balance transactions
  funds.ts            Operating, Award R-01 (rules, budget, period of performance), Capex
  labels.ts           planted irregularities (~40) and hard negatives (~120), kept apart from watcher inputs
  agents/
    contract.ts       Finding, Draft, TrustLevel, approvals — the one interface every watcher returns
    ap-anomaly.ts     ten rules + robust z-score, per-feature attributions
    reconcile.ts      exact ref → amount+date window → fuzzy, confidence per match, wrong-match guardrail
    compliance.ts     Award R-01 allowability + budget tests, reclass drafts
    close.ts          checklist computed from rows, accrual drafts, readiness score
    health.ts         vendor / department budget / chart-of-accounts scores
    ask.ts            ask the books: retrieval over ledger rows, cited answers, refusals
  eval.ts             precision / recall / F1 / FPR per rule against labels.ts
  audit.ts            append-only, sequence-numbered, hash-chained log + verify()
  personas.ts         Controller, AP specialist, Department head, Founder/CEO (RO), R-01 PM, Auditor (RO); SoD rules
src/app/finance/{page,ledger,funds,ap,tie out,close,health,audit,watchers}/page.tsx
src/components/finance/
  Sidebar.tsx         nine-item rail (Patents pattern)
  PersonaSwitch.tsx   ?as= read on mount (the Patents deep-link pattern)
  SyntheticChip.tsx   "Illustrative — synthetic ledger · seed 20260925"
  WhereFrom.tsx       the "Where this number comes from" drawer
  ... one folder per view, reusing PatentSpend's Segmented / Kpi / HoverCard / table grammar
src/app/api/[...path]/route.ts   + finance/overview, ledger, funds, ap, tie out, close, health, audit, watchers, ask
tests/finance/*.test.ts          vitest (decision D-05)
docs/finance/data-dictionary.md  generated from types.ts + seed.ts by scripts/finance-dictionary.mjs
```

Header: `<NavItem name="Finance" href="/finance" />` inserted immediately after Patents inside the `isAdmin` block.

## 3. Data model (summary; the dictionary is the reference)

- **Entities** — US parent, India subsidiary (USD functional, INR local, one fixed FX rate per month in `seed.ts`).
- **Departments** — Silicon design · Validation & test · Systems & apps engineering · Product & programs · Sales & marketing · G&A.
- **GL** — ~45 accounts, 5 classes (Assets, Liabilities, Equity, Revenue, Expenses) incl. `5010 Kit COGS`, `6110 Tape-out / NRE`, `6120 EDA licences`, `6130 Lab equipment (expense)`, `6140 Prototypes & PCB`, `6210 Legal — patents (professional)`, `6215 Patent office fees`, `6310 Freight`, `6311 Customs & duties`, `1510 Lab equipment (capex)`, `2110 Purdue royalty accrual` …
- **Projects** — YR23, NFE2001, NFE3001, BAN+NFE combo, Internal.
- **Funds** — Operating; Award R-01 (restricted; period of performance, budget by category, allowability rules, indirect at a stated provisional rate); Capex. Label on every fund screen: "startup analog of nonprofit restricted funds (ASC 958 'with donor restrictions')".
- **LedgerLine** — `id · date · period · entity · department · gl · project · fund · vendor · amount_usd · amount_local · currency · fx · source_system · source_id · version · journal_id · memo`. Source systems: `ops.procurement · ops.shipments · patents.invoices · payroll · cards · reimbursements · ap.manual · stripe · bank · accruals`.
- **Payroll** — aggregate only (`PayrollJournal{period, department, headcount, gross, benefits, taxes, contractors}`); any department × month with headcount < 3 is suppressed and the view says so.
- **Periods** — `Open → Soft-close → Closed`; a Closed period rejects writes; corrections post as adjusting entries in the next open period (tested).

Seeds are byte-reproducible: `seed.ts` uses a seeded PRNG and never `Date.now()`. A snapshot test pins a SHA-256 of the generated ledger.

## 4. Adapters and the two tie-out tests

- `patents.ts` maps every `LedgerLine` of `patent-ledger.ts` one-to-one (law-firm vs government fee preserved as `gl` 6210 vs 6215; the unallocated A16 lines land in `6290 Legal — unallocated` with a flag). Test: `sum === 61900.00 && count === 70`.
- `ops.ts` reads a one-time extract of the Ops Desk literals (`ops-source.json`, checked in with its extraction script and the source file's SHA so drift is detectable): 28 requests → POs → invoices → lines ($35,140); 4 refused requests → `Flag{refused_at_ceiling}` only, never a line; 15 shipments → item value $38,850 with freight/customs/duties as separate accrual lines in their own GL accounts. Test: both sums to the cent.
- Finance **reads** both; there is no write path. The source chip on a ledger row deep-links to `/patents/spend?drill=<ref>` or `/demo/ops-desk?view=request&id=PR-2050`.

## 5. Watchers

One contract (`agents/contract.ts`):

```ts
type Finding = { id; watcher; what; why: { evidence: RowRef[]; attributions: {feature; weight; note}[]; rule: string }; confidence: number; severity: 'low'|'medium'|'high'; recommended_action; required_approver: PersonaRole; created_at; }
type Draft   = { id; watcher; kind: 'accrual'|'reclass'|'hold'|'match'; payload; finding_id; status: 'proposed'|'approved'|'rejected' }
```

- Watchers return only `Finding[]` and `Draft[]`. Every state change (post, pay, accept match, reclassify, release fund, close) is a named human action that writes an `AuditEvent` — tested by asserting the ledger hash is unchanged after every watcher run.
- Findings without evidence rows are dropped before return (tested).
- Trust ladder: L0 Suggest, L1 Draft, L2 Auto-execute within shown limits. Demo runs L0/L1; L2 is configured and off, with promotion criteria shown (precision ≥ 0.98 over ≥ 200 decisions) and the reversal path.
- Invoice Watcher rules (each a pure function with a unit test and a labelled positive + hard negative): duplicate exact, duplicate fuzzy (normalised vendor + amount ± 1 % + 14 days), bank-detail change ≤ 14 days before payment, amount unusual (median/MAD z ≥ 3.5 with n ≥ 5), split POs under the $5,000 ceiling (same vendor/requester, sum ≥ ceiling, ≤ 7 days), missing PO / three-way-match failure, round-number, weekend/after-hours (weight 0.1, never alone), new vendor + rush, off-policy or unallowable-on-fund, wrong-account (GL vs vendor category prior).
- Eval harness: precision, recall, F1, FPR per rule against `labels.ts`; the numbers on `/finance/agents` and in the case study are computed at build/run time, never typed.
- "AI is not used for": releasing payments, changing vendor bank details, closing periods, releasing funds, posting journals, writing back to Ops/Patents, statutory tax or filing dates, individual payroll analytics — rendered on `/finance/agents` and in the case study §04 doc block.

## 6. Views (reuse Patents' grammar)

Overview (tiles + "Where this number comes from" drawer on every tile; the patent tile shows $61,900.00 and links to `/patents/spend`), Ledger (virtualised table, filters on every dimension, source chips), Bills desk (flags with severity/confidence/evidence/attributions; approving a flagged item needs a reason; SoD refusal when creator = approver), Tie-out (Bank / Card / Stripe payouts; auto-matched, suggested, exceptions; payout = charges − fees − refunds ± adjustments), Funds (utilisation, burn vs period of performance, allowable / questioned / disallowed, reclass proposals needing R-01 PM + Controller), Close (checklist BD+1…BD+5 computed from rows, readiness score from visible weights, `?asof=`), Health (vendor / department budget / chart-of-accounts, 0–100 with inputs), Audit (hash-chained log with a Verify button; auditor read-only), Watchers (per watcher: queue, last run, findings, acceptance, precision/recall, false-positive trend, trust level, never-does list).

Virtualisation: a small windowed list (no new dependency) for the ledger table. Accessibility: real `<table>` semantics, visible focus, chart text alternatives, 360 px minimum width.

## 7. Portfolio side

- `data/case-studies-v2.json` → `ixana-finance-orchestrator`, status `development`, sections mirroring Ops (01…10 with §08 "Early signal and what I'm watching", §09 "What would make me stop"), six tiles with n, `definition`, `config`, one `shot` (AP duplicate flag with SoD refusal) with four decision callouts, ≤ 6 gallery tiles, a "Mapped to fund accounting" `table` in §06, options-sizing `hbar` in §01, new `ladder` chart at §08 (D-06).
- `app/work/constants.ts` → card (`track: 'ai'`, `tier: 2`, `status: 'development'`, `order` after Patents, `demoUrl: '/demo/finance-desk'`).
- `next.config.ts` → rewrite `/demo/finance-desk` → `https://xana-nine.vercel.app/finance` (query string preserved).
- `app/docs/finance/[doc]/page.tsx` → renders `docs/finance/*.md` with the `.cs2` prose styles (D-04).
- `scripts/verify-case-studies.js` → rules for `development` (D-02); `scripts/_elev-capture-finance.mjs` → the 1440×900 captures at `public/static/images/project/ixana-finance-*.jpg`, each the state its link opens.
- Program page: Finance listed as the fifteenth chapter (copy change only, proposal).

## 8. PM artifacts (`docs/finance/`)

`prd.md` · `engineering-spec.md` · `user-stories.md` (≥ 8 Given/When/Then each for the Invoice Watcher and the Tie-out desk) · `roadmap.md` (Now/Next/Later tied to capabilities and metrics) · `business-case.md` (modelled, not measured; adjustable assumptions table) · `leadership-memo.md` · `gtm-one-pager.md` (pattern-level competitive framing, no unverifiable claims) · `decision-log.md` · `trust-accuracy-explainability.md` · `fund-accounting-mapping.md` · `data-dictionary.md` (generated) · `demo-script.md` (10 minutes, §11 of the master prompt). Each opens with audience and purpose and is written in a distinct register.

## 9. Phases and gates

| Phase | Deliverables | Gate (all must hold) |
|---|---|---|
| **P0** | This plan, the discovery report, the task list, the decision log | Approved by Pushpal |
| **P1** | `types.ts`, `seed.ts`, adapters, `ops-source.json`, `labels.ts`, `data-dictionary.md`, vitest wired | `patents` sum = $61,900.00 / 70 lines; `ops` = $35,140 / 28 and $38,850 / 15; seed SHA pinned and stable across two runs; payroll suppression tested; closed-period immutability tested |
| **P2** | Nine routes, rail, nav entry, persona switch, synthetic chip, every view rendering from the seed | All routes 200; screenshots of each view at 1440×900 and 360 px; Patents and Ops screenshots byte-identical before/after; keyboard walk of the ledger and Bills desk |
| **P3** | Watcher contract, five watchers + ask, eval harness, audit log, trust ladder UI | Unit test per rule; ledger hash unchanged after every watcher run; uncitable finding dropped (test); SoD refusal (test); audit chain verifies and detects tampering (test); live eval metrics on `/finance/agents` |
| **P4** | PM artifacts, case-study JSON entry, card, rewrite, docs route, captures, verifier rules | `npm run verify:work` clean for the new slug; every figure labelled; BUILT vs PLANNED explicit; Wiki-page proposal written, not applied |
| **P5** | Lint, types, tests, builds, a11y pass, zero console errors across deep links, Vercel preview, recorded walkthrough (§11) | Both `npm run build` exit 0; Playwright script logs zero page/console errors across the demo-script states; recording attached; open questions listed |

Walkthroughs: `docs/finance/walkthrough-P<n>.md` with the screenshots for that phase (the Antigravity "Walkthrough artifact" equivalent). Task list: `docs/finance/task-list.md`, kept current per commit.

## 10. Risks

- **Scope** — nine views, five watchers, twelve documents. Mitigation: one shared table/tile/drawer grammar; watchers are pure functions over the ledger; documents are written from the same decision log.
- **Deploy identity** — the Wiki's Vercel project ignores commits from the working identity; the merge to `main` is authored with the linked identity (D-01).
- **Verifier** — `development` is currently skipped; adding rules is the only way the new page is actually checked (D-02).
- **Contradiction with siblings** — the Salary product owns compensation, Patents owns the patent ledger, Ops owns the ceiling; Finance references, never re-authors (integrity rule 2.6).

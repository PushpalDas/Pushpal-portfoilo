# Walkthrough — P4 · Artifacts, case study, demo

**Audience:** Pushpal, as the P4 gate review. **Purpose:** the portfolio side — the PM artifacts and the route that serves them, the case-study entry and its card, the demo path, the captures, the verifier rules — and the two small Wiki changes the deep links needed. **Branches:** `feat/finance-orchestrator` in both repositories. Screenshots in `docs/finance/walkthrough/P4/` are the eight case-study captures. Every figure is illustrative and from the synthetic ledger.

## What was built

### PM artifacts (`docs/finance/`, served at `/docs/finance/<name>`)

| Document | Register | What it holds |
|---|---|---|
| `prd.md` | requirements | six personas and their permissions, five goals, the non-goals as a contract, FR-1 … FR-15 by screen and watcher, quality bars, pilot success measures with thresholds agreed before build, open questions |
| `engineering-spec.md` | engineering | the module map, the data model, the seed and its invariants, both adapters with their tests, the ledger, the views, the contract, the eleven rules as a table (reads / raises when / never when), the other four watchers, ask, the eval, the audit chain, API and client, components, the 50 tests, the invariants list |
| `user-stories.md` | acceptance | 13 Given/When/Then for the Invoice Watcher and 10 for the Tie-out desk, each naming its test or marked *pilot* |
| `roadmap.md` | planning | Now (BUILT, with today's measures) / Next (the read-only pilot in five gated steps) / Later (L2, a model at the edge, statutory books, live FX, a vendor portal — each with what would bring it forward), the kill gates |
| `business-case.md` | finance | eleven adjustable assumptions, hours per close modelled today vs with the desk (46 → 21 h), exposure modelled not caught, cost, the three assumptions that decide it, what would make the case wrong — **modelled, not measured** on every line |
| `leadership-memo.md` | one page to the founder | what exists, what it proves, what it does not, the ask (a read-only pilot), what would stop it, the eight-week plan |
| `gtm-one-pager.md` | positioning | the one-line position, who it is for, five market patterns and where this differs (pattern level, no vendor claims), what is and is not different, what a product would need, the never list |
| `trust-accuracy-explainability.md` | commitments | what AI is not used for and where each is enforced, the contract, accuracy with n and how to read 1.00, the trust ladder as configured, how a finding explains itself, the thirteen tests that hold it, what is not covered |
| `fund-accounting-mapping.md` | domain | concept by concept against ASC 958 / the nonprofit fund accounting pattern, what the pattern has that the demo does not, what the demo has that the pattern leaves to people, what a real award would need |
| `demo-script.md` | performance | ten minutes, nine deep links, say / don't say per state, the three questions to expect, reset |
| `decision-log.md`, `data-dictionary.md` | already there | D-01 … D-20; 34 entities generated from the types and the seed |
| `wiki-page-proposal.md` (not served) | proposal | the sentence for the Ixana-Wiki page's §06 and the fifteenth chapter for the programme page — text only, not applied |

Route: `app/docs/finance/[doc]/page.tsx` renders the twelve public documents as plain markdown (`next-mdx-remote` with `format: 'md'`, `remark-gfm` for tables — the documents carry braces and angle brackets that MDX would try to run), `noindex`, with the existing MDX components and a small `.finance-doc` table style. The walkthroughs, the plan and the task list stay repository files.

### Case study — `ixana-finance-orchestrator`

Status `development`, the Ops variant: ten sections with §08 "Early signal and what I'm watching" and §09 "What would make me stop"; §01 `pairedBars` of modelled close hours (labelled modelled, not measured); §02 a table of where a dollar lost its owner with counts from the rows, and an `hbar` of the planted irregularities by rule; §03 four decisions; §04 scope split **BUILT / PLANNED / cut**, the model as the hardest cut, a `doc` excerpt from the trust note; §05 the two source owners' conditions and the clock; §06 the `shot` (the invoice with three findings; "Release payment is refused here whoever asks"), the "Mapped to fund accounting" table, and a six-tile gallery; §07 five tradeoffs; §08 six tiles with n (one the wrong-amount guardrail, one acceptance n = 0), the new **`ladder`** chart, the definition, the config line; §09 the stops; §10 three things.

Verify strip: the demo, the invoice with three findings, the PRD, the trust note, the business case, the demo script. Fast facts: all class A (the demo backs them).

`npm run verify` equivalents: `verify-case-studies` reports **no problem for the slug** — the first draft ran to 1,380 prose words and was trimmed into the 800–1,000 band without changing a figure, ten sections, six tiles, `ladder` unique at §08, unique tile set, unique §02 method and §05 disagreement, threshold and guardrail present, one definition, one config, one shot with four callouts, one gallery of six with every image present; `verify-cards` accepts the card. The pre-existing problems on the three in-development silicon cards are now reported as problems rather than skipped, which D-19 accepts.

### Card, demo path, verifier, chart

- **Card** in `app/work/constants.ts` after Patents: AI track, tier 2, `development`, `demoUrl: /demo/finance-desk`, image = the overview capture until a cover is generated (D-20; prompt in `changes/finance-orchestrator-image-prompt.md`).
- **Demo path** (D-18): `/demo/finance-desk` and `/demo/finance-desk/:path*` **redirect** to the Wiki's `/finance…` with the query preserved; a cross-origin rewrite would have served the Wiki's page with this site's asset paths. The Wiki's `/finance` hops `?view=<screen>` to `/finance/<screen>`; the Bills desk takes `?try=approve|pay` so the SoD image is the state its link opens.
- **Verifier** (D-19): `development` gets the customer-testing shape plus three rules — BUILT and PLANNED both present, "synthetic" present, an n quoted; the card checker accepts the status.
- **Chart**: `ladder` added to `ChartSpec` and `case-study-charts.tsx` — rungs L0 / L1 / L2 with decisions against a shared scale, a precision dot on a 0–1 scale, enabled or configured-off, and the gate to the next rung. `tsc --noEmit` clean; Biome clean on the changed files (the remaining Biome errors are pre-existing Tailwind directives in `tailwind.css`).

### Captures (`scripts/_elev-capture-finance.mjs`, committed)

Eight at 1440×900 from the dev server, each the state its link opens: overview (card + evidence), `ap?id=INV-0236` (shot), `ap?as=dana&id=INV-0254&try=approve`, `tie out?tab=bank&filter=suggested`, `funds?fund=award-r01&verdict=unallowable`, `close?asof=2026-08-05`, `watchers`, `audit`. Zero page or console errors during capture.

## Gate check

- [x] `verify-case-studies` clean for the new slug; the card checker accepts it
- [x] Every figure labelled synthetic / modelled; BUILT vs PLANNED explicit in §04, the scope block and the footer
- [x] Wiki-page proposal written, not applied
- [x] Twelve artifacts, each opening with audience and purpose, in a distinct register
- [x] Captures are the state their links open

## Carried into P5

Both builds, the a11y pass on the new route and the chart, zero console errors across the demo-script deep links on the deployed Wiki, the Vercel preview, the merge of both branches with the linked author identity, the recorded walkthrough, the §15 checklist.

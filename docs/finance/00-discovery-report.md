# Finance Orchestrator — Phase 0 Discovery Report

**Audience:** Pushpal (approver) and whoever picks up P1. **Purpose:** everything found in both repositories before a line of Finance code is written, the exact source totals Finance must reconcile to, the AI-track inventory the new page must sit beside without contradiction, and the questions that need a decision. **Status:** P0 complete, no code changed. Written 2026-09-26.

---

## 1. Stack and conventions

### 1.1 Portfolio (`PushpalDas/Pushpal-portfolio`, working copy `C:\Users\PushpalDas\OneDrive\pushpal`)

| Item | Finding |
|---|---|
| Framework | Next 16.1.5 (App Router, React 19, `next dev --webpack`), TypeScript strict, Biome for lint/format (tabs, single quotes), Tailwind v4 + hand-written CSS. `.cs2` case-study pages are **dark-only**. |
| Data | `app/work/constants.ts` (58 cards, `WorkItem` in `app/work/types.ts`), `data/case-studies-v2.json` (40 entries, keyed by slug), `app/work/order.ts` (status group → hand `order` → year → file order; `?filter=ai` shows track `ai` minus prototypes/research). |
| Statuses | `app/work/status.ts`: `production · development ("In development", amber) · internal · customer-testing · prototype · research`. **`development` exists** and sorts with production. |
| Case-study renderer | `app/work/[slug]/case-study-v2.tsx` + `case-study-v2.css`; types in `case-study-types.ts`. Block kinds in use: `figure` (34 chart forms), `table`, `decisions`, `scope`, `doc`, `shot`, `gallery`, `metrics`, `definition`, `config`, `para`, `links`. Header carries `evidence[]` → the **Verify strip** (chips typed by URL: demo / doc / public), `fast.facts[]` (three, with an evidence class letter) and `fast.pull`. |
| Data note | **Removed on 21 Sep 2026** (commit `1c15d12`, "case studies drop the sample framing and the data-note boxes"). `sampleNote` is no longer rendered and the `.data-note` CSS is gone. Labelling now lives in the `confidentiality` line under the meta strip, in figure captions and in `config`. See open question Q1. |
| Demos | No `app/demo` directory. Every demo is one self-contained HTML file in `public/demo/*.html`, exposed at a clean path by a rewrite in `next.config.ts`. Ops Desk (`procurement-desk.html`, 184 KB) reads `view`, `id`, `open`, `asof` from the query string and `as` for the persona. |
| Docs | No `docs/` directory exists. PM-facing working notes live in `app/Changes/*.md` (not served). `next-mdx-remote`, `rehype-pretty-code` and `shiki` are already dependencies (used by `/thoughts`). |
| Verification | `npm run verify:work` = `scripts/verify-cards.js` + `scripts/verify-case-studies.js` (word bands, section rules, tiles, threshold, guardrail, definition, differentiation on four axes). **Status `development` has no rules in the checker and is skipped with a warning.** No unit-test runner; Playwright is a dev dependency and drives the `scripts/_elev-capture-*.mjs` screenshot scripts. |
| Governing docs | `GEMINI.md` is empty (0 bytes) — nothing to obey, nothing to overwrite. `app/Changes/portfolio-decisions.md` is the spec; `app/Changes/case-study-authoring-brief.md` the authoring contract; `AUDIT/DESIGN-SYSTEM-XANA.md` the extracted XANA design system; `AUDIT/ELEVATION-STATE.md` says the elevation run is complete. |
| Environment | Git is at `%LOCALAPPDATA%\Programs\Git\cmd`; never `git add -A` (OneDrive placeholders). Production = `origin/main`; `feat/work-highlights` is kept equal to it. Vercel builds on push to `main`. |

### 1.2 Ixana-Wiki demo (`PushpalDas/xana`, deploys to `xana-nine.vercel.app`)

| Item | Finding |
|---|---|
| Framework | Next 16.1.6 (Turbopack), React 19, TypeScript strict, ESLint (`eslint-config-next`), Tailwind v4 via `@theme inline` tokens in `src/app/globals.css`. **No tailwind.config**, no chart library, no table library, no test runner. Dependencies: `react-icons`, `@tanstack/react-query`, `react-markdown` (+katex), `axios`. |
| Routing | App Router under `src/app/`: `/`, `/myfiles`, `/shared`, `/meetingrecordings`, `/videolibrary`, `/feedback`, `/efficiency`, `/patents` (+ `/tracker`, `/spend`, `/invoices`), `/uploadinvoice`, `/documents`, `/clickupdocs`, `/login`. |
| Nav | `src/components/Header.tsx`: flat text links; `Efficiency` and `Patents` render only when `isAdminEmail(account)`. **Finance goes in that same `isAdmin` block, directly after Patents.** Feature areas add a 64-px icon rail (`src/components/patents/Sidebar.tsx`) — Finance gets its own rail with nine items. |
| Auth mock | `src/lib/demo-mode.ts` hard-codes `isDemoMode = true`; `src/lib/demo-auth.tsx` replaces MSAL with one account, `Demo Admin <demo.admin@ixana.example>`. There is **one identity**; personas will have to be a Finance-level concept (`?as=`), not a login. |
| Mock API | One catch-all route, `src/app/api/[...path]/route.ts` (≈1,050 lines), dispatches on the path string (`patents/spend`, `patents/ask`, `invoices/approvals`, `efficiency/ask` …). Finance adds `finance/*` branches there. |
| Seeding pattern | Typed TS modules per area: `src/lib/patent-demo-data.ts` (18 matters + `TIMELINE` ledger), `src/lib/patent-ledger.ts` (derived invoice-line ledger, quotes, exceptions), `src/lib/efficiency-demo-data.ts`, `src/lib/wiki-demo-data.ts`. Everything derivable is derived; only the irreducible facts are written down. `DEMO_TODAY = '2026-08-17'` is pinned. |
| Retrieval / citations | `patents/ask` calls `askPortfolio(query)` — deterministic keyword routing over the matters, returning `{answer, provenance:{ours, firm_docket}, matters[], context_used}`; the panel renders the cited matters as chips. `AnswerPanel.tsx` is the site-wide cited-answer component (`[n]` chips → source list). Ask-your-ledger follows this exactly. |
| Design tokens | Page `#0E0805`, surface `#1A1410` / `#141010`, border `#3A3028`, accent `#FF6321` (gradient `#CD3D00→#FF6321`), text `#808080`/white, success `#22C55E`, warning `#F59E0B`, error `#EF4444`. 13 px body, `font-mono tabular-nums` for money, dense tables at `text-[0.62rem]`. Full extraction in `AUDIT/DESIGN-SYSTEM-XANA.md`. |
| Deploy | Vercel Production on push to `main`. **Only commits authored by the Git-linked identity (`Pushpal <pushpaldas2001@gmail.com>`) are built**; an `ixanawl@gmail.com` commit is accepted and silently never deployed (seen twice on 2026-09-26). |
| Working copy | The OneDrive clone (`Changes-archive/dummy`) cannot commit or run (cloud-only placeholders; OneDrive client not running). Work is done from a fresh clone outside OneDrive (`npm ci`, ≈3 min); edits are mirrored back. |

## 2. Source totals Finance must reconcile to (read from code, not screenshots)

### 2.1 Patents — `src/lib/patent-ledger.ts`, served by `/api/patents/spend`

| Figure | Value |
|---|---|
| Ledger total | **$61,900.00** — 70 invoice lines, 25 invoices, 18 matters, 3 firms (Firm A/B/C) |
| By category | Drafting 21,600 · Filing 22,000 · Office action 3,500 · Grant & assignment 4,840 · PCT international 6,600 · Overheads (unallocated, A16) 3,360 |
| By owner | Law-firm professional $41,960 · government/patent-office $19,940 (68 % / 32 %) |
| Quotes | 3 lines above quote (+$400 total: A01 +300, A06 +50, A07 +50); $3,360 never quoted |
| Dates | 6 Mar 2024 – 14 Aug 2026; `DEMO_TODAY` 2026-08-17; 131 dated events |
| Test to write | `sum(finance lines where source_system = patents.invoices) === 61900.00` and line count `=== 70`, to the cent. |

### 2.2 Ops — `public/demo/procurement-desk.html` (Ops Desk), `TODAY = "21 Aug 2026"`, `CEILING = 5000`

| Stream | Value |
|---|---|
| Procurement requests | 28 rows `PR-2038…PR-2065`, **$35,140** total; statuses submitted/assigned/approval/ordered/delivered; orgs `si` Silicon Engineering, `sf` Systems and Firmware, `ops` Operations and Facilities |
| Refused at the ceiling | 4 rows, not in the sum (e.g. probe card $18,400, environmental chamber $26,900) — Finance shows them as **refused, never posted** |
| Shipments | 15 rows `SHIP-2026-000101…000115`, types Sample/Outbound/Return/Inbound, carrier FedEx, item value **$38,850** (qty × unit); no freight cost field — freight, customs and duties are Finance's own accruals, labelled as such |
| Presentations | third stream (`PRESENTATIONS`), no money |
| People | Dana Whitfield & Marcus Ibeh (procurement analysts), **Yuki Tanaka (finance controller)**, Priya Raghavan, Tomas Lindqvist, Nadia Osman, Ravi Menon, Clara Boateng, Sam Ortega, Elena (coordinator), Owen (gates persona) — reuse these names |
| Ops deferred list (feeds Finance) | carrier APIs · **auto-population from ERP and purchase-order data** · **multi-currency handling and requester-visible spend reporting** |
| Test to write | Finance's `ops.procurement` lines sum to $35,140 over 28 rows; `ops.shipments` item value $38,850 over 15 rows. |

### 2.3 Ixana-Wiki case study — mentions "patent invoice records" as one of the five sources; a Finance mention is a one-line addition to its §06 body and its decision "Unified repository over document search alone" (proposal only, §6).

## 3. AI-track inventory (20 cards; `?filter=ai` shows the 15 shipped/in-use ones)

| # | Title | Status | Sections | Demo | §08 form | Tile style |
|---|---|---|---|---|---|---|
| 1 | Ixana-Wiki | internal | 9, "Impact and outcomes" | Wiki `/?q=` | lineArea | 6 tiles, one guardrail |
| 2 | Flow Tracker | internal | 9 | Wiki `/efficiency?view=tracker` | pairedBars | 6 |
| 3 | Patent program operations | internal | 9 | Wiki `/patents` + `/demo/patent-clock` | survival | 6 |
| 4 | Team performance reporting | internal | 9 | `/demo/team-performance` | slope | 6 |
| 5 | AI planning OS | internal | 9 | `/demo/prd-os` | histogram | 6 |
| 6 | ClickUp reporting & Gantt | internal | 9 | `/demo/clickup-gantt` | stackedArea | 6 |
| 7 | Video library | internal | 9 | Wiki `/videolibrary` | funnel | 6 |
| 8 | Scrum ecosystem | internal | 9 | `/demo/scrum-desk` | gapArea | 6 |
| 9 | Meeting notetaker | internal | 9 | Wiki `/meetingrecordings` | groupedHBar | 6 |
| 10 | Calendar sync | internal | 9 | `/demo/calendar-sync` | stackedBars | 6 |
| 11 | ClickUp activity tracker | internal | 9 | `/demo/clickup-audit` | barsThreshold | 6 |
| 12 | Document change intelligence | internal | 9 | Wiki `/myfiles?tab=clickup` | dualLine | 6 |
| 13 | **AI Lawyer** | customer-testing | 7 (§05 Early signal, §06 What would make me stop) | `/demo/ai-lawyer` | hbar | 6, n stated |
| 14 | **Ops Orchestrator** | customer-testing | 10 (§08 Early signal, §09 What would make me stop) | `/demo/ops-desk` | gateBars | 6, n stated |
| 15 | **AI Salary Generator** | customer-testing | 10 | `/demo/salary-bands` | dumbbell | 6, n stated |
| — | Program head (`ixana-internal-ai-program`) | internal | 9 (own headings) | Wiki | — | chapters list |
| — | Dāsa, NeuroAdapt, Quantum (research/prototype) | file under Personal | | | dotplot / scatter / curve | 4 |
| — | Soil mineral estimation | internal, card only | | | | |

**Money-adjacent siblings to stay consistent with:** Patents (the $61,900 ledger, the "automate only what is recoverable" doctrine, no statutory date computed), Ops Orchestrator ($5,000 ceiling that refuses, SHIP ids, the three deferred items), AI Salary Generator (owns compensation: percentiles never produced by a model, evidence floor — Finance therefore **never** shows individual pay and defers every compensation question to that product's boundary). No sibling titled "audited-bill cost ledger" exists; the nearest is the Patents ledger itself.

**§08 chart forms already taken** (rotation rule): every form listed above plus pareto, heatmap, stackedHBar, diverging, thresholdCurves, sequence, confusion, radar, intervals, waterfall, bands, statusGrid, tornado, strips, trajectory, marimekko, waffle, gapArea, survival. Finance's §08 must add or reuse deliberately — proposal: **`gateBars`-style is Ops'**, so Finance uses a new **`ladder`** form (trust ladder L0/L1/L2 with decisions-per-rung and precision per rung) or the existing `gateBars` only if the differentiation rule is waived (Q6).

## 4. Case-study schema (what the JSON entry must carry)

`slug · eyebrow · title · deck · status · meta{role, team, stage} · confidentiality · evidence[{label,url}] · summary[3] · sections[{num, heading, body[], blocks[], after[]}] · fast{pull, facts[{text, cls}]}` — `sampleNote` is still accepted but no longer rendered. Word band is prose-only (summary, body/after, para, decisions, definition). Six metric tiles, one `(guardrail)`; one `definition`; one `config`; one `shot` with 3–4 decision callouts; ≤ 6 gallery items; one pre-agreed threshold; a §05 disagreement that differs from all others; a §02 evidence method that differs from all others.

## 5. Open questions (decisions needed before P1; assumptions I will proceed on if unanswered)

| # | Question | Assumption if no answer |
|---|---|---|
| Q1 | The Data-note component was removed on 21 Sep. Label figures via the `confidentiality` line + every figure caption + `config` ("Illustrative — synthetic ledger"), and give the Wiki Finance pages a persistent "Synthetic ledger · seed 20260925" chip? | Yes — no component is reintroduced. |
| Q2 | Stage "In development" (`development`) exists but the verifier skips it. Add verifier rules for it mirroring `customer-testing` (band 800–1,000; §08 "Early signal and what I'm watching"; §09 "What would make me stop"; 6 tiles with n)? | Yes, in P4, so the page is checked rather than skipped. |
| Q3 | `/demo/finance-desk`: build a second, standalone single-file demo in the portfolio (the Ops Desk pattern, duplicating the Wiki views) **or** make it a rewrite to the Wiki's `/finance` with `?as=`, `?view=`, `?id=`, `?open=`, `?asof=` passed through (the Patents pattern)? | **Rewrite to the Wiki.** One implementation, one dataset, no drift. The Wiki Finance section implements the persona switch itself. |
| Q4 | PM artifacts under `docs/finance/*.md` are not served today. Serve them at `/docs/finance/<name>` through a small MDX route (dependencies already present) so the case study can link them? | Yes. |
| Q5 | Test runner: the Wiki has none. Add `vitest` as a dev dependency for the reconciliation, rule and seed-reproducibility tests? (Portfolio side keeps plain `node` scripts, like `verify:work`.) | Yes. |
| Q6 | §08 chart form: new `ladder` form (adds a `ChartSpec` variant and component) or reuse `gateBars`? | New `ladder` form. |
| Q7 | Award R-01: label as "illustrative award analog of a restricted fund" with no agency named, per §1.1's "mechanism unconfirmed"? | Yes — no agency, no contract number. |
| Q8 | Nav placement gate: Finance sits inside the `isAdmin` block like Patents (Demo Admin is admin, so it always shows)? | Yes. |
| Q9 | The gallery on the Patents page already has 7 tiles (limit 6). Finance's gallery stays at ≤ 6; Patents is not touched. | Noted, out of scope. |

## 6. Proposal for the Ixana-Wiki case study (not applied)

One clause in §06's body — "…track patent invoice records, and read the finance ledger those records feed — from one place" — and one word in §03's decision "Unified repository…" listing finance beside patent invoices. Prose cost ≈ 12 words against that page's 892 (band 800–1,000).

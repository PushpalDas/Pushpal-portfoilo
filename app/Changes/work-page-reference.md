# The /work page — complete reference

**Written for a model asked to analyse, review or change `/work` without reading the whole repo first.**
Everything here was read out of the working tree on 2026-09-01, branch `feat/work-highlights`. Counts are computed from `app/work/constants.ts`, not typed in. Where this document and the code disagree, the code is right and this document is stale — check the line references.

---

## 1. What the page is

`/work` is the portfolio index: one header, one filter row, one flat grid of 54 cards. Every card is the same size; there is no featured tile, no masonry, no tier layout. Hierarchy is carried entirely by **sort order**, not by card size — this was a deliberate revert (see `app/work/work-page.tsx:86`, and the reflog entry `ia: revert /work to the flat three-per-row grid (author request)`).

Three-line header, then a `CASE STUDIES` divider, then the grid, then the shared `<Contact />` block.

The page is a **client component** (`'use client'`) wrapped in `<Suspense>` because it reads `useSearchParams()`. There is no server-side data fetching on the index — `workItems` is a static TypeScript array compiled into the bundle. Only the per-case-study route (`/work/[slug]`) touches the filesystem.

---

## 2. Route and file map

| Path | Role |
| --- | --- |
| `app/work/page.tsx` | Server entry. Metadata only (`title: 'Work'`), renders `<WorkPage />`. |
| `app/work/layout.tsx` | Pass-through fragment. Exists only to hold the route segment. |
| `app/work/work-page.tsx` | **The controller.** URL ↔ filter state, sort, filter predicates, composition. 137 lines. |
| `app/work/work-header.tsx` | Title, the three copy lines, and the slot the filter row is injected into. |
| `app/work/work-filters.tsx` | The pill row. Presentational — takes `activeFilter` + setter. |
| `app/work/work-grid.tsx` | The card grid. Three link modes (§7), GSAP entrance. |
| `app/work/constants.ts` | **The data.** `STATUS_CONFIG`, `workItems` (55 entries), `filters`, `FilterKey`. |
| `app/work/types.ts` | `WorkItem`, `WorkModal`. |
| `app/work/status.ts` | `WORK_STATUSES` (badge label + colour class), `WORK_STATUS_ORDER` (sort ranks). |
| `app/work/tracks.ts` | `TrackKey`, `productsInTrack()`, `moreInTrack()` — read by the **home page**, not by `/work`. |
| `app/work/slug.ts` | `workSlug()` — title → URL slug fallback for items with no explicit `slug`. |
| `app/work/work.css` | 851 lines, imported by `work-page.tsx`. Not a CSS module — global classes. |
| `app/work/[slug]/` | The case-study route. 14 files; see §9. |

**Dead files in this directory** (compiled, shipped, referenced by nothing):

- `app/work/work-list.tsx` — a table-style list view with GSAP scroll-opacity. No importer.
- `app/work/floating-image.tsx` — cursor-following image preview. No importer. (The *live* copies of this pattern are `app/experience/floating-image.tsx` and `app/certifications/floating-image.tsx`.)
- `app/work/work-domain-filters.tsx` — **deleted** in the current change; listed here because older docs and briefs still name it.

---

## 3. The data model

```ts
// app/work/types.ts
interface WorkItem {
  slug?: string;              // explicit URL slug; falls back to workSlug(title)
  title: string;
  company: string;
  year: string;               // free text — "2024 - present", "2019" …
  domain: string;             // display-only label on the card meta row
  category: 'product' | 'engineering';
  track?: 'silicon' | 'ai';   // products only
  status: WorkStatus | null;  // null on every engineering build
  tier?: 1 | 2 | 3 | 4;       // metadata only — nothing reads it any more
  programHead?: boolean;      // true on exactly one item; excluded from the grid
  outcome: string;            // the one-paragraph card body
  image: string;              // filename under /public/static/images/project/
  href?: string;              // external destination
  demoUrl?: string;           // demo link in the card meta row
  color?: string;             // tile background behind the image
}
```

### Status vocabulary — closed set

Defined **twice**, and the two copies must stay in step:

- `app/work/constants.ts:12` → `STATUS_CONFIG` (label + colour class)
- `app/work/status.ts:1` → `WORK_STATUSES` (identical shape) and `WORK_STATUS_ORDER` (sort ranks)

`work-grid.tsx` reads `WORK_STATUSES`; `work-page.tsx` reads `WORK_STATUS_ORDER`. `STATUS_CONFIG` is the copy the case-study pages use. **This duplication is a live hazard** — adding a status in one file and not the other produces a card with no badge or an item that sorts to the wrong group.

| Status | Badge label | Colour | Count |
| --- | --- | --- | --: |
| `production` | In production | green | 10 |
| `internal` | Shipped internally | green | 15 |
| `customer-testing` | In customer testing | amber | 2 |
| `prototype` | Prototype | muted | 4 |
| `research` | Research | muted | 7 |
| `null` | *(no badge)* | — | 17 |

Colour encodes **how far the work went**, not what kind of thing it is — three colour families across five statuses, by design.

### Shape of the corpus

- **55 items** total in `workItems`; **54 render** (one carries `programHead: true`).
- **38 products** / **17 engineering builds**.
- Tracks: **17 silicon**, **21 ai**, 17 untracked (every untracked item is an engineering build).
- All 17 engineering builds have `status: null`. That is the invariant `Others` leans on.
- Tiers: 6 × tier 1, 13 × tier 2, 18 × tier 3, 1 × tier 4, 17 untiered. **Nothing reads `tier`.** It survives as metadata from the abandoned tiered-front-door design.

---

## 4. The filter row

Five pills, single-select, rendered as two stacked rows in `work-filters.tsx`: `All` / `Silicon & systems` / `AI programs & platforms` / `Prototypes & research` on the first row, `Others` alone on a second row beneath. The title row is `align-items: baseline`, and `.work-header-filters` is lifted by `top: -0.7rem` (the measured descent + padding + border of the pill, 1em of its type) so the first row's **bottom outline edges** rest on the H1's baseline: "From Silicon to AI" plus the four categories read as one invisible line; `Others` hangs a step below it. (`.work-header-line` masks the rise-in with `clip-path: inset(0)` instead of `overflow: hidden` — a scroll container would stop the H1's text baseline propagating up to the flex row.) Defined in `app/work/constants.ts:882`:

```ts
export const filters = [
  { key: 'all',        label: 'All' },
  { key: 'silicon',    label: 'Silicon & systems' },
  { key: 'ai',         label: 'AI programs & platforms' },
  { key: 'prototypes', label: 'Prototypes & research' },
  { key: 'others',     label: 'Others' },
] as const;
```

`FilterKey` is derived from this array, so adding a pill is a one-line change **plus** a predicate in `work-page.tsx` **plus** the admin regenerator (§11).

### Exact predicates — `app/work/work-page.tsx:93`

Every predicate runs against `sortedItems.filter(w => !w.programHead)`.

| Pill | Predicate | Cards |
| --- | --- | --: |
| All | *(none)* | 54 |
| Silicon & systems | `track === 'silicon'` | 17 |
| AI programs & platforms | `track === 'ai'` | 20 |
| Prototypes & research | `status === 'prototype' \|\| status === 'research'` | 11 |
| Others | `category === 'engineering'` | 17 |

**The row mixes two axes, and this is intentional.** Silicon/AI cut by *track*; Prototypes & research cuts by *maturity*. The 11 prototype/research items (7 silicon, 4 ai) are all products, so they appear under **both** their track pill and the prototypes pill. A prototype does not vanish from `Silicon & systems`. The pills therefore sum to 65, not 54.

`AI programs & platforms` shows 20, not the 21 items tagged `track: 'ai'`, because the `programHead` card is one of them.

Coverage: 17 + 20 + 17 = 54. Every card is reachable from at least one non-`All` pill.

### URL contract

`?filter=` is the single source of truth. It is read on mount and written by `router.replace(..., { scroll: false })` — filter clicks do not push history entries and do not scroll the page.

- `?filter=all` is never written; `All` deletes the param.
- `?domain=` is **deleted on every filter click**, so a stale sub-level param can't fight the new row.

Legacy links still land, via `LEGACY_KEYS` at `app/work/work-page.tsx:23`:

| Old link | Lands on | Why it existed |
| --- | --- | --- |
| `?filter=product` | All | The old top-level Product pill |
| `?filter=engineering` | Others | The old top-level Engineering pill |
| `?domain=silicon` | Silicon & systems | The old track sub-pill |
| `?domain=ai` | AI programs & platforms | The old track sub-pill |

Resolution order: valid `?filter=` → `LEGACY_KEYS[filter]` → `LEGACY_KEYS[domain]` → `'all'`. An unrecognised value silently falls back to `All`.

### History: what this replaced

Until this change the page had **two** filter levels: a top row (`All` / `Product` / `Engineering`) and a track sub-row (`All` / `Silicon & systems` / `AI programs & platforms`) that revealed itself with a `grid-template-rows: 0fr → 1fr` transition only when `Product` was active. `Products` stood in front of the two groupings people actually browse by, so the two levels were collapsed into one. Removed with it: `work-domain-filters.tsx`, `TRACK_FILTERS`, `isTrackFilterKey`, `TrackFilterKey`, and the `.work-domain-*` CSS block.

---

## 5. Sort order

`app/work/work-page.tsx:59`, memoised with an empty dependency array — computed once, identical in every filter view.

1. **Status group**, by `WORK_STATUS_ORDER`: production (1) → internal (2) → customer-testing (3) → prototype (4) → research (5) → none (6).
2. **Year descending** inside a group. Year is parsed with `Number.parseInt(year.replace(/\D/g, ''), 10)` — so `'2024 - present'` becomes `20242`, not `2024`. Multi-year strings sort *above* their single-year peers. This is a real quirk, not a typo; anything with a range wins its group.
3. **File order** in `constants.ts` as the final tiebreak, so the grid can be hand-tuned by moving entries.

Empty result renders `<p className='work-empty'>Nothing in this combination — try another filter.</p>` — currently unreachable, since every pill matches ≥ 11 items.

---

## 6. Header copy — the exact current text

`app/work/work-header.tsx`. Two stacked paragraphs inside `.work-header-subline-wrap.work-header-copy-swap`, keyed on the active filter so the wrapper remounts and a 0.45s CSS fade runs on every pill change (off under `prefers-reduced-motion`). The text per filter lives in `app/work/header-copy.ts` (`HEADER_COPY`).

**H1** — `From Silicon to AI`, animated in with GSAP (`y: '100%'`, 1.2s, `power3.out`, 0.3s delay), masked by `.work-header-line`'s overflow.

**Line 1 — `.work-header-subline`**, the one-sentence description of the active slice. For `all`:

> Silicon delivery, embedded firmware and board bring-up, RAG retrieval and evaluation, multi-agent LLM systems, and the internal platforms built around them.

**Line 2 — `.work-header-stack`** (the scannable keyword line, one step smaller and wider than the sentence above it): the tools and skills a mid/senior PM leans on for that slice. For `all`:

> Body area networks · Python · FastAPI · NumPy · Next.js · React · Three.js · PostgreSQL · Azure AD · JWT · RAG · Dense retrieval (bge-m3) · LLM re-ranking · nDCG evaluation · Multi-agent LLM systems · Microsoft Graph · ClickUp API · Google API · Webhooks · n8n · Excel and Google Sheets dashboards

`silicon`, `ai`, `prototypes` and `others` each carry their own subline and keyword list — see `header-copy.ts`. Every keyword is backed by the `tags` arrays, `meta.role` values and prose in `data/case-studies.json` / `data/case-studies-v2.json`, or by the card titles in `constants.ts` for the engineering builds under Others. **Redshift, Snowflake, Power BI, Tableau, Looker, BigQuery, Databricks, dbt, Airflow and Spark were checked and deliberately excluded — none appears anywhere in the portfolio data.** If a future edit adds them, it is adding an unbacked claim.

**Removed 2026-09-02** — the third paragraph, `.work-header-sample-note` ("Sample portfolio — body area network silicon, RAG platforms and internal tools. Figures on the cards and case study pages are invented placeholders, and screens are recreations."), and its CSS. The per-page `sampleNote` on each case study still carries the disclosure.

The filter row is injected into the header through a `filters?: React.ReactNode` prop, not imported by it — the header stays presentational apart from the `HEADER_COPY[activeFilter]` lookup.

**Layout (2026-09-02, alignment 2026-09-03):** the pills share the title row with the H1 (`.work-header-row`, `align-items: baseline`, filters lifted `top: -0.7rem` so pill bottom edges sit on the headline baseline), right-aligned in two rows (four on the line, `Others` beneath; `flex-wrap: nowrap` from 1024px), in a compact size (`0.7rem`, `0.4em 0.85em`). The H1 is capped at `4.5rem` and `white-space: nowrap` from 768px so it stays on one line. The copy block is outside the row and uses the full container width (subline and keyword line both 1040px, so each track's sentence holds one line on desktop). Under 767px: title, pills left-aligned, then copy. `.work-header-col` no longer exists.

**Known dead code:** `line2Ref` is declared at `work-header.tsx:13` and never attached to anything.

---

## 7. Card anatomy

`app/work/work-grid.tsx`. `<ul className='work-grid-items work-grid-3'>` — the index always passes `gridColumns={3}`.

Each `<li className='work-tile'>` holds a `.work-tile-wrap` with two siblings:

**`cardInner`** (inside the link) — image column with a `item.color` background plate behind a `next/image` `fill`, then the status badge, the title (`.work-tile-title-clamp`), and `item.outcome`.

**`cardMeta`** (deliberately **outside** the link) — a stripe, then `{company} · {domain}` on the left and a `Demo ↗` anchor on the right when `demoUrl` is set. The comment at `work-grid.tsx:90` explains why: a demo marker nested inside the card's anchor could only ever be a chip pointing somewhere else, and this section is built on not telling that small lie. **Do not move `cardMeta` inside the anchor** — it would produce nested interactive elements and break the demo link.

Three link modes, checked in order:

1. `item.slug || workSlug(item)` → internal `<Link href={'/work/' + slug + carry}>`. **Every item hits this branch**, since `workSlug()` always returns a non-empty string. Cases 2 and 3 are unreachable in practice.
2. `item.href` → `<a target='_blank' rel='noopener noreferrer'>`.
3. Neither → `<div className='work-tile-link work-tile-link--static'>`, non-clickable.

`carry` is `?filter=${filter}` when a non-`All` pill is active — it rides to the case study so its back link returns to the list the reader left (§10).

**Entrance animation:** GSAP `ScrollTrigger` on `.work-tile`, `y: 60 → 0`, opacity 0 → 1, 0.8s, 0.1s stagger, `start: 'top 85%'`, `toggleActions: 'play none none reset'` (replays on scroll-back). The effect has `[]` deps, so **it does not re-run when the filter changes** — cards swapped in by a filter click inherit whatever inline styles GSAP last wrote. Worth knowing before debugging "cards invisible after filtering".

---

## 8. Demos

31 of 55 items carry a `demoUrl`. 17 are internal `/demo/*` paths; the rest are external (ixana.ai product pages, `xana-nine.vercel.app`, YouTube).

The internal demos are **single self-contained HTML files in `public/demo/`**, surfaced at extension-less paths by explicit rewrites in `next.config.ts:66`. All 17 have a rewrite; the mapping is 1:1 and complete:

`ai-lawyer` · `autism-bench` · `clickup-audit` · `clickup-gantt` · `covid-bench` · `envi-city` · `neuroadapt` · `ornithopter-concept` · `prd-os` · `procurement-desk` · `quantum-simulator` · `radar-error-budget` · `rider-count` · `salary-bands` · `scrum-desk` · `sludge-envelope` · `team-performance`

**Adding a demo means two edits** — the `.html` file in `public/demo/` *and* a rewrite in `next.config.ts`. Without the rewrite the clean path 404s.

`next.config.ts:22` also holds four permanent `/work/*` slug redirects and one `/demo/ams-dashboard → /demo/team-performance`.

---

## 9. The case-study route — `/work/[slug]`

`app/work/[slug]/page.tsx` tries **three renderers in order**:

1. **`data/case-studies-v2.json`** → `CaseStudyV2Page`. The authored 10-section format. **37 entries, all matched to a work item, no orphans.** Held in its own file specifically because the admin endpoint replaces whole entries in `case-studies.json` (`store[slug] = body`), which would silently drop a nested v2 block on the next save.
2. **`CaseStudyFinalPage`** — the generated template, driven by the `WorkItem` plus whatever legacy record exists in `data/case-studies.json`. Figures here are *reconstructed, not authored*.
3. **`notFound()`** — the slug matches neither.

`data/case-studies.json` holds 15 keys; 14 match a work item and **one is orphaned: `wi-r-body-area-network-yr23`** (no `workItems` entry with that slug — the grid entry is `wi-r-ban-yr31`). It is dead data.

18 items have neither a v2 entry nor a legacy record and render as template-only: 17 engineering builds plus *"Accurate estimation of mineral present in soil"*.

`generateMetadata` prefers the v2 title/deck, then the work item's title/outcome, then a bare fallback.

Other files in the route: `case-study-charts.tsx` (67KB — the chart library), `case-study-types.ts` (22KB — includes the `isEditorialCaseStudy` discriminator), `legacy-to-editorial.ts` (converts legacy records, and contains a `/patent|lawyer|legal|prior art/` context test at line 82), plus four CSS files for the three page formats.

---

## 10. Cross-page contracts

These live outside `app/work/` and **break silently** if the filter keys change:

| Consumer | What it depends on | File |
| --- | --- | --- |
| Home highlights "+n more" rows | `/work?filter=silicon`, `/work?filter=ai` | `app/components/work/workHighlights.ts:115,120` |
| Home "See all work →" | `/work` | `app/components/work/work-highlights.tsx:393` |
| Home "+n" counts | `moreInTrack(track, featuredSlugs)` — derived from `workItems`, never typed in | `app/work/tracks.ts:26`, `app/components/work/works.tsx:1` |
| Case-study back link | reads `?filter=`, falls back to `?domain=`, builds `/work?filter=…` | `app/work/[slug]/case-study-back.tsx:27` |
| Admin constants regenerator | emits the `filters` array verbatim into `constants.ts` | `app/api/admin/works/route.ts` (`FILE_HEADER` / `FILE_FOOTER`) |

The back link also honours `?from=home`, which routes back to `/#work` instead of `/work`.

---

## 11. The admin regenerator — read this before editing `constants.ts`

`app/api/admin/works/route.ts` **rewrites `app/work/constants.ts` wholesale** from the admin UI. It reassembles the file as `FILE_HEADER + generated items + FILE_FOOTER`, where the footer contains a hardcoded copy of the `filters` array and the `FilterKey` export, and the header contains `STATUS_CONFIG` and `WORK_STATUS_ORDER`.

**Consequence:** any hand-edit to the filter list, the status config or the file's comments will be silently reverted the next time someone saves a work item in the admin UI — unless the same change is made in `route.ts`. The current five-pill row *is* mirrored there. Comments inside `workItems` entries are not preserved at all.

---

## 12. CSS

`app/work/work.css`, 851 lines, global (not a module), imported once from `work-page.tsx`. Sections: `HEADER` (13) · `FILTERS` (69) · `WORK CONTENT WRAPPER` (271) · `NEW RESTRUCTURE CLASSES` (683).

Dark is the default; light is themed with `html:not(.dark)` overrides, roughly one per coloured rule.

**Live classes:** `.work-page` `.work-header-*` `.work-filters-row` `.work-filters-toggle-row` `.work-filter-btn` (+ `-fill` `-text`) `.work-content-wrap` `.work-section-divider*` `.work-grid-section` `.work-grid-container` `.work-grid-items` (+ `.work-grid-3` / `-4`) `.work-tile*` `.work-status-badge` `.work-demo-marker` `.work-empty`.

**Orphaned classes — styled, referenced by no JSX** (residue of the tiered front door and a tech-filter row that were both reverted):

`.work-archive` · `.work-archive-meta` · `.work-chapters` · `.work-chapter-title` · `.work-chapter-note` · `.work-tier-sub` · `.work-subfilters-row` · `.work-filters-section` · `.work-filters-container` · `.work-filters-grid-row` · `.work-filter-group-header` · `.work-filter-count` · `.work-filters-tech-row` · `.work-filter-tech-btn` · `.work-tech-bullet` · `.work-grid-btn` (+ `-fill` `-text`)

`.work-list-*` and `.floating-*` in this file are live only for the two dead components in §2 and for the *other* pages' floating-image components.

`.work-filters-toggle-row` is `display: flex; flex-wrap: wrap` — the row already wraps, so the fifth pill needs no layout change.

---

## 13. The catalogue — all 55 items in grid order

Sorted exactly as the page sorts them (status group → year desc → file order). "Appears under" lists every pill that shows the card. Row 1 is the first card on the unfiltered page.

| # | Title | Company | Year | Domain | Track | Status | Tier | Appears under | Case-study renderer | Demo | Slug |
| --: | --- | --- | --- | --- | --- | --- | --: | --- | --- | --- | --- |
| 1 | Wi-R Near Field Electric — XA-NFE2001 | Ixana | 2024 - 2026 | Silicon | silicon | production | 3 | All · Silicon | v2 authored | external | `wi-r-nfe-xa-nfe2001` |
| 2 | Wi-R reference designs — video smartglasses and tactical headset | Ixana | 2024 - 2026 | Wearable systems | silicon | production | 3 | All · Silicon | v2 authored | external | `wi-r-reference-designs` |
| 3 | Wi-R Body Area Network — YR31 | Ixana | 2024 - present | Silicon | silicon | production | 1 | All · Silicon | v2 authored | external | `wi-r-ban-yr31` |
| 4 | Wi-R Dev Kits — BAN YR23 and NFE XA-NFE2001 | Ixana | 2024 - present | Developer hardware | silicon | production | 3 | All · Silicon | v2 authored | external | `wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001` |
| 5 | Wi-R Body Area Network — YR23 | Ixana | 2024 - present | Silicon | silicon | production | 3 | All · Silicon | v2 authored | external | `wi-r-ban-yr23` |
| 6 | Wi-R Near Field Electric — XA-NFE3001 | Ixana | 2024 - present | Silicon | silicon | production | 3 | All · Silicon | v2 authored | external | `wi-r-nfe-xa-nfe3001` |
| 7 | Condenser microphone | EEGRAB | 2024 | Audio hardware | silicon | production | 3 | All · Silicon | v2 authored | — | `eegrab-condenser-microphone` |
| 8 | WishKey — Key Management System | EEGRAB | 2023 | Access control | silicon | production | 3 | All · Silicon | v2 authored | external | `eegrab-wishkey` |
| 9 | Cost-effective smart watch | EEGRAB | 2023 | Consumer wearable | silicon | production | 3 | All · Silicon | v2 authored | — | `eegrab-smart-watch` |
| 10 | Sensor signal generator | SLB | 2023 | Test engineering | silicon | production | 3 | All · Silicon | v2 authored | — | `slb-sensor-signal-generator` |
| 11 | The internal AI program — fourteen tools, one doctrine | Ixana | 2025 - 2026 | Internal platform | ai | internal | 2 | All · AI | v2 authored | external | `ixana-internal-ai-program` |
| 12 | Team performance reporting — five teams, three windows | Ixana | 2026 | Delivery reporting | ai | internal | 2 | All · AI | v2 authored | `/demo/team-performance` | `team-performance-reporting` |
| 13 | Scrum ecosystem — one workspace for sprint ceremonies | Ixana | 2026 | Agile tooling | ai | internal | 2 | All · AI | v2 authored | `/demo/scrum-desk` | `ixana-scrum-ecosystem` |
| 14 | Flow Tracker — real-time delivery pipeline diagnostics | Ixana | 2026 | Engineering ops | ai | internal | 1 | All · AI | v2 authored | external | `ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic` |
| 15 | ClickUp Activity Tracker — task change audit trail | Ixana | 2026 | Audit tooling | ai | internal | 2 | All · AI | v2 authored | `/demo/clickup-audit` | `github-for-clickup-automation-on-the-changes-going-outside-p` |
| 16 | Video library and meeting recordings | Ixana | 2026 | Meeting intelligence | ai | internal | 2 | All · AI | v2 authored | external | `ixana-video-library-automated-company-video-library` |
| 17 | AI product planning operating system | Ixana | 2026 | Planning tooling | ai | internal | 2 | All · AI | v2 authored | `/demo/prd-os` | `ai-prd-multi-agent-multi-llm-shared-memory-generative-system` |
| 18 | ClickUp reporting and Gantt dashboard | Ixana | 2026 | PM tooling | ai | internal | 2 | All · AI | v2 authored | `/demo/clickup-gantt` | `ai-pm-customized-multi-view-for-pms` |
| 19 | In-house meeting notetaker | Ixana | 2026 | Meeting intelligence | ai | internal | 2 | All · AI | v2 authored | external | `ixana-meeting-notetaker` |
| 20 | Patent program operations | Ixana | 2026 | Patent operations | ai | internal | 2 | All · AI | v2 authored | external | `ixana-patent-program` |
| 21 | Document change intelligence | Ixana | 2026 | Documentation ops | ai | internal | 2 | All · AI | v2 authored | external | `clickup-document-tracker-data-extraction-easy-visibility-for` |
| 22 | Ixana-Wiki — multifile RAG knowledge platform | Ixana | 2025 | Internal platform | ai | internal | 1 | All · AI | v2 authored | external | `xana-multifile-rag-based-data-singularity-platform` |
| 23 | Calendar sync — Outlook and Gmail without leaking detail | Ixana | 2025 | Workplace automation | ai | internal | 2 | All · AI | v2 authored | — | `calendar-automation-real-time-bi-directional-sync-engine-wit` |
| 24 | Accurate estimation of mineral present in soil | IIRS-ISRO, Govt. of India | 2022 | Remote sensing | ai | internal | 4 | All · AI | template only | external (card link) | *derived* |
| 25 | Triple riding avoidance | Ricky Kids | 2022 | Road safety | ai | internal | 1 | All · AI | v2 authored | `/demo/rider-count` | `ricky-kids-triple-riding-avoidance` |
| 26 | Procurement Orchestrator — M365-native request workflow | Ixana | 2026 | Procurement ops | ai | customer-testing | 2 | All · AI | v2 authored | `/demo/procurement-desk` | `procurement-orchestrator-procurement-process-automation-with` |
| 27 | AI Salary Generator | Ixana | 2026 - present | HR tooling | ai | customer-testing | 2 | All · AI | v2 authored | `/demo/salary-bands` | `ai-salary-generator` |
| 28 | Ornithopter for surveillance | SRM UAV | 2021 - 2023 | Aerial robotics | silicon | prototype | 3 | All · Silicon · Proto | v2 authored | `/demo/ornithopter-concept` | `srm-uav-ornithopter-for-surveillance` |
| 29 | Quantum Gate Simulator — interactive 10-qubit circuit builder | Personal | 2026 - present | Learning tools | ai | prototype | 3 | All · AI · Proto | v2 authored | `/demo/quantum-simulator` | `quantum-circuit-simulator-interactive-10-qubit-delivering-re` |
| 30 | AI Lawyer — multi-agent patent drafting system | Ixana | 2026 | Legal tooling | ai | prototype | 1 | All · AI · Proto | v2 authored | `/demo/ai-lawyer` | `ai-lawyer-multi-agent-multi-llm-shared-memory-generative-sys` |
| 31 | Dāsa — citation-grounded scripture engine | ISKCON (International Society for Krishna Consciousness) | 2026 - present | Applied AI | ai | research | 1 | All · AI · Proto | v2 authored | — | `dsa-generative-ai-engine-for-a-guided-spiritual-path` |
| 32 | NeuroAdapt — spike-train feature extraction for a science compiler | NeuroAdapt, IISc Bangalore | 2023 - present | Research tooling | ai | research | 3 | All · AI · Proto | v2 authored | `/demo/neuroadapt` | `neuroadapt-agentic-rag-engine-for-neuroscience-research` |
| 33 | Board failure analysis — resonant converter, supply and post regulator | Failure Analysis \| SLB | 2023 | Failure analysis | — | null | — | All · Others | template only | — | *derived* |
| 34 | Toys for autistic kids | Ricky Kids | 2021 - 2023 | Assistive play | silicon | prototype | 3 | All · Silicon · Proto | v2 authored | `/demo/autism-bench` | `ricky-kids-toys-for-autistic-kids` |
| 35 | UAV-aided weather radar calibration | NIT Tiruchirapalli  & SRM University | 2022 | Weather instrumentation | silicon | research | 3 | All · Silicon · Proto | v2 authored | `/demo/radar-error-budget` | `ricky-kids-uav-weather-radar-calibration` |
| 36 | Sludge-traversing ROV | Ricky Kids | 2022 | Field robotics | silicon | research | 3 | All · Silicon · Proto | v2 authored | `/demo/sludge-envelope` | `ricky-kids-sludge-traversing-rov` |
| 37 | Non-contact COVID patient monitoring | Ricky Kids | 2021 | Health sensing | silicon | research | 3 | All · Silicon · Proto | v2 authored | `/demo/covid-bench` | `ricky-kids-noncontact-covid-monitoring` |
| 38 | Carbon positive e-car | Ricky Kids | 2020 | Sustainable mobility | silicon | research | 3 | All · Silicon · Proto | v2 authored | external (card link) | `ricky-kids-carbon-positive-ev` |
| 39 | 16-bit RISC processor | Vyorius | 2022 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 40 | Testing AD8232 with NI instruments and LabVIEW | Ricky Kids | 2021 | Test engineering | — | null | — | All · Others | template only | external (card link) | *derived* |
| 41 | Obstacle avoidance robot using ultrasonic sensing | Vyorius | 2021 | Embedded systems | — | null | — | All · Others | template only | external (card link) | *derived* |
| 42 | FSM designs — Mealy, Moore and an up-down counter | Vyorius | 2021 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 43 | Verilog and VHDL circuits implemented on FPGA | Vyorius | 2021 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 44 | UART transmitter printing a single character | Vyorius | 2021 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 45 | IoT-based smart agriculture system | Vyorius | 2021 | IoT systems | — | null | — | All · Others | template only | external (card link) | *derived* |
| 46 | RGB pattern generator | Vyorius | 2021 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 47 | World map COVID-19 dashboard | Vyorius | 2021 | Data visualization | — | null | — | All · Others | template only | external (card link) | *derived* |
| 48 | Voice-controlled home automation | Vyorius | 2021 | Home automation | — | null | — | All · Others | template only | external (card link) | *derived* |
| 49 | 3-bit binary to grey code converter using low-voltage XOR gates | Hackathon \| IIT Hyderabad | 2021 | Digital design | — | null | — | All · Others | template only | external (card link) | *derived* |
| 50 | Home automation with automatic room temperature control | MSME Technology Development Centre, Govt. of India | 2020 | Home automation | — | null | — | All · Others | template only | external (card link) | *derived* |
| 51 | First robot | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | — | null | — | All · Others | template only | — | *derived* |
| 52 | Character LCD driver | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | — | null | — | All · Others | template only | external (card link) | *derived* |
| 53 | Hardware timer | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | — | null | — | All · Others | template only | external (card link) | *derived* |
| 54 | First signal | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | — | null | — | All · Others | template only | external (card link) | *derived* |
| 55 | ENVI-City — sustainable smart city concept | Ricky Kids | 2022 | Urban concept | silicon | research | 3 | All · Silicon · Proto | v2 authored | `/demo/envi-city` | `ricky-kids-envi-city` |

---

## 14. Known issues and traps

Ranked by how likely each is to bite.

1. **`STATUS_CONFIG` and `WORK_STATUSES` are duplicate definitions** in two files (`constants.ts:12`, `status.ts:1`). Adding or renaming a status requires editing both, plus `WORK_STATUS_ORDER`, plus the admin regenerator's `FILE_HEADER`.
2. **The admin endpoint overwrites `constants.ts`** (§11). Hand-edits to the filters array, the status config or any comment are not durable unless mirrored in `route.ts`.
3. **The grid's GSAP effect has `[]` dependencies.** It never re-runs on filter change, so entrance animation only applies to the first render's cards.
4. **Year parsing strips non-digits**, so `'2024 - present'` parses as `20242` and sorts above `'2024'`. Any new range string will float to the top of its status group.
5. **Cases 2 and 3 in `work-grid.tsx` are unreachable** — `workSlug()` never returns empty for a non-empty title, so the external-link and static-card branches are dead paths.
6. `data/case-studies.json` has one **orphaned key**, `wi-r-body-area-network-yr23`.
7. **`tier` is written on 38 items and read by nothing.** Either wire it or drop it; leaving it invites a future reader to trust it.
8. **Dead components** `work-list.tsx` and `floating-image.tsx` in `app/work/`, plus ~16 orphaned CSS classes (§12).
9. `line2Ref` in `work-header.tsx:13` is declared and never used.
10. `useMemo` is imported in `work-filters.tsx:3` and never used.
11. **`tsc` currently reports 4 errors**, all inside `.next/dev/types/routes.d-LAPTOP-FSQIH65F.ts` — a stale generated types file from a different machine name colliding with the current one. They pre-date this work and are not source errors; filter `.next/` out when checking.

---

## 15. Invariants worth preserving

- **Every card is reachable from at least one non-`All` pill.** Today: 17 + 20 + 17 = 54. Adding an item with no `track` and `category: 'product'` would break this — it would show only under `All`.
- **Every engineering build has `status: null`.** `Others` and the "no badge" rendering both rest on this.
- **Exactly one item has `programHead: true`.** It is excluded from the grid but its page stays live at `/work/ixana-internal-ai-program`.
- **Counts are never typed in.** `tracks.ts` derives the home page's "+n" figures from `workItems`; keep it that way.
- **`cardMeta` stays outside the card's anchor** (§7).
- **Filter clicks use `router.replace`, not `push`,** and never scroll.
- **The sample-portfolio disclosure stays on the page.** Figures across the grid and the case studies are invented placeholders; the note is what makes that honest.

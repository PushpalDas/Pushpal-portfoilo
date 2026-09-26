# Walkthrough — P5 · QA and deploy

**Audience:** Pushpal, as the final gate. **Purpose:** what was checked, where it is live, the recording, and the §15 checklist with each line answered. Every figure is illustrative and from the synthetic ledger (seed 20260925).

## Live

| Surface | URL | State |
|---|---|---|
| Wiki — Finance section | `https://xana-nine.vercel.app/finance` (nav entry directly after Patents) | main `2a6a058` (merge of `feat/finance-orchestrator` with the linked author identity); nine routes 200; personas carry the team's titles |
| Portfolio — case study | `https://pushpal-portfolio.vercel.app/work/ixana-finance-orchestrator` | main `7aa8e64`; card on `/work?filter=ai`; `ladder` chart at §08; six gallery tiles and the shot resolve |
| Portfolio — PM artifacts | `https://pushpal-portfolio.vercel.app/docs/finance/<prd · engineering-spec · user-stories · roadmap · business-case · leadership-memo · gtm-one-pager · decision-log · trust-accuracy-explainability · fund-accounting-mapping · data-dictionary · demo-script>` | statically generated; GFM tables render |
| Demo path | `https://pushpal-portfolio.vercel.app/demo/finance-desk[/<screen>]?…` | 307 to the Wiki's `/finance…` with the query preserved; `?view=` honoured on arrival |

## Checks

| Check | Result |
|---|---|
| Wiki `npm test` | 50 / 50 |
| Wiki `tsc --noEmit`, ESLint on the finance code | clean |
| Wiki `next build` | exit 0, nine `/finance*` routes |
| Portfolio `npm run build` | exit 0 from a clone of the branch outside OneDrive (`/docs/finance/[doc]` prerendered ×12); under OneDrive the build hits a cloud-only placeholder in a freshly installed dependency (os error 362), recorded in memory |
| Portfolio `tsc --noEmit` | clean |
| `verify-case-studies` | clean for `ixana-finance-orchestrator` (994 prose words, ten sections, six tiles, `ladder` unique, tile set unique); `verify-cards` accepts the card |
| Demo-script states on the deployed Wiki (`scripts/_elev-finance-qa.mjs https://xana-nine.vercel.app`) | eleven states opened in order plus the two ask questions, the payment refusal, Verify and Simulate a tamper: **0 page errors, 0 console errors** |
| Accessibility pass on each state | every image has alt text, every button and link a name, every control a label, one h1; no horizontal overflow at 360 px on the overview, the AP drawer, the agents panel and funds: **0 issues** |
| Keyboard (P2) | header → rail → controls; Escape closes drawers; charts carry text tables |
| Live figures | overview tiles equal the walkthrough's (spend $16,013,625 · burn $1,040,092 · runway 9.4 months · BvA 105 % · flags 7 · readiness 68/100 · patents $61,900.00); `/patents/spend` still serves $61,900 |
| Portfolio live pages | case study, docs, redirect: 200 / 200 / 307; one page error per page on the portfolio is site-wide (the LogRocket bootstrap) and appears identically on pages the Finance work did not touch |

## Recording

`docs/finance/walkthrough/P5/finance-demo-walkthrough.webm` — the demo script's states in order on the local Wiki at 1440×900, with the ask refusal and answer, the payment refusal, Verify chain and Simulate a tamper (Playwright recording, ~2 minutes at demo pacing; narration is `demo-script.md`).

## §15 — final checklist

- [x] Finance in the Wiki nav directly after Patents; routes `/finance`, `/ledger`, `/funds`, `/ap`, `/reconcile`, `/close`, `/health`, `/audit`, `/agents`
- [x] Case study `ixana-finance-orchestrator`, stage *In development*, the Ops variant with §08 "Early signal and what I'm watching" and §09 "What would make me stop"; BUILT vs PLANNED separated
- [x] `/demo/finance-desk` with `?as=`, `?view=`, `?id=`, `?open=` (the AP drawer opens on `?id=`; `?try=` attempts a decision), `?asof=`
- [x] PM artifacts in `docs/finance/*.md`: PRD, engineering spec, user stories (13 + 10 G/W/T), roadmap, business case (modelled, not measured), leadership memo, GTM one-pager, decision log (D-01 … D-20), trust/accuracy/explainability, fund-accounting (FE NXT) mapping, data dictionary, ten-minute demo script
- [x] All figures synthetic, deterministic, labelled; payroll department × month only, groups under three suppressed and said so; names synthetic and reused from Ops / Patents
- [x] No fabricated adoption, time saved or fraud caught — only counts from demo rows and eval results with n; business-case figures modelled
- [x] Patents and Ops numbers unchanged; Finance reads, never re-authors; $61,900.00 and the Ops sums held by one test each
- [x] AI not used for releasing payments, changing vendor bank details, closing periods, releasing funds, posting journals, writing back to Ops/Patents, statutory dates, individual payroll — by contract, footer and test
- [x] Small conventional commits on `feat/finance-orchestrator`; main never force-pushed; no existing copy deleted; no secrets; GEMINI.md untouched
- [x] Strict TypeScript (no `any`), WCAG 2.2 AA pass, responsive ≥ 360 px, no network calls from Finance screens
- [x] One walkthrough per phase (P1 … P5) with screenshots; task list current; decisions logged
- [x] Wiki-page mention written as a proposal, not applied (`wiki-page-proposal.md`)

## Open questions (for the pilot, not blocking)

1. Which read-only exports the accounting system, the card issuer and the payroll provider can hand over, and in what shape (adapters follow the shape of their source).
2. Whether the award's sponsor has cost principles beyond the five rules modelled.
3. Whether the Wiki's demo sign-in is enough for the external accountant's read-only access in a pilot.
4. The cover image is Pushpal's generated one; the overview capture stays as the evidence image.

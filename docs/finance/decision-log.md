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
**Context.** Neither repo has a unit-test runner. The master prompt requires tests for every rule and for the reconciliation math.
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
**Decision.** `seed.ts` uses mulberry32 seeded with 20260925; `FINANCE_TODAY` is pinned (aligned to the Patents `DEMO_TODAY` of 2026-08-17 unless Pushpal prefers the Ops `21 Aug 2026`); one USD/INR rate per month in a table; a SHA-256 of the generated ledger is asserted in a test.
**Consequences.** Byte-reproducible seeds; captions can cite the seed.

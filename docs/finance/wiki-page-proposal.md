# Proposal — mentioning Finance on the Ixana-Wiki case study and the programme page

**Audience:** Pushpal. **Purpose:** the two copy changes that would place the Finance orchestrator where a reader of the existing pages would look for it. **Status:** proposal only — not applied. Both pages are in production and the working agreement says never delete existing copy; each change below is an addition.

## 1. Ixana-Wiki case study (`xana-multifile-rag-based-data-singularity-platform`)

**Where:** §06 "What was built", the body paragraph that lists what people do on the platform.

**Current (excerpt):** "…check task and efficiency analytics, and track patent invoice records — from on…"

**Proposed addition, appended to that sentence:** "…and, in development, read one ledger under payroll, AP, cards, the web store, the patent programme and the Ops Desk, with agents that raise findings they can cite and never act (the Finance orchestrator, its own page)."

**Why here and not a gallery tile:** the Wiki page's gallery is at its four-item cap and each tile carries a decision about retrieval; Finance is a chapter with its own page, and a sentence with a link is the honest weight for something in development.

**Verifier impact:** +28 prose words on a page inside its band; no new block; no figure.

## 2. Internal AI programme page (`ixana-internal-ai-program`)

**Where:** §06 "The fourteen chapters", the `links` block.

**Proposed addition, as the fifteenth item:**

```json
{
  "label": "Finance orchestrator",
  "href": "/work/ixana-finance-orchestrator",
  "note": "— findings and drafts, never actions; every number with its rows. In development on a synthetic ledger."
}
```

**And the heading:** "The fourteen chapters" → "The fifteen chapters", with the same change in any sentence on that page that counts them (search for "fourteen").

**Verifier impact:** the programme page is a format exception in the checker (no §08, no bands), so no rule applies; the change is copy only.

## 3. Not proposed

- No mention on the Patents or Ops Orchestrator pages: Finance reads them and never re-authors them, and their pages should not carry a dependency that runs the other way.
- No change to the Wiki's header copy in the demo beyond the nav entry already added after Patents.

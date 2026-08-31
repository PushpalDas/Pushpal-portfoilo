# PERCEPTION READINESS — final report (P6–P10)
2026-08-31 · perception pass over the launch-audited portfolio · trail: CLAIMS-AUDIT.md,
IA-MAP.md, INTERVIEW-BRIEF.md, STATE.md

## The five felt weaknesses — before → after

1. **Placeholder paradox** → CLOSED. Every headline position (card, deck, Result, pull line)
   now rests on Class A/B only; all placeholder figures demoted to explicitly-framed worked
   examples ("The … figures below are the worked example"), and the scattered disclosure styles
   became one confident Data-note component — including retiring the reader-facing
   "Sample page — replace all figures" banner, whose text was an instruction to the author, not
   the reader. Verb ladder clean: no proved/shipped/delivered stands on Class C anywhere.
   Bonus: calibration surfaced three card↔page contradictions the launch audit hadn't
   (P7 "widened range", P33 "radar pair", P28 price-claim framing) — all fixed.
2. **Volume dilution** → CLOSED. Tiered front door: 6 flagships full-bleed first; fourteen
   internal tools consolidated under one program page (/work/ixana-internal-ai-program — the
   doctrine, the kills, the adoption story, zero new numbers) with chapters as quiet rows;
   Selected work; an explicit **Prototypes & research** band; a one-line Archive register.
   Filter deep links unchanged (flat grid preserved under any ?filter/?domain slice).
   "14 tools in one year" now reads as a program someone ran — the page says what was refused
   three separate times, which is the seniority signal.
3. **Title tension** → CLOSED. Canonical two-sentence arc on About ("the delivery loop kept
   turning into the place where product questions got decided… the founder owns whether; I own
   what for and what not"); all Role rows lead with the ownership clause each page's own §03
   earns, delivery scope second; zero titles changed, founder boundary untouched.
4. **Skim cost** → CLOSED. Every long-form page now carries a fast layer above untouched prose:
   Verify strip (kind-tagged chips: PUBLIC SPEC / LIVE DEMO / PUBLISHED / VIDEO), ownership-first
   role in the meta grid, up to three Class-A/B fast facts, a pull line harvested verbatim from
   the page's own prose, and a nine-section jump nav. Deep-layer prose byte-identical except the
   logged calibration edits.
5. **Buried proof** → CLOSED. Evidence promoted from an inline link list to the Verify strip
   directly under the title on all 37 pages; flagship cards now carry real product/demo imagery
   (two AI-art cards swapped for live screenshots); the six flagships were chosen by Class-A
   evidence density and the tier sub-line says so in words.

## QA gates

1. **3-minute recruiter simulation** (production build, cold visit, 1440×900, logged from
   captures in scratchpad/sim/):
   - **0:30** — "From Silicon to AI", role line, the honesty line, FLAGSHIP band with its
     evidence-density sub-line, first flagship cards (YR31 silicon render, live-demo screenshot).
   - **0:90** — all six flagships + the program band ("fourteen tools, one doctrine") passed;
     opening YR31: Verify → PUBLIC SPEC chip, ownership-first role, three Class-A facts,
     "The hard part was refusing changes.", Data note — a complete, accurate 30-second read.
   - **3:00** — program page (three LIVE DEMO chips, doctrine facts), Selected work, the
     labelled Prototypes & research band, archive register. Screener leaves with: flagship
     slate ✓, ≥3 Class-A proofs ✓ (spec page, live demos, published paper chips), role story ✓
     (About clause echoed in every role row). **PASS.**
2. **Hostile-interviewer test** — every flagship + program headline sentence re-read against
   "read it aloud with the author in the room": no sentence invites "that's invented, isn't it?"
   without the page having already answered (the Data note answers it in place, and the worked-
   example framing names the figures' status before the reader can). Standing answers rehearsed
   in INTERVIEW-BRIEF.md. **PASS.**
3. **Claims audit** — CLAIMS-AUDIT.md complete for all 37; zero Class C in headline position;
   verb ladder clean. **PASS.**
4. **Guardrail sweep** — string-level diff vs pre-pass baseline (commit 14644d4): every
   disclosure/limitation count equal or higher (invented-placeholder 40→40, sample notes 36→37,
   zero-user admissions unchanged, guardrail mentions 77→81). Zero placeholders promoted; zero
   titles changed. **PASS.**
5. **Structural** — production build clean (full route table); every pre-existing route
   untouched (tiering is render-level; one NEW route added); tier legibility verified on
   captures (labels + sub-lines); new components responsive (mobile capture ✓) and keyboard-
   reachable (real links/anchors; focus-visible inherited). Local-only 404s (umami/Vercel
   insights scripts) and a LogRocket env throw noted for the author — deployment-env concerns,
   not content. **PASS** (with the env note below).
6. **Voice diff** — deep-layer sections untouched; all edits confined to headline zones and
   logged before→after in CLAIMS-AUDIT.md. **PASS.**

## AUTHOR-CONFIRM (adds to the launch-audit list)
- **AC-FLAGSHIP** — the implemented slate: YR31, Ixana-Wiki, Flow Tracker, Dāsa, AI Lawyer,
  Triple riding. Swaps welcome; IA-MAP.md carries the rationale.
- **AC-PROGRAM** — sign off the program-page framing ("fourteen tools, one doctrine") and its
  §04 kills list; it introduces no new numbers by construction.
- **AC-ROLE** — sign off the canonical two-sentence narrative on About and the ownership-first
  role rows (9 pages reordered; wording list in git diff).
- **AC-P26-50** — confirm "50+ filings" is a real career-scope fact (kept in headline as Class B).
- **AC-ENV** — set the LogRocket app id (or remove the init) and confirm umami env in prod;
  local prod run throws a console error without them.
- Everything from LAUNCH-READINESS.md still stands, AC-XANA (push the xana repo) first among them.

## Known limitations knowingly shipped
- The recruiter simulation is a self-run protocol, not a user study.
- Fast-fact and pull-line curation is per-page editorial judgment; the author should read all 36
  once (they are short) and veto freely.
- The program page's "fourteen" counts the live internal tools; AI Lawyer is named there as the
  research spike and P3/P17 render in Tier 1 while belonging to the program — the page says so.

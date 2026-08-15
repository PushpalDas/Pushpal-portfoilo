# Portfolio restructure — decisions and spec

A single reference for everything we settled on: the Work page, the case study format, the status system, and the content rules. Written so someone who wasn't part of the conversation — a developer, a collaborator, or an AI coding tool — can act on it without further explanation.

---

## 1. The problem we were solving

The original portfolio had 58 projects in one flat grid. Each card showed a title and a company name and nothing else. Case studies were structured well — Problem → Role → Key decisions → Tradeoffs → What was built — but three things undercut them:

- **Metrics were configuration, not outcomes.** Chunk sizes, embedding dimensions and service counts sat under a heading called "Impact and outcomes."
- **No discovery evidence.** Problems were asserted rather than shown.
- **No sign of other people.** Everything was "I decided," with no stakeholders, no team size, no disagreement.

Together those read as a technical delivery lead rather than a product manager. Everything below is aimed at that gap.

---

## 2. Status system

Five statuses plus "no badge." These are the only valid values.

| Value | Label | Meaning | Colour |
|---|---|---|---|
| `production` | In production | Shipped, real customers, still running | Green |
| `internal` | Shipped internally | Live inside the company, not a commercial product | Green |
| `customer-testing` | In customer testing | With real users, not yet GA | Amber |
| `prototype` | Prototype | Working build, never went to users | Muted grey |
| `research` | Research | Exploration, study, or feasibility work | Muted grey |
| `null` | *(no badge)* | Coursework, small experiments | — |

**Rules:**

- Three colour families only. Colour encodes *how far it went*, not what kind of thing it is.
- Badges never live inside the project title. "Wi-R BAN (In Production)" becomes title `Wi-R body area network — YR23` + status `production`.
- `null` is a real, valid state. If everything has a badge, the badge stops meaning anything.
- Deliberately excluded: **Killed**, **Sunset**, **Patent filed**. Also avoid "Completed," "Ongoing," "In progress," "Confidential," "Coming soon" — the first three are true of everything and the last two read as padding.
- Implement as a single lookup object mapping status → `{label, colourClass}`. Adding a sixth later should be a one-line change, not a hunt through components.

*Open item:* the killed-project case study has no status under this scheme. Either reinstate `killed` for that one page, or file it under `research` and let the page title carry it.

---

## 3. Work page

### Structure

One grid. Every project uses the same card at the same size. **No featured tier, no separate list, no size variation.**

### Header

Headline stays ("From Silicon to AI"), plus a new one-line subline naming what kind of PM you are, the domains, and that three projects shipped commercially.

### Filters

`All / Product / Engineering`. No numeric counts.

Replaces the old `Product 38 / Core 20`. Two reasons: "Core" is internal vocabulary a hiring manager can't interpret, and naming the engineering work plainly turns the background into a differentiator instead of hiding it. Counts were dropped because 38 reads as volume.

Filter state lives in the URL (`?filter=engineering`) so filtered views are linkable.

### Card anatomy

Top to bottom:

1. Image
2. Status badge — small, uppercase, letter-spaced, outlined pill; omitted when status is `null`
3. Title — status parenthetical removed, clamped to 2 lines
4. Outcome — one sentence, body colour, clamped to 2 lines
5. Meta — `Company · Year · Domain`, muted, small

All cards equal height; meta line pinned to the bottom.

The outcome line is the single most important addition. A card reading "Wi-R Body Area Network (BAN) | YR23 — Ixana" teaches a reader nothing. "Cut on-body link setup from 40s to under 3s" is what makes someone click.

### Sort order

Because every card is the same size, **sort carries the hierarchy**:

1. `production` → `internal` → `customer-testing` → `prototype` → `research` → `null`
2. Newest year first within each group
3. Ties keep data-file order, so it can be hand-tuned

Applies inside every filter view too.

### Data schema

One array or JSON file. The grid renders entirely from it.

```
{
  slug, title, company, year, domain,
  category: 'product' | 'engineering',
  status: 'production' | 'internal' | 'customer-testing' | 'prototype' | 'research' | null,
  outcome,     // one sentence
  image,
  href
}
```

### Quality bar

Responsive to 360px · `aria-pressed` on filters · `aria-current` on nav · visible keyboard focus · `prefers-reduced-motion` respected · no layout shift when filtering.

---

## 4. Case study format

### Navigation

Two levels only: work grid → case study page. **No separate overview page and no "read full case study" button** — the summary block at the top of the case study is the fast path. Splitting it puts three clicks between a reviewer and the substance.

### The skeleton

**Header** — title (no status parenthetical) · one-line deck stating the outcome · status badge

**Confidentiality line** — small, under the meta strip, where a demo link would otherwise sit: *"Internal product — screens are recreations and figures are relative."* See §4.5.

**No live demos or sandboxes.** All work is internal-confidential or silicon; nothing can be hosted publicly. Decided deliberately, not skipped.

**Meta strip** — Role · Team · Timeline · Stage. Always these four, always this order.

**Summary block** — three bolded paragraphs (Problem / What I did / Result). Most reviewers read only this.

Then:

| # | Section | What goes in it |
|---|---|---|
| 01 | Why this, and why now | What else was on the table, why this won, what it cost the business to leave alone |
| 02 | The problem as people experienced it | How you learned it, sample size, evidence table |
| 03 | My role and approach | What you owned, then 3–4 key decisions (call made / alternative rejected / why) |
| 04 | What I cut | Shipped / Deferred / Cut, plus a paragraph on the hardest cut |
| 05 | How I got it agreed | A real disagreement, and the concession you made |
| 06 | What was built | Plain description + annotated screenshot |
| 07 | Tradeoffs | Table: tension → what I chose → **what it cost** |
| 08 | Impact and outcomes | Varies by status — see below |
| 09 | How it works | Architecture diagrams, collapsed, near the bottom |
| 10 | What I'd do differently | Critique the process, not just the outcome |

**Sections 01 and 05 are the ones that most reliably read as senior**, and they're the two most often missing. Section 04 is the highest-signal section on the page.

### Variants by status

| Status | Drop | Section 08 becomes | Length |
|---|---|---|---|
| In production | nothing | Impact and outcomes | 1,000–1,200 words |
| Shipped internally | nothing | Impact and outcomes | 800–1,000 |
| In customer testing | — *(add "What would make me stop")* | Early signal and what I'm watching | 800–1,000 |
| Prototype | 04, 05, 07 | What we learned | 500–700 |
| Research | 04, 05, 07 | Finding and what it changed | 500–800 |

Notes per status:

- **Production** — section 01 must name the customer and the commercial stake. Highest evidence bar, because this is the claim reviewers probe.
- **Internal** — don't inflate it to sound commercial. Section 08 = adoption as a fraction of headcount, time or cost saved, work that stopped happening.
- **Customer testing** — the gravity is the *plan*, not the outcome. Add a short "What would make me stop" section with the thresholds that would cause a cut. Never quote percentages off small samples without the n.
- **Prototype** — say plainly it never went to users. A prototype presented ambiguously reads as a shipped product that failed.
- **Research** — include one line on what the study *couldn't* tell you. Stating limitations is the credibility marker.

### Where images go

**Annotated product screenshot** → section 06. The most important visual on the page. 3–4 numbered arrows, each callout naming a **decision**, not a feature. *"Citations sit inline because pilot users wouldn't act on an unverifiable answer."*

Because the products are confidential, this is a **recreation, not a redaction** — rebuild the screen in Figma with invented content and label it as such. See §4.5.

**Architecture and system diagrams** → section 09, collapsed, near the bottom. Two figures max, one-line caption each. Never at the top: the first visual frames the whole case study, and a pipeline diagram frames it as engineering work.

**Charts go next to the claim they support**, never in a section of their own:

| Chart type | Section |
|---|---|
| Opportunity sizing, impact/effort, segment analysis | 01 or 03 |
| Evidence about the problem (failure rates, cycle time, ticket volume) | 02 |
| Outcome data (adoption curve, before/after, funnel) | 08 |
| Research findings | inline, with n and method in the caption |

The sizing chart in section 01 is the most PM-specific visual available and almost nobody includes it. It shows you *chose* rather than executed.

### Analytics: static, not live

Section 08 uses a **static chart of a fixed window**, captioned with the period and source. No live analytics embeds — they break when tokens expire, expose internal data, load slowly, and drift away from the numbers your prose describes.

Two things a static chart can do that a live one can't: draw the **threshold you agreed beforehand** as a line, and caption the *interpretation* ("steady rather than spiked — no mandate, so adoption spread department by department"). Interpretation is the PM contribution.

Exception: if the product *is* an analytics tool, a live sandbox belongs behind the demo link, not in section 08.

### 4.5 Working under confidentiality

Every product here is internal-only or silicon. Nothing can be demoed publicly, and most screens can't be published as captured. The rule: **replace what a demo would have proved — that it's real, and what it's like to use — rather than leaving a gap.**

**Recreate, don't redact.** Rebuild the screen in Figma with invented content — fake document titles, a fake query, fake results — and caption it *"Recreated from the production interface; content is illustrative."* Nothing in the image comes from the company, so the confidentiality problem disappears, and the annotated callouts (where the value actually was) survive intact.

If a real screenshot must be used, blur **values, never structure**. Layout, navigation and interaction patterns are what a reviewer needs; document names and data are what's protected. Three blurred fields reads as careful; half a greyed-out screen reads as unusable.

**For silicon work, some evidence is already public:**

- **Patents** — filed patents are public documents. If your name is on one, link it. For a hardware PM this is the strongest verifiable artifact available and almost nobody uses it.
- **Anything the company published** — press releases, product pages, datasheets, conference talks, trade show coverage.
- **Board photography** — your own photos, where the design isn't confidential.
- **Block diagrams you draw yourself**, at datasheet level of abstraction.
- **Test setups and instrumentation** — scope traces, test harnesses, chamber shots. These photograph well and signal engineering depth.

**State the constraint out loud.** One line under the meta strip converts a gap into evidence that you handle confidentiality properly — itself a qualification for enterprise roles. Silence invites the assumption that there's nothing to show.

**Offer the walkthrough instead.** In the footer: *"Happy to walk through the real product in a conversation."* Most reviewers won't take it up. The ones who do are already interested, and a live screen-share in an interview beats anything hostable.

### Supporting documents

**Excerpt, don't attach.** A full PRD is 15 pages nobody opens, and commercial ones are an NDA problem.

Embed a screenshotted *fragment* in the relevant section — scope cuts in 04, success metrics in 08, problem framing in 01. One page, cropped, redacted where needed. It proves the artifact exists and that you write clearly.

If you want one downloadable document, write a **one-page product brief** for the portfolio rather than redacting a real PRD.

Two documents more distinguishing than a PRD, because most PMs can write a PRD: a **metrics definition** (what counted as active, and why) and a **launch/rollout plan**.

---

## 5. Content rules

**Attribution stays consistent.** Pick "I" or "we" per case study and hold it. The original switched between "the team shipped" and "I delivered" on one page — that costs more trust than either claim gains.

**Never put configuration in the impact section.** Chunk sizes, model names, embedding dimensions and service counts go in one small monospace line at the bottom, labelled as configuration.

**Define your metrics.** One line saying what "active" means is small and does a lot — it separates someone who reports numbers from someone who owns them.

**State thresholds upfront where you had them.** "We agreed before build that this fails below 50% adoption in a quarter" is stronger than any number reported afterward, because it shows willingness to be wrong in public.

**Name a guardrail.** A metric you watched to make sure you weren't winning on one number by breaking another.

**No numbers? Say so.** "We launched without instrumentation — here's what I'd measure now" reads as more senior than invented precision.

**Four case studies at this depth, maximum.** Everything else is a card with an outcome line.

**NDA handling.** Relative figures ("cut onboarding 40%") plus a footer line noting figures are anonymised. Stating it prevents the assumption that you have no numbers.

**Images:** prefer real screenshots, real device photos, or a plain typographic card over stock renders. Vary photos of similar hardware so different generations don't look like duplicates.

---

## 6. Things we decided against, and why

Useful context if someone proposes them later.

| Rejected | Why |
|---|---|
| Featured tier + compact list | Chosen against in favour of one uniform grid. Sort order carries hierarchy instead. |
| Separate overview page per project | Adds a third click before the substance. |
| Status counts on filters (`Product 38`) | Volume isn't the impression to lead with. |
| More statuses to make projects look finished | If most cards read positive, the badge stops carrying information and the shipped work loses its weight. |
| Live analytics embeds | Break, drift, and expose internal data. |
| Live demos and sandboxes | All products are internal-confidential or silicon. Replaced by recreated UI, patents, and published material — see §4.5. |
| Heavily redacted screenshots | Recreation in Figma is cleaner and removes the confidentiality problem entirely. |
| Attaching full PRDs | Nobody opens them; NDA risk. |
| Showing all 58 projects at case-study depth | Depth on four beats breadth on 58. |

---

## 7. Still to do

- [ ] Write the subline for the Work page headline
- [ ] Pick the 3–4 projects that get full case studies
- [ ] Write an outcome line for **every** project on the grid
- [ ] Set `status` and `domain` per project — leave `null` rather than guessing
- [ ] Decide how the killed project is filed under the five-status scheme
- [ ] Recreate one key screen in Figma per software case study, and annotate it
- [ ] Pull the list of patents you're named on and link them
- [ ] Gather any published Ixana material — press, datasheets, talks — that covers your projects
- [ ] Check what board photography and test-setup imagery you're clear to publish
- [ ] Redraw section 08 charts against real numbers
- [ ] Audit the 58 for anything that's coursework or a short experiment, and cut it
- [ ] An About page that owns the engineer → PM path
- [ ] A line stating what role you're looking for

---

## 8. Reference files

| File | What it is |
|---|---|
| `case-study-final-sample.html` | Full case study, all 10 sections, `internal` status |
| `killed-project-case-study.html` | The kill variant, with pre-agreed gates |
| `work-index-sample.html` | Work page (built with the older two-tier layout — see §3 for the agreed single-grid version) |
| `case-study-template.md` | Fill-in template with per-status variants |
| `work-page-prompt.md` | Prompt for restructuring the Work page in a coding tool |

All figures in the sample pages are invented placeholders.

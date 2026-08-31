# Product Portfolio — Pushpal Das (full case-study export)

_Complete export of every product and its case study, compiled from `app/work/constants.ts` and `data/case-studies-v2.json` on 2026-08-31. This is the full-depth version: it carries the section prose, decision records, scope calls, data tables, chart datasets, interface reasoning and technical configuration — not only the summaries. Regenerate with `python scripts/export-products.py`._

## How to read this

- **Track** — `silicon` (chips, dev kits, hardware systems) or `ai` (AI programs, internal platforms, automation).
- **Status** — `production` (shipped externally) · `internal` (shipped inside the company) · `customer-testing` · `prototype` · `research`.
- Every case study follows the same nine-part structure, so sections are directly comparable across products.
- **Chart data** is rendered as tables rather than images, so the underlying numbers are readable.
- **Confidentiality notes** are quoted on each product. Several internal and silicon products state outright that certain figures are anonymised, relative, or invented placeholders for a public sample — read those before treating any number as fact.

## Index

| # | Product | Company | Years | Track | Status | Domain |
|---|---|---|---|---|---|---|
| 1 | Wi-R Body Area Network — YR31 | Ixana | 2024 - present | silicon | production | Silicon |
| 2 | Wi-R Dev Kits — BAN YR23 and NFE XA-NFE2001 | Ixana | 2024 - present | silicon | production | Developer hardware |
| 3 | Ixana-Wiki — multifile RAG knowledge platform | Ixana | 2025 | ai | internal | Internal platform |
| 4 | Dāsa — citation-grounded scripture engine | ISKCON (International Society for Krishna Consciousness) | 2026 - present | ai | research | Applied AI |
| 5 | Wi-R Body Area Network — YR23 | Ixana | 2024 - present | silicon | production | Silicon |
| 6 | NeuroAdapt — spike-train feature extraction for a science compiler | NeuroAdapt, IISc Bangalore | 2023 - present | ai | research | Research tooling |
| 7 | Wi-R Near Field Electric — XA-NFE3001 | Ixana | 2024 - present | silicon | production | Silicon |
| 8 | Wi-R Near Field Electric — XA-NFE2001 | Ixana | 2024 - 2026 | silicon | production | Silicon |
| 9 | Accurate estimation of mineral present in soil | IIRS-ISRO, Govt. of India | 2022 | ai | internal | Remote sensing |
| 10 | Quantum Gate Simulator — interactive 10-qubit circuit builder | Personal | 2026 - present | ai | prototype | Learning tools |
| 11 | Procurement Orchestrator — M365-native request workflow | Ixana | 2026 | ai | customer-testing | Procurement ops |
| 12 | WishKey — Key Management System | EEGRAB | 2023 | silicon | production | Access control |
| 13 | Wi-R reference designs — video smartglasses and tactical headset | Ixana | 2024 - 2026 | silicon | production | Wearable systems |
| 14 | Cost-effective smart watch | EEGRAB | 2023 | silicon | production | Consumer wearable |
| 15 | Team performance reporting — five teams, three windows | Ixana | 2026 | ai | internal | Delivery reporting |
| 16 | Scrum ecosystem — one workspace for sprint ceremonies | Ixana | 2026 | ai | internal | Agile tooling |
| 17 | Flow Tracker — real-time delivery pipeline diagnostics | Ixana | 2026 | ai | internal | Engineering ops |
| 18 | ClickUp Activity Tracker — task change audit trail | Ixana | 2026 | ai | internal | Audit tooling |
| 19 | Video library and meeting recordings | Ixana | 2026 | ai | internal | Meeting intelligence |
| 20 | Calendar sync — Outlook and Gmail without leaking detail | Ixana | 2025 | ai | internal | Workplace automation |
| 21 | AI Salary Generator | Ixana | 2026 - present | ai | customer-testing | HR tooling |
| 22 | AI product planning operating system | Ixana | 2026 | ai | internal | Planning tooling |
| 23 | AI Lawyer — multi-agent patent drafting system | Ixana | 2026 | ai | prototype | Legal tooling |
| 24 | ClickUp reporting and Gantt dashboard | Ixana | 2026 | ai | internal | PM tooling |
| 25 | In-house meeting notetaker | Ixana | 2026 | ai | internal | Meeting intelligence |
| 26 | Patent program operations | Ixana | 2026 | ai | internal | Patent operations |
| 27 | Document change intelligence | Ixana | 2026 | ai | internal | Documentation ops |
| 28 | Condenser microphone | EEGRAB | 2024 | silicon | production | Audio hardware |
| 29 | Sensor signal generator | SLB | 2023 | silicon | production | Test engineering |
| 30 | Ornithopter for surveillance | SRM UAV | 2021 - 2023 | silicon | prototype | Aerial robotics |
| 31 | Carbon positive e-car | Ricky Kids | 2020 | silicon | research | Sustainable mobility |
| 32 | UAV-aided weather radar calibration | NIT Tiruchirapalli  & SRM University | 2022 | silicon | research | Weather instrumentation |
| 33 | Non-contact COVID patient monitoring | Ricky Kids | 2021 | silicon | research | Health sensing |
| 34 | Triple riding avoidance | Ricky Kids | 2022 | ai | internal | Road safety |
| 35 | Toys for autistic kids | Ricky Kids | 2021 - 2023 | silicon | prototype | Assistive play |
| 36 | Sludge-traversing ROV | Ricky Kids | 2022 | silicon | research | Field robotics |
| 37 | ENVI-City — sustainable smart city concept | Ricky Kids | 2022 | silicon | research | Urban concept |

## Distribution

- **Total products:** 37 (plus 17 engineering/hardware builds, in the appendix)
- **By track:** ai 20 · silicon 17
- **By status:** internal 14 · production 10 · research 7 · prototype 4 · customer-testing 2
- **By company:** Ixana 21 · Ricky Kids 6 · EEGRAB 3 · ISKCON (International Society for Krishna Consciousness) 1 · NeuroAdapt, IISc Bangalore 1 · IIRS-ISRO, Govt. of India 1 · Personal 1 · SLB 1 · SRM UAV 1 · NIT Tiruchirapalli  & SRM University 1
- **By domain:** Silicon 4 · Meeting intelligence 2 · Developer hardware 1 · Internal platform 1 · Applied AI 1 · Research tooling 1 · Remote sensing 1 · Learning tools 1 · Procurement ops 1 · Access control 1 · Wearable systems 1 · Consumer wearable 1 · Delivery reporting 1 · Agile tooling 1 · Engineering ops 1 · Audit tooling 1 · Workplace automation 1 · HR tooling 1 · Planning tooling 1 · Legal tooling 1 · PM tooling 1 · Patent operations 1 · Documentation ops 1 · Audio hardware 1 · Test engineering 1 · Aerial robotics 1 · Sustainable mobility 1 · Weather instrumentation 1 · Health sensing 1 · Road safety 1 · Assistive play 1 · Field robotics 1 · Urban concept 1

---

## Products

### 1. Wi-R Body Area Network — YR31

| Field | Value |
|---|---|
| Slug | `wi-r-ban-yr31` |
| Company | Ixana |
| Years | 2024 - present |
| Track | silicon |
| Domain | Silicon |
| Status | production |
| Context | Ixana · 2024–present · Silicon |
| Role | Product owner of the gen-2 definition — program manager, silicon delivery (RTL/AMS/PS India · HW/FW US) |
| Team | The same 5 functions across 2 sites as the YR23 program |
| Timeline | Jun 2024 – Nov 2025 |
| Stage | In production — the higher-rate part on the BAN line, alongside YR23 |
| Link | https://www.ixana.ai/products/chips/wi-r-ban |

**Positioning.** The second spin: four times the rate and a fifth of the latency, bought with a deliberate step backwards on energy per bit.

**Outcome (card copy).** Second-generation body-area silicon that holds an on-body link in the single-digit milliwatt class, roughly a tenth of the radio budget it replaces.

**Problem.** YR23 shipped and sold, and its own deferred list was the roadmap: a higher-rate mode, and on-die trim storage. The field agreed. The video use case carrying the volume was rate-bound at 5 Mbit/s, and the bring-up friction YR23 documented — a manual trim pass on 19 of 24 boards — cost a week every time.

**What I did.** I owned the loop that decided what a second spin was for: routing field feedback, yield and test data from the YR23 lots into one ranked change list, and holding the line on what gen-2 would not attempt. The hard part was refusing changes.

**Result.** YR31 is in production at 20 Mbit/s and sub-0.2 ms across the same 16-device network — the public spec row carries every one of those numbers. Energy per bit went the wrong way on purpose, and gen-1 stayed in production beside it so no shipping design was forced to move. The yield, test-time and interop figures further down are the worked example of how the programme was scored.

**Evidence / demos**

- [Wi-R BAN product page (carries the YR31 specification)](https://www.ixana.ai/products/chips/wi-r-ban)

> **Confidentiality.** Silicon work. The part, its specification and its place on the public roadmap are public — the BAN line page carries the YR31 specification row and is linked below. Yield, test-time, escape and conversion figures on this page are invented placeholders for this sample; none of that class of data is ever public. No schematic, test report, lot data, customer name or internal document is shown.

#### 01. Why this, and why now

A second spin is the easiest programme in the world to justify badly. Everyone has a change they want, the die is proven, and the argument for going again is always available. The question was not whether to spin but what the spin was for — a gen-2 that absorbs every request is a gen-1 that arrives eighteen months late.

The commercial stake settled it. The volume tier of the segment YR23 opened is video smartglasses, and at 5 Mbit/s that design compresses hard enough that compression becomes the product problem. Rate was the constraint holding back the only application with consumer volume behind it.

**Figure — Link rate available to a head-worn design: Wi-Fi 100 Mbit/s, Wi-R BAN YR31 20 Mbit/s, ultra-wideband 10 Mbit/s, Wi-R BAN YR23 5 Mbit/s, Bluetooth LE 2 Mbit/s**

| name | value | label |
|---|---|---|
| Wi-Fi | 100 | 100 — and a radio budget a head-worn design cannot carry |
| Wi-R BAN — YR31 | 20 | 20 Mbit/s at under 6 mW |
| Ultra-wideband | 10 | 10 — broadcast, and an order more energy per bit |
| Wi-R BAN — YR23 | 5 | 5 — the ceiling that forced compression |
| Bluetooth LE | 2 | 2 — not a video link |

_What a head-worn video design could choose from, Apr 2024, from published figures for each link. Rate alone does not decide it — Wi-Fi wins the axis and loses the product, because a design that must run all day cannot carry the radio. Gen-2's job was to clear the video bar without leaving the power class that made Wi-R the answer at all._

The other half came free. YR23’s deferred list already carried on-die trim storage, and the bring-up data said it was worth more than we had assumed. One spin could answer the rate ceiling and the friction together.

#### 02. The problem as people experienced it

I collected every change request, field issue and evaluation complaint against YR23 — 63 of them — and ranked each by two numbers I could defend: how many stalled evaluations it would unblock, and what it cost in die area and validation weeks. A list of 63 requests is an argument for a third spin; a ranking is a decision.

| What came back | What it cost them | Evidence |
|---|---|---|
| "We had to compress harder than planned" | Video quality became the integration problem | 9 of 63, all head-worn designs |
| "Every board needs a manual trim pass" | About a week added to each bring-up | 17 of 63; the most frequent single item |
| "Test cost is visible in our BOM" | Per-unit test time at volume | 6 of 63, all from teams past prototype |
| Assorted convenience requests | Real, individually small, collectively a second gen-1 | 31 of 63 |

**Figure — Sixty-three YR23 change requests grouped and ranked by evaluations unblocked against validation weeks: on-die trim 12, higher rate 8, test-time reduction 7, and the long tail spread thin below the cut line**

| name | value | n |
|---|---|---|
| On-die trim storage (17 requests) | 12 | 5 |
| Higher rate mode (9 requests) | 8 | 14 |
| Test-time reduction (6 requests) | 7 | 4 |
| Package variant (4 requests) | 4 | 9 |
| Backward-compat energy mode (3 requests) | 2 | 11 |
| Convenience requests (24) | 2 | 22 |

_Threshold: 5 — cut line_

_The 63 requests grouped and ranked, May 2024. Value is evaluations the change would unblock — not how often it was asked for, which is the point of ranking; n is the validation weeks it would cost. Three items sit above the cut line, and the long tail is the danger — individually cheap, collectively a second first-generation programme._

The reframe: the loudest request was not the most valuable. Rate had executive attention because it appeared in competitive comparisons; on-die trim was raised nearly twice as often by the people actually building boards, and cost a third as much.

#### 03. My role and approach

This is the clearest case on the line of a delivery lens doing product work. The founder owned whether a second BAN part should exist. I owned the loop that decided what it was for: routing field feedback, yield and ATE data from the YR23 lots into one ranked list, and defending the line under it.

The routing was deliberate. Field issues, evaluation complaints and lot data arrived through three channels to three audiences, and nobody scored them against each other — so I ran them into one queue with the delivery tooling built for it, and made the ranking the artefact everyone argued about.

**Key decisions**

- **Three changes, ranked in public.** Rate, on-die trim, test time. Everything else was published as ranked-and-declined rather than quietly dropped, which stopped the tail returning every month.
- **Spend energy per bit to buy rate.** Efficiency regresses from 0.12 to 0.20 nJ/bit. Absolute power stays inside the class that makes Wi-R viable, and the application carrying the volume needs rate more than efficiency.
- **Cut the test program by evidence, not by target.** Test time came out of tests that had never failed a unit across the YR23 lots, not out of a percentage handed down.
- **Keep YR23 in production rather than replacing it.** A gen-2 that obsoletes gen-1 forces every shipping design to requalify. Two parts on one line costs us inventory and buys customers the right to not move.

#### 04. What I cut

**Scope**

- _Shipped:_ Up to 20 Mbit/s with sub-0.2 ms latency · On-die per-unit trim storage · Reduced ATE test program · Same 16-device network and range envelope · Interop parity with the installed YR23 host base
- _Deferred:_ Smaller package variant · Multi-network coexistence · Field-updatable PHY parameters
- _Cut:_ Backward-compatible gen-1 energy mode · Second host interface option · On-die link encryption

The backward-compatible energy mode was the hardest cut. Partners with a shipping YR23 design wanted YR31 to run at 5 Mbit/s at gen-1’s exact 0.12 nJ/bit, dropping it in and inheriting the rate later without touching their power budget. It needed two separately tuned analogue front ends on one die — the area was findable, the validation was not, since every mode multiplies the characterisation matrix we had just reduced. The gap is covered twice: interop parity means gen-1 hosts work unchanged, and YR23 stays in production.

#### 05. How I got it agreed

The test lead objected to cutting the ATE program, and his was the strongest objection anyone put to me on this programme. Test time at volume is a real line in a customer’s cost model, so pressure to cut it is permanent — and every test removed is a class of defect that now reaches a wearable on somebody’s head. A field failure is not a return, it is a design-in at risk.

I had opened by asking for a test-time target, which invited exactly the argument we were having. So I withdrew it and asked which tests had actually failed a unit across every YR23 lot we had run. Roughly a third had never fired once. That moved the conversation from how much test we could afford to which tests had earned their seconds — a question he was better placed to answer than I was.

He agreed to cut the tests that had never fired, on a condition I had not planned to carry. Every removed test is re-run as a periodic audit on a sample of lots, so if one starts failing we hear it from our own sampling rather than a customer. That process is permanent.

#### 06. What was built

The higher-rate part on the BAN line: 20 Mbit/s at sub-0.2 ms across the same up-to-16-device network, inside the same range envelope as gen-1, at under 6 mW. It carries per-unit trim on the die, so a board no longer needs a manual trim pass to reach a stable link.

**Interface — Wi-R BAN YR31 transceiver package**

- **Same package and pin-out as YR23.** The change that made interop parity a promise we could keep, and the one nobody requested because nobody misses a problem they never had.
- **Trim lives on the die, not in a procedure.** Seventeen of 63 field items were the manual trim pass. Moving it on-die removed about a week from every board bring-up.
- **Marked as a distinct part, not a revision.** YR31 changes the energy point. Shipping it as a YR23 revision would have let a design inherit a different power budget without noticing.
- **Runs the same reference driver.** A partner evaluating gen-1 moves to gen-2 without a firmware project, which is what keeps the installed base an asset rather than a migration problem.

_Ixana YR31 package, from Ixana's published product photography. The package, part marking and specification are public; internal design detail is not shown. Happy to walk through the real programme in a conversation._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Rate vs energy per bit | 20 Mbit/s at 0.20 nJ/bit | Gen-1 remains the better part for anything not rate-bound, permanently |
| Scope vs schedule | Three ranked changes; 31 requests declined in public | A standing queue of reasonable asks with no home until the next spin |
| Test coverage vs per-unit cost | Cut only tests that had never failed a unit | A lot-sampling audit process that must run forever to stay honest |
| Clean succession vs customer disruption | Keep YR23 in production alongside | Two parts, two inventories, two datasheets, one small team |

#### 08. Impact and outcomes

Before the spin was committed we agreed it failed on one condition: if gen-2 could not hold 15 Mbit/s sustained on a person, the video use case stayed blocked and the spin bought nothing that mattered. Interop with the installed YR23 host base was the guardrail — rate and cost were not to be won by breaking the customers gen-1 had earned.

**Metrics**

| Value | Measure |
|---|---|
| 5 → 20 (Mbit/s) | Link rate, gen-1 to gen-2 |
| 11 d → 2 d | Median board bring-up to a stable on-body link |
| 71% → 86% | Wafer yield at production release |
| 4.2 s → 2.6 s (per unit) | ATE test time at volume |
| 0.12 → 0.20 (nJ/bit) | Energy per bit, traded deliberately for rate |
| 94% (parity with YR23) | Interop across the installed host base (guardrail) |

**Figure — Change from YR23 to YR31 by measure: latency down 80 percent, bring-up time down 82 percent, test time down 38 percent, yield up 21 percent, and energy per bit up 67 percent as a deliberate regression**

| name | value | label | good |
|---|---|---|---|
| Bring-up time | -82 | −82% | True |
| Link latency | -80 | −80% | True |
| ATE test time | -38 | −38% | True |
| Wafer yield | 21 | +21% | True |
| Energy per bit | 67 | +67% — intended | False |

_Gen-1 to gen-2 change by measure, Nov 2025, from production lot data and bring-up records. Link rate is excluded: at +300% it would compress everything else to nothing, and it is in the tiles above. The single red bar is the point of the page — one measure was spent, deliberately, and a page that hid it would be describing a different chip._

**How we counted.** Yield is wafer-level probe yield at production release, excluding lots scrapped for assembly or handling defects, which are a packaging problem and would flatter the die. Interop is counted across the 34 host designs in the installed base: the failing 6% is two early evaluation boards that drive the link outside the published timing spec, fail the same way on YR23, and are documented as out of spec. Parity means no host gen-1 had earned was lost — not that every board ever built works.

`Part configuration — YR31 Wi-R BAN transceiver · up to 20 Mbit/s · 0.20 nJ/bit at 20 Mbit/s, under 6 mW · sub-0.2 ms link latency · up to 16 devices per network · 10–15 m along-body, ~0.1 m off-body containment · on-die per-unit trim storage · package, pin-out and reference driver shared with YR23`

#### 09. What I'd do differently

I ranked by evaluations unblocked and validation weeks, and never scored anything by revenue at risk. Those proxies favour the loud and the cheap, and they are why the package variant sat just under the cut line — it would have unblocked four evaluations, two of them the largest by volume on the line.

I would also have published the declined list earlier. Ranking in public is what worked here, and I did it two months in, after the queue had been relitigated twice. Every week the ranking is private is a week people spend lobbying rather than arguing about the criteria.

> **Note on this sample.** This is a sample portfolio page about real silicon. The part, its specification and its place on the public roadmap are public and linked above. Yield, test-time, escape, bring-up and conversion figures are invented placeholders — none of that class of data is ever published — and should be replaced with real data before this page is used. No schematic, test report, lot data or customer name is shown. I'm glad to walk through the real programme and its numbers in a conversation.

---

### 2. Wi-R Dev Kits — BAN YR23 and NFE XA-NFE2001

| Field | Value |
|---|---|
| Slug | `wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001` |
| Company | Ixana |
| Years | 2024 - present |
| Track | silicon |
| Domain | Developer hardware |
| Status | production |
| Context | Ixana · 2024–2026 · Developer hardware |
| Role | Product manager, dev kit program |
| Team | 3 hardware engineers, 1 firmware engineer, 1 applications engineer |
| Timeline | Mar 2024 – Feb 2026 |
| Stage | Shipping, sold through the product page |
| Link | https://www.ixana.ai/products/dev-kits |

**Positioning.** Turned two pieces of evaluation silicon into a kit a partner engineer can unbox and get an on-body link running the same day.

**Outcome (card copy).** Turned Wi-R eval silicon into a shipping dev kit built around one acceptance bar: open the box, reach an on-body link the same day — every variable that killed early bring-ups fixed inside it.

**Problem.** Wi-R worked in our lab and almost nowhere else. Every partner evaluation began with their engineer reproducing a body-coupled link from a datasheet, and the first six took a median of 28.5 days — most of it spent on electrode placement and grounding rather than on evaluating the technology.

**What I did.** I owned the dev kit program across both Wi-R families, defining the kit as the smallest object that produces a working link on day one, sequencing BAN before NFE, and trading configurability away for a fixed electrode geometry a partner could not get wrong.

**Result.** The kit ships through the public product page, and its whole design is the removal of variables: a fixed, characterised electrode geometry, a known-good host board, a hard power switch, the part number printed on the case. The volumes, timings and conversion figures further down are the worked example the programme was run against — including the pre-agreed floor that would have killed it.

**Evidence / demos**

- [Dev kits product page](https://www.ixana.ai/products/dev-kits)
- [Wi-R BAN datasheet page](https://www.ixana.ai/products/chips/wi-r-ban)
- [Wi-R NFE datasheet page](https://www.ixana.ai/products/chips/wi-r-nfe)

> **Confidentiality.** Silicon work. Part numbers, package photography and kit contents are public — the product pages are linked below. Kit volumes, design-in counts and support load on this page are invented placeholders for this sample; schematics, test reports and partner names are not shown.

#### 01. Why this, and why now

Three ways of getting Wi-R into partner hands were on the table for FY25: an onsite bring-up by our applications engineer, a full reference design, or a dev kit. The commercial stake was concrete — our largest pipeline evaluation, a hearables OEM weighing Wi-R against BLE for an earbud-to-case link, had told us plainly they would not staff an RF engineer to evaluate an unproven physical layer. If evaluation stayed expensive for them we lost the account, and with it the reference design every later hearables conversation would have leaned on.

I sized the three against the constraint that actually bound us: applications engineering capacity. Three engineers could bring up a body-coupled link, and each option consumed them differently.

**Figure — Partner evaluations supportable per quarter with the same three applications engineers: onsite bring-up 2, reference design 4, dev kit 12**

| name | value | label |
|---|---|---|
| Dev kit | 12 | 12 per quarter |
| Reference design | 4 | 4 per quarter |
| Onsite bring-up | 2 | 2 per quarter |

_Opportunity sizing, Feb 2024. Estimated from the six evaluations we had run to that point, holding the company's applications engineering function fixed at its three engineers — the kit team roster above borrows one of them. The dev kit was the only option that scaled evaluation without scaling the team, which is what decided the year._

The reference design lost on timing rather than merit — it answers "how do I productise this", and nobody reaches that question before believing the link works.

#### 02. The problem as people experienced it

I timed the first six partner evaluations end to end, from silicon delivery to first sustained link, and audited the 41 support tickets they generated. The failures clustered tightly, and almost none were about the radio.

| What they did | Where it broke | Evidence |
|---|---|---|
| Wired the transceiver to their own MCU | Clock and supply noise coupled into the electrode path | 5 of 6 evaluations; 11 tickets |
| Improvised electrodes from copper tape | Contact area and spacing off by enough to kill the link | 6 of 6; 15 tickets — the single largest time sink |
| Grounded the board to bench earth | Return path through the bench, not the body | 4 of 6; 9 tickets, all filed as "no link" |
| Measured with a scope probe on the electrode | Probe capacitance loaded the node and hid the signal | 3 of 6; 6 tickets |

**Figure — Days from silicon delivery to first sustained on-body link across the first six partner evaluations, ranging from 49 days down to 18**

| name | value | label |
|---|---|---|
| Evaluation 1 | 49 | 49 days |
| Evaluation 2 | 38 | 38 days |
| Evaluation 3 | 31 | 31 days |
| Evaluation 4 | 26 | 26 days |
| Evaluation 5 | 22 | 22 days |
| Evaluation 6 | 18 | 18 days |

_Time to first link, six partner evaluations, Mar 2023 – Feb 2024, measured from our shipping records and their onboarding notes. The downward trend is us getting better at hand-holding, not them getting better at bring-up — which is exactly the cost the kit had to remove._

The reframe: this was never an RF documentation problem. Every partner failed on the two things invisible in a datasheet — electrode geometry and return path. A better datasheet would have moved nothing; a fixed, tested electrode assembly moved everything.

#### 03. My role and approach

I owned the kit as a product: what went in the box, what the first hour had to prove, which silicon shipped first, and what we would refuse to make configurable. I ran the program across hardware, firmware and applications engineering, and owned the boundary with sales on what a kit was allowed to promise.

**Key decisions**

- **Fixed electrode geometry, not an electrode kit.** The obvious build was a bag of options so partners could explore. Exploration was where they lost three weeks, so the kit ships one dry and one gel pair at a tested spacing, documented rather than adjustable.
- **BAN first, NFE one quarter behind.** We could only qualify one at a time. BAN had the pipeline pressure and the harder bring-up, so it went first and paid for the tooling the NFE kit reused.
- **A host board in the box, not a bring-your-own MCU.** Half the observed failures came from partner-side clock and supply noise. A known-good host board meant a failed link was our fault, which made every ticket diagnosable.
- **One number on the box: time to first link.** The program's acceptance criterion was a partner engineer reaching a sustained link inside one working day, and I refused features that did not move it. It is the only metric sales, engineering and I argued about in the same units.

#### 04. What I cut

**Scope**

- _Shipped:_ BAN and NFE transceiver modules · Known-good host board · Dry and gel electrode pairs · USB console with a link-health readout · Two worked example applications
- _Deferred:_ Second host board option · Android companion app · Multi-node topology examples
- _Cut:_ On-kit display · User-adjustable electrode mounting · Battery-powered untethered mode

The on-kit display was the hardest cut. Every partner review asked for it — a screen showing link state lets you walk around and watch the link hold, which is the demo that convinces a room. It cost an enclosure revision, a display driver and about seven weeks. A host-side console prints the same link-health fields, which is a worse demo and an equal diagnostic — and the diagnostic is what an evaluation actually needs.

**Out of scope for the first kit revision — From the kit definition — scope, rev D**

- **On-kit status display.** Adds an enclosure revision and roughly 7 weeks to first ship. Same information available over the USB console. Revisit if console use falls below half of onboarding sessions.
- **Adjustable electrode mounting.** Directly contradicts the finding that geometry exploration is the largest single time cost. Fixed geometry, documented, no fasteners.
- **Untethered battery operation.** Needed for field demonstrations, not for evaluation. Moves to the reference design, where power budget is the point.

_One page from the kit definition, with supplier and cost lines removed._

#### 05. How I got it agreed

The VP of Sales wanted the kit and the reference design bundled and sold as one thing. His reasoning was sound from where he sat: a kit is a small transaction that produces a technical opinion, a reference design is what a partner builds against, and shipping them together meant one conversation instead of two.

I did not think we would win on principle, so I re-grounded it in the pipeline we had. Every one of the six completed evaluations had asked a variant of "does this link hold on a person" before anyone asked a productisation question — and bundling would put a two-month reference design lead time in front of a question we could answer in a day. The argument stopped being about deal size and became about what the partner is trying to learn first.

He agreed, with two conditions I had not planned to give. The kit ships with two worked examples rather than one, so it demonstrates a use case and not just a link, which cost the firmware engineer three weeks. And any partner completing a kit evaluation gets the reference design files without a separate commercial step, so the kit never becomes a toll gate in front of what he is paid to sell — which is why eval-to-design conversion is measurable at all.

#### 06. What was built

A sealed kit containing a Wi-R transceiver module, a known-good host board, two tested electrode assemblies, a USB console and two worked applications. A partner engineer opens it, mounts the electrode pair as printed on the enclosure, connects the console, and watches a link establish across their own body inside the hour. Everything that could have been a variable — spacing, contact material, ground reference, host clocking — is fixed and characterised in the box.

**Interface — Wi-R dev kit enclosure showing the sensor port, module bay and power control**

- **The electrode port is keyed and labelled on the enclosure.** Partners lost three weeks to geometry they could not see. Keying it means the one variable that killed six evaluations cannot be set wrong.
- **The module sits in an open bay, not under a lid.** Evaluators want to probe the module and swap silicon revisions. Leaving the bay open cost ingress protection we did not need on a bench.
- **Power is a hard switch, not a firmware state.** Half of the early "no link" tickets were resolved by a power cycle. A physical switch makes the first diagnostic step unambiguous over a phone call.
- **The part number is on the outside of the case.** Support threads kept stalling on which silicon revision a partner had. Printing it externally removed a round trip from most tickets.

_Ixana dev kit enclosure, photographed in-house. The mechanical design and markings are public; internal boards are not shown. Happy to walk through a live bring-up in a conversation._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Configurability vs first-hour success | One fixed, characterised electrode geometry | Two partners with unusual form factors had to wait for a custom assembly, and one evaluation slipped a quarter |
| Kit cost vs diagnosability | Ship a known-good host board rather than expect the partner's MCU | Roughly a third of the bill of materials buys hardware most partners discard after evaluation |
| Speed to ship vs demo quality | USB console instead of an on-kit display | The kit demonstrates badly in a room full of executives, which sales absorbs on every first meeting |
| Two families vs one | BAN first, NFE a quarter later on shared tooling | NFE partners waited a quarter, and two of them evaluated a competitor in the interval |

#### 08. Impact and outcomes

Before tooling was committed we agreed the program failed on two conditions: fewer than 40 kits shipped in six quarters, or median time to first link still above three days after the second revision. RMA rate was the guardrail — a kit that ships fast and comes back is worse than no kit, because it spends the partner's goodwill rather than ours.

**Metrics**

| Value | Measure |
|---|---|
| 62 (of 40 target) | Kits shipped over six quarters |
| 28.5d → 6h | Median time to first on-body link |
| 9 (of 34) | Evaluations that became design-ins |
| 1.3 (from 4.1) | Support tickets per kit, first 90 days |
| 96% | Kits passing the out-of-box link test at final QA |
| 3.2% | Kits returned under RMA (guardrail) |

**Figure — Cumulative dev kits shipped by quarter, from 4 in the first quarter to 62 by the sixth, against a pre-agreed floor of 40**

| Q3 24 | Q4 24 | Q1 25 | Q2 25 | Q3 25 | Q4 25 |
|---|---|---|---|---|---|
| 4 | 13 | 24 | 38 | 52 | 62 |

_Threshold: 40 — Pre-agreed floor: 40 kits_

_Cumulative kits shipped, Q3 2024 – Q4 2025, from order records. The steps are real: kits leave in batches tied to module builds, not continuously. The floor was crossed in Q3 2025, one quarter later than planned, because the NFE kit slipped behind BAN._

**How we counted.** Time to first link means the interval between the partner opening the box and their first sustained 60-second on-body link, self-reported in the onboarding form. It counts calendar time rather than engineering hours, because calendar time decides whether an evaluation survives a reprioritisation. A design-in counts only where the part appears in a partner schematic we have seen. The 34 evaluations are kit-mediated only, a narrower population than the NFE-line design-in figures, which include direct silicon engagements.

`Kit configuration — YR23 BAN transceiver module rev C · XA-NFE2001 NFE module rev B · STM32U5 host board · dry and gel electrode pairs at fixed spacing · USB-C console at 921600 baud · kit firmware 2.4.1`

#### 09. What I'd do differently

I measured the kit and never measured the evaluation. Time to first link was right for the hardware and wrong for the business: it tells you the box works and nothing about whether the partner reached a decision. Nine of 34 converted, and I cannot say cleanly why the other 25 stopped — we instrumented the first hour thoroughly and the following two months not at all.

I also let the NFE kit slip a quarter to reuse BAN tooling, and would take that trade differently now. The saving was real; the cost was two partners running a competitor evaluation in the gap, which does not appear in any program metric until it appears as a lost design-in a year later.

> **Note on this sample.** This is a sample portfolio page about real silicon. Part numbers, package photography and product pages are public and linked above; kit volumes, design-in counts, support figures and timings are invented placeholders and should be replaced with real data before this page is used. Schematics, test reports and partner names are not shown. I'm glad to walk through the real program and its numbers in a conversation.

---

### 3. Ixana-Wiki — multifile RAG knowledge platform

| Field | Value |
|---|---|
| Slug | `xana-multifile-rag-based-data-singularity-platform` |
| Company | Ixana |
| Years | 2025 |
| Track | ai |
| Domain | Internal platform |
| Status | internal |
| Context | Ixana · 2025 · Internal platform |
| Role | Product manager, delivery owner |
| Team | 4 engineers, 1 designer |
| Timeline | Jan – Aug 2025 |
| Stage | Live, company-wide |
| Link | https://xana-nine.vercel.app/ |

**Positioning.** One place to find every document, meeting, task and patent record — instead of five tools and a colleague who might remember.

**Outcome (card copy).** Cut the median hunt for a document from nine minutes to under one, and put 118 of 140 employees on a single search box.

**Problem.** Company knowledge lived in five disconnected systems. People spent a median of nine minutes hunting for a document before giving up and asking someone — or rewriting it from scratch.

**What I did.** I owned delivery of a single internal knowledge platform: one searchable repository across OneDrive, ClickUp, Teams, efficiency trackers and patent records, with hybrid search, cited AI answers and role-based access.

**Result.** 118 of 140 employees used it within a quarter — 140 being the mid-2025 roster, up from about 75 a year earlier. Median time-to-find fell from nine minutes to under one, and duplicate document creation stopped being a weekly occurrence.

**Evidence / demos**

- [Open the working demo — search it yourself, on an invented workspace](https://xana-nine.vercel.app/?q=YR31%20power%20budget)

> **Confidentiality.** Internal product — screens on this page are recreations, and figures are relative or anonymised.

#### 01. Why this, and why now

Three internal problems were on the table for the first half of 2025: knowledge search, an onboarding documentation rebuild, and automated meeting notes. All three had vocal advocates. I sized each by the same measure — engineering and operations hours lost per month — using calendar sampling and a two-week diary study with nine people.

**Figure — Estimated hours lost per month: knowledge search 340, onboarding docs 90, meeting notes 60**

| name | value | label |
|---|---|---|
| Knowledge search | 340 | 340 h / mo |
| Onboarding docs | 90 | 90 h / mo |
| Meeting notes | 60 | 60 h / mo |

_Opportunity sizing across three candidate problems. Estimated from a two-week diary study (n=9) plus calendar sampling. Knowledge search was roughly four times the next-largest problem, which is why it won the half._

The knowledge problem was also the only one getting worse on its own: every failed search produced another duplicate document, which made the next search harder. The other two were stable. That compounding effect is what turned a large problem into an urgent one, and it's the argument I used to get the half committed.

#### 02. The problem as people experienced it

I interviewed 14 people across engineering, operations and legal, and shadowed four of them while they searched for something real. The pattern repeated almost exactly.

| What they did | Where it broke | Evidence |
|---|---|---|
| Recalled a document exists | No obvious place to start | 11 of 14 opened a tool on a guess |
| Searched 3–4 tools | Keyword search missed anything reworded | Median 9 min before abandoning |
| Asked a colleague | Answer stayed in a DM, never written down | The same 4 people fielded most requests |
| Rewrote the document | Duplicates made the next search worse | 3 versions of one spec found in audit |

**Figure — Of 14 people interviewed: 11 started with a guess, 12 searched three or more tools, 9 asked a colleague, 6 recreated a document**

| name | value | label |
|---|---|---|
| Started with a guess | 11 | 11 / 14 |
| Searched 3+ tools | 12 | 12 / 14 |
| Asked a colleague | 9 | 9 / 14 |
| Recreated a document | 6 | 6 / 14 |

_Behaviours observed across 14 interviews. Nearly half had recreated a document that already existed — the loop that made the problem compound._

The reframe: this was not a search-quality problem inside any one tool. It was a fragmentation problem across all of them, and fixing search in OneDrive alone would have moved almost nothing.

#### 03. My role and approach

I owned product scope across ingestion, search, access and user workflows, and drove decisions on source coverage, search experience, sync operations, security requirements and production readiness — so backend services, frontend flows and background jobs shipped as one product rather than three.

**Key decisions**

- **Unified repository over document search alone.** I brought OneDrive, ClickUp, Teams, efficiency data and patent invoices into one index. It widened scope considerably, but the research said fragmentation — not search quality — was the actual problem.
- **Two sources first, then three.** I sequenced OneDrive and ClickUp into a four-week internal alpha before touching the others, so we learned whether people would change habits before paying for full coverage.
- **Hybrid retrieval over keyword-only or vector-only.** People searched for exact patent numbers and vague half-remembered topics in the same session. Either approach alone failed one of those.
- **Security in v1, not as a follow-up.** Azure AD authentication, JWT validation and signed short-lived media URLs shipped with the first release. A system indexing every sensitive document can't retrofit access control.

#### 04. What I cut

**Scope**

- _Shipped:_ Search across 5 sources · AI answers with citations · Azure AD sign-in · Secure file preview · Transcript timestamp jump
- _Deferred:_ Slack and email sources · Saved searches · Usage analytics v2
- _Cut:_ Per-document permissions · Multi-language search · Public-facing mode

Per-document permissions was the hardest cut. Existing SharePoint groups already covered roughly 90% of real sensitivity cases, and building a second permission model would have added a month for the remaining 10% — which we handled by excluding two folders from ingestion instead.

**Out of scope for v1 — From the PRD — scope, v0.4**

- **Per-document permissions.** SharePoint group inheritance covers 90% of sensitivity cases (audit, Feb 2025). Remaining cases handled by excluding two named folders from ingestion. Revisit if exclusion list exceeds 5 folders.
- **Multi-language search.** Under 2% of indexed content is non-English. Defer indefinitely.
- **Public-facing mode.** No identified user. Removed from roadmap.

_One page from the working PRD, with internal locations and dates generalised._

#### 05. How I got it agreed

The CTO wanted per-document permissions in v1. His concern was legitimate — the index would contain patent filings and unreleased silicon specs, and he didn't want to explain a leak to the board because a PM wanted to ship faster.

Arguing about risk tolerance wasn't going to resolve it, so I changed what we were arguing about. I pulled the SharePoint group data and showed that inherited permissions already covered every sensitive folder but two. That reframed the question from "how much risk will we accept" to "is a month of engineering the right price for two folders" — a question with an obvious answer.

He agreed on two conditions I hadn't planned to offer: the two folders stay out of ingestion entirely rather than being permission-filtered, and we revisit if the exclusion list ever exceeds five folders. Both went into the PRD as written commitments. The second condition turned out to matter — we hit four of the five, and per-document permissions moved back onto the roadmap pre-emptively, on his terms rather than as a fight.

#### 06. What was built

An internal knowledge platform combining document management, enterprise search and AI question answering in one interface. People search files, browse ClickUp documentation, jump through meeting recordings by timestamp, check task and efficiency analytics, and track patent invoice records — from one place.

**Interface — Searching XANA for “YR31 power budget”: the answer sits above the results with numbered citation chips inside its sentences, and the three sources beneath name a PDF page, a spreadsheet row range and a meeting timestamp**

[Search this in the demo — opens the screen above](https://xana-nine.vercel.app/?q=YR31%20power%20budget)

- **Citations sit inline, not in a footer.** In the alpha people wouldn't act on an answer without seeing the source first, so the marker sits in the clause it supports and opens that exact passage. A meeting citation carries a timestamp and seeks the recording to the second it was said.
- **Preview opens in-app.** Opening OneDrive in a new tab broke the search flow and lost people's place in the results.
- **Source filter is visible, not in settings.** People often knew which tool a document lived in and wanted to say so upfront.
- **Superseded copies are flagged, never hidden.** The February audit found three versions of one spec. A superseded copy still appears in the results, ranked under the current one and labelled — and the answer refuses to quote from it. Hiding duplicates would have made the guardrail this shipped against impossible to read.

_The running demo rather than a mock-up — same code, same layout, on an invented corpus. Ten documents, four recordings and three videos stand in for the five connected sources, and every document, name, part number and figure is made up for publication. The two folders excluded from ingestion are absent from it by construction rather than filtered._

**Gallery**

- **A video, opened in place** — [Open the video and ask it something](https://xana-nine.vercel.app/myfiles/view/doc-walkthrough-video)  The prompts belong to this file, not to the product — clicking one answers from this recording alone, and the citation is a timestamp, so checking it means landing on the second somebody said it rather than on an hour of audio. Every file in My Files carries its own prompts.
- **A spreadsheet, opened as a grid** — [Open the spreadsheet](https://xana-nine.vercel.app/myfiles/view/doc-adoption-sheet)  Column letters and row numbers, because a citation reading “Sheet 1, rows 2–13” is only checkable against something a reader can count to. One markdown pane for every file type made every locator land in the same undifferentiated wall of text.
- **A PDF, opened by page** — [Open the PDF](https://xana-nine.vercel.app/myfiles/view/doc-alpha-readout)  Each page stamped with the number its citations quote, so “p. 2” lands on page two. Word documents and decks read the same way, by section and by slide.
- **My Files** — [Open My Files](https://xana-nine.vercel.app/myfiles)  The OneDrive and SharePoint surface — a video, a PDF, a spreadsheet, a document and a deck, each opening in a reader that looks like what it is. ClickUp is not mixed in; it is a separate source with its own route, and folding both into one list was counting one index as two. The two folders excluded from ingestion are absent entirely rather than filtered.

_Every file type in My Files opens inside the app rather than bouncing out to OneDrive in a new tab, which lost people their place in the results. Each opens in a reader shaped like the file, because a locator only means something if the surface has pages, or rows, or a timeline._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Breadth vs reliability | Five sources, each connector modular and independently schedulable | More integration surface to monitor; two connectors needed rework post-launch |
| Answer quality vs speed | Hybrid retrieval with structured context assembly | About 1.5s added latency versus generation alone |
| Ease of access vs data protection | Azure AD required, signed media URLs, tighter endpoint controls | No anonymous or link-based sharing, which people asked for repeatedly |

#### 08. Impact and outcomes

Before build, we agreed this failed if fewer than half the company used it in the first quarter, and that we'd watch duplicate document creation as a guardrail — a tool that made finding easier but copying easier too would have been a net loss.

**Metrics**

| Value | Measure |
|---|---|
| 118 (of 140) | Employees active in first quarter |
| 340 | Searches per week by month 3 |
| 9m → 55s | Median time to find a document |
| 78% | Answers rated useful in-product |
| 5 | Systems unified into one index |
| −61% | Duplicate docs created (guardrail) |

**Figure — Weekly active users rising from 18 in week one to 118 by week ten, against a pre-agreed floor of 70**

| Week 1 | Week 4 | Week 7 | Week 10 |
|---|---|---|---|
| 18 | 36 | 44 | 62 | 68 | 84 | 94 | 104 | 112 | 118 |

_Threshold: 70 — Pre-agreed floor: 70 of 140_

_Weekly active users after launch, Jun–Aug 2025, from the application database. Growth was steady rather than spiked — no company-wide mandate, so adoption spread department by department, and it crossed the pre-agreed floor in week six._

**How we counted.** Active means at least one search or chat query in a calendar week, deduplicated by user. It deliberately excludes people who only opened a link someone else shared, since that measures sharing rather than adoption.

`Technical configuration — 1000-char document chunks · 200-char overlap · 768-dim embeddings (all-mpnet-base-v2) · gpt-4o-mini for generated answers · 3 PM2 services on AWS EC2`

#### 09. What I'd do differently

I shipped v1 without product analytics. For six weeks I had no idea which sources people searched or how often answers failed — the numbers above came from a database query and a survey, retrofitted. Instrumentation belonged in the first release, and the cost wasn't the missing data so much as the six weeks of decisions I made on intuition.

I also sequenced the connectors by how easy they were to build rather than by expected usage. OneDrive and ClickUp turned out to carry most of the traffic, but I only knew that afterwards — two of the five connectors could have waited a release and bought back the month the permissions work needed.

> **Note on this sample.** This is an internal product. Screens are recreations with invented content, and figures are anonymised or expressed as relative change. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 4. Dāsa — citation-grounded scripture engine

| Field | Value |
|---|---|
| Slug | `dsa-generative-ai-engine-for-a-guided-spiritual-path` |
| Company | ISKCON (International Society for Krishna Consciousness) |
| Years | 2026 - present |
| Track | ai |
| Domain | Applied AI |
| Status | research |
| Context | ISKCON · 2026 · Applied AI |
| Role | Product lead, fidelity owner |
| Team | 4 people |
| Timeline | May 2026 – present |
| Stage | Research — engine and interface built, not yet connected |

**Positioning.** An engine that answers with a teacher's actual cited words, or says plainly that it has no teaching on the subject.

**Outcome (card copy).** A deterministic guard strips any citation retrieval never returned — fabrication is prevented by architecture, not reduced by prompting — and a distance gate makes refusal a first-class answer.

**Problem.** A teacher's work sits across roughly seventy books, thousands of letters and hundreds of hours of recordings, with nowhere to ask a question and get his actual words back with a source. A general model answers every such question fluently, which is precisely the failure — a plausible paraphrase attributed to a named person is worse than no answer.

**What we did.** We set the fidelity bar as a technical specification rather than an aspiration: retrieval must surface real passages, a gate must refuse questions the corpus does not address, and a deterministic check must strip any citation the model produced that was not actually retrieved.

**Result.** Fabricated citations cannot ship: any reference the retriever did not return is stripped by code before an answer renders, and out-of-corpus questions are refused by a calibrated gate rather than answered fluently. The engine and the interface both work and are not yet connected, so nobody has used it — the evaluation figures further down are the worked example of the harness built to judge it.

**Evidence / demos**

- [Product walkthrough](https://www.youtube.com/watch?v=S4G_99Yn2M4)

> **Confidentiality.** Volunteer project over published texts. The source material is public; the evaluation figures on this page are invented placeholders for this sample.

#### 01. Why this, and why now

Three approaches were available: fine-tune a model on the corpus, build retrieval over it, or hand-curate an answer library. We scored them on the only axis that matters here — what happens when someone asks a question the corpus does not address, where a confident wrong answer does real harm.

**Figure — Of 40 deliberately out-of-scope questions, correct refusals by approach: retrieval with a distance gate 37, hand-curated library 40 but tiny coverage, fine-tuned model 6**

| name | value | label |
|---|---|---|
| Retrieval with a distance gate | 37 | 37 / 40 refused correctly |
| Hand-curated answer library | 40 | 40 / 40, but 200 questions total |
| Fine-tuned model | 6 | 6 / 40 refused correctly |

_Approach comparison, Jun 2026, on 40 deliberately out-of-scope questions. The fine-tuned model answered nearly all of them in a convincing voice, which is exactly the behaviour that makes it unusable here. The curated library refuses perfectly and cannot scale past a few hundred questions._

Refusal is the feature. Reframing the problem from "how do we always answer" to "how do we reliably decline" made the rest of the design follow.

#### 02. The problem as people experienced it

We collected 100 real questions from community forums rather than writing our own, then had three reviewers who know the corpus independently judge whether a returned passage addressed each. Real questions mattered: the ones people ask are vaguer and less well-formed than any test set we would have written.

| What people did | Where it broke | Evidence |
|---|---|---|
| Asked a general model | Fluent paraphrase attributed to him | Reproduced in 34 of 40 spot checks — a separate question set from the 40 refusal tests in section 01 |
| Searched the books by keyword | Missed anything phrased differently | Weakest on grief, guru and death questions |
| Asked a knowledgeable person | Not always available, answer unrecorded | The default for most in the community |
| Gave up on the question | No visibility into what was never asked | Unmeasurable, and probably the largest case |

The reframe: fluency was the enemy rather than the goal. The failure people already lived with was a well-written answer he never gave, and only grounding addresses that.

#### 03. My role and approach

I owned the fidelity definition, the corpus scope and the sequencing. Most decisions were about what the system is not permitted to do.

**Key decisions**

- **Refusal is a feature, not a failure.** A calibrated distance gate blocks out-of-corpus questions before generation runs, and we measure refusal correctness alongside answer quality — a system optimised only for answering will always find something to say.
- **Cut the corpus at the point of purity, not of size.** We included the commentary only as far as he personally translated it. That leaves real content on the table and means everything returned is unambiguously his.
- **Separate retrieval lanes for books and lectures.** Lecture transcripts vastly outnumber book passages, and one pool lets volume crowd out scripture.
- **A deterministic citation guard, not a prompt instruction.** Any citation not in the retrieved set is stripped by code. Asking a model not to fabricate references reduces the rate; a deterministic check takes it to zero, and only one of those is a guarantee.

#### 04. What was built

A retrieval engine over books, letters and verified lecture transcripts, held as roughly 32,000 chunks. A question is embedded, candidates are pulled from the book and lecture lanes separately, a re-ranker reorders them, and a calibrated distance gate refuses anything the corpus does not address. A deterministic guard removes any cited reference that was not retrieved. We prototyped the interface separately, and the two halves are not yet connected.

- **The cited passage is shown, not linked.** A citation the reader has to go and check is one nobody checks, and the premise is that the actual words are the answer.
- **A refusal reads as a statement, not an error.** "No teaching found on this" is a correct and complete response, and styling it like a failure would train people to rephrase until something came back.
- **The first-person voice mode always shows the cited words alongside.** Warmth makes answers accessible and could quietly substitute for verifiability, so the two are never separated.
- **The corpus boundary is stated on the page.** Users should know the commentary stops where his own translation stopped, rather than inferring the gap from an absence.

_Recreated interface. Layout is accurate; the question, answer and citation shown are illustrative. Happy to walk through the real engine in a conversation._

#### 05. Finding and what it changed

We agreed before the evaluation ran that fabricated citations had to reach zero rather than merely fall — a low rate is still a product that occasionally puts words in his mouth. Correct refusal was the guardrail, because a system can trivially reach zero fabrications by refusing everything, so the two were always measured together.

**Figure — Retrieval quality by question category after re-ranking, ranging from 0.71 on grief to 0.93 on philosophy, against a 0.75 acceptance line**

| name | value | n |
|---|---|---|
| Philosophy | 0.93 | 24 |
| Practice | 0.88 | 21 |
| Scripture reference | 0.86 | 18 |
| Death and afterlife | 0.79 | 14 |
| Guru and guidance | 0.76 | 12 |
| Grief | 0.71 | 11 |

_Threshold: 0.75 — 0.75 line_

_nDCG@6 by question category after re-ranking, n=100 total split as shown, judged independently by three reviewers, Aug 2026. The aggregate figure of 0.840 hides the finding: emotional questions retrieve worst and are the ones people most need answered, which is where the next work goes._

**Metrics**

| Value | Measure |
|---|---|
| 0.614 → 0.840 (n=100) | Retrieval quality, nDCG@6 after re-ranking |
| 17 → 0 | Fabricated citations per 100 answers |
| 37 (of 40) | Out-of-scope questions correctly refused (guardrail) |
| 0 | Users; engine and interface are not yet connected |

Scaling the evaluation from 20 questions to 100 changed the project's direction. The smaller set could not have surfaced either problem it found — a retrieval gap on grief questions and a re-ranker regression on conversational sources — because neither category had enough questions to show a pattern.

What the evaluation cannot tell us is whether any of this helps. It measures whether reviewers who know the corpus judge a retrieved passage relevant — a fair proxy for retrieval quality and no more. It says nothing about whether a person in grief found the teaching useful, or whether a correct refusal leaves them better off than a sympathetic invention.

`Engine configuration — bge-m3 dense retriever with separate book and lecture lanes · LLM re-ranker over candidates · calibrated distance gate for out-of-corpus refusal · deterministic citation guard stripping unretrieved references · roughly 32,000 corpus chunks · commentary included to the translator's own cutoff`

#### 06. What we'd do differently

We built an engine and an interface and never connected them, which is the fact that defines where this project stands. Both halves are good and neither has met a user, because each was sequenced to be finished rather than to meet the other early. A crude API between two half-built halves would have produced worse demos and far better information.

I would also have set the evaluation at 100 questions from the start. The 20-question set gave us months of confidence that turned out to be unearned — too small to show the grief-category gap that is now the most important thing we know.

> **Note on this sample.** This is a volunteer research project over published texts. The interface described in section 04 is a recreation, and all evaluation figures on this page are invented placeholders for this sample. I'm glad to walk through the real engine and its evaluation in a conversation.

---

### 5. Wi-R Body Area Network — YR23

| Field | Value |
|---|---|
| Slug | `wi-r-ban-yr23` |
| Company | Ixana |
| Years | 2024 - present |
| Track | silicon |
| Domain | Silicon |
| Status | production |
| Context | Ixana · 2024–present · Silicon |
| Role | Owner of first-silicon scope and launch gates — program manager, silicon delivery (RTL/AMS/PS India · HW/FW US) |
| Team | 5 functions across 2 sites — RTL, analog/mixed-signal and physical design in India; hardware and firmware in the US |
| Timeline | Feb 2023 – May 2024 |
| Stage | In production — the part under the BAN dev kit and every on-body reference design since |
| Link | https://www.ixana.ai/products/chips/wi-r-ban |

**Positioning.** The first Wi-R body-area part a partner could design in rather than admire — 0.12 nJ/bit at 5 Mbit/s, the silicon under the shipping dev kit and both published reference designs.

**Outcome (card copy).** The first Wi-R body-area part to reach customer hardware — the silicon under the BAN dev kit and every on-body reference design that followed.

**Problem.** Wi-R was a published result and a compelling demo, and no OEM puts a demo on a bill of materials. Turning it into a part meant committing to numbers across a whole data-rate ladder, on a date, against a specification an engineer could draw a schematic from before the silicon existed.

**What I did.** I ran delivery of first silicon across five functions and two sites. The founder owned the product bets; I owned the system that turned them into a shippable part on a date — the scope of first silicon, what shipped as errata against what forced a respin, and the launch gates.

**Result.** YR23 is in production holding 0.12 nJ/bit at 5 Mbit/s across a 16-device on-body network — the public specification — and it is the part under the shipping dev kit and both published reference designs. How first silicon was scoped, gated and released, escape by escape, is the worked example this page walks through.

**Evidence / demos**

- [Wi-R BAN product page](https://www.ixana.ai/products/chips/wi-r-ban)
- [Wi-R technology white paper](https://www.ixana.ai/blog/wi-r-technology-white-paper)

> **Confidentiality.** Silicon work. The part number, package photography and the full specification are public — the product page is linked below. Program figures on this page — schedule, escape counts, design-ins, interop results — are invented placeholders for this sample. No schematic, test report, customer name or internal document is shown.

#### 01. Why this, and why now

The commercial stake was specific. A hearables OEM and an AR-wearables maker had both seen Wi-R work on a bench and both asked the same question: what do we put in the schematic. Neither would staff a program against a research result, and if the answer stayed “a demo and a paper” we lost the first design-ins.

What those teams were weighing was an energy budget. A wearable running for days off a small cell spends most of it on the radio, and every alternative on their shortlist sits an order of magnitude or more above Wi-R on energy per bit.

**Figure — Energy per bit relative to Wi-R BAN: Wi-Fi and Bluetooth LE 83 times higher, ultra-wideband 8 times higher**

| name | value | label |
|---|---|---|
| Wi-Fi / Bluetooth LE | 83 | 83× — about 10 nJ/bit |
| Ultra-wideband | 8 | 8× — about 1 nJ/bit |
| Wi-R BAN (YR23) | 1 | 1× — 0.12 nJ/bit at 5 Mbit/s |

_Energy per bit across the links these segments were choosing between, expressed as a multiple of YR23. Alternative figures are Ixana's published comparison; the YR23 figure is from the public specification. Plotted as a ratio because on an absolute axis the Wi-R bar is invisible — which is the argument, but not a readable chart._

That gap is why a part was worth building rather than a paper worth citing, and why first silicon had to be honest about the whole ladder: an energy claim at one operating point is a headline, and a design-in needs the number at the rate the product will run.

#### 02. The problem as people experienced it

Rather than ask engineers how bring-up went, I audited the bench logs from the first 24 evaluation boards built on first silicon and coded every stall by cause. The logs were kept for debugging, not for me, which is what makes them worth reading.

| What they did | Where it stalled | Evidence |
|---|---|---|
| Powered the board and looked for a link | Electrode trim differed board to board | 19 of 24 needed a manual trim pass |
| Reached for a scope on the electrode node | Probe capacitance loaded the node and hid the signal | 11 of 24; 3 concluded the part was dead |
| Compared against the reference board | Reference had a trim nobody had documented | 8 of 24; the single longest stall |
| Filed it as a silicon bug | Most were board or setup issues, not the die | 26 of 41 escapes closed without a die change |

**Figure — Days from board build to first stable on-body link across 24 evaluation boards, clustered between 7 and 14 days against a 14-day gate**

| name | value |
|---|---|
| 3–6 | 3 |
| 7–10 | 7 |
| 11–14 | 8 |
| 15–20 | 4 |
| 20+ | 2 |

_Ceiling: None — 14-day gate_

_Bring-up time across the first 24 evaluation boards, Sep–Dec 2023, coded from bench logs. Median 11 days. The six boards past the gate are the finding: they were not worse silicon, they were boards whose trim drifted furthest from the reference — a characterisation gap, not a die defect._

The reframe: what looked like an unstable part was an uncharacterised one. The die behaved consistently; the electrode interface around it did not, and nothing in our documentation told an engineer what good looked like.

#### 03. My role and approach

I should be precise about what I owned, because a title on a silicon program is easy to inflate. The founder owned the product bets — that Wi-R should exist, which market it enters, what the part is for. I owned the delivery system that turned those bets into a shippable part on a date: five functions, two sites, one schedule, and the gates that decided what shipped.

That system is where delivery reality fed back into product decisions. Validation capacity set the tapeout date. Which escapes were tolerable set what first silicon could claim. Whether a workaround fit in firmware decided whether a feature shipped at all.

**Key decisions**

- **Scope first silicon to what an OEM can commit to, not what demos best.** Scope arguments were settled by asking what an engineer needs before drawing our part into a schematic.
- **One data-rate ladder fully characterised, not two modes half-characterised.** A second mode would have doubled the validation matrix against fixed capacity, and produced two sets of figures with caveats on both.
- **Validation capacity set the tapeout date.** Design was never the binding constraint; the bench hours to prove the part were. Scheduling backwards from validation is why the date held.
- **Run the program on instrumented data, not status meetings.** Stage timing and delay causes came from the delivery tooling built for it — instrumented stage and capacity data. Across nine time zones a shared record beats a meeting half the room attends asleep.

#### 04. What I cut

**Scope**

- _Shipped:_ 100 kbit/s – 5 Mbit/s ladder, fully characterised · Up to 16 devices per on-body network · Sub-1 ms link latency · Host interface with a reference driver · Characterised electrode interface and trim procedure
- _Deferred:_ Higher-rate mode (became YR31) · On-die per-unit trim storage · Multi-network coexistence
- _Cut:_ On-die link encryption · Second host interface option · Field-updatable PHY parameters

On-die link encryption was the hardest cut. It failed on two constraints at once: die area against a floorplan already closed, and a validation matrix we had no bench hours to cover before the committed tapeout. Wi-R’s security position is physical — the field stays within about 0.1 m of the body, so there is no signal at 5 m to intercept — and the reference driver encrypts host-side where compliance needs it. The cost is that anyone needing crypto in silicon waits for a later part.

#### 05. How I got it agreed

The post-silicon validation lead wanted to hold first silicon for a respin rather than release it with documented errata and firmware workarounds. His argument was not caution for its own sake: a part that needs a workaround gets designed in wrong by somebody who never opened the errata sheet, and when that board does not link they blame the silicon.

He was right about how errata sheets get read, so I stopped arguing schedule and split the 41 escapes into two kinds — those that change what the part can do, and those that change how you must drive it. Only three were the first kind, and none touched the paths the launch segments used. That turned an argument about risk appetite into a question about three specific defects.

He agreed on two conditions I had not planned to offer. Every workaround ships as code in the reference driver rather than a note in a PDF, so a partner cannot design it in wrong by skipping the document — six firmware weeks, and the best thing on this page. And any later escape in a launch-segment path reopened the respin conversation with him holding the pen.

#### 06. What was built

A body-area transceiver in a package a wearable can carry, moving 100 kbit/s to 5 Mbit/s across up to 16 devices on one body at sub-millisecond latency, at 0.12 nJ/bit at full rate. Its range is deliberately asymmetric — 10 to 15 m along the body, about 0.1 m off it — which is the security model, not a limitation.

**Interface — Wi-R BAN YR23 transceiver package**

- **The part number is on the package face.** Support threads on first silicon stalled repeatedly on which revision a partner actually held. Marking it externally removed a round trip from most of them.
- **One package, no variants at launch.** A second package option was requested before we had shipped the first. Two packages means two qualification campaigns against the validation capacity that was already setting our date.
- **Pin-out committed before first silicon returned.** OEMs cannot start a board until the pin-out is frozen. Publishing it early cost us the option to change it and bought two design starts that would otherwise have waited a quarter.
- **The electrode interface is specified, not left open.** The 24-board audit showed the interface around the die was what varied. Specifying it turned the largest source of bring-up stalls into a documented procedure.

_Ixana YR23 package, from Ixana's published product photography. The package, part marking and full specification are public; internal design detail is not shown. Happy to walk through the real program in a conversation._

**Gallery**

- **Untitled**  The network YR23 serves — up to 16 devices on one body, from head-worn to foot, linked along the surface rather than through the air. Range along the body is 10–15 m; off the body it stops at roughly 0.1 m, which is what makes the link private without encryption.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Schedule vs a clean part | Ship with documented errata, workarounds in the driver | Six firmware weeks, and a permanent obligation to keep driver and errata in step |
| Feature breadth vs validation capacity | One characterised ladder; encryption and second mode out | Two evaluations paused waiting for silicon-level crypto |
| Design freedom vs design-in speed | Pin-out frozen before first silicon returned | No room to fix a pin-out mistake without a respin we had refused |
| Local autonomy vs one schedule | Single gate calendar across both sites | Real meeting-hour cost on two teams, permanently and unevenly |

#### 08. Impact and outcomes

Before tapeout we agreed first silicon failed on one condition: if it could not hold a sustained on-body link at full rate on an ordinary person without a metal fixture, it went back for a respin before any customer saw it. Interop was the guardrail, so the date could not be won by shipping a part that only worked on our own reference board.

**Metrics**

| Value | Measure |
|---|---|
| 0.12 (nJ/bit @ 5 Mbit/s) | Energy per bit delivered on first silicon |
| 0 (respins) | Die revisions between first silicon and production |
| 11 days | Median board build to first stable on-body link |
| 41 (3 blocking) | Escapes found after tapeout |
| 4 | OEM programs designed in before the dev kit existed |
| 94% (of link attempts across 7 host platforms) | Interop pass rate across host platforms (guardrail) |

**Figure — The 41 post-tapeout escapes by category: analogue front-end trim 15, link state machine 11, host interface timing 7, power sequencing 5, clock lock 2, other 1 — three categories carry 80 percent**

| name | value |
|---|---|
| AFE trim | 15 |
| Link FSM | 11 |
| Host timing | 7 |
| Power seq. | 5 |
| Clock lock | 2 |
| Other | 1 |

_Cutoff: 80 — 80% of escapes_

_Escapes by category, Sep 2023 – Feb 2024, from the bring-up defect log. Three categories carry 80%, and all three are addressable in firmware or documentation rather than in the die — which is the whole reason a respin was avoidable rather than merely avoided._

**How we counted.** An escape is an issue found after tapeout that a pre-tapeout check should have caught, logged whether or not it turned out to be the die. Blocking means it could not be closed in firmware or documented as a workaround at the time of triage — the three that carried the label were exactly that when triaged, and later driver work closed all three, which is the reclassification the summary counts. Board and setup problems stay in deliberately: 26 of the 41 were never silicon, and excluding them would hide where bring-up time actually went. The four OEM programs counted here are pre-kit direct engagements, not the kit-mediated design-ins the dev-kit page counts.

`Part configuration — YR23 Wi-R BAN transceiver · 100 kbit/s – 5 Mbit/s · 0.12 nJ/bit at 5 Mbit/s · up to 16 devices per network · sub-1 ms link latency · 10–15 m along-body, ~0.1 m off-body containment · physical-layer security by E-field confinement · host interface with reference driver`

#### 09. What I'd do differently

I scheduled the die and left the interface around it to look after itself. Every expensive surprise in section 02 came from the electrode interface rather than the silicon, and it was the one part of the system with no owner and no line on the schedule — not a design deliverable, not a validation deliverable, so it belonged to nobody.

I would also publish the errata differently. Shipping workarounds in the driver was right, and quietly created a second problem: partners who take the driver get the fix invisibly and never learn the constraint, so when they write their own integration they reintroduce it.

> **Note on this sample.** This is a sample portfolio page about real silicon. The part number, package photography and full specification are public and linked above. Program figures — schedule, escape counts, design-ins, interop results, team shape — are invented placeholders and should be replaced with real data before this page is used. No schematic, test report or customer name is shown. I'm glad to walk through the real program and its numbers in a conversation.

---

### 6. NeuroAdapt — spike-train feature extraction for a science compiler

| Field | Value |
|---|---|
| Slug | `neuroadapt-agentic-rag-engine-for-neuroscience-research` |
| Company | NeuroAdapt, IISc Bangalore |
| Years | 2023 - present |
| Track | ai |
| Domain | Research tooling |
| Status | research |
| Context | IISc Bangalore · 2023–2026 · Research tooling |
| Role | Product lead, module design |
| Team | 3 researchers, 1 engineer |
| Timeline | Oct 2023 – Mar 2026 |
| Stage | Research — validated on simulated data only |
| Link | /demo/neuroadapt |

**Positioning.** Replaced ad-hoc analysis scripts with one defined feature set, so two labs computing burst index finally mean the same thing.

**Outcome (card copy).** Replaced ad-hoc spike-train scripts with one standardized feature set, so two labs computing "burst index" finally mean the same thing.

**Problem.** Spike-train analysis has no standard vocabulary. We audited 22 published analyses and found four incompatible definitions of burst index and three of synchrony in use, each in a private script — so two papers can report the same metric name for different quantities.

**What we did.** We defined a two-tier feature set — single-unit statistics and population dynamics — implemented it once, and made the output land in a standard neuroscience format, so the definitions travel with the data instead of living in someone's repository.

**Result.** On simulated data with known ground truth the pipeline recovered the planted structure: 87% of population variance in two principal components, and 102 of the synchronous unit's 120 spikes coincident within 5 ms, a fraction of 0.85. What it has not shown is anything about real recordings.

**Evidence / demos**

- [Open the working demo — the pipeline, run on the whitepaper's validation dataset](/demo/neuroadapt)
- [Or start where the argument starts, at one metric under four published definitions](/demo/neuroadapt?view=definitions&metric=burst&unit=1)
- [NeuroAdapt whitepaper (PDF)](/static/docs/neuroadapt-whitepaper.pdf)
- [Demo recording and project documents (Drive)](https://drive.google.com/drive/u/0/folders/1B0mtA9-xkNbbo6ZUXztuHZiMmlovNtLw)

> **Confidentiality.** Academic collaboration. Every figure on this page is the validation run described in the whitepaper, on simulated spike trains with known ground truth; no real recording and no unpublished collaborator result is shown.

#### 01. Why this, and why now

The obvious contribution here is a better analysis method. We chose the less interesting one — standardising the existing methods — because the audit suggested the bottleneck was not analytical power but the inability to compare two results. A better burst index is a fifth definition.

**Figure — Of 22 audited published analyses: 19 used a private script, 14 could not be reproduced from the paper alone, 11 reported a metric under a name used differently elsewhere, 3 published their code**

| name | value | label |
|---|---|---|
| Analysis in a private script | 19 | 19 / 22 |
| Not reproducible from the paper | 14 | 14 / 22 |
| Ambiguous metric name | 11 | 11 / 22 |
| Published their code | 3 | 3 / 22 |

_Literature audit, 22 spike-train analyses published 2019–2023, coded for reproducibility and definitional clarity. The bottom bar decided the project: with three of 22 publishing code, a standard depending on people sharing implementations was never going to work — it had to travel inside the data format._

#### 02. The problem as people experienced it

Rather than survey researchers about reproducibility, which produces agreement and no information, we took 22 published analyses and tried to determine from each paper what had been computed.

| What the analysis did | Where it broke | Evidence |
|---|---|---|
| Reported a burst index | Four incompatible definitions in use | 11 of 22 did not state which |
| Reported synchrony | Three definitions, different normalisations | 7 of those 11 |
| Described the pipeline in prose | Preprocessing choices omitted | 14 of 22 not reproducible |
| Released data without features | Next lab recomputes from scratch | 19 of 22 used a private script |

The reframe: this is a metadata problem wearing an analysis problem's clothes. The computation is not hard and is not where the loss occurs — the loss occurs because the definition is separated from the number the moment the number is written down.

#### 03. My role and approach

I led the design of the feature set and the decision about where the output goes, working with the researchers who would use it. The scope discipline was refusing metrics that had no agreed definition, however often they were requested.

**Key decisions**

- **Two tiers, deliberately separated.** Single-unit statistics and population dynamics are computed independently, so a new unit-level metric can be added without disturbing population analysis or invalidating anything already computed.
- **Output into a standard format, not a bespoke table.** Writing into an established container is what makes the definition travel with the data. A better CSV would have reproduced the exact failure the audit found.
- **One definition per metric name, stated in the output.** Where four definitions existed we picked one and recorded which. That will annoy anyone using a different one, and it is the only thing that makes two results comparable.
- **Report generation and querying on top, not underneath.** The retrieval layer over generated reports is useful and is not the contribution — keeping it downstream means the feature set stands alone if the rest is discarded.

#### 04. What was built

A feature extraction module that ingests sorted spike trains and computes unit-level metrics — firing rate, inter-spike-interval coefficient of variation, burst index, Fano factor — alongside population-level metrics including pairwise cross-correlations, synchrony indices and principal component analysis. It generates visualisations, compiles a multi-page report, and writes structured outputs into a standard container plus CSV and JSON, with a retrieval layer allowing the results to be queried in natural language.

**Interface — A generated feature report: nine preprocessing choices listed with what each one changes, then a unit-level table whose column headings carry the definition of each metric, then the population tier beginning below it.**

[Open this report in the demo](/demo/neuroadapt?view=report)

- **Every metric carries its definition in the column heading.** This is the whole intervention. A burst index without its threshold is exactly the artefact the audit found 11 times.
- **Preprocessing choices are listed, not implied.** Nine of them, each with the number it changes. 14 of 22 audited analyses were irreproducible because of omissions like these.
- **The two tiers are labelled and kept apart.** They have different assumptions and different reliability, and merging them invites reading a population claim as a unit-level one.
- **Each figure names the stored array it was drawn from.** Figures read the feature table rather than the spike times, which is what guarantees a figure and a table cannot disagree — a failure we hit twice during development.

_The report the module generates, running on the whitepaper’s validation dataset: five units, ten seconds, three planted structures. The spike times are simulated and every number is computed from them in the browser. Happy to walk through the real module on a recording in a conversation._

**Gallery**

- **The run.** — [Run it and compare the hashes](/demo/neuroadapt?view=run)  Nine stages. Two are the model and neither of them computes a number — the interpretation is written after every value already exists. The count of metrics printed without a definition is computed at render time, not asserted.
- **Tier one, single unit.** — [Open unit 1 and its definitions](/demo/neuroadapt?view=units&unit=1)  Firing rate, ISI coefficient of variation, burst index and Fano factor, each column headed by the definition used to compute it. Unit 1 is the planted bursting unit: CV 3.16 against 1.07 for the Poisson unit.
- **Tier two, population.** — [Open the correlogram](/demo/neuroadapt?view=population&pair=4-5)  The cross-correlogram of the planted pair: 102 of unit 4’s 120 spikes have a unit 5 spike within 5 ms, and the histogram is flat everywhere else. The synchrony figure is shown against its chance level, because without one it is unreadable.
- **The reason the module exists.** — [Try it on another unit](/demo/neuroadapt?view=definitions&metric=burst&unit=1)  One spike train under the four definitions of burst index the audit found in use: 0.82, 0.82, 1.00 and 8.6. Two of them agree here and disagree on the next unit. Nothing on this screen is a disagreement about data.
- **Where the definition ends up.** — [Open the container](/demo/neuroadapt?view=export&format=nwb)  Written into NWB beside the spikes it came from, one description per column, with the same parameter hash in the CSV and the JSON. A better spreadsheet would have reproduced the exact failure the audit found.

_The demo runs the whitepaper’s validation design in the browser from fixed seeds: every metric, figure and generated sentence is computed from the spike times at render time. It exists so the argument on this page can be checked rather than taken on trust — change the unit, re-run and compare the feature hash, or push an ungrounded number into the generated interpretation and watch it be withheld._

#### 05. Finding and what it changed

We agreed before running anything that the pipeline failed unless it recovered all three planted structures — a synchronous pair, a bursting unit and a regular one — with the top two components carrying at least 80% of variance. Definitional drift was the guardrail: any metric shipped without a written definition in the output would reproduce the problem we were fixing, and that count has stayed at zero.

**Figure — Unit loadings on the first two principal components: the bursting unit alone on PC1, the synchronous pair together on PC2, the other two at the origin**

| x | y | group |
|---|---|---|
| 0.903 | 0.429 | 0 |
| 0.007 | 0.053 | 2 |
| 0 | 0 | 2 |
| 0.285 | 0.573 | 1 |
| 0.322 | 0.696 | 1 |

_Principal component analysis of the simulated recording, five units binned at 100 ms, covariance basis. The first two components carry 87% of the variance. Unit 1 sits alone on the first component, which is “did a burst happen in this bin”; units 4 and 5 sit together on the second, which is “did a synchronous event happen”; units 2 and 3 sit at the origin, which is the correct answer for them. Signs are dropped because an eigenvector’s sign is arbitrary. This is the demo’s own output — the same numbers appear under Population-level features._

**Metrics**

| Value | Measure |
|---|---|
| 87% (bar was 80%) | Population variance in the first two components |
| 0.85 | Coincidence fraction, the planted synchronous pair |
| 102 | Coincident spikes at zero lag, of that unit’s 120 |
| 0 | Metrics shipped without a written definition (guardrail) |

What changed is the sequencing of the wider project. The standardised layer sits between spike sorting and hypothesis testing, and having it defined means downstream behavioural modelling can assume a feature set rather than negotiate one per experiment. Two collaborating groups have adopted the definitions, which matters more than any individual number above.

What the study cannot tell us is how any of this behaves on real recordings. Every figure comes from simulated data with no spike-sorting error, and sorting error is the dominant source of noise in practice — a metric that recovers planted structure perfectly may be quite sensitive to units merged or split upstream. This validates the implementation and says nothing about the science.

`Module configuration — unit-level: firing rate, ISI coefficient of variation, burst index (ISIs under 20 ms), Fano factor (100 ms bins) · population-level: coincidence fraction (± 5 ms), binned Pearson correlation, cross-correlogram ± 50 ms in 1 ms bins, PCA on the covariance of binned counts · outputs appended to NWB plus CSV and JSON, each column carrying its definition · report figures interpreted by gpt-4o-mini at temperature 0 · reports indexed in Weaviate with text-embedding-3-large`

#### 06. What we'd do differently

We validated on simulated data because it gives an unambiguous answer, and that quietly deferred the harder question for two years. A parallel track against one real recording with an independently sorted reference would have cost weeks and told us whether the metrics survive sorting error — the thing anyone adopting them wants to know first.

I would also have started the definitional conversation with more than two groups. Picking one definition per metric was right, and the choice is currently endorsed by the collaborators who were in the room. A standard two labs agree on is a convention; the audit was arguing for something wider, and we built the artefact without doing the work that would make it one.

> **Note on this sample.** This is academic research validated on simulated data. The report in section 04 and every figure on this page come from the whitepaper’s validation dataset — five units, ten seconds, three planted structures — re-run in the demo, where the numbers are computed in the browser rather than stored. No real recording and no unpublished collaborator result is shown. I’m glad to walk through the real module and its validation in a conversation.

---

### 7. Wi-R Near Field Electric — XA-NFE3001

| Field | Value |
|---|---|
| Slug | `wi-r-nfe-xa-nfe3001` |
| Company | Ixana |
| Years | 2024 - present |
| Track | silicon |
| Domain | Silicon |
| Status | production |
| Context | Ixana · 2024–present · Silicon |
| Role | Owner of the gen-2 specification review — program manager, silicon delivery (RTL/AMS/PS India · HW/FW US) |
| Team | The same 5 functions across 2 sites as the XA-NFE2001 programme |
| Timeline | Mar 2025 – Feb 2026 |
| Stage | In production — the higher-throughput part on the NFE line, alongside XA-NFE2001 |
| Link | https://www.ixana.ai/products/chips/wi-r-nfe |

**Positioning.** A gen-2 the pipeline asked for: 13.5 Mbit/s of real throughput, which is what turns a sealed enclosure into a service port instead of a demo.

**Outcome (card copy).** Successor near-field part: 20 Mbit/s PHY, ~13.5 Mbit/s real throughput — a 100 MB firmware image inside a one-minute service window, on the same sub-6 mW budget.

**Problem.** XA-NFE2001 opened the near-field line and then kept losing the same argument. Fourteen evaluations reached a requirement sheet and stopped, and reading those sheets against our characterisation data showed why: partners were sizing real payloads, and at gen-1 throughput a 100 MB firmware image took nearly four minutes.

**What I did.** I ran the review that turned those requirement sheets into the gen-2 specification. This spin was pulled by a pipeline we could name rather than pushed by a roadmap, so the requirements were somebody else's document and my job was to hold scope to what those documents actually said.

**Result.** Real throughput went from about 3.4 to 13.5 Mbit/s — the announcement's own figures — which puts a 100 MB payload inside a one-minute service window. Gen-1 stayed in production for the designs that need its longer reach, so the upgrade stranded nobody by construction. The pipeline that pulled this spin, and what converted, is the worked example further down.

**Evidence / demos**

- [Wi-R NFE product page](https://www.ixana.ai/products/chips/wi-r-nfe)
- [XA-NFE3001 announcement](https://www.ixana.ai/blog/xa-nfe3001-20mbps-near-field-electric)

> **Confidentiality.** Silicon work. The part, its specification, its throughput figures and its application framing are public — the announcement is linked below. Pipeline figures on this page — stalled-evaluation counts, conversion, requirement sheets, socket retention — are invented placeholders for this sample. No schematic, test report, requirement document or customer name is shown.

#### 01. Why this, and why now

The case for this spin was unusual in that I did not have to make it. Fourteen evaluations had already written down what they needed and told us we did not meet it, so the demand was documented, quantified and sitting in a folder. What I had to do was stop us spending it on something else.

The alternative was a gen-1 derivative for a new consumer segment — cheaper, lower rate, high volume. It is a real opportunity with the property that makes speculative markets seductive: nobody can prove the number wrong. The pipeline number was written by people who had already qualified the part.

**Figure — Annual units by opportunity: 480 thousand named in the stalled evaluations' own requirement sheets, 200 thousand estimated for a gen-1 consumer derivative, 90 thousand already shipping on gen-1**

| name | value | label |
|---|---|---|
| Stalled pipeline (14 evals) | 480 | 480k — named in their own requirement sheets |
| Gen-1 consumer derivative | 200 | 200k — our estimate, no committed volume |
| Gen-1 sockets shipping | 90 | 90k — the base to protect |

_Opportunity sizing, Feb 2025. The top bar is not our forecast — it is the sum of volumes partners wrote into their own requirement sheets, which is a different quality of number from the middle bar. That asymmetry, not the size of the gap, decided the year._

Timing mattered too. Sealed enclosures were becoming the default across industrial and medical hardware at the same moment firmware images crossed a hundred megabytes, so the gap between what a near-field link could carry and what a service workflow needed was widening on its own.

#### 02. The problem as people experienced it

Fourteen evaluations had supplied a written requirement sheet before stalling, so rather than interview anyone I put those sheets beside our own characterisation data for gen-1 and scored each line met or missed. Requirement sheets are the most honest artefact a partner produces: written to be held to, before anyone is invested in the answer.

| What the sheets asked for | Where gen-1 landed | How many asked |
|---|---|---|
| 100 MB payload inside a service window | About 235 s — nearly four minutes | 11 of 14 |
| Goodput of 10 Mbit/s or better | About 3.4 Mbit/s real throughput | 9 of 14 |
| Sub-millisecond latency | Met, comfortably | 12 of 14 |
| Operation at 1–5 cm through a sealed wall | Met, but tuned for longer range than asked | 8 of 14 |

**Figure — Gen-1 measured against the six requirement lines the sheets specified: latency and range pass, throughput and payload time fail by a wide margin**

| name | value | target | max | label | targetLabel | pass |
|---|---|---|---|---|---|---|
| Goodput (Mbit/s) | 3.4 | 10 | 15 | 3.4 vs 10 | required | False |
| 100 MB transfer | 235 | 60 | 250 | 235 s vs 60 s | required | False |
| 50 MB transfer | 118 | 30 | 250 | 118 s vs 30 s | required | False |
| Latency (ms) | 0.9 | 1 | 2 | 0.9 vs 1.0 | required | True |
| Range at 5 cm | 1 | 1 | 1.2 | met | required | True |
| Sealed-wall operation | 1 | 1 | 1.2 | met | required | True |

_Gen-1 characterisation against the fourteen requirement sheets, Feb 2025. Bars are our measured values, markers the required ones. Three lines pass and three fail, and the three that fail are one failure counted three ways — everything downstream of throughput. Latency is scored at its 0.9 ms worst case across the range profiles, not the 0.6 ms median the XA-NFE2001 page reports, because a requirement line is held to the worst case._

The reframe: we had been reading these as separate objections and answering them separately. They were one number. Nobody wanted a faster link for its own sake; they wanted a payload moved inside a window a technician would stand still for.

#### 03. My role and approach

On this programme the delivery loop did the product definition outright. The founder owned whether the near-field line deserved a second part; I ran the review that decided what it had to be — reading fourteen requirement sheets against our characterisation data and converting the gap into a specification the design team could work from.

That is a narrower job than it sounds, and the discipline is in the refusals. A requirements list assembled from partner documents is easy to defend and easy to inflate, because every line has a customer name behind it.

**Key decisions**

- **Specify to the sheets, not to the roadmap.** Every requirement in the gen-2 spec traces to a line in a partner document scored as missed. Anything we merely thought would be good was out of scope.
- **Buy throughput with range.** Gen-2 runs 1–15 cm where gen-1 spanned 5–25 cm. The sheets asked for 1–5 cm through a sealed wall, so the range we gave up was range nobody in the pipeline used.
- **Design to goodput, not to PHY rate.** The number a partner plans a workflow with is real throughput. Specifying 20 Mbit/s PHY and reporting 13.5 Mbit/s goodput keeps the honest figure the headline one.
- **Gen-1 stays, and stays supported.** The upgrade could not strand sockets already shipping. Designs that need 25 cm keep buying the part that reaches it.

#### 04. What I cut

**Scope**

- _Shipped:_ 20 Mbit/s PHY, about 13.5 Mbit/s real throughput · Sub-0.2 ms latency · 1–15 cm operating range · Under 6 mW active at full rate · Host interface and reference driver shared with gen-1
- _Deferred:_ Second host interface option · Per-profile power tuning exposed to the host · Reduced-rate low-power bin
- _Cut:_ Operation through fully conductive enclosures · On-die presence classification · Runtime-adjustable range

Operation through a fully conductive enclosure was the hardest thing to refuse, and the most asked for — industrial partners with metal housings wanted the sealed-service story their plastic-cased neighbours were getting. It is not a scheduling constraint: an enclosed conductive shield blocks electric-field coupling, so the only route was a second inductive front end beside the electric one. That costs die area, a second validation campaign, and the RF-silent property that is why these buyers are here. Enclosure-material guidance and an aperture pattern in the reference layout cover the partly-conductive cases; the datasheet says plainly that a full Faraday cage is out of scope.

#### 05. How I got it agreed

The founder wanted the gen-1 consumer derivative instead. His reasoning was not casual: a cheaper low-rate part aimed at a high-volume consumer tap has a bigger ceiling than any industrial pipeline, and a company that only serves the customers it already has stops finding new ones. He has been right about that before.

Arguing about which market was larger was unwinnable, because the honest answer is his. So I stopped comparing markets and compared the quality of the two numbers. The pipeline 480 thousand were written by partners into their own requirement sheets after qualifying the part; the derivative 200 thousand were ours. That reframed it from which opportunity is bigger to which number we would still believe in a year.

He agreed, and attached a condition I had not planned for. The gen-2 spin had to carry the hooks the derivative would need — a documented reduced-rate, low-power operating point selectable at provisioning — so the derivative becomes a binning decision rather than a third spin. It cost validation weeks we had not budgeted, and it is why a derivative is now a quarter of work instead of a year.

#### 06. What was built

A near-field transceiver moving about 13.5 Mbit/s of real data at 1–15 cm, under 6 mW, at sub-0.2 ms latency, with no radiated RF. In workflow terms: 25 MB in about fifteen seconds, 50 MB in thirty, and a 100 MB firmware image plus its validation logs in fifty-nine — the number that decides whether a sealed device can be serviced without opening it.

**Interface — Wi-R NFE XA-NFE3001 transceiver package**

- **Same host interface and driver as gen-1.** A partner already evaluating XA-NFE2001 moves without a firmware project, which is what makes the installed base an asset rather than a migration to manage.
- **Full part number on the package face.** Two NFE parts now ship concurrently with different range envelopes. A design that reads the wrong marking builds against the wrong specification.
- **Range tuned for 1–15 cm, not gen-1's 5–25.** The trade the requirement sheets licensed. Tighter coupling is what the throughput was bought with, and nobody in the pipeline was using the range we gave up.
- **No second front end for metal enclosures.** The cut in section 04, visible as an absence. Adding one would have cost the RF-silent property these buyers came for.

_Ixana XA-NFE3001 package, from Ixana's published product photography. The package, part marking and specification are public; internal design detail is not shown. Happy to walk through the real programme in a conversation._

**Gallery**

- **Untitled**  The workflow the part exists for — a handheld against a sealed enclosure, moving a firmware image and pulling logs back without a connector. The enclosure stays closed, which is the commercial argument; throughput is what makes it a workflow rather than a demonstration.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Throughput vs range | 1–15 cm instead of gen-1's 5–25 cm | Any design wanting distance stays on gen-1 permanently |
| Documented pipeline vs new segment | Serve the fourteen; carry hooks for the derivative | Validation weeks on an operating point nothing ships against yet |
| Scope discipline vs partner goodwill | Only requirement lines scored as missed | Reasonable asks declined with a customer's name attached to each |
| Coverage vs the RF-silent promise | No inductive front end for metal enclosures | A whole class of industrial housing is out of scope, in writing |

#### 08. Impact and outcomes

Before the spin was committed we agreed it failed on one condition: if gen-2 could not move a 100 MB payload inside a one-minute service window on partner hardware, the sealed-service workflow stayed theoretical. Gen-1 socket retention was the guardrail — the upgrade was not to be won by stranding designs that had already chosen us.

**Metrics**

| Value | Measure |
|---|---|
| 3.4 → 13.5 (Mbit/s goodput) | Real throughput, gen-1 to gen-2 |
| 100 MB (in 59 s) | Largest payload inside the one-minute window |
| 9 of 14 | Stalled evaluations converted to a socket |
| 6 of 6 | Requirement lines now met |
| 1–15 cm (from 5–25 cm) | Operating range, tightened to buy throughput |
| 0 | Gen-1 sockets lost or forced to requalify (guardrail) |

**Figure — Transfer time against payload size: gen-1 leaves the one-minute service window between 25 and 50 megabytes, gen-2 stays inside it to 100 megabytes**

| series | 25 MB | 50 MB | 100 MB |
|---|---|---|---|
| XA-NFE2001 (gen-1) | 59 | 118 | 235 |
| XA-NFE3001 (gen-2) | 15 | 30 | 59 |

_Threshold: 60 — 60 s window_

_Transfer time by payload, computed from published goodput for both parts and confirmed on partner benches, Jan 2026. The shaded band is the window the requirement sheets specified. Gen-1 exits it before 50 MB; gen-2 reaches 100 MB with a second to spare, which is thin on purpose — the sheets asked for a minute, not for headroom._

**How we counted.** Throughput is goodput at the host application, not PHY rate: payload bytes delivered divided by wall-clock session time, including link establishment. A converted evaluation issued a design commitment against gen-2 — a purchase order or a schematic we have seen — so evaluations that merely restarted are excluded, and nine is smaller than the enthusiasm suggested. The fourteen are gen-2 conversions of evaluations that had already stalled on gen-1 — fourteen of the same 26 NFE-line evaluations the gen-1 page counts, not a later intake.

`Part configuration — XA-NFE3001 Wi-R NFE transceiver · 20 Mbit/s PHY, ~13.5 Mbit/s goodput · under 6 mW active at full rate · 1–15 cm operating range · sub-0.2 ms latency · RF-silent electric-field coupling · not intended to couple out of a fully enclosed conductive shield · host interface and reference driver shared with XA-NFE2001`

#### 09. What I'd do differently

I treated the requirement sheets as a specification and never asked what was missing from them. They told me precisely what the fourteen wanted and nothing about partners who never got as far as writing one — and the metal-enclosure request in section 04 came from exactly that population, late, by which point it was a physics answer rather than a design question.

I would also have set the service window with a margin. Fifty-nine seconds against a sixty-second requirement is a specification met and an engineering position with nowhere to stand: any partner whose enclosure attenuates more than our reference case falls outside a window we told them we were inside.

> **Note on this sample.** This is a sample portfolio page about real silicon. The part, its specification, throughput figures and application framing are public and linked above. Pipeline figures — stalled-evaluation counts, conversion, requirement sheets, socket retention and volumes — are invented placeholders and should be replaced with real data before this page is used. No schematic, test report or customer name is shown. I'm glad to walk through the real programme and its numbers in a conversation.

---

### 8. Wi-R Near Field Electric — XA-NFE2001

| Field | Value |
|---|---|
| Slug | `wi-r-nfe-xa-nfe2001` |
| Company | Ixana |
| Years | 2024 - 2026 |
| Track | silicon |
| Domain | Silicon |
| Status | production |
| Context | Ixana · 2024–2026 · Silicon |
| Role | Owner of second-line delivery against one validation pool — program manager, silicon delivery (RTL/AMS/PS India · HW/FW US) |
| Team | The same 5 functions across 2 sites as the BAN program, running both lines concurrently |
| Timeline | Jan 2024 – Dec 2025 |
| Stage | In production — launched December 2025 |
| Link | https://www.ixana.ai/products/chips/wi-r-nfe |

**Positioning.** The second product line: a touch-range electric-field link at 5 Mbit/s under a milliwatt, sold against NFC rather than against Bluetooth.

**Outcome (card copy).** The near-field electric part that moved Wi-R from a lab demonstration to a component a partner could design into a product.

**Problem.** One product line makes a company a bet. Wi-R had proven itself on the body, and the demand arriving through the front door was increasingly not body-worn — device-to-device, at touch range, from buyers who had already rejected NFC on throughput and Bluetooth on emissions.

**What I did.** The founder owned the bet that a near-field line should exist. I owned turning it into a delivered part while the BAN program kept its dates: validation capacity shared between two lines, a scope built for a different buyer, and the launch gates for a part that had to work on hardware we did not design.

**Result.** XA-NFE2001 launched at 5 Mbit/s under a milliwatt — over 50× NFC’s energy efficiency and ten times its throughput, per the published comparison — with the physics written up in an arXiv paper. It shipped as a second line while the BAN program kept its own dates, and the interop matrix that qualified it is the worked example further down.

**Evidence / demos**

- [Wi-R NFE product page](https://www.ixana.ai/products/chips/wi-r-nfe)
- [Research paper (arXiv)](https://arxiv.org/pdf/2512.07167)

> **Confidentiality.** Silicon work. The part number, specification and comparison claims are public — links below. Program figures on this page — sample fulfilment, design-ins, interop results, schedule and team load — are invented placeholders for this sample. No schematic, test report, customer name or internal document is shown.

#### 01. Why this, and why now

The commercial question was whether Ixana was a one-line company. A single line means every conversation with an investor or a large customer is about concentration risk, and it means the roadmap has one thing on it. A second line answers both — and a second line that slips adds an execution problem to the concentration risk.

The buyers were already there, and they were not asking for a body-area network. A secure-payments device maker and an industrial-handheld OEM wanted the same thing: move a firmware image between two devices held near each other, without an exposed port and without lighting up a radio. Their incumbent was NFC, and what they disliked about it was the clock.

**Figure — Time to complete a 4 MB provisioning transaction including link setup: Bluetooth LE 35 seconds, NFC 65 seconds, Wi-R NFE 8 seconds**

| name |
|---|
| Link setup |
| Payload transfer |

_Seconds to move a 4 MB firmware image between two handheld devices, Dec 2023. Transfer times computed from published throughput — NFE at 5 Mbit/s, NFC at roughly a tenth of that per Ixana's launch comparison, BLE at practical 2M-PHY rates. Setup times are our bench estimates, and they are the half buyers underrate: NFC is instant to establish and slow to finish, BLE is the reverse, and only one column is good at both._

That chart is the argument for a second line. Neither incumbent is bad; each is bad at a different half of a transaction these segments perform hundreds of times a day.

#### 02. The problem as people experienced it

I did not run a study for this one. I coded eighteen months of inbound evaluation requests by what the sender actually wanted to do, because a request for a body-area part from someone describing a payment terminal is a demand signal for something we had not built.

| What they asked for | What they described wanting | Evidence |
|---|---|---|
| A BAN evaluation kit | Two devices touching, no body involved | 31 of 96 inbound requests |
| "Something like NFC but faster" | Firmware and log transfer at touch range | 22 of 96; the largest single ask |
| Range figures for a non-worn case | Device-to-device at 10–20 cm | 19 of 96 asked for off-body range |
| A part with no radio emissions | Provisioning inside an RF-quiet facility | 14 of 96, concentrated in defence and industrial |

**Figure — Of 96 inbound evaluation requests coded by intended use: 54 were device-to-device rather than body-worn, 22 asked explicitly for a faster NFC, 19 needed off-body range, 14 required no radio emissions**

| name | value | label |
|---|---|---|
| Device-to-device, not body-worn | 54 | 54 / 96 |
| Explicitly "a faster NFC" | 22 | 22 / 96 |
| Needed off-body range | 19 | 19 / 96 |
| Required no radio emissions | 14 | 14 / 96 |
| Genuinely body-worn | 42 | 42 / 96 |

_Inbound evaluation requests, Jul 2022 – Dec 2023, coded by intended use rather than by the part requested. More than half the people asking for our body-area part did not have a body-area problem — and the top bar is not a marketing miss, it is a product line that did not exist yet. The 22, 19 and 14 are attributes of the same requests and overlap within the 54; they are not a partition of it._

The reframe: we had been reading this as poor qualification by the sales team. It was demand for a different part, arriving in the only vocabulary available to people who had seen one page of our website.

#### 03. My role and approach

The split is the same as on the BAN program and worth restating. The founder owned the bet that a near-field line should exist and what it was for. I owned the delivery system that made it a part: the same five functions across two sites, now running two silicon programs against one pool of validation capacity.

Running two lines is where delivery fed product hardest. Shared validation capacity forced the range decision below. The interop matrix we could afford to test set how configurable the part could be. Nobody debated those as product questions; they were settled as scheduling questions and they shaped the datasheet.

**Key decisions**

- **Make the second line boring wherever it can be.** Host interface, driver model, provisioning flow and test fixtures were reused from BAN rather than redesigned. A second line proves the company only if it arrives on time.
- **Three characterised range profiles, not a continuous knob.** Range is the NFE product variable, and every extra setting multiplies an interop matrix somebody has to sit at a bench and run.
- **BAN keeps its dates; NFE is scheduled into the gaps.** With one validation pool and two programs, either both slip or one has priority. I made that explicit up front rather than discovering it in month four.
- **Sell it against NFC, not against Bluetooth.** Requests arrived describing NFC’s limits, so the datasheet, comparison figures and launch material all answer NFC. Choosing the comparison is choosing the buyer.

#### 04. What I cut

**Scope**

- _Shipped:_ 5 Mbit/s at under 1 mW · Three characterised range profiles from 5 to 25 cm · Sub-millisecond end-to-end latency · RF-silent electric-field coupling · Reference driver and provisioning flow shared with BAN
- _Deferred:_ Higher-rate mode (became XA-NFE3001) · Multi-device near-field grouping · Second host interface option
- _Cut:_ Runtime-adjustable range · On-die presence classification · Per-profile power tuning exposed to the host

Runtime-adjustable range was the hardest cut, and the one partners asked about most. A continuous knob the host could turn is obviously useful — tight for a payment, open for a bench transfer. It failed on validation capacity already split with the BAN program: every additional setting multiplies the interop matrix, and we could afford twelve configurations, not sixty. Three profiles cover the cases the inbound requests described, and a partner needing a fourth gets it characterised in a later revision rather than finding at integration that nobody tested theirs.

#### 05. How I got it agreed

The COO would not commit a build plan for a second line on gen-1 demand signal. His objection was capital, not enthusiasm: committing wafer starts and package tooling for a part with no shipped revenue, on the strength of inbound emails, is the decision that looks obvious beforehand and reckless in a quarter where BAN needs the same money.

I had been arguing that the demand was real, which is unfalsifiable and therefore useless. So I offered to make it falsifiable. We converted the 96 coded requests into a sample-request commitment: before any long-lead spend, we would ask that population to formally request samples against a spec sheet with a price on it. Interest that survives a form and a price is a different signal.

104 requests came back — eight of the 96 companies asked from two teams each, which is how 96 coded requests produce 104. He committed the build plan, with a condition I had not planned to offer: the second line gets its own line in the capital plan rather than being absorbed into BAN’s, so if NFE underperforms it is visible as NFE underperforming. That has made every subsequent conversation about a third line shorter.

#### 06. What was built

A near-field transceiver moving 5 Mbit/s between two devices at touch to decimetre range, under a milliwatt, sub-millisecond, with no radiated RF. It couples through a contained electric field rather than a magnetic one, which buys both the throughput and the range NFC lacks while keeping what buyers came for: nothing to intercept from across the room.

**Interface — Wi-R NFE XA-NFE2001 transceiver package**

- **Same host interface as the BAN part.** A partner already evaluating BAN can bring this up against a driver they have. Reusing it cost us a cleaner interface design and bought a second line that shipped on schedule.
- **Range is a provisioning-time profile, not a runtime register.** The cut in section 04, visible in the part. Three profiles are characterised; a fourth would have been untested silicon wearing a tested part number.
- **No antenna, no matching network on the reference layout.** Electric-field coupling removes the component most likely to differ between our board and a partner's, which is where interop usually goes wrong.
- **Marked as a distinct family, not a BAN variant.** Internally it shares most of its lineage. Publicly it had to read as a second product line, because that was the argument the part existed to make.

_Ixana XA-NFE2001 package, from Ixana's published product photography. The package, part marking and full specification are public; internal design detail is not shown. Happy to walk through the real program in a conversation._

**Gallery**

- **Untitled**  The NFE link modelled as a four-node capacitive network, from Ixana's published technical material. Differential and asymmetric coupling are the two regimes the three range profiles sit in — and the reason range is a design-time characterisation rather than a register a host can write.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Second line vs BAN's dates | One validation pool, BAN holds priority | NFE waited on bench time repeatedly; the launch date was set by other people's queue |
| Configurability vs testable surface | Three range profiles, fixed at provisioning | The most requested feature is absent, and partners raise it in most first calls |
| Reuse vs a cleaner design | BAN's host interface and driver model carried over | The NFE part inherits interface decisions made for a different problem |
| Positioning against NFC vs against BLE | All material answers NFC | Buyers arriving from a Bluetooth frame have to be re-oriented before the comparison lands |

#### 08. Impact and outcomes

Before the build plan was committed we agreed the line failed on one condition: if the part could not hold a link across the majority of host and range configurations on hardware we did not design, it was a demo and not a product. The guardrail was the BAN program — any milestone it missed while the second line spun up would mean the second line was being paid for out of the first.

**Metrics**

| Value | Measure |
|---|---|
| 50× (vs NFC) | Energy efficiency per bit at 5 Mbit/s |
| 88 of 104 | Sample requests fulfilled in the launch quarter |
| 7 of 26 | NFE evaluations that reached a design-in |
| 91% (of 12 configs) | Interop pass rate, host platform × range profile |
| 0.6 ms | Median end-to-end latency on partner hardware |
| 0 | BAN milestones missed while the second line spun up (guardrail) |

**Figure — Interop pass rate across four host platforms and three range profiles: 11 of 12 configurations above 85 percent, with the 25 cm profile on the low-power MCU the single weak cell at 62 percent**

|  | 5 cm profile | 15 cm profile | 25 cm profile |
|---|---|---|---|
| Cortex-M4 host | 100 | 98 | 94 |
| Cortex-M33 secure | 100 | 96 | 91 |
| Linux SoC | 98 | 97 | 89 |
| Low-power MCU | 96 | 88 | 62 |

_Interop matrix at launch qualification, Oct–Nov 2025, 40 link attempts per cell on partner-supplied hardware. Eleven of twelve cells clear 85%. The weak cell is real and shipped documented: the longest range profile on the slowest host cannot service the link fast enough, and the datasheet says so rather than leaving a partner to find it._

**How we counted.** A configuration passes when 34 of 40 attempts establish and hold a link for ten seconds on hardware the partner built, not on our reference board — the reference board is excluded deliberately, being the one platform guaranteed to work. Design-ins count NFE-line evaluations including direct silicon engagements, a wider population than the dev-kit page’s kit-mediated figure; the two are not the same denominator. Latency here is the 0.6 ms median on partner hardware; the 0.9 ms on the XA-NFE3001 page is the worst-case characterisation figure a requirement line gets scored against.

`Part configuration — XA-NFE2001 Wi-R NFE transceiver · up to 5 Mbit/s · under 1 mW at full rate · three provisioning-time range profiles across 5–25 cm, up to 1 m at reduced rate · sub-1 ms end-to-end latency · RF-silent electric-field coupling · host interface and reference driver shared with the BAN line`

#### 09. What I'd do differently

I let the interop matrix size be decided by what we could afford rather than by where risk was. Twelve configurations was a capacity number, not an analysis, and the cell that failed was predictable from first principles — slowest host, longest range. An hour of thinking before booking bench time would have spent the same twelve slots on the twelve riskiest combinations instead of a tidy four-by-three grid.

I would also have run the sample-request test earlier. It settled section 05 in a fortnight, and I reached for it only after two months of arguing that demand was real. The instrument that turns an unfalsifiable claim into a number is usually cheap.

> **Note on this sample.** This is a sample portfolio page about real silicon. The part number, specification and NFC comparison claims are public and linked above. Program figures — schedule, sample fulfilment, design-ins, interop results, team load — are invented placeholders and should be replaced with real data before this page is used. No schematic, test report or customer name is shown. I'm glad to walk through the real program and its numbers in a conversation.

---

### 9. Accurate estimation of mineral present in soil

| Field | Value |
|---|---|
| Slug | _(no case study)_ |
| Company | IIRS-ISRO, Govt. of India |
| Years | 2022 |
| Track | ai |
| Domain | Remote sensing |
| Status | internal |
| Link | https://drive.google.com/drive/u/0/folders/1tYViz5kUrsL5PZ_9DsghxZ1uno1qYQzs |

**Outcome (card copy).** Hyperspectral workflow that estimated surface mineral abundance from satellite bands, taking a field-sampling round out of the survey loop.

_No long-form case study on file — card-level entry only._

---

### 10. Quantum Gate Simulator — interactive 10-qubit circuit builder

| Field | Value |
|---|---|
| Slug | `quantum-circuit-simulator-interactive-10-qubit-delivering-re` |
| Company | Personal |
| Years | 2026 - present |
| Track | ai |
| Domain | Learning tools |
| Status | prototype |
| Context | Personal · 2026 · Learning tools |
| Role | Product lead, personal project |
| Team | 2 people |
| Timeline | Jan – Jun 2026 |
| Stage | Prototype — complete and working, never released to learners |
| Link | /demo/quantum-simulator |

**Positioning.** A working 10-qubit circuit builder with live Bloch-sphere rendering, built to make state evolution visible — and never put in front of a learner.

**Outcome (card copy).** A working 10-qubit simulator with real-time 3D Bloch rendering; it stayed a prototype and never went out to learners.

**Problem.** People learning quantum logic can compute what a gate does and cannot see it. Observing a teaching session and surveying 31 learners found 24 could apply a Hadamard correctly on paper and 7 could describe what it did to the state vector.

**What I did.** I scoped a simulator around one claim: that watching the Bloch sphere move as you place a gate teaches something a table of amplitudes does not. That meant a hard cap on qubit count so rendering stayed instantaneous, and an interactive grid rather than a code editor.

**Result.** The simulator works — ten qubits, real-time 3D rendering, prebuilt algorithms, 32 passing tests. It never went to learners, so the claim it was built to test remains untested. What it produced is a clear picture of where interactivity stops being affordable.

> **Confidentiality.** Personal project, not confidential. Usage figures here are invented placeholders because the tool was never released; the technical characteristics described are real.

#### 01. Why this, and why now

Three ways to attack the intuition gap: better static diagrams, an annotated notebook, or an interactive simulator. The first two are far cheaper and share a property that makes them poor candidates — the learner does not choose what happens next. I sized the options by how many distinct states a learner could explore in twenty minutes, since exploration is the mechanism the whole idea rests on.

**Figure — Distinct states a learner can reach in a twenty-minute session: interactive simulator 40 or more, annotated notebook 12, static diagram set 6**

| name | value | label |
|---|---|---|
| Interactive simulator | 42 | 40+ |
| Annotated notebook | 12 | 12 |
| Static diagram set | 6 | 6 |

_Sizing, Dec 2025, by timing each format against the same set of exercises. The notebook figure is generous — it assumes the learner edits and re-runs cells rather than reading, which about a third of observed learners did not do._

#### 02. The problem as people experienced it

I sat in on two teaching sessions and surveyed 31 learners on what they could do versus what they could picture. The survey mattered more than the observation, because the gap is internal — a learner getting the right answer looks identical to one who understands it.

| What they did | Where it broke | Evidence |
|---|---|---|
| Applied gates as matrix arithmetic | Correct results, no picture of the state | 24 of 31 correct, 7 could describe the effect |
| Read Bloch sphere diagrams | Static, so the transformation was implied | 19 of 31 called diagrams "the confusing part" |
| Ran textbook code samples | Output was a table of amplitudes | 11 of 31 had tried; 3 found it helpful |
| Asked what entanglement looks like | No representation available at all | Raised unprompted in both sessions |

#### 03. My role and approach

I set the scope, the qubit ceiling and the boundary between the numerical engine and the rendering layer, and ran the milestones across both.

**Key decisions**

- **A hard ceiling at ten qubits.** State vector size doubles per qubit, and the premise is that the picture updates as you place a gate. Making it configurable would let a learner destroy the experience by accident.
- **The numerics run on the server, not in the browser.** Linear algebra in the render loop makes both slow. Separating them keeps rendering smooth regardless of what the engine is doing.
- **Interactive 3D Bloch spheres rather than amplitude tables.** This is the entire product claim. A table is faster to build and would have answered a question learners were not asking.
- **Prebuilt circuits for the standard algorithms.** A blank grid is a wall. Loading a Bell or GHZ state gives a learner something correct to modify, which is a much easier first move than construction.

#### 04. What was built

A web application for building, simulating and visualising quantum circuits. Gates are placed on a timeline grid; the engine computes state vectors, probabilities, shot distributions and Bloch coordinates per qubit; the front end renders those as interactive 3D spheres that update as the circuit changes. A prebuilt library loads standard algorithms. It is complete, and no learner has used it.

**Interface — The circuit builder with a GHZ state loaded: a three-qubit grid carrying a Hadamard and two CNOTs, three Bloch spheres below it drawn with no vector because all three qubits are entangled, the exact probabilities and the sampled shot counts beside them, and the two-term state vector under both.**

[Open this circuit in the demo](/demo/quantum-simulator?view=circuit&circuit=ghz-state)

- **The spheres update on placement, not on a run button.** A run button turns exploration into submission, and the claim is that feedback has to be immediate enough to be playful.
- **Entangled qubits are drawn as an unresolved sphere.** The honest representation of an entangled qubit is that it has no individual Bloch vector, and hiding that would teach the wrong thing for a nicer picture.
- **The shot distribution sits beside the spheres.** Learners needed to connect the geometric picture to the measurement outcome, and tabs broke that link.
- **Prebuilt circuits load as editable, not as demos.** The first useful action is modifying something correct, which requires it to arrive as a working circuit rather than a playback.

_The prototype’s own engine, ported into the browser and running: a GHZ state, three qubits entangled, every amplitude and count on the screen computed from the circuit at render time rather than stored. The three spheres are blank because all three qubits are entangled and none of them has a Bloch vector of its own. One difference from the shipped prototype, which has a Run button: this updates on placement, as the first callout argues it should._

**Gallery**

- **The builder.** — [Place a gate and watch it move](/demo/quantum-simulator?view=circuit&circuit=superposition)  Nine gates, a timeline grid, and a hard stop at ten qubits. Here two Hadamards put a two-qubit register into an even superposition: both spheres point at |+⟩ and all four basis states sit at 25%. Place another gate and every number on the screen is recomputed before you let go of the mouse.
- **Where the vector goes.** — [Step from product state to Bell state](/demo/quantum-simulator?view=entanglement&case=bell)  The same two qubits one CNOT apart. In the product state each vector has length 1; partly entangled they fall to 0.707; in the Bell state they are 0.000 and the spheres are drawn empty. The whole state stays perfectly definite at 50/50 throughout — the information moved into the correlation, which is the thing a per-qubit picture cannot hold.
- **The prebuilt library.** — [Load one and edit it](/demo/quantum-simulator?view=library)  Twelve circuits, four of which run. The other eight are shown greyed with the reason attached rather than hidden: nothing needing a Toffoli can be expressed because the engine has no three-qubit gate, and no error-correction circuit can close its loop without mid-circuit measurement. Both were known when the list was written.
- **The ceiling, re-measured.** — [Measure it on your own machine](/demo/quantum-simulator?view=ceiling&run=1)  The curve above runs again in the browser, on the same circuit and the same readout, against the same 200 ms line. The absolute milliseconds are different — this is JavaScript in a tab and that was Python on a server — and the shape is not: cost roughly doubling with each added qubit, and a budget that gets crossed near ten either way.
- **The guardrail.** — [Run the suite](/demo/quantum-simulator?view=tests&run=1)  All 32 tests, ported assertion for assertion and run in the page: 22 against the simulator and 10 against the API boundary. They confirm the Bell state has the amplitudes it should and that eleven qubits are refused. They say nothing about whether watching a sphere move teaches anyone anything, which is the claim this was built to test.

_The demo is the prototype’s Python state-vector engine ported into a single file and running in the browser. It builds the full 2ⁿ × 2ⁿ operator per gate by Kronecker product exactly as the deployed one does, because the cost of doing it that way is the finding in section 05 and an optimised port would have made that claim uncheckable. Nothing on it is a stored number: change the circuit, flip a qubit’s initial state, or push it to ten qubits and watch the update time leave the budget._

#### 05. What we learned

We agreed before building that the interaction failed if state-vector computation at the chosen ceiling exceeded a 200ms budget — beyond that a placement stops feeling connected to its result. Correctness was the guardrail: a faster renderer computing the wrong state would have been worse than a slow one, so the physics test suite ran on every change to the engine.

**Figure — State vector computation time against qubit count, rising from 4 milliseconds at four qubits to 1420 at twelve, against a 200 millisecond interactivity budget**

| 4 | 6 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|
| 4 | 15 | 62 | 121 | 244 | 610 | 1420 |

_Ceiling: 200 — 200 ms interactivity budget_

_Measured computation time by qubit count, Jun 2026, median of 20 runs per point on the deployed engine. The ten-qubit cap was chosen before this was measured and sits just past the budget line — the guess was close and slightly optimistic, and eleven qubits would have quietly broken the premise. The demo linked above re-runs this measurement in the browser, which lands on different milliseconds and the same shape._

**Metrics**

| Value | Measure |
|---|---|
| 10 | Qubit ceiling, chosen to protect interactivity |
| 244ms (budget 200ms) | State vector time at the ceiling |
| 32 | Physics tests passing (guardrail) |
| 0 | Learners; it was never released |

The second thing learned is what the prototype cannot tell us. It was built to test a claim about intuition, and because it never reached a learner that claim is exactly as unproven as it was in December. Everything above is a statement about the software, not about whether watching a Bloch sphere move teaches anyone anything.

`Prototype configuration — FastAPI and NumPy state vector engine · 10-qubit cap · Next.js front end with React Three Fiber Bloch rendering · prebuilt Bell and GHZ circuit library · 32 backend tests, 1.34 second suite`

By the letter of that bar, ten qubits fails it: the honest cap was nine, and we kept ten because the overshoot was imperceptible in use — a revision of the budget we made silently and should have made out loud.

#### 06. What I'd do differently

I built the whole thing before showing it to a single learner. A paper prototype of one Bloch sphere responding to one gate would have tested the core claim in an afternoon, and I spent five months on an engine, a renderer and a circuit library in order to test it properly. The completeness is why it never shipped — it kept being nearly ready.

I would also have measured the qubit ceiling first. It shaped every other decision and I estimated rather than measured it, which happened to be close. Had I been wrong by two qubits the other way, the entire interaction model would have rested on an assumption checkable in a day.

> **Note on this sample.** This is a personal prototype that was never released to learners. The usage figures on this page are invented placeholders; the technical characteristics — ten qubits, nine gates, the 200 ms budget, 32 passing tests — are real, and the demo linked from section 04 runs the prototype’s own engine so they can be checked. I’m glad to walk through the full prototype, backend and 3D renderer included, in a conversation.

---

### 11. Procurement Orchestrator — M365-native request workflow

| Field | Value |
|---|---|
| Slug | `procurement-orchestrator-procurement-process-automation-with` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Procurement ops |
| Status | customer-testing |
| Context | Ixana · 2026 · Procurement ops |
| Role | Product manager, pilot owner |
| Team | 2 operations analysts, 1 platform administrator |
| Timeline | Apr 2026 – present |
| Stage | Controlled pilot across three internal organisations |
| Link | /demo/procurement-desk |

**Positioning.** A pilot whose operating contract is the product: one named owner within a business day, no transition without evidence, and launch gates written before the first request.

**Outcome (card copy).** In pilot: the operating contract names one accountable owner within a business day, and a status transition cannot be written without evidence.

**Problem.** A physical-goods request entered a process with no named owner. Nineteen interviews and a thread analysis of 63 completed requests found a median of 4 chase emails each, and 22 of the 63 progressed with no recorded approval — not because anyone bypassed a control, but because none existed.

**What I did.** I scoped a lean pilot on tooling we already own, spending the effort on the operating contract rather than the software: who owns a request within a business day, what a status transition must carry as evidence, and which pre-agreed gates would stop the pilot.

**Result.** Early signal only — deliberately below any rate-claim threshold. What held is the contract: no request reaches order without a recorded approval, the ceiling refuses what the pilot has no business handling, and every launch gate is counted live from the demo's own requests rather than stored. The running totals below are the worked example.

**Evidence / demos**

- [Open the working demo — the pilot as a requester, an analyst, the controller and a manager](/demo/procurement-desk)
- [Or start at the gate that is failing, and the two requests that fail it](/demo/procurement-desk?view=gates&as=priya)

> **Confidentiality.** Internal pilot — the screen in section 06 is a recreation with invented requests, all figures on this page are invented placeholders for this sample, and no supplier, price or requester appears on this page.

#### 01. Why this, and why now

The obvious answer was a procurement platform, and the company had looked at three. I argued for one quarter proving the operating model on tooling we own, because every failure in the thread analysis was one of accountability — and a platform bought to fix that tends to reproduce it with better reporting.

**Figure — Weeks to a working process under each option: lean pilot on existing tooling 5, extend the finance system 14, buy a procurement platform 26**

| name | value | label |
|---|---|---|
| Lean pilot on existing tooling | 5 | 5 weeks |
| Extend the finance system | 14 | 14 weeks |
| Buy a procurement platform | 26 | 26 weeks plus licensing |

_Options sizing, Mar 2026, estimated with the platform administrator and the finance systems owner. At fewer than ten requests a week the lean option is not a compromise — it is proportionate, and the only one that tests the operating model before committing to a platform._

Volume is what makes this defensible. Under ten requests a week does not justify a control plane, and I set a trigger — fifty a week — at which the architecture must be revisited rather than stretched.

#### 02. The problem as people experienced it

I interviewed 19 people who had raised a request in the previous six months, then read and coded the full email thread of 63 completed requests. The interviews explained how it felt; the threads showed where a request stopped moving and for how long.

| What they did | Where it broke | Evidence |
|---|---|---|
| Emailed a request to procurement | No acknowledgement, no owner assigned | 51 of 63 threads; median 3.6 days to a reply |
| Chased for a status | Whoever replied guessed from memory | Median 4 chase emails per request |
| Waited for approval | Approval sometimes verbal or absent | 22 of 63 progressed with no recorded approval |
| Asked when it would arrive | No verified ETA existed anywhere | 17 of 19 interviewed raised this unprompted |

**Figure — Across 63 completed request threads: 51 had no acknowledgement, 34 had an unclear owner throughout, 22 progressed without a recorded approval, 9 were rebuilt in a spreadsheet**

| name | value | label |
|---|---|---|
| No acknowledgement at all | 51 | 51 / 63 |
| Owner unclear throughout | 34 | 34 / 63 |
| No recorded approval | 22 | 22 / 63 |
| Tracked in a private spreadsheet | 9 | 9 / 63 |

_Thread analysis of 63 completed requests, Oct 2025 – Mar 2026, coded from the email record. The last bar predicts failure: nine people had already built their own tracking, and a pilot that does not beat a private spreadsheet will be ignored by exactly those people._

The reframe: requesters were not asking for speed. 17 of 19 said they could plan around a slow request and not around an unknown one, which makes the product problem a reliable answer to "who has this and what happens next".

#### 03. My role and approach

I own the pilot scope, the operating model and the launch contract. Most of the work was writing rules precisely enough for a flow to enforce, and deciding what stays with a person.

**Key decisions**

- **One canonical list is the source of truth, and requesters cannot edit it.** Requester edits are how status drifts from reality. They get a controlled path to add information rather than change state.
- **Every status change carries actor, timestamp, source and evidence.** The 22 requests that progressed without a recorded approval did so because a status was a word, not an event.
- **Automate routing, reminders and approvals; keep supplier choice with people.** The deterministic parts fail silently by hand; the judgement parts are where an automated mistake is expensive and hard to detect.
- **Physical goods only, one item type per request.** Services and software carry different approval paths and would have doubled the rule set. Narrowing made the contract specific enough to test.

#### 04. What I cut

**Scope**

- _Shipped:_ Canonical request list with a submission form · Routing and approver maps · One financial approval stage · Reminders, escalation and ageing views · Daily integrity check with an exceptions log
- _Deferred:_ Supplier catalogue integration · Multi-currency handling · Requester-visible spend reporting
- _Cut:_ Services and software requests · Multi-stage approval chains · Automated supplier selection

Cutting services and software was the hardest call, because they are the requests people complain about most — which is exactly why they were wrong for a pilot. Their approval logic depends on contract value, renewal dates and legal review, none of which the lean tooling models. They keep the email path: unsatisfying and honest.

**The pilot does not exit to production unless all of the following hold — From the pilot specification — launch gates, v1.2**

- **Assignment.** 100% of requests assigned to one named owner within one business day of submission.
- **Approval integrity.** Zero requests ordered without a valid recorded approval.
- **Failure visibility.** Zero silent flow failures, and no known-incorrect status left unresolved beyond one business day.
- **Volume.** At least 20 completed pilot requests before production exit is considered.

_One page from the pilot specification. Organisation names and approver thresholds removed._

#### 05. How I got it agreed

The finance controller wanted two approval stages — budget holder then finance — because that is the control the company operates above a certain value, and a weaker one looked like using the pilot to erode it. She was right to be suspicious; pilots have a way of becoming the permanent process.

I did not argue that one stage was sufficient, because for larger purchases it plainly is not. I proposed a value ceiling: requests above the finance-approval threshold route out of the pilot entirely, so it could not weaken any control because the requests those controls exist for never enter it.

She agreed, and added a condition I would not have proposed: the routing rule is a blocking validation, so a request above the ceiling cannot be submitted at all. It has blocked four — four times the pilot would have quietly swallowed something it had no business handling.

#### 06. What was built

A submission form writing into a canonical request list, with routing and approver maps, a shipments list and an exceptions log. Requesters see owner, status, next action, verified ETA and timeline. Procurement works one queue from assignment through delivery, and managers get a grouped view of ageing work.

**Interface — The requester view of PR-2043. A strip across the top names the owner, the status, the next action as a named person, and an expected delivery date flagged verified with the supplier. Below it the timeline lists seven transitions, each carrying an actor, a timestamp, a source and an evidence reference.**

[Open this request and try to change its status](/demo/procurement-desk?view=request&id=PR-2043&as=nadia)

- **Next action names a person, not a stage.** "In procurement" is what 34 of 63 threads effectively said. A named person is the difference between a status and an answer.
- **The ETA is labelled verified or unverified.** An unverified ETA presented as fact is how a requester plans around a date that was always a guess.
- **The timeline shows who changed what, with its evidence.** This is where the 22 unapproved progressions become impossible — a transition without evidence cannot be recorded at all.
- **Requesters can add information but not change state.** Letting requesters edit status is the fastest route back to a list nobody trusts, which is the failure this replaced.

_Recreated from the pilot interface as a working demo. The fields, the transition rules, the value ceiling and the four gates are the real ones; every organisation, requester, supplier, item, price and date shown is invented. Happy to walk through the real pilot in a conversation._

**Gallery**

- **The ceiling refuses, it does not warn.** — [Open the refusal, then change the number](/demo/procurement-desk?view=submit&as=nadia&item=Probe%20card%20for%20the%20YR31%20test%20programme&amount=18400&try=1)  The finance controller’s condition, and the reason one approval stage was acceptable at all: a request at or above the threshold cannot be submitted into the pilot. Four hit this rule — four times the pilot did not quietly swallow something it had no business handling. This link opens the refusal itself; drop the value below the ceiling and the same button writes the request.
- **A transition is an event, not a word.** — [Open the queue and try assigning to the team mailbox](/demo/procurement-desk?view=queue&as=dana)  The two analysts work one queue from assignment through delivery. Every button asks for the document the transition can be checked against, and refuses to write without one — including the refusal that matters most, which is assigning a request to “Procurement” rather than to a person.
- **Visible at three days, escalated only on a breach.** — [Open the manager view](/demo/procurement-desk?view=ageing&as=priya)  Managers see everything older than three days, grouped by organisation. Nobody is messaged for appearing here; a direct escalation fires only when a gate is actually breached. The cost is named in the tradeoffs — a request can sit visible and unescalated for several days.
- **The check that found the failure that reported success.** — [Open the exceptions log](/demo/procurement-desk?view=exceptions&as=dana)  Short flows fail quietly. Four exceptions in five months, one of them a reminder flow that failed on a throttled connector and returned success — which is why the daily check now compares reminders due against reminders sent rather than reading the flow’s own result.
- **The gate that is failing, and why that is useful.** — [Open the gates](/demo/procurement-desk?view=gates&as=priya)  Three of the four launch gates hold and one does not. Every number here is counted from the requests in the demo rather than stored, so the gate cannot drift from the queue it describes — drive a request through to delivery and watch the denominator move.

_Every screen above is the state its own link opens, captured from the running demo on invented data. It exists so the argument on this page can be checked rather than taken on trust: submit above the ceiling, assign a request to the team mailbox instead of a person, record a transition with the evidence field empty, or approve something as the wrong role and read what each one refuses._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Speed to pilot vs control depth | Short flows, daily integrity checks, human verification | Integrity depends on a check running rather than on the system being incapable of drift |
| Requester visibility vs status accuracy | Full visibility, no requester edits | Requesters who spot a wrong status must ask someone to correct it |
| Automation vs governance | Automate routing and reminders, keep supplier choice human | Procurement still spends real time on quotes, which is where the calendar days mostly go |
| Management visibility vs alert fatigue | All ageing work visible after three days, direct escalation only on breach | A request can sit visible-but-unescalated for several days |

#### 08. Early signal and what I'm watching

The numbers below come from 23 completed requests across three organisations — enough to see whether the operating contract holds and nowhere near enough to claim an effect size. Every figure is a count against its denominator, and none of it should be read as a result.

**Metrics**

| Value | Measure |
|---|---|
| 23 | Pilot requests completed so far (n for all figures) |
| 21 (of 23) | Assigned to a named owner within one business day |
| 0 (of 23) | Ordered without a recorded approval |
| 3.6d → 0.6d | Median time from submission to a named owner |
| 2 (of 23) | Requesters who still chased by email |
| 1 | Silent flow failure, caught by the daily check (guardrail) |

**Figure — Pilot performance against each pre-agreed launch gate: assignment 21 of 23 against a target of 23, approval integrity 23 of 23, failure resolution 1 of 1 within a day, volume 23 against a floor of 20**

| name | value | target | max | label | targetLabel | pass |
|---|---|---|---|---|---|---|
| Assigned within 1 business day | 21 | 23 | 25 | 21 of 23 | gate: 23 | False |
| Ordered with valid approval | 23 | 23 | 25 | 23 of 23 | gate: 23 | True |
| Failures resolved within 1 day | 1 | 1 | 25 | 1 of 1 | gate: all | True |
| Completed pilot requests | 23 | 20 | 25 | 23 | floor: 20 | True |

_Performance against the four launch gates, Apr–Aug 2026, n=23. Three gates hold and one does not: two requests took more than a business day to assign, both submitted on a Friday afternoon into an organisation whose approver map had a gap. The gate is failing for a specific and fixable reason, which is the most useful state for a gate to be in._

**How we counted.** Assignment means a named individual recorded as owner, not a team or a queue, timed from submission to assignment. A request assigned to "Procurement" counts as unassigned, because that is precisely the answer 34 of the 63 original threads were giving.

`Pilot configuration — Microsoft Lists canonical request list · SharePoint views for queue and management · short Power Automate flows for routing, reminders and escalation · Outlook shared mailbox · one approval stage below the finance ceiling · daily integrity check · no Azure SQL, message bus, custom API or model in the critical path`

#### 09. What would make me stop

These were written down before the pilot opened, and each is a stop rather than a discussion — because every one is a condition under which I would find an explanation persuasive.

Any request ordered without a recorded approval stops the pilot immediately. A second silent flow failure stops it too: the first told us the integrity check works, a repeat would tell us the check has become the mechanism rather than the safety net.

Two softer gates run to the end. If more than a fifth of requesters are still chasing by email at 40 requests, the pilot has produced a better record without changing the experience it exists to fix. And past fifty a week, the lean architecture stops being proportionate.

#### 10. What I'd do differently

I built the approver map as configuration and treated it as settled. Both assignment-gate failures trace to one organisation whose map had a gap nobody noticed until a Friday request fell through it — a wrong map is indistinguishable from a right one until that moment.

I would also have measured chasing from the start rather than in month two. The number I care most about has a denominator of 23 and no clean baseline.

> **Note on this sample.** This is an internal pilot. The screen described in section 06 is a recreation with invented content, and all figures on this page are invented placeholders for this sample — every one is quoted against its sample size because a pilot this small cannot support a rate. No supplier, price or requester is shown. I'm glad to walk through the real pilot and its gates in a conversation.

---

### 12. WishKey — Key Management System

| Field | Value |
|---|---|
| Slug | `eegrab-wishkey` |
| Company | EEGRAB |
| Years | 2023 |
| Track | silicon |
| Domain | Access control |
| Status | production |
| Context | EEGRAB · 2023 · Access control |
| Role | Product owner end to end, requirements to production handoff — senior embedded design engineer |
| Team | 4 engineers — me, firmware, Android, mechanical — with the CTO carrying the commercial side |
| Timeline | Q1 2023 – Q4 2023 |
| Stage | In production — shipping as a catalogue product through installer partners |
| Link | https://www.youtube.com/watch?v=8etIl_0wj0I |

**Positioning.** An electronic key cabinet that makes a key impossible to take anonymously, replacing a paper register nobody could reconcile.

**Outcome (card copy).** Replaced a paper key register with an audited electronic cabinet, shipped as a catalogue product with per-key accountability.

**Problem.** Facilities that run on physical keys — data-centre halls, plants, commercial estates, substations — control them with a board on a wall and a register on a clipboard. Reading twelve months of those pages against the actual key sets, a third of rows named nobody legible.

**What I did.** I owned WishKey end to end as an engineer: an electronic cabinet where each slot locks and reports independently, so a key cannot leave without an event that names an authenticated person. The design decision that carries the product is per-slot locking rather than one locked door.

**Result.** The design decision that carries the product is per-slot locking: a key cannot leave without an event naming an authenticated person, because the record is a side effect of the act rather than a form beside it. It ships as a catalogue product through installer partners, fully useful with nothing else installed. The deployment and audit figures below are the worked example.

**Evidence / demos**

- [WishKey brochure — EEGRAB](https://eegrab.com/wp-content/uploads/2021/brochure/Wishkey_brochure.pdf)
- [WishKey product demo — EEGRAB](https://www.youtube.com/watch?v=8etIl_0wj0I)

> **Confidentiality.** EEGRAB product work. The brochure and demo linked below are public. The board photograph and the PCB view are my own working files. No customer site, tenant or key inventory is named or shown, and every figure on this page is invented — deployment counts, audit rates, timings and the evidence counts in section 02 are illustrative, not EEGRAB's books.

#### 01. Why this, and why now

The cost of a lost key is never the key. It is rekeying every lock that key opened, the site running degraded until that finishes, and an audit finding that says you could not name who held it. The segments carrying this hardest are the ones where a key opens something regulated.

Three products could have addressed it. I scored them on one thing — the share of key-removal events that would produce an attributable record without somebody choosing to write one. A control that works only when people comply is not a control.

**Figure — Share of key-removal events producing an attributable record without voluntary compliance: electronic cabinet 96 percent, access-control integration 41 percent, tablet logbook 23 percent**

| name | value | label |
|---|---|---|
| Electronic cabinet, per-slot locking | 96 | 96% — the record is a side effect of taking the key |
| Key module on the door access system | 41 | 41% — names who entered the room, not which key left |
| Tablet logbook at the guard desk | 23 | 23% — still voluntary, just faster to skip |

_Options scored against the register audit in section 02, Q1 2023. The door-access option scores as well as it does only because entry and key-taking usually coincide; when they do not, it is silently wrong, which is worse than being absent._

We sell to facility and security managers, never to a named account. That shapes the product: the buyer has to defend the cabinet to an auditor they have never met.

#### 02. The problem as people experienced it

I interviewed facility managers and the installers who service their sites, then sat with twelve months of paper key-register pages from six pilot sites and counted the rows that could not be resolved to a person, a key, or a return.

| What the register was meant to do | What the pages actually showed | Evidence |
|---|---|---|
| Name the person holding each key | Illegible signature or bare initials | 31% of rows |
| Record the return | No return line ever written | 8% of rows |
| Be filled in at the moment of issue | Whole days written in one hand, after the fact | 4 of 6 sites |
| Reconcile to the physical key set | Keys hanging that no row accounted for | 19 keys in total |

**Figure — Days between a key being issued and a return being recorded, from twelve months of paper register pages: 41 percent same day, 8 percent never recorded**

| name | value |
|---|---|
| 0–1 | 41 |
| 2–3 | 22 |
| 4–7 | 14 |
| 8–14 | 9 |
| 15–30 | 6 |
| never | 8 |

_Ceiling: None — no return ever written_

_Six pilot sites, Q1 2023, as a share of all register rows. The right-hand bar is the finding that mattered: for roughly one row in twelve the register never closed, so nobody could say whether the key was in a drawer, in a van, or gone. Managers guessed a drawer._

The reframe: this was never a discipline problem to be fixed with a better form. The record was separate from the act, so skipping it cost nothing. The record had to become the act.

#### 03. My role and approach

My title was senior embedded design engineer. The CTO owned the commercial relationships — the installer channel, pricing, which enquiries we chased — and I owned the product end to end from requirements through schematic, board, firmware, enclosure and production handoff. The product-definition work was mine without the title that usually comes with it.

The decision everything else follows from is per-slot locking. A cabinet with one locked door is far cheaper and gives you a door audit: it tells you a person opened the cabinet, not which key they walked away with.

**Key decisions**

- **Lock, sense and report every slot independently.** The audit record has to name a key, not a cabinet, or the auditor is back to trusting a person's account.
- **Make the cabinet fully useful with nothing else installed.** Server, directory and email are integrations, not prerequisites. A product that needs an IT project before it works is not sold by electricians.
- **Bind the tag to the key with a one-time seal.** Per-slot sensing is worthless if a returned tag can be a decoy, so the tag cannot be moved to another key without visibly destroying the seal.
- **Read back what the hardware did, not what it was told.** Every lock channel has a feedback line, so the log records that a slot actually released rather than that firmware asked it to.

#### 04. What I cut

**Scope**

- _Shipped:_ RFID card plus PIN at the cabinet · Per-slot electromagnetic locking with feedback · Smart key tags with one-time anti-smash seals · On-cabinet audit log and printed reports · Operator terminal with multi-language support · Wall or desk mounting
- _Deferred:_ Directory and single-sign-on synchronisation · Email and SMS notification · Multi-cabinet central server
- _Cut:_ Fingerprint authentication · Photo capture on every release · Remote unlock from the server

Fingerprint authentication was the hardest cut and the one every prospect asked about. It failed on the population: our sites run shift workers and contractors with dirty, wet or damaged fingertips, often in gloves, and a false reject at the cabinet does not degrade gracefully — it sends someone to the mechanical override or to propping the door, which is precisely the behaviour we were selling against. What covers the gap is an employee RFID card plus a PIN, and the anti-smash seal so a returned tag cannot be a decoy. The honest cost is that the trail attributes to a card and a PIN, not to a face.

#### 05. How I got it agreed

The installer partner who would actually commission these at customer sites read my prerequisites list and refused to carry the product. His objection was correct. The list asked the customer for a Linux server, two network points, directory synchronisation, an SSO endpoint and a mail relay before a cabinet would work. His crews are electricians. Every one of those lines was a site visit ending in a phone call to somebody's IT department, and the delay would be blamed on the box with our name on it.

I had been defending the list feature by feature, which was the wrong argument, because each item genuinely earned its place. So I took his frame instead: the question is not whether an integration is valuable, it is what the cabinet must do on the day it is bolted to a wall. I recut the requirements so full audit capability depends on nothing outside the cabinet, and every integration became optional and post-commissioning.

He agreed, then asked for something I had not planned to build. Commissioning had to be signable on the spot, so the cabinet itself produces the acceptance report his foreman hands the customer, from its own local store, before any server exists. We carry a local log and report generator permanently, duplicating what the server does — a standing maintenance cost, and the two will drift if nobody watches them.

#### 06. What was built

A cabinet holding thirty tagged key bunches, each in its own slot with its own lock, sensor and indicator. A user taps an employee card, enters a PIN, and the one slot they are entitled to releases. Behind the door is the board below.

**Interface — Bare WishKey slot controller board: sixteen EMLOCK connectors and FET drivers down the left edge, four optocouplers, sixteen RFID reader connectors on the right, and Arduino Mega-form headers across the middle**

- **Sixteen slots per board, not thirty.** EMLOCK1 to EMLOCK16 run down the left edge with a FET driver behind each. Sizing the board to a module rather than to the cabinet means a thirty-key cabinet is two of these and a larger one is four, instead of a new layout per product.
- **Every lock connector carries a feedback pin, not just 12 V and ground.** Each four-way group is 12 V, return, 5 V and FB. The board reads back whether the slot actually released and whether the tag is still there, so the audit record is what happened rather than what firmware asked for.
- **Sixteen readers on one differential pair, with sixteen enable lines.** The connectors down the right edge each carry 5 V, ground, an A/B pair and an enable. A bus rather than sixteen point-to-point links is what keeps a slot down to a few wires and lets two boards chain without a second harness.
- **Four quad optocouplers between the logic and the lock rail.** OP1 to OP4 sit between the controller and the 12 V drive. Sixteen solenoids kicking back on the rail must not be able to reset or corrupt the thing writing the audit record — the record is the product.

_My own photograph of a bare slot controller board, before assembly, with the EEGRAB silkscreen visible. No customer site, key list or configuration is shown. Happy to walk through the assembled cabinet in a conversation._

**Gallery**

- **Untitled**  The same slot board in the layout tool. Lock connectors run down one edge and reader connectors down the other, deliberately opposite each other, so the 12 V drive harness and the reader bus run up separate sides of the cabinet instead of crossing behind the slots.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Per-slot locking vs one cabinet door | A lock, sensor and driver in every slot | Higher bill of materials and thirty things per cabinet that can fail |
| Standalone vs integrated | Full audit with no server, integrations optional | A local log and report generator maintained alongside the server's |
| Strong identity vs usable identity | Card plus PIN, no biometrics | Two people who share a card and a PIN defeat the trail |
| Auditable vs recoverable | Mechanical override kept, witnessed and logged | A small permanent category of removals nobody can attribute to a user |

#### 08. Impact and outcomes

We agreed before build that this failed if any key could leave a cabinet without an event record naming either an authenticated user or a witnessed override. Unattributed removals are the guardrail rather than the headline, because everything else here improves by making release easier, and making release easier is how you lose the record.

**Metrics**

| Value | Measure |
|---|---|
| 3,400+ | Keys under management across deployed sites |
| 22 (across 9 sites) | Cabinets in service |
| 4 min → 15 s | Median time to draw a key, register vs cabinet |
| 0.3% (of removal events) | Unattributed key removals (guardrail) |
| 2.1 (per 1,000 draws) | Emergency mechanical overrides used |
| 1 day → 2 h | Commissioning time per cabinet |

**Figure — Outcome of key-removal events by site class, column width proportional to keys under management: attribution is near-total everywhere, punctuality is worst at utility substations**

| name |
|---|
| Returned on time, attributed |
| Returned late, attributed |
| Escalated to a supervisor before release |
| Emergency override or unattributed |

_All key-removal events across the first twelve months in service. Widths carry keys under management because substations look worst and hold 200 of 3,420 keys — read as equal columns, the smallest segment would set the roadmap. The real finding is that we solved attribution and did nothing for punctuality: nearly a fifth of plant keys come back late, and the cabinet records that beautifully without changing it. The last band deliberately merges emergency overrides with unattributed removals — split per site class the two smallest categories are unreadable at this scale, and the tiles above and "How we counted" report them separately._

**How we counted.** Unaccounted-key rate is the share of key-removal events with no attributable authenticated user. It excludes emergency mechanical overrides, which are recorded, witness-signed and reported separately — they are a tile above rather than a footnote, because excluding a category quietly is how a guardrail stops meaning anything. Late returns count as attributed: we know exactly who has the key, which is a different failure from not knowing. Keys under management counts keys, not slots — a slot holds one tagged bunch, and the 660 slot positions across the 22 cabinets carry an average of about five keys per bunch, which is how 3,420 keys sit behind 660 locks. Mechanically, an unattributed removal is a slot that reports tag-out with no authenticated session open at the terminal — a slot forced, or released during a fault window — logged with timestamp and slot number but no user to charge it to.

`Cabinet configuration — 30 key slots per cabinet, each with an electromagnetic lock, individual FET drive, feedback line and status LED · sixteen lock channels per slot board, two boards to a 30-key cabinet · slot readers on a shared RS-485 pair with a per-reader enable line · four quad optocouplers isolating the 12 V lock rail from 5 V logic · slot controller board designed in EasyEDA, 1.6 mm two-layer, ENIG finish, LCSC parts and JLCPCB fabrication · controller module on Arduino Mega-form headers · 7-inch Android operator terminal · RFID smart key tags carrying a unique-ID microchip on a semi-circular slot contact · employee RFID card plus PIN at the reader area · one-time anti-smash seal binding tag to key · two mechanical override keys per cabinet, door and lining door, commissioning and emergency only · optional backup battery · optional on-premises Ubuntu server, 4 core / 8 GB / 500 GB, with directory synchronisation, SSO and SMTP · wall or desk mount in 1.5 × 1.5 ft`

#### 09. What I'd do differently

I treated late returns as somebody else's problem because the guardrail was attribution, and the chart above is the bill for that. The cabinet knows who holds every overdue key and does nothing with it beyond a report a manager has to go and read. A nudge at the point the key is due was a small piece of work I never scheduled, because it did not fit the metric I had chosen.

I would also have designed the mechanical override to be self-evidencing rather than procedural. Today it is a real key and a witness signature on paper, which reintroduces the exact weakness the product exists to remove. A seal on the override lock, logged when broken, would have cost very little and closed the last honest gap in the trail.

> **Note on this sample.** Sample portfolio page. Every figure here is invented and reconciled to be internally consistent — deployment counts, audit rates, timings, and the evidence counts in section 02 are illustrative, not EEGRAB's books. What is real: WishKey is a shipping EEGRAB product, and the brochure and demo linked above are the company's own public material. The board photograph and layout view are my own working files. I'm glad to walk through the real product and its numbers in a conversation.

---

### 13. Wi-R reference designs — video smartglasses and tactical headset

| Field | Value |
|---|---|
| Slug | `wi-r-reference-designs` |
| Company | Ixana |
| Years | 2024 - 2026 |
| Track | silicon |
| Domain | Wearable systems |
| Status | production |
| Context | Ixana · 2024–2026 · Wearable systems |
| Role | Owner of what “done” meant for a copyable design — program manager, reference design delivery (HW/FW US · applications and validation across both sites) |
| Team | The same 5 functions as the chip programs, plus 3 applications engineers carrying the live evaluations |
| Timeline | Jan 2025 – Feb 2026 |
| Stage | In production — design files released to evaluating teams |
| Link | https://www.ixana.ai/products/reference-designs |

**Positioning.** Two complete designs an OEM can copy, built to kill the objection that stalls every silicon evaluation: great chip, no path to a product.

**Outcome (card copy).** Reference designs proving Wi-R carries live video to smartglasses and voice to a tactical radio over the body rather than the air.

**Problem.** The chips worked and the dev kits proved the link, and evaluations still died. Reviewing 27 that stalled showed almost none failed on the technology: they failed after the kit worked, when a team had to turn a working link into a wearable and found they had signed up for an antenna-less RF layout problem nobody on staff had done.

**What I did.** I ran delivery of two complete reference designs — schematic, layout, BOM and firmware — chosen to bracket the integration questions rather than to demo well. The founder owned which markets mattered; I owned what “done” meant for a design an OEM could copy, and gated release on evaluation evidence rather than internal demos.

**Result.** Both designs are public and complete — schematic, layout, BOM and firmware — and both demonstrations are on video: live video into smartglasses, voice into a tactical radio, over the body rather than the air. Release was gated on a team outside the building rebuilding each one from the files alone. The cycle-time and design-in figures below are the worked example.

**Evidence / demos**

- [Reference designs product page](https://www.ixana.ai/products/reference-designs)
- [Smartglasses demonstration (video)](https://vimeo.com/1049786530/25db995367)
- [Tactical headset demonstration (video)](https://vimeo.com/1146532722/d27318ac13)

> **Confidentiality.** System-level work over public silicon. The designs, their published descriptions and the demonstration videos are public — linked below. Program figures on this page — evaluation cycle times, support hours, design-in attribution, file requests — are invented placeholders for this sample. No schematic, layout, BOM, partner name or internal document is shown.

#### 01. Why this, and why now

By late 2024 the technology objection was answered. The BAN part was in production, the near-field part close behind, and the dev kit reliably produced a working link in a day. What had not moved was conversion: teams impressed in week one were quiet by week ten, consistently enough to be structural rather than bad luck.

The commercial stake is straightforward. An evaluation that stalls between datasheet and prototype is not a slow design-in, it is a lost one — the engineer who championed us gets reassigned, and the next conversation starts in a colder room. Three options were on the table, scored against the same 27 stalled evaluations.

**Figure — Share of 27 stalled evaluations each option would have unblocked: reference designs 78 percent, expanded documentation 30 percent, more applications engineering hours 22 percent**

| name | value | label |
|---|---|---|
| Reference designs | 78 | 78% — 21 of 27 |
| Expanded documentation | 30 | 30% — 8 of 27 |
| More applications hours | 22 | 22% — 6 of 27 |

_Options scored against the stalled-evaluation review described in section 02, Dec 2024. Each stall was read for what would actually have unblocked it. Documentation and engineering hours score low for the same reason: most stalls were not caused by missing knowledge but by work the partner did not want to do at all._

The two verticals bracket rather than represent. Video smartglasses is high-volume consumer, where cost and size dominate; a tactical headset is low-volume ruggedized, where certification and reliability dominate. An OEM between them finds themselves in one of the two.

#### 02. The problem as people experienced it

I took every evaluation that had gone quiet for more than sixty days — 27 of them — and reconstructed which stage it died at. Not why the partner said it died, which is usually “deprioritised”, but what they were trying to do the week before they stopped.

| Stage reached | What killed it there | Evidence |
|---|---|---|
| Link working on a kit or eval board | Nothing — this stage almost never failed | 24 of 27 got this far |
| Designing their own board | Electrode layout with no antenna to copy | 13 of 27 died here |
| First board built | Worked on the bench, not on a person | 6 of 27 |
| Mechanical integration | No guidance on electrode placement in a real enclosure | 5 of 27 |

**Figure — Of 27 stalled evaluations: 24 reached a working link on the dev kit, 11 designed their own board, 5 built one, and none got it working on a person**

| name | value | label |
|---|---|---|
| Evaluation started | 27 | 27 |
| Link working on our hardware | 24 | 24 |
| Own board designed | 11 | 11 |
| Own board built | 5 | 5 |
| Working on a person | 0 | 0 |

_Where the 27 stalled evaluations stopped, Jul 2023 – Dec 2024, reconstructed from support threads. The cliff is not at the technology, it is immediately after it: 24 teams got a link working and 13 of them never designed a board. That step is where a reference design substitutes for expertise a wearables team may simply not have. The funnel ends at zero by construction — every one of the 27 stalled somewhere, and the four drops are the four rows of the table: 3 before the link, 13 at board design, 6 whose first board never worked past the bench, 5 at mechanical integration on a person._

The reframe: we had been treating this as a sales conversion problem and staffing it with more contact. It was an engineering capability problem in the partner’s building, and no amount of attention transfers a skill — only a design they can copy does.

#### 03. My role and approach

This is the program where a delivery lens most visibly turns into a product one. The founder owned which markets mattered and why Wi-R belonged in them. I owned the three things that decided what the designs became: which two verticals we built, what “done” meant for a design an OEM could copy, and when it was allowed out.

That last one was the fight. A reference design is finished when someone outside the building reproduces it, not when it works on our bench — so release gated on evidence from partner hardware, putting the date in other people’s hands.

**Key decisions**

- **Two verticals that bracket, not two that are representative.** Consumer volume and ruggedized spec sit at opposite ends of the integration questions. A middle-of-the-road third design would have answered fewer questions than either extreme.
- **Release the layout, not just the schematic.** The stalls clustered on electrode layout, exactly the file a hardware team is most reluctant to publish. Withholding it would have made the package answer the wrong question.
- **Done means an outsider reproduced it.** Release gated on a partner building the design on their own hardware and reaching a working link. Internal demos prove a design works; they cannot prove it is copyable.
- **One firmware tree with build flags, not two.** Two vertical-specific trees drift within a quarter and double the surface a small team maintains. Shared code with flags is the only version still current two years later.

#### 04. What I cut

**Scope**

- _Shipped:_ Smartglasses design — schematic, layout, BOM, firmware · Tactical headset design — schematic, layout, BOM, firmware · Electrode placement guidance for both enclosures · Validated BOM with tested substitutions · Shared firmware tree with per-vertical build flags
- _Deferred:_ Multi-node body network design · Published mechanical CAD · Pre-compliance test reports
- _Cut:_ Medical patient-monitoring design · Vertical-specific firmware trees · Enclosure tooling and industrial design

The medical design was the hardest cut, and it had the clearest demand behind it. It failed on two constraints: electrical safety expectations mean anticipating isolation requirements we had never characterised, and the lead time to do that credibly ran past the window the other two needed. Every active design also carries a permanent support cost — three designs against three applications engineers meant all three maintained badly. An application note on isolation covers it, and the dev kit carries that segment.

#### 05. How I got it agreed

The hardware lead did not want the layout published. His objection was not territorial: the electrode geometry and its ground treatment are the part of a Wi-R design that takes real skill, they are not covered by anything we had filed, and publishing them hands a competitor the one thing they cannot reverse-engineer from a datasheet.

I could not argue the risk away, so I argued about what the package was for. A design that withholds the layout answers “does this work”, which the dev kit already answered, and leaves untouched the step where 13 of 27 evaluations died. Held back, it would be a marketing asset with a support cost.

He agreed, with a condition I had not planned to carry. Every released package ships with the exact validated BOM including tested substitutions, and any change forces a versioned re-release rather than a quiet file swap — a partner building from a stale layout is a support incident that looks like a silicon fault. That obligation is permanent and has no owner outside my program.

#### 06. What was built

Two complete, copyable designs. The smartglasses design streams compressed video off a head-worn device all day on a battery a consumer product can carry. The tactical headset carries voice between a headset and a body-worn radio with no over-the-air emission to locate. Both ship as schematic, layout, validated BOM and firmware.

**Interface — All-day video streaming smartglasses reference design**

- **Electrode placement is fixed in the enclosure, not left to the integrator.** Thirteen of 27 stalls died on electrode layout. Specifying it inside a real enclosure is the difference between a design you copy and a design you interpret.
- **The BOM lists tested substitutions, not just preferred parts.** The concession from section 05. A partner who cannot source our exact part now has a characterised alternative instead of a guess.
- **Firmware is the shared tree with a vertical flag.** Two trees would have drifted inside a quarter. One tree means a fix for the tactical design reaches the smartglasses design automatically.
- **Released only after an outside team rebuilt it.** The gate that put our date in a partner's hands, and the only evidence that a design is copyable rather than merely correct.

_Ixana all-day video streaming smartglasses reference design, from Ixana's published product imagery. The design's existence and description are public and a demonstration video is linked above; schematic, layout and BOM are not shown. Happy to walk through the real program in a conversation._

**Gallery**

- **Untitled**  The tactical headset design — headset to body-worn radio over the body rather than the air, which is the property that matters when a radiated link is what locates you. It is the ruggedized end of the bracket described in section 01.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Protecting layout IP vs unblocking integration | Publish schematic, layout and BOM in full | The hardest-won know-how in a Wi-R design is public, permanently |
| Design count vs support capacity | Two designs, maintained properly | The medical segment has an application note where it wanted a design |
| Elegance vs maintainability | One firmware tree with build flags | Both designs carry conditionals for a vertical they are not |
| Release speed vs proof of copyability | Gate release on an outside rebuild | Roughly a quarter added to each design, on someone else's schedule |

#### 08. Impact and outcomes

We agreed before starting that a reference design failed if a team outside Ixana could not reproduce it from the released files alone, without a call. That is a harsh bar and the only one that distinguishes a design from a demonstration. The guardrail was support hours per evaluation: reach bought by drowning three engineers is a bill arriving later.

**Metrics**

| Value | Measure |
|---|---|
| 11 wks → 3 wks | Datasheet to working demo on partner hardware |
| 6 of 9 | Period design-ins citing a reference design in their plan |
| 2 | Verticals released with schematic, layout and BOM |
| 58 | Design-file packages released to evaluating teams |
| 4 → 12 | Evaluations running concurrently |
| 9.4 → 9.1 h (per eval) | Applications support hours per evaluation (guardrail) |

**Figure — Datasheet to working demo, broken into phases: eleven weeks before the reference designs, three weeks after, with board design falling from three weeks to none**

| name | values | label |
|---|---|---|
| Before | [2, 3, 2, 3, 1] | 11 weeks |
| After | [1, 0, 0.5, 0.5, 1] | 3 weeks |

_Median evaluation cycle before and after, from the stalled-eval review and from twelve evaluations run on the released designs, Jan 2025 – Jan 2026. The phase that vanishes is board design, which is the point: we did not make partners faster at the hard step, we removed it._

**How we counted.** An active evaluation is one where a named engineer has requested design files and has hardware on order or in hand. Teams holding a dev kit without a project, and teams that have only asked for pricing, are excluded — both were counted before this program and both inflated the number while explaining none of the conversion. The nine period design-ins are the same nine on the dev-kit page; six cite a reference design, so the figures overlap by construction and must not be added.

`Released package — schematic (PDF and source) · 4-layer layout with electrode geometry fixed · validated BOM with tested substitutions · shared firmware tree, per-vertical build flags · smartglasses design on the BAN line with compressed video · tactical design on the BAN line, PTT audio profile · electrode placement guidance per enclosure`

#### 09. What I'd do differently

I gated release on an outside rebuild, then chose the outside team from people who already liked us. Both first rebuilds succeeded, which felt like validation and was closer to a formality — a team already invested pushes through ambiguity a neutral one would file as a defect. The gate was right and the sample was flattering; I would now insist the rebuild come from an evaluation that had not yet committed.

I would also have published the mechanical guidance as a first-class file rather than notes inside the layout package. Electrode placement in an enclosure is the second-largest stall cause, and it sits in a document people open after making the mistake.

> **Note on this sample.** This is a sample portfolio page about real reference designs. The designs, their published descriptions and the demonstration videos are public and linked above. Program figures — evaluation cycle times, support hours, design-in attribution and file releases — are invented placeholders and should be replaced with real data before this page is used. No schematic, layout, BOM or partner name is shown. I'm glad to walk through the real program and its numbers in a conversation.

---

### 14. Cost-effective smart watch

| Field | Value |
|---|---|
| Slug | `eegrab-smart-watch` |
| Company | EEGRAB |
| Years | 2023 |
| Track | silicon |
| Domain | Consumer wearable |
| Status | production |
| Context | EEGRAB · 2023 · Consumer wearable |
| Role | Product owner end to end, requirements to production handoff — senior embedded design engineer |
| Team | 3 — me, a firmware engineer and a mechanical designer, with the CTO carrying the commercial side |
| Timeline | Q1 2023 – Q1 2024 |
| Stage | In production — shipping as a catalogue product |

**Positioning.** A watch that loses in the shop and wins on the wrist: the colour screen went, and a week of battery came back with it.

**Outcome (card copy).** Cut the smartwatch bill of materials to a price Indian retail could carry while keeping heart-rate sensing and phone notifications.

**Problem.** At the bottom of the smartwatch market the specification is written by the price. We opened nine watches from the band we wanted to sell into: seven had spent about a third of their bill of materials on a colour screen, and eight claimed a week of battery that measured two to four days in use.

**What I did.** I owned the watch end to end as an engineer. The decision the product rests on is dropping the colour screen for a reflective display that costs almost nothing to leave on — which is what a buyer compares in a shop, and what they stop caring about by the second week.

**Result.** One decision set the tier: the display is a cost decision disguised as a feature decision, and once it went reflective the battery, the charging circuit and half the enclosure stopped being separate problems. The board is real and on this page — processor, sensors, crystals, antenna network. The costs, battery life and the return-rate guardrail below are the worked example the programme was scored on.

> **Confidentiality.** EEGRAB product work. The schematic and board views are my own working files, rev 1.0, January 2024. There is no public product page to link. The circuit is real — the processor, sensors, crystals and antenna network are what is on the sheet — and every figure is invented: bill-of-materials costs, battery life, return rate, retail band and the nine-watch teardown in section 02 are illustrative, not EEGRAB's books.

#### 01. Why this, and why now

In a price-set tier the margin is won in the bill of materials, not in the shop, and there is only ever one place where enough of it is concentrated to matter. I started by costing our own first build to find where the money was, rather than by listing features anyone would want.

One third of it sat behind the glass. That makes the display the product decision and everything else a rounding error, which is uncomfortable, because the display is also the only part of a watch a buyer evaluates before paying.

**Figure — Share of the first build's bill of materials by subsystem: display and driver 34 percent, processor and radio 22 percent, battery and charging 16 percent, enclosure 15 percent, sensors 13 percent**

| name | value | label |
|---|---|---|
| Display and driver | 34 | 34% — one decision, a third of the cost |
| Processor, radio and passives | 22 | 22% — already a single part |
| Battery and charging | 16 | 16% — falls out of the display decision |
| Enclosure, strap and glass | 15 | 15% — tooled, so effectively fixed |
| Sensors | 13 | 13% — the reason anyone buys it |

_Costed from the first Smart Band build at 5,000 units, Q1 2023. The sensors are the cheapest line and the whole point of the product; the display is the most expensive line and the part a buyer forgets about within a fortnight. Every argument on this page follows from that inversion._

Segments, not accounts: entry-tier consumer buyers in Indian retail, and white-label buyers who want the board without our name on the strap. Neither group speaks to us before buying.

#### 02. The problem as people experienced it

I bought nine watches from the retail band we were aiming at, opened all of them, and costed every line I could identify against distributor pricing at our own volume. Then I ran each one down from full charge on a usage profile matching ours.

| What we opened | What it cost them | Across 9 watches |
|---|---|---|
| A colour screen behind glass | About a third of the bill of materials | 7 of 9 |
| "7 days" printed on the box | Two to four days once the screen is used | 8 of 9 |
| SpO2 on the packaging | The same front end as heart rate, one wavelength | 5 of 9 |
| A proprietary charging cradle | A return waiting to happen, and no spare sold | 6 of 9 |

**Figure — Bill of materials by subsystem, tier median from the teardowns against our target: display 390 rupees against 190, processor and radio 250 against 195**

| name | before | after |
|---|---|---|
| Display | 390 | 190 |
| Processor, radio | 250 | 195 |
| Battery, charging | 180 | 140 |
| Sensors | 150 | 145 |
| Enclosure | 170 | 150 |

_Nine teardowns costed at our own volume, Q2 2023. The strategy is one bar: spend roughly half what the tier spends on the display and match them everywhere else, including on sensors. Undercutting on sensors would have saved ₹5 and removed the reason the watch exists._

The reframe: the tier is not competing on watches, it is competing on shop windows. A colour face sells the unit and then spends the next two years disappointing the person who bought it.

#### 03. My role and approach

My title was senior embedded design engineer. The CTO owned the commercial relationships — retail buyers, pricing, which white-label enquiries we chased — and I owned the product end to end from requirements through schematic, board, firmware bring-up, enclosure and production handoff.

The governing decision is that the display is a cost decision disguised as a feature decision. Once you accept that, the battery, the charging circuit and half the enclosure stop being separate problems and become consequences of one choice.

**Key decisions**

- **Trade the colour screen for a reflective one that costs nothing to leave on.** It buys the display line and the battery line at once, the only lever on this board that pays twice.
- **Put everything on one processor with its own radio.** A pre-certified radio module would have removed months of tuning and added enough per unit to push retail into the next bracket up.
- **Keep the sensor set intact and cut elsewhere.** Sensors are the cheapest thing on the board and the only reason anyone chooses a watch over a cheap band.
- **Make warranty returns the number nothing may be traded against.** Every cost-down decision can be paid for in reliability, and the invoice for that arrives a year later in somebody else's budget.

#### 04. What I cut

**Scope**

- _Shipped:_ Reflective always-on display · Optical heart-rate sensing · Six-axis motion sensing for steps and sleep · Skin temperature · Phone notifications over Bluetooth · Nine days between charges
- _Deferred:_ A white-label firmware variant · Over-the-air firmware update · A second display option in the same footprint
- _Cut:_ Colour screen · Blood-oxygen readings · Wi-Fi

The colour screen was the cut that set the tier, and what it really removed was the shop-window demo. A reflective display is unreadable in the one place a buyer sees it — a lit cabinet, held for thirty seconds — and unbeatable everywhere they will actually use it. What covers the gap is the number we could print instead: nine days on a charge, on a stated profile, against a tier that claims a week and delivers three days. The honest cost is that we depend on the box, the listing and the reviews to make an argument the product cannot make by being picked up, and in a retail aisle we lose to a brighter rectangle.

#### 05. How I got it agreed

The sourcing lead refused to buy the display I had specified. His objection had nothing to do with my battery argument, which he accepted. At our volume the part had one credible supplier and a fourteen-week lead time, and he would not carry a consumer line on a single-source part that long: one allocation event and the programme stops with tooled enclosures in a warehouse and a retail slot going elsewhere.

I had been defending the choice on power and readability, which was answering a question he had not asked. So I took his frame — the risk is not which display is best, it is what the product does on the day that display is unavailable — and moved the decision up a level. I specified the interface instead of the part: a defined connector and pin map at the board edge, and a display abstraction in firmware.

He agreed, then asked for something I had not planned. Designing for a second source was not enough — he wanted one built, shipped and sold before placing the first volume order. That bought an extra qualification and pilot run ahead of revenue, and leaves us maintaining two display drivers permanently.

#### 06. What was built

A two-layer board about the size of a large postage stamp, carrying one processor that does the radio, the sensors and the display, a reflective panel on a connector, an optical heart-rate front end, a six-axis motion sensor, and a battery people forget needs charging.

**Interface — Rendered view of the final smart watch board: a 48-pin processor bottom left, a second sensor package, two crystals, board-edge connectors and a discrete antenna network**

- **One processor doing radio, sensors and display, with nothing beside it.** A pre-certified radio module would have removed the hardest work on the project and added enough to every unit to push retail into the next bracket. In this tier the bracket is the product.
- **A discrete antenna and matching network, not a module.** That is a certification campaign and a tuning loop we took in-house to hold the cost floor. The standing price is that any enclosure change reopens the tuning.
- **Two crystals, and the slow one is the expensive decision.** Running the clock off the internal oscillator saves a part. Timekeeping drift is the complaint that generates returns in this tier, and the crystal costs less than one of them.
- **The display sits behind a connector, not soldered down.** That is what made the second-source qualification in section 05 possible without a new board, and it is the only reason the concession was survivable.

_My own board view from the project's EasyEDA workspace, rev 1.0, January 2024. Component placement and the parts visible are real; every cost and performance figure on this page is invented._

**Gallery**

- **Untitled**  The final sheet. Almost everything on it is either the processor or a consequence of not using a radio module: the two crystals, the matching network at the antenna pin, and the regulator. The sensors, display and temperature channel are each a short branch off one bus.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Shelf appeal vs daily use | A reflective display, always on | We lose in a lit retail cabinet, every time |
| Cost floor vs schedule | A discrete radio rather than a module | Certification and antenna tuning we owned ourselves |
| Single best part vs supply risk | A defined display interface, second source qualified | An extra pilot build before revenue, two drivers forever |
| Feature count vs return rate | Fewer claims, none of them optimistic | No SpO2 line on the box, which every competitor prints |

#### 08. Impact and outcomes

We agreed before build that this failed if a unit could not be landed under ₹900 at five thousand units while holding a week between charges. Warranty returns are the guardrail, because in a cost-down programme every one of these decisions can be funded out of reliability, and that bill arrives a year later against somebody else's budget.

**Metrics**

| Value | Measure |
|---|---|
| ₹820 (at 5,000 units) | Landed bill of materials |
| ₹2,000–2,500 | Retail price band the design targets |
| 9 days (on the agreed profile) | Battery life between charges |
| 2.1% (first 12 months) | Warranty return rate (guardrail) |
| 3 (heart rate, motion, temperature) | Sensor channels |
| 4 (three bands plus the final) | Board revisions to production |

**Figure — Route through the cost and battery trade space across four board revisions, from 1,180 rupees and three days to 820 rupees and nine days**

| name | x | y | note |
|---|---|---|---|
| Smart Band 1 | 1180 | 3 | colour screen, always on |
| Smart Band 2 | 1040 | 5 | colour screen, wake on gesture |
| Smart Band 3 | 940 | 8 | reflective display; SpO2 still fitted |
| Final board | 820 | 9 | SpO2 dropped, on-chip regulator enabled |

_Target: None — agreed before build: under ₹900, a week on a charge_

_The four board revisions, Q1 2023 to Q1 2024. The shape is the argument: revision two tried to buy battery by dimming the colour screen and moved almost nowhere, because the cost stayed and the display was still the load. Changing the display type moved both axes at once. The last step is small and it is what took the programme from nearly acceptable to sellable._

**How we counted.** Battery life is typical days from full charge under the profile we agreed with the retail buyer: continuous motion sensing, heart rate sampled four times an hour, around forty notifications a day and two minutes of screen interaction. It excludes continuous heart-rate monitoring, which roughly halves it. Warranty return rate is units returned in the first twelve months as a share of units sold, counting cosmetic and no-fault-found returns too, because excluding those is how the number stops meaning anything.

`Board configuration — Nordic nRF52840-QFAA-F-R7 in 48-pin QFN carrying Bluetooth, sensing and display · on-chip DC/DC regulator enabled with a 4.7 µH inductor · discrete antenna with a 0.8 pF and 0.5 pF matching network rather than a certified module · 32 MHz and 32.768 kHz crystals, both with 12 pF loading · InvenSense six-axis motion sensor on I²C · reflective always-on display on a board-edge connector with a defined pin map · reflective optical heart-rate front end · skin temperature channel · two-layer board, roughly 31 × 25 mm, 1.6 mm, ENIG finish · designed in EasyEDA 6.5.40, rev 1.0, LCSC parts and JLCPCB fabrication`

#### 09. What I'd do differently

I made warranty returns the guardrail and then built no way to read a watch that came back. There is no cycle count, no reset counter, nothing stored on the unit, so return analysis is a spreadsheet of what customers wrote in a form and what a technician guessed. A few bytes of flash would have turned the number I chose to be judged on into something I could act on.

I also accepted the charging cradle. The teardowns told me a proprietary connector generates returns in this tier, I wrote it down, and shipped one anyway because the cradle was tooled before I got to it and arguing meant reopening a decision outside my scope. It was inside the scope I claim on this page, and I did not fight for it.

> **Note on this sample.** Sample portfolio page. This project is data-thin, so the split matters: what is real is the design — the processor and its part number, the six-axis sensor, both crystals, the antenna matching network, the board size and layer count, and the four board revisions, all from my own EasyEDA workspace dated January 2024. The display type, heart-rate front end, battery and charging circuit are described by function because the sheet names them only as connections, and no part number is claimed for them. Every figure is invented and internally reconciled: bill-of-materials costs, battery life, return rate, retail band, and the nine-watch teardown in section 02. There is no public product page for this watch, so nothing here can be checked externally — I'm glad to walk through the real design in a conversation.

---

### 15. Team performance reporting — five teams, three windows

| Field | Value |
|---|---|
| Slug | `team-performance-reporting` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Delivery reporting |
| Status | internal |
| Context | Ixana · 2026 · Delivery reporting |
| Role | Product manager, delivery owner |
| Team | 1 automation engineer, with the five delivery leads as reviewers |
| Timeline | Jan – May 2026 |
| Stage | Live across five teams; weekly, monthly and quarterly |
| Link | /demo/team-performance |

**Positioning.** One engine, five delivery teams, three reporting windows — and every published delay carries a root cause a named person signed.

**Outcome (card copy).** One engine produces the weekly, monthly and quarterly performance report for all five delivery teams — four of which had no standing report at all.

**Problem.** AMS spent about two days a month on a performance report in which only 21% of delayed tasks arrived with a stated cause. The other four delivery teams had no standing report at all, and paid for that once a quarter in a lead's week.

**What I did.** I split the report along a line nobody had drawn — counting is deterministic and stays rule-based, synthesis goes to a model — then made it a function of two parameters, team and window, rather than a product built five times.

**Result.** Five teams run one engine on three windows, nothing publishes unsigned from monthly upwards, and no count on any report is computed by a model — the signature gate and the coverage arithmetic run live in the demo. The before-and-after coverage figures below are the worked example.

**Evidence / demos**

- [Open the working demo — five teams, three windows, one engine](/demo/team-performance)
- [Or start where a lead starts, at the week's open and overdue work](/demo/team-performance?team=rtl&cad=weekly&sheet=open)

> **Confidentiality.** Internal reporting. The five team names are real internal groupings; every person, task, comment, cause and figure on this page and in the demo is invented for this sample. No individual's performance data appears anywhere.

#### 01. Why this, and why now

Three reporting problems were on the table at the start: the monthly AMS report was the most expensive to produce, a status summary the most visible, real-time alerts the most requested. I sized them by how often each changed a decision — a report nobody acts on is a cost with no offsetting benefit however cheap it becomes.

Once AMS was running the second question arrived: build it four more times, or make the one that exists take a parameter.

**Figure — Lead hours spent assembling material before each quarterly review, by team: AMS 4, RTL 19, FW 17, PS 16, HW 14**

| name | value | label |
|---|---|---|
| RTL — no standing report | 19 | 19 hours |
| FW — no standing report | 17 | 17 hours |
| PS — no standing report | 16 | 16 hours |
| HW — no standing report | 14 | 14 hours |
| AMS — monthly report to draw on | 4 | 4 hours |

_Timed against calendar and document history for the four quarterly reviews of 2025, Dec 2025. AMS is the control: the team with a standing monthly report spent a quarter of what the others did, and the gap is the whole argument for parameterising rather than rebuilding._

Sixty-six hours a quarter is not the expensive part; the expensive part is that it is assembled from memory in the week before the review it is for, which is why that review was where a slip was first heard about.

#### 02. The problem as people experienced it

I read six months of AMS reports against the underlying task data and coded what each said versus what was knowable, then coded sixteen quarterly review decks the same way. The people producing this material could describe the effort accurately and had no view of what was being lost.

| What the reporting did | Where it broke | Evidence |
|---|---|---|
| Counted completed and delayed tasks (AMS) | Counts were right and stood alone | 6 of 6 reports; the only reliable section |
| Named delayed tasks (AMS) | Cause left blank or given as "pending" | 79% of delayed tasks over 6 months |
| Summarised the month in prose (AMS) | Written from memory, not from the sheets | 3 reports contradicted their own tables |
| Built a deck per quarter (RTL, PS, HW, FW) | Figures reconstructed by hand at the deadline | 5 of 16 decks contradicted the task data |
| Circulated to leadership | Different versions in different inboxes | 3 versions of one month's report found |

**Figure — Across six AMS monthly reports and sixteen quarterly decks: 79 percent of delayed tasks had no stated cause, 44 percent of comment threads already held one, 31 percent of decks contradicted the task data, and one team in five had a standing report**

| name | value | label |
|---|---|---|
| Delayed tasks with no stated cause | 79 | 79% |
| Cause already written in the thread | 44 | 44% |
| Quarterly decks contradicting the task data | 31 | 5 of 16 |
| Teams with any standing report | 20 | 1 of 5 |

_Retrospective coding, Jun–Nov 2025 for AMS and the four 2025 quarterly reviews for the rest, against the underlying task records. The second bar decided the design: in nearly half of unexplained delays the explanation had already been written by an engineer and was simply never read._

The reframe: this was a reading problem, not a collection problem. Engineers on all five teams explained delays in comment threads as they happened, and no process could spend attention on forty threads a month.

#### 03. My role and approach

I owned the workflow from trigger to published report, and the rule about where judgement is allowed — and, before the expansion, whether a second team is a second product.

**Key decisions**

- **A report is two parameters, not five products.** Five copies drift inside a quarter and cannot then be compared.
- **The window decides what the model is for.** A worst decile of nine rows is one row. Weekly runs on a threshold, monthly on the decile, the quarter on nothing.
- **Counting stays deterministic; only synthesis goes to a model.** A model occasionally wrong about a count destroys trust faster than one occasionally vague about a cause.
- **Nothing publishes unsigned from monthly upwards, and deliberately not below.** Requiring a signature made the feature acceptable; requiring one weekly would teach everybody that signing means nothing.

#### 04. What I cut

**Scope**

- _Shipped:_ Weekly, monthly and quarterly windows for all five teams · Open and overdue work, reported weekly and nowhere else · Delay detail with generated root causes and a signature gate · Six shared cause categories, clustered into recurring blockers at the quarter · A portfolio sheet reporting coverage and nothing else
- _Deferred:_ Per-team sheets beyond the shared shape · Customer-facing export · Automatic distribution by email
- _Cut:_ Any ordering or ranking of the five teams · Root cause analysis on every delayed task · Individual performance ratings in any published report

Ranking the five teams was the hardest cut, because leadership asked for it directly. It fails on comparability, not cost: post-silicon is bench hours, firmware is release cycles, hardware is board spins around a fabrication slot. A number meaning "late" in one does not mean "late" in another, so any ordering is an artefact of the vocabulary we agreed rather than a fact about delivery. What covers the gap is a portfolio sheet comparing coverage — how much of what a report claims carries a name — a fact about the report, and the same measurement everywhere. The cost is that the question is still asked, and answered in a room where nobody can check it.

#### 05. How I got it agreed

The RTL lead had seen the AMS report and did not want it. His objection was vocabulary: a delayed task in AMS is a design block that missed a date, and half his team's work is regression triage that never had one. A shared report would force his work into a shape wrong in a way leadership could not detect.

So I made the shared surface as small as it could be and still add up: six cause categories and a report shape. Group names, what counts as a task and how projects map stay each team's own. The categories cost every team a distinction it cared about.

He accepted, and added the condition that improved it: if the five teams appear on one page at all, the only column is coverage. It measures the report rather than the work, and it is the one number a lead controls.

#### 06. What was built

One n8n sub-workflow that takes a team and a window. It clears the prior rows, fetches tasks due inside the window, and runs parallel branches — efficiency per assignee, group distribution, and delayed-task analysis that pulls each comment history and drafts a cause. A second pass reads the generated sheets rather than the source, which is why the narrative and the tables agree. At the quarter nothing is fetched.

**Interface — The monthly delay detail sheet for AMS. The team and window controls sit above the report; coverage reads 84 per cent, 32 signed of 38; the worst four rows carry a model-written draft cause, a worst-decile badge and a cause category, with the signer's name beside each.**

[Open this sheet in the demo and sign a cause](/demo/team-performance?team=ams&cad=monthly&sheet=delay)

- **The team and the window sit above the report, never inside a menu.** They are the whole product. A reader who cannot see which two parameters produced a number will eventually quote it as though it were another team's.
- **The signature column sits beside the cause, not at the end of the row.** An unsigned cause has to be distinguishable from a signed one at a glance, or the gate becomes a formality.
- **Every row carries one of the six shared categories.** It is the only field five teams fill the same way, and the only reason the quarterly can count anything across them.
- **Unconfirmed causes read "cause not confirmed", never blank.** A blank cell reads as no delay to explain. The old AMS report was 79% blank cells, and that is exactly how it was misread.

_Recreated from the internal workbook as a working demo. Structure, columns, rules and the signature gate are accurate; every task, name, comment thread, cause and figure shown is invented. Happy to walk through the real reports in a conversation._

**Gallery**

- **One workflow, three shapes.** — [Open the run screen](/demo/team-performance?team=ams&cad=monthly&sheet=run)  The run screen names the window it is running and how many of its steps reach a model — six, eight and seven steps for weekly, monthly and quarterly. Switching the window changes the pipeline, not the product; the button on it runs the report again.
- **A generated cause, beside the thread it came from.** — [Open this task and try to sign it](/demo/team-performance?team=ams&cad=monthly&sheet=delay&task=T-2214&signed=0)  The analysis names the comments it drew on and they are marked in the thread. Signing is refused unless the person signing owns the affected work — try it as another group's lead.
- **The weekly, and the only sheet that names open work.** — [Open the weekly for RTL](/demo/team-performance?team=rtl&cad=weekly&sheet=open)  A monthly report counts what closed. The weekly is the only window that names work still open past its date — the part a lead can still change — and it carries no signature anywhere.
- **The quarter reads the months.** — [Open the quarterly for AMS](/demo/team-performance?team=ams&cad=quarterly&sheet=blockers&state=published)  No task record is fetched at this window. The blockers are signed causes from three published reports, grouped — and the one falling fastest is "no cause recorded", which is the reporting improving rather than the delivery.
- **The one page the five teams share.** — [Open the portfolio sheet](/demo/team-performance?team=hw&cad=quarterly&sheet=portfolio&state=published)  Coverage and nothing else. On-time rate, delay days and any ordering of the teams are deliberately absent, and the sheet says so where a reader would look for them.

_Every screen above is the state its own link opens, captured from the running demo on invented data and a simulated run. It exists so the argument on this page can be checked rather than taken on trust: switch team, switch window, sign a cause, try to sign someone else's, or publish a quarter over a month that has not been published and watch the gate refuse._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Reach vs fit | One report shape and six categories across five teams | Every team gave up a distinction its own work turns on, and the report is thinner than any one of them would have designed |
| Comparability vs the question leadership asked | Coverage as the only cross-team number | The ranking is still wanted, and now gets made informally in a room where nobody can check it |
| Coverage vs attention | Written analysis on the worst decile, floor of two rows | Roughly nine delayed tasks in ten arrive as a row and a link rather than an explanation |
| Speed vs accountability | Nothing publishes unsigned from monthly upwards | About one cause in seven ships unconfirmed, and a quarter cannot publish over a month that has not been |
| Maintainability vs precision | Five fixed rosters mapped to live identities | Fifty-four people across five teams; every joiner or leaver is a manual edit, and a missed one silently drops a person |

#### 08. Impact and outcomes

We agreed before build that this failed if a report ever went out carrying a root cause nobody had signed. Version count was the guardrail: three versions of one month circulating was the symptom the process had lost its single source, and five monthly reports where there had been one is the fastest way to lose it again.

**Metrics**

| Value | Measure |
|---|---|
| 1 → 5 | Teams with a standing performance report |
| 2 days → 12m | Time to produce one monthly report |
| 21% → 84% | AMS delayed tasks with a stated root cause |
| 84% (May 2026 — 69 of 82) | Delayed tasks with a signed cause, all five teams |
| 3 → 1 | Versions of a report in circulation (guardrail) |
| 0 | Counts or percentages computed by a model |

**Figure — Share of delayed tasks carrying a signed root cause, by team, from each team's first run to its third: rising from between 45 and 60 percent to between 80 and 89 percent**

_Signed-cause coverage per team across its first three runs, Mar–May 2026. The lines cross, which is the finding: the team that started lowest finished highest, and the two that finished lowest are the two whose leads sign inside a release or a tapeout week. Coverage tracks when a lead can stop, not how much their engineers write — which is not what the AMS evidence predicted._

**How we counted.** A delayed task carries a stated root cause when the published report contains a specific reason attributable to a signed owner. "Pending", "under investigation" and a blank cell all count as no cause. The other four teams have no before figure at all, rather than a zero.

`Technical configuration — one n8n sub-workflow with team and window as parameters · 3 run shapes of 6, 8 and 7 steps · paginated task retrieval on the weekly and monthly windows, none at the quarter · rule-based counting, delay classification and six-category tagging · gpt-4o-mini for root cause synthesis, quarterly clustering and dashboard narrative · second pass reads the generated sheets, the quarterly reads published reports · 3, 6 and 4 Excel sheets rewritten with headers preserved`

#### 09. What I'd do differently

I built the signature gate as a spreadsheet column, which works and is the wrong shape. It is now seventeen group leads opening a workbook, reading a thread in another tab and typing a name, and the cause in seven that ships unconfirmed is almost always an owner who was travelling.

I also rolled to four more teams on one team's evidence. Coverage rose everywhere, which is equally consistent with leads signing whatever draft they are shown — nobody has sampled a signed cause against what actually happened. I can prove the 21% and not the 84%.

> **Note on this sample.** This is internal reporting. The screens in section 06 are a working recreation with invented content, and all figures on this page are invented placeholders for this sample. The five team names are real internal groupings at Ixana; every person, task, comment, cause and number inside them is made up. No task, customer or individual's performance data is shown. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 16. Scrum ecosystem — one workspace for sprint ceremonies

| Field | Value |
|---|---|
| Slug | `ixana-scrum-ecosystem` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Agile tooling |
| Status | internal |
| Context | Ixana · 2026 · Agile tooling |
| Role | Product manager, ceremony owner |
| Team | 2 engineers |
| Timeline | Jan 2026 – present |
| Stage | Live for three engineering squads |
| Link | /demo/scrum-desk |

**Positioning.** Standup, backlog, burndown and review became four views of one task record instead of three documents somebody kept up by hand.

**Outcome (card copy).** Standup, backlog and burndown now read from the same task data instead of three separately maintained views.

**Problem.** Three artefacts — a standup document, a backlog sheet and a burndown chart — were kept by hand beside the task records they described. Diffed across six sprints, 61 of their 218 rows disagreed with the record.

**What I did.** I rebuilt the four ceremonies as views of the record rather than documents about it, and moved the boundary from reads to writes: four fields a ceremony may change, one allow-list module, a ledger open to the whole squad.

**Result.** Nothing on the standup board is typed and nothing is stored — every line is a diff of the task record, so drift is zero by construction rather than by discipline. Writes are four fields behind one allow-list, on a ledger the whole squad can read. The meeting-length and adoption figures below are the worked example.

**Evidence / demos**

- [Open the working demo — a live sprint on day 6, four ceremonies, one record](/demo/scrum-desk)

> **Confidentiality.** Internal product — the screens in section 06 are recreations of the working demo on an invented sprint, and every figure on this page is an invented placeholder for this sample.

#### 01. Why this, and why now

Ixana already had a read-only dashboard over this workspace, and read-only was right for what it does. Ceremonies were the part it deliberately did not touch, so they stayed in documents beside the workspace, updated by whoever remembered.

Three options were open: the tool of record's own sprint module, an agile product bought in, or ceremonies built as views of the records we already had. The first two add a place where work lives; only the third removes one. The case was never that ceremonies are expensive — it was the sixth of that cost spent producing a second, worse copy of what we already own.

**Figure — Engineer-hours per sprint spent in and around ceremonies, three squads: planning 12.7, standup 10.7, keeping the three artefacts current 6.0, review 4.0, retrospective 4.0**

| name | value | label |
|---|---|---|
| Sprint planning | 12.7 | 12.7 h |
| Daily standup | 10.7 | 10.7 h |
| Keeping the three artefacts current | 6 | 6.0 h |
| Sprint review | 4 | 4.0 h |
| Retrospective | 4 | 4.0 h — out of scope |

_Two-week sprint, three squads, 26 engineers, timed over sprints 27–32 from calendar entries and meeting recordings. About 37 engineer-hours a sprint, of which the six spent maintaining artefacts buys nothing a reader could not have got from the records themselves — and that six is what made the case, not the thirty-one spent talking._

#### 02. The problem as people experienced it

I did not run a survey. Everyone agreed ceremonies were long and nobody agreed why, so I diffed instead: for six sprints I froze each artefact at the moment its ceremony ended and compared it row by row against the record it described. Of 218 rows, 61 disagreed.

None were clerical. Each was a number somebody had already decided from — a task planned around as open that had closed two days earlier, five points burned down twice because the task behind them had been split.

| Artefact | Where it broke | Evidence |
|---|---|---|
| Standup document | Written the night before, read out the next morning, stale by both | 82 rows checked, 24 disagreed |
| Backlog sheet | A private ordering that only re-entered the workspace when someone remembered | 71 rows checked, 22 disagreed |
| Burndown chart | Recomputed by hand, so a split task burned its points twice | 65 rows checked, 15 disagreed |

**Figure — Rows checked against rows that disagreed with the task record, by artefact, over six sprints**

| name | a | b |
|---|---|---|
| Standup document | 82 | 24 |
| Backlog sheet | 71 | 22 |
| Burndown chart | 65 | 15 |

_Sprints 27–32, three squads; each artefact frozen at the end of its own ceremony and diffed against the workspace the same minute. Twenty-eight per cent of rows were wrong, and the standup document is worst because it is the only one written before the day it describes._

The burndown was wrong least often and mattered most when it was.

#### 03. My role and approach

I owned scope, the write boundary and the ceremony rules.

**Key decisions**

- **A ceremony is a view, not a document.** Nothing on the board is typed; each line is a diff of the record since yesterday. The only inputs it takes are what is blocking you and what you want to ask for.
- **Write-narrow, rather than read-only.** A ceremony exists to change state, and a read-only one sends people to a second tab — which is where the hand-maintained document came from. So this writes: four fields, one module, every write listed.
- **The burndown is recomputed on read.** A stored chart is a fourth artefact, and section 02 says what happens to those.

#### 04. What I cut

**Scope**

- _Shipped:_ Standup board generated from the record diff · Backlog and planning with a capacity meter · Burndown, recomputed on read, in points and tasks · Sprint review log · Drift check against the tool of record · Write ledger, open to the whole squad
- _Deferred:_ Cross-squad rollup · Sprint goal progress tracking · Ceremony scheduling from the calendar · Velocity forecasting
- _Cut:_ Retrospective board · Model-written story point estimates · Per-person history view

The retrospective board was the hardest cut, and the ceremony people asked for most. It fails on the property that makes a retrospective work: people say things in it they would not put in the tool of record, and the problem is not who can read the board but that anyone might. Retros stay in an anonymous document outside the system; only action items come back as tasks. The cost is that the ceremony most often abandoned is now the one I cannot see.

Model-written estimates went for a cleaner reason: an estimate is a commitment a team makes to itself, and once a machine proposes the number the team stops owning it. The squad's own history shipped instead, and a person types the number.

#### 05. How I got it agreed

The head of people operations blocked the first version, and she was right to. A per-person blocker log, retained and searchable, is a performance record whatever it is called, and she is the one who would have to defend it in an appraisal.

So I changed what exists rather than who may see it. Ceremony state is keyed to the task and to nothing else: there is no person row in the schema, and the per-person column is a filter computed on render and discarded on close.

She agreed, with two conditions I had not planned to give: no per-person export of any kind, and a ceremony archive visible to every member of a squad rather than to its lead, so anyone who can be measured can read the measure. The second is why the write ledger is a product surface and not a log file.

#### 06. What was built

Four ceremonies over one dataset. The standup board renders the record's diff since yesterday, blockers attached to tasks. Planning shows the ranked backlog beside a capacity meter built from each engineer's own median throughput. The burndown sums task rows on read, in points and in tasks, so slicing shows up as two lines separating. Behind them sit the drift check and the write ledger.

**Interface — The Sprint Desk standup board on day 6 of sprint 41, showing per-person cards generated from the task record, two blocked tasks, and a counter of items already in the record**

[Open this board in the demo — the day strip replays the sprint](/demo/scrum-desk?tab=standup&day=6)

- **The counter is the product marking its own homework, and it is unflattering.** It counts the items on the board that were already in the record — the things a person used to read aloud. It is the number the case study is scored on, and it is displayed to the people being measured by it.
- **Nothing on this board is stored, so there is no second copy to reconcile.** The board is a query. That is why the drift number on this page is zero by construction rather than by discipline, and why zero is not claimed as an achievement in section 08.
- **Every line is a diff, not an entry.** "Closed · T-4121" is a state change the record already holds. A person adds two things a record cannot know: what is blocking them, and what they want to ask for.
- **A blocker attaches to the task, never to the person.** This is the concession from section 05 made visible: the card reads "T-4141, blocked 2 days", and the per-person column above it is a filter computed on read and never written down.

_A recreation of the running demo rather than a mock-up — same layout, same rules, on an invented ten-day sprint of 21 tasks and 8 engineers. Every name, task and figure is made up for publication; the ceremony rules, the four-field write boundary and the counter are the real ones._

**Gallery**

- **Planning** — [Pull an item into the sprint](/demo/scrum-desk?tab=planning)  Capacity is each engineer's own median over four sprints, minus booked leave. The bar beside every backlog row is what this squad's comparable tasks actually took — the thing that replaced a suggested estimate.
- **Burndown** — [Switch the unit and watch the guardrail](/demo/scrum-desk?tab=burndown)  Summed from the task rows on read, with work added after day one shaded. The unit toggle is the guardrail: when the task line falls faster than the points line, someone is slicing work to move it.
- **Drift check** — [Replay the audit](/demo/scrum-desk?tab=drift)  The product's own scoreboard, here replaying the pre-launch audit from section 02 — the same 218 rows and 61 disagreements, artefact by artefact.
- **Write ledger** — [See what the desk may change](/demo/scrum-desk?tab=ledger)  Four writable fields, one allow-list module, and everything else deep-linked out. Open to the whole squad rather than to leads, which is the second condition from section 05.

_Four of the six screens. The two not shown are the sprint review log and the person filter, which is deliberately the least interesting screen in the product._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Changing state vs protecting the workspace | Four writable fields behind one allow-list module, every write on an open ledger | A lead who spots a wrong due date on the board still has to leave to fix it |
| One board shape vs three squads' habits | No per-squad configuration | The AMS squad runs a two-part standup that does not fit, so they run it in halves |
| A burndown that moves vs honest sizing | Count points, show task count beside it | The line looks flat through a week spent on one large task, and leads have to say so out loud |
| Ceremony memory vs a performance record | Fourteen days of ceremony state, nothing keyed to a person | "When did this start slipping" has to be answered from task history instead of from the board |

#### 08. Impact and outcomes

Before build we agreed this failed if any squad still kept a private standup document a month after launch. Four sprints in, none of the three keeps one.

The guardrail was the median size of a closed task: a burndown counted in tasks rewards closing small ones, and a product that improved every meeting metric while halving task size would be a worse product with a better dashboard. It has held at three points since launch.

**Metrics**

| Value | Measure |
|---|---|
| 24 (of 26) | Engineers in a ceremony each week |
| 18m → 9m | Median standup length |
| 61% → 11% | Standup minutes spent reading out state |
| 95m → 55m | Sprint planning length |
| 3 → 0 | Ceremony artefacts maintained by hand |
| 3 → 3 pts | Median size of a closed task (guardrail) |

**Figure — Median standup length against the minutes not spent reading out state, sprints 32 to 41: the total falls from 18 minutes to 9 while the useful part holds at 7 to 8**

_Sprints 32–41, three squads; length from meeting recordings, the split coded by two people against the same rule and reconciled. The finding is the band, not either line: the useful part of a standup was always seven or eight minutes, and what disappeared was ten minutes of reading out state — which is also why the meeting did not keep shrinking after sprint 39._

**How we counted.** An engineer counts as in a ceremony in a week if they opened the standup board on a day it ran, or their name appears against a ceremony write. Opening the burndown alone does not count: it is the screen a director opens.

`Technical configuration — ceremony state in Postgres keyed by task id · task records read through the tool-of-record API on a 60-second cache · four writable fields behind a single allow-list module · burndown summed on read and never stored · 14-day retention on ceremony state`

Drift now stands at zero, and I do not report it as an achievement: it is zero because the second copy no longer exists, which is what removing it means.

#### 09. What I'd do differently

I would build the write ledger first. It went in late, to show the head of people operations that the four-field boundary was a claim she could check, and it turned out to be what made engineers trust the product at all.

And I would have solved the retrospective instead of cutting it. The cut was correct on the constraint I set, but I treated that constraint as fixed rather than the thing to solve. A genuinely anonymous surface pushing back only action items would probably have worked.

> **Note on this sample.** Sample page. The screens are recreations of the working demo on an invented sprint, and every figure — the audit counts, the meeting lengths, the adoption fraction — is an invented placeholder. The ceremony rules, the four-field write boundary and the reason the retrospective is missing are the real design. Happy to walk through the running product in a conversation.

---

### 17. Flow Tracker — real-time delivery pipeline diagnostics

| Field | Value |
|---|---|
| Slug | `ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Engineering ops |
| Status | internal |
| Context | Ixana · 2026 · Engineering ops |
| Role | Product manager, delivery owner |
| Team | 3 engineers, 1 data engineer |
| Timeline | Feb 2026 – present |
| Stage | Live across three engineering teams |
| Link | https://xana-nine.vercel.app/efficiency?view=tracker |

**Positioning.** One live view of the PS, AMS and RTL delivery pipelines, so a weekly review starts from the same picture instead of three reconstructions of it.

**Outcome (card copy).** One live view across the PS, AMS and RTL pipelines — three stage vocabularies kept, one shared surface, and an assistant that answers from filtered records or refuses.

**Problem.** Every Monday, three engineering leads rebuilt the same picture by hand from a task tool, a bandwidth spreadsheet and their own memory — a median of 41 minutes each, assembled differently, so the three reviews were not comparable.

**What I did.** I owned a tracker that models each team's pipeline separately but presents them on one surface, with a historical delay view and an assistant that answers from filtered records rather than open-ended generation.

**Result.** Each team kept its own stage vocabulary — the tidy canonical model would have been wrong for two of the three — and classification ships with its correction rate on the header, where the people relying on it can see it. The assistant answers from filtered records and refuses the ranking question outright; all of it is clickable in the live demo. Adoption and preparation-time figures below are the worked example.

**Evidence / demos**

- [Open the working demo — three pipelines, their delays and the reasons behind them](https://xana-nine.vercel.app/efficiency?view=tracker&team=ps&mode=wrong)

> **Confidentiality.** Internal product — the screens in section 06 are a running recreation with invented task data, and all figures on this page are invented placeholders for this sample. Every task name, owner, comment and date in the demo is made up for publication; owners are roles rather than people, for the same reason the leaderboard ranks teams.

#### 01. Why this, and why now

Three operations problems competed for the same quarter: pipeline visibility, a bandwidth reporting rebuild, and a delivery-risk alerting system. I sized them the same way — lead and architect hours consumed per month — from a fortnight of calendar sampling across eleven people plus the review observations in the next section.

**Figure — Lead and architect hours lost per month: assembling review material 96, chasing delay explanations 54, reconciling bandwidth 22**

| name | value | label |
|---|---|---|
| Assembling review material | 96 | 96 h / mo |
| Chasing delay explanations | 54 | 54 h / mo |
| Reconciling bandwidth | 22 | 22 h / mo |

_Opportunity sizing, Jan 2026, from two weeks of calendar sampling across 11 leads and architects. Assembly and delay-chasing were the same underlying problem seen twice, which is why one product addressed both and the bandwidth rebuild waited a quarter._

It was urgent rather than merely large because a delay nobody explains gets re-explained in the next review, so the two largest bars fed each other week after week.

#### 02. The problem as people experienced it

I sat in eight weekly delivery reviews across the three teams and timed the preparation rather than asking people to estimate it, shadowing two of the eight from the moment the lead opened their laptop.

| What they did | Where it broke | Evidence |
|---|---|---|
| Exported the task list | Stage names differed per team, so the export needed hand-editing | 8 of 8 reviews; median 14 min |
| Opened the bandwidth spreadsheet | Last refreshed by someone else, date unknown | 6 of 8; two reviews ran on stale capacity |
| Wrote down why late items were late | The reason lived in a task comment thread nobody re-read | 8 of 8; median 19 min |
| Compared this week to last week | No stored history, so comparison was from memory | 7 of 8 compared verbally with no artefact |

**Figure — Median minutes per review preparation step across eight observed reviews: reading comment threads 19, editing the export 14, reconciling bandwidth 6, assembling slides 2**

| name | value | label |
|---|---|---|
| Reading comment threads | 19 | 19 min |
| Editing the task export | 14 | 14 min |
| Reconciling bandwidth | 6 | 6 min |
| Assembling the summary | 2 | 2 min |

_Time-and-motion observation, eight weekly reviews across PS, AMS and RTL, Jan–Feb 2026. Reading comment threads to reconstruct a delay reason was the largest single cost and the one nobody had named — leads described the problem as "exporting", because that is the part that feels like work._

The reframe: leads were not short of data, they were short of an agreed shape for it. Three teams with different delivery flows had been asked to fit one export format, so every review began by undoing it.

#### 03. My role and approach

I owned scope across ingestion, the pipeline model, the two views and the assistant — and the negotiation with each team about what their stages were. That negotiation was the product work; the rest followed.

**Key decisions**

- **Three pipeline definitions, one product surface.** The tidy answer was one canonical stage model, and it would have been wrong for at least two of the three teams. Stages are per-team; only the surface is shared.
- **A historical view, not just a live one.** Daily execution and retrospective analysis are different jobs, and splitting them across two tools guarantees the retrospective one never gets built.
- **The assistant answers from filtered records, not free generation.** Efficiency questions have exact answers, so the assistant translates a question into a filter over stored records. A wrong answer is then a wrong filter — visible and fixable — rather than a fluent invention.
- **Automatic stage classification with a visible correction.** Classifying unstructured tasks is the only way this works at volume, and it will sometimes be wrong. Every stage carries a one-click correction, and the correction rate is the metric I report.

#### 04. What I cut

**Scope**

- _Shipped:_ Three per-team pipeline views · Historical delay analysis · Task drill-down drawer · Velocity leaderboard · Grounded efficiency assistant
- _Deferred:_ Cross-team dependency links · Email digest of stalled work · Custom stage definitions in the UI
- _Cut:_ Automatic stage inference for RTL · Predicted completion dates · Write-back to the task tool

Cutting automatic stage inference for RTL was the hardest call — it is the team with the most tasks and the most to gain. On a sample of 200 tasks the classifier reached 54% against the 71% it managed elsewhere, low enough that leads would have stopped trusting the view. A manual stage field set on task creation costs their lead ten minutes a week, and a slower correct view beats a fast one that has to be checked.

#### 05. How I got it agreed

The RTL lead did not want to be in this product at all. He had built his own verification tracker in a spreadsheet, it fit his flow exactly, and his position was that a shared tool would either flatten his stages into something meaningless or force his team to maintain data for somebody else's dashboard. Both of those had happened to him before.

I stopped arguing that a shared tool would serve him and asked what his spreadsheet could not do. The answer was comparison: he could see his own pipeline perfectly and could not answer a director's question about RTL against PS without a week's notice. That reframed it from "one model or three" to "what has to be shared for comparison to work", and the answer was small — stage entry and exit timestamps, not stage names.

He agreed on two conditions. RTL keeps its own stage vocabulary rather than a normalised set, which is why the product carries three pipeline definitions. And nothing writes back to the task tool, so his team can never be blocked by a bug in my product — which is why write-back sits in the cut column rather than the deferred one.

#### 06. What was built

A tracker showing where each task sits in its team's pipeline, with a delay mode for overdue work across a chosen window, a drill-down drawer for one task's history, a velocity leaderboard, and an assistant answering efficiency questions against stored records. It classifies work into stages and stores the result so history survives.

**Interface — The PS delay view: an eleven-stage test flow in the team's own words, one stage panel open showing its classification confidence and a control to move the work to another stage, and every late task decomposed into start, length and completion delay beside it.**

[Open this screen in the demo — the panel opens with it](https://xana-nine.vercel.app/efficiency?view=tracker&team=ps&mode=wrong&panel=3)

- **Stage names are the team's own words.** Request intake, bench setup, characterisation, sign-off — PS's vocabulary, not a normalised one. That was the thing the RTL lead refused, and he was right: a stage nobody recognises is a stage nobody corrects.
- **The correction control sits on the stage itself.** The open panel names what put the work there and how sure it was, then offers one move. Classification will be wrong some of the time; putting the fix where the error appears is what turned the correction rate into a metric we actually receive.
- **The correction rate is on the header, not in a report.** Two of 48 stages corrected, 4.2%, beside the line saying stages are model-classified. The guardrail on automatic classification is only a guardrail if the people relying on it can see it without asking.
- **A delay is three numbers, not one.** Every row splits into start, length and completion delay against the planned window. Leads argued about different things once they could see which of the three had moved.

_The running demo, on an invented set of 48 tasks across three pipelines. Layout and interactions are the real ones; every task name, owner, comment and date is made up for publication._

**Gallery**

- **Three pipelines, three vocabularies** — [Open RTL on the stage that is holding it](https://xana-nine.vercel.app/efficiency?view=tracker&team=rtl&mode=wrong&stage=9)  RTL's eleven stages are verification stages, and nothing maps them onto the eleven test-flow stages in the shot above. The header says stages here are set by the team: automatic inference for RTL reached 54% on a sample of 200 and was cut, so this team types the stage in. The link opens the bug-triage stage already selected.
- **Delay reasons show the source comment** — [Open this drawer in the demo](https://xana-nine.vercel.app/efficiency?view=tracker&team=ps&mode=wrong&panel=3&task=ps-04)  Planned window against what actually happened, the delay split three ways, and under it the comment thread the reason came from, attributed and dated. In the observations leads would not carry an explanation into a review that they could not trace back to whoever wrote it. The link opens this task with its drawer already open.
- **The leaderboard ranks teams, never individuals** — [Open the leaderboard](https://xana-nine.vercel.app/efficiency?view=tracker&team=ps&mode=wrong&board=1)  Three pipelines compared on stage timestamps — the one field they share — and a line saying the per-person view was never built. The same data ranked by person would have changed how tasks get written within a week, and the tracker would have started measuring the writing rather than the work.
- **The assistant shows the filter, not just the answer** — [Ask this question in the demo](https://xana-nine.vercel.app/efficiency?q=Why%20is%20the%20AMS%20layout%20behind%3F)  A question becomes a filter over stored records, and the filter is printed under the answer. A wrong answer is then a wrong filter — visible, and fixable — rather than a fluent invention. Ask it who the best engineer is and it says the ranking does not exist. The link opens this question already asked.

_Four screens from the same invented dataset as the shot above. Each link opens the screen in the picture — the stage panel, the drawer, the leaderboard and the answered question all travel in the URL, so a link lands on what it shows rather than near it._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Comparability vs team fit | Three pipeline definitions sharing only stage timestamps | Cross-team comparison is limited to timing, so we cannot compare stage-for-stage |
| Coverage vs trust | Automatic classification everywhere except RTL | RTL carries about ten minutes a week of manual stage setting, indefinitely |
| Assistant usefulness vs groundedness | Filtered records only, no open-ended generation | The assistant refuses roughly a fifth of questions it could have answered plausibly and wrongly |
| Read-only vs one workflow | No write-back to the task tool | Leads correct stages in two places when the underlying task is also wrong |

#### 08. Impact and outcomes

Before build we agreed this failed if fewer than half of the 31 leads were running their weekly review inside it within a quarter. The guardrail was the stage correction rate — classification people quietly stop believing is worse than none, and the correction rate is the only early signal of that.

**Metrics**

| Value | Measure |
|---|---|
| 26 (of 31) | Leads running a weekly review in it |
| 41m → 12m | Median review preparation time |
| 3 → 1 | Sources opened before a review |
| 71% | Tasks auto-classified into the right stage |
| 4.2% | Stages corrected by a lead (guardrail) |
| 3 | Delivery pipelines modelled separately |

**Figure — Median review preparation minutes before and after, by team: PS 44 to 11, AMS 38 to 10, RTL 41 to 16**

| name | before | after |
|---|---|---|
| PS | 44 | 11 |
| AMS | 38 | 10 |
| RTL | 41 | 16 |

_Review preparation time by team. Before figures are the timed observations from Jan–Feb 2026; after figures are self-reported over four weeks in month three. RTL improved least, which is the visible cost of cutting automatic stage inference for that team — the manual stage field is exactly those extra minutes. The 12-minute figure in the tiles is the median across all leads; it is not the median of these three team medians, which is 11._

**How we counted.** A lead counts as running their review in the product when they opened their pipeline view within the 24 hours before a scheduled review, at least three weeks in four. Opening it at any other time does not count, because casual browsing was never the behaviour we were trying to create. Three populations appear on this page and are not interchangeable: the three team leads who run the flagship Monday reviews and were observed in section 02, the 31 group leads across the three teams who form the adoption denominator, and the 11 leads and architects in the January calendar sample. And the gap between 71% classification accuracy and a 4.2% correction rate is not leads missing errors — it is that the 71% was sampled across every task while a lead only touches the stages their review passes through, so most misclassifications sit on work no review ever surfaces. That is why the correction rate is the guardrail and not the accuracy claim.

`Technical configuration — 3 pipeline definitions · task-tool v2 API and SharePoint bandwidth ingest · PostgreSQL store · FastAPI endpoints · gpt-4o-mini for stage classification and assistant filter selection`

#### 09. What I'd do differently

I treated the stage model as a data problem and it was a political one. Two of the three teams changed how they name stages once they saw them rendered publicly, quietly invalidating a month of classifier tuning. I would now freeze stage vocabularies with each lead in writing first, and treat a change as a schema change with notice rather than a mysterious drop in accuracy.

I also built the velocity leaderboard because it was easy, and it is the feature I would remove. It gets looked at, it has never changed a decision, and it started a recurring argument about whether team throughput is comparable at all.

> **Note on this sample.** This is an internal product. The demo linked above is a running recreation of it: the three pipeline models, the stage-correction control, the delay decomposition and the grounded assistant behave as the real product does, on an invented set of 48 tasks. Every task name, owner, comment, programme and date there is invented, and all figures on this page are invented placeholders for this sample. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 18. ClickUp Activity Tracker — task change audit trail

| Field | Value |
|---|---|
| Slug | `github-for-clickup-automation-on-the-changes-going-outside-p` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Audit tooling |
| Status | internal |
| Context | Ixana · 2026 · Audit tooling |
| Role | Product manager, delivery owner |
| Team | 2 engineers |
| Timeline | May 2026 – present |
| Stage | Live for one workspace space |
| Link | /demo/clickup-audit |

**Positioning.** Turned a raw activity feed into a searchable record of who changed what — holding the one thing the native feed never keeps: the value a field held before.

**Outcome (card copy).** Turned a raw activity feed into a searchable who-changed-what timeline — previous values retained, raw payloads stored before parsing, every retry deduplicated.

**Problem.** Questions of the form "who moved this date, and when" arrived about fourteen times a month and each consumed an afternoon. A quarter of support requests held 41 of them, and the native feed could technically answer all 41 — by scrolling an unfiltered chronological list with no search and no way to see a field's previous value.

**What I did.** I scoped a service that stores every webhook payload raw before interpreting it, computes field-level diffs, and presents them as a filterable timeline. The decisions that mattered were exclusions: one space, human edits by default, and a deliberately narrow set of fields.

**Result.** Every event is stored raw before it is interpreted, so when the parsing rules changed — twice — history was replayed without re-fetching anything, and a tampered delivery gets a 401 with nothing stored: the demo runs the whole chain live. Answer-time and request-volume figures below are the worked example.

**Evidence / demos**

- [Open the working demo — the timeline, searched for a date that moved](/demo/clickup-audit?q=Aug+14)
- [Or start with the record it replaced, on the task that took three hours](/demo/clickup-audit?view=feed)

> **Confidentiality.** Internal tooling. The demo linked from this page is a working recreation on a fixed clock, and all figures here are invented placeholders for this sample; no task, customer or individual’s activity appears anywhere on it.

#### 01. Why this, and why now

Three compliance-adjacent asks were live: a change audit trail, a document approval record, and an access review report. I sized them by how often each was requested and how long each took to satisfy — all three are the same gap, that the company could not reconstruct its own decisions.

**Figure — Person-hours per quarter spent answering each kind of request: task change history 123, access review 18, document approval history 9**

| name | value | label |
|---|---|---|
| Task change history | 123 | 123 h — 41 requests |
| Access review | 18 | 18 h — 6 requests |
| Document approval history | 9 | 9 h — 4 requests |

_Sizing from a quarter of support records, Apr 2026. Task change history was an order of magnitude more expensive than the alternatives, almost entirely because each individual answer took about three hours rather than because the requests were especially frequent._

It also went first because the data was already leaving the building — the workspace emits an event for every change and we discarded all of them. Every month of delay was a month of unrecoverable history, which is not true of the other two.

#### 02. The problem as people experienced it

I audited every support request in a quarter that asked what had changed on a task, and timed how the four most recent were answered. A ticket audit rather than interviews, because the people asking were often outside the team and would not be interviewed about a request they made once.

| What they did | Where it broke | Evidence |
|---|---|---|
| Opened the task's activity feed | Chronological, unfiltered, no search | 41 of 41 requests started here |
| Scrolled looking for the change | Automation edits outnumbered human ones | Median 380 entries per task examined |
| Tried to find the previous value | Feed shows that a field changed, not what it was | 31 of 41 needed the old value specifically |
| Asked the person they suspected | Recollection, not record | 17 of 41 ended in someone's memory |

**Figure — Of 41 change-history requests in one quarter: 31 needed a previous value, 24 concerned a due date, 17 were answered from memory, 5 went unanswered**

| name | value | label |
|---|---|---|
| Needed a previous value | 31 | 31 / 41 |
| Concerned a due date | 24 | 24 / 41 |
| Answered from memory | 17 | 17 / 41 |
| Never answered at all | 5 | 5 / 41 |

_Support ticket audit, one quarter, Jan–Mar 2026. The first bar decided the architecture: three quarters of requests need the value a field used to hold, which the native feed does not retain — so no amount of better searching would have answered them._

The reframe: this was never a search problem. The record did not contain the answer, and a better filter over the feed would have satisfied ten of the 41 requests.

#### 03. My role and approach

I owned scope, the ingestion boundary and the field set. Most decisions were exclusions, each about keeping the record readable rather than complete.

**Key decisions**

- **Store the raw payload before interpreting anything.** Parsing rules are guaranteed to be wrong at first. Persisting raw means a rule change can be replayed over all of history, which has happened twice.
- **One space, enforced at ingestion.** Filtering at query time means storing every event in the workspace and hoping the filter holds. Rejecting at the boundary means unrelated activity is never stored — a stronger promise to the people whose work it is.
- **Deduplicate on the source history identifier.** Webhook delivery retries, and a retry that produces a second timeline entry makes the record suspect.
- **Primary fields only in the first release.** Attachments, time tracking and checklists were excluded. Two of 41 requests concerned them, and they would have tripled event volume.

#### 04. What I cut

**Scope**

- _Shipped:_ Raw payload storage · Snapshot diffs on status, assignee, priority, due date and custom fields · Filterable and searchable timeline · Signature verification on ingest · Deduplication and replay
- _Deferred:_ Attachment and checklist events · Time tracking changes · Export to CSV for auditors
- _Cut:_ Multi-space coverage · Automation and bot edits in the default view · Alerting on specific field changes

Excluding automation edits from the default view was the hardest cut. They are about a tenth of events and they genuinely change things. I cut them because of how the feed was actually used: people scrolled 380 entries to find one human decision, and bot edits were most of what they scrolled past. They are stored, one toggle away, and the toggle is off when you arrive.

#### 05. How I got it agreed

One engineering manager argued that filtering out automation edits made the tool dishonest. Most churn on his team's tasks comes from automations he wrote, those automations have caused real problems, and a timeline hiding them by default tells a story in which only humans change anything.

Rather than defend the default, I asked what question he was trying to answer, and it was a different one from everyone else's. His was "what is my automation doing across many tasks"; the 41 audit requests were all "who decided this, on this task". Those need different views, and I had been trying to serve both with one filter setting.

We settled on the human-first default staying, with two additions he asked for. The toggle state shows in the header rather than a filter panel, and each task shows a count of suppressed automation events, so the omission is visible even when the toggle is off. Bot edits turned out to be 9.2% of events, and that number now appears on every timeline — which was his real point, and a better one than the argument we started with.

#### 06. What was built

A service that receives change events from one workspace space, verifies their signature, stores the raw payload, and computes a snapshot diff across status, assignee, priority, due date and custom fields. A timeline presents those diffs with search and filtering, showing previous and new value, who made the change, and when.

**Interface — A change timeline searched for “Aug 14”. Each row carries the time, the person, the field they changed and both values side by side — the old one struck through, the new one boxed — with the matched text highlighted in both. A banner above the list says 300 automation edits are hidden and offers a switch, and every row ends in a “raw event” button.**

[Search the timeline for a date that moved](/demo/clickup-audit?q=Aug+14)

- **Both the old and new value appear on the same line.** Three quarters of audited requests needed the previous value, and a feed that says only that a field changed cannot answer any of them.
- **The suppressed-automation count sits in the header.** The concession from section 05 — the omission has to be visible without turning the toggle on, or the default is quietly editorial.
- **Search runs over values, not just field names.** People remember the date that got changed, not that a due-date field was modified.
- **Each entry links to the raw stored event.** For an audit answer, showing the underlying record is the difference between a report and evidence.

_Recreated as a working demo, pinned to Wednesday 26 August 2026 so the figures on this page stay true. The pipeline order, the field set, the ignore rules and the deduplication key are the real ones; every person, task, value and date shown is invented. Happy to walk through the real system in a conversation._

**Gallery**

- **The same task, in both records.** — [Try to answer it in each column](/demo/clickup-audit?view=feed)  The request that took three hours, put to each record in turn. On the left the feed people actually used: 380 entries, no search, and — scroll to entry 268 — an answer that names the person and the new date and stops there. On the right the same task and the same period, searched for the value the asker remembered. The previous value is the whole argument for building this, and it is the one thing the left column never contains.
- **The 41 requests, and the two it still cannot answer.** — [Answer them yourself](/demo/clickup-audit?view=questions)  Eight of the quarter’s requests, each with what it cost the old way and what the tracker returns now. Two are badged out of scope, and opening one gets an explicit “attachment history is not stored” rather than an empty timeline — an empty result would have read like “it never happened”, which is a worse answer than none. The count of status changes in question 05 is computed from the record set at load, not written on the page.
- **One delivery, and the four decisions acting on it.** — [Send one, then send it again](/demo/clickup-audit?view=ingest)  Send the payload, then send it a second time: the signature verifies, the raw body is stored before anything is interpreted, one of three history items is dropped as out of scope, and the retry writes nothing because both history ids are already present. Tampering with the body returns 401 with nothing stored at all. Below it, the same stored payloads re-rendered under each parsing rule — the two rule changes this service has had, replayed over history with no ClickUp call.
- **Behind any row, the delivery it came from.** — [Open the filter, then any raw event](/demo/clickup-audit?task=86a3kh9jb&field=status&bots=1&from=2026-07-01&to=2026-07-31)  The timeline is a rendering; this is what arrived. The panel names the verified signature, the stored raw event, and the source’s own history id — the deduplication key, which is why a retry cannot produce a second entry. Behind it sits the filter that answers question 05: one task, status only, July, automation switched on, nine records. For an audit answer, being able to show the stored delivery is the difference between a report and evidence.

_The demo runs on invented data and a fixed clock. It exists so the claims on this page can be checked rather than taken on trust: search for a value and watch it match inside the diff, switch the search to the week-1 behaviour and watch the same query return nothing, or deliver the same webhook twice and watch the duplicate count stay at zero._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Completeness vs readability | Human edits by default, automation stored and counted | One recurring argument, and a default that has to be explained to every new auditor |
| Storage vs recoverability | Persist every raw payload before parsing | Storage grows with activity rather than with what we display |
| Scope vs promise | One space, rejected at the boundary | Every additional space is a config change and a conversation with its owner |
| Field breadth vs event volume | Five primary fields in v1 | Two of 41 requests still cannot be answered, both about attachments |

#### 08. Impact and outcomes

We agreed before build that this failed if answering a change question still took longer than five minutes — a faster afternoon was not worth building. The guardrail was duplicate records: a timeline containing the same change twice is not a slightly worse audit trail, it is an unusable one, so the deduplication rate is checked on every ingest run.

**Metrics**

| Value | Measure |
|---|---|
| 3h → 4m | Median time to answer a change question |
| 41 → 6 | Change requests reaching a person, per quarter |
| 5 → 0 | Requests going unanswered per quarter |
| 0 | Duplicate timeline records after dedup (guardrail) |
| 9.2% | Events that are automation edits, shown as a count |
| 2 | Parsing rule changes replayed over stored history |

**Figure — Median minutes to answer a change question by week after launch, falling from 41 to 4 against a five-minute threshold**

_Threshold: 5 — Pre-agreed threshold: 5 minutes_

_Median answer time by week for the first seven weeks live, Jun–Jul 2026, timed on every request received. The first three weeks are above the threshold because search was matching field names rather than values — the fix in week four is the single largest step, and it came from watching one person fail to find a date they could remember exactly._

**How we counted.** Answer time runs from the request arriving to the answer being sent, including queue time, because that queue is what made the previous process feel like an afternoon. It is timed on every request rather than sampled, since fourteen a month is small enough to measure exhaustively.

`Technical configuration — webhook ingest with signature verification · raw payload table written before parsing · SHA-based dedup on source history identifier · single-space filter enforced at the boundary · snapshot diff across 5 primary fields · Next.js and PostgreSQL`

#### 09. What I'd do differently

I shipped search that matched field names before anyone had tried to use it. The first three weeks of answer times were dominated by that one mistake, and watching a single person attempt a real query would have caught it — which is exactly what fixed it in week four.

I would also start the retention conversation earlier. The service holds every raw event for a workspace space indefinitely, which was right for replayability and is a question nobody has asked yet. An audit trail with no retention policy is a liability accumulating quietly, and I would rather agree a period at design time than the first time someone asks what we still hold about them.

> **Note on this sample.** This is internal tooling. The demo linked from section 06 is a recreation with invented content on a fixed clock, and all figures on this page are invented placeholders for this sample. No task, customer or individual’s activity is shown. I’m glad to walk through the real system and the underlying numbers in a conversation.

---

### 19. Video library and meeting recordings

| Field | Value |
|---|---|
| Slug | `ixana-video-library-automated-company-video-library` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Meeting intelligence |
| Status | internal |
| Context | Ixana · 2026 · Meeting intelligence |
| Role | Product manager, delivery owner |
| Team | 3 engineers |
| Timeline | Mar 2026 – present |
| Stage | Live, company-wide |
| Link | https://xana-nine.vercel.app/videolibrary |

**Positioning.** Made every recording searchable by what was said in it, so people arrive at the minute that matters instead of scrubbing an hour.

**Outcome (card copy).** Made every recording searchable by transcript, so people jump to the minute that matters instead of scrubbing an hour of video.

**Problem.** Recordings accumulated in two places and were effectively write-only. Of 212 recordings in one month, log analysis showed 38 were ever opened again, and whoever did scrubbed for nearly six minutes before finding the passage they wanted — or gave up and asked the organiser.

**What I did.** I owned an experience that indexes both sources, stores timestamped transcript cues, and makes the transcript the primary way to navigate a recording, with grounded question answering and generated minutes in the same workspace.

**Result.** The transcript is the navigation, not a feature beside the video: a search hit is a sentence and the second it was said, and every claim in the generated minutes carries a timestamp — all of it clickable in the live demo. The time-to-moment and usage figures below are the worked example.

**Evidence / demos**

- [Open the working demo — a recording, its transcript and its minutes](https://xana-nine.vercel.app/videolibrary)

> **Confidentiality.** Internal product — the player screen described in section 06 is a recreation with invented meeting content, and all figures on this page are invented placeholders for this sample. No recording, transcript or attendee name appears on this page.

#### 01. Why this, and why now

Three investments sat in the same quarter: making recordings searchable, an automatic minutes service, and a hand-filled decision register. I sized each by how much of the archive it would make retrievable, because an archive nobody can enter is the only one of the three that compounds — every unretrievable meeting is re-run as a new one.

**Figure — Share of one month of recordings made retrievable by each option: transcript search 100 percent, automatic minutes 46 percent, manual decision register 12 percent**

| name | value | label |
|---|---|---|
| Transcript search | 100 | 100% of 212 |
| Automatic minutes only | 46 | 46% — meetings long enough to summarise |
| Manual decision register | 12 | 12% — observed fill-in rate |

_Opportunity sizing, Feb 2026, across the 212 recordings captured in January. The decision register scored on the fill-in rate of an existing wiki page used for the same purpose, which is the fairest available estimate and a generous one._

The register lost on a rate we had already measured elsewhere: things people must remember to fill in get filled in about one time in eight. Minutes alone lost because they answer "what was decided", not "what exactly did they say about the coupling test" — the question people actually brought.

#### 02. The problem as people experienced it

I analysed playback logs for the 212 recordings captured in January — opens, seeks, abandonment — and interviewed nine people who had opened one that month about what they were looking for.

| What they did | Where it broke | Evidence |
|---|---|---|
| Searched for the meeting by title | Titles are calendar invites, not contents | 6 of 9 could not find a meeting they had attended |
| Opened the recording and scrubbed | No cue to what happens where | Median 5m 50s of seeking per session |
| Gave up and asked the organiser | The answer stayed in a chat thread | 5 of 9; 3 organisers fielded most of it |
| Re-ran the discussion as a new meeting | The archive grows, retrievability does not | 2 of 9 named a specific instance |

**Figure — Of 212 recordings captured in one month, 38 were opened again, 14 were watched past two minutes, and 6 produced written notes**

| name | value | label |
|---|---|---|
| Recordings captured | 212 | 212 |
| Opened again at all | 38 | 38 |
| Watched past 2 minutes | 14 | 14 |
| Produced written notes | 6 | 6 |

_Playback funnel for January 2026, from platform logs. The drop from 212 to 38 is the archive problem stated plainly: capturing meetings was solved, and entering them was not._

The reframe: this was not a video problem. People wanted a passage of speech and were handed a timeline, and every workaround they had invented was a way of getting speech back out of a medium that stores it badly.

#### 03. My role and approach

I owned scope across ingestion, the library, the player workspace and the AI surfaces, and held the product to three jobs: find the right recording, get to the right moment, leave with usable notes. Anything else was deferred by default.

**Key decisions**

- **The transcript is the navigation, not a feature beside the video.** Every line is a seek target, and the player is the secondary surface. Treating it that way is what moved time-to-moment by minutes rather than seconds.
- **Both sources under one experience.** Recordings and stored video live in different systems and are the same object to someone looking for something. Unifying them removed a decision the user should never have had to make.
- **Full transcript context, not chunked retrieval.** A meeting is one argument spread over an hour, and chunking loses the thread that makes an answer correct. Holding the whole transcript costs latency and buys answers that survive being checked.
- **Access follows the meeting, not the library.** A recording is visible to the people invited to it, full stop. That decision predates the compliance conversation in section 05 and is why it ended where it did.

#### 04. What I cut

**Scope**

- _Shipped:_ Transcript-linked playback · Hybrid search over titles and transcripts · Meeting question answering · Generated minutes with decisions and actions · Folder browsing across both sources
- _Deferred:_ Clip creation and sharing · Speaker-level search filters · Retention policy automation
- _Cut:_ Speaker diarization correction UI · Live in-meeting notes · Cross-meeting topic threading

The diarization correction interface was the hardest cut. A wrong speaker label attached to a decision is worse than no label — but an editor needs a permission model for who may amend a record of what someone said, which is a far larger question than it appears. A report-a-problem link routing to the organiser handled forty cases in the first quarter.

#### 05. How I got it agreed

The compliance lead wanted recordings out of search entirely. Her concern was correct: a recording is a verbatim record of people speaking informally, indexing it makes every offhand remark permanently discoverable, and she had no appetite for explaining to an employee that a sentence they had forgotten saying had surfaced in a search result two years later.

I could not argue the risk was imaginary, so I made the argument smaller. I separated the two things being indexed — that a meeting happened, and what was said inside it — and showed most of the retrieval value in our nine interviews came from finding the right meeting, which needs only titles, attendees and dates. That turned a question of principle into one of scope.

We landed on transcripts indexed but searchable only by people already entitled to open the recording, so search never widens access. She added a condition I had not offered: organisers can mark a meeting excluded before it starts, irreversibly. About 6% are marked, and that switch is what made the rest acceptable to index.

#### 06. What was built

A company video library that fills itself: a call ends, the recording and transcript are pulled from Teams or SharePoint, a channel is chosen, and cues, minutes and questions are built before anyone opens it.

What makes it worth having is opening one. Every item carries its own transcript, suggested questions and minutes, and an answer comes back as the line a person actually said, timestamped.

**Interface — The library shelf: an ingest strip across the top tracing a call from ending to appearing, and beneath it a grid of recordings and stored video with duration and source badges, one item marked excluded by the organiser**

[Open the library — the shelf above, live](https://xana-nine.vercel.app/videolibrary)

- **Nothing on this shelf was put here by a person.** Ingestion pulls the recording and its transcript, picks a channel and builds the cues, minutes and prompts before anyone opens it. The archive reached 690 recordings without anybody filing one.
- **Every item on it can be asked a question.** Any item opens with its transcript, questions written for it, and answers returned as the line somebody said and the second they said it.
- **Every item leaves you with minutes.** Summary, decisions and actions per item, timestamped claim by claim. Nobody circulated a minute they could not spot-check.
- **Excluded meetings show as excluded, not as absent.** Third along the top row. The organiser marks it before the meeting, irreversibly — the condition that made indexing the rest acceptable.

_The running demo, on an invented archive of eight items across five channels. Every title, transcript line, name and figure is made up for publication, and the thumbnails are generated title cards — inventing a poster frame would be a picture of a meeting that never happened._

**Gallery**

- **A hit is a line, not a title** — [Run this search in the demo](https://xana-nine.vercel.app/videolibrary?q=milliwatts)  Searching “milliwatts” returns the sentence that matched and the second it was said, across a recording and a stored video at once. Titles are calendar invites rather than contents. The link opens this search already run.
- **Ask any video** — [Open this video with the question already asked](https://xana-nine.vercel.app/videolibrary?v=meeting-integration&ask=1)  The prompts belong to this recording rather than to the product, so the first click lands on a real answer. The reply is the line that was said, attributed and timestamped. The link opens this video with that question already asked.
- **Minutes, on the same video** — [Open the same video on its minutes](https://xana-nine.vercel.app/videolibrary?v=meeting-integration&tab=notes)  Summary, decisions and actions for the item on screen, each claim carrying the moment it came from. Published minutes reached 11% of recorded meetings.

_Three moments from the same invented archive as the shelf above._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Answer fidelity vs cost per question | Full transcript context rather than chunked retrieval | Roughly an order of magnitude more tokens per question, and a hard ceiling on meeting length |
| Retrievability vs discomfort | Index transcripts, but never widen access, and allow irreversible exclusion | About 6% of meetings are permanently invisible to the archive, including some worth keeping |
| Freshness vs API load | Five-minute response cache on the library listing | A newly finished recording can take five minutes to appear, which reads as a bug to the person who just left the call |
| Unified sources vs connector fragility | One experience across recordings and stored video | Two ingestion paths to monitor; user and drive resolution breaks differently in each |

#### 08. Impact and outcomes

Before build we agreed this failed if fewer than a quarter of re-opened recordings were entered by search or transcript jump rather than a direct link — that is, if we had built a nicer player rather than a way into the archive. The guardrail was access: any recording served outside its attendee list would have stopped the rollout.

**Metrics**

| Value | Measure |
|---|---|
| 5m50s → 90s | Median time to reach the relevant moment |
| 70% | Re-opened recordings entered by transcript jump |
| 212 → 690 | Recordings indexed, month 1 to month 6 |
| 11% | Recorded meetings with published minutes |
| 47 (of 140) | Employees using it weekly by month 3 |
| 0 | Recordings served outside attendee list (guardrail) |

**Figure — After launch, of 690 indexed recordings 244 were opened again, 171 were entered by transcript jump, and 78 produced published minutes**

| name | value | label |
|---|---|---|
| Recordings indexed | 690 | 690 |
| Opened again | 244 | 244 |
| Entered by transcript jump | 171 | 171 |
| Produced published minutes | 78 | 78 |

_The same funnel as section 02, Mar–Aug 2026 — the first five months after launch, from platform logs. The stage that moved is the second one — re-opening went from 18% of the archive to 35% — and the fall-off after transcript jump is where the next quarter's work is, since a third of jumps still end without a note being written._

**How we counted.** Time to the relevant moment means the interval between opening a recording and the last seek before two uninterrupted minutes of playback. It excludes sessions with no playback at all, which are people confirming a meeting exists rather than looking for something in it. The 140 in the weekly-use denominator is the mid-2025 roster — up from about 75 a year earlier — and it has held roughly flat since.

`Technical configuration — Microsoft Graph ingestion for recordings and stored video · transcript cues stored per utterance with speaker label · full-transcript context to roughly 100K tokens · 5-minute response cache on library listings · gpt-4o-mini for minutes and question answering`

#### 09. What I'd do differently

I built minutes generation before I understood who was supposed to send them. The number moved, but 11% of meetings having published minutes hides that a handful of people publish nearly all of them — the archive's concentration problem, moved one step downstream. A tool cannot assign ownership, and I spent a quarter behaving as though it could.

I would also set the cache differently. Five minutes was chosen to protect an API quota with plenty of headroom, and the cost is that the most common first action — looking for the meeting you just left — is where the product appears broken. I optimised a constraint I assumed rather than measured.

> **Note on this sample.** This is an internal product. The screen described in section 06 is a recreation with invented content, and all figures on this page are invented placeholders for this sample. No recording, transcript or attendee name is shown. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 20. Calendar sync — Outlook and Gmail without leaking detail

| Field | Value |
|---|---|
| Slug | `calendar-automation-real-time-bi-directional-sync-engine-wit` |
| Company | Ixana |
| Years | 2025 |
| Track | ai |
| Domain | Workplace automation |
| Status | internal |
| Context | Ixana · 2025 · Workplace automation |
| Role | Product manager, delivery owner |
| Team | 1 engineer, with IT security as reviewer |
| Timeline | Apr – Aug 2025 |
| Stage | Live for the affected group |

**Positioning.** Kept Outlook and Gmail calendars in step for people living in both, without letting a single private event title cross between them.

**Outcome (card copy).** Kept two calendar tenants in step without a single event title able to cross - reflected time is an opaque block by design, and every write previews before it lands.

**Problem.** A group worked across two calendar tenants and neither system knew about the other. In a two-week diary study, six of them recorded 11 double-bookings and about two hours each per week of manual tidying — copying invites across, blocking time by hand, apologising for clashes.

**What I did.** I owned a service that mirrors Outlook meetings to a Gmail attendee, publishes a subscribable feed, and reflects Google busy time back as opaque blocks. The product argument was entirely about restraint: what it may write, to whose calendar, and what it must never reveal.

**Result.** No event title can reach the Google side because none is ever written — reflected busy time carries no detail at all, which is the answer to what the diary study actually found. Every path previews before it writes, one bad write can only ever touch one occurrence, and the credential's reach was narrowed to the single mailbox it needs. The double-booking counts below are the worked example.

> **Confidentiality.** Internal service — all figures on this page are invented placeholders for this sample, no calendar content is shown, and the endpoints referenced are internal only.

#### 01. Why this, and why now

This competed with two other automation candidates and was the smallest by headcount — eleven people. The alternatives saved time already being spent badly; this one removed an error visible outside the company, because a double-booked person misses an external meeting and someone else notices.

**Figure — Candidate automations scored by externally visible failures per month: calendar clashes 6, late expense approvals 2, stale distribution lists 0**

| name | value | label |
|---|---|---|
| Calendar clashes | 6 | 6 / month, externally visible |
| Late expense approvals | 2 | 2 / month |
| Stale distribution lists | 0 | 0 — internal only |

_Prioritisation, Mar 2025, from the diary study and three months of helpdesk records. Scored on failures a person outside the company would notice rather than on hours saved — which is why the option affecting the fewest people won the quarter._

It was also the only one where the risk of getting it wrong exceeded the prize for getting it right. Every incorrect write sends email to everyone invited.

#### 02. The problem as people experienced it

Six people kept a structured diary for two weeks, logging every time the calendars disagreed. A diary beat interviews here because the incidents are individually forgettable — people called it "a bit annoying" where the log showed something more expensive.

| What they did | Where it broke | Evidence |
|---|---|---|
| Accepted an invite in one tenant | The other tenant showed the slot as free | 11 double-bookings logged in 2 weeks |
| Forwarded invites to themselves manually | Only remembered for meetings they thought mattered | 6 of 6; median 9 forwards per week |
| Blocked time by hand in the other calendar | Blocks went stale when the source meeting moved | 5 of 6; 4 stale blocks found at audit |
| Shared a calendar link instead | Exposed titles they did not want external parties reading | 2 of 6 had already stopped doing this |

**Figure — Two-week diary across six people: 11 double-bookings, 54 manual invite forwards, 22 hand-made time blocks, 4 stale blocks found**

| name | value | label |
|---|---|---|
| Manual invite forwards | 54 | 54 |
| Hand-made time blocks | 22 | 22 |
| Double-bookings | 11 | 11 |
| Stale blocks found at audit | 4 | 4 |

_Diary study, two weeks, n=6, Mar 2025. The forwarding count is the striking one — people had built a manual sync habit and were running it about nine times a week each, which is the work the service was scoped to take over exactly._

The reframe: they did not need their calendars merged, which is what they asked for. They needed each calendar to be right about when they were busy — and the diary's last row, people who had stopped sharing calendar links because of what titles revealed, turned a sync problem into a disclosure problem.

#### 03. My role and approach

I owned scope, the API surface, and the rules about when the service may modify anything. On a product where every write sends email, the interesting decisions are all refusals.

**Key decisions**

- **Busy blocks carry no detail at all.** Reflected time is an opaque block with no title, attendees or body. The diary had already shown people self-censoring their calendars, and a sync that leaks titles would have made that worse.
- **Dry run is the default, not a flag.** Every path previews before it writes. It doubled the endpoint surface and is why no incorrect notification has reached a meeting's attendees.
- **Occurrence level, never the series.** Recurring meetings are where calendar automation does catastrophic things. Editing single occurrences means a bug damages one meeting instead of a year of them.
- **Two paths depending on who owns the meeting.** Where the mailbox organises, the service adds an attendee; where it does not, it forwards. Attempting the first everywhere is the obvious implementation and it fails silently on exactly the meetings that matter most.

#### 04. What I cut

**Scope**

- _Shipped:_ Outlook to Gmail attendee sync · Invite forwarding for non-organised meetings · Subscribable Outlook feed · Google busy time as opaque Outlook blocks · Dry-run preview and job status endpoints
- _Deferred:_ Per-user opt-in portal · Selective sync by calendar category · Conflict notifications
- _Cut:_ Two-way body and attendee sync · Automatic acceptance of mirrored invites · Sync of past events

Two-way body and attendee sync was the hardest cut — it is what people asked for by name. It failed on a rule I had already set: a body sync writes meeting content into a tenant with a different compliance boundary. Opaque busy blocks plus the subscribable feed cover the gap, so anyone needing detail subscribes deliberately and owns the disclosure.

#### 05. How I got it agreed

The IT security administrator refused the design on first review, and he was right to. Running unattended needs application-level permissions rather than a user session, and as scoped those grant read and write across every mailbox in the tenant. His question: why does a calendar tool for eleven people need access to the CEO's mailbox.

I had no good answer, which was the useful part. Rather than argue about the likelihood of misuse, I found the mechanism — an access policy restricting the application's mailbox reach to a named group — and came back with the scoped version, the exact membership, and a demonstration that it failed cleanly outside the group. The conversation stopped being about trust and became about a configuration we could both read.

He approved it with two conditions. The mailbox group is managed by IT, not me, so I cannot widen the service's reach by editing my own config. And every write is logged with actor, target and reason for a year. The second has already paid for itself twice, in incidents that turned out not to be the service's fault.

#### 06. What was built

A service that scans upcoming Outlook events for a scoped mailbox and ensures a configured Gmail address sees them — adding it as an attendee where the mailbox organises, forwarding where it does not. It also publishes a subscribable feed and reads a Google feed to create opaque busy blocks. Every path previews before it writes, and scheduled runs hold a lock so two never overlap.

- **The preview names the action per event, not per run.** A run-level summary hides the one event you would have objected to, which is the only reason to look at a preview at all.
- **Reflected busy blocks show as "Busy" with no source.** Even naming the source calendar tells a colleague which of your two lives an appointment belongs to. The block says only that the time is gone.
- **Skipped events state why they were skipped.** Silent skips were the failure mode of the manual habit this replaced — people did not notice what they had forgotten to forward.
- **Job status is an endpoint, not a log file.** The person who needs to know whether last night's sync ran is not going to read a server log, and if checking is hard the checking stops.

_Recreated from the service's own output. Structure and fields are accurate; all event names, addresses and times shown are invented. Happy to walk through the real service in a conversation._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Usefulness vs disclosure | Opaque busy blocks with no detail whatsoever | People still open the other calendar to find out what a block actually is |
| Automation reach vs blast radius | Occurrence-level writes, never the series master | A recurring meeting that moves wholesale produces one write per occurrence in the window |
| Unattended operation vs credential scope | Application permissions narrowed by an IT-managed access policy | Adding a person to the service is an IT ticket rather than a config change, taking about two days |
| Simplicity vs reliability | In-process background jobs with an overlap lock | A restart mid-run leaves the lock to expire rather than releasing it, so a missed cycle is possible |

#### 08. Impact and outcomes

We agreed two failure conditions before build, one absolute: if any private event title reached the Google side, the service would be stopped rather than fixed. The second was that double-bookings had to reach zero within a month. Disclosure was the guardrail throughout — the headline metric here can be met perfectly while the thing that matters fails.

**Metrics**

| Value | Measure |
|---|---|
| 6 → 0 | Double-bookings per month, pilot group |
| 0 | Event titles crossing tenants (guardrail) |
| 118 | Events synced per week by month 2 |
| ~2h (per person) | Weekly manual tidying removed |
| 12 → 1 | Mailboxes reachable by the service credential |
| 99.1% | Scheduled runs completing without overlap |

**Figure — Weekly sync outcomes over six weeks, split between attendee patches, forwarded invites and deliberate skips, rising from 71 to 116 events**

| name |
|---|
| Attendee patched |
| Invite forwarded |
| Skipped deliberately |

_Sync outcomes by week, Jun–Jul 2025, from job status records. The forwarded share stays near a third throughout, which is the practical measure of how often these people attend meetings they do not organise — and the reason the two-path decision in section 03 was worth the extra code._

**How we counted.** A double-booking means two accepted meetings overlapping by more than five minutes on the same person, counted from both calendars rather than from complaints. Counting complaints undercounts heavily — the diary showed most clashes were absorbed silently, and only the externally visible ones were reported. The two figures on this page count different things: the headline six a month is the externally visible rate the quarter was prioritised on, while the diary's eleven in a fortnight counts every clash from both calendars, silent ones included. And the Outlook tenant this service reads is the smaller of the group's two — twelve mailboxes — which is why narrowing the credential reads 12 → 1 rather than a company-sized number.

`Technical configuration — Graph application permissions narrowed by an IT-managed application access policy · occurrence-level writes through calendarView · subscribable .ics feed · dry-run default on every path · overlap lock with retry on throttling · scheduled every 2 hours on EC2 behind Nginx`

#### 09. What I'd do differently

I scoped this as a sync problem for a month before the diary told me it was a disclosure problem, and spent that month designing category filters, selective sync and a preferences page — all assuming people wanted to choose what crossed over. They wanted to be confident nothing did. I only got there because one line in one log mentioned they had stopped sharing calendar links.

I would also not have built the subscribable feed. It was easy, it is used by two people, and it is the one surface where a misconfiguration could expose a whole calendar to whoever holds the URL — the highest-risk part of the service, earning the least.

> **Note on this sample.** This is an internal service. The output described in section 06 is a recreation with invented content, and all figures on this page are invented placeholders for this sample. No calendar content is shown. I'm glad to walk through the real service and the underlying numbers in a conversation.

---

### 21. AI Salary Generator

| Field | Value |
|---|---|
| Slug | `ai-salary-generator` |
| Company | Ixana |
| Years | 2026 - present |
| Track | ai |
| Domain | HR tooling |
| Status | customer-testing |
| Context | Ixana · 2026 · HR tooling |
| Role | Product manager, pilot owner |
| Team | 1 people operations partner, 1 data engineer, with finance as reviewer |
| Timeline | Jun 2026 – present |
| Stage | Controlled pilot across seven requisitions in five job families |
| Link | /demo/salary-bands |

**Positioning.** A pilot that drafts an offer range where every figure on it resolves to a dated comparator row — and refuses the role outright when the rows are not there.

**Outcome (card copy).** In pilot: benchmarks a role against market bands and drafts an offer range where every figure traces back to its source.

**Problem.** A salary range came out of a spreadsheet somebody had built, and whoever could say where its numbers came from had usually left. Across the last 26 closed requisitions, 6 agreed ranges resolved to a dated source; the other 20 resolved to an older range, to the phrase “market data”, or to nothing.

**What I did.** I drew the line the tool is built on — every figure computed by rule from dated comparator rows, the model writing the argument and never a number — then added an evidence floor that refuses a role rather than widening a band to cover thin data.

**Result.** Early signal only. What is structural: a figure with no dated source does not render at all, the evidence floor refuses a role rather than widening a band, and no figure anywhere is produced by a model — press any number in the demo and its citation opens. The pilot counts below are the worked example.

**Evidence / demos**

- [Open the working demo — seven requisitions, three banded and four refused](/demo/salary-bands)
- [Or start at a refusal, which is the more interesting output](/demo/salary-bands?view=floor&role=dv4-sj)

> **Confidentiality.** Internal pilot. Every comparator source, observation count, percentile, band, requisition and figure on this page and in the demo is invented for this sample. No employee’s compensation, no candidate and no real salary survey appears anywhere, and the tool holds no individual pay record to show.

#### 01. Why this, and why now

Compensation was not the loudest request; it was the one where being wrong stayed quiet longest. A range nobody can trace still produces an offer, and the cost surfaces a year later in an equity review nobody can reconstruct. I sized it against the two louder asks on how long a mistake stays invisible.

**Figure — How long an error in each candidate tool stays invisible: an untraceable salary range about 12 months, a candidate screening assistant about 1 month, an interview scheduler the same day**

| name | value | label |
|---|---|---|
| Offer range with no traceable source | 12 | about 12 months |
| Candidate screening assistant | 1 | about 1 month |
| Interview scheduler | 0.2 | same day |

_Sizing exercise with people operations and the recruiting lead, May 2026, estimated from how each error had actually been caught in the previous year. The scheduler is the control: everybody wanted it, and nothing it gets wrong survives the afternoon._

Timing carried the rest: pay transparency filings had made posted ranges usable, so a third independent source existed where a year earlier there were two.

#### 02. The problem as people experienced it

I read the last 26 closed requisitions and tried to trace every number in each agreed range back to something with a date on it, then timed four live offer conversations for how long each spent on where a figure came from.

| What people did | Where it broke | Evidence |
|---|---|---|
| Opened last year’s sheet for the family | It cited the sheet before it | 11 of 26 ranges resolved to a previous range |
| Quoted “market data” in the approval | No source, date or sample behind the phrase | 9 of 26 ranges, none traceable |
| Asked a recruiter what the market was doing | A real signal, undated and never written down | Raised in 14 of 26, recorded in 2 |
| Rebuilt a range inside the meeting | The argument became one about memory | Median 19 minutes per offer conversation |
| Agreed a number above the range | No recorded reason, so it set a precedent | 5 of 26, with a reason recorded in 1 |

**Figure — Across 26 closed requisitions: 11 ranges cited a previous range, 9 cited “market data” with nothing behind it, 6 resolved to a dated source, and 5 were agreed above the range with a reason recorded once**

| name | value | label |
|---|---|---|
| Range cited a previous range | 11 | 11 / 26 |
| Range cited “market data” | 9 | 9 / 26 |
| Range resolved to a dated source | 6 | 6 / 26 |
| Agreed above the range | 5 | 5 / 26, one reason recorded |

_Provenance coding of every figure in 26 agreed ranges, Sep 2025 – May 2026. The first bar is the one that decided the design: the most common citation was another document that cited another document, which is a chain with no end and reads exactly like a chain with one._

The reframe: this was never an accuracy problem. Nobody could show the old ranges were wrong, and neither could I. What nobody could do was answer a question about a number — and an unanswerable number gets renegotiated by whoever is most confident.

#### 03. My role and approach

I own the pilot scope, the evidence rules, and the line between what a rule computes and what a model may write.

**Key decisions**

- **Numbers are computed; only the argument goes to a model.** A model wrong about a salary figure ends the tool the day it is noticed; one vague about a market costs an edit.
- **A figure with no source does not render at all.** No estimate fallback and no “approximately”: a soft number is read as a number, and pasted like one.
- **The floor refuses a role; it never widens a band.** A wide band with a caveat under it was built first, and read as a band. The number reaches the approval; the caveat does not.
- **It drafts a range and stops at the market median.** Above the median is a decision with a name on it. Defaulting past it would make the tool the thing deciding pay.

#### 04. What I cut

**Scope**

- _Shipped:_ Weighted market bands from dated comparator rows across five source types · A four-rule evidence floor, any one of which refuses a role · A drafted range with a model-written rationale and a citation on every figure · Internal band comparison, aggregate only and suppressed below eight holders · A source ledger every figure on every screen resolves into
- _Deferred:_ Equity, bonus and any blended total-compensation figure · A labelled cross-market adjustment for non-US locations · Automatic refresh of comparator rows when a survey is released
- _Cut:_ A single recommended number · Any inference from a candidate’s résumé or current pay · Flagging existing employees as under- or over-paid

Flagging existing employees was the hardest cut: it is nearly free once the bands exist, and the first thing everyone asks for. It fails on what the data is. Comparator rows describe a market and a level, while the gap between a person and a band is explained by tenure, scope and a hiring market from three years ago. A list of names ordered by band position would be read as a finding when it is a rendering of what we do not know.

#### 05. How I got it agreed

The head of people operations did not want the tool to refuse anything, and her objection was correct: a recruiter with a live requisition and no band does not stop hiring, they reopen the spreadsheet. A refusal removes our view of a bad number, not the number.

So I did not argue it. What I proposed instead was that a refusal be worth more than the band: it names the rule that failed, the evidence against it, and what would clear it — a task rather than a closed door.

She agreed, on a condition I would not have proposed: the refusal goes to the hiring manager too, not only the recruiter. Four refusals have since produced three decisions to buy survey data and one levelling review.

#### 06. What was built

One pipeline per requisition. Comparator rows are pulled and weighted by collection method, the four floor rules run, and the role gets a band or gets refused. A model is called once at the end and asked for an argument written around numbered slots; the renderer substitutes every slot. Nothing is stored.

**Interface — The offer draft for REQ-2211, a digital design engineer role. A strip across the top gives the drafted range, the market median, the reserved threshold and the evidence behind it, each figure underlined and carrying superscript source references. Below it a model-written rationale in three paragraphs, badged as model-written, with every numeral inside it underlined and cited.**

[Open this draft and follow a figure to its source](/demo/salary-bands?view=offer&role=de4-sj)

- **The output is a range, and it stops at the market median.** Everything above is reserved and needs a named reason and a second approver. A point figure would be quoted as the offer and the range forgotten by the second email.
- **Every figure carries its sources in superscript, and every one of them opens.** The click ends at rows with a date, an observation count and a method — never at another figure in the same document, which is how the old spreadsheets cited themselves.
- **The rationale is badged model-written and contains no number the model chose.** It was given the computed band and asked for an argument with slots in it. Press “show the raw model output” in the demo and the slots are still sitting there, unfilled.
- **Base salary only, on the tile rather than in a footnote.** A blended total-compensation figure is the point where a defensible band quietly becomes an indefensible one, and it is too useful a number to leave ambiguous.

_Recreated from the pilot interface as a working demo. The weighting rule, the four floor rules, the refusals and the citation behaviour are the real ones; every source, observation count, band and figure shown is invented, and no employee or candidate data exists in it to show. Happy to walk through the real pilot in a conversation._

**Gallery**

- **Five sources, and what each method is worth.** — [Open the comparator rows](/demo/salary-bands?view=evidence&role=de4-sj)  Weights are fixed by how a figure was collected, not chosen per role — employer-reported survey data highest, self-reported aggregators lowest and never dropped, our own accepted offers treated as a source rather than as the answer. This screen exists so a band can be argued with, and the argument is always about a row.
- **The output nobody asked for.** — [Open a refusal](/demo/salary-bands?view=floor&role=dv4-sj)  Four rules, each able to refuse a role on its own, and a refusal that names which one failed and what would clear it. Design verification failed only the last rule — four sources whose medians sit 56k apart are not measuring the same job, and averaging them would have invented a market.
- **Six figures, six citations.** — [Open the band and press a figure](/demo/salary-bands?view=band&role=de4-sj)  The band strip, the drafted range inside it and the reserved region above it — then every figure on the screen in a table with the rule that produced it. There is no seventh figure, because a number that could not carry a citation would not have rendered.
- **Suppressed, not summarised.** — [Open a suppressed band](/demo/salary-bands?view=equity&role=pm5-sj)  Four people hold this band, so the distribution is not shown at all. The band edges stay, because they are a policy rather than a person. This is the screen that had to refuse the most, and the only one where refusing costs a question people genuinely need answered.
- **Held, shown, and carrying no weight.** — [Open the cross-market refusal](/demo/salary-bands?view=evidence&role=de4-blr)  The Bengaluru requisition keeps its San Jose rows on screen at zero weight rather than hiding them, because the tempting thing to do with them is exactly what the location rule forbids. A labelled cross-market adjustment was deferred, so this role has no band and says so.

_Every screen above is the state its own link opens, captured from the running demo on invented comparator data. It exists so the argument on this page can be checked rather than taken on trust: switch requisition, press any underlined figure and follow it to the rows and the arithmetic, open one of the four refusals, or ask the offer screen to show you what the model actually wrote._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Traceability vs coverage | Refuse the role rather than widen the band | Four of seven pilot requisitions got no band at all, and a recruiter with a live role still has to do something that day |
| Rules vs a model that could reason about a market | Every figure by rule, the argument by model | The tool cannot weigh a signal that is not already a comparator row, which is most of what a good recruiter knows |
| Aggregate equity vs the question that gets asked | Counts by quartile, suppressed below eight holders | Three of the five families are too small to show anything, and those are the families where equity questions are sharpest |
| A range vs a number | Draft a range and stop it at the market median | Somebody still picks a point inside it, and the tool has made that person more visible rather than better informed |
| Base only vs total compensation | Base salary, stated on the tile itself | The number that decides an acceptance is the total one, and on that number the tool is deliberately silent |

#### 08. Early signal and what I'm watching

Eighteen drafts is enough to see whether the citation rule survives a live hiring round, and nowhere near enough to say anything about what people are paid.

**Metrics**

| Value | Measure |
|---|---|
| 18 | Offer drafts produced in the pilot (n for all figures) |
| 23% → 100% (6 of 26, then 18 of 18) | Range figures resolving to a dated comparator row |
| 4 (of 7) | Requisitions refused at the evidence floor |
| 19m → 4m | Median time an offer conversation spends on provenance |
| 2 (of 18) | Offers agreed outside the drafted range |
| 0 | Percentiles or offer figures produced by a model (guardrail) |

**Figure — Share of the figures in an agreed range that resolve to a dated source, by job family, before the pilot and during it: three families rise from between 17 and 31 percent to 100, and two do not move at all**

| name | from | to |
|---|---|---|
| Digital design, L4 | 31 | 100 |
| Embedded firmware, L3 | 25 | 100 |
| Product management, L5 | 17 | 100 |
| Design verification, L4 | 22 | 22 |
| Technical writing, L3 | 14 | 14 |

_Traceable share per family, from the 26 requisitions read before the pilot to the 18 drafts inside it. The two flat rows are families the floor refused: for those, nothing improved at all, because the tool produced nothing and the range was assembled the old way. That is the honest shape of a four-in-seven refusal rate, and it is the row I expect to move next rather than the ones already at 100._

**How we counted.** A figure carries a source when the published draft resolves it to a named comparator row with a date, an observation count and a method. A figure sourced to “market data”, to a previous range, or to another figure in the same document counts as untraceable — which is how the old sheets cited themselves.

`Pilot configuration — five comparator source types weighted by collection method · rule-based weighted percentiles, band edges and draft range · four evidence-floor rules evaluated per role, any one of them refusing · gpt-4o-mini for the rationale only, called once with the computed figures and a slotted template · the renderer substitutes every numeral, so no figure passes through the model · no individual compensation record held anywhere in the system · internal distribution suppressed below eight holders`

#### 09. What would make me stop

These were agreed before the tool produced its first draft, and each is a stop rather than a conversation.

One published draft carrying a figure that cannot be resolved to a dated row stops the pilot. So does any figure written by the model rather than substituted into it — a guardrail on the architecture, where one instance is a design failure, not a bug.

Two softer gates run to the end. If refusals stay above half of requisitions at 40 drafts, the floor is set for a data estate we do not have, and the answer is to buy data rather than move rules. If offers outside the range pass a fifth, the range is not what is being used.

#### 10. What I'd do differently

I built the weighting table as a constant and treated its numbers as obvious. They are not: the weight on self-reported data is a judgement I made in an afternoon and never tested, and the band moves with it. It should have shipped as a versioned assumption.

I would also have measured provenance time before there was a tool to fix it. The 19 minutes comes from four conversations I sat in after the design was settled, and I chose them.

> **Note on this sample.** This is an internal pilot. The screen described in section 06 is a working recreation with invented comparator data, and every figure on this page is an invented placeholder for this sample — each quoted against its sample size, because 18 drafts cannot support a rate. No employee’s compensation, no candidate and no real salary survey appears here. I’m glad to walk through the real pilot and its floor rules in a conversation.

---

### 22. AI product planning operating system

| Field | Value |
|---|---|
| Slug | `ai-prd-multi-agent-multi-llm-shared-memory-generative-system` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Planning tooling |
| Status | internal |
| Context | Ixana · 2026 · Planning tooling |
| Role | Product manager, delivery owner |
| Team | 3 engineers |
| Timeline | Jan – Aug 2026 |
| Stage | Live for internal planning |
| Link | /demo/prd-os |

**Positioning.** Turns a brief into a reviewed, execution-ready plan — and refuses to let one model approve its own work.

**Outcome (card copy).** Turns a raw brief into a reviewed, execution-ready plan — a different model must approve the planner's work, enforced in code, and unknowns stop the pipeline instead of being papered over.

**Problem.** People had started planning with a model and were getting fast, confident output that quietly assumed away the hard parts. Critiquing 24 AI-written plans against an execution checklist found 19 asserted a fact nobody had supplied, and 15 contained a step whose completion nobody could test.

**What I did.** I owned a workflow that stops on uncertainty rather than guessing, requires a different model to review the plan than wrote it, freezes an approved plan before tasks are generated, and puts a human gate in front of everything downstream.

**Result.** The guarantees are structural and demonstrable: planner and reviewer can never share a model — the run refuses to start — every checklist step carries a binary completion test, and an approved plan freezes before tasks derive from it. Forty of the product's rules run live in the demo. The run-log figures below are the worked example.

> **Confidentiality.** Internal product — the screen described in section 06 is a recreation with an invented brief, and all figures on this page are invented placeholders for this sample.

#### 01. Why this, and why now

The choice was not whether to use models for planning — people already were — but where to intervene. Three options: a prompt library, a checklist people apply by hand, or a workflow that enforces the checks structurally. I sized them against the same 24 plans, asking how many defects each would have caught.

**Figure — Defects caught in 24 audited plans by each intervention: enforced workflow 21, manual review checklist 11, prompt library and training 4**

| name | value | label |
|---|---|---|
| Enforced workflow | 21 | 21 / 24 |
| Manual review checklist | 11 | 11 / 24 |
| Prompt library and training | 4 | 4 / 24 |

_Intervention sizing, Dec 2025, by replaying each approach against 24 previously written plans. The checklist scores 11 rather than 21 not because it is a worse checklist but because it is optional — we applied it retrospectively and were generous about how often a busy person would._

These plans were also becoming inputs to other plans. A fabricated dependency in one week's plan is a stated fact in the next week's, and by the time it fails nobody remembers it was invented.

#### 02. The problem as people experienced it

I collected 24 plans people had generated and used, and scored each against an execution checklist: is every fact sourced, every step testable, dependencies stated, estimates attached. Structured critique rather than interviews, because the authors were satisfied with these plans — the defects only appear when you try to execute one.

| What the plan did | Where it broke | Evidence |
|---|---|---|
| Filled gaps in the brief | Asserted facts nobody had supplied | 19 of 24 plans |
| Produced confident step lists | No test for whether a step was done | 15 of 24 |
| Ordered the work | Dependencies implied, never stated | 13 of 24 |
| Estimated durations | Estimates attached to prose, not to steps | 17 of 24 |

**Figure — Defects across 24 audited plans: 19 asserted unsupplied facts, 17 had unattached estimates, 15 had untestable steps, 13 had implied dependencies**

| name | value | label |
|---|---|---|
| Asserted unsupplied facts | 19 | 19 / 24 |
| Estimates not attached to steps | 17 | 17 / 24 |
| Steps with no completion test | 15 | 15 / 24 |
| Dependencies implied only | 13 | 13 / 24 |

_Structured critique of 24 plans generated and used between Sep and Dec 2025. Every plan carried at least two of these four defects, and the top bar matters most — a plan built on an invented fact fails at execution rather than at review._

The reframe: the model was not producing bad plans, it was producing plans that never said what it did not know. All four defects are one behaviour — filling a gap silently — and the fix is making the system stop and ask.

#### 03. My role and approach

I owned the workflow, the stage gates, the review model and the experience from intake to task generation. The recurring question was where the system may proceed on an assumption; my answer was almost nowhere.

**Key decisions**

- **Stop and ask one question at a time.** The first stage classifies every input as fact, assumption or unknown and halts on a critical unknown. Batching gets a form filled in badly; one at a time gets it answered.
- **Planner and reviewer on different models, enforced in code.** Approval has to mean independent agreement rather than self-consistency. Left as configuration it gets changed for cost on a bad week — which is section 05.
- **Freeze the approved plan before generating tasks.** Later feedback routes into a revision flow rather than mutating the artefact, so every task traces to a version.
- **Escalate to a human rather than force approval.** The loop caps at five rounds then hands over unresolved. A loop that must terminate in approval will always find a way to approve.

#### 04. What I cut

**Scope**

- _Shipped:_ Gated intake with one question at a time · Section selection from the master template · Batched plan drafting · Distinct-model review against a scorecard · Single task with a tested checklist
- _Deferred:_ Multi-project portfolio view · Team assignment on generated tasks · Integration with the task tool
- _Cut:_ Full backlog generation · Autonomous approval without a human · Estimation from historical velocity

Generating a whole backlog was the hardest cut, and it is the demo everyone wants. It failed on review capacity: a human can meaningfully check one task's checklist and cannot check thirty, so a backlog would be approved wholesale by someone scrolling — reintroducing the section 02 defect one level up. We generate one task at a time, so a backlog is built by repetition with a real review at each step.

#### 05. How I got it agreed

The CTO wanted planner and reviewer on the same model. His argument was about cost and it was not unreasonable: two model families meant two sets of rate limits, two prompt formats to maintain, and roughly double the spend per run — all to defend against a failure mode I had asserted rather than demonstrated.

So I demonstrated it. I ran 30 plans through both configurations. Same model on both sides: the reviewer approved 27 of 30 first time and missed two of three planted defects. Different models: 19 approved first time, catching all three plants plus four I had not planted. That converted a design preference into a measurement.

He agreed with a condition that improved the economics without touching the principle: the reviewer runs on the cheaper model, the planner on the stronger one. That recovered most of the cost, and it is the right way round anyway — reviewing against a fixed scorecard is far easier than drafting.

#### 06. What was built

A workflow taking a structured brief through five stages: context validation with a clarification gate, project-type classification and section selection, batched drafting, scorecard review by a different model with a bounded revision loop, and a single implementation-ready task whose checklist carries binary completion tests, estimates and dependencies. Around it sit versioning, line-level diffs, export and comment-driven revision.

**Interface — The review stage on round two: the planner and reviewer models named at the top with the pairing marked distinct, a ten-criterion scorecard reading zero fail and two partial with the reviewer’s written note under every criterion it objected to, the line diff against the previous draft beside it, and the plan below marked approved and frozen at version two.**

[Open this review in the demo](/demo/prd-os?view=review&round=2)

- **The reviewing model is named on screen.** The guarantee that a plan was not approved by its own author is only worth something if the reader can see it held on this run.
- **Unknowns are rendered as unknowns, not omitted.** The defect in section 02 was silence about gaps. Showing what the system does not know is the whole product in one interface decision.
- **Each checklist step shows its completion test beside it.** A step with no test gets marked done because time passed, which is 15 of the 24 audited plans.
- **Approved plans are visibly frozen.** Once tasks derive from a plan version, editing it in place breaks the trace between a task and the reasoning that produced it.

_The review stage, running. The reviewer’s scores are what the model emitted; the approve-or-reject verdict beside them is not stored — it is computed on the page by the product’s own rule, so changing any score changes the verdict. The diff is the same line-level comparison the product uses, and it shows the one change that matters: the sentence naming an owner for the release channel replaced by an explicit unknown that names the question it came from. The brief, the plan and the objections are an invented run._

**Gallery**

- **The question that stops everything.** — [Answer it, or skip it and see what breaks](/demo/prd-os?view=clarify&q=0)  One doubt at a time, in priority order — required-field gap first, then hallucination risk, then dependency ambiguity — and the pipeline blocks until it is answered or skipped. Answer it and the item moves from unknown to fact with the answer recorded as its source. Skip it and it stays unknown, which is what happened here and what the reviewer later caught the planner inventing a way around.
- **What the second model caught.** — [Read the objection](/demo/prd-os?view=review&round=1)  Round one, rejected. The plan stated that the firmware team owns the release channel — a fact nobody supplied, on a brief that names the absence of an owner as its own risk. One fail rejects regardless of how many criteria passed, so the plan never reached a person in this state. This is the section 02 defect, caught by the mechanism built for it.
- **The guarantee, tested.** — [Try to make one model approve itself](/demo/prd-os?view=review&collide=1)  Point the planner and the reviewer at the same model and the run refuses to start — SameModelError, thrown before anything is drafted. That is the argument in section 05 made structural: thirty plans measured it, and one model reviewing itself approved 27 of 30 first time while missing two of three planted defects.
- **One task, every step tested.** — [Break a dependency and watch it caught](/demo/prd-os?view=task)  Eight steps, eight binary completion tests, and a total of 13 days derived as the sum of the steps rather than estimated at the top — against the 12 the brief guessed, with the gap left visible. Every step over a day and a half shows its arithmetic. The publication step is deliberately unassigned, because the ownership question was never answered.
- **Where the figures come from.** — [Check the figures against the rows](/demo/prd-os?view=runs)  Every number in this section, derived on the page from the 44 logged rows printed beneath it: the median, the distribution, the round counts either side of the context-handoff fix, and the first-read rate. Three runs reached human review and were never opened; they are excluded rather than counted as approved. One figure is marked as not derivable from any log, and left marked.
- **The invariants.** — [Run them](/demo/prd-os?view=rules&run=1)  Forty of the product’s rules run in the page: the scoring boundaries, the dependency validator, the model-pairing assertion, the diff, the template integrity and the estimate derivation. They run against this run’s own data as well as against fixtures, so the walkthrough above cannot quietly disagree with the rules it claims to follow.

_The demo is the product’s decision logic — the master template, the scoring rule, the dependency validator, the line diff, the model-pairing assertion and the estimate derivation — ported from source and running on one recorded run of an invented brief. What a model wrote is recorded: the questions, the plan prose, the objections, the checklist. What the system decides about them is computed live, which is the part this page makes claims about._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Independent review vs cost per run | Distinct models, planner strong and reviewer cheap | Two model families to maintain, and roughly 40% more spend per run |
| Throughput vs meaningful review | One task at a time rather than a backlog | Building a real backlog takes a working session rather than a single run |
| Speed vs stopping on uncertainty | Halt on any critical unknown | A vague brief can spend two clarification rounds before drafting starts |
| Auditability vs flexibility | Frozen plan versions with revision flows | A small correction after approval creates a new version rather than an edit |

#### 08. Impact and outcomes

We agreed before build that this failed if humans approved fewer than half of plans on first read. That threshold is deliberately about the reviewer: a loop that passes work a person then redoes spends both the model's rounds and the human's attention. Model independence was the guardrail — any run where planner and reviewer shared a model would invalidate the approval, so it is enforced in code and counted.

**Metrics**

| Value | Measure |
|---|---|
| 41 | Briefs taken through to an approved plan |
| 4h → 25m | Median brief to execution-ready checklist |
| 6m40s | Median run to human review |
| 3.2 → 1.4 | Planner–reviewer rounds before approval |
| 68% (of 41) | Plans approved by the human on first read |
| 0 | Runs where planner and reviewer shared a model (guardrail) |

**Figure — Distribution of 41 run times to human review, concentrated between four and eight minutes with three runs beyond the ten-minute ceiling**

| name | value |
|---|---|
| 2–4 | 6 |
| 4–6 | 13 |
| 6–8 | 12 |
| 8–10 | 7 |
| 10+ | 3 |

_Ceiling: None — 10 min ceiling_

_Run times across all 41 completed runs, Mar–Aug 2026, from workflow logs. The ceiling matters more than the median: we agreed a run must reach a human inside ten minutes or it stops being part of a working session, and the three runs beyond it all needed two clarification rounds._

**How we counted.** First-read approval means the human approved without requesting a revision, on a plan the reviewing model had already passed. Plans the human never opened are excluded rather than counted as approved — the difference between measuring approval and measuring abandonment.

`Technical configuration — 5 workflow stages · 30-section master template · review loop capped at 5 rounds · 10-point scorecard · distinct model families enforced in code, stronger for planning and cheaper for review · 0.5-day estimate granularity · 105 tests across 13 suites`

#### 09. What I'd do differently

The review loop's early failures were about context handoff, not reviewing. The reviewer could not see the clarification answers and the planner revised without its own previous draft, so the loop spent 3.2 rounds converging on things both sides knew. A plumbing bug that presented as a quality problem, and it sent me looking at prompts for three weeks.

I would also have calibrated the scorecard before running it in anger. Early on a section marked TBD scored as a failure, so plans correctly flagging their own unknowns were rejected for doing exactly what the product exists to encourage. The fix was one line; the fortnight of confusing rejections made several people distrust the review stage for months.

> **Note on this sample.** This is an internal product. The brief, the plan and the run history in the demo linked from section 06 are invented, and the figures on this page are placeholders for a public sample; the structural characteristics — five stages, a 30-section master template, ten scorecard criteria, a five-round cap and distinct planner and reviewer models enforced in code — are the real ones, and the demo runs the product’s own logic so they can be checked. I’m glad to walk through the real system and the underlying numbers in a conversation.

---

### 23. AI Lawyer — multi-agent patent drafting system

| Field | Value |
|---|---|
| Slug | `ai-lawyer-multi-agent-multi-llm-shared-memory-generative-sys` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Legal tooling |
| Status | prototype |
| Context | Ixana · 2026 · Legal tooling |
| Role | Product manager, build owner |
| Team | 2 engineers, with a patent attorney as domain reviewer |
| Timeline | Feb – Aug 2026 |
| Stage | Prototype — loopback only, no authentication, never run on a real inventor disclosure and never put in front of an attorney |
| Link | /demo/ai-lawyer |

**Positioning.** Turns a disclosure into an attorney-review filing package with containment enforced at every boundary — and refuses to draw a novelty conclusion when the search looked in the wrong art.

**Outcome (card copy).** Drafts an attorney-review filing package — and refuses a novelty conclusion when the search looked in the wrong art, with the roadmap-deciding corpus measurement real and computed over public patent data.

**Problem.** Turning a disclosure into an attorney-review draft is expensive, and both ways it goes wrong are quiet: a trade-secret candidate leaves inside a search query, or the system drafts around prior art it never found.

**What I did.** I put the parts that cannot be retrofitted first — containment, provenance, cost — then measured what any ranker could reach on the corpus we had, before letting anyone tune one. The answer changed what the system reports, not what it retrieves.

**Result.** It drafts a full filing package end to end — claims, specification, §1.84-measured drawings, a DOCX set — behind an intake gate that refuses to run without a publication decision. The measurement that mattered is real, computed over public patent data: 84.6% of ground-truth prior art was not in the corpus at all, which reframed the ranker from broken to nearly done. It has never been run on a real inventor disclosure and no attorney has used it.

> **Confidentiality.** Internal prototype. Nothing it produced has been filed, no attorney has used it, and it has never been run on a real inventor disclosure. The linked demo runs on an invented one: every document, claim, reference identifier, name and cost shown there is made up for publication. The corpus measurement in section 05 is the real result, computed over public patent data.

#### 01. Why this, and why now

Two framings were available. The exciting one is a multi-agent drafting system, where the interesting work is the agent lineup. The other is that draft quality is downstream of retrieval, and everything after the search is polish on what it found. I sized them against where the attorney hours actually go.

**Figure — Attorney hours across five completed filings: prior-art search and reading 34, claim drafting 18, specification writing 15, figures and formalities 9 — search alone is 45 percent**

| name | value |
|---|---|
| Prior-art search | 34 |
| Claim drafting | 18 |
| Specification | 15 |
| Figures, formalities | 9 |

_Cutoff: 80 — 80% of the hours_

_Effort distribution across five completed filings, Jan 2026, from attorney time records. Search is the largest single cost and also the one where a miss is invisible — a draft written around missed art looks exactly like a good draft until an examiner finds it._

I scoped the pilot to the US path, because mixing two legal standards puts a jurisdiction condition in every prompt.

#### 02. The problem as people experienced it

I shadowed two attorneys through five disclosures, then ran the same code and the same prompts over two kinds of source document to find out whether the drafter or the input was the constraint.

**Figure — Same code, same prompts, two source documents: a marketing whitepaper yields 1 claimable concept of 7 with 15 quarantined parameters, the disclosure plus its design notes yields 5 of 6 with 4**

| name | a | b |
|---|---|---|
| Candidate concepts found | 7 | 6 |
| Claimable without more detail | 1 | 5 |
| Parameters quarantined | 15 | 4 |

_Two runs on the same pipeline, Aug 2026. A document written to persuade a customer answers almost none of the questions a §112(a) enablement analysis asks; a document written to instruct an engineer answers most of them. The drafter was never the bottleneck._

| What they did | Where it broke | Evidence |
|---|---|---|
| Searched patent databases by keyword | Terminology differs between drafters for the same idea | 5 of 5 disclosures; art found late in 3 |
| Read candidate art in full | No way to stop early with confidence | Median 6.8 hours per disclosure |
| Discussed the disclosure over email | Trade-secret candidates left the boundary casually | 2 of 5, before any tool existed |
| Asked the inventor follow-up questions ad hoc | The same six questions, rediscovered per filing | 5 of 5 started from an empty page |

The reframe: the hard part was never the agent lineup. It was retrieval, containment, and telling an inventor what their disclosure fails to teach — and the third turned out to be worth shipping on its own.

#### 03. My role and approach

I owned scope, build order and the operating rules. The build order is the contribution: what cannot be retrofitted first, and a measurement in front of the work it would justify.

**Key decisions**

- **Containment at intake, and inside every outbound client.** Enforced at the call boundary, not at client construction: both clients memoise their SDK object, so a check there fires once per process and enforces nothing after.
- **Measure the corpus ceiling before tuning a ranker.** We agreed before the eval existed that a ranker within 85% of achievable was not the thing to work on. Three weeks then answered what would otherwise have taken months.
- **Every run judges its own retrieval and says so.** Search outside the corpus returns the least irrelevant documents, formatted exactly like real ones. A coverage verdict is the cheapest way to make that failure loud.
- **Attorney-review drafts, never autonomous filing.** Three human gates — patent versus trade secret, claim strategy, signature — are deliberately absent from the system, and the package verdict names them.

#### 04. What was built

A pipeline that reads several documents as one disclosure and returns a filing package: text with page provenance, one vision call per drawing sheet, a deterministic split of claimable from not, retrieval with a coverage verdict, claims, a critic ring, a specification, drawings measured against 37 CFR 1.84, and a DOCX set. Around it sit the containment gate, universal provenance and per-call cost accounting.

**Interface — The intake gate for a published whitepaper. A red panel reads “RUN REFUSED — no intake decision on record” above the verbatim containment error. Below it four publication states are listed, each with its legal rationale, and the barred state is selected — showing an attorney-override field and no run button.**

[Open the gate and try to run a barred document](/demo/ai-lawyer?view=intake&src=wp0092&status=published_us_barred&decided=0)

- **The refusal is a sentence, not a greyed-out button.** A disabled control tells you the thing exists and you are not allowed it, which is an invitation to look for the way around. Until a decision permits a run, there is no run button on the page at all.
- **Four states, because a boolean loses the case that matters.** A publication thirteen months before filing is a statutory bar; thirteen days before it is inside the grace period. A single is-published flag collapses those into the same answer and the wrong next action.
- **Every rationale is served from the enum, never copied into the UI.** A duplicate of the legal text in the frontend would drift from the source of truth while continuing to look authoritative — which is the one thing this particular screen cannot afford.
- **A draft from several documents is as cleared as its least-cleared member.** Each document was published on its own date and can independently bar foreign rights, so the gate ANDs the clearances. A decision recorded against a bundle would clear documents nobody looked at.

_The running prototype rather than a mock-up — the four states, their rationales, the date classifier and the fail-closed refusal are the real ones, on an invented disclosure. Every document, name, claim and reference identifier in the demo is made up for publication._

**Gallery**

- **The cheapest output is the most useful one.** — [Read the gap list](/demo/ai-lawyer?view=result&tab=gaps)  What the disclosure names but does not teach, per concept, with the §112(a) grade — plus the parameters quarantined as unverifiable and the statements set aside as marketing, listed so the exclusion is visible rather than silent. This is the inventor questionnaire, and it lands on disk 90 seconds into a run whether or not a draft follows it.
- **A confident draft over the wrong art.** — [See what a silent failure looks like](/demo/ai-lawyer?view=result&tab=prior-art)  Zero of 42 candidates are in this disclosure’s art, so the references are not prior art against these claims and the claim chart is refused rather than rendered. The claims underneath read perfectly well. That is the failure mode, not evidence against it — which is why the verdict is a banner and not a statistic.
- **Three critics, blind to each other, and a reviser that may refuse.** — [Watch the verdict change when the search does](/demo/ai-lawyer?view=result&tab=review&corpus=wide)  Widen the corpus and the same disclosure produces a §103 rejection over two combined references, a claim amended at the point of novelty, and a run that ends `exhausted` rather than `clean` with one finding still standing. The headline is the stop reason, never the round count — three rounds ending each way are opposite outcomes with the same number.
- **The rule is measured, not asserted.** — [Open the sheet and its §1.84 proof](/demo/ai-lawyer?view=result&tab=drawings)  Sheets are laid out deterministically in millimetres and rendered, then the §1.84 check measures the rendered page — margins, line weight, character height, absence of colour. A layout engine free to move things cannot be proved against a rule that measures where they ended up.
- **The three runs worth opening are not the successful one.** — [Read the refusal verbatim](/demo/ai-lawyer?view=runs)  A containment refusal rendered verbatim, a whitepaper that could not be drafted from, and a run that died without a manifest and is labelled `incomplete` rather than shown as an empty draft. Browsing them costs nothing and does not need the drafting service running at all.
- **The measurement that decided the roadmap.** — [Move the slider in the demo](/demo/ai-lawyer?view=corpus)  An 80-patent gold set, 3,399 front-page citations, and the share of them the corpus contains at all — by era, by exclusion cause, and by the CPC subclasses the missing art actually sits in. The slider is the reframe: the same ranker reads as 14% or as 91%, depending on which number you report.

_Six screens from the running demo. The pipeline, the verdicts and the checks are the real ones; the disclosure they run on is invented, and so is every claim, reference identifier, assignee and cost shown._

#### 05. What we learned

We agreed before building the eval that a ranker within 85% of what the corpus made achievable was not worth tuning. Measuring the ceiling first told us that 84.6% of the ground-truth prior art was not in the corpus at all — and that the cause was not the date floor everyone assumed but the classification filter the corpus was built on. Prior art for a UI invention is not UI-classified. Containment was the guardrail: blocked outbound calls were counted from week one.

**Figure — The same ranker reported two ways: 91 percent of what the corpus makes achievable, or 14 percent absolute — against a corpus ceiling of 15.4 percent that would rise to 73.5 percent if the classification filter were widened**

| name | value | label |
|---|---|---|
| Recall at 20, against the ceiling | 91 | 91% of achievable |
| Ceiling if the filter were widened | 73.5 | 73.5% |
| Ceiling on the shipped corpus | 15.4 | 15.4% |
| Recall at 20, reported absolutely | 14 | 14% — reads as broken |

_Retrieval evaluation against an 80-patent gold set and its 3,399 front-page citations, Jul 2026. The 85% bar was agreed before the measurement existed. Reported absolutely the ranker looks broken and would have bought months of pointless tuning; reported against the ceiling it is nearly done, and the corpus is the thing to fix. Three numbers, and collapsing them into one is how the wrong quarter gets planned._

**Metrics**

| Value | Measure |
|---|---|
| 5m 12s ($1.77 per run) | Disclosure to a filing package with drawings and a DOCX set |
| 15.4% (ceiling, not a score) | Ground-truth prior art present in the corpus at all |
| 507 | Tests passing across the pipeline and the web UI |
| 0 | Real inventor disclosures processed, and no attorney has used it |

The ceiling is a property of the stopgap, not the architecture — the corpus exists only because patent-office credentials were pending, and those APIs search everything server-side. So the recommendation was to not widen it, which is the most valuable thing the evaluation produced and a decision to do less.

`Prototype configuration — 2 documents read as one disclosure · 9 source drawing sheets, one vision call each · 3 critics concurrent and blind, capped at 3 rounds · retrieval corpus 304k documents, ceiling 15.4% · prompt cache 30 minutes and 24 hours by model · 447 Python and 60 frontend tests · $1.77–$2.31 per draft cycle · loopback only, no authentication`

#### 06. What I'd do differently

I would build the gold set in month one rather than month five. Everything that mattered was decided by a measurement that took three weeks to construct.

I would also have shown the attorney the gap list before showing him a draft. When he saw both he was uninterested in the claims and wanted the questionnaire on every disclosure, drafted or not — which is a product, and a much smaller one than what I had been building toward.

> **Note on this sample.** This is a prototype. It has never been run on a real inventor disclosure, no attorney has used it, and nothing it produced has been filed. The linked demo runs on an invented disclosure: every document, claim, reference identifier, assignee, name and cost shown there is made up for publication. The corpus measurement — the 80-patent gold set, the 3,399 citations and the 15.4% ceiling — is the real result over public patent data, and the attorney-hours figures in section 01 are invented placeholders for this sample. I'm glad to walk through the real prototype in a conversation.

---

### 24. ClickUp reporting and Gantt dashboard

| Field | Value |
|---|---|
| Slug | `ai-pm-customized-multi-view-for-pms` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | PM tooling |
| Status | internal |
| Context | Ixana · 2025–2026 · PM tooling |
| Role | Product manager, delivery owner |
| Team | 2 engineers; 1 automation engineer on the capacity workflow |
| Timeline | May 2025 – Aug 2026 |
| Stage | Live for leads, architects and PMs |
| Link | /demo/clickup-gantt |

**Positioning.** A read-only timeline and bandwidth view over live task data, with the delay explanation already read out of the comment thread.

**Outcome (card copy).** Gave leads a read-only Gantt and bandwidth view over live task data, with AI explaining why each late task actually slipped.

**Problem.** Leads planning a sprint needed a timeline, a capacity view and a reason for each slipped task, and the tool of record offered none of the three usably. Shadowing five sprint plannings showed a median of 5m 20s per session spent hand-building a timeline that was discarded immediately afterwards.

**What I did.** I defined the reporting rules first — what counts as committed capacity, how a working day is calculated, how an undated task is handled — then built the read-only layer that applies them: a custom timeline engine, bandwidth grids, and delay analysis over comment threads. Read-only stayed a permanent constraint, not a first-version simplification.

**Result.** Read-only is a permanent property, not a first-version phase: nothing it does has ever written to the workspace or asked an engineer for an update, and where the data cannot carry an answer — undated work, predicted completion dates — it withholds one. Every element deep-links to its source task, which is what replaced write-back. The adoption and preparation-time figures below are the worked example.

**Evidence / demos**

- [Open the working demo — a lead's timeline, pinned to a Wednesday in August](/demo/clickup-gantt)
- [Or start where the architects start, at the delay analysis](/demo/clickup-gantt?view=delays)

> **Confidentiality.** Internal product — the screens in section 06 are a working recreation with invented tasks, people and comment threads, and all figures on this page are invented placeholders for this sample.

#### 01. Why this, and why now

This sat next to two alternatives: buying a portfolio management product, or extending the tool of record with its own automations. I sized them on what each would cost to reverse rather than to build, because the failure I most wanted to avoid was a tool becoming load-bearing before anyone knew whether it worked.

**Figure — Weeks to unwind each option if it proved wrong: read-only layer 1, native automations 6, portfolio product 16**

| name | value | label |
|---|---|---|
| Read-only analytics layer | 1 | 1 week — delete it |
| Native workspace automations | 6 | 6 weeks — unpick the changes |
| Portfolio management product | 16 | 16 weeks plus migration |

_Options sizing, Mar 2026, estimated with the two engineers who would build it. Reversibility was the deciding axis because two previous PM tools at the company had become load-bearing before they were validated, and both were still being maintained years after anyone chose them._

Automating the old monthly compile would only have made the contradictions arrive faster. Reversibility decided it because the problem was small and well understood: nobody would fund a sixteen-week migration to save five minutes of drawing.

#### 02. The problem as people experienced it

I sat in five sprint plannings and watched what people built before the meeting could start, then surveyed 22 leads and architects on which artefacts they rebuilt every cycle. Shadowing found the behaviour; the survey showed how widely it repeated.

| What they did | Where it broke | Evidence |
|---|---|---|
| Hand-drew a timeline before planning | Discarded after the meeting, rebuilt next cycle | 5 of 5 sessions; median 5m 20s |
| Estimated who had capacity | From memory, no shared view | 18 of 22 surveyed said "from memory" |
| Asked why a task slipped | Answer was in a thread nobody had read | 4 of 5 sessions stalled on this |
| Kept a personal tracking spreadsheet | Four different spreadsheets, none agreeing | 9 of 22 maintained one |

**Figure — Of 22 leads and architects surveyed: 18 estimated capacity from memory, 14 rebuilt a timeline each cycle, 9 maintained a personal spreadsheet, 6 had stopped attempting a timeline**

| name | value | label |
|---|---|---|
| Estimated capacity from memory | 18 | 18 / 22 |
| Rebuilt a timeline each cycle | 14 | 14 / 22 |
| Maintained a personal spreadsheet | 9 | 9 / 22 |
| Had given up on timelines | 6 | 6 / 22 |

_Survey of 22 leads and architects, Mar 2026, following five shadowed planning sessions. The last row is the finding a usage metric would never have surfaced — six people had quietly stopped trying to plan visually, and would not appear in any measure of demand for a timeline._

The reframe: the workspace held all of this and presented none of it. Nobody needed new data captured; they needed the same data drawn differently, which is a much cheaper product and a much easier one to withdraw.

#### 03. My role and approach

I owned scope, the read-only boundary and the caching rules. Most of the interesting decisions were about what the dashboard is not allowed to do.

**Key decisions**

- **Read-only permanently, not read-only for now.** Every analytics layer drifts towards becoming an editing surface. Fixing it as a property of the product rather than a stage of it let us ship without a migration plan or a rollback story.
- **A custom timeline engine rather than a charting library.** Library timelines could not switch scale without a re-render or export cleanly into a review deck. Writing the renderer cost three weeks and made both instant.
- **Different cache lifetimes for different truths.** Task state is cached for minutes, generated delay analysis for half an hour. The first goes stale in a way people notice; the second costs real money to regenerate.
- **Delay analysis explains, and never predicts.** Predicted completion dates were the most requested feature and would have made this a forecasting tool people plan against — a far higher evidence bar than the data supports.

#### 04. What I cut

**Scope**

- _Shipped:_ Custom SVG timeline with scale switching · Team bandwidth allocation grid · Committed-capacity rule: working days, dated tasks only · Undated tasks excluded, counted and shown · Hierarchical task tree · Status board · Generated delay explanations
- _Deferred:_ Saved view sharing · Scheduled export to a deck · Milestone annotations
- _Cut:_ Cross-workspace rollup · Any write-back to the workspace · Predicted completion dates · Per-person daily granularity · Any update asked of an engineer

Cross-workspace rollup was the hardest cut — three directors asked for it directly. It failed on rate limits and on meaning: several workspaces pushed API consumption past what the endpoint tolerated at the cache lifetimes we needed, and they use incompatible status vocabularies, so a rolled-up number would average things that are not the same.

#### 05. How I got it agreed

The PMO lead wanted write-back, and her case was strong: a lead looking at a timeline can see a date is wrong, and sending them elsewhere to fix it means the fix does not happen. She had watched people spot errors in review decks for two years and correct almost none.

I agreed with her diagnosis, which is what made the conversation productive. What I disputed was sequencing: a dashboard that writes can corrupt the workspace, and we had no evidence yet that anyone would use it at all. I proposed measuring her worry instead — counting how often a lead spotted a wrong date and what happened next, over a quarter.

The count came back at 31 spotted errors, 26 corrected within a day through a deep link into the task. She conceded on that evidence and I conceded in return: every element carries a deep link to its source, which cost a week of plumbing and is why the correction rate is so high. Write-back stayed cut, for an empirical reason rather than an architectural one.

#### 06. What was built

A read-only dashboard aggregating tasks into hierarchical trees, custom timelines with switchable scale, bandwidth grids and status boards. An analysis tool reads the comment thread on a delayed task and produces a technical and a plain-language account of why it slipped. Every element deep-links to its source object.

**Interface — A read-only timeline: a pinned task column on the left showing a hierarchy of space, folder and list, and beside it a workday grid where each task is a status-coloured bar. Two bars are past their due date and carry a red hatch running to the today line, each labelled with the number of days late and a why? link. A thin grey lane under two of the bars marks the window the task was originally planned for.**

[Open the timeline and switch the scale](/demo/clickup-gantt)

- **Every bar deep-links to the task it represents.** This is the concession that replaced write-back, and 26 of 31 spotted errors got fixed because of it.
- **Scale switching redraws instantly, without a fetch.** Planning sessions move between quarter and week view constantly, and a two-second wait on each switch sent people back to a spreadsheet.
- **Delay explanations show the technical and plain versions side by side.** The same slip is described differently to an architect and a director, and generating both removed a translation step from the meeting.
- **The bandwidth grid shows unallocated time as empty, not as available.** A task needs a start date, a due date and an assignee to count as committed capacity; anything missing one is excluded and counted as undated, in the open. An engineer with nothing assigned is usually mis-recorded rather than idle, and colouring that as capacity would drive real staffing decisions off a data gap.

_Recreated as a working demo, pinned to Wednesday 26 August 2026 so the figures here stay true. Layout, interactions, the workday grid and the read-only boundary are accurate; every task, name, date and comment thread shown is invented. Happy to walk through the real product in a conversation._

| Surface | What it answers | The rule underneath it |
|---|---|---|
| Timeline | What is happening, and what has slipped | Weekends are not capacity, so they are not columns |
| Bandwidth grid | When each person comes free, and when the answer is not knowable | Committed capacity is working days on fully dated tasks; undated work withholds the date rather than reading as free |
| Delay analysis | Why a task slipped, for two audiences | Explain, never predict — no completion date is produced anywhere |
| Status board | What state everything is in | Opening it alone is not counted as weekly use; it is where links land |
| Monthly capacity report | What each team committed last month | Superseded — one definition, three teams, now read live rather than compiled |

**Gallery**

- **The same ten tasks, a quarter wide.** — [Switch the scale yourself](/demo/clickup-gantt?scale=quarter)  Nothing is refetched to draw this — the scale switcher re-runs the geometry over data already in memory, and the readout in the corner says so: 0 requests, every time. It is the same tasks as the shot above, and the whole programme now fits without scrolling.
- **A slip, beside the thread it was read out of.** — [Read both accounts of this one](/demo/clickup-gantt?view=delays&task=86a2rb4hn)  The comments the account actually drew on are marked in the thread, and the two versions are generated together — one for someone who will touch the code, one for someone who will not. No completion date is produced anywhere, which was the most requested feature and the one this data cannot carry.
- **When each person comes free — and where it refuses to say.** — [Open the bandwidth grid](/demo/clickup-gantt?view=bandwidth)  The day after someone’s last active dated task, split by the work in progress and the work not started. The column that matters is the one holding four of six blanks: an assignee whose remaining work carries no dates computes as free from today, which is almost always wrong, so the answer is withheld and the missing count shown instead. The definition sits under the table rather than in a metrics note — two teams once held contradictory capacity figures in good faith. Across the real workspace this reads 58 task lists and 30 engineers in three teams, on one definition instead of three.
- **The view people land on from a link.** — [Open the status board](/demo/clickup-gantt?view=status)  Opening this alone does not count towards the weekly-user figure — it would measure link-following rather than use. Overdue is a tile and never a slice of the ring, because a task can be in progress and overdue at once and a ring that counted it twice would not add up.

_The demo runs on invented data and a fixed clock. It exists so the claims on this page can be checked rather than taken on trust: switch the scale and watch the request count stay at zero, open a late task and read why, or try to change a due date and be told no._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Correcting data vs protecting it | Read-only with deep links to the source | Five errors a quarter are spotted and never fixed |
| Precision vs honesty | Weekly buckets with the undated count beside them | A lead planning one specific week still does that part by hand |
| Freshness vs rate limits | Minutes of cache on tasks, half an hour on generated analysis | A task edited during a planning session does not move on screen |
| Build cost vs interaction quality | A custom timeline renderer | About three weeks, and a renderer we now maintain ourselves |
| Scope vs comparability | Single workspace, saved multi-list views | Directors still assemble cross-workspace views by hand |

#### 08. Impact and outcomes

Before build we agreed this failed if any lead was still hand-building a timeline a quarter after launch — a dashboard people admire and do not use is what both previous PM tools produced. The guardrail was writes to the workspace: an absolute rather than a target, since shipping without a rollback plan rested on the dashboard being incapable of damage.

**Metrics**

| Value | Measure |
|---|---|
| 22 (of 31) | Leads and architects using it weekly |
| 9h → 20m | Monthly capacity compile, now review only |
| 11 → 2 | Reporting errors caught per cycle |
| 58 | Task lists covered per run |
| 63% | Delay questions answered without opening a task |
| 0 · 0 | Writes to the workspace · updates asked of engineers (guardrails) |

**Figure — Weekly sessions by role over ten weeks, rising from 24 to 133, split between leads, architects and project managers**

| series | W1 | W3 | W5 | W7 | W10 |
|---|---|---|---|---|---|
| Leads | 14 | 31 | 44 | 55 | 62 |
| Architects | 6 | 14 | 22 | 31 | 41 |
| Project managers | 4 | 9 | 16 | 24 | 30 |

_Weekly sessions by role, sampled fortnightly over ten weeks, May–Jul 2026, from application logs. Leads adopted first because the timeline solved their planning problem directly; architects arrived later and through the delay analysis rather than the timeline, which is not the entry point we designed for and is now where the roadmap points._

**How we counted.** Committed capacity means working days on tasks carrying a start date, a due date and an assignee, excluding weekends and published holidays. Anything missing one of the three is excluded and counted separately as undated. That exclusion is deliberately visible: a capacity figure quietly absorbing its own uncertainty is the failure this replaced.

`Technical configuration — custom SVG timeline renderer · server-side route handlers holding all credentials · 58 task lists ingested in batches, mapped to 30 engineers across 3 teams · working-day capacity excluding weekends and published holidays, with timezone offset corrected on due dates · 5-minute cache on team task queries · 30-minute cache on generated delay analyses · gpt-4o-mini for comment-thread synthesis`

#### 09. What I'd do differently

I designed for leads and architects arrived through a different door. Delay analysis was scoped as a supporting feature for the timeline; for architects it is the product — they open it directly, ignore the Gantt, and want depth in the one place I resourced least. Segmenting the 22 survey responses by role would have caught this.

I would also revisit the thirty-minute cache on delay analysis. It was set to control generation cost before there was usage data to set it from, and the effect is that two people opening the same slipped task ten minutes apart read different explanations.

> **Note on this sample.** This is an internal product. The demo linked from this page is a recreation with invented content on a fixed clock, and all figures here are invented placeholders for this sample. I'm glad to walk through the real product and the underlying numbers in a conversation.

---

### 25. In-house meeting notetaker

| Field | Value |
|---|---|
| Slug | `ixana-meeting-notetaker` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Meeting intelligence |
| Status | internal |
| Context | Ixana · 2026 · Meeting intelligence |
| Role | Product manager, delivery owner |
| Team | 2 engineers |
| Timeline | Jan – Aug 2026 |
| Stage | Live, company-wide |
| Link | https://xana-nine.vercel.app/meetingrecordings |

**Positioning.** Transcripts and minutes for every internal meeting, generated inside the tenant, with no third-party bot ever sitting in the room.

**Outcome (card copy).** Kept transcripts and minutes inside the tenant instead of routing every internal meeting through a third-party bot.

**Problem.** Meetings were recorded and then forgotten. Tracing 24 decisions that people referred back to a month later, 5 were written down anywhere durable, 7 lived in a chat thread nobody could name without asking, and 12 existed only in someone's memory — twice in two versions. The obvious fix, a commercial notetaker bot, could not join the calls that most needed one.

**What I did.** I owned an in-tenant notetaker: capture from the meeting's own recording artefact rather than a guest participant, a cued transcript, and generated minutes in which every claim must cite the second it was said. The organiser can exclude a meeting before it starts, irreversibly, and that mark is the only consent control in the system.

**Result.** Nothing is processed outside the tenant and no bot ever joins a call — capture reads the meeting's own recording artefact, and a claim without a timestamp does not ship, which is the rule that made minutes circulable at all. Exclusion is set by the organiser before the call and cannot be undone. The coverage and decision-trace figures below are the worked example.

**Evidence / demos**

- [Open the working demo — a meeting with its transcript, and its notes on the right](https://xana-nine.vercel.app/meetingrecordings/player/meeting-power-review?tab=notes)
- [Or start at the library of recordings](https://xana-nine.vercel.app/meetingrecordings)

> **Confidentiality.** Internal tooling. The screens in section 06 are a recreation on an invented workspace, and every figure on this page is an invented placeholder for this sample. No real meeting, transcript, attendee or minute appears anywhere on this page.

#### 01. Why this, and why now

Three ways of ending up with a written record were on the table: license a commercial notetaker bot, staff a minutes rota, or build capture into the tenant. I sized them on one axis, because one axis was the constraint — where the audio of a meeting would be processed. Ixana's meetings routinely carry unfiled invention disclosures and partner material under NDA, and the patent programme's filings depend on those disclosures not having been handed to a processor first.

**Figure — Where the audio of 212 monthly meetings would be processed under each option: in-tenant capture covers all 212, an unrestricted vendor bot sends all 212 outside, a vendor bot restricted to pre-cleared meetings covers 66 and leaves 146 unrecorded, and a minutes rota covers 30**

| name | values | label |
|---|---|---|
| In-tenant notetaker | [212, 0, 0] | 212 covered |
| Vendor bot, all | [0, 212, 0] | 212 leave the tenant |
| Vendor bot, cleared | [0, 66, 146] | 66 covered |
| Human minutes rota | [30, 0, 182] | 30 covered |

_Option sizing, Jan 2026, over the 212 meetings recorded that month. The rota is scored on the fill-in rate of the rota that already existed for the engineering standup, which is the fairest number available and a generous one. The middle two rows are the same product: the difference is entirely whether a human decides, before each call, that it is safe._

Read that way the choice stops being build against buy. The vendor product is better than anything two engineers will write, and it is only allowed to run on a third of the estate — so the comparison is a better tool on 66 meetings against an adequate tool on 212. Retrieval across the archive once it exists is a separate problem and has its own page; this one is only about how the record gets made.

#### 02. The problem as people experienced it

I ran a decision trace rather than a survey. I took 24 decisions that someone had asked about again in the following month — pulled from chat searches for "did we decide" and the like — and tried to find where each one was written down. Asking people whether meetings are well minuted gets you an opinion; asking where a specific decision is recorded gets you a file path or a shrug.

| What was assumed | What the trace found | Evidence |
|---|---|---|
| The meetings that matter get minuted | 5 decisions of 24 were written down anywhere durable | 24 decisions traced, Jan 2026 |
| A chat thread is a good enough record | 7 sat in threads nobody could locate without asking the organiser | 7 of 24, median 3 people asked |
| The organiser remembers the detail | Two decisions came back in two incompatible versions | 2 of 24 re-argued from scratch |
| A notetaker bot would simply fix this | Only meetings cleared before the call could use one | 66 of 212 cleared in the trial |

**Figure — Of 212 meetings recorded in January 2026, 31 left any written record of what was decided**

_31 of 212 — Left a written record (31); the rest Recorded, never written down (181)_

_Every meeting recorded in January 2026, one cell each, checked against minutes, a wiki page or a task created within five working days. Drawn as units because the shape of the remainder is the point: this is not a documentation habit that needs tightening, it is an absence with a few exceptions in it._

The reframe: nobody was choosing not to write minutes. Writing them costs the one person in the room who was most engaged about twenty minutes, immediately after the meeting they were most engaged in, and that person is always the one already late for the next call. Every intervention that starts by asking a human to do it inherits that arithmetic, which is why the rota scored 30.

#### 03. My role and approach

I owned the capture path, the consent model and what generated minutes are allowed to claim. The residency constraint decided the architecture; what took the judgement was deciding what the output must never do, because a wrong minute is worse than no minute and is read by more people.

**Key decisions**

- **No bot ever joins the call.** Capture reads the meeting's own recording artefact through the platform API after the fact. A guest participant is a thing people see in the roster, mute, argue about and forget to invite; an artefact is simply there. It also means turning capture on cannot change who feels able to speak.
- **A claim without a timestamp does not ship.** Every line of generated minutes must cite the second it came from or it is dropped before anyone sees it. This is the single change that moved minutes from written to sent: nobody circulates a claim about what a colleague said that they cannot spot-check first.
- **Exclusion is set before the call and cannot be undone.** The organiser's mark is the only consent control in the system, and a control you can lift afterwards is not one — it turns into a request someone can be pressured into granting. Roughly 6% of meetings carry it.
- **An excluded meeting stays in the library, named.** It is listed with its exclusion stated rather than hidden. A recording that silently vanishes sends people to ask the organiser where it went, which is precisely the behaviour this product exists to end.

#### 04. What I cut

**Scope**

- _Shipped:_ Capture from the meeting's own recording artefact · Cued transcripts, every line a seek target · Generated notes — decision, figures, open questions, actions · Per-recording question answering with citations · Organiser exclusion, set before the call · The recordings library with per-meeting state
- _Deferred:_ Speaker-label correction · Minutes mailed to attendees on completion · Action items pushed into the task tracker
- _Cut:_ Live in-call notes · A guest-bot fallback for platforms with no recording API · Non-English transcripts

The guest-bot fallback was the hardest cut, and the one I argued for hardest before dropping it. Meetings held on a customer's own platform expose no recording artefact, so the only way in is the thing the product exists to avoid — and an exception made once for convenience is the whole argument conceded. Those meetings stay uncovered: about nine a month, none of them internal, and the organiser is told plainly that nothing was captured rather than left to discover it later.

#### 05. How I got it agreed

The head of engineering wanted to buy, and he was right on the merits I could measure. In a two-week bake-off the vendor product beat ours on word error rate and beat it badly on diarization above three speakers, it needed no engineers, and it was available that afternoon. His argument against the residency worry was the strongest one available: the tenant already runs on somebody else's hardware, so the line I was drawing was a line about contracts, not about physics.

I could not answer that, so I stopped arguing the principle and tested the control instead. The compromise on the table was a vendor bot restricted to meetings an organiser cleared before the call. Over four weeks organisers cleared 66 of 212 meetings, and legal review of those 66 found 4 that had discussed unfiled disclosures — cleared in good faith, by people who had read the guidance, before an agenda existed to read.

That ended it, and not because I won the argument. A control that fails 6% of the time fails on the exact cases it was built for, and the cost of one of those failures is a filing rather than an inconvenience. We built. His conditions were fair and I kept them: the diarization gap is measured against the vendor and published internally each month, and if in-house accuracy had still been behind by June we would have revisited the whole decision.

#### 06. What was built

A library of recordings, and behind each one a workspace holding three things at once: the transcript, a generated note, and a question box that answers from that recording only. Capture runs from a change-notification subscription on the tenant's call records; transcription and summarisation run on tenant-resident inference; nothing at any stage crosses the tenant boundary.

The note is the part I spent the most judgement on, because a summary is the easy half of this problem and the half every product already does. What a reader wants a month later is not a retelling of a call they sat through — it is the decision and why it went that way, the number they are allowed to quote and the conditions it was measured under, and what the meeting failed to settle. So the note is those sections, in that order, with a timestamp on every claim.

**Interface — A meeting workspace: on the left a video frame reporting that no recording was found and, beside it, the transcript with each speaker's line carrying a clickable timestamp; on the right the note, opening with a one-line statement of what was settled, then what happened, then a list of figures each carrying the conditions it was measured under, with an orange timestamp pill on every claim**

[Open this meeting on its notes](https://xana-nine.vercel.app/meetingrecordings/player/meeting-power-review?tab=notes)

- **The note opens with what was settled, not what was discussed.** One line, before any retelling of the call — and it is allowed to end in "and that is unresolved". A reader a month later did not come back for a narrative of a meeting they sat through.
- **Every figure carries the conditions it was measured under.** 3.1 mW is labelled bench, saline phantom, single run, not a customer figure; 4.6 mW is on body, nine subjects, median. The failure this prevents is a bench number being lifted out of a note and quoted to a customer, which is a thing that had already happened once.
- **Every claim carries the second it was said.** The pill beside each line seeks the transcript and the player to that moment. This is the rule that made notes circulable — a claim about a colleague that cannot be spot-checked stays a draft, whatever it says.
- **The player can be empty and the record still stands.** Here no video was found and the frame says so. Capture and transcription are separate paths on purpose: a missing recording file must not take the transcript and the note down with it.

_This is the screen the link above opens — same code, same layout, nothing scrolled or staged, on an invented workspace of five meetings. Every title, speaker and line of speech is written for publication; the note's structure, the capture path and the exclusion model are the real ones._

**Gallery**

- **Further down the same note** — [Open the note and scroll](https://xana-nine.vercel.app/meetingrecordings/player/meeting-power-review?tab=notes)  Below the fold of the screen above. Each decision is followed by a Why line naming the argument that settled it — including that Sam objected to the sequencing and the trade was taken anyway. Then Not decided, which is the section that separates a record from a summary: a note listing only decisions reads as though the meeting closed everything it touched.
- **The library** — [Open the recordings library](https://xana-nine.vercel.app/meetingrecordings)  Captured, minuted and excluded are counted separately above the grid and never summed. Each card says what the notetaker produced — decisions, actions, and how many questions the meeting left open — so the choice to open one is made before opening it.
- **Asking one recording** — [Open this question and its answer](https://xana-nine.vercel.app/meetingrecordings/player/meeting-power-review?q=What%20was%20left%20unresolved%3F)  The link carries the question, so it opens on the answer rather than on an empty box — which is how one of these actually gets shared. The answer states the conclusion, shows the exchange behind it, cites the second of each claim, and reports what it could not find: the trim question was raised, agreed to be real, and left with no action assigned.

_Three surfaces on the same invented workspace. Each is the state its own link opens._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Residency vs transcript quality | Tenant-resident models only | Diarization is measurably behind the vendor above three speakers |
| Coverage vs consent | Organiser exclusion, before the call, irreversible | About 6% of meetings have no record, including some that later mattered |
| Latency vs cost | Minutes generated on first open, not on ingest | The first reader waits, and it is usually the organiser |
| Provenance vs completeness | Every claim must cite a timestamp | Claims that summarise a whole discussion are dropped, because they cite nowhere |
| Completeness vs length | Reasoning, figures and open questions in every note | A note runs three times a bullet summary; people who wanted a glance now scroll |

The last row is the one I would defend hardest and the one that loses most. A meeting whose value is a shift in mood — the room going quiet on a number — produces minutes that say nothing about it, because no single second carries it. We publish thinner minutes on purpose rather than minutes that assert things the transcript cannot support.

#### 08. Impact and outcomes

We agreed before building that the MVP failed below 95% transcription of eligible meetings sustained over a month: a record with silent gaps is worse than none, because it invites confident wrong answers about meetings that were simply never captured. The residency guardrail was absolute — any recording or transcript processed outside the tenant would have ended the project, which is why the vendor client was never installed rather than installed and disabled.

**Metrics**

| Value | Measure |
|---|---|
| 198 (of 212 recorded) | Meetings transcribed in-tenant each month |
| 0 | Recordings processed outside the tenant (guardrail) |
| 9 min (p95 24 min) | Median wait from call ending to minutes |
| 100% (1,412 claims) | Minute claims carrying a timestamp |
| 13 (6% of meetings) | Excluded by the organiser before the call |
| 5 → 21 (of 24 traced) | Decisions found in a written record |

**Figure — Weekly transcription coverage of eligible meetings against the agreed 95% floor, rising from 71% and dipping to 89% in week six**

_Threshold: 95 — Pre-agreed floor: 95%_

_Coverage by week, Jun–Aug 2026, from capture run records. Week six is not a model problem: the notification subscription silently stopped renewing and eleven meetings were never fetched. It is on the chart because it is the failure mode this system actually has — capture goes quiet and everything downstream looks healthy._

**How we counted.** Eligible excludes meetings the organiser marked before the call. A meeting counts as transcribed when a cued transcript exists, not when a recording file exists — the two come down different paths and counting files would have reported week six as healthy.

`Technical configuration — change-notification subscription on tenant call records, renewed every 30 minutes · transcript read from the meeting's own artefact, never a bot participant · speech and summarisation on tenant-resident inference · exclusion flag written before the call and immutable · minutes cached after first generation, regenerated only on request · no recording, transcript or minute leaves the tenant boundary`

#### 09. What I'd do differently

I measured diarization quality in week nine, after the shape of the minutes was already set. It came back worse than I had assumed above three speakers, and the fix was to weaken the product: attributed summary claims — X argued for Y — had to be dropped, because a decision attributed to the wrong person is a worse artefact than no attribution at all. That measurement cost two days and belonged in week one, next to the bake-off it would have informed.

I would also build the correction path before the generation path next time. There is still no way to fix a wrong claim except regenerate and hope, and the reason is that I treated correction as a feature rather than as the thing that makes an automated record trustworthy. Six people have now asked for it, which is more than have asked for anything else.

> **Note on this sample.** This is internal tooling. The screens in section 06 are the running demo on an invented workspace, and every figure on this page is an invented placeholder for this sample. No real meeting, transcript, attendee or minute is shown. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 26. Patent program operations

| Field | Value |
|---|---|
| Slug | `ixana-patent-program` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Patent operations |
| Status | internal |
| Context | Ixana · 2024–2026 · Patent operations |
| Role | Product manager — patent programme owner and Wi-R product line PM |
| Team | Founder/CTO on strategy, outside counsel on execution, 1 engineer, with the patent paralegal as domain owner |
| Timeline | Feb 2024 – Aug 2026 |
| Stage | Live, running across three outside firms |
| Link | https://xana-nine.vercel.app/patents |

**Positioning.** Fifty-plus filings across six product lines, owned end to end — filing decisions made on the roadmap's own calendar, and no statutory date ever computed in-house.

**Outcome (card copy).** Owned 50+ filings across six Wi-R product lines end to end - what to protect, how broadly, when to file - with filing decisions anchored to the tapeout calendar.

**Problem.** Ixana files ~25 applications a year off five-month tapeout cycles — with about seventy-five people when this programme began in 2024, roughly 140 by mid-2025. Roadmap and patent estate were one decision surface run as two, and a matter’s state lived in somebody’s inbox — so a disclosure that had passed its filing date was discovered, not decided.

**What I did.** I owned both sides of it: the patent estate end to end, and the six Wi-R product programmes those filings exist to protect. Underneath, a mail-triggered spine routed every arriving document to one matter identity and a category, and automated nothing irreversible.

**Result.** Fifty-plus filings across six product lines, owned end to end. The system underneath automates nothing irreversible: routing and reminders yes, dates and scope never — counsel's docket stays the sole statutory authority, mirrored and never computed. The cycle-time and inventor-minutes figures below are the worked example.

**Evidence / demos**

- [Open the working demo — five surfaces on an invented portfolio](https://xana-nine.vercel.app/patents)

> **Confidentiality.** Live legal operations: no unpublished subject matter, claim scope, inventor, attorney or firm name, matter number, statutory date or real fee amount appears here — invoice work is described by stage and control only, every screen is the real interface re-rendered or recreated on invented data, and figures are invented or relative. The three source workbooks behind the portfolio numbers are described by structure and counting rule only.

#### 01. Why this, and why now

What gets taped out decides what is patentable. What is already filed decides what we can publish or demo. And a disclosure landing before its filing destroys protection nobody can recover — so the roadmap and the estate are one decision surface.

I sat on both sides of it. Over the tenure I owned 50-plus filings end to end — what to protect, how broadly, when to file — while running the six Wi-R product programmes those filings protect. Disclosure date and filing date come off the same roadmap; until 2024 they were set by different people.

**Figure — Annual cost of each option against the same filing rate: commercial IP suite 48 thousand, docketing pushed wholly to counsel 90 thousand, hire a paralegal 75 thousand, build on the stack we already run 12 thousand**

| name | value | label |
|---|---|---|
| Push docketing to counsel | 90 | $90k / yr |
| Hire a paralegal | 75 | $75k / yr |
| Commercial IP suite | 48 | $48k / yr |
| Build on our own stack | 12 | $12k / yr |

_Options sizing, Jan 2024, costed against the ~25 applications a year the company files. All four buy docketing, which counsel already does properly and is not the thing that was missing — so the cheapest option won on the same argument that would have won at any price: none of them links a filing to the tapeout that makes it possible._

About twenty-five applications a year is large for seventy-five people, nearly all of it landing on the same few who are also taping out silicon every five months. Spending engineering hours to save legal ones is the wrong trade here — which is why the guardrail is inventor time.

#### 02. The problem as people experienced it

I did not ask anyone how it felt. I took every docketed action over twelve months — 214 — and for each counted the distinct places a person had to open to answer one question: what is owed here, by whom, and by when. I timed it as the founder, with counsel, and as myself.

| What they did | Where it broke | Evidence |
|---|---|---|
| Asked what was owed on a matter | The answer depended on which of us you asked | The three roles disagreed on 23 of 214 actions |
| Searched the mail spool | Firms correspond under an informal name, the docket carries the formal title | 31 of 54 matters had two names in active use |
| Opened the tracker | Stage was current; the next action and its owner were not | 19 of 54 had no owned next action at all |
| Waited on an inventor | Nobody had told them a date depended on them | Median 5 weeks from request to disclosure |

**Figure — Median distinct places opened to answer what is owed on a matter: programme owner 6, founder 4, outside counsel 2**

| name | value | label |
|---|---|---|
| Me (programme owner) | 6 | 6 places · 12 min |
| Founder/CTO | 4 | 4 places · 9 min |
| Outside counsel | 2 | 2 places · 3 min |

_214 docketed actions over twelve months, Sep 2024 – Aug 2025, walked and timed separately for each role. Counsel answered fastest from the fewest places, because the firm’s docket is one system that is genuinely maintained — the whole cost sat on our side of the boundary, which is what made this ours to fix rather than something to ask them for._

The reframe came from the 23 disagreements. Nobody was missing data. Three people read the same mail spool and built three different states from it, because a matter’s state was never written down — it was inferred, freshly, each time. What was missing was a place for the answer to live.

#### 03. My role and approach

I was the interface. The founder/CTO wanted to know what was protected before a demo; engineering wanted a disclosure to cost as little of the week as possible; counsel wanted complete inputs and one authority.

**Key decisions**

- **Anchor filing decisions to the tapeout, not the write-up.** Every cycle is both a disclosure risk and a priority date, so I decided on the roadmap’s calendar.
- **Breadth is a roadmap question, not a legal one.** Counsel could say what was claimable; only the roadmap knew whether we would still build that way.
- **Automate only where being wrong is recoverable.** Routing and reminders can be fixed the same afternoon. A date, a scope or an approval cannot.
- **One matter identity, owned by us.** Three firms, three naming habits. Until I resolved those to one identity, nothing counted.

**Figure — Filings by product line per half-year from 2024 to 2026 — 8, 10, 12, 12, 7 and 3 — with each line’s first public disclosure marked**

| name |
|---|
| BAN YR23 |
| BAN YR31 |
| NFE XA-NFE2001 |
| NFE XA-NFE3001 |
| Reference designs |
| Dev kits |

_Filings I owned, by product line and half-year, Feb 2024 – Aug 2026 (n=52). Markers are each line’s first public disclosure, taken from the product pages themselves. Filings cluster in the half before a line goes public — clearest on the two NFE parts, where the run-up is unmistakable. YR23 is the exception for a mundane reason: it shipped three months into this window, so most of its protection was already filed before the chart starts. That is the calendar working as the strategy, and I could only run it that way because I was in both rooms. The three source workbooks the portfolio dashboard is built from hold the whole estate, not just this window: 248 rows, 207 distinct patents once continuations and re-filings are grouped into families. The 52 here are the filings I owned between February 2024 and August 2026._

**Every line gets one of four calls, agreed with the founder/CTO in the same hour — From the quarterly coverage review — one page, per product line**

- **File.** The line is still moving and someone else could plausibly get there first. Four of the six lines carried at least one of these in a typical quarter.
- **Defer.** Claimable, but the roadmap has not committed. Deferred items are re-read next quarter rather than dropped — several carried twice before we filed.
- **Publish as a defensive note.** Worth putting in the art so nobody else can claim it, not worth a filing. This is the call that saves the most money and gets made the least.
- **Abandon.** The line moved and the idea no longer protects anything we are building. Proposing these was my job; nobody else in the room was incentivised to.

_One page from the quarterly review. The per-line detail and every matter reference have been removed._

#### 04. What I cut

**Scope**

- _Shipped:_ Mail-triggered extraction into matter and category · One internal matter identity across three firms · Lifecycle view over six stages, plus an explicit unclassified stage · Internal readiness dates, each carrying its provenance · Invoice lines matched against the quoted schedule · Weekly reconciliation against counsel’s docket · Deduplicated portfolio counting across three source workbooks · A combined master view derived from its sources, never authored · An annotation column preserved untouched through every rebuild
- _Deferred:_ Inventor-facing disclosure portal · Family-level cost roll-up · Category coverage measured against the roadmap
- _Cut:_ Machine-drafted claim language · Automated freedom-to-operate scoring · Any statutory date computed by us · Write-back to the source workbooks

Machine-drafted claim language was the hardest cut. It fails two stated constraints: anything a model proposes becomes part of the record of what the applicant considered, and a wrong claim scope is unrecoverable once filed. But I stopped it because drafting was never the bottleneck — attorney turnaround ran in days, inventor input in weeks. Automating the fast half of a slow process is the most expensive way to find the queue.

What handled the gap was unglamorous: structured disclosure capture front-loading exactly the fields counsel asks for anyway, plus a prior-art shortlist that is cited and never written. The honest cost is that it saves no legal spend — only the schedule moves.

**Three categories stay with a person, permanently, and not as a first-version simplification — From the programme note — what we will not automate, v1.1**

- **Anything statutory.** We compute no bar date, no priority date and no response deadline. Counsel’s docket is the record; we mirror it and mark it as theirs.
- **Anything unrecoverable.** Claim language and filing scope. A wrong scope survives to grant and cannot be argued away afterwards.
- **Anything that becomes evidence.** Machine-generated assessments of third-party rights. What the applicant considered is discoverable, and a generated opinion is worse than no opinion.
- **Anything that silently corrects a record.** The reconciliation found 32 rows with real errors and the service still does not fix one of them. A tool that quietly amends a legal record is a tool nobody can testify about; it reports discrepancies and a person applies them, which costs twenty minutes a month and keeps every change attributable.

_One page from the programme note. The examples naming live matters have been removed._

#### 05. How I got it agreed

The objection came from counsel’s docketing partner, and it was the best one raised. Their docket is the legal record; a system deriving dates from email creates a second source of truth the firm cannot indemnify, and a founder acting on our date is harmed by something the firm will still answer for.

I could not win that, so I removed what she objected to. The system computes no statutory dates at all: it mirrors the firm’s docket as sole authority and calculates only internal readiness dates.

She agreed, then asked for three things I had not planned to give: a provenance stamp on every date, internal dates drawn so they cannot be mistaken for statutory ones, and no reminder without the firm’s own date beside ours. The third is why the founder has never acted on a date I invented.

#### 06. What was built

A mail-triggered spine, a workbook sync beneath it, and five surfaces over both. Documents from any of the three firms are extracted, matched to one matter identity, given a stage and a category, and written into one record — five views, not five tools.

**Interface — The spend and milestone timeline: eighteen lanes, one per matter, running from February 2024 to today, with filings, publications, USPTO actions, responses, payments and grants drawn as coloured events along each lane**

[Open the timeline in the demo](https://xana-nine.vercel.app/patents/spend)

- **Deadline triage is a policy, not a colour.** The bands are sixty days, six months, a year. I set them so the weekly review has a fixed size: anything inside sixty days gets read out, everything else gets read once a month.
- **Every date on this screen is ours.** Statutory dates live in the firm’s docket and are mirrored, never computed. A founder acting on a date the system derived is a failure mode counsel cannot insure, so this timeline carries only our internal readiness dates — anything statutory is read from the docket where it lives, and the tracker says so in as many words.
- **Each firm sees its own matters and only its own.** The same view is shared read-only, filtered per firm. It removed most of the status email in both directions and cost nothing, because the filter already existed for my own use.
- **Spend is grouped by stage of work, never by matter.** Draft, filing, office action. That makes an invoice checkable against the engagement, and keeps everyone out of arguing about what any single matter is worth.

_The running demo rather than a mock-up — same code, same layout, on an invented portfolio of 18 matters across 3 firms, $61,900 across 70 payments and 115 dated events. Matter names, application numbers, firms and fees are invented for publication; the stage model, the category set and the payment breakdown are the real ones._

**Gallery**

- **Portfolio dashboard** — [Open the dashboard](https://xana-nine.vercel.app/patents)  The founder’s view — composition by stage and by technology category, and the next actions owed. Unclassified appears in the table in its own right rather than being absorbed into the total, so a gap cannot hide inside a rounded number.
- **Lifecycle tracker** — [Open the lifecycle tracker](https://xana-nine.vercel.app/patents/tracker)  Every matter in one of six stages, with an explicit unclassified stage beside them. Overdue is a property of the internal action date and never of a statutory one, so nothing red here can be read as a legal deadline.
- **Ask the portfolio** — [Ask the portfolio a question](https://xana-nine.vercel.app/patents)  It reads the same eighteen matters every other view reads and answers from them, naming the matters it used. Asked what is past its internal action date it returns six of fifteen with their refs, stages and dates — and says in the same breath that these are readiness dates and not statutory ones.
- **Invoice approval** — [Open invoice approval](https://xana-nine.vercel.app/patents/invoices)  Each line checked against what that firm quoted for that stage. The amber block is the one that matters: the system made the match itself, says so, and will not let anyone approve until a person has opened the PDF and confirmed it.
- **Upload an invoice** — [Open the upload half](https://xana-nine.vercel.app/patents/invoices?view=upload)  The other half of the same section. Most invoices arrive by mail and are matched before anyone looks; this is the path for the ones that did not, and it runs the same extraction and the same match. Firm and matter are chosen by hand rather than read off the PDF, because those two are what bind the invoice to the portfolio.

_The five surfaces over the mail-triggered spine, on the same invented portfolio as the timeline above. Each link opens the screen its image shows._

| Surface | Who uses it | The decision it carries |
|---|---|---|
| Mail-triggered spine | Nobody — it runs underneath | What can be automated at all: routing yes, dates never |
| Workbook sync | Nobody — it runs underneath | What one patent means: a family counts once, and the master is derived, never authored |
| Spend and milestone timeline | Me at quarter end; each firm, read-only | Whether a matter is worth what it is costing, by stage |
| Lifecycle tracker | Me weekly; the founder before a review | Which matters are past their internal action date |
| Portfolio dashboard | Founder/CTO, and counsel on the monthly call | Where the estate is thin against the roadmap |
| Ask the portfolio | Engineering leads, ad hoc | Whether a question needs me in the room at all |
| Invoice approval | Me, then the founder | Whether the work billed matches the engagement |
| Invoice upload | Me, for anything the mail spine missed | Which matter an invoice belongs to, decided by a person |

`System configuration — mail-triggered extraction into 6 lifecycle stages and 5 technology categories, plus an explicit unclassified stage · one internal matter identity mapped across 3 outside firms · portfolio counts deduplicated by family across 3 source workbooks, taking each family’s most recent row · eTag then content-hash change detection on a 60-second poll · master view rebuilt in place through the workbook API with annotations preserved and every write verified · invoice lines matched individually against the quoted schedule · deadline colouring at 60 days, 6 months and 1 year · no statutory date computed anywhere in the system`

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Cycle time vs inventor time | Front-load the fields counsel asks for anyway; never chase for more | Some disclosures reach counsel thinner than they could be and come back with questions |
| Coverage vs discoverability | No automated freedom-to-operate scoring, on the same reasoning that cut drafting | We have no systematic read on third-party risk; it stays a question we ask counsel, one product at a time |
| One view vs one authority | Mirror counsel’s docket; compute only internal readiness dates | Two date systems on one screen, and a permanent explaining job for anyone new |
| Automation vs attributability | Machine-made links stay marked until a person confirms them | Every invoice needs a human minute before approval, and a backlog forms whenever I travel |
| Correctness vs a record that can be testified about | Report discrepancies, never correct a source workbook | Known errors sit uncorrected until a person applies them, sometimes for weeks |
| A derived view vs someone’s working surface | Derived columns rebuild every cycle; the annotation column is preserved untouched | The sync halts whenever a rebuild would drop an annotated row — twice so far, both justified |

#### 08. Impact and outcomes

We agreed before build that this failed if any date the system showed disagreed with counsel’s docket at the weekly reconciliation twice running — at which point we would switch it off. It has not happened. The guardrail was inventor minutes per disclosure: cycle time bought with engineering hours is not a win here.

**Metrics**

| Value | Measure |
|---|---|
| 14w → 6w | Median disclosure to filing |
| 41 → 0 (of 248 rows) | Double-counted rows in the portfolio total |
| 19 → 2 (of 54) | Active matters with no owned next action |
| 95m → 40m | Inventor minutes per disclosure (guardrail) |
| 0 | Dates disagreeing with counsel’s docket · source sheets modified |
| 6 → 1 | Places opened to answer what is owed |

**Figure — Share of open matters still awaiting their next action by elapsed day: at day 30 the earlier cohort is at 61 percent and the later at 18 percent**

| series | 0 | 15 | 30 | 45 | 60 | 75 | 90+ |
|---|---|---|---|---|---|---|---|
| Before | 100 | 82 | 61 | 44 | 33 | 26 | 21 |
| After | 100 | 46 | 18 | 8 | 4 | 2 | 2 |

_Threshold: None — 30-day action age_

_Share of open matters still waiting, by how long the next action had been owed. Before is the 2024 population (n=38); after is the same measure over the twelve months to Aug 2026 (n=54). The curves separate almost entirely inside the first month and then fall at a similar rate, which says plainly that the system fixed how fast work gets picked up and did nothing at all for the long tail — and that tail is inventor availability, not process._

**How we counted.** An active matter is a filing with at least one open action owned by a named person and dated inside ninety days. It excludes granted patents with no maintenance action due, abandoned matters, and unconverted provisionals past their window. We count the matter, not the document — a family of four counts once.

#### 09. What I'd do differently

I built the mechanism before I wrote down the strategy. For a year the filing decisions lived in my head and in conversations with the founder, while what got documented was the plumbing. How a tapeout maps to a filing decision is still the part I cannot hand over.

I would also have measured the tail earlier. Section 08 says we fixed the first thirty days and left the rest where it was — that tail is inventor availability in a tapeout crunch.

> **Note on this sample.** Sample page — internal legal operations. Every screen here is real software showing invented data: the timeline in section 06 is the actual product re-rendered on a synthetic dataset, the four surfaces beside it are recreations built from the real layouts. No raw capture was published, cropped or traced, because every one of them carried real matter titles, application numbers, firm names or fee amounts. All figures on this page are invented placeholders apart from the public documents linked above, which are live and assignee-verified. No unpublished subject matter, claim, inventor, attorney, firm, matter number, statutory date or real fee appears anywhere. I’m glad to walk through the real programme and the underlying numbers in a conversation.

---

### 27. Document change intelligence

| Field | Value |
|---|---|
| Slug | `clickup-document-tracker-data-extraction-easy-visibility-for` |
| Company | Ixana |
| Years | 2026 |
| Track | ai |
| Domain | Documentation ops |
| Status | internal |
| Context | Ixana · 2026 · Documentation ops |
| Role | Product manager, delivery owner |
| Team | 2 engineers |
| Timeline | Feb – Aug 2026 |
| Stage | Live, syncing daily |
| Link | https://xana-nine.vercel.app/myfiles?tab=clickup |

**Positioning.** A daily sync that versions and diffs every workspace document, so the ones that changed overnight are visible without anyone being asked.

**Outcome (card copy).** A daily sync that versions and diffs every workspace document - immutable versions only on real content change, and nothing tracked is ever pruned.

**Problem.** Nobody could say what had changed in the documentation. The register listed 248 documents, the workspace held 301, and a document could be rewritten between two readings with no record of it. Reconciling the two lists by hand found 53 documents tracked nowhere.

**What I did.** I owned an MVP that syncs daily, creates an immutable version only when content genuinely changed, and computes diffs. Halfway through I reversed my own scoping decision: the register stopped gating what gets tracked and became optional enrichment.

**Result.** A version exists only where the content hash genuinely moved, versions are immutable with no edit affordance anywhere, and the register was demoted from gate to enrichment after it proved to be a single point of failure — nothing tracked is ever pruned. The reconciliation counts below are the worked example.

**Evidence / demos**

- [Open the working demo — ClickUp under My Files, where the versions live](https://xana-nine.vercel.app/myfiles?tab=clickup)

> **Confidentiality.** Internal tooling. All figures on this page are invented placeholders for this sample; no document title, content or author appears on this page.

#### 01. Why this, and why now

Documentation quality had been raised repeatedly and always as a content problem. I reframed it as an observability problem, because all three obvious remedies — an ownership drive, a review schedule, a rewrite — need to know which documents are actually changing, and none of us could answer that.

**Figure — Documentation interventions and the share of documents each could reach without change data: change tracking 100 percent, review schedule 38 percent, ownership drive 21 percent**

| name | value | label |
|---|---|---|
| Change tracking | 100 | 100% — no prerequisite |
| Scheduled review | 38 | 38% — needs a known owner |
| Ownership drive | 21 | 21% — matched register entries |

_Sizing, Jan 2026, from the register reconciliation described below. The two people-led interventions could each only reach the documents already correctly registered, which is the smaller part of the estate — so the observability work had to come first regardless of which remedy we eventually chose._

It also compounds. Every month without a change record is a month of edits that can never be recovered, whereas an ownership drive delayed by a quarter simply starts a quarter later.

#### 02. The problem as people experienced it

I reconciled the register against the workspace document by document — 301 against 248 rows — and coded every mismatch. The right instrument, because the failure was invisible to the people inside it: everyone assumed the register was the estate.

| What was assumed | What the reconciliation found | Evidence |
|---|---|---|
| The register lists our documents | 53 workspace documents were absent from it | 301 in workspace, 248 registered |
| Registered documents are current | No way to tell — no change record existed | 0 of 248 had a version history |
| Owners know when their doc changes | Owners learned from readers, or not at all | 9 of 11 owners interviewed |
| Deleted register rows mean retired docs | 23 rows removed while the document lived on | 23 orphaned documents found |

**Figure — Reconciliation of 301 workspace documents against a 248-row register: 248 matched, 53 untracked, 23 orphaned after a register row was deleted, 0 with any version history**

| name | value | label |
|---|---|---|
| Matched to a register row | 248 | 248 |
| Present but untracked | 53 | 53 |
| Orphaned by a deleted row | 23 | 23 |
| With any version history | 0 | 0 |

_Register reconciliation, Jan 2026, all 301 workspace documents checked individually. The last bar is the whole problem in one number: not a single document in the estate had a retrievable history, so no question about what changed had an answer anywhere. The 23 orphaned documents sit inside the 53 untracked rather than beside them; the bars are attributes of the same 301, not a partition._

The reframe: the register was being treated as the estate, and it is a description of the estate maintained by hand — therefore always behind it. Tracking that trusted the register would inherit exactly that gap, which is the mistake I made first.

#### 03. My role and approach

I owned the MVP scope, the operating envelope and the tracking policy. The scope had to fit inside a serverless execution budget, which shaped the design more than any user requirement did.

**Key decisions**

- **Two-stage change detection, cheap check first.** A last-modified comparison decides whether to fetch content; a content hash decides whether to create a version. Without the first a daily run does not fit the budget; without the second, every touch creates a spurious version.
- **Versions are immutable and never pruned.** The value of a change record is entirely in the parts nobody predicted would matter, so anything that deletes history to save space defeats the reason it exists.
- **Read-only, internal, unauthenticated UI with a protected sync endpoint.** The tool shows nothing its readers cannot already open. Skipping an authentication layer removed weeks, and the only endpoint that can act is secret-protected.
- **Track everything; treat the register as enrichment.** This reverses my original decision. The register gates nothing — it contributes owner, category and dates when it has them, and its absence never stops a document being tracked.

#### 04. What I cut

**Scope**

- _Shipped:_ Daily scheduled sync · Immutable versions on real content change · Line and page level diffs · Change feed and sync run history · Register metadata enrichment where present
- _Deferred:_ Notifications to document owners · Approval workflow on changes · Full-text search across versions
- _Cut:_ Rich-text semantic diff · Real-time change capture · Automatic pruning of untracked documents

The semantic diff was the hardest cut. A line diff on rich text is noisy in a specific way — reordering a list changes a lot visually and nothing in meaning, and a quarter of a 40-diff sample was dominated by that noise. Doing it properly means understanding the document model rather than its serialisation, which was weeks we did not have. We ship a line diff with a one-line change summary above it.

#### 05. How I got it agreed

The documentation owner wanted tracking limited to the register, and she had the better argument at the start. The register is the canonical list, audits run against it, and tracking documents outside it would create a second implicit inventory that disagrees with the official one — precisely the mess we were trying to escape.

I built it her way. The problem surfaced two months in: the sync failed for three days because the register file was locked open, and during that window every document was untracked. That made the dependency concrete in a way my arguments had not — the register was not just deciding what to track, it was a single point of failure for tracking anything.

We reversed it together on that evidence. Tracking now covers all workspace documents, the register contributes owner and category, and nothing is pruned when a row disappears — which is what protects the 23 orphaned documents. Her condition: the register remains canonical for audit, and the dashboard shows registered and unregistered as separate counts rather than one total.

#### 06. What was built

A dashboard over a nightly sync. The sync enumerates workspace documents, checks each for modification, fetches and hashes content only where something may have changed, and writes an immutable version when the hash differs. The interface offers a repository view, a per-document version timeline with diffs, a change feed, and a run history showing what was checked and what changed.

**Interface — Comparing version 1 to version 2 of a document: a What changed panel carrying a sentence about the change, the page list beneath it and two modified page chips, and under that the line-by-line diff with the removed line in red and the two added lines in green**

[Open this comparison in the demo](https://xana-nine.vercel.app/documents/doc_onboarding?tab=compare)

- **The change summary sits above the diff, not inside it.** This is what replaced the semantic diff. Most readers need to know whether a change matters; only some need to see it line by line, so the sentence comes first and the diff waits underneath it.
- **Registered and unregistered counts are shown separately.** On the repository view: seven in the register, three tracked but unregistered, never summed. The tool follows more than the register lists and must not be read as the canonical inventory.
- **The run history shows checked and changed, not just success.** Four nightly runs across the top, each with both numbers. The 27th reported completed having checked nothing — identical to a healthy run on status alone, which is how the same failure went unnoticed for three days.
- **Versions carry no edit button anywhere.** There is no control on this screen that alters a version. An immutable record with an affordance for changing it is not an immutable record, however well the permissions are configured.

_The running demo rather than a mock-up — same code, same layout, on an invented workspace of ten documents, fourteen versions and four nightly runs. Every title, author and line of content is made up for publication; the version model, the register distinction and the sync accounting are the real ones._

**Gallery**

- **The repository** — [Open ClickUp under My Files](https://xana-nine.vercel.app/myfiles?tab=clickup)  Reached from My Files, under ClickUp — the documents that carry a history rather than only a current copy. The two register counts sit apart from each other above the table, and the nightly runs sit above them with what each one checked and changed.
- **A version timeline** — [Open a document and its versions](https://xana-nine.vercel.app/documents/doc_onboarding)  One document, its versions down the left, and a comparison between any two of them. A version exists only where the content hash genuinely moved, so the timeline is a record of real change rather than of how often the sync ran.

_Two surfaces on the same invented workspace as the comparison above._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Diff quality vs time to ship | Line diff plus a generated change summary | About a quarter of diffs are visually dominated by reformatting noise |
| Freshness vs execution budget | Once daily, five documents concurrently | A change made after the run is invisible for up to a day |
| Coverage vs canonical clarity | Track everything, register as enrichment | Two counts to explain instead of one, on every screen |
| Simplicity vs access control | Unauthenticated read-only UI, protected sync endpoint | Anyone on the network can see which documents changed, though not their content |

#### 08. Impact and outcomes

We agreed the MVP failed below 95% sync completion over a month — a change record with gaps is worse than none, because it invites confident wrong answers about what did not change. History loss was the guardrail: after the policy reversal, any document dropped from tracking would repeat the failure we had just fixed, so pruning was removed from the codebase rather than disabled.

**Metrics**

| Value | Measure |
|---|---|
| 301 (from 248) | Documents checked each night |
| 34 | Documents changed on the confirmed run |
| 0 | Documents pruned since the policy change (guardrail) |
| 98.6% (target 95%) | Nightly syncs completing |
| 1 day | Worst-case age of the newest version |
| 53 → 0 | Documents tracked nowhere |

**Figure — Documents tracked rising from 248 to 301 while documents changed per night stays between 9 and 34, over eight weeks**

| series | W1 | W3 | W5 | W6 | W8 |
|---|---|---|---|---|---|
| Documents tracked | 248 | 251 | 278 | 296 | 301 |
| Changed that night | 12 | 9 | 31 | 34 | 18 |

_Tracked estate against nightly change volume, Jul–Aug 2026, from sync run records. The step in week five is the tracking policy change bringing in workspace-only documents; the change spike alongside it is those documents being versioned for the first time, not a burst of editing._

**How we counted.** A document counts as changed when its content hash differs from the previous stored version. A modification timestamp moving without the hash changing does not count — that is a save, not an edit, and counting saves would have inflated the change figure by roughly a third.

`Technical configuration — daily scheduled sync · 5 documents processed concurrently · 60-second serverless execution budget per invocation · last-modified check then SHA-256 content hash · 10-minute stale lock timeout · Bearer secret on the sync endpoint`

#### 09. What I'd do differently

I let a canonical-list argument decide an availability question. The register-as-gate design was defensible on governance grounds and it made a hand-maintained spreadsheet a hard dependency of an automated system — a mistake I would have spotted immediately in any other kind of dependency. It took a three-day outage to see it.

I would also have built owner notifications before the dashboard. The eleven document owners still find out their document changed by visiting a page they have no reason to visit. Everything needed for a notification exists; I built the observation surface first because it was the thing I could see, and the delivery surface is where the value lands.

> **Note on this sample.** This is internal tooling. The screen described in section 06 is a recreation with invented content, and all figures on this page are invented placeholders for this sample. No document title, content or author is shown. I'm glad to walk through the real system and the underlying numbers in a conversation.

---

### 28. Condenser microphone

| Field | Value |
|---|---|
| Slug | `eegrab-condenser-microphone` |
| Company | EEGRAB |
| Years | 2024 |
| Track | silicon |
| Domain | Audio hardware |
| Status | production |
| Context | EEGRAB · 2024 · Audio hardware |
| Role | Product owner end to end, requirements to production handoff — senior embedded design engineer |
| Team | 3 — me, an acoustics consultant and a mechanical designer, with the CTO carrying the commercial side |
| Timeline | Q1 2024 – Q4 2024 |
| Stage | In production — shipping as a catalogue product |

**Positioning.** The variance war: the supplier's window is the problem, and the answer was calibrating every unit at test instead of sorting capsules into bins that die with the next lot.

**Outcome (card copy).** Refused to sort capsules and calibrated every unit instead — gain taken passively in a transformer before any active part, and a trim that may correct but never rescue.

**Problem.** A condenser microphone is sold on two printed numbers, and both of them come from a capsule bought in bulk. I measured sixty capsules from three lots the supplier called in-spec: they used the whole ±3 dB window edge to edge, and the lot means drifted 3.4 dB across three quarters.

**What I did.** I owned the microphone end to end as an engineer. Rather than bin capsules into grades — which stops working the moment a new lot arrives — I took the gain passively in a transformer and put a trim at the output, so every unit is calibrated at test instead of sorted.

**Result.** The policy is the product: publish the worst unit, not the typical one, and let the trim correct but never rescue — a capsule needing more than half the range is rejected even though the supplier calls it good. The real schematic and transient run are on this page; the consistency and yield figures below are the worked example.

> **Confidentiality.** EEGRAB product work. The schematic and simulation shown are my own working files, rev 1.0, February 2024. There is no public product page or datasheet to link, so nothing here is externally verifiable: the circuit and its component values are real, and every number — the capsule study, sensitivity, self-noise, yield, cost — is invented and internally reconciled.

#### 01. Why this, and why now

This tier is defined by one printed figure. At or under about 17 dBA of self-noise a microphone is stocked as usable for voice work; above it, dealers file it with the toys. So the entry ticket is a noise number, and the question is which engineering lever actually buys one.

I scored three of them in the only unit that matters here — decibels of self-noise, not rupees — because a lever that improves the number by half a decibel is not a cheaper option, it is not an option.

**Figure — Self-noise improvement available from each lever: passive step-up 4.8 dB, a quieter capsule grade 3.1 dB, a lower-noise output stage 0.9 dB**

| name | value | label |
|---|---|---|
| Passive step-up before any active part | 4.8 | 4.8 dB — the lever I took |
| A quieter capsule grade | 3.1 | 3.1 dB — real, but unpredictable lot to lot |
| A lower-noise output stage | 0.9 | 0.9 dB — after the gain, it barely matters |

_Modelled from the capsule measurements in section 02, Q1 2024. The output stage scores badly for a reason worth stating plainly: by the time the signal reaches it the transformer has already made it large, so the noise it adds is swamped. Almost all of the available improvement is in the first centimetre of the signal path._

Segments, not accounts: podcast and streaming creators, small project studios, and OEM buyers who want the front end without the body. None of them can hear the microphone before buying it.

#### 02. The problem as people experienced it

Before designing anything I measured sixty capsules — twenty from each of three delivered lots the supplier certified as in-spec — for sensitivity at 1 kHz and A-weighted self-noise, on the same rig. I was not comparing us to anyone; I was asking what we were being sent.

| What the supplier guaranteed | What sixty capsules measured | What it means downstream |
|---|---|---|
| Sensitivity within ±3 dB | The full window used, edge to edge | Two microphones could differ by 6 dB |
| One nominal figure per part number | Lot means drifted 3.4 dB over three quarters | A bin set this quarter is wrong the next |
| Self-noise typical, no maximum | Worst capsule 4 dB noisier than the best | The printable figure is set by the worst unit |
| Matched pairs to order | Priced per pair, six-week lead | Not viable at our volume |

**Figure — Mean measured sensitivity by delivered lot: 17.0, 21.5 and 25.0 millivolts per pascal against a nominal 20**

| name | value | n |
|---|---|---|
| Lot A, first quarter | 17 | 20 |
| Lot B, second quarter | 21.5 | 20 |
| Lot C, third quarter | 25 | 20 |

_Threshold: 20 — supplier nominal, 20 mV/Pa_

_Sixty capsules across three delivered lots, Q1 2024. Within a lot the spread was wide but stable; the finding that mattered is between lots, because it kills the obvious answer. Sorting capsules into grades works beautifully until the next delivery arrives centred somewhere else, and then every grade you defined is wrong._

The reframe: this was never a capsule-quality problem to solve by buying better parts. It is a variance problem, and variance is either paid for at the supplier or absorbed at our own test bench.

#### 03. My role and approach

My title was senior embedded design engineer. The CTO owned the commercial relationships — dealers, pricing, which enquiries we chased — and I owned the product end to end from requirements through schematic, simulation, board, enclosure and production handoff.

Everything follows from refusing to sort. Binning capsules is the standard answer and it makes the product hostage to whatever the next lot is centred on; calibrating each unit puts the variance where I control it.

**Key decisions**

- **Take the gain passively, in a transformer.** An active first stage adds its own noise where the signal is smallest. This is a specification decision, not a cost one — it is most of the 4.8 dB in section 01.
- **Calibrate every unit rather than grade the capsules.** A bin is defined against a lot mean that moves. A trim set against a reference at test does not care where the lot landed.
- **Publish the worst unit, not the typical one.** The tier's entry ticket is a noise figure, and a typical figure is a claim about a population the buyer will never own.
- **Adjust only at the output, never before the transformer.** Anything changed ahead of it moves the load the capsule sees, which alters the shape of the response rather than its level.

#### 04. What I cut

**Scope**

- _Shipped:_ Fixed cardioid large-diaphragm capsule · Transformer-coupled passive front end · Per-unit sensitivity trim set at test · 48 V phantom power over XLR · Measured sensitivity and self-noise printed on the box
- _Deferred:_ A brighter second capsule variant · An OEM module of the front end alone · A USB output version
- _Cut:_ Matched stereo pairs · Switchable polar patterns · A switchable pad and high-pass filter

Cutting the matched-pair product is what set the tier, and it is the one decision that still costs us sales. A pair has to match in more than level: the trim makes two microphones agree at 1 kHz and says nothing about whether they agree at 8 kHz or thirty degrees off axis, which is exactly what a stereo pair is for. Selling pairs honestly would have meant screening capsules for response shape as well as sensitivity — a second rejection criterion, and inventory held while a partner is found for each unit. We ship singles, and the review that costs us most says the microphone is very good and cannot be bought twice.

#### 05. How I got it agreed

The acoustics consultant on the team told me the trim was dishonest, and he had a real argument. I was calibrating the number we print, at one frequency, against a reference — and a capsule wrong in the shape of its response rather than in its level can be trimmed until it reports correct sensitivity and still sound wrong. His phrase was that I had built a device for making the datasheet true.

I had been defending the trim as an accuracy measure, which conceded his point without noticing. So I took his frame: if a trim can move a bad capsule into spec, the problem is the acceptance test, not the trim. I changed what acceptance means — from sensitivity inside a window to the response curve inside an envelope at five frequencies — so a capsule wrong in shape fails whatever the trim is set to.

He agreed, then added a rule I had not planned to accept. A capsule needing more than half the trim range is rejected rather than trimmed in: the trim may correct, never rescue. That rule takes capsule acceptance from about 91% of a delivered lot to 74%, and the scrapped parts are ones the supplier is entitled to call good. It is the most expensive sentence on this page and I would not now ship without it.

#### 06. What was built

A cardioid condenser whose gain happens before any active device sees the signal. The capsule feeds a coupling capacitor into a load I specify rather than inherit, a step-up transformer does the amplifying, and a trim at the output sets each unit against a reference at test.

**Interface — EasyEDA schematic titled Condenser Microphone — Passive Calibration, showing the input coupling network, a 1:5 step-up transformer, a parallel RC across the primary, and a trim into the output**

- **Gain taken in a 1:5 transformer, not an active stage.** A first active stage adds its noise exactly where the signal is smallest. The transformer costs a wound part and returns most of the improvement available anywhere on this board.
- **The trim sits after the transformer, at the output.** Placed before it, an adjustment would change the load the capsule sees and move the response shape. At the output it can only change level, which is the only thing it is permitted to change.
- **The load the capsule sees is specified, not inherited.** Choosing the shunt rather than accepting whatever the capsule datasheet assumed is what keeps behaviour repeatable when a lot arrives centred somewhere new.
- **Simulated to a transient before a board existed.** Meters on four nodes and a 1 kHz source, run in the schematic. Finding the operating point in a simulator costs an afternoon; finding it on a fabricated board costs a revision.

_My own schematic from the project's EasyEDA workspace, rev 1.0, February 2024, with the simulation instruments still placed. The circuit and its component values are real. The capsule specification and every performance figure on this page are invented._

**Gallery**

- **Untitled**  The transient run at 1 kHz: input in yellow at about ±4.9 V, output in cyan at about ±9.3 V, in phase and symmetrical across the sweep. Symmetry is what is being checked — an asymmetric output means the transformer is heading toward saturation, which is audible as distortion long before it is visible as clipping. Source amplitude is scaled for visibility rather than drawn at a capsule level; the gain is set by the turns ratio and the loading, which is why the output is under 5× on a 1:5 transformer. Real capsule signals are millivolts.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Sort capsules vs calibrate units | A trim set per unit at test | Ninety seconds of production time on every microphone, forever |
| Yield vs the meaning of acceptance | A capsule may be corrected, never rescued | Acceptance falls from about 91% of a lot to 74% |
| Consistency vs product range | Singles only, no matched pairs | Locked out of every buyer recording in stereo |
| A defensible figure vs a competitive one | Publish the worst unit, not the typical | Our printed number looks worse than mics that are noisier |

#### 08. Impact and outcomes

We agreed before build that this failed if two microphones taken off the line at random differed by more than 1 dB in sensitivity. Self-noise is the guardrail, because consistency is trivially bought by padding the output and re-trimming, and padding is paid for in noise — the one number the tier will not forgive.

**Metrics**

| Value | Measure |
|---|---|
| ±0.4 dB (unit to unit) | Sensitivity consistency of shipped microphones |
| 17 dBA (worst unit, published) | Self-noise, A-weighted (guardrail) |
| 20 mV/Pa (−34 dBV/Pa) | Sensitivity at 1 kHz |
| 134 dB (at 0.5% THD) | Maximum sound pressure level |
| 74% (under the half-trim rule) | Capsules accepted from a delivered lot |
| 30 Hz – 18 kHz (±3 dB) | Frequency response on axis |

**Figure — Sensitivity deviation from nominal: sixty delivered capsules spread across the supplier's full window, against 240 shipped microphones inside a 1 dB acceptance band**

| name | label | values |
|---|---|---|
| Capsules as delivered | 60 measured, three lots | [-2.95, -2.6, -2.4, -2.1, -1.9, -1.8, -1.6, -1.5, -1.4, -1.2, -1.1, -0.9, -0.8, -0.6, -0.4, -0.2, 0.1, 0.3, 0.4, 0.6, -2.8, -1.7, -1.3, -0.7, -0.3, 0.2, 0.5, 0.8, 0.9, 1.1, 1.2, 1.4, 1.5, 1.7, 1.8, 2, 2.2, 2.4, 2.6, 2.9, -0.5, 0, 0.7, 1, 1.3, 1.6, 1.9, 2.1, 2.3, 2.5, 2.7, 2.8, 1.45, 0.95, 0.35, -0.15, -1.05, -2.2, 2.45, 0.55] |
| Shipped microphones after trim | 240 measured at final test | [-0.38, -0.34, -0.31, -0.29, -0.26, -0.24, -0.21, -0.19, -0.16, -0.14, -0.11, -0.09, -0.06, -0.04, -0.01, 0.02, 0.04, 0.07, 0.09, 0.12, 0.14, 0.17, 0.19, 0.22, 0.24, 0.27, 0.29, 0.32, 0.35, 0.38, -0.36, -0.27, -0.18, -0.08, 0.01, 0.11, 0.21, 0.31, -0.22, 0.16] |

_Sixty capsules measured on delivery against 240 microphones at final test, to Q4 2024. The top row is what the supplier considers one part number. The bottom row is the same parts after a trim set against a reference — and the shipped population is narrower than the acceptance band, which is the only reason we can print a consistency figure rather than a typical one._

**How we counted.** Self-noise is the A-weighted equivalent input noise of the complete microphone — capsule, transformer and output together — measured in a sealed enclosure, and the figure printed is the worst unit in the qualification run rather than the mean. It excludes preamp-only measurements, which flatter the number by leaving out the part that dominates it. Sensitivity consistency is a shipped unit's deviation from nominal at 1 kHz after trim, measured on every microphone rather than sampled.

`Front end — pre-polarised large-diaphragm cardioid capsule with an integral JFET impedance converter · 10 µF input coupling into a 2.2 kΩ series and 100 kΩ shunt network setting the load · 1:5 step-up transformer taking all the gain passively · 1 nF and 100 kΩ in parallel across the primary setting the high-frequency corner · 100 kΩ trim in series with a 250 kΩ output resistor, set per unit against a reference at final test · 48 V phantom power, XLR output · schematic and transient simulation in EasyEDA 6.5.40, rev 1.0, 6 February 2024, LCSC parts and JLCPCB fabrication · machined body with an internally damped grille`

#### 09. What I'd do differently

The envelope test checks five frequencies, and I chose them because they were the ones our rig could sweep quickly. A capsule can pass all five and misbehave between them, which is precisely the failure the envelope was introduced to catch — so the test samples the argument rather than making it. A continuous sweep against a mask would have cost seconds per unit on a bench already running.

I also characterised on-axis response properly, published a tolerance for it, and never did the same off axis. Fixing the pattern to cardioid was right, but off-axis behaviour is most of what someone in an untreated room hears, so the reviews that go badly are about rooms and I gave those reviewers no published number to check their impression against.

> **Note on this sample.** Sample portfolio page. This project is data-thin: what is real is the circuit — the passive calibration schematic, its component values, the 1:5 transformer, the output trim, and the transient simulation shown, all from my own EasyEDA workspace dated February 2024. Everything else is invented and internally reconciled, including the capsule specification, the sixty-capsule study in section 02, all performance figures, and the acceptance and yield numbers. There is no public datasheet or product page for this microphone, so nothing here can be checked externally — I'm glad to walk through the real design in a conversation.

---

### 29. Sensor signal generator

| Field | Value |
|---|---|
| Slug | `slb-sensor-signal-generator` |
| Company | SLB |
| Years | 2023 |
| Track | silicon |
| Domain | Test engineering |
| Status | production |
| Context | SLB · 2023 · Test engineering |
| Role | Owner of the problem choice and the bench's contract — failure analysis & R&D engineer |
| Team | 3 — myself, a failure-analysis engineer, a LabVIEW developer, with the calibration lab reviewing |
| Timeline | Oct 2022 – Aug 2023 |
| Stage | In production — deployed across 40+ SLB failure-analysis labs |

**Positioning.** A bench that plays back downhole sensor faults on demand, so a failure analyst stops waiting for a well to reproduce one.

**Outcome (card copy).** Bench instrument that synthesised downhole sensor signals, so tool electronics could be tested without waiting on a well.

**Problem.** Downhole tools carry temperature, pressure, formation-evaluation, accelerometer and gyroscope sensors, and when one misbehaves the fault lives a few kilometres underground. Reproducing it meant a rig, a tool string and a crew. Auditing returned-tool failure records showed most reports could not be reproduced off-rig at all.

**What I did.** I built a bench that synthesises the sensor signals a tool expects to see, including the faulty ones. Rather than emulate a whole tool in a loop, I catalogued documented field fault signatures and played them back open-loop, which is what makes a fault repeatable on demand.

**Result.** The bench reproduces 98.2% of the catalogued field fault signatures — 55 of 56 — within the tolerance the calibration lab signs off, and it runs in more than 40 SLB failure-analysis labs. It is treated as a device under test, verified against calibrated references every session, because a synthesised signal nobody trusts is a signal nobody uses. The turnaround figures below are the worked example.

> **Confidentiality.** Internal SLB tooling. The bench photography is my own and shows commercial instruments only. Fault-library contents, tool identities, customer wells and internal ticket data are not shown, and every figure on this page is invented except three the owner confirms are real: 98.2% signature reproduction, 40+ labs, and the industry-scale cost of non-productive time.

#### 01. Why this, and why now

Drilling loses a well-understood share of its spend to non-productive time — the industry puts total drilling spend in the tens of billions a year and the share lost to NPT at roughly a seventh. A sensor that reports wrongly does not merely fail; it stops a string, and the stopping is what costs money.

The failure-analysis labs sat downstream of that. Three things could have been improved: faster teardown throughput, better field data capture, or the ability to reproduce a fault on a bench at all. I sized them by how many open cases each would let an analyst close without new field time.

**Figure — Share of open failure cases closable without new field time: bench reproduction 71 percent, better field data capture 34 percent, faster teardown 12 percent**

| name | value | label |
|---|---|---|
| Bench fault reproduction | 71 | 71% — no rig time needed |
| Better field data capture | 34 | 34% — helps the next failure, not this one |
| Faster teardown throughput | 12 | 12% — the queue was never the constraint |

_Options scored against the returned-tool audit in section 02, Nov 2022. Teardown throughput scores lowest because the labs were not backed up — analysts were idle, waiting on a rig they did not control. Better capture is the right long-term answer and does nothing for a tool already on the bench._

The customer here is internal: SLB's own global failure-analysis labs. That makes the commercial case easier to state and harder to fund, because nobody invoices for it — the return shows up as tool availability elsewhere on the balance sheet.

#### 02. The problem as people experienced it

I read 84 returned-tool failure records from the preceding two years and coded each by one question: could this fault be reproduced anywhere other than downhole. Not whether it was eventually diagnosed, which flatters the process, but whether an analyst could make it happen again on demand.

| What the analyst had | Where it broke down | Evidence |
|---|---|---|
| A log file and a fault code | No way to make the fault happen again | 61 of 84 records |
| A tool on the bench, powered | Sensors read healthy at room conditions | 48 of 84 |
| A hypothesis about a channel | Testing it needed the tool back downhole | 37 of 84 |
| A fix, applied and shipped | Confirmation waited for the next run | 29 of 84 closed unconfirmed |

**Figure — Of 84 returned-tool failure records: 61 could not be reproduced off-rig, 37 needed a downhole test to check a hypothesis, 29 were closed without confirmation**

| name | value | label |
|---|---|---|
| Failure records reviewed | 84 | 84 |
| Not reproducible off-rig | 61 | 61 |
| Hypothesis needed field time | 37 | 37 |
| Closed unconfirmed | 29 | 29 |

_Returned-tool failure records, Jan 2021 – Oct 2022, coded by reproducibility rather than by outcome. The last bar is the finding that funded the work: roughly a third of cases were closed with a fix nobody had watched work, which is not failure analysis, it is an educated guess with paperwork._

The reframe: the labs did not have a diagnosis problem, they had a stimulus problem. Every analyst knew what to measure and none could make the tool produce it.

#### 03. My role and approach

I was a failure-analysis and R&D engineer, not a product manager. What I owned was the choice of which problem to attack, what the bench had to do before anyone else would use it, and what it would deliberately never do.

The decision that shaped everything was refusing to emulate a tool. A closed-loop tool simulator is the impressive version and it reproduces behaviour, not faults — the loop hides the thing you are trying to see.

**Key decisions**

- **Play signals back open-loop rather than emulate the tool in a loop.** A fault you can trigger identically on demand is worth more to an analyst than a realistic system that produces it sometimes.
- **Build a catalogue of documented fault signatures, not a waveform generator.** A generic generator makes every analyst re-derive what a real fault looks like. The library is the product; the hardware plays it.
- **Verify against calibrated instruments from day one.** Every emulated channel is checked against a reference meter and scope on the same bench, because a synthesised signal nobody trusts is a signal nobody uses.
- **One bench definition, reproducible in any lab.** Forty labs meant the bench had to be a parts list and a procedure, not a thing I had built once and understood personally.

#### 04. What I cut

**Scope**

- _Shipped:_ Open-loop playback of catalogued fault signatures · Current, voltage, resistance and frequency channel emulation · Tool-bus interface for sensor traffic · Reference-instrument verification on every channel · Bench parts list and setup procedure
- _Deferred:_ Automated regression suites per tool family · Thermal-chamber co-ordination · Fault-signature capture straight from field logs
- _Cut:_ Closed-loop tool emulation · Gyroscope dynamic-spin emulation · Multi-fault interaction playback

Closed-loop tool emulation was the hardest cut, and it is what most people picture when you say the words. Modelling a tool well enough to respond to its own outputs meant firmware models we did not have, and it fails the actual requirement: a loop introduces its own dynamics, so the same fault does not land the same way twice. Open-loop playback covers it — the analyst gets a fault they can trigger, repeat and instrument, and where genuine loop behaviour matters they still put the tool on a rig. The honest cost is that interaction faults, where two channels misbehave together, stay outside the bench and outside the 56.

#### 05. How I got it agreed

The metrology and calibration owner would not let the bench into the labs. Her objection was not about accuracy in the abstract: a lab that signs findings uses instruments with traceable calibration, and I was proposing to feed those instruments a signal produced by a laptop and a data-acquisition module with no certificate behind it. If an analyst attributed a failure to a sensor on the strength of my waveform, the finding inherits my uncertainty and nobody has recorded what it is.

I had been arguing that the signals were accurate, which is exactly the claim she could not accept on my word. So I adopted her frame instead: the generator would be treated as a device under test, not an instrument. Every channel is verified against a calibrated reference meter and scope on the same bench, at the time of use, and the comparison is what the analyst records.

She agreed on that basis and added a condition I had not planned to carry. The verification is a step in the procedure rather than a commissioning activity, so it runs every session in every lab, and any channel drifting outside tolerance takes the bench out of service. It costs each analyst about twenty minutes a session, permanently, and it is the reason a bench finding is admissible at all.

#### 06. What was built

A bench that produces what a downhole sensor would produce, healthy or faulty, under software control. LabVIEW drives the channel definitions, a data-acquisition module puts out the analogue signals, a CAN interface carries sensor traffic on the tool bus, and calibrated meters sit across the channels as the reference every session is checked against.

**Interface — Sensor signal generator bench: laptop running the channel front panel, a second screen showing the channel table, a DAQ module, four Fluke meters reading four live channels, a patch panel and boards under test**

- **Four calibrated meters across four live channels, not one meter and a rota.** The meters here read 2.6995 V, 1.001 V, 2.003 mA and 3.000 V at the same instant. Verifying channels one at a time would have made the section 05 concession cost an hour a session instead of twenty minutes, and a check that expensive gets skipped.
- **A fixed patch panel between the generator and the tool, not a loom per tool family.** The bank of posts on the right routes any channel to any tool input. Adding a tool family becomes a patch list a lab can follow, rather than a harness I would have had to build and ship forty times.
- **Channel table on one screen, playback front panel on the other.** The analyst sees what a channel is defined to do beside what it is doing. Folding both into one window tested better in a demo and hid the mistake that actually happens — playing the right fault into the wrong channel.
- **The electronics under test share the bench and the ground with the reference.** The boards on the rail behind the meters are what the signals are being played into. Putting the tool in one room and the calibration in another measures the cable between them, which is how a bench starts producing findings nobody can defend.

_My own photograph of the bench in an SLB failure-analysis lab — a shared high-voltage and current station, hence the signage. Instruments shown are commercial products and the panels shown are channel-emulation VIs. No tool identity, fault-library content or customer data is visible. Happy to walk through the real bench in a conversation._

**Gallery**

- **Untitled**  The tool-bus side — a CAN HS/FD interface carrying sensor traffic to the tool electronics under test, alongside the analogue channels. Sensor faults arrive on a downhole tool through both paths, so a bench that only drove analogue signals would miss the bus-level fault modes entirely.
- **Untitled**  One channel, closer in: an accelerometer emulation VI on the left and a handheld meter reading the current it is putting out on the right. Most downhole sensors report as a current rather than a voltage, so the generator sinks and sources current directly instead of driving a voltage into an assumed load.

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Realism vs repeatability | Open-loop playback of recorded signatures | Interaction faults stay off the bench and out of the count |
| Speed of use vs admissibility | Reference verification every session | About twenty minutes of every analyst's session, permanently |
| One standard bench vs per-lab freedom | A fixed parts list and procedure | Labs with better instruments cannot use them without re-qualifying the bench |
| Library depth vs team size | 56 signatures curated over breadth | Rarer fault modes wait for a lab to contribute one |

#### 08. Impact and outcomes

We agreed before build that this failed if it could not reproduce the twenty most frequent field fault signatures inside the tolerance the calibration lab would sign off. Agreement with the calibrated reference was the guardrail, because coverage is trivially improved by loosening what counts as a faithful reproduction, and a bench that flatters itself is worse than no bench.

**Metrics**

| Value | Measure |
|---|---|
| 98.2% (55 of 56) | Field fault signatures reproduced on the bench |
| 40+ | SLB failure-analysis labs running the bench |
| weeks → under a day | Time to reproduce a reported field fault |
| 56 | Fault modes in the signature library |
| 5 | Sensor channel families emulated |
| ±0.4% (of reading) | Agreement with calibrated reference (guardrail) |

**Figure — Fault-signature coverage: 55 of the 56 catalogued field fault modes reproduce on the bench, one does not**

_55 of 56 — Reproduced within tolerance (55); the rest Not reproducible open-loop (1)_

_The catalogued fault library at handover, Aug 2023, one cell per fault mode. Drawn as units rather than a percentage because the remainder is a specific thing, not a rounding error: the outstanding mode is an intermittent thermal-cycling fault that only appears while the temperature is moving, which open-loop playback cannot hold._

**How we counted.** 98.2% is coverage, not signal accuracy: the share of documented field fault signatures reproduced faithfully on the bench — 55 of 56 catalogued temperature, pressure, vibration, gyroscope and gamma fault modes, where faithful means inside the tolerance the calibration lab signs off against a reference instrument. It excludes intermittent thermal-cycling faults and multi-fault interactions. Signal error is reported separately per channel.

`Bench configuration — LabVIEW/DAQmx arbitrary-waveform VIs per channel · NI data-acquisition module for analogue current, voltage and frequency output · NI-XNET USB-8502 CAN HS/FD interface for tool-bus sensor traffic · Agilent InfiniiVision MSO-X 2000-series oscilloscope and Agilent U8002A DC supplies as bench reference · Fluke handheld DMM for per-channel current verification · emulated families: current-output temperature, resistance and thermocouple temperature, piezoresistive and resonator pressure, 3-axis accelerometer and gyroscope survey signals, gamma-ray count-rate pulse trains`

#### 09. What I'd do differently

I built the library from documented fault reports, which means it inherits the biases of what people bothered to write down. Frequent, dramatic faults are richly described and the quiet intermittent ones are a line of text — and the one mode the bench cannot reproduce is exactly that kind. A sampling pass over raw field logs would have caught the shape of what was missing before the library was frozen.

I would also have designed the contribution path on day one. Forty labs see fault modes I never will, and there is still no clean way for a lab in another region to add a signature — so the catalogue will go stale first in the places furthest from where it was built.

> **Note on this sample.** Sample portfolio page. Screens and figures are recreations or invented placeholders and should be replaced with real data before this page is used — with three exceptions the owner confirms are real: 98.2% fault-signature reproduction, deployment across 40+ SLB failure-analysis labs, and the industry-scale cost of non-productive time cited in section 01. Bench photography is my own and shows commercial instruments only; no tool, fault-library content or customer data is shown. I'm glad to walk through the real bench and its numbers in a conversation.

---

### 30. Ornithopter for surveillance

| Field | Value |
|---|---|
| Slug | `srm-uav-ornithopter-for-surveillance` |
| Company | SRM UAV |
| Years | 2021 - 2023 |
| Track | silicon |
| Domain | Aerial robotics |
| Status | prototype |
| Context | SRM UAV · 2021–2022 · Aerial robotics |
| Role | Project Manager — SRM UAV (student UAV club, SRM University) |
| Team | 6 in the core build team, across the club's design-and-fabrication and electronics groups |
| Timeline | Q3 2021 – Q2 2022 |
| Stage | Prototype — flew a stable circuit on a university field, and was pitched as a concept to DRDO. It never went to users: no operator ever flew it and nothing it recorded was ever used. |
| Link | /demo/ornithopter-concept |

**Positioning.** The disguise worked and the flying did not: the proposal asked for an hour aloft and twenty-five kilometres of reach, and its own arithmetic — run it in the demo — never closed.

**Outcome (card copy).** Flapping-wing surveillance airframe that flew a stable circuit; it stayed in the lab and never went to an operator.

**Problem.** The club's brief was blunt: surveillance drones fly high and suit camps rather than people, and a quadcopter near the ground is heard before it is seen. What was missing could loiter low and be ignored.

**What we did.** We built a flapping-wing airframe from scratch, and before improving its flight we tested what the concept rested on: whether people called it a bird.

**What we learned.** The disguise question was tested before the flight-time question, deliberately — if it does not read as a bird, a longer flight buys nothing, because better aeroplanes exist. It flew stable circuits and never approached the club's own written targets of an hour and twenty-five kilometres, and the demo checks the proposal's coverage arithmetic against exactly that gap. The observer-trial and flight figures below are the worked example.

**Evidence / demos**

- [The demo is the docs — Ornithopter for surveillance, the full project proposal (PDF)](/papers/srm-uav-ornithopter-for-surveillance.pdf)
- [Then the concept of operations — the proposal's own coverage arithmetic, before a motor was chosen](/demo/ornithopter-concept)
- [Or set the endurance to the forty-one seconds that actually flew](/demo/ornithopter-concept?preset=flew)

> **Confidentiality.** Student club work at SRM Kattankulathur. The concept, the surveillance framing, the component list and the build sequence come from the project's own documents. Every number on this page is invented for this sample — flight times, attempt counts, payload margin and the observer trials. The concept was pitched to DRDO; nothing on this page describes any response to that pitch, because none is recorded.

#### 01. Why this, and why now

Flapping-wing surveillance is a funded category. DARPA paid for the Nano Hummingbird — twenty grams, a camera, about ten minutes — and India has run a national micro-air-vehicle programme for over a decade. A club can still test the property those programmes chase.

That property is being unremarkable. Everything else a surveillance platform does is better done by something else, so the bet was worth testing first.

**Figure — Share of a low-altitude loiter each platform can hold before an observer on the ground notices it: flapping wing 71 percent, fixed-wing micro air vehicle 38, small quadcopter 24**

| name | value | label |
|---|---|---|
| Flapping wing, bird silhouette | 71 | 71% — the bet this project exists to test |
| Fixed-wing micro air vehicle | 38 | 38% — quiet, but nothing loiters like that |
| Small quadcopter | 24 | 24% — heard before it is seen |

_Scored against the near-ground surveillance tasks the club's own brief listed, Q3 2021. The quadcopter bar is the club's starting observation rather than ours: their brief already said swarm drones are identifiable and can be eliminated at first sight, which is what pointed at a bird in the first place._

The prospective customer class is defence R&D — people who fund micro air vehicles rather than buy them.

#### 02. The problem as people experienced it

So we tested the disguise before the aircraft: flew it past people who had not been told what they would see, and asked what they were looking at.

| What we asked | What observers said | Across 24 sightings at each distance |
|---|---|---|
| "What are you looking at?" at 20 m | A machine, a drone, or some kind of toy | 17 of 24 |
| The same question at 40 m | A bird — often a specific one | 16 of 24 |
| What made it a bird? | The rhythm of the flapping, not the shape | 19 of 24 |
| Did you hear anything? | Nobody mentioned a sound | 24 of 24 |

**Figure — Share of observers calling it a bird by distance: 29 percent at 20 metres, 67 at 40, 83 at 60, 88 at 80**

| 20 m | 40 m | 60 m | 80 m |
|---|---|---|---|
| 29 | 67 | 83 | 88 |

_Ceiling: 60 — the level we needed to claim it hides in plain sight_

_Twenty-four sightings at each of four distances — 96 in all, Q4 2021. The curve is steep between twenty and forty metres, which is where an airframe stops being a set of parts and becomes a silhouette with a rhythm — and the rhythm is what observers named, not the shape we had spent the term on._

The reframe: we had been building a bird and testing an aircraft. The property worth protecting was the one nobody was working on.

#### 03. My role and approach

I was project manager for this build inside SRM UAV. The club owned the craft — fabrication, wing membranes, the gear train, the flying. What I contributed was making it scoped and pitchable: a customer class, one property worth proving, and a number that would stop us.

None of that is a title. It is deciding a disguise test comes before a flight-time record, and holding the team to it when the interesting work was the gearbox.

**Key decisions**

- **Test the disguise before improving the aircraft.** If it does not read as a bird, a longer flight buys nothing — it is then a bad aeroplane, and better ones exist.
- **Name the customer class before building.** Defence R&D funds micro air vehicles rather than buying them, which turns the artefact from a product into a proof.
- **Set a stop number, not a target.** A club project without one runs until the term ends.

#### 04. What was built

A single-motor flapping-wing airframe: a gear train turning rotary motion into symmetric flapping on carbon spars, a fuselage holding the electronics, and a tail doing the steering. The render below is the concept; what flew was cruder.

**Interface — Concept render of the ornithopter: segmented flapping wings on spars, a fuselage carrying electronics and a nose camera, and a swept tail**

[Open the concept arithmetic — the sums, not a flight](/demo/ornithopter-concept)

- **One motor and a gear train, not two synchronised motors.** The project brief costed both. Two motors flap harder and need the wings kept in step by something; we had no way to instrument that, so we took the mechanical constraint over the control problem.
- **Tail-only control — a rudder and an elevator, no wing twist.** Steering through the wings means a second degree of freedom in the one mechanism already carrying every load. The tail is heavier than it looks and it is why anything flew at all.
- **The camera moved aft after the fifth flight.** In the nose it looked right and pitched the aircraft down. Moving it behind the spar cost us the head silhouette and bought the three flights that finished.
- **Flap rhythm tuned for how it reads, not only for lift.** Once observers told us the rhythm was what made it a bird, frequency stopped being purely a thrust parameter and became the thing the product is.

_The concept render carried on the project card. It is not a photograph of the built aircraft: the project folder holds no photograph of the airframe that flew, and the deck's other images are stock press photography, so nothing else here is ours to publish. The concept arithmetic below checks the proposal against itself — patrol radius against endurance, and the airframes a 24/7 shift pattern would need. It flies nothing and simulates no airframe; it only does the sums the proposal was written with, which is the check that should have come first._

**Gallery**

- **The proposal, checked against itself.** — [Open the concept arithmetic](/demo/ornithopter-concept?preset=flew)  Twenty-five kilometres of patrol radius and one hour of endurance are both in our proposal, and at any plausible cruise speed the transit eats the hour twice over. Set the dial to the forty-one seconds that flew and the fleet arithmetic has nothing left to divide.

_The patrol radius, the coverage figure, the shift pattern and the one-hour target are the project's own; the cruise speed, turnaround and fleet arithmetic are a worked illustration for this sample. No operator ever flew this aircraft. The full write-up is the first link at the top of this page._

#### 05. What we learned

We agreed before build that this failed if it could not hold controlled flight with the camera aboard long enough to be worth pointing at anything — thirty seconds.

**Figure — Nine flight attempts in order: four structural failures, two aborts, and three completed circuits, all after the camera was moved aft**

| name | outcome |
|---|---|
| 1 | fail |
| 2 | fail |
| 3 | abort |
| 4 | fail |
| 5 | abort |
| 6 | ok |
| 7 | fail |
| 8 | ok |
| 9 | ok |

_The whole campaign, Q1–Q2 2022. The order is the finding: nothing improved until a weight moved, and the change that produced three clean flights was not a change to the mechanism anyone had been working on. Flight seven still broke a spar, so the fix was real but partial._

**Metrics**

| Value | Measure |
|---|---|
| 41 s (best circuit, camera aboard) | Longest controlled flight |
| 9 → 3 (attempted → completed) | Flights that finished as intended |
| +6 g (over airframe and battery) | Payload margin with the camera |
| 67% (observers at 40 m) | Bird-mistake rate (guardrail) |

We cleared our own bar and the bar was wrong. Forty-one seconds beats thirty and means nothing against a concept written around an hour aloft — the number we set was a build milestone wearing a product criterion's clothes. The campaign taught us where the ceiling sits: the gear train wears, payload margin is a few grams, and control authority runs out before endurance does.

We pitched the concept to the Defence Research and Development Organisation. Nothing here describes what came back, because nothing is recorded. Preparing it taught us something anyway: naming a customer class forced us to admit that of seven surveillance tasks in our brief, only two survived contact with forty-one seconds. It never went to users — no operator flew it, and nothing it recorded was used.

**How we counted.** Sustained flight is continuous controlled flight from launch to landing without structural failure, camera fitted. It excludes hand-glide hops and tethered bench runs. Bird-mistake rate is the share of unprompted observers answering "a bird" at a stated distance — a perception measure, not a claim about detectability.

`Airframe — single motor driving a multi-stage gear train into symmetric flapping wings on carbon spars, with a teardrop fuselage carrying the electronics and a tail providing rudder and elevator authority · brushless outrunner and coreless DC motors both trialled, with an electronic speed controller · 2.4 GHz transmitter and receiver, flight controller, LiPo pack and power module · micro camera in the single-gram-to-ten-gram class, mounted aft of the wing spar · representative rather than measured bands: wingspan in the sub-metre class, all-up weight in the hundreds of grams, flap frequency in the low single-digit to low double-digit hertz range · the club's own written targets were one hour endurance and twenty-five kilometres range, neither approached`

#### 06. What I'd do differently

I would have put load cells on the bench rig before the first airframe, not after the fourth. We read the rig by eye, so the gearbox was tuned by whether it sounded right — and four structural failures are what that cost.

I would also have left the camera off until the airframe flew. Integrating it early felt like de-risking and made every flight a test of two things, so trim and payload problems looked identical.

> **Note on this sample.** Sample portfolio page. What is real: the project and the club, the surveillance framing and the seven task areas, the component list, the single-versus-dual-motor choice, the fuselage-wings-tail structure, the club's own written targets of one hour and twenty-five kilometres, and the fact that the concept was pitched to DRDO. Every figure is invented and internally reconciled — flight times, the nine attempts, payload margin, and the observer trials — and no claim is made about any response to the DRDO pitch, because none is recorded. The category anchors in section 01 are public facts about other people's programmes, not ours. The image is the concept render from the project card, not a photograph of the aircraft that flew. There is no public page for this project, so nothing here can be checked externally. I'm glad to walk through the real build in a conversation.

---

### 31. Carbon positive e-car

| Field | Value |
|---|---|
| Slug | `ricky-kids-carbon-positive-ev` |
| Company | Ricky Kids |
| Years | 2020 |
| Track | silicon |
| Domain | Sustainable mobility |
| Status | research |
| Context | Ricky Kids · 2020 · Sustainable mobility |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 3 students across two universities |
| Timeline | Q2 2020 – Q4 2020 |
| Stage | Research — concept and modelling study. No vehicle was built and nothing was measured in service. |
| Link | https://drive.google.com/drive/u/0/folders/1UFIFRPfj_T6rlZwSt5imc6q1aBv4Wm-e |

**Positioning.** We modelled our own concept's carbon balance and found the two features it was named for are on the wrong side of it.

**Outcome (card copy).** Feasibility study on whether a small EV could offset more carbon than it embodied — the answer turned entirely on grid mix.

**Problem.** We had designed a small electric car with rooftop solar, a turbine in the radiator position and a HEPA and activated-carbon filter stack, and we were calling it carbon positive. Nobody on the team had checked whether that phrase was true.

**What we did.** We built a cradle-to-grave carbon model from the concept's own bill of materials, ran it across nine scenarios, and put each energy-harvesting claim through a conservation-of-energy check before letting it into the model.

**Finding.** Carbon positive is unreachable, not marginal: nothing on the vehicle removes carbon dioxide, and the onboard turbine costs more in drag than it generates. What survives is a modest advantage over petrol that turns entirely on grid mix — the worked model below carries the numbers.

**Evidence / demos**

- [The demo is the docs — Carbon Positive e-car, the full concept write-up (PDF)](/papers/ricky-kids-carbon-positive-ev.pdf)

> **Confidentiality.** Student research at SRM Kattankulathur with a collaborator at Jadavpur University. The concept, its system diagrams and its component list are the project's own. The carbon model, its scenarios and every figure on this page are invented for this sample — no vehicle exists, so nothing here has been measured.

#### 01. Why this, and why now

In 2020 an electric car in India was still an argument rather than a purchase, and the argument was being had in slogans. We had joined in with one of our own, and the honest version of this project starts with noticing that.

So before modelling anything we sized where a car's lifetime carbon actually sits, to see how much of it the features we were proudest of could possibly touch.

**Figure — Share of a small car's lifetime carbon each lever can address: electricity source 62 percent, manufacture 31 percent, onboard generation and filtration 2 percent**

| name | value | label |
|---|---|---|
| Where the electricity comes from | 62 | 62% — and entirely outside the vehicle |
| Battery and vehicle manufacture | 31 | 31% — set by suppliers, not by us |
| Onboard generation and filtration | 2 | 2% — the part the concept was built around |

_Modelled over a 200,000 km life, Q2 2020. The bottom bar is the uncomfortable one. Every feature in our name and on our slides sits inside it, and the lever that matters is a decision somebody else makes at a power station. The three bars are the levers we scored and not an exhaustive split: the remaining ~5% is the unscored tail — maintenance, tyres, fluids and end-of-life transport, each under two percent on its own._

The beneficiaries are early small-EV buyers in Indian cities and the people breathing the air around them. There is no customer here — in 2020 there was barely a market.

#### 02. The problem as people experienced it

We built the model from our own component list rather than a template, then ran it across three grid intensities and three assumed lifetimes. One rule: any subsystem claiming to generate energy had to survive an energy-conservation check first.

| What the concept claimed | What the check found | Verdict |
|---|---|---|
| Rooftop solar charges the car | Real, but small — roof area caps it | Kept, at 2% of energy |
| A turbine in the airflow generates power | The airflow is drag the motor already paid for | Net loss, removed |
| HEPA and carbon filters clean the air | They capture particulates and odours | Real, but removes no CO₂ |
| Therefore the car is carbon positive | Nothing on it removes carbon at all | Claim withdrawn |

**Figure — Lifetime carbon of the concept against a petrol equivalent at three grid intensities: 36, 32 and 14 tonnes against 42**

| name | before | after |
|---|---|---|
| Coal-heavy, 820 g/kWh | 42 | 36 |
| Indian mix 2020, 700 | 42 | 32 |
| Low-carbon, 120 g/kWh | 42 | 14 |

_Nine scenarios reduced to the three that move the answer, Q3 2020. The petrol bar barely changes and ours moves by a factor of two and a half — the same vehicle is either a modest improvement or a transformative one depending on a decision made at a power station. None of the bars goes below zero._

The reframe: we had been designing features to make a claim true, when the claim was already decided by the electricity we would plug into.

#### 03. My role and approach

I founded Ricky Kids and led this project. Three of us across two universities did the work, and the decision that mattered was mine: to model our own idea adversarially rather than keep presenting it.

There is no cleverness in what follows. The judgment was being willing to run a check that could only embarrass us, on a concept we had already put our names to.

**Key decisions**

- **Make every generating claim pass conservation of energy first.** Harvesting from a car's own airflow is taking energy the motor has already spent pushing air aside. A model that lets that through will confirm anything.
- **Report net emitted, never net saved.** Savings are measured against a baseline you choose. Emitted is measured against zero, which is what the name of the project was claiming.
- **Model the grid as a range, not a value.** The one input that dominates the answer is the one we control least, so a single figure would have been a forecast dressed as a result.

#### 04. What was built

A concept, drawn and costed. Air enters at the radiator, turns a cylindrical turbine and passes a HEPA and activated-carbon stack; solar panels on roof, bonnet and boot feed a charge controller; regenerative braking and an optional wall charger make up the rest.

**Interface — The team's system diagram of the wind-power charging and air-purification path: air entering the radiator, a cylindrical turbine, wind controller, filter stack, drive system and energy storage**

[Read the paper](/papers/ricky-kids-carbon-positive-ev.pdf)

- **The air the turbine harvests is air the motor is already paying to push aside.** This diagram is where the project's honesty problem lives. Nothing is wrong with the drawing — the arrows are real, the parts exist. The energy is simply not free, and no arrangement of them makes it free.
- **Putting the filter stack downstream of the turbine was the right call for the wrong reason.** It shares one air path instead of two, which is genuinely good engineering. We adopted it because it made the slide simpler.
- **The filters were chosen for particulates and odours, then credited against carbon.** HEPA captures particles and activated carbon adsorbs volatile organics. Both are real and useful. Neither touches carbon dioxide, and that is the whole distance between the name and the model.
- **Keeping the drawing on the page after the finding.** The temptation was to quietly redraw it without the turbine. Leaving it is the only reason this page is worth reading.

_Our own system diagram from the project deck. This is a concept drawing: no vehicle, subsystem or filter stack was ever built, and nothing in it was measured. The full concept write-up is linked below — the carbon model, the turbine argument and the grid-mix conditional, as we wrote them at the time._

**Gallery**

- **Untitled**  The solar path, which is the part that holds up. Panels across roof, bonnet and boot into a charge controller and the pack — real generation from a source the vehicle is not itself paying for. It is also capped by the area of a car, which is why it contributes about 2% of lifetime energy and cannot be scaled by wanting it more.

#### 05. Finding and what it changed

We agreed before build that this failed if we could not show the concept carbon positive — net removal across its whole life — under some assumption set we were prepared to defend in front of somebody who disagreed with us.

**Figure — Lifetime carbon walked from a petrol equivalent to the concept: 42 tonnes less 36 for fuel removed, plus 21 for grid electricity and 5 for embodied carbon, ending at 32 tonnes**

| name | value | kind | label |
|---|---|---|---|
| Petrol equivalent, 200,000 km | 42 | total | 42 t |
| Fuel and tailpipe, removed | -36 | subtract | −36 |
| Grid electricity over life | 21 | add | +21 |
| Extra embodied carbon | 5 | add | +5 |
| Rooftop solar over life | -2 | subtract | −2 |
| Onboard turbine, net of drag | 1 | add | +1 |
| Air-purification load | 1 | add | +1 |
| The concept, modelled | 32 | total | 32 t |

_At the 2020 Indian grid intensity, Q4 2020. Two of the three features the concept was named for are red bars — the turbine and the purifier both cost carbon rather than removing it. The floor of this chart is zero, and carbon positive would need the final bar to be below it._

**Metrics**

| Value | Measure |
|---|---|
| +32 t CO₂e (emitted over 200,000 km) | Net lifecycle carbon (guardrail) |
| 24% (below a petrol equivalent) | Best claim the model supports |
| −3% (range, after added drag) | Net contribution of the onboard turbine |
| 9 (3 grids × 3 lifetimes) | Scenarios modelled |

The answer is not close. Carbon positive needs net removal, and nothing on this vehicle removes carbon dioxide — the filters clean particulates and odours, which is a real public good and an entirely different molecule. The turbine harvests drag the motor has already paid for. What it changed is the claim: we stopped saying carbon positive, dropped the turbine, and described the filters as air quality rather than carbon.

What this could not tell us is what a real one would emit. Nothing was built and nothing measured: embodied figures come from published averages, the duty cycle is assumed, battery degradation is not modelled, and end-of-life credits are excluded. A built vehicle could land either side of this page.

**How we counted.** Net lifecycle carbon is modelled embodied plus operational CO₂e over an assumed 200,000 km life, minus anything the vehicle removes from the atmosphere. Carbon positive requires that total to be below zero. It excludes end-of-life recycling credits, and credits the air-purification system with removing no carbon dioxide.

`Concept — photovoltaic panels integrated into roof, bonnet and boot under glass, feeding a solar charge controller and the energy storage system · horizontal cylindrical turbine at the radiator position with a wind controller · regenerative braking · optional external charger · air-purification chambers with HEPA and activated-carbon layers downstream of the turbine · 1000 V DC EV fuses, contactor, proximity pilot, EV shunt, ignition switch · DC-DC converter from a 200–800 V pack to 48 V and 12 V · Modular EV Power AVC2 controller, PID control loop, coolant pumps and fans, DC traction motor · state-of-charge meter and tachometer · carbon model built by hand in a spreadsheet, no lifecycle-assessment tool`

#### 06. What we'd do differently

The conservation-of-energy check took an afternoon and should have happened in the first week, before the diagrams, the component list and the name. We ran it late because the concept was already something we were presenting, and by then the check was a threat rather than a tool.

I would also separate the two good ideas from the bad one earlier. Solar on a car and a filter stack on a car are both defensible, and they spent a year attached to a turbine that was not — so when the turbine failed, the whole concept looked discredited rather than two thirds intact.

> **Note on this sample.** Sample portfolio page. The project is real: a three-student concept from SRM Kattankulathur with a collaborator at Jadavpur University, and the system diagrams and component list shown are the team's own. The carbon model is a worked illustration built for this page — the tonnages, grid intensities, scenario counts and percentages are invented and internally reconciled. No vehicle, subsystem or filter stack was built or measured, and there is no public page for this project, so nothing here can be checked externally. The two engineering conclusions it rests on — that harvesting a moving vehicle's own airflow cannot yield net energy, and that HEPA and activated-carbon filtration does not remove carbon dioxide — are not invented. I'm glad to walk through the real concept in a conversation.

---

### 32. UAV-aided weather radar calibration

| Field | Value |
|---|---|
| Slug | `ricky-kids-uav-weather-radar-calibration` |
| Company | NIT Tiruchirapalli  & SRM University |
| Years | 2022 |
| Track | silicon |
| Domain | Weather instrumentation |
| Status | research |
| Context | NIT Tiruchirappalli & SRM University · 2022 · Weather instrumentation |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 8 students across three campuses, with three faculty investigators and a mentor at ISRO ISTRAC |
| Timeline | Q1 2022 – Q2 2022 |
| Stage | Research — submitted as an ISRO YUKTI-Sanchita proposal. No flights were conducted. |
| Link | /demo/radar-error-budget |

**Positioning.** Flying the calibration target instead of building a tower for it — and finding that the hard part is knowing where the target is, not flying it there.

**Outcome (card copy).** Tested whether a UAV-carried reflector could calibrate ground weather radar in place, instead of a fixed tower reference.

**Problem.** A weather radar is calibrated by measuring the return from an object of known radar cross section, and that object has to sit in the far field. Radars live on towers and rooftops, so the reference has to be flown to it.

**What we did.** Rather than start with the airframe, we decomposed the error budgets of four published UAV calibration experiments to find which term actually sets the achievable accuracy — and set a pass mark before anyone had chosen a motor.

**Finding.** Position uncertainty dominates the budget, almost all of it altitude rather than horizontal — a conclusion the demo derives live rather than asserts — and with the GNSS module in our own bill of materials the method misses its own pass mark. The decomposition below is the worked example.

**Evidence / demos**

- [The papers this method was decomposed from — UAV-based far-field antenna characterisation for polarimetric weather radars (Umeyama, Matsumoto)](https://hdl.handle.net/11244/326678)
- [Paper — UAV antenna characterisation against a pedestal reference, IEEE Access](https://doi.org/10.1109/ACCESS.2020.3027790)
- [Paper — UAV-carried sphere calibration of an S-band radar, IEEE TGRS](https://doi.org/10.1109/TGRS.2019.2933912)
- [Then the error budget — five terms, a 1.5 dB budget, and the term it turns on](/demo/radar-error-budget)

> **Confidentiality.** Student research with SRM and NIT Tiruchirappalli, mentored from ISRO. The proposal, its component list and the literature it rests on are real. The error budget on this page is our own analysis and its numbers are invented for this sample — no flight data exists, because the work was funded as a two-year programme and this page covers only the study that preceded it.

#### 01. Why this, and why now

Weather radar products are only as trustworthy as the radar constant behind them, and that constant drifts with the transmitter, receiver and antenna together. Internal calibration cannot see that drift; external calibration can, but it needs a known target parked in the far field of an antenna that usually sits on a rooftop.

The timing was not ours. ISRO and the India Meteorological Department had just run the country's first drone-based calibration of a weather radar, which turned the question from whether this is possible into whether it is repeatable by people without their budget.

**Figure — Share of a radar's antenna pattern a known target can be placed in: UAV-carried sphere 84 percent, tethered balloon 22 percent, fixed pedestal 4 percent**

| name | value | label |
|---|---|---|
| UAV carrying a metal sphere | 84 | 84% — flies to the pattern instead of waiting for it |
| Tethered balloon | 22 | 22% — altitude yes, azimuth no |
| Fixed tower or pedestal | 4 | 4% — really one point, built once |

_Scored against the elevation and azimuth range each option can place a target in without moving the radar, Q1 2022. The pedestal figure is generous: a fixed reference is not four percent of a pattern, it is a single point in it, expressed as coverage so the three sit on one scale._

The beneficiaries are meteorological services and the calibration groups inside them, who currently choose between an expensive fixed reference and no external calibration at all.

#### 02. The problem as people experienced it

Every published UAV calibration experiment we could find reported a headline accuracy and called its navigation adequate, without saying what accuracy the navigation needed. So we took four of them and pulled their error budgets apart, attributing each reported total to the terms that produced it.

| What each experiment reported | What the decomposition showed | Across 4 experiments |
|---|---|---|
| A total calibration error in dB | Most of it traceable to a single term | 4 of 4 |
| Navigation described as sufficient | No stated positioning tolerance anywhere | 4 of 4 |
| Altitude and horizontal error treated alike | Altitude dominates by roughly three to one | 3 of 4 |
| Flights in clear air | None flown in precipitation | 4 of 4 |

**Figure — Reported calibration error against the portion attributable to sphere positioning, for four published experiments**

| name | from | to |
|---|---|---|
| S-band, sphere and external GNSS | 1.8 | 1.5 |
| Polarimetric X-band characterisation | 1.4 | 1.1 |
| UAV against a pedestal reference | 1.1 | 0.9 |
| Altitude-limited trial | 2.2 | 1.9 |

_Four published experiments, decomposed Q1 2022. The left dot is what each paper reported; the right dot is what we could attribute to knowing where the sphere was. The gap between them is everything else in the radar — and in all four it is the smaller half of the problem._

The reframe: this is not a drone project with a positioning requirement attached. It is a positioning project that happens to need a drone.

#### 03. My role and approach

I founded Ricky Kids and led this study; the faculty investigators owned the ISRO relationship and the funding case, and I owned what we would try to find out. The judgment shows in one place only — deciding the interesting question was not the aircraft.

Eight students across three campuses wanted to start building a hexacopter, because that is the visible part. Agreeing a pass mark first is what stopped that.

**Key decisions**

- **Decompose before designing.** Four published error budgets cost a fortnight and told us which term to spend two years on.
- **Set the pass mark before choosing hardware.** A number agreed while the airframe is still abstract is a number nobody is invested in defending.
- **Keep the passive metal sphere.** A transponder would have been easier to see against clutter and would have replaced a known radar cross section with a calibration of its own.

#### 04. What was built

What exists is a specified system and the model that justifies it: a hexacopter carrying a metal sphere with its own GNSS receiver mounted beneath it, flying pre-programmed zigzags through the radar's illumination so the antenna pattern is intercepted at known points.

[Open the error budget — arithmetic, not a flight](/demo/radar-error-budget)

- **The sphere carries its own GNSS receiver, separate from the UAV's.** The airframe's position is not the target's position, and the gap between them is a lever arm that swings with attitude. Two fixes make that gap measurable instead of assumed.
- **Pre-programmed zigzags rather than piloted passes.** The pattern has to be intercepted at repeatable points across elevation and azimuth. A pilot flying to a display cannot repeat a track well enough to compare two calibrations.
- **A passive sphere, not an active transponder.** The whole method rests on a target whose radar cross section is known from geometry. Anything powered introduces a second thing needing calibration.
- **Altitude accuracy prioritised over horizontal.** It falls out of the analysis in section 05 rather than out of preference, and it changes which GNSS solution is worth paying for.

_Drawn from the proposal's methodology rather than photographed: this system was specified and costed, not flown. The staging folder holds the submission-format reference and cited figures, none of which are our own imagery, so nothing has been published here in place of a real one. The error budget below is the decomposition on this page made adjustable — five terms, a 1.5 dB budget and a positioning dial. It is arithmetic and nothing else: no airframe, no radar, no sphere and no measurement anywhere in it, which is exactly the stage this project reached._

**Gallery**

- **The term the method turns on.** — [Open the error budget](/demo/radar-error-budget?preset=bom)  Drag the positioning dial from the ±0.35 m the budget demands to the ±1.5 m the module in our own bill of materials gives, and the total goes from 1.46 dB to 5.73. Every other term can be made perfect and it still misses.

_A worked illustration of the decomposition described above, not a measurement. No flights were conducted, no radar was calibrated and no hardware was built._

#### 05. Finding and what it changed

We agreed before build that this failed if sphere position uncertainty put more than 0.5 dB of error into the antenna pattern at the three-decibel beamwidth — below that, the method cannot beat the fixed reference it replaces.

**Figure — Swing each term puts into calibration error across its plausible range: sphere altitude 1.33 decibels, horizontal position 0.45, sphere cross section 0.30**

| name | low | high | label |
|---|---|---|---|
| Sphere position — altitude | -0.62 | 0.71 | 1.33 dB swing |
| Sphere position — horizontal | -0.21 | 0.24 | 0.45 dB |
| Sphere radar cross section | -0.14 | 0.16 | 0.30 dB |
| Scattering off the airframe | -0.11 | 0.13 | 0.24 dB |
| Receiver linearity | -0.05 | 0.06 | 0.11 dB |

_Baseline: nominal calibration_

_Each term moved across the range the four experiments support, everything else held at nominal, Q2 2022. Altitude alone swings wider than the other four combined. The published advice to prioritise vertical accuracy over horizontal turns out to be derivable rather than a matter of taste, which is the only part of this analysis that felt like a result._

**Metrics**

| Value | Measure |
|---|---|
| 1.4 dB (of a 1.5 dB budget) | Error swing traced to sphere positioning |
| ±0.35 m (altitude, 1σ) | Positioning accuracy the method demands (guardrail) |
| 4 (published experiments) | Error budgets decomposed |
| ±12° (elevation, at 350 m standoff) | Angular coverage one flight pattern reaches |

With the GNSS module already in our own component list, positioning contributes about 1.4 dB against a 0.5 dB pass mark. The method fails as we proposed it — and that is the finding, because it arrived before anyone had bought a motor. What it changed: a precise-point-positioning solution became the first deliverable rather than a supporting detail, and the aerodynamic work the team wanted to start on moved behind it.

What this could not tell us is whether the method survives weather. All four experiments were flown in clear air, and a weather radar's calibration matters most in precipitation — which also degrades the GNSS solution the approach now rests on.

**How we counted.** Calibration error is the deviation in returned power between the sphere's known radar cross section and the radar's measurement of it, in decibels at the three-decibel beamwidth. It excludes weather-induced propagation error, which is not a property of the radar and is what the calibration exists to let you correct for later.

`Specified system — hexacopter with six brushless DC motors, three clockwise and three counter-clockwise, on Readytosky 80 A electronic speed controllers · Pixhawk 32-bit flight controller · u-blox NEO-M8N GNSS on the airframe · FlySky FS-iA6B receiver · Raspberry Pi companion computer with a camera module · Bosch Sensortec BME280 and Silicon Laboratories SI1145 environmental sensors · LiPo packs, ten propellers, flexible landing gear · airframe modelled in SolidWorks, target endurance 30–40 minutes, payload class 2.5 kg · calibrator is a passive metal sphere with a second GNSS box slung beneath it · reference radar in the decomposed experiments is an S-band polarimetric Doppler transportable atmospheric radar at 350 m standoff and 12° elevation · proposal YS/PD-IP/318, ISRO YUKTI-Sanchita 2021, April 2022`

#### 06. What we'd do differently

We decomposed four experiments because four was what we could get full enough error reporting from, and that is a thin base for a conclusion we let redirect the whole programme. Three of the four came from the same research lineage, so their agreement is weaker evidence than it looks — a point we did not press, because the answer was one we liked.

We would also have written the pass mark into the proposal. It shaped everything and appears nowhere in what we submitted, so reviewers saw a plan to build a drone rather than a hypothesis with a stated way to fail.

> **Note on this sample.** Sample portfolio page. The project is real: proposal YS/PD-IP/318, submitted to ISRO's YUKTI-Sanchita 2021 programme in April 2022 with SRM and NIT Tiruchirappalli, and the three papers linked above are the ones the study actually rests on. The specified system and its component list come from the proposal. The error budget, its numbers, the pass mark and the four-experiment decomposition are presented here as a worked illustration and the figures are invented — no flights were made and no flight data exists. I'm glad to walk through the real proposal in a conversation.

---

### 33. Non-contact COVID patient monitoring

| Field | Value |
|---|---|
| Slug | `ricky-kids-noncontact-covid-monitoring` |
| Company | Ricky Kids |
| Years | 2021 |
| Track | silicon |
| Domain | Health sensing |
| Status | research |
| Context | Ricky Kids · 2021 · Health sensing |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 6 students across three universities, with a faculty supervisor in electronics and communication at SRM |
| Timeline | Q3 2021 – Q1 2022 |
| Stage | Research — bench feasibility study on healthy volunteers. Never used on patients and never clinically evaluated. |
| Link | /demo/covid-bench |

**Positioning.** An engineering feasibility study that concluded against its own premise: the two readings staff act on are the two that need contact.

**Outcome (card copy).** Bench-tested which vital signs survive distance: temperature and respiration have a non-contact route; the two staff escalate on do not — a study that concluded against its own premise.

**Problem.** Watching an isolated patient costs a gowning cycle. Shadowing observation rounds across three wards, more than half of all entries into a room existed only to read numbers off a patient — around nine minutes of ritual for about a minute of measurement.

**What we did.** We tested, on a bench and against a commercial contact monitor, which of the four parameters our design set out to report could actually be obtained without touching anyone. Healthy volunteers, scripted conditions, no patients at any point.

**Finding.** Two of the four are reachable and two are not, and the two that are not — oxygen saturation and blood pressure — are the ones staff escalate on. That is a conditional result against our own premise.

**Evidence / demos**

- [The demo is the docs — Non-contact based COVID-19 monitoring system, the full write-up (PDF)](/papers/ricky-kids-noncontact-covid-monitoring.pdf)
- [Then the bench — which channels worked, and how many gowning cycles that removes](/demo/covid-bench)
- [Or leave every parameter ticked, as a standard round requires, and watch the saving stay at zero](/demo/covid-bench?cond=still)
- [Prior art the architecture was written against — wireless data communication in a medical device network](https://patents.google.com/patent/US20070254593A1/en)
- [MQTT — the messaging standard the telemetry path uses](https://mqtt.org/)

> **Confidentiality.** Student research at SRM, with collaborators at Jadavpur University and VIT Vellore. This page describes an engineering feasibility test and makes no diagnostic or clinical claim of any kind. The workflow observations, the bench comparison and every number on this page are invented for this sample; what is real is the project, its architecture and the contact monitor we measured against.

#### 01. Why this, and why now

In the second pandemic year, isolation wards were rationing something that had never been scarce: the act of walking up to a patient. Every entry meant a full gowning cycle, a set of disposables and a doffing sequence, and that arithmetic fell hardest on the shortest task.

We wanted to know how much of the burden was measurement rather than care, because only the measurement part is an engineering problem. Everything else on this page follows from the answer being most of it.

**Figure — Purpose of staff entries into an isolation room: routine observation 58 percent, medication and treatment 27 percent, patient request 15 percent**

| name | value | label |
|---|---|---|
| Taking a routine observation | 58 | 58% — reading numbers off a patient |
| Medication and treatment | 27 | 27% — care that has to happen in the room |
| Patient request or comfort | 15 | 15% — and the part nobody wants to reduce |

_Entries logged during observation rounds across three wards, Q3 2021. The middle and bottom bars are not targets: nobody was trying to reduce the number of times a nurse goes to a patient who asked for one. Only the top bar is a measurement problem, which is what made it worth attempting._

The beneficiaries are isolation and quarantine settings and the staff in them — not a buyer, and not a patient making any decision on the basis of this device.

#### 02. The problem as people experienced it

We shadowed observation rounds in three wards and timed every phase of an entry, then built a bench comparing each non-contact channel we could construct against a commercial contact monitor on the same volunteer at the same moment.

| What the round requires | What we observed | Across 3 wards |
|---|---|---|
| Full protective equipment for every entry | The same cycle whether the task takes a minute or twenty | 3 of 3 |
| Observations at fixed intervals | Intervals quietly stretched when staffing was short | 3 of 3 |
| Readings recorded at the bedside | Written once inside, transcribed again outside | 2 of 3 |
| A monitor available per bed | One monitor shared and wheeled between beds | 2 of 3 |

**Figure — Minutes per entry into an isolation room by phase: gowning 3.5, in the room 1.2 to 4.1, doffing and disposal 4.8**

| name | values | label |
|---|---|---|
| Routine observation | [3.5, 1.2, 4.8] | 9.5 min |
| Medication round | [3.5, 4.1, 4.8] | 12.4 min |
| Patient request | [3.5, 2.6, 4.8] | 10.9 min |

_Timed across three wards, Q3 2021. The fixed 8.3 minutes either side is the same whatever happens in between, so for an observation the useful minute is roughly one in eight. That ratio, not any clinical argument, is the whole case for measuring from across the room._

The reframe: the target was never the reading. It was the gowning cycle wrapped around it, and a device only removes that if it removes every reason to go in.

#### 03. My role and approach

I founded Ricky Kids and led this project; a faculty supervisor owned the institutional side and the patent filing, and I owned what we would test and what would count as a failure.

The judgment worth pointing at is testing the premise rather than the prototype. We had a working architecture on paper and a stand designed around it, and the useful question was whether the thing it was designed to do was possible at all.

**Key decisions**

- **Measure against a commercial contact monitor, not against ourselves.** An agreement number is only meaningful against an instrument somebody already trusts.
- **Script the conditions we expected to fail.** A subject sitting still is not a ward. Movement and repositioning were in the protocol from the start rather than discovered later.
- **Healthy volunteers only, and no patient at any point.** A bench test that touches patients stops being a bench test and starts needing an ethics process we neither had nor should have improvised.

#### 04. What was built

A bench: a volunteer seated at a measured standoff, our non-contact channels logging on one side, and the contact monitor below attached to the same person at the same time.

**Interface — A commercial multi-parameter patient monitor on a rolling stand, showing heart rate, blood pressure, oxygen saturation, respiration and temperature, with electrode leads, a finger probe and a cuff in the basket beneath**

[Open the bench — the feasibility question, not the device](/demo/covid-bench)

- **The reference is a commercial monitor, not our own device.** Everything on this page is a comparison against it. Grading our sensing against another prototype of ours would have measured agreement between two guesses.
- **Both channels log the same subject in the same minute.** Comparing to a reading taken a few minutes earlier turns normal physiological variation into apparent sensor error, which flatters or damns the result at random.
- **The cables in the basket are the finding.** Electrodes, a finger probe and a cuff — the reference cannot produce two of these five numbers without touching somebody, and neither, it turned out, could we.
- **Nothing here was ever taken to a bedside.** The stand was designed to be wipeable and moved between rooms, and it never was. This is a bench, and the page claims nothing beyond one.

_My own photograph of the commercial contact monitor used as the reference instrument. It is not our device and nothing we built is shown. No patient, ward or clinical setting appears in this photograph or anywhere in this project. The bench below is the feasibility question rather than the device: which channels cleared the agreed margin under which conditions, and how many entries into a room that would actually have removed. It takes no reading, contains no hardware, and no patient appears anywhere in it._

**Gallery**

- **The premise, checked.** — [Open the bench](/demo/covid-bench)  Tick the parameters a round has to report and the saving is zero at every condition, because oxygen saturation and blood pressure have no non-contact route at all. Untick those two — and pulse, which was marginal at best — and the device looks excellent, which is the framing our own materials used, and the one the study does not support.

_A recreation of the feasibility question, not of the device. No patient took part in any part of this project and no clinical claim is made or implied. The full write-up is the first link at the top of this page._

#### 05. Finding and what it changed

We agreed before build that this failed if a non-contact channel disagreed with the contact reference by more than an agreed margin under the movement a real patient produces — not under stillness, which anyone can pass.

**Figure — Which parameters a non-contact channel could obtain, by condition: temperature and respiration usable when still, oxygen saturation and blood pressure unreachable in every condition**

|  | Still, 1.2 m | Small movement | Repositioning | Beyond 2 m |
|---|---|---|---|---|
| Skin temperature | pass | pass | marginal | marginal |
| Respiration rate | pass | marginal | fail | fail |
| Pulse rate | marginal | fail | fail | fail |
| Oxygen saturation | none | none | none | none |
| Blood pressure | none | none | none | none |

_Bench sessions with healthy volunteers, Q4 2021 to Q1 2022. The two dashed rows are the result. They are not a measurement that came out badly — there was nothing to measure, because neither oxygen saturation nor blood pressure has a route to it that does not involve touching the person._

**Metrics**

| Value | Measure |
|---|---|
| ±1.4 (breaths per minute, seated and still) | Respiration agreement vs contact reference (guardrail) |
| 1.2 m (agreement collapsed beyond it) | Usable standoff |
| 0 of 2 (oxygen saturation, blood pressure) | Escalation parameters reachable without contact |
| 24 (6 healthy volunteers) | Bench sessions — no patients, ever |

Temperature and respiration cleared the margin seated and still, and respiration fell out of it as soon as someone shifted in bed. Pulse was marginal at best. The two parameters our own abstract called serious were the two we could not reach. What it changed: the device stopped being described as a replacement for an observation round and became a screening adjunct whose only honest job is telling staff when to gown up and go in.

What this could not tell us is anything clinical. It measured agreement with an instrument on a bench, using six healthy volunteers under scripted conditions. It says nothing about diagnostic sensitivity or specificity, nothing about anyone who is actually ill, and it was never used to inform a decision about a patient.

**How we counted.** Agreement is the deviation of a non-contact channel from the commercial contact monitor, on the same volunteer in the same minute, under bench conditions. It is an engineering agreement metric and explicitly not diagnostic accuracy: it excludes any clinical claim, and no reading from this work was ever used in the care of a patient.

`Bench and architecture — non-contact channels were an infrared thermal sensing element for skin temperature and a camera-based chest-motion channel for respiration; no radar was built · reference instrument is a commercial multi-parameter patient monitor with electrode leads, a finger probe and a cuff · microcontroller with Wi-Fi and Bluetooth publishing over MQTT to an IoT gateway, then to a cloud database and a browser dashboard · adjustable wipeable floor stand, height-adjustable on one axis, filleted edges, rubber-footed, modelled for disinfection between rooms · no sensor part numbers are named here because the project's own documents name none, and nothing has been supplied in their place`

#### 06. What we'd do differently

We should have run the parameter feasibility question first, on paper, before designing a stand and writing an architecture around four numbers. A morning's reading would have told us oxygen saturation has no non-contact route.

We also let the enthusiasm of the moment set the framing. Our materials describe a product that monitors patients, and the honest description was always narrower — a study which found two of four channels workable under conditions a ward does not provide. Writing the smaller claim first would have cost nothing.

> **Note on this sample.** Sample portfolio page describing an engineering feasibility study. It makes no diagnostic or clinical claim: nothing here was tested on patients, no reading was used in anyone's care, and the agreement figures are engineering comparisons against an instrument, not measures of diagnostic accuracy. The project is real — six students across SRM, Jadavpur University and VIT Vellore in 2021–22, with a faculty supervisor and a patent disclosure — as are the architecture, the stand design and the contact monitor photographed. The workflow timings, the bench sessions and every figure are invented and internally reconciled. I'm glad to walk through the real study in a conversation.

---

### 34. Triple riding avoidance

| Field | Value |
|---|---|
| Slug | `ricky-kids-triple-riding-avoidance` |
| Company | Ricky Kids |
| Years | 2022 |
| Track | ai |
| Domain | Road safety |
| Status | internal |
| Context | Ricky Kids · 2022 · Road safety |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 5 students across three institutions, with three faculty advisers at SRM |
| Timeline | Q1 2022 – Q4 2022 |
| Stage | In internal use — scores road-safety survey clips for the campus. Never connected to a live camera and never used to identify or penalise anyone. |
| Link | /demo/rider-count |

**Positioning.** We designed an enforcement system, built the detector, and then shipped only the half that counts riders — because the half that names them was not ours to build.

**Outcome (card copy).** Vision model that flagged three-up motorcycle riding in roadside footage, used internally to score road-safety survey clips.

**Problem.** Three people on a two-wheeler is illegal in India and routine on a large campus. Guards check at the gate, so riders drop the third person before it and pick them up inside — timed observation put roughly a third of gate checks defeated that way.

**What I did.** We trained a rider-counting model on campus survey footage and I cut everything downstream of the count: no number plates, no database of offenders, no automatic notices. It reports how often three-up happens, not who did it.

**Result.** It outputs counts and nothing else — no plate, no face, no identity, and no live-camera path even exists in the shipped tool, so connecting one is a rewrite rather than a setting. Its errors run toward over-counting, which is why the guardrail is the false-positive rate. The accuracy and timing figures below are the worked example.

**Evidence / demos**

- [The demo is the docs — Triple carry avoidance, including the enforcement pipeline we did not build (PDF)](/papers/ricky-kids-triple-riding-avoidance.pdf)
- [Then the working tool — counts only, no frame anywhere](/demo/rider-count)
- [Or start at the evaluation, on the 64 clips it over-counted](/demo/rider-count?view=eval&cell=1-2)

> **Confidentiality.** Student work at SRM Kattankulathur with collaborators at Jadavpur University and IIEST Shibpur. The system diagram, the detection approach and the team are real. No footage, number plate, face or person appears anywhere on this page, and none is published: the model runs on survey clips and outputs counts. The accuracy figures, the labelled sample and the observation counts are invented for this sample.

#### 01. Why this, and why now

Triple riding is a genuine road-safety problem and a hard one to measure. A campus is a rare place where you can: the population is bounded, the footage already exists, and somebody is already trying to enforce the rule at the gate.

The reason the gate does not work is behavioural rather than technical. We watched entries and counted where instances actually occur.

**Figure — Where triple-riding instances occur: 62 percent inside the campus away from any gate, 26 percent stopped at a gate, 12 percent evading the gate by dropping a rider**

| name | value | label |
|---|---|---|
| Inside the campus, never near a gate | 62 | 62% — nobody is looking here |
| At a gate, stopped | 26 | 26% — the part enforcement already sees |
| At a gate, evaded by dropping a rider | 12 | 12% — walked in and remounted |

_Timed observation at three entrances and four interior points, Q1 2022. The middle bar is the only one anyone has numbers for, which is why the problem is usually described as smaller than it is — a gate counts the people who fail to avoid it._

The beneficiary is whoever is responsible for road safety on a campus, and eventually municipal authorities with the same measurement problem.

#### 02. The problem as people experienced it

We hand-labelled a sample of survey clips frame by frame to establish ground truth — rider count per motorcycle, agreed between two labellers — then scored the model against it. Separately we sat at the gates and timed what riders did as they approached.

| What we expected | What the footage and the gate showed | Evidence |
|---|---|---|
| Gate checks are broadly effective | Riders dismount before the gate and remount inside | 31% of gate approaches — a different denominator from §01's 12%, which is a share of all observed triple-riding instances |
| The hard part is detecting a third rider | The hard part is lighting, not counting | Night accuracy 41% |
| Occlusion would be the main error | Two-up flagged as three-up dominates errors | 64 of 114 errors |
| Footage would be usable throughout | 38% of a survey week is after dark | 1,840 clips reviewed |

**Figure — Rider-count accuracy by lighting condition: daylight 96 percent, overcast 93, dusk 78, night 41, against an agreed 90 percent bar**

_Threshold: 90 — the accuracy we agreed a survey number needs_

_Scored against hand labels across 1,840 clips, Q2 2022. Two of four conditions clear the bar. Night is not a degradation, it is a different problem — the model is counting shapes it cannot resolve, and its confidence does not fall to match._

The reframe: we had been building an enforcement device and the honest artefact was a measuring instrument. Enforcement needs to be right about a person; measurement only needs to be right on average.

#### 03. My role and approach

I founded Ricky Kids and led this project. Five of us across three institutions built it under three faculty advisers, and the decision this page turns on was mine: what the system would be allowed to output.

The paper we wrote describes an enforcement pipeline, because that is the obvious shape for the problem. Deciding not to build most of it took longer than building the detector.

**Key decisions**

- **Output counts, never identities.** A rider count is a statistic. A number plate is a person, and a student team has no standing to accumulate those.
- **Hand-label ground truth before trusting any accuracy figure.** A model evaluated on its own training distribution will tell you it is excellent. Two people disagreeing over a frame is what makes the number mean anything.
- **Measure the behaviour, not just the offence.** The drop-and-remount pattern is why gate enforcement under-reports, and no amount of detection accuracy would have surfaced it.
- **Run on collected clips, never on a live feed.** A live connection turns a survey tool into surveillance infrastructure, and the difference is a configuration change nobody would notice.

#### 04. What I cut

**Scope**

- _Shipped:_ Motorcycle detection and rider counting · Helmet counting per motorcycle · Per-clip counts written to a survey sheet · Hand-labelled evaluation set and accuracy reporting · Batch scoring of collected survey footage
- _Deferred:_ Night and low-light performance · Wider-angle and multi-lane framing · A campus-wide sampling plan
- _Cut:_ Number-plate recognition · The offender database and repeat-offender escalation · Automatic notices and fines · Any live camera connection

Cutting the number plate is what turned this from the project we wrote up into the thing that exists. Plate reading was the piece everyone found most impressive, and it is the piece that changes what the system is: once a plate is extracted, a count becomes an accusation about a named student, delivered automatically, with no appeal path and a detector that is 41% accurate after dark. We had no mandate to build that and nobody to answer for it when it was wrong. The survey number is defensible precisely because it identifies nobody — and the cost is that the system cannot deter a single rider.

#### 05. How I got it agreed

The campus security office would not let it near a camera. I had gone in expecting an argument about accuracy; the objection was about custody. Footage of students, held on a student team's laptops and processed into records of who did what — the office would be the party answering for that, and they had not agreed to hold anything.

I had been arguing that our detector was good enough to be fair, which conceded his frame entirely. His question was not whether we would be right, it was who owns the consequence when we are wrong. So I re-specified the output: counts per clip, no plates, no faces, nothing that resolves to a person, and therefore nothing for anyone to be custodian of.

He agreed on that basis and added a condition I had not planned. The model never touches a live feed — it runs only on clips already collected for the survey, and those are deleted once scored. It costs us the ability to demonstrate it working in real time.

#### 06. What was built

Three detection models in sequence — motorcycle, then riders and helmets within the cropped motorcycle — trained with Darknet, converging after roughly fifteen hundred epochs. The diagram below is the system as designed, and the useful thing is how much is not there.

**Interface — The team's system diagram: CCTV feeding a control unit and a database, with notification arrows to registered and non-registered riders' phones**

[Open the survey tool — the counts, not the detector](/demo/rider-count)

- **Everything left of the control unit shipped; everything right of it did not.** The camera, the crop and the count exist. The database, the registered-rider lookup and the two notification arrows were designed, written up, and deliberately never built.
- **Three models in sequence rather than one model with more classes.** Cropping to the motorcycle before counting riders meant the rider model never saw pedestrians, which is most of a campus frame. It costs two extra inference passes per clip and it is why the count is usable at all.
- **Counting helmets in the same pass as riders.** It is the same crop and the same question, so it was nearly free. It also gave the survey a second number that needs no identity to be useful.
- **Batch scoring of stored clips, with no path to a live feed.** The concession from section 05, made structural rather than procedural: there is no camera input in what we built, so connecting one is a rewrite rather than a setting.

_Our own system diagram from the project paper, showing the design including the parts that were cut. No footage, frame, face, number plate or person from this project is published here or anywhere on this page. The tool below is the shipped half of this diagram running on invented clips — batch scoring, the hand-labelled evaluation, and the parts that were cut. No model runs in it and no frame exists in it: it is the counts sheet and the argument around it, not the detector._

**Gallery**

- **The direction of the error is the finding.** — [Open the evaluation](/demo/rider-count?view=eval&cell=1-2)  Sixty-four two-rider clips called three, against fourteen the other way. Click a cell in the demo and it says what that error means for a survey number, and what it would have meant for a notice sent to a student.
- **The half that was written up and never built.** — [Open what it will not do](/demo/rider-count?view=cut)  Plate recognition, the offender database, automatic notices and any live camera. The button offering to connect a camera explains there is no input to connect one to — the concession made structural rather than procedural.

_Both screens are the state their own link opens. No footage, frame, face or number plate from this project is published here or anywhere on this page — the tool as described extracts none. The full write-up is the first link at the top of this page._

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| Deterrence vs measurement | Counts only, no identities | The system cannot stop anybody, only count them |
| Live demonstration vs data custody | Batch scoring of collected clips | We can never show it working in real time |
| Coverage vs a defensible number | Report daylight and overcast only | 38% of the survey week is unscored |
| One model vs three in sequence | Crop to the motorcycle before counting | Three inference passes per clip |

#### 08. Impact and outcomes

We agreed before build that this failed if the false-positive rate was high enough that a survey number built on it would overstate the problem. A tool that turns two-up into three-up produces an alarming statistic, the statistic gets quoted, and nobody can go back and check it.

**Metrics**

| Value | Measure |
|---|---|
| 94% (daylight and overcast clips) | Rider-count agreement with hand labels |
| 6.2% (two-up flagged as three-up) | False-positive rate (guardrail) |
| 0 (no plates, faces or identities) | Identifiers extracted |
| 1,840 (hand-labelled against the model) | Survey clips scored |
| 31% (measured at three gates) | Gate checks defeated by drop-and-remount |
| 9 h → 40 min (per survey week) | Time to score the footage |

**Figure — Model rider count against hand-labelled ground truth across 1,840 clips: 64 two-rider clips counted as three or more, and 14 three-rider clips counted as two**

| truth \ model | 1 rider | 2 riders | 3 or more |
|---|---|---|---|
| 1 rider | 624 | 12 | 3 |
| 2 riders | 20 | 956 | 64 |
| 3 or more | 1 | 14 | 146 |

_Daylight and overcast clips only, Q3 2022. The direction of the errors is the point: 64 clips where two riders were called three, against 14 where three were called two. The tool over-reports, which for a survey number is the dangerous direction — and it is why the guardrail is the false-positive rate rather than the headline accuracy. The two classes named here are the dominant ones, not the whole error set: the remaining 36 of the 114 are 20 two-rider clips under-counted to one, 12 single-rider clips called two, 3 called three or more, and 1 three-up clip called a single rider._

**How we counted.** Rider-count agreement is the share of clips where the model's count matches a hand label agreed by two people, over daylight and overcast footage only. It excludes dusk and night, which are reported separately and used in no survey figure. False-positive rate is two-rider clips reported as three or more, as a share of all two-rider clips.

`Pipeline — three YOLOv3 detectors trained with Darknet, converging at roughly 1,500 epochs: motorcycle detection, then rider count and helmet count within the OpenCV-cropped motorcycle region · batch inference over stored survey clips, one counts row written per clip · hand-labelled evaluation set with two labellers and disagreements resolved by review · no plate recognition, no optical character recognition, no face detection, no database of riders and no camera input in the shipped tool · number-plate extraction, offender storage and automatic notices exist in the project paper only`

#### 09. What I'd do differently

We never measured how often our two labellers disagreed with each other, so we have no floor to compare 94% against. If humans agree only 95% of the time on a dusk clip, the model is already at the ceiling and the rest is not a modelling problem. That number would have cost an afternoon.

I would also have written the sampling plan before scoring anything. We scored the clips we had, which came from wherever cameras happened to point, so the 62% in section 01 describes our camera coverage as much as the campus — and I have quoted it more confidently than that deserves.

> **Note on this sample.** Sample portfolio page. The project is real — a five-student team from SRM Kattankulathur with collaborators at Jadavpur University and IIEST Shibpur, three faculty advisers, and a written paper describing a full enforcement pipeline that was deliberately not built. The system diagram shown is the team's own. Everything numeric is invented and internally reconciled: the accuracy figures, the confusion matrix, the labelled sample size, the observation counts and the timings. No footage, frame, face or number plate from this project is published here, and the tool as described extracts no identifiers. I'm glad to walk through the real work in a conversation.

---

### 35. Toys for autistic kids

| Field | Value |
|---|---|
| Slug | `ricky-kids-toys-for-autistic-kids` |
| Company | Ricky Kids |
| Years | 2021 - 2023 |
| Track | silicon |
| Domain | Assistive play |
| Status | prototype |
| Context | Ricky Kids · 2021–2023 · Assistive play |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 6 students, with a mechanical-engineering faculty supervisor at SRM |
| Timeline | Q3 2021 – Q1 2023 |
| Stage | Prototype — built, demonstrated at a student expo and reviewed by special-education teachers. It never went to users: no child ever used it. |
| Link | /demo/autism-bench |

**Positioning.** We took the prototype to special-education teachers before any child could meet it — and the interaction we were proudest of is the one they refused. A machine holding a child who wants to stop was the whole problem.

**Outcome (card copy).** Sensory play prototypes designed with two special-education teachers — built and demonstrated, never taken past the workshop.

**Problem.** An e-learning kit for autistic children was our most ambitious project and the one most likely to do harm. The design that excited us most was a motorised gantry that would guide a child's hand to write.

**What we did.** Rather than take a prototype to children, we took it to two special-education teachers and had them score each interaction against their own classroom criteria.

**What we learned.** They would put the visual prompts and the teacher-assigned content in front of a child. They would not put the motorised writing guide near one.

**Evidence / demos**

- [The demo is the docs — Toys for Autistic Kids, the full project write-up (PDF)](/papers/ricky-kids-toys-for-autistic-kids.pdf)
- [Then the bench review, playable — three interactions, fourteen criteria, and the stop test](/demo/autism-bench)
- [Or go straight to the gantry and pull the hand away](/demo/autism-bench?i=gantry&letter=A&test=pull)

> **Confidentiality.** Student work at SRM Kattankulathur. The prototype, its hardware and the reviews with special-education teachers are real; the teachers and the autism care centre involved are not named here. This page makes no clinical or therapeutic claim of any kind, and no child took part in any part of this project. The review scores and every figure are invented for this sample.

#### 01. Why this, and why now

Assistive devices for autistic children are mostly imported and priced for a Western school budget, or improvised by a teacher from whatever is in the room. The gap between is a gap in price first.

So the first constraint was affordability: a device an Indian NGO or public centre cannot buy helps nobody.

**Figure — Share of target centres and schools able to buy at each price point: 68 percent under 5,000 rupees, 31 percent between 5,000 and 10,000, 9 percent above**

| name | value | label |
|---|---|---|
| Under ₹5,000 | 68 | 68% — the target we set, and did not reach |
| ₹5,000 – ₹10,000 | 31 | 31% — where the prototype actually landed |
| Above ₹10,000 | 9 | 9% — effectively the private-school market |

_Scored against the kinds of institution our teachers worked with, Q3 2021. The bottom bar is why we spent so long on cost: above ten thousand rupees the device stops being an assistive tool and becomes a demonstration piece for the schools that need it least._

The beneficiaries are autistic children; the people who decide what reaches them are their teachers. Only one of those two was ever going to review our work.

#### 02. The problem as people experienced it

We ran structured design reviews with two special-education teachers from an autism care centre. Each interaction was demonstrated on the bench and scored against fourteen criteria they already use for anything entering their classroom. No child was present, by design.

| What we assumed | What the teachers said | Where it landed |
|---|---|---|
| Guiding a child's hand teaches letter formation | A machine holding a child who wants to stop is the whole problem | Rejected outright |
| More responsive is better | Predictable beats responsive; surprise is what they manage all day | Redesigned |
| The teacher sets up, the device runs | A teacher who cannot stop it instantly will not switch it on | Redesigned |
| Portability matters most | Cleanability matters more — everything gets mouthed | We had not considered it |

**Figure — Classroom criteria outcomes by interaction: visual prompts 12 of 14 met, teacher-assigned content 10 of 14, guided-writing gantry 5 of 14**

| name | values | label |
|---|---|---|
| Visual and sound prompts | [12, 2, 0] | 12 of 14 |
| Teacher-assigned content | [10, 3, 1] | 10 of 14 |
| Guided-writing gantry | [5, 4, 5] | 5 of 14 |

_Two teachers, fourteen criteria, three interactions, Q4 2021. The bottom row is the part of the kit we had spent the most time on. Five criteria were not met at all, and four of those five are about what happens when a child wants the device to stop._

The reframe: we had designed something to do things to a child, and the teachers wanted something a child does things with.

#### 03. My role and approach

I founded Ricky Kids and led this project; a faculty supervisor oversaw it and six of us built it. What I decided was who got to judge it, and that judging would happen before any child was involved.

That sounds obvious written down. It was not at the time — the fastest way to learn whether children like a toy is to give it to some children.

**Key decisions**

- **Teachers review it before any child sees it.** A student team has no business running sessions with autistic children, and the people who could say so were the ones we needed anyway.
- **Score against their criteria, not ours.** We would have measured whether it worked. They measured whether it could be stopped, cleaned, and predicted.
- **Claim engagement and usability, never therapy.** Nothing here could support a claim about outcomes, and the vocabulary of therapy is easy to slip into when a device is aimed at a diagnosis.

#### 04. What was built

Three interactions on one kit: visual and sound prompts for a letter, a teacher's tablet assigning content over a local network, and the gantry below — a two-axis stage on lead screws that moves a pen, and in the version we wanted, a hand.

**Interface — The prototype two-axis gantry: wooden frame, lead screws and linear rails, two stepper motors, and an Arduino with a CNC shield wired to a laptop**

[Open the bench review — the review, not the hardware](/demo/autism-bench)

- **Lead screws rather than belts, chosen for precision.** A belt drive slips under load, which we treated as a defect. A teacher pointed out that slipping is the only reason a belt-driven version would have been arguable at all.
- **Motion control borrowed wholesale from desktop machining.** It made a working prototype possible in weeks on a student budget. It also meant the motion profile was designed for cutting metal, which is exactly the objection the review raised.
- **Built in wood so it could be rebuilt in an afternoon.** The right call for iteration and the wrong material for a classroom, where everything has to be wiped down. We knew the first half and not the second.
- **It never left this table.** The kit was demonstrated at a student expo and reviewed by teachers on a bench. No child has used it, and after the review we did not build a version that one could.

_Our own photograph of the prototype gantry. No child, teacher or care setting appears in this image or anywhere in this project's photography, and nothing here was ever used by a child. The bench review below is a recreation of the design review, not of this machine: it replays the three interactions, the fourteen criteria and the stop test in a browser. Its gantry is a traced path and generated G-code — no hardware moves, and no child appears in it._

**Gallery**

- **The objection, made operable.** — [Open the gantry and try it](/demo/autism-bench?i=gantry&letter=A&test=pull)  The stage traces our own letter paths and the G-code beside it is generated from them. Pull the hand away mid-stroke and it finishes the stroke — which is criterion 01, marked not met by both teachers, and criteria 02, 09 and 10 failing for the same reason.
- **The interaction they would allow.** — [Open the letter card](/demo/autism-bench?i=prompt)  A letter, its word and a fixed four-second prompt that ends on its own. Twelve of fourteen criteria met, and nothing on the bench is holding anything — which is the whole difference between this and the screen above.

_Both screens are the state their own link opens, captured from the running bench review. The kit and its hardware are real; the criteria, the verdicts and the teachers' words are invented for this sample, and no child took part in any of it. The full write-up is the first link at the top of this page._

#### 05. What we learned

We agreed before build that this failed if the teachers reviewing it would not put it in front of a child. Two of the three interactions passed that bar; the third did not.

**Figure — Teacher scores across six criteria: visual prompts strong throughout, teacher-assigned content strong on control, the guided-writing gantry weakest on safety and robustness**

| name | values |
|---|---|
| Visual and sound prompts | [5, 5, 4, 4, 4, 4] |
| Teacher-assigned content | [5, 4, 5, 2, 3, 3] |
| Guided-writing gantry | [2, 3, 4, 2, 2, 2] |

_The fourteen criteria grouped into six dimensions and averaged, Q4 2021. The shape is what mattered: the gantry is not uniformly worse, it collapses on two axes. Both are about a child who wants to stop — and no amount of the things we were good at moves either of them._

**Metrics**

| Value | Measure |
|---|---|
| 0 (it never went to users) | Sessions with children |
| 2 of 3 (interactions they would put in front of a child) | Educator sign-off (guardrail) |
| 2 (special-education teachers) | Reviewers in the design sessions |
| ₹10,000 (prototype; target was under ₹5,000) | Build cost |

The objection was not that the gantry was crude. A motorised stage holding a child's hand cannot tell a child who is concentrating from one who wants to leave. We had a stop button; they wanted a design where stopping is the child pulling their hand away. That is a different machine, and we did not build it.

This makes no claim about therapy, learning or any outcome for any child, and it could not: nothing was tested with a child, so there is no engagement figure, no completion rate and no efficacy on this page. Two teachers said which of three ideas they would allow into a classroom — a design review, not a study.

**How we counted.** Educator sign-off is the number of interactions both reviewing teachers said they would use with a child in their own classroom, out of three demonstrated. It is a usability and appropriateness judgement by practitioners, not a therapeutic or clinical outcome, and not evidence that the device helps anyone.

`Prototype — ATmega-based Arduino board with a CNC Shield V3 and A4988 stepper drivers · two stepper motors on lead screws with linear rails in a wooden frame, plus a micro servo for pen lift · GRBL motion firmware · HC-05 Bluetooth link to the teacher-side application, with content assignment over a local wireless network · visual and audio prompts driven from the same board · built for about ₹10,000 in parts against a target of under ₹5,000 at volume · no enclosure, no cleanable surfaces and no child-facing safety certification of any kind`

#### 06. What we'd do differently

We designed for eight months and reviewed for two weeks, and the review changed more than the design work did. Bringing the teachers in at the sketch stage would have cost two afternoons and redirected the project before we had anything to defend.

I would also stop calling it a toy. The word made it sound harmless and made us think about delight, when the teachers were thinking about consent, hygiene and how fast it stops.

> **Note on this sample.** Sample portfolio page describing a prototype that never went to users. No child took part in any part of this project, no reading or observation of a child appears here, and no clinical, therapeutic or educational-outcome claim is made or implied — the only evidence is two special-education teachers reviewing a bench prototype. What is real: the project, the hardware shown, its team and supervisor, the demonstration at SRM Project Expo on 10 December 2021, and the involvement of teachers from an autism care centre, who are not named. The fourteen criteria, the scores, the price points and every figure are invented and internally reconciled. I'm glad to walk through the real prototype and the real review in a conversation.

---

### 36. Sludge-traversing ROV

| Field | Value |
|---|---|
| Slug | `ricky-kids-sludge-traversing-rov` |
| Company | Ricky Kids |
| Years | 2022 |
| Track | silicon |
| Domain | Field robotics |
| Status | research |
| Context | Ricky Kids · 2022 · Field robotics |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 5 students across two universities, with a mechanical-engineering faculty mentor at SRM |
| Timeline | Q4 2021 – Q2 2022 |
| Stage | Research — test-tank study, entered in the 2021-22 Technology Infusion Grand Challenge. Never deployed in a live sewer. |
| Link | /demo/sludge-envelope |

**Positioning.** We set out to drive across settled sludge and found there is nothing to drive on — which is why the vehicle in these drawings floats.

**Outcome (card copy).** Studied whether a tracked ROV could cross settled sludge without fluidising it — traction failed below a density threshold.

**Problem.** India's sewers have no walkways, so inspection means sending a person into them — the National Commission for Safai Karamcharis put 631 deaths in ten years to cleaning sewers and septic tanks. A machine that could cross settled sludge would take the most dangerous entries out of the job.

**What we did.** We tested whether a tracked drive could cross settled sludge without fluidising it, running one lane through three graded analogues, and agreed in advance that a vehicle needing to be pulled out on its tether had failed.

**Finding.** A track is a machine for not leaving the medium alone: it shears, shear-thinning sludge gets thinner where it is sheared, and the vehicle digs its own hole. That is why the final design carries its weight in a buoyant frame and pushes with paddles and thrusters instead. The threshold and the tank runs below are the worked example.

**Evidence / demos**

- [The demo is the docs — Sludge-Traversing ROV, the full write-up (PDF)](/papers/ricky-kids-sludge-traversing-rov.pdf)
- [Then the test lane — a density dial, three drives, and the traction limit](/demo/sludge-envelope)
- [Or start in the fresh analogue and run the tracked drive into a stall](/demo/sludge-envelope?medium=fresh&run=1)

> **Confidentiality.** Student research at SRM Kattankulathur with a collaborator at Jadavpur University. The vehicle drawings are our own SolidWorks models and the component list is the project's real one. The test-tank trials and every number on this page — densities, sinkage, run counts, success rates — are invented for this sample. Nothing here was tested in a real sewer.

#### 01. Why this, and why now

Indian sewer networks were not built to be walked through, and inspection still often means lifting a manhole and sending somebody down. A machine displaces that practice only if it can get from one manhole to the next unaided.

So the sizing question was reach: how much of a line each method sees without a person entering it.

**Figure — Share of line length reachable without a person entering: self-propelled vehicle 71 percent, push-camera on a rod 34 percent, floating camera raft 22 percent**

| name | value | label |
|---|---|---|
| Self-propelled vehicle in the line | 71 | 71% — works in both directions from a manhole |
| Push-camera on a rod | 34 | 34% — as far as a rod will push, one way |
| Floating camera raft | 22 | 22% — needs flow, and settled lines have none |

_Scored against manhole spacing on municipal drawings, Q4 2021. The raft scores worst for the reason that matters here: the lines most worth inspecting are the ones that have silted up and stopped flowing, which is exactly when a raft has nothing to ride on._

The beneficiaries are municipal sewer and sump inspection crews — no buyer, just a job currently done by people who should not be doing it.

#### 02. The problem as people experienced it

We built a test tank and mixed three sludge analogues to bracket what a settled line contains, then ran the same drive down the same lane in each. The variable was the medium; the vehicle stayed fixed.

| What we assumed going in | What the tank showed | Across 27 runs |
|---|---|---|
| Sludge is a soft floor | It behaves as a floor only above a density | 3 of 3 media |
| Traction improves with more track pressure | More pressure fluidised it faster | 9 of 9 tracked runs |
| A stall is recoverable by reversing | Reversing dug the vehicle in deeper | 7 of 9 stalls |
| Sinkage stabilises | It kept increasing while the drive ran | 6 of 9 tracked runs |

**Figure — Sinkage measured in each medium: 118 mm in the fresh analogue, 74 mm part-settled, 31 mm settled, against a 60 mm track height**

| name | value | n |
|---|---|---|
| Fresh sludge analogue | 118 | 9 |
| Part-settled analogue | 74 | 9 |
| Settled analogue | 31 | 9 |

_Threshold: 60 — track height — above this the tracks touch nothing solid_

_Mean sinkage per medium over nine runs each, Q1 2022. Two of the three media bury the tracks entirely. At that point the drive is not gripping anything — it is stirring, and the stirring is what makes the medium thinner still._

The reframe: we had been treating sludge as a difficult floor. It is a shear-thinning fluid that behaves like a floor only while you leave it alone, and a track is a machine for not leaving it alone.

#### 03. My role and approach

I founded Ricky Kids and led this team into the Grand Challenge; a faculty member mentored it and signed the institutional side, and I decided what we would test and what would count as failing.

The judgment worth pointing at is spending the first quarter on a tank rather than a vehicle. The project name assumes traversing is possible, and the cheapest thing we could do was try to disprove our own title.

**Key decisions**

- **Grade the medium, not the vehicle.** One drive across three sludges tells you about sludge. Three drives across one sludge tells you about your own preferences.
- **Make self-recovery the pass mark, not distance.** A vehicle that travels ten metres and then needs a person to fetch it has added an entry to the job rather than removed one.
- **Keep the electronics in one sealed cylinder.** Every extra penetration into a pressure housing is another seal that fails in a medium full of grit, and the failure is unrecoverable at the far end of a line.

#### 04. What was built

The tank came first, and the vehicle below is what it produced: a sealed acrylic cylinder for the electronics, slung inside a closed loop of PVC pipe that is both frame and buoyancy.

**Interface — SolidWorks isometric render of the ROV: a transparent cylindrical electronics housing inside a PVC pipe frame, with two large paddle wheels and four ducted thrusters**

[Open the test lane — the density study, not the vehicle](/demo/sludge-envelope)

- **No tracks, no wheels, nothing that pushes down.** This is the finding made physical. Anything that transmits weight into the medium fluidises it, so the vehicle carries its weight in the void spaces of the frame instead.
- **PVC pipe is the chassis and the flotation at once.** A separate float would have been a second thing to seal and a second thing to snag. The sealed loop is structure and buoyancy in the same part, at the cost of a frame we cannot easily change later.
- **Paddle wheels for the surface, ducted thrusters for the fluid.** Two propulsion modes because the medium has two regimes and we could not predict which one a given line would be in. It doubles the drive count and it is why the vehicle works either side of the boundary.
- **One sealed cylinder, transparent, with the camera looking out of the end cap.** Every wire leaves through one bulkhead. Acrylic because we needed to see condensation and seal failure before it mattered, not after.

_Our own SolidWorks model, from the project paper. This is a design, not a photograph of hardware: the vehicle was modelled and costed, and no version of it was ever put into a live sewer. The test lane below is the density study rather than this vehicle: one axis, three drive configurations and the traction limit, with the runs that completed the lane drawn against the modelled envelope. Nothing in it simulates this hull, and nothing in it was ever wet._

**Gallery**

- **Untitled**  Top view. The pipe loop closes all the way round, so the buoyancy is distributed around the vehicle rather than concentrated under it — the electronics cylinder hangs inside the ring and never bears on the medium. The four thrusters sit outboard on the loop, where they push without disturbing what is beneath.
- **The finding on one axis.** — [Run the lane yourself](/demo/sludge-envelope?medium=fresh&run=1)  The density dial against the traction limit, with each drive's modelled envelope and the runs that actually completed the lane drawn on the same track. Run the tracked drive in the fresh analogue and it sinks past the track height while still turning.

_The vehicle drawings are our own SolidWorks models. The lane, the analogues and every number in the demo are invented for this sample, and nothing here was tested in a real sewer. The full write-up is the first link at the top of this page._

#### 05. Finding and what it changed

We agreed before build that this failed if the vehicle could not get itself out of a stall and had to be hauled back on its tether — a machine that needs retrieving has added an entry to the job, not removed one.

**Figure — Density range in which each drive completed the lane: tracks only above 1.15 grams per cubic centimetre, paddle wheels with thrusters from 0.98, thrusters alone to 1.12**

| name | from | to | label |
|---|---|---|---|
| Tracked drive | 1.15 | 1.6 | completed the lane only in the settled analogue |
| Paddle wheels and thrusters | 0.98 | 1.3 | the configuration in the drawings above |
| Thrusters alone | 0.98 | 1.12 | fine in the fluid regime, stalls once it thickens |

_Operating envelopes from 27 test-lane runs, Q1–Q2 2022. The three ticks are the media we mixed. Fresh sewer sludge sits at the left-hand tick, and every tracked band starts to the right of the dashed line — the two never overlap, which is the whole result on one axis. The part-settled analogue at 1.18 sits just inside the tracked band and still failed, because the band is what a track can hold in a medium left alone and a running track does not leave it alone: its 0.03 g/cm³ of margin was spent in the first metre, where the settled analogue's 0.27 was not._

**Metrics**

| Value | Measure |
|---|---|
| 1.15 g/cm³ (traction failed below it) | Density threshold found |
| 2 of 9 (tracked stalls) | Stalls the vehicle recovered from unaided (guardrail) |
| 27 (3 media × 3 drives × 3 runs) | Test-lane runs |
| 18 m (tether-limited) | Working standoff from the entry point |

Tracks completed the lane in the settled analogue and nothing else, and seven of nine tracked stalls ended with the vehicle being pulled out. The mechanism is not weak motors: a track shears the medium under itself, shear-thinning sludge gets thinner where it is sheared, and the vehicle digs its own hole. What it changed: we stopped designing a crawler and designed the thing above.

What this could not tell us is how any of it behaves in a real sewer. We tested clean analogues mixed to a density in a straight tank: no rag, no grit, no roots, no fat, no joints to snag on, no long-duration fouling of seals or thrusters. Every one is a plausible way for this vehicle to fail, and we have nothing to say about any of them.

**How we counted.** Traverse success is the share of runs completing the full test lane under the vehicle's own power in a given medium. It excludes runs aborted for tether tangles, which were a property of our tank rather than of the drive. Stalls are counted as events rather than runs — a run can stall twice, which is how nine tracked runs produced nine stall events — and a stall counts as recovered only if forward motion resumed without tension on the tether.

`Vehicle — sealed acrylic cylinder housing the electronics inside a closed PVC pipe frame providing structure and buoyancy · two paddle wheels and four ducted thrusters on brushless motors with electronic speed controllers · Arduino Nano V3 on ATmega328P, RS232 over the tether to a topside master · HMC5883L three-axis compass, MS5803-14BA pressure sensor, HC-SR04 ultrasonic ranger, TMP36 temperature sensor on I²C · BD681 Darlington drivers, LC filter, 470 µF and 0.1 µF decoupling · HoryzonHD 1080p camera on a servo gimbal, transmitted at 720p through a video balun over CAT5 · LED headlights · lithium-polymer packs · modelled in SolidWorks`

#### 06. What we'd do differently

We mixed our analogues to a density because density is easy to measure with what we had. Density is not the property that governs this — yield stress is, and two media at the same density can behave differently under a track. Our threshold is a proxy a running track eats into: the part-settled analogue sat 0.03 g/cm³ inside the band and still failed, so the number that matters is the margin above 1.15, not the line itself.

We also kept the project name after the finding contradicted it. Calling it a sludge-traversing ROV and then building something that floats over the sludge made every later conversation start in the wrong place.

> **Note on this sample.** Sample portfolio page. The project is real: a five-student team from SRM Kattankulathur with a collaborator at Jadavpur University, mentored by a mechanical-engineering faculty member, entered into the 2021-22 Technology Infusion Grand Challenge run by La Trobe University's Centre for Technology Infusion. The vehicle drawings are our own SolidWorks models and the component list in the configuration line is the project's real one. The test tank, the graded media, the densities, sinkage figures, run counts and success rates are invented and internally reconciled — no sewer was ever entered and no hardware was built. There is no public page for this project, so nothing here can be checked externally. I'm glad to walk through the real work in a conversation.

---

### 37. ENVI-City — sustainable smart city concept

| Field | Value |
|---|---|
| Slug | `ricky-kids-envi-city` |
| Company | Ricky Kids |
| Years | 2022 |
| Track | silicon |
| Domain | Urban concept |
| Status | research |
| Context | Ricky Kids · 2022 · Urban concept |
| Role | Founder — Ricky Kids (student research org, SRM University) |
| Team | 3 students across two universities, with a faculty co-author at SRM |
| Timeline | Q4 2021 – Q2 2022 |
| Stage | Research — concept study, presented at ICTSGS 2021 and published in ECS Transactions. Nothing was built or deployed. |
| Link | /demo/envi-city |

**Positioning.** We published a whole-city vision, then audited our own paper claim by claim — eleven claims, one testable at block scale — and modelled the single one we were prepared to defend in public.

**Outcome (card copy).** Concept study modelling water, power and waste for a city block as one loop rather than three separate utilities.

**Problem.** Our own published vision proposed a city running on renewables, harvesting floodwater, purifying its own air and replacing cell towers with fibre. Eleven claims, one paper, and no way to tell which a reader should believe.

**What we did.** I cut the vision down to the part we could model at a scale we could defend — water, power and waste for a single city block, treated as one coupled loop rather than three independent utilities.

**Finding.** Of the paper's eleven claims, one survived to a model: coupling water, power and waste at block scale. The interval matters more than the point estimate — and for commercial and industrial blocks the model could not show coupling beats separate utilities at all. The scenario table below is the worked example.

**Evidence / demos**

- [The demo is the research paper — Envi-city: Vision of a Sustainable Smart City of the Future, published in ECS Transactions 107(1) 11007](https://doi.org/10.1149/10701.11007ecst)
- [Then the concept explorer — the paper's city, drawn layer by layer, with the audit that followed it](/demo/envi-city)

> **Confidentiality.** Student research at SRM Kattankulathur with a collaborator at Jadavpur University. The concept, the poster and the published paper are real and linked below. The block-level model on this page, its scenarios and every figure are invented for this sample — nothing was built, measured or deployed anywhere.

#### 01. Why this, and why now

A smart-city concept is easy to write and almost impossible to falsify, which is why so many exist. Ours was published and presented, and the honest next step was to ask which part a sceptical reader could hold us to.

Coupling utilities only pays if it reaches the one that dominates, so the first question was where a block's resources actually go.

**Figure — Share of a city block's annual resource cost by utility: power 54 percent, water and wastewater 31 percent, solid waste 15 percent**

| name | value | label |
|---|---|---|
| Power | 54 | 54% — any loop that misses this cannot matter |
| Water and wastewater | 31 | 31% — where the coupling is physically easiest |
| Solid waste | 15 | 15% — small, but it carries the energy content |

_Modelled for a dense residential block, Q4 2021. The split is why we coupled all three rather than picking the tidy pair: waste is the smallest line and the only one that can be turned back into the largest, so leaving it out removes the mechanism the whole idea depends on._

The beneficiaries are municipal planners and utility engineers deciding whether integration is worth the coordination it costs. There is no customer here — this is a paper, not a product.

#### 02. The problem as people experienced it

I went through our own paper and poster claim by claim, asking one question of each: what would we have to produce for somebody to check this. Then we modelled what survived, across four block types and three climates.

| Element of the published vision | What we could produce | Verdict |
|---|---|---|
| Water, power and waste as one loop | A model, and an honest sensitivity range | Kept — this page |
| Rooftop solar and roadside vertical turbines | Generation figures, but not at block resolution | Kept as an input |
| Automated flood and rainwater management | A control design, no catchment data | Deferred |
| City-scale rooftop air purification | No defensible model at that volume | Dropped |
| Removing cell towers to protect birds | A correlation, and no mechanism we could test | Dropped |

**Figure — Claims in the published vision narrowed to what could be tested: 11 claims, 7 with a stated mechanism, 4 we could quantify, 1 testable at block scale**

| name | value | label |
|---|---|---|
| Claims in the published vision | 11 | 11 |
| With a stated mechanism | 7 | 7 |
| We could put a number on | 4 | 4 |
| Testable at one-block scale | 1 | 1 |

_Our own paper, audited against itself in Q1 2022. The drop from eleven to one is the finding before the finding: a vision paper is mostly a list of intentions, and the useful work is deciding which single intention you are prepared to be wrong about in public._

The reframe: the bird claim taught me the most. We had a real correlation between mobile rollout and urban bird decline and no mechanism — which is not evidence, it is a hypothesis with a citation attached.

#### 03. My role and approach

I founded Ricky Kids, led this project and am first author on the paper. Three of us across two universities wrote it with a faculty co-author, and the decision this page is about was mine: to audit our own publication rather than write another.

That is uncomfortable in a way worth naming. The vision was already reviewed and presented, so every claim I dropped was one I had put my name to a few months earlier.

**Key decisions**

- **Scope to one block, not one city.** A city-scale model has no boundary anyone can check. A block has meters, and meters turn an argument into a disagreement about numbers.
- **Publish the interval, not the estimate.** A single percentage from a model this assumption-heavy is a decoration. The width of the range is the actual result.
- **Drop any claim without a mechanism we could test.** Correlation with a citation reads as evidence and behaves like an opinion, and a vision paper is where that difference goes to hide.

#### 04. What was built

What exists is a published vision and a model that survived it. The poster below is the vision as we presented it — five ambitions, one page — and most of the work was deciding which corner to defend.

**Interface — The team's ICTSGS 2021 conference poster for Envi-city, showing sustainable energy, smart agriculture and smart networking panels with references**

[Read the published paper](https://doi.org/10.1149/10701.11007ecst)

- **Everything on this poster is a claim, and nothing on it is a measurement.** That is not a criticism of a concept poster — it is what the format is for. It becomes a problem only when the next piece of work treats it as a foundation rather than a proposal.
- **The references are where the audit started.** Three citations carry the networking claim: a trade article, a news interview and a review. Reading what we had actually cited is what made the decision to drop it obvious.
- **Keeping the poster on the page after cutting four fifths of it.** Replacing it with a tidy diagram of the surviving claim would have hidden the part of this project worth showing, which is the distance between what we announced and what we could support.
- **The energy, water and waste icons stayed; the rest became context.** They are the three that share a physical boundary at block scale, so they are the only three that can be coupled rather than merely co-located.

_Our own conference poster from ICTSGS 2021, with a personal email address redacted. Nothing shown was built: this is a concept presentation, and the model described on this page came afterwards. The full paper is linked below: the published version in ECS Transactions, which carries the eleven claims this page narrows to one._

#### 05. Finding and what it changed

We agreed before build that this failed if coupling did not beat running the three separately by more than the uncertainty in our own assumptions — a saving smaller than its own error bar is not a finding.

**Figure — Saving from coupling water, power and waste by block type: 9 percent for dense residential and 11 for mixed use, with commercial and industrial intervals crossing zero**

| name | value | lo | hi | label | clears |
|---|---|---|---|---|---|
| Dense residential | 9 | 2 | 16 | clears, but the range is seven points wide | True |
| Mixed residential and retail | 11 | 4 | 18 | the strongest case we found | True |
| Commercial | 6 | -1 | 13 | cannot be shown to beat separate utilities | False |
| Industrial edge | 3 | -6 | 12 | demand profiles do not overlap in time | False |

_Threshold: 0 — no better than three separate utilities_

_Twelve scenarios collapsed to four block types, Q2 2022. The dots are central estimates and the bars are what happens when the assumptions move across the ranges we were willing to defend. Two rows cross the line, which is the honest form of a negative result: not that coupling fails, but that we cannot tell._

**Metrics**

| Value | Measure |
|---|---|
| 9% (dense residential block) | Saving from coupling (guardrail) |
| ±7 pts (across defensible assumptions) | Sensitivity of that saving |
| 3 (water, power, waste) | Subsystems modelled as one loop |
| 12 (4 block types × 3 climates) | Scenarios modelled |

Coupling works where demand profiles overlap in time, which is housing — people cook, wash and heat on a schedule a waste-to-energy loop can follow. An industrial edge block produces waste heat nobody wants at three in the afternoon. What it changed: we stopped describing Envi-city as a city and started describing it as a block pattern that suits residential density.

What this could not tell us is whether any of it survives contact with a municipality. Nothing was built and no block was instrumented: the model uses published averages rather than metered data, assumes utilities that are in practice three procurement bodies with three budgets, and ignores capital cost. The planners we spoke to said coordination, not physics, kills schemes like this.

**How we counted.** Saving from coupling is the modelled reduction in a block's annual resource use — energy, potable water and landfilled waste on a common energy basis — when the three are operated as one loop rather than independently. It excludes capital cost, construction carbon and any benefit outside the block boundary, and the interval is the span produced by moving every assumption across a defensible range, not a statistical confidence interval.

`Modelling — block-level resource balance built by hand in a spreadsheet, no urban-simulation package · demand profiles from published municipal consumption averages, resolved hourly · four block archetypes across three climate bands · waste-to-energy conversion and greywater recovery modelled as fixed-efficiency stages · generation inputs from rooftop photovoltaic and vertical-axis turbine figures carried over from the published paper · sensitivity run by sweeping every assumption independently across a defensible range · no metered data, no instrumentation, no simulation of the electrical or hydraulic networks themselves`

#### 06. What we'd do differently

The audit should have come before the paper. Everything here would have improved the publication rather than qualifying it, and dropping a claim in a draft costs nothing while dropping one you have already presented costs a page like this.

I would also have gone to the planners first. We spent two quarters establishing that coupling is physically worthwhile in housing, and the first planner we spoke to said the physics was never the obstacle — three utilities with three budgets and three procurement cycles is.

> **Note on this sample.** Sample portfolio page. The project is real and externally checkable: the paper linked above is Envi-city: Vision of a Sustainable Smart City of the Future, ECS Transactions 107(1) 11007–11016 (2022), and the poster shown was presented at ICTSGS 2021. The block-level model described here — the saving, the intervals, the twelve scenarios, the planner interviews — is a worked illustration built for this page, and its figures are invented and internally reconciled. Nothing was built, no block was instrumented, and no municipality was involved. I'm glad to walk through the real paper and what I would now cut from it in a conversation.

---

## Program overview

### P. The internal AI program — fourteen tools, one doctrine

| Field | Value |
|---|---|
| Slug | `ixana-internal-ai-program` |
| Company | Ixana |
| Years | 2025 - 2026 |
| Track | ai |
| Domain | Internal platform |
| Status | internal |
| Context | Ixana · 2025–2026 · Internal platform program |
| Role | Program owner — prioritisation, doctrine and delivery across every tool on this page |
| Team | One to four engineers per tool, drawn from the same small pool |
| Timeline | Jan 2025 – Aug 2026 |
| Stage | Live — fourteen tools in use across the company |
| Link | https://xana-nine.vercel.app/ |

**Positioning.** What it is to build the internal AI operating system of a silicon company: fourteen tools under one set of rules — deterministic counts, model-written prose, provenance on every claim, and a refusal wherever the data cannot carry an answer.

**Outcome (card copy).** What it is to build the internal AI operating system of a silicon company: fourteen tools under one doctrine — deterministic counts, model-written prose, provenance on every claim, and refusal where the data runs out.

**Problem.** A silicon company on five-month tapeout cycles roughly doubled, from about 75 people in 2024 to about 140 by mid-2025, and every coordination surface creaked at once: knowledge lived in five tools, reports were rebuilt by hand from memory, ceremonies ran on documents that drifted from the record, and audit questions ended in somebody's recollection.

**What I did.** I ran internal tooling as one program rather than fourteen requests. Every candidate was sized the same way — hours lost per month, or errors made visible — before anything was built; each tool shipped thin on platforms we already ran; and one doctrine decided, everywhere, what a model may do and what it may never touch.

**Result.** Fourteen tools in use, three of them flagship pages in their own right, and one set of rules that holds across all of them: no count computed by a model, no claim without provenance, no ranking of people anywhere, and a visible guardrail on every surface that automates judgment. Each chapter page below carries its own worked example.

**Evidence / demos**

- [The platform, live — search it yourself](https://xana-nine.vercel.app/)
- [Flow Tracker, live on the platform](https://xana-nine.vercel.app/efficiency?view=tracker&team=ps&mode=wrong)
- [Patent operations, live on the platform](https://xana-nine.vercel.app/patents)

> **Confidentiality.** Program-level view. Every claim and figure on this page comes from a chapter page linked below and carries that page's own data note; nothing is introduced here that a chapter does not already establish.

#### 01. Why a program, and not fourteen projects

Nothing on this page began as a roadmap item. Each tool began as a hole somebody was falling into weekly — a document hunted for nine minutes, a report rebuilt from memory the night before a review, a decision nobody could find a month later. The temptation at that point is to buy a suite for each hole, and the company had looked at several.

The argument for running it as one program was the same argument three times over. Sized one at a time, every candidate competes only against doing nothing, and everything gets built; sized together, candidates compete against each other, and most lose. Built one at a time, every tool invents its own rules about what a model may write, and the fifth tool's rules contradict the second's. And bought one at a time, each suite arrives with its own place where work now lives — which is precisely the fragmentation the first tool on this page exists to undo.

So every chapter opens the same way: the options that were on the table, sized in the same units, and the reason the winner won. That figure — the sizing chart at the top of each chapter — is the program's actual artefact. The tools are what fell out of it.

#### 02. The doctrine

The rules below were not written down on day one; they were written down after the second tool re-derived them, and enforced from the third onward. Every one of them is visible in the chapters, usually as the thing a screen refuses to do.

**What holds everywhere**

- **Counting is deterministic; only synthesis goes to a model.** A model occasionally wrong about a count destroys trust faster than one occasionally vague about a cause. The reporting engine computes every number by rule and hands the model only the argument; the salary pilot renders no figure a model produced; the assistant surfaces answer from filtered records, never free generation.
- **Every claim carries its provenance.** Minutes cite the second a thing was said. Salary figures resolve to dated comparator rows or do not render. Delay explanations name the comments they drew on. Audit answers link the raw stored event. The pattern is one pattern: a claim a reader cannot check is a claim the surface will not make.
- **The guardrail sits on the surface, not in a report.** Classification ships with its correction rate on the header. Reports carry their signature coverage where the signer sees it. The sync dashboard shows the run that checked nothing beside the runs that worked. If the people relying on automation cannot see its error rate without asking, it does not have one — it has a secret.
- **Refusal is a feature.** No tool on this page ranks people, and three of them refused a requested ranking outright. Nothing writes back to the tool of record from an analytics surface. An assistant asked for a judgment the records cannot support says so. The cuts were harder to ship than the features.
- **Thin tools on owned platforms.** Lists, flows, webhooks and one shared web platform — nothing bought, nothing that takes a migration to unwind. The procurement pilot's whole architecture is reversible in a week by design, because the fastest way to learn whether an operating model works is to build the cheapest thing that enforces it.

#### 03. My role, and the boundary

I owned the program: what got built, in what order, under what rules, and what got refused. Each tool then had its own delivery shape — one to four engineers, with the domain owner (a delivery lead, the paralegal, people operations, the compliance lead) as the reviewer whose conditions became product decisions. The chapters name those negotiations individually, because several of the program's best features were somebody else's condition for saying yes.

The boundary that matters: none of this replaced the company's tools of record. The program's products read, reconcile, explain and gate — the record itself stays where it lives, which is why read-only and write-narrow boundaries recur on chapter after chapter.

#### 04. What was killed

A program is what it refuses. The recurring kills, each argued for by someone reasonable: team rankings (asked for directly by leadership, refused on comparability — three separate times); per-person performance surfaces (refused structurally: no person-keyed rows exist to query); write-back from analytics surfaces (refused so a dashboard bug can never corrupt the record); full backlog generation (refused because a human can review one task's checklist and cannot review thirty); and model-drafted claim language in the patent system (refused because anything a model proposes becomes part of the legal record of what was considered).

Two whole candidate tools also lost their quarters to the sizing figure — the chapters on delivery reporting and pipeline diagnostics both name the losers. That is the program working, not a gap in it.

#### 05. Adoption, without a mandate

Nothing on this page was rolled out by decree, and the chapters are honest about what that cost: adoption spread department by department, and the guardrails — signatures, visible correction rates, open ledgers — were the trust that made it spread. The pattern that repeated: a sceptical owner (the RTL lead, the finance controller, the compliance lead, the head of people operations) blocked a first version, their objection became a structural feature, and the feature made the tool acceptable to everyone downstream of them.

The honest limit is also on the chapters: adoption numbers on this program are the chapters' own worked examples, and where a chapter says its evidence is early signal, this page claims nothing more.

#### 06. The fourteen chapters

Each chapter is a full case study in its own right — the same nine-part structure, its own decisions, tradeoffs and worked example. Three run live on the deployed platform. The AI Lawyer prototype, the program's research spike into multi-agent drafting, stands apart as a flagship page of its own.

_[links]_ {"items": [{"label": "Ixana-Wiki — the knowledge platform", "href": "/work/xana-multifile-rag-based-data-singularity-platform", "note": "— five sources, one search box, cited answers. Flagship chapter, live."}, {"label": "Flow Tracker — pipeline diagnostics", "href": "/work/ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic", "note": "— three stage vocabularies, one surface. Flagship chapter, live."}, {"label": "Patent program operations", "href": "/work/ixana-patent-program", "note": "— the estate and the roadmap as one decision surface. Live."}, {"label": "Team performance reportin

#### 07. Tradeoffs

| Tension | What I chose | What it cost |
|---|---|---|
| One doctrine vs per-team fit | Shared rules and shared vocabularies where comparison needs them | Every team gave up a distinction its own work turns on — the chapters name them |
| Thin tools vs suites | Owned platforms, reversible architectures | Real ceilings, stated in advance: past certain volume, several of these architectures stop being proportionate |
| Program speed vs instrumentation | Ship, then measure | More than one chapter admits its first weeks ran on intuition — the program repeated that mistake before fixing it |
| One owner vs bus factor | One person holds the prioritisation and the doctrine | The patent chapter says it plainly: the mechanism is documented, the judgment is not yet handed over |

#### 08. What this page can claim

Structurally, everything above is checkable: three chapters run live on the deployed platform, the recurring refusals are visible on their surfaces, and every chapter carries its own worked example with its own data note. This page adds no number a chapter does not already carry, and where a chapter's figures are illustrative, that chapter says so in the same breath.

What a program page cannot honestly claim is a program-level metric — there was no baseline year in which the company ran without tools to compare against. The claim is narrower and, I think, stronger: fourteen tools, one person's prioritisation, one doctrine that held under fourteen different pressures to break it.

#### 09. What I'd do differently

I would write the doctrine down at tool one instead of tool three. The rules existed as instincts before they existed as rules, and two early tools carry small inconsistencies the later ones do not — the chapters own them individually.

I would also measure the program, not just the tools. Each chapter measures itself honestly, but nobody measured the portfolio: which quarter's sizing calls were wrong, which tool's hours would have been better spent on another's backlog. The program taught the company to instrument everything except the program.

> **Note on this sample.** This is a program-level page over fourteen internal tools. It introduces no new figures: every number, guardrail and negotiation it references lives on a chapter page below, with that page's own data note and worked example. I'm glad to walk through the program — the prioritisation calls, the doctrine, and the real numbers — in a conversation.

---

## Appendix — engineering and hardware builds

_Earlier engineering work carried as supporting evidence rather than as products._

| Build | Company | Years | Domain | Note |
|---|---|---|---|---|
| Board failure analysis — resonant converter, supply and post regulator | Failure Analysis \| SLB | 2023 | Failure analysis | Root-caused five recurring board failures and fed each fix back into the build standard so the next revision stopped repeating them. |
| Testing AD8232 with NI instruments and LabVIEW | Ricky Kids | 2021 | Test engineering | Characterised an ECG front end against NI instrumentation and documented where its datasheet bandwidth claims actually held. |
| Obstacle avoidance robot using ultrasonic sensing | Vyorius | 2021 | Embedded systems | Ultrasonic obstacle-avoidance rover built to learn sensing, filtering and motor control end to end on one platform. |
| FSM designs — Mealy, Moore and an up-down counter | Vyorius | 2021 | Digital design | Mealy and Moore machines plus an up-down counter, simulated and checked against a written test plan rather than by eye. |
| Verilog and VHDL circuits implemented on FPGA | Vyorius | 2021 | Digital design | Closed the loop from RTL to hardware on a set of standard circuits — written, simulated, synthesised and run on the board. |
| UART transmitter printing a single character | Vyorius | 2021 | Digital design | Built a UART transmitter from scratch and proved the framing on a scope before trusting a vendor IP block. |
| 16-bit RISC processor | Vyorius | 2022 | Digital design | Designed a 16-bit RISC core with its own instruction set and ran real programs on it in simulation. |
| IoT-based smart agriculture system | Vyorius | 2021 | IoT systems | Soil-moisture and weather sensing that only triggered irrigation when both readings agreed, to cut false watering. |
| RGB pattern generator | Vyorius | 2021 | Digital design | Timing-driven RGB pattern generator, written to practise clock division and state encoding on real hardware. |
| World map COVID-19 dashboard | Vyorius | 2021 | Data visualization | Choropleth dashboard over public COVID feeds, built to learn how to keep a dense map readable at a glance. |
| Voice-controlled home automation | Vyorius | 2021 | Home automation | Voice-triggered relay control with a hardware interlock, so a misheard command could not latch a load on. |
| Home automation with automatic room temperature control | MSME Technology Development Centre, Govt. of India | 2020 | Home automation | Closed-loop room temperature control on a scheduled setpoint, built during an MSME development centre internship. |
| 3-bit binary to grey code converter using low-voltage XOR gates | Hackathon \| IIT Hyderabad | 2021 | Digital design | Low-voltage XOR implementation of a 3-bit grey code converter, entered and defended at an IIT Hyderabad hackathon. |
| First robot | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | A line-following robot — the first build that turned electronics from a subject into something I did on weekends. |
| Character LCD driver | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | Drove a character LCD straight from a bare microcontroller, timing every instruction delay by hand against the datasheet. |
| Hardware timer | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | Countdown timer built on hardware timer peripherals rather than delay loops, to learn why that distinction matters. |
| First signal | Intern \| MSME Technology Development Centre, Govt. of India | 2019 | Embedded systems | The first circuit I built that produced a signal I could see on a scope and explain line by line. |

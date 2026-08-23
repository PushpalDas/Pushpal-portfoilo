# About page — complete build brief

**Purpose.** Everything needed to write a prompt that rebuilds `/about`. This file is **self-contained**: every fact about Pushpal — experience, education, all 56 certifications, all 56 portfolio projects, awards, evidence — is transcribed here from the repo, so the writer never has to go hunting and never has to guess.

`portfolio-decisions.md` §7 has carried two unfinished items since the restructure: *"An About page that owns the engineer → PM path"* and *"A line stating what role you're looking for."* This brief exists to close both.

**Rule that governs everything below:** §3–§9 are ground truth, transcribed from the repo. §13 lists what is genuinely unknown. **Anything not in §3–§9 must not be invented** — it must come from Pushpal or be left as a visible gap.

---

## 1. The page that exists today, and why it goes

`app/about/about-page.tsx` — 220 lines, client component, `motion/react` staggered fade-ins, Tailwind, light/dark. It renders: a gradient "About Me" headline · "The Journey" · "Design Philosophy" · a six-chip "Expertise" grid · four "Values" cards · a CTA.

It is placeholder copy that contradicts the rest of the site:

| The page says | The portfolio says |
|---|---|
| "Crafting digital experiences at the intersection of technology and human-centered design" | Body-area-network silicon, patent operations, procurement control planes |
| "My journey began in the vibrant tech ecosystem of Bangalore… curiosity about how websites work" | Electronics and communication engineering; oilfield failure analysis at SLB; ISRO remote sensing |
| "Drawing inspiration from Apple's design principles… every pixel" | Nothing in 56 projects is visual design |
| Expertise chips: *Full-Stack Development · UI/UX Design · Team Leadership* | Not what a single case study demonstrates |
| Values: *Innovation · Excellence · Collaboration · Impact* | Four words with no referent |

**The core failure is sequencing.** The Work grid spends 35 case studies proving specificity — pre-agreed thresholds, named guardrails, disagreements that were lost, cuts with their costs stated. Then About says "I believe great design is invisible." A reviewer who reads Work first and About second downgrades the whole site. About is currently the weakest page in the portfolio and the cheapest to fix.

---

## 2. Identity and links

- **Name:** Pushpal Das
- **Email:** `ixanawl@gmail.com`
- **LinkedIn:** `https://www.linkedin.com/in/pushpaldas/` (canonical — a second URL `linkedin.com/in/pushpal-das-98485a1b5/` also appears in the repo; use the canonical one)
- **GitHub:** `github.com/PushpalDas`
- **X/Twitter:** `twitter.com/pushpaldas`
- **Site nav:** Home · About · Work · Experience · Certifications · Book a meeting. Routes that exist: `/`, `/about`, `/work`, `/experience`, `/certifications`, `/contact`, `/book-a-meeting`, `/projects`, `/thoughts`, `/uses`, `/stats`, `/ask-me`.
- **Based:** Bengaluru, Karnataka, India (from the Ixana role, listed *Hybrid*).

---

## 3. Experience — complete, from `app/experience/constants.ts`

19 entries, four buckets. **Every `description` field in the file is empty** — there is no prose about any role anywhere in the repo. That absence is the single biggest gap for an About page.

### Professional

| Period | Role | Organisation | Location |
|---|---|---|---|
| **Apr 2024 – present** | **Principal PM, CTO's office** | **Ixana** | Bengaluru, Karnataka · Hybrid |
| Jan 2024 – Apr 2024 | Senior Embedded Design Engineer | EEGRAB | Kolkata |
| Jan 2023 – Dec 2023 | Electrical Engineer | SLB | Pune District, Maharashtra |
| Jul 2022 – Jan 2023 | Project Intern / Team lead | ISRO, Govt. of India | Dehradun, Uttarakhand · Remote |

### Entrepreneurship

| Period | Role | Organisation |
|---|---|---|
| Oct 2023 – Dec 2025 (2 yrs 3 mos) | Founder / CEO | NeuroAdapt, IISc |
| Sep 2019 – Sep 2023 (4 yrs) | Founder / CEO | Ricky Kid, SRM University |

### Education

| Period | Qualification | Institution |
|---|---|---|
| Sep 2019 – Sep 2023 (4 yrs) | BTech, Electronics and Communication Engineering | SRM University |
| Aug 2023 – Dec 2023 (5 mo) | Six Sigma Black Belt | Board of Regents, University System of Georgia |
| Jul 2017 – Aug 2019 | Science (higher secondary) | G.D. Birla Centre For Education |

### Industrial / early placements

| Period | Role | Organisation | Location |
|---|---|---|---|
| Dec 2021 – Jan 2023 | CPS engineer / Project manager | SRM UAV | Online |
| Jun 2022 – Aug 2022 | Global student trainee | Schneider Electric | — |
| Jun 2022 – Jul 2022 | Internship trainee | CoreEL Technologies | Bangalore |
| Mar 2022 – Apr 2022 | Internship trainee | MSME Technology Development Centre, Govt. of India | Agra |
| Nov 2021 – Mar 2022 | Internship trainee | Vyorius | West Ghonda, Delhi |
| Aug 2021 – Sep 2021 | Internship trainee | MSME Technology Development Centre, Govt. of India | Agra |
| Jun 2021 – Jul 2021 | Student Ambassador | Techfest, IIT Bombay | — |
| May 2021 – Jun 2021 | CPS trainee | IIT Ropar | Online |
| Apr 2020 – May 2020 | Marketing intern | MyCaptain | Bengaluru |
| Nov 2019 | Technical research team | Samsung India | — |

**The shape of the arc.** Electronics and communication degree (2019–23) → hands-on electrical and embedded engineering (SLB 2023, EEGRAB early 2024) → **Principal PM in a silicon CTO's office (Apr 2024–present)**, running product management for a company shipping body-area-network chips. Two founder stints run alongside — a four-year student research org and a two-year IISc venture. **The site never states this sequence anywhere.** It is the most valuable thing About can say.

---

## 4. Awards and recognition — read the attribution warning first

### ⚠ Four of these are company awards, not personal ones

The certifications file lists these under `achievements` with `issuer: Ixana`. Their linked sources are **company** pages:

| Award | What the linked source actually is |
|---|---|
| **CES Innovation Award** | `ces.tech/ces-innovation-awards/2024/ixanas-wi-r-100x-lower-power-4mbps-chip-for-wearables/` — **Ixana's chip** |
| **IoT Breakthrough Award — IoT Wearables Innovation of the Year (2024)** | `iotbreakthrough.com/2024-winners/` — **Ixana** |
| **EE Times Silicon 100 (2×)** | Company listing |
| **NATO Innovation Challenge — 3rd place** | `act.nato.int/article/17th-innovation-challenge-concludes/` — a team/challenge result; plausibly personal, unconfirmed |

**Phrase these as *"work I contributed to at a company that won X"*, never *"I won X."*** A reviewer who clicks through and finds a company page where a first-person claim was implied has found the one thing that discredits every other page. This matters more on About than anywhere else, because About makes first-person claims with no case study underneath them.

### Genuinely personal recognition

| Award | Issuer |
|---|---|
| Silver medalist, ECE 2023 | SRM University |
| Silver Medal, Research Day | SRM University |
| Winner, Cloud-based Analog IC Design Hackathon | IIT Hyderabad |
| 1st Prize — Toys for Autistic Kids | Indo Universal Collaboration for Engineering Education (IUCEE) |
| Appreciation — Toys for Autistic Kids | IUCEE |
| 2nd runner-up, THINKTECH2K21 | Don Bosco College of Engineering |
| 2nd runner-up, Milaap | Milaap 2018 |
| 2nd runner-up, Literaria | Xavotsav |
| SRM Project Expo '21 | SRM University |
| Idea Generation Challenge, Sanrachna | BHEL |
| Guinness World Record attempt — most users in an online programming lesson in 24 hours | Guinness World Records |
| Christmas photography contest | Kolkata Sutra |

### Speaking

| Talk | Venue |
|---|---|
| Industry 4.0 and connecting the dots with the electronic sector | IISc — EnTIISc |
| Sachetna — talk series on disability, accessibility and advocacy | Sunshine Autism Care Society |

---

## 5. Certifications — all 56, from `app/certifications/constants.ts`

Fields are `title` · `services` (= issuer) · `year` · `categories` · `url`. Most carry no year.

### Product / management (the credentials that matter for a PM role)

| Certification | Issuer | Year |
|---|---|---|
| Six Sigma Black Belt | Board of Regents, University System of Georgia | 2023 |
| PMI Agile Certified Practitioner (PMI-ACP) | Packt | 2023 |
| Product Manager \| AI | IBM | — |
| PMP \| AI | Google | — |
| Professional Development Program on Total Digital Transformation | MSME Technology Development Centre, Govt. of India | — |
| Global Student Trainee | Schneider Electric | — |
| Student Ambassador | IIT Bombay | — |
| YouthRep / Marketing — business development, marketing, community building | MyCaptain \| SRM University | — |

### AI / cloud / software

| Certification | Issuer |
|---|---|
| Generative AI Leader | Google |
| Microsoft 365 \| Generative AI | Microsoft |
| AI from the data center to the edge — an optimized path | Intel® AI Academy |
| AWS Cloud Practitioner Essentials \| Building modern Python applications on AWS | AWS |
| Build a Face Recognition Application using Python (AI-For-India) | GUVI |
| AI | MyCaptain |
| Python | Google |
| Python | MyCaptain |
| C Programming Course | MyCaptain |
| Android App Development | MyCaptain |
| Web Development | MyCaptain |
| Graphic Design | MyCaptain |
| Introduction to Cybersecurity | Cisco Networking Academy |

### Hardware / embedded / VLSI

| Certification | Issuer |
|---|---|
| Internship Program on Functional Verification using SystemVerilog | CoreEL Technologies |
| Internship Program on VLSI | Vyorius |
| Internship Program on IoT | Vyorius |
| Internship Training on IoT | MSME Technology Development Centre |
| Internship Training on Microcontroller programming | MSME Technology Development Centre |
| Internship Training on Computer Hardware & Networking | MSME Technology Development Centre |
| Introduction to IoT | Cisco Networking Academy |
| Training course on Hydraulics, Pneumatics and PLCs | SRM University |
| Agriculture automation, CPS Advanced Skill Training workshop | IIT Ropar |
| Geospatial Technologies for Archaeological Studies | Indian Institute of Remote Sensing, Dehradun (ISRO) |

### Research, policy and other

| Item | Issuer |
|---|---|
| Research Paper — 1st Int'l Conference on Technologies for Smart Green Connected Society 2021 | SPAST |
| Data collection workshop, R&D project | Samsung Research Institute |
| Training on Incident Response System (Basic & Intermediate) | National Institute of Disaster Management, MHA, Govt. of India |
| Consumer outreach — network usage and 5G efficiency | TRAI, Govt. of India |
| Webinar — Hybrid electric technology | Toyota Kirloskar Motor Pvt. Ltd |
| Pro MFG Plant Maintenance and Asset Management Summit 2021 | Pro MFG Media |
| INFRAME photography workshop | SRM University |

**Editorial judgement for About:** 56 certifications listed in full would bury the page. The ones that carry weight for a PM role are **Six Sigma Black Belt**, **PMI-ACP**, and the **IBM/Google product and AI credentials**. `/certifications` already exists to hold the rest — About should name two or three and link to that page.

---

## 6. The work portfolio — all 56 projects, from `app/work/constants.ts`

**Composition:** 56 projects · 35 with a full 10-section case study · 21 card-only.
**Status split:** 10 production · 16 internal · 2 customer-testing · 4 prototype · 7 research · 17 `null` (no badge).
**Category split:** 39 product · 17 engineering. **Span:** 2019 → 2026.
**By employer:** Ixana 23 · Vyorius 9 · Ricky Kids 7 · MSME 5 · EEGRAB 3 · SLB 2 · one each for ISRO, IISc/NeuroAdapt, SRM UAV, IIT Hyderabad, NIT Trichy, ISKCON, personal.

### In production (10)

| Project | Where · Year · Domain | Outcome line |
|---|---|---|
| Wi-R Body Area Network — YR23 | Ixana · 2024– · Silicon | The first Wi-R body-area part to reach customer hardware — the silicon under the BAN dev kit and every on-body reference design that followed. |
| Wi-R Body Area Network — YR31 | Ixana · 2024– · Silicon | Second-generation body-area silicon that holds an on-body link in the single-digit milliwatt class, roughly a tenth of the radio budget it replaces. |
| Wi-R Near Field Electric — XA-NFE2001 | Ixana · 2024–2026 · Silicon | The near-field electric part that moved Wi-R from a lab demonstration to a component a partner could design into a product. |
| Wi-R Near Field Electric — XA-NFE3001 | Ixana · 2024– · Silicon | Successor near-field part that widened usable coupling range without raising the transmit power budget partners had already designed around. |
| Wi-R Dev Kits — BAN YR23 and NFE XA-NFE2001 | Ixana · 2024– · Developer hardware | Turned Wi-R eval silicon into a shipping dev kit — partner teams bring up a working on-body link in under a day instead of weeks of RF debugging. |
| Wi-R reference designs — video smartglasses and tactical headset | Ixana · 2024–2026 · Wearable systems | Reference designs proving Wi-R carries live video to smartglasses and voice to a tactical radio over the body rather than the air. |
| WishKey — Key Management System | EEGRAB · 2023 · Access control | Replaced a paper key register with an audited electronic cabinet, shipped as a catalogue product with per-key accountability. |
| Cost-effective smart watch | EEGRAB · 2023 · Consumer wearable | Cut the smartwatch bill of materials to a price Indian retail could carry while keeping heart-rate sensing and phone notifications. |
| Condenser microphone | EEGRAB · 2024 · Audio hardware | Brought a studio-class condenser capsule to a shippable price by redesigning the preamp around a cheaper JFET front end. |
| Sensor signal generator | SLB · 2023 · Test engineering | Bench instrument that synthesised downhole sensor signals, so tool electronics could be tested without waiting on a well. |

### Shipped internally (16)

| Project | Where · Year · Domain | Outcome line |
|---|---|---|
| Ixana-Wiki — multifile RAG knowledge platform | Ixana · 2026 · Internal platform | Cut the median hunt for a document from nine minutes to under one, and put 118 of 140 employees on a single search box. |
| Patent program operations | Ixana · 2026 · Patent operations | Owned 50+ filings across six Wi-R product lines end to end, and cut disclosure-to-filing from about fourteen weeks to six on no extra inventor time. |
| Patent dashboard sync | Ixana · 2025 · Portfolio ops | Stopped the patent dashboard double-counting continuation rows, and made the master workbook rebuild itself from its three sources. |
| Flow Tracker — real-time delivery pipeline diagnostics | Ixana · 2026 · Engineering ops | One live view across the PS, AMS and RTL pipelines — leads stopped assembling the weekly review deck from three sources. |
| AI product planning operating system | Ixana · 2026 · Planning tooling | Turns a raw brief into a reviewed, execution-ready plan in 3–8 minutes, with a second model required to approve the first one. |
| ClickUp reporting and Gantt dashboard | Ixana · 2026 · PM tooling | Gave leads a read-only Gantt and bandwidth view over live task data, with AI explaining why each late task actually slipped. |
| ClickUp Activity Tracker — task change audit trail | Ixana · 2026 · Audit tooling | Turned a raw activity feed into a searchable who-changed-what timeline, so audit questions get answered in seconds not hours. |
| Document change intelligence | Ixana · 2026 · Documentation ops | A daily sync that versions and diffs every workspace doc, so the 34 of 301 that changed last night are visible without asking. |
| Automated engineering bandwidth reporting | Ixana · 2025 · Resource planning | Capacity forecasts across 58 task lists and 30 engineers stopped depending on developers remembering to file an update. |
| AMS monthly performance dashboard — automated RCA reporting | Ixana · 2026 · Delivery reporting | Monthly AMS performance report went from a two-day manual compile to one automated run that produces six dashboard sheets. |
| Video library and meeting recordings | Ixana · 2026 · Meeting intelligence | Made every recording searchable by transcript, so people jump to the minute that matters instead of scrubbing an hour of video. |
| Calendar sync — Outlook and Gmail without leaking detail | Ixana · 2025 · Workplace automation | Ended the double-booking that came from living in two tenants, without exposing a single private event title across them. |
| In-house meeting notetaker | Ixana · 2026 · Meeting intelligence | Kept transcripts and minutes inside the tenant instead of routing every internal meeting through a third-party bot. |
| Scrum ecosystem — one workspace for sprint ceremonies | Ixana · 2026 · Agile tooling | Standup, backlog and burndown now read from the same task data instead of three separately maintained views. |
| Accurate estimation of mineral present in soil | IIRS-ISRO · 2022 · Remote sensing | Hyperspectral workflow that estimated surface mineral abundance from satellite bands, taking a field-sampling round out of the survey loop. |
| Triple riding avoidance | Ricky Kids · 2022 · Road safety | Vision model that flagged three-up motorcycle riding in roadside footage, used internally to score road-safety survey clips. |

### In customer testing (2)

| Project | Where · Year · Domain | Outcome line |
|---|---|---|
| Procurement Orchestrator — M365-native request workflow | Ixana · 2026 · Procurement ops | In pilot: names one accountable owner within a business day, so requesters stop chasing procurement by email for status. |
| AI Salary Generator | Ixana · 2026– · HR tooling | In pilot: benchmarks a role against market bands and drafts an offer range where every figure traces back to its source. |

### Prototype (4)

| Project | Where · Year · Domain | Outcome line |
|---|---|---|
| AI Lawyer — multi-agent patent drafting system | Ixana · 2026 · Legal tooling | Built and tested the provenance, cost and containment core, then stopped before the drafting agents because prior-art recall was not proven. |
| Quantum Gate Simulator — interactive 10-qubit circuit builder | Personal · 2026– · Learning tools | A working 10-qubit simulator with real-time 3D Bloch rendering; it stayed a prototype and never went out to learners. |
| Ornithopter for surveillance | SRM UAV · 2021–2023 · Aerial robotics | Flapping-wing surveillance airframe that flew a stable circuit; it stayed in the lab and never went to an operator. |
| Toys for autistic kids | Ricky Kids · 2021–2023 · Assistive play | Sensory play prototypes designed with two special-education teachers — built and demonstrated, never taken past the workshop. |

### Research (7)

| Project | Where · Year · Domain | Outcome line |
|---|---|---|
| NeuroAdapt — spike-train feature extraction for a science compiler | NeuroAdapt, IISc Bangalore · 2023– · Research tooling | Replaced ad-hoc spike-train scripts with one standardized feature set, so two labs computing "burst index" finally mean the same thing. |
| Dāsa — citation-grounded scripture engine | ISKCON · 2026– · Applied AI | Proved a retrieval engine can answer scripture questions with zero fabricated citations across 100 evaluated answers, up from 17. |
| UAV-aided weather radar calibration | NIT Tiruchirapalli & SRM University · 2022 · Weather instrumentation | Tested whether a UAV-carried reflector could calibrate ground weather radar in place, instead of a fixed tower reference. |
| Non-contact COVID patient monitoring | Ricky Kids · 2021 · Health sensing | Measured respiration rate at a distance with a thermal and radar pair, so isolation wards could monitor without contact. |
| Sludge-traversing ROV | Ricky Kids · 2022 · Field robotics | Studied whether a tracked ROV could cross settled sludge without fluidising it — traction failed below a density threshold. |
| Carbon positive e-car | Ricky Kids · 2020 · Sustainable mobility | Feasibility study on whether a small EV could offset more carbon than it embodied — the answer turned entirely on grid mix. |
| ENVI-City — sustainable smart city concept | Ricky Kids · 2022 · Urban concept | Concept study modelling water, power and waste for a city block as one loop rather than three separate utilities. |

### No badge — early engineering work (17)

These are deliberately unbadged: coursework, internships and learning builds. They are the *evidence for the engineering half of the arc* and should not be hidden.

| Project | Where · Year · Domain |
|---|---|
| Board failure analysis — resonant converter, supply and post regulator | SLB · 2023 · Failure analysis |
| Testing AD8232 with NI instruments and LabVIEW | Ricky Kids · 2021 · Test engineering |
| 16-bit RISC processor | Vyorius · 2022 · Digital design |
| Verilog and VHDL circuits implemented on FPGA | Vyorius · 2021 · Digital design |
| FSM designs — Mealy, Moore and an up-down counter | Vyorius · 2021 · Digital design |
| UART transmitter printing a single character | Vyorius · 2021 · Digital design |
| RGB pattern generator | Vyorius · 2021 · Digital design |
| 3-bit binary to grey code converter using low-voltage XOR gates | Hackathon, IIT Hyderabad · 2021 · Digital design |
| Obstacle avoidance robot using ultrasonic sensing | Vyorius · 2021 · Embedded systems |
| IoT-based smart agriculture system | Vyorius · 2021 · IoT systems |
| World map COVID-19 dashboard | Vyorius · 2021 · Data visualization |
| Voice-controlled home automation | Vyorius · 2021 · Home automation |
| Home automation with automatic room temperature control | MSME · 2020 · Home automation |
| First robot (line follower) | MSME · 2019 · Embedded systems |
| Character LCD driver | MSME · 2019 · Embedded systems |
| Hardware timer | MSME · 2019 · Embedded systems |
| First signal | MSME · 2019 · Embedded systems |

**Note the narrative gift in the last four.** *"First signal — the first circuit I built that produced a signal I could see on a scope and explain line by line"* and *"First robot — the first build that turned electronics from a subject into something I did on weekends"* are already written in Pushpal's voice, already on the site, and are the natural opening of an engineer → PM story. **Use them; do not write a new origin story around them.**

---

## 7. Roles held, as the 35 case studies state them

From each case study's `meta.role` — this is how the work is already attributed:

| Count | Role as written |
|---|---|
| 11 | Product manager, delivery owner |
| 7 | Founder — Ricky Kids (student research org, SRM University) |
| 4 | Program manager — silicon delivery (RTL/AMS/PS India · HW/FW US) |
| 3 | Senior Embedded Design Engineer |
| 1 | Product manager — patent programme owner and Wi-R product line PM |
| 1 | Product manager, dev kit program |
| 1 | Product manager, pilot owner |
| 1 | Product manager, build owner |
| 1 | Program manager — reference design delivery |
| 1 | Product lead, personal project / module design / fidelity owner (3 variants) |
| 1 | Failure Analysis & R&D Engineer |
| 1 | Project Manager — SRM UAV |

**Team scale worth citing:** the silicon programs are *"5 functions across 2 sites — RTL, analog/mixed-signal and physical design in India; hardware and firmware in the US"*, with reference designs adding *"3 applications engineers carrying the live evaluations."* Software teams run 1–4 engineers. This is a PM who has run cross-site silicon delivery, not only small tool builds.

---

## 8. Method — what the case studies actually demonstrate

These are the habits the portfolio proves, each with the page that shows it. **About should name two or three and link them.**

| Habit | Where it is demonstrated |
|---|---|
| Sets a kill threshold before building, then honours it | `ai-lawyer-…` — recall bar of 90% set in February, measured 61% in June, drafting agents never built |
| Names a guardrail so one number is not won by breaking another | `ixana-patent-program` — inventor minutes per disclosure watched while cycle time fell |
| Defines the metric before reporting it | Every full case study carries a "How we counted" block |
| Automates only what is recoverable when wrong | `ixana-patent-program` — routing yes, statutory dates never |
| Loses arguments and says so | `patent-tracker-…` (paralegal), `procurement-orchestrator-…` (finance controller), 24 distinct disagreements across the portfolio |
| Reports negative findings | `ricky-kids-uav-weather-radar-calibration` — the method fails its own pass mark; the value is that it failed cheaply |
| Refuses work on ethical grounds | `ricky-kids-triple-riding-avoidance` — number-plate pipeline cut because a count becomes an accusation about a named student |

### Public, verified evidence — 13 of 35 pages carry it

Datasheets and product pages (Ixana Wi-R BAN, NFE, dev kits, reference designs) · the XA-NFE2001 and XA-NFE3001 launch announcements · the Wi-R technology white paper · an arXiv technical paper · a Nature-family paper · **an ECS Transactions DOI** (ENVI-City, verified live) · EEGRAB WishKey brochure and demo video · smartglasses and tactical-headset demonstration videos · **three assignee-verified `Quasistatics Inc` (dba Ixana) patents** — `US12619308B2` (granted), `US20250379663A1`, `US20250192915A1`.

---

## 9. Public facts about Ixana, and the house style

**Ixana, verified on ixana.ai (Aug 2026):** 40+ patents across E-field modulation, encoding and transceivers · **25+ patents filed annually** · 14 tapeouts · **5-month tapeout cycles** · 75+ team members · Wi-R claims of 50× lower energy per bit, <1 ms latency, 1 mW at 5 Mbit/s.

⚠ `Ixana-Wiki` (the case study) says **140 employees**, which disagrees with the public 75+. Do not inherit the 140 figure.

**House style, which About must match:**

- **Work headline:** "From Silicon to AI." **Subline:** *"Product manager with an engineering background — body area network silicon, RAG platforms, and internal tools. Three shipped commercially."*
- ⚠ **Known defect:** that subline says *three* shipped commercially while **10 cards read "In production."** Flagged as an open item in `case-study-authoring-brief.md` §9. About must not introduce a third count.
- **Every page carries an honesty disclosure.** Case studies carry a sample-figures footer and a confidentiality line; the Work header carries one too. About should carry the same, not be the one page that quietly drops it.
- **Voice:** first person, plain, specific — 23 of 35 case studies are "I", 12 are "we" (collaborative research). The register that works here is *"I could not win that, so I removed what she objected to."* Not *"I believe great design is invisible."*
- **All portfolio figures are invented placeholders** for this public teaching sample. The projects, companies, roles and technologies are real; the numbers are not. About must not present invented case-study metrics as biography.

---

## 10. What the About page has to do

Five jobs, in priority order:

1. **Own the engineer → PM path as an actual sequence.** Not "engineering background" as a modifier — MSME benches in 2019, FPGAs and a RISC core at Vyorius, failure analysis at SLB, embedded design at EEGRAB, then Principal PM in a silicon CTO's office. The differentiator: this PM has personally done bring-up and failure analysis, so *"is that schedule real?"* is a question he can answer rather than escalate.
2. **State what role he is looking for.** `portfolio-decisions.md` §7 asks for exactly this. One short paragraph.
3. **Show how he works, with links.** Two or three habits from §8, each linked to the case study that proves it. **Claims on About should be clickable into Work.**
4. **Make the breadth legible.** 56 projects across silicon, AI tooling, robotics and remote sensing reads as unfocused unless the page names the through-line. There is a real one: *hardware-adjacent products where the binding constraint is physical, legal or organisational — not just a roadmap.*
5. **Give one route to a conversation.** `/contact` and `/book-a-meeting` both exist.

**Do not** rebuild Values cards, an Expertise chip grid, or a skills matrix. Nothing else on the site works that way, and none of them survives scepticism.

---

## 11. Constraints

- **Stack:** Next.js App Router, TypeScript, Tailwind, `motion/react`, `SectionContainer` from `app/components/layouts/section-container`. Fonts in `app/fonts.ts` — `merryWeather` (Merriweather, display), `inter`, `mukta`.
- **Theme:** light/dark with `dark:` variants. This is **not** the case-study `.cs2` surface, which is dark-only — do not import that palette.
- **File split:** `app/about/page.tsx` is a 12-line wrapper; the work goes in `app/about/about-page.tsx`. Keep the split.
- **Quality bar** (`portfolio-decisions.md` §3): responsive to 360px, visible keyboard focus, `prefers-reduced-motion` respected, no layout shift.
- **Verify:** `npx tsc --noEmit`, `npx biome check app/about`, and `/about` returns 200.

---

## 12. What is already known vs what is missing

**Known** (§2–§9, all sourced): every role, date, employer and location · all 56 certifications with issuers · every award with its correct attribution · all 56 projects with outcome lines · the roles as the case studies state them · the method habits with evidence · the public Ixana figures · the house voice.

**Missing — and it is the human half:**

1. **Why product.** The arc shows the move from SLB/EEGRAB engineering into a CTO's office. The *reason* is nowhere in the repo, and it is the most valuable sentence the page could contain.
2. **What he wants next.** Role level, domain, company stage.
3. **Any prose about any role.** All 19 `description` fields in `app/experience/constants.ts` are empty.
4. **What he is like to work with.** Zero first-person material outside the case studies.

---

## 13. Open questions — only Pushpal can answer these

A prompt should carry answers, or instruct the writer to leave marked gaps.

1. **Why product, in your own words?** (The single highest-value answer.)
2. **What role are you looking for** — Senior / Principal / Group PM? Hardware, deep tech, AI infrastructure, dev tools? Seed-stage or scale-up?
3. **Location and work posture** — Bengaluru-based per the Ixana entry; remote, hybrid, open to relocation?
4. **Is the Ixana role current?** Listed `Apr 2024 – present`; case-study timelines run to Aug 2026. Confirm before the page says "currently."
5. **Which three projects should About point at?** Suggested: `wi-r-ban-yr23` (production silicon, public evidence), `ixana-patent-program` (strategy + operations, six shipped surfaces), `ai-lawyer-…` (the page that says "we stopped").
6. **How should the four company awards be framed** — company-attributed per §4, or left off About and kept on `/certifications`?
7. **"Three shipped commercially" vs ten "In production"** — which is correct?
8. **How much of the early work belongs on About?** The four MSME "first" projects are a strong opening; confirm you want the page to start there.

---

## 14. Prompt scaffold

Fill the braces. Keep the constraints block intact.

> **Task.** Rewrite `/about` (`app/about/about-page.tsx`). The current page is placeholder copy that contradicts the rest of the portfolio.
>
> **Read first, all of it:** `app/Changes/about-page-brief.md`. It contains every fact you need — experience, education, all 56 certifications, all 56 projects, awards with their correct attribution, and the house voice. Then skim `portfolio-decisions.md` §3, §5, §7, and two case studies to calibrate register: `ixana-patent-program` and `ai-lawyer-multi-agent-multi-llm-shared-memory-generative-sys`.
>
> **The page must do five things** (brief §10): own the engineer → PM path as an actual sequence; state what role I am looking for; show two or three working habits from §8, each **linked to the case study that proves it**; name the through-line across 56 projects in four domains; give one route to a conversation.
>
> **My answers to the open questions in §13:** {fill in each, or write "leave a marked gap — do not invent"}.
>
> **Constraints.**
> 1. Every biographical fact comes from brief §2–§9. **Invent nothing** — no origin story, no motivation, no preference I have not given you. Where §13 is unanswered, leave a visible `{/* TODO: ... */}` comment rather than plausible filler.
> 2. **Awards are company-attributed** per §4. CES, IoT Breakthrough and EE Times Silicon 100 are Ixana's. Never write "I won." Personal awards from §4 are fine as personal.
> 3. Do not list all 56 certifications. Name Six Sigma Black Belt, PMI-ACP and the product/AI credentials, and link `/certifications`.
> 4. Voice: first person, plain, specific. Match the case studies, not marketing copy. No "passionate", no "crafting", no "at the intersection of".
> 5. No Values cards, no Expertise chip grid, no skills matrix.
> 6. Do not contradict the Work subline's counts — §13.7 resolves which number is right. Do not use the 140-employee figure; Ixana is 75+.
> 7. Carry the same honesty disclosure the rest of the site carries: real projects and roles, invented figures.
> 8. Stack and quality bar per §11. Keep the `page.tsx` / `about-page.tsx` split.
>
> **Then run:** `npx tsc --noEmit`, `npx biome check app/about`, and load `/about` (expect 200, readable at 360px).
>
> **Report:** what you wrote, which claims link to which case study, and every gap you left because §13 was unanswered.

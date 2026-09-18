# Home page

Pushpal Das — pushpaldas.com

Source: `app/page.tsx` → `Hero`, `Intro`, `Works`, `Contact`, wrapped in
`ScrollProvider`. Site chrome (`Navbar`) comes from `app/layout.tsx`.
Regenerated 2026-08-27, after the PM-profile pass — the earlier version of this
document described three work slides and named partners that the pass removed.

| Field | Value |
| --- | --- |
| Route | `/` |
| Title | Pushpal Das (template `%s \| Pushpal Das`) |
| Meta description | Product manager for deep tech — Wi-R silicon programs, a patent estate, and the AI tools that run delivery at Ixana. |
| Base URL | https://pushpaldas.com |
| Rendering | Static (prerendered at build) |

---

## Navigation

Present on every page, from `app/components/navbar/navbar.tsx`. The active link
is derived from the pathname; every item is magnetic.

Home `/` · About `/about` · Work `/work` · Hobby `/hoobie` · Experience `/experience` · Certifications `/certifications` · Book a meeting `/book-a-meeting`

---

## 01 — Hero

*`app/components/hero/hero.tsx` · full-viewport, Merriweather, interactive
fluid-splash cursor background in the site's primary colours*

# Welcome to my **portfolio**

I help deep-tech teams turn complex R&D into products that ship.

Principal PM in the CTO's office at Ixana — I run the Wi-R silicon programs from spec to production, the patent program (50+ filings, first grants issued), and the internal tools the company plans and delivers with.

**More about me:**

- [LinkedIn](https://www.linkedin.com/in/pushpaldas/) — via the shared `LINKEDIN_URL` constant
- [GitHub](https://github.com/PushpalDas)
- [X / Twitter](https://x.com/Pushpal_D)
- [Email](mailto:pushpaldas2001@gmail.com)

**Link:** See the work → `/work`

A scroll-down arrow sits at the bottom and smooth-scrolls to `#intro`. Every
icon and link is magnetic; each carries `data-skip-splash-cursor` so the fluid
background does not swallow the pointer.

A proof strip is designed but not built — a `TODO(pushpal): 0.5` marks the spot,
holding three in-repo candidates ("4 parts in production", "50+ patent filings",
"internal tools used company-wide") pending clearance to publish them.

---

## 02 — Intro

*`app/components/intro.tsx` · black on white (inverted in dark mode); three lines
that brighten one at a time as the section scrolls, driven by Lenis scroll
progress over three virtual pages*

> **I build things.**
>
> **From silicon to AI, I turn complex technical problems into products people actually use.**
>
> **One solution to many problems.**

---

## 03 — Work

*`app/components/work/` · split-screen scroll section, black left / white right,
driven by `workTiles.ts`*

### Here are things — I've worked on

One tile, rendering as a **four-slide carousel**. Selecting a slide swaps the
Features and second panels beneath it: slide 1 has no panel content of its own
and falls back to the tile-level lists, slides 2–4 carry their own. The second
panel's heading is "Who's interested?" unless a slide overrides it.

#### Slide 1 — Wi-R

![Wi-R body-area and near-field devices](/static/images/ixana-wir-devices.png)

**Wi-R: Wire-Like Wireless. Ultra-Efficient Wireless Built for Human-AI Collaboration.**

*Falls back to the tile-level Features and "Who's interested?" lists below.*

**Features** (tile level)

- Data rate: 5–20 Mbit/s across the family
- Latency: sub-millisecond links
- Physically secure: field confined to the body / touch range — nothing to intercept across a room
- Networks: up to 16 devices on one body
- Energy: 0.1–0.2 nJ/bit — ~50× NFC's efficiency, an order of magnitude beyond Bluetooth

**Who's interested?** (tile level)

| Group | Named as |
| --- | --- |
| Research Partners | University and federal research partners |
| Government & Defense | U.S. defense programs (public engagements via Ixana) |
| Industry Partners | Defense & Tier-1 consumer programs under NDA |

[Read the case study →](/work/wi-r-ban-yr23)

#### Slide 2 — Patent program

![Patent matter lifecycle tracker](/static/images/project/ixana-patent-tracker.png)

**Patent program — 50+ filings across six product lines, owned end to end.**

**Features**

- Disclosure-to-filing cut from about 14 weeks to 6
- First grants issued — US12619308B2 on Google Patents
- Filing calendar anchored to the silicon tapeout calendar
- Quarterly file / defer / publish / abandon reviews with the founder/CTO

**Proof** — this slide relabels the second panel and fills it with the public
record instead of a customer list.

- [Granted — wearable EQS-HBC device (US12619308B2)](https://patents.google.com/patent/US12619308B2/en)
- [Published — human-body-resonance data transfer (US20250379663A1)](https://patents.google.com/patent/US20250379663A1/en)
- [Published — error-proportional encoding for body area networks (US20250192915A1)](https://patents.google.com/patent/US20250192915A1/en)

[Read the case study →](/work/ixana-patent-program)

#### Slide 3 — XANA

![XANA — Ixana's internal AI operating system](/static/images/xana.png)

**XANA — Ixana's internal AI operating system.**

**Features**

- One search across five systems — docs, meetings, tasks, patents — with cited answers
- Meeting recordings you can enter by transcript: click a line, land on the moment
- A planning OS that stops on uncertainty and won't let one model approve its own work
- Delivery run on instrumented data — pipeline tracking, capacity, audit trail
- Adopted company-wide within a quarter of launch

**Who's interested?** Built for Ixana — in daily use across the company

[Read the case study →](/work/xana-multifile-rag-based-data-singularity-platform)

#### Slide 4 — Wishkey

![WishKey electronic key cabinet](/static/images/wishkey.jpg)

**Wishkey ensures every key is tracked, every access is logged, and every return is verified.**

**Features**

- Stand-alone plug-and-play solution
- Advanced RFID technology
- Android system, touch screen interface
- Access with SSO, RFID
- Air gap system
- Quick installation, can be put on the desk or fixed on the wall
- Backup battery optional

**Who's interested?** Banking and enterprise facilities across India

- [WishKey brochure — EEGRAB](https://eegrab.com/wp-content/uploads/2021/brochure/Wishkey_brochure.pdf)
- [WishKey product demo — EEGRAB](https://www.youtube.com/watch?v=8etIl_0wj0I)

[Read the case study →](/work/eegrab-wishkey)

#### The strip

One compact row under the carousel, the whole portfolio at a glance:

35 written-up case studies across 56 projects · silicon to production ·
developer kits & reference designs · a patent estate · 14 internal tools at
Ixana · consumer & industrial hardware — [See all work →](/work)

---

## 04 — Contact

*`app/components/contact.tsx` · dark `#1c1d20` panel entered through a rounded
divider that collapses on scroll; headings, button, rule and email all animate in
with GSAP*

![Pushpal Das](/pushpal.jpeg)

# Let's work together

**[Get in touch](mailto:pushpaldas2001@gmail.com)** — circular accent button
(`#455CE9`), scales on hover

[pushpaldas2001@gmail.com](mailto:pushpaldas2001@gmail.com)

### Footer

| Label | Value |
| --- | --- |
| Version | live year © Edition |
| Local time | live clock, viewer's timezone |
| Socials | [Github](https://github.com/PushpalDas) · [LinkedIn](https://www.linkedin.com/in/pushpaldas/) · [Twitter](https://twitter.com/pushpaldas) |

---

## Open TODOs on this page

| # | Where | What is needed |
| --- | --- | --- |
| 0.1 | Hero, footer | X still differs — `x.com/Pushpal_D` in the hero against `twitter.com/pushpaldas` in the footer, and X answers 402 to unauthenticated fetches. LinkedIn is settled: both read `LINKEDIN_URL`. GitHub is settled — both spellings resolve to the same account. |
| 0.3 | Work tile | Every named partner was removed because no keep-list was supplied. Purdue University, NSF, U.S. Army, USSOCOM, Defense Innovation Unit and U.S. Air Force go back the moment Ixana's own site or PR carries them. |
| 0.4 | Wishkey slide | "State Bank of India, Accenture" returns only if EEGRAB has published them as customers. |
| 0.5 | Hero | Proof strip held back pending clearance on which of the three candidate figures may be published. |

---

## Notes

- `workTiles.ts` opens with a standing rule: every figure on this page has to
  trace to `data/case-studies-v2.json` or to a page Ixana/EEGRAB has published,
  so the home page can never contradict a case study. Customer and partner names
  appear only where the company itself published the relationship.
- The tile's own `image.src` is deliberately empty — the carousel is what
  renders. `image` is only the fallback `WorkContent` uses for a tile without
  one.
- Panel resolution is per slide: `activeSlide.features ?? tile.features`, and the
  same for the second panel, its label, its links and the case-study link. That
  is why slide 1 shows the Wi-R specs while slides 2–4 show their own.
- Features render in two interleaved columns (even-indexed left, odd-indexed
  right), so list order reads across, not down.
- The strip's "35 written-up case studies across 56 projects" and "14 internal
  tools at Ixana" both check out against `app/work/constants.ts`: 56 work items,
  35 of them carrying a case-study body.
- Every image path on this page resolves under `public/`.

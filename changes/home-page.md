# Home page

Pushpal Das — pushpaldas.com

Source: `app/page.tsx` → `Hero`, `Intro`, `Works`, `Contact`, wrapped in `ScrollProvider`.
Site chrome (`Navbar`) comes from `app/layout.tsx`. Generated 2026-08-25.

| Field | Value |
| --- | --- |
| Route | `/` |
| Title | Pushpal Das (template `%s \| Pushpal Das`) |
| Meta description | I build things for the web. |
| Base URL | https://pushpaldas.com |

---

## Navigation

Present on every page, from `app/components/navbar/navbar.tsx`.

Home `/` · Work `/work` · About `/about` · Experience `/experience` · Certifications `/certifications` · Book a meeting `/book-a-meeting`

---

## 01 — Hero

*`app/components/hero/hero.tsx` · full-viewport, Merriweather, fluid-splash cursor background*

# Welcome to my **portfolio**

I help deep-tech teams translate complex R&D into scalable products.

Currently, working with the Founder and CTO of Ixana, owning efficiency, products & patents

**More about me:**

- [LinkedIn](https://www.linkedin.com/in/pushpal-das-98485a1b5/)
- [GitHub](https://github.com/PushpalDas)
- [X / Twitter](https://x.com/Pushpal_D)
- [Email](mailto:pushpaldas2001@gmail.com)

**Links:** [/projects](/work)

A scroll-down arrow sits at the bottom centre and jumps to `#intro`. Every icon and
link is magnetic (cursor-following); the background is an interactive fluid
simulation in the site's primary colours.

---

## 02 — Intro

*`app/components/intro.tsx` · black on white (inverted in dark mode), three lines that
brighten one at a time as the section scrolls*

> **I build things.**
>
> **From silicon to AI, I turn complex technical problems into products people actually use.**
>
> **One solution to many problems.**

---

## 03 — Work

*`app/components/work/` · split-screen scroll section, black left / white right, driven by
`workTiles.ts`*

### Here are things I've worked on

The right half is a three-slide carousel. Selecting a slide swaps the Features and
"Who's interested?" panels beneath it — slide 1 falls back to the tile-level lists,
slides 2 and 3 carry their own.

#### Slide 1 — Wi-R

![Wi-R devices](/static/images/ixana-wir-devices.png)

**Wi-R: Wire-Like Wireless. Ultra-Efficient Wireless Built for Human-AI Collaboration.**

**Features**

- High-Speed Data, 5-20 Mbit/s
- Ultra-Low Latency, <1 ms
- Physically Secure, <1m confinement
- Multi-Device Networks, Up to 16 devices
- 50x More Efficient, 0.1-0.2 nJ/bit energy efficiency, a decade better than Bluetooth, NFC

**Who's interested?**

| Group | Names |
| --- | --- |
| Research Partners | Purdue University, NSF |
| Government & Defense | U.S. Army, USSOCOM, Defense Innovation Unit, U.S. Air Force |
| Industry Partners | Tier-1 Smartphone OEM, Tier-1 Wearables Partner, Tier-1 Platform Partner |

#### Slide 2 — XANA

![XANA](/static/images/xana.png)

**XANA — the Google of Ixana**

**Features**

- Ixana's inbuilt multifile RAG based data singularity platform
- Vector search → Internal docs, meeting recordings, slides, spreadsheets, etc..
- Open any file, ask and find answers quick with XANA.
- No more jumping tabs, 10x efficient than third party babies
- Self adapting system, more we use, the smarter it gets
- AI system for Efficiency & Patents
- AI Product Planning OS
- On screen AI

**Who's interested?** Ixana

#### Slide 3 — Wishkey

![Wishkey](/static/images/wishkey.jpg)

**Wishkey ensures every key is tracked, every access is logged, and every return is verified.**

**Features**

- Stand-alone plug-and-play solution
- Advanced RFID technology
- Android system, touch screen interface
- Access with SSO, RFID
- Air gap system
- Quick installation, can be put on the desk or fixed on the wall
- Backup battery optional

**Who's interested?** State Bank of India, Accenture

---

## 04 — Contact

*`app/components/contact.tsx` · dark `#1c1d20` panel entered through a rounded divider that
collapses on scroll; headings, button, rule and email all animate in with GSAP*

![Pushpal Das](/pushpal.jpeg)

# Let's work together

**[Get in touch](mailto:pushpaldas2001@gmail.com)** — circular accent button (`#455CE9`),
scales on hover

[pushpaldas2001@gmail.com](mailto:pushpaldas2001@gmail.com)

### Footer

| Label | Value |
| --- | --- |
| Version | 2025 © Edition |
| Local time | live clock, viewer's timezone |
| Socials | [Github](https://github.com/pushpaldas) · [LinkedIn](https://www.linkedin.com/in/pushpaldas/) · [Twitter](https://twitter.com/pushpaldas) |

---

## Notes

- The hero and the footer link to different social profiles. Hero:
  `linkedin.com/in/pushpal-das-98485a1b5/`, `github.com/PushpalDas`, `x.com/Pushpal_D`.
  Footer: `linkedin.com/in/pushpaldas/`, `github.com/pushpaldas`,
  `twitter.com/pushpaldas`. Worth checking which pair is current.
- The work section's tile-level `image.src` is empty; the carousel is what renders.
- All four image paths on this page resolve under `public/`.

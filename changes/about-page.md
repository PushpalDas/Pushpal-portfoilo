# About page

Pushpal Das — pushpaldas.com

Source: `app/about/page.tsx` → `AboutPage` (`app/about/about-page.tsx`) → `AboutHeader`
(`app/about/about-header.tsx`), seven prose blocks, five photographs, and the shared
`Contact`. Styles in `app/about/about.css`. Site chrome (`Navbar`) comes from
`app/layout.tsx`. Generated 2026-08-27.

| Field | Value |
| --- | --- |
| Route | `/about` |
| Title | About (template `%s \| Pushpal Das`) |
| Meta description | Pushpal Das, Principal PM in Ixana's CTO office. Electronics, embedded systems and product — built at the intersection of art and science. |
| Base URL | https://pushpaldas.com |
| Rendering | Static (prerendered at build) |

---

## Navigation

Present on every page, from `app/components/navbar/navbar.tsx`.

Home `/` · About `/about` · Work `/work` · Hobby `/hoobie` · Experience `/experience` · Certifications `/certifications` · Book a meeting `/book-a-meeting`

---

## 01 — Header

*`app/about/about-header.tsx` · title clamps 2.5rem→5.5rem and rises from a masked line on
load; transparent background*

# Electrons and a frame

I'm Pushpal Das. I build products where electronics meets people — currently Principal PM in the CTO's office at Ixana.

*The roles, dates and credentials live on the experience page. This one is about how I see.*

---

## 02 — Curiosity came first

*`about-page.tsx` · `.about-section`, 62ch measure*

As a child I wanted to know how each person builds a whole reality out of their own thoughts. I reasoned my way around that question for years and kept arriving back where I started.

A camera helped. Through a lens I could borrow someone else's way of seeing, one frame at a time. I wanted to be a cinematographer.

What I kept was the lens. It turned out you can point it at circuits, and at people.

![A small child in a red and yellow tartan coat and yellow trousers, standing on a staircase with one hand on the railing, smiling at the camera.](/about/child.webp)

*a staircase, and the child who kept asking*

---

## 03 — Learning what to build

In college I fell for electronics — the plain fact of electrons moving, and what a person can make them do. I went looking for someone who loved this from the other side, the artistic side, and found Steve Jobs. One thing from his story stayed: he trusted his read of what people would want before they could say it. I recognised that instinct. I have run on it since — across ideas, design, business, and people.

Then came the years with boards on a bench. Troubleshooting, the patience of finding out why a thing does not work, the first product that was mine end to end: what it should do, why, and whether it was good enough to ship.

![A home desk with a monitor of code, a laptop showing a PCB layout, a bare green circuit board, an open notebook of handwritten circuit notes, and a wall of sticky notes above.](/about/desk.webp)

*a desk, a bare board, and the wall it was worked out on*

---

## 04 — The pulled line

*`.about-pull` · 30ch measure, clamps 1.75rem→3rem, spans the full grid — the turn in the
story*

> **I liked building. I love deciding what gets built, and why.**

---

## 05 — How I work

Hardware, embedded systems, semiconductors, AI — and today, wearable silicon and the Internet of Bodies at Ixana.

The work is deciding what matters and what can wait, holding the line between engineering and the business, and staying with a product until it ships. I own efficiency, our AI programs, products, and patents.

![A laboratory bench under a high-voltage station sign, with four multimeters in a row, a power supply, and boards wired for test.](/about/bench.webp)

*a test bench, mid-measurement*

---

## 06 — What I keep going back to

Christensen's *The Innovator's Dilemma* explains why careful companies, doing everything right for their best customers, still get overtaken. I think about it whenever a roadmap starts to feel safe. Grove's *Only the Paranoid Survive* named something I had already met: a strategic inflection point arrives quietly, and the 10X force behind it does not announce itself. A venture of mine that went nowhere taught me the rest — not everyone is paying that kind of attention, and the ones who do are worth building with. Miller's *Chip War* is the third, a reminder that in deep tech the thing you are building is also the thing countries are counting.

![A hand holding a copy of Clayton Christensen's The Innovator's Dilemma on a plane, a boarding pass used as a bookmark.](/about/book.webp)

*the Christensen, read in transit*

---

## 07 — The other lens

I still photograph. The year I graduated I trained under Asit Poddar, an artist from Satyajit Ray's cinematography team. Ray taught me how to see: a small, ordinary detail carries more than a speech.

So I got the cinematographer's life sideways. The lens is mine. The frame holds people and problems instead of film.

![An open book beside a cup of hot chocolate with a toasted marshmallow, on a wooden table.](/about/frame.webp)

*an open book, a cup, a table*

---

## 08 — If any of this resonates

I want to keep building things that solve problems that actually matter, with people who care how it's done.

If you're working on something in that direction, write to me — I'd like to hear about it.

[pushpaldas2001@gmail.com](mailto:pushpaldas2001@gmail.com) / [LinkedIn](https://www.linkedin.com/in/pushpaldas/)

---

## 09 — Contact

*`app/components/contact.tsx` · shared with the home page, dark `#1c1d20` panel. On this
page the rounded semicircle divider is suppressed (`.about-page .contact-rounded-div`)*

![Pushpal Das](/pushpal.jpeg)

# Let's work together

**[Get in touch](mailto:pushpaldas2001@gmail.com)** — circular accent button (`#455CE9`),
scales on hover

[pushpaldas2001@gmail.com](mailto:pushpaldas2001@gmail.com)

### Footer

| Label | Value |
| --- | --- |
| Version | live year © Edition |
| Local time | live clock, viewer's timezone |
| Socials | [Github](https://github.com/PushpalDas) · [LinkedIn](https://www.linkedin.com/in/pushpaldas/) · [Twitter](https://twitter.com/pushpaldas) |

---

## Photographs

Five stills, all `public/about/*.webp`, all resolving on disk. Served as plain `<img>` with
explicit dimensions, `loading='lazy'` and `decoding='async'`; each carries a
`biome-ignore lint/performance/noImgElement` with a reason, matching the case-study
convention.

| File | Intrinsic | Sits after | Caption |
| --- | --- | --- | --- |
| `child.webp` | 736 × 1024 | 02 Curiosity came first | a staircase, and the child who kept asking |
| `desk.webp` | 768 × 1024 | 03 Learning what to build | a desk, a bare board, and the wall it was worked out on |
| `bench.webp` | 1024 × 768 | 05 How I work | a test bench, mid-measurement |
| `book.webp` | 768 × 1024 | 06 What I keep going back to | the Christensen, read in transit |
| `frame.webp` | 602 × 1024 | 07 The other lens | an open book, a cup, a table |

Byte-identical copies live in `changes/assets/about/`; the unprocessed camera JPGs are in
`changes/NEW/`.

---

## Layout and motion

- **Below 900px** the page is a single column: prose, then photograph, then prose, with the
  photographs capped at `70svh`.
- **At 900px and up** `.about-container` becomes a two-column grid — a `62ch` text column and
  a `240–360px` photo rail on the right. Sections take column 1, figures column 2, and the
  pulled line spans both. The opening figure is pinned to row 1 so the childhood
  photograph sits beside "Curiosity came first" rather than below it.
- **Reveal:** every `.about-reveal` block rises 24px and fades in when it reaches 88% of the
  viewport, resetting if you scroll back up.
- **Reduced motion:** both effects bail out entirely — the header and every block render in
  their final position and no GSAP context is created.
- **Dark and light:** the page is authored dark, with `html:not(.dark)` overrides throughout.
  Photographs get `saturate(0.92) brightness(0.97)` on dark only; in light mode the filter is
  dropped.

---

## Notes

- Roles, companies and dates are deliberately absent — a code comment in `about-page.tsx`
  points them at `/experience`, and the header note says as much to the reader.
- The closing links use `linkedin.com/in/pushpaldas/`, matching the shared footer but not the
  home hero (`/in/pushpal-das-98485a1b5/`). Same open question as TODO 0.1 on the home page;
  neither profile could be verified from here.
- Both the page and this document carry the post-pass copy: the lower-middle-class line, the
  Six Sigma sentence and the "Electrons, and a frame" closer were cut, Grove and the failed
  venture were added, and Asit Poddar is now described as an artist from Satyajit Ray's
  cinematography team.
- The three portrait stills used to render roughly 800px tall on a phone; below the 900px
  grid breakpoint they are now capped at `max-height: 70svh` with `object-fit: cover`. The
  desktop rail is unchanged — it is bounded by its own column.
- `next build` prerenders `/about` as static; `biome check app/about/` is clean apart from
  repo-wide CRLF formatting noise that also hits the untouched `page.tsx`.

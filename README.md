# Pushpal Das — Personal Portfolio & Product Playground 🚀

A premium, editorial-style personal portfolio built with Next.js, featuring dynamic work case studies, animations inspired by Dennis Snellenberg, and a custom secure content management system.

## ⚡ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: Tailwind CSS & custom CSS modules
- **Animations**: GSAP, Motion (Framer Motion), ScrollTrigger
- **Database/Storage**: File-based local store (`app/work/constants.ts` & `data/case-studies.json`)
- **Package Manager**: Bun / npm

---

## 🛠️ Main Features

### 1. Dynamic Case Study System
- Reusable page layouts matching editorial templates.
- Renders detailed project reviews (TL;DR, context, role, key decisions, outcomes, metrics, media embeds, and external links) dynamically under `/work/[slug]`.
- Content handles NDP/NDA confidentiality filters automatically.

### 2. Admin Content Manager (`/admin`)
- Secure password-authenticated Admin dashboard.
- Live modification of Work items and Certifications.
- Interactive drag-and-drop handles for reordering both main items and project media grids.
- Built-in dynamic image-to-web conversions with live upload previews.
- Smart validation: internal routing to case studies is only activated once case study data is fully saved.

---

## 💻 Running Locally

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

2. Configure environment variables. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your secure `ADMIN_PASSWORD` inside `.env.local` to access `/admin`.

3. Run the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

---

## 🔒 License
Proprietary. Custom development for Pushpal Das.

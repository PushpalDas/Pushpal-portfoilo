# XANA (xana-nine.vercel.app) — Design System Extraction

Source: `Changes-archive/dummy/` (Next.js 16 + Tailwind v4, no tailwind.config — tokens live in
`src/app/globals.css` `@theme inline`; almost all component styling is inline Tailwind arbitrary values).
**Dark UI only.** There is no light theme; every screen paints `bg-[#0E0805]` explicitly.

## 1. Type system

- **Fonts** (`src/app/layout.tsx`): `Geist` → `--font-geist-sans`, `Geist_Mono` → `--font-geist-mono`
  via `next/font/google`. But `globals.css` sets `body { font-family: Arial, Helvetica, sans-serif; }`
  and duplicates it as `--font-primary: Arial, Helvetica, sans-serif`, so body copy renders in
  Arial/system unless a component opts into `font-sans` (Geist) or `font-mono` (Geist Mono).
  `Home.tsx` uses a `font-aspekta` class that is defined nowhere — it falls through to the body font.
- **Size scale** (counted across all .tsx): `text-[13px]` (108×), `text-[12px]` (99×), `text-[11px]` (75×),
  `text-[14px]` (61×), `text-[10px]` (41×), `text-[16px]` (26×), `text-[15px]` (17×), `text-[18px]` (13×).
  Dense tables go smaller: `text-[0.62rem]`/`text-[0.58rem]` in `SpendTable.tsx`. **13px is the workhorse.**
- **Headings**: page H1 = `text-[28px] font-bold text-white tracking-tight` (meetingrecordings) up to
  `text-[32px] md:text-[40px] font-semibold tracking-[-1px]` (patents Dashboard). Hero numbers:
  `text-[64px] font-bold text-[#FF6321]`. Logo: `text-[28px] font-semibold tracking-[-1px]` with a
  white→gray gradient text fill (`linear-gradient(135deg, #FFFFFF 0%, #A0A0A0 100%)`).
- **Weights**: `font-semibold` for headings/nav, `font-bold` for emphasis and table headers,
  `font-medium` for labels. Nothing lighter than 400.
- **Letter-spacing habits**: negative on UI text (`tracking-[-0.25px]` nav, `tracking-[-0.2px]` inputs,
  `tracking-[-1px]` display); positive + uppercase on kickers: `text-[11px] uppercase tracking-[0.12em]`
  ("Answer", "Ingest") and `text-[10px] font-bold uppercase tracking-[1px]` (chat section labels).
- **Line-heights**: pixel-exact (`leading-[22px]` nav, `leading-[1.7]` answer prose, `leading-[16px]`–
  `leading-[19px]` for 11–12px body).
- **Mono/numeric**: financial tables use `font-mono tabular-nums text-right` (`SpendTable.tsx`).

## 2. Palette tokens

Occurrence-counted hex values (all from component classNames):

| Role | Value | Notes |
|---|---|---|
| Page background | `#0E0805` (100×) | warm near-black, brown-tinted |
| Surface / card | `#1A1410` (211×) | raised warm dark |
| Surface header/hover | `#221A14`, `#2A2420`, `#140F0B` | table headers, hover fills |
| Border | `#3A3028` (119×) | warm brown border; hover `#5A4838` |
| Hairline border | `rgba(255,255,255,0.06)` (`--color-border`), `#2A2018` | header/sidebar dividers |
| Text primary | `#FFFFFF` | headings, active nav |
| Text secondary | `#808080` (164×, also `--color-text-secondary` in the Header) | |
| Text muted | `#606060`, `#505050`, `#A0A0A0`, `#B0B0B0` | metadata, placeholders |
| Warm text tints | `#E8E0D8`, `#E0D0C0`, `#C0B6AC`, `#A89888` | prose on warm surfaces |
| **Accent** | `#FF6321` (365×) | orange; soft `#FF8A56`, citation text `#FF8C5A` |
| Accent gradient | `from-[#CD3D00] to-[#FF6321]` | primary buttons, logo tile, user bubbles |
| Success | `#22C55E` (`--color-completed`) | |
| Warning | `#F59E0B` (`--color-warning`), `#FFB020` | "open questions" amber |
| Error | `#EF4444` (`--color-blocked`), `#FF4D4D`/`#FF6B6B` | error chips/bubbles |
| Info/alt | `#8B5CF6` / `#7B68EE` purple | secondary categorical |

`globals.css` `:root` also carries `--background: #ffffff` / `#0a0a0a` (Next.js boilerplate, effectively
unused — every page hard-codes the warm dark), plus token blocks: `--color-accent: #FF6321`,
`--color-card: rgba(20,20,20,0.7)`, `--color-surface-raised: #0e0805`, `--color-text-inverse: #ff6b2c`.
Tailwind default grays appear only incidentally (`text-gray-500` in the Header user chip,
`purple-400`/`emerald-500` badges); the system is bespoke warm-hex, not gray-scale Tailwind.

## 3. Spacing, radius, elevation

- **Radius** (`globals.css` + usage counts): `--radius-xs/sm/md/lg/xl: 4/6/8/12/16px`. In practice:
  `rounded-full` (185× — pills, search bars, user chip, avatars), `rounded-lg` 8px (110× — buttons,
  inputs, small tiles), `rounded-xl` 12px (109× — cards, tables), `rounded-2xl` 16px (55× — answer
  panel, chat welcome tile). Chat bubbles: `rounded-2xl rounded-br-md` (user side notch).
- **Shadows**: rare and heavy when used — `shadow-[0_4px_20px_rgba(0,0,0,0.5)]` (dashboard alert card),
  `--shadow-2: rgba(0,0,0,0.5) 0px 25px 50px -12px`, search bar `shadow-[0_2px_8px_rgba(0,0,0,0.3)]`,
  accent glow `--shadow-1: rgba(255,99,33,0.16) 0px 4px 12px` and the `pulse-orange` keyframe glow.
  Elevation is mostly communicated by **surface color + 1px border**, not shadow.
- **Padding rhythm**: cards `p-[20px]` / `px-[18px] py-[14px]`; table cells `py-[8px]–[10px] px-[16px]`
  (dense tables `px-2.5 py-2`); page gutters `px-[16px] sm:px-[24px] md:px-[48px] lg:px-[88px]`;
  content offset below fixed header `pt-[110px] lg:pt-[140px]`. Gaps: 6/8/12/16px small, 16/20px grids,
  32/40px sections. Everything is pixel-bracketed (`gap-[16px]`), rarely Tailwind scale numbers.

## 4. Navigation & header grammar

`src/components/Header.tsx` — a **full-width translucent top bar**, no persistent left nav at app level:
- `bg-[#0E0805B3] backdrop-blur-xl absolute top-0 z-[800]`, gutters as above, `lg:py-[30px]`.
- Left: wordmark `XANA` (`text-white font-bold tracking-tighter text-2xl`), then flat text links:
  `text-[16px] font-semibold leading-[22px] tracking-[-0.25px]`; inactive `text-[#808080] hover:text-white`,
  active `text-white` + **2px orange underline bar**: `absolute -bottom-1 w-[100%] h-[2px] bg-[#FF6321]`.
- Right: **user chip** — `bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1`, name
  `text-[12px] font-bold text-white`, email `text-[10px] text-gray-500`, and a `w-10 h-10 bg-white/10
  hover:bg-white/20 rounded-full` logout button (icon goes `group-hover:text-red-400`).
- Feature areas (patents, efficiency) add a **64px icon rail** (`src/components/patents/Sidebar.tsx`):
  `w-[64px] bg-[#0E0805] border-r border-[rgba(255,255,255,0.06)]`, a `36px` gradient logo tile
  (`bg-gradient-to-br from-[#CD3D00] to-[#FF6321]` + sparkles icon), then `56×56 rounded-xl` icon+label
  buttons (`text-[9px]` labels); active = `text-white bg-[#FF6321]/10 border border-[#FF6321]/20`,
  inactive = `text-[#808080] hover:text-white hover:bg-[#1A1410]`.

## 5. Component grammar

- **Tables** (patents `Dashboard.tsx`, `SpendTable.tsx`): built from CSS grid rows or `<table>`; header
  row `bg-[#221A14] text-[#B0B0B0] text-[13px] font-semibold` (dense version: sticky
  `text-[0.58rem] font-bold uppercase tracking-[0.08em]` on `bg-[#141010]`, sortable with ▲/▼);
  body `text-[13px] text-[#E0E0E0]`, per-cell `border-r`/`border-b border-[#3A3028]` with
  `last:border-b-0`, wrapped in `border border-[#3A3028] bg-[#1A1410] rounded-xl overflow-hidden`.
  Numbers right-aligned `font-mono tabular-nums`; key rows flip to `text-[#FF6321] font-bold`.
- **Cards/tiles**: `bg-[#1A1410] border border-[#3A3028] rounded-xl`; stat tiles have a labeled header
  strip (`bg-[#221A14] border-b`) over a huge orange value (`text-[28px]–[32px] font-bold text-[#FF6321]`).
  Stat grids: `grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[16px]`. Hover = border lightens +
  `translateY(-1px)` (`.custom-card:hover`). Meeting cards end with an uppercase tracking-[1px] CTA row
  ("Open transcript and notes") whose chevron slides in on group-hover.
- **Modals/drawers**: full-screen takeover — `fixed inset-0 z-[100] bg-[#0E0805] animate-in fade-in
  duration-300` (`VideoModal.tsx`) with a resizable right panel; chat is a docked side panel with
  `animate-slide-in-right`.
- **Badges/chips/pills**: `rounded-full border px-2.5 py-1` in tinted-accent form —
  active: `border-[#FF6321]/35 bg-[#FF6321]/[0.08] text-[#FF8A56] uppercase tracking-wider font-semibold`;
  neutral: `border-white/[0.09] bg-white/[0.03] text-white/45`; warning:
  `border-[#FFB020]/45 bg-[#FFB020]/12`. Squarer step chips: `rounded-md border-[#3A3028] bg-[#1A1410]
  px-[9px] py-[4px] text-[#C0B6AC]`. Micro-badges: `text-[10px] px-2 py-0.5 rounded-full` with
  `emerald-500/10`, `purple-500/10` tints.
- **Buttons**: primary = orange gradient `bg-gradient-to-r from-[#CD3D00] to-[#FF6321] text-white
  rounded-lg font-semibold` (h-40–44px; `SearchButton.tsx`) or `rounded-full` (Sign In:
  `bg-[#FF6321] hover:bg-[#FF7331] rounded-full font-bold text-sm`); secondary = `bg-[#1A1410] border
  border-[#3A3028] text-[#808080] hover:text-white hover:border-[#FF6321]/40 rounded-lg`; ghost =
  transparent, `hover:bg-[#1A1410]`.
- **Inputs/search**: pill search is the signature — `bg-[#1A1410] border border-[#3A3028] rounded-full
  px-[20px] hover:border-[#5A4838] hover:bg-[#221A14] focus-within:border-[#5A4838]` with left
  `IoSearch` icon and `placeholder:text-[#808080]` "Search XANA"; page-level filters use `rounded-lg
  h-[38px] focus:border-[#FF6321]/40`. No focus rings — focus is a border-color change only.
- **AI answer + citations** (`AnswerPanel.tsx`): answer card `rounded-2xl border border-[#3A3028]
  bg-[#140F0B] p-[20px]` with an uppercase "Answer" kicker + "from N sources in the index"; prose
  `text-[15px] leading-[1.7] text-[#E8E0D8]` where inline `[n]` markers become clickable chips:
  `rounded-md border border-[#FF6321]/40 bg-[#FF6321]/10 px-[6px] text-[11px] text-[#FF8C5A]
  hover:bg-[#FF6321]/20`; below a `border-t border-[#1A1410]` source list (`[n]` orange, title
  `#A89888 group-hover:text-white`, "OneDrive · locator" in `#606060`). Chat (`FileChat.tsx`): user
  bubbles on the gradient, assistant messages as plain markdown beside a 22px gradient avatar tile,
  `[&_code]:text-[#FF6321] [&_code]:bg-[#1A1410]`, suggested-question buttons as `rounded-xl
  bg-[#1A1410] border-[#3A3028]` list items.
- **Empty states**: centered icon (`w-[64px] text-[#2A2018]`) + short heading + muted line, e.g.
  "No matches found / Try searching for different keywords or check your spelling", "This folder is
  empty", "No files found", "No Tracking Data Available / The background agent hasn't compiled the
  latest ClickUp data yet. Try running a manual sync." Tone: matter-of-fact, names the pipeline/cause,
  often offers the next action — never cutesy.
- **Loading**: skeletons = `bg-[#1A1410] rounded animate-pulse` bars (staggered `animationDelay:
  i*120ms`); spinners = `border-2 border-[#FF6321] border-t-transparent rounded-full animate-spin`;
  chat "Thinking..." = three 5px orange dots `animate-bounce` (0/150/300ms); status lines like
  "Analyzing ClickUp workflows..." accompany them.

## 6. Motion

- Durations: `duration-200` (43×, default; `--motion-duration-fast: 200ms`), `duration-300` (30×),
  `duration-150` (10×). Mostly `transition-colors` / `transition-all` on hover.
- Named keyframes (`globals.css`): `fade-slide-up` 0.6s ease, `fade-in` 0.25s, `slide-in-right` 0.35s
  and `slide-from-left` 0.65s on `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo — the house easing for
  panel entries), `pulse-orange`/`pulse-red` 2–2.5s glow loops, `shimmer` 3s (orange 8% sweep).
- Micro-moves: chevrons `-translate-x-2 group-hover:translate-x-0`, cards `translateY(-1px)` on hover.
- **Absent**: no page transitions, no spring physics, no scroll-triggered animation, no reduced-motion
  handling, no skeleton→content crossfade. Motion is entrance + hover only.

## 7. Distilled token sheet

```css
:root {
  --bg: #0E0805;            /* warm near-black page */
  --surface: #1A1410;       /* cards, inputs, tables */
  --surface-2: #221A14;     /* table headers, hover fill */
  --surface-deep: #140F0B;  /* answer/AI panels */
  --border: #3A3028;        /* default 1px warm border */
  --border-hover: #5A4838;
  --border-hairline: rgba(255,255,255,0.06);
  --text: #FFFFFF;
  --text-body: #E0E0E0;     /* warm prose: #E8E0D8 */
  --text-dim: #808080;
  --text-faint: #606060;    /* placeholders: #505050 */
  --accent: #FF6321;
  --accent-deep: #CD3D00;   /* gradient: linear-gradient(90deg,#CD3D00,#FF6321) */
  --accent-soft: #FF8A56;   /* citation text: #FF8C5A */
  --ok: #22C55E;
  --warn: #F59E0B;          /* attention amber: #FFB020 */
  --crit: #EF4444;
  --info: #8B5CF6;
  --radius-sm: 8px;         /* buttons, inputs, chips-square */
  --radius-md: 12px;        /* cards, tables */
  --radius-lg: 16px;        /* panels */
  --radius-pill: 9999px;    /* search, chips, user chip */
  --shadow-card: 0 4px 20px rgba(0,0,0,0.5);
  --glow-accent: 0 4px 12px rgba(255,99,33,0.16);
  --font-sans: Arial, Helvetica, sans-serif;  /* Geist loaded but body uses Arial */
  --font-mono: var(--font-geist-mono, ui-monospace, monospace);
  --dur-fast: 200ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --size-body: 13px; --size-meta: 11px; --size-micro: 10px; --size-h1: 28px;
}
```

**Sibling, not clone — a Tier-B demo must share these 5 signature traits:**
1. Warm brown-black ground (`#0E0805`/`#1A1410`/`#3A3028` family) with the single `#FF6321` orange
   accent and its `#CD3D00→#FF6321` gradient reserved for primary actions and hero numbers.
2. Dense 13px/12px UI type with uppercase letter-spaced kickers (`11px, tracking 0.12em`) and negative
   tracking on headings; numeric columns right-aligned mono `tabular-nums`.
3. Bordered-not-shadowed elevation: `rounded-xl` cards as `surface + 1px #3A3028 border`, headers as a
   darker `#221A14` strip, hover = border lightens (`#5A4838`) not shadow grows.
4. Pill grammar: rounded-full search bar and chips in tinted-accent form (`border accent/40 +
   bg accent/10 + text accent-soft`), including inline `[n]` citation chips inside answer prose.
5. Quiet 200ms transitions with `ease-out-expo` panel entries, staggered skeleton bars, and plain-spoken
   empty states that name the cause and the next action.

**Must NOT copy verbatim:**
1. The actual screens/routes (Home search, My Files, Patents dashboard, Video Library layouts) or
   their copy — invent your own surface and content.
2. The XANA wordmark, gradient-text logo, and Ixana naming/branding.
3. The exact top-bar link set + 64px icon-rail combination — keep the grammar (flat links, orange
   underline, user chip), not the same nav structure and items.

# Common design bar for every demo redesign (from the launch brief, §9)

Read this before touching a demo file. Every redesigned demo must read as deliberately designed —
the kind of interface a strong staff designer ships — not as an AI-generated template.

## Hard requirements
1. **Preserve behavior.** This is a restyle-and-elevate pass, not a rewrite. Keep every JS data
   constant, computation, and query-param behavior working exactly as before, unless the per-demo
   fix list explicitly changes it. Deep links are contracts: after your work, every documented
   `?param=` state must open exactly as described. Re-check them in the code before finishing.
2. **A real type system.** One or two intentional font families (Google Fonts links are allowed;
   always give a real fallback stack), a modular size scale, tuned line-heights and
   letter-spacing for dense data. No default-Tailwind look. Tabular figures
   (font-variant-numeric: tabular-nums) on every numeric column.
3. **A deliberate palette** defined as CSS custom properties on :root with semantic roles
   (bg / surface / border / text / dim / accent / ok / warn / crit). AA contrast throughout
   (4.5:1 body text, 3:1 large text). If the page is deliberately single-theme, paint background
   and colors explicitly.
4. **Density done well.** Tables and data blocks: numbers right-aligned, units set once per
   column, consistent spacing rhythm on a 4px or 8px grid, one radius scale, one elevation scale.
   Empty/zero states written in the product's voice, never "No data".
5. **Purposeful motion only.** State changes and panel transitions may animate (150–300 ms,
   sensible easing); nothing decorative; everything interruptible; wrap animation-heavy behavior
   in @media (prefers-reduced-motion: reduce) { … } that disables it.
6. **Responsive** at ≥3 widths (360px, 768px, 1280px+): wide tables/diagrams scroll inside their
   own overflow-x container; the body never scrolls horizontally.
7. **Keyboard-navigable**: every interactive element focusable, visible :focus-visible styles,
   sensible tab order, real <button>/<a> elements.
8. **No template smells**: no generic hero gradients, no lorem-ish filler, no identical card
   grids, no emoji-as-icons (inline SVG icons only, and few), no unlabeled charts (every chart
   gets axis/series labels and a caption).
9. **Self-contained file**: one HTML file, inline CSS/JS (a Google Fonts <link> is the only
   allowed external resource).
10. Honor every negative promise the case study makes (invariants outrank aesthetics).

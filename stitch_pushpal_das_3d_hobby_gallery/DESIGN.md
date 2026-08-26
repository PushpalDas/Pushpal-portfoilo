---
name: Monolith Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#bbc3ff'
  on-secondary: '#001c95'
  secondary-container: '#1230c4'
  on-secondary-container: '#a5b0ff'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#000e5e'
  on-secondary-fixed-variant: '#1230c4'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  surface-elevated: '#1C1D20'
  accent-electric: '#455CE9'
  text-muted: '#A1A1A1'
typography:
  display-xl:
    fontFamily: Mukta
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Mukta
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Mukta
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Mukta
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  body-lg:
    fontFamily: Mukta
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Mukta
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

The design system is centered on a **Dark Minimalist** aesthetic that prioritizes content clarity and structural integrity. It is designed for a professional portfolio that feels both architectural and digital-native. The brand personality is "The Precise Creative"—someone who values the "less is more" philosophy but injects personality through motion and high-contrast accents.

The target audience consists of design leaders, developers, and tech recruiters who appreciate high-density information presented with breathable whitespace. The emotional response should be one of quiet confidence, technical mastery, and immediate accessibility. The UI uses sharp lines and deep blacks to create a "void" effect, where content appears to float in a structured 3D space.

## Colors

The palette is strictly high-contrast to ensure maximum legibility and a striking visual impact. 

- **Surface:** Pure Black (#000000) is the foundation, creating an infinite backdrop for content.
- **Primary:** White (#FFFFFF) is used for all core content and primary actions, ensuring a AAA accessibility rating against the black background.
- **Accent:** Inverse Blue (#455CE9) serves as a digital "ping"—used sparingly for hover states, active indicators, and links to break the monochrome flow.
- **System:** A deep charcoal (#1C1D20) is utilized for secondary surfaces and containers to provide subtle depth without breaking the dark-mode immersion.

## Typography

The typography system relies on **Mukta** for its contemporary, humanist qualities and exceptional legibility at high weights. It creates a friendly yet professional tone. To lean into the "3D/Technical" aspect of the hobby section, **JetBrains Mono** is introduced for metadata, labels, and technical specs, providing a functional contrast to the fluid curves of Mukta.

Large display titles should use tight tracking (-0.02em) to create a "block" feel. Body text remains generous in line-height to prevent eye fatigue on high-contrast screens.

## Layout & Spacing

This design system utilizes a **12-column fixed-fluid hybrid grid**. On desktop, the content is centered within a 1440px container. On mobile, it switches to a single-column fluid layout with generous 20px margins to ensure elements don't feel "cramped" against the device edges.

The spacing rhythm follows a strict 8px linear scale. Large sections are separated by significant vertical gaps (128px+) to allow the eye to reset between different portfolio pieces. Elements within a card or list use tight padding (16px-24px) to emphasize their grouping.

## Elevation & Depth

In a pure black environment, elevation is achieved through **Tonal Layering** and **Z-axis displacement** rather than traditional soft shadows.

1.  **Tier 1 (Base):** #000000 (Infinite background).
2.  **Tier 2 (Plates):** #1C1D20 (Card surfaces and nav bars) used to group content.
3.  **Tier 3 (Interaction):** Thin 1px borders (#FFFFFF at 10% opacity) are used to define boundaries.
4.  **Hobby/3D Tokens:** For the 3D-compatible hobby section, use high-specular highlights. Objects should use the `accent-electric` for glow effects (CSS filter: blur) to simulate light-emitting surfaces in a dark room.

## Shapes

The shape language is **Soft-Geometric**. By using `roundedness: 1` (4px - 12px), the UI maintains a structured, architectural feel while avoiding the aggressive sharpness of pure brutalism. This subtle rounding makes the high-contrast white-on-black text feel less jarring and more integrated into a modern digital interface.

## Components

- **Buttons:** Primary buttons are solid white with black text. Hover state transforms the background to `accent-electric` and shifts the element slightly upward (2px) to simulate physical depth.
- **Chips:** Small, Pill-shaped containers with a 1px border. Use `label-mono` for the text to indicate categories or tags.
- **Lists:** Clean dividers using 1px lines at 10% white opacity. On hover, the entire list item should transition its background to #1C1D20.
- **Input Fields:** Bottom-border only (2px white) to maintain a minimal, "drafting" aesthetic. Active state turns the border to `accent-electric`.
- **Cards:** No shadows. Use a subtle background fill (#1C1D20) and a 1px border. For the 3D hobby section, cards may feature a "glass" overlay with a backdrop blur to reveal 3D assets behind them.
- **Hobby Section Specific:** Include "3D Stage" components—dark containers with fixed aspect ratios (16:9) designed to host Canvas or WebGL elements, framed by mono-spaced coordinate labels.
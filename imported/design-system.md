---
name: Kinetic Minimalist
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201c'
  on-tertiary-container: '#009485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  quote:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '300'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style

This design system is built for a personal tech portfolio and blog that balances professional technical authority with a curated, individual perspective. The aesthetic is **Minimalist Tech**, characterized by an obsession with functional clarity, precise alignment, and high-density information display that remains breathable through generous whitespace.

The emotional response should be one of "effortless sophistication." It communicates that the author is detail-oriented, modern, and deeply competent. By utilizing a mix of sharp architectural lines and soft ambient depth, the UI feels like a premium physical workspace—tactile yet digital. The system prioritizes content above all else, using motion and depth only to guide the user's focus through technical documentation or long-form thought pieces.

## Colors

The palette is anchored by **Midnight Slate** (#0F172A), providing a foundational weight that feels more sophisticated than pure black. This is contrasted with **Electric Indigo** (#6366F1) for primary interactions and **Teal** (#2DD4BF) for secondary success states or technical highlights.

### Color Strategy
- **Surfaces:** Use a tiered gray scale (Slate 50 to 900) to create a sense of hierarchy. In light mode, borders should be extremely subtle (#E2E8F0); in dark mode, they should use a semi-transparent white (rgba(255,255,255,0.1)) to define edges without adding visual noise.
- **Accents:** Use the vibrant secondary color sparingly for CTAs, link underlines, and active states.
- **Semantic:** Error states use a muted Coral, while warnings use a Soft Amber, maintaining the professional "muted" tone of the overall system.

## Typography

This system employs a "Type Pairing of Precision." **Geist** provides a technical, geometric edge for headlines, while **Inter** is used for body copy due to its exceptional legibility at small sizes and high x-height. For code snippets and technical metadata, **JetBrains Mono** is utilized to reinforce the "tech" identity.

### Long-form Reading
For the blog, line-length is strictly capped at 720px to prevent eye fatigue. Paragraph spacing is generous (1.5rem) to ensure a comfortable vertical rhythm. Headlines should use tight letter-spacing to appear "locked" and intentional.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **single-column fluid layout** for mobile. 

- **Grid:** Use a 24px gutter to provide significant breathing room between project cards.
- **Rhythm:** Spacing follows a 4px base unit. Component internal padding should strictly adhere to the `unit * n` scale (e.g., 16px, 24px, 32px).
- **Verticality:** Use substantial vertical gaps (80px–120px) between major sections to emphasize the minimalist aesthetic.
- **Alignment:** All text elements must align to a baseline grid to maintain a "Swiss-style" structural integrity.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** supplemented by **Ambient Shadows**.

- **Level 0 (Background):** Solid Slate 50 (Light) or Slate 950 (Dark).
- **Level 1 (Cards/Surfaces):** White (Light) or Slate 900 (Dark) with a 1px border.
- **Shadows:** Use extremely soft, highly diffused shadows. A standard card shadow should have a 20px blur with 4% opacity in light mode, ensuring the card feels "resting" rather than "floating."
- **Interactions:** On hover, cards should slightly lift (increase shadow spread) and borders should transition to the primary accent color.

## Shapes

The design system uses a **Soft** shape language to provide a touch of approachability to the otherwise rigid technical layout.

- **Global Radius:** A base of 4px (Soft) is applied to all buttons, input fields, and small UI elements.
- **Cards:** Use `rounded-lg` (8px) for project and blog cards to make them feel like distinct, contained objects.
- **Avatars:** Profile photos must always be strictly circular (50% radius) to contrast against the predominantly rectangular grid.
- **Imagery:** Thumbnails and project hero images should retain the 8px corner radius for consistency.

## Components

### Buttons
- **Primary:** Solid Midnight Slate with white text. High-contrast, sharp 4px corners.
- **Ghost:** Transparent background with an Indigo border that fills on hover.

### Cards
- **Project Cards:** Feature a top-aligned thumbnail, a Geist heading, and a mono-spaced category label at the bottom. Use a 1px subtle border (#E2E8F0).
- **Blog Cards:** Focus on typography. Large headlines with a small "reading time" label in JetBrains Mono.

### Archives & Timeline
- Archive pages should use a **Vertical Timeline** approach: a thin 2px vertical line in Slate 200, with Indigo dots marking the date of each entry.

### Chips & Badges
- Category chips use a semi-transparent Indigo background (opacity 10%) with Indigo text for a "glass" effect without the blur. Text is all-caps mono-spaced for a technical look.

### Input Fields
- Understated design: 1px border on the bottom only by default, transitioning to a full 4px rounded box on focus to minimize visual clutter in contact forms.

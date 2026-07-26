---
name: Cinematic Noir & Gold
colors:
  surface: '#081425'
  surface-dim: '#081425'
  surface-bright: '#2f3a4c'
  surface-container-lowest: '#040e1f'
  surface-container-low: '#111c2d'
  surface-container: '#152031'
  surface-container-high: '#1f2a3c'
  surface-container-highest: '#2a3548'
  on-surface: '#d8e3fb'
  on-surface-variant: '#d4c4b0'
  inverse-surface: '#d8e3fb'
  inverse-on-surface: '#263143'
  outline: '#9d8f7c'
  outline-variant: '#504536'
  surface-tint: '#fbbb4e'
  primary: '#fbbb4e'
  on-primary: '#432c00'
  primary-container: '#d99e33'
  on-primary-container: '#543800'
  inverse-primary: '#7f5700'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#a8a9a9'
  on-tertiary-container: '#3c3e3e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdead'
  primary-fixed-dim: '#fbbb4e'
  on-primary-fixed: '#281900'
  on-primary-fixed-variant: '#604100'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#081425'
  on-background: '#d8e3fb'
  surface-variant: '#2a3548'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-lg: 80px
  stack-md: 48px
---

## Brand & Style
The design system embodies a premium, high-end photography aesthetic characterized by "Cinematic Noir." It is designed to evoke feelings of exclusivity, timelessness, and artistic mastery. The target audience is luxury clients seeking professional storytelling through light.

The visual style is a blend of **Minimalism** and **Editorial Design**. It utilizes a deep, dark canvas to allow photography to "pop" as the primary focus. Gold accents are used sparingly to denote quality and prestige, while elegant typography provides a narrative, gallery-like experience. The interface should feel like a high-end physical portfolio—tactile yet digital.

## Colors
The palette is centered around a **Dark Luxury** theme.
- **Primary (Gold):** Used for highlights, call-to-actions, and key narrative words. It represents light and value.
- **Secondary (Midnight Blue/Black):** The core background color. It provides deep contrast for imagery.
- **Neutral (Slate/Charcoal):** Used for container backgrounds, input fields, and borders to create subtle layering without breaking the dark theme.
- **Accents:** High-vibrancy gold gradients are used for interactive states like "Active" filters or "Book" buttons to simulate a glow effect.

## Typography
The typography strategy uses a high-contrast serif/sans-serif pairing to communicate elegance.
- **Headlines:** Use **Playfair Display**. This serif font provides an editorial, sophisticated feel. Large display headings should utilize "Gold" for specific words to create a rhythmic, visual hierarchy.
- **Body & UI:** Use **Plus Jakarta Sans**. It is highly legible on dark backgrounds and maintains a clean, modern edge that balances the traditional serif headlines.
- **Labels:** Small labels, such as "Featured" or "What We Offer," are set in uppercase with increased letter spacing to act as structural markers.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous vertical breathing room to mimic an art gallery.
- **Desktop:** 12-column grid with 24px gutters. Content is often offset or centered to create a bespoke, non-template look.
- **Vertical Rhythm:** Sections are separated by large "stack" spacing (80px+) to ensure the user focuses on one "story" or service at a time.
- **Mobile:** Transition to a single-column layout with 16px side margins. Large typography scales down significantly to maintain readability without excessive scrolling.

## Elevation & Depth
Depth is achieved through **Tonal Layers** rather than heavy shadows.
- **Base:** The primary background is the deepest shade (#0F172A).
- **Surface:** Cards and input containers use a slightly lighter neutral (#1E293B) with thin, low-opacity borders (1px, 10% white).
- **Interactive Glow:** For primary buttons and active states, a subtle "Gold" outer glow (ambient shadow) is used to simulate a light source, reinforcing the photography theme.
- **Image Depth:** Images should have a slight inner-vignette or overlay to ensure text placed on top remains legible.

## Shapes
This design system uses **Rounded** geometry to soften the high-contrast color palette.
- **Cards & Primary Sections:** Use `rounded-lg` (16px) for a modern, approachable luxury feel.
- **Buttons & Chips:** Use pill-shapes (`rounded-full`) for interactive elements like filter chips and the "Book a Session" button to distinguish them from structural containers.
- **Icons:** Should be thin-stroke (2pt) to match the elegance of the sans-serif typography.

## Components
- **Buttons:** Primary buttons are solid gold with black text. Secondary buttons are outlined in gold or neutral with a subtle hover-fill.
- **Filter Chips:** Inactive chips have a dark slate background with light borders; the active chip uses the gold glow effect.
- **Cards:** Portfolio cards feature edge-to-edge imagery with 16px corner radius. Labels (like "Featured") are placed in the top-left using a gold-pill background.
- **Input Fields:** Dark themed with 1px slate borders. Labels are placed above the field in a muted neutral. Focus state switches the border to gold.
- **Floating Action Button (FAB):** A back-to-top or quick-contact button is styled as a gold circle with a simple arrow icon, staying pinned to the bottom-right.
- **Service Catalog:** Cards for services should use a vertical layout: image first, followed by a serif title and a short sans-serif description.
---
name: Document Intelligence Interface
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
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#595c5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#727577'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  sidebar-width: 280px
  panel-gap: 1px
  element-gap: 8px
---

## Brand & Style
The design system is engineered for high-utility document intelligence and AI-assisted analysis. The aesthetic is **Corporate Modern** with a focus on **Minimalism** to manage high information density without cognitive overload. 

The interface prioritizes a "Tools, not Toys" philosophy. It utilizes a split-surface strategy: a focused, light-mode reading environment for documents to ensure maximum legibility, contrasted against a technical, dark-mode workspace for AI controls and metadata panels. Visual cues are precise, utilizing micro-interactions and sharp, clean borders to define functional zones.

## Colors
The palette is built on a high-contrast foundation to separate content from container.

- **Primary (#6366F1):** Used for active states, primary actions, and AI-driven highlights.
- **Surface Dark (#0F172A):** Applied to the global sidebar, navigation, and terminal-style AI panels to create a technical, focused periphery.
- **Surface Light (#F8FAFC):** Reserved for the document viewer and main reading area to reduce eye strain and mimic paper.
- **Accents:** Distinct hues are assigned to specific AI functions: Blue for Vector/Semantic Search, Green for Web-connected insights, and Amber for Summarization/Extraction tasks.

## Typography
This design system uses **Inter** for its neutral, systematic clarity, ideal for high-density UI. For technical metadata and citation IDs, **JetBrains Mono** is introduced to provide a distinct visual anchor for data points.

Scale is intentionally compact. The standard body size is 14px, with 13px used for sidebars and secondary data to maximize vertical space. All headings use tighter letter spacing to maintain a structured, "engineered" look.

## Layout & Spacing
The layout follows a **Fixed Grid** for utility panels and a **Fluid Grid** for the central document canvas. 

- **Density:** We utilize a 4px baseline grid. Most component padding is set to 8px (2 units) or 12px (3 units) to keep the UI compact.
- **Structure:** Panels are separated by 1px borders rather than wide gutters to preserve screen real estate.
- **Responsive:** On mobile, sidebars collapse into a bottom sheet or a full-screen overlay, while the document viewer scales to the viewport width with a minimum margin of 12px.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows.

- **Level 0 (Base):** The main background colors (Dark Slate or Light Gray).
- **Level 1 (Panels):** Defined by 1px borders (Hex: #E2E8F0 in light mode; #1E293B in dark mode).
- **Level 2 (Popovers/Modals):** Small, crisp shadows (Blur: 4px, Y: 2px, Opacity: 10%) are used only for floating elements like context menus or citation tooltips to lift them slightly off the page.
- **Active State:** Elements are "elevated" using a 1.5px solid primary border rather than a shadow.

## Shapes
The design system adopts a **Soft (0.25rem)** roundedness. This maintains a professional, technical edge while feeling contemporary.

- **Micro-pills:** Chips and status indicators use a full pill radius (999px) but at a very small height (20px or less) to denote they are interactive "meta-tags."
- **Inputs & Buttons:** Follow the standard 4px (0.25rem) radius for a disciplined appearance.

## Components
- **Buttons:** Primary buttons use solid #6366F1 with white text. Secondary buttons in the dark sidebar use a ghost style with a subtle white-alpha border.
- **AI Chat Bubbles:** Chat messages are not boxed; they are separated by subtle dividers. Citations appear as small inline mono-space pills (e.g., [1]) that highlight the corresponding PDF section on click.
- **PDF Toolbar:** A persistent, semi-transparent (Glassmorphism) bar at the top or bottom of the viewer, featuring icon-only buttons for zoom, highlight, and search.
- **Data Tables:** High-density rows (32px height) with 1px bottom borders. Status indicators are small 8px circles with a subtle outer glow of the same color.
- **Citations:** Use micro-pills with #F1F5F9 backgrounds in the light viewer, showing a preview of the source text on hover.
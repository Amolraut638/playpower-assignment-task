---
name: layout-audit
description: Audits HTML tags, font fallbacks, responsive breaks, and styling tokens for full fidelity clone match.
---

# Visual & Layout Fidelity Audit Skill

This skill defines rules for checking visual fidelity, responsive breakpoints, and custom theme token usage.

---

## 🔍 Validation Checklist

### 1. Style Token Audit
*   Scan CSS files to verify color references use `var(--ink)`, `var(--muted2)`, `var(--grey100)`, or other custom theme tokens. Avoid hardcoded hex colors unless explicitly overrides local custom styles.
*   Ensure all margins, line-heights, and font-weights use the central styles defined in `src/index.css` to prevent typography inconsistencies.

### 2. Responsiveness Boundaries
*   Audit CSS grids and layouts at the following viewports:
    - **Desktop (1440px)**: 2-column sidebar grid with spacing.
    - **Tablet (768px)**: Stacked single-column layouts with side-padding.
    - **Mobile (375px)**: Compact padding, horizontal scroll overflow on filters and cards, and footer restructuring.

### 3. Component Nesting Bounds
*   Validate HTML landmarks. Each page must contain a single `<h1>` tag inside the hero/title block and semantic `<section>` dividers for all key listings sections.
*   Avoid adding inline stylesheet tags inside components; place all rules in their respective `.css` stylesheets.

---
name: interactive-verification
description: Automated interactive flow auditing skill for checking focus traps, modal exits, and image carousel boundary limits.
---

# Interactive Flow & Accessibility Auditing Skill

This skill outlines instructions for AI agents and test runners to verify modal portal logic, focus cycles, and keyboard accessibility thresholds.

---

## 🔍 Validation Checklist

### 1. Focus Trap & Cycle Audit
*   Identify all focusable nodes inside the active dialog container.
*   Trigger a sequence of tab keypresses. Ensure the active element wraps from the last focusable element to the first when navigating forward, and from the first to the last when shift-tabbing backward.
*   Verify that `document.body` holds `overflow: hidden` properties while the modal remains visible.

### 2. Carousel Boundary Bounds
*   Navigate to the first index of the image slider. Verify the `Previous` button is set to `disabled` and possesses the corresponding `aria-disabled="true"` attributes.
*   Navigate to the last index of the image array. Verify the `Next` button is similarly disabled.
*   Simulate ArrowRight keydowns. Confirm index count increments up to the maximum array length.

### 3. Escape Closures
*   Simulate an `Escape` keypress when a modal (Photo Tour or Lightbox) is active.
*   Ensure the dialog closes immediately and focus is returned to the triggering DOM element.

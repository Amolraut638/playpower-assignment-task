# Workspace Rules & Quality Guidelines

This file defines guidelines, style rules, and structural constraints for AI agents and developer workflows operating in this codebase.

---

## 🎨 Visual & Styling Guidelines

- **Design Tokens:** Strictly use the custom variables defined in `src/index.css` (for example, `--ink`, `--muted2`, `--line-soft`, and `--reserve`) for colors, backgrounds, and borders to keep the visual system consistent.

- **Typography:** Use the unified `Inter` font system. Do not introduce unrelated default serif fonts or alternative typography systems.

- **Hover & Active States:** Interactive elements such as buttons, links, chips, and cards should define appropriate `:hover`, `:focus-visible`, and active states where applicable.

- **Transitions:** Cards such as sleeping arrangements, reviews, and nearby stays should use subtle transitions for interactive states. Avoid excessive motion that changes the visual character of the reference design.

- **Asset Management:** Prefer SVGs or inline vectors for scalable UI graphics such as laurels, stars, and interface icons. Avoid replacing scalable graphics with low-resolution raster assets.

- **Reference Fidelity:** When modifying an existing component, preserve the established visual design, spacing, typography, and interaction behavior unless the task explicitly requires a change.

---

## ♿ Interaction & Accessibility (A11y)

- **Keyboard Navigation:** Every modal dialog or full-screen interactive overlay must use the `useFocusTrap` hook to keep keyboard focus within the active dialog.

- **Focus Restoration:** When a modal dialog closes, restore focus to the element that triggered it whenever that element is still available.

- **Live Announcements:** Use `aria-live="polite"` regions where appropriate for dynamic content updates that need to be announced to assistive technologies, such as Lightbox image index changes.

- **HTML Semantics:** Prefer semantic HTML elements such as `<main>`, `<section>`, `<nav>`, `<button>`, and appropriate headings instead of generic `<div>` elements for structural and interactive content.

- **Dialog Behavior:** Modal dialogs should provide appropriate ARIA attributes, keyboard dismissal where required, and body scroll locking while active.

- **Focus Visibility:** Interactive elements must retain a visible keyboard focus state.

---

## 🚀 Performance & Code Quality

- **Code Organization:** Keep layout components in `src/components/layout/`, listing-specific components in `src/components/listing/`, and modal components in `src/components/modals/`, following the existing project structure.

- **Image Loading:** Use `loading="lazy"` and `decoding="async"` for appropriate below-the-fold images where doing so does not interfere with the initial visual experience.

- **Build Integrity:** Keep the application compatible with React 19 and ensure it builds and lints cleanly.

- **Console Hygiene:** Avoid unnecessary `console.log` statements, React warnings, broken resource requests, key-mapping errors, and other avoidable browser-console issues.

- **Component Scope:** Modify only the components relevant to the requested task. Do not introduce unrelated refactors or redesign existing functionality without explicit instruction.

- **Maintainability:** Prefer clear component boundaries, meaningful names, reusable constants, and straightforward React patterns over unnecessary abstraction.

---

## 🤖 AI Agent Workflow

- **Follow the User's Scope:** Execute only the task requested by the developer. Do not implement unrelated features or redesign existing components without explicit instruction.

- **Inspect Before Changing:** Review the relevant existing component, styles, assets, and surrounding implementation before making changes.

- **Explain Before Implementation:** For non-trivial changes, briefly state the intended approach before modifying the code.

- **Verify Changes:** After implementation, verify the affected behavior in the running application and check for relevant console errors or warnings.

- **Preserve Existing Behavior:** Do not remove or alter working functionality unless the requested task requires it.

- **Stop After the Requested Task:** Do not automatically continue into unrelated improvements or additional features.

---

## 📐 Reference & Desktop Scope

- **Reference Website:** The provided reference implementation is the primary visual and behavioral reference for the assignment.

- **Desktop Focus:** The assignment targets the desktop experience. Do not introduce mobile-specific redesigns unless explicitly requested.

- **Pixel Accuracy:** Prioritize accurate layout, spacing, typography, colors, imagery, interactions, and visual hierarchy when matching the reference.

- **Verification:** When a reference screenshot or specification is provided, use it as the basis for visual comparison rather than relying on assumptions about standard Airbnb behavior.
# AI-Assisted Development Workflow

> This document describes the actual AI-assisted workflow used to build the PlayPower Labs Airbnb Listing Page assignment. All stages, tools, examples, and decisions documented here are grounded in the project's real development history — see [`AI_PROMPTS_LOG.txt`](../AI_PROMPTS_LOG.txt) for the full prompt record.

---

## 1. Overview

This project was built using a structured, human-directed AI coding workflow. AI tools acted as **development assistants** — generating code, inspecting the browser, running commands, and reviewing implementations. All architectural decisions, acceptance criteria, scope boundaries, and final verification remained controlled by the developer.

The workflow was deliberately disciplined: each prompt was scoped to a single task, results were reviewed before continuing, and no AI tool was allowed to work ahead or make unsanctioned decisions.

---

## 2. Development Workflow

The actual development progression followed these stages:

```

Assignment analysis & reference inspection (no code)

        ↓

Design specification extraction (screenshots + DevTools CSS)

        ↓

Project scaffold & global design tokens

        ↓

Phase-by-phase component implementation (22 phases)

        ↓

Visual verification against reference (screenshot comparison)

        ↓

Iterative correction & refinement

        ↓

Functional verification (interactions, modals, keyboard nav)

        ↓

Codebase audit (unused imports, accessibility, error-prone logic)

        ↓

Targeted quality fixes (P0/P1/P2 issues resolved)

        ↓

Architecture documentation

        ↓

AI workflow documentation & final cleanup

```

The documented implementation phases followed a discrete prompt-response-review pattern, with visual/browser review and targeted correction prompts used throughout the build.

---

## 3. AI Tools Used

Three AI tools were used in distinct, complementary roles:

### Antigravity IDE — Primary Coding Agent

- Executed all code generation and file modifications

- Had access to the file system, running browser, and terminal

- Implemented the 22 development phases recorded in the prompt log (React JSX, CSS, hooks, constants)

- Ran `npm run dev` and inspected the live application in-browser

- Performed the full-project review and assignment-checklist review recorded in Prompts 35–36

- Authored all documentation files including `architecture_diagram.md` and this document

**Evidence:** All implementation phases in `AI_PROMPTS_LOG.txt` Sections 2 and 3 were executed by Antigravity IDE.

### ChatGPT — Prompt Engineering Layer

- Used to translate plain-language developer intent into precise, structured prompts

- Helped write the initial **System Rules prompt** (Prompt 1) that constrained agent behavior for the entire session

- Helped structure the **Reference Inspection prompt** (Prompt 3) and the **Screenshot-Based Specification prompt** (Prompt 4)

- Reduced implementation ambiguity and back-and-forth by making each Antigravity prompt more actionable

**Evidence:** Described in `AI_PROMPTS_LOG.txt` Notes on AI Tool Usage and `CLAUDE.md`.

### Claude — Secondary Reasoning / Spot-Checking

- Used conversationally (not for code generation) to cross-check specific logic questions

- Verified the `useFocusTrap` implementation pattern for correctness across browsers

- Reviewed CSS sticky layout logic for the Photo Tour modal's left panel

- Confirmed correct ARIA patterns for `aria-live`, `aria-modal`, and `role="dialog"`

- Verified `behavior: auto` vs `smooth` scroll-into-view UX trade-offs

**Evidence:** Documented in [`CLAUDE.md`](../CLAUDE.md) and [`.claude/config.json`](../.claude/config.json).

---

## 4. Skills

Two custom agent skills are defined under `.agents/skills/`. They were written to formalize verification expectations used during development and review.

### `layout-audit`

**File:** [`.agents/skills/layout-audit/SKILL.md`](../skills/layout-audit/SKILL.md)

Defines rules for checking visual fidelity, CSS token usage, and responsive breakpoints.

Checklist covers:

- **Style Token Audit** — verifies color/spacing references use CSS custom properties from `src/index.css` rather than hardcoded hex values

- **Responsiveness Boundaries** — audits CSS grids at desktop (1440px), tablet (768px), and mobile (375px)

- **Component Nesting** — validates a single `<h1>` per page, semantic `<section>` landmarks, and no inline style tags inside components

### `interactive-verification`

**File:** [`.agents/skills/interactive-verification/SKILL.md`](../skills/interactive-verification/SKILL.md)

Defines rules for verifying modal portal logic, keyboard accessibility, and carousel boundary behavior.

Checklist covers:

- **Focus Trap & Cycle Audit** — Tab/Shift+Tab wrapping inside modal containers; `overflow: hidden` on body while modal is active

- **Carousel Boundary Bounds** — Previous/Next button `disabled` states at first and last index; `aria-disabled` attributes; ArrowKey increment limits

- **Escape Closures** — Escape key closes Photo Tour and Lightbox immediately; focus returns to the triggering DOM element

---

## 5. Prompting Strategy

The following principles were applied throughout development, as documented in `AI_PROMPTS_LOG.txt`:

**Constrain behavior first.** The very first prompt (Prompt 1) established a strict behavioral contract: do not work ahead, do not make assumptions, stop after each task. This was enforced for the entire session.

**Inspect before implementing.** Prompts 2–5 were analysis-only: assignment analysis, reference website inspection, screenshot specification, and DevTools CSS extraction. No code was written until the specification was complete.

**One phase per prompt.** Each implementation prompt targeted a single component or feature. Example: Prompt 18 was exclusively the availability calendar; Prompt 19 was exclusively the booking widget.

**Specify acceptance criteria explicitly.** Prompts described pixel-level requirements: `36x36px day cells`, `translateY animation`, `border-radius: 16px`, `opacity 150ms fade`. This reduced interpretation variance.

**Scope boundaries in every prompt.** Phrases like `"Stop and wait"`, `"Don't touch the booking card"`, and `"Do NOT write code"` were used consistently to prevent unsanctioned changes.

**Verify before continuing.** After each phase, results were reviewed visually in the browser against reference screenshots before the next phase prompt was sent.

**Targeted correction over broad rewrite.** When something did not match, a specific correction prompt was sent (e.g., `"Keep the text outside the box"`) rather than asking the agent to redo the entire section.

---

## 6. Verification Loop

The core development loop applied to every phase:

```

Structured prompt (single scope)

         ↓

Antigravity generates code

         ↓

Developer reviews in live browser (localhost:5173)

         ↓

Screenshot comparison against reference

         ↓

Correction prompt if needed (specific, constrained)

         ↓

Re-review in browser

         ↓

Approve → move to next phase

```

For modals and interactions, the loop also included:

- Keyboard navigation testing (Tab, Shift+Tab, Escape, Arrow keys)

- Focus management verification (focus trap active, focus restored on close)

- Screen reader state verification (ARIA attributes, `aria-live` announcements)

---

## 7. Representative Workflow Examples

The following examples are drawn directly from `AI_PROMPTS_LOG.txt`.

### Example A — System Constraint Setup (Prompt 1)

**Objective:** Establish strict behavioral rules for the Antigravity coding session before any code was written.

**Prompt intent:** Override the agent's default behavior — prevent working ahead, require stopping after each task, require asking rather than deciding.

**Result:** A 20-rule behavioral contract was accepted. This established the operating constraint for the subsequent development workflow.

**Why this mattered:** Without this constraint, coding agents tend to implement beyond the stated scope, make assumptions about missing details, and chain multiple tasks together. The constraint kept each session focused.

---

### Example B — Reference Extraction Before Implementation (Prompts 2–5)

**Objective:** Build a complete design specification before writing any code.

**Prompt intent:** Force sequential analysis: assignment requirements → website inspection → screenshot specification → DevTools CSS extraction. Explicitly prohibited code generation during this phase.

**Result:** A detailed UI specification covering layout, typography, color tokens, component hierarchy, interaction details, and accessibility requirements was requested before implementation.

**Why this mattered:** Starting with a complete specification reduced mid-implementation course corrections and ensured design tokens (CSS custom properties) were established correctly from the start.

---

### Example C — Constrained Correction (Prompt 32)

**Objective:** Fix the sleeping arrangements card so bedroom name and bed type text appear below the image, not overlaid on it.

**Prompt intent:** Single-sentence targeted correction: `"Keep the text outside the box. It will look nice."`

**Result:** The CSS was adjusted to render the card text below the image boundary. No other component was touched.

**Why this mattered:** Demonstrates targeted correction — a precise one-line instruction rather than a full component rewrite, reducing the risk of unintended side effects.

---

### Example D — Codebase Audit Before Fixes (Phase 3A)

**Objective:** Audit the complete codebase before making any changes — identify real issues vs. acceptable patterns.

**Prompt intent:** Audit-only phase. Produce a prioritized report of P0/P1/P2 issues with evidence. No changes to source code.

**Result:** The full-project review and assignment-checklist prompts were used to identify remaining issues and verification areas before submission.

**Why this mattered:** Separating audit from remediation allowed the developer to review findings and explicitly approve each fix, rather than having the agent make undirected changes.

---

## 8. Human-in-the-Loop Decisions

The following decisions were explicitly made by the developer during the workflow, as evidenced by the prompt log and codebase:

| Decision | Evidence |

|---|---|

| Do not implement filter chip functionality (chips are visual-only) | Explicit constraint in Phase 2E and 3B prompts |

| Do not add fake toast messages for Share/Save buttons | Audit fix scope: add `aria-label` only, no invented functionality |

| Do not refactor `paddingTop: '88px'` inline style | Phase 3B: intentionally left as-is; coupled to header height |

| Do not extract calendar `nights` calculation as a shared utility | Phase 3B: confirmed as intentional separation of concerns, not duplication |

| Do not add mobile responsiveness beyond the desktop target | Scope decision; assignment was desktop-focused |

| Distinguish implemented frontend from proposed production architecture | Phase 4A: explicit "scope note" at top of `architecture_diagram.md` |

| Do not claim backend services were implemented | Integrity rule applied to all documentation |

| Preserve existing visual design in all audit fix phases | Stated constraint in every Phase 2E, 3B, and 4A prompt |

---

## 9. Final AI Workflow Artifacts

| File | Purpose |

|---|---|

| [`AI_PROMPTS_LOG.txt`](../AI_PROMPTS_LOG.txt) | Full chronological record of all 39 prompts across all AI tools |

| [`CLAUDE.md`](../CLAUDE.md) | Documents Claude's specific secondary role and query types |

| [`.agents/AGENTS.md`](../.agents/AGENTS.md) | Workspace rules and quality guidelines for Antigravity IDE |

| [`.agents/skills/layout-audit/SKILL.md`](../.agents/skills/layout-audit/SKILL.md) | Visual fidelity and CSS token audit skill |

| [`.agents/skills/interactive-verification/SKILL.md`](../.agents/skills/interactive-verification/SKILL.md) | Modal, keyboard, and carousel interaction verification skill |

| [`.claude/config.json`](../.claude/config.json) | Claude tool configuration (role, tasks) |

| [`docs/ai-workflo
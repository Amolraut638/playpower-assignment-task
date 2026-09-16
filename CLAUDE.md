# Claude AI Configuration

This file documents how Claude was used as a supporting AI tool during development of the Airbnb listing clone.

## Role in Workflow

Claude was used as a **secondary reasoning layer** alongside Antigravity IDE (primary coding agent) and ChatGPT (prompt engineering layer).

Specific tasks Claude helped with:

- Cross-checking CSS sticky layout logic for the Photo Tour modal
- Reviewing focus-trap implementation correctness across browsers
- Verifying accessibility patterns (`aria-live`, `aria-modal`, `role="dialog"`)
- Spot-checking React portal rendering edge cases

## Interaction Style

Claude was queried conversationally with direct technical questions, not used to generate full code blocks. Example queries:

- "Is this useFocusTrap implementation correct for nested modals?"
- "Does using `behavior: auto` vs `smooth` in scrollTo affect the perceived UX here?"
- "What is the correct aria pattern for a lightbox image carousel?"

## Files Relevant to AI Workflow

- `.agents/AGENTS.md` — Antigravity IDE workspace rules and quality guidelines
- `AI_PROMPTS_LOG.txt` — Full chronological log of all prompts sent across all tools
- `.agents/skills/` — Custom skill configs for interactive verification and layout auditing
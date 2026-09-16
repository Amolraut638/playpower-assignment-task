# Airbnb Listing Page Clone

A desktop-focused recreation of an Airbnb single-property listing page built with **React + Vite**. The project closely matches the provided reference in layout, styling, interactions, and visual details, including the hero gallery, photo tour, lightbox, booking widget, availability calendar, reviews, amenities, nearby stays, sticky navigation, and accessible modal interactions.

> **Note:** Built as a frontend engineering assignment for PlayPower Labs. This is a purely frontend, static implementation with no backend or database. All application data is co-located with the source code.

---

## Features

- High-fidelity desktop UI matching the provided reference
- 5-photo hero gallery with zoom-on-hover collage layout
- **Photo Tour modal** — full-screen overlay with sticky room navigation
- **Lightbox modal** — keyboard-navigable image viewer (← → Escape)
- Scroll-activated sticky header with section navigation tabs
- Sticky booking widget with date range selection and price breakdown
- Two-month **availability calendar** with date-range validation and blocked date support
- Guest count controls (min 1, max 6)
- Dynamic free-cancellation date based on selected check-in
- Reviews section with overall rating, category bars, filter chips, and expandable cards
- "Meet Your Host" section with host stats and co-host cards
- Nearby Stays scroll carousel with page counter navigation
- Amenities grid with show-all toggle
- Location section with embedded map
- Site footer with four-column links and social icons

### Accessibility
- Full keyboard navigation for all interactive elements
- `useFocusTrap` custom hook traps focus inside modals
- Focus restored to trigger element on modal close
- `aria-live` region for screen reader announcements on image navigation
- `aria-label`, `aria-pressed`, `aria-hidden`, `aria-modal`, and `inert` used where appropriate
- `<abbr>` elements on calendar weekday headers for unambiguous screen reader output
- Body scroll lock while any modal is open
- Escape key closes all modals
- `prefers-reduced-motion` respected

---

## Tech Stack

| | |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Language | JavaScript (ES6+) |
| Styling | Vanilla CSS (component-scoped, no Tailwind) |
| Icons | Lucide React |
| Dependencies | Minimal — `react`, `react-dom`, `lucide-react` only |

---

## Project Structure

```
src/
├── assets/                   ← Property photos, logos, laurels
├── constants/
│   └── pricing.js            ← Shared pricing constants (single source of truth)
├── hooks/
│   └── useFocusTrap.js       ← Focus trap hook for modal dialogs
├── components/
│   ├── layout/               ← Header, StickyScrollHeader, ContentLayout, SiteFooter
│   ├── listing/              ← All property-page sections (17 components)
│   └── modals/               ← PhotoTourModal, Lightbox
├── App.jsx                   ← Root; holds all shared state (booking, modals, a11y)
├── App.css
├── index.css                 ← Design tokens (CSS custom properties), global reset
└── main.jsx
```

---

## Run Locally

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Open in browser

```
http://localhost:5173
```

---

## Build

**Production build**

```bash
npm run build
```

**Preview production build**

```bash
npm run preview
```

**Lint**

```bash
npm run lint
```

---

## Documentation

| File | Contents |
|---|---|
| [`docs/ai-workflow.md`](./docs/ai-workflow.md) | AI-assisted development workflow, prompting strategy, verification loop, and examples |
| [`architecture_diagram.md`](./architecture_diagram.md) | Frontend architecture and proposed production-scale system design |
| [`AI_PROMPTS_LOG.txt`](./AI_PROMPTS_LOG.txt) | Chronological record of prompts used during AI-assisted development |
| [`CLAUDE.md`](./CLAUDE.md) | Claude-specific development and reasoning guidance |
| [`.agents/AGENTS.md`](./.agents/AGENTS.md) | AI agent workspace rules and quality guidelines |

---

## Author

**Amol Raut**

LinkedIn: [linkedin.com/in/amolraut9272](https://linkedin.com/in/amolraut9272)

---

## License

This project was created solely for educational and assessment purposes.
It is **not affiliated with or endorsed by Airbnb**.

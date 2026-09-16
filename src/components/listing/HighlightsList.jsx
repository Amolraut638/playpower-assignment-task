import { TreePalm, Snowflake, KeyRound } from 'lucide-react'
import './HighlightsList.css'

/* ── Data ── */
const HIGHLIGHTS = [
  {
    Icon: TreePalm,
    title: 'Outdoor entertainment',
    sub:   'The pool and alfresco dining are great for summer trips.',
  },
  {
    Icon: Snowflake,
    title: 'Designed for staying cool',
    sub:   'Beat the heat with the A/C and ceiling fan.',
  },
  {
    Icon: KeyRound,
    title: 'Self check-in',
    sub:   'You can check in with the building staff.',
  },
]

/* ── Component ── */
export default function HighlightsList() {
  return (
    <div className="highlights">
      {HIGHLIGHTS.map(({ Icon, title, sub }) => (
        <div className="highlight-row" key={title}>
          <Icon className="highlight-icon" size={26} strokeWidth={1.5} aria-hidden="true" />
          <div className="highlight-text">
            <div className="highlight-title">{title}</div>
            <div className="highlight-sub">{sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
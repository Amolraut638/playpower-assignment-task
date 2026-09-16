import { ChevronRight } from 'lucide-react'
import './ThingsToKnow.css'

/* ── Icons ── */
const CancellationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M11.4 21.4 16 16.83l4.6 4.57 1.4-1.4-4.57-4.6 4.57-4.6-1.4-1.4-4.6 4.57-4.6-4.57-1.4 1.4 4.57 4.6L10 20zM26 4h-3V2h-2v2H11V2H9v2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 24H6V10h20zm0-20H6V6h3v2h2V6h10v2h2V6h3z" />
  </svg>
)

const HouseRulesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M28 12a8 8 0 1 0-14.72 4.328l-8.94 8.94 1.413 1.414 1.47-1.47 2.12 2.121 1.415-1.414-2.122-2.121 1.415-1.415 2.12 2.122 1.415-1.414-2.12-2.122 3.374-3.375A8 8 0 0 0 28 12zm-8 6a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
  </svg>
)

const SafetyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16 2 4 6v10c0 7 5.4 12.6 12 14 6.6-1.4 12-7 12-14V6zm0 28C9.34 28.26 6 22.48 6 16V7.48L16 4.1l10 3.38V16c0 6.48-3.34 12.26-10 13.94z" />
  </svg>
)

const CANCELLATION_ITEMS = [
  { text: 'Free cancellation before 17 Oct.', bold: true },
  { text: 'Cancel before check-in on 18 October for a partial refund.' },
  { text: 'Review this host\'s full policy', link: true, suffix: ' for details.' },
]

const HOUSE_RULES = [
  { text: 'Check-in after 2:00 pm' },
  { text: 'Checkout before 11:00 am' },
  { text: '3 guests maximum' },
]

const SAFETY_ITEMS = [
  { text: 'Carbon monoxide alarm not reported' },
  { text: 'Smoke alarm not reported' },
  { text: 'Exterior security cameras on property' },
]

const COLUMNS = [
  { key: 'cancellation', Icon: CancellationIcon, title: 'Cancellation policy', items: CANCELLATION_ITEMS },
  { key: 'rules', Icon: HouseRulesIcon, title: 'House rules', items: HOUSE_RULES },
  { key: 'safety', Icon: SafetyIcon, title: 'Safety & property', items: SAFETY_ITEMS },
]

export default function ThingsToKnow() {
  return (
    <div className="things-section">
      <h2>Things to know</h2>

      <div className="things-grid">
        {COLUMNS.map(({ key, Icon, title, items }) => (
          <div className="things-col" key={key}>
            <div className="things-icon-wrap">
              <Icon />
            </div>

            <h3>{title}</h3>

            <div className="things-list">
              {items.map((item, i) => (
                <p className="things-text" key={i}>
                  {item.bold ? (
                    <strong>{item.text}</strong>
                  ) : item.link ? (
                    <>
                      <a
                        href="#"
                        className="things-text--link"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.text}
                      </a>
                      {item.suffix}
                    </>
                  ) : (
                    item.text
                  )}
                </p>
              ))}
            </div>

            <button className="things-show-more">
              Learn more
              <ChevronRight size={14} className="things-show-more-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
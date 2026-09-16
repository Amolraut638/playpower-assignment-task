import { useState } from 'react'
import './DescriptionArea.css'

/* ── Exact description text from reference HTML ── */
const DESCRIPTION = `🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴`

/* ── Chevron right icon from reference HTML ── */
const ChevronIcon = ({ up }) => (
  <svg
    className={`desc-chevron${up ? ' desc-chevron--up' : ''}`}
    viewBox="0 0 18 18"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
    />
  </svg>
)

/* ── Component ── */
export default function DescriptionArea() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="description-area">

      {/* Translation notice — gray background box matching reference */}
      <div className="translation-notice">
        <span>
          Some info has been automatically translated.
          <a href="#" onClick={(e) => e.preventDefault()}>Show original</a>
        </span>
      </div>

      {/* Description text with fade overlay when collapsed */}
      <div className="desc-wrapper">
        <p
          id="descText"
          className={`desc-text${expanded ? '' : ' desc-text--collapsed'}`}
        >
          {DESCRIPTION}
        </p>
        {/* White gradient fade — only visible when collapsed */}
        {!expanded && <div className="desc-fade" aria-hidden="true" />}
      </div>

      {/* Show more / Show less */}
      <button
        className="desc-more-btn"
        id="descMore"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? 'Show less' : 'Show more'}
        <ChevronIcon up={expanded} />
      </button>

    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import './StickyScrollHeader.css'

const TABS = [
  { id: 'photos',    label: 'Photos'    },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews',   label: 'Reviews'   },
  { id: 'location',  label: 'Location'  },
]

export default function StickyScrollHeader({ nights, totalPrice }) {
  const [isVisible, setIsVisible]       = useState(false)
  const [activeSection, setActiveSection] = useState('photos')
  // Ref to avoid stale closure over isVisible inside the scroll listener
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const visible = scrollY > 450

      if (visible !== isVisibleRef.current) {
        isVisibleRef.current = visible
        setIsVisible(visible)
      }

      if (!visible) return

      const scrollPos = scrollY + 160
      for (const { id } of TABS) {
        const el = document.getElementById(id)
        if (el) {
          const top    = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    // Run once on mount to set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabClick = (sectionId, event) => {
    event.preventDefault()
    setActiveSection(sectionId)
    const target = document.getElementById(sectionId)
    if (target) {
      // Offset by both headers: main (88px) + sticky (54px) = 142px
      const offset = 142
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`sticky-scroll-header${isVisible ? ' sticky-scroll-header--visible' : ''}`}
      id="sticky-header"
      aria-hidden={isVisible ? 'false' : 'true'}
      inert={isVisible ? undefined : true}
    >
      <div className="sticky-scroll-inner">

        {/* ── LEFT: Section nav tabs ── */}
        <nav className="sticky-scroll-nav" aria-label="Listing sections">
          {TABS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              data-target={id}
              className={`sticky-tab${activeSection === id ? ' sticky-tab--active' : ''}`}
              onClick={(e) => handleTabClick(id, e)}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── RIGHT: Compact pricing + Reserve CTA ── */}
        <div className="sticky-scroll-reserve">
          <div className="sticky-reserve-meta">
            <div className="sticky-price">
              {totalPrice != null
                ? <><span className="sticky-price-amount">₹{totalPrice.toLocaleString('en-IN')}</span>
                    <span className="sticky-price-nights"> for {nights} night{nights !== 1 ? 's' : ''}</span></>
                : <span className="sticky-price-amount">Select dates</span>
              }
            </div>
            <div className="sticky-rating">
              <span className="sticky-star" aria-hidden="true">★</span>
              {' '}4.95 ·{' '}
              <span className="sn-reviews">19 reviews</span>
            </div>
          </div>
          <button className="sticky-reserve-btn" type="button">
            Reserve
          </button>
        </div>

      </div>
    </div>
  )
}

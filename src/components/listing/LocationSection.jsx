import { useState } from 'react'
import {
  Search,
  Plus,
  Minus,
  Compass,
  Info,
  Waves,
  UtensilsCrossed,
  Landmark,
  Plane,
  ChevronDown,
} from 'lucide-react'
import './LocationSection.css'

const HouseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="white" aria-hidden="true">
    <path d="M16.0011 1.33333L1.33447 14.0303L2.66553 15.5364L4.66553 13.7697V28.6667H14.6655V20H17.3322V28.6667H27.3322V13.7697L29.3322 15.5364L30.6633 14.0303L16.0011 1.33333ZM25.3322 26.6667H19.3322V18H12.6655V26.6667H6.66553V11.977L16.0011 3.78333L25.3322 11.977V26.6667Z" />
  </svg>
)

const NEIGHBOURHOOD_FACTS = [
  { icon: Waves, title: 'Candolim Beach', sub: '5 min walk' },
  { icon: UtensilsCrossed, title: 'Cafés & restaurants', sub: '3 min walk' },
  { icon: Landmark, title: 'Fort Aguada', sub: '10 min drive' },
  { icon: Plane, title: 'Goa Airport (GOI)', sub: '35 min drive' },
]

export default function LocationSection() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="location-section" id="location">
      <h2>Where you'll be</h2>
      <p className="location-city">Candolim, Goa, India</p>

      {/* ── Stylized map ── */}
      <div
        className="map-placeholder"
        role="img"
        aria-label="Map showing approximate location in Candolim, Goa"
      >
        <svg
          className="map-svg"
          viewBox="0 0 800 380"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="800" height="380" fill="#dbe9d6" />

          {/* water */}
          <polygon points="0,0 320,0 210,380 0,380" fill="#b9d9e6" />
          <polygon points="0,0 320,0 210,380 0,380" fill="url(#waterShade)" opacity="0.5" />

          {/* land blocks */}
          <rect x="360" y="40" width="120" height="80" rx="6" fill="#cadfc2" />
          <rect x="500" y="60" width="90" height="60" rx="6" fill="#cadfc2" />
          <rect x="420" y="220" width="140" height="90" rx="6" fill="#cadfc2" />
          <rect x="600" y="180" width="100" height="70" rx="6" fill="#cadfc2" />
          <rect x="250" y="240" width="80" height="60" rx="6" fill="#cadfc2" />

          {/* vegetation */}
          <circle cx="420" cy="150" r="46" fill="#a9cf9c" opacity="0.55" />
          <circle cx="640" cy="90" r="58" fill="#a9cf9c" opacity="0.5" />
          <circle cx="300" cy="150" r="34" fill="#a9cf9c" opacity="0.5" />
          <circle cx="560" cy="300" r="40" fill="#a9cf9c" opacity="0.5" />

          {/* roads */}
          <path d="M0,110 C 220,90 380,150 480,140 S 700,60 800,90" stroke="#f4f6f2" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M0,110 C 220,90 380,150 480,140 S 700,60 800,90" stroke="#e3e8dd" strokeWidth="1.5" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
          <path d="M330,0 C 350,90 420,160 400,260 S 470,340 520,380" stroke="#f4f6f2" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M180,380 C 260,300 320,260 420,240 S 620,220 800,260" stroke="#f4f6f2" strokeWidth="6" fill="none" strokeLinecap="round" />

          <defs>
            <linearGradient id="waterShade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="map-vignette" />

        {/* House pin */}
        <div className="map-marker">
          <div className="map-marker-pulse" />
          <div className="map-marker-pin">
            <HouseIcon />
          </div>
        </div>

        {/* Search this area */}
        <button className="map-search-btn" aria-label="Search this area">
          <Search size={14} />
          Search this area
        </button>

        {/* Zoom controls */}
        <div className="map-zoom">
          <button className="map-zoom-btn" aria-label="Zoom in">
            <Plus size={16} />
          </button>
          <button className="map-zoom-btn" aria-label="Zoom out">
            <Minus size={16} />
          </button>
        </div>

        {/* Compass */}
        <div className="map-compass" aria-hidden="true">
          <Compass size={16} color="var(--ink)" />
        </div>

        {/* Approximate location chip */}
        <div className="map-approx-chip">
          <Info size={13} />
          Exact location provided after booking
        </div>
      </div>

      <p className="location-note">
        The pin shows the general area - Amor de Goa is centrally located within Candolim.
      </p>

      {/* ── Neighbourhood highlights ── */}
      <div className="neighbourhood">
        <h2>Neighbourhood highlights</h2>

        <div className="neighbourhood-facts">
          {NEIGHBOURHOOD_FACTS.map(({ icon: Icon, title, sub }) => (
            <div className="neighbourhood-fact" key={title}>
              <div className="neighbourhood-fact-icon">
                <Icon size={17} />
              </div>
              <div>
                <div className="neighbourhood-fact-title">{title}</div>
                <div className="neighbourhood-fact-sub">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="neighbourhood-desc">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy
          access to beaches, cafés, and popular attractions.
        </p>

        <div className={`neighbourhood-more-wrap${showMore ? ' expanded' : ''}`}>
          <div className="neighbourhood-more-inner">
            <p className="neighbourhood-desc">
              Candolim is one of Goa's most popular beach destinations, known for its clean
              stretches of sand, vibrant nightlife, and proximity to Calangute and Sinquerim.
              The property is just minutes away from Fort Aguada and the Mandovi River cruise
              jetty, making it an ideal base for exploring North Goa.
            </p>
          </div>
        </div>

        <button
          className="neighbourhood-show-more"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
        >
          {showMore ? 'Show less' : 'Show more'}
          <ChevronDown
            size={14}
            className={`neighbourhood-show-more-icon${showMore ? ' rotated' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}
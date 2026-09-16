import { Globe } from 'lucide-react'
import './SiteFooter.css'

const FOOTER_COLS = [
  {
    title: 'Support',
    links: [
      'Help Centre',
      'AirCover',
      'Anti-discrimination',
      'Disability support',
      'Cancellation options',
      'Report a neighbourhood concern',
    ],
  },
  {
    title: 'Community',
    links: [
      'Airbnb.org: emergency stays',
      'Support Afghan refugees',
      'Celebrating diversity & belonging',
      'Combating discrimination',
    ],
  },
  {
    title: 'Hosting',
    links: [
      'Airbnb your home',
      'AirCover for Hosts',
      'Hosting resources',
      'Community forum',
      'Hosting responsibly',
      'Join a free Hosting class',
    ],
  },
  {
    title: 'Airbnb',
    links: [
      'Newsroom',
      'New features',
      'Careers',
      'Investors',
      'Gift cards',
      'Airbnb.org emergency stays',
    ],
  },
]

/* Clean single-path social icons, consistent 1.75 stroke weight to match lucide */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4l7.5 8.5L4.5 20h2.2l6-6.8 4.6 6.8H21l-7.8-9L20 4h-2.2l-5.6 6.3L7.6 4z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/>
  </svg>
)

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="siteFooter">
      <div className="footer-inner">

        {/* 4-column link grid */}
        <nav className="footer-grid" aria-label="Footer navigation">
          {FOOTER_COLS.map(col => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" onClick={e => e.preventDefault()}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copyright">© 2026 Airbnb, Inc.</span>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#" className="footer-bottom-link" onClick={e => e.preventDefault()}>Privacy</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#" className="footer-bottom-link" onClick={e => e.preventDefault()}>Terms</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#" className="footer-bottom-link" onClick={e => e.preventDefault()}>Sitemap</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#" className="footer-bottom-link" onClick={e => e.preventDefault()}>Company details</a>
          </div>

          <div className="footer-bottom-right">
            <button className="footer-locale-btn">
              <Globe size={15} strokeWidth={2} />
              English (IN)
            </button>
            <span className="footer-divider" aria-hidden="true" />
            <button className="footer-locale-btn">
              ₹ INR
            </button>
            <div className="footer-social">
              <a href="#" onClick={e => e.preventDefault()} aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" onClick={e => e.preventDefault()} aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" onClick={e => e.preventDefault()} aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
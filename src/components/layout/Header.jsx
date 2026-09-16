import { useState, useEffect, useRef } from 'react'
import { Search, Globe, Menu, User } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import './Header.css'
import searchbarHouse from "../../assets/searchbar-house.png";
import airbnbLogo from "../../assets/airbnb1.png";

/* ── Logo (kept as image — not a lucide icon) ── */

const AirbnbLogo = () => (
  <img
    src={airbnbLogo}
    alt="Airbnb"
    className="airbnb-logo"
  />
);

/* ── Dropdown menu items ── */
const MENU_ITEMS = [
  { label: 'Log in', bold: true, separator: false },
  { label: 'Sign up', bold: false, separator: false },
  { label: null, separator: true },
  { label: 'Become a host', bold: false, separator: false },
  { label: 'Host an experience', bold: false, separator: false },
  { label: 'Help Center', bold: false, separator: false },
]

/* ── Component ── */

export default function Header() {
  const scrollY = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const triggerRef = useRef(null)

  // Hide main header when sticky scroll bar takes over (scrollY > 450)
  const isHidden = scrollY > 450

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  // Close dropdown menu on Escape key press or Tab key press
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); triggerRef.current?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header className={`site-header${isHidden ? ' site-header--hidden' : ''}`} id="siteHeader">
      <div className="header-inner">

        {/* ── LEFT: Logo ── */}
        <a className="header-logo" href="#" aria-label="Airbnb homepage">
          <AirbnbLogo />
        </a>

        {/* ── CENTER: Compact Search Pill ── */}
        <div className="search-pill" role="search">
          {/* Anywhere */}
          <button className="pill-btn">
            <img
              className="pill-house-icon"
              src={searchbarHouse}
              alt=""
              aria-hidden="true"
            />
            Anywhere
          </button>

          <span className="pill-divider" aria-hidden="true" />

          {/* Anytime */}
          <button className="pill-btn">Anytime</button>

          <span className="pill-divider" aria-hidden="true" />

          {/* Add guests + search button */}
          <button className="pill-btn pill-btn--guests">Add guests</button>

          <button className="pill-search-btn" aria-label="Search">
            <Search size={14} color="#fff" fill="#fff" aria-hidden="true" />
          </button>
        </div>

        {/* ── RIGHT: User Menu ── */}
        <nav className="user-menu" aria-label="User navigation">
          <button className="btn-text">Become a host</button>

          <button className="btn-icon-round" aria-label="Choose a language">
            <Globe size={16} aria-hidden="true" />
          </button>

          <div className="user-menu-wrapper" ref={menuRef}>
            <button
              ref={triggerRef}
              className={`user-pill${menuOpen ? ' user-pill--open' : ''}`}
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <Menu size={16} strokeWidth={3} aria-hidden="true" />
              <span className="user-avatar-circle" aria-hidden="true">
                <User size={16} color="#fff" fill="#fff" />
              </span>
            </button>

            {menuOpen && (
              <div className="user-dropdown" role="menu" aria-label="User options">
                {MENU_ITEMS.map((item, idx) =>
                  item.separator ? (
                    <div key={idx} className="dropdown-separator" aria-hidden="true" />
                  ) : (
                    <button
                      key={idx}
                      className={`dropdown-item${item.bold ? ' dropdown-item--bold' : ''}`}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </nav>

      </div>
    </header>
  )
}
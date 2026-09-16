import { Fragment } from 'react'
import { MapPin, GraduationCap, ShieldCheck } from 'lucide-react'
import './MeetYourHost.css'
import hostImg from '../../assets/host.jpeg'

const CO_HOSTS = [
  { name: 'Sharath', src: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Aman Dev Pahwa', src: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Maria Karen Priyanka', src: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Simran', src: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Pallavi', src: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Sanyukta', src: 'https://i.pravatar.cc/150?img=16' },
  { name: 'Shruti', src: null, initial: 'S', bg: '#5c6bc0' },
  { name: 'Amisha', src: null, initial: 'A', bg: '#3d7a6d' },
]

const HOST_STATS = [
  { num: '1,463', label: 'Reviews' },
  { num: '4.68 ★', label: 'Rating' },
  { num: '2', label: 'Years hosting' },
]

export default function MeetYourHost() {
  return (
    <div className="meet-host-section">
      <h2>Meet your host</h2>

      <div className="meet-host-layout">

        {/* ── LEFT COLUMN — profile card ── */}
        <div className="host-left">
          <div className="host-profile-card">

            {/* Left side: identity */}
            <div className="host-card-identity">
              <div className="host-avatar-wrap-lg">
                <img
                  className="host-avatar-lg"
                  src={hostImg}
                  alt="Mirashya Homes host avatar"
                />
                <div className="host-verified-badge" aria-label="Verified host">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="host-card-name">Mirashya<br />Homes</span>
              <span className="host-card-role">Host</span>
            </div>

            {/* Vertical divider */}
            <div className="host-card-vdivider" />

            {/* Right side: stats stacked vertically */}
            <div className="host-stats">
              {HOST_STATS.map(({ num, label }, i) => (
                <Fragment key={label}>
                  {i > 0 && <div className="host-stat-hdivider" />}
                  <div className="host-stat-col">
                    <span className="host-stat-num">{num}</span>
                    <span className="host-stat-label">{label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          {/* Personal tidbits */}
          <div className="host-personal">
            <div className="host-personal-item">
              <MapPin size={20} />
              <span>Born in the 80s</span>
            </div>
            <div className="host-personal-item">
              <GraduationCap size={20} />
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="host-right">

          {/* Co-hosts */}
          <div>
            <h3 className="co-hosts-heading">Co-Hosts</h3>
            <div className="co-hosts-grid">
              {CO_HOSTS.map(host => (
                <div className="co-host-item" key={host.name}>
                  {host.src ? (
                    <img
                      src={host.src}
                      alt={host.name}
                      className="co-host-avatar"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="co-host-avatar--initial"
                      style={{ background: host.bg }}
                      aria-label={host.name}
                    >
                      {host.initial}
                    </div>
                  )}
                  <span className="co-host-name">{host.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host details */}
          <div className="host-details-section">
            <h3 className="host-details-heading">Host details</h3>
            <div className="host-details-rows">
              <div className="host-detail-row">
                <span className="host-detail-label">Response rate</span>
                <span className="host-detail-value">100%</span>
              </div>
              <div className="host-detail-row">
                <span className="host-detail-label">Response time</span>
                <span className="host-detail-value">Within an hour</span>
              </div>
            </div>
          </div>

          {/* Message host — full-width pill */}
          <button
            className="message-host-btn"
            id="messageHostBtn"
            onClick={() => alert('Message Host feature coming soon!')}
          >
            Message host
          </button>

          {/* Safety notice */}
          <div className="host-payment-warning">
            <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
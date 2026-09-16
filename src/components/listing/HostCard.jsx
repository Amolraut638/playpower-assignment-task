import { useState } from 'react'
import './HostCard.css'
import host from "../../assets/host.jpeg";

export default function HostCard() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="host-card">
      <div className={`host-avatar-wrap${imgError ? ' avatar-error' : ''}`}>
        <img
          className="host-avatar"
          src={host}
          alt="Host Mirashya Homes"
          onError={() => setImgError(true)}
        />
        <span className="host-initials" aria-hidden="true">M</span>
      </div>
      <div className="host-info">
        <div className="host-name">Hosted by Mirashya Homes</div>
        <div className="host-meta">2 years hosting</div>
      </div>
    </div>
  )
}

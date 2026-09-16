import { useState } from 'react'
import { Share, Heart, Check } from 'lucide-react'
import './TitleSection.css'

export default function TitleSection() {

  const [isSaved, setIsSaved] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <section className="title-section">
      <h1 className="title-text">Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>
      
      <div className="title-actions">
        {/* Share Button */}
        <button
          className="action-btn"
          id="shareBtn"
          aria-label={isCopied ? 'Link copied' : 'Share this listing'}
          onClick={handleShare}
        >
          {isCopied ? (
            <Check className="action-icon" size={16} strokeWidth={1} aria-hidden="true" />
          ) : (
            <Share className="action-icon" size={16} strokeWidth={1} aria-hidden="true" />
          )}
          <span className="action-text">{isCopied ? 'Copied!' : 'Share'}</span>
        </button>

        {/* Save Button */}
        <button
          className="action-btn"
          id="saveBtn"
          aria-label={isSaved ? 'Remove from saved' : 'Save this listing'}
          aria-pressed={isSaved}
          onClick={() => setIsSaved(prev => !prev)}
        >
          <Heart
            className="action-icon"
            size={16}
            strokeWidth={1}
            fill={isSaved ? '#FF385C' : 'none'}
            color={isSaved ? '#FF385C' : 'currentColor'}
            aria-hidden="true"
          />
          <span className="action-text">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </section>
  )
}
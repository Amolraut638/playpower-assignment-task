import { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import './Lightbox.css'

/**
 * Lightbox — Phase 22
 * Props:
 *  images  : string[]   — array of full-size image URLs
 *  index   : number     — currently displayed index
 *  isOpen  : boolean
 *  onClose : () => void
 *  onChange: (newIndex: number) => void
 */
export default function Lightbox({ images = [], index = 0, isOpen, openerRef, onClose, onChange }) {
  const containerRef = useRef(null)
  const [fading, setFading]   = useState(false)
  const total = images.length

  useFocusTrap(containerRef, isOpen)

  /* Restore focus to the element that opened the lightbox, then close */
  const handleClose = useCallback(() => {
    openerRef?.current?.focus()
    onClose()
  }, [openerRef, onClose])

  /* Navigate to adjacent photo with a brief fade */
  const go = useCallback((dir) => {
    const next = index + dir
    if (next < 0 || next >= total) return
    setFading(true)
    setTimeout(() => {
      onChange(next)
      setFading(false)
    }, 150)
  }, [index, total, onChange])

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape')     { handleClose(); return }
      if (e.key === 'ArrowLeft')  { go(-1); return }
      if (e.key === 'ArrowRight') { go(1) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, go, handleClose])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !images.length) return null

  return createPortal(
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}`}
      ref={containerRef}
    >
      {/* ── Top bar ── */}
      <div className="lightbox-topbar">
        <span className="lightbox-counter">{index + 1} / {total}</span>
        <div className="lightbox-topbar-right">
          <button className="lightbox-action-btn" aria-label="Share this photo">
            <Share2 size={16} /> Share
          </button>
          <button className="lightbox-action-btn" aria-label="Save this photo">
            <Heart size={16} /> Save
          </button>
          <button
            className="lightbox-close-btn"
            onClick={handleClose}
            id="lightboxCloseBtn"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ── Main image + Prev/Next ── */}
      <div className="lightbox-main">
        {/* Previous */}
        <button
          className="lightbox-nav-btn lightbox-nav-btn--prev"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous photo"
          id="lightboxPrevBtn"
        >
          <ChevronLeft size={22} />
        </button>

        <img
          key={images[index]}
          src={images[index]}
          alt={`Property photo ${index + 1}`}
          className={`lightbox-img${fading ? ' lightbox-img--fading' : ''}`}
        />

        {/* Next */}
        <button
          className="lightbox-nav-btn lightbox-nav-btn--next"
          onClick={() => go(1)}
          disabled={index === total - 1}
          aria-label="Next photo"
          id="lightboxNextBtn"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="lightbox-thumbnails" role="list" aria-label="All photos">
        {images.map((src, i) => (
          <button
            key={i}
            className={`lightbox-thumb-btn${i === index ? ' lightbox-thumb-btn--active' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`View photo ${i + 1} of ${total}`}
            aria-pressed={i === index}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="lightbox-thumb"
            />
          </button>
        ))}
      </div>
    </div>,
    document.body
  )
}

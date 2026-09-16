import { useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, Upload, Heart } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import './PhotoTourModal.css'
import living1a from "../../assets/living-room-1.jpeg";
import living1b from "../../assets/living-room-1-2.jpeg";
import living1c from "../../assets/living-room-1-3.jpeg";
import living2a from "../../assets/living-room-2.jpeg";
import living2b from "../../assets/living-room-2-1.jpeg";
import living2c from "../../assets/living-room-2-2.jpeg";
import living2d from "../../assets/living-room-2-3.jpeg";
import living2e from "../../assets/living-room-2-4.jpeg";
import kitchen1a from "../../assets/kitchen-1.jpeg";
import kitchen1b from "../../assets/kitchen-1-2.jpeg";
import pool1a from "../../assets/pool-1.jpeg";
import pool1b from "../../assets/pool-1-2.jpeg";
import pool1c from "../../assets/pool-1-3.jpeg";
import gym1a from "../../assets/gym-1.jpeg";
import gym1b from "../../assets/gym-1-2.jpeg";
import gym1c from "../../assets/gym-1-3.jpeg";
import gym1d from "../../assets/gym-1-4.jpeg";
import gym1e from "../../assets/gym-1-5.jpeg";
import ext1a from "../../assets/ext-1.jpeg";
import ext1b from "../../assets/ext-1-2.jpeg";
import ext1c from "../../assets/ext-1-3.jpeg";
import ext1d from "../../assets/ext-1-4.jpeg";
import ext1e from "../../assets/ext-1-5.jpeg";
import ext1f from "../../assets/ext-1-6.jpeg";
import bedroom1a from "../../assets/bedroom-1.jpeg";
import bedroom1b from "../../assets/bedroom-2.jpeg";
import bedroom1c from "../../assets/bedroom-3.jpeg";
import bedroom1d from "../../assets/bedroom-4.jpeg";
import bedroom1e from "../../assets/bedroom-5.jpeg";
import bedroom1f from "../../assets/bedroom-6.jpeg";
import bathroom1a from "../../assets/bathroom-1.jpeg";
import add1a from "../../assets/add-1.jpeg";
import add1b from "../../assets/add-1-2.jpeg";
import add1c from "../../assets/add-1-3.jpeg";
import add1d from "../../assets/add-1-4.jpeg";
import add1e from "../../assets/add-1-5.jpeg";


/* ── Room data matching reference ── */
const ROOMS = [
  {
    id: "living-room-1",
    label: "Living room 1",
    amenities: "Sofa · Air conditioning · Ceiling fan · TV",
    thumb: living1a,
    photos: [
      living1a,
      living1b,
      living1c,
    ],
  },
  {
    id: "living-room-2",
    label: "Living room 2",
    amenities: "Ceiling fan · Hot tub",
    thumb: living2a,
    photos: [
      living2a,
      living2b,
      living2c,
      living2d,
      living2e,
    ],
  },
  {
    id: "full-kitchen",
    label: "Full kitchen",
    amenities:
      "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
    thumb: kitchen1a,
    photos: [
      kitchen1a,
      kitchen1b,
    ],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    amenities:
      "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
    thumb: bedroom1a,
    photos: [
      bedroom1a,
      bedroom1b,
      bedroom1c,
      bedroom1d,
      bedroom1e,
      bedroom1f,
    ],
  },
  {
    id: "full-bathroom",
    label: "Full bathroom",
    amenities: "Hairdryer · Hot water · Shampoo · Shower gel",
    thumb: bathroom1a,
    photos: [
      bathroom1a,
    ],
  },
  {
    id: "gym",
    label: "Gym",
    amenities: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
    thumb: gym1a,
    photos: [
      gym1a,
      gym1b,
      gym1c,
      gym1d,
      gym1e,
    ],
  },
  {
    id: "exterior",
    label: "Exterior",
    amenities: "",
    thumb: ext1a,
    photos: [
      ext1a,
      ext1b,
      ext1c,
      ext1d,
      ext1e,
      ext1f,
    ],
  },
  {
    id: "pool",
    label: "Pool",
    amenities: "",
    thumb: pool1a,
    photos: [
      pool1a,
      pool1b,
      pool1c,
    ],
  },
  {
    id: "additional",
    label: "Additional photos",
    amenities: "",
    thumb: add1a,
    photos: [
      add1a,
      add1b,
      add1c,
      add1d,
      add1e,
    ],
  },
]

/* Flat list of ALL tour photos in display order — used internally for Lightbox index mapping */
const TOUR_PHOTOS_FLAT = ROOMS.flatMap(r => r.photos)

export default function PhotoTourModal({ isOpen, initialCategory, openerRef, onClose, onImageClick }) {
  const containerRef = useRef(null)
  const contentRef   = useRef(null)
  useFocusTrap(containerRef, isOpen)

  /* Restore focus to the element that opened the modal, then close */
  const handleClose = useCallback(() => {
    openerRef?.current?.focus()
    onClose()
  }, [openerRef, onClose])

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, handleClose])

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Scroll into section when thumbnail clicked */
  const scrollToRoom = (id, behavior = 'smooth') => {
    const el = document.getElementById(`photo-tour-room-${id}`)
    if (el && contentRef.current) {
      contentRef.current.scrollTo({
        top: el.offsetTop - 16,
        behavior,
      })
    }
  }

  /* Jump to initial category when opened */
  useEffect(() => {
    if (isOpen && initialCategory) {
      const t = setTimeout(() => {
        scrollToRoom(initialCategory, 'auto')
      }, 50)
      return () => clearTimeout(t)
    }
  }, [isOpen, initialCategory])

  if (!isOpen) return null


  return createPortal(
    <div
      className="photo-tour-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      ref={containerRef}
    >
      {/* ── Top bar ── */}
      <div className="photo-tour-topbar">
        {/* Back button */}
        <button
          className="photo-tour-back-btn"
          onClick={handleClose}
          id="photoTourCloseBtn"
          aria-label="Close photo tour"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Centered title */}
        <h1 className="photo-tour-topbar-title">Photo tour</h1>

        {/* Right actions */}
        <div className="photo-tour-topbar-actions">
          <button className="photo-tour-action-btn" aria-label="Share">
            <Upload size={16} /> Share
          </button>
          <button className="photo-tour-action-btn" aria-label="Save">
            <Heart size={16} /> Save
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="photo-tour-content" ref={contentRef}>

        {/* ── Thumbnail grid at top ── */}
        <nav className="photo-tour-thumbs" aria-label="Jump to room">
          {ROOMS.map(room => (
            <button
              key={room.id}
              className="photo-tour-thumb-btn"
              onClick={() => scrollToRoom(room.id)}
              aria-label={`Jump to ${room.label}`}
            >
              <img
                src={room.thumb}
                alt={room.label}
                className="photo-tour-thumb-img"
                loading="lazy"
              />
              <span className="photo-tour-thumb-label">{room.label}</span>
            </button>
          ))}
        </nav>

        {/* ── Per-room sections ── */}
        {ROOMS.map(room => (
          <section
            key={room.id}
            id={`photo-tour-room-${room.id}`}
            className="photo-tour-section"
          >
            {/* LEFT — sticky title + amenities */}
            <div className="photo-tour-section-left">
              <h2>{room.label}</h2>
              {room.amenities && (
                <p className="photo-tour-amenities">{room.amenities}</p>
              )}
            </div>

            {/* RIGHT — hero + subgrid */}
            <div className="photo-tour-section-right">
              {/* Hero (first photo — full width) */}
              {room.photos[0] && (
                <div
                  className="photo-tour-hero-wrap"
                  onClick={() => onImageClick?.(TOUR_PHOTOS_FLAT, TOUR_PHOTOS_FLAT.indexOf(room.photos[0]))}
                >
                  <img
                    src={room.photos[0]}
                    alt={`${room.label} — photo 1`}
                    className="photo-tour-hero-img"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Remaining photos — 2-column subgrid */}
              {room.photos.length > 1 && (
                <div className="photo-tour-subgrid">
                  {room.photos.slice(1).map((src, i) => (
                    <div
                      key={i}
                      className="photo-tour-subgrid-item"
                      onClick={() => onImageClick?.(TOUR_PHOTOS_FLAT, TOUR_PHOTOS_FLAT.indexOf(src))}
                    >
                      <img
                        src={src}
                        alt={`${room.label} — photo ${i + 2}`}
                        className="photo-tour-subgrid-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>,
    document.body
  )
}

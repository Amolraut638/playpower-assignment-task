import { useState, useEffect } from 'react'
import {
  Utensils, Wifi, Monitor, Car, Waves, Bath, PawPrint,
  Camera, BellOff,
  Wind, SprayCan, Droplets, Thermometer, FlaskConical,
  WashingMachine, Shirt, BedDouble, Blinds, Flame,
  Baby, Tv, AirVent, Fan,
  Refrigerator, Microwave, Coffee, Wine, Sandwich, Blend,
  DoorOpen, Trees, UtensilsCrossed, Dumbbell, CalendarDays,
  KeyRound, Sparkles, X,
} from 'lucide-react'
import './AmenitiesGrid.css'

/* ──────────────────────────────────────────
   DATA: Main visible grid (10 items from reference)
────────────────────────────────────────── */
const MAIN_AMENITIES = [
  { icon: Utensils,  label: 'Kitchen' },
  { icon: Wifi,      label: 'Wifi' },
  { icon: Monitor,   label: 'Dedicated workspace' },
  { icon: Car,       label: 'Free parking on premises' },
  { icon: Waves,     label: 'Pool' },
  { icon: Bath,      label: 'Hot tub' },
  { icon: PawPrint,  label: 'Pets allowed' },
  { icon: Camera,    label: 'Exterior security cameras on property' },
  { icon: BellOff,   label: 'Carbon monoxide alarm', na: true },
  { icon: BellOff,   label: 'Smoke alarm',           na: true },
]

/* ──────────────────────────────────────────
   DATA: All amenities by category (modal)
────────────────────────────────────────── */
const ALL_CATEGORIES = [
  {
    name: 'Bathroom',
    items: [
      { icon: Wind,         label: 'Hairdryer' },
      { icon: SprayCan,     label: 'Cleaning products' },
      { icon: Droplets,     label: 'Shampoo' },
      { icon: Thermometer,  label: 'Hot water' },
      { icon: FlaskConical, label: 'Shower gel' },
    ],
  },
  {
    name: 'Bedroom and laundry',
    items: [
      { icon: WashingMachine, label: 'Washing machine' },
      { icon: Shirt,          label: 'Hangers' },
      { icon: BedDouble,      label: 'Bed linen' },
      { icon: Blinds,         label: 'Room-darkening blinds' },
      { icon: Shirt,          label: 'Iron' },
      { icon: Shirt,          label: 'Clothes storage' },
      { icon: Baby,           label: 'Cot' },
    ],
  },
  {
    name: 'Entertainment',
    items: [
      { icon: Tv, label: 'TV' },
    ],
  },
  {
    name: 'Family',
    items: [
      { icon: Baby, label: 'Cot' },
    ],
  },
  {
    name: 'Heating and cooling',
    items: [
      { icon: AirVent, label: 'Air conditioning' },
      { icon: Fan,     label: 'Ceiling fan' },
    ],
  },
  {
    name: 'Home safety',
    items: [
      { icon: Camera,  label: 'Exterior security cameras on property' },
      { icon: BellOff, label: 'Carbon monoxide alarm', na: true },
      { icon: BellOff, label: 'Smoke alarm',           na: true },
    ],
  },
  {
    name: 'Internet and office',
    items: [
      { icon: Wifi,    label: 'Wifi' },
      { icon: Monitor, label: 'Dedicated workspace' },
    ],
  },
  {
    name: 'Kitchen and dining',
    items: [
      { icon: Utensils,        label: 'Kitchen' },
      { icon: Refrigerator,    label: 'Fridge' },
      { icon: Refrigerator,    label: 'Freezer' },
      { icon: Microwave,       label: 'Microwave' },
      { icon: Flame,           label: 'Cooking basics' },
      { icon: UtensilsCrossed, label: 'Crockery and cutlery' },
      { icon: Coffee,          label: 'Kettle' },
      { icon: Coffee,          label: 'Coffee' },
      { icon: Wine,            label: 'Wine glasses' },
      { icon: Sandwich,        label: 'Toaster' },
      { icon: Blend,           label: 'Blender' },
      { icon: Flame,           label: 'Cooker' },
    ],
  },
  {
    name: 'Location features',
    items: [
      { icon: DoorOpen, label: 'Private entrance' },
    ],
  },
  {
    name: 'Outdoor',
    items: [
      { icon: Trees, label: 'Patio or balcony' },
      { icon: Trees, label: 'Outdoor dining area' },
    ],
  },
  {
    name: 'Parking and facilities',
    items: [
      { icon: Car,      label: 'Free parking on premises' },
      { icon: Waves,    label: 'Pool' },
      { icon: Bath,     label: 'Hot tub' },
      { icon: Dumbbell, label: 'Gym' },
    ],
  },
  {
    name: 'Services',
    items: [
      { icon: PawPrint,     label: 'Pets allowed' },
      { icon: Sparkles,     label: 'Cleaning available during stay' },
      { icon: CalendarDays, label: 'Long-term stays allowed' },
      { icon: KeyRound,     label: 'Self check-in' },
    ],
  },
]

/* ──────────────────────────────────────────
   AMENITIES MODAL
────────────────────────────────────────── */
function AmenitiesModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="amenities-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="All amenities"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="amenities-modal">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
          <h2 className="modal-title">What this place offers</h2>
        </div>

        <div className="modal-body">
          {ALL_CATEGORIES.map(({ name, items }) => (
            <div className="amenity-category" key={name}>
              <h3 className="amenity-category-name">{name}</h3>
              {items.map(({ icon: Icon, label, na }) => (
                <div
                  key={`${name}-${label}`}
                  className={`modal-amenity-row${na ? ' modal-amenity-row--na' : ''}`}
                >
                  <Icon className="modal-amenity-icon" size={24} />
                  <span className="modal-amenity-label">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────── */
export default function AmenitiesGrid() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="amenities" id="amenities">
        <h2 className="amenities-heading">What this place offers</h2>

        <div className="amenities-grid">
          {MAIN_AMENITIES.map(({ icon: Icon, label, na }) => (
            <div
              key={label}
              className={`amenity-row${na ? ' amenity-row--na' : ''}`}
            >
              <Icon className="amenity-icon" size={24} />
              <span className="amenity-label">{label}</span>
            </div>
          ))}
        </div>

        <button
          className="show-amenities-btn"
          id="showAmen"
          aria-haspopup="dialog"
          onClick={() => setShowModal(true)}
        >
          Show all 50 amenities
        </button>
      </div>

      {showModal && <AmenitiesModal onClose={() => setShowModal(false)} />}
    </>
  )
}

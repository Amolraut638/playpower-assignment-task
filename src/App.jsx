import { useState, useRef } from 'react'

/* Layout */
import Header from './components/layout/Header'
import StickyScrollHeader from './components/layout/StickyScrollHeader'
import ContentLayout from './components/layout/ContentLayout'
import SiteFooter from './components/layout/SiteFooter'

/* Listing sections */
import TitleSection from './components/listing/TitleSection'
import HeroGallery from './components/listing/HeroGallery'
import PropertyHeader from './components/listing/PropertyHeader'
import HostCard from './components/listing/HostCard'
import GuestFavoriteBadge from './components/listing/GuestFavoriteBadge'
import HighlightsList from './components/listing/HighlightsList'
import DescriptionArea from './components/listing/DescriptionArea'
import SleepingArrangements from './components/listing/SleepingArrangements'
import AmenitiesGrid from './components/listing/AmenitiesGrid'
import AvailabilityCalendar from './components/listing/AvailabilityCalendar'
import BookingWidget from './components/listing/BookingWidget'
import ReviewsSection from './components/listing/ReviewsSection'
import LocationSection from './components/listing/LocationSection'
import MeetYourHost from './components/listing/MeetYourHost'
import ThingsToKnow from './components/listing/ThingsToKnow'
import NearbyStays from './components/listing/NearbyStays'

/* Modals */
import PhotoTourModal from './components/modals/PhotoTourModal'
import Lightbox from './components/modals/Lightbox'

import './App.css'
import { PRICE_PER_NIGHT, CLEANING_FEE, SERVICE_FEE } from './constants/pricing'

/* aria-live container for screen-reader announcements (Phase 23) */
function LiveRegion({ announcement }) {
  return (
    <div
      id="sr-live"
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement}
    </div>
  )
}

function App() {
  /* ── Modal state ── */
  const [photoTourOpen, setPhotoTourOpen] = useState(false) // to toggle photo tour
  const [photoTourCategory, setPhotoTourCategory] = useState(null) // to go to the selected category in photo tour
  const [lightboxOpen, setLightboxOpen] = useState(false) // to toggle the light box
  const [lightboxImages, setLightboxImages] = useState([]) // to store the images for the light box
  const [lightboxIndex, setLightboxIndex] = useState(0) // to store the index of the image to be shown first
  const [srAnnouncement, setSrAnnouncement] = useState('') // for screen reader announcements

  /* ── Booking state (single source of truth) ── */
  const [checkIn,  setCheckIn]  = useState(null)  // null = no date selected
  const [checkOut, setCheckOut] = useState(null)
  const [guests,   setGuests]   = useState(2)

  /* ── Derived booking values — null when no valid range ── */
  const hasValidDates = checkIn && checkOut && checkOut > checkIn
  const nights     = hasValidDates ? Math.ceil((checkOut - checkIn) / 86400000) : null
  const totalPrice = hasValidDates ? PRICE_PER_NIGHT * nights + CLEANING_FEE + SERVICE_FEE : null

  /* ── Booking callbacks — children call these to update shared state ── */
  const handleGuestsChange = (n) => setGuests(n)
  const handleDateChange   = (ci, co) => { setCheckIn(ci); setCheckOut(co) }

  /**
   * openLightbox(images, idx)
   * - images : string[] — the photo set to display (hero gallery OR tour)
   * - idx    : number  — which photo to show first (0-based)
   */

  /* Tracks which element triggered the currently-open modal so focus can be restored on close */
  const openerRef = useRef(null)

  const openLightbox = (images, idx) => {
    openerRef.current = document.activeElement
    setLightboxImages(images)
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }
  /*
    HeroGallery
    ↓
    onPhotoClick(images, 3)
    ↓
    App
    ↓
    openLightbox(images, 3)
    ↓
    lightboxImages updated
    ↓
    lightboxIndex updated
    ↓
    lightboxOpen = true
    ↓
    React re-renders
    ↓
    Lightbox receives new props
    ↓
    Lightbox opens 
  */


  const openPhotoTour = (category = null) => {
    openerRef.current = document.activeElement
    setPhotoTourCategory(category)
    setPhotoTourOpen(true)
  }

  /* 
    User clicks Bedroom
    ↓
    HeroGallery
    ↓
    onPhotoClick()
    ↓
    openPhotoTour("bedroom")
    ↓
    photoTourCategory = "bedroom"
    ↓
    photoTourOpen = true
    ↓
    PhotoTourModal
    ↓
    Starts at Bedroom section
  */

  return (
    <>
      <LiveRegion announcement={srAnnouncement} />
      <Header />
      <StickyScrollHeader nights={nights} totalPrice={totalPrice} />

      <main id="main" style={{ paddingTop: '88px' }}>
        {/* Phase 6 */}
        <TitleSection />

        {/* Hero gallery — clicking a photo opens the Photo Tour at the matched category */}
        <HeroGallery
          onPhotoClick={(photos, idx) => {
            const categories = ['living-room-1', 'bedroom', 'full-kitchen', 'gym', 'exterior']
            openPhotoTour(categories[idx] || null)
          }}
          onShowAll={() => openPhotoTour(null)}
        />


        {/*
          User
          ↓
          Clicks Image
          ↓
          HeroGallery
          ↓ 
          onPhotoClick(images, idx)
          ↓
          App receives callback
          ↓
          categories[idx]
          ↓
          openPhotoTour(category)
          ↓
          setPhotoTourCategory()
          ↓
          setPhotoTourOpen(true)
          ↓
          PhotoTourModal
          ↓
          User sees Photo Tour
        */}

        {/* Phase 7: Two-column layout — sticky booking widget on right */}
        <ContentLayout
          left={
            <>
              <PropertyHeader />
              <GuestFavoriteBadge />
              <HostCard />
              <HighlightsList />
              <DescriptionArea />
              <SleepingArrangements />
              <AmenitiesGrid />
              <AvailabilityCalendar
                checkIn={checkIn}
                checkOut={checkOut}
                onDateChange={handleDateChange}
              />
            </>
          }
          right={
            <BookingWidget
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              nights={nights}
              totalPrice={totalPrice}
              onGuestsChange={handleGuestsChange}
            />
          }
        />

        {/* ── Full-width sections ── */}
        <div className="listing-fullwidth">
          <ReviewsSection />
          <LocationSection />
          <MeetYourHost />
          <ThingsToKnow />
          <NearbyStays />
        </div>
      </main>

      <SiteFooter />

      {/* ── Photo Tour Modal (Phase 21) ──
          Clicking a photo: passes (TOUR_PHOTOS_FLAT, globalIdx) to us.
          We close the tour and open the Lightbox at that exact photo. */}
      <PhotoTourModal
        isOpen={photoTourOpen}
        initialCategory={photoTourCategory}
        openerRef={openerRef}
        onClose={() => {
          setPhotoTourOpen(false)
          setPhotoTourCategory(null)
        }}
        onImageClick={(photos, idx) => {
          setPhotoTourOpen(false)
          openLightbox(photos, idx)
        }}
      />


      {/* ── Lightbox (Phase 22) ──
          images and index come from whichever source opened it.
          Keyboard ← → navigate, Escape closes. */}
      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        isOpen={lightboxOpen}
        openerRef={openerRef}
        onClose={() => setLightboxOpen(false)}
        onChange={(idx) => {
          setLightboxIndex(idx)
          setSrAnnouncement(`Photo ${idx + 1} of ${lightboxImages.length}`)
        }}
      />
    </>
  )
}

export default App

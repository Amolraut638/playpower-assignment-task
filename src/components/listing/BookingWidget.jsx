import './BookingWidget.css'
import { PRICE_PER_NIGHT, CLEANING_FEE, SERVICE_FEE } from '../../constants/pricing'
const MAX_GUESTS      = 6

/* ── Helpers ── */
const fmtDate = (d) => {
  if (!d) return 'Add date'
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}
const fmtINR = (n) => `\u20b9${Number(n).toLocaleString('en-IN')}`

/* Format a date as "17 October" style for the cancellation notice */
const fmtCancellationDate = (d) => {
  if (!d) return ''
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${d.getDate()} ${months[d.getMonth()]}`
}

/* ── Green tag icon ── */
const TagIcon = () => (
  <svg viewBox="0 0 32 32" width="22" height="22" fill="#3d8b4a" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M30.9 15.1L16.9 1.1A3 3 0 0 0 14.8.3L3.5.3A3.1 3.1 0 0 0 .3 3.5L.3 14.8a3 3 0 0 0 .9 2.1L15.1 30.9a3 3 0 0 0 4.2 0l11.6-11.6a3 3 0 0 0 0-4.2zM7 9a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
  </svg>
)

/* ── Flag icon ── */
const FlagIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M14.9 2.6a.8.8 0 0 0-.8-.1C12.7 3 11.6 3.1 10.5 3c-1.4-.2-2.7-.9-4.1-1-1.1-.1-2.3.1-3.4.6V2a1 1 0 0 0-2 0v13a1 1 0 0 0 2 0v-4.3c1-.4 2-.6 3.1-.5 1.4.2 2.7.9 4.1 1 1.4.1 2.9-.2 4.2-.9a.9.9 0 0 0 .5-.8V3.4a.9.9 0 0 0-.5-.8z" />
  </svg>
)

/* ── Component ── */
export default function BookingWidget({
  checkIn,
  checkOut,
  guests,
  nights,       // null when no valid range
  totalPrice,   // null when no valid range
  onGuestsChange,
}) {
  const hasValidDates = nights != null && nights > 0
  const subtotal = hasValidDates ? PRICE_PER_NIGHT * nights : null

  return (
    <div className="booking-outer">

      {/* ── Discount banner ── */}
      <div className="booking-discount-card">
        <div className="booking-discount-icon"><TagIcon /></div>
        <div className="booking-discount-body">
          <span className="booking-discount-line1">Get 10% off your next stay.</span>
          <div className="booking-discount-line2">
            <a href="#" onClick={e => e.preventDefault()}>Terms apply</a>
          </div>
        </div>
        <button className="booking-claim-btn">Claim</button>
      </div>

      {/* ── Main booking card ── */}
      <div className="booking-card">

        {/* Price header — shown only when valid date range exists */}
        <div className="booking-price-row">
          {hasValidDates ? (
            <>
              <span className="booking-price">{fmtINR(totalPrice)}</span>
              <span className="booking-price-sub">for {nights} night{nights !== 1 ? 's' : ''}</span>
            </>
          ) : (
            <span className="booking-price-sub booking-price-sub--prompt">
              Add dates to see the total price
            </span>
          )}
        </div>

        {/* Dates + Guests box */}
        <div className="booking-dates-box">
          <div className="booking-top-row">
            <div className="booking-date-cell" id="bookCheckin">
              <span className="booking-cell-label">Check-in</span>
              <span className="booking-cell-value">{fmtDate(checkIn)}</span>
            </div>
            <div className="booking-date-cell" id="bookCheckout">
              <span className="booking-cell-label">Checkout</span>
              {/* When check-in is set but check-out is missing, prompt clearly */}
              <span className="booking-cell-value">
                {checkIn && !checkOut ? 'Select date' : fmtDate(checkOut)}
              </span>
            </div>
          </div>

          {/* Guests row */}
          <div className="booking-guests-row" id="bookGuests">
            <div className="booking-guests-info">
              <span className="booking-cell-label">Guests</span>
              <span className="booking-cell-value">{guests} guest{guests !== 1 ? 's' : ''}</span>
            </div>
            <div className="booking-guest-controls">
              <button
                className="guest-ctrl-btn"
                onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                disabled={guests <= 1}
                aria-label="Remove guest"
              >−</button>
              <button
                className="guest-ctrl-btn"
                onClick={() => onGuestsChange(Math.min(MAX_GUESTS, guests + 1))}
                disabled={guests >= MAX_GUESTS}
                aria-label="Add guest"
              >+</button>
            </div>
          </div>
        </div>

        {/* Cancellation notice — only meaningful when dates are chosen */}
        {hasValidDates && (() => {
          const cancelBy = new Date(checkIn)
          cancelBy.setDate(cancelBy.getDate() - 1)
          return (
            <p className="booking-cancellation">
              Free cancellation before <strong>{fmtCancellationDate(cancelBy)}</strong>
            </p>
          )
        })()}

        <button className="booking-reserve-btn" id="reserveBtn">Reserve</button>
        <p className="booking-disclaimer">You won't be charged yet</p>

        {/* ── Price breakdown — only rendered when a valid range exists ── */}
        {hasValidDates && (
          <div className="booking-breakdown">
            <div className="breakdown-row">
              <span className="breakdown-label breakdown-label--link">
                {fmtINR(PRICE_PER_NIGHT)} &times; {nights} night{nights !== 1 ? 's' : ''}
              </span>
              <span className="breakdown-value">{fmtINR(subtotal)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label breakdown-label--link">Cleaning fee</span>
              <span className="breakdown-value">{fmtINR(CLEANING_FEE)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label breakdown-label--link">Airbnb service fee</span>
              <span className="breakdown-value">{fmtINR(SERVICE_FEE)}</span>
            </div>
            <div className="breakdown-row breakdown-row--total">
              <span className="breakdown-label">Total (INR)</span>
              <span className="breakdown-value">{fmtINR(totalPrice)}</span>
            </div>
          </div>
        )}

      </div>

      <button className="booking-report" id="reportListing">
        <FlagIcon />
        Report this listing
      </button>

    </div>
  )
}

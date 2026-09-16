import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './AvailabilityCalendar.css'

/* ── Constants ── */
const DAY_NAMES      = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/* Host-blocked/unavailable dates — shown grayed with diagonal dash */
const UNAVAILABLE = new Set([
  '2026-10-07', '2026-10-08', '2026-10-09',
  '2026-10-13', '2026-10-14',
  '2026-10-26', '2026-10-27', '2026-10-28',
  '2026-11-04', '2026-11-05', '2026-11-06',
  '2026-11-11', '2026-11-12',
  '2026-11-20', '2026-11-21', '2026-11-22',
])

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate()
}

function isBetween(date, start, end) {
  return date > start && date < end
}

function buildDays(year, month) {
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}

/**
 * rangeContainsUnavailable — checks checkout date itself AND every
 * intermediate date strictly between checkIn and checkOut.
 * Iterates day-by-day so it is month-boundary safe.
 *
 * Returns true  → range is BLOCKED (contains unavailable date)
 * Returns false → range is CLEAN
 */
function rangeContainsUnavailable(checkIn, checkOut) {
  // Checkout date itself must be available
  if (UNAVAILABLE.has(toKey(checkOut))) return true

  // Walk every day strictly between checkIn and checkOut
  const cursor = new Date(checkIn)
  cursor.setDate(cursor.getDate() + 1) // start day after checkIn

  while (cursor < checkOut) {
    if (UNAVAILABLE.has(toKey(cursor))) return true
    cursor.setDate(cursor.getDate() + 1)
  }
  return false
}

/* ── Single month ── */
function CalMonth({ year, month, checkIn, checkOut, hoverDate, onPrev, onNext, showPrev, showNext, onDayClick, onDayHover }) {
  const days  = buildDays(year, month)
  const today = new Date(); today.setHours(0, 0, 0, 0)

  return (
    <div className="cal-month">
      {/* Header */}
      <div className="cal-month-header">
        <button
          className="cal-nav-btn"
          onClick={onPrev}
          disabled={!showPrev}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="cal-month-name">{MONTH_NAMES[month]} {year}</span>

        <button
          className="cal-nav-btn"
          onClick={onNext}
          disabled={!showNext}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day name headers */}
      <div className="cal-day-names">
        {DAY_NAMES.map((n, i) => (
          <div className="cal-day-name" key={i}>
            <abbr title={DAY_NAMES_FULL[i]}>{n}</abbr>
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="cal-days">
        {days.map((date, idx) => {
          if (!date) {
            return <div className="cal-cell cal-cell--empty" key={`e${idx}`} />
          }

          const isPast        = date < today
          const isUnavailable = !isPast && UNAVAILABLE.has(toKey(date))
          const isDisabled    = isPast || isUnavailable
          const isStart       = checkIn  && sameDay(date, checkIn)
          const isEnd         = checkOut && sameDay(date, checkOut)

          /* Range preview: when check-in is set but check-out isn't, use hoverDate */
          const rangeEnd = checkOut || hoverDate
          const inRange  = checkIn && rangeEnd && !checkOut
            ? isBetween(date, checkIn, rangeEnd)
            : checkIn && checkOut && isBetween(date, checkIn, checkOut)

          const classes = [
            'cal-cell',
            isDisabled    ? 'cal-cell--disabled'    : 'cal-cell--available',
            isUnavailable ? 'cal-cell--unavailable' : '',
            isStart       ? 'cal-cell--start'       : '',
            isEnd         ? 'cal-cell--end'         : '',
            inRange       ? 'cal-cell--in-range'    : '',
          ].filter(Boolean).join(' ')

          return (
            <button
              key={date.toISOString()}
              className={classes}
              onClick={() => !isDisabled && onDayClick(date)}
              onMouseEnter={() => !isDisabled && onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              disabled={isDisabled}
              aria-label={date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              aria-pressed={isStart || isEnd}
            >
              <span className="cal-day-num">{date.getDate()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function AvailabilityCalendar({ checkIn, checkOut, onDateChange }) {
  const [leftYear,  setLeftYear]  = useState(2026)
  const [leftMonth, setLeftMonth] = useState(9)  // October

  /* Hover state for range preview (only relevant while selecting check-out) */
  const [hoverDate, setHoverDate] = useState(null)

  /*
   * invalidRangeMsg — set when the user picks a checkout that creates a blocked
   * range.  Displayed in the subtitle and announced via the inline aria-live
   * region.  Cleared on any new date interaction.
   */
  const [invalidRangeMsg, setInvalidRangeMsg] = useState('')

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1
  const rightYear  = leftMonth === 11 ? leftYear + 1 : leftYear

  const nights = checkIn && checkOut
    ? Math.ceil((checkOut - checkIn) / 86400000)
    : 0

  const goPrev = () => {
    if (leftMonth === 0) { setLeftMonth(11); setLeftYear(y => y - 1) }
    else setLeftMonth(m => m - 1)
  }
  const goNext = () => {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear(y => y + 1) }
    else setLeftMonth(m => m + 1)
  }

  /*
   * Date selection logic — Airbnb two-click pattern with availability validation:
   *
   *   No dates / both set → first click sets checkIn (resets any error)
   *   checkIn set, no checkOut:
   *     - same day        → clear both (restart)
   *     - earlier date    → becomes new checkIn
   *     - later date      → validate range:
   *         blocked range → keep checkIn, keep checkOut=null, show error
   *         clean range   → accept checkOut, clear error
   */
  const handleDayClick = (date) => {
    // Clear any previous error on every interaction
    setInvalidRangeMsg('')

    if (!checkIn || (checkIn && checkOut)) {
      // State A: no dates, or both already set → start fresh
      onDateChange(date, null)
    } else {
      // State B: checkIn set, checkOut not yet chosen
      if (sameDay(date, checkIn)) {
        // Same day → restart
        onDateChange(null, null)
      } else if (date < checkIn) {
        // Earlier date → becomes new checkIn
        onDateChange(date, null)
      } else {
        // date is after checkIn — validate the full range
        if (rangeContainsUnavailable(checkIn, date)) {
          // Reject: keep checkIn, leave checkOut null, show error message
          setInvalidRangeMsg(
            'Your selected range includes unavailable dates. Please choose a different checkout date.'
          )
          // Do NOT call onDateChange — leave state unchanged (checkIn kept, checkOut remains null)
        } else {
          // Accept the range
          onDateChange(checkIn, date)
          setHoverDate(null)
        }
      }
    }
  }

  const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  const headingText = () => {
    if (checkIn && checkOut) return nights + ' nights in Candolim'
    if (checkIn && !checkOut) return 'Select checkout date'
    return 'Select dates'
  }

  const subtitleText = () => {
    // If there is a validation error, show it in place of the normal subtitle
    if (invalidRangeMsg) return invalidRangeMsg
    if (checkIn && checkOut) return fmt(checkIn) + ' - ' + fmt(checkOut)
    if (checkIn && !checkOut) return fmt(checkIn) + ' → Add your checkout date'
    return 'Add your travel dates for exact pricing'
  }

  return (
    <div className="cal-section">
      <h2 className="cal-heading">{headingText()}</h2>

      {/*
        Dual-purpose: visible subtitle AND inline aria-live region.
        aria-live="polite" + aria-atomic="true" means the entire paragraph is
        re-announced whenever its text changes — the invalidRangeMsg is
        announced automatically when it appears, with no extra markup needed.
      */}
      <p
        className={`cal-date-range${invalidRangeMsg ? ' cal-date-range--error' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {subtitleText()}
      </p>

      <div className="cal-months">
        {/* Left month */}
        <CalMonth
          year={leftYear}
          month={leftMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          hoverDate={hoverDate}
          onPrev={goPrev}
          onNext={goNext}
          showPrev={true}
          showNext={false}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
        />

        {/* Right month */}
        <CalMonth
          year={rightYear}
          month={rightMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          hoverDate={hoverDate}
          onPrev={goPrev}
          onNext={goNext}
          showPrev={false}
          showNext={true}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
        />
      </div>

      {/* Footer */}
      <div className="cal-footer">
        <svg
          className="cal-keyboard-icon"
          viewBox="0 0 17 17"
          aria-hidden="true"
          focusable="false"
          style={{ display: 'block', width: '20px', height: '20px', fill: 'currentColor', opacity: 0.6 }}
        >
          <path d="M15.5 2h-14A1.5 1.5 0 0 0 0 3.5v10A1.5 1.5 0 0 0 1.5 15h14a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 15.5 2zM16 13.5a.5.5 0 0 1-.5.5h-14a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v10zM4.5 7h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-11 3h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm9 0h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm2 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-11-6h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
        </svg>
        <button
          className="cal-clear-btn"
          onClick={() => { setInvalidRangeMsg(''); onDateChange(null, null) }}
        >
          Clear dates
        </button>
      </div>
    </div>
  )
}

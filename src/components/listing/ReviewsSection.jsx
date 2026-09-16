import { useState } from 'react'
import {
  Sparkles, ShieldCheck, KeyRound, MessageCircle, MapPin, Tag as TagIcon,
  Sofa, Waves, Wrench, HeartHandshake, Gift, Star, Frame, Home,
} from 'lucide-react'
import './ReviewsSection.css'
import laurelLeft from "../../assets/laurel-left.png";
import laurelRight from "../../assets/laurel-right.png";

/* ──────────────────────────────────────────
   DATA
────────────────────────────────────────── */

const OVERALL_BARS = [
  { star: 5, pct: 94 },
  { star: 4, pct: 6 },
  { star: 3, pct: 0 },
  { star: 2, pct: 0 },
  { star: 1, pct: 0 },
]

const CATEGORY_RATINGS = [
  { label: 'Cleanliness', score: '5.0', Icon: Sparkles },
  { label: 'Accuracy', score: '5.0', Icon: ShieldCheck },
  { label: 'Check-in', score: '5.0', Icon: KeyRound },
  { label: 'Communication', score: '5.0', Icon: MessageCircle },
  { label: 'Location', score: '4.8', Icon: MapPin },
  { label: 'Value', score: '4.8', Icon: TagIcon },
]

const FILTER_TAGS = [
  { label: 'Comfort', count: 6, Icon: Sofa },
  { label: 'Accuracy', count: 5, Icon: ShieldCheck },
  { label: 'Hot tub', count: 5, Icon: Waves },
  { label: 'Condition', count: 4, Icon: Wrench },
  { label: 'Hospitality', count: 8, Icon: HeartHandshake },
  { label: 'Cleanliness', count: 4, Icon: Sparkles },
  { label: 'Amenities', count: 2, Icon: Gift },
  { label: 'Decor', count: 2, Icon: Frame },
  { label: 'Indoor spaces', count: 2, Icon: Home },
  { label: 'Location', count: 2, Icon: MapPin },
]

const REVIEWS = [
  {
    id: 1,
    name: 'Amit',
    tenure: '2 months on Airbnb',
    stars: 5,
    date: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    name: 'Aheesh',
    tenure: '3 years on Airbnb',
    stars: 5,
    date: '2 weeks ago',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    long: true,
  },
  {
    id: 3,
    name: 'Samiksha',
    tenure: '8 months on Airbnb',
    stars: 5,
    date: 'May 2026',
    text: 'the host nitish was really great help',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 4,
    name: 'Vedant',
    tenure: '4 years on Airbnb',
    stars: 5,
    date: 'May 2026',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    long: true,
  },
  {
    id: 5,
    name: 'Vaibhav S',
    tenure: '3 years on Airbnb',
    stars: 5,
    date: 'May 2026',
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: 6,
    name: 'Mohd',
    tenure: '5 years on Airbnb',
    stars: 5,
    date: 'May 2026',
    text: 'Great place. Exactly as described in the listing.',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
]

/* ──────────────────────────────────────────
   REVIEW CARD
────────────────────────────────────────── */
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="review-card">
      <div className="reviewer-row">
        <img
          className="reviewer-avatar"
          src={review.avatar}
          alt={`${review.name}'s profile`}
          loading="lazy"
        />
        <div className="reviewer-info">
          <span className="reviewer-name">{review.name}</span>
          <span className="reviewer-tenure">{review.tenure}</span>
        </div>
      </div>

      <div className="review-meta">
        <div className="review-stars">
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} className="review-star-icon" size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="review-date">· {review.date}</span>
      </div>

      <p className={`review-text${expanded ? ' review-text--expanded' : ''}`}>
        {review.text}
      </p>

      {review.long && (
        <button
          className="review-show-more"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────── */
export default function ReviewsSection() {
  return (
    <div className="reviews-section" id="reviews">

      {/* ── Header ── */}
      <div className="reviews-header">
        <div className="reviews-rating-row">
          <img src={laurelLeft} alt="" className="reviews-laurel-img" aria-hidden="true" />
          <span className="reviews-big-score">4.95</span>
          <img src={laurelRight} alt="" className="reviews-laurel-img" aria-hidden="true" />
        </div>
        <h2 className="reviews-title">Guest favourite</h2>
        <p className="reviews-subtitle">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>

        <a
          href="#"
          className="reviews-how-link"
          onClick={(e) => e.preventDefault()}
        >
          How reviews work
        </a>
      </div>

      {/* ── Ratings row: overall bar chart + category columns, single strip ── */}
      <div className="ratings-grid">
        <div className="overall-col">
          <h4>Overall rating</h4>
          {OVERALL_BARS.map(({ star, pct }) => (
            <div className="bar-row" key={star}>
              <span className="bar-star">{star}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {CATEGORY_RATINGS.map(({ label, score, Icon }) => (
          <div className="category-col" key={label}>
            <span className="category-name">{label}</span>
            <span className="category-score">{score}</span>
            <Icon className="category-icon" size={30} strokeWidth={1} />
          </div>
        ))}
      </div>

      {/* ── Filter chips ── */}
      <div className="filter-chips">
        {FILTER_TAGS.map(({ label, count, Icon }) => (
          <button className="filter-chip" key={label}>
            <Icon size={16} strokeWidth={2} className="filter-chip-icon" />
            <span className="filter-chip-label">{label}</span>
            <span className="filter-chip-count">{count}</span>
          </button>
        ))}
      </div>

      {/* ── 2-column review grid ── */}
      <div className="reviews-grid">
        {REVIEWS.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ── Show all button ── */}
      <button className="show-all-reviews-btn" id="showAllReviews">
        Show all 19 reviews
      </button>

    </div>
  )
}
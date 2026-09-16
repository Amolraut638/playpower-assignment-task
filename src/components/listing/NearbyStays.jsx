import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import './NearbyStays.css'


/* High-res luxury property photos (500×500 square crop, q=90) */
const NEARBY_STAYS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Beautiful Studio with a view to die for',
    price: '₹23,600',
    rating: '4.91',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'NAQAB - 1bhk with private pool',
    price: '₹42,218',
    rating: '4.95',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Greentique Luxury Flat with plunge pool, Calangute',
    price: '₹44,506',
    rating: '4.94',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'The Tropical Studio | 5 mins to Beach',
    price: '₹22,824',
    rating: '4.96',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
    price: '₹39,942',
    rating: '4.95',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Sunlit Loft near the old town square',
    price: '₹31,240',
    rating: '4.89',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Modern Villa with private garden',
    price: '₹56,780',
    rating: '4.97',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Cozy Cottage retreat, walk to the beach',
    price: '₹19,450',
    rating: '4.88',
  },
  {
    id: 9,
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&h=500&q=90',
    title: 'Chic Apartment with rooftop terrace',
    price: '₹34,900',
    rating: '4.93',
  },
]

/* Each 480px scroll reveals ~3 new cards (480 / (220px card + 16px gap) ≈ 2.03 cards,
   rounded up). TOTAL_PAGES is derived so it stays correct if cards are added/removed. */
const CARDS_PER_SCROLL = 3
const TOTAL_PAGES = Math.ceil(NEARBY_STAYS.length / CARDS_PER_SCROLL)

const StarFilled = () => (
  <Star size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
)

export default function NearbyStays() {
  const [page, setPage] = useState(1)
  const scrollRef = useRef(null)

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 480, behavior: 'smooth' })
    setPage(p => Math.max(1, Math.min(TOTAL_PAGES, p + dir)))
  }

  return (
    <div className="nearby-section">
      <div className="nearby-header">
        <h2 className="nearby-title">More stays nearby</h2>
        <div className="nearby-nav">
          <span className="nearby-counter">{page} / {TOTAL_PAGES}</span>
          <button
            className="nearby-arrow"
            onClick={() => scrollBy(-1)}
            disabled={page === 1}
            aria-label="Previous stays"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="nearby-arrow"
            onClick={() => scrollBy(1)}
            disabled={page === TOTAL_PAGES}
            aria-label="Next stays"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="nearby-scroll" ref={scrollRef}>
        {NEARBY_STAYS.map(stay => (
          <div className="stay-card" key={stay.id}>
            <div className="stay-img-wrap">
              <img
                src={stay.img}
                alt={stay.title}
                className="stay-img"
                loading="lazy"
              />
            </div>
            <p className="stay-title">{stay.title}</p>
            {/* Price + star + rating on one horizontal row */}
            <div className="stay-meta">
              <span className="stay-price">{stay.price}</span>
              <span className="stay-sep"> · </span>
              <StarFilled />
              <span className="stay-rating">{stay.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
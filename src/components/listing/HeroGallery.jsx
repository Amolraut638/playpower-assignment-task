import './HeroGallery.css'
import { LayoutGrid } from 'lucide-react'
import photo1 from "../../assets/living-room-1.jpeg";
import photo2 from "../../assets/bedroom-1.jpeg";
import photo3 from "../../assets/kitchen-1.jpeg";
import photo4 from "../../assets/gym-1.jpeg";
import photo5 from "../../assets/ext-1.jpeg";

const PHOTOS = [
  { src: photo1, loading: "eager", index: 1 },
  { src: photo2, loading: "lazy",  index: 2 },
  { src: photo3, loading: "lazy",  index: 3 },
  { src: photo4, loading: "lazy",  index: 4 },
  { src: photo5, loading: "lazy",  index: 5 },
]

/* Internal constant — used within this file only */
const HERO_PHOTOS = PHOTOS.map(p => p.src) // map creates new array  

const LISTING_TITLE = 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10'

export default function HeroGallery({ onPhotoClick, onShowAll }) {
  return (
    <section
      className="hero-section"
      id="_LYTWdd"
      aria-label="Photos of this place"
    >
      <div className="hero-section-inner">
        {/* 5-photo collage grid */}
        <div className="hero-grid" id="heroGrid">
          {PHOTOS.map(({ src, loading, index }) => (
            <button
              key={index}
              className="hero-photo-btn"
              type="button"
              aria-label={`${LISTING_TITLE} image ${index}`}
              onClick={() => onPhotoClick?.(HERO_PHOTOS, index - 1)}
            >
              <img
                src={src}
                alt=""
                decoding="async"
                loading={loading}
              />
            </button>
          ))}
        </div>

        {/* Show all photos button */}
        <button
          className="show-all-btn"
          type="button"
          id="showAllPhotos"
          onClick={() => onShowAll?.()}
        >
          <LayoutGrid className="show-all-btn-icon" size={16} aria-hidden="true" />
          Show all photos
        </button>
      </div>
    </section>
  )
}
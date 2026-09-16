import "./GuestFavoriteBadge.css";

import laurelLeft from "../../assets/laurel-left.png";
import laurelRight from "../../assets/laurel-right.png";
import { Star } from "lucide-react";

export default function GuestFavoriteBadge() {
  return (
    <div className="guest-favorite">

      {/* Laurels + Title */}
      <div className="gf-header">

        <img
          src={laurelLeft}
          alt=""
          className="gf-laurel-image"
          aria-hidden="true"
        />

        <span className="gf-title">
          Guest
          <br />
          favourite
        </span>

        <img
          src={laurelRight}
          alt=""
          className="gf-laurel-image"
          aria-hidden="true"
        />

      </div>

      {/* Description */}
      <p className="gf-description">
        One of the most loved homes on Airbnb, according to guests
      </p>

      {/* Rating */}
      <div className="gf-metrics">
        <div className="gf-metric">
          <span className="gf-score">4.95</span>

          <div
            className="gf-stars"
            aria-label="Rating: 4.95 out of 5"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Star 
                key={i} 
                className="gf-star" 
                style={{ fill: "currentColor" }} 
              />
            ))}
          </div>
        </div>

        <div className="gf-divider" aria-hidden="true" />

        <div className="gf-metric">
          <span className="gf-count">19</span>
          <span className="gf-label">Reviews</span>
        </div>
      </div>

    </div>
  );
}

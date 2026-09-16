import "./SleepingArrangements.css";

import bedroomImage from "../../assets/bedroom-1.jpeg";
import livingRoomImage from "../../assets/living-room-2.jpeg";

/* ── Room data ── */
const ROOMS = [
  {
    src: bedroomImage,
    name: "Bedroom",
    bed: "1 double bed",
  },
  {
    src: livingRoomImage,
    name: "Living room",
    bed: "1 sofa",
  },
];

export default function SleepingArrangements() {
  return (
    <div className="sleeping">
      <h2 className="sleeping-heading">Where you'll sleep</h2>

      <div className="sleeping-cards">
        {ROOMS.map(({ src, name, bed }) => (
          <div className="sleep-card" key={name}>
            <div className="sleep-card-img-wrap">
              <img
                className="sleep-card-img"
                src={src}
                alt={name}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="sleep-card-body">
              <div className="sleep-card-name">{name}</div>
              <div className="sleep-card-bed">{bed}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
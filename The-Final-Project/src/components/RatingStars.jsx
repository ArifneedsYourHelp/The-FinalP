export default function RatingStars({ value = 0, count }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "☆";
    return "☆";
  });
  return (
    <div className="rating">
      <span className="stars" aria-label={`Rating ${value} out of 5`}>
        {stars.join(" ")}
      </span>
      <span className="rating-text">
        {value?.toFixed ? value.toFixed(1) : value}
        {count ? ` (${count})` : ""}
      </span>
    </div>
  );
}

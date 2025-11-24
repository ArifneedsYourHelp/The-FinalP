import RatingStars from "./RatingStars";

export default function ReviewList({ reviews, title = "Reviews" }) {
  if (!reviews || reviews.length === 0)
    return (
      <div className="reviews">
        <h3>{title}</h3>
        <div className="muted">No reviews yet.</div>
      </div>
    );
  return (
    <div className="reviews">
      <h3>{title}</h3>
      <ul className="review-list">
        {reviews.map((r, idx) => (
          <li key={idx} className="review">
            <div className="review-head">
              <strong>{r.user || "Anonymous"}</strong>
              <RatingStars value={Number(r.rating) || 0} />
            </div>
            <div className="review-body">{r.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

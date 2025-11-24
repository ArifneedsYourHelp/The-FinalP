import { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");

  const handle = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    onSubmit({ rating, user, comment });
    setRating(5);
    setUser("");
    setComment("");
  };

  return (
    <form className="review-form" onSubmit={handle}>
      <div className="field">
        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Name (optional)</label>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="field">
        <label>Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
        />
      </div>
      <button className="btn" type="submit">
        Submit Review
      </button>
    </form>
  );
}

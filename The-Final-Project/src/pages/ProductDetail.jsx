import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getProductReviews } from "../utils/api";
import { addUserReview, getUserReviews } from "../utils/reviews";
import { calcDiscountedPrice, money } from "../utils/format";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [apiReviews, setApiReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [prod, apiRevs] = await Promise.all([
          getProduct(id),
          getProductReviews(id),
        ]);
        if (!mounted) return;
        setProduct(prod);
        setApiReviews(apiRevs);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    setUserReviews(getUserReviews(id));
    return () => {
      mounted = false;
    };
  }, [id]);

  const dynamicRating = useMemo(() => {
    const api = apiReviews;
    const user = userReviews;
    const all = [...api, ...user];
    if (all.length === 0) return product?.rating || 0;
    const sum = all.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return Math.round((sum / all.length) * 10) / 10;
  }, [apiReviews, userReviews, product]);

  if (loading)
    return (
      <section className="container">
        <div className="muted">Loading product...</div>
      </section>
    );
  if (!product)
    return (
      <section className="container">
        <div className="muted">Product not found.</div>
      </section>
    );

  const price = calcDiscountedPrice(product.price, product.discountPercentage);

  const submitReview = (rev) => {
    const list = addUserReview(id, rev);
    setUserReviews(list);
  };

  return (
    <section className="container product-detail">
      <div className="detail-grid">
        <div className="detail-images">
          <img
            className="hero"
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />
          <div className="thumbs">
            {(product.images || []).slice(0, 5).map((src, i) => (
              <img key={i} className="mini" src={src} alt={`Image ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="detail-info">
          <h1>{product.title}</h1>
          <RatingStars value={dynamicRating} />
          <div className="category muted">{product.category}</div>
          <p className="desc">{product.description}</p>
          <div className="price-row large">
            {product.discountPercentage ? (
              <>
                <span className="price">{money(price)}</span>
                <span className="old-price">{money(product.price)}</span>
                <span className="badge">-{product.discountPercentage}%</span>
              </>
            ) : (
              <span className="price">{money(product.price)}</span>
            )}
          </div>
          <button className="btn primary" onClick={() => addItem(product, 1)}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="reviews-wrap">
        <ReviewList title="User Reviews" reviews={userReviews} />
        <ReviewForm onSubmit={submitReview} />
        <ReviewList title="API Reviews" reviews={apiReviews} />
      </div>
    </section>
  );
}

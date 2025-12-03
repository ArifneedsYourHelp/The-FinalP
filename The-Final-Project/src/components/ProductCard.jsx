import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { calcDiscountedPrice, money } from "../utils/format";
import RatingStars from "./RatingStars.jsx";

export default function ProductCard({ product, dynamicRating }) {
  const { addItem } = useCart();
  const price = calcDiscountedPrice(product.price, product.discountPercentage);
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="thumb-wrap">
        <img
          className="thumb"
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
        />
      </Link>
      <div className="product-body">
        <Link to={`/product/${product.id}`} className="title">
          {product.title}
        </Link>
        <div className="meta">
          <span className="category">{product.category}</span>
          <RatingStars value={dynamicRating ?? product.rating} />
        </div>
        <div className="price-row">
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
        <button className="btn add-to-cart-btn" onClick={() => addItem(product, 1)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

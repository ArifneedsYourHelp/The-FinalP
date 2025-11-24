import { calcDiscountedPrice, money } from "../utils/format";
import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { increase, decrease, removeItem } = useCart();
  const unit = calcDiscountedPrice(item.price, item.discountPercentage);
  const total = unit * item.quantity;
  return (
    <div className="cart-item">
      <img className="cart-thumb" src={item.thumbnail} alt={item.title} />
      <div className="cart-body">
        <div className="cart-title">{item.title}</div>
        <div className="cart-meta">
          <span>{money(unit)} each</span>
          {item.discountPercentage ? (
            <span className="badge">-{item.discountPercentage}%</span>
          ) : null}
        </div>
        <div className="cart-actions">
          <div className="qty">
            <button className="btn small" onClick={() => decrease(item.id)}>
              -
            </button>
            <span className="qty-val">{item.quantity}</span>
            <button className="btn small" onClick={() => increase(item.id)}>
              +
            </button>
          </div>
          <button className="btn danger" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-line-total">{money(total)}</div>
    </div>
  );
}

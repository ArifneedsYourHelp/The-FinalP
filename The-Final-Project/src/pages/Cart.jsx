import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { money } from "../utils/format";

export default function Cart() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  return (
    <section className="container">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <div className="muted">
          Cart is empty. <Link to="/">Browse products</Link>.
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((i) => (
              <CartItem key={i.id} item={i} />
            ))}
          </div>
          <div className="cart-summary">
            <div className="row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div className="actions">
              <button className="btn danger outline" onClick={clear}>
                Clear Cart
              </button>
              <button
                className="btn primary"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

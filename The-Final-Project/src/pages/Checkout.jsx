import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";

function computeTaxes(subtotal, province) {
  const GST = 0.05;
  const QST = 0.09975;
  const gst = subtotal * GST;
  // Default to Quebec taxes if no province is specified (initial state) or if it matches Quebec
  const isQuebec = !province || province.trim() === "" || province.toLowerCase() === "quebec";
  const qst = isQuebec ? subtotal * QST : 0;
  const total = subtotal + gst + qst;
  return { gst, qst, total };
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [addr, setAddr] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    postal: "",
  });
  const [payment, setPayment] = useState("card");

  const taxes = useMemo(
    () => computeTaxes(subtotal, addr.province),
    [subtotal, addr.province]
  );

  const placeOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const order = {
      items,
      subtotal,
      taxes,
      address: addr,
      payment,
      placedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("lastOrder", JSON.stringify(order));
    clear();
    navigate("/order-confirmation");
  };

  return (
    <section className="container">
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <div className="muted">Your cart is empty.</div>
      ) : (
        <div className="checkout-grid">
          <form className="panel" onSubmit={placeOrder}>
            <h3>Shipping Address</h3>
            <div className="field">
              <label>Name</label>
              <input
                value={addr.name}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="field">
              <label>Address</label>
              <input
                value={addr.address}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, address: e.target.value }))
                }
                required
              />
            </div>
            <div className="field">
              <label>City</label>
              <input
                value={addr.city}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, city: e.target.value }))
                }
                required
              />
            </div>
            <div className="field">
              <label>Province/State</label>
              <input
                value={addr.province}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, province: e.target.value }))
                }
                placeholder="e.g., Quebec"
                required
              />
            </div>
            <div className="field">
              <label>Postal code</label>
              <input
                value={addr.postal}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, postal: e.target.value }))
                }
                required
              />
            </div>

            <h3>Payment Method</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={(e) => setPayment(e.target.value)}
                />{" "}
                Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={payment === "paypal"}
                  onChange={(e) => setPayment(e.target.value)}
                />{" "}
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={payment === "bank"}
                  onChange={(e) => setPayment(e.target.value)}
                />{" "}
                Bank Transfer
              </label>
            </div>

            <button className="btn primary" type="submit">
              Place Order
            </button>
          </form>

          <div className="panel">
            <h3>Order Summary</h3>
            <div className="summary-list">
              {items.map((i) => (
                <div className="row" key={i.id}>
                  <span>
                    {i.title} × {i.quantity}
                  </span>
                  <span>
                    {money(
                      i.quantity *
                        (i.price * (1 - (i.discountPercentage || 0) / 100))
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div className="row">
              <span>GST (5%)</span>
              <span>{money(taxes.gst)}</span>
            </div>
            <div className="row">
              <span>QST (9.975%)</span>
              <span>{money(taxes.qst)}</span>
            </div>
            <div className="row total">
              <span>Total</span>
              <strong>{money(taxes.total)}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { Link } from "react-router-dom";
import { money } from "../utils/format";

export default function OrderConfirmation() {
  let order = null;
  try {
    order = JSON.parse(sessionStorage.getItem("lastOrder") || "null");
  } catch (_) {}

  if (!order)
    return (
      <section className="container">
        <h1>Order Confirmation</h1>
        <div className="muted">
          No recent order found. <Link to="/">Return home</Link>.
        </div>
      </section>
    );

  return (
    <section className="container">
      <h1>Thank you for your order!</h1>
      <p className="muted">We've received your order and are processing it.</p>

      <div className="confirm-grid">
        <div className="panel">
          <h3>Products</h3>
          <div className="summary-list">
            {order.items.map((i) => (
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
            <strong>{money(order.subtotal)}</strong>
          </div>
          <div className="row">
            <span>GST</span>
            <span>{money(order.taxes.gst)}</span>
          </div>
          <div className="row">
            <span>QST</span>
            <span>{money(order.taxes.qst)}</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <strong>{money(order.taxes.total)}</strong>
          </div>
        </div>
        <div className="panel">
          <h3>Shipping Address</h3>
          <div className="address">
            <div>{order.address.name}</div>
            <div>{order.address.address}</div>
            <div>
              {order.address.city}, {order.address.province}{" "}
              {order.address.postal}
            </div>
          </div>
          <h3>Payment Method</h3>
          <div className="muted" style={{ textTransform: "capitalize" }}>
            {order.payment}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link className="btn" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

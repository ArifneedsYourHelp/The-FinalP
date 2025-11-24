import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          ShopLite
        </Link>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <button
            className="nav-link btn-link"
            onClick={() => navigate("/cart")}
          >
            Cart ({itemCount})
          </button>
        </nav>
      </div>
    </header>
  );
}

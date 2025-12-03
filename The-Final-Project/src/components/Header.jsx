import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";

export default function Header() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    // Configure GTranslate settings before loading script
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["en", "fr", "es", "ar"],
      wrapper_selector: ".gtranslate_wrapper",
      float_switcher_open_direction: "bottom",
      alt_flags: { en: "usa", es: "spain" }
    };

    // Load GTranslate script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    // Persist language selection
    const savedLang = localStorage.getItem("selectedLanguage");
    const validLangs = ["EN", "FR", "ES", "AR"];
    if (savedLang && validLangs.includes(savedLang)) {
      setCurrentLang(savedLang);
    } else {
      setCurrentLang("EN");
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLanguageClick = () => {
    const langs = { EN: "FR", FR: "ES", ES: "AR", AR: "EN" };
    const next = langs[currentLang] || "EN";
    setCurrentLang(next);
    localStorage.setItem("selectedLanguage", next);

    // Trigger GTranslate
    // Try using the global function if available (most reliable for float widget)
    if (window.doGTranslate) {
      window.doGTranslate(`en|${next.toLowerCase()}`);
      return;
    }

    // Fallback: Try to find the select element
    const wrapper = document.querySelector('.gtranslate_wrapper');
    const select = wrapper?.querySelector('select');

    if (select) {
      select.value = next.toLowerCase();
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback: Set cookie and reload
      if (next === "EN") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      } else {
        document.cookie = `googtrans=/en/${next.toLowerCase()}; path=/`;
      }
      window.location.reload();
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand-logo notranslate">
          <img src="/logo.png" alt="ARRIEN Logo" className="logo-img" />
        </Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </form>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/electronics" className="nav-link">
            Electronics
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
          <button
            className="nav-link cart-btn"
            onClick={() => navigate("/cart")}
            aria-label="Shopping Cart"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span className="cart-count">({itemCount})</span>
          </button>
          <div className="language-selector" onClick={handleLanguageClick} title="Experimental Feature">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
            </svg>
            <span className="lang-code">{currentLang}</span>
            {currentLang !== "EN" && <span className="experimental-tag">(Experimental)</span>}
          </div>
        </nav>
      </div>
      <div className="gtranslate_wrapper" style={{ display: "none" }}></div>
    </header>
  );
}

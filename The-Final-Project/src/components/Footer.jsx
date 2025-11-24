export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="brand">ShopLite</div>
          <div className="muted">Your simple React demo shop.</div>
        </div>
        <div className="footer-col">
          <div className="footer-title">Quick Links</div>
          <a href="#" className="footer-link">
            Home
          </a>
          <a href="#" className="footer-link">
            Products
          </a>
          <a href="#" className="footer-link">
            Contact
          </a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Follow Us</div>
          <div className="socials">
            <a className="social" href="#" aria-label="Twitter">
              🐦
            </a>
            <a className="social" href="#" aria-label="Facebook">
              📘
            </a>
            <a className="social" href="#" aria-label="Instagram">
              📷
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">© {year} ShopLite. All rights reserved.</div>
    </footer>
  );
}

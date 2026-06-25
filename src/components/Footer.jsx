export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <div className="logo-icon">🐾</div>PAW<span>ssible</span>
          </div>
          <p className="footer-desc">
            India's smartest pet product concierge — powered by AI and backed by real PetSmart data.
            Find the right product for every paw.
          </p>
          <div className="footer-socials">
            {['📸','🐦','👤','▶️'].map((s,i) => <button className="social-btn" key={i}>{s}</button>)}
          </div>
        </div>
        <div>
          <div className="footer-head">Quick Links</div>
          <div className="footer-links">
            {['Home','Shop','Categories','AI Advisor','Health Tips'].map(l => <a href="#" key={l}>{l}</a>)}
          </div>
        </div>
        <div>
          <div className="footer-head">Support</div>
          <div className="footer-links">
            {['Track Order','Return Policy','FAQ','Contact Us','Vet Helpline'].map(l => <a href="#" key={l}>{l}</a>)}
          </div>
        </div>
        <div className="footer-newsletter">
          <div className="footer-head">Stay in the Loop</div>
          <p>Get weekly pet tips, new arrivals, and exclusive offers — straight to your inbox.</p>
          <div className="footer-input-wrap">
            <input type="email" placeholder="your@email.com" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PAWssible. Made with 🐾 for pets across India.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="https://pawssible-oi51.onrender.com/docs" target="_blank" rel="noreferrer">API Docs</a>
        </div>
      </div>
    </footer>
  );
}

export default function Hero({ onShopClick, onAdvisorClick }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-label">India's #1 Pet Concierge</div>
        <h1>Premium Pets. <span className="highlight">Happy</span> Companions.</h1>
        <p className="hero-desc">
          Every pawprint is unique. So are our recommendations.
          From nutrition to grooming, we've got it all.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={onShopClick}>Shop Now →</button>
          <button className="btn-outline" onClick={onAdvisorClick}>Try AI Advisor</button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">279+</div><div className="label">Products</div></div>
          <div className="hero-stat"><div className="num">50+</div><div className="label">Top Brands</div></div>
          <div className="hero-stat"><div className="num">6</div><div className="label">AI Tools</div></div>
        </div>
      </div>
      <div className="hero-image">
        <img src="/hero-dog-1.jpg" alt="Grace our PAWssible mascot" />
        <div className="hero-badge">
          <div style={{ fontSize: 18, marginBottom: 2 }}>🐾</div>
          <div>Husky Approved</div>
          <div className="sub">by our mascot, Grace</div>
        </div>
      </div>
    </section>
  );
}

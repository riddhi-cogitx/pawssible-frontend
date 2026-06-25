export default function PromoBanners({ onCategory }) {
  return (
    <section className="section">
      <div className="banners-grid">
        <div className="promo-banner banner-lg">
          <img src="/seasonal.png" alt="Monsoon deals" />
          <div className="promo-overlay" />
          <div className="promo-content">
            <div className="promo-label">Seasonal Picks</div>
            <div className="promo-title">Monsoon Protectors<br />Essentials for Dogs</div>
            <button className="promo-btn" onClick={() => onCategory('Seasonal Care')}>Shop Monsoon →</button>
          </div>
        </div>
        <div className="promo-banner">
          <img src="/shine.png" alt="Grooming" />
          <div className="promo-overlay" />
          <div className="promo-content">
            <div className="promo-label">Grooming</div>
            <div className="promo-title">Coat Care & Shine</div>
            <button className="promo-btn" onClick={() => onCategory('Grooming')}>Shop Now →</button>
          </div>
        </div>
        <div className="promo-banner">
          <img src="/health.png
          " alt="Healthcare" />
          <div className="promo-overlay" style={{ background: 'linear-gradient(to top,rgba(245,158,11,0.7) 0%,rgba(0,0,0,0.1) 70%)' }} />
          <div className="promo-content">
            <div className="promo-label">New Arrivals</div>
            <div className="promo-title">Joint & Health Support</div>
            <button className="promo-btn" onClick={() => onCategory('Medicine & Healthcare')}>Explore →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

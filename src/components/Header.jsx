import { useState } from 'react';

export default function Header({ onSearch, cartCount = 0 }) {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <header className="header">
      <div className="header-top">
        🐾 Free delivery on orders above ₹499 &nbsp;|&nbsp;
        <span>Use code PAWS10 for 10% off!</span>
      </div>
      <div className="header-main">
        <a href="#" className="logo">
          <div className="logo-icon">🐾</div>
          PAW<span>ssible</span>
        </a>

        <nav className="nav">
          <a href="#" className="active">Home</a>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#advisor">AI Advisor</a>
          <a href="#health">Health Tips</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <form className="search-form" onSubmit={submit}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              autoComplete="off"
            />
            <button type="submit">🔍</button>
          </form>
          <button className="icon-btn" title="Wishlist">♡</button>
          <button className="icon-btn" title="Cart">
            🛒
            <span className="cart-badge">{cartCount}</span>
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>☰</button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-overlay open" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-inner" onClick={e => e.stopPropagation()}>
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <div className="logo-icon">🐾</div>PAW<span>ssible</span>
            </div>
            {['Home','Shop','Categories','AI Advisor','Health Tips','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} onClick={() => setMobileOpen(false)}>{l}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

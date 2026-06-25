import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import PromoBanners from './components/PromoBanners';
import AIAdvisor from './components/AIAdvisor';
import HealthTips from './components/HealthTips';
import Brands from './components/Brands';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProductCard from './components/ProductCard';
import { useToast } from './hooks/useToast';

const API = 'https://pawssible-oi51.onrender.com';

export default function App() {
  const { toasts, showToast } = useToast();
  const [filterCategory, setFilterCategory] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async q => {
    setSearchQuery(q);
    setSearchLoading(true);
    setSearchResults([]);
    document.getElementById('search-results-section')?.scrollIntoView({ behavior: 'smooth' });
    try {
      const res = await fetch(`${API}/products/search?query=${encodeURIComponent(q)}&limit=12`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategory = cat => {
    setFilterCategory(cat);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Hero
        onShopClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        onAdvisorClick={() => document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' })}
      />
      <Services />
      <Categories onSelect={handleCategory} />
      {/* <BestSellers filterCategory={filterCategory} showToast={showToast} /> */}

      {searchResults !== null && (
        <section className="search-results-section" id="search-results-section">
          <div className="results-header">
            <div className="results-title">
              {searchLoading ? 'Searching...' : `Results for "${searchQuery}" (${searchResults.length})`}
            </div>
            <button className="close-btn" onClick={() => setSearchResults(null)}>✕ Close</button>
          </div>
          {searchLoading ? (
            <div className="products-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-img skeleton" />
                  <div className="skeleton-body">
                    <div className="skeleton-line skeleton short" />
                    <div className="skeleton-line skeleton medium" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="products-grid">
              {searchResults.map((p, i) => (
                <ProductCard
                  key={i}
                  product={p}
                  onAddCart={name => showToast(`${name.slice(0,28)}... added to cart!`)}
                  onWishlist={() => showToast('Saved to wishlist ♡')}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
              No products found for "{searchQuery}".
            </p>
          )}
        </section>
      )}

      <PromoBanners onCategory={handleCategory} />
      <AIAdvisor />
      <HealthTips />
      <Brands />

      <div className="cta-banner">
        <h2>Not sure what your pet needs?<br />Ask our AI in seconds.</h2>
        <button
          className="btn-white"
          onClick={() => document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Try AI Advisor →
        </button>
      </div>

      <Footer />
      <Toast toasts={toasts} />
    </>
  );
}

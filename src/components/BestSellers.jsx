import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const API = 'https://pawssible-oi51.onrender.com';
const demoImages = [
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",
  "/tips-1.png",

];

function Skeletons({ n = 8 }) {
  return (
    <div className="products-grid">
      {Array.from({ length: n }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-img skeleton" />
          <div className="skeleton-body">
            <div className="skeleton-line skeleton short" />
            <div className="skeleton-line skeleton medium" />
            <div className="skeleton-line skeleton short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BestSellers({ filterCategory, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    setOffset(0);
    const url = filterCategory
      ? `${API}/products/list?category=${encodeURIComponent(filterCategory)}&limit=8`
      : `${API}/products/search?query=dog+cat+food+grooming&limit=8`;
    fetch(url)
      .then(r => r.json())
      .then(d => setProducts(d.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filterCategory]);

  const loadMore = () => {
    const next = offset + 8;
    fetch(`${API}/products/list?limit=8&offset=${next}`)
      .then(r => r.json())
      .then(d => { setProducts(p => [...p, ...(d.products || [])]); setOffset(next); });
  };

  return (
    <section className="section" id="shop">
      <div className="section-head">
        <div>
          <div className="section-label">{filterCategory ? 'Category' : 'Most Loved'}</div>
          <h2 className="section-title">{filterCategory || 'Best Sellers'}</h2>
        </div>
        {!filterCategory && <button className="view-all" onClick={loadMore}>Load More →</button>}
      </div>
      {loading
        ? <Skeletons />
        : products.length > 0
          ? <div className="products-grid">
              {products.map((p, i) => (
                <ProductCard
  key={i}
 product={{
  ...p,
  image_url: p.image_url || demoImages[i % demoImages.length],
}}
  onAddCart={name => showToast(`${name.slice(0,28)}... added to cart!`)}
  onWishlist={() => showToast("Saved to wishlist ♡")}
/>
              ))}
            </div>
          : <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              No products found.
            </p>
      }
    </section>
  );
}

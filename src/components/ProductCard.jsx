const EMOJI = { Food:'🍖', Grooming:'✂️', 'Medicine & Healthcare':'💊', Treats:'🦴', Accessories:'🎾', 'Seasonal Care':'☀️' };

export default function ProductCard({ product: p, onAddCart, onWishlist }) {
  const tag = p.life_stage === 'Puppy' || p.life_stage === 'Kitten' ? 'New'
    : p.season !== 'All' && p.season ? 'Seasonal' : 'Popular';
  const tagClass = tag === 'New' ? 'tag-new' : tag === 'Seasonal' ? 'tag-hot' : '';
  const emoji = EMOJI[p.category] || '🐾';
  const price = p.price != null ? `₹${Number(p.price).toFixed(0)}` : 'N/A';

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {p.image_url
          ? <img src={p.image_url} alt={p.product_name} loading="lazy" onError={e => { e.target.style.display='none'; }} />
          : <div className="product-img-placeholder">{emoji}</div>
        }
        <span className={`product-tag ${tagClass}`}>{tag}</span>
        <button className="product-fav" onClick={() => onWishlist?.(p.product_name)}>♡</button>
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span className="product-brand">{p.brand || 'PetSmart'}</span>
          <span className="product-pet">{p.pet_type || 'All Pets'}</span>
        </div>
        <div className="product-name">{p.product_name}</div>
        <div className="product-use">{p.use_case || p.sub_category || p.category}</div>
        <div className="product-footer">
          <span className="product-price">{price}</span>
          <button className="add-btn" onClick={() => onAddCart?.(p.product_name)}>+</button>
        </div>
      </div>
    </div>
  );
}

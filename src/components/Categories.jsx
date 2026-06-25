const CATS = [
  {
    image: "/food.png",
    name: "Food & Nutrition",
    count: "Dry, Wet & Raw",
    key: "Food",
  },
  {
    image: "/grooming.png",
    name: "Grooming",
    count: "Shampoos & Tools",
    key: "Grooming",
  },
  {
    image: "/medicine.png",
    name: "Healthcare",
    count: "Vet-recommended",
    key: "Medicine & Healthcare",
  },
  {
    image: "/treats.png",
    name: "Treats & Chews",
    count: "Training & Dental",
    key: "Treats",
  },
  {
    image: "/accessories.png",
    name: "Accessories",
    count: "Toys & Gear",
    key: "Accessories",
  },
];

export default function Categories({ onSelect }) {
  return (
    <section className="section section-alt" id="categories">
      <div className="section-head">
        <div>
          <div className="section-label">Browse by Type</div>
          <h2 className="section-title">Top Categories</h2>
        </div>

        <button
          className="view-all"
          onClick={() => onSelect("")}
        >
          View All →
        </button>
      </div>

      <div className="categories-grid">
        {CATS.map((c) => (
          <div
            className="category-card"
            key={c.key}
            onClick={() => onSelect(c.key)}
          >
            <div
  style={{
    width: "100%",
    height: 180,
    overflow: "hidden",
    borderRadius: "16px 16px 0 0",
    marginBottom: 18,
  }}
>
  <img
    src={c.image}
    alt={c.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
</div>

            <div className="cat-name">
              {c.name}
            </div>

            <div className="cat-count">
              {c.count}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
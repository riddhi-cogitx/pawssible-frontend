const TIPS = [
  { img: '/summer-huskies.png', cat: 'Seasonal Care', title: 'Summer Care for Huskies: Keeping Cool in Indian Heat', excerpt: 'Siberian Huskies are built for cold — here\'s how to keep your double-coated dog comfortable during Indian summers.', read: '5 min read' },
  { img: '/hero-dog-2.jpg', cat: 'Grooming', title: 'Husky Shedding Season: Best Products for Coat Management', excerpt: 'Huskies shed heavily twice a year. We break down the best deshedding tools and coat-care products available in India.', read: '4 min read' },
  { img: '/tips-3.png', cat: 'Health', title: 'Joint Health for Large Breeds: Signs, Prevention & Products', excerpt: 'Large breeds like Huskies are prone to hip dysplasia. Learn the early signs and best supplements to keep them active.', read: '6 min read' },
];

export default function HealthTips() {
  return (
    <section className="section section-alt" id="health">
      <div className="section-head">
        <div>
          <div className="section-label">Vet-backed Advice</div>
          <h2 className="section-title">PAWsitive Tips</h2>
        </div>
        <button className="view-all">All Articles →</button>
      </div>
      <div className="tips-grid">
        {TIPS.map((t, i) => (
          <div className="tip-card" key={i}>
            <div className="tip-img">
              <img src={t.img} alt={t.title} />
            </div>
            <div className="tip-body">
              <span className="tip-category">{t.cat}</span>
              <h3 className="tip-title">{t.title}</h3>
              <p className="tip-excerpt">{t.excerpt}</p>
            </div>
            <div className="tip-footer">
              <button className="tip-read">Read More →</button>
              <span className="tip-date">{t.read}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

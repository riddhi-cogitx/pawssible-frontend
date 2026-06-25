const BRANDS = ['Royal Canin','Pedigree','Himalaya','Drools','Whiskas','Purepet','IAMS','Petkin'];

export default function Brands() {
  return (
    <section className="section">
      <div className="section-head" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">Trusted Brands</div>
          <h2 className="section-title">We Stock the Best</h2>
        </div>
      </div>
      <div className="brands-row">
        {BRANDS.map(b => <span className="brand-pill" key={b}>{b}</span>)}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { getRecommendations } from "../api/cogitx";
const API = 'https://pawssible-oi51.onrender.com';

const HEALTH_CONCERNS = [
  { key: 'joint', label: 'Joint & Mobility', icon: '🦴' },
  { key: 'dental', label: 'Dental Care', icon: '🦷' },
  { key: 'coat', label: 'Coat & Skin', icon: '✨' },
  { key: 'digestion', label: 'Digestion', icon: '🌿' },
  { key: 'anxiety', label: 'Anxiety & Stress', icon: '🧘' },
  { key: 'weight', label: 'Weight Control', icon: '⚖️' },
  { key: 'tick', label: 'Tick & Flea', icon: '🛡️' },
  { key: 'eye', label: 'Eye & Ear Care', icon: '👁️' },
];

const STEPS = ['Tell us about your pet', 'Health & lifestyle', 'Budget & preferences'];

function StepDots({ step, total, onGoTo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => i < step && onGoTo(i)}
          style={{
            width: i === step ? 28 : 10,
            height: 10,
            borderRadius: 100,
            background: i === step ? 'var(--primary)' : i < step ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.2)',
            border: 'none',
            cursor: i < step ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            padding: 0,
          }}
        />
      ))}
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>
        Step {step + 1} of {total}
      </span>
    </div>
  );
}

function Chip({ label, icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 100,
        border: `1.5px solid ${active ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
        background: active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
        color: active ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
        fontSize: 13, fontWeight: active ? 700 : 500,
        cursor: 'pointer', transition: 'all 0.2s ease',
        fontFamily: 'inherit',
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}

function InputField({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
      <input
        style={{
          background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
          borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14,
          fontFamily: 'inherit', outline: 'none', width: '100%',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
        {...props}
      />
    </div>
  );
}

function SelectField({ label, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
      <select
        style={{
          background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
          borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14,
          fontFamily: 'inherit', outline: 'none', width: '100%',
          cursor: 'pointer',
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

function ResultCard({ rec }) {
  const p = rec.product;
  const price = p.price != null ? `₹${Number(p.price).toFixed(0)}` : 'N/A';
  const emoji = { Food:'🍖', Grooming:'✂️', 'Medicine & Healthcare':'💊', Treats:'🦴', Accessories:'🎾', 'Seasonal Care':'☀️' }[p.category] || '🐾';
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 14, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
      transition: 'background 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
    >
      <div style={{
        width: 56, height: 56, minWidth: 56, borderRadius: 10,
        background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 24,
      }}>
        {emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
          {p.brand || 'PetSmart'} · {p.category}
        </div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{p.product_name}</div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 8 }}>{rec.reason}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 18 }}>{price}</span>
          <button style={{
            background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 100,
            padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AIAdvisor() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    query: '', pet: '', breed: '', age: '', stage: '',
    weight: '', lifestyle: '', sensitivities: '',
    concerns: [], season: '', budget: '', budgetRange: 'any',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
const [messages, setMessages] = useState([]);
const [chatOpen, setChatOpen] = useState(false);
const [chatInput, setChatInput] = useState("");
const [chatLoading, setChatLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleConcern = key => {
    setForm(f => ({
      ...f,
      concerns: f.concerns.includes(key) ? f.concerns.filter(c => c !== key) : [...f.concerns, key],
    }));
  };

  const buildQuery = () => {
  return `
Recommend pet products.

Pet: ${form.pet}
Breed: ${form.breed}
Age: ${form.age} months
Life Stage: ${form.stage}
Weight: ${form.weight} kg

Health Concerns:
${form.concerns.join(", ")}

Lifestyle:
${form.lifestyle}

Season:
${form.season}

Sensitivities:
${form.sensitivities}

Budget:
${form.budgetRange}

User Request:
${form.query}
`;
};

  const submit = async () => {
  setLoading(true);
  setSubmitted(true);
  setResult(null);

  try {
    const prompt = buildQuery();

    console.log("Prompt:", prompt);

    const data = await getRecommendations(prompt);

// Navigate to the actual workflow result
const response = data.data.output.workflow_response.content.result;

// Remove any empty product returned by the workflow
const products = response.products.filter(
  (p) => p.name && p.name.trim() !== ""
);

// Convert CogitX response into the format expected by your UI
const transformed = {
  recommendations: products.map((p) => ({
    product: {
      product_name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      image_url: p.image_url,
    },
    reason: p.use_case,
  })),

  recommendation: response.recommendation,
  next_step: response.next_step,
  health_context: response.health_context,
  vet_advice: response.vet_advice,
};

setResult(transformed);

  } catch (err) {
    console.error("Recommendation Error:", err);
    setResult({ error: true });
  } finally {
    setLoading(false);
  }
  setMessages([
  {
    role: "system",
    text: `
Pet Profile
Pet: ${form.pet}
Breed: ${form.breed}
Age: ${form.age} months
Life Stage: ${form.stage}
Weight: ${form.weight} kg
Concerns: ${form.concerns.join(", ")}
Lifestyle: ${form.lifestyle}
Sensitivities: ${form.sensitivities}
Budget: ${form.budgetRange}
`.trim(),
  },
  {
    role: "user",
    text: form.query,
  },
  {
    role: "assistant",
    text:
      transformed.recommendation +
      "\n\n" +
      transformed.next_step,
  },
]);
};

const sendMessage = async () => {
  if (!chatInput.trim()) return;

  const userMsg = {
    role: "user",
    text: chatInput,
  };

  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setChatInput("");
  setChatLoading(true);

  try {

    const prompt =
      updatedMessages
        .map((m) => `${m.role.toUpperCase()}:\n${m.text}`)
        .join("\n\n");

    const data = await getRecommendations(prompt);

  const result = data.data.output.workflow_response.content.result;

setMessages([
  ...updatedMessages,
  {
    role: "assistant",
    text: result.recommendation || "Sorry, I couldn't answer that.",
    products: result.products || [],
    nextStep: result.next_step || "",
  },
]);

  } catch (err) {

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        text: "Something went wrong.",
      },
    ]);

  } finally {
    setChatLoading(false);
  }
};

const reset = () => {

  const confirmReset = window.confirm(
    "Start a new search?\n\nYour current AI conversation and recommendations will be cleared."
  );

  if (!confirmReset) return;

  setStep(0);
  setResult(null);
  setSubmitted(false);

  // Reset chat
  setChatOpen(false);
  setMessages([]);
  setChatInput("");
  setChatLoading(false);

  // Reset form
  setForm({
    query: "",
    pet: "",
    breed: "",
    age: "",
    stage: "",
    weight: "",
    lifestyle: "",
    sensitivities: "",
    concerns: [],
    season: "",
    budget: "",
    budgetRange: "any",
  });
};
  const canNext0 = form.query.trim() && form.pet;
  const canNext1 = true;

  return (
    <section id="advisor" style={{
      background: `linear-gradient(135deg, #1C1917 0%, #2D2218 50%, #1C1917 100%)`,
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Grace image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/feature-dog-2.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        opacity: 0.12,
      }} />

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(245,158,11,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(245,158,11,0.04)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '5rem 5%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,158,11,0.15)', color: 'var(--primary)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            padding: '8px 20px', borderRadius: 100, marginBottom: '1.25rem',
            border: '1px solid rgba(245,158,11,0.3)',
          }}>
            🤖 Powered by AI
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1rem' }}>
            Find the <span style={{ color: 'var(--primary)' }}>Perfect Products</span><br />for Your Pet
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            Answer a few questions and our AI will recommend products tailored to your pet's exact needs — breed, age, health, and budget.
          </p>
        </div>

        {/* Main card */}
        <div style={{
          maxWidth: 780, margin: '0 auto',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24, padding: '2.5rem',
          backdropFilter: 'blur(10px)',
        }}>
          {!submitted ? (
            <>
              <StepDots step={step} total={3} onGoTo={setStep} />
              <div style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                {STEPS[step]}
              </div>

              {/* STEP 0 */}
              {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <InputField
                    label="What are you looking for?"
                    placeholder="e.g. My Husky keeps scratching and losing coat excessively..."
                    value={form.query}
                    onChange={e => set('query', e.target.value)}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Pet Type</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['Dog', 'Cat'].map(p => (
                          <button key={p} type="button" onClick={() => set('pet', p)} style={{
                            flex: 1, padding: '12px', borderRadius: 10, border: `1.5px solid ${form.pet === p ? 'var(--primary)' : 'rgba(255,255,255,0.15)'}`,
                            background: form.pet === p ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                            color: form.pet === p ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                            fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 0.2s',
                          }}>
                            {p === 'Dog' ? '🐕' : '🐈'} {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <InputField label="Breed (optional)" placeholder="e.g. Siberian Husky" value={form.breed} onChange={e => set('breed', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <InputField label="Age (months)" type="number" placeholder="e.g. 24" value={form.age} onChange={e => set('age', e.target.value)} />
                    <SelectField label="Life Stage" value={form.stage} onChange={e => set('stage', e.target.value)}>
                      <option value="">Select stage</option>
                      <option>Puppy</option>
                      <option>Adult</option>
                      <option>Senior</option>
                    </SelectField>
                    <InputField label="Weight (kg)" type="number" placeholder="e.g. 28" value={form.weight} onChange={e => set('weight', e.target.value)} />
                  </div>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 10 }}>
                      Health Concerns (select all that apply)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {HEALTH_CONCERNS.map(c => (
                        <Chip
                          key={c.key}
                          label={c.label}
                          icon={c.icon}
                          active={form.concerns.includes(c.key)}
                          onClick={() => toggleConcern(c.key)}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <SelectField label="Lifestyle" value={form.lifestyle} onChange={e => set('lifestyle', e.target.value)}>
                      <option value="">Select lifestyle</option>
                      <option value="active">Very Active (outdoor)</option>
                      <option value="moderate">Moderate</option>
                      <option value="indoor">Mostly Indoor</option>
                      <option value="lazy">Low Activity</option>
                    </SelectField>
                    <SelectField label="Season / Region Focus" value={form.season} onChange={e => set('season', e.target.value)}>
                      <option value="">Any season</option>
                      <option>Summer</option>
                      <option>Monsoon</option>
                      <option>Winter</option>
                      <option>Festival</option>
                    </SelectField>
                  </div>
                  <InputField
                    label="Allergies / Sensitivities"
                    placeholder="e.g. grain-free, no chicken, lactose intolerant..."
                    value={form.sensitivities}
                    onChange={e => set('sensitivities', e.target.value)}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 10 }}>
                      Budget Range
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[
                        { key: 'low', label: 'Budget', sub: 'Under ₹500' },
                        { key: 'mid', label: 'Mid-range', sub: '₹500–₹1500' },
                        { key: 'high', label: 'Premium', sub: '₹1500+' },
                        { key: 'any', label: 'No limit', sub: 'Show all' },
                      ].map(b => (
                        <button key={b.key} type="button" onClick={() => set('budgetRange', b.key)} style={{
                          flex: 1, minWidth: 100, padding: '12px 10px', borderRadius: 12,
                          border: `1.5px solid ${form.budgetRange === b.key ? 'var(--primary)' : 'rgba(255,255,255,0.15)'}`,
                          background: form.budgetRange === b.key ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                          color: form.budgetRange === b.key ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.2s',
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{b.label}</div>
                          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{b.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 14, padding: '1.25rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>📋 Your Pet Profile Summary</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 1rem' }}>
                      {[
                        ['Pet', `${form.pet || '—'} ${form.breed ? `(${form.breed})` : ''}`],
                        ['Stage', form.stage || '—'],
                        ['Age', form.age ? `${form.age} months` : '—'],
                        ['Weight', form.weight ? `${form.weight} kg` : '—'],
                        ['Concerns', form.concerns.length ? form.concerns.join(', ') : 'None'],
                        ['Lifestyle', form.lifestyle || '—'],
                        ['Season', form.season || 'Any'],
                        ['Sensitivities', form.sensitivities || 'None'],
                      ].map(([k, v]) => (
                        <div key={k} style={{ fontSize: 13 }}>
                          <span style={{ color: 'rgba(255,255,255,0.4)' }}>{k}: </span>
                          <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 0}
                  style={{
                    background: 'none', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
                    padding: '11px 24px', borderRadius: 100, fontWeight: 600, fontSize: 14, cursor: step === 0 ? 'not-allowed' : 'pointer',
                    opacity: step === 0 ? 0.3 : 1, fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                >
                  ← Back
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    disabled={step === 0 && !canNext0}
                    style={{
                      background: step === 0 && !canNext0 ? 'rgba(245,158,11,0.3)' : 'var(--primary)',
                      color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 100,
                      fontWeight: 700, fontSize: 14, cursor: step === 0 && !canNext0 ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    style={{
                      background: 'var(--primary)', color: '#fff', border: 'none',
                      padding: '13px 36px', borderRadius: 100, fontWeight: 800, fontSize: 15,
                      cursor: 'pointer', fontFamily: 'inherit',
                      boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    🐾 Get My Recommendations
                  </button>
                )}
              </div>
            </>
          ) : (
            /* RESULTS */
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: 48, marginBottom: '1rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>🐾</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Analyzing your pet's needs...</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Our AI is finding the best matches for {form.pet || 'your pet'}</div>
                  <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
                </div>
              ) : result?.error ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Could not connect to AI</div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: '1.5rem' }}>The API may be warming up. Try again in a moment.</p>
                  <button onClick={submit} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Retry</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                        🐾 {(result?.recommendations || []).length} Recommendations found
                      </div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>
                        Best picks for your {form.pet || 'pet'}{form.breed ? ` (${form.breed})` : ''}
                      </div>
                      {form.concerns.length > 0 && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                          {form.concerns.map(c => {
                            const concern = HEALTH_CONCERNS.find(h => h.key === c);
                            return <span key={c} style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--primary)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{concern?.icon} {concern?.label}</span>;
                          })}
                        </div>
                      )}
                    </div>
                    <button onClick={reset} style={{ background: 'none', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                      ← New Search
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(result?.recommendations || []).map((r, i) => <ResultCard key={i} rec={r} />)}
                  </div>

                  {result?.clarification_needed && (
                    <div style={{ marginTop: '1.25rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                      💡 {result.clarification_needed}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
  <button
    onClick={() => setChatOpen(!chatOpen)}
    style={{
      background: "var(--primary)",
      color: "#fff",
      border: "none",
      padding: "12px 28px",
      borderRadius: 999,
      cursor: "pointer",
      fontWeight: 700,
    }}
  >
    💬 Continue chatting
  </button>
</div>
{chatOpen && (

<div
style={{
marginTop:30,
background:"rgba(255,255,255,0.05)",
borderRadius:16,
padding:20,
maxHeight:500,
display:"flex",
flexDirection:"column",
gap:16
}}
>

<div
style={{
height:300,
overflowY:"auto",
display:"flex",
flexDirection:"column",
gap:12
}}
>

{messages.map((msg, i) => (
  <div
    key={i}
    style={{
      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
      maxWidth: "75%",
    }}
  >
    {/* Chat Bubble */}
    <div
      style={{
        background:
          msg.role === "user"
            ? "var(--primary)"
            : "rgba(255,255,255,0.08)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 16,
      }}
    >
      {msg.text}
    </div>

    {/* Product Recommendations */}
    {msg.role === "assistant" &&
      msg.products &&
      msg.products.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {msg.products.map((p, idx) => (
            <ResultCard
              key={idx}
              rec={{
                product: {
                  product_name: p.name,
                  brand: p.brand,
                  category: p.category,
                  price: p.price,
                  image_url: p.image_url,
                },
                reason: p.reason || p.use_case,
              }}
            />
          ))}
        </div>
      )}
  </div>
))}

{chatLoading &&

<div style={{color:"#999"}}>

Sniffing through the inventory...

</div>

}

</div>

<div
style={{
display:"flex",
gap:10
}}
>

<input

value={chatInput}

onChange={(e)=>setChatInput(e.target.value)}

placeholder="Ask a follow-up..."

style={{
flex:1,
padding:12,
borderRadius:10,
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.08)",
color:"#fff"
}}

onKeyDown={(e)=>{
if(e.key==="Enter")
sendMessage();
}}

/>

<button

onClick={sendMessage}

style={{
background:"var(--primary)",
border:"none",
padding:"0 24px",
borderRadius:10,
color:"#fff",
cursor:"pointer"
}}

>

Send

</button>

</div>

</div>

)}

        {/* Bottom trust badges */}
        {!submitted && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {['🔒 Private & secure', '⚡ Instant results', '🐾 279+ products matched', '💊 Vet-informed logic'].map(b => (
              <span key={b} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{b}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Bot,
} from "lucide-react";

const SERVICES = [
  {
    icon: <Truck size={28} />,
    title: "Free Delivery",
    desc: "Free shipping on all orders above ₹499 across India.",
  },
  {
    icon: <RotateCcw size={28} />,
    title: "Easy Returns",
    desc: "7-day hassle-free return policy on all products.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Payments",
    desc: "UPI, Cards, and Wallets — all encrypted & safe.",
  },
  {
    icon: <Bot size={28} />,
    title: "24/7 AI Support",
    desc: "Our AI advisor is always on — get instant pet advice.",
  },
];

export default function Services() {
  return (
    <section
      className="section"
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="service-card"
            style={{
              border: "none",
              boxShadow: "none",
            }}
          >
            <div
              className="service-icon"
              style={{
                color: "var(--primary)",
              }}
            >
              {s.icon}
            </div>

            <div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
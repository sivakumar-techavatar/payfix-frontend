import { Icon } from "@/components/common/Icon";

const reasons = [
  {
    icon: "fa-users",
    title: "Dedicated Team",
    desc: "One expert per account — not a shared helpline. You always know who handles your compliance.",
  },
  {
    icon: "fa-calendar-check-o",
    title: "Proactive Filing Management",
    desc: "Structured compliance calendar per account. Proactive alerts and monitoring so deadlines are tracked systematically.",
  },
  {
    icon: "fa-map-marker",
    title: "Pan India Coverage",
    desc: "Offices in Chennai and Puducherry. Serving clients across Tamil Nadu, Puducherry, and all of India.",
  },
  {
    icon: "fa-shield",
    title: "Full Accountability",
    desc: "We don't just file — we own the outcome. Any notice, any inspection — we handle it.",
  },
];

export default function WhySection() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="sec-title center" style={{ color: "#fff" }}>
          <div
            className="eyebrow-bar"
            style={{
              margin: "0 auto 14px",
              background: "var(--red)",
            }}
          ></div>

          <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>
            Why Payfix Advisors
          </span>

          <h2 style={{ color: "#fff" }}>
            The Compliance Partner
            <br />
            Your Business Deserves
          </h2>
        </div>

        <div className="why-grid">
          {reasons.map((item) => (
            <div className="why-card" key={item.title}>
              <div className="why-card-icon">
                <Icon name={item.icon} />
              </div>

              <strong>{item.title}</strong>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

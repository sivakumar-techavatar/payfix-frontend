import { Icon } from "@/components/common/Icon";

const benefits = [
  {
    icon: "fa-check-circle",
    title: "Zero Compliance Stress",
    desc: "Every statutory deadline is handled. You focus on running your business — we manage the compliance calendar.",
  },
  {
    icon: "fa-calendar-check-o",
    title: "Structured Deadline Monitoring",
    desc: "Proactive alerts and automatic filings before every PF, ESI, PT, and TDS due date.",
  },
  {
    icon: "fa-user-circle-o",
    title: "Dedicated Compliance Manager",
    desc: "One expert assigned per account. Always reachable on WhatsApp. Direct contact, no call centres.",
  },
  {
    icon: "fa-lock",
    title: "Structured Penalty Prevention",
    desc: "PF, ESI, PT, TDS filed with structured deadline tracking — designed to prevent default exposure.",
  },
  {
    icon: "fa-file-text-o",
    title: "Accurate Documentation",
    desc: "Labour registers, payslips, and Form 16 — maintained correctly and always ready for inspection.",
  },
  {
    icon: "fa-expand",
    title: "Scales With Your Business",
    desc: "From 5 to 500+ employees — our system scales without increasing your administrative burden.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="sec-title center">
          <div className="eyebrow-bar" style={{ margin: "0 auto 14px" }}></div>

          <span className="eyebrow">Key Benefits</span>

          <h2>What You Get When You Work With Us</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div className="benefit-card" key={benefit.title}>
              <div className="bc-icon">
                <Icon name={benefit.icon} />
              </div>

              <div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

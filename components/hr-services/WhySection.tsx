import { Icon } from "@/components/common/Icon";

export default function WhySection() {
  return (
    <section
      className="why-section"
      style={{
        background: "linear-gradient(135deg,#001f4d 0%,#003080 100%)",
      }}
    >
      <div className="container">
        <div
          className="sec-title center"
          style={{ color: "#fff" }}
        >
          <div
            className="eyebrow-bar"
            style={{
              margin: "0 auto 14px",
              background: "var(--red)",
            }}
          />

          <span
            className="eyebrow"
            style={{ color: "rgba(255,255,255,.6)" }}
          >
            Why Payfix Advisors
          </span>

          <h2 style={{ color: "#fff" }}>
            HR That Works Like
            <br />
            an In-House Team
          </h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="user-circle-o" />
            </div>

            <strong>Dedicated HR Specialist</strong>

            <p>
              One named expert for your account. Reachable on WhatsApp. Knows
              your business, your people, your challenges.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="cogs" />
            </div>

            <strong>Systems, Not Advice</strong>

            <p>
              We don't just consult — we build and implement. Policies, HRMS,
              KPIs — delivered, not presented as slides.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="expand" />
            </div>

            <strong>Built to Scale</strong>

            <p>
              Every system we build is designed to grow with you — from startup
              to mid-market without rebuilding everything.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="shield" />
            </div>

            <strong>Legal Compliance Built-In</strong>

            <p>
              All HR frameworks are designed in compliance with Indian labour
              law — Shops Act, Factories Act, Contract Labour Act.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
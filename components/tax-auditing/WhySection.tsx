import { Icon } from "@/components/common/Icon";

export default function WhySection() {
  return (
    <section
      className="why-section"
      style={{
        background: "linear-gradient(135deg,#0b3d36 0%,#0e5e56 100%)",
      }}
    >
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
            Your Tax. Filed Right.
            <br />
            On Schedule.
          </h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="calendar-check-o" />
            </div>
            <strong>Structured Deadline Monitoring</strong>
            <p>
              We maintain a compliance calendar per client — GST, ITR, TDS,
              advance tax — with proactive alerts at every stage.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="user-circle-o" />
            </div>
            <strong>Dedicated Tax Expert</strong>
            <p>
              One expert per account. Knows your business, your industry's GST
              rates, and your tax structure.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="shield" />
            </div>
            <strong>Notice Protection</strong>
            <p>
              We respond to all tax department notices promptly and accurately —
              preventing escalation to demand orders.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="search" />
            </div>
            <strong>Audit-First Mindset</strong>
            <p>
              Every filing is done with audit-readiness in mind. Clean
              documentation, proper reconciliation, no shortcuts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

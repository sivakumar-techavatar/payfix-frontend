import { Icon } from "@/components/common/Icon";

export default function WhySection() {
  return (
    <section
      className="why-section"
      style={{
        background: "linear-gradient(135deg,#1a2232 0%,#374151 100%)",
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
            From First Registration
            <br />
            to Ongoing Compliance
          </h2>
        </div>

        <div className="why-grid reveal">
          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="cogs" />
            </div>
            <strong>Complete Handling</strong>
            <p>
              We prepare all documents, make all submissions, and follow up with
              authorities — you're not chasing anyone.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="calendar-check-o" />
            </div>
            <strong>Renewal Tracking</strong>
            <p>
              All your license renewal dates are tracked and managed
              proactively. No lapse in operations.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="map-marker" />
            </div>
            <strong>Local Government Liaison</strong>
            <p>
              We have experience with Tamil Nadu, Puducherry, and central
              government departments — fast, familiar processes.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">
              <Icon name="file-text-o" />
            </div>
            <strong>Accurate Documentation</strong>
            <p>
              All registrations maintained with proper records — ready for bank
              submissions, investor due diligence, and audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Icon } from "@/components/common/Icon";

export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="sec-title center">
          <div className="eyebrow-bar" style={{ margin: "0 auto 14px" }}></div>
          <span className="eyebrow">Key Benefits</span>
          <h2>What Legal Registration Means for Your Business</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="building-o" />
            </div>
            <div>
              <h4>Business Legally Incorporated</h4>
              <p>
                Properly registered company with ROC — PAN, TAN, DSC, and
                director details in order.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="certificate" />
            </div>
            <div>
              <h4>All Commercial Licenses Secured</h4>
              <p>
                Shop & Establishment, Trade License, MSME — obtained,
                documented, and renewal-tracked.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="industry" />
            </div>
            <div>
              <h4>Factory Approvals Managed</h4>
              <p>
                Factory license, planning approval, and structural approvals —
                all government liaison handled by us.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="refresh" />
            </div>
            <div>
              <h4>Renewal Tracking System</h4>
              <p>
                Proactive tracking of all renewal due dates — designed to
                prevent lapses in operating licenses. No last-minute scrambles.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="shield" />
            </div>
            <div>
              <h4>Inspection-Ready</h4>
              <p>
                Proper documentation and registered compliance status protects
                you from government inspection shutdowns.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(55,65,81,.1)", color: "#374151" }}
            >
              <Icon name="handshake-o" />
            </div>
            <div>
              <h4>Minimal Back-and-Forth</h4>
              <p>
                We handle all government portal submissions, document
                follow-ups, and officer liaisons. You sign — we do the rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

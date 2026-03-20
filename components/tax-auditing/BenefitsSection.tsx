export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="sec-title center">
          <div className="eyebrow-bar" style={{ margin: "0 auto 14px" }}></div>
          <span className="eyebrow">Key Benefits</span>
          <h2>What Clean Tax Compliance Means for Your Business</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-file-text-o"></i>
            </div>
            <div>
              <h4>GST Filed. Every Month.</h4>
              <p>
                Monthly and quarterly returns filed accurately — no mismatches,
                no late fees, no ITC losses.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-calculator"></i>
            </div>
            <div>
              <h4>Structured Tax Planning</h4>
              <p>
                Advance tax planning designed to prevent year-end shocks. You
                receive clear schedules of upcoming obligations.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-bell-o"></i>
            </div>
            <div>
              <h4>Proactive Due Date Alerts</h4>
              <p>
                You're notified before every deadline — not after a notice
                arrives. Prevention, not cure.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-search"></i>
            </div>
            <div>
              <h4>Audit-Ready Books</h4>
              <p>
                Your accounts are maintained in a way that makes both statutory
                and internal audits painless.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-envelope-o"></i>
            </div>
            <div>
              <h4>Notice Management</h4>
              <p>
                GST and Income Tax notices responded to accurately and on time —
                protecting you from escalation.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-line-chart"></i>
            </div>
            <div>
              <h4>Financial Reporting</h4>
              <p>
                Monthly P&amp;L, balance sheet, and MIS reports so you can make
                informed business decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

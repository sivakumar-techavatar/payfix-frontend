export default function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="container">
        <div className="sec-title">
          <div className="eyebrow-bar"></div>
          <span className="eyebrow">Our Structured Solution</span>

          <h2>GST, Tax & Audit. Fully Managed.</h2>

          <p>
            We handle your complete tax compliance lifecycle — from monthly GST
            filing to annual audit support — so you can focus on your business
            without worrying about a single deadline.
          </p>
        </div>

        <div className="svc-deliverables-grid">
          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-file-text-o"></i>
            </div>

            <h4>GST Services</h4>

            <ul>
              <li>GST Registration</li>
              <li>Monthly / Quarterly Filing (GSTR-1, 3B)</li>
              <li>ITC Reconciliation with GSTR-2B</li>
              <li>Annual Return (GSTR-9)</li>
              <li>GST Notice Handling</li>
            </ul>
          </div>

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-calculator"></i>
            </div>

            <h4>Income Tax</h4>

            <ul>
              <li>Company & Individual ITR Filing</li>
              <li>TDS Returns (Form 24Q, 26Q)</li>
              <li>Advance Tax Planning & Payment</li>
              <li>Capital Gains Tax Planning</li>
              <li>Tax Notice Response</li>
            </ul>
          </div>

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{ background: "rgba(14,122,110,.1)", color: "#0e7a6e" }}
            >
              <i className="fa fa-search"></i>
            </div>

            <h4>Audit & Reporting</h4>

            <ul>
              <li>Internal Audit</li>
              <li>Payroll Audit</li>
              <li>Financial Statement Preparation</li>
              <li>Statutory Audit Coordination</li>
              <li>Management Information Reports</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

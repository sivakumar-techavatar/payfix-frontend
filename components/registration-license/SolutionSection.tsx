import { Icon } from "@/components/common/Icon";

export default function SolutionSection() {
  return (
    <section className="solution-section" id="solutions">
      <div className="container">
        <div className="sec-title reveal">
          <div className="eyebrow-bar"></div>

          <span className="eyebrow">Our Structured Solution</span>

          <h2>Every Registration. Handled End-to-End.</h2>

          <p>
            We manage all government liaisons, document preparation, portal
            submissions, and follow-ups. You provide the documents — we handle
            everything else.
          </p>
        </div>

        <div className="svc-deliverables-grid">
          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(55,65,81,.1)",
                color: "#374151",
              }}
            >
              <Icon name="building-o" />
            </div>

            <h4>Company Formation</h4>

            <ul>
              <li>ROC Registration — Pvt Ltd / LLP / Partnership</li>
              <li>PAN & TAN Registration</li>
              <li>DSC Registration & Renewal</li>
              <li>ROC Annual Filing (AOC-4, MGT-7)</li>
              <li>Director Appointment & Changes</li>
            </ul>
          </div>

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(55,65,81,.1)",
                color: "#374151",
              }}
            >
              <Icon name="certificate" />
            </div>

            <h4>Commercial Registrations</h4>

            <ul>
              <li>Shop & Establishment Registration & Renewal</li>
              <li>Trade License Registration & Renewal</li>
              <li>MSME Registration (Udyam)</li>
              <li>Import Export Code (IEC)</li>
              <li>Professional Tax Registration</li>
              <li>FSSAI Registration & Renewals</li>
            </ul>
          </div>

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(55,65,81,.1)",
                color: "#374151",
              }}
            >
              <Icon name="industry" />
            </div>

            <h4>Factory & Industrial Approvals</h4>

            <ul>
              <li>Factory License Registration</li>
              <li>Planning Approval</li>
              <li>Structural Approval</li>
              <li>Fire NOC & Safety Certificate</li>
              <li>Pollution Control Board Consent</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

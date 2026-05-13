import { Icon } from "@/components/common/Icon";

export default function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="container">
        <div className="sec-title">
          <div className="eyebrow-bar"></div>

          <span className="eyebrow">Our Structured Solution</span>

          <h2>Complete HR Infrastructure. Delivered.</h2>

          <p>
            We design, implement, and manage your entire HR function — tailored
            to your industry, headcount, and growth stage.
          </p>
        </div>

        <div
          className="svc-deliverables-grid"
          style={{ gridTemplateColumns: "repeat(3,1fr)" }}
        >
          {/* CARD 1 */}

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <Icon name="users" />
            </div>

            <h4>Talent Acquisition</h4>

            <ul>
              <li>Permanent Hiring</li>
              <li>Diversity Hiring</li>
              <li>RPO (Recruitment Process Outsourcing)</li>
              <li>Executive Search & Leadership Hiring</li>
              <li>Campus & Fresher Recruitment</li>
            </ul>
          </div>

          {/* CARD 2 */}

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <Icon name="id-card-o" />
            </div>

            <h4>Temp / Contract Staffing</h4>

            <ul>
              <li>Short-Term & Project-Based Staffing</li>
              <li>
                Contract Labour Compliance (PF, ESI, WCA, PT, Group Insurance,
                Gratuity)
              </li>
              <li>Payroll Processing for Contract Workers</li>
              <li>Contract Renewal & Exit Handling</li>
            </ul>
          </div>

          {/* CARD 3 */}

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <Icon name="sitemap" />
            </div>

            <h4>HR Governance</h4>

            <ul>
              <li>HRMS Setup & Configuration</li>
              <li>HR Policy & SOP Framework</li>
              <li>Employee Handbook</li>
              <li>Leave & Attendance Policy</li>
              <li>Background Verification</li>
            </ul>
          </div>

          {/* CARD 4 */}

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <Icon name="bar-chart" />
            </div>

            <h4>Compensation & Performance</h4>

            <ul>
              <li>Salary Benchmarking</li>
              <li>CTC Restructuring</li>
              <li>KRA & KPI Framework</li>
              <li>Performance Appraisal System</li>
            </ul>
          </div>

          {/* CARD 5 */}

          <div className="sdg-card">
            <div
              className="sdg-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <Icon name="user-circle-o" />
            </div>

            <h4>Employee Lifecycle</h4>

            <ul>
              <li>Onboarding & Induction</li>
              <li>Grievance Management</li>
              <li>Exit Process & F&F</li>
              <li>ER Advisory Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
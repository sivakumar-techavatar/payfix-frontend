export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="sec-title center">
          <div
            className="eyebrow-bar"
            style={{ margin: "0 auto 14px" }}
          ></div>

          <span className="eyebrow">Key Benefits</span>

          <h2>The HR Foundation Your Business Needs</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-users"></i>
            </div>

            <div>
              <h4>Right People in Right Roles</h4>

              <p>
                Structured hiring processes that reduce bad hires and cut
                time-to-fill by up to 40%.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-sitemap"></i>
            </div>

            <div>
              <h4>Scalable HR Framework</h4>

              <p>
                Policies, SOPs and HRMS that work for 5 employees today and
                500 employees tomorrow.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-bar-chart"></i>
            </div>

            <div>
              <h4>Performance Accountability</h4>

              <p>
                KRA & KPI systems that align every team member with your
                business goals. No more ambiguity.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-lock"></i>
            </div>

            <div>
              <h4>Legal Protection</h4>

              <p>
                Written policies and documented processes protect you from
                labour disputes and wrongful termination claims.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-inr"></i>
            </div>

            <div>
              <h4>Cost Efficiency</h4>

              <p>
                Get enterprise HR infrastructure at a fraction of the cost
                of building an in-house team.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div
              className="bc-icon"
              style={{
                background: "rgba(0,87,179,.1)",
                color: "var(--blue)",
              }}
            >
              <i className="fa fa-trophy"></i>
            </div>

            <div>
              <h4>Industry-Ready Frameworks</h4>

              <p>
                Not generic templates — structured systems built for
                manufacturing, IT, services, and trade sectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
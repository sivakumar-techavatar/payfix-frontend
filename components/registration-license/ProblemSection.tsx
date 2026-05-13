import { Icon } from "@/components/common/Icon";

export function ProblemSection() {
  return (
    <section className="problem-section reveal">
      <div className="container">
        <div className="problem-grid">
          <div className="problem-text">
            <div className="eyebrow-bar"></div>
            <span className="eyebrow">The Challenge</span>

            <h2>
              Operating Without Proper Registrations is a Serious Legal Risk.
            </h2>

            <p>
              Many businesses start operations before obtaining all required
              licenses and registrations. What begins as a short-term workaround
              quickly becomes a long-term liability —{" "}
              <strong>
                government inspections, fines, and in extreme cases, business
                shutdown orders
              </strong>
              .
            </p>

            <p>
              The registration process in India involves multiple departments,
              document submissions, government portal filings, and follow-up
              coordination. Doing this without expert help leads to{" "}
              <strong>
                rejected applications, delays, and missed renewals
              </strong>
              .
            </p>

            <p>
              Worse — most business owners don't know which registrations they
              need until they face an inspection or a prospective client asks
              for compliance documentation.
            </p>

            <div className="problem-risks">
              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>
                    Operating without Shop & Establishment registration
                  </strong>{" "}
                  attracts fines and can result in closure notices from the
                  Labour Department.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>Factory without a valid license</strong> violates the
                  Factories Act and can result in criminal prosecution of
                  management.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>Expired licenses and lapsed renewals</strong> create
                  compliance gaps that appear in due diligence and block large
                  client contracts.
                </p>
              </div>
            </div>
          </div>

          <div className="problem-visual">
            <h4>What We Secure for You</h4>

            <div className="pv-check">
              <Icon name="check-circle" />
              Company incorporated — ROC, PAN, TAN
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              DSC obtained and renewed on schedule
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Shop & Establishment license obtained
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Trade License and MSME registration
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Factory License and planning approvals
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              All renewals tracked and handled proactively
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

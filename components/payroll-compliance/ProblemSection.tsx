const risks = [
  {
    text: (
      <>
        <strong>PF/ESI defaults</strong> attract 12–18% interest and can lead to
        criminal prosecution under EPF Act.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>TDS non-compliance</strong> results in disallowance of expenses
        and 1% per month penal interest.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Incorrect payslips and Form 16</strong> create employee disputes
        and income tax audit risk.
      </>
    ),
  },
];

const assurances = [
  "PF & ESI filed by the 15th every month",
  "Professional Tax paid before due dates",
  "TDS deducted and deposited accurately",
  "Form 16 issued to all employees",
  "Labour registers maintained correctly",
  "Government notices handled on your behalf",
];

export default function ProblemSection() {
  return (
    <section className="problem-section reveal">
      <div className="container">
        <div className="problem-grid">
          {/* LEFT CONTENT */}
          <div className="problem-text">
            <div className="eyebrow-bar"></div>
            <span className="eyebrow">The Challenge</span>

            <h2>Payroll Compliance is Complex. The Penalties Are Real.</h2>

            <p>
              For Indian businesses, payroll compliance involves{" "}
              <strong>
                PF, ESI, Professional Tax, Labour Welfare Fund, TDS, and Form 16
              </strong>{" "}
              — each with its own filing deadlines, registers, and legal
              requirements.
            </p>

            <p>
              Missing even one deadline can trigger{" "}
              <strong>
                government notices, penalty orders, and employee disputes
              </strong>
              . For factory owners and MSMEs with contract workers, the risk is
              even higher.
            </p>

            <p>
              Most businesses handle this with spreadsheets and last-minute
              scrambles. The result: late filings, wrong calculations, and
              months of back-and-forth with authorities.
            </p>

            <div className="problem-risks">
              {risks.map((risk, index) => (
                <div key={index} className="risk-item">
                  <i className="fa fa-exclamation-triangle"></i>
                  <p>{risk.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="problem-visual">
            <h4>What We Ensure for You</h4>

            {assurances.map((item, index) => (
              <div key={index} className="pv-check">
                <i className="fa fa-check-circle"></i>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

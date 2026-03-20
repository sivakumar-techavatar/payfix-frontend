const solutions = [
  {
    icon: "fa-money",
    title: "Payroll Management",
    items: [
      "Monthly Salary Processing",
      "CTC Structuring",
      "Bonus, Gratuity & F&F Settlement",
      "TDS & Form 16",
      "Payslip Generation",
    ],
  },
  {
    icon: "fa-shield",
    title: "Statutory Compliance",
    items: [
      "PF, ESI, PT & LWF Filing",
      "Labour Registers Maintenance",
      "Compliance Calendar Management",
      "Government Notice Handling",
      "Inspection & Audit Support",
    ],
  },
  {
    icon: "fa-desktop",
    title: "HRMS & Automation",
    items: [
      "ESS (Employee Self-Service) Portal",
      "Leave Management System",
      "GPS / Location-Based Attendance",
      "Biometric & Shift Management",
      "Automated Payroll Reports",
    ],
  },
];

export default function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="container">
        <div className="sec-title">
          <div className="eyebrow-bar"></div>

          <span className="eyebrow">Our Structured Solution</span>

          <h2>Everything Payroll. Handled.</h2>

          <p>
            We manage your complete payroll compliance lifecycle — from monthly
            salary processing to annual TDS filings — so you never have to worry
            about a deadline again.
          </p>
        </div>

        <div className="svc-deliverables-grid">
          {solutions.map((solution) => (
            <div className="sdg-card" key={solution.title}>
              <div className="sdg-icon">
                <i className={`fa ${solution.icon}`}></i>
              </div>

              <h4>{solution.title}</h4>

              <ul>
                {solution.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

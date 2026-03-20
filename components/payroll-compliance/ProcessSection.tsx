const steps = [
  {
    title: "Assessment",
    desc: "We audit your compliance posture — registrations, filings, employee data, and exposure areas.",
  },
  {
    title: "Structuring",
    desc: "We design your compliance calendar, salary structure, and filing workflows.",
  },
  {
    title: "Implementation",
    desc: "Monthly filings, register maintenance, payslip generation, and TDS — end-to-end.",
  },
  {
    title: "Monitoring",
    desc: "Proactive deadline tracking, notice management, and quarterly compliance reviews.",
  },
];

export default function ProcessSection() {
  return (
    <section className="pf-process">
      <div className="container">

        <div className="pf-authority-title">
          <div className="pf-ebar"></div>

          <span className="pf-eyeb">How It Works</span>

          <h2>Our Process</h2>

          <p>
            A structured four-step approach that brings clarity and
            reliability to your compliance.
          </p>
        </div>

        <div className="pf-proc-steps">
          {steps.map((step, index) => (
            <div className="pf-proc-step" key={step.title}>

              <div className="pf-proc-num">
                {index + 1}
              </div>

              <h4>{step.title}</h4>

              <p>{step.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
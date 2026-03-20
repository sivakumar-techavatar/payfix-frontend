"use client";

export default function LateralServices() {
  return (
   <section className="lateral-services">
      <div className="container">
        <h2>Explore Other Services</h2>

        <div className="lateral-grid">
          <a href="/payroll-compliance" className="lateral-card">
            <div className="lateral-icon">
              <i className="fa fa-money"></i>
            </div>

            <div className="lateral-text">
              <strong>Payroll Compliance</strong>
              <span>PF · ESI · TDS · Salary Processing</span>
            </div>

            <i className="fa fa-arrow-right lateral-arrow"></i>
          </a>

          <a href="/hr-services" className="lateral-card">
            <div className="lateral-icon li-blue">
              <i className="fa fa-users"></i>
            </div>

            <div className="lateral-text">
              <strong>HR Services</strong>
              <span>Hiring · HRMS · Policy Framework</span>
            </div>

            <i className="fa fa-arrow-right lateral-arrow"></i>
          </a>

          <a href="/tax-auditing" className="lateral-card">
            <div className="lateral-icon li-teal">
              <i className="fa fa-bar-chart"></i>
            </div>

            <div className="lateral-text">
              <strong>Tax & Auditing</strong>
              <span>GST · Income Tax · Internal Audit</span>
            </div>

            <i className="fa fa-arrow-right lateral-arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

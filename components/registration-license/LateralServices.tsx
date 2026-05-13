"use client";
import { Icon } from "@/components/common/Icon";

export default function LateralServices() {
  return (
   <section className="lateral-services">
      <div className="container">
        <h2>Explore Other Services</h2>

        <div className="lateral-grid">
          <a href="/payroll-compliance" className="lateral-card">
            <div className="lateral-icon">
              <Icon name="money" />
            </div>

            <div className="lateral-text">
              <strong>Payroll Compliance</strong>
              <span>PF · ESI · TDS · Salary Processing</span>
            </div>

            <Icon name="arrow-right" className="lateral-arrow" />
          </a>

          <a href="/hr-services" className="lateral-card">
            <div className="lateral-icon li-blue">
              <Icon name="users" />
            </div>

            <div className="lateral-text">
              <strong>HR Services</strong>
              <span>Hiring · HRMS · Policy Framework</span>
            </div>

            <Icon name="arrow-right" className="lateral-arrow" />
          </a>

          <a href="/tax-auditing" className="lateral-card">
            <div className="lateral-icon li-teal">
              <Icon name="bar-chart" />
            </div>

            <div className="lateral-text">
              <strong>Tax & Auditing</strong>
              <span>GST · Income Tax · Internal Audit</span>
            </div>

            <Icon name="arrow-right" className="lateral-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

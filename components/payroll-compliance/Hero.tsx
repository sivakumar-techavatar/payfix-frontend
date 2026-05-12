import Link from "next/link";
import React from "react";

const stats = [
  { value: "Monthly", label: "PF · ESI · TDS Filing" },
  { value: "Structured", label: "Deadline Monitoring" },
  { value: "Dedicated", label: "Account Manager" },
  { value: "Pan India", label: "Coverage" },
];

export default function Hero() {
  return (
    <section className="svc-hero">
      <div className="container">
        {/* Breadcrumb */}
        <div className="svc-hero-breadcrumb">
          <Link href="/">Home</Link>
          <i className="fa fa-angle-right"></i>

          <Link href="/#services">Services</Link>
          <i className="fa fa-angle-right"></i>

          <span className="current">Payroll Compliance</span>
        </div>

        {/* Eyebrow */}
        <div className="svc-hero-eyebrow">
          <span className="she-icon">
            <i className="fa fa-money"></i>
          </span>

          <span>01 / 04 — Payroll &amp; Compliance</span>
        </div>

        {/* Title */}
        <h1>
          Accurate Payroll.
          <br />
          Full Compliance.
          <br />
          Managed by Experts.
        </h1>

        {/* Subtitle */}
        <p className="svc-hero-sub">
          Stay <strong>legally compliant</strong>, avoid government penalties,
          and give your employees a seamless payroll experience — handled
          end-to-end, on time, every single month.
        </p>

        {/* Stats */}
        <div className="svc-hero-stat-row">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="svc-hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>

              {index < stats.length - 1 && (
                <div className="svc-hero-stat-div"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

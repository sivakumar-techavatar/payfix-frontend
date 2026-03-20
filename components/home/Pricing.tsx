"use client";

import { useState } from "react";

export default function PricingSection({
  openLead,
}: {
  openLead: (input: string) => void;
}) {
  const [index, setIndex] = useState(0);

  const go = (i: number) => setIndex(i);
  const next = () => setIndex((prev) => Math.min(prev + 1, 3));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const scrollContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">

        <div className="sec-title center" style={{ paddingTop: 20 }}>
          <div className="eyebrow-bar"></div>
          <span className="eyebrow">Transparent Pricing</span>
          <h2>Clear Pricing. No Surprises.</h2>
          <p>
            Four service categories. Starting prices where applicable. Custom
            quotes for everything else.
          </p>
        </div>

        {/* DOTS */}
        <div className="pricing-counter">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`cc-dot ${index === i ? "active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className="pricing-carousel-outer">
          <button
            className="p-carousel-btn p-prev"
            onClick={prev}
            disabled={index === 0}
          >
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="p-carousel-btn p-next"
            onClick={next}
            disabled={index === 3}
          >
            <svg viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="pricing-carousel">
            <div
              className="pricing-track"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: "transform .5s ease",
                display: "flex",
              }}
            >
              {/* ───────────────────────────── */}
              {/* SLIDE 1 – PAYROLL */}
              {/* ───────────────────────────── */}

              <div
                className={`pricing-slide ${index === 0 ? "is-active" : ""}`}
              >
                <div className="ppanel-inner" onClick={scrollContact}>
                  <div className="ppanel-head">
                    <div>
                      <h3>
                        Accurate Payroll. Full Compliance. Managed End-to-End.
                      </h3>
                      <p>
                        End-to-end payroll processing with statutory compliance
                        and workforce automation.
                      </p>
                    </div>

                    <div className="price-badge-group">
                      <div className="price-badge price-start-red">
                        <span className="pb-label">Starts From</span>
                        <span className="pb-amount">₹7,000 / Month</span>
                      </div>
                    </div>
                  </div>

                  <div className="ppanel-body">
                    <div className="svc-tag-grid">
                      <span className="svc-tag">
                        <i className="fa fa-calendar-check-o"></i>
                        Attendance & Leave Management
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-money"></i>
                        Payroll Processing
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-shield"></i>
                        PF, ESI, PT Filing
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-file-text-o"></i>
                        TDS & Form 16
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-gavel"></i>
                        Labour Law Compliance
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-desktop"></i>
                        HRMS & Automation
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-bell-o"></i>
                        Compliance Calendar
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-envelope-o"></i>
                        Notice Handling
                      </span>

                      <span className="svc-tag">
                        <i className="fa fa-book"></i>
                        Labour Registers
                      </span>
                    </div>

                    <div className="ppanel-ctas">
                      <button
                        className="lead-modal-btn"
                        onClick={(e) => openLead("Payroll Compliance")}
                      >
                        <i className="fa fa-whatsapp"></i>
                        TALK OUR PAYROLL EXPERT
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ───────────────────────────── */}
              {/* SLIDE 2 – HR */}
              {/* ───────────────────────────── */}

              <div
                className={`pricing-slide ${index === 1 ? "is-active" : ""}`}
              >
                <div className="ppanel-inner" onClick={scrollContact}>
                  <div className="ppanel-head">
                    <div>
                      <h3>
                        Structured HR Infrastructure for Growing Businesses.
                      </h3>
                      <p>
                        From hiring to exit — build the HR foundation your
                        business needs without the cost of a full in-house team.
                      </p>
                    </div>

                    <div className="price-badge-group">
                      <div className="price-badge price-start-red">
                        <span className="pb-label">Pricing</span>
                        <span className="pb-amount">Custom Based on Scope</span>
                      </div>
                    </div>
                  </div>

                  <div className="ppanel-body">
                    <div className="svc-tag-grid">
                      <span className="svc-tag">
                        <i className="fa fa-search"></i>Talent Acquisition
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-id-card-o"></i>Temp / Contract
                        Staffing
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-cogs"></i>HR Governance & Policy
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-line-chart"></i>Compensation &
                        Performance
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-refresh"></i>Employee Lifecycle
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-desktop"></i>HRMS Setup
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-check-square-o"></i>Background
                        Verification
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-users"></i>Grievance Management
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-file-text-o"></i>Employee Handbook
                      </span>
                    </div>

                    <div className="ppanel-ctas">
                      <button
                        className="lead-modal-btn"
                        onClick={(e) => openLead("HR Services")}
                      >
                        <i className="fa fa-whatsapp"></i>
                        TALK OUR HR EXPERT
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ───────────────────────────── */}
              {/* SLIDE 3 – TAX */}
              {/* ───────────────────────────── */}

              <div
                className={`pricing-slide ${index === 2 ? "is-active" : ""}`}
              >
                <div className="ppanel-inner" onClick={scrollContact}>
                  <div className="ppanel-head">
                    <div>
                      <h3>
                        Clean Books. Compliant Operations. Financial Clarity.
                      </h3>
                      <p>
                        GST, Income Tax, and Audit services for MSMEs and
                        corporates.
                      </p>
                    </div>

                    <div className="price-badge-group">
                      <div className="price-badge price-start-red">
                        <span className="pb-label">GST Filing Starts</span>
                        <span className="pb-amount">₹3,000 / Month</span>
                      </div>

                      <div className="price-badge price-blue-box">
                        <span className="pb-label">ITR Filing Starts</span>
                        <span className="pb-amount">₹1,500 onwards</span>
                      </div>
                    </div>
                  </div>

                  <div className="ppanel-body">
                    <div className="svc-tag-grid">
                      <span className="svc-tag">
                        <i className="fa fa-file-text-o"></i>GST Return Filing
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-exchange"></i>ITC Reconciliation
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-calculator"></i>Income Tax & TDS
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-calendar"></i>Advance Tax Planning
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-search"></i>Internal Audit
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-balance-scale"></i>Statutory Audit
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-bar-chart"></i>MIS & Financial
                        Reporting
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-envelope-o"></i>Notice Management
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-truck"></i>E-Way Bill
                      </span>
                    </div>

                    <div className="ppanel-ctas">
                      <button
                        className="lead-modal-btn"
                        onClick={(e) => openLead("Tax & Auditing")}
                      >
                        <i className="fa fa-whatsapp"></i>
                        TALK OUR TAX EXPERT
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ───────────────────────────── */}
              {/* SLIDE 4 – REGISTRATION */}
              {/* ───────────────────────────── */}

              <div
                className={`pricing-slide ${index === 3 ? "is-active" : ""}`}
              >
                <div className="ppanel-inner" onClick={scrollContact}>
                  <div className="ppanel-head">
                    <div>
                      <h3>Start Right. Stay Compliant. Scale Confidently.</h3>
                      <p>
                        Company formation, commercial registrations, and factory
                        approvals — handled end-to-end.
                      </p>
                    </div>

                    <div className="price-badge-group">
                      <div className="price-badge price-start-red">
                        <span className="pb-label">DSC Registration</span>
                        <span className="pb-amount">₹3,000 (2-Year)</span>
                      </div>

                      <div className="price-badge price-blue-box">
                        <span className="pb-label">Other Services</span>
                        <span className="pb-amount">Custom Pricing</span>
                      </div>
                    </div>
                  </div>

                  <div className="ppanel-body">
                    <div className="svc-tag-grid">
                      <span className="svc-tag">
                        <i className="fa fa-key"></i>DSC Registration & Renewal
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-building-o"></i>ROC / Company
                        Formation
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-certificate"></i>Shop &
                        Establishment
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-id-badge"></i>Trade License
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-star-o"></i>MSME / Udyam
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-industry"></i>Factory License
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-cutlery"></i>FSSAI Registration
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-globe"></i>Import Export Code
                      </span>
                      <span className="svc-tag">
                        <i className="fa fa-fire-extinguisher"></i>Fire &
                        Pollution NOC
                      </span>
                    </div>

                    <div className="ppanel-ctas">
                      <button
                        className="lead-modal-btn"
                        onClick={(e) => openLead("Registration & Licensing")}
                      >
                        <i className="fa fa-whatsapp"></i>
                        TALK OUR COMPLIANCE EXPERT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

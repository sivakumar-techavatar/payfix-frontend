"use client";
import { Icon } from "@/components/common/Icon";

export default function ProblemSection() {
  return (
    <section className="problem-section reveal">
      <div className="container">
        <div className="problem-grid">
          {/* LEFT SIDE */}

          <div className="problem-text">
            <div className="eyebrow-bar"></div>

            <span className="eyebrow">The Challenge</span>

            <h2>Growing Businesses Struggle with People Systems.</h2>

            <p>
              Most MSMEs and startups operate without structured HR. Hiring is
              ad-hoc, performance reviews don't happen, there are no written
              policies, and the entire process depends on one overloaded person.
            </p>

            <p>
              The result: <strong>high attrition, poor accountability, legal
              exposure</strong> from improper employment practices, and a
              culture that can't support growth.
            </p>

            <p>
              Building an in-house HR team of 3–5 people costs ₹30–50 lakh per
              year. Most businesses can't afford it — but they still need the
              infrastructure.
            </p>

            <div className="problem-risks">
              <div className="risk-item">
                <Icon name="exclamation-triangle" />

                <p>
                  <strong>No written policies</strong> leads to disputes,
                  wrongful termination claims, and labour court cases.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />

                <p>
                  <strong>Unstructured hiring</strong> results in wrong hires,
                  high costs, and culture deterioration.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />

                <p>
                  <strong>No KRA/KPI system</strong> means teams have no
                  accountability and performance is not measurable.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="problem-visual">
            <h4>What We Build for You</h4>

            <div className="pv-check">
              <Icon name="check-circle" />
              Structured hiring process — JD to onboarding
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              HRMS configured for your organisation
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              HR policies, SOPs & employee handbook
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Compensation benchmarking & CTC design
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              KRA/KPI framework & appraisal system
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Exit interview & full F&F settlement process
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
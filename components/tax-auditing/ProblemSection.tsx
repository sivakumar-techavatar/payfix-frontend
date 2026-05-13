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
              Tax Non-Compliance is More Common — and Costlier — Than You Think.
            </h2>

            <p>
              GST filing involves monthly returns, quarterly ITC reconciliation,
              annual returns, and audit trails. <strong>One wrong entry can trigger a notice</strong> and weeks of back-and-forth with the department.
            </p>

            <p>
              Income tax has its own complexity — advance tax, TDS returns,
              capital gains, and business expense documentation. For companies
              with employees, TDS non-compliance alone attracts{" "}
              <strong>1% per month penal interest</strong>.
            </p>

            <p>
              Most businesses realise they have a tax problem only when the
              notice arrives — by which time penalties, interest, and scrutiny
              have already begun.
            </p>

            <div className="problem-risks">
              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>Late GST filing</strong> attracts ₹50/day late fee and
                  18% interest on tax due.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>ITC mismatch</strong> in GSTR-2B reconciliation results
                  in demand notices from the department.
                </p>
              </div>

              <div className="risk-item">
                <Icon name="exclamation-triangle" />
                <p>
                  <strong>Wrong ITR filing</strong> leads to scrutiny
                  assessment, disallowance of expenses, and penalties.
                </p>
              </div>
            </div>
          </div>

          <div className="problem-visual">
            <h4>What We Ensure for You</h4>

            <div className="pv-check">
              <Icon name="check-circle" />
              GST filed monthly/quarterly — no late fees
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              ITC reconciled against GSTR-2B every month
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Advance tax calculated and paid on schedule
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              TDS returns filed quarterly, without error
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              GST notices responded to promptly
            </div>

            <div className="pv-check">
              <Icon name="check-circle" />
              Books audit-ready at all times
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
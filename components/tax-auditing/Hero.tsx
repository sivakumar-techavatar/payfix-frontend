import { Icon } from "@/components/common/Icon";

export default function Hero() {
  return (
    <section
      className="svc-hero"
      style={{
        background: "linear-gradient(135deg,#0b3d36 0%,#0e5e56 100%)",
      }}
    >
      <div className="container">
        <div className="svc-hero-breadcrumb">
          <a href="/">Home</a>
          <Icon name="angle-right" />
          <a href="/#services">Services</a>
          <Icon name="angle-right" />
          <span className="current">Tax &amp; Auditing</span>
        </div>

        <div className="svc-hero-eyebrow">
          <span
            className="she-icon"
            style={{ background: "#0e7a6e" }}
          >
            <Icon name="bar-chart" />
          </span>

          <span>03 / 04 — Tax & Auditing</span>
        </div>

        <h1>
          Clean Books.
          <br />
          No Surprises.
          <br />
          Full Financial Clarity.
        </h1>

        <p className="svc-hero-sub">
          GST, Income Tax, and Audit — <strong>filed accurately, on time</strong>,
          with proactive alerts before every due date. Structured calendar.
          Direct notice support.
        </p>

        <div className="svc-hero-stat-row">
          <div className="svc-hero-stat">
            <strong>GST Return Filing</strong>
            <span>Starts ₹3,000 / Month</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>ITR Return Filing</strong>
            <span>Starts ₹1,500 Onwards</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Structured</strong>
            <span>Deadline Monitoring</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Proactive</strong>
            <span>Notice Management</span>
          </div>
        </div>
      </div>
    </section>
  );
}
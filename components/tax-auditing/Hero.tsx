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
          <i className="fa fa-angle-right"></i>
          <a href="/">Services</a>
          <i className="fa fa-angle-right"></i>
          <span className="current">Tax & Auditing</span>
        </div>

        <div className="svc-hero-eyebrow">
          <span
            className="she-icon"
            style={{ background: "#0e7a6e" }}
          >
            <i className="fa fa-bar-chart"></i>
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
          with proactive alerts before every due date. No surprises. No
          penalties.
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
            <strong>Zero</strong>
            <span>Missed Deadlines</span>
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
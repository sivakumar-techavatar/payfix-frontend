export default function Hero() {
  return (
    <section
      className="svc-hero"
      style={{
        background: "linear-gradient(135deg,#1a2232 0%,#374151 100%)",
      }}
    >
      <div className="container">
        <div className="svc-hero-breadcrumb">
          <a href="/">Home</a>
          <i className="fa fa-angle-right"></i>
          <a href="/">Services</a>
          <i className="fa fa-angle-right"></i>
          <span className="current">Registration & License</span>
        </div>

        <div className="svc-hero-eyebrow">
          <span className="she-icon" style={{ background: "#374151" }}>
            <i className="fa fa-building-o"></i>
          </span>

          <span>04 / 04 — Registration & License</span>
        </div>

        <h1>
          Launch Legally.
          <br />
          Operate Confidently.
          <br />
          Scale Without Setbacks.
        </h1>

        <p className="svc-hero-sub">
          Company formation, government registrations, and factory approvals —
          <strong> fully handled</strong> so your business starts right, stays
          protected, and never faces a compliance shutdown.
        </p>

        <div className="svc-hero-stat-row">
          <div className="svc-hero-stat">
            <strong>DSC Registration & Renewals</strong>
            <span>₹3,000 (2-Year) | One Time Fee</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Zero</strong>
            <span>Back-and-Forth for You</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Fast</strong>
            <span>Government Liaison</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Pan India</strong>
            <span>Coverage</span>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <a href="#solutions" className="pf-more-svc-pill">
            <i className="fa fa-arrow-down" style={{ fontSize: 10 }}></i> More
            Services — Explore Below
          </a>
        </div>
      </div>
    </section>
  );
}

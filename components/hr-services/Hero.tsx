export default function Hero() {
  return (
    <section
      className="svc-hero"
      style={{
        background: "linear-gradient(135deg,#001f4d 0%,#003080 100%)",
      }}
    >
      <div className="container">
        <div className="svc-hero-breadcrumb">
          <a href="/">Home</a>
          <i className="fa fa-angle-right"></i>
          <a href="/">Services</a>
          <i className="fa fa-angle-right"></i>
          <span className="current">HR Services</span>
        </div>

        <div className="svc-hero-eyebrow">
          <span className="she-icon" style={{ background: "var(--blue)" }}>
            <i className="fa fa-users"></i>
          </span>

          <span>02 / 04 — HR Services</span>
        </div>

        <h1>
          Build a High-Performance
          <br />
          HR System. Without
          <br />
          the Overhead.
        </h1>

        <p className="svc-hero-sub">
          Get <strong>enterprise-grade HR infrastructure</strong> built for your
          business size — from hiring to exit, fully managed by HR specialists.
        </p>

        <div className="svc-hero-stat-row">
          <div className="svc-hero-stat">
            <strong>5 to 500+</strong>
            <span>Employee Scalability</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Industry-Ready</strong>
            <span>Frameworks & SOPs</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Custom</strong>
            <span>Built Per Business</span>
          </div>

          <div className="svc-hero-stat-div"></div>

          <div className="svc-hero-stat">
            <strong>Pan India</strong>
            <span>Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}

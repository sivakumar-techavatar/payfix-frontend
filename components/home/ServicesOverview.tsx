import { Box, Container } from "@mui/material";

export default function ServicesOverview() {
  return (
    <Box component="section" className="sec svc-overview-section" id="services">
      <Container>

        <Box className="sec-title center">
          <Box className="eyebrow-bar" />

          <span className="eyebrow">
            Business Governance & Compliance
          </span>

          <h2>
            Four Pillars. One Trusted Partner.
          </h2>

          <p>
            End-to-end compliance and governance for MSMEs, Startups,
            Factories, and Growing Companies across India.
          </p>
        </Box>

        <Box className="svc-icon-grid">

          <a
            href="/payroll-compliance"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-navy">
              <i className="fa fa-money"></i>
            </Box>

            <h3>Payroll Compliance</h3>

            <p>
              Accurate payroll processing with strict statutory adherence
              and risk-controlled governance.
            </p>

            <span className="svc-icon-link">
              Explore <i className="fa fa-arrow-right"></i>
            </span>
          </a>

          <a
            href="/hr-services"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-blue">
              <i className="fa fa-users"></i>
            </Box>

            <h3>HR Services</h3>

            <p>
              Complete HR lifecycle support from onboarding to exit,
              ensuring structured workforce management.
            </p>

            <span className="svc-icon-link">
              Explore <i className="fa fa-arrow-right"></i>
            </span>
          </a>

          <a
            href="/tax-auditing"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-teal">
              <i className="fa fa-bar-chart"></i>
            </Box>

            <h3>Tax & Auditing</h3>

            <p>
              Reliable tax compliance and audit support ensuring
              financial accuracy and regulatory alignment.
            </p>

            <span className="svc-icon-link">
              Explore <i className="fa fa-arrow-right"></i>
            </span>
          </a>

          <a
            href="/registration-license"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-slate">
              <i className="fa fa-building-o"></i>
            </Box>

            <h3>Registration & Licensing</h3>

            <p>
              End-to-end business registration and licensing —
              company formation, commercial and industrial approvals.
            </p>

            <span className="svc-icon-link">
              Explore <i className="fa fa-arrow-right"></i>
            </span>
          </a>

        </Box>

      </Container>
    </Box>
  );
}
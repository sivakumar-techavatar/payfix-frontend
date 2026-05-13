import { Box, Container } from "@mui/material";
import { Icon } from "@/components/common/Icon";

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
              <Icon name="money" />
            </Box>

            <h3>Payroll Compliance</h3>

            <p>
              Accurate payroll processing with strict statutory adherence
              and risk-controlled governance.
            </p>

            <span className="svc-icon-link">
              Explore <Icon name="arrow-right" />
            </span>
          </a>

          <a
            href="/hr-services"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-blue">
              <Icon name="users" />
            </Box>

            <h3>HR Services</h3>

            <p>
              Complete HR lifecycle support from onboarding to exit,
              ensuring structured workforce management.
            </p>

            <span className="svc-icon-link">
              Explore <Icon name="arrow-right" />
            </span>
          </a>

          <a
            href="/tax-auditing"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-teal">
              <Icon name="bar-chart" />
            </Box>

            <h3>Tax & Auditing</h3>

            <p>
              Reliable tax compliance and audit support ensuring
              financial accuracy and regulatory alignment.
            </p>

            <span className="svc-icon-link">
              Explore <Icon name="arrow-right" />
            </span>
          </a>

          <a
            href="/registration-license"
            className="svc-icon-card"
          >
            <Box className="svc-icon-circle svc-ic-slate">
              <Icon name="building-o" />
            </Box>

            <h3>Registration & Licensing</h3>

            <p>
              End-to-end business registration and licensing —
              company formation, commercial and industrial approvals.
            </p>

            <span className="svc-icon-link">
              Explore <Icon name="arrow-right" />
            </span>
          </a>

        </Box>

      </Container>
    </Box>
  );
}
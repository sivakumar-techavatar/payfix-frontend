import { Box, Container } from "@mui/material";

const ComplianceHealthCheckIntro = () => {
  return (
    <Box component="section" className="lead-magnet-section">
      <Container>
        <Box className="lead-magnet-inner">
          <Box className="lead-magnet-text">
            <h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0057B3"
                strokeWidth="2.5"
                style={{ verticalAlign: "-3px", marginRight: "8px" }}
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Free Business Compliance Health Check
            </h3>

            <p>
              Take a quick assessment to discover your compliance gaps across
              Payroll, HR, Tax & Licensing — with instant scoring, statutory
              references, and a downloadable PDF report.
            </p>
          </Box>

          <Box className="lead-magnet-cta">
            <Box className="lead-magnet-badge">
              <span className="lmb-top">Free Assessment</span>

              <span className="lmb-main">Instant PDF Report</span>
            </Box>

            <a
              href="compliance-check"
              target="_blank"
              className="btn-download"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Check Your Score
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ComplianceHealthCheckIntro;

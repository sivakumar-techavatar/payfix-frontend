import { Box, Container } from "@mui/material";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";

const services = [
  {
    href: "/payroll-compliance",
    icon: "money",
    iconClass: "svc-ic-navy",
    title: "Payroll Compliance",
    desc:
      "Accurate payroll processing with strict statutory adherence and risk-controlled governance.",
  },
  {
    href: "/hr-services",
    icon: "users",
    iconClass: "svc-ic-blue",
    title: "HR Services",
    desc:
      "Complete HR lifecycle support from onboarding to exit, ensuring structured workforce management.",
  },
  {
    href: "/tax-auditing",
    icon: "bar-chart",
    iconClass: "svc-ic-teal",
    title: "Tax & Auditing",
    desc:
      "Reliable tax compliance and audit support ensuring financial accuracy and regulatory alignment.",
  },
  {
    href: "/registration-license",
    icon: "building-o",
    iconClass: "svc-ic-slate",
    title: "Registration & Licensing",
    desc:
      "End-to-end business registration and licensing — company formation, commercial and industrial approvals.",
  },
];

export default function ServicesOverview() {
  return (
    <Box component="section" className="sec svc-overview-section" id="services">
      <Container>
        <Box className="sec-title center">
          <Box className="eyebrow-bar" />

          <span className="eyebrow">Business Governance &amp; Compliance</span>

          <h2>Four Pillars. One Trusted Partner.</h2>

          <p>
            End-to-end compliance and governance for MSMEs, Startups,
            Factories, and Growing Companies across India.
          </p>
        </Box>

        <Box className="svc-icon-grid">
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="svc-icon-card">
              <Box className={`svc-icon-circle ${s.iconClass}`}>
                <Icon name={s.icon} />
              </Box>

              <h3>{s.title}</h3>

              <p>{s.desc}</p>

              <span className="svc-icon-link">
                Explore <Icon name="arrow-right" />
              </span>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

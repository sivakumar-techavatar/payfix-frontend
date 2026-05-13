import type { Metadata } from "next";
import ComplianceCheck from "@/components/compliance-check";
import "../css/complianceCheck.css";

export const metadata: Metadata = {
  title: "Free Business Compliance Health Check",
  description:
    "Instant compliance score for your Indian business. 14-question assessment covering PF, ESI, TDS, GST, HR governance and licensing — with risk badges and estimated penalty exposure. Free.",
  alternates: {
    canonical: "https://payfixadvisors.in/compliance-check",
  },
  openGraph: {
    title: "Free Business Compliance Health Check | Payfix Advisors",
    description:
      "Instant compliance score for your Indian business. 14 questions, risk badges, penalty exposure estimate. Free.",
    url: "https://payfixadvisors.in/compliance-check",
    type: "website",
  },
};

export default function Page() {
  return <ComplianceCheck />;
}

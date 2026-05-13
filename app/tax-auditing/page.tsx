import type { Metadata } from "next";
import TaxAuditing from "@/components/tax-auditing";
import "../css/taxAudit.css";

export const metadata: Metadata = {
  title: "GST, Income Tax & Audit Services in India",
  description:
    "Reliable GST filing, ITR preparation, internal & statutory audits for Indian businesses. GST from ₹3,000/month, ITR from ₹1,500. Proactive notice management and ITC reconciliation.",
  alternates: {
    canonical: "https://payfixadvisors.in/tax-auditing",
  },
  openGraph: {
    title: "GST, Income Tax & Audit Services in India | Payfix Advisors",
    description:
      "GST filing, ITR preparation, internal & statutory audits. From ₹1,500/return. Proactive notice management.",
    url: "https://payfixadvisors.in/tax-auditing",
    type: "website",
  },
};

export default function Page() {
  return <TaxAuditing />;
}

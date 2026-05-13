import type { Metadata } from "next";
import PayrollCompliance from "@/components/payroll-compliance";

export const metadata: Metadata = {
  title: "Payroll Compliance — PF, ESI, TDS Filing in India",
  description:
    "End-to-end payroll compliance for Indian businesses. PF, ESI, TDS, professional tax, labour-law filings with structured deadline tracking. Dedicated account manager. Starts from ₹7,000/month.",
  alternates: {
    canonical: "https://payfixadvisors.in/payroll-compliance",
  },
  openGraph: {
    title: "Payroll Compliance — PF, ESI, TDS Filing in India | Payfix Advisors",
    description:
      "End-to-end payroll compliance for Indian businesses. PF, ESI, TDS, professional tax, labour-law filings with structured deadline tracking.",
    url: "https://payfixadvisors.in/payroll-compliance",
    type: "website",
  },
};

export default function Page() {
  return <PayrollCompliance />;
}

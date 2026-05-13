import type { Metadata } from "next";
import HRServices from "@/components/hr-services";
import "../css/hrService.css";

export const metadata: Metadata = {
  title: "HR Services & Virtual CHRO for Indian Businesses",
  description:
    "Complete HR infrastructure for growing Indian businesses — talent acquisition, HRMS setup, POSH compliance, employee lifecycle, policy framework. Scales from 5 to 500+ employees.",
  alternates: {
    canonical: "https://payfixadvisors.in/hr-services",
  },
  openGraph: {
    title: "HR Services & Virtual CHRO for Indian Businesses | Payfix Advisors",
    description:
      "Complete HR infrastructure — hiring, HRMS, POSH compliance, employee lifecycle, policy framework.",
    url: "https://payfixadvisors.in/hr-services",
    type: "website",
  },
};

export default function Page() {
  return <HRServices />;
}

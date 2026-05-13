import type { Metadata } from "next";
import HomePage from "@/components/home";

export const metadata: Metadata = {
  title: "Payroll, HR & Tax Compliance for Indian Businesses",
  description:
    "End-to-end payroll, HR, GST and business-licensing services for Indian businesses. Structured deadline tracking, dedicated account manager, pan India coverage. Offices in Chennai and Puducherry.",
  alternates: {
    canonical: "https://payfixadvisors.in",
  },
};

export default function Home() {
  return <HomePage />;
}

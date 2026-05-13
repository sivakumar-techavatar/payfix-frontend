import type { Metadata } from "next";
import RegistrationLicense from "@/components/registration-license";
import "../css/registerLicense.css";

export const metadata: Metadata = {
  title: "Business Registration & License Services in India",
  description:
    "Company formation, MSME / Udyam, FSSAI, Trade License, DSC, IEC, factory license. End-to-end government liaison handled by experts. DSC ₹3,000 for 2 years.",
  alternates: {
    canonical: "https://payfixadvisors.in/registration-license",
  },
  openGraph: {
    title: "Business Registration & License Services in India | Payfix Advisors",
    description:
      "Company formation, MSME, FSSAI, Trade License, DSC, IEC, factory license — end-to-end government liaison.",
    url: "https://payfixadvisors.in/registration-license",
    type: "website",
  },
};

export default function Page() {
  return <RegistrationLicense />;
}

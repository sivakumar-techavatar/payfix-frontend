import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nunito, Covered_By_Your_Grace } from "next/font/google";

import "./css/globals.css";
import "./css/home.css";
import "./css/payroll.css";

import Providers from "./providers";
import FloatingWidgets from "@/components/home/FloatingWidgets";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Payfix Advisors",
  url: "https://payfixadvisors.in",
  logo: "https://payfixadvisors.in/payfix-logo.svg",
  image: "https://payfixadvisors.in/og.png",
  telephone: "+91-8680939401",
  email: "info@payfixadvisors.in",
  priceRange: "₹₹",
  areaServed: { "@type": "Country", name: "India" },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress:
        "Centre Point, 2/4, Mount Poonamallee High Road, Manapakkam, Porur",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600089",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "AR Plaza, 4th Floor, Brindavanam",
      addressLocality: "Puducherry",
      postalCode: "605011",
      addressCountry: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/payfix-advisors",
    "https://www.instagram.com/payfix_advisors",
    "https://www.facebook.com/payfixadvisors",
    "https://wa.me/918680939401",
  ],
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const grace = Covered_By_Your_Grace({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-grace",
  display: "swap",
});

/* Viewport */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#001328",
};

/* SEO Metadata */
export const metadata: Metadata = {
  metadataBase: new URL("https://payfixadvisors.in"),

  title: {
    default: "Payfix Advisors | Payroll, HR & Tax Services",
    template: "%s | Payfix Advisors",
  },

  description:
    "Payfix Advisors provides payroll compliance, HR services, GST filing, and business registration for Indian businesses. Offices in Chennai and Puducherry with PAN India service.",

  applicationName: "Payfix Advisors",

  authors: [{ name: "Payfix Advisors", url: "https://payfixadvisors.in" }],
  creator: "Payfix Advisors",
  publisher: "Payfix Advisors",
  category: "Business Services",

  keywords: [
    "Payroll Services Chennai",
    "HR Services Puducherry",
    "GST Filing Chennai",
    "Business Registration Tamil Nadu",
    "PF ESIC Filing",
    "Payroll Compliance India",
    "Tax Auditing Chennai",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://payfixadvisors.in",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://payfixadvisors.in",
    siteName: "Payfix Advisors",
    title: "Payfix Advisors - Payroll, HR & Tax Compliance | Pan India",
    description:
      "End-to-end payroll compliance, HR services, GST filing and business registration for Indian businesses.",
    images: [
      {
        url: "https://payfixadvisors.in/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Payfix Advisors - Payroll, HR & Tax Compliance",
    description:
      "Payroll compliance, HR services and tax filing for Indian businesses.",
    images: ["https://payfixadvisors.in/og.png"],
  },

  appleWebApp: {
    capable: true,
    title: "Payfix Advisors",
  },

  formatDetection: {
    telephone: true,
    email: true,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>

      <body className={`${nunito.variable} ${grace.variable} antialiased`}>
        <Providers>
          {children}
          <FloatingWidgets />
        </Providers>

        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </body>
    </html>
  );
}

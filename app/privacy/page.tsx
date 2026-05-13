import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Payfix Advisors collects, uses and safeguards personal information. Aligned with India's Digital Personal Data Protection (DPDP) Act 2023.",
  alternates: { canonical: "https://payfixadvisors.in/privacy" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="13 May 2026">
      <p>
        Payfix Advisors (&ldquo;<strong>Payfix</strong>&rdquo;, &ldquo;we&rdquo;,
        &ldquo;our&rdquo;) is committed to protecting the privacy of every
        visitor and client. This policy explains what personal information we
        collect through{" "}
        <a href="https://payfixadvisors.in">payfixadvisors.in</a> and how we
        use, store and protect it. We act as the Data Fiduciary under
        India&rsquo;s Digital Personal Data Protection Act, 2023 (DPDP).
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you contact us through the website, request a quote, submit a
        compliance health-check, or apply for a position, we collect: your
        name, email, phone, company, designation, message, and any documents
        you choose to upload (such as a resume). We also collect technical
        information automatically — IP address, browser user-agent, and
        pages viewed — to help diagnose problems and prevent abuse.
      </p>

      <h2>2. Why We Collect It</h2>
      <ul>
        <li>To respond to your enquiries and schedule consultations.</li>
        <li>
          To deliver the services you engage us for (payroll, HR, tax, and
          business-registration support).
        </li>
        <li>
          To send you transactional updates and (with your consent) occasional
          newsletters about compliance changes that affect Indian businesses.
        </li>
        <li>To meet our legal and statutory obligations.</li>
      </ul>

      <h2>3. How We Store and Protect It</h2>
      <p>
        Personal information is stored in encrypted form on cloud
        infrastructure located in India. Access is limited to Payfix
        employees who need it to provide the service. We do not sell or rent
        your information to any third party.
      </p>

      <h2>4. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies for site analytics (Google
        Analytics 4) and, when running ads, for conversion tracking (Meta
        Pixel, LinkedIn Insight Tag). You can disable cookies in your
        browser; the site will continue to function without them.
      </p>

      <h2>5. Your Rights Under DPDP</h2>
      <p>
        You have the right to (a) access the personal information we hold
        about you, (b) request correction of inaccurate information,
        (c) request deletion of your information when it is no longer needed,
        and (d) withdraw your consent at any time. To exercise any of these
        rights, email{" "}
        <a href="mailto:info@payfixadvisors.in">info@payfixadvisors.in</a>{" "}
        with the subject line &ldquo;DPDP Request&rdquo;. We will respond
        within 30 days.
      </p>

      <h2>6. Grievance Officer</h2>
      <p>
        For any concern about how your personal information is being
        handled, contact our Grievance Officer at{" "}
        <a href="mailto:info@payfixadvisors.in">info@payfixadvisors.in</a> or
        at our registered office:
      </p>
      <p style={{ paddingLeft: 16, color: "var(--text-muted)" }}>
        Payfix Advisors<br />
        Centre Point, 2/4, Mount Poonamallee High Road<br />
        Manapakkam, Porur, Chennai – 600 089<br />
        Tamil Nadu, India
      </p>

      <h2>7. Updates to This Policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Effective&rdquo;
        date at the top reflects the most recent update. We will not
        materially change how we use your information without notifying you.
      </p>
    </LegalPage>
  );
}

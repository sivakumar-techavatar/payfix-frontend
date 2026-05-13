import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of Payfix Advisors website and engagement of our payroll, HR, tax and business-licensing services.",
  alternates: { canonical: "https://payfixadvisors.in/terms" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="13 May 2026">
      <p>
        These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern
        your use of <a href="https://payfixadvisors.in">payfixadvisors.in</a>{" "}
        (the &ldquo;<strong>Site</strong>&rdquo;) and any services you engage
        us to provide. By using the Site or engaging Payfix Advisors
        (&ldquo;<strong>Payfix</strong>&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;),
        you agree to these Terms.
      </p>

      <h2>1. Services</h2>
      <p>
        Payfix provides advisory and compliance services to Indian
        businesses, including payroll processing, HR consulting, statutory
        filings (PF, ESI, TDS, GST), audit support, and business
        registrations. The scope of any specific engagement, deliverables,
        timelines and fees will be set out in a separate engagement letter
        or proposal.
      </p>

      <h2>2. Use of the Site</h2>
      <p>
        You agree to use the Site only for lawful purposes and not to
        attempt to interfere with its normal operation, attempt to gain
        unauthorised access to any back-end system, or upload malicious
        content. Content displayed on the Site (text, design, logos) is
        owned by Payfix or its licensors and is provided for informational
        purposes only.
      </p>

      <h2>3. Information You Submit</h2>
      <p>
        Any information you submit through enquiry forms or resume uploads
        is handled per our{" "}
        <a href="/privacy" style={{ color: "var(--blue)", fontWeight: 700 }}>
          Privacy Policy
        </a>
        . You confirm that the information you submit is accurate and that
        you have the authority to submit it.
      </p>

      <h2>4. No Legal or Financial Advice</h2>
      <p>
        Content on the Site (blogs, FAQs, compliance-check results,
        calculators) is provided for general guidance and does not
        constitute legal, accounting or tax advice. For a binding opinion
        on any matter affecting your business, please engage us through a
        formal proposal.
      </p>

      <h2>5. Fees and Payment</h2>
      <p>
        Service fees are quoted in INR and are inclusive of applicable
        taxes unless stated otherwise. Specific payment terms (advance,
        milestone, monthly retainer) are set per engagement. Late payments
        may incur a charge of 1.5% per month or the maximum permitted by
        law.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Payfix performs its services with care and in accordance with
        applicable law. To the maximum extent permitted by law, our
        aggregate liability for any claim arising out of an engagement is
        limited to the fees paid by you for that engagement in the six
        months preceding the claim. We are not liable for indirect,
        consequential or punitive damages.
      </p>

      <h2>7. Governing Law and Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute
        arising out of or related to these Terms or the services shall be
        subject to the exclusive jurisdiction of the courts at Chennai,
        Tamil Nadu.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;Effective&rdquo;
        date at the top reflects the most recent update. Continued use of
        the Site after a change constitutes acceptance of the updated Terms.
      </p>
    </LegalPage>
  );
}

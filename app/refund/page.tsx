import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Payfix Advisors refund and cancellation policy for retainer, project, and one-time services.",
  alternates: { canonical: "https://payfixadvisors.in/refund" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      effectiveDate="13 May 2026"
    >
      <p>
        This policy explains how cancellations and refunds work across
        Payfix Advisors&rsquo; service categories. Specific terms in your
        engagement letter take precedence over this general policy.
      </p>

      <h2>1. Monthly Retainer Services</h2>
      <p>
        For ongoing retainers (e.g. payroll compliance, GST filing,
        bookkeeping), you may cancel at any time by giving 30 days&rsquo;
        written notice. Fees paid for the notice period are non-refundable;
        any pre-paid amount beyond the notice period will be refunded pro
        rata within 14 business days.
      </p>

      <h2>2. One-Time Service Fees</h2>
      <p>
        For one-time services (DSC registration, company incorporation,
        FSSAI / MSME / Trade License, individual ITR, etc.):
      </p>
      <ul>
        <li>
          <strong>Before work has commenced</strong> — full refund minus a
          5% administrative fee, processed within 7 business days.
        </li>
        <li>
          <strong>After work has commenced but before government
          submission</strong> — refund of 50% of the service fee. Out-of-
          pocket government, statutory or platform charges already paid on
          your behalf are non-refundable.
        </li>
        <li>
          <strong>After government submission</strong> — non-refundable,
          since the application is in the hands of the relevant authority.
        </li>
      </ul>

      <h2>3. Compliance Health Check</h2>
      <p>
        The Basic tier is free. The Detailed (₹999) and Premium (₹1,999)
        tiers are refundable in full within 24 hours of payment if you
        haven&rsquo;t yet received the report. After the report or expert
        call has been delivered, the fee is non-refundable.
      </p>

      <h2>4. Refund Process</h2>
      <p>
        To request a refund, email{" "}
        <a href="mailto:info@payfixadvisors.in">info@payfixadvisors.in</a>{" "}
        with the subject line &ldquo;Refund Request&rdquo; and your invoice
        number. We confirm receipt within one business day. Approved
        refunds are processed to the original payment method within 7
        business days.
      </p>

      <h2>5. Service Quality Issues</h2>
      <p>
        If you believe a deliverable does not meet the standard described
        in your engagement letter, raise the concern within 7 days of
        delivery and we will rectify it at no additional cost. Refund is a
        last-resort remedy after good-faith rework has been offered.
      </p>

      <h2>6. Force Majeure</h2>
      <p>
        Delays caused by government / portal outages, regulatory changes,
        natural disasters, or other events outside our reasonable control
        do not entitle either party to a refund. We will keep you informed
        and resume work as soon as practicable.
      </p>
    </LegalPage>
  );
}

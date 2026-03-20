"use client";

import { useEffect, useState } from "react";

type EnquiryModalProps = {
  open: boolean;
  service: string;
  onClose: () => void;
};

export default function EnquiryModal({
  open,
  service,
  onClose,
}: EnquiryModalProps) {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    location: "",
    phone: "",
    email: "",
    service: service || "Payroll & Compliance",
    employees: "",
    message: "",
  });

  useEffect(() => {
    if (service) {
      setForm((p) => ({ ...p, service }));
    }
  }, [service]);

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const submit = async () => {
    setSending(true);

    await new Promise((r) => setTimeout(r, 1200));

    setSending(false);
    setSuccess(true);
  };

  if (!open) return null;

  return (
    <div
      className="enq-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="enq-box">
        {/* HEADER */}

        <div className="enq-head">
          <div>
            <h3>Request a Quote</h3>
            <p>We'll get back to you within one business day.</p>
          </div>

          <button className="enq-close" onClick={onClose}>
            <i className="fa fa-times" />
          </button>
        </div>

        {/* FORM */}

        {!sending && !success && (
          <div className="enq-body">
            <div className="enq-row">
              <Field label="Name *">
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                />
              </Field>

              <Field label="Designation">
                <input
                  value={form.designation}
                  onChange={(e) => update("designation", e.target.value)}
                  placeholder="e.g. HR Manager"
                />
              </Field>
            </div>

            <Field label="Company Name *">
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Your company"
              />
            </Field>

            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Chennai, Mumbai"
              />
            </Field>

            <div className="enq-row">
              <Field label="Phone Number *">
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </Field>

              <Field label="Email *">
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field label="Service Interested In">
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
              >
                <option>Payroll & Compliance</option>
                <option>HR Services</option>
                <option>Tax & Auditing</option>
                <option>Business Registration & Licensing</option>
                <option>Multiple Services</option>
              </select>
            </Field>

            <Field label="Number of Employees (optional)">
              <select
                value={form.employees}
                onChange={(e) => update("employees", e.target.value)}
              >
                <option value="">Select range</option>
                <option value="10">1–10</option>
                <option value="50">11–50</option>
                <option value="200">51–200</option>
                <option value="500">201–500</option>
                <option value="1000">500+</option>
              </select>
            </Field>

            <Field label="Message (optional)">
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us briefly about your requirement…"
              />
            </Field>

            <button className="btn btn-red enq-submit" onClick={submit}>
              Submit Requirement →
            </button>

            <p className="enq-note">
              🔒 Your information is confidential and will never be shared.
            </p>
          </div>
        )}

        {/* SENDING */}

        {sending && (
          <div className="enq-sending">
            <div className="spinner" />
            Sending your enquiry…
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="enq-success">
            <div className="check-circle">✅</div>

            <h3>Requirement Submitted!</h3>

            <p>
              Thank you for submitting your requirement. Our expert will contact
              you shortly.
            </p>

            <button className="btn btn-red" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="enq-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

"use client";

import { sendWAMessage } from "@/helpers";
import { useState, useRef, useEffect } from "react";

const REPLIES: Record<string, string> = {
  "Payroll Compliance": `Our Payroll Compliance service covers:

• PF & ESIC Registration & Filing
• TDS Computation & Form 16
• Professional Tax Registration & Filing
• Payslip Generation & ESS Portal
• CTC Structuring & Salary Breakup
• Labour Welfare Fund
• Bonus & Gratuity Computation
• Full & Final Settlement
• Monthly Payroll Processing

We have customized/tailored packages based on your company size and requirements. Shall I connect you with our team?`,

  "HR Services": `Our HR Services include:

• CHRO Consulting & HR Strategy
• HRMS Setup & Management
• Recruitment & Onboarding
• Employee Engagement Programs
• HR Policy Drafting & Handbook
• Performance Management System
• Training & Development
• Exit Management & Offboarding
• Attendance & Leave Management
• Statutory Compliance Advisory

We have customized/tailored packages based on your organization's scope and needs. Shall I connect you with our team?`,

  "Tax & GST Filing": `Our Tax & GST Filing services:

• GST Registration & Filing (Monthly/Quarterly)
• Income Tax Return Filing (ITR)
• TDS Return Filing
• Internal & Statutory Auditing
• Financial Reporting & MIS
• Tax Planning & Advisory
• GST Annual Return (GSTR-9/9C)
• Advance Tax Computation
• Tax Compliance Health Check

We have customized/tailored packages starting from ₹3,000/month based on your filing needs. Shall I connect you with our team?`,

  "Business Registration & Licensing": `Our Business Registration & Licensing services:

• PF & ESIC Registration
• Professional Tax Registration
• Shops & Establishment License
• Trade License
• MSME/Udyam Registration
• GST Registration
• Labour Welfare Fund Registration
• Factory License
• Contract Labour License
• FSSAI License
• Import/Export Code (IEC)
• DSC (Digital Signature Certificate)

We have customized/tailored packages based on your business type and requirements. Shall I connect you with our team?`,

  "Pricing & Plans": `Quick overview:

💼 Payroll Compliance — from ₹7,000/mo
📊 GST Filing — from ₹3,000/mo
📋 Business Registration & Licensing — Custom Pricing
🤝 HR Services — Custom Pricing

Visit our <a href="#pricing" style="color:#25D366;text-decoration:underline;font-weight:700">Pricing section</a> for full details!

Shall I connect you with our team for a custom quote?`,

  "Talk to team": `Connecting you with our team! 🚀

Available Mon-Sat, 9AM - 6PM IST
Phone: +91 86809 39401`,
};

const OPTIONS = [
  "Payroll Compliance",
  "HR Services",
  "Tax & GST Filing",
  "Business Registration & Licensing",
  "Pricing & Plans",
  "Talk to team",
];

export default function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      text: `👋 Hi! I'm the Payfix virtual assistant. How can I help you today?

Please choose a topic or type your question below:`,
      from: "bot",
    },
  ]);

  const [menu, setMenu] = useState(true);
  const [actions, setActions] = useState<string | null>(null);
  const [contactService, setContactService] = useState<string | null>(null);

  const [input, setInput] = useState("");

  const bodyRef = useRef<HTMLDivElement>(null);

  const addMsg = (text: string, from = "bot") => {
    setMessages((m) => [...m, { text, from }]);
  };

  function selectTopic(topic: string) {
    setMenu(false);

    addMsg(topic, "me");

    setTimeout(() => {
      addMsg(REPLIES[topic] || "Let me connect you with our team.");
    }, 600);

    setTimeout(() => {
      if (topic === "Talk to team") {
        setContactService("General Enquiry");
      } else {
        setActions(topic);
      }
    }, 900);
  }

  function goBack() {
    addMsg("─────────────────");
    addMsg("👋 Welcome back! How else can I help you?");
    setMenu(true);
    setActions(null);
    setContactService(null);
  }

  function connect(service: string) {
    setActions(null);
    setContactService(service);
  }

  function submitContact(data: any) {
    const msg =
      `Hi Payfix Advisors, I am ${data.name}, Need info on ${contactService}.\n\n` +
      `Company: ${data.company}\n` +
      `Designation: ${data.designation}\n` +
      `Location: ${data.location}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}`;

    sendWAMessage(msg);

    addMsg("✅ Details shared! Opening WhatsApp...");
    setContactService(null);
  }

  function sendMessage() {
    if (!input.trim()) return;

    addMsg(input, "me");
    setInput("");

    setTimeout(() => {
      addMsg(
        "Thanks! Our team will respond during business hours (Mon-Sat 9AM-6PM IST).",
      );
      setActions("General Enquiry");
    }, 700);
  }

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      {/* FAB */}
      <button className="wa-fab" onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* PANEL */}
      <div className={`wa-panel ${open ? "open" : ""}`} id="waPanel">
        <div className="wa-head">
          <div className="wa-av">
            <i className="fa fa-comments" />
          </div>

          <div className="wa-head-info">
            <h4>Payfix Advisors</h4>
            <p>Typically replies within minutes</p>
          </div>

          <button className="wa-x" onClick={() => setOpen(false)}>
            <i className="fa fa-times" />
          </button>
        </div>

        <div className="wa-body" ref={bodyRef} id="waBody">
          <p className="wa-time">Today</p>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`wa-bubble ${m.from === "me" ? "me" : ""}`}
              style={{ whiteSpace: "pre-line" }}
            >
              {m.text}
            </div>
          ))}

          {menu && (
            <div className="wa-opts">
              {OPTIONS.map((o) => (
                <button
                  key={o}
                  className="wa-opt"
                  onClick={() => selectTopic(o)}
                >
                  {o}
                </button>
              ))}
            </div>
          )}

          {actions && (
            <div className="wa-opts">
              <button
                className="wa-opt wa-btn"
                onClick={() => connect(actions)}
              >
                ✅ Yes, Connect Me
              </button>

              <button className="wa-opt wa-btn wa-go-back" onClick={goBack}>
                🔙 Go Back to Menu
              </button>
            </div>
          )}

          {contactService && (
            <ContactForm
              service={contactService}
              onSubmit={submitContact}
              onBack={goBack}
            />
          )}
        </div>

        <div className="wa-foot">
          <input
            className="wa-inp"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button className="wa-send" onClick={sendMessage}>
            <i className="fa fa-paper-plane" />
          </button>
        </div>

        <div className="wa-priv">🔒 Encrypted & GDPR compliant</div>
      </div>
    </>
  );
}

function ContactForm({ service, onSubmit, onBack }: any) {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    location: "",
    phone: "",
    email: "",
  });

  return (
    <div className="wa-contact-form">
      <div className="wa-bubble" style={{ padding: 12 }}>
        <p style={{ fontWeight: 700, margin: "0 0 10px", fontSize: 13 }}>
          📋 Please share your details:
        </p>

        <input
          type="text"
          className="wa-cf-input"
          placeholder="Your Name *"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          className="wa-cf-input"
          placeholder="Designation (e.g. Director, HR Manager)"
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />

        <input
          type="text"
          className="wa-cf-input"
          placeholder="Company Name"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          type="text"
          className="wa-cf-input"
          placeholder="Location (e.g. Chennai)"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="tel"
          className="wa-cf-input"
          placeholder="Phone Number *"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="email"
          className="wa-cf-input"
          placeholder="Email Address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button
          className="wa-opt wa-btn"
          style={{
            marginTop: 8,
            width: "100%",
            background: "#25D366",
            color: "#fff",
            border: "none",
          }}
          onClick={() => onSubmit(form)}
        >
          <i className="fa fa-whatsapp" style={{ marginRight: 4 }} />
          Connect on WhatsApp
        </button>

        <button
          className="wa-opt wa-btn wa-go-back"
          onClick={onBack}
          style={{ marginTop: 6 }}
        >
          🔙 Go Back to Menu
        </button>
      </div>
    </div>
  );
}

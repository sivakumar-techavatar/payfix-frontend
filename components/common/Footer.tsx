"use client";

import { getMailId, getPhNo, openWA } from "@/helpers";
import Logo from "./Logo";

const services = [
  "Payroll Compliance",
  "HR Services",
  "GST Filing",
  "Income Tax Returns",
  "Internal Auditing",
  "DSC Registration",
];

const company = [
  { label: "About Us", href: "#about" },
  { label: "Why Payfix", href: "#why" },
  { label: "Pricing", href: "#pricing" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: "fa-linkedin",
    url: "https://www.linkedin.com/company/payfix-advisors",
  },
  {
    icon: "fa-instagram",
    url: "https://www.instagram.com/payfix_advisors",
  },
  {
    icon: "fa-facebook",
    url: "https://www.facebook.com/payfixadvisors",
  },
  {
    icon: "fa-whatsapp",
    url: openWA(),
  },
];

export default function Footer() {
  const openAdmin = () => {
    console.log("Admin portal open");
  };

  return (
    <footer id="footer">
      <div className="footer-upper">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <Logo size={120} color="white" />

              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                Payroll Compliance | HR Services | Tax & Auditing | Business
                Licensing
              </p>

              <div className="footer-social-row">
                {socials.map((s) => (
                  <a
                    key={s.icon}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fsoc"
                  >
                    <i className={`fa ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                {company.map((c) => (
                  <li key={c.label}>
                    <a href={c.href}>{c.label}</a>
                  </li>
                ))}

                <li>
                  <button
                    onClick={openAdmin}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    HR Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="footer-col">
              <h4>Contact</h4>

              <ul>
                <li>
                  <a href={`tel:+${getPhNo()}`}>
                    <i
                      className="fa fa-phone"
                      style={{ marginRight: 6, color: "var(--red)" }}
                    />
                    +91 86809 39401
                  </a>
                </li>

                <li style={{ textWrap: "nowrap" }}>
                  <a href={`mailto:${getMailId()}`}>
                    <i
                      className="fa fa-envelope-o"
                      style={{ marginRight: 6, color: "var(--red)" }}
                    />
                    {getMailId()}
                  </a>
                </li>

                <li
                  style={{
                    color: "rgba(255,255,255,.35)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <i
                    className="fa fa-map-marker"
                    style={{ marginRight: 6, color: "var(--red)" }}
                  />
                  Centre Point, Chennai
                </li>

                <li
                  style={{
                    color: "rgba(255,255,255,.35)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <i
                    className="fa fa-map-marker"
                    style={{ marginRight: 6, color: "var(--red)" }}
                  />
                  AR Plaza, Puducherry
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="container">
        <div className="footer-bottom">
          <p>© 2025 Payfix Advisors. All rights reserved.</p>
          <p>Payroll · HR · Tax & Auditing · Pan India</p>
        </div>
      </div>
    </footer>
  );
}

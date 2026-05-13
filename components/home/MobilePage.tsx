"use client";

import React from "react";
import Link from "next/link";
import FaqSection from "../common/FaqSection";
import { HomePageMobileFAQs } from "@/constants";
import { BRAND } from "@/constants/brand";

const stats = BRAND.heroStats.map((s) => ({ value: s.value, label: s.label }));

const services = [
  {
    title: "Payroll Compliance",
    desc: "PF · ESIC · TDS · Payslips",
    link: "/payroll-compliance",
    gradient: "linear-gradient(135deg,#ee3234,#d42020)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
  {
    title: "HR Services",
    desc: "CHRO · Staffing · POSH",
    link: "/hr-services",
    gradient: "linear-gradient(135deg,#0f6fd5,#0057B3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Tax & GST Filing",
    desc: "GST · ITR · Audit · DSC",
    link: "/tax-auditing",
    gradient: "linear-gradient(135deg,#10b981,#059669)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Business Licensing",
    desc: "Trade · FSSAI · MSME · IEC",
    link: "/registration-license",
    gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const why = [
  {
    title: "Deadline Tracking",
    text: "Structured monitoring of every filing",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ee3234"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Cut Admin Time",
    text: "We handle the compliance workload",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f6fd5"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Dedicated Manager",
    text: "One person, always available",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Confidential",
    text: "DPDP-aligned data handling",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
];

export default function MobilePage() {
  return (
    <div className="mob-page">
      {/* HERO */}
      <div className="mob-hero">
        <h1>
          Payroll, HR, Tax & Auditing, Business Licensing
          <span> Simplified.</span>
        </h1>

        <p className="mob-sub">
          Expert Payroll & HR compliance — PF, ESIC, TDS, payslips & staffing.
        </p>

        <Link href="/compliance-check" className="mob-cta">
          Check Your Business Score →
        </Link>

        <div className="mob-stats">
          {stats.map((s, i) => (
            <div key={i}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="mob-sec">
        <h2>Our Services</h2>

        <div className="mob-svc-grid">
          {services.map((s, i) => (
            <Link key={i} href={s.link} className="mob-svc-card">
              <div className="mob-svc-icon" style={{ background: s.gradient }}>
                {s.icon}
              </div>

              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div className="mob-sec">
        <h2>Why Businesses Choose Payfix</h2>

        <div className="mob-why-grid">
          {why.map((w, i) => (
            <div key={i} className="mob-why-card">
              <div className="mob-why-icon">{w.icon}</div>

              <h4>{w.title}</h4>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mob-faq-section">
        <h2>Frequently Asked Questions</h2>

        <FaqSection faqs={HomePageMobileFAQs} />
      </div>
    </div>
  );
}

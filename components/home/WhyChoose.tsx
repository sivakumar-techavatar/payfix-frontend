"use client";

import React from "react";
import { BRAND } from "@/constants/brand";

const features = [
  {
    icon: "fa-shield",
    title: "End-to-End Expertise",
    text: "One partner for payroll, HR, and tax. No coordination overhead, no gaps in coverage.",
  },
  {
    icon: "fa-user-o",
    title: "Dedicated Account Manager",
    text: "A single point of contact who knows your business inside out — always available.",
  },
  {
    icon: "fa-bell-o",
    title: "Proactive Compliance Alerts",
    text: "We monitor regulatory changes and notify you before every deadline. Zero surprises.",
  },
  {
    icon: "fa-line-chart",
    title: "Scales With Your Business",
    text: "5-person startup or 500-person enterprise — our service flex-scales to match your growth.",
  },
  {
    icon: "fa-map-marker",
    title: "Pan India Coverage",
    text: "Deep state-level compliance knowledge delivered remotely across every Indian state.",
  },
  {
    icon: "fa-lock",
    title: "Bank-Grade Confidentiality",
    text: "Payroll and financial data handled with strict access controls, India DPDP aligned.",
  },
];

const industries = [
  { icon: "fa-industry", name: "Manufacturing" },
  { icon: "fa-laptop", name: "IT & Technology" },
  { icon: "fa-shopping-bag", name: "Retail" },
  { icon: "fa-plus-square", name: "Healthcare" },
  { icon: "fa-rocket", name: "Startups" },
  { icon: "fa-building", name: "Enterprises" },
  { icon: "fa-shopping-cart", name: "E-Commerce" },
  { icon: "fa-briefcase", name: "Services" },
  { icon: "fa-leaf", name: "Renewable Energy" },
  { icon: "fa-truck", name: "Logistics" },
  { icon: "fa-cube", name: "FMCG" },
  { icon: "fa-home", name: "Building Materials" },
  { icon: "fa-credit-card", name: "Fintech" },
  { icon: "fa-heart", name: "Non-Profit" },
  { icon: "fa-microchip", name: "Semiconductors" },
  { icon: "fa-car", name: "Automobile" },
  { icon: "fa-globe", name: "GCC / GBC" },
  { icon: "fa-signal", name: "Telecom" },
  { icon: "fa-university", name: "Banking" },
  { icon: "fa-institution", name: "Govt Sectors" },
];

const stats = BRAND.heroStats.map((s) => ({ num: s.value, label: s.label }));

const WhyChoose = () => {
  return (
    <section className="sec" id="why" style={{ background: "var(--gray)" }}>
      <div className="container">
        <div className="grid-2">

          {/* LEFT SIDE */}
          <div>

            <div className="sec-title">
              <div className="eyebrow-bar"></div>
              <span className="eyebrow">Why Choose Payfix</span>
              <h2>Built for Businesses That Demand Precision</h2>
              <p>
                We don't just file returns — we become your compliance backbone,
                anticipating regulatory changes before they affect you.
              </p>
            </div>

            <div className="why-features">
              {features.map((f, i) => (
                <div key={i} className="why-feat">
                  <div className="why-feat-icon">
                    <i className={`fa ${f.icon}`}></i>
                  </div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="why-visual">

            <div className="stat-big">
              <div className="stat-big-num" style={{ fontSize: 32 }}>
                {BRAND.whyBigStat.value}
              </div>
              <div className="stat-big-label">
                {BRAND.whyBigStat.label}
              </div>
            </div>

            <div className="stat-mini-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-mini">
                  <div className="stat-mini-num">{s.num}</div>
                  <div className="stat-mini-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="why-industries">

              <p>Industries We Serve</p>
              <p className="sub">Trusted by businesses across sectors</p>

              <div className="ind-icon-grid">
                {industries.map((ind, i) => (
                  <div key={i} className="ind-icon-item">
                    <i className={`fa ${ind.icon}`}></i>
                    <span>{ind.name}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
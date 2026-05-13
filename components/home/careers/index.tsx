"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";
import { Icon } from "@/components/common/Icon";

const jobs = [
  {
    dept: "payroll",
    deptLabel: "Payroll",
    title: "Payroll Executive",
    location: "Pondicherry / Chennai",
    type: "Full-Time",
    exp: "2–4 Years Exp",
    badges: ["Full-Time", "Hybrid"],
    desc: "Process payroll for client companies and ensure full statutory compliance across PF, ESIC, TDS, and professional tax.",
    duties: [
      "Process monthly payroll for 10–50+ client companies",
      "Handle PF, ESIC, PT, and TDS computations",
      "Generate Form 16 and payslips",
      "Ensure Labour Law compliance",
    ],
    req: [
      "B.Com / MBA Finance with 2–4 years payroll experience",
      "Strong knowledge of PF, ESIC, PT, TDS",
      "Experience in GreytHR or Keka",
    ],
  },

  {
    dept: "hr",
    deptLabel: "HR",
    title: "HR Business Partner (HRBP)",
    location: "Chennai",
    type: "Full-Time",
    exp: "4–8 Years Exp",
    badges: ["Full-Time", "Hybrid"],
    desc: "Serve as strategic HR advisor to client organisations covering the full employee lifecycle.",
    duties: [
      "HRBP for 3–5 client accounts",
      "Drive talent acquisition and onboarding",
      "Design HR policies and engagement programs",
      "Handle grievance management",
    ],
    req: [
      "MBA HR with 4–8 years HRBP experience",
      "Strong stakeholder communication",
      "Experience with Keka / Darwinbox",
    ],
  },

  {
    dept: "tax",
    deptLabel: "Tax & Audit",
    title: "GST Compliance Analyst",
    location: "Pondicherry / Remote",
    type: "Full-Time",
    exp: "1–3 Years Exp",
    badges: ["Full-Time", "Remote OK"],
    desc: "Manage accurate and timely GST returns for a portfolio of clients.",
    duties: [
      "Prepare and file GSTR-1, GSTR-3B",
      "GST reconciliation",
      "Handle GST notices and department queries",
    ],
    req: [
      "B.Com / CA Inter",
      "1–3 years GST filing experience",
      "Experience with Tally or ERP",
    ],
  },

  {
    dept: "sales",
    deptLabel: "Business Dev",
    title: "Business Development Manager",
    location: "Chennai / Pan-India",
    type: "Full-Time",
    exp: "3–7 Years Exp",
    badges: ["Full-Time", "Hybrid"],
    desc: "Drive new client acquisition and revenue growth for Payfix Advisors.",
    duties: [
      "Identify and close B2B opportunities",
      "Manage full sales cycle",
      "Build CFO and HR relationships",
    ],
    req: [
      "3–7 years B2B sales experience",
      "Strong South India network preferred",
    ],
  },

  {
    dept: "tech",
    deptLabel: "Technology",
    title: "HRMS Implementation Specialist",
    location: "Remote / Pan-India",
    type: "Contract",
    exp: "2–5 Years Exp",
    badges: ["Contract", "Remote OK"],
    desc: "Implement HRMS platforms for client companies end-to-end.",
    duties: [
      "Implement Keka / Darwinbox / GreytHR",
      "Conduct onboarding sessions",
      "Troubleshoot integrations",
    ],
    req: [
      "2–5 years HRMS implementation experience",
      "Expertise in one HRMS platform",
    ],
  },
];

export default function Careers() {
  const [filter, setFilter] = useState("all");
  const [openJob, setOpenJob] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");

  const onClose = () => setSelectedRole("");

  const filtered =
    filter === "all" ? jobs : jobs.filter((j) => j.dept === filter);

  return (
    <section id="careers" style={{ background: "#fff", paddingTop: 100, paddingBottom: 40 }}>
      {/* HERO */}

      <div className="careers-hero-bar">
        <div className="container">
          <div className="careers-hero-content">
            <div className="sec-title light">
              <div className="eyebrow-bar" style={{ background: "#fff" }} />
              <span className="eyebrow">Careers at Payfix</span>
              <h2>Build Your Career With Us</h2>
              <p style={{ color: "rgba(255,255,255,.5)" }}>
                Join a growing team reshaping how Indian businesses handle
                compliance.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 32,
              }}
            >
              <button
                onClick={() => setSelectedRole("GENERAL")}
                className="btn btn-red"
              >
                Submit General Application
              </button>
              <a href="#job-listings" className="btn btn-outline">
                View Open Roles
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="container sec-sm" id="job-listings" style={{ paddingTop: 60 }}>
        <div className="sec-title center">
          <div className="eyebrow-bar"></div>
          <span className="eyebrow">Life at Payfix</span>
          <h2>Why Join Our Team</h2>
        </div>
        <div className="culture-grid">
          <div className="culture-card">
            <span className="cicon">🚀</span>
            <h4>Fast Career Growth</h4>
            <p>
              Take ownership early. Your career moves as fast as you drive it —
              no waiting in line for the next promotion.
            </p>
          </div>
          <div className="culture-card">
            <span className="cicon">
              <Icon name="handshake-o" />
            </span>
            <h4>Collaborative Culture</h4>
            <p>
              No silos. A supportive team that celebrates individual wins and
              grows together through every challenge.
            </p>
          </div>
          <div className="culture-card">
            <span className="cicon">🧠</span>
            <h4>Continuous Learning</h4>
            <p>
              Regular training on regulatory updates, new tools, and
              professional development to keep you sharp.
            </p>
          </div>
          <div className="culture-card">
            <span className="cicon">🏡</span>
            <h4>Flexible Work</h4>
            <p>
              Hybrid and remote options available. We trust you to deliver —
              wherever you do your best work.
            </p>
          </div>
        </div>

        <div className="sec-title" style={{ paddingTop: 60 }}>
          <div className="eyebrow-bar" />
          <span className="eyebrow">Open Positions</span>
          <h2>Current Openings</h2>
        </div>

        {/* FILTERS */}
        <div className="job-filters">
          {["all", "payroll", "hr", "tax", "sales", "tech"].map((f) => (
            <button
              key={f}
              className={`jfb ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All Roles" : f}
            </button>
          ))}
        </div>

        {/* JOB CARDS */}
        {filtered.map((job) => (
          <div
            key={job.title}
            className={`job-card ${openJob === job.title ? "open" : ""}`}
            onClick={() => setOpenJob(openJob === job.title ? null : job.title)}
          >
            <div className="job-card-head">
              <div>
                <span className="job-dept">{job.deptLabel}</span>
                <h3>{job.title}</h3>

                <div className="job-meta-row">
                  <span className="job-meta">
                    <Icon name="map-marker" /> {job.location}
                  </span>

                  <span className="job-meta">
                    <Icon name="clock-o" /> {job.type}
                  </span>

                  <span className="job-meta">
                    <Icon name="briefcase" /> {job.exp}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                <div className="job-badges">
                  {job.badges.map((b) => (
                    <span key={b} className="jbadge">
                      {b}
                    </span>
                  ))}
                </div>

                <button
                  className="apply-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                   setSelectedRole(job.title);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="job-details">
              <div className="job-details-inner">
                <p className="job-desc-text">{job.desc}</p>

                <ul className="job-list">
                  {job.duties.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <span className="job-req-label">Requirements</span>

                <ul className="job-list">
                  {job.req.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <div style={{ marginTop: 16 }}>
                  <button
                    className="apply-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRole(job.title);
                    }}
                  >
                    Apply for This Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ApplyModal {...{ role: selectedRole, onClose }} />
    </section>
  );
}

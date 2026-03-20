"use client";

import React, { useEffect, useRef, useState } from "react";
import toastInfotoast from "react-hot-toast";

type Option = {
  l: string;
  ic: string;
  v: number;
};

type Question = {
  id: string;
  cat: string;
  icon?: string;
  text: string;
  ref?: string;
  opts: Option[];
};

/* =========================
   GLOBAL CSS (EXACT COPY)
========================= */
const GlobalStyles = () => (
  <style>{`
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0e1a;--card:#111827;--card2:#1a2235;--border:#1e293b;--accent:#22d3ee;--accent2:#6366f1;--accent3:#f472b6;--green:#10b981;--yellow:#eab308;--orange:#f97316;--red:#ef4444;--text:#e2e8f0;--muted:#64748b;--font:'DM Sans',sans-serif;--mono:'Space Mono',monospace}
body{font-family:var(--font);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.glow{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:0}
.g1{width:500px;height:500px;background:rgba(34,211,238,.06);top:-100px;left:-100px}
.g2{width:400px;height:400px;background:rgba(99,102,241,.06);bottom:-50px;right:-50px}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.scr{position:relative;z-index:1;min-height:100vh;animation:fadeUp .5s ease-out}
`}</style>
);

/* =========================
   CONSTANTS (EXACT)
========================= */

const CCOL = {
  "PF & ESIC": "#22d3ee",
  Payroll: "#6366f1",
  "Tax & GST": "#10b981",
  "HR Compliance": "#f472b6",
  Licensing: "#eab308",
  Documentation: "#f97316",
};

const INDUSTRIES = [
  "Accounting & Tax Services",
  "Advertising & Marketing",
  "Aerospace & Defense",
  "Agriculture & Farming",
  "Airlines & Aviation",
  "Animation & VFX",
  "Apparel & Fashion",
  "Architecture & Planning",
  "Automotive",
  "Banking",
  "Biotechnology",
  "Building Materials",
  "Business Consulting",
  "Chemicals",
  "Civil Engineering",
  "Commercial Real Estate",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Cosmetics",
  "Dairy",
  "Design",
  "Digital Marketing",
  "E-commerce",
  "E-Learning",
  "Education Management",
  "Electrical & Electronic Mfg",
  "Energy & Utilities",
  "Engineering Services",
  "Entertainment",
  "Environmental Services",
  "Events Management",
  "Facilities Services",
  "Financial Services",
  "Fintech",
  "FMCG",
  "Food & Beverages",
  "Food Production",
  "Freight & Logistics",
  "Furniture",
  "Government Administration",
  "Healthcare",
  "Hospital & Health Care",
  "Hospitality",
  "Hotels & Resorts",
  "Human Resources",
  "Import & Export",
  "Industrial Automation",
  "Information Technology",
  "Insurance",
  "Interior Design",
  "IT Consulting",
  "IT Services & Outsourcing",
  "Jewellery",
  "Law Practice",
  "Legal Services",
  "Leisure Travel & Tourism",
  "Logistics & Supply Chain",
  "Luxury Goods",
  "Machinery",
  "Management Consulting",
  "Manufacturing",
  "Marine",
  "Market Research",
  "Mechanical Engineering",
  "Media Production",
  "Medical Devices",
  "Medical Practice",
  "Mining & Metals",
  "Mobile Applications",
  "NGO & Non-Profit",
  "Oil & Gas",
  "Online Media",
  "Outsourcing",
  "Packaging",
  "Petrochemicals",
  "Pharmaceuticals",
  "Photography",
  "Plastics",
  "Printing",
  "Professional Training",
  "Public Relations",
  "Publishing",
  "Railways",
  "Real Estate",
  "Recruitment & Staffing",
  "Renewable Energy",
  "Research",
  "Restaurants",
  "Retail",
  "Robotics",
  "SaaS",
  "Security & Investigations",
  "Semiconductors",
  "Solar Energy",
  "Sports",
  "Steel",
  "Supermarkets",
  "Technology",
  "Telecommunications",
  "Textiles",
  "Tourism",
  "Transportation",
  "Travel & Hospitality",
  "Utilities",
  "Venture Capital",
  "Warehousing",
  "Waste Management",
  "Wholesale",
];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
  "Jammu & Kashmir",
  "Ladakh",
];

const DESIGNATIONS = [
  "CEO",
  "CFO",
  "COO",
  "CTO",
  "CHRO",
  "Director",
  "Managing Director",
  "Partner",
  "Proprietor",
  "Owner",
  "Founder",
  "Co-Founder",
  "HR Manager",
  "HR Head",
  "Admin Manager",
  "Finance Manager",
  "Company Secretary",
  "Compliance Officer",
  "Accounts Manager",
  "General Manager",
  "Other",
];

const COMPANY_TYPES = [
  "Private Limited",
  "LLP",
  "Partnership",
  "Proprietorship",
  "One Person Company",
  "Public Limited",
  "Section 8 (NGO)",
  "Trust",
  "Society",
  "Government Entity",
  "HUF",
];

const MFGLIKE = [
  "Manufacturing",
  "Steel",
  "Machinery",
  "Automotive",
  "Chemicals",
  "Plastics",
  "Packaging",
  "Electrical & Electronic Mfg",
  "Mining & Metals",
  "Petrochemicals",
  "Pharmaceuticals",
  "Food Production",
  "Dairy",
  "Textiles",
  "Semiconductors",
  "Consumer Electronics",
  "Consumer Goods",
  "Furniture",
  "Building Materials",
  "Robotics",
  "Aerospace & Defense",
];

const RETAILLIKE = [
  "Retail",
  "E-commerce",
  "Supermarkets",
  "Restaurants",
  "Hotels & Resorts",
  "Hospitality",
  "Food & Beverages",
  "Jewellery",
  "Luxury Goods",
  "Wholesale",
  "Apparel & Fashion",
  "Cosmetics",
  "Leisure Travel & Tourism",
  "Tourism",
  "Travel & Hospitality",
  "Sports",
];

const ITLIKE = [
  "Information Technology",
  "Computer Software",
  "SaaS",
  "IT Consulting",
  "IT Services & Outsourcing",
  "Mobile Applications",
  "Telecommunications",
  "Technology",
  "Digital Marketing",
  "Fintech",
  "Online Media",
  "Animation & VFX",
];

/* =========================
   UTILS (EXACT LOGIC)
========================= */

function indType(ind?: string) {
  if (!ind) return "svc";
  if (MFGLIKE.indexOf(ind) > -1) return "mfg";
  if (RETAILLIKE.indexOf(ind) > -1) return "retail";
  if (ITLIKE.indexOf(ind) > -1) return "it";
  return "svc";
}

const CATS = [
  "PF & ESIC",
  "Payroll",
  "Tax & GST",
  "HR Compliance",
  "Licensing",
  "Documentation",
];

function calcScore(ans: any, qs: Question[]) {
  const cs: any = {};
  CATS.forEach((c) => (cs[c] = { t: 0, m: 0 }));
  qs.forEach((q) => {
    const a = ans[q.id];
    if (a !== undefined) {
      cs[q.cat].t += a.v;
      cs[q.cat].m += 1;
    }
  });
  let ov = 0,
    mx = 0,
    bd: any = {};
  CATS.forEach((c) => {
    const s = cs[c];
    if (s.m > 0) {
      bd[c] = Math.round((s.t / s.m) * 100);
      ov += s.t;
      mx += s.m;
    }
  });
  return {
    score: mx > 0 ? Math.round((ov / mx) * 100) : 0,
    bd,
  };
}

function getRisk(s: number) {
  if (s >= 80) return { lv: "Low Risk", cl: "#10b981", em: "🟢", gr: "A" };
  if (s >= 65) return { lv: "Medium Risk", cl: "#eab308", em: "🟡", gr: "B" };
  if (s >= 50) return { lv: "High Risk", cl: "#f97316", em: "🟠", gr: "C" };
  return { lv: "Critical Risk", cl: "#ef4444", em: "🔴", gr: "D" };
}

function getFlags(a: any) {
  const f: any[] = [];
  const ck: any[] = [
    ["epfo", 1, "🚨", "EPFO issue", "critical"],
    ["esic", 0, "🚨", "ESIC issue", "critical"],
    ["tds", 0.5, "⚠️", "TDS issue", "high"],
  ];
  ck.forEach((c) => {
    if (a[c[0]] && a[c[0]].v <= c[1]) {
      f.push({ i: c[2], t: c[3], s: c[4] });
    }
  });
  return f;
}

function bizMaturity(info: any, ans: any) {
  let sc = 0;
  const mx = 7;

  const items = [];

  const safeAns = ans || {};
  const safeInfo = info || {};

  const hasDomain =
    safeInfo.email &&
    !safeInfo.email.includes("gmail") &&
    !safeInfo.email.includes("yahoo") &&
    !safeInfo.email.includes("outlook");

  items.push({ n: "Company Domain Email", v: !!hasDomain });
  sc += hasDomain ? 1 : 0;

  const hasGst = safeInfo.gstNumber && safeInfo.gstNumber.length === 15;
  items.push({ n: "GST Registration", v: !!hasGst });
  sc += hasGst ? 1 : 0;

  const hasAcct = safeAns?.acctSoftware?.v >= 0.5;
  items.push({ n: "Accounting Software", v: !!hasAcct });
  sc += hasAcct ? 1 : 0;

  const hasDsc = safeAns?.dsc?.v >= 0.5;
  items.push({ n: "Digital Signature (DSC)", v: !!hasDsc });
  sc += hasDsc ? 1 : 0;

  const hasLi = safeInfo.linkedIn && safeInfo.linkedIn.length > 5;
  items.push({ n: "LinkedIn Presence", v: !!hasLi });
  sc += hasLi ? 1 : 0;

  const corpTypes = ["Private Limited", "LLP", "Public Limited", "OPC"];
  const isCorp = corpTypes.includes(safeInfo.companyType);
  items.push({ n: "Corporate Structure", v: !!isCorp });
  sc += isCorp ? 1 : 0;

  items.push({ n: "Company Website", v: !!hasDomain });
  sc += hasDomain ? 1 : 0;

  const score = Math.round((sc / mx) * 100) || 0;

  return { score, items };
}

type Plan = {
  id: "basic" | "premium";
  name: string;
  price: number;
  desc: string;
  highlight?: boolean;
  features: { text: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Detailed",
    price: 999,
    desc: "27 Qs · 3-page PDF",
    features: [
      { text: "27 Questions", included: true },
      { text: "3-page PDF report", included: true },
      { text: "All flags + statutory refs", included: true },
      { text: "+13 deep-dive questions", included: true },
      { text: "Penalty breakdown per gap", included: true },
      { text: "4 service-wise advisories", included: true },
      { text: "Business maturity score", included: true },
      { text: "30-day roadmap", included: false },
      { text: "Expert call", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 1999,
    desc: "40 Qs · 4-page PDF",
    highlight: true,
    features: [
      { text: "40 Questions", included: true },
      { text: "4-page PDF report", included: true },
      { text: "Everything in Detailed", included: true },
      { text: "+13 premium questions", included: true },
      { text: "30-day action roadmap", included: true },
      { text: "90-day strategic plan", included: true },
      { text: "Document checklist", included: true },
      { text: "15-min expert call", included: true },
      { text: "Priority WhatsApp support", included: true },
    ],
  },
];

/* =========================
   QUESTION ENGINE (FULL)
========================= */

function buildQs(iT: string, st?: string) {
  const stN = st || "your state";

  const free: Question[] = [
    {
      id: "epfo",
      cat: "PF & ESIC",
      icon: "◆",
      text: "Is your organization registered with EPFO?",
      ref: "EPF & MP Act 1952",
      opts: [
        { l: "Yes, fully compliant", ic: "✅", v: 1 },
        { l: "Registered but delays", ic: "⚠️", v: 0.5 },
        { l: "Not registered", ic: "❌", v: 0 },
        { l: "Not sure", ic: "❓", v: 0.2 },
      ],
    },
    {
      id: "esic",
      cat: "PF & ESIC",
      icon: "◆",
      text: "Is ESIC compliance maintained?",
      ref: "ESI Act",
      opts: [
        { l: "Fully compliant", ic: "✅", v: 1 },
        { l: "Partial issues", ic: "⚠️", v: 0.5 },
        { l: "Not registered", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "payroll",
      cat: "Payroll",
      icon: "◇",
      text: "Payroll processing method?",
      ref: "Wage Rules",
      opts: [
        { l: "Automated", ic: "✅", v: 1 },
        { l: "Semi-auto", ic: "⚠️", v: 0.7 },
        { l: "Manual", ic: "❌", v: 0.3 },
        { l: "Outsourced", ic: "✅", v: 0.9 },
      ],
    },
    {
      id: "tds",
      cat: "Payroll",
      icon: "◇",
      text: "TDS deduction accuracy?",
      ref: "Income Tax Act",
      opts: [
        { l: "Accurate", ic: "✅", v: 1 },
        { l: "Occasional delay", ic: "⚠️", v: 0.6 },
        { l: "Incorrect", ic: "❌", v: 0.2 },
        { l: "Not deducted", ic: "❌", v: 0 },
      ],
    },
    {
      id: "salaryDelay",
      cat: "Payroll",
      icon: "◇",
      text: "Salary payment timeliness?",
      ref: "Payment of Wages Act",
      opts: [
        { l: "Always on time", ic: "✅", v: 1 },
        { l: "Occasional delays", ic: "⚠️", v: 0.6 },
        { l: "Frequent delays", ic: "❌", v: 0.2 },
        { l: "Not tracked", ic: "❓", v: 0.3 },
      ],
    },
    {
      id: "gst",
      cat: "Tax & GST",
      icon: "◈",
      text: "GST filing compliance?",
      ref: "CGST Act",
      opts: [
        { l: "Always on time", ic: "✅", v: 1 },
        { l: "Delayed sometimes", ic: "⚠️", v: 0.6 },
        { l: "Missed filings", ic: "❌", v: 0.2 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "gstPayment",
      cat: "Tax & GST",
      icon: "◈",
      text: "GST payment accuracy?",
      ref: "GST Rules",
      opts: [
        { l: "Accurate", ic: "✅", v: 1 },
        { l: "Minor mismatches", ic: "⚠️", v: 0.6 },
        { l: "Frequent issues", ic: "❌", v: 0.2 },
        { l: "Not sure", ic: "❓", v: 0.3 },
      ],
    },
    {
      id: "hrPolicy",
      cat: "HR Compliance",
      icon: "◇",
      text: "HR policies documented?",
      ref: "Labor Codes",
      opts: [
        { l: "Fully documented", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.6 },
        { l: "Not documented", ic: "❌", v: 0 },
        { l: "In progress", ic: "⚙️", v: 0.4 },
      ],
    },
    {
      id: "posh",
      cat: "HR Compliance",
      icon: "◇",
      text: "POSH compliance?",
      ref: "POSH Act",
      opts: [
        { l: "Fully compliant", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.5 },
        { l: "Not implemented", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 0.7 },
      ],
    },
    {
      id: "leavePolicy",
      cat: "HR Compliance",
      icon: "◇",
      text: "Leave policy compliance?",
      ref: "Shops Act",
      opts: [
        { l: "Defined & followed", ic: "✅", v: 1 },
        { l: "Defined only", ic: "⚠️", v: 0.6 },
        { l: "Not defined", ic: "❌", v: 0 },
        { l: "Not sure", ic: "❓", v: 0.3 },
      ],
    },
    {
      id: "tradelicense",
      cat: "Licensing",
      icon: "◆",
      text: "Trade license status?",
      ref: "Municipal Rules",
      opts: [
        { l: "Valid", ic: "✅", v: 1 },
        { l: "Expired", ic: "⚠️", v: 0.4 },
        { l: "Not obtained", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 1 },
      ],
    },
    {
      id: "professionalTax",
      cat: "Licensing",
      icon: "◆",
      text: "Professional Tax compliance?",
      ref: "State PT Act",
      opts: [
        { l: "Fully compliant", ic: "✅", v: 1 },
        { l: "Partial issues", ic: "⚠️", v: 0.6 },
        { l: "Not registered", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "documents",
      cat: "Documentation",
      icon: "◈",
      text: "Employee records maintained?",
      ref: "Labor Codes",
      opts: [
        { l: "Fully maintained", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.6 },
        { l: "Not maintained", ic: "❌", v: 0 },
        { l: "Manual only", ic: "❓", v: 0.3 },
      ],
    },
    {
      id: "auditTrail",
      cat: "Documentation",
      icon: "◈",
      text: "Compliance audit trail available?",
      ref: "Audit Standards",
      opts: [
        { l: "Complete", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.6 },
        { l: "Not maintained", ic: "❌", v: 0 },
        { l: "Not sure", ic: "❓", v: 0.3 },
      ],
    },
  ];

  /* ========= INDUSTRY ADDITIONS ========= */

  if (iT === "mfg") {
    free.push({
      id: "factoryLic",
      cat: "Licensing",
      icon: "◆",
      text: "Factory license status?",
      ref: "Factories Act 1948",
      opts: [
        { l: "Valid", ic: "✅", v: 1 },
        { l: "Pending renewal", ic: "⚠️", v: 0.5 },
        { l: "Not obtained", ic: "❌", v: 0 },
        { l: "Applied", ic: "⚙️", v: 0.4 },
      ],
    });
  } else if (iT === "retail") {
    free.push({
      id: "shopact",
      cat: "Licensing",
      icon: "◆",
      text: `S&E license in ${stN}?`,
      ref: "Shops & Establishment Act",
      opts: [
        { l: "Valid", ic: "✅", v: 1 },
        { l: "Pending", ic: "⚠️", v: 0.5 },
        { l: "Not obtained", ic: "❌", v: 0 },
        { l: "Applied", ic: "⚙️", v: 0.4 },
      ],
    });
  } else if (iT === "it") {
    free.push({
      id: "multiStatePT",
      cat: "Licensing",
      icon: "◇",
      text: "PT registered in all states?",
      ref: "State PT Acts",
      opts: [
        { l: "Yes", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.5 },
        { l: "Only HQ", ic: "❌", v: 0.2 },
        { l: "Not applicable", ic: "➖", v: 1 },
      ],
    });
  }

  /* ========= DETAILED ========= */
  const detailed: Question[] = [
    {
      id: "pfContrib",
      cat: "PF & ESIC",
      icon: "◇",
      text: "Are PF contributions calculated on full basic wage (post Supreme Court ruling)?",
      ref: "EPF Act 1952, SC Surya Roshni judgment 2019 upheld 2024",
      opts: [
        { l: "Yes, on full basic + DA as per SC ruling", ic: "✅", v: 1 },
        {
          l: "Still calculating on restricted ₹15,000 ceiling",
          ic: "⚠️",
          v: 0.5,
        },
        { l: "Not sure how it is calculated", ic: "❓", v: 0.3 },
        { l: "Contributions are irregular/delayed", ic: "❌", v: 0 },
      ],
    },
    {
      id: "esicClaim",
      cat: "PF & ESIC",
      icon: "◆",
      text: "Are employees aware of ESIC benefits (medical, maternity, disability)?",
      ref: "ESIC Act 1948, ESIC Benefit Circulars 2024",
      opts: [
        {
          l: "Yes, regular awareness + claim assistance provided",
          ic: "✅",
          v: 1,
        },
        { l: "Some awareness, no formal program", ic: "⚠️", v: 0.5 },
        { l: "Employees are not aware at all", ic: "❌", v: 0.2 },
        { l: "ESIC not applicable to our org", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "ctcStructure",
      cat: "Payroll",
      icon: "◇",
      text: "Is CTC structure optimized for tax-efficient components?",
      ref: "IT Act Sec 10 — HRA, LTA, Meal exemptions (FY 2025-26 limits)",
      opts: [
        { l: "Yes, includes HRA/LTA/meal/NPS/reimbursements", ic: "✅", v: 1 },
        { l: "Basic structure with minimal optimization", ic: "⚠️", v: 0.5 },
        { l: "Flat salary, no breakup at all", ic: "❌", v: 0.2 },
        { l: "Currently restructuring CTC", ic: "⚙️", v: 0.4 },
      ],
    },
    {
      id: "fnf",
      cat: "Payroll",
      icon: "◇",
      text: "How is Full & Final Settlement handled when employees exit?",
      ref: "Payment of Wages Act 1936, Code on Wages 2019 Sec 17",
      opts: [
        { l: "Processed within 2 working days with checklist", ic: "✅", v: 1 },
        { l: "Processed but takes 1-2 months", ic: "⚠️", v: 0.5 },
        { l: "No standard process, handled ad-hoc", ic: "❌", v: 0.1 },
        { l: "Currently setting up F&F process", ic: "⚙️", v: 0.3 },
      ],
    },
    {
      id: "gstRecon",
      cat: "Tax & GST",
      icon: "◈",
      text: "Do you perform regular GST reconciliation (GSTR-2B vs purchase register)?",
      ref: "CGST Act Sec 16(2)(aa), Rule 36(4) — ITC matching (2024 amendment)",
      opts: [
        { l: "Monthly reconciliation before filing", ic: "✅", v: 1 },
        { l: "Quarterly or occasionally", ic: "⚠️", v: 0.5 },
        { l: "Never done any reconciliation", ic: "❌", v: 0 },
        { l: "Outsourced to CA, not sure", ic: "❓", v: 0.4 },
      ],
    },
    {
      id: "tdsQuarterly",
      cat: "Tax & GST",
      icon: "◈",
      text: "Are quarterly TDS returns (24Q, 26Q, 27Q) filed on time?",
      ref: "IT Act Sec 200(3), Rule 31A (FY 2025-26 due dates)",
      opts: [
        { l: "Always on time — all quarters filed", ic: "✅", v: 1 },
        { l: "Usually with minor delays", ic: "⚠️", v: 0.6 },
        { l: "Frequently late — notices received", ic: "❌", v: 0.1 },
        { l: "Not sure, handled by external CA", ic: "❓", v: 0.4 },
      ],
    },
    {
      id: "poshTraining",
      cat: "HR Compliance",
      icon: "◆",
      text: "Is annual POSH awareness training conducted for all employees?",
      ref: "PoSH Act 2013 Sec 19(c), MoWCD Guidelines 2024",
      opts: [
        { l: "Yes, annually with signed attendance records", ic: "✅", v: 1 },
        {
          l: "Done once when policy was created, not annual",
          ic: "⚠️",
          v: 0.4,
        },
        { l: "Never conducted any POSH training", ic: "❌", v: 0 },
        { l: "Planning to conduct this year", ic: "⚙️", v: 0.2 },
      ],
    },
    {
      id: "gratuity",
      cat: "HR Compliance",
      icon: "◆",
      text: "Is gratuity provisioning/payment done for eligible employees?",
      ref: "Payment of Gratuity Act 1972 (limit revised to ₹25L)",
      opts: [
        { l: "Yes, properly provisioned & paid", ic: "✅", v: 1 },
        { l: "Paid on request but not provisioned", ic: "⚠️", v: 0.4 },
        { l: "Not aware of obligations", ic: "❌", v: 0 },
        { l: "No employee completed 5 years", ic: "➖", v: 0.7 },
      ],
    },
    {
      id: "labourLaw",
      cat: "Licensing",
      icon: "◆",
      text: "Are you aware of and preparing for the 4 Labour Codes?",
      ref: "Labour Codes 2020 — implemented across states",
      opts: [
        { l: "Fully aware and aligned", ic: "✅", v: 1 },
        { l: "Partially aware", ic: "⚠️", v: 0.5 },
        { l: "Not aware at all", ic: "❓", v: 0.2 },
        { l: "Aware but not implemented", ic: "⚙️", v: 0.3 },
      ],
    },
    {
      id: "contractLabour",
      cat: "Licensing",
      icon: "◆",
      text: "If using contract/gig workers, do you have CLRA license?",
      ref: "CLRA Act 1970",
      opts: [
        { l: "Yes, fully compliant", ic: "✅", v: 1 },
        { l: "Partial compliance", ic: "⚠️", v: 0.5 },
        { l: "No license", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 1 },
      ],
    },
    {
      id: "auditReady",
      cat: "Documentation",
      icon: "◈",
      text: "Are you inspection-ready today?",
      ref: "Labour Inspection Protocol",
      opts: [
        { l: "Fully ready", ic: "✅", v: 1 },
        { l: "Minor gaps", ic: "⚠️", v: 0.5 },
        { l: "Major gaps", ic: "❌", v: 0.1 },
        { l: "Not prepared", ic: "❌", v: 0 },
      ],
    },
    {
      id: "bizEmail",
      cat: "Documentation",
      icon: "◇",
      text: "Do you use company domain email?",
      ref: "DPDP Act 2023",
      opts: [
        { l: "Yes", ic: "✅", v: 1 },
        { l: "Mixed", ic: "⚠️", v: 0.5 },
        { l: "Only Gmail/Yahoo", ic: "❌", v: 0.2 },
        { l: "Setting up", ic: "⚙️", v: 0.3 },
      ],
    },
    {
      id: "acctSoftware",
      cat: "Documentation",
      icon: "◇",
      text: "What accounting software is used?",
      ref: "Companies Act 2013",
      opts: [
        { l: "Tally/Zoho/QuickBooks", ic: "✅", v: 1 },
        { l: "Basic software", ic: "⚠️", v: 0.5 },
        { l: "Excel only", ic: "❌", v: 0.2 },
        { l: "No system", ic: "❌", v: 0 },
      ],
    },
  ];

  /* ========= PREMIUM ========= */
  const premium: Question[] = [
    {
      id: "pfNomination",
      cat: "PF & ESIC",
      icon: "◈",
      text: "Have all employees filed PF e-Nomination?",
      ref: "EPFO 2024 drive",
      opts: [
        { l: "100% completed", ic: "✅", v: 1 },
        { l: "50-80%", ic: "⚠️", v: 0.5 },
        { l: "<50%", ic: "❌", v: 0.2 },
        { l: "Not aware", ic: "❓", v: 0.1 },
      ],
    },
    {
      id: "pfTransfer",
      cat: "PF & ESIC",
      icon: "◇",
      text: "Are PF transfers assisted?",
      ref: "EPFO Form 13",
      opts: [
        { l: "Yes", ic: "✅", v: 1 },
        { l: "Employee handles", ic: "⚠️", v: 0.5 },
        { l: "Not aware", ic: "❓", v: 0.2 },
        { l: "No transfers needed", ic: "➖", v: 0.6 },
      ],
    },
    {
      id: "payslip",
      cat: "Payroll",
      icon: "◇",
      text: "Are payslips issued monthly?",
      ref: "Code on Wages",
      opts: [
        { l: "Auto-generated", ic: "✅", v: 1 },
        { l: "On request", ic: "⚠️", v: 0.5 },
        { l: "Not generated", ic: "❌", v: 0 },
        { l: "Partial", ic: "⚠️", v: 0.3 },
      ],
    },
    {
      id: "bonus",
      cat: "Payroll",
      icon: "◇",
      text: "Is statutory bonus paid?",
      ref: "Bonus Act 1965",
      opts: [
        { l: "Yes", ic: "✅", v: 1 },
        { l: "Ex-gratia", ic: "⚠️", v: 0.5 },
        { l: "Not paid", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "minWage",
      cat: "Payroll",
      icon: "◇",
      text: "Are wages above minimum wage?",
      ref: "Minimum Wages Act",
      opts: [
        { l: "Fully compliant", ic: "✅", v: 1 },
        { l: "Not verified", ic: "⚠️", v: 0.5 },
        { l: "Below minimum", ic: "❌", v: 0.1 },
        { l: "Not aware", ic: "❓", v: 0.2 },
      ],
    },
    {
      id: "advanceTax",
      cat: "Tax & GST",
      icon: "◇",
      text: "Is advance tax paid quarterly?",
      ref: "IT Act",
      opts: [
        { l: "Yes", ic: "✅", v: 1 },
        { l: "Irregular", ic: "⚠️", v: 0.5 },
        { l: "Not paid", ic: "❌", v: 0.1 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "gstAnnual",
      cat: "Tax & GST",
      icon: "◇",
      text: "Is GSTR-9/9C filed?",
      ref: "CGST Sec 44",
      opts: [
        { l: "Filed", ic: "✅", v: 1 },
        { l: "Delayed", ic: "⚠️", v: 0.5 },
        { l: "Pending", ic: "❌", v: 0.1 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "leavePolicyPremium",
      cat: "HR Compliance",
      icon: "◆",
      text: "Is leave policy compliant?",
      ref: "S&E Act",
      opts: [
        { l: "Compliant", ic: "✅", v: 1 },
        { l: "Generic", ic: "⚠️", v: 0.5 },
        { l: "No policy", ic: "❌", v: 0.1 },
        { l: "Under review", ic: "⚙️", v: 0.3 },
      ],
    },
    {
      id: "equalPay",
      cat: "HR Compliance",
      icon: "◆",
      text: "Is equal remuneration maintained?",
      ref: "Equal Pay Act",
      opts: [
        { l: "Yes documented", ic: "✅", v: 1 },
        { l: "Informal", ic: "⚠️", v: 0.6 },
        { l: "Not audited", ic: "❓", v: 0.3 },
        { l: "Disparity exists", ic: "❌", v: 0.1 },
      ],
    },
    {
      id: "apprLetter",
      cat: "HR Compliance",
      icon: "◇",
      text: "Are appointment letters issued?",
      ref: "IR Code",
      opts: [
        { l: "100%", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.5 },
        { l: "Missing", ic: "❌", v: 0.1 },
        { l: "Issuing now", ic: "⚙️", v: 0.3 },
      ],
    },
    {
      id: "fireSafety",
      cat: "Licensing",
      icon: "◆",
      text: "Fire NOC status?",
      ref: "Fire Act",
      opts: [
        { l: "Valid", ic: "✅", v: 1 },
        { l: "Expired", ic: "⚠️", v: 0.4 },
        { l: "Not obtained", ic: "❌", v: 0 },
        { l: "Not applicable", ic: "➖", v: 0.8 },
      ],
    },
    {
      id: "dsc",
      cat: "Documentation",
      icon: "◈",
      text: "Do you have valid DSC?",
      ref: "IT Act",
      opts: [
        { l: "Valid", ic: "✅", v: 1 },
        { l: "Expired", ic: "⚠️", v: 0.5 },
        { l: "None", ic: "❌", v: 0.2 },
        { l: "Need more", ic: "⚠️", v: 0.4 },
      ],
    },
    {
      id: "exitRecord",
      cat: "Documentation",
      icon: "◇",
      text: "Are exit records maintained?",
      ref: "Best Practices",
      opts: [
        { l: "Structured", ic: "✅", v: 1 },
        { l: "Partial", ic: "⚠️", v: 0.5 },
        { l: "Ad-hoc", ic: "❌", v: 0.1 },
        { l: "Building now", ic: "⚙️", v: 0.3 },
      ],
    },
  ];

  return {
    free,
    detailed,
    premium,
  };
}

/* =========================
   SERVICE-SPECIFIC QUESTIONS
========================= */

function getSvcQuestions(service: string, st?: string): Question[] | null {
  const stN = st || "your state";

  if (service === "payroll") {
    return [
      {
        id: "sp_epfo",
        cat: "PF & ESIC",
        icon: "◆",
        text: "EPFO compliance?",
        opts: [
          { l: "Yes", v: 1, ic: "✅" },
          { l: "Delayed", v: 0.5, ic: "⚠️" },
          { l: "Not registered", v: 0, ic: "❌" },
          { l: "Not sure", v: 0.2, ic: "❓" },
        ],
      },
      {
        id: "sp_tds",
        cat: "Tax & GST",
        text: "TDS compliance?",
        opts: [
          { l: "Correct", v: 1, ic: "✅" },
          { l: "Delayed", v: 0.6, ic: "⚠️" },
          { l: "Incorrect", v: 0.2, ic: "❌" },
          { l: "Not deducted", v: 0, ic: "❓" },
        ],
      },
    ];
  }

  if (service === "hr") {
    return [
      {
        id: "sh_posh",
        cat: "HR Compliance",
        text: "POSH compliance?",
        opts: [
          { l: "Complete", v: 1, ic: "✅" },
          { l: "Partial", v: 0.5, ic: "⚠️" },
          { l: "Missing", v: 0, ic: "❌" },
          { l: "Not applicable", v: 0.7, ic: "❓" },
        ],
      },
    ];
  }

  if (service === "tax") {
    return [
      {
        id: "st_gstReturn",
        cat: "Tax & GST",
        text: "GST filing status?",
        opts: [
          { l: "On time", v: 1, ic: "✅" },
          { l: "Delayed", v: 0.6, ic: "⚠️" },
          { l: "Missed", v: 0.2, ic: "❌" },
          { l: "Not applicable", v: 0.8, ic: "❓" },
        ],
      },
    ];
  }

  if (service === "licensing") {
    return [
      {
        id: "sl_shopact",
        cat: "Licensing",
        text: `S&E license (${stN})`,
        opts: [
          { l: "Valid", v: 1, ic: "✅" },
          { l: "Expired", v: 0.5, ic: "⚠️" },
          { l: "Not obtained", v: 0, ic: "❌" },
          { l: "Not sure", v: 0.2, ic: "❓" },
        ],
      },
    ];
  }

  return null;
}

/* =========================
   AUTOCOMPLETE (EXACT)
========================= */

type ACProps = {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

function AutoComplete({ items, value, onChange, placeholder }: ACProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const filtered =
    value && value.length
      ? items
          .filter((i) => i.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 12)
      : [];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="ac-wrap" ref={ref}>
      <input
        className="inp"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (value) setOpen(true);
        }}
        style={{ marginBottom: filtered.length > 0 && open ? 0 : 12 }}
      />
      <div className={`ac-list${filtered.length > 0 && open ? " open" : ""}`}>
        {filtered.map((it, i) => (
          <div
            key={i}
            className="ac-item"
            onMouseDown={(e) => {
              e.preventDefault();
              onChange(it);
              setOpen(false);
            }}
          >
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   APP (STATE + LANDING + INFO)
========================= */

type InfoState = {
  companyName: string;
  gstNumber: string;
  industry: string;
  employeeRange: string;
  state: string;
  city: string;
  companyType: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  linkedIn: string;
  consent: boolean;
  // emailV: boolean;
  // phoneV: boolean;
};

export default function App() {
  const [screen, setScreen] = useState<
    "landing" | "info" | "quiz" | "score" | "plans" | "paid"
  >("landing");

  const [formStep, setFormStep] = useState<1 | 2>(1);

  const [info, setInfo] = useState<InfoState>({
    companyName: "",
    gstNumber: "",
    industry: "",
    employeeRange: "",
    state: "",
    city: "",
    companyType: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    linkedIn: "",
    consent: false,
    // emailV: false,
    // phoneV: false,
  });

  const [toast, setToast] = useState<{ e: string; t: string } | null>(null);

  /* =========================
     HELPERS (EXACT)
  ========================= */

  const update = (k: keyof InfoState, v: any) => {
    setInfo((p) => ({ ...p, [k]: v }));
  };

  const showToast = (e: string, t: string) => {
    setToast({ e, t });
    setTimeout(() => setToast(null), 2500);
  };

  const onLinkedInChange = (v: string) => {
    const m = v.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
    update("linkedIn", m ? `https://linkedin.com/in/${m[1]}` : v);
  };

  /* =========================
     VALIDATIONS (EXACT)
  ========================= */

  const gstValid =
    !info.gstNumber ||
    info.gstNumber.length === 0 ||
    info.gstNumber.length === 15;

  const step1Valid =
    info.companyName &&
    info.industry &&
    info.employeeRange &&
    info.companyType &&
    info.state &&
    info.city &&
    gstValid;

  const step2Valid =
    info.contactName && info.email && info.phone && info.consent;

  /* =========================
     SERVICE PARAM
  ========================= */

  const serviceParam = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("service");
  }, []);

  /* =========================
     LANDING
  ========================= */

  /* =========================
   QUIZ ENGINE STATE
========================= */

  type AnswerMap = Record<
    string,
    {
      v: number;
      l?: string;
    }
  >;

  const TEST_MODE = true;

  /* =========================
   APP EXTENSION
========================= */

  // ⬇️ Add INSIDE App() — above return

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [scoreData, setScoreData] = useState<{ score: number; bd: any }>({
    score: 0,
    bd: {},
  });
  const [paid, setPaid] = useState<"basic" | "premium" | null>(null);

  const savedRef = useRef(false);

  /* =========================
   QUESTION RESOLUTION
========================= */

  const industryType = indType(info.industry);
  const QB = buildQs(industryType, info.state);

  const isServiceMode = !!serviceParam;
  const serviceQs = isServiceMode
    ? getSvcQuestions(serviceParam!, info.state)
    : null;

  let activeQs: Question[] = (serviceQs as Question[]) || QB.free;

  if (!isServiceMode) {
    if (paid === "basic") {
      activeQs = [...QB.free, ...QB.detailed];
    } else if (paid === "premium") {
      activeQs = [...QB.free, ...QB.detailed, ...QB.premium];
    }
  }

  /* =========================
   LIVE SCORE
========================= */

  const liveScore = calcScore(answers, activeQs).score;

  /* =========================
   ANSWER HANDLER (EXACT)
========================= */

  const handleAnswer = (qId: string, v: number, l?: string) => {
    const newAnswers = {
      ...answers,
      [qId]: { v, l },
    };

    setAnswers(newAnswers);

    const count = Object.keys(newAnswers).length;
    const total = activeQs.length;

    // milestone toasts
    if (count === Math.ceil(total * 0.25)) {
      showToast("🔥", "25% completed");
    } else if (count === Math.ceil(total * 0.5)) {
      showToast("⚡", "Halfway");
    } else if (count === Math.ceil(total * 0.75)) {
      showToast("🚀", "Almost done");
    }

    const isLast = Object.keys(newAnswers).length >= activeQs.length;

    if (!isLast) {
      setTimeout(() => {
        setCurrentQ((prev) => {
          let next = prev + 1;

          while (activeQs[next] && newAnswers[activeQs[next].id]) {
            next++;
          }

          return next;
        });
      }, 300);
    } else {
      const finalScore = calcScore(newAnswers, activeQs);
      setScoreData(finalScore);

      showToast("🎉", "Completed");

      setTimeout(() => {
        setScreen("score");
      }, 800);
    }
  };

  /* =========================
   PAYMENT FLOW (SIMULATED)
========================= */

  const openPayment = (plan: "basic" | "premium") => {
    const skipIndex = QB.free.length;

    if (TEST_MODE) {
      setPaid(plan);
      setCurrentQ(skipIndex);
      setScreen("paid");
      return;
    }

    // Razorpay integration will come later
  };

  /* =========================
   QUIZ SCREEN
========================= */

  if (screen === "quiz" || screen === "paid") {
    // skip already answered (edge case)
    let cq = currentQ;

    // skip already answered questions
    while (activeQs[cq] && answers[activeQs[cq].id]) {
      cq++;
    }

    const question = activeQs[cq];

    if (!question) {
      const finalScore = calcScore(answers, activeQs);
      setScoreData(finalScore);
      setScreen("score");
      return null;
    }

    const progress = (Object.keys(answers).length / activeQs.length) * 100;
    const risk = getRisk(liveScore);

    return (
      <>
        <GlobalStyles />
        <div className="scr">
          {/* live score */}
          {Object.keys(answers).length > 0 && (
            <div className="lc">
              <div className="ld" style={{ background: risk.cl }} />
              <div className="lv" style={{ color: risk.cl }}>
                {liveScore}%
              </div>
            </div>
          )}

          {/* toast */}
          {toast && (
            <div className="toast">
              <span className="te">{toast.e}</span>
              <span>{toast.t}</span>
            </div>
          )}

          <div className="quiz">
            {/* paid badge */}
            {screen === "paid" && (
              <div
                style={{
                  background: "#6366f1",
                  padding: "6px 14px",
                  borderRadius: 10,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                🔓 {paid === "premium" ? "Premium" : "Detailed"}
              </div>
            )}

            {/* progress */}
            <div className="pbar">
              <div className="pfill" style={{ width: `${progress}%` }} />
            </div>

            <div className="pmeta">
              <span>
                Q {cq + 1}/{activeQs.length}
              </span>
              <span className="st">{Math.round(progress)}%</span>
            </div>

            {/* question */}
            <div className="qc">
              <div className="qcat">
                {question.icon} {question.cat}
              </div>

              <div className="qtxt">{question.text}</div>

              {question.ref && (
                <div
                  style={{
                    fontSize: 10,
                    color: "#6366f1",
                    marginBottom: 12,
                  }}
                >
                  📖 {question.ref}
                </div>
              )}

              <div className="qopts">
                {question.opts.map((o: Option) => (
                  <button
                    key={`${question.id}-${o.l}`}
                    className="qo"
                    onClick={() => handleAnswer(question.id, o.v, o.l)}
                  >
                    <div className="oic">{o.ic}</div>
                    <div>
                      <div className="olbl">{o.l}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* =========================
   RESET + HELPERS
========================= */

  const resetApp = () => {
    setCurrentQ(0);
    setAnswers({});
    setScoreData({ score: 0, bd: {} });
    setPaid(null);
    savedRef.current = false;
    setFormStep(1);
    setScreen("landing");
  };

  /* =========================
   SCORE SCREEN (FREE)
========================= */

  function badge(color: string) {
    return {
      fontSize: 10,
      fontWeight: 700,
      color,
      background: color + "12",
      padding: "4px 12px",
      borderRadius: 99,
      border: `1px solid ${color}25`,
    };
  }

  if (screen === "score") {
    const risk = getRisk(scoreData.score);
    const flags = getFlags(answers);
    const bm: any = bizMaturity(info, answers);

    return (
      <div className="scr">
        <div className="sw tc">
          {/* HEADER */}
          <div style={{ fontSize: 10, color: "#22d3ee", fontWeight: 700 }}>
            Assessment Complete
          </div>

          {/* {info.email && (
            <div style={{ fontSize: 11, color: "#10b981", marginBottom: 8 }}>
              📧 Report emailed to {info.email}
            </div>
          )} */}

          <h2 style={{ fontSize: 24, fontWeight: 800 }}>{info.companyName}</h2>

          <p style={{ color: "#64748b", fontSize: 12, marginBottom: 24 }}>
            {info.industry} · {info.employeeRange} employees ·{" "}
            {info.companyType}
          </p>

          {/* SCORE CIRCLE */}
          <div className="scirc">
            <svg viewBox="0 0 200 200">
              <circle
                cx={100}
                cy={100}
                r={90}
                stroke="#1a2235"
                strokeWidth={10}
                fill="none"
              />
              <circle
                cx={100}
                cy={100}
                r={90}
                stroke={risk.cl}
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={
                  2 * Math.PI * 90 * (1 - scoreData.score / 100)
                }
              />
            </svg>

            <div className="inn">
              <div className="snum" style={{ color: risk.cl }}>
                {scoreData.score}%
              </div>
              <div
                className="sgr"
                style={{ background: `${risk.cl}22`, color: risk.cl }}
              >
                Grade {risk.gr}
              </div>
            </div>
          </div>

          {/* PDF */}
          <button
            className="pdf-btn"
            onClick={async () => {
              try {
                await fetch("/api/send-report", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    info,
                    scoreData,
                    flags,
                    bm,
                    tier: paid,
                  }),
                });

                toastInfotoast.success("Report sent to your email");

                setTimeout(() => {
                  generatePDF(info, scoreData, flags, paid, bm);
                }, 1200);
              } catch {
                toastInfotoast.error("Failed to send report");
              }
            }}
            style={{ marginBottom: 20 }}
          >
            📄 Download & Send Free PDF Report to My Mail
          </button>

          {/* RISK */}
          <div className="rc tc" style={{ width: "100%" }}>
            <div style={{ fontSize: 32 }}>{risk.em}</div>
            <div
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: 600,
                paddingBottom: 8,
              }}
            >
              {risk.lv}
            </div>

            {/* BADGES */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {flags.filter((f) => f.s === "critical").length > 0 && (
                <span style={badge("#ef4444")}>
                  {flags.filter((f) => f.s === "critical").length} Critical
                </span>
              )}
              {flags.filter((f) => f.s === "high").length > 0 && (
                <span style={badge("#f97316")}>
                  {flags.filter((f) => f.s === "high").length} High
                </span>
              )}
              {flags.filter((f) => f.s === "medium").length > 0 && (
                <span style={badge("#eab308")}>
                  {flags.filter((f) => f.s === "medium").length} Medium
                </span>
              )}
            </div>
          </div>

          {/* CATEGORY BARS (FIXED COLORS + STRUCTURE) */}
          <div className="rc">
            <h3>📊 Categories</h3>

            <div className="cbars">
              {Object.keys(scoreData.bd).map((c) => {
                const v = scoreData.bd[c];

                return (
                  <div className="cr" key={c}>
                    <div className="cl">{c}</div>

                    <div className="cbg">
                      <div
                        className="cf"
                        style={{
                          width: `${v}%`,
                          background: (CCOL as any)?.[c],
                        }}
                      />
                    </div>

                    <div
                      className="cv"
                      style={{
                        color:
                          v < 50 ? "#ef4444" : v < 70 ? "#eab308" : "#10b981",
                      }}
                    >
                      {v}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BUSINESS MATURITY (FULL ITEMS FIX) */}
          <div className="rc">
            <h3>🏢 Business Maturity: {bm?.score ?? 0}%</h3>

            {(bm?.items || []).map((it: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 0",
                  fontSize: 11,
                }}
              >
                <span>{it.n}</span>
                <span style={{ color: it.v ? "#10b981" : "#f97316" }}>
                  {it.v ? "✅" : "❌"}
                </span>
              </div>
            ))}
          </div>

          {/* FLAGS */}
          <div className="rc">
            <h3>🚨 Top Risk Flags</h3>

            {flags.slice(0, 3).map((f, i) => (
              <div className="fl" key={i}>
                <span className="fi">{f.i}</span>
                <span>{f.t}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg,#6366f1,#818cf8)",
              borderRadius: 14,
              padding: 24,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
              Unlock Full Report
            </div>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>
              All flags + statutory refs + advisory + multi-page PDF
            </p>

            <button
              style={{
                background: "#fff",
                color: "#6366f1",
                fontWeight: 800,
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setScreen("plans")}
            >
              View Plans →
            </button>
          </div>

          {/* ACTIONS */}
          <div className="rc tc">
            <button className="wabtn">💬 Talk to Expert</button>
          </div>

          <button className="bk" onClick={resetApp}>
            ← Start Over
          </button>
        </div>
      </div>
    );
  }

  /* =========================
   PLANS SCREEN
========================= */

  if (screen === "plans") {
    return (
      <div className="scr">
        <div className="container">
          <h2
            className="title"
            style={{
              textAlign: "center",
              marginTop: 100,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Upgrade your Report
          </h2>

          <div className="plans">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pln ${plan.highlight ? "pop" : ""}`}
              >
                {plan.id === "premium" ?<div className="pbdg">Best Value</div> : null}
                <div className="pnm">{plan.name}</div>
                <div className="ppr">₹{plan.price.toLocaleString()}</div>
                <div
                  style={{ fontSize: 12, paddingBottom: 10, color: "#64748b" }}
                >
                  {plan.desc}
                </div>

                <ul className="pft">
                  {plan.features.map((f, i) => (
                    <li key={i} className={f.included ? "inc" : "exc"} style={{ color: f.included ? "#fff" : "#64748b" }}>
                      {f.included ? "✓" : "✕"} {f.text}
                    </li>
                  ))}
                </ul>

                <button
                  className={`pb ${plan.highlight ? "pri" : "sec"}`}
                  onClick={() => openPayment(plan.id)}
                >
                  {plan.highlight ? "Get Premium" : "Get Detailed"}
                </button>
              </div>
            ))}
          </div>

          <div className="tc">
            <button className="bk" onClick={() => setScreen("score")}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
   PDF GENERATOR (FULL FLOW)
========================= */

  function generatePDF(
    info: any,
    sd: { score: number; bd: any },
    flags: any[],
    tier: "basic" | "premium" | null,
    bm: any,
  ) {
    const risk = getRisk(sd.score);

    const dt = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const reportId = "RPT-" + Math.floor(1000 + Math.random() * 9000);

    const penalty =
      sd.score < 50
        ? "₹10L – ₹50L+"
        : sd.score < 65
          ? "₹5L – ₹15L"
          : sd.score < 80
            ? "₹1L – ₹5L"
            : "< ₹1L";

    const styles = `
  <style>
  @page{size:A4;margin:0}
  body{font-family:'DM Sans',Arial;background:#f8fafc;margin:0;color:#0f172a}

  .page{padding:40px}

  .topbar{
    height:6px;
    background:linear-gradient(90deg,#2563eb,#6366f1,#22d3ee);
    margin:-40px -40px 20px;
  }

  h1{font-size:22px;color:#2563eb;margin:0}
  h2{font-size:14px;color:#2563eb;margin:20px 0 10px}

  .meta{
    position:absolute;
    right:40px;
    top:40px;
    font-size:11px;
    color:#64748b;
    text-align:right;
  }

  .grid{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:12px;
    margin-top:10px;
  }

  .cell{
    background:#f1f5f9;
    padding:10px;
    border-radius:8px;
    font-size:11px;
  }

  .scoreCard{
    border:2px solid ${risk.cl};
    border-radius:14px;
    text-align:center;
    padding:30px;
    margin:20px 0;
    background:#fff;
  }

  .score{
    font-size:52px;
    font-weight:800;
    color:${risk.cl};
  }

  table{
    width:100%;
    border-collapse:collapse;
    margin-top:10px;
  }

  th{
    text-align:left;
    font-size:11px;
    color:#64748b;
    padding:6px;
  }

  td{
    padding:8px 6px;
    border-bottom:1px solid #e2e8f0;
    font-size:11px;
  }

  .bar{
    height:6px;
    border-radius:6px;
    background:#e2e8f0;
    overflow:hidden;
  }

  .fill{
    height:100%;
    background:#10b981;
  }

  .status{
    font-weight:600;
    color:#10b981;
  }

  .maturity{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px;
  }

  .mitem{
    padding:8px;
    border-radius:8px;
    font-size:11px;
    display:flex;
    justify-content:space-between;
  }

  .yes{background:#ecfdf5;color:#065f46}
  .no{background:#fef2f2;color:#7f1d1d}

  .flag{
    border-left:4px solid;
    padding:10px;
    margin:8px 0;
    border-radius:6px;
    font-size:11px;
  }

  .critical{border-color:#ef4444;background:#fef2f2}
  .high{border-color:#f97316;background:#fff7ed}
  .medium{border-color:#eab308;background:#fefce8}

  .footer{
    margin-top:20px;
    font-size:10px;
    color:#64748b;
    text-align:center;
  }
  </style>
  `;

    /* =========================
     PAGE 1
  ========================= */

    let html = `
  <div class="page">
    <div class="topbar"></div>

    <div class="meta">
      Report Date: ${dt}<br/>
      Report ID: ${reportId}<br/>
      Classification: Confidential
    </div>

    <h1>PAYFIX ADVISORS</h1>
    <div style="font-size:12px;color:#64748b">
      Business Compliance Health Check — ${tier ? tier.toUpperCase() : "FREE"} Report
    </div>

    <!-- COMPANY GRID -->
    <div class="grid">
      <div class="cell"><b>Company</b><br/>${info.companyName}</div>
      <div class="cell"><b>Industry</b><br/>${info.industry}</div>
      <div class="cell"><b>Type</b><br/>${info.companyType}</div>

      <div class="cell"><b>Contact</b><br/>${info.contactName} — ${info.designation}</div>
      <div class="cell"><b>Employees</b><br/>${info.employeeRange}</div>
      <div class="cell"><b>Location</b><br/>${info.state}</div>
    </div>

    <!-- SCORE -->
    <div class="scoreCard">
      <div class="score">${sd.score}%</div>
      <div>Grade ${risk.gr} — ${risk.lv}</div>
      <div style="margin-top:6px">
        Estimated Annual Penalty Exposure: <b>${penalty}</b>
      </div>
    </div>

    <!-- CATEGORY -->
    <h2>Category-wise Compliance Score</h2>

    <table>
      <tr>
        <th>Category</th>
        <th>Score</th>
        <th>Performance</th>
        <th>Status</th>
      </tr>

      ${Object.keys(sd.bd)
        .map((c) => {
          const v = sd.bd[c];
          return `
        <tr>
          <td>${c}</td>
          <td>${v}%</td>
          <td>
            <div class="bar">
              <div class="fill" style="width:${v}%"></div>
            </div>
          </td>
          <td class="status">${v >= 80 ? "Compliant" : "Risk"}</td>
        </tr>`;
        })
        .join("")}
    </table>

    <!-- MATURITY -->
    <h2>Business Maturity Score: ${bm.score}%</h2>

    <div class="maturity">
      ${bm.items
        .map(
          (i: any) => `
        <div class="mitem ${i.v ? "yes" : "no"}">
          <span>${i.n}</span>
          <span>${i.v ? "Yes" : "No"}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="footer">
      Page 1 — Payfix Advisors | +91 86809 39401
    </div>
  </div>
  `;

    /* =========================
     PAGE 2
  ========================= */

    html += `
  <div class="page" style="page-break-before:always">
    <div class="topbar"></div>

    <h2>Risk Analysis & Compliance Advisory</h2>

    ${flags
      .map(
        (f, i) => `
      <div class="flag ${f.s}">
        <b>#${i + 1}</b> ${f.t}<br/>
        <small>${f.s} priority</small>
      </div>
    `,
      )
      .join("")}

    <div style="margin-top:30px">
      <h2>Need Expert Assistance?</h2>
      <p style="font-size:12px">
        Our compliance specialists can implement every recommendation.
      </p>

      <b>+91 86809 39401</b>
    </div>

    <div class="footer">
      Page 2 — Payfix Advisors
    </div>
  </div>
  `;

    const win = window.open("", "_blank");

    if (win) {
      win.document.write(`
      <html>
        <head>${styles}</head>
        <body>${html}</body>
      </html>
    `);
      win.document.close();
      setTimeout(() => win.print(), 500);
    }
  }

  if (screen === "landing") {
    const SVC_LABELS: any = {
      payroll: "Payroll & Statutory",
      hr: "HR & People",
      tax: "Tax & GST",
      licensing: "Registration & Licensing",
    };

    const svcName =
      serviceParam && SVC_LABELS?.[serviceParam]
        ? SVC_LABELS[serviceParam]
        : null;

    return (
      <div className="scr">
        <div className="land">
          <div className="logor">
            <img width={80} src="/payfix-logo.svg" />
            <span style={{ paddingLeft: 20, fontSize: 14 }}>
              {svcName ? `${svcName} Check` : "Compliance Check"}
            </span>
          </div>

          <div className="badge">
            {svcName
              ? `${svcName} Quick Assessment — Free`
              : "Free Business Health Assessment"}
          </div>

          <h1>
            {svcName ? (
              <>
                Check Your <span className="gr">{svcName}</span>
                <br />
                Compliance Score
              </>
            ) : (
              <>
                Check Your <span className="gr">Business Compliance</span>
                <br />
                Health Score
              </>
            )}
          </h1>

          <p className="sub">
            {svcName
              ? `Answer 8 targeted questions about your ${svcName.toLowerCase()} compliance.`
              : "Industry-specific questions. State-aware compliance checks."}
          </p>

          <button className="sbtn" onClick={() => setScreen("info")}>
            {svcName ? `Start ${svcName} Check →` : "Start Free Assessment →"}
          </button>

          <div className="trust">
            <span>⚡ Under 5 mins</span>
            <span>🔒 Secure & Private</span>
            <span>📄 Multi-page PDF</span>
            <span>🎯 Industry-specific</span>
          </div>

          <div className="feats">
            {[
              { ic: "🏭", t: "Industry-Aware", d: "Tailored to your sector" },
              { ic: "📍", t: "State-Specific", d: "Uses your state laws" },
              { ic: "📊", t: "PDF Report", d: "3-5 page download" },
              { ic: "📖", t: "Statutory Refs", d: "Latest GOs cited" },
            ].map((f, i) => (
              <div className="ft" key={i}>
                <div className="ic">{f.ic}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 28,
              maxWidth: 500,
              margin: "48px auto 0",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#22d3ee",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: 8,
              }}
            >
              Report Tiers
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
                color: "#fff",
              }}
            >
              {/* FREE */}
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>FREE</div>
                <div style={{ fontSize: 10 }}>14 Questions</div>
              </div>

              {/* BASIC */}
              <div
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                  paddingLeft: 20,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800 }}>₹999</div>
                <div style={{ fontSize: 10 }}>27 Questions</div>
              </div>

              {/* PREMIUM */}
              <div
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                  paddingLeft: 20,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800 }}>₹1,999</div>
                <div style={{ fontSize: 10 }}>40 Questions</div>
              </div>
            </div>
          </div>

          <div className="pw">
            Powered by Payfix Advisors ·
            <a href="/privacy-policy.html"> Privacy Policy</a>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     INFO STEP 1
  ========================= */

  if (screen === "info" && formStep === 1) {
    return (
      <div className="scr iwrap">
        <div className="icard">
          <h2>Company Information</h2>
          <p className="sub">Step 1 of 2</p>

          <label className="lbl">Company Name *</label>
          <input
            className="inp"
            value={info.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="e.g. Acme Technologies Pvt Ltd"
          />

          <div style={{ display: "flex" }}>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <label className="lbl">GST</label>
              <input
                className="inp"
                value={info.gstNumber}
                maxLength={15}
                placeholder="e.g. 22AAAAA0000A1Z5"
                onChange={(e) =>
                  update(
                    "gstNumber",
                    e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                  )
                }
                style={
                  info.gstNumber && info.gstNumber.length !== 15
                    ? { borderColor: "#ef4444" }
                    : {}
                }
              />
            </div>

            <div style={{ width: "100%", paddingLeft: 8 }}>
              <label className="lbl">Company Type *</label>
              <select
                className="inp"
                value={info.companyType}
                onChange={(e) => update("companyType", e.target.value)}
              >
                <option value="">Select</option>
                {COMPANY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="lbl">Industry *</label>
          <AutoComplete
            items={INDUSTRIES}
            value={info.industry}
            onChange={(v) => update("industry", v)}
            placeholder="Start typing... e.g. Manufacturing, IT, Retail"
          />

          <div style={{ display: "flex" }}>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <label className="lbl">Employees *</label>
              <select
                className="inp"
                value={info.employeeRange}
                onChange={(e) => update("employeeRange", e.target.value)}
              >
                <option value="">Select</option>
                {["1-10", "11-50", "51-200", "201-500", "500+"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div style={{ width: "100%", paddingLeft: 8 }}>
              <label className="lbl">State *</label>
              <select
                className="inp"
                value={info.state}
                onChange={(e) => update("state", e.target.value)}
              >
                <option value="">Select</option>
                {STATES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="lbl">City *</label>
          <input
            className="inp"
            value={info.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. Chennai"
            style={{ marginBottom: 20 }}
          />

          <button
            className="ibtn"
            disabled={!step1Valid}
            onClick={() => setFormStep(2)}
          >
            Continue → Contact Details
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     INFO STEP 2
  ========================= */

  if (screen === "info" && formStep === 2) {
    return (
      <div className="scr iwrap">
        <div className="icard">
          <h2>Contact Details</h2>
          <p className="sub">Step 2 of 2</p>

          <div style={{ display: "flex" }}>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <label className="lbl">Contact Person *</label>
              <input
                className="inp"
                placeholder="Full Name"
                value={info.contactName}
                onChange={(e) => update("contactName", e.target.value)}
              />
            </div>

            <div style={{ width: "100%", paddingLeft: 8 }}>
              <label className="lbl">Designation</label>
              <select
                className="inp"
                value={info.designation}
                onChange={(e) => update("designation", e.target.value)}
              >
                <option value="">Select</option>
                {DESIGNATIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="lbl">Business Email *</label>
          <input
            className="inp"
            value={info.email}
            placeholder="you@company.com"
            onChange={(e) => {
              update("email", e.target.value);
              // update("emailV", false);
            }}
          />

          {/* <button
            className="otp-btn"
            disabled={!info.email || info.emailV}
            onClick={() => update("emailV", true)}
          >
            Verify
          </button> */}

          <label className="lbl">Mobile Number *</label>
          <input
            className="inp"
            value={info.phone}
            placeholder="+91 98765 43210"
            onChange={(e) => {
              update("phone", e.target.value);
              // update("phoneV", false);
            }}
          />

          {/* <button
            className="otp-btn"
            disabled={!info.phone || info.phoneV}
            onClick={() => update("phoneV", true)}
          >
            Verify
          </button> */}

          <label className="lbl">LinkedIn (Optional)</label>
          <input
            className="inp"
            value={info.linkedIn}
            placeholder="Paste profile URL or type linkedin.com/in/yourname"
            onChange={(e) => onLinkedInChange(e.target.value)}
          />

          <div className="consent">
            <input
              type="checkbox"
              checked={info.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            <label>
              I consent to Payfix Advisors processing this for compliance
              assessment.
            </label>
          </div>

          <div style={{ display: "flex" }}>
            <button
              className="ibtn"
              style={{
                background: "rgb(26, 34, 53)",
                flex: "0 0 auto",
                width: "auto",
                padding: "13px 20px",
                marginRight: 20,
              }}
              onClick={() => setFormStep(1)}
            >
              ← Back
            </button>
            <button
              className="ibtn"
              disabled={!step2Valid}
              onClick={() => setScreen("quiz")}
            >
              Begin Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

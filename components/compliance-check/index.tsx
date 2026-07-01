"use client";

import React, { useEffect, useRef, useState } from "react";
import toastInfotoast from "react-hot-toast";
import {
  Factory,
  MapPin,
  FileBarChart2,
  BookOpenText,
  Zap,
  ShieldCheck,
  FileText,
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Minus,
  Settings2,
  BookOpen,
  BarChart3,
  Building2,
  AlertOctagon,
  MessageCircle,
  Check,
  X,
  Download,
  PartyPopper,
  Flame,
  Rocket,
  Unlock,
  ArrowRight,
} from "lucide-react";

type LucideIcon = React.ComponentType<{ size?: number; color?: string; className?: string; strokeWidth?: number }>;

function OptIcon({ ic, size = 16 }: { ic: string; size?: number }) {
  const map: Record<string, { Ic: LucideIcon; color: string }> = {
    "✅": { Ic: CheckCircle2, color: "#10b981" },
    "⚠️": { Ic: AlertTriangle, color: "#eab308" },
    "❌": { Ic: XCircle, color: "#ef4444" },
    "❓": { Ic: HelpCircle, color: "#94a3b8" },
    "➖": { Ic: Minus, color: "#94a3b8" },
    "⚙️": { Ic: Settings2, color: "#0f6fd5" },
  };
  const hit = map[ic];
  if (!hit) return null;
  const { Ic, color } = hit;
  return <Ic size={size} color={color} strokeWidth={2} />;
}

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
:root{--bg:#001328;--card:#00203f;--card2:#002c54;--border:#0a3461;--accent:#0f6fd5;--accent2:#ee3234;--accent3:#0057b3;--green:#10b981;--yellow:#eab308;--orange:#f97316;--red:#ef4444;--text:#e2e8f0;--muted:#64748b;--font:'Nunito',sans-serif;--mono:ui-monospace,'SFMono-Regular',monospace}
body{font-family:var(--font);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.glow{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:0}
.g1{width:500px;height:500px;background:rgba(15,111,213,.06);top:-100px;left:-100px}
.g2{width:400px;height:400px;background:rgba(238,50,52,.06);bottom:-50px;right:-50px}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.scr{position:relative;z-index:1;min-height:100vh;animation:fadeUp .5s ease-out}
`}</style>
);

/* =========================
   CONSTANTS (EXACT)
========================= */

const CCOL = {
  "PF & ESIC": "#0f6fd5",
  Payroll: "#ee3234",
  "Tax & GST": "#10b981",
  "HR Compliance": "#0057b3",
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

type FlagSeverity = "critical" | "high" | "medium";
type Flag = {
  id: string;
  s: FlagSeverity;
  t: string;
  ref: string;
  rem: string;
  pen: string;
};

const FLAG_CHECKS: {
  id: string;
  threshold: number;
  severity: FlagSeverity;
  title: string;
  ref: string;
  remediation: string;
  penalty: string;
}[] = [
  {
    id: "epfo",
    threshold: 0.5,
    severity: "critical",
    title: "EPFO registration gap or delayed contribution",
    ref: "EPF & MP Act 1952, Sec 6, 7Q & 14B",
    remediation:
      "Register within 15 days of crossing 20 employees. Regularise any missed months with damages (5–25% p.a.) and interest under Sec 7Q. Enable UAN linkage for every joiner.",
    penalty: "₹5L – ₹25L + 12% interest + damages",
  },
  {
    id: "esic",
    threshold: 0.5,
    severity: "critical",
    title: "ESIC compliance not established",
    ref: "ESI Act 1948, Sec 2A & Reg. 10",
    remediation:
      "Register within 15 days of applicability (10+ employees ≤ ₹21,000 wage). File monthly return + contribution by 15th of following month. Communicate ESIC benefits card to workers.",
    penalty: "₹5L – ₹15L + 12% interest",
  },
  {
    id: "tds",
    threshold: 0.5,
    severity: "high",
    title: "TDS deduction / remittance risk",
    ref: "Income Tax Act 1961, Sec 192, 200 & 201",
    remediation:
      "Reconcile Form 24Q filings against payroll. Remit pending TDS with interest under Sec 201(1A) (1%/mo deduction delay, 1.5%/mo remittance delay). Issue Form 16 within statutory window.",
    penalty: "1–1.5%/mo interest + prosecution risk",
  },
  {
    id: "gst",
    threshold: 0.5,
    severity: "high",
    title: "GST filing gap",
    ref: "CGST Act, Sec 39 & 47",
    remediation:
      "File all pending GSTR-1 / 3B with late fee (₹50/day, max ₹5,000/return) + 18% interest. Set a monthly compliance calendar with two-person review.",
    penalty: "₹50/day per return + 18% interest",
  },
  {
    id: "gstPayment",
    threshold: 0.5,
    severity: "high",
    title: "GST payment accuracy weak",
    ref: "CGST Rule 36(4) — ITC matching",
    remediation:
      "Reconcile GSTR-2B vs purchase register monthly. Freeze ITC on unreconciled invoices. Adopt tax engine or CA-managed workflow.",
    penalty: "Wrong ITC → 100% penalty + interest",
  },
  {
    id: "salaryDelay",
    threshold: 0.5,
    severity: "high",
    title: "Salary payment delay pattern",
    ref: "Payment of Wages Act 1936, Sec 5",
    remediation:
      "Fix wage cut-off (7th of month for ≤1000 employees, 10th for >1000). Direct bank transfer with pay-stub. Delays > 2 days invite Sec 15 complaints.",
    penalty: "₹200 – ₹1000 per default + damages",
  },
  {
    id: "payroll",
    threshold: 0.5,
    severity: "medium",
    title: "Payroll process is ad-hoc or manual",
    ref: "Code on Wages 2019, Sec 17",
    remediation:
      "Move to an automated payroll with a statutory engine (PF/ESI/PT/TDS baked-in). Adopt digital payslips with signed audit trail.",
    penalty: "Indirect — cascades into every statutory error",
  },
  {
    id: "posh",
    threshold: 0.5,
    severity: "medium",
    title: "POSH policy or IC not fully implemented",
    ref: "PoSH Act 2013, Sec 19(c)",
    remediation:
      "Constitute an Internal Committee (with an external member). Run annual awareness training with signed attendance. File Annual Report to District Officer by 31 Dec.",
    penalty: "₹50k – ₹1L + licence risk on repeat",
  },
  {
    id: "hrPolicy",
    threshold: 0.5,
    severity: "medium",
    title: "HR policy documentation weak",
    ref: "Industrial Employment (Standing Orders) Act 1946",
    remediation:
      "Draft handbook covering conduct, leave, discipline, IT / DPDP, exit. Certify Standing Orders where headcount threshold applies. Acknowledgement signature at joining.",
    penalty: "Discretionary, up to ₹5L on inspection",
  },
  {
    id: "leavePolicy",
    threshold: 0.5,
    severity: "medium",
    title: "Leave policy gap",
    ref: "State Shops & Establishment Act",
    remediation:
      "Codify EL / CL / SL entitlements per state law. Track balances centrally. Grant statutory leave with wages; encash lapsed EL at exit.",
    penalty: "Notice + penalty by Labour Commissioner",
  },
  {
    id: "tradelicense",
    threshold: 0.5,
    severity: "medium",
    title: "Trade license lapsed or missing",
    ref: "State ULB / Municipal Rules",
    remediation:
      "Renew via the ULB portal before the annual due date. Keep display copy at premises. Non-renewal invites sealing notice.",
    penalty: "₹5k – ₹50k + sealing risk",
  },
  {
    id: "professionalTax",
    threshold: 0.5,
    severity: "medium",
    title: "Professional Tax non-compliance",
    ref: "State PT Act",
    remediation:
      "Register employer + employee PT for every state you operate in. File monthly / half-yearly returns; annual return by 30 Apr where applicable.",
    penalty: "₹2 – ₹5 per employee per day + interest",
  },
  {
    id: "documents",
    threshold: 0.5,
    severity: "medium",
    title: "Employee records incomplete",
    ref: "Labour Codes / IT Act 44AA record retention",
    remediation:
      "Maintain digital + physical files: appointment letter, KYC, PF/ESI declarations, nominations. Retain for 7 years minimum. Central register in payroll system.",
    penalty: "Discretionary on inspection",
  },
  {
    id: "auditTrail",
    threshold: 0.5,
    severity: "medium",
    title: "Compliance audit trail insufficient",
    ref: "Companies Act 2013, MCA Notification 24 Mar 2021",
    remediation:
      "Enable audit-trail feature in accounting software (mandatory for Pvt Ltd since Apr 2023). Maintain challan register + filing acknowledgements.",
    penalty: "₹10k – ₹5L on statutory audit qualification",
  },
];

function getFlags(a: any): Flag[] {
  const f: Flag[] = [];
  const sevRank: Record<FlagSeverity, number> = { critical: 0, high: 1, medium: 2 };

  FLAG_CHECKS.forEach((c) => {
    if (a[c.id] && a[c.id].v <= c.threshold) {
      f.push({
        id: c.id,
        s: c.severity,
        t: c.title,
        ref: c.ref,
        rem: c.remediation,
        pen: c.penalty,
      });
    }
  });

  f.sort((x, y) => sevRank[x.s] - sevRank[y.s]);
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

  const [toast, setToast] = useState<{ Icon?: LucideIcon; color?: string; t: string } | null>(null);

  /* =========================
     HELPERS (EXACT)
  ========================= */

  const update = (k: keyof InfoState, v: any) => {
    setInfo((p) => ({ ...p, [k]: v }));
  };

  const showToast = (Icon: LucideIcon | null, color: string, t: string) => {
    setToast({ Icon: Icon || undefined, color, t });
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
      showToast(Flame, "#f97316", "25% completed");
    } else if (count === Math.ceil(total * 0.5)) {
      showToast(Zap, "#eab308", "Halfway");
    } else if (count === Math.ceil(total * 0.75)) {
      showToast(Rocket, "#0f6fd5", "Almost done");
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

      showToast(PartyPopper, "#10b981", "Completed");

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
              {toast.Icon && (
                <span className="te" style={{ color: toast.color || "#eab308", display: "inline-flex" }}>
                  <toast.Icon size={20} strokeWidth={2.2} />
                </span>
              )}
              <span>{toast.t}</span>
            </div>
          )}

          <div className="quiz">
            {/* paid badge */}
            {screen === "paid" && (
              <div
                style={{
                  background: "#ee3234",
                  padding: "6px 14px",
                  borderRadius: 10,
                  marginBottom: 12,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Unlock size={14} strokeWidth={2.4} />
                {paid === "premium" ? "Premium" : "Detailed"}
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
                    color: "#ee3234",
                    marginBottom: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <BookOpen size={12} strokeWidth={2} />
                  {question.ref}
                </div>
              )}

              <div className="qopts">
                {question.opts.map((o: Option) => (
                  <button
                    key={`${question.id}-${o.l}`}
                    className="qo"
                    onClick={() => handleAnswer(question.id, o.v, o.l)}
                  >
                    <div className="oic">
                      <OptIcon ic={o.ic} size={16} />
                    </div>
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
          <div style={{ fontSize: 10, color: "#0f6fd5", fontWeight: 700 }}>
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
                stroke="#002c54"
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
            style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}
          >
            <Download size={16} strokeWidth={2.2} />
            Download & Send Free PDF Report to My Mail
          </button>

          {/* RISK */}
          <div className="rc tc" style={{ width: "100%" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: risk.cl,
                margin: "0 auto 6px",
                boxShadow: `0 0 0 6px ${risk.cl}22`,
              }}
            />
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
            <h3>
              <BarChart3 size={16} strokeWidth={2} color="#0f6fd5" />
              Categories
            </h3>

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
            <h3>
              <Building2 size={16} strokeWidth={2} color="#0f6fd5" />
              Business Maturity: {bm?.score ?? 0}%
            </h3>

            {(bm?.items || []).map((it: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0",
                  fontSize: 11,
                }}
              >
                <span>{it.n}</span>
                <span
                  style={{
                    color: it.v ? "#10b981" : "#f97316",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {it.v ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <X size={14} strokeWidth={3} />
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* FLAGS */}
          {flags.length > 0 && (
            <div className="rc">
              <h3>
                <AlertOctagon size={16} strokeWidth={2} color="#ef4444" />
                Top Risk Flags
              </h3>

              {flags.slice(0, 3).map((f, i) => {
                const sevCl =
                  f.s === "critical"
                    ? "#ef4444"
                    : f.s === "high"
                      ? "#f97316"
                      : "#eab308";
                return (
                  <div className="fl" key={i}>
                    <span
                      className="fi"
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: sevCl,
                        marginTop: 6,
                      }}
                    />
                    <span>{f.t}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg,#ee3234,#818cf8)",
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
                color: "#ee3234",
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
            <button
              className="wabtn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/918680939401?text=" +
                    encodeURIComponent(
                      `Hi Payfix — I just completed the compliance check for ${info.companyName} (score ${scoreData.score}%). Would like to discuss next steps.`
                    ),
                  "_blank"
                )
              }
            >
              <MessageCircle size={16} strokeWidth={2.2} />
              Talk to Expert
            </button>
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
   PDF GENERATOR (PREMIUM 4-PAGE)
========================= */

  function generatePDF(
    info: any,
    sd: { score: number; bd: any },
    flags: Flag[],
    tier: "basic" | "premium" | null,
    bm: any,
  ) {
    const risk = getRisk(sd.score);

    const dt = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const reportId = "PFX-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    const penalty =
      sd.score < 50
        ? "₹10L – ₹50L+"
        : sd.score < 65
          ? "₹5L – ₹15L"
          : sd.score < 80
            ? "₹1L – ₹5L"
            : "Under ₹1L";

    const critCount = flags.filter((f) => f.s === "critical").length;
    const highCount = flags.filter((f) => f.s === "high").length;
    const medCount = flags.filter((f) => f.s === "medium").length;

    const catColor = (v: number) =>
      v >= 80 ? "#10b981" : v >= 65 ? "#eab308" : v >= 50 ? "#f97316" : "#ef4444";

    const esc = (s: any) =>
      String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const logoMark = `
<svg width="26" height="26" viewBox="0 0 375 375" xmlns="http://www.w3.org/2000/svg">
  <path fill="#0f6fd5" d="M 206.05 69.36 L 149.95 69.36 C 147.55 69.36 145.28 71.63 145.28 74.03 L 145.28 75.02 C 145.32 76.22 145.42 77.41 145.57 78.61 C 146.86 88.66 150.87 98.14 157.15 106.33 C 163.42 114.51 171.7 120.68 181.14 124.16 C 184.32 125.33 187.62 126.19 190.98 126.72 C 190.98 126.72 191.69 121.53 191.69 109.81 L 191.69 98.73 C 191.69 97.5 192.9 96.66 194 97.34 L 227.69 124.64 C 228.09 124.97 228.09 125.5 227.69 125.83 L 194 152.68 C 192.9 153.55 191.69 152.42 191.69 141.29 L 191.69 141.29 C 191.69 140.06 190.98 139.88 190.3 139.88 L 183.17 139.88 C 175.6 139.88 168.19 138.61 161.29 136.16 C 155.51 134.14 150.16 131.4 145.23 128.05 L 145.23 234.45 C 148.75 234.45 152.13 234.15 155.34 233.55 C 165.98 231.44 175.36 226.15 182.64 218.14 C 189.92 210.13 194.44 200.05 195.51 189.09 C 195.79 185.86 195.9 184.42 195.9 182.25 L 206.05 182.25 C 237.09 182.25 262.48 156.85 262.48 125.82 C 262.49 94.76 237.07 69.36 206.05 69.36 Z"/>
</svg>`;

    const brandHeader = `
<div class="mh">
  <div class="mh-brand">
    ${logoMark}
    <span class="wm">PAYFIX ADVISORS</span>
    <span class="tag">Compliance Health Report</span>
  </div>
  <div class="mh-meta">
    <div>Report · ${esc(reportId)}</div>
    <div>${esc(dt)} · Confidential</div>
  </div>
</div>`;

    const footerRow = (pageNo: string) => `
<div class="foot">
  <span>PAYFIX ADVISORS · payfixadvisors.in · +91 86809 39401</span>
  <span class="pg">${pageNo}</span>
</div>`;

    const styles = `
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #0f172a;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 10.5px;
    line-height: 1.55;
  }

  .p {
    width: 210mm;
    min-height: 297mm;
    padding: 16mm 16mm 22mm;
    position: relative;
    page-break-after: always;
    overflow: hidden;
  }
  .p:last-child { page-break-after: auto; }

  /* Cover ribbon */
  .rib {
    position: absolute; top: 0; left: 0; right: 0; height: 6mm;
    background: linear-gradient(90deg, #0a1a3a 0%, #0f6fd5 55%, #ee3234 55%, #ee3234 100%);
  }

  /* Master header */
  .mh {
    display: flex; justify-content: space-between; align-items: flex-end;
    padding: 8mm 0 4mm;
    border-bottom: 1px solid #0f172a;
    margin-bottom: 6mm;
  }
  .mh-brand { display: flex; align-items: center; gap: 8px; }
  .mh-brand .wm {
    font-weight: 800; font-size: 13px; letter-spacing: 0.02em;
    color: #0a1a3a; font-family: 'DM Sans', sans-serif;
  }
  .mh-brand .tag {
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.14em;
    color: #64748b; margin-left: 6px; padding-left: 8px;
    border-left: 1px solid #cbd5e1;
  }
  .mh-meta {
    text-align: right; font-size: 8.5px; color: #64748b;
    letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.7;
  }
  .mh-meta div { white-space: nowrap; }

  /* Cover title */
  .cover-eyebrow {
    display: inline-block; font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: #ee3234;
    padding: 3px 10px; border: 1px solid #ee3234; border-radius: 2px;
    margin-top: 10mm; margin-bottom: 6mm;
  }
  .cover-title {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 40px; font-weight: 700; line-height: 1.06;
    color: #0a1a3a; margin: 0 0 5mm;
  }
  .cover-sub {
    font-size: 12px; line-height: 1.7; color: #334155;
    max-width: 165mm;
  }
  .cover-sub b { color: #0a1a3a; }

  /* Company info card */
  .who {
    margin-top: 9mm;
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    border: 1px solid #0a1a3a;
  }
  .who > div {
    padding: 4mm 5mm;
    border-right: 1px solid #cbd5e1;
    border-bottom: 1px solid #cbd5e1;
  }
  .who > div:nth-child(3n) { border-right: none; }
  .who > div:nth-child(n+4) { border-bottom: none; }
  .who .k {
    font-size: 7.5px; color: #64748b; text-transform: uppercase;
    letter-spacing: 0.12em; font-weight: 700; margin-bottom: 1.5mm;
  }
  .who .v {
    font-size: 11px; color: #0f172a; font-weight: 600; line-height: 1.4;
  }

  /* Hero score */
  .hero {
    margin-top: 8mm;
    display: grid; grid-template-columns: 78mm 1fr;
    gap: 6mm; align-items: stretch;
  }
  .hero-score {
    background: #0a1a3a; color: #fff;
    padding: 9mm 5mm; text-align: center; border-radius: 2px;
    position: relative;
  }
  .hero-score::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: ${risk.cl};
  }
  .hero-num {
    font-family: 'DM Sans', sans-serif;
    font-size: 68px; font-weight: 800; line-height: 0.95;
    color: ${risk.cl};
  }
  .hero-slash { font-size: 22px; color: #64748b; font-weight: 400; }
  .hero-outof {
    font-size: 10px; color: #94a3b8; margin-top: 2mm;
    letter-spacing: 0.14em; text-transform: uppercase;
  }
  .hero-grade {
    display: inline-block; margin-top: 4mm;
    padding: 2mm 6mm; background: ${risk.cl}; color: #fff;
    border-radius: 999px; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .hero-detail {
    font-size: 11px; line-height: 1.75; color: #334155;
    padding: 3mm 0; display: flex; flex-direction: column; justify-content: center;
  }
  .hero-detail p { margin: 0 0 4mm; }
  .hero-detail p:last-child { margin-bottom: 0; }
  .hero-detail b { color: #0a1a3a; }
  .hero-callout {
    background: #fef2f2; border-left: 3px solid #ee3234;
    padding: 3mm 4mm; margin-top: 3mm;
    font-size: 10.5px;
  }
  .hero-callout .lbl {
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.14em;
    color: #ee3234; font-weight: 700; margin-bottom: 1mm;
  }
  .hero-callout .val { font-size: 13px; font-weight: 700; color: #0a1a3a; }

  /* Severity strip */
  .sev-strip {
    margin-top: 6mm;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 3mm;
  }
  .sev-cell {
    border: 1px solid #cbd5e1; padding: 4mm 4mm;
    border-radius: 2px; text-align: center;
  }
  .sev-cell .n {
    font-family: 'DM Sans', sans-serif; font-size: 22px;
    font-weight: 800; color: #0a1a3a; line-height: 1;
  }
  .sev-cell .l {
    font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.12em;
    color: #64748b; margin-top: 2mm; font-weight: 600;
  }
  .sev-cell.crit .n { color: #ef4444; }
  .sev-cell.hi .n { color: #f97316; }
  .sev-cell.med .n { color: #eab308; }

  /* Section heading */
  .h {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 800;
    color: #0a1a3a; letter-spacing: 0.06em; text-transform: uppercase;
    margin-top: 8mm; padding-bottom: 2mm;
    border-bottom: 1.5px solid #0a1a3a;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .h .num {
    font-size: 8px; color: #64748b; letter-spacing: 0.14em;
    font-weight: 700;
  }
  .h-note {
    font-size: 9.5px; color: #64748b; margin-top: 2.5mm; line-height: 1.6;
  }

  /* Category table */
  .cat { width: 100%; border-collapse: collapse; margin-top: 4mm; }
  .cat th {
    text-align: left; padding: 2.5mm 3mm;
    background: #0a1a3a; color: #fff;
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;
  }
  .cat th.r { text-align: right; }
  .cat td {
    padding: 3mm 3mm; border-bottom: 1px solid #e2e8f0;
    font-size: 10.5px; vertical-align: middle;
  }
  .cat td.r { text-align: right; }
  .cat tr:last-child td { border-bottom: 1px solid #0a1a3a; }
  .cat .bar {
    height: 6px; background: #eef2f7; border-radius: 3px; overflow: hidden;
  }
  .cat .fill { height: 100%; }
  .cat .pill {
    display: inline-block; padding: 1mm 3mm; border-radius: 999px;
    font-size: 8px; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .cat .pill.g { background: #dcfce7; color: #166534; }
  .cat .pill.a { background: #fef3c7; color: #92400e; }
  .cat .pill.r { background: #fee2e2; color: #991b1b; }
  .cat .val { font-weight: 800; font-family: 'DM Sans', sans-serif; }

  /* Maturity grid */
  .mat {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2mm; margin-top: 4mm;
  }
  .mat .row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 3mm 3.5mm; font-size: 10px; border-radius: 2px;
    border: 1px solid #e2e8f0;
  }
  .mat .row .name { font-weight: 500; color: #0f172a; }
  .mat .row .st {
    font-weight: 800; letter-spacing: 0.1em; font-size: 8.5px;
    padding: 1mm 3mm; border-radius: 999px;
  }
  .mat .row.y { background: #f0fdf4; border-color: #bbf7d0; }
  .mat .row.y .st { background: #10b981; color: #fff; }
  .mat .row.n { background: #fff7ed; border-color: #fdba74; }
  .mat .row.n .st { background: #f97316; color: #fff; }

  /* Flag advisory card */
  .flag {
    margin-top: 4mm; display: grid;
    grid-template-columns: 8mm 1fr;
    border: 1px solid #e2e8f0; border-radius: 2px;
    overflow: hidden;
  }
  .flag .sev {
    padding: 3mm 0; display: flex; align-items: center; justify-content: center;
    text-align: center; color: #fff; font-weight: 800;
  }
  .flag .sev.critical { background: #ef4444; }
  .flag .sev.high { background: #f97316; }
  .flag .sev.medium { background: #eab308; color: #422006; }
  .flag .sev .sev-lbl {
    writing-mode: vertical-rl; transform: rotate(180deg);
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.24em;
  }
  .flag .body { padding: 4mm 5mm; }
  .flag .idx {
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.12em;
    color: #64748b; font-weight: 700; margin-bottom: 1mm;
  }
  .flag .t {
    font-size: 12px; font-weight: 700; color: #0a1a3a; margin-bottom: 2mm;
    line-height: 1.35;
  }
  .flag .meta {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4mm;
    margin-bottom: 2.5mm;
  }
  .flag .meta .k {
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.12em;
    color: #64748b; font-weight: 700; margin-bottom: 0.5mm;
  }
  .flag .meta .v { font-size: 9.5px; color: #0f172a; font-weight: 500; }
  .flag .rem {
    margin-top: 2mm; padding-top: 2.5mm;
    border-top: 1px dashed #cbd5e1;
    font-size: 10px; color: #334155; line-height: 1.6;
  }
  .flag .rem .k {
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.12em;
    color: #0f6fd5; font-weight: 700; margin-bottom: 1mm;
    display: block;
  }

  .clean {
    margin-top: 6mm; padding: 10mm 8mm; border: 1px solid #10b981;
    background: #f0fdf4; border-radius: 2px; text-align: center;
  }
  .clean .k {
    font-size: 8px; letter-spacing: 0.16em; text-transform: uppercase;
    color: #166534; font-weight: 700;
  }
  .clean .t {
    font-family: Georgia, serif; font-size: 20px;
    color: #14532d; margin-top: 2mm; font-weight: 700;
  }
  .clean .n {
    font-size: 10px; color: #166534; margin-top: 2mm; line-height: 1.6;
  }

  /* Roadmap */
  .rm {
    display: grid; grid-template-columns: 24mm 1fr;
    gap: 5mm; align-items: stretch;
    padding: 4mm 4mm 4mm 0;
    border-left: 3px solid #0f6fd5;
    margin-top: 4mm; padding-left: 5mm;
  }
  .rm .step { text-align: left; }
  .rm .step-lbl {
    font-size: 7.5px; color: #64748b; text-transform: uppercase;
    letter-spacing: 0.16em; font-weight: 700;
  }
  .rm .step-num {
    font-family: 'DM Sans', sans-serif; font-size: 32px;
    font-weight: 800; color: #0f6fd5; line-height: 1; margin-top: 1mm;
  }
  .rm .step-when {
    font-size: 8.5px; color: #64748b; margin-top: 1mm; font-weight: 600;
  }
  .rm .head {
    font-size: 11px; font-weight: 800; color: #0a1a3a;
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2mm;
  }
  .rm ul {
    margin: 0; padding-left: 4mm; font-size: 10px; line-height: 1.7;
    color: #334155;
  }
  .rm ul li { margin-bottom: 1mm; }
  .rm ul li b { color: #0f172a; }

  /* CTA block */
  .cta {
    margin-top: 9mm; padding: 9mm 8mm;
    background: linear-gradient(135deg, #0a1a3a 0%, #0f6fd5 100%);
    color: #fff; text-align: center; border-radius: 2px;
    position: relative; overflow: hidden;
  }
  .cta::before {
    content: ''; position: absolute; right: -30mm; top: -30mm;
    width: 70mm; height: 70mm; border-radius: 50%;
    background: rgba(238, 50, 52, 0.16);
  }
  .cta-eye {
    font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7); margin-bottom: 3mm; position: relative;
  }
  .cta-title {
    font-family: Georgia, serif; font-size: 22px; font-weight: 700;
    margin-bottom: 4mm; line-height: 1.25; position: relative;
  }
  .cta-sub {
    font-size: 11px; opacity: 0.9; margin-bottom: 5mm;
    max-width: 140mm; margin-left: auto; margin-right: auto;
    line-height: 1.6; position: relative;
  }
  .cta-row {
    display: inline-flex; align-items: center; gap: 8mm;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.02em; position: relative;
  }
  .cta-row .sep {
    display: inline-block; width: 4px; height: 4px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
  }

  /* Signature block */
  .sig {
    margin-top: 8mm; padding-top: 4mm; border-top: 1px solid #cbd5e1;
    display: grid; grid-template-columns: 1fr 1fr; gap: 6mm;
  }
  .sig h4 {
    font-size: 8px; color: #64748b; text-transform: uppercase;
    letter-spacing: 0.14em; margin: 0 0 2mm; font-weight: 700;
  }
  .sig p {
    font-size: 9px; line-height: 1.6; color: #475569; margin: 0;
  }

  /* Footer */
  .foot {
    position: absolute; left: 16mm; right: 16mm; bottom: 10mm;
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 3mm; border-top: 1px solid #cbd5e1;
    font-size: 8px; color: #64748b; letter-spacing: 0.08em;
  }
  .foot .pg {
    font-family: 'DM Sans', sans-serif; font-weight: 800;
    color: #0a1a3a; letter-spacing: 0; font-size: 10px;
  }
</style>`;

    /* =========================
       PAGE 1 · COVER
    ========================= */
    let html = `
<div class="p cover">
  <div class="rib"></div>
  ${brandHeader}

  <div class="cover-eyebrow">Confidential · Prepared for ${esc(info.companyName)}</div>
  <h1 class="cover-title">Compliance Health<br/>Assessment Report</h1>
  <p class="cover-sub">
    A structured audit of your organization's statutory, payroll and HR compliance posture &mdash;
    benchmarked against <b>${esc(info.industry)}</b> industry norms in <b>${esc(info.state)}</b>,
    with prioritized remediation and estimated penalty exposure.
  </p>

  <div class="who">
    <div><div class="k">Company</div><div class="v">${esc(info.companyName)}</div></div>
    <div><div class="k">Industry</div><div class="v">${esc(info.industry)}</div></div>
    <div><div class="k">Structure</div><div class="v">${esc(info.companyType)}</div></div>
    <div><div class="k">Headcount</div><div class="v">${esc(info.employeeRange)} employees</div></div>
    <div><div class="k">Registered State</div><div class="v">${esc(info.state)}</div></div>
    <div><div class="k">Assessment Contact</div><div class="v">${esc(info.contactName)}${info.designation ? " · " + esc(info.designation) : ""}</div></div>
  </div>

  <div class="hero">
    <div class="hero-score">
      <div class="hero-num">${sd.score}<span class="hero-slash">/100</span></div>
      <div class="hero-outof">Compliance Health Score</div>
      <div class="hero-grade">Grade ${risk.gr} &middot; ${risk.lv}</div>
    </div>
    <div class="hero-detail">
      <p>Your organization scored <b>${sd.score}%</b> across ${Object.keys(sd.bd).length} statutory dimensions on the <b>${tier === "premium" ? "40-question Premium" : tier === "basic" ? "27-question Detailed" : "14-question Free"}</b> assessment.</p>
      <p>Based on the specific gaps identified, we estimate the following annual exposure if left unaddressed:</p>
      <div class="hero-callout">
        <div class="lbl">Estimated Annual Penalty Exposure</div>
        <div class="val">${penalty}</div>
      </div>
    </div>
  </div>

  <div class="sev-strip">
    <div class="sev-cell crit"><div class="n">${critCount}</div><div class="l">Critical</div></div>
    <div class="sev-cell hi"><div class="n">${highCount}</div><div class="l">High</div></div>
    <div class="sev-cell med"><div class="n">${medCount}</div><div class="l">Medium</div></div>
    <div class="sev-cell"><div class="n">${bm.score}%</div><div class="l">Maturity</div></div>
  </div>

  ${footerRow("01")}
</div>`;

    /* =========================
       PAGE 2 · BREAKDOWN
    ========================= */
    html += `
<div class="p">
  ${brandHeader}

  <div class="h"><span>Category-wise Compliance Score</span><span class="num">02 · BREAKDOWN</span></div>
  <div class="h-note">
    Score by statutory domain. Domains at or above 80% are treated as broadly compliant; anything below warrants remediation on the timeline outlined in the Advisory section.
  </div>

  <table class="cat">
    <thead>
      <tr>
        <th style="width:34%">Category</th>
        <th class="r" style="width:12%">Score</th>
        <th style="width:34%">Performance</th>
        <th class="r" style="width:20%">Status</th>
      </tr>
    </thead>
    <tbody>
      ${Object.keys(sd.bd)
        .map((c) => {
          const v = sd.bd[c];
          const cl = catColor(v);
          const pillCls = v >= 80 ? "g" : v >= 65 ? "a" : "r";
          const pillTxt = v >= 80 ? "Compliant" : v >= 65 ? "Watchlist" : "Attention";
          return `
      <tr>
        <td><b>${esc(c)}</b></td>
        <td class="r"><span class="val" style="color:${cl}">${v}%</span></td>
        <td><div class="bar"><div class="fill" style="width:${v}%;background:${cl}"></div></div></td>
        <td class="r"><span class="pill ${pillCls}">${pillTxt}</span></td>
      </tr>`;
        })
        .join("")}
    </tbody>
  </table>

  <div class="h" style="margin-top:12mm"><span>Business Maturity Signals</span><span class="num">SCORE ${bm.score}%</span></div>
  <div class="h-note">
    Governance signals observed at the organization level &mdash; independent of statutory scores.
  </div>
  <div class="mat">
    ${bm.items
      .map(
        (i: any) => `
    <div class="row ${i.v ? "y" : "n"}">
      <span class="name">${esc(i.n)}</span>
      <span class="st">${i.v ? "YES" : "NO"}</span>
    </div>`,
      )
      .join("")}
  </div>

  ${footerRow("02")}
</div>`;

    /* =========================
       PAGE 3 · RISK ANALYSIS
    ========================= */
    html += `
<div class="p">
  ${brandHeader}

  <div class="h"><span>Risk Analysis &amp; Compliance Advisory</span><span class="num">03 · FINDINGS</span></div>
  <div class="h-note">
    Each finding below cites the statutory basis and a specific remediation. Penalty ranges are indicative, based on 2024&ndash;25 enforcement patterns and depend on actual inspection scope.
  </div>

  ${
    flags.length === 0
      ? `
  <div class="clean">
    <div class="k">No Major Flags Identified</div>
    <div class="t">Your compliance posture is broadly healthy.</div>
    <div class="n">Continue your monthly filing cadence, maintain the audit trail, and re-run this assessment quarterly to catch drift early.</div>
  </div>`
      : flags
          .map(
            (f, i) => `
  <div class="flag">
    <div class="sev ${f.s}"><span class="sev-lbl">${f.s}</span></div>
    <div class="body">
      <div class="idx">Finding ${String(i + 1).padStart(2, "0")}</div>
      <div class="t">${esc(f.t)}</div>
      <div class="meta">
        <div><div class="k">Statutory Basis</div><div class="v">${esc(f.ref)}</div></div>
        <div><div class="k">Estimated Exposure</div><div class="v">${esc(f.pen)}</div></div>
      </div>
      <div class="rem">
        <span class="k">Recommended Remediation</span>
        ${esc(f.rem)}
      </div>
    </div>
  </div>`,
          )
          .join("")
  }

  ${footerRow("03")}
</div>`;

    /* =========================
       PAGE 4 · ROADMAP + CTA
    ========================= */
    html += `
<div class="p">
  ${brandHeader}

  <div class="h"><span>30 &middot; 60 &middot; 90 Day Compliance Roadmap</span><span class="num">04 · ADVISORY</span></div>
  <div class="h-note">
    A sequenced plan to move from the current score to audit-ready. Sprint priorities are tuned to the flags on the previous page.
  </div>

  <div class="rm">
    <div class="step">
      <div class="step-lbl">Weeks 1&ndash;4</div>
      <div class="step-num">30</div>
      <div class="step-when">Day Sprint</div>
    </div>
    <div>
      <div class="head">Stabilize Critical Exposure</div>
      <ul>
        <li>Close every <b>Critical</b> and <b>High</b> flag from the Findings page; obtain any missing registrations (EPFO / ESIC / PT).</li>
        <li>File all overdue statutory returns to <b>stop the interest clock</b> before the next inspection window.</li>
        <li>Reconcile the last 3 months of PF, ESI and TDS challans against payroll; correct any TAN / UAN mismatches.</li>
      </ul>
    </div>
  </div>

  <div class="rm">
    <div class="step">
      <div class="step-lbl">Months 2&ndash;3</div>
      <div class="step-num">60</div>
      <div class="step-when">Day Sprint</div>
    </div>
    <div>
      <div class="head">Close Medium-Severity Gaps</div>
      <ul>
        <li>Codify HR handbook, POSH IC constitution and training records; run one live POSH session with signed attendance.</li>
        <li>Renew all licenses (Trade, S&amp;E, Fire); align state-wise Professional Tax filings.</li>
        <li>Set up a digital employee records vault (appointment letter, KYC, PF/ESI declarations, nominations).</li>
      </ul>
    </div>
  </div>

  <div class="rm">
    <div class="step">
      <div class="step-lbl">Month 3+</div>
      <div class="step-num">90</div>
      <div class="step-when">Day Sprint</div>
    </div>
    <div>
      <div class="head">Build an Audit-Ready System</div>
      <ul>
        <li>Migrate to automated payroll with a built-in statutory engine (PF, ESI, PT, TDS &mdash; state-aware).</li>
        <li>Monthly reconciliation cadence: challan register, filing acknowledgements, audit-trail enabled in accounting software.</li>
        <li>Quarterly Labour Code readiness review; annual POSH filing by 31 Dec; re-run this Compliance Health Check every 90 days.</li>
      </ul>
    </div>
  </div>

  <div class="cta">
    <div class="cta-eye">Ready to move from risk to compliance?</div>
    <div class="cta-title">Payfix Advisors implements<br/>every recommendation in this report.</div>
    <div class="cta-sub">
      One partner. One retainer. Structured deadline monitoring, a dedicated account manager,
      and payroll built for Indian statutory rigor &mdash; end to end.
    </div>
    <div class="cta-row">
      <span>+91 86809 39401</span>
      <span class="sep"></span>
      <span>info@payfixadvisors.in</span>
      <span class="sep"></span>
      <span>payfixadvisors.in</span>
    </div>
  </div>

  <div class="sig">
    <div>
      <h4>About Payfix Advisors</h4>
      <p>Founder-led compliance &amp; payroll practice serving growing Indian businesses across ${esc(info.state)} and Pan-India. Structured deadline monitoring, dedicated account manager, and a statutory engine built in-house for PF, ESI, PT, TDS and state labour compliance.</p>
    </div>
    <div>
      <h4>Disclaimer</h4>
      <p>This assessment is derived from client-declared inputs on ${esc(dt)}. Penalty ranges are indicative and depend on actual enforcement action, inspection scope and cure period granted. This report does not constitute legal advice; engage Payfix Advisors for a paid on-site audit before relying on any recommendation herein.</p>
    </div>
  </div>

  ${footerRow("04")}
</div>`;

    const win = window.open("", "_blank");

    if (win) {
      win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Compliance Health Report · ${esc(info.companyName)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
${styles}
</head>
<body>${html}</body>
</html>`);
      win.document.close();
      setTimeout(() => win.print(), 700);
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

    const trustItems: { Ic: LucideIcon; t: string }[] = [
      { Ic: Zap, t: "Under 5 mins" },
      { Ic: ShieldCheck, t: "Secure & Private" },
      { Ic: FileText, t: "Multi-page PDF" },
      { Ic: Target, t: "Industry-specific" },
    ];

    const featItems: { Ic: LucideIcon; t: string; d: string }[] = [
      { Ic: Factory, t: "Industry-Aware", d: "Tailored to your sector" },
      { Ic: MapPin, t: "State-Specific", d: "Uses your state laws" },
      { Ic: FileBarChart2, t: "PDF Report", d: "3–5 page download" },
      { Ic: BookOpenText, t: "Statutory Refs", d: "Latest GOs cited" },
    ];

    return (
      <div className="scr">
        <div className="topbar">
          <div className="logor">
            <img className="logoimg" src="/payfix-logo.svg" alt="Payfix Advisors" />
            <span className="lotag">
              {svcName ? `${svcName} Check` : "Compliance Check"}
            </span>
          </div>
        </div>

        <div className="land">
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
            {svcName ? `Start ${svcName} Check` : "Start Free Assessment"}
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>

          <div className="trust">
            {trustItems.map((t, i) => (
              <span key={i}>
                <t.Ic size={14} strokeWidth={1.9} />
                {t.t}
              </span>
            ))}
          </div>

          <div className="feats">
            {featItems.map((f, i) => (
              <div className="ft" key={i}>
                <div className="ic">
                  <f.Ic size={22} strokeWidth={1.7} />
                </div>
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
                color: "#0f6fd5",
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

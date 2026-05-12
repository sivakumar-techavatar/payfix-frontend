/**
 * Centralised brand claims and stats.
 *
 * Every public-facing number or tenure claim on the site reads from this file.
 * Change it here once and the whole site updates — and you stay on a
 * single, defensible story across pages.
 *
 * Substantiation notes (keep accurate):
 *   - founderExperienceYears: years of cumulative founder practice in payroll
 *     & compliance, not the age of the Payfix Advisors entity.
 *   - All "structured" / "dedicated" / "pan India" claims describe
 *     operating model, not outcome guarantees.
 */

export const BRAND = {
  socialProof: "Trusted by growing businesses across India",
  founderExperienceYears: "10+",
  founderExperienceLabel: "Years Founder Experience",

  heroStats: [
    { value: "10+", label: "Years Founder Experience" },
    { value: "Pan India", label: "Service Coverage" },
    { value: "Dedicated", label: "Account Manager" },
    { value: "Structured", label: "Compliance Tracking" },
  ],

  promise: {
    tracking: "Structured Deadline Monitoring",
    accountManager: "Dedicated Account Manager",
    coverage: "Pan India Service Coverage",
    confidential: "Confidential, India-DPDP aligned",
    response: "One business day response time",
  },

  whyHeading: "Why Businesses Choose Payfix",
  whyBigStat: {
    value: "Built For",
    label: "Zero-Default Compliance Tracking",
  },

  industriesLine: "Trusted by businesses across sectors",
} as const;

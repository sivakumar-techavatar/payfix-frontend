/**
 * Fire a lead-conversion event across every analytics platform that
 * the user has configured. Call this from form-submit success handlers.
 *
 * All four trackers are no-ops when their env var isn't set (the
 * script never loaded, so the global isn't defined — we feature-detect).
 */

type LeadPayload = {
  service?: string;
  source?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, payload: unknown) => void;
  }
}

export function trackLead(payload: LeadPayload = {}) {
  if (typeof window === "undefined") return;

  const { service = "Unknown", source = "website", value = 0 } = payload;

  // GA4 / GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "generate_lead",
      lead_service: service,
      lead_source: source,
      value,
      currency: "INR",
    });
  }

  // GA4 direct (when GTM isn't proxying)
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      service,
      source,
      value,
      currency: "INR",
    });
  }

  // Meta Pixel standard "Lead" event
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_category: service,
      value,
      currency: "INR",
    });
  }

  // LinkedIn Insight Tag conversion — uses a numeric conversion ID
  // configured in LinkedIn Campaign Manager. The numeric ID is set
  // per-campaign there, not in env. If you have one, pass it here.
  const liConvId = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID;
  if (window.lintrk && liConvId) {
    window.lintrk("track", { conversion_id: Number(liConvId) });
  }
}

/**
 * Fire a Business Health Check funnel event.
 *
 * Pushes to dataLayer + gtag under a stable event name so a GA4
 * Explore report can chart the funnel: hc_landing_view → hc_start_click
 * → hc_info_step1_complete → hc_info_step2_complete → hc_quiz_started
 * → hc_quiz_progress → hc_quiz_completed_free → hc_score_viewed
 * → hc_plan_selected → hc_submit_clicked → hc_submit_success | hc_submit_error
 * → hc_crm_forward_ok | hc_crm_forward_error → hc_pdf_generated.
 *
 * PII-free: never accepts name, email, phone, or company_name. Only
 * anonymised dimensions (tier, question index, error kind, industry,
 * headcount_band, state, score).
 */
export type HCEvent =
  | "hc_landing_view"
  | "hc_start_click"
  | "hc_info_step1_complete"
  | "hc_info_step2_complete"
  | "hc_quiz_started"
  | "hc_quiz_progress"
  | "hc_quiz_completed_free"
  | "hc_score_viewed"
  | "hc_plan_selected"
  | "hc_submit_clicked"
  | "hc_submit_success"
  | "hc_submit_error"
  | "hc_crm_forward_ok"
  | "hc_crm_forward_error"
  | "hc_pdf_generated";

export function trackHC(event: HCEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };

  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }

  if (window.gtag) {
    window.gtag("event", event, params);
  }
}

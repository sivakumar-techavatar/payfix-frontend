import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRM_URL = () =>
  (process.env.CRM_BACKEND_URL || "https://app-api.payfixadvisors.in").replace(/\/$/, "");

const HEADCOUNT_BANDS = new Set(["1-10", "11-50", "51-200", "201-500", "500+"]);

function riskFromScore(s: number) {
  if (s >= 80) return { level: "Low Risk", grade: "A" };
  if (s >= 65) return { level: "Medium Risk", grade: "B" };
  if (s >= 50) return { level: "High Risk", grade: "C" };
  return { level: "Critical Risk", grade: "D" };
}

function penaltyFromScore(s: number) {
  if (s < 50) return "₹10L – ₹50L+";
  if (s < 65) return "₹5L – ₹15L";
  if (s < 80) return "₹1L – ₹5L";
  return "Under ₹1L";
}

/**
 * Forwards a compliance-check submission to the Payfixer HR CRM at
 * `${CRM_BACKEND_URL}/api/v1/public/leads` with source="health_check" so it
 * lands in the CRM Lead pipeline with score + flags + advisory attached.
 *
 * Fire-and-forget from the browser: even if the CRM is down or the env is
 * misconfigured, this returns a 200 so the PDF flow on the client is never
 * blocked. Errors are logged server-side.
 */
export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip, 8, 60_000)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { info, scoreData, flags, bm, tier, utm } = body || {};

  if (!info?.companyName || !info?.contactName) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const score = Number(scoreData?.score);
  if (!Number.isFinite(score)) {
    return Response.json({ ok: false, error: "Missing score" }, { status: 400 });
  }

  const risk = riskFromScore(score);
  const penalty = penaltyFromScore(score);
  const headcount_band = HEADCOUNT_BANDS.has(info.employeeRange) ? info.employeeRange : null;

  const assessment_snapshot = {
    score,
    grade: risk.grade,
    risk_level: risk.level,
    penalty_exposure: penalty,
    breakdown: scoreData?.bd || {},
    business_maturity: {
      score: bm?.score ?? null,
      items: bm?.items || [],
    },
    flags: (flags || []).map((f: any) => ({
      id: f.id,
      s: f.s,
      title: f.t,
      ref: f.ref,
      remediation: f.rem,
      penalty: f.pen,
    })),
    tier: tier || "free",
    submitted_at: new Date().toISOString(),
    ip,
  };

  const payload = {
    name: String(info.contactName || "").slice(0, 200),
    company_name: String(info.companyName || "").slice(0, 200),
    company_linkedin_url: info.linkedIn || null,
    phone: info.phone || null,
    email: info.email || null,
    designation: info.designation || null,
    industry: info.industry || null,
    state: info.state || null,
    city: info.city || null,
    company_type: info.companyType || null,
    headcount_band,
    source: "health_check",
    assessment_snapshot,
    utm: utm || null,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6_000);

    const res = await fetch(`${CRM_URL()}/api/v1/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[compliance-lead] CRM ${res.status}: ${text.slice(0, 200)}`);
      // Still return 200 to the client so the PDF flow completes gracefully.
      return Response.json({ ok: false, forwarded: false });
    }

    return Response.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[compliance-lead] forward failed:", (err as Error).message);
    return Response.json({ ok: false, forwarded: false });
  }
}

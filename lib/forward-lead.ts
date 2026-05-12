export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  employees?: number | null;
  message?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function forwardLead(
  payload: LeadPayload,
  meta: { ip: string; userAgent?: string } = { ip: "unknown" },
): Promise<{ ok: boolean; status?: number }> {
  const url = process.env.BACKEND_URL;
  if (!url) return { ok: false };

  const key = process.env.BACKEND_INTERNAL_KEY;
  const endpoint = `${url.replace(/\/$/, "")}/api/lead`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "x-internal-key": key } : {}),
        "x-forwarded-for": meta.ip,
        ...(meta.userAgent ? { "x-original-ua": meta.userAgent } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[forwardLead] backend ${res.status} for ${endpoint}`);
    }
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("[forwardLead] failed:", (err as Error).message);
    return { ok: false };
  }
}

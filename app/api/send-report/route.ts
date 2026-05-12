import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/escape-html";
import { headers } from "next/headers";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getResend() {
  const key = process.env.MAIL_SEND_API_KEY;
  if (!key) throw new Error("MAIL_SEND_API_KEY is not configured");
  return new Resend(key);
}

const FROM_ADDRESS = () =>
  process.env.MAIL_FROM_ADDRESS ||
  "Payfix Advisors <reports@payfixadvisors.in>";
const CC_ADDRESS = () =>
  process.env.MAIL_TO_ADDRESS || "info@payfixadvisors.in";

function getRisk(s: number) {
  if (s >= 80) return { lv: "Low Risk", cl: "#10b981", gr: "A" };
  if (s >= 65) return { lv: "Medium Risk", cl: "#eab308", gr: "B" };
  if (s >= 50) return { lv: "High Risk", cl: "#f97316", gr: "C" };
  return { lv: "Critical Risk", cl: "#ef4444", gr: "D" };
}

export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip, 5, 60000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { info, scoreData, flags, bm } = body || {};

  if (!info?.email || !info?.companyName || !scoreData?.score) {
    return Response.json({ error: "Missing report data" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(info.email))) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const risk = getRisk(Number(scoreData.score));

  const html = `
<div style="font-family:Arial;max-width:700px">
  <h2>Compliance Report</h2>
  <p><strong>${escapeHtml(info.companyName)}</strong></p>
  <p>${escapeHtml(info.industry || "")} • ${escapeHtml(info.employeeRange || "")}</p>
  <div style="padding:20px;border:1px solid #eee;border-radius:10px">
    <h1 style="color:${risk.cl}">${escapeHtml(scoreData.score)}%</h1>
    <p>${risk.lv} (Grade ${risk.gr})</p>
  </div>
  <h3>Category Scores</h3>
  ${Object.keys(scoreData.bd || {})
    .map(
      (c) =>
        `<div style="margin-bottom:8px"><b>${escapeHtml(c)}</b>: ${escapeHtml(scoreData.bd[c])}%</div>`,
    )
    .join("")}
  <h3>Business Maturity: ${escapeHtml(bm?.score ?? "-")}%</h3>
  ${(bm?.items || [])
    .map(
      (i: any) =>
        `<div>${escapeHtml(i.n)}: ${i.v ? "Yes" : "No"}</div>`,
    )
    .join("")}
  <h3>Top Risks</h3>
  ${(flags || [])
    .map(
      (f: any) =>
        `<div style="color:#ef4444">• ${escapeHtml(f.t)}</div>`,
    )
    .join("")}
  <hr/>
  <p style="font-size:12px;color:#666">Need help? Contact Payfix Advisors at ${escapeHtml(CC_ADDRESS())}</p>
</div>
`;

  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_ADDRESS(),
      to: String(info.email),
      cc: CC_ADDRESS(),
      subject: `Compliance Report — ${info.companyName}`,
      html,
    });

    if (error) {
      console.error("[send-report] resend error:", error);
      return Response.json({ error: "Send failed" }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[send-report] exception:", (err as Error).message);
    return Response.json({ error: "Send failed" }, { status: 500 });
  }
}

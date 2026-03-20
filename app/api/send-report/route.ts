import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.MAIL_SEND_API_KEY);

function getRisk(s: number) {
  if (s >= 80) return { lv: "Low Risk", cl: "#10b981", gr: "A" };
  if (s >= 65) return { lv: "Medium Risk", cl: "#eab308", gr: "B" };
  if (s >= 50) return { lv: "High Risk", cl: "#f97316", gr: "C" };
  return { lv: "Critical Risk", cl: "#ef4444", gr: "D" };
}

export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0] || "unknown";

  const allowed = rateLimit(ip, 5, 60000);

  if (!allowed) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();

  const { info, scoreData, flags, bm } = body;

  const risk = getRisk(scoreData.score);

  /* =========================
     BUILD EMAIL HTML (SIMPLIFIED REPORT)
  ========================= */

  const html = `
<div style="font-family:Arial;max-width:700px">

  <h2>Compliance Report</h2>

  <p><strong>${info.companyName}</strong></p>
  <p>${info.industry} • ${info.employeeRange}</p>

  <div style="padding:20px;border:1px solid #eee;border-radius:10px">
    <h1 style="color:${risk.cl}">${scoreData.score}%</h1>
    <p>${risk.lv} (Grade ${risk.gr})</p>
  </div>

  <h3>Category Scores</h3>
  ${Object.keys(scoreData.bd)
    .map(
      (c) => `
      <div style="margin-bottom:8px">
        <b>${c}</b>: ${scoreData.bd[c]}%
      </div>
    `,
    )
    .join("")}

  <h3>Business Maturity: ${bm.score}%</h3>
  ${bm.items
    .map(
      (i: any) => `
      <div>${i.n}: ${i.v ? "Yes" : "No"}</div>
    `,
    )
    .join("")}

  <h3>Top Risks</h3>
  ${flags
    .map(
      (f: any) => `
      <div style="color:#ef4444">• ${f.t}</div>
    `,
    )
    .join("")}

  <hr/>

  <p style="font-size:12px;color:#666">
    Need help? Contact Payfix Advisors
  </p>

</div>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Payfix Advisors <onboarding@resend.dev>",
      to: info.email,
      cc: process.env.NEXT_PUBLIC_MAIL_ID!,
      subject: `Compliance Report - ${info.companyName}`,
      html,
    });

    if (error) {
      return Response.json(error, { status: 400 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }
}

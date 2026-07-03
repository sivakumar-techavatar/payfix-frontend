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
  const score = Number(scoreData.score);
  const penalty =
    score < 50
      ? "₹10L – ₹50L+"
      : score < 65
        ? "₹5L – ₹15L"
        : score < 80
          ? "₹1L – ₹5L"
          : "Under ₹1L";

  const catColor = (v: number) =>
    v >= 80 ? "#10b981" : v >= 65 ? "#eab308" : v >= 50 ? "#f97316" : "#ef4444";

  const critCount = (flags || []).filter((f: any) => f.s === "critical").length;
  const highCount = (flags || []).filter((f: any) => f.s === "high").length;
  const medCount = (flags || []).filter((f: any) => f.s === "medium").length;

  const catRows = Object.keys(scoreData.bd || {})
    .map((c) => {
      const v = Number(scoreData.bd[c]);
      const cl = catColor(v);
      const pill = v >= 80 ? "Compliant" : v >= 65 ? "Watchlist" : "Attention";
      return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eef2f7;font-size:13px;color:#0f172a;font-weight:600">${escapeHtml(c)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eef2f7;font-size:13px;color:${cl};font-weight:700;text-align:right;font-family:'DM Sans',Arial,sans-serif">${v}%</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eef2f7;text-align:right">
        <span style="display:inline-block;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;background:${v >= 80 ? "#dcfce7" : v >= 65 ? "#fef3c7" : "#fee2e2"};color:${v >= 80 ? "#166534" : v >= 65 ? "#92400e" : "#991b1b"}">${pill}</span>
      </td>
    </tr>`;
    })
    .join("");

  const matRows = (bm?.items || [])
    .map(
      (i: any) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:12px;color:#334155">${escapeHtml(i.n)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;text-align:right;font-size:11px;font-weight:700;letter-spacing:0.06em;color:${i.v ? "#10b981" : "#f97316"}">${i.v ? "YES" : "NO"}</td>
    </tr>`,
    )
    .join("");

  const flagCards =
    (flags || []).length === 0
      ? `<div style="padding:20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;text-align:center">
      <div style="font-size:11px;color:#166534;font-weight:700;letter-spacing:0.14em;text-transform:uppercase">No Major Flags Identified</div>
      <div style="font-size:14px;color:#14532d;margin-top:6px">Your compliance posture is broadly healthy.</div>
    </div>`
      : (flags || [])
          .map((f: any, i: number) => {
            const sev = f.s || "medium";
            const sevCl =
              sev === "critical" ? "#ef4444" : sev === "high" ? "#f97316" : "#eab308";
            return `
    <table role="presentation" width="100%" style="border-collapse:collapse;margin-bottom:12px;border:1px solid #e2e8f0;border-radius:4px;overflow:hidden">
      <tr>
        <td width="6" style="background:${sevCl}">&nbsp;</td>
        <td style="padding:14px 16px">
          <div style="font-size:9px;color:${sevCl};font-weight:700;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:2px">Finding ${String(i + 1).padStart(2, "0")} · ${sev}</div>
          <div style="font-size:14px;color:#0a1a3a;font-weight:700;line-height:1.35;margin-bottom:6px">${escapeHtml(f.t)}</div>
          ${f.ref ? `<div style="font-size:11px;color:#64748b;margin-bottom:4px"><b style="color:#334155">Basis:</b> ${escapeHtml(f.ref)}</div>` : ""}
          ${f.pen ? `<div style="font-size:11px;color:#64748b;margin-bottom:8px"><b style="color:#334155">Exposure:</b> ${escapeHtml(f.pen)}</div>` : ""}
          ${f.rem ? `<div style="font-size:12px;color:#334155;line-height:1.55;padding-top:8px;border-top:1px dashed #e2e8f0"><b style="color:#0f6fd5">Remediation:</b> ${escapeHtml(f.rem)}</div>` : ""}
        </td>
      </tr>
    </table>`;
          })
          .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
<meta name="x-apple-disable-message-reformatting"/>
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"/>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Inter','DM Sans',Arial,sans-serif;color:#0f172a">
  <div style="max-width:640px;margin:0 auto;background:#ffffff">

    <!-- Ribbon -->
    <div style="height:6px;background:linear-gradient(90deg,#0a1a3a 0%,#0f6fd5 55%,#ee3234 55%,#ee3234 100%)"></div>

    <!-- Header -->
    <table role="presentation" width="100%" style="border-collapse:collapse;padding:0">
      <tr>
        <td style="padding:24px 32px 12px;border-bottom:1px solid #0a1a3a">
          <table role="presentation" width="100%" style="border-collapse:collapse">
            <tr>
              <td>
                <div style="font-family:'DM Sans',Arial,sans-serif;font-weight:800;font-size:14px;color:#0a1a3a;letter-spacing:0.02em">PAYFIX ADVISORS</div>
                <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.16em;color:#64748b;margin-top:2px">Compliance Health Report</div>
              </td>
              <td style="text-align:right;font-size:10px;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;line-height:1.6">
                Confidential<br/>${escapeHtml(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }))}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Cover -->
    <div style="padding:28px 32px 8px">
      <div style="display:inline-block;padding:4px 10px;font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#ee3234;border:1px solid #ee3234;border-radius:2px">Prepared for ${escapeHtml(info.companyName)}</div>
      <h1 style="font-family:Georgia,serif;font-size:28px;color:#0a1a3a;margin:14px 0 8px;line-height:1.15">Your Compliance Health Assessment</h1>
      <p style="font-size:13px;line-height:1.7;color:#334155;margin:0 0 22px">
        Benchmarked against <b style="color:#0a1a3a">${escapeHtml(info.industry || "")}</b> industry norms
        &middot; <b style="color:#0a1a3a">${escapeHtml(info.employeeRange || "")}</b> employees
        &middot; <b style="color:#0a1a3a">${escapeHtml(info.state || "")}</b>
      </p>

      <!-- Hero score -->
      <table role="presentation" width="100%" style="border-collapse:collapse">
        <tr>
          <td width="45%" style="background:#0a1a3a;padding:24px 16px;text-align:center;border-radius:2px">
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:56px;font-weight:800;line-height:1;color:${risk.cl}">${escapeHtml(scoreData.score)}<span style="font-size:20px;color:#64748b;font-weight:400">/100</span></div>
            <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;margin-top:6px">Compliance Health Score</div>
            <div style="display:inline-block;margin-top:10px;padding:5px 14px;background:${risk.cl};color:#ffffff;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Grade ${risk.gr} &middot; ${risk.lv}</div>
          </td>
          <td width="4%">&nbsp;</td>
          <td style="vertical-align:top;padding:4px 0">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ee3234;margin-bottom:4px">Estimated Annual Penalty Exposure</div>
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:22px;font-weight:800;color:#0a1a3a;line-height:1.1">${penalty}</div>
            <div style="font-size:11px;color:#64748b;margin-top:10px;line-height:1.6">Based on the specific gaps identified below, if left unaddressed for a full financial year.</div>
          </td>
        </tr>
      </table>

      <!-- Severity strip -->
      <table role="presentation" width="100%" style="border-collapse:separate;border-spacing:6px 0;margin-top:18px">
        <tr>
          <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;border-radius:2px">
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:20px;font-weight:800;color:#ef4444;line-height:1">${critCount}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;margin-top:4px;font-weight:600">Critical</div>
          </td>
          <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;border-radius:2px">
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:20px;font-weight:800;color:#f97316;line-height:1">${highCount}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;margin-top:4px;font-weight:600">High</div>
          </td>
          <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;border-radius:2px">
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:20px;font-weight:800;color:#eab308;line-height:1">${medCount}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;margin-top:4px;font-weight:600">Medium</div>
          </td>
          <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;border-radius:2px">
            <div style="font-family:'DM Sans',Arial,sans-serif;font-size:20px;font-weight:800;color:#0a1a3a;line-height:1">${escapeHtml(bm?.score ?? "-")}%</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;margin-top:4px;font-weight:600">Maturity</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Categories -->
    <div style="padding:24px 32px 0">
      <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:800;color:#0a1a3a;letter-spacing:0.08em;text-transform:uppercase;padding-bottom:6px;border-bottom:1.5px solid #0a1a3a">Category-wise Compliance Score</div>
      <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:8px">
        ${catRows}
      </table>
    </div>

    <!-- Maturity -->
    <div style="padding:24px 32px 0">
      <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:800;color:#0a1a3a;letter-spacing:0.08em;text-transform:uppercase;padding-bottom:6px;border-bottom:1.5px solid #0a1a3a">Business Maturity Signals · ${escapeHtml(bm?.score ?? "-")}%</div>
      <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:8px">
        ${matRows}
      </table>
    </div>

    <!-- Findings -->
    <div style="padding:24px 32px 0">
      <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:800;color:#0a1a3a;letter-spacing:0.08em;text-transform:uppercase;padding-bottom:6px;border-bottom:1.5px solid #0a1a3a;margin-bottom:12px">Risk Findings &amp; Advisory</div>
      ${flagCards}
    </div>

    <!-- CTA -->
    <div style="margin:24px 32px 0;padding:26px 24px;background:linear-gradient(135deg,#0a1a3a 0%,#0f6fd5 100%);color:#ffffff;text-align:center;border-radius:2px">
      <div style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.75);margin-bottom:8px">Ready to move from risk to compliance?</div>
      <div style="font-family:Georgia,serif;font-size:20px;font-weight:700;line-height:1.3;margin-bottom:12px;color:#ffffff">Payfix Advisors implements<br/>every recommendation in this report.</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.9);margin-bottom:18px;line-height:1.6">One partner. One retainer. Structured deadline monitoring, a dedicated account manager,<br/>and payroll built for Indian statutory rigor &mdash; end to end.</div>

      <!-- Contact row (compact, force-white to defeat Gmail auto-link colouring) -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto">
        <tr>
          <td style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.02em;color:#ffffff;padding:0 8px">
            <a href="tel:+918680939401" style="color:#ffffff !important;text-decoration:none;font-weight:600" target="_blank">+91 86809 39401</a>
          </td>
          <td style="color:rgba(255,255,255,0.5);font-size:10px;padding:0 4px">&middot;</td>
          <td style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:0 8px">
            <a href="mailto:${escapeHtml(CC_ADDRESS())}" style="color:#ffffff !important;text-decoration:none;font-weight:600" target="_blank">${escapeHtml(CC_ADDRESS())}</a>
          </td>
          <td style="color:rgba(255,255,255,0.5);font-size:10px;padding:0 4px">&middot;</td>
          <td style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:0 8px">
            <a href="https://payfixadvisors.in" style="color:#ffffff !important;text-decoration:none;font-weight:600" target="_blank">payfixadvisors.in</a>
          </td>
        </tr>
      </table>

      <!-- Social row (text chips — universally rendered by every email client) -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:18px auto 0">
        <tr>
          <td style="padding:0 5px">
            <a href="https://www.linkedin.com/company/payfix-advisors" target="_blank" style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.25);border-radius:99px;color:#ffffff !important;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">in &middot; LinkedIn</a>
          </td>
          <td style="padding:0 5px">
            <a href="https://www.instagram.com/payfix_advisors" target="_blank" style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.25);border-radius:99px;color:#ffffff !important;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">ig &middot; Instagram</a>
          </td>
          <td style="padding:0 5px">
            <a href="https://www.facebook.com/payfixadvisors" target="_blank" style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.25);border-radius:99px;color:#ffffff !important;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">fb &middot; Facebook</a>
          </td>
          <td style="padding:0 5px">
            <a href="https://wa.me/918680939401" target="_blank" style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.25);border-radius:99px;color:#ffffff !important;text-decoration:none;font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">wa &middot; WhatsApp</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Attached PDF note -->
    <div style="padding:20px 32px 0;font-size:11px;color:#64748b;line-height:1.6">
      The full <b style="color:#0a1a3a">4-page PDF report</b> with the complete 30&middot;60&middot;90 day roadmap has opened in your browser for download. Save it, share it internally, or reply to this email &mdash; we&rsquo;ll respond within one business hour on weekdays.
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px 32px;font-size:10px;color:#94a3b8;line-height:1.6;border-top:1px solid #e2e8f0;margin-top:24px">
      <b style="color:#334155">PAYFIX ADVISORS</b> &middot; payfixadvisors.in &middot; +91 86809 39401<br/>
      This assessment is derived from client-declared inputs. Penalty ranges are indicative and do not constitute legal advice.
    </div>

  </div>
</body>
</html>`;

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

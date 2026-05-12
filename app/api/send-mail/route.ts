import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/escape-html";
import { forwardLead } from "@/lib/forward-lead";
import { headers } from "next/headers";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getResend() {
  const key = process.env.MAIL_SEND_API_KEY;
  if (!key) throw new Error("MAIL_SEND_API_KEY is not configured");
  return new Resend(key);
}

const TO_ADDRESS = () =>
  process.env.MAIL_TO_ADDRESS || "info@payfixadvisors.in";
const FROM_ADDRESS = () =>
  process.env.MAIL_FROM_ADDRESS ||
  "Payfix Advisors <leads@payfixadvisors.in>";

export async function POST(req: Request) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const userAgent = hdrs.get("user-agent") || undefined;

  if (!rateLimit(ip, 5, 60000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const first = String(body?.first || "").trim().slice(0, 80);
  const last = String(body?.last || "").trim().slice(0, 80);
  const name = `${first} ${last}`.trim() || String(body?.name || "").trim().slice(0, 160);
  const email = String(body?.email || "").trim().slice(0, 160);
  const phone = String(body?.phone || "").trim().slice(0, 40);
  const company = String(body?.company || "").trim().slice(0, 160);
  const service = String(body?.service || "").trim().slice(0, 120);
  const message = String(body?.message || "").trim().slice(0, 4000);
  const employees =
    body?.employees != null && !Number.isNaN(Number(body.employees))
      ? Number(body.employees)
      : null;

  if (!name || !email || !phone) {
    return Response.json(
      { error: "Name, email and phone are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;max-width:600px">
  <h2 style="margin-bottom:6px">New Business Inquiry</h2>
  <p>A new inquiry was submitted from the Payfix Advisors website.</p>
  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>
  <h3 style="margin-bottom:10px">Customer Message</h3>
  <p>
    Hi Payfix Advisors,<br/><br/>
    I am <strong>${escapeHtml(name)}</strong> and would like more information about
    <strong>${escapeHtml(service) || "your services"}</strong>.
  </p>
  ${message ? `<p style="margin-top:10px"><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>
  <h3 style="margin-bottom:10px">Contact Details</h3>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 10px;font-weight:bold;width:140px">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding:6px 10px;font-weight:bold">Company</td><td>${escapeHtml(company) || "-"}</td></tr>
    <tr><td style="padding:6px 10px;font-weight:bold">Phone</td><td>${escapeHtml(phone)}</td></tr>
    <tr><td style="padding:6px 10px;font-weight:bold">Email</td><td>${escapeHtml(email)}</td></tr>
    <tr><td style="padding:6px 10px;font-weight:bold">Service</td><td>${escapeHtml(service) || "-"}</td></tr>
    ${employees != null ? `<tr><td style="padding:6px 10px;font-weight:bold">Employees</td><td>${employees}</td></tr>` : ""}
  </table>
  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>
  <p style="font-size:12px;color:#888">
    Submitted from the Payfix Advisors website.<br/>
    IP: ${escapeHtml(ip)}
  </p>
</div>
`;

  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_ADDRESS(),
      to: TO_ADDRESS(),
      replyTo: email,
      subject: `New Inquiry — ${service || "Website Lead"} — ${name}`,
      html,
    });

    if (error) {
      console.error("[send-mail] resend error:", error);
      return Response.json(
        { error: "Mail send failed" },
        { status: error.statusCode || 500 },
      );
    }

    forwardLead(
      {
        name,
        email,
        phone,
        company: company || undefined,
        service: service || undefined,
        employees,
        message: message || undefined,
        source: "website-contact",
      },
      { ip, userAgent },
    ).catch(() => undefined);

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[send-mail] exception:", (err as Error).message);
    return Response.json({ error: "Mail send failed" }, { status: 500 });
  }
}

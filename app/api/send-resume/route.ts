import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/escape-html";
import { verifyTurnstile } from "@/lib/verify-turnstile";

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
  "Payfix Advisors <careers@payfixadvisors.in>";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function detectFileType(buf: Buffer): "pdf" | "doc" | "docx" | null {
  if (buf.length >= 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
    return "pdf";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0 &&
    buf[4] === 0xa1 && buf[5] === 0xb1 && buf[6] === 0x1a && buf[7] === 0xe1
  ) {
    return "doc";
  }
  if (buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07)) {
    return "docx";
  }
  return null;
}

export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip, 5, 60000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return Response.json({ error: "Resume missing" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File exceeds 5 MB" }, { status: 400 });
    }

    if (file.type && !ALLOWED_MIME.has(file.type)) {
      return Response.json({ error: "Only PDF / DOC / DOCX accepted" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = detectFileType(buffer);
    if (!detected) {
      return Response.json({ error: "Invalid file format" }, { status: 400 });
    }

    const name = String(formData.get("name") || "").trim().slice(0, 160);
    const email = String(formData.get("email") || "").trim().slice(0, 160);
    const phone = String(formData.get("phone") || "").trim().slice(0, 40);
    const role = String(formData.get("role") || "").trim().slice(0, 120);
    const dept = String(formData.get("dept") || "").trim().slice(0, 80);
    const location = String(formData.get("location") || "").trim().slice(0, 120);
    const experience = String(formData.get("experience") || "").trim().slice(0, 40);
    const message = String(formData.get("message") || "").trim().slice(0, 4000);

    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const turnstileToken =
      formData.get("turnstileToken")?.toString() || undefined;
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return Response.json(
        { error: "Captcha verification failed. Please retry." },
        { status: 400 },
      );
    }

    const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 80) ||
      `resume.${detected}`;

    const html = `
<div style="font-family:Arial;max-width:600px">
  <h2>New Job Application</h2>
  <p><strong>${escapeHtml(name)}</strong> applied for <b>${escapeHtml(role) || "a position"}</b></p>
  <hr/>
  <h3>Candidate Details</h3>
  <table style="width:100%;border-collapse:collapse">
    <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
    <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
    <tr><td><b>Phone</b></td><td>${escapeHtml(phone) || "-"}</td></tr>
    <tr><td><b>Department</b></td><td>${escapeHtml(dept) || "-"}</td></tr>
    <tr><td><b>Location</b></td><td>${escapeHtml(location) || "-"}</td></tr>
    <tr><td><b>Experience</b></td><td>${escapeHtml(experience) || "-"}</td></tr>
  </table>
  ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
  <hr/>
  <p style="font-size:12px;color:#666">Resume attached.</p>
</div>
`;

    const { error } = await getResend().emails.send({
      from: FROM_ADDRESS(),
      to: TO_ADDRESS(),
      replyTo: email,
      subject: `New Application — ${role || "Unspecified"} — ${name}`,
      html,
      attachments: [{ filename: safeName, content: buffer }],
    });

    if (error) {
      console.error("[send-resume] resend error:", error);
      return Response.json({ error: "Send failed" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[send-resume] exception:", (err as Error).message);
    return Response.json({ error: "Send failed" }, { status: 500 });
  }
}

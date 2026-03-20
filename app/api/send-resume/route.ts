import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.MAIL_SEND_API_KEY);

export async function POST(req: Request) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0] || "unknown";

  const allowed = rateLimit(ip, 5, 60000);

  if (!allowed) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return Response.json({ error: "Resume missing" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const dept = formData.get("dept") as string;
    const location = formData.get("location") as string;
    const experience = formData.get("experience") as string;
    const message = formData.get("message") as string;

    /* =========================
       EMAIL TEMPLATE
    ========================= */

    const html = `
<div style="font-family:Arial;max-width:600px">

  <h2>New Job Application</h2>

  <p><strong>${name}</strong> applied for <b>${role || "a position"}</b></p>

  <hr/>

  <h3>Candidate Details</h3>

  <table style="width:100%;border-collapse:collapse">
    <tr><td><b>Name</b></td><td>${name}</td></tr>
    <tr><td><b>Email</b></td><td>${email}</td></tr>
    <tr><td><b>Phone</b></td><td>${phone || "-"}</td></tr>
    <tr><td><b>Department</b></td><td>${dept || "-"}</td></tr>
    <tr><td><b>Location</b></td><td>${location || "-"}</td></tr>
    <tr><td><b>Experience</b></td><td>${experience || "-"}</td></tr>
  </table>

  ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ""}

  <hr/>

  <p style="font-size:12px;color:#666">
    Resume attached with this email.
  </p>

</div>
`;

    /* =========================
       SEND EMAIL (WITH ATTACHMENT)
    ========================= */

    const { error } = await resend.emails.send({
      from: "Payfix Advisors <onboarding@resend.dev>",
      // to: process.env.NEXT_PUBLIC_MAIL_ID!,
       to: "jayaram.karunakaran@yahoo.com", //temp
      subject: `New Application - ${name}`,
      html,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      return Response.json(error, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.MAIL_SEND_API_KEY);

export async function POST(req: Request) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "unknown";

  const allowed = rateLimit(ip, 5, 60000); // 5 requests per minute

  if (!allowed) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();

  const name = `${body?.first || ""} ${body?.last || ""}`.trim();

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#333;max-width:600px">

  <h2 style="margin-bottom:6px">New Business Inquiry</h2>
  <p>A new inquiry was submitted from the Payfix Advisors website.</p>

  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>

  <h3 style="margin-bottom:10px">Customer Message</h3>

  <p>
    Hi Payfix Advisors,<br/><br/>
    I am <strong>${name}</strong> and would like more information about 
    <strong>${body?.service}</strong>.
  </p>

  ${
    body?.message
      ? `<p style="margin-top:10px"><strong>Message:</strong><br/>${body.message}</p>`
      : ""
  }

  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>

  <h3 style="margin-bottom:10px">Contact Details</h3>

  <table style="border-collapse:collapse;width:100%">
    <tr>
      <td style="padding:6px 10px;font-weight:bold;width:140px">Name</td>
      <td>${name}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-weight:bold">Company</td>
      <td>${body?.company}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-weight:bold">Phone</td>
      <td>${body?.phone}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-weight:bold">Email</td>
      <td>${body?.email || "-"}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-weight:bold">Service</td>
      <td>${body?.service}</td>
    </tr>
  </table>

  <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>

  <p style="font-size:12px;color:#888">
    This inquiry was submitted via the Payfix Advisors website contact form.
  </p>

</div>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Payfix Website <onboarding@resend.dev>",
      // to: process.env.NEXT_PUBLIC_MAIL_ID!,
        to: "jayaram.karunakaran@yahoo.com", //temp
      subject: `New Inquiry - ${body?.service || "Website Lead"}`,
      html,
    });

    if (error) {
      return Response.json(error, { status: error.statusCode || 400 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    return Response.json({ success: false }, { status: 400 });
  }
}

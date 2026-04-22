import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { service, date, time, name, email, message } = await req.json();

    // Email to studio
    await resend.emails.send({
      from: "Aesthura Bookings <onboarding@resend.dev>",
      to: "hello@aesthura.studio",
      subject: `New Consultation Request — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #111;">
          <h1 style="font-size: 26px; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 4px;">New Consultation Request</h1>
          <p style="color: #888; font-size: 13px; margin-top: 0;">Received via aesthura.studio</p>
          <table style="width:100%; border-collapse:collapse; margin: 28px 0;">
            <tr><td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Service</td><td style="padding:10px 0; border-bottom:1px solid #eee; font-size:14px;">${service}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Date</td><td style="padding:10px 0; border-bottom:1px solid #eee; font-size:14px;">${date}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Time</td><td style="padding:10px 0; border-bottom:1px solid #eee; font-size:14px;">${time}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Name</td><td style="padding:10px 0; border-bottom:1px solid #eee; font-size:14px;">${name}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Email</td><td style="padding:10px 0; border-bottom:1px solid #eee; font-size:14px;">${email}</td></tr>
            ${message ? `<tr><td style="padding:10px 0; color:#888; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; vertical-align:top;">Message</td><td style="padding:10px 0; font-size:14px; line-height:1.6;">${message}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    // Confirmation to client
    await resend.emails.send({
      from: "Aesthura Studio <onboarding@resend.dev>",
      to: email,
      subject: "Your consultation request — Aesthura",
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0; padding:0; background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; padding:48px 16px;">
  <tr><td align="center">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

    <!-- Logo / Icon -->
    <tr>
      <td style="padding-bottom:36px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:44px; height:44px; background:#0a0a0a; border:1px solid rgba(245,240,232,0.2); border-radius:10px; text-align:center; vertical-align:middle;">
              <span style="font-family:Georgia,serif; font-size:22px; color:#f5f0e8; letter-spacing:0.1em; line-height:44px;">A</span>
            </td>
            <td style="padding-left:14px; vertical-align:middle;">
              <p style="margin:0; font-family:Georgia,serif; font-size:18px; letter-spacing:0.2em; color:#f5f0e8; text-transform:uppercase;">Aesthura</p>
              <p style="margin:3px 0 0; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(245,240,232,0.3);">Interior Design Studio</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="height:1px; background:rgba(245,240,232,0.1); margin-bottom:40px;"></td></tr>

    <!-- Hero -->
    <tr>
      <td style="padding:40px 0 36px;">
        <p style="margin:0 0 12px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(245,240,232,0.35);">— Consultation request received</p>
        <h1 style="margin:0 0 20px; font-family:Georgia,serif; font-size:38px; font-weight:400; color:#f5f0e8; line-height:1.1; letter-spacing:-0.02em;">We've received<br/>your request.</h1>
        <p style="margin:0; font-family:'Helvetica Neue',Arial,sans-serif; font-size:14px; line-height:1.8; color:rgba(245,240,232,0.55); font-weight:300;">Hello ${name} — thank you for reaching out to Aesthura. We'll review your details and confirm your consultation within one working day.</p>
      </td>
    </tr>

    <!-- Booking card -->
    <tr>
      <td style="background:rgba(245,240,232,0.04); border:1px solid rgba(245,240,232,0.1); border-radius:16px; padding:28px 32px;">
        <p style="margin:0 0 20px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(245,240,232,0.3);">Booking summary</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0; border-bottom:1px solid rgba(245,240,232,0.07); font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(245,240,232,0.3); width:38%;">Service</td>
            <td style="padding:10px 0; border-bottom:1px solid rgba(245,240,232,0.07); font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; color:#f5f0e8; font-weight:300;">${service}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; border-bottom:1px solid rgba(245,240,232,0.07); font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(245,240,232,0.3);">Date</td>
            <td style="padding:10px 0; border-bottom:1px solid rgba(245,240,232,0.07); font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; color:#f5f0e8; font-weight:300;">${date}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(245,240,232,0.3);">Time</td>
            <td style="padding:10px 0; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; color:#f5f0e8; font-weight:300;">${time} WAT</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Spacer -->
    <tr><td style="height:36px;"></td></tr>

    <!-- CTA -->
    <tr>
      <td>
        <p style="margin:0 0 20px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; line-height:1.8; color:rgba(245,240,232,0.45); font-weight:300;">While you wait, explore our recent work or reply to this email with any questions.</p>
        <a href="https://aesthura.vercel.app/projects" style="display:inline-block; padding:13px 28px; border:1px solid rgba(245,240,232,0.2); border-radius:100px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#f5f0e8; text-decoration:none;">View our projects &rarr;</a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding-top:48px; border-top:1px solid rgba(245,240,232,0.08); margin-top:48px;">
        <p style="margin:0; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; color:rgba(245,240,232,0.2); line-height:2;">
          Aesthura Studio &nbsp;&middot;&nbsp; Port Harcourt &nbsp;&middot;&nbsp; Lagos, Nigeria<br/>
          <a href="mailto:hello@aesthura.studio" style="color:rgba(245,240,232,0.3); text-decoration:none;">hello@aesthura.studio</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

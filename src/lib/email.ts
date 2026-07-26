import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getNodemailerTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

async function sendViaProvider(to: string, subject: string, html: string) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM_ADDRESS || "noreply@entreskillhub.com";

  if (!apiKey) {
    throw new Error("EMAIL_PROVIDER_API_KEY is not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email provider failed: ${res.status} ${text}`);
  }

  return res.json();
}

async function sendViaSmtp(to: string, subject: string, html: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;

  if (!host || !user) {
    console.log(`[DEV] Email to ${to}: ${subject}`);
    return;
  }

  const transporter = getNodemailerTransporter();
  await transporter.sendMail({
    from: `"EntreSkill Hub" <${user}>`,
    to,
    subject,
    html,
  });
}

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (apiKey) {
    return sendViaProvider(to, subject, html);
  }
  return sendViaSmtp(to, subject, html);
}

export async function sendVerificationEmail(email: string, userId: string) {
  const token = Buffer.from(`${userId}:${Date.now()}`).toString("base64url");
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

  const html = `
    <p>Welcome to EntreSkill Hub!</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
    <p>This link will expire in 24 hours.</p>
  `;

  try {
    await sendEmail(email, "Verify your email - EntreSkill Hub", html);
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

let nodemailer: any;
try {
  // dynamic import to avoid hard dependency during dev if not installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  nodemailer = require('nodemailer');
} catch (err) {
  nodemailer = null;
}

type SendEmailParams = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

export async function SendEmail({ to, subject, html, text }: SendEmailParams) {
  // Use environment variables for SMTP configuration
  const host = process.env.SMTP_HOST || '';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  if (!nodemailer || !host) {
    // Nodemailer not installed or SMTP not configured. Fall back to logging.
    console.warn(
      'SendEmail: nodemailer not available or SMTP not configured. Logging email instead.'
    );
    console.info({ to, subject, text, html });
    return { logged: true };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: user && pass ? { user, pass } : undefined,
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || `no-reply@${process.env.EMAIL_DOMAIN || 'example.com'}`,
    to,
    subject,
    html,
    text,
  });

  return info;
}

export default { SendEmail };

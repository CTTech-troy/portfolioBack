// src/controllers/contactController.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

class ContactController {
  async handleContact(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false, 
          error: "All fields (name, email, message) are required.",
        });
      }

      // Email options
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.MAIL_TO,
        subject: 'Sombody sent you a message from your portfolio website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:24px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06); overflow:hidden;">
          <tr>
            <td style="background:#2563eb; color:#fff; padding:24px 24px 16px 24px; text-align:left;">
              <h2 style="margin:0; font-size:22px; font-weight:700;">New Contact Form Submission</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px 0; font-size:16px; color:#222;">
                You have received a new message from your website contact form.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:6px; border:1px solid #e5e7eb; margin-bottom:18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:8px 0; font-size:15px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin:8px 0; font-size:15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></p>
                    <p style="margin:8px 0; font-size:15px;"><strong>Subject:</strong> New Contact Form Submission</p>
                    <p style="margin:8px 0; font-size:15px;"><strong>Message:</strong></p>
                    <div style="margin:8px 0 0 0; font-size:15px; color:#374151; background:#f9fafb; padding:12px; border-radius:6px; white-space:pre-wrap;">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>
              <a href="mailto:${email}" style="display:inline-block; padding:10px 18px; background:#2563eb; color:#fff; border-radius:6px; font-weight:600; font-size:15px; text-decoration:none;">
                Reply to Sender
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#f4f4f4; color:#6b7280; font-size:13px; text-align:center; padding:16px 24px;">
              Sent from <strong>[Your Website Name]</strong>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);

      console.log("Contact Form Submitted:", { name, email, message });
      console.log("Contact form input received and emailed successfully.");

      res.status(200).json({
        success: true,
        message: "Thank you for reaching out. We'll get back to you soon!",
      });
    } catch (error) {
      console.error("ContactController Error:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
}

export default ContactController;

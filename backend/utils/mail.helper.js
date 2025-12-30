require("dotenv").config();
const nodemailer = require("nodemailer");

const sendAdminEmail = async (subject, htmlMessage) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (!process.env.ADMIN_EMAIL) {
      throw new Error("No ADMIN_EMAIL defined in .env");
    }

    const mailOptions = {
      from: `"Nomad web" <nomadyatri11@gmail.com>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject || "No Subject",
      html: htmlMessage || "<p>No message content</p>",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent to:", info.accepted.join(", "));
    if (info.rejected.length) {
      console.warn("Rejected recipients:", info.rejected.join(", "));
    }
    console.log("Message ID:", info.messageId);

  } catch (error) {
    console.error("Mail Error:", error.message);
  }
};

module.exports = sendAdminEmail;

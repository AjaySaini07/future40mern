// const nodemailer = require("nodemailer");

// // Gmail transporter
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// module.exports = transporter;

//-----------------------------------------------------------------
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// // connection test
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("Email server error:", error);
//   } else {
//     console.log("Email server ready");
//   }
// });

// module.exports = transporter;

//-----------------------------------------------------------------
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
//   connectionTimeout: 20000,
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// module.exports = transporter;

//----------------------------------------------------------------
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// module.exports = transporter;

//----------------------------------------------------------------
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// const client = SibApiV3Sdk.ApiClient.instance;

// client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const data = await apiInstance.sendTransacEmail({
//       sender: {
//         email: "nodetest0708@gmail.com", // tumhari email
//         name: "Future40 English Training Academy",
//       },
//       to: [{ email: to }],
//       subject: subject,
//       htmlContent: html,
//     });

//     console.log("Email sent:", data.messageId);
//   } catch (error) {
//     console.log("Email error:", error.response?.text || error.message);
//   }
// };

// module.exports = sendEmail;

const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.GMAIL_USER,
        name: "Future40 English Training Academy",
      },

      to: [{ email: to }],

      subject: subject,

      htmlContent: html,
    });

    console.log("📧 Email sent:", response.messageId);
  } catch (error) {
    console.error("❌ Email error:", error.response?.text || error.message);
  }
};

module.exports = sendEmail;

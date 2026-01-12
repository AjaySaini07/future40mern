const brandWrapper = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="
  margin:0;
  padding:20px;
  background:#0f172a;
  font-family:Arial, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="
          background:#020617;
          border-radius:8px;
          border:1px solid #1e293b;
          padding:24px;
        ">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img
                src="https://future40.com/logo.png"
                alt="Future40"
                height="40"
                style="display:block;"
              />
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="
              color:#e5e7eb;
              font-size:14px;
              line-height:1.6;
            ">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              padding-top:30px;
              text-align:center;
              font-size:12px;
              color:#94a3b8;
            ">
              © ${new Date().getFullYear()} Future40. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

exports.adminQueryMail = ({ name, email, message }) => ({
  subject: "📩 New Contact Query – Future40",
  html: brandWrapper(`
    <h3>New Query Received</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b></p>
    <p>${message}</p>
  `),
});

exports.userAutoReply = ({ name }) => ({
  subject: "Thanks for contacting Future40",
  html: brandWrapper(`
    <p>Hi <b>${name}</b>,</p>
    <p>Thanks for reaching out to <b>Future40</b>.</p>
    <p>We’ve received your query and our team will contact you shortly.</p>
  `),
});

exports.adminReplyMail = ({ name, reply }) => ({
  subject: "Reply from Future40",
  html: brandWrapper(`
    <p>Hi <b>${name}</b>,</p>
    <p>${reply}</p>
    <p>Regards,<br/>Future40 Team</p>
  `),
});

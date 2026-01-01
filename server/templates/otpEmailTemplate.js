const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">
          <table width="420" cellpadding="0" cellspacing="0" style="background:#020617; border-radius:12px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <div style="width:48px;height:48px;border-radius:50%;background:#2563eb;color:#fff;font-weight:bold;font-size:22px;line-height:48px;text-align:center;">
                  F
                </div>
                <p style="margin:8px 0 0;font-size:14px;color:#60a5fa;letter-spacing:2px;">
                  FUTURE40
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:12px;">
                <h2 style="margin:0;color:#ffffff;font-size:20px;">
                  Verify Your Email
                </h2>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <p style="margin:0;color:#cbd5f5;font-size:14px;line-height:1.6;">
                  Use the OTP below to verify your account.<br />
                  This code is valid for <strong>5 minutes</strong>.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <div style="
                  background:#020617;
                  border:1px dashed #2563eb;
                  border-radius:10px;
                  padding:14px 24px;
                  display:inline-block;
                ">
                  <span style="
                    font-size:28px;
                    font-weight:bold;
                    letter-spacing:8px;
                    color:#ffffff;
                  ">
                    ${otp}
                  </span>
                </div>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <p style="margin:0;color:#94a3b8;font-size:12px;">
                  Do not share this OTP with anyone.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="border-top:1px solid #1e293b;padding-top:14px;">
                <p style="margin:0;color:#64748b;font-size:12px;">
                  © 2025 Future40 • English Learning Studio
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = otpEmailTemplate;

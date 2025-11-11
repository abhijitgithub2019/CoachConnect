export function generateOtpEmailTemplate(otp, appName = "CoachConnect") {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${appName} OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 24px;">
      <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); overflow: hidden;">
        <div style="background-color: #059669; color: white; padding: 16px; text-align: center;">
          <h2 style="margin: 0; font-weight: 600;">${appName}</h2>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">
            Use the verification code below to sign in to your account. 
            The code will expire in <strong>1 minutes</strong>.
          </p>
  
          <div style="text-align: center; margin: 32px 0;">
            <div style="display: inline-block; background-color: #ecfdf5; border: 2px solid #059669; color: #064e3b; font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 12px 24px; border-radius: 8px;">
              ${otp}
            </div>
          </div>
  
          <p style="font-size: 14px; color: #555;">
            If you didn’t request this code, you can safely ignore this email.
          </p>
        </div>
        <div style="background: #f0fdfa; text-align: center; padding: 12px; font-size: 12px; color: #065f46;">
          &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;
}

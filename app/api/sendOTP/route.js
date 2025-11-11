import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { generateOtpEmailTemplate } from "../../lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();

    console.log("email POST", email);

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 min validity

    // Remove old OTP if exists
    await prisma.otp.deleteMany({ where: { email } });

    // Save new OTP
    await prisma.otp.create({
      data: { email, otp, expiresAt },
    });

    // Send OTP via Resend
    try {
      const result = await resend.emails.send({
        from: "CoachConnect <onboarding@resend.dev>",
        to: email,
        subject: "Your CoachConnect Login Code",
        html: generateOtpEmailTemplate(otp, "CoachConnect"),
      });

      return NextResponse.json({ success: true, result });
    } catch (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    // Find OTP record
    const record = await prisma.otp.findFirst({
      where: { email, otp },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    }

    // Check if expired
    if (new Date() > record.expiresAt) {
      await prisma.otp.delete({ where: { id: record.id } });
      return NextResponse.json({ error: "OTP expired." }, { status: 400 });
    }

    // ✅ OTP valid — delete it to prevent reuse
    await prisma.otp.delete({ where: { id: record.id } });

    // (Optional) You can now create a session / JWT here
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Server error during OTP verification." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

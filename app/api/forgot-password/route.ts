import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min
    await user.save();

    // TODO: Send email here
    console.log(`Reset link: http://localhost:3000/reset-password/${token}`);

    return NextResponse.json({
      success: true,
      message: "Reset link sent to email",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error",error },
      { status: 500 },
    );
  }
}

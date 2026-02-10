import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({ ...body, password: hashedPassword });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding user", error },
      { status: 500 }
    );
  }
}
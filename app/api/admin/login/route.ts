// app/api/admin/login/route.js
import { NextResponse, NextRequest } from "next/server";
import {connectDB} from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

interface LoginRequest {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  success: boolean;
}

interface JWTPayload {
  id: string;
  role: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  await connectDB();
  const { email, password }: LoginRequest = await req.json();

  const user = await User.findOne({ email });

  // Check if user exists AND is admin
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const isMatch: boolean = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token: string = jwt.sign(
    { id: user._id, role: user.role } as JWTPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  const response: NextResponse<SuccessResponse> = NextResponse.json({ success: true });

  // Store token in HttpOnly cookie
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return response;
}
// app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(
  req: Request,
  context: { params: Promise<{ user_id: string }> },
) {
  try {
    await connectDB();

    const { user_id } = await context.params;
    const body = await req.json();
    const { role } = body;

    // Validate role
    if (!role) {
      return NextResponse.json(
        { message: "Role is required" },
        { status: 400 },
      );
    }

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role. Must be 'user' or 'admin'" },
        { status: 400 },
      );
    }

    // Prevent removing the last admin
    if (role === "user") {
      const adminCount = await User.countDocuments({ role: "admin" });
      const targetUser = await User.findById(user_id);

      if (targetUser?.role === "admin" && adminCount <= 1) {
        return NextResponse.json(
          { message: "Cannot demote the last admin account" },
          { status: 400 },
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $set: { role } },
      { new: true, runValidators: true },
    ).select("-password"); // never return password

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `User role updated to '${role}'`,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ user_id: string }> },
) {
  try {
    await connectDB();

    const { user_id } = await context.params;

    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Prevent deleting an admin account
    if (user.role === "admin") {
      return NextResponse.json(
        { message: "Admin accounts cannot be deleted" },
        { status: 403 },
      );
    }

    await User.findByIdAndDelete(user_id);

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 },
    );
  }
}

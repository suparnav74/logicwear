// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order   from "@/models/Order";
import Product from "@/models/Product";
import User    from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const [totalOrders, totalProducts, totalUsers, revenueData] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
    ]);

    return NextResponse.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue: revenueData[0]?.total || 0,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching stats", error },
      { status: 500 },
    );
  }
}
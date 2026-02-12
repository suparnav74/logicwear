import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  context: { params: Promise<{ order_id: string }> },
) {
  try {
    await connectDB();

    const { order_id } = await context.params;
    console.log("Searching Order:", context.params);

    console.log("prams:", context.params);
    console.log("Received order_id:", order_id);
    const order = await Order.findOne({orderId : order_id });
    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching order", error },
      { status: 500 },
    );
  }
}
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ order_id: string }> },
) {
  try {
    await connectDB();

    const { order_id } = await context.params;
    const body = await req.json();

    const { orderStatus, paymentStatus } = body;

    // Validate orderStatus if provided
    if (orderStatus) {
      const validOrderStatuses = ["processing", "shipped", "delivered", "cancelled"];
      if (!validOrderStatuses.includes(orderStatus)) {
        return NextResponse.json(
          { message: "Invalid orderStatus value" },
          { status: 400 },
        );
      }
    }

    // Validate paymentStatus if provided
    if (paymentStatus) {
      const validPaymentStatuses = ["pending", "paid", "failed"];
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return NextResponse.json(
          { message: "Invalid paymentStatus value" },
          { status: 400 },
        );
      }
    }

    // Build update object with only provided fields
    const updateData: Record<string, string> = {};
    if (orderStatus)  updateData.orderStatus  = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided to update" },
        { status: 400 },
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Order updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating order", error },
      { status: 500 },
    );
  }
}
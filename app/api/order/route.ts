import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const order = await Order.create(body);

  return NextResponse.json({
      success: true,
      order,
    });
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders" ,error},
      { status: 500 }
    );
  }
}
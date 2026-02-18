import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { Variant } from "@/types/product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    for (const item of body.items) {
      const product = await Product.findById(item.id);

      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 },
        );
      }

      const variant = product.variants.find(
        (v: Variant) => v.sku === item.variantId,
      );

      if (!variant || variant.availableQty < item.qty) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.title} (${item.size}/${item.color}) is out of stock`,
          },
          { status: 400 },
        );
      }
    }

    const order = await Order.create({
      userName: body.userName,
      email: body.email,
      phone: body.phone,

      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,

      items: body.items,

      subtotal: body.subtotal,
      shippingFee: body.shippingFee,
      totalAmount: body.totalAmount,

      paymentMethod: body.paymentMethod || "COD",

      paymentStatus: body.paymentStatus || "paid",
      orderStatus: "processing",

      transactionId: body.transactionId,
      orderId: body.orderId,
    });
    for (const item of body.items) {
      const result = await Product.updateOne(
        {
          _id: item.id,
          "variants.sku": item.variantId,
          "variants.availableQty": { $gte: item.qty },
        },
        {
          $inc: { "variants.$.availableQty": -item.qty },
        },
      );

      console.log("Stock update result:", result);
    }

    return NextResponse.json({ success: true, order },{ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Order creation failed", error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders", error },
      { status: 500 },
    );
  }
}

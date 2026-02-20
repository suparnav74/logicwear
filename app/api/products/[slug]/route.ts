import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await context.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 },
    );
  }
}

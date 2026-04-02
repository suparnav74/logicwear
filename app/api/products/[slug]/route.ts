import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

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

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    // Parse FormData (handles image upload)
    const formData = await req.formData();
    const title       = formData.get("title") as string;
    const newSlug     = formData.get("slug") as string;
    const desc        = formData.get("desc") as string;
    const category    = formData.get("category") as string;
    const variantsRaw = formData.get("variants") as string;
    const imageFile   = formData.get("image") as File | null;

    const variants = variantsRaw ? JSON.parse(variantsRaw) : undefined;

    // Build update object (only include fields that were sent)
    const updateData: Record<string, unknown> = {};
    if (title)    updateData.title    = title;
    if (newSlug)  updateData.slug     = newSlug;
    if (desc)     updateData.desc     = desc;
    if (category) updateData.category = category;
    if (variants) updateData.variants = variants;

    // Upload new image to Cloudinary if provided
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      updateData.image = uploaded.secure_url;
    }

    const updated = await Product.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated", product: updated });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    if (product.image) {
      // Extract publicId from Cloudinary URL
      // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123456/products/abc123.jpg
      const urlParts  = product.image.split("/");
      const fileName  = urlParts[urlParts.length - 1].split(".")[0]; // "abc123"
      const folder    = urlParts[urlParts.length - 2];               // "products"
      const publicId  = `${folder}/${fileName}`;                     // "products/abc123"

      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findOneAndDelete({ slug });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product", error },
      { status: 500 },
    );
  }
}

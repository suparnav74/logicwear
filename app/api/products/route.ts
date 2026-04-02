import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData  = await req.formData();
    const title     = formData.get("title")    as string;
    const slug      = formData.get("slug")     as string;
    const desc      = formData.get("desc")     as string;
    const category  = formData.get("category") as string;
    const variants  = JSON.parse(formData.get("variants") as string);
    const imageFile = formData.get("image")    as File | null;

    let imageUrl = "";

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploaded = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            })
            .end(buffer);
        },
      );

      imageUrl = uploaded.secure_url; // ✅ Cloudinary URL stored in MongoDB
    }

    const product = await Product.create({
      title,
      slug,
      desc,
      category,
      image: imageUrl,
      variants,
    });

    return NextResponse.json({ success: true, message: "Product created", product }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating product", error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products" ,error},
      { status: 500 }
    );
  }
}

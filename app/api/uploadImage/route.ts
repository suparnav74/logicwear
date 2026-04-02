import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData  = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ message: "No image provided" }, { status: 400 });
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "products",   // saves inside /products folder in Cloudinary
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      },
    );

    return NextResponse.json({
      url:      result.secure_url,  // ✅ save this in MongoDB
      publicId: result.public_id,   // ✅ save this for deletion later
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: 500 },
    );
  }
}
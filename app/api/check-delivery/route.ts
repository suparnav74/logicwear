import { NextResponse } from "next/server";

const serviceablePincodes = [
  "560037",
  "560001",
  "110001",
  "400001",
  "500081",
];

export async function POST(req: Request) {
  try {
    const { pincode } = await req.json();

    if (!pincode || pincode.length !== 6) {
      return NextResponse.json(
        { message: "Invalid Pincode" },
        { status: 400 }
      );
    }

    const isServiceable = serviceablePincodes.includes(pincode);

    return NextResponse.json({
      serviceable: isServiceable,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" , error },
      { status: 500 }
    );
  }
}

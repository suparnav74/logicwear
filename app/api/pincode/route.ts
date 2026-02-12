import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pincode } = await req.json();

    if (!pincode || pincode.length !== 6) {
      return NextResponse.json({ message: "Invalid Pincode" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
    );

    const data = await response.json();

    if (data[0].Status !== "Success") {
      return NextResponse.json(
        { message: "Pincode not found" },
        { status: 404 },
      );
    }

    const postOffice = data[0].PostOffice[0];

    return NextResponse.json({
      city: postOffice.District,
      state: postOffice.State,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching location", error },
      { status: 500 },
    );
  }
}

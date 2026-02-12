import { NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";

export async function POST(req: Request) {
  try {
    const { amount, email } = await req.json();

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: process.env.PAYTM_MID!,
        websiteName: "WEBSTAGING",
        orderId: "ORDER123",
        callbackUrl: "http://localhost:3000/api/callback",
        txnAmount: {
          value: amount.toString(),
          currency: "INR",
        },
        userInfo: {
          custId: email,
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY!,
    );

    return NextResponse.json({
      paytmParams,
      checksum,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

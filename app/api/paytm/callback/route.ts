import { NextRequest, NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Convert FormData to object
    const paytmParams: Record<string, string> = {};
    formData.forEach((value, key) => {
      paytmParams[key] = value.toString();
    });

    const paytmChecksum = paytmParams.CHECKSUMHASH;
    delete paytmParams.CHECKSUMHASH;

    // Verify checksum
    const isVerifySignature = PaytmChecksum.verifySignature(
      paytmParams.body,
      process.env.PAYTM_KEY!,
      paytmChecksum,
    );

    if (!isVerifySignature) {
      return NextResponse.json({
        success: false,
        message: "Checksum mismatch",
      });
    }

    // Transaction details
    const orderId = paytmParams.ORDERID;
    const txnId = paytmParams.TXNID;
    const status = paytmParams.STATUS;

    // Confirm payment from Paytm (recommended)
    const paytmStatusUrl = "https://securegw-stage.paytm.in/v3/order/status";

    const body = {
      mid: process.env.PAYTM_MID,
      orderId: orderId,
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(body),
      process.env.PAYTM_KEY!,
    );

    const response = await fetch(paytmStatusUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        head: { signature: checksum },
      }),
    });

    const result = await response.json();

    // Payment success check
    if (result.body.resultInfo.resultStatus === "TXN_SUCCESS") {
      // 4. Save order in DB
      // Example (MongoDB pseudo code)

      /*
      await Order.create({
        orderId,
        txnId,
        amount: result.body.txnAmount,
        status: "Paid",
      });
      */
      console.log("Order saved:", {
        orderId,
        txnId,
        amount: result.body.txnAmount,
        status,
      });
      return NextResponse.json({
        success: true,
        message: "Payment Successful",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}

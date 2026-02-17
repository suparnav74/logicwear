import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    transactionId: "TXN_" + Date.now(),
    orderId: "ORD_" + Date.now(),
  });
}

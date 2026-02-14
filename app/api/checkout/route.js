import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(request) {
  try {
    const payload = await request.json();
    const order = await createOrder(payload);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Checkout failed." },
      { status: 400 }
    );
  }
}


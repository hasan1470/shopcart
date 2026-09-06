import { DEMO_MODE } from "@/lib/demo-mode";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  if (DEMO_MODE) return NextResponse.json({ received: true, demo: true });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await req.text(), signature, secret); }
  catch { return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 }); }
  void event;
  // Stripe is the source of truth for this portfolio's test orders. Confirmation
  // and order history read verified sessions server-side. Test payments must not
  // consume shared catalog stock or copy customer details into a public dataset.
  // Acknowledging retries has no side effects and is therefore idempotent.
  return NextResponse.json({ received: true });
}

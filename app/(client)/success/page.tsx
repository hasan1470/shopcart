import { DEMO_MODE } from "@/lib/demo-mode";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import stripe from "@/lib/stripe";
import SuccessConfirmation from "@/components/SuccessConfirmation";

export default async function SuccessPage({searchParams}: {searchParams: Promise<{session_id?: string}>}) {
  if (DEMO_MODE) redirect("/orders");
  const {userId} = await auth();
  const {session_id} = await searchParams;
  const session = userId && session_id ? await stripe.checkout.sessions.retrieve(session_id).catch(() => null) : null;
  if (!session || session.metadata?.clerkUserId !== userId || session.payment_status !== "paid") return <div className="max-w-xl mx-auto p-10 text-center"><h1 className="text-2xl font-semibold">Payment has not been confirmed</h1><p className="my-4 text-gray-600">Your cart is still saved. Sign in to the account used at checkout, or return to your cart to try again.</p><Link href="/cart" className="underline">Return to cart</Link></div>;
  return <SuccessConfirmation orderNumber={session.metadata?.orderNumber || session.id} />;
}

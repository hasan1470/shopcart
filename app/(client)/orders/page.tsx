import { DEMO_MODE } from "@/lib/demo-mode";
import DemoOrders from "@/components/DemoOrders";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import stripe from "@/lib/stripe";

export default async function OrdersPage() {
  if (DEMO_MODE) return <Suspense fallback={<p className="p-10">Loading demo orders…</p>}><DemoOrders/></Suspense>;
  const user = await currentUser();
  if (!user) redirect("/");
  const email = user.primaryEmailAddress?.emailAddress;
  const customers = email ? await stripe.customers.list({ email, limit: 100 }) : { data: [] };
  const owned = customers.data.filter(customer => customer.metadata.clerkUserId === user.id);
  const results = await Promise.all(owned.map(customer => stripe.checkout.sessions.list({ customer: customer.id, status: "complete", limit: 100, expand: ["data.invoice"] })));
  const orders = results.flatMap(result => result.data).filter(session => session.metadata?.clerkUserId === user.id && session.payment_status === "paid").sort((a,b) => b.created-a.created);
  return <Container className="py-10"><h1 className="text-3xl font-semibold">Your orders</h1><p className="mt-2 mb-8 text-gray-600">Your latest completed checkouts.</p>{orders.length ? <div className="grid gap-4">{orders.map(order => {
    const invoice = order.invoice && typeof order.invoice !== "string" ? order.invoice : null;
    return <article key={order.id} className="rounded-xl border p-5 flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-semibold">Order {order.metadata?.orderNumber?.slice(0,8) || order.id.slice(-8)}</h2><p className="text-sm text-gray-500">{new Date(order.created*1000).toLocaleDateString("en-US", {timeZone:"UTC"})} · Payment complete</p></div><strong>{new Intl.NumberFormat("en-US", {style:"currency",currency:order.currency || "usd"}).format((order.amount_total ?? 0)/100)}</strong><Link className="underline text-shop-dark-green" href={`/success?session_id=${order.id}`}>View confirmation</Link>{invoice?.hosted_invoice_url && <a className="underline" href={invoice.hosted_invoice_url} target="_blank" rel="noreferrer">View invoice</a>}</article>;
  })}</div> : <div className="rounded-xl border p-10 text-center"><h2 className="text-xl font-medium">No completed orders yet</h2><p className="mt-2 mb-5 text-gray-600">Complete a checkout to see your order here.</p><Link href="/shop" className="underline text-shop-dark-green">Browse products</Link></div>}</Container>;
}

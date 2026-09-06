"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useStore from "@/store";
import type { DemoOrder } from "@/lib/demo-orders";
import PriceFormatter from "./PriceFormatter";
import Container from "./Container";

export default function DemoCheckout() {
  const items = useStore(state => state.items);
  const placeDemoOrder = useStore(state => state.placeDemoOrder);
  const [delivery,setDelivery] = useState<DemoOrder["delivery"]>("standard");
  const [error,setError] = useState("");
  const [working,setWorking] = useState(false);
  const router = useRouter();
  const subtotal = items.reduce((sum,item) => sum + Math.round((item.product.price ?? 0)*100)*item.quantity,0);
  function submit(event: React.FormEvent) {
    event.preventDefault(); setWorking(true);
    try { const order = placeDemoOrder(delivery); router.push(`/orders?order=${order.id}`); }
    catch(error) { setError(error instanceof Error ? error.message : "Please check your cart."); setWorking(false); }
  }
  if (!items.length) return <Container className="py-16 text-center"><h1 className="text-2xl font-semibold">Your cart is empty</h1><Link className="mt-4 inline-block underline" href="/shop">Browse products</Link></Container>;
  return <Container className="py-10"><Link href="/cart" className="text-sm underline">← Back to cart</Link><h1 className="mt-5 text-3xl font-semibold">Demo checkout</h1><p className="mt-2 mb-8 text-gray-600">Try the complete order flow. No account, payment card, or personal details are needed.</p><form onSubmit={submit} className="grid gap-6 md:grid-cols-2"><section className="rounded-xl border bg-white p-6"><h2 className="text-xl font-medium">Sample delivery</h2><p className="my-4 text-gray-600">Demo Customer<br/>123 Example Street<br/>Sample City, 10001</p><fieldset className="space-y-3"><legend className="mb-3 font-medium">Delivery option</legend>{([['standard','Standard · Free · 3–5 days'],['express','Express · $4.99 · 1–2 days']] as const).map(([value,label]) => <label key={value} className="flex gap-3 rounded-lg border p-4 cursor-pointer"><input type="radio" name="delivery" value={value} checked={delivery===value} onChange={()=>setDelivery(value)}/>{label}</label>)}</fieldset><div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-900"><strong>Simulated payment</strong><p>No money is collected. Orders are saved in this browser so you can review, export, or cancel them.</p></div></section><section className="rounded-xl border bg-white p-6"><h2 className="text-xl font-medium">Order summary</h2><ul className="my-5 divide-y">{items.map(item=><li key={item.product._id} className="flex justify-between gap-4 py-3"><span>{item.product.name} × {item.quantity}</span><PriceFormatter amount={(item.product.price ?? 0)*item.quantity}/></li>)}</ul><div className="flex justify-between py-2"><span>Delivery</span><PriceFormatter amount={delivery==='express'?4.99:0}/></div><div className="flex justify-between border-t py-4 text-xl font-semibold"><span>Total</span><PriceFormatter amount={subtotal/100+(delivery==='express'?4.99:0)}/></div>{error&&<p role="alert" className="mb-4 text-red-600">{error}</p>}<button disabled={working} className="w-full rounded-full bg-shop-dark-green p-4 font-semibold text-white disabled:opacity-50">{working?'Placing order…':'Place demo order'}</button></section></form></Container>;
}

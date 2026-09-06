"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useStore from "@/store";
import Container from "./Container";
import PriceFormatter from "./PriceFormatter";

export default function DemoOrders() {
  const orders = useStore(state=>state.demoOrders);
  const cancelOrder = useStore(state=>state.cancelDemoOrder);
  const selected = useSearchParams().get("order");
  function exportOrders() {
    const blob = new Blob([JSON.stringify({application:"Shopcart portfolio demo", orders},null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="shopcart-demo-orders.json"; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <Container className="py-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-semibold">{orders.some(order=>order.id===selected)?'Demo order placed':'Your demo orders'}</h1><p className="mt-2 text-gray-600">Saved on this browser. No real payment or delivery.</p></div>{orders.length>0&&<button onClick={exportOrders} className="rounded-full border px-5 py-3">Export orders</button>}</div>{orders.length ? <div className="mt-8 space-y-5">{orders.map(order=><article key={order.id} className={`rounded-xl border bg-white p-5 ${order.id===selected?'border-shop-dark-green':''}`}><div className="flex flex-wrap justify-between gap-4"><div><h2 className="font-semibold">{order.id}</h2><p className="mt-1 text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()} · {order.delivery} delivery</p></div><span className={`self-start rounded-full px-3 py-1 text-sm ${order.status==='cancelled'?'bg-gray-100':'bg-green-50 text-green-800'}`}>{order.status==='cancelled'?'Cancelled':'Demo confirmed'}</span></div><ul className="my-4 divide-y">{order.items.map(item=><li key={item.id} className="flex justify-between gap-4 py-2 text-sm"><span>{item.name} × {item.quantity}</span><PriceFormatter amount={item.unitAmount*item.quantity/100}/></li>)}</ul><div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4"><span className="font-semibold">Total <PriceFormatter amount={order.total/100}/></span>{order.status==='confirmed'&&<button onClick={()=>cancelOrder(order.id)} className="text-sm underline">Cancel demo order</button>}</div></article>)}</div> : <div className="mt-8 rounded-xl border p-12 text-center"><h2 className="text-xl font-medium">No demo orders yet</h2><p className="my-3 text-gray-600">Add a product to your cart and try the checkout.</p><Link href="/shop" className="underline text-shop-dark-green">Browse products</Link></div>}</Container>;
}

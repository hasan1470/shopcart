"use client";

import Link from "next/link";

export default function StoreError({ reset }: { reset: () => void }) {
  return <section className="mx-auto max-w-xl px-5 py-20 text-center">
    <h1 className="text-2xl font-semibold">We couldn’t load this page</h1>
    <p className="my-4 text-gray-600">A connected service may be temporarily unavailable. Your saved cart is still in this browser.</p>
    <button onClick={reset} className="rounded-lg bg-shop-dark-green px-5 py-3 text-white">Try again</button>
    <Link href="/shop" className="ml-5 underline">Back to the shop</Link>
  </section>;
}

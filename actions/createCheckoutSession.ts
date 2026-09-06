"use server";

import { DEMO_MODE } from "@/lib/demo-mode";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/sanity.types";
import type { CartItem } from "@/store";
import { validateCart } from "@/lib/checkout-validation";

export interface GroupedCartItems { product: CartItem["product"]; quantity: number }

export async function createCheckoutSession(items: GroupedCartItems[]) {
  if (DEMO_MODE) throw new Error("Use demo checkout from the cart.");
  const user = await currentUser();
  if (!user) throw new Error("Sign in before checking out.");
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Checkout is not configured.");
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) throw new Error("Add a verified email address to your account first.");
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) throw new Error("Your cart must contain between 1 and 50 products.");
  const ids = items.map(item => item?.product?._id).filter(id => typeof id === "string");
  const products = await backendClient.fetch<Product[]>('*[_type == "product" && _id in $ids]', { ids });
  const validated = validateCart(items, products);
  const origin = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  const orderNumber = crypto.randomUUID();
  const customers = await stripe.customers.list({ email, limit: 10 });
  const customer = customers.data.find(customer => customer.metadata.clerkUserId === user.id);
  const customerId = customer?.id ?? (await stripe.customers.create({ email, name: user.fullName || undefined, metadata: { clerkUserId: user.id } })).id;
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: user.id,
    metadata: { orderNumber, clerkUserId: user.id },
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "BD", "IN"] },
    invoice_creation: { enabled: true },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    line_items: validated.map(({ product, quantity, unitAmount }) => {
      const fullProduct = products.find(item => item._id === product._id)!;
      return { quantity, price_data: { currency: "usd", unit_amount: unitAmount, product_data: {
        name: product.name || "Product", metadata: { id: product._id },
        images: fullProduct.images?.length ? [urlFor(fullProduct.images[0]).url()] : undefined,
      } } };
    }),
  });
  return session.url;
}

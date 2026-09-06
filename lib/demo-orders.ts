import type { validateCart } from "./checkout-validation";

export interface DemoOrder {
  id: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
  delivery: "standard" | "express";
  items: { id: string; name: string; quantity: number; unitAmount: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function makeDemoOrder(lines: ReturnType<typeof validateCart>, delivery: DemoOrder["delivery"], id: string, createdAt: string): DemoOrder {
  if (delivery !== "standard" && delivery !== "express") throw new Error("Choose a delivery option.");
  const subtotal = lines.reduce((sum,item) => sum + item.unitAmount * item.quantity, 0);
  const shipping = delivery === "express" ? 499 : 0;
  return { id, createdAt, status: "confirmed", delivery, subtotal, shipping, total: subtotal + shipping,
    items: lines.map(item => ({id:item.product._id, name:item.product.name || "Product", quantity:item.quantity, unitAmount:item.unitAmount})),
  };
}

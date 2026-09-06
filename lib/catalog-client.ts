import type { Product } from "@/sanity.types";

export async function getCatalogProducts(filters: Record<string,string | number | null> = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  for (const [key,value] of Object.entries(filters)) if (value !== null && value !== "") params.set(key,String(value));
  const response = await fetch(`/api/catalog?${params}`);
  if (!response.ok) throw new Error("The catalog is temporarily unavailable. Please try again.");
  return (await response.json()).products;
}

export interface CatalogProduct { _id: string; name?: string; price?: number; stock?: number }

/** Ignore client prices. Aggregate duplicate IDs before checking actual stock. */
export function validateCart(items: unknown, catalog: CatalogProduct[]) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) throw new Error("Your cart must contain between 1 and 50 products.");
  const quantities = new Map<string, number>();
  for (const item of items) {
    const id = item?.product?._id;
    if (typeof id !== "string" || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("Choose a valid product quantity between 1 and 99.");
    quantities.set(id, (quantities.get(id) ?? 0) + item.quantity);
  }
  return [...quantities].map(([id, quantity]) => {
    const product = catalog.find(product => product._id === id);
    if (!product || typeof product.price !== "number" || !Number.isFinite(product.price) || product.price <= 0) throw new Error("A product is no longer available. Please refresh your cart.");
    if (!Number.isSafeInteger(product.stock) || quantity > (product.stock ?? 0) || quantity > 99) throw new Error(`Only ${product.stock ?? 0} units of ${product.name || "this product"} are available.`);
    const unitAmount = Math.round(product.price * 100);
    if (!Number.isSafeInteger(unitAmount) || unitAmount < 50 || unitAmount > 99999999) throw new Error("This product cannot be checked out at its current price.");
    return { product, quantity, unitAmount };
  });
}

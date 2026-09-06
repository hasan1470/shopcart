import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import type { Product } from "@/sanity.types";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const text = (key: string) => search.get(key)?.trim().slice(0,100) || null;
  const minPrice = Number(search.get("minPrice") ?? 0);
  const maxPrice = Number(search.get("maxPrice") ?? 1000000);
  if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice) || minPrice < 0 || maxPrice < minPrice) return NextResponse.json({error:"Invalid price range"},{status:400});
  try {
    const products = await backendClient.fetch<Product[]>(`*[_type == "product"
      && (!defined($category) || references(*[_type == "category" && slug.current == $category]._id))
      && (!defined($brand) || references(*[_type == "brand" && slug.current == $brand]._id))
      && (!defined($variant) || variant == $variant)
      && (!defined($search) || name match $search || description match $search)
      && price >= $minPrice && price <= $maxPrice] | order(name asc)[0...200]`,
      {category:text("category"),brand:text("brand"),variant:text("variant"),search:text("search") ? `${text("search")}*` : null,minPrice,maxPrice},
      {perspective:"published"});
    return NextResponse.json({products},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=300"}});
  } catch { return NextResponse.json({error:"The catalog is temporarily unavailable. Please try again."},{status:503}); }
}

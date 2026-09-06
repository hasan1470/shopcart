import { Search } from "lucide-react";
import Link from "next/link";
export default function SearchBar() { return <Link href="/shop#catalog-search" aria-label="Search products"><Search className="w-5 h-5 hover:text-shop-light-green"/></Link>; }

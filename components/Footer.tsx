import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";
import { SubText, SubTitle } from "./Title";
import { DEMO_MODE } from "@/lib/demo-mode";

const links = [
  { label: "All products", href: "/shop" },
  { label: "Hot deals", href: "/deal" },
  { label: "Shopping journal", href: "/blog" },
  { label: "Saved products", href: "/wishlist" },
  { label: "Your orders", href: "/orders" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <SubText>Discover electronics and everyday essentials. Compare products, save favorites, and keep track of your orders in one place.</SubText>
          </div>
          <div>
            <SubTitle>Explore Shopcart</SubTitle>
            <ul className="mt-4 space-y-3">
              {links.map(({label, href}) => <li key={href}><Link href={href} className="font-medium hover:text-shop-light-green hover:underline">{label}</Link></li>)}
            </ul>
          </div>
          <div className="space-y-4 rounded-xl bg-shop-light-bg p-6">
            <SubTitle>{DEMO_MODE ? "Try the complete shopping flow" : "Your next find awaits"}</SubTitle>
            <SubText>{DEMO_MODE ? "Add a product, choose delivery, and place a demo order. Revisit or cancel it from Your orders. Demo orders are saved in this browser; no payment or delivery takes place." : "Browse the collection, build your cart, and check out securely."}</SubText>
            <Link href="/shop" className="inline-flex rounded-md bg-shop-dark-green px-5 py-3 font-medium text-white hover:bg-shop-light-green">Start shopping</Link>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} Shopcart{DEMO_MODE ? " · Portfolio demo" : ""}</div>
      </Container>
    </footer>
  );
}

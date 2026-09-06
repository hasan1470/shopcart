import { DEMO_MODE } from "@/lib/demo-mode";
import StoreHydration from "@/components/StoreHydration";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <>
      <StoreHydration/>
      <div className="flex flex-col min-h-screen">
        <div className="bg-shop-dark-green px-4 py-2 text-center text-sm text-white">{DEMO_MODE ? "Portfolio demo · Try checkout and order management. No sign-in, payment card, or real delivery." : "Shopcart · Secure online shopping"}</div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
  return DEMO_MODE ? content : <ClerkProvider>{content}</ClerkProvider>;
}

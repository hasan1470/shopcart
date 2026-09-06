import { redirect } from "next/navigation";
import DemoCheckout from "@/components/DemoCheckout";
import { DEMO_MODE } from "@/lib/demo-mode";

export default function CheckoutPage() {
  if (!DEMO_MODE) redirect("/cart");
  return <DemoCheckout/>;
}

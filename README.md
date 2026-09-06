

# Shopcart

[**Open the live demo →**](https://shopcart-neon.vercel.app) · [Try checkout](https://shopcart-neon.vercel.app/shop)

**A complete shopping demo: browse, add to cart, check out, and manage orders.**

The public portfolio runs in demo mode. Visitors can use the full shopping flow without signing in or entering a payment card. The connected Clerk and Stripe integrations remain available for client handoff.

## Working features

| Feature | What visitors can try |
| --- | --- |
| Discovery | Search, category and brand filters, product details, sale collections |
| Cart | Persistent cart, quantities, removal, stock limits and totals |
| Wishlist | Save and remove favorites across browser visits |
| Demo checkout | Sample delivery details, standard/express shipping, simulated payment |
| Demo orders | Saved order history, itemized totals, cancellation and JSON export |
| Connected mode | Clerk accounts, server-validated Stripe checkout, verified confirmation and invoices |
| Content | Sanity-managed product catalog and blog articles |

## Try the demo

1. Choose an in-stock product and add it to the cart.
2. Adjust the quantity and continue to **Demo checkout**.
3. Select standard or express delivery, then place the demo order.
4. Review the saved order, reload the page to check persistence, export it, or cancel it.

**No real payment or delivery occurs in demo mode. Demo orders are stored in the visitor's current browser.**

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Sanity · Clerk · Stripe · Zustand

## Local setup

Requires Node.js 22.13+.

```bash
git clone https://github.com/hasan1470/shopcart.git
cd shopcart
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your own credentials before starting. Open [localhost:3000](http://localhost:3000).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | `true` by default; use `false` to enable connected checkout |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk application; needed only in connected mode |
| `CLERK_SECRET_KEY` | Account verification in connected mode |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity catalog project |
| `NEXT_PUBLIC_SANITY_DATASET` | Public catalog dataset |
| `SANITY_API_READ_TOKEN` | Server-side Sanity reads; never sent to visitors |
| `STRIPE_SECRET_KEY` | Stripe secret key in connected mode; start with a test key |
| `STRIPE_WEBHOOK_SECRET` | Optional signature verification for `/api/webhook` |
| `NEXT_PUBLIC_BASE_URL` | Optional custom domain; Vercel's production domain is the default |

Keep customer records out of the public Sanity catalog. In connected mode, this app reads each signed-in user's orders from Stripe on the server and does not load shared address documents into the cart.

## Quality checks

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm start
```

Regression tests cover forged prices, duplicate cart rows, stock limits, invalid quantities, and demo order totals. Connected checkout derives identity and prices on the server. A success URL alone never confirms payment or clears a cart. Demo and Stripe orders remain separate.

## Deploy

Import the repository into Vercel using the Next.js preset and add the Sanity catalog variables. The default demo mode does not need Clerk or Stripe keys.

For client handoff, set `NEXT_PUBLIC_DEMO_MODE=false`, add the client's Clerk and Stripe keys, set the production domain if needed, and redeploy. Verify checkout using Stripe test credentials before switching to live keys.

Stripe integration covers payment, order verification, and available invoices. Physical fulfillment, inventory reservation, refunds, and business-specific tax/shipping rules require client configuration.

Created by [Abdullah Hasan](https://github.com/hasan1470).

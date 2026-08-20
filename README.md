# Haji Babo Rabri

E-commerce website for Haji Babo Rabri — a Hyderabadi dairy sweets shop since 1974, serving authentic rabri, kheer, ras malai, khoya, and desi ghee.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide / Phosphor Icons

## Features

- Product catalog with categories (rabri, kheer, milk desserts, traditional sweets, dairy products)
- Product detail pages with ingredients, serving & storage info
- Shopping cart with drawer UI
- Checkout and order confirmation flow
- WhatsApp ordering integration
- Responsive, accessible UI with a heritage-inspired design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `npm run dev`    | Start dev server       |
| `npm run build`  | Production build       |
| `npm run start`  | Start production server |
| `npm run lint`   | Run ESLint             |

## Deployment (Firebase Hosting)

The site builds to a fully static export (`out/`). Deploying:

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

The Firebase project is `haji-babo-rabri`. Live at https://haji-babo-rabri.web.app

Connect a custom domain in the Firebase Console: **Hosting → Add custom domain**. Once live, update `NEXT_PUBLIC_SITE_URL` in `.env.local` and the URLs in `public/sitemap.xml` / `public/robots.txt`, then rebuild and redeploy.

### Environment variables

Copy `.env.local.example` to `.env.local` and fill in values (Google Analytics ID, etc.). See the example file for the full list.

## Feature notes & what needs your accounts

Features implemented in the codebase:

- **SEO**: full meta/OG/Twitter tags, canonical URLs, JSON-LD (`Store`, `Product`, `BreadcrumbList`), sitemap.
- **Analytics**: Google Analytics 4 script (activates once `NEXT_PUBLIC_GA_ID` is set).
- **PWA**: installable web app with offline support (manifest + service worker + icons).
- **Discount codes**: `WELCOME10` (10% off), `EID15` (15% off, max PKR 5,000), `SAVE200` (PKR 200 off orders over PKR 1,500) — editable in `src/lib/coupons.ts`.
- **Wishlist**: save items across sessions, view on the `/wishlist` page.
- **Bulk/catering orders**: `/catering` enquiry form that sends the order straight to WhatsApp.

Not yet implemented — these need real accounts/services on your side:

- **Real product photos**: replace the branded placeholder images in `public/images/` with actual photos (biggest conversion win).
- **Online payments**: the checkout lists "Online Payment" as coming soon. Add Stripe (or JazzCash/Easypaisa) via their payment links or a small backend (Cloud Functions / your own API). Requires a merchant account and your API keys.
- **Admin panel & real order tracking**: orders currently reach you via WhatsApp. A backend with Firebase Auth + Firestore (Blaze plan) would let you manage products, view all orders, and give customers live status updates (`Order.status` type is already defined).
- **Google Search Console**: verify the site and submit the sitemap to get indexed and appear in rich results.

## License

All rights reserved © Haji Babo Rabri.

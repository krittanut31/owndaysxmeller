# OWNDAYS × MELLER — Product Listing Page

Frontend assessment: a responsive product listing page for the OWNDAYS × MELLER sunglasses collection.

## Tech stack

- **Next.js 16** (App Router, Cache Components, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- `next/image` for optimized, lazy-loaded images (AVIF/WebP)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, metadata (SEO/OGP)
│   ├── page.tsx              # Server component: fetches products, renders page
│   └── globals.css           # Tailwind theme tokens, @font-face (Favorit, GT America)
├── components/
│   ├── Header.tsx            # Sticky nav, desktop links + mobile hamburger overlay
│   ├── ProductExperience.tsx # Owns modal state shared by grid + style carousel
│   ├── ProductCard.tsx       # Image, model name, code, swatches (max 4), price
│   ├── ColorSwatch.tsx       # Hex / pattern image / split (multi-color) swatch
│   ├── ProductModal.tsx      # Side panel (desktop) / fullscreen (mobile), carousel, SKU chips
│   ├── OnlineStoreButton.tsx # Default / hover / out-of-stock states
│   ├── StyleSection.tsx      # "HOW TO STYLE THEM" horizontal scroll with "+" buttons
│   ├── SectionTitle.tsx      # Highlighted display heading
│   └── Footer.tsx            # "ALL ITEMS" CTA + links
├── lib/
│   ├── api.ts                # Server-only fetch with `"use cache"` (revalidates hourly)
│   └── products.ts           # Pure helpers: image URLs, price formatting, labels
└── types/product.ts          # API response types
```

## Features

- Desktop (≥1024px): text nav, 3-column grid, 616px right-side panel
- Mobile (<1024px): hamburger menu overlay, single-column grid, full-screen modal
- Color swatches: solid hex, pattern image (`path`), or diagonal split for 2-color SKUs
- Card swatch click switches the card image; modal chips switch the carousel + P/No.
- "ONLINE STORE" links to `owndays.com/jp/ja/products/{code}?sku={skuId}`: orange → dark orange on hover, gray **OUT OF STOCK** when `in_stock === 0` (e.g. CHAUEN)
- "ALL ITEMS": black → gray on hover (per the Figma "parts" frame)
- Prices: `¥7,800+tax` (grid), `¥7,800 税込` (modal)
- Accessibility: ESC closes modal/menu, focus moves to close button and is restored, keyboard-operable cards
- Smooth enter/exit animations via CSS transitions (`@starting-style`)

## Notes

- Data is fetched on the server from `https://api-one-alpha-60.vercel.app/meller/products.json`; images are served from `https://storage.owndays.com/storage/`.
- The API has no dedicated lifestyle images, so the hero and "Style Them" carousel use the on-model shots (last image of SKUs with a full image set). Replace with the Figma key visuals if exported.
- "ABOUT" and "STORES" links are placeholder anchors, as allowed by the brief.

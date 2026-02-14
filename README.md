# AB Computer — Next.js Store

This is a headless Next.js storefront that connects to WooCommerce via REST API.

## Quick Start
1. Install Node.js (18+).
2. Copy `.env.example` to `.env.local` and fill WooCommerce keys + site URL.
3. Install dependencies and run:
   - `npm install`
   - `npm run dev`

## Environment
- `WC_API_URL`: Base site URL (no trailing slash), e.g. `https://abcomputer.com.bd`
- `WC_CONSUMER_KEY`: WooCommerce REST API key
- `WC_CONSUMER_SECRET`: WooCommerce REST API secret
- `WP_API_URL`: WordPress REST API base for pages/posts (optional)

## Notes
- Home page layout is inspired by the structure of smartbd.com (top bar, mega nav, hero, product grids, feature strip).
- Catalog uses WooCommerce REST API; if credentials are missing, fallback demo data is shown.
- Checkout posts orders to WooCommerce via `/api/checkout`.

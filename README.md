# histrips-clonev2

React (Vite) clone of the histrips "Onyx Vibration Alarm" Shopify product page.
Functional components + hooks only, no backend or database.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Structure

- `src/App.jsx` – page layout + cart count state
- `src/components/AnnouncementBar.jsx` – rotating top bar
- `src/components/Header.jsx` – nav, logo, currency, search, cart
- `src/components/ProductGallery.jsx` – main image, zoom, thumbnails
- `src/components/ProductInfo.jsx` – reviews, price, bundles, color swatches, add to cart, limited deal
- `src/data/product.js` – all product content (edit prices/bundles/colors here)
- `src/index.css` – all styles

# ShopLite — Final Project

A simple e-commerce React app built with Vite that uses the DummyJSON API for product data. Includes product listing and detail pages, cart with persistence, search/filter/sort, user reviews, responsive UI, routing, and a simulated checkout flow with taxes and order confirmation.

## Features

- Products listing with images, title, price/discount, category, rating, and Add to Cart
- Product detail page with high-res images, description, dynamic rating, API + user reviews
- Cart: add/remove, quantity controls, item counts, dynamic totals, persisted with localStorage
- Search by name, filter by category and price range, sort by price/rating/newest
- User reviews: submit rating + text + optional name, persisted in localStorage
- Responsive UI for mobile and desktop, header and footer with links and social icons
- Routing: Home, Product Detail, Cart, Checkout, Order Confirmation (React Router)
- Checkout simulation: shipping address form, payment method selection, taxes (GST 5%, QST 9.975% if Quebec)

## Quick Start

```powershell
cmd /c npm install
cmd /c npm run dev
```

Open the shown local URL in your browser. Browse products, add items to the cart, proceed to checkout, and complete a simulated payment. You will be redirected to an order confirmation page.

## Notes

- Product data is fetched from https://dummyjson.com. Reviews from the API are loaded when available; user reviews are stored in `localStorage`.
- Cart contents are stored in `localStorage` under `cart:v1`. The last placed order is stored in `sessionStorage` to render the confirmation page.

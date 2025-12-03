# ShopLite — Final Project

A simple e-commerce React app built with Vite that uses the DummyJSON API for product data. Includes product listing and detail pages, cart with persistence, search/filter/sort, user reviews, responsive UI, routing, and a simulated checkout flow with taxes and order confirmation.

## Deployment

View the live application on Vercel: [https://web-app-w7po.vercel.app/](https://web-app-w7po.vercel.app/)

## Features

- **Product Browsing**: List products with images, titles, prices, discounts, categories, and ratings.
- **Product Details**: High-resolution images, detailed descriptions, and dynamic ratings.
- **Shopping Cart**: Add/remove items, adjust quantities, view dynamic totals, and persistent storage using `localStorage`.
- **Search & Filter**: Search by name, filter by category and price range, and sort by price, rating, or newest.
- **User Reviews**: Read API reviews and submit your own (persisted in `localStorage`).
- **Responsive Design**: Optimized for both mobile and desktop devices.
- **Checkout Simulation**: Shipping address form, payment method selection, and tax calculation (GST 5%, QST 9.975% for Quebec).
- **Order Confirmation**: Summary of the placed order.

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd The-Final-Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Open the URL shown in your terminal (usually `http://localhost:5173`) to view the app.

## Team Members

- [Student Name 1]
- [Student Name 2]

## Notes

- Product data is fetched from [DummyJSON](https://dummyjson.com).
- Cart contents are stored in `localStorage` under `cart:v1`.
- The last placed order is stored in `sessionStorage` to render the confirmation page.

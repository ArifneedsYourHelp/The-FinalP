export function money(n) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(n);
}

export function calcDiscountedPrice(price, discountPercentage = 0) {
  const p = Number(price) || 0;
  const d = Number(discountPercentage) || 0;
  const discounted = p * (1 - d / 100);
  return Math.round(discounted * 100) / 100;
}

export function pct(n) {
  return `${(n || 0).toFixed(2)}%`;
}

export function starsAvg(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

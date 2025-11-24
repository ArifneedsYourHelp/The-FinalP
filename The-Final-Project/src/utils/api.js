const BASE = "https://dummyjson.com";

export async function getAllProducts() {
  const res = await fetch(`${BASE}/products?limit=100`);
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return data.products || [];
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function getProductReviews(id) {
  try {
    const res = await fetch(`${BASE}/products/${id}/reviews`);
    if (!res.ok) return [];
    const data = await res.json();
    const reviews = data.reviews || data || [];
    return Array.isArray(reviews)
      ? reviews.map((r) => ({
          rating: r.rating ?? r.ratingValue ?? 0,
          comment: r.comment || r.text || "",
          user: r.reviewerName || r.user || "Anonymous",
        }))
      : [];
  } catch (_) {
    return [];
  }
}

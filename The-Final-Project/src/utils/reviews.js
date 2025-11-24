const KEY = "reviews:v1";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function writeAll(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch (_) {}
}

export function getUserReviews(productId) {
  const all = readAll();
  return all[productId] || [];
}

export function addUserReview(productId, review) {
  const all = readAll();
  const list = all[productId] || [];
  const newList = [
    ...list,
    {
      rating: Number(review.rating) || 0,
      comment: review.comment || "",
      user: review.user || "Anonymous",
      createdAt: new Date().toISOString(),
    },
  ];
  all[productId] = newList;
  writeAll(all);
  return newList;
}

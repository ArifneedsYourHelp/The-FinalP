import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import FiltersBar from "../components/FiltersBar";
import { calcDiscountedPrice } from "../utils/format";
import { getUserReviews } from "../utils/reviews";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    minPrice: undefined,
    maxPrice: undefined,
    sort: "relevance",
  });

  useEffect(() => {
    let mounted = true;
    getAllProducts()
      .then((p) => {
        if (mounted) setProducts(p);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const enhanced = useMemo(
    () =>
      products.map((p) => {
        const userReviews = getUserReviews(p.id);
        if (userReviews.length === 0) return { ...p, dynamicRating: p.rating };
        const userAvg =
          userReviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) /
          userReviews.length;
        const dynamic = Math.round(((p.rating + userAvg) / 2) * 10) / 10;
        return { ...p, dynamicRating: dynamic };
      }),
    [products]
  );

  const filtered = useMemo(() => {
    let data = [...enhanced];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (filters.category && filters.category !== "All") {
      data = data.filter((p) => p.category === filters.category);
    }
    if (filters.minPrice != null) {
      data = data.filter(
        (p) =>
          calcDiscountedPrice(p.price, p.discountPercentage) >= filters.minPrice
      );
    }
    if (filters.maxPrice != null) {
      data = data.filter(
        (p) =>
          calcDiscountedPrice(p.price, p.discountPercentage) <= filters.maxPrice
      );
    }
    switch (filters.sort) {
      case "price-asc":
        data.sort(
          (a, b) =>
            calcDiscountedPrice(a.price, a.discountPercentage) -
            calcDiscountedPrice(b.price, b.discountPercentage)
        );
        break;
      case "price-desc":
        data.sort(
          (a, b) =>
            calcDiscountedPrice(b.price, b.discountPercentage) -
            calcDiscountedPrice(a.price, a.discountPercentage)
        );
        break;
      case "rating-desc":
        data.sort(
          (a, b) =>
            (b.dynamicRating ?? b.rating) - (a.dynamicRating ?? a.rating)
        );
        break;
      case "newest":
        data.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }
    return data;
  }, [enhanced, filters]);

  return (
    <section className="container">
      <h1>Products</h1>
      <FiltersBar products={products} state={filters} setState={setFilters} />
      {loading ? <div className="muted">Loading products...</div> : null}
      {!loading && filtered.length === 0 ? (
        <div className="muted">No products found with these filters.</div>
      ) : null}
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} dynamicRating={p.dynamicRating} />
        ))}
      </div>
    </section>
  );
}

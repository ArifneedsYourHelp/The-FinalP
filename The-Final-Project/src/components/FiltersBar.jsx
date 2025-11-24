import { useMemo } from "react";

export default function FiltersBar({ products, state, setState }) {
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  return (
    <div className="filters">
      <input
        className="input"
        placeholder="Search products..."
        value={state.search || ""}
        onChange={(e) => setState((s) => ({ ...s, search: e.target.value }))}
      />
      <select
        className="select"
        value={state.category || "All"}
        onChange={(e) => setState((s) => ({ ...s, category: e.target.value }))}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="number"
        placeholder="Min price"
        value={state.minPrice ?? ""}
        onChange={(e) =>
          setState((s) => ({
            ...s,
            minPrice:
              e.target.value === "" ? undefined : Number(e.target.value),
          }))
        }
      />
      <input
        className="input"
        type="number"
        placeholder="Max price"
        value={state.maxPrice ?? ""}
        onChange={(e) =>
          setState((s) => ({
            ...s,
            maxPrice:
              e.target.value === "" ? undefined : Number(e.target.value),
          }))
        }
      />
      <select
        className="select"
        value={state.sort || "relevance"}
        onChange={(e) => setState((s) => ({ ...s, sort: e.target.value }))}
      >
        <option value="relevance">Sort: Relevance</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating-desc">Rating: High → Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

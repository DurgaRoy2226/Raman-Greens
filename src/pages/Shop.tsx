"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function Shop({ preSelectedCategory }: { preSelectedCategory?: (typeof CATEGORIES)[number] }) {
  const params = useParams();
  const urlCategory = params?.category as string | undefined;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Determine initial category: URL param /shop/:category takes precedence, then ?cat=...
  const initialCategory = preSelectedCategory || (urlCategory || searchParams.get("cat") || "All") as (typeof CATEGORIES)[number];
  const initialQuery = searchParams.get("q") || "";

  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>(initialCategory);
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState("popular");
  const [priceMax, setPriceMax] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);

  // Sync state with URL changes
  useEffect(() => {
    const newCat = preSelectedCategory || (urlCategory || searchParams.get("cat") || "All") as any;
    const newQ = searchParams.get("q") || "";

    if (newCat !== cat) setCat(newCat);
    if (newQ !== q) setQ(newQ);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory, searchParams.toString(), preSelectedCategory]);

  // Sync cat/q changes -> URL (only for main shop route)
  useEffect(() => {
    if (!preSelectedCategory) {
      const next = new URLSearchParams();
      if (cat !== "All" && !urlCategory) next.set("cat", cat);
      if (q) next.set("q", q);

      const currentQ = searchParams.get("q") || "";
      const currentCat = searchParams.get("cat") || "";

      if (next.get("q") !== currentQ || (next.get("cat") || "") !== currentCat) {
        router.replace(`/shop${next.toString() ? `?${next.toString()}` : ""}`, { scroll: false });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
    }
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.tags.some((t) => t.includes(ql)) ||
          p.description.toLowerCase().includes(ql)
      );
    }
    list = list.filter((p) => p.price <= priceMax);
    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [cat, q, sort, priceMax]);

  return (
    <div className="bg-beige-warm min-h-screen">
      {/* Hero strip */}
      <div className="bg-white border-b border-beige-soft">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-emerald-brand text-xs font-bold tracking-widest uppercase">Shop</div>
            <h1 className="font-display font-bold text-4xl lg:text-5xl mt-2">
              {cat === "All" ? "All of Nimar's Finest" : cat}
            </h1>
            <p className="text-neutral-500 mt-2 max-w-xl">
              {filtered.length} treasures from Khandwa & the Nimar belt.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block">
          <FilterPanel
            cat={cat}
            setCat={setCat}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            q={q}
            setQ={setQ}
          />
        </aside>

        <div>
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-sm font-medium border border-beige-soft"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="text-sm text-neutral-500 hidden lg:block">
              Showing <b className="text-neutral-900">{filtered.length}</b> products
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white px-4 py-2.5 rounded-full text-sm font-medium border border-beige-soft focus:border-emerald-brand focus:outline-none"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl text-center">
              <div className="text-5xl mb-3">🌾</div>
              <div className="font-display font-bold text-xl">Nothing found</div>
              <p className="text-neutral-500 text-sm mt-1">Try adjusting your filters or search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50" onClick={() => setShowFilters(false)}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="bg-white w-80 max-w-[85vw] h-full p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-1.5 rounded-full hover:bg-beige-warm">
                <X size={18} />
              </button>
            </div>
            <FilterPanel
              cat={cat}
              setCat={setCat}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              q={q}
              setQ={setQ}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  cat,
  setCat,
  priceMax,
  setPriceMax,
  q,
  setQ,
}: {
  cat: (typeof CATEGORIES)[number];
  setCat: (c: (typeof CATEGORIES)[number]) => void;
  priceMax: number;
  setPriceMax: (n: number) => void;
  q: string;
  setQ: (s: string) => void;
}) {
  return (
    <div className="space-y-7 bg-white p-6 rounded-2xl border border-beige-soft">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 block">Search</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a Nimari treat..."
          className="w-full px-4 py-2.5 bg-beige-warm rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 block">Category</label>
        <ul className="space-y-1">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                onClick={() => setCat(c)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  cat === c
                    ? "bg-emerald-brand text-white font-semibold"
                    : "hover:bg-beige-warm text-neutral-700"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
          Max Price: ₹{priceMax}
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-emerald-brand"
        />
      </div>
    </div>
  );
}

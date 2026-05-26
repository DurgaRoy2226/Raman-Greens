import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Star,
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Home,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Sun,
  RotateCw,
  Package,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80";
const PER_PAGE = 8;

/* ─── Category colour map ────────────────────────────────────────────────────── */
const CAT_STYLE: Record<string, { pill: string; badge: string }> = {
  All:                  { pill: "bg-emerald-50 text-emerald-700",  badge: "bg-emerald-100 text-emerald-700" },
  Snacks:               { pill: "bg-amber-50   text-amber-700",    badge: "bg-amber-100   text-amber-700"   },
  Spices:               { pill: "bg-red-50     text-red-700",      badge: "bg-red-100     text-red-700"     },
  Seeds:                { pill: "bg-yellow-50  text-yellow-700",   badge: "bg-yellow-100  text-yellow-700"  },
  Dairy:                { pill: "bg-blue-50    text-blue-700",     badge: "bg-blue-100    text-blue-700"    },
  Grains:               { pill: "bg-orange-50  text-orange-700",   badge: "bg-orange-100  text-orange-700"  },
  Herbs:                { pill: "bg-teal-50    text-teal-700",     badge: "bg-teal-100    text-teal-700"    },
  "Farming Products":   { pill: "bg-green-50   text-green-700",    badge: "bg-green-100   text-green-700"   },
};

/* ─── Category image map ─────────────────────────────────────────────────────── */
const CAT_INFO: Record<string, { label: string; image: string }> = {
  All: {
    label: "All Products",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Snacks: {
    label: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Spices: {
    label: "Spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Seeds: {
    label: "Seeds",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Dairy: {
    label: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Grains: {
    label: "Grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Herbs: {
    label: "Herbs",
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=120&h=120&q=80",
  },
  "Farming Products": {
    label: "Farming Products",
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d8?auto=format&fit=crop&w=120&h=120&q=80",
  },
};

/* ─── Star Rating ───────────────────────────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={11} className="fill-amber-500 text-amber-500" />;
        } else if (i === fullStars && hasHalf) {
          return (
            <div key={i} className="relative w-2.5 h-2.5 flex items-center justify-center shrink-0">
              <Star size={11} className="text-neutral-200 fill-neutral-200 absolute" />
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star size={11} className="fill-amber-500 text-amber-500" />
              </div>
            </div>
          );
        } else {
          return <Star key={i} size={11} className="text-neutral-200 fill-neutral-200" />;
        }
      })}
    </div>
  );
}

/* ─── Product Card Variants ────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 17,
    },
  },
};

/* ─── Premium Product Card ───────────────────────────────────────────────────── */
function PremiumCard({ product }: { product: Product }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <motion.article
      id={`product-card-${product.id}`}
      variants={cardVariants}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100
                 hover:border-emerald-brand-light/30 hover:shadow-[0_16px_36px_-12px_rgba(12,59,27,0.12)]
                 transition-all duration-300 ease-out flex flex-col h-full w-full z-10"
    >
      {/* Image zone */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden bg-beige-warm/20 w-full aspect-square rounded-t-2xl"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-20">
          {product.bestseller && (
            <span className="bg-amber-500 text-white text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-0.5">
              ★ Bestseller
            </span>
          )}
          {product.tags.includes("organic") && (
            <span className="bg-emerald-brand-light text-white text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-0.5">
              🌿 Organic
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-${product.id}`}
          aria-label="Toggle wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                      shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20 cursor-pointer
                      ${wished
                        ? "bg-emerald-brand text-white"
                        : "bg-white/80 backdrop-blur-sm text-neutral-500 hover:bg-white hover:text-emerald-brand"}`}
        >
          <Heart size={13} className={wished ? "fill-white" : ""} />
        </button>
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Origin Tag */}
        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-extrabold text-emerald-brand-light mb-1.5 block">
          {product.category} · {product.origin}
        </span>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="block mb-1 sm:mb-2">
          <h3 className="font-sans font-semibold text-neutral-900 text-sm sm:text-[15px] leading-snug
                         line-clamp-2 min-h-[40px] hover:text-emerald-brand-light transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mb-4">
          <StarRow rating={product.rating} />
          <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400">({product.reviews})</span>
        </div>

        {/* Price & Cart row */}
        <div className="mt-auto pt-3.5 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-sans font-bold text-[15px] sm:text-base text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-[10px] sm:text-[11px] line-through text-neutral-400">₹{product.oldPrice}</span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-brand-light font-extrabold uppercase">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <span className="text-[9px] text-neutral-400 font-semibold block mt-0.5">{product.weight}</span>
          </div>

          {/* Add to Cart */}
          <motion.button
            id={`addcart-${product.id}`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "ADD_TO_CART", product });
            }}
            aria-label="Add to cart"
            className="w-8.5 h-8.5 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-full
                       flex items-center justify-center transition-all duration-300 cursor-pointer
                       shadow-sm hover:shadow-emerald-brand/20"
          >
            <ShoppingCart size={13} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Weight Parser Helper ───────────────────────────────────────────────────── */
function getWeightCategory(weightStr: string): string {
  const norm = weightStr.toLowerCase().replace(/\s+/g, "");
  if (norm.includes("5kg")) return "5kg";
  if (norm.includes("2kg") || norm.includes("1.8kg") || norm.includes("1.5kg")) return "5kg";
  if (norm.includes("1kg") || norm === "1l" || norm.includes("900g")) return "1kg";
  if (norm.includes("500g") || norm.includes("500ml") || norm.includes("400g")) return "500g";
  if (norm.includes("250g") || norm.includes("200g") || norm.includes("300g") || norm.includes("350g")) return "250g";
  if (norm.includes("100g") || norm.includes("150g") || norm.includes("45g") || norm.includes("35g")) return "100g";
  return "other";
}

/* ─── Main Shop Page ─────────────────────────────────────────────────────────── */
export function Shop() {
  const [params, setParams] = useSearchParams();
  const initCat = (params.get("cat") as (typeof CATEGORIES)[number]) || "All";
  const initQ   = params.get("q") || "";

  const [cat,    setCat]    = useState<(typeof CATEGORIES)[number]>(initCat);
  const [q,      setQ]      = useState(initQ);
  const [sort,   setSort]   = useState("popular");
  const [page,   setPage]   = useState(1);

  const [minPrice,            setMinPrice]            = useState<number>(0);
  const [maxPrice,            setMaxPrice]            = useState<number>(2000);
  const [selectedWeights,     setSelectedWeights]     = useState<string[]>([]);
  const [minDiscount,         setMinDiscount]         = useState<number | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [minRating,           setMinRating]           = useState<number | null>(null);
  const [isMobileFilterOpen,  setIsMobileFilterOpen]  = useState(false);

  /* sync URL */
  useEffect(() => {
    const next: Record<string, string> = {};
    if (cat !== "All") next.cat = cat;
    if (q) next.q = q;
    setParams(next, { replace: true });
    setPage(1);
  }, [cat, q, setParams]);

  /* filtered & sorted */
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.tags.some((t) => t.includes(ql)) ||
          p.description.toLowerCase().includes(ql)
      );
    }
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (selectedWeights.length > 0) {
      list = list.filter((p) => selectedWeights.includes(getWeightCategory(p.weight)));
    }
    if (minDiscount !== null) {
      list = list.filter((p) => {
        const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
        return discount >= minDiscount;
      });
    }
    if (selectedAvailability.length > 0) {
      list = list.filter((p) => {
        const inStock = p.stock > 0;
        if (selectedAvailability.includes("in-stock") && inStock) return true;
        if (selectedAvailability.includes("out-of-stock") && !inStock) return true;
        return false;
      });
    }
    if (minRating !== null) {
      list = list.filter((p) => p.rating >= minRating);
    }
    switch (sort) {
      case "price-low":  list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      default:           list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [cat, q, sort, minPrice, maxPrice, selectedWeights, minDiscount, selectedAvailability, minRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handlePage = (n: number) => {
    setPage(n);
    document.getElementById("products-grid-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetAll = () => {
    setCat("All");
    setQ("");
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedWeights([]);
    setMinDiscount(null);
    setSelectedAvailability([]);
    setMinRating(null);
    setSort("popular");
  };

  const hasFilters =
    cat !== "All" ||
    q !== "" ||
    minPrice > 0 ||
    maxPrice < 2000 ||
    selectedWeights.length > 0 ||
    minDiscount !== null ||
    selectedAvailability.length > 0 ||
    minRating !== null ||
    sort !== "popular";

  /* Visual Journey Steps */
  const steps = [
    {
      title: "Farm Fresh Selection",
      desc: "Sun-ripened, handpicked crops sourced directly from Nimar's organic farms.",
      icon: Sprout,
    },
    {
      title: "Cleaning & Preparation",
      desc: "Triple-washed and carefully sorted by hand to select the finest produce.",
      icon: Sparkles,
    },
    {
      title: "Natural Drying",
      desc: "Slow-dried under hygienic conditions to lock in vital nutrients.",
      icon: Sun,
    },
    {
      title: "Fine Processing",
      desc: "Slow stone-ground milling at low temperatures to preserve aroma.",
      icon: RotateCw,
    },
    {
      title: "Hygienic Packaging",
      desc: "Sealed in eco-friendly premium pouches to lock in peak freshness.",
      icon: Package,
    },
  ];

  /* ── Sidebar content (always open layout, no collapses, no scrollbars) ── */
  const SidebarFilters = () => (
    <div className="flex flex-col gap-5 text-neutral-800">
      <style dangerouslySetInnerHTML={{__html: `
        .price-slider-input::-webkit-slider-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2BB07F;
          border: 2px solid #FFFFFF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          cursor: pointer;
          -webkit-appearance: none;
          transition: transform 0.1s ease;
        }
        .price-slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.12);
        }
        .price-slider-input::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2BB07F;
          border: 2px solid #FFFFFF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .price-slider-input::-moz-range-thumb:hover {
          transform: scale(1.12);
        }
      `}} />

      {/* Search Filter */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Search Catalog</h3>
        <div className="relative">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search keywords..."
            className="w-full pl-9 pr-8 py-1.5 bg-neutral-50 rounded-xl border border-neutral-200/80
                       hover:border-emerald-brand-light/40 focus:border-emerald-brand focus:ring-4 focus:ring-emerald-brand-light/5 focus:bg-white focus:outline-none
                       text-xs font-semibold text-neutral-700 transition-all duration-200"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700">
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Categories (No dropdown collapse) */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Categories</h3>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((c) => {
            const active = cat === c;
            const info = CAT_INFO[c] || { label: c, image: CAT_INFO["All"].image };
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold
                            transition-all duration-150 w-full group cursor-pointer border
                            ${active
                              ? "bg-emerald-brand-light/5 border-emerald-brand-light/10 text-emerald-brand font-extrabold"
                              : "bg-transparent border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-emerald-brand-light"}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-5 h-5 rounded-full overflow-hidden border shrink-0 transition-all duration-200
                    ${active ? "border-emerald-brand-light/40 scale-105" : "border-neutral-200 group-hover:scale-105"}`}>
                    <img src={info.image} alt={info.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="truncate text-[11px]">{info.label}</span>
                </div>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand-light shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Price Range</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-extrabold text-neutral-500">
            <span>₹{minPrice}</span>
            <span className="text-emerald-brand-light font-extrabold">₹{maxPrice}</span>
          </div>
          <div className="relative w-full h-1 bg-beige-soft rounded-full my-2.5">
            <div
              className="absolute h-full rounded-full"
              style={{
                backgroundColor: "#2BB07F",
                left: `${(minPrice / 2000) * 100}%`,
                right: `${100 - (maxPrice / 2000) * 100}%`
              }}
            />
            <input
              type="range" min={0} max={2000} step={50} value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 50))}
              className="price-slider-input absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none cursor-pointer"
            />
            <input
              type="range" min={0} max={2000} step={50} value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 50))}
              className="price-slider-input absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <label className="absolute left-2.5 top-0.5 text-[6.5px] uppercase tracking-wider text-neutral-400 font-extrabold">Min</label>
              <input
                type="number"
                min={0}
                max={2000}
                value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 50))}
                className="w-full pl-2.5 pr-1.5 pt-3 pb-0.5 bg-white rounded-lg border border-neutral-200 text-[11px]
                           focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand/10 font-bold text-neutral-800"
              />
            </div>
            <span className="text-neutral-300 text-xs">—</span>
            <div className="relative flex-1">
              <label className="absolute left-2.5 top-0.5 text-[6.5px] uppercase tracking-wider text-neutral-400 font-extrabold">Max</label>
              <input
                type="number"
                min={0}
                max={2000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 50))}
                className="w-full pl-2.5 pr-1.5 pt-3 pb-0.5 bg-white rounded-lg border border-neutral-200 text-[11px]
                           focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand/10 font-bold text-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weight Selector */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Weight</h3>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {["100g", "250g", "500g", "1kg", "5kg"].map((w) => {
            const active = selectedWeights.includes(w);
            return (
              <button
                key={w}
                onClick={() => setSelectedWeights(active ? selectedWeights.filter((x) => x !== w) : [...selectedWeights, w])}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand border-emerald-brand text-white shadow-sm font-extrabold"
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Selector */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Discount</h3>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[10, 20, 30, 40, 50].map((pct) => {
            const active = minDiscount === pct;
            return (
              <button
                key={pct}
                onClick={() => setMinDiscount(active ? null : pct)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand border-emerald-brand text-white shadow-sm font-extrabold"
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {pct}%+
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Availability</h3>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[
            { value: "in-stock",     label: "In Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
          ].map((opt) => {
            const active = selectedAvailability.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedAvailability(
                  active ? selectedAvailability.filter((x) => x !== opt.value) : [...selectedAvailability, opt.value]
                )}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand border-emerald-brand text-white shadow-sm font-extrabold"
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Sort Options</h3>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[
            { value: "popular",    label: "Popular" },
            { value: "price-low",  label: "Price: Low-High" },
            { value: "price-high", label: "Price: High-Low" },
            { value: "rating",     label: "Rating" },
          ].map((opt) => {
            const active = sort === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand border-emerald-brand text-white shadow-sm font-extrabold"
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Reviews Rating Filter */}
      <div className="flex flex-col">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2.5">Customer Reviews</h3>
        <div className="flex flex-col gap-0.5">
          {[4, 3, 2, 1].map((stars) => {
            const active = minRating === stars;
            return (
              <button
                key={stars}
                onClick={() => setMinRating(active ? null : stars)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold
                            transition-all duration-150 w-full group cursor-pointer border
                            ${active
                              ? "bg-emerald-brand-light/5 border-emerald-brand-light/10 text-emerald-brand font-extrabold"
                              : "bg-transparent border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-emerald-brand-light"}`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                    {Array.from({ length: stars }).map((_, si) => (
                      <Star key={si} size={9} className="fill-amber-500" />
                    ))}
                    {Array.from({ length: 5 - stars }).map((_, si) => (
                      <Star key={si} size={9} className="text-neutral-200 fill-neutral-200" />
                    ))}
                  </div>
                  <span className="text-[9px] text-neutral-400 font-semibold truncate">&amp; above</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-150 shrink-0 ml-1
                  ${active ? "bg-emerald-brand-light border-emerald-brand-light text-white" : "border-neutral-200 bg-white group-hover:border-emerald-brand-light/40"}`}>
                  {active && (
                    <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All Filters Button */}
      {hasFilters && (
        <div className="pt-2">
          <button
            onClick={resetAll}
            className="w-full py-2 rounded-xl border border-beige-soft bg-beige-warm/60
                       hover:bg-beige-warm text-emerald-brand font-extrabold text-xs
                       flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <X size={12} /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden relative"
      style={{ background: "linear-gradient(170deg, #F7F4EE 0%, #EEF2E8 45%, #E4EAD8 100%)" }}
    >
      {/* Floating leaves backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            y: [0, -24, 0],
            x: [0, 12, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-4 opacity-[0.06] text-emerald-brand-light hidden xl:block"
        >
          <Leaf size={48} className="fill-current" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 28, 0],
            x: [0, -15, 0],
            rotate: [0, -35, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 right-8 opacity-[0.05] text-emerald-brand-light hidden xl:block"
        >
          <Leaf size={56} className="fill-current" />
        </motion.div>
      </div>

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden" style={{ height: "clamp(220px, 32vw, 360px)" }}>
        <img
          src={HERO_IMG}
          alt="Fresh Organic Products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0, 45, 23, 0.75) 0%, rgba(0, 10, 5, 0.6) 100%)" }}
        />
        
        {/* Floating leaves in Hero banner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-12 left-[10%] opacity-25 text-emerald-brand-light"
          >
            <Leaf size={24} className="fill-current" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 right-[15%] opacity-20 text-emerald-brand-light"
          >
            <Leaf size={32} className="fill-current" />
          </motion.div>
        </div>

        {/* glow blobs */}
        <div className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(43,176,127,0.22)", border: "1px solid rgba(43,176,127,0.4)" }}
            >
              <Leaf size={12} style={{ color: "#2BB07F" }} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#7EEDC0" }}>
                Raman Greens Catalog
              </span>
              <Sparkles size={12} style={{ color: "#2BB07F" }} />
            </motion.div>

            <h1
              className="font-display font-bold text-white leading-tight mb-2.5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              Shop Organic Luxury
            </h1>

            <p className="text-white/80 mb-4.5 max-w-md mx-auto text-xs sm:text-sm font-medium">
              Harvested from Nimar's clean soils — pure natural taste & sustainable goodness.
            </p>

            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-white/60">
              <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors duration-200 font-semibold">
                <Home size={12} /> Home
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-white/95 font-bold">Shop</span>
            </nav>
          </motion.div>
        </div>

        {/* wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#F7F4EE" />
          </svg>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 relative z-10">

        {/* Grid layout for sidebar & products */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">

          {/* ── Left Sidebar (Desktop, glassmorphism, no collapse, no internal scroll) ── */}
          <aside
            className="hidden lg:block w-full bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/40
                       shadow-[0_8px_32px_rgba(0,0,0,0.04)] lg:sticky lg:top-24 lg:self-start transition-all"
          >
            <SidebarFilters />
          </aside>

          {/* ── Products Column ── */}
          <div className="min-w-0 space-y-4">

            {/* Filter Results & Sorter Header */}
            <div
              id="products-grid-anchor"
              className="flex items-center justify-between py-3 border-b border-beige-soft/60 flex-wrap gap-2"
            >
              <p className="text-xs text-neutral-500 font-semibold">
                Showing{" "}
                <span className="font-extrabold text-neutral-900">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {cat !== "All" && (
                  <> in <span className="text-emerald-brand font-extrabold">{cat}</span></>
                )}
                {q && (
                  <> for <span className="text-emerald-brand font-extrabold">"{q}"</span></>
                )}
              </p>
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter trigger */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-beige-soft bg-white text-emerald-brand text-xs font-extrabold transition-all hover:bg-beige-warm active:scale-95 cursor-pointer shadow-sm"
                >
                  <SlidersHorizontal size={12} />
                  <span>Filters &amp; Sort</span>
                </button>

                {hasFilters && (
                  <button
                    onClick={resetAll}
                    className="text-xs text-neutral-400 hover:text-emerald-brand transition-colors flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <X size={12} /> Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid (4 columns desktop, 2 tablet, 1 mobile) */}
            {paginated.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-16 sm:p-24 text-center border border-beige-soft/60 shadow-sm"
              >
                <div className="text-6xl mb-5">🌿</div>
                <h3 className="font-display font-bold text-xl text-neutral-800 mb-2">No products found</h3>
                <p className="text-neutral-500 text-xs max-w-xs mx-auto mb-6">
                  Try a different category, price range, or filter.
                </p>
                <button
                  onClick={resetAll}
                  className="bg-emerald-brand hover:bg-emerald-brand-dark text-white font-extrabold
                             px-7 py-3 rounded-full text-xs transition-colors shadow-lg cursor-pointer"
                >
                  View All Products
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {paginated.map((p) => (
                  <PremiumCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination (Center-aligned, modern buttons, active green) */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-center w-full gap-3 mt-10 text-center">
                <motion.nav
                  aria-label="Pagination"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center items-center gap-2"
                >
                  <button
                    id="pagination-prev"
                    onClick={() => handlePage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="group flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white border border-beige-soft
                               text-xs font-bold text-neutral-600 uppercase tracking-wide
                               hover:border-emerald-brand/40 hover:text-emerald-brand
                               active:scale-95 transition-all duration-200 cursor-pointer
                               disabled:opacity-35 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                    <span>Prev</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                      const active = page === n;
                      return (
                        <button
                          key={n}
                          id={`pagination-page-${n}`}
                          onClick={() => handlePage(n)}
                          aria-current={active ? "page" : undefined}
                          className={`w-10 h-10 rounded-xl text-xs font-extrabold flex items-center justify-center
                                     transition-all duration-200 cursor-pointer
                                     ${active
                                       ? "bg-emerald-brand text-white border border-emerald-brand shadow-sm"
                                       : "bg-white border border-beige-soft text-neutral-600 hover:border-emerald-brand/40 hover:text-emerald-brand hover:-translate-y-0.5"}`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    id="pagination-next"
                    onClick={() => handlePage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    aria-label="Next page"
                    className="group flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white border border-beige-soft
                               text-xs font-bold text-neutral-600 uppercase tracking-wide
                               hover:border-emerald-brand/40 hover:text-emerald-brand
                               active:scale-95 transition-all duration-200 cursor-pointer
                               disabled:opacity-35 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.nav>
                <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
                  Page {page} of {totalPages}
                </span>
              </div>
            )}

          </div>
        </div>

        {/* ── Premium Storytelling & Branding Footer Sections (Merged inside main container, mt-10 for minimal clean spacing) ── */}
        
        {/* 1. FROM FARM TO POWDER (Visual Journey) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] mt-10 sm:mt-12"
        >
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-brand bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
              Our Process
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 mt-3">
              From Farm to Powder
            </h2>
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              We follow a rigorous, quality-focused journey to bring Nimar's pure soil goodness to your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-3 items-stretch relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center relative group flex-1">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-beige-soft flex items-center justify-center text-emerald-brand-light shadow-sm group-hover:border-emerald-brand-light/40 group-hover:text-emerald-brand transition-all duration-300 z-10 mb-4">
                    <Icon size={20} />
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-sans font-bold text-xs sm:text-[13px] text-neutral-800 mb-1.5 px-1">
                    {step.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed max-w-[180px] font-medium px-2">
                    {step.desc}
                  </p>

                  {/* Connecting Line (Desktop only) */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 border-t border-dashed border-beige-soft z-0" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 2. PREMIUM BRAND BANNER */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-brand/5 via-beige-warm/60 to-emerald-brand-light/10 border border-white/50 p-8 sm:p-12 md:p-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.03)] mt-8 sm:mt-10"
        >
          {/* Decorative floating leaves */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 text-emerald-brand-light/15 hidden md:block"
          >
            <Leaf size={32} className="fill-current" />
          </motion.div>
          <motion.div
            animate={{ y: [8, -8, 8], rotate: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-12 text-emerald-brand-light/12 hidden md:block"
          >
            <Leaf size={40} className="fill-current" />
          </motion.div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-brand bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 mb-4.5">
              Premium Organic Promise
            </span>
            
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-neutral-900 leading-tight mb-4">
              Crafted by Nature.<br className="sm:hidden" /> Refined by Innovation.
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mb-8 font-medium">
              Every Raman Greens product is carefully processed to preserve purity, freshness, and authentic taste.
            </p>

            <button
              onClick={() => document.getElementById("products-grid-anchor")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-emerald-brand hover:bg-emerald-brand-dark text-white font-extrabold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-emerald-brand/20 cursor-pointer"
            >
              Explore Shop
            </button>
          </div>
        </motion.section>
      </div>

      {/* Floating mobile filter button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-emerald-brand hover:bg-emerald-brand-dark text-white shadow-xl shadow-emerald-950/20 px-4 py-3 rounded-full flex items-center gap-2 font-bold text-xs border border-emerald-brand-light/20 cursor-pointer transition-all duration-300"
      >
        <SlidersHorizontal size={13} />
        <span>Filters &amp; Sort</span>
        {hasFilters && (
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        )}
      </motion.button>

      {/* Mobile/Tablet Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Drawer Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] bg-white z-50 p-5 shadow-2xl flex flex-col h-full lg:hidden border-r border-beige-soft/60"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-beige-soft/60 mb-3.5 shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-emerald-brand" />
                  <h2 className="font-sans font-bold text-xs text-neutral-900 uppercase tracking-widest">Filters</h2>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-beige-warm text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                <SidebarFilters />
              </div>
              
              {hasFilters && (
                <div className="pt-4 border-t border-beige-soft/60 shrink-0">
                  <button
                    onClick={() => {
                      resetAll();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-beige-warm hover:bg-beige-soft text-emerald-brand text-xs font-extrabold transition-all duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

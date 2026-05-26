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
  Organics:             { pill: "bg-green-50   text-green-700",    badge: "bg-green-100   text-green-700"   },
  Seeds:                { pill: "bg-amber-50   text-amber-700",    badge: "bg-amber-100   text-amber-700"   },
  Spices:               { pill: "bg-red-50     text-red-700",      badge: "bg-red-100     text-red-700"     },
  Fertilizers:          { pill: "bg-orange-50  text-orange-700",   badge: "bg-orange-100  text-orange-700"  },
  Dairy:                { pill: "bg-blue-50    text-blue-700",     badge: "bg-blue-100    text-blue-700"    },
  Vegetables:           { pill: "bg-emerald-50 text-emerald-700",  badge: "bg-emerald-100 text-emerald-700" },
  Grains:               { pill: "bg-yellow-50  text-yellow-700",   badge: "bg-yellow-100  text-yellow-700"  },
  Herbs:                { pill: "bg-teal-50    text-teal-700",     badge: "bg-teal-100    text-teal-700"    },
  "Farming Products":   { pill: "bg-amber-50   text-amber-700",    badge: "bg-amber-100   text-amber-700"   },
};

/* ─── Category image map ─────────────────────────────────────────────────────── */
const CAT_INFO: Record<string, { label: string; image: string }> = {
  All: {
    label: "All Products",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Organics: {
    label: "Organics",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Seeds: {
    label: "Seeds",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Spices: {
    label: "Spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Fertilizers: {
    label: "Fertilizers",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Dairy: {
    label: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Vegetables: {
    label: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Grains: {
    label: "Grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=120&h=120&q=80",
  },
  Herbs: {
    label: "Herbs",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=120&h=120&q=80",
  },
  "Farming Products": {
    label: "Farming Products",
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d8?auto=format&fit=crop&w=120&h=120&q=80",
  },
};

/* ─── Star Rating ────────────────────────────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-200 text-neutral-200"
          }
        />
      ))}
    </div>
  );
}

/* ─── Premium Product Card ───────────────────────────────────────────────────── */
function PremiumCard({ product, idx }: { product: Product; idx: number }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <motion.article
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.1, ease: "easeOut" }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-beige-soft/80
                 hover:border-emerald-brand/35 hover:shadow-xl hover:shadow-emerald-brand/8
                 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full w-full"
    >
      {/* Image zone */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden bg-beige-warm w-full aspect-square"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Wishlist Button */}
        <button
          id={`wishlist-${product.id}`}
          aria-label="Toggle wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
                      shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20
                      ${wished
                        ? "bg-emerald-brand text-white"
                        : "bg-white/90 backdrop-blur-sm text-neutral-500 hover:bg-white hover:text-emerald-brand"}`}
        >
          <Heart size={15} className={wished ? "fill-white" : ""} />
        </button>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-display font-medium text-neutral-900 text-[15px] leading-snug
                         line-clamp-2 hover:text-emerald-brand transition-colors duration-200 mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-beige-soft/60">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 font-light">{product.weight}</span>
          </div>

          {/* Add to Cart */}
          <motion.button
            id={`addcart-${product.id}`}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "ADD_TO_CART", product });
            }}
            aria-label="Add to cart"
            className="w-10 h-10 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-full
                       flex items-center justify-center transition-all duration-300
                       shadow-md hover:shadow-emerald-brand/30 hover:shadow-lg active:scale-90"
          >
            <ShoppingCart size={15} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Quick View Modal ───────────────────────────────────────────────────────── */
function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      id="quick-view-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1">
          {/* Image */}
          <div className="relative bg-beige-warm aspect-[4/3] md:aspect-auto md:h-full min-h-[220px] md:min-h-[280px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:absolute md:inset-0"
            />
            {product.bestseller && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px]
                               font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                ★ Bestseller
              </span>
            )}
            {product.oldPrice && (
              <span className="absolute bottom-3 left-3 bg-emerald-brand text-white text-[10px]
                               font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-brand">
                  {product.category} · {product.origin}
                </span>
                <button
                  id="quick-view-close"
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 rounded-full hover:bg-beige-warm text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 leading-tight mb-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-3">
                <StarRow rating={product.rating} />
                <span className="text-sm font-semibold text-neutral-800">{product.rating}</span>
                <span className="text-xs text-neutral-400">({product.reviews} reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                {product.description}
              </p>

              <ul className="space-y-1 mb-4">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700">
                    <Leaf size={12} className="text-emerald-brand flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-4 pt-3 border-t border-neutral-100">
                <span className="font-display font-bold text-2xl sm:text-3xl text-neutral-900">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
                )}
                <span className="text-xs sm:text-sm text-neutral-400 ml-1">/ {product.weight}</span>
              </div>

              <div className="flex gap-2">
                <button
                  id="quick-view-add-cart"
                  onClick={() => { dispatch({ type: "ADD_TO_CART", product }); onClose(); }}
                  className="flex-grow bg-emerald-brand hover:bg-emerald-brand-dark text-white font-semibold
                             py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm
                             transition-colors duration-200 shadow-lg hover:shadow-emerald-brand/30"
                >
                  <ShoppingCart size={15} /> Add to Cart
                </button>
                <button
                  id="quick-view-wishlist"
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border-2
                               transition-all duration-200 shrink-0
                               ${wished
                                 ? "border-emerald-brand bg-emerald-brand text-white"
                                 : "border-beige-soft hover:border-emerald-brand text-neutral-400"}`}
                >
                  <Heart size={16} className={wished ? "fill-white" : ""} />
                </button>
              </div>

              <div className="text-center mt-3">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-block text-xs text-emerald-brand hover:text-emerald-brand-dark font-semibold transition-colors"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
  const [qvProd, setQvProd] = useState<Product | null>(null);

  const [minPrice,            setMinPrice]            = useState<number>(0);
  const [maxPrice,            setMaxPrice]            = useState<number>(5000);
  const [selectedWeights,     setSelectedWeights]     = useState<string[]>([]);
  const [minDiscount,         setMinDiscount]         = useState<number | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [minRating,           setMinRating]           = useState<number | null>(null);

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
    setMaxPrice(5000);
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
    maxPrice < 5000 ||
    selectedWeights.length > 0 ||
    minDiscount !== null ||
    selectedAvailability.length > 0 ||
    minRating !== null ||
    sort !== "popular";

  /* ── Sidebar content (shared between desktop & mobile drawer) ── */
  const SidebarFilters = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
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

      {/* Search */}
      <div className="sm:col-span-2 lg:col-span-1">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-2">Search</h3>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-7 pr-6 py-1.5 bg-beige-warm/40 rounded-xl border border-beige-soft
                       hover:border-emerald-brand/35 focus:border-emerald-brand-light focus:outline-none
                       text-xs font-medium text-neutral-700 transition-all duration-200"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700">
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Categories */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Categories</h3>
        <div className="grid grid-cols-2 gap-0.5">
          {CATEGORIES.map((c) => {
            const active = cat === c;
            const info = CAT_INFO[c] || { label: c, image: CAT_INFO["All"].image };
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex items-center justify-between px-2 py-1 rounded-lg text-left text-[11px] font-medium
                            transition-all duration-200 w-full group cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 text-emerald-brand font-semibold"
                              : "text-neutral-600 hover:bg-beige-warm/60 hover:text-emerald-brand"}`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`w-4 h-4 rounded-full overflow-hidden border shrink-0 transition-all duration-200
                    ${active ? "border-emerald-brand/30" : "border-beige-soft/50 group-hover:scale-105"}`}>
                    <img src={info.image} alt={info.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="truncate text-[10px]">{info.label}</span>
                </div>
                {active && <span className="w-1 h-1 rounded-full bg-emerald-brand shrink-0 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Price Range</h3>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium text-neutral-500">
            <span>₹{minPrice}</span>
            <span className="text-emerald-brand-light font-semibold">₹{maxPrice}</span>
          </div>
          <div className="relative w-full h-1 bg-beige-soft rounded-full my-1.5">
            <div
              className="absolute h-full rounded-full"
              style={{
                backgroundColor: "#2BB07F",
                left: `${(minPrice / 5000) * 100}%`,
                right: `${100 - (maxPrice / 5000) * 100}%`
              }}
            />
            <input
              type="range" min={0} max={5000} step={50} value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 50))}
              className="price-slider-input absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none cursor-pointer"
            />
            <input
              type="range" min={0} max={5000} step={50} value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 50))}
              className="price-slider-input absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <label className="absolute left-2 top-0.5 text-[7px] uppercase tracking-wider text-neutral-400 font-bold">Min</label>
              <input
                type="number"
                min={0}
                max={5000}
                value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 50))}
                className="w-full pl-2 pr-1 pt-3 pb-0.5 bg-white rounded-lg border border-beige-soft text-[11px]
                           focus:outline-none focus:border-emerald-brand-light font-medium text-neutral-800"
              />
            </div>
            <span className="text-neutral-300 text-xs">—</span>
            <div className="relative flex-1">
              <label className="absolute left-2 top-0.5 text-[7px] uppercase tracking-wider text-neutral-400 font-bold">Max</label>
              <input
                type="number"
                min={0}
                max={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 50))}
                className="w-full pl-2 pr-1 pt-3 pb-0.5 bg-white rounded-lg border border-beige-soft text-[11px]
                           focus:outline-none focus:border-emerald-brand-light font-medium text-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Weight */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Weight</h3>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {["100g", "250g", "500g", "1kg", "5kg"].map((w) => {
            const active = selectedWeights.includes(w);
            return (
              <button
                key={w}
                onClick={() => setSelectedWeights(active ? selectedWeights.filter((x) => x !== w) : [...selectedWeights, w])}
                className={`px-2 py-0.5 rounded border text-[10px] font-medium transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 border-emerald-brand text-emerald-brand font-semibold"
                              : "bg-white border-neutral-300 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Discount */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Discount</h3>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {[10, 20, 30, 40, 50].map((pct) => {
            const active = minDiscount === pct;
            return (
              <button
                key={pct}
                onClick={() => setMinDiscount(active ? null : pct)}
                className={`px-2 py-0.5 rounded border text-[10px] font-medium transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 border-emerald-brand text-emerald-brand font-semibold"
                              : "bg-white border-neutral-300 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {pct}%+
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Sort By */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Sort By</h3>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {[
            { value: "popular",    label: "Popular" },
            { value: "newest",     label: "Newest" },
            { value: "price-low",  label: "Price: Low-High" },
            { value: "price-high", label: "Price: High-Low" },
          ].map((opt) => {
            const active = sort === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-2 py-0.5 rounded border text-[10px] font-medium transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 border-emerald-brand text-emerald-brand font-semibold"
                              : "bg-white border-neutral-300 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Availability */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Availability</h3>
        <div className="flex flex-wrap gap-1 pt-0.5">
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
                className={`px-2 py-0.5 rounded border text-[10px] font-medium transition-all duration-200 cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 border-emerald-brand text-emerald-brand font-semibold"
                              : "bg-white border-neutral-300 text-neutral-600 hover:border-emerald-brand-light/50 hover:text-emerald-brand"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Customer Reviews */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-beige-soft/60 mb-1.5">Customer Reviews</h3>
        <div className="grid grid-cols-2 gap-0.5">
          {[4, 3, 2, 1].map((stars) => {
            const active = minRating === stars;
            return (
              <button
                key={stars}
                onClick={() => setMinRating(active ? null : stars)}
                className={`flex items-center justify-between px-2 py-1 rounded-lg text-left text-[11px] font-medium
                            transition-all duration-200 w-full group cursor-pointer
                            ${active
                              ? "bg-emerald-brand/8 text-emerald-brand font-semibold"
                              : "text-neutral-600 hover:bg-beige-warm/60 hover:text-emerald-brand"}`}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-500 shrink-0">{stars}★</span>
                  <span className="text-[9px] text-neutral-500 truncate font-light">&amp; above</span>
                </div>
                <div className={`w-3 h-3 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ml-1
                  ${active ? "bg-emerald-brand-light border-emerald-brand-light" : "border-neutral-300 bg-white group-hover:border-emerald-brand-light/50"}`}>
                  {active && (
                    <svg className="w-2 h-2 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All */}
      {hasFilters && (
        <div className="sm:col-span-2 lg:col-span-1 pt-2">
          <button
            onClick={resetAll}
            className="w-full py-2 rounded-xl border border-beige-soft bg-beige-warm/60
                       hover:bg-beige-warm text-emerald-brand-dark text-[11px] font-bold
                       flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <X size={11} /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  /* ── render ── */
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "linear-gradient(170deg, #F7F4EE 0%, #EEF2E8 45%, #E4EAD8 100%)" }}
    >

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden" style={{ height: "clamp(240px, 36vw, 420px)" }}>
        <img
          src={HERO_IMG}
          alt="Fresh Organic Products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,60,30,0.82) 0%, rgba(0,0,0,0.52) 60%, rgba(0,100,50,0.48) 100%)" }}
        />
        {/* glow blobs */}
        <div className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(43,176,127,0.22)", border: "1px solid rgba(43,176,127,0.4)" }}
            >
              <Leaf size={13} style={{ color: "#2BB07F" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7EEDC0" }}>
                100% Organic &amp; Natural
              </span>
              <Sparkles size={13} style={{ color: "#2BB07F" }} />
            </motion.div>

            <h1
              className="font-display font-bold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
            >
              Fresh Organic Products
            </h1>

            <p className="text-white/75 mb-5 max-w-md mx-auto" style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
              Handpicked from Nimar's fertile farmlands — pure, natural &amp; full of goodness.
            </p>

            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-white/55">
              <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                <Home size={13} /> Home
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-white/90 font-medium">Products</span>
            </nav>
          </motion.div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#F7F4EE" />
          </svg>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Grid: sidebar + products */}
        <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-5 items-start">

          {/* ── Sidebar ── */}
          <aside
            className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-beige-soft/50
                       shadow-sm lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)]
                       lg:overflow-y-auto no-scrollbar"
          >
            <SidebarFilters />
          </aside>

          {/* ── Products Column ── */}
          <div className="min-w-0 space-y-3">

            {/* Result count bar */}
            <div
              id="products-grid-anchor"
              className="flex items-center justify-between py-3 border-b border-beige-soft/60"
            >
              <p className="text-xs text-neutral-500">
                Showing{" "}
                <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {cat !== "All" && (
                  <> in <span className="text-emerald-brand font-semibold">{cat}</span></>
                )}
                {q && (
                  <> for <span className="text-emerald-brand font-semibold">"{q}"</span></>
                )}
              </p>
              {hasFilters && (
                <button
                  onClick={resetAll}
                  className="text-xs text-neutral-400 hover:text-emerald-brand transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X size={11} /> Clear filters
                </button>
              )}
            </div>

            {/* Product Grid */}
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
                  className="bg-emerald-brand hover:bg-emerald-brand-dark text-white font-semibold
                             px-7 py-3 rounded-full text-xs transition-colors shadow-lg cursor-pointer"
                >
                  View All Products
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {paginated.map((p, i) => (
                  <PremiumCard key={p.id} product={p} idx={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-center w-full gap-3 mt-8 text-center">
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
                    className="group flex items-center gap-1.5 px-4 h-11 rounded-xl bg-white border border-beige-soft
                               text-xs font-semibold text-neutral-600 uppercase tracking-wide
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
                          className={`w-11 h-11 rounded-xl text-sm font-bold flex items-center justify-center
                                     transition-all duration-200 cursor-pointer
                                     ${active
                                       ? "bg-emerald-50 text-emerald-brand border border-emerald-brand/20 shadow-sm"
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
                    className="group flex items-center gap-1.5 px-4 h-11 rounded-xl bg-white border border-beige-soft
                               text-xs font-semibold text-neutral-600 uppercase tracking-wide
                               hover:border-emerald-brand/40 hover:text-emerald-brand
                               active:scale-95 transition-all duration-200 cursor-pointer
                               disabled:opacity-35 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.nav>
                <span className="text-xs text-neutral-400 font-medium">
                  Page <span className="font-semibold text-neutral-600">{page}</span> of{" "}
                  <span className="font-semibold text-neutral-600">{totalPages}</span>
                </span>
              </div>
            )}

          </div>
        </div>

        {/* Organic Promise Strip — outside the grid so it spans full container width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #006B43 0%, #008F5A 50%, #2BB07F 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-white text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <Leaf size={18} className="text-white/80" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Our Promise</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl mb-1">100% Pure &amp; Organic</h2>
              <p className="text-white/75 text-sm max-w-sm">
                Sourced directly from certified farmers in the Nimar belt —
                no chemicals, no shortcuts, just nature's best.
              </p>
            </div>
            <div className="flex gap-6 sm:gap-10 justify-center text-white text-center flex-wrap sm:flex-nowrap">
              {[
                { v: "50+",  l: "Farmers" },
                { v: "12+",  l: "Products" },
                { v: "4.8★", l: "Avg Rating" },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center px-4 py-2 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="font-display font-bold text-3xl sm:text-4xl">{v}</div>
                  <div className="text-white/80 text-[11px] font-semibold uppercase tracking-wider mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Quick View Modal ── */}
      <AnimatePresence>
        {qvProd && (
          <QuickViewModal product={qvProd} onClose={() => setQvProd(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

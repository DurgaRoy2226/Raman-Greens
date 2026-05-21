import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Star,
  ShoppingCart,
  Eye,
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

/* ─── Constants ────────────────────────────────────────────────────────────── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80";
const PER_PAGE = 8;

/* ─── Category colour map ───────────────────────────────────────────────────── */
const CAT_STYLE: Record<string, { pill: string; badge: string }> = {
  All:      { pill: "bg-emerald-50 text-emerald-700",    badge: "bg-emerald-100 text-emerald-700" },
  Snacks:   { pill: "bg-orange-50  text-orange-700",     badge: "bg-orange-100  text-orange-700"  },
  Organics: { pill: "bg-green-50   text-green-700",      badge: "bg-green-100   text-green-700"   },
  Sweets:   { pill: "bg-pink-50    text-pink-700",       badge: "bg-pink-100    text-pink-700"    },
  Spices:   { pill: "bg-red-50     text-red-700",        badge: "bg-red-100     text-red-700"     },
  Gifting:  { pill: "bg-purple-50  text-purple-700",     badge: "bg-purple-100  text-purple-700"  },
};

/* ─── Star Rating ───────────────────────────────────────────────────────────── */
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

/* ─── Premium Product Card ──────────────────────────────────────────────────── */
function PremiumCard({
  product,
  idx,
  onQuickView,
}: {
  product: Product;
  idx: number;
  onQuickView: (p: Product) => void;
}) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);
  const badge = CAT_STYLE[product.category]?.badge ?? "bg-gray-100 text-gray-600";

  return (
    <motion.article
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.1, ease: "easeOut" }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-beige-soft
                 hover:border-emerald-brand/30 hover:shadow-2xl hover:shadow-emerald-brand/12
                 hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
    >
      {/* ── Image zone ── */}
      <div className="relative overflow-hidden bg-beige-warm" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.oldPrice && (
            <span className="bg-emerald-brand text-white text-[10px] font-bold uppercase tracking-wider
                             px-2.5 py-1 rounded-full shadow">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-wider
                             px-2.5 py-1 rounded-full shadow">
              ★ Bestseller
            </span>
          )}
          {product.trending && !product.bestseller && (
            <span className="bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider
                             px-2.5 py-1 rounded-full shadow">
              🔥 Trending
            </span>
          )}
        </div>

        {/* wishlist button */}
        <button
          id={`wishlist-${product.id}`}
          aria-label="Toggle wishlist"
          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
                      shadow-lg transition-all duration-200 hover:scale-110
                      ${wished
                        ? "bg-emerald-brand text-white"
                        : "bg-white/80 backdrop-blur-sm text-neutral-500 hover:bg-white"}`}
        >
          <Heart size={15} className={wished ? "fill-white" : ""} />
        </button>

        {/* hover action bar */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2
                        translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                        transition-all duration-400">
          <button
            id={`quickview-${product.id}`}
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-semibold
                       px-4 py-2.5 rounded-full shadow-xl hover:bg-emerald-brand hover:text-white
                       transition-all duration-200"
          >
            <Eye size={13} /> Quick View
          </button>
          <button
            id={`addcart-hover-${product.id}`}
            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
            className="flex items-center gap-1.5 bg-emerald-brand text-white text-xs font-semibold
                       px-4 py-2.5 rounded-full shadow-xl hover:bg-emerald-brand-dark
                       transition-all duration-200"
          >
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-1">
        {/* category badge */}
        <span className={`self-start text-[10px] font-bold uppercase tracking-wider
                          px-2.5 py-1 rounded-full mb-2 ${badge}`}>
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-neutral-900 text-[15px] leading-snug
                         line-clamp-2 hover:text-emerald-brand transition-colors duration-200 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRow rating={product.rating} />
          <span className="text-xs font-semibold text-neutral-700">{product.rating}</span>
          <span className="text-xs text-neutral-400">({product.reviews})</span>
        </div>

        {/* price row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-beige-soft/80">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-xl text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400">{product.weight}</span>
          </div>
          <motion.button
            id={`addcart-${product.id}`}
            whileTap={{ scale: 0.88 }}
            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
            aria-label="Add to cart"
            className="w-10 h-10 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-full
                       flex items-center justify-center transition-colors duration-200
                       shadow-md hover:shadow-emerald-brand/30 hover:shadow-lg"
          >
            <ShoppingCart size={15} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Quick View Modal ──────────────────────────────────────────────────────── */
function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{   opacity: 0, scale: 0.88, y: 24  }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative bg-beige-warm" style={{ minHeight: "280px" }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ minHeight: "280px" }}
            />
            {product.bestseller && (
              <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[10px]
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
          <div className="p-6 flex flex-col max-h-[90vh] overflow-y-auto">
            <button
              id="quick-view-close"
              onClick={onClose}
              aria-label="Close"
              className="self-end mb-1 p-2 rounded-full hover:bg-beige-warm text-neutral-400
                         hover:text-neutral-700 transition-colors"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-brand mb-1">
              {product.category} · {product.origin}
            </span>
            <h2 className="font-display font-bold text-2xl text-neutral-900 leading-tight mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-3">
              <StarRow rating={product.rating} />
              <span className="text-sm font-semibold text-neutral-800">{product.rating}</span>
              <span className="text-sm text-neutral-400">({product.reviews} reviews)</span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* benefits */}
            <ul className="space-y-1.5 mb-5">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-neutral-700">
                  <Leaf size={12} className="text-emerald-brand flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* price */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-display font-bold text-3xl text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-sm line-through text-neutral-400">₹{product.oldPrice}</span>
              )}
              <span className="text-sm text-neutral-400 ml-1">/ {product.weight}</span>
            </div>

            {/* actions */}
            <div className="flex gap-2.5 mt-auto">
              <button
                id="quick-view-add-cart"
                onClick={() => { dispatch({ type: "ADD_TO_CART", product }); onClose(); }}
                className="flex-1 bg-emerald-brand hover:bg-emerald-brand-dark text-white font-semibold
                           py-3 px-5 rounded-2xl flex items-center justify-center gap-2
                           transition-colors duration-200 shadow-lg hover:shadow-emerald-brand/30"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                id="quick-view-wishlist"
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2
                             transition-all duration-200
                             ${wished
                               ? "border-emerald-brand bg-emerald-brand text-white"
                               : "border-beige-soft hover:border-emerald-brand text-neutral-400"}`}
              >
                <Heart size={18} className={wished ? "fill-white" : ""} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-center mt-3 text-sm text-emerald-brand hover:text-emerald-brand-dark
                         font-semibold transition-colors"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Shop Page ────────────────────────────────────────────────────────── */
export function Shop() {
  const [params, setParams] = useSearchParams();
  const initCat = (params.get("cat") as (typeof CATEGORIES)[number]) || "All";
  const initQ   = params.get("q") || "";

  const [cat,   setCat]   = useState<(typeof CATEGORIES)[number]>(initCat);
  const [q,     setQ]     = useState(initQ);
  const [sort,  setSort]  = useState("popular");
  const [page,  setPage]  = useState(1);
  const [qvProd, setQvProd] = useState<Product | null>(null);

  /* sync URL */
  useEffect(() => {
    const next: Record<string, string> = {};
    if (cat !== "All") next.cat = cat;
    if (q) next.q = q;
    setParams(next, { replace: true });
    setPage(1);
  }, [cat, q, setParams]);

  /* filtered & sorted list */
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
    switch (sort) {
      case "price-low":  list.sort((a, b) => a.price - b.price);               break;
      case "price-high": list.sort((a, b) => b.price - a.price);               break;
      case "rating":     list.sort((a, b) => b.rating - a.rating);             break;
      default:           list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [cat, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* scroll to grid top when page changes */
  const handlePage = (n: number) => {
    setPage(n);
    document.getElementById("products-grid-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── render ── */
  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden" style={{ height: "clamp(260px, 38vw, 440px)" }}>
        <img
          src={HERO_IMG}
          alt="Fresh Organic Products hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* layered overlays for depth */}
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(135deg, rgba(0,60,30,0.80) 0%, rgba(0,0,0,0.55) 60%, rgba(0,100,50,0.50) 100%)" }} />
        {/* decorative leaf blobs */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, #2BB07F, transparent 70%)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(43,176,127,0.25)", border: "1px solid rgba(43,176,127,0.4)" }}
            >
              <Leaf size={13} style={{ color: "#2BB07F" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7EEDC0" }}>
                100% Organic &amp; Natural
              </span>
              <Sparkles size={13} style={{ color: "#2BB07F" }} />
            </motion.div>

            <h1 className="font-display font-bold text-white leading-tight mb-3"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
              Fresh Organic Products
            </h1>

            <p className="text-white/75 mb-5 max-w-md mx-auto"
               style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
              Handpicked from Nimar's fertile farmlands — pure, natural &amp; full of goodness.
            </p>

            {/* breadcrumb */}
            <nav aria-label="Breadcrumb"
                 className="flex items-center justify-center gap-2 text-sm text-white/55">
              <Link to="/"
                    className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
                <Home size={13} /> Home
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-white/90 font-medium">Products</span>
            </nav>
          </motion.div>
        </div>

        {/* wave bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
               className="w-full h-full">
            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

        {/* Search + Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search input */}
          <div className="relative flex-1">
            <Search size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              id="product-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, spices, snacks…"
              className="w-full pl-10 pr-4 py-3.5 bg-white rounded-2xl border border-beige-soft
                         focus:border-emerald-brand focus:outline-none focus:ring-2
                         focus:ring-emerald-brand/20 text-sm shadow-sm transition-all"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400
                           hover:text-neutral-700 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal size={14}
                               className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-10 pr-5 py-3.5 bg-white rounded-2xl border border-beige-soft
                         focus:border-emerald-brand focus:outline-none shadow-sm
                         text-sm font-medium text-neutral-700 cursor-pointer appearance-none"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex flex-wrap gap-2.5 mb-7"
          role="group"
          aria-label="Category filter"
        >
          {CATEGORIES.map((c, i) => {
            const active = cat === c;
            return (
              <motion.button
                key={c}
                id={`filter-${c.toLowerCase()}`}
                initial={{ opacity: 0, scale: 0.78 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setCat(c)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold
                             border-2 transition-all duration-300
                             ${active
                               ? "bg-emerald-brand text-white border-emerald-brand shadow-lg"
                               : "bg-white text-neutral-600 border-beige-soft hover:border-emerald-brand/40 hover:text-emerald-brand hover:bg-emerald-brand/5"}`}
                style={active ? { boxShadow: "0 6px 20px rgba(0,143,90,0.35)" } : {}}
              >
                {active && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-emerald-brand -z-10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {c}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Result count */}
        <div id="products-grid-anchor"
             className="flex items-center justify-between mb-5">
          <p className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {cat !== "All" && (
              <>
                {" "}in{" "}
                <span className="text-emerald-brand font-semibold">{cat}</span>
              </>
            )}
            {q && (
              <>
                {" "}for{" "}
                <span className="text-emerald-brand font-semibold">"{q}"</span>
              </>
            )}
          </p>
          {(cat !== "All" || q) && (
            <button
              onClick={() => { setCat("All"); setQ(""); }}
              className="text-xs text-neutral-500 hover:text-emerald-brand transition-colors
                         flex items-center gap-1"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Product Grid ── */}
        {paginated.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-16 sm:p-24 text-center shadow-sm"
          >
            <div className="text-6xl mb-5">🌿</div>
            <h3 className="font-display font-bold text-2xl text-neutral-800 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500 text-sm max-w-xs mx-auto mb-6">
              Try a different category or search term.
            </p>
            <button
              onClick={() => { setCat("All"); setQ(""); }}
              className="bg-emerald-brand hover:bg-emerald-brand-dark text-white font-semibold
                         px-7 py-3 rounded-full text-sm transition-colors shadow-lg"
            >
              View All Products
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {paginated.map((p, i) => (
              <PremiumCard
                key={p.id}
                product={p}
                idx={i}
                onQuickView={setQvProd}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <motion.nav
            aria-label="Pagination"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <button
              id="pagination-prev"
              onClick={() => handlePage(Math.max(1, page - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="w-11 h-11 rounded-full bg-white border-2 border-beige-soft
                         flex items-center justify-center
                         hover:border-emerald-brand hover:text-emerald-brand
                         transition-all duration-200
                         disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                id={`pagination-page-${n}`}
                onClick={() => handlePage(n)}
                aria-current={page === n ? "page" : undefined}
                className={`w-11 h-11 rounded-full text-sm font-bold transition-all duration-200
                             ${page === n
                               ? "bg-emerald-brand text-white border-2 border-emerald-brand"
                               : "bg-white border-2 border-beige-soft hover:border-emerald-brand hover:text-emerald-brand"}`}
                style={page === n ? { boxShadow: "0 6px 20px rgba(0,143,90,0.35)" } : {}}
              >
                {n}
              </button>
            ))}

            <button
              id="pagination-next"
              onClick={() => handlePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
              className="w-11 h-11 rounded-full bg-white border-2 border-beige-soft
                         flex items-center justify-center
                         hover:border-emerald-brand hover:text-emerald-brand
                         transition-all duration-200
                         disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <ChevronRight size={17} />
            </button>
          </motion.nav>
        )}

        {/* ── Organic promise strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #006B43 0%, #008F5A 50%, #2BB07F 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                 backgroundSize: "40px 40px",
               }} />
          <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <Leaf size={18} className="text-white/80" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  Our Promise
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl mb-1">
                100% Pure &amp; Organic
              </h2>
              <p className="text-white/75 text-sm max-w-sm">
                Sourced directly from certified farmers in the Nimar belt —
                no chemicals, no shortcuts, just nature's best.
              </p>
            </div>
            <div className="flex gap-8 text-white text-center shrink-0">
              {[
                { v: "50+", l: "Farmers" },
                { v: "12+", l: "Products" },
                { v: "4.8★", l: "Avg Rating" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="font-display font-bold text-3xl">{v}</div>
                  <div className="text-white/70 text-xs mt-0.5">{l}</div>
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

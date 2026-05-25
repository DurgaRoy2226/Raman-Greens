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
  ChevronDown,
  ShieldCheck,
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
  // Fallback entries for any legacy product data still in DB
  Snacks:               { pill: "bg-orange-50  text-orange-700",   badge: "bg-orange-100  text-orange-700"  },
  Sweets:               { pill: "bg-pink-50    text-pink-700",     badge: "bg-pink-100    text-pink-700"    },
  Gifting:              { pill: "bg-purple-50  text-purple-700",   badge: "bg-purple-100  text-purple-700"  },
  Fruits:               { pill: "bg-amber-50   text-amber-700",    badge: "bg-amber-100   text-amber-700"   },
};

/* ─── Category image + label map for Premium Nav ────────────────────────────── */
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
}: {
  product: Product;
  idx: number;
}) {
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
                 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col"
    >
      {/* ── Image zone ── */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden bg-beige-warm"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button (permanently visible on top-right corner) */}
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

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-medium text-neutral-900 text-[15px] leading-snug
                         line-clamp-2 hover:text-emerald-brand transition-colors duration-200 mb-3">
            {product.name}
          </h3>
        </Link>

        {/* price row */}
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

          {/* Add to Cart Button (permanently visible at the bottom) */}
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
                  className="p-1.5 rounded-full hover:bg-beige-warm text-neutral-400
                             hover:text-neutral-700 transition-colors"
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

              {/* benefits */}
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
              {/* price */}
              <div className="flex items-baseline gap-2 mb-4 pt-3 border-t border-neutral-100">
                <span className="font-display font-bold text-2xl sm:text-3xl text-neutral-900">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
                )}
                <span className="text-xs sm:text-sm text-neutral-400 ml-1">/ {product.weight}</span>
              </div>

              {/* actions */}
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
                  className="inline-block text-xs text-emerald-brand hover:text-emerald-brand-dark
                             font-semibold transition-colors"
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
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: "#F5F0E8" }}>

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

        {/* ── Premium Logo Branding Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 md:p-8 mb-8 border border-beige-soft/60 shadow-sm relative overflow-hidden flex flex-col items-center text-center"
        >
          {/* Subtle decorative leaf background */}
          <div className="absolute inset-0 bg-leaf-pattern opacity-[0.03] pointer-events-none" />
          
          {/* Left Decorative Organic Image */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.08 }}
            className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 hidden md:block w-20 h-20 lg:w-24 lg:h-24 opacity-35 lg:opacity-60 select-none rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] overflow-hidden border border-emerald-brand-light/25 shadow-md shadow-emerald-brand/5 hover:opacity-95 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Premium Organic Herbal Powder"
              className="w-full h-full object-cover transform scale-110"
            />
          </motion.div>

          {/* Right Decorative Organic Image */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [0, -6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.08 }}
            className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden md:block w-20 h-20 lg:w-24 lg:h-24 opacity-35 lg:opacity-60 select-none rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] overflow-hidden border border-emerald-brand-light/25 shadow-md shadow-emerald-brand/5 hover:opacity-95 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Premium Organic Farming Seeds"
              className="w-full h-full object-cover transform scale-110"
            />
          </motion.div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo frame with organic soft shadow and background */}
            <div className="bg-beige-warm p-4 rounded-full shadow-inner border border-beige-soft/40 mb-4 hover:scale-105 transition-all duration-300">
              <img
                src="/images/logo.png"
                alt="Raman Greens Logo"
                className="h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
              />
            </div>
            
            <h2 className="font-display font-bold text-2xl md:text-3xl text-emerald-brand tracking-wide mb-1">
              Raman Greens
            </h2>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-emerald-brand-light/20" />
              <span className="text-[11px] font-bold text-emerald-brand-dark uppercase tracking-widest flex items-center gap-1">
                Fresh Organic Products
              </span>
              <span className="h-px w-6 bg-emerald-brand-light/20" />
            </div>
            
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
              Harvested with care from Nimar's fertile lands, bringing pure, unadulterated organic goodness straight to your home.
            </p>
            
            {/* Elegant Separator */}
            <div className="w-12 h-px bg-emerald-brand-light/20 my-4" />

            {/* Premium feature highlights */}
            <div className="flex flex-wrap justify-center items-center gap-y-2.5 gap-x-5 md:gap-x-7 w-full max-w-md">
              <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-300">
                <Leaf size={12} className="text-emerald-brand/80" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-neutral-600">100% Organic</span>
              </div>
              <span className="text-neutral-300 select-none">•</span>
              <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-300">
                <Sparkles size={12} className="text-emerald-brand/80" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-neutral-600">Freshly Harvested</span>
              </div>
              <span className="text-neutral-300 select-none">•</span>
              <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-300">
                <ShieldCheck size={12} className="text-emerald-brand/80" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-neutral-600">Chemical Free</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search + Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
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
                         hover:border-emerald-brand/40 focus:border-emerald-brand focus:outline-none focus:ring-2
                         focus:ring-emerald-brand/20 text-sm shadow-sm transition-all duration-300"
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
          <div className="relative min-w-[180px] w-full sm:w-auto">
            <SlidersHorizontal size={14}
                               className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 bg-white rounded-2xl border border-beige-soft
                         hover:border-emerald-brand/40 focus:border-emerald-brand focus:outline-none shadow-sm
                         text-sm font-medium text-neutral-700 cursor-pointer appearance-none transition-all duration-300"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Category Pills Slider */}
        <div className="w-full relative mb-10">
          {/* Fading edge indicators for horizontal scroll on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F0E8] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F0E8] to-transparent z-10 pointer-events-none md:hidden" />
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex gap-3 overflow-x-auto pb-4 pt-1 px-4 -mx-4 md:px-0 md:mx-0 no-scrollbar"
            role="group"
            aria-label="Category filter"
          >
            {CATEGORIES.map((c, i) => {
              const active = cat === c;
              const info = CAT_INFO[c] || {
                label: c,
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80"
              };
              
              return (
                <motion.button
                  key={c}
                  id={`filter-${c.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCat(c)}
                  className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl border cursor-pointer transition-all duration-300 shrink-0 shadow-sm
                    ${active 
                      ? "bg-emerald-brand text-white border-emerald-brand font-semibold" 
                      : "bg-white text-neutral-600 border-beige-soft/60 hover:border-emerald-brand/40 hover:text-emerald-brand"}`}
                  style={active ? { boxShadow: "0 6px 18px rgba(12,59,27,0.12)" } : {}}
                >
                  <div className={`w-8 h-8 rounded-full overflow-hidden border shrink-0 transition-all duration-300
                    ${active 
                      ? "border-white/80 scale-105" 
                      : "border-beige-soft/40"}`}
                  >
                    <img src={info.image} alt={info.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">{info.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Result count */}
        <div id="products-grid-anchor"
             className="flex items-center justify-between mb-6 border-b border-beige-soft/60 pb-3">
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
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-16 pb-2">
            <motion.nav
              aria-label="Pagination"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-2"
            >
              <button
                id="pagination-prev"
                onClick={() => handlePage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="group flex items-center justify-center gap-1.5 px-4 h-11 rounded-xl bg-white border border-beige-soft
                           text-xs font-semibold text-neutral-600 tracking-wide uppercase
                           hover:border-emerald-brand/40 hover:text-emerald-brand hover:bg-emerald-brand/[0.02]
                           active:scale-95 transition-all duration-300
                           disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-beige-soft disabled:active:scale-100"
              >
                <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">Prev</span>
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
                      className={`w-11 h-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-300
                                 ${active
                                   ? "bg-emerald-50 text-emerald-brand border border-emerald-brand/20 shadow-sm shadow-emerald-brand/5 font-extrabold"
                                   : "bg-white border border-beige-soft text-neutral-600 hover:border-emerald-brand/40 hover:text-emerald-brand hover:bg-emerald-brand/[0.02] hover:-translate-y-0.5"}`}
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
                className="group flex items-center justify-center gap-1.5 px-4 h-11 rounded-xl bg-white border border-beige-soft
                           text-xs font-semibold text-neutral-600 tracking-wide uppercase
                           hover:border-emerald-brand/40 hover:text-emerald-brand hover:bg-emerald-brand/[0.02]
                           active:scale-95 transition-all duration-300
                           disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-beige-soft disabled:active:scale-100"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.nav>
            <span className="text-xs text-neutral-400 font-medium">
              Page <span className="font-semibold text-neutral-600">{page}</span> of <span className="font-semibold text-neutral-600">{totalPages}</span>
            </span>
          </div>
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
            <div className="flex gap-6 sm:gap-10 justify-center text-white text-center flex-wrap sm:flex-nowrap">
              {[
                { v: "50+", l: "Farmers" },
                { v: "12+", l: "Products" },
                { v: "4.8★", l: "Avg Rating" },
              ].map(({ v, l }) => (
                <div 
                  key={l}
                  className="flex flex-col items-center px-4 py-2 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="font-display font-bold text-3xl sm:text-4xl">{v}</div>
                  <div className="text-white/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-1">{l}</div>
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

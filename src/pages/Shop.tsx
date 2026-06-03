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
  ChevronDown,
  LayoutGrid,
  List,
  Check,
  Copy,
  Tag,
  Headphones,
  Clock,
  TrendingUp,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../data/products";
import { useStore, type Order } from "../context/StoreContext";

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const PER_PAGE = 8;

/* ─── Star Rating helper ─────────────────────────────────────────────────────── */
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

/* ─── Main Shop Component ────────────────────────────────────────────────────── */
export function Shop() {
  const { state, dispatch } = useStore();
  const [params, setParams] = useSearchParams();
  const initCat = params.get("cat") || "All";
  const initQ   = params.get("q") || "";

  // Active dashboard view tab
  const [activeTab, setActiveTab] = useState("marketplace"); // marketplace, orders, wishlist, coupons, help

  // Catalog view style (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtering states
  const [cat, setCat] = useState<string>(initCat);
  const [q, setQ] = useState<string>(initQ);
  const [sort, setSort] = useState<string>("popular");
  const [page, setPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);

  // Quick filters states
  const [filterBestseller, setFilterBestseller] = useState(false);
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterTrending, setFilterTrending] = useState(false);
  const [filterNewArrivals, setFilterNewArrivals] = useState(false);

  // Collapsible accordion states in sidebar
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    weight: false,
    discount: false,
    availability: false,
    reviews: false,
  });

  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category from URL parameter
  useEffect(() => {
    const urlCat = params.get("cat");
    if (urlCat) {
      setCat(urlCat);
    }
  }, [params]);

  // Synchronize category to URL parameter
  useEffect(() => {
    const next: Record<string, string> = {};
    if (cat !== "All") next.cat = cat;
    if (q) next.q = q;
    setParams(next, { replace: true });
    setPage(1);
  }, [cat, q, setParams]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePage = (n: number) => {
    setPage(n);
    document.getElementById("products-catalog-header")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset filters
  const resetAll = () => {
    setCat("All");
    setQ("");
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedWeights([]);
    setMinDiscount(null);
    setSelectedAvailability([]);
    setMinRating(null);
    setFilterBestseller(false);
    setFilterOrganic(false);
    setFilterTrending(false);
    setFilterNewArrivals(false);
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
    filterBestseller ||
    filterOrganic ||
    filterTrending ||
    filterNewArrivals ||
    sort !== "popular";

  // Category mapping helper to actual products category & tags
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query keyword filter
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.tags.some((t) => t.includes(ql)) ||
          p.description.toLowerCase().includes(ql)
      );
    }

    // Category mapping
    if (cat !== "All") {
      if (cat === "Organic Powders") {
        list = list.filter((p) => p.tags.includes("powder") || p.name.toLowerCase().includes("powder"));
      } else if (cat === "Masale") {
        list = list.filter((p) => p.category === "Spices");
      } else if (cat === "Herbal Products") {
        list = list.filter((p) => p.category === "Herbs");
      } else if (cat === "Snacks") {
        list = list.filter((p) => p.category === "Snacks");
      } else if (cat === "Oils") {
        list = list.filter((p) => p.tags.includes("oil") || p.name.toLowerCase().includes("oil") || p.name.toLowerCase().includes("ghee"));
      } else if (cat === "Seeds") {
        list = list.filter((p) => p.category === "Seeds");
      } else if (cat === "Dry Fruits") {
        list = list.filter((p) => p.tags.includes("nuts") || p.tags.includes("dryfruit") || p.name.toLowerCase().includes("chikki") || p.name.toLowerCase().includes("makhana"));
      } else {
        list = list.filter((p) => p.category === cat);
      }
    }

    // Price range
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Weights
    if (selectedWeights.length > 0) {
      list = list.filter((p) => selectedWeights.includes(getWeightCategory(p.weight)));
    }

    // Discount
    if (minDiscount !== null) {
      list = list.filter((p) => {
        const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
        return discount >= minDiscount;
      });
    }

    // Availability
    if (selectedAvailability.length > 0) {
      list = list.filter((p) => {
        const inStock = p.stock > 0;
        if (selectedAvailability.includes("in-stock") && inStock) return true;
        if (selectedAvailability.includes("out-of-stock") && !inStock) return true;
        return false;
      });
    }

    // Min Rating
    if (minRating !== null) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Quick Filters
    if (filterBestseller) list = list.filter((p) => p.bestseller);
    if (filterOrganic) list = list.filter((p) => p.tags.includes("organic"));
    if (filterTrending) list = list.filter((p) => p.trending);
    if (filterNewArrivals) list = list.filter((p) => p.id === "p1" || p.id === "p2" || p.id === "p11" || p.id === "p10" || p.id === "p17"); // Simulate new arrivals

    // Sorting
    switch (sort) {
      case "price-low":  list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "newest":     list.sort((a, b) => b.id.localeCompare(a.id)); break;
      default:           list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }

    return list;
  }, [
    cat, q, sort, minPrice, maxPrice, selectedWeights, minDiscount,
    selectedAvailability, minRating, filterBestseller, filterOrganic,
    filterTrending, filterNewArrivals
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Copy Coupon Helper
  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  /* ── Sidebar collapsible section wrapper ── */
  const AccordionSection = ({
    id,
    title,
    icon: Icon,
    children,
  }: {
    id: string;
    title: string;
    icon?: any;
    children: React.ReactNode;
  }) => {
    const isOpen = openSections[id];
    return (
      <div className="border-b border-[#ebdcc0]/30 py-3 last:border-b-0">
        <button
          type="button"
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={14} className="text-emerald-800" />}
            <span className="text-xs font-bold text-neutral-800 tracking-wide">{title}</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-neutral-400 group-hover:text-emerald-700 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-800" : ""}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* ── Sidebar content (Dashboard + Filters combined) ── */
  const SidebarFilters = () => (
    <div className="flex flex-col gap-4 text-neutral-800">
      <style dangerouslySetInnerHTML={{__html: `
        .price-slider-input::-webkit-slider-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #15803d;
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
          background: #15803d;
          border: 2px solid #FFFFFF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .price-slider-input::-moz-range-thumb:hover {
          transform: scale(1.12);
        }
      `}} />

      {/* ── Dashboard Views Navigation Menu ── */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#ebdcc0] p-2.5 flex flex-col gap-0.5">
        <h4 className="text-[10px] font-extrabold tracking-widest text-[#8a7f6a] uppercase px-2 py-1 mb-1 border-b border-[#ebdcc0]/50">Shop Console</h4>
        {[
          { id: "marketplace", label: "Marketplace", icon: Sprout },
          { id: "orders",      label: "My Orders",   icon: Package },
          { id: "wishlist",    label: "My Wishlist", icon: Heart },
          { id: "coupons",     label: "Active Coupons", icon: Tag },
          { id: "help",        label: "Help & Support", icon: Headphones },
        ].map((tab) => {
          const active = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileFilterOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold transition-all cursor-pointer
                          ${active
                            ? "bg-emerald-800 text-white shadow-sm"
                            : "text-neutral-600 hover:bg-emerald-50 hover:text-emerald-800"}`}
            >
              <TabIcon size={14} className={active ? "text-emerald-300" : "text-neutral-400 group-hover:text-emerald-700"} />
              <span>{tab.label}</span>
              {tab.id === "wishlist" && state.wishlist.length > 0 && (
                <span className={`ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${active ? "bg-white text-emerald-850" : "bg-emerald-100 text-emerald-800"}`}>
                  {state.wishlist.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Filters Section (only active/visible on Marketplace tab) ── */}
      <div className={`${activeTab === "marketplace" ? "block" : "hidden"} flex flex-col gap-1`}>
        <div className="flex items-center justify-between pb-1 border-b border-[#ebdcc0]">
          <h4 className="text-[10px] font-extrabold tracking-widest text-[#8a7f6a] uppercase">Catalog Filters</h4>
          {hasFilters && (
            <button onClick={resetAll} className="text-[10px] font-extrabold text-emerald-800 hover:underline cursor-pointer">RESET</button>
          )}
        </div>

        {/* Categories List */}
        <AccordionSection id="categories" title="Categories" icon={Sprout}>
          <div className="flex flex-col gap-0.5">
            {[
              "All",
              "Organic Powders",
              "Masale",
              "Herbal Products",
              "Snacks",
              "Oils",
              "Seeds",
              "Dry Fruits",
            ].map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-between
                              ${active
                                ? "bg-emerald-50 text-emerald-800 font-bold"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-emerald-800"}`}
                >
                  <span>{c}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* Price Slider */}
        <AccordionSection id="price" title="Price Range" icon={SlidersHorizontal}>
          <div className="space-y-2.5 px-1 pt-1">
            <div className="flex justify-between text-[10px] font-extrabold text-neutral-500">
              <span>₹{minPrice}</span>
              <span className="text-emerald-800">₹{maxPrice}</span>
            </div>
            <div className="relative w-full h-1 bg-[#ebdcc0]/60 rounded-full my-2">
              <div
                className="absolute h-full rounded-full bg-emerald-700"
                style={{
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
            <div className="flex items-center gap-1">
              <div className="relative flex-1">
                <label className="absolute left-2.5 top-0.5 text-[6.5px] uppercase tracking-wider text-neutral-400 font-extrabold">Min</label>
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 50))}
                  className="w-full pl-2.5 pr-1.5 pt-3 pb-0.5 bg-[#FAF8F5] rounded-lg border border-neutral-200 text-xs font-bold text-neutral-800 focus:outline-none focus:border-emerald-700"
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
                  className="w-full pl-2.5 pr-1.5 pt-3 pb-0.5 bg-[#FAF8F5] rounded-lg border border-neutral-200 text-xs font-bold text-neutral-800 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* Weights */}
        <AccordionSection id="weight" title="Weight Pack" icon={Package}>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["100g", "250g", "500g", "1kg", "5kg"].map((w) => {
              const active = selectedWeights.includes(w);
              return (
                <button
                  key={w}
                  onClick={() => setSelectedWeights(active ? selectedWeights.filter((x) => x !== w) : [...selectedWeights, w])}
                  className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition cursor-pointer
                              ${active
                                ? "bg-emerald-800 border-emerald-800 text-white font-extrabold"
                                : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-700 hover:text-emerald-700"}`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* Discounts */}
        <AccordionSection id="discount" title="Minimum Discount" icon={Sparkles}>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[10, 20, 30, 40].map((pct) => {
              const active = minDiscount === pct;
              return (
                <button
                  key={pct}
                  onClick={() => setMinDiscount(active ? null : pct)}
                  className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition cursor-pointer
                              ${active
                                ? "bg-emerald-800 border-emerald-800 text-white font-extrabold"
                                : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-700 hover:text-emerald-700"}`}
                >
                  {pct}%+
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* Ratings */}
        <AccordionSection id="reviews" title="Customer Rating" icon={Star}>
          <div className="flex flex-col gap-0.5 pt-1">
            {[4, 3, 2].map((stars) => {
              const active = minRating === stars;
              return (
                <button
                  key={stars}
                  onClick={() => setMinRating(active ? null : stars)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs font-semibold
                              transition w-full group cursor-pointer border
                              ${active ? "bg-emerald-50 text-emerald-800 font-bold border-transparent" : "bg-transparent border-transparent text-neutral-600 hover:bg-neutral-50"}`}
                >
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                      {Array.from({ length: stars }).map((_, si) => (
                        <Star key={si} size={9} className="fill-amber-500 text-amber-500" />
                      ))}
                      {Array.from({ length: 5 - stars }).map((_, si) => (
                        <Star key={si} size={9} className="text-neutral-200 fill-neutral-200" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-semibold">&amp; up</span>
                  </div>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />}
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* Availability */}
        <AccordionSection id="availability" title="Availability" icon={Sun}>
          <div className="flex flex-wrap gap-1.5 pt-1">
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
                  className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition cursor-pointer
                              ${active
                                ? "bg-emerald-800 border-emerald-800 text-white font-extrabold"
                                : "bg-white border-neutral-200 text-neutral-600 hover:border-emerald-700 hover:text-emerald-700"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </AccordionSection>

      {/* Quick Filters switches */}
      <div className="mt-4 pt-3 border-t border-[#ebdcc0] space-y-2.5">
        <h5 className="text-[9px] font-extrabold tracking-widest text-[#8a7f6a] uppercase">Quick Filters</h5>
        {[
          { label: "Bestseller Status", state: filterBestseller, toggle: setFilterBestseller },
          { label: "Organic Certified", state: filterOrganic, toggle: setFilterOrganic },
          { label: "Trending Now",      state: filterTrending, toggle: setFilterTrending },
          { label: "New Arrivals",      state: filterNewArrivals, toggle: setFilterNewArrivals },
        ].map((qf, i) => (
          <label key={i} className="flex items-center justify-between cursor-pointer group text-xs font-semibold text-neutral-600">
            <span>{qf.label}</span>
            <input
              type="checkbox"
              checked={qf.state}
              onChange={() => qf.toggle(!qf.state)}
              className="sr-only peer"
            />
            <div className="w-7 h-4 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-700 relative" />
          </label>
        ))}
      </div>
    </div>
  </div>
  );

  /* ── 1. MARKETPLACE PRODUCT CARD ── */
  const ProductCardComponent = ({ product }: { product: Product }) => {
    const wished = state.wishlist.includes(product.id);
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    if (viewMode === "list") {
      // List Row Layout
      return (
        <motion.article
          layout
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="bg-[#faf9f6]/40 hover:bg-white rounded-2xl p-4 border border-[#ebdcc0]/40 hover:border-emerald-800/20 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch relative"
        >
          {/* Left: Image Box */}
          <Link to={`/product/${product.id}`} className="block relative w-full sm:w-44 shrink-0 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-neutral-50 shadow-inner">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            
            {/* Wishlist toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
              }}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer transition active:scale-95
                          ${wished ? "bg-emerald-800 text-white" : "bg-white/80 text-neutral-500 hover:text-emerald-800 hover:bg-white"}`}
            >
              <Heart size={12} className={wished ? "fill-white" : ""} />
            </button>
          </Link>

          {/* Middle: Details */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-800 block mb-1">{product.category} · {product.origin}</span>
              <Link to={`/product/${product.id}`} className="hover:text-emerald-850">
                <h3 className="font-serif font-bold text-neutral-900 text-base leading-snug line-clamp-1 mb-1">{product.name}</h3>
              </Link>
              <p className="text-xs text-neutral-500 font-light line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <StarRow rating={product.rating} />
                <span className="text-[10px] font-bold text-neutral-400">({product.reviews} reviews)</span>
              </div>
              <span className="bg-[#FAF8F5] border border-[#ebdcc0] px-2 py-0.5 rounded-md text-[9px] font-bold text-[#8a7f6a]">{product.weight}</span>
            </div>
          </div>

          {/* Right: Pricing Box */}
          <div className="w-full sm:w-44 shrink-0 flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 sm:border-l border-[#ebdcc0]/30 pt-4 sm:pt-0 sm:pl-5 mt-3 sm:mt-0">
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1.5 justify-start sm:justify-end">
                <span className="text-lg font-bold text-neutral-950">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
                )}
              </div>
              {discount > 0 && (
                <span className="inline-block bg-emerald-50 border border-emerald-100 text-[8px] font-extrabold text-emerald-800 px-2 py-0.5 rounded-full uppercase mt-0.5">
                  Save {discount}%
                </span>
              )}
            </div>

            <button
              onClick={() => dispatch({ type: "ADD_TO_CART", product })}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center gap-2"
            >
              <ShoppingCart size={13} />
              <span>Add To Cart</span>
            </button>
          </div>
        </motion.article>
      );
    }

    // Grid Layout (Standard visual organic card)
    return (
      <motion.article
        layout
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        className="group relative bg-white rounded-2xl overflow-hidden border border-[#ebdcc0]/40 hover:border-emerald-800/20 hover:shadow-[0_12px_24px_rgba(21,128,61,0.06)] transition-all duration-300 flex flex-col h-full w-full"
      >
        <Link to={`/product/${product.id}`} className="block relative w-full aspect-square overflow-hidden bg-[#FAF8F5]">
          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          
          {/* Overlay Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.bestseller && (
              <span className="bg-amber-500 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">Bestseller</span>
            )}
            {product.tags.includes("organic") && (
              <span className="bg-emerald-700 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">Certified Organic</span>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
            }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer transition active:scale-95 z-10
                        ${wished ? "bg-emerald-800 text-white" : "bg-white/80 text-neutral-500 hover:text-emerald-800 hover:bg-white"}`}
          >
            <Heart size={12} className={wished ? "fill-white" : ""} />
          </button>
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#8a7f6a] mb-1 block">
            {product.category} · {product.origin}
          </span>
          
          <Link to={`/product/${product.id}`} className="block mb-1.5">
            <h3 className="font-serif font-bold text-neutral-900 text-[13px] sm:text-[14px] leading-snug line-clamp-2 min-h-[38px] hover:text-emerald-850 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 mb-3">
            <StarRow rating={product.rating} />
            <span className="text-[9px] font-bold text-neutral-400">({product.reviews})</span>
          </div>

          <div className="mt-auto pt-3 border-t border-[#ebdcc0]/30 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-[15px] font-bold text-neutral-950">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-[10px] line-through text-neutral-400">₹{product.oldPrice}</span>
                )}
              </div>
              <span className="text-[9px] text-neutral-400 font-semibold block mt-0.5">{product.weight}</span>
            </div>

            <button
              onClick={() => dispatch({ type: "ADD_TO_CART", product })}
              className="w-8.5 h-8.5 bg-emerald-800 hover:bg-emerald-950 text-white rounded-full flex items-center justify-center shadow-sm cursor-pointer transition"
            >
              <ShoppingCart size={13} />
            </button>
          </div>
        </div>
      </motion.article>
    );
  };

  /* ── 2. VIEW: PRODUCT CATALOG (Marketplace Grid) ── */
  const renderMarketplace = () => (
    <>
      {/* Top Header Controls */}
      <div id="products-catalog-header" className="flex items-center justify-between pb-4 border-b border-[#ebdcc0]/40 flex-wrap gap-3">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8a7f6a]">Nimari Organics Store</span>
          <h2 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-0.5">Explore Our Produce</h2>
          <p className="text-[10px] text-neutral-500 mt-1 font-medium">
            Found <span className="font-extrabold text-neutral-800">{filtered.length}</span> organic items matching your filters.
          </p>
        </div>

        {/* View and Sorter Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Drawer trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#ebdcc0] bg-white text-emerald-800 text-xs font-bold transition hover:bg-[#FAF8F5] active:scale-95 cursor-pointer shadow-sm"
          >
            <SlidersHorizontal size={12} />
            <span>Filters</span>
          </button>

          {/* Grid/List toggles */}
          <div className="hidden sm:flex items-center bg-neutral-100 rounded-lg p-0.5 border border-[#ebdcc0]/20">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md cursor-pointer transition ${viewMode === "grid" ? "bg-white text-emerald-800 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md cursor-pointer transition ${viewMode === "list" ? "bg-white text-emerald-800 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>

          {/* Sort selection dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#FAF8F5] border border-[#ebdcc0] hover:border-emerald-800/40 rounded-xl px-3 py-2 text-xs font-bold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-800/10 cursor-pointer"
            >
              <option value="popular">Bestsellers First</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog items display */}
      <div className="flex-grow pt-5">
        {paginated.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAF8F5] rounded-3xl p-16 sm:p-20 text-center border border-[#ebdcc0]/40 shadow-inner flex flex-col items-center justify-center"
          >
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-display font-bold text-lg text-neutral-800 mb-1">No products found</h3>
            <p className="text-neutral-500 text-xs max-w-xs mx-auto mb-5 leading-relaxed">
              We couldn't find matches. Try broadening your range or clearing category filters.
            </p>
            <button
              onClick={resetAll}
              className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs uppercase px-6 py-3 rounded-full transition shadow-md cursor-pointer"
            >
              View All Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            initial="hidden"
            animate="show"
            className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5" : "flex flex-col gap-4"}
          >
            {paginated.map((p) => (
              <ProductCardComponent key={p.id} product={p} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Centered Pagination controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center w-full gap-2 mt-8 pt-6 border-t border-[#ebdcc0]/20 text-center shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 h-8.5 rounded-lg bg-[#FAF8F5] border border-[#ebdcc0] text-xs font-bold text-neutral-600 hover:border-emerald-800/40 hover:text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft size={13} />
              <span>Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const active = page === n;
              return (
                <button
                  key={n}
                  onClick={() => handlePage(n)}
                  className={`w-8.5 h-8.5 rounded-lg text-xs font-extrabold flex items-center justify-center border cursor-pointer
                             ${active
                               ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                               : "bg-[#FAF8F5] border-[#ebdcc0] text-neutral-600 hover:border-emerald-800/40 hover:text-emerald-800"}`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => handlePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 h-8.5 rounded-lg bg-[#FAF8F5] border border-[#ebdcc0] text-xs font-bold text-neutral-600 hover:border-emerald-800/40 hover:text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight size={13} />
            </button>
          </div>
          <span className="text-[9px] text-[#8a7f6a] font-extrabold uppercase tracking-wide">Page {page} of {totalPages}</span>
        </div>
      )}
    </>
  );

  /* ── 3. VIEW: MY ORDERS ── */
  const renderOrders = () => {
    // Merge actual context orders with a simulated history for complete visual fidelity
    type ExtendedOrder = Order & { carrier?: string };
    
    const defaultOrders: ExtendedOrder[] = [
      {
        id: "ORD-9824",
        date: "2026-06-01",
        total: 340,
        status: "Delivered",
        address: "12 Padava Road, Khandwa",
        carrier: "Delhivery",
        items: [
          { product: PRODUCTS[0], qty: 1 },
          { product: PRODUCTS[1], qty: 1 }
        ]
      },
      {
        id: "ORD-2849",
        date: "2026-06-03",
        total: 680,
        status: "Shipped",
        address: "12 Padava Road, Khandwa",
        carrier: "Express Post",
        items: [
          { product: PRODUCTS[6], qty: 1 }
        ]
      },
    ];
    
    const finalOrders: ExtendedOrder[] = state.orders.length > 0 
      ? [...state.orders.map(o => o as ExtendedOrder), ...defaultOrders] 
      : defaultOrders;

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8a7f6a]">Dashboard Console</span>
          <h2 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-0.5">Order History</h2>
          <p className="text-[10px] text-neutral-500 mt-1 font-medium">Track your fresh organic deliveries heading home.</p>
        </div>

        <div className="space-y-4">
          {finalOrders.map((order) => (
            <div key={order.id} className="bg-[#FAF8F5]/50 border border-[#ebdcc0] rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
              
              {/* Order Metadata */}
              <div className="flex items-center justify-between border-b border-[#ebdcc0]/50 pb-3 flex-wrap gap-2 text-xs font-semibold">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-neutral-800">Order ID: <b className="text-neutral-950 font-extrabold">{order.id}</b></span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-neutral-500">Date: {order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Total Paid:</span>
                  <span className="text-sm font-extrabold text-neutral-900">₹{order.total}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span className="text-neutral-850">{item.product.name}</span>
                      <span className="text-neutral-400">× {item.qty}</span>
                    </div>
                    <span className="text-neutral-900">₹{item.product.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Order Tracking Timeline */}
              <div className="pt-3 border-t border-[#ebdcc0]/30 mt-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] tracking-wide uppercase ${order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex-1 max-w-xs h-1.5 bg-neutral-200 rounded-full overflow-hidden relative hidden md:block">
                  <div className={`h-full bg-emerald-700 rounded-full ${order.status === "Delivered" ? "w-full" : "w-[60%] animate-pulse"}`} />
                </div>
                {order.carrier && (
                  <span className="text-[10px] font-bold text-neutral-400">Carrier: {order.carrier}</span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── 4. VIEW: MY WISHLIST ── */
  const renderWishlist = () => {
    const wishlistProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

    return (
      <div className="space-y-6 flex-grow flex flex-col">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8a7f6a]">Dashboard Console</span>
          <h2 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-0.5">My Wishlist</h2>
          <p className="text-[10px] text-neutral-500 mt-1 font-medium">Your saved items, ready for checkout.</p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-[#FAF8F5] rounded-3xl p-16 text-center border border-[#ebdcc0]/40 shadow-inner flex flex-col items-center justify-center flex-grow">
            <Heart size={44} className="text-neutral-300 mb-4" />
            <h3 className="font-display font-bold text-base text-neutral-800 mb-1">Your wishlist is empty</h3>
            <p className="text-neutral-500 text-xs max-w-xs mx-auto mb-5 leading-relaxed">
              Explore the marketplace and save your favorites to review them here.
            </p>
            <button
              onClick={() => setActiveTab("marketplace")}
              className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs uppercase px-6 py-3 rounded-full transition shadow-md cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistProducts.map((p) => (
              <ProductCardComponent key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ── 5. VIEW: ACTIVE COUPONS ── */
  const renderCoupons = () => (
    <div className="space-y-6">
      <div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8a7f6a]">Dashboard Console</span>
        <h2 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-0.5">Active Coupons</h2>
        <p className="text-[10px] text-neutral-500 mt-1 font-medium">Copy coupon codes to apply them on the checkout page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { code: "NIMAR10",    desc: "10% OFF on all organic snacks and powders", detail: "Min purchase ₹299 · For new users" },
          { code: "KHANDWA15",  desc: "15% OFF on Nimar special garlic chivda and ghee", detail: "Min purchase ₹499 · Festive offer" },
          { code: "FRESH20",    desc: "20% OFF on cold-pressed mustard & groundnut oils", detail: "Min purchase ₹799 · Limited period" },
        ].map((cp) => (
          <div key={cp.code} className="bg-[#FAF8F5]/80 border-2 border-dashed border-[#ebdcc0] rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-800/40 transition">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag size={14} className="text-emerald-800" />
                <span className="text-xs font-black text-emerald-800 tracking-wider uppercase">{cp.code}</span>
              </div>
              <p className="text-xs font-bold text-neutral-800 leading-snug mb-1">{cp.desc}</p>
              <p className="text-[10px] text-neutral-400 font-semibold">{cp.detail}</p>
            </div>
            
            <button
              onClick={() => copyCouponCode(cp.code)}
              className="w-full mt-5 py-2 rounded-xl bg-white border border-[#ebdcc0] hover:bg-emerald-50 text-xs font-extrabold uppercase transition cursor-pointer flex items-center justify-center gap-1.5 text-neutral-700 hover:text-emerald-800"
            >
              {copiedCoupon === cp.code ? (
                <>
                  <Check size={12} className="text-emerald-800" />
                  <span className="text-emerald-850">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── 6. VIEW: HELP & SUPPORT FORM ── */
  const renderHelp = () => (
    <div className="space-y-6 max-w-xl">
      <div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8a7f6a]">Dashboard Console</span>
        <h2 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-0.5">Help &amp; Support</h2>
        <p className="text-[10px] text-neutral-500 mt-1 font-medium">Have queries about shipping or organic certifications? Write to us.</p>
      </div>

      {supportSubmitted ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-50/20 border border-emerald-200/50 rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center mx-auto mb-3">
            <Check size={24} />
          </div>
          <h4 className="text-sm font-bold text-neutral-900 mb-1">Message Received!</h4>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-4">Our support executive from Khandwa will contact you within 24 hours.</p>
          <button
            onClick={() => setSupportSubmitted(false)}
            className="text-xs font-extrabold text-emerald-850 hover:underline cursor-pointer"
          >
            Submit another query
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSupportSubmitted(true);
          }}
          className="space-y-4 text-xs font-semibold text-neutral-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-500 mb-1">Name</label>
              <input required type="text" placeholder="Aarav Patil" className="w-full bg-[#FAF8F5] border border-[#ebdcc0] focus:border-emerald-700 focus:bg-white rounded-lg px-4 py-2.5 focus:outline-none" />
            </div>
            <div>
              <label className="block text-neutral-500 mb-1">Email</label>
              <input required type="email" placeholder="aarav@gmail.com" className="w-full bg-[#FAF8F5] border border-[#ebdcc0] focus:border-emerald-700 focus:bg-white rounded-lg px-4 py-2.5 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-neutral-500 mb-1">Subject</label>
            <input required type="text" placeholder="Certification query or Shipping delay" className="w-full bg-[#FAF8F5] border border-[#ebdcc0] focus:border-emerald-700 focus:bg-white rounded-lg px-4 py-2.5 focus:outline-none" />
          </div>
          <div>
            <label className="block text-neutral-500 mb-1">Message</label>
            <textarea required rows={4} placeholder="Detailed query here..." className="w-full bg-[#FAF8F5] border border-[#ebdcc0] focus:border-emerald-700 focus:bg-white rounded-lg px-4 py-2.5 focus:outline-none resize-none" />
          </div>
          
          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs uppercase px-8 py-3 rounded-full shadow-sm hover:shadow-md cursor-pointer transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col relative overflow-x-hidden">
      
      {/* ── Top Trust Banner Strip ── */}
      <section className="bg-emerald-900/10 border-b border-[#ebdcc0]/50 text-emerald-850 text-[10px] font-bold py-2.5 px-4 z-10 shrink-0">
        <div className="max-w-[1500px] mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="tracking-wide">🌱 Nimari Soils · 100% Certified Organic Farm Sourced Produce</span>
          <div className="flex items-center gap-5">
            <span>📞 Help Desk: +91 98765 43210</span>
            <span className="text-[#ebdcc0]">|</span>
            <span>📍 Sourced from Khandwa, MP</span>
          </div>
        </div>
      </section>

      {/* ── Main Dashboard Container ── */}
      <div className="flex-1 w-full max-w-[1550px] mx-auto px-4 py-6 flex flex-col lg:grid lg:grid-cols-[270px_1fr] gap-6 items-start">
        
        {/* Left fixed vertical sidebar (Dashboard Nav + Filters) */}
        <aside className="hidden lg:block w-full bg-white rounded-2xl border border-[#ebdcc0] shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-4 sticky top-24 self-start">
          <SidebarFilters />
        </aside>

        {/* Right Product View Dashboard Area */}
        <main className="w-full bg-white rounded-2xl border border-[#ebdcc0] shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-5 sm:p-6 flex flex-col min-h-[620px]">
          {activeTab === "marketplace" && renderMarketplace()}
          {activeTab === "orders"      && renderOrders()}
          {activeTab === "wishlist"    && renderWishlist()}
          {activeTab === "coupons"     && renderCoupons()}
          {activeTab === "help"        && renderHelp()}
        </main>

      </div>

      {/* ── Floating Mobile Filter Button ── */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-emerald-850 hover:bg-emerald-900 text-white shadow-xl px-5 py-3 rounded-full flex items-center gap-2 font-bold text-xs cursor-pointer transition border border-emerald-700/20"
      >
        <SlidersHorizontal size={13} />
        <span>Dashboard Console</span>
      </button>

      {/* ── Mobile Filter Drawer overlay ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] bg-white z-50 p-5 shadow-2xl flex flex-col h-full lg:hidden border-r border-[#ebdcc0]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcc0] mb-4 shrink-0">
                <h2 className="font-serif font-bold text-neutral-800 text-base">Dashboard Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                <SidebarFilters />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Bottom Section (Trust, Reviews, FAQ) ── */}
      <section className="bg-white border-t border-[#ebdcc0]/50 py-12 px-4 sm:px-6 lg:px-8 mt-10 shrink-0">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Trust Banner Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sprout, title: "100% Certified Organic", desc: "No chemical pesticides or fertilizers used." },
              { icon: Leaf,   title: "Artisanal & Traditional", desc: "Crafted in small batches by self-help groups." },
              { icon: Tag,    title: "Direct Sourcing", desc: "Fair trade directly from Nimar valley farmers." },
              { icon: Clock,  title: "Airtight Lock Packaging", desc: "Premium resealable zip bags for aroma preservation." },
            ].map((box, i) => {
              const BoxIcon = box.icon;
              return (
                <div key={i} className="flex gap-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#ebdcc0]/35 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                    <BoxIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-800 leading-snug">{box.title}</h4>
                    <p className="text-[10px] sm:text-xs text-neutral-500 font-medium leading-relaxed mt-1">{box.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Reviews Section */}
          <div className="py-2 border-t border-b border-[#ebdcc0]/35 pt-10 pb-10">
            <div className="text-center max-w-md mx-auto mb-8">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">Feedback</span>
              <h3 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-2">What Our Customers Say</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "Pooja Sharma", city: "Indore", comment: "The Nimari Masala Sev is incredibly authentic! It has the exact brick-red color and hot spice levels my grandmother makes." },
                { name: "Karan Johar", city: "Mumbai", comment: "Outstanding packaging. The zip lock works perfectly to keep the cold-pressed groundnut oil aroma intact." },
                { name: "Suresh Gupta", city: "Delhi", comment: "Pure organic A2 cow ghee. It has that beautiful granular texture and high aroma that you only get in traditional Bilona butter." },
              ].map((rv, i) => (
                <div key={i} className="bg-[#FAF8F5]/30 p-5 rounded-2xl border border-[#ebdcc0]/30 text-xs font-semibold text-neutral-600 flex flex-col justify-between">
                  <p className="italic leading-relaxed">"{rv.comment}"</p>
                  <div className="mt-4 pt-3 border-t border-[#ebdcc0]/20 flex items-center justify-between">
                    <span className="font-bold text-neutral-900">{rv.name}</span>
                    <span className="text-[10px] text-emerald-800 font-extrabold">{rv.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div>
            <div className="text-center max-w-md mx-auto mb-8">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">Answers</span>
              <h3 className="font-serif font-bold text-neutral-900 text-xl sm:text-2xl mt-2">Frequently Asked Questions</h3>
            </div>

            <div className="max-w-3xl mx-auto divide-y divide-[#ebdcc0]/40 border border-[#ebdcc0]/35 rounded-2xl bg-[#FAF8F5]/30 overflow-hidden">
              {[
                { q: "Where are the products manufactured?", a: "All our agricultural products and traditional snacks are prepared in Khandwa, Madhya Pradesh (Nimar Region). We source seeds, red chillies, and grains directly from partner farmers." },
                { q: "What is Bilona Desi Ghee?", a: "Bilona is the ancient Indian method of ghee extraction. We boil whole Gir cow milk, convert it to curd, and then bi-directionally churn it to get butter which is slow heated to produce ghee." },
                { q: "Is delivery available pan-India?", a: "Yes, we ship across India using leading express courier services. Shipping is free on all orders above ₹499." },
              ].map((faq, index) => {
                const [expanded, setExpanded] = useState(false);
                return (
                  <div key={index} className="py-3 px-5 transition duration-150">
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="w-full flex items-center justify-between py-2 text-left font-bold text-neutral-800 text-xs sm:text-sm cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={14} className={`text-neutral-400 transition-transform ${expanded ? "rotate-180 text-emerald-800" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden text-neutral-500 font-medium text-xs leading-relaxed pt-1 pb-2"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

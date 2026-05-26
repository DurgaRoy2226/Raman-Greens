import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Leaf,
  ChevronRight,
  Sparkles,
  MapPin,
  RotateCcw,
  Award,
  Zap,
  Check,
  Sprout,
  HelpCircle,
  Clock,
  Maximize2,
  Bookmark
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { state, dispatch } = useStore();

  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tab, setTab] = useState<"story" | "nutri" | "ship">("story");

  // Pincode and checkout states
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="font-display text-3xl font-bold text-neutral-800">Product not found</h2>
        <Link to="/shop" className="text-emerald-brand underline mt-4 inline-block font-medium">Back to shop</Link>
      </div>
    );
  }

  const isNimariSev = product.id === "p1";
  const isChivda = product.id === "p2";

  // Dynamic pricing based on sizes for Nimari Masala Sev
  const sizePrices = {
    "200g": { price: 99, oldPrice: 120, save: 21 },
    "400g": { price: 180, oldPrice: 220, save: 40 },
    "800g": { price: 340, oldPrice: 420, save: 80 },
    "1kg": { price: 420, oldPrice: 520, save: 100 },
  };

  // Dynamic pricing based on sizes for Khandwa Garlic Chivda
  const chivdaSizePrices = {
    "150g": { price: 75, oldPrice: 90, save: 15 },
    "350g": { price: 160, oldPrice: 200, save: 40 },
    "700g": { price: 300, oldPrice: 380, save: 80 },
    "1kg": { price: 400, oldPrice: 500, save: 100 },
  };

  const sizes = isNimariSev
    ? ["200g", "400g", "800g", "1kg"]
    : isChivda
      ? ["150g", "350g", "700g", "1kg"]
      : [product.weight || "400g"];

  const defaultSize = isNimariSev ? "400g" : isChivda ? "350g" : (product.weight || "400g");
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const currentPrice = isNimariSev
    ? sizePrices[selectedSize as keyof typeof sizePrices]?.price
    : isChivda
      ? chivdaSizePrices[selectedSize as keyof typeof chivdaSizePrices]?.price
      : product.price;

  const oldPrice = isNimariSev
    ? sizePrices[selectedSize as keyof typeof sizePrices]?.oldPrice
    : isChivda
      ? chivdaSizePrices[selectedSize as keyof typeof chivdaSizePrices]?.oldPrice
      : product.oldPrice;

  const savings = oldPrice && currentPrice ? oldPrice - currentPrice : 0;

  const wished = state.wishlist.includes(product.id);
  const recs = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  // Mouse move handler for premium cursor-origin tracking zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Pincode handler
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeError("");
      setPincodeChecked(true);
      const digits = parseInt(pincode.substring(0, 2));
      if (digits >= 45 && digits <= 49) {
        setDeliveryEstimate("Guaranteed local home delivery by tomorrow afternoon! (Nimar Region)");
      } else if (digits >= 11 && digits <= 30) {
        setDeliveryEstimate("Fast Delivery within 2 days (Metro Express)");
      } else {
        setDeliveryEstimate("Standard Safe Delivery in 3-5 Business Days");
      }
    } else {
      setPincodeError("Please enter a valid 6-digit PIN code.");
      setPincodeChecked(false);
    }
  };

  // Add to Cart handler with premium loader micro-animation
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      const finalProduct = {
        ...product,
        weight: selectedSize,
        price: currentPrice,
        oldPrice: oldPrice || undefined,
      };
      dispatch({ type: "ADD_TO_CART", product: finalProduct, qty });
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 600);
  };

  const handleBuyNow = () => {
    const finalProduct = {
      ...product,
      weight: selectedSize,
      price: currentPrice,
      oldPrice: oldPrice || undefined,
    };
    dispatch({ type: "ADD_TO_CART", product: finalProduct, qty });
    navigate("/checkout");
  };

  return (
    <div className="bg-nimar-gradient min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-2 text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
        <Link to="/" className="hover:text-emerald-brand-light transition-colors">Home</Link>
        <ChevronRight size={12} className="text-neutral-400" />
        <Link to="/shop" className="hover:text-emerald-brand-light transition-colors">Shop</Link>
        <ChevronRight size={12} className="text-neutral-400" />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-emerald-brand-light transition-colors">{product.category}</Link>
        <ChevronRight size={12} className="text-neutral-400" />
        <span className="text-emerald-brand font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Modern 3-Column Desktop Grid / Stacked Tablet & Mobile */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: LEFT SIDE - VERTICAL THUMBNAILS (Desktop Only, Hidden on Mobile/Tablet) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-3.5 sticky top-24 max-h-[500px] overflow-y-auto no-scrollbar">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onMouseEnter={() => setImgIdx(i)}
                onClick={() => setImgIdx(i)}
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:scale-105 ${
                  imgIdx === i
                    ? "border-emerald-brand-dark ring-2 ring-emerald-brand-light/30 scale-102"
                    : "border-beige-soft hover:border-emerald-brand-light/50 bg-white"
                }`}
              >
                <img src={g} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                {imgIdx === i && (
                  <div className="absolute inset-0 bg-emerald-brand-dark/5" />
                )}
              </button>
            ))}
          </div>

          {/* COLUMN 2: CENTER - LARGE MAIN PRODUCT DISPLAY (Col-span 6) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white rounded-[32px] p-4 sm:p-6 border border-beige-soft/60 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.06)] relative overflow-hidden">
              
              {/* Product Badges */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.bestseller && (
                  <span className="glass-dark text-emerald-brand text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                    <Sparkles size={11} className="text-emerald-brand-dark animate-pulse" /> Bestseller
                  </span>
                )}
                {product.trending && (
                  <span className="bg-amber-100/90 text-amber-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-200/50">
                    <Zap size={11} className="text-amber-600 fill-amber-600" /> Trending
                  </span>
                )}
              </div>

              {/* Main Image Viewport with Hover Zoom tracking */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group select-none bg-neutral-50 flex items-center justify-center border border-neutral-100"
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={product.gallery[imgIdx] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-100 ease-out origin-center"
                    style={{
                      transformOrigin: zoomed ? `${mousePos.x}% ${mousePos.y}%` : "center",
                      transform: zoomed ? "scale(2.2)" : "scale(1)",
                    }}
                  />
                </AnimatePresence>

                {/* Glassmorphic Zoom Indicator */}
                <div className="absolute bottom-4 right-4 bg-white/75 backdrop-blur-md border border-white/40 p-2.5 rounded-full shadow-md text-neutral-600 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* TABLET & MOBILE HORIZONTAL THUMBNAIL CAROUSEL */}
              <div className="mt-5 lg:hidden flex gap-3 overflow-x-auto no-scrollbar pb-1 pt-1 px-1">
                {product.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      imgIdx === i
                        ? "border-emerald-brand-dark ring-2 ring-emerald-brand-light/20"
                        : "border-beige-soft bg-white"
                    }`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: RIGHT SIDE - DETAILED SPECIFICATIONS & CHECKOUT BUYBOX (Col-span 5) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-2">
            {/* Header info */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 bg-emerald-brand/10 text-emerald-brand-dark px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                <Leaf size={11} /> {product.category}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200/50 px-2.5 py-1 rounded-lg">
                  <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                  <span className="text-sm font-bold text-neutral-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-neutral-400 font-semibold">•</span>
                <span className="text-sm text-neutral-500 font-medium hover:text-emerald-brand transition-colors cursor-pointer">
                  {product.reviews} customer reviews
                </span>
                <span className="text-xs text-neutral-400 font-semibold">•</span>
                <span className="text-xs text-emerald-brand-dark font-bold bg-emerald-brand/5 px-2 py-0.5 rounded">
                  100% Organic Verified
                </span>
              </div>
            </div>

            <hr className="border-beige-soft/60" />

            {/* Pricing Section */}
            <div className="space-y-1 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-beige-soft/40">
              <div className="flex items-baseline gap-3">
                <span className="font-sans font-extrabold text-4xl text-neutral-900">₹{currentPrice}</span>
                {oldPrice && (
                  <>
                    <span className="line-through text-neutral-400 font-medium text-lg">₹{oldPrice}</span>
                    <span className="bg-emerald-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Save ₹{savings}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-500 font-medium pt-0.5">
                Inclusive of all taxes · Net Weight: <span className="font-semibold text-neutral-800">{selectedSize}</span>
              </p>
            </div>

            {/* Sizes Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Select Packaging Size</label>
                <span className="text-xs text-emerald-brand-dark font-semibold">Price varies by size</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {sizes.map((sz) => {
                  const isActive = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        // Reset image index to show hero image on size shift for premium feel
                        setImgIdx(0);
                      }}
                      className={`relative py-3.5 px-1 text-center rounded-2xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm flex flex-col justify-center items-center shadow-sm overflow-hidden ${
                        isActive
                          ? "border-emerald-brand-dark bg-emerald-brand text-white shadow-emerald-brand/10 scale-102"
                          : "border-beige-soft bg-white hover:border-emerald-brand-light text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <span>{sz}</span>
                      {isNimariSev && (
                        <span className={`text-[9px] mt-0.5 font-medium ${isActive ? "text-emerald-brand-light" : "text-neutral-400"}`}>
                          ₹{sizePrices[sz as keyof typeof sizePrices]?.price}
                        </span>
                      )}
                      {isChivda && (
                        <span className={`text-[9px] mt-0.5 font-medium ${isActive ? "text-emerald-brand-light" : "text-neutral-400"}`}>
                          ₹{chivdaSizePrices[sz as keyof typeof chivdaSizePrices]?.price}
                        </span>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeSizeIndicator"
                          className="absolute bottom-0 inset-x-0 h-1 bg-emerald-brand-light"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description and Benefits */}
            <div className="space-y-3">
              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                {product.description} Seasoned with Khandwa's heirloom Nimar spices, stone-ground in micro-batches to lock in the true rustic Indian farm flavors.
              </p>
              
              <div className="flex flex-wrap gap-2.5 pt-1">
                {product.benefits.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] bg-white border border-beige-soft/80 text-neutral-700 px-3.5 py-2 rounded-full font-semibold flex items-center gap-1.5 shadow-sm hover:border-emerald-brand/30 transition-all duration-200"
                  >
                    <Sprout size={11} className="text-emerald-brand-dark" /> {b}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-beige-soft/60" />

            {/* Quantity Selector & Checkout Actions Buybox */}
            <div className="space-y-4 bg-white/70 backdrop-blur-md p-5 rounded-[24px] border border-beige-soft/50 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Quantity</span>
                <span className="text-xs font-semibold text-emerald-brand-dark">Only {product.stock} left in stock!</span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-beige-warm/80 border border-beige-soft/50 rounded-2xl p-1.5 shrink-0 shadow-inner">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl active:scale-95 transition-all text-neutral-700"
                    disabled={qty <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-bold text-neutral-800 text-sm select-none">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl active:scale-95 transition-all text-neutral-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart button - gradient pill with floating shadow */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-brand to-emerald-brand-dark hover:from-emerald-brand-dark hover:to-emerald-brand-light text-white font-bold py-4 rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-brand/20 disabled:opacity-85 text-sm sm:text-base cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : addedSuccess ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check size={18} className="text-white" /> Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={18} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Buy Now & Wishlist buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-white border-2 border-emerald-brand hover:bg-emerald-brand-dark hover:border-emerald-brand-dark text-emerald-brand hover:text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-98 text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Zap size={16} /> Buy Now
                </button>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
                  className={`w-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm hover:scale-102 ${
                    wished
                      ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                      : "bg-white border-beige-soft hover:border-red-300 text-neutral-400 hover:text-red-400"
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={18} fill={wished ? "currentColor" : "none"} className="transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Pincode & Delivery Section */}
            <div className="bg-white/40 p-5 rounded-2xl border border-beige-soft/50 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                <MapPin size={15} className="text-emerald-brand-dark" />
                <span>Delivery & Service Availability</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-3.5 pr-2 py-3 bg-white border-2 border-beige-soft/80 rounded-xl focus:border-emerald-brand-light focus:outline-none text-sm transition-all placeholder-neutral-400 font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-5 py-3 rounded-xl active:scale-95 transition-all text-xs tracking-wider uppercase cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeError && (
                <p className="text-xs text-red-500 font-bold flex items-center gap-1.5 pl-0.5">
                  • {pincodeError}
                </p>
              )}

              {pincodeChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-brand/5 border border-emerald-brand/10 p-3 rounded-xl space-y-1.5"
                >
                  <p className="text-xs text-emerald-brand-dark font-bold flex items-center gap-1.5">
                    <Check size={13} /> Serviceable at {pincode}
                  </p>
                  <p className="text-xs text-neutral-600 font-semibold pl-4.5 leading-relaxed">
                    {deliveryEstimate}
                  </p>
                </motion.div>
              )}

              {/* Delivery key info */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="flex items-center gap-2 text-neutral-600 font-semibold">
                  <Truck size={14} className="text-emerald-brand-dark" />
                  <span>Free Shipping (₹499+)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 font-semibold">
                  <RotateCcw size={14} className="text-emerald-brand-dark" />
                  <span>Easy 7-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info details (Story, Nutrition, Shipping) */}
        <section className="mt-12 bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-beige-soft/40 shadow-sm">
          <div className="border-b border-beige-soft/80">
            <div className="flex gap-8">
              {[
                { k: "story", l: "Story & Heritage" },
                { k: "nutri", l: "Nutritional Value" },
                { k: "ship", l: "Shipping Details" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as typeof tab)}
                  className={`pb-4 text-sm sm:text-base font-bold border-b-3 transition-all cursor-pointer ${
                    tab === t.k
                      ? "border-emerald-brand text-emerald-brand"
                      : "border-transparent text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-sm text-neutral-600 leading-relaxed font-sans min-h-[140px]">
            {tab === "story" && (
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  {product.id === "p1" ? (
                    <>
                      <p>
                        Our <strong>Nimari Masala Sev</strong> is more than just a crunchy tea-time snack. It is a tribute to the deep agrarian heritage of the Nimar region in Madhya Pradesh. Gram flour (besan) is freshly stone-ground and hand-kneaded by local women self-help collectives.
                      </p>
                      <p>
                        It is then seasoned with Nimar's legendary local red chillies, giving it a vibrant brick-red color and an aromatic fiery bite that the warm bylanes of Khandwa are famous for. Roasted in pure cold-pressed groundnut oil, it yields a zero-trans-fat snack that keeps you coming back for more.
                      </p>
                    </>
                  ) : product.id === "p2" ? (
                    <>
                      <p>
                        Our <strong>Khandwa Garlic Chivda</strong> is an authentic recipe crafted from the finest locally-grown rice flakes. Thin flattened rice is lightly roasted to a crunchy texture and tossed with crisp curry leaves, Nimar peanuts, and native garlic cloves.
                      </p>
                      <p>
                        Every bite delivers a clean, savoury aroma seasoned with stone-ground red chillies and local rock salt. It's a wholesome, light, and low-calorie evening accompaniment prepared without any synthetic flavor enhancers.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>{product.description}</p>
                      <p>
                        Grown organically in Nimar's nutrient-dense black cotton soils and hand-selected to ensure the highest standards of organic purity and premium taste.
                      </p>
                    </>
                  )}
                  <p className="text-xs font-semibold text-neutral-500 italic flex items-center gap-1.5 pt-1">
                    <Bookmark size={12} className="text-emerald-brand-dark" /> Made with love in Khandwa, Madhya Pradesh.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-beige-soft/50 shadow-md bg-beige-warm/30">
                    <img
                      src={product.gallery[2] || product.gallery[3] || product.image}
                      alt="Traditional organic farm ingredients"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {tab === "nutri" && (
              <div className="max-w-md bg-white border border-beige-soft/50 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-beige-warm/40 border-b border-beige-soft/50 text-left">
                      <th className="py-3 px-4 font-bold text-xs text-neutral-700 uppercase tracking-wider">Nutrient</th>
                      <th className="py-3 px-4 text-right font-bold text-xs text-neutral-700 uppercase tracking-wider">Value per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.nutrition.map((n) => (
                      <tr key={n.label} className="border-b border-beige-soft/30 hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-4 text-neutral-500 font-semibold">{n.label}</td>
                        <td className="py-3 px-4 font-bold text-neutral-800 text-right">{n.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "ship" && (
              <div className="space-y-3">
                <p className="font-semibold text-neutral-800">Fast Shipping & Safe Returns Policy:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>**Free standard shipping** on all orders above ₹499. Flat ₹40 delivery fee for smaller orders.</li>
                  <li>**Same-day dispatch** for all orders placed before 2:00 PM IST in the Nimar and Indore regions.</li>
                  <li>**Pan-India delivery** in 2–5 business days, fully tracked via our premium courier partners.</li>
                  <li>**7-Day Return Guarantee**: If a package is received with a broken seal or damaged condition, we will process an immediate free replacement or refund without questions.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* RELATED RECOMMENDATIONS SECTION */}
        <section className="mt-20">
          <div className="space-y-1.5 mb-8">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900">
              Recommended for You
            </h2>
            <p className="text-neutral-500 text-sm font-medium">
              More premium treats and organic essentials from our {product.category} collection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recs.map((p, i) => (
              <ProductCard key={p.id} product={p} idx={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


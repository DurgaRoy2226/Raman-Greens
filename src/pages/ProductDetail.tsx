import { useState, useRef, useEffect } from "react";
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

function HorizontalProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <div className="bg-white rounded-3xl border border-beige-soft/60 p-4 flex gap-4 hover:border-emerald-brand-light/30 hover:shadow-[0_12px_30px_rgba(12,59,27,0.06)] transition-all duration-300 min-w-[280px] sm:min-w-[320px] flex-1 shrink-0 snap-start">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-beige-warm/20 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-all duration-300" />
        {product.bestseller && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[7px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
            ★ Best
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <span className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-brand-light block mb-0.5">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`} className="hover:text-emerald-brand-light transition-colors">
            <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 truncate leading-tight">{product.name}</h4>
          </Link>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star size={10} className="fill-amber-500" />
              <span className="text-[10px] font-bold text-neutral-700 ml-0.5">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[9px] text-neutral-400 font-semibold">{product.weight}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-1">
            <span className="font-sans font-bold text-xs sm:text-sm text-neutral-950">₹{product.price}</span>
            {product.oldPrice && (
              <span className="line-through text-neutral-400 text-[9px]">₹{product.oldPrice}</span>
            )}
          </div>

          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
            className="w-7.5 h-7.5 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-emerald-brand/20 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const faqs = [
    {
      q: "Is it 100% Organic?",
      a: "Yes, we work directly with certified organic farmer cooperatives in the Nimar belt who use natural organic vermicompost and native pest-repellents instead of synthetic chemicals. Every batch is verified for quality and purity."
    },
    {
      q: "What is the shelf life of these products?",
      a: "Our traditional snacks have a shelf life of 3 months, while our spices and ghee have a shelf life of 12 months. Since we add zero artificial preservatives, we recommend storing them in airtight containers once opened."
    },
    {
      q: "How long does delivery take?",
      a: "Orders within the Nimar and Indore regions are delivered in 1-2 business days. For other states in India, standard delivery takes 3-5 business days. Free shipping applies to all orders above ₹499."
    },
    {
      q: "What are the storage instructions?",
      a: "Store in a cool, dry place away from direct sunlight. Keep packages tightly sealed. Our premium resealable zip pouches are specifically designed to lock in aroma and freshness."
    }
  ];

  // Filter for specific related products: p2 (Chivda), p11 (Makhana), p1 (Sev), p10 (Spice Box)
  const relatedProdIds = ["p2", "p11", "p1", "p10"];
  const relatedProducts = PRODUCTS.filter((p) => relatedProdIds.includes(p.id));

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

  const sizes = product.sizes && product.sizes.length > 0
    ? product.sizes.map((s) => s.size)
    : [product.weight || "400g"];

  const defaultSize = product.sizes && product.sizes.length > 0
    ? product.sizes[0].size
    : (product.weight || "400g");

  const [selectedSize, setSelectedSize] = useState(defaultSize);

  // Reset selected size when product changes
  useEffect(() => {
    setSelectedSize(defaultSize);
    setImgIdx(0);
    setQty(1);
  }, [id, defaultSize]);

  const sizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const currentPrice = sizeObj ? sizeObj.price : product.price;
  const oldPrice = sizeObj ? sizeObj.oldPrice : product.oldPrice;
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
          
          {/* COLUMN 1: LEFT SIDE - VERTICAL THUMBNAILS (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-3.5 sticky top-24 max-h-[500px] overflow-y-auto no-scrollbar">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onMouseEnter={() => setImgIdx(i)}
                onClick={() => setImgIdx(i)}
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:scale-105 ${
                  imgIdx === i
                    ? "border-emerald-brand-dark ring-2 ring-emerald-brand-light/30 scale-102"
                    : "border-beige-soft bg-white hover:border-emerald-brand-light/50"
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
                  <span className="bg-[#006B43] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1 border border-emerald-brand-light/20 shadow-md">
                    ★ BESTSELLER
                  </span>
                )}
                {product.trending && (
                  <span className="bg-[#FAF8F5] text-[#006B43] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1 border border-beige-soft shadow-md font-sans">
                    ★ TRENDING
                  </span>
                )}
              </div>

              {/* Bookmark Button */}
              <button className="absolute top-6 right-6 bg-white p-2.5 rounded-full shadow-md text-neutral-600 hover:text-emerald-brand hover:scale-105 transition-all cursor-pointer border border-beige-soft/40 z-10">
                <Bookmark size={15} />
              </button>

              {/* Main Image Viewport with Hover Zoom tracking */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group select-none bg-neutral-50 flex items-center justify-center border border-neutral-100 shadow-sm"
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
                <div className="absolute bottom-4 right-4 bg-white/75 backdrop-blur-md border border-white/40 p-2.5 rounded-full shadow-md text-neutral-650 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
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
              <span className="inline-flex items-center gap-1.5 bg-emerald-brand/5 border border-emerald-brand-light/10 text-emerald-brand-dark px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                <Leaf size={11} className="text-emerald-brand-light" /> {product.category}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-0.5 bg-amber-500 text-white px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-sm">
                  <Star size={11} className="fill-white text-white mr-0.5" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-neutral-400 font-semibold">•</span>
                <span className="text-sm text-neutral-500 font-medium hover:text-emerald-brand transition-colors cursor-pointer">
                  {product.reviews} customer reviews
                </span>
                <span className="text-xs text-neutral-400 font-semibold">•</span>
                <span className="text-xs text-emerald-brand-dark font-extrabold bg-emerald-brand/5 px-2.5 py-1 rounded-md border border-emerald-brand/10 flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={12} className="text-emerald-brand-light fill-emerald-brand-light/10" /> 100% Organic Verified
                </span>
              </div>
            </div>

            <hr className="border-beige-soft/60" />

            {/* Pricing Section */}
            <div className="bg-white p-5 rounded-3xl border border-beige-soft/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-sans font-extrabold text-4xl text-neutral-900">₹{currentPrice}</span>
                {oldPrice && (
                  <>
                    <span className="line-through text-neutral-400 font-medium text-lg">₹{oldPrice}</span>
                    <span className="bg-[#0c3b1b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Save ₹{savings}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                Inclusive of all taxes · Net Weight: <span className="font-semibold text-neutral-850">{selectedSize}</span>
              </p>
            </div>

            {/* Sizes Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Select Packaging Size</label>
                <span className="text-xs text-emerald-brand-light font-bold">Price varies by size</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {sizes.map((sz) => {
                  const isActive = selectedSize === sz;
                  const sizeObj = product.sizes?.find((s) => s.size === sz);
                  const sizePrice = sizeObj ? sizeObj.price : product.price;
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        setImgIdx(0);
                      }}
                      className={`relative py-3.5 px-1 text-center rounded-2xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm flex flex-col justify-center items-center shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${
                        isActive
                          ? "border-emerald-brand bg-[#0c3b1b] text-white scale-102"
                          : "border-beige-soft bg-white hover:border-emerald-brand-light text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="tracking-wide">{sz}</span>
                      <span className={`text-[9px] mt-0.5 font-medium ${isActive ? "text-emerald-brand-light" : "text-neutral-400"}`}>
                        ₹{sizePrice}
                      </span>
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
              <p className="text-neutral-700 text-sm leading-relaxed font-sans pb-1">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-2.5 pt-0.5">
                {product.benefits.map((b) => (
                  <span
                    key={b}
                    className="text-xs bg-white border border-beige-soft text-neutral-700 px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:border-emerald-brand-light/50 cursor-default"
                  >
                    <Check size={11} className="text-emerald-brand-light font-bold" /> {b}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-beige-soft/60" />

            {/* Quantity Selector & Checkout Actions Buybox */}
            <div className="space-y-4 bg-white p-5 rounded-[20px] border border-beige-soft/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Quantity</span>
                <span className="text-xs font-bold text-emerald-brand-dark">Only {product.stock} items left in stock!</span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-[#FAF8F5] border border-beige-soft/60 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg active:scale-95 transition-all text-neutral-700 cursor-pointer disabled:opacity-50"
                    disabled={qty <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-bold text-neutral-800 text-sm select-none">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg active:scale-95 transition-all text-neutral-700 cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart button - solid green */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 relative overflow-hidden bg-[#0c3b1b] hover:bg-[#06240f] text-white font-bold py-4 rounded-xl active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-85 text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
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
                        <Check size={16} className="text-white" /> Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={15} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Buy Now & Wishlist buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-white hover:bg-neutral-50 text-[#0c3b1b] border border-[#0c3b1b]/80 font-bold py-4 rounded-xl active:scale-98 transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer font-sans"
                >
                  <Zap size={14} className="fill-current" /> Buy Now
                </button>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
                  className={`w-14 rounded-xl border border-beige-soft/60 bg-white flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm cursor-pointer hover:border-red-300 ${
                    wished ? "text-red-500 hover:bg-red-50/50" : "text-neutral-400 hover:text-red-400"
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={16} fill={wished ? "currentColor" : "none"} className="transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Pincode & Delivery Section Card */}
            <div className="bg-white p-5 rounded-[20px] border border-beige-soft/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                <MapPin size={15} className="text-emerald-brand-light" />
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
                    className="w-full pl-3.5 pr-2 py-3 bg-white border border-beige-soft/80 rounded-xl focus:border-emerald-brand-light focus:outline-none text-xs transition-all placeholder-neutral-400 font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-900 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all text-xs tracking-wider uppercase cursor-pointer"
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
              <div className="grid grid-cols-2 gap-3 text-xs pt-1.5 border-t border-neutral-100/60">
                <div className="flex items-center gap-2 text-neutral-600 font-semibold">
                  <Truck size={14} className="text-emerald-brand-light" />
                  <span>Free Shipping (₹499+)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 font-semibold">
                  <RotateCcw size={14} className="text-emerald-brand-light" />
                  <span>Easy 7-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Story & Heritage Section ─── */}
        <section className="mt-12 bg-white rounded-[24px] border border-beige-soft/60 p-6 sm:p-8 shadow-[0_12px_40px_rgba(12,59,27,0.03)]">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Story, Sourcing, Ingredients, Traditional process (Col-span 8) */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div className="flex border-b border-neutral-100 pb-3 gap-6">
                <button
                  onClick={() => setTab("story")}
                  className={`font-display text-sm font-bold pb-2 transition-all border-b-2 -mb-[14px] cursor-pointer ${
                    tab === "story"
                      ? "border-emerald-brand text-emerald-brand-dark"
                      : "border-transparent text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Story & Heritage
                </button>
                <button
                  onClick={() => setTab("nutri")}
                  className={`font-display text-sm font-bold pb-2 transition-all border-b-2 -mb-[14px] cursor-pointer ${
                    tab === "nutri"
                      ? "border-emerald-brand text-emerald-brand-dark"
                      : "border-transparent text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Nutritional Value
                </button>
                <button
                  onClick={() => setTab("ship")}
                  className={`font-display text-sm font-bold pb-2 transition-all border-b-2 -mb-[14px] cursor-pointer ${
                    tab === "ship"
                      ? "border-emerald-brand text-emerald-brand-dark"
                      : "border-transparent text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Shipping Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-grow pt-4">
                {tab === "story" && (
                  <div className="space-y-5">
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                      {product.story || product.description}
                    </p>
                    
                    {/* Hand Sourced Details Card */}
                    <div className="bg-[#FAF8F5] border border-beige-soft/60 p-4 rounded-xl flex items-start gap-3">
                      <Sprout size={16} className="text-emerald-brand-light mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-brand-light block mb-0.5">Hand Sourced Details</span>
                        <p className="text-xs text-neutral-600 font-semibold leading-relaxed">Sourced from the sun-drenched fields of the Narmada basin where grain is grown organic, regenerative crop rotation.</p>
                      </div>
                    </div>

                    {/* Ingredients Showcase Tags */}
                    {product.ingredients && product.ingredients.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-405 block">Ingredients Showcase</span>
                        <div className="flex flex-wrap gap-2">
                          {product.ingredients.map((ing) => (
                            <span key={ing} className="bg-beige-warm/30 border border-beige-soft/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {tab === "nutri" && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 text-xs sm:text-sm font-sans leading-relaxed font-medium">
                      Pure organic ingredients mean cleaner nutrition. Here is the breakdown per 100g serving:
                    </p>
                    {product.nutrition && product.nutrition.length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs font-semibold text-neutral-500 max-w-md">
                        {product.nutrition.map((nut) => (
                          <div key={nut.label} className="flex justify-between py-1.5 border-b border-neutral-50 pr-2">
                            <span className="text-neutral-400 font-medium">{nut.label}</span>
                            <span className="text-neutral-800 font-bold">{nut.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-400 italic">Nutritional details available on request.</p>
                    )}
                  </div>
                )}

                {tab === "ship" && (
                  <div className="space-y-4">
                    <p className="text-neutral-600 text-xs sm:text-sm font-sans leading-relaxed font-medium">
                      We deliver with utmost care to ensure the freshness of your organic food remains intact.
                    </p>
                    <div className="space-y-2.5 text-xs font-semibold text-neutral-600 max-w-md">
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-emerald-brand-light" />
                        <span>Free Shipping on all orders above ₹499.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-emerald-brand-light" />
                        <span>Standard delivery takes 3-5 business days. Express local delivery in 24 hours.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw size={14} className="text-emerald-brand-light" />
                        <span>Easy 7-day return policy for unopened items.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-brand-light" />
                        <span>100% eco-friendly, biodegradable, and vacuum-sealed food-grade packaging.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer text */}
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-extrabold uppercase tracking-wide pt-4 border-t border-neutral-100">
                <Leaf size={11} className="text-emerald-brand-light" />
                <span>Made with love in Khandwa, Madhya Pradesh.</span>
              </div>
            </div>

            {/* Right Side: Serving Suggestion Image (Col-span 4) */}
            <div className="lg:col-span-4 rounded-[20px] overflow-hidden border border-beige-soft/60 shadow-sm relative bg-beige-warm/20 min-h-[280px]">
              <img
                src={product.gallery[4] || product.gallery[1] || product.image}
                alt="Organic serving suggestion"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ─── Row 4: You May Also Like & Customer Reviews ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* You May Also Like Slider (Col-span 5) */}
          <div className="lg:col-span-5 bg-white rounded-[24px] border border-beige-soft/60 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-extrabold text-lg text-neutral-900">
                You May Also Like
              </h2>
              
              {/* Carousel Nav Buttons */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-8 h-8 rounded-full bg-white border border-beige-soft shadow-sm hover:border-emerald-brand hover:text-emerald-brand flex items-center justify-center transition-all cursor-pointer active:scale-90 text-neutral-500"
                  aria-label="Scroll left"
                >
                  <ChevronRight size={14} className="rotate-180" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-8 h-8 rounded-full bg-white border border-beige-soft shadow-sm hover:border-emerald-brand hover:text-emerald-brand flex items-center justify-center transition-all cursor-pointer active:scale-90 text-neutral-500"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Carousel Scroll Container */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pt-1 px-1 flex-grow items-stretch animate-fade-in"
            >
              {relatedProducts.map((p) => (
                <div key={p.id} className="w-[180px] sm:w-[200px] shrink-0 snap-start flex flex-col">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews (Col-span 7) */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-beige-soft/60 p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-extrabold text-lg text-neutral-950">Customer Reviews</h3>
              <span className="text-xs font-bold text-emerald-brand-light hover:underline flex items-center gap-0.5 cursor-pointer">
                View all reviews <ChevronRight size={12} />
              </span>
            </div>

            {/* Reviews Grid Layout: Rating Summary + Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-grow">
              {/* Rating Summary (Col-span 4) */}
              <div className="md:col-span-4 bg-beige-warm/15 border border-beige-soft/40 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-black text-neutral-900">{product.rating.toFixed(1)}</span>
                    <span className="text-xs font-extrabold text-neutral-400">/ 5.0</span>
                  </div>
                  
                  <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-neutral-200"} />
                    ))}
                  </div>
                  
                  <p className="text-[10px] text-neutral-400 font-semibold mt-1 leading-normal">
                    Based on {product.reviews} customer reviews.
                  </p>
                </div>
                
                {/* Star Distribution bars */}
                <div className="space-y-1.5 mt-4 pt-3 border-t border-neutral-100/50">
                  {[
                    { star: 5, pct: 85 },
                    { star: 4, pct: 10 },
                    { star: 3, pct: 3 },
                    { star: 2, pct: 1 },
                    { star: 1, pct: 1 },
                  ].map((item) => (
                    <div key={item.star} className="flex items-center gap-2 text-[9px] font-semibold text-neutral-500">
                      <span className="w-2.5 text-right">{item.star}</span>
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-brand rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="w-6 text-right text-neutral-400">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards (Col-span 8) */}
              <div className="md:col-span-8 grid grid-cols-3 gap-3">
                {[
                  {
                    name: "Priya Sharma",
                    text: "Best sev I have ever tried! Perfect crunch and authentic taste.",
                    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=120&h=120&q=80"
                  },
                  {
                    name: "Rahul Verma",
                    text: "Love the traditional taste and freshness. Will definitely order again!",
                    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&h=120&q=80"
                  },
                  {
                    name: "Neha Joshi",
                    text: "Very crispy and flavourful. My family loved it!",
                    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&h=120&q=80"
                  }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-white border border-beige-soft/50 rounded-2xl p-3 shadow-xs flex flex-col justify-between text-left">
                    <div>
                      {/* User Header */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-850 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {rev.name[0]}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-[10px] text-neutral-805 truncate leading-none mb-0.5">{rev.name}</h4>
                          <span className="text-[7px] text-emerald-brand-light font-extrabold uppercase tracking-wide flex items-center gap-0.5">
                            Verified Buyer
                          </span>
                        </div>
                      </div>
                      
                      {/* Star rating */}
                      <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={8} className="fill-amber-500" />
                        ))}
                      </div>
                      
                      <p className="text-[9px] text-neutral-600 leading-normal line-clamp-4 font-medium font-sans">{rev.text}</p>
                    </div>

                    {/* Customer Product Photo */}
                    <div className="mt-2.5 h-10 w-full rounded-lg overflow-hidden border border-beige-soft/40 shadow-inner bg-neutral-50 shrink-0">
                      <img src={rev.img} alt="Review attachment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Row 5: From Our Farms & Frequently Asked Questions ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* Left: From Our Farms to Your Home (Col-span 6) */}
          <div className="lg:col-span-6 bg-white rounded-[24px] border border-beige-soft/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-lg text-neutral-900 mb-4">
                From Our Farms to Your Home
              </h2>

              <div className="grid sm:grid-cols-12 gap-4 items-center">
                {/* Left Side: Farmer Image */}
                <div className="sm:col-span-5 h-40 rounded-xl overflow-hidden border border-beige-soft/50 shadow-inner bg-neutral-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80"
                    alt="Farmer in the field"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-extrabold text-emerald-brand-dark border border-beige-soft/40">
                    LOCAL PRODUCER
                  </div>
                </div>

                {/* Right Side: Farming Story & Checklist */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-center gap-1 text-emerald-brand-dark font-extrabold text-xs">
                    <Sprout size={14} className="text-emerald-brand-light" />
                    <span>Proudly Made in Nimar Region</span>
                  </div>

                  <p className="text-neutral-600 text-[11px] sm:text-xs leading-relaxed font-sans font-medium">
                    Our {product.name} is crafted using traditional methods passed down through generations. We work directly with local farmers and artisans to bring you authentic, clean and honest food.
                  </p>

                  {/* Checklist */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1 text-[9px] font-extrabold text-neutral-700 uppercase tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-brand-light font-bold" />
                      <span>Locally Sourced</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-brand-light font-bold" />
                      <span>Handcrafted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-brand-light font-bold" />
                      <span>Small Batch</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-brand-light font-bold" />
                      <span>Local Farmers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Frequently Asked Questions (Col-span 6) */}
          <div className="lg:col-span-6 bg-white rounded-[24px] border border-beige-soft/60 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-lg text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = !!faqOpen[idx];
                  return (
                    <div key={idx} className="border border-neutral-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setFaqOpen({ ...faqOpen, [idx]: !isOpen })}
                        className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-neutral-800 text-xs hover:bg-neutral-50/50 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight size={12} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-90 text-emerald-brand" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3.5 text-neutral-600 text-xs leading-relaxed font-sans border-t border-neutral-50 pt-2 bg-neutral-50/10">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


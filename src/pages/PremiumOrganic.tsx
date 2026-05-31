import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Check,
  ChevronDown,
  Leaf,
  ShoppingBag,
  Sprout,
  ShieldCheck,
  Maximize2,
  Droplet,
  Globe,
  Award,
  ArrowRight
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";

export function PremiumOrganic() {
  const { state, dispatch } = useStore();

  // Find Matcha as the main product
  const matchaProduct = PRODUCTS.find((p) => p.id === "p30") || PRODUCTS[0];
  
  // State for gallery
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // State for weight selector
  const [selectedWeight, setSelectedWeight] = useState("100g");

  // State for active size price calculation
  const selectedSizeObj = matchaProduct.sizes?.find((s) => s.size === selectedWeight) || { price: 1499, oldPrice: 1899 };
  const currentPrice = selectedSizeObj.price;
  const oldPrice = selectedSizeObj.oldPrice;
  const savings = oldPrice ? oldPrice - currentPrice : 0;

  // Add to cart feedback state
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Accordion active states
  const [openAccordion, setOpenAccordion] = useState<string | null>("brewing");

  // Filter the grid products (Avocado oil, Himalayan salt, Golden latte, Ceremonial Matcha)
  const gridProductIds = ["p30", "p31", "p32", "p33"];
  const gridProducts = PRODUCTS.filter((p) => gridProductIds.includes(p.id));

  // Wishlist check for main product
  const isMatchaWished = state.wishlist.includes(matchaProduct.id);

  // Mouse move handler for premium cursor-origin tracking zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      const finalProduct = {
        ...matchaProduct,
        weight: selectedWeight,
        price: currentPrice,
        oldPrice: oldPrice || undefined,
      };
      dispatch({ type: "ADD_TO_CART", product: finalProduct, qty: 1 });
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 600);
  };

  const toggleWishlist = (id: string) => {
    dispatch({ type: "TOGGLE_WISHLIST", id });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 font-sans selection:bg-[#0c3b1b]/10 selection:text-[#0c3b1b] pb-24">
      {/* Premium Hero Intro Banner */}
      <section className="relative pt-12 pb-8 px-4 max-w-7xl mx-auto text-center border-b border-[#E8E1D9]/40">
        <span className="inline-flex items-center gap-1.5 bg-[#0c3b1b]/5 border border-[#0c3b1b]/10 text-[#0c3b1b] px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
          <Award size={11} className="text-[#2BB07F]" /> Reserve Collection
        </span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-[#0c3b1b] tracking-tight leading-tight max-w-4xl mx-auto">
          The Organic Luxe Series
        </h1>
        <p className="text-sm text-neutral-500 font-light max-w-xl mx-auto mt-4 leading-relaxed">
          A curatorial collection of single-origin organics, uncompromised in quality, aesthetics, and sustainability. Pure products from the Earth, for premium well-being.
        </p>
      </section>

      {/* Main Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Gallery & Main Image Viewport (Col-span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-[32px] p-5 sm:p-6 border border-[#E8E1D9]/60 shadow-[0_16px_40px_-18px_rgba(12,59,27,0.06)] relative overflow-hidden">
              
              {/* Single Origin Seal badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-[#FAF8F5] text-[#0c3b1b] text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#E8E1D9] flex items-center gap-1 shadow-sm font-sans">
                  <Sprout size={11} className="text-[#2BB07F]" /> Single Origin
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(matchaProduct.id)}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-md z-10 transition-all duration-300 active:scale-95 border border-[#E8E1D9]/30
                  ${isMatchaWished ? "bg-red-500 text-white hover:bg-red-650" : "bg-white text-neutral-400 hover:text-red-500 hover:scale-105"}`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={16} fill={isMatchaWished ? "currentColor" : "none"} />
              </button>

              {/* Main Image Viewport with Hover Zoom tracking */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group select-none bg-[#FAF8F5] flex items-center justify-center border border-neutral-100"
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImgIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={matchaProduct.gallery[activeImgIdx]}
                    alt={matchaProduct.name}
                    className="w-full h-full object-cover origin-center"
                    style={{
                      transformOrigin: zoomed ? `${mousePos.x}% ${mousePos.y}%` : "center",
                      transform: zoomed ? "scale(2.2)" : "scale(1)",
                      transition: zoomed ? "transform 0.05s ease-out" : "transform 0.4s ease-out",
                    }}
                  />
                </AnimatePresence>

                {/* Decorative Organic Emblem bottom-left */}
                <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl text-[#0c3b1b] flex items-center gap-1.5 pointer-events-none opacity-80 shadow-sm">
                  <Leaf size={12} className="text-[#2BB07F] fill-[#2BB07F]/20" />
                  <span className="text-[9px] font-extrabold tracking-wider uppercase">100% Ceremonial</span>
                </div>

                {/* Glassmorphic Zoom Indicator */}
                <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md border border-white/40 p-2.5 rounded-full shadow-md text-neutral-600 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Maximize2 size={15} />
                </div>
              </div>

              {/* Thumbnail Gallery Row */}
              <div className="mt-5 flex gap-3.5 justify-center">
                {matchaProduct.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm
                      ${activeImgIdx === i
                        ? "border-[#0c3b1b] ring-2 ring-[#2BB07F]/20 scale-102"
                        : "border-[#E8E1D9] bg-white opacity-85 hover:opacity-100"}`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Purchase UI (Col-span 6) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            
            {/* Category & Title */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2BB07F] block">
                {matchaProduct.category} · {matchaProduct.origin}
              </span>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#0c3b1b] tracking-tight leading-tight">
                {matchaProduct.name}
              </h2>

              {/* Rating Row */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-400">({matchaProduct.reviews} reviews)</span>
              </div>
            </div>

            <hr className="border-[#E8E1D9]/50" />

            {/* Pricing Details */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E1D9]/60 shadow-[0_4px_20px_rgba(12,59,27,0.01)]">
              <div className="flex items-center gap-3">
                <span className="font-sans font-semibold text-3xl text-[#0c3b1b]">₹{currentPrice}</span>
                {oldPrice && (
                  <>
                    <span className="line-through text-neutral-400 font-light text-base">₹{oldPrice}</span>
                    <span className="bg-[#0c3b1b]/5 text-[#0c3b1b] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#0c3b1b]/10 shadow-sm uppercase tracking-wide">
                      Save {Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 font-light mt-1">
                Inclusive of all custom import taxes · Standard shipping applies.
              </p>
            </div>

            {/* Product Description */}
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              {matchaProduct.description}
            </p>

            {/* WEIGHT SELECTOR */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Select Packaging Weight</label>
              </div>
              <div className="flex gap-3">
                {["100g", "250g", "500g"].map((w) => {
                  const isActive = selectedWeight === w;
                  const priceMap: Record<string, number> = { "100g": 1499, "250g": 3499, "500g": 6499 };
                  return (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`flex-1 py-3 text-center rounded-xl border-2 transition-all duration-300 font-semibold text-xs tracking-wider cursor-pointer shadow-sm hover:-translate-y-0.5
                        ${isActive
                          ? "border-[#0c3b1b] bg-[#0c3b1b] text-white scale-102 shadow-[#0c3b1b]/10"
                          : "border-[#E8E1D9] bg-white text-neutral-700 hover:border-[#2BB07F]/50"}`}
                    >
                      <div>{w}</div>
                      <div className={`text-[9px] mt-0.5 font-light ${isActive ? "text-[#2BB07F]" : "text-neutral-400"}`}>
                        ₹{priceMap[w]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ADD TO CART & TRUST SIGNALS */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full relative overflow-hidden bg-[#0c3b1b] hover:bg-[#06240f] text-white font-bold py-4 rounded-xl active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(12,59,27,0.15)] disabled:opacity-85 text-xs tracking-widest uppercase cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                  ) : addedSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check size={14} className="text-white" /> Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Trust badges row */}
              <div className="grid grid-cols-2 gap-4 text-center pt-2">
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8E1D9]/40 bg-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <ShieldCheck size={14} className="text-[#2BB07F]" />
                  <span className="text-[9px] font-extrabold tracking-widest text-[#0c3b1b] uppercase">FREE DELIVERY</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8E1D9]/40 bg-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <Leaf size={14} className="text-[#2BB07F]" />
                  <span className="text-[9px] font-extrabold tracking-widest text-[#0c3b1b] uppercase">CERTIFIED ORGANIC</span>
                </div>
              </div>
            </div>

            <hr className="border-[#E8E1D9]/50" />

            {/* DROPDOWN ACCORDIONS */}
            <div className="space-y-1.5">
              {[
                {
                  id: "brewing",
                  title: "Brewing Instructions",
                  icon: Sprout,
                  content: (
                    <ol className="list-decimal pl-4 space-y-1 text-xs text-neutral-500 font-light leading-relaxed">
                      <li>Sift 1-2 scoops (approx. 1/2 tsp) of Matcha powder into a wide porcelain bowl.</li>
                      <li>Add 2 oz (60ml) of hot spring water heated to precisely 176°F / 80°C.</li>
                      <li>Whisk vigorously in a back-and-forth "W" motion using a traditional bamboo whisk until a thick, creamy emerald froth forms on top.</li>
                    </ol>
                  )
                },
                {
                  id: "origin",
                  title: "Origin & Story",
                  icon: Globe,
                  content: (
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">
                      Sourced directly from multi-generational family farms on the hillsides of Uji, Japan. Shaded three weeks prior to harvest to maximize chlorophyll, yielding the signature electric-green hue and smooth sweet-savory umami finish. Sun-dried and granite stone-ground in small batches.
                    </p>
                  )
                },
                {
                  id: "sustainability",
                  title: "Sustainability",
                  icon: Droplet,
                  content: (
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">
                      Our Matcha is packed in double-sealed, airtight aluminum canisters that are 100% infinitely recyclable. Sourced exclusively from farmers practicing biodynamic organic agriculture with zero synthetic sprays, preserving the clean mountain waters of Kyoto region.
                    </p>
                  )
                }
              ].map((acc) => {
                const isOpen = openAccordion === acc.id;
                const Icon = acc.icon;
                return (
                  <div
                    key={acc.id}
                    className="border-b border-[#E8E1D9]/50 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : acc.id)}
                      className="w-full py-4 flex items-center justify-between text-left hover:text-[#0c3b1b] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[#0c3b1b]">
                        <Icon size={14} className="text-[#2BB07F]" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{acc.title}</span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2BB07F]" : ""}`}
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="pb-5 pt-0">
                            {acc.content}
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
      </section>

      {/* Grid Header */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E1D9]/60 pb-5 gap-4">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#2BB07F] block mb-1">D2C Premium Showcase</span>
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#0c3b1b] tracking-tight">
              Luxe Organic Essentials
            </h3>
          </div>
          <p className="text-xs text-neutral-400 max-w-xs font-light leading-relaxed">
            Beautifully bottled, handpicked selections from our farms to your shelves, elevating daily cooking rituals.
          </p>
        </div>
      </section>

      {/* PRODUCT CARD GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {gridProducts.map((p) => {
            const isWished = state.wishlist.includes(p.id);
            const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group bg-white/70 backdrop-blur-md rounded-[24px] overflow-hidden border border-white/60 shadow-[0_8px_30px_rgba(12,59,27,0.02)] hover:shadow-[0_20px_45px_rgba(12,59,27,0.08)] flex flex-col h-full relative"
              >
                {/* Image Zone */}
                <Link
                  to={`/product/${p.id}`}
                  className="block relative overflow-hidden bg-[#FAF8F5] aspect-square"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    loading="lazy"
                  />
                  
                  {/* Category Tag Overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/80 backdrop-blur-sm text-[#0c3b1b] text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/40 shadow-sm">
                      {p.category}
                    </span>
                  </div>

                  {/* Wishlist Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 z-20 cursor-pointer
                      ${isWished ? "bg-red-500 text-white" : "bg-white/85 backdrop-blur-sm text-neutral-400 hover:text-red-500"}`}
                  >
                    <Heart size={13} fill={isWished ? "currentColor" : "none"} />
                  </button>
                </Link>

                {/* Body Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold uppercase text-[#2BB07F] tracking-wider">{p.origin}</span>
                      <span className="bg-[#FAF8F5] border border-[#E8E1D9]/40 text-neutral-450 px-2 py-0.5 rounded-full text-[8px] font-bold">
                        {p.weight}
                      </span>
                    </div>

                    <Link to={`/product/${p.id}`} className="block">
                      <h4 className="font-display font-medium text-[#0c3b1b] text-[15px] group-hover:text-[#2BB07F] transition-colors leading-snug truncate">
                        {p.name}
                      </h4>
                    </Link>

                    {/* Small product description */}
                    <p className="text-[11px] text-neutral-400 font-light leading-normal line-clamp-2">
                      {p.description}
                    </p>

                    {/* Star ratings */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className="fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-[9px] text-neutral-400 font-semibold">({p.reviews})</span>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-100/70 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-sans font-semibold text-sm text-[#0c3b1b]">₹{p.price}</span>
                        {p.oldPrice && (
                          <span className="line-through text-neutral-400 text-[10px]">₹{p.oldPrice}</span>
                        )}
                      </div>
                      {discount > 0 && (
                        <span className="text-[9px] text-[#2BB07F] font-bold">{discount}% OFF</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch({ type: "ADD_TO_CART", product: p, qty: 1 });
                      }}
                      className="bg-[#0c3b1b] hover:bg-[#2BB07F] text-white p-2.5 rounded-full transition-all duration-300 shadow-sm active:scale-90 hover:scale-105 cursor-pointer flex items-center justify-center"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag size={12} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Back to Shop Link banner */}
      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0c3b1b] hover:text-[#2BB07F] transition-colors group"
        >
          Explore All Products <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

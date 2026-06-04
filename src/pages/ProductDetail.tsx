import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  Leaf,
  ChevronRight,
  ChevronLeft,
  Check,
  Sprout,
  ShieldCheck,
  Award,
  BookOpen,
  Home,
  ArrowLeft,
  Share2,
  ShoppingCart,
  User,
  Info,
  Clock,
  HelpCircle,
  Sparkles,
  Droplet,
  RotateCw,
  MapPin,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { WishlistButton, CartButton, ArrowButton, ShareButton } from "../components/SharedUI";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("400g");
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [faqOpen, setFaqOpen] = useState<Record<string, boolean>>({
    shelf: true,
    storage: false,
    cert: false,
    delivery: false
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const relatedSliderRef = useRef<HTMLDivElement>(null);

  // Sync state on product change
  useEffect(() => {
    if (product) {
      setSelectedSize(product.weight || "400g");
      setActiveImgIdx(0);
      setQty(1);
      setPincodeChecked(false);
      setPincode("");
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-800">Product not found</h2>
        <Link to="/shop" className="text-emerald-800 underline mt-4 inline-block font-medium">
          Back to shop
        </Link>
      </div>
    );
  }

  // Weight chip options and calculations
  const sizeChips = [
    { size: "200g", multiplier: 0.6 },
    { size: "400g", multiplier: 1.0 },
    { size: "800g", multiplier: 1.8 },
    { size: "1kg", multiplier: 2.2 }
  ];

  const currentChip = sizeChips.find((c) => c.size === selectedSize) || sizeChips[1];
  const currentPrice = Math.round(product.price * currentChip.multiplier);
  const oldPrice = product.oldPrice ? Math.round(product.oldPrice * currentChip.multiplier) : undefined;
  const savingsPercent = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;
  const wished = state.wishlist.includes(product.id);

  // Setup ingredient cards (8 premium cards matching product details)
  const getIngredientCards = (p: Product) => {
    let ing1 = { title: "Organic Gram Flour", desc: "Stone-ground pure besan", icon: Sprout };
    let ing2 = { title: "Cold Pressed Oil", desc: "Lakdi Ghani groundnut oil", icon: Droplet };

    if (p.id === "p17") {
      ing1 = { title: "A2 Gir Cow Milk", desc: "Grass-fed Indian cows", icon: Sprout };
      ing2 = { title: "Bilona Processed", desc: "Bi-churned golden butter", icon: RotateCw };
    } else if (p.category === "Spices" || p.id === "p8" || p.id === "p12" || p.id === "p10") {
      ing1 = { title: "Nimari Red Chilli", desc: "Sun-dried fiery spices", icon: Sprout };
      ing2 = { title: "Slow Stone-Ground", desc: "Retains volatile oils", icon: Droplet };
    } else if (p.category === "Seeds" || p.id === "p13" || p.id === "p14") {
      ing1 = { title: "High Germination", desc: "Selected heirloom seeds", icon: Sprout };
      ing2 = { title: "Rich In Minerals", desc: "Grown in Narmada basin", icon: Droplet };
    }

    return [
      ing1,
      ing2,
      { title: "100% Organic", desc: "Certified organic inputs", icon: Leaf },
      { title: "Chemical Free", desc: "No synthetic pesticides", icon: ShieldCheck },
      { title: "Handcrafted", desc: "Small-batch rural artisans", icon: Award },
      { title: "Heritage Recipes", desc: "Traditional Nimar flavors", icon: BookOpen },
      { title: "Farm Fresh", desc: "Directly from Khandwa plots", icon: Home },
      { title: "Small Batch", desc: "Quality checked manually", icon: Star }
    ];
  };

  const ingredientCards = getIngredientCards(product);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      const finalProduct = {
        ...product,
        weight: selectedSize,
        price: currentPrice,
        oldPrice: oldPrice || undefined
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
      oldPrice: oldPrice || undefined
    };
    dispatch({ type: "ADD_TO_CART", product: finalProduct, qty });
    navigate("/checkout");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

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

  const toggleFaq = (key: string) => {
    setFaqOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollRelated = (direction: "left" | "right") => {
    if (relatedSliderRef.current) {
      const scrollAmount = 320;
      relatedSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Find related products in same category
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);

  const checkScrollLimits = () => {
    if (relatedSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = relatedSliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const slider = relatedSliderRef.current;
    if (slider) {
      checkScrollLimits();
      slider.addEventListener("scroll", checkScrollLimits);
      window.addEventListener("resize", checkScrollLimits);
      return () => {
        slider.removeEventListener("scroll", checkScrollLimits);
        window.removeEventListener("resize", checkScrollLimits);
      };
    }
  }, [relatedProducts]);

  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      
      {/* Breadcrumb strip */}
      <div className="border-b border-neutral-100 bg-white py-3.5 z-10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-neutral-500 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <ChevronRight size={12} className="text-neutral-350" />
          <Link to="/shop" className="hover:text-emerald-800 transition-colors">Shop</Link>
          <ChevronRight size={12} className="text-neutral-350" />
          <Link to={`/shop?cat=${product.category}`} className="hover:text-emerald-800 transition-colors">{product.category}</Link>
          <ChevronRight size={12} className="text-neutral-350" />
          <span className="text-emerald-950 font-bold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* ==================================================
            MAIN 2-COLUMN DESKTOP LAYOUT
            ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
          
          {/* LEFT SIDE: PRODUCT GALLERY & HERITAGE STORY (STICKY) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            
            {/* PRODUCT GALLERY */}
            <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-4">
            
            {/* Vertical thumbnails */}
            <div className="hidden md:flex flex-col gap-3.5 max-h-[500px] overflow-y-auto no-scrollbar shrink-0">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveImgIdx(i)}
                  onClick={() => setActiveImgIdx(i)}
                  className={`aspect-square w-full rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:scale-[1.03] ${
                    activeImgIdx === i
                      ? "border-emerald-800 ring-2 ring-emerald-800/10 scale-102"
                      : "border-[#EAEAEA] bg-white hover:border-emerald-800/40"
                  }`}
                >
                  <img src={g} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main large display hero image with hover zoom */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow-[0_16px_40px_-20px_rgba(12,59,27,0.08)] flex-grow group">
              
              {/* Share & Wishlist overlay buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
                <ShareButton onClick={handleShare} />
                <WishlistButton wished={wished} onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })} />
              </div>

              {/* Share Toast */}
              <AnimatePresence>
                {shareTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 top-15 bg-emerald-950 text-emerald-100 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md z-20"
                  >
                    Share link copied! 🔗
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Large Image Viewport with Controlled Hover Zoom */}
              <div className="w-full h-full overflow-hidden select-none flex items-center justify-center pointer-events-none">
                <img
                  src={product.gallery[activeImgIdx] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Mobile/Tablet Horizontal Thumbnails Indicator */}
              <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                {product.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${activeImgIdx === i ? "bg-emerald-950 w-4" : "bg-neutral-350"}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Tablet/Mobile Image Gallery list */}
            </div>

            {/* ==================================================
                PRODUCT DESCRIPTION (A Tale of Tradition) - Compact Left-Side
                ================================================== */}
            <div className="bg-white rounded-3xl border border-[#EAEAEA] p-4 sm:p-4.5 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4.5 items-center">
                
                {/* Left Column: Story content */}
                <div className="md:col-span-7 space-y-2.5">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full w-max">
                    A Tale of Tradition
                  </span>
                  <h2 className="font-serif font-black text-lg text-neutral-905 leading-tight">
                    Authentic Sourcing &amp; Traditional Heritage
                  </h2>
                  <p className="text-neutral-600 text-xs leading-relaxed font-serif font-medium">
                    {product.story || "Grown in the alluvial soils of the Narmada river basin, every harvest is sun-dried, stone-ground, and manually packaged. We preserve these ancient Indian crop techniques to conserve natural oils, volatile flavors, and vitamins directly in our Khandwa cooperatives."}
                  </p>
                  
                  {/* ingredients list highlights */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-400 block">Ingredients</span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.map((ing) => (
                          <span key={ing} className="bg-neutral-50 border border-[#EAEAEA] px-2.5 py-1 rounded-full text-[10px] font-semibold text-neutral-700 shadow-xs">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Lifestyle image */}
                <div className="md:col-span-5 h-[160px] md:h-[190px] rounded-2xl overflow-hidden border border-[#EAEAEA] shadow-inner relative bg-white">
                  <img
                    src={product.gallery[4] || product.gallery[1] || product.image}
                    alt="Traditional lifestyle illustration"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm border border-[#EAEAEA] px-2 py-0.5 rounded text-[8px] font-extrabold text-emerald-950">
                    100% ARTISANAL HARVEST
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE: PRODUCT DETAILS INFORMATION PANEL */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* General Header Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <Leaf size={11} /> {product.category}
                </span>
                <span className="text-[10px] text-emerald-805 bg-emerald-50/50 border border-emerald-100/40 px-3 py-1 rounded-full font-black uppercase flex items-center gap-1">
                  <ShieldCheck size={11} /> Verified Organic
                </span>
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-4xl text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Price Info */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-sans font-black text-3xl text-neutral-950">₹{currentPrice}</span>
                {oldPrice && (
                  <>
                    <span className="line-through text-neutral-400 font-bold text-lg">₹{oldPrice}</span>
                    <span className="bg-emerald-950 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg">
                      Save {savingsPercent}% (₹{oldPrice - currentPrice})
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                Inclusive of all taxes · Sourced directly from local farmer cooperatives.
              </p>
            </div>

            {/* Weight Chips Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-600">
                <label>Select Size Options</label>
                <span className="text-emerald-800 font-black">Net Weight: {selectedSize}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2.5">
                {sizeChips.map((chip) => {
                  const isActive = selectedSize === chip.size;
                  const sizePrice = Math.round(product.price * chip.multiplier);
                  return (
                    <button
                      key={chip.size}
                      onClick={() => setSelectedSize(chip.size)}
                      className={`py-3.5 px-1 rounded-2xl border-2 transition-all duration-300 font-bold flex flex-col justify-center items-center shadow-xs cursor-pointer hover:shadow-sm ${
                        isActive
                          ? "border-emerald-950 bg-emerald-950 text-white scale-102"
                          : "border-[#EAEAEA] bg-white hover:border-emerald-800/40 text-neutral-600 hover:bg-neutral-50/50"
                      }`}
                    >
                      <span className="text-xs sm:text-sm tracking-wide">{chip.size}</span>
                      <span className={`text-[9px] mt-0.5 font-medium ${isActive ? "text-emerald-300" : "text-neutral-400"}`}>
                        ₹{sizePrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buybox Add to Cart & Buy Now block */}
            <div className="space-y-4 bg-white p-5 rounded-3xl border border-[#EAEAEA] shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
                <span>Select Quantity</span>
                <span>In Stock: <b className="text-neutral-800">{product.stock}</b></span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center bg-white border border-[#EAEAEA] rounded-full p-1.5 shrink-0 shadow-xs gap-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 rounded-full bg-white border border-neutral-100/80 shadow-xs flex items-center justify-center text-neutral-700 hover:text-emerald-850 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                    disabled={qty <= 1}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-9 text-center font-black text-neutral-800 text-sm select-none">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-9 h-9 rounded-full bg-white border border-neutral-100/80 shadow-xs flex items-center justify-center text-neutral-700 hover:text-emerald-855 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to Cart button */}
                <CartButton
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  showIcon={!isAdding && !addedSuccess}
                  className="flex-1 py-4 text-xs tracking-wider uppercase font-bold"
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : addedSuccess ? (
                      <motion.span
                        key="success"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1.5 font-bold"
                      >
                        <Check size={14} /> Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span key="idle" className="font-bold">
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </CartButton>
              </div>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-white hover:bg-neutral-50 text-emerald-955 border-2 border-emerald-955 font-bold py-4 rounded-full active:scale-98 transition duration-300 text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((b) => (
                <span
                  key={b}
                  className="text-xs bg-neutral-50 border border-[#EAEAEA] text-neutral-700 px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Check size={11} className="text-emerald-800 font-bold" /> {b}
                </span>
              ))}
            </div>

            <hr className="border-neutral-200/65" />

            {/* Pincode checker card */}
            <div className="bg-white p-5 rounded-3xl border border-[#EAEAEA] shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-600 uppercase tracking-wider">
                <MapPin size={15} className="text-emerald-800" />
                <span>Estimate Shipping Delivery</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-grow pl-3.5 pr-2 py-3 bg-neutral-50 border border-[#EAEAEA] rounded-xl focus:border-emerald-800 focus:bg-white focus:outline-none text-xs transition-all placeholder-neutral-400 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all text-xs tracking-wider uppercase cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeError && (
                <p className="text-xs text-red-500 font-bold flex items-center gap-1.5">
                  <AlertCircle size={12} /> {pincodeError}
                </p>
              )}

              {pincodeChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl space-y-1"
                >
                  <p className="text-xs text-emerald-800 font-black flex items-center gap-1.5">
                    <CheckCircle size={13} /> Serviceable Location: {pincode}
                  </p>
                  <p className="text-xs text-neutral-600 font-semibold pl-4.5">
                    {deliveryEstimate}
                  </p>
                </motion.div>
              )}

              {/* Courier support details */}
              <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-neutral-500 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-emerald-800" />
                  <span>Free Shipping (₹499+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-emerald-800" />
                  <span>Easy 7-Day Returns</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ==================================================
            PURE INGREDIENTS GRID SECTION
            ================================================== */}
        <section className="space-y-5">
          <div className="text-center max-w-md mx-auto space-y-1.5">
            <span className="text-[9px] font-black text-emerald-805 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 uppercase tracking-widest">
              Sourcing Checklist
            </span>
            <h3 className="font-serif font-black text-2xl text-neutral-905">Pure Ingredients &amp; Sourcing</h3>
            <p className="text-xs text-neutral-500 font-medium">We ensure verified raw materials, zero additives, and small-batch processing.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ingredientCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 mb-4 group-hover:bg-emerald-800 group-hover:text-white transition duration-300">
                    <IconComp size={16} />
                  </div>
                  <h4 className="font-extrabold text-xs text-neutral-800 leading-snug">{card.title}</h4>
                  <p className="text-[10px] text-neutral-500 font-medium mt-1 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            RELATED PRODUCTS (Horizontal Slider)
            ================================================== */}
        {relatedProducts.length > 0 && (
          <section className="space-y-5 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-serif font-black text-xl text-neutral-900">Explore Related Produce</h3>
                <p className="text-[10px] text-neutral-450 font-bold mt-1 uppercase">Nimari Traditional Goods</p>
              </div>

              {/* Slider arrow buttons */}
              <div className="flex gap-3">
                <ArrowButton direction="left" onClick={() => scrollRelated("left")} disabled={!canScrollLeft} />
                <ArrowButton direction="right" onClick={() => scrollRelated("right")} disabled={!canScrollRight} />
              </div>
            </div>

            {/* Slider scroll box container */}
            <div
              ref={relatedSliderRef}
              className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-2 px-1 items-stretch"
            >
              {relatedProducts.map((p) => {
                const itemWished = state.wishlist.includes(p.id);
                const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
                return (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="w-[230px] sm:w-[260px] bg-white rounded-2xl border border-[#EAEAEA] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between shrink-0 snap-start snap-always hover:-translate-y-1 group relative cursor-pointer"
                  >
                    
                    {/* Related product card photo */}
                    <div className="relative aspect-square rounded-t-2xl overflow-hidden bg-neutral-50">
                      <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      
                      {/* Wishlist toggle */}
                      <WishlistButton
                        wished={itemWished}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch({ type: "TOGGLE_WISHLIST", id: p.id });
                        }}
                        className="absolute top-2 right-2"
                      />
                    </div>

                    {/* Card details body */}
                    <div className="p-3.5 flex flex-col flex-grow justify-between">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider font-extrabold text-neutral-400 block">{p.category}</span>
                        <h4 className="font-serif font-bold text-neutral-805 text-xs sm:text-sm leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#0B5D3B] block">
                          {p.name}
                        </h4>
                      </div>

                      <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs sm:text-sm font-sans font-black text-neutral-900">₹{p.price}</span>
                            {p.oldPrice && (
                              <span className="text-[9px] text-neutral-400 line-through">₹{p.oldPrice}</span>
                            )}
                          </div>
                          <span className="text-[8px] text-neutral-450 font-semibold block">{p.weight}</span>
                        </div>

                        {/* Add to Cart quick button */}
                        <CartButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch({ type: "ADD_TO_CART", product: p });
                          }}
                        />
                      </div>
                    </div>

                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================================================
            CUSTOMER REVIEWS DASHBOARD (Analytics review grid)
            ================================================== */}
        <section className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-100 pb-4">
            <div>
              <h3 className="font-serif font-black text-2xl text-neutral-900">Review Analytics Dashboard</h3>
              <p className="text-xs text-neutral-400 font-semibold mt-1">Verified customers ratings breakdown and attachments.</p>
            </div>
            
            <button className="bg-emerald-955 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-xs transition">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Average Rating block (Col-span 4) */}
            <div className="lg:col-span-4 bg-white border border-[#EAEAEA] p-5 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-[#8a7f6a] uppercase tracking-wider">Average Rating</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-serif font-black text-neutral-900">{product.rating.toFixed(1)}</span>
                  <span className="text-sm font-extrabold text-neutral-400">/ 5.0</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-neutral-200"} />
                  ))}
                </div>
                <p className="text-[10px] text-neutral-400 font-semibold pt-1">Based on {product.reviews} audited ratings.</p>
              </div>

              {/* Rating breakdown graph bars */}
              <div className="space-y-2 border-t border-neutral-200/40 pt-4">
                {[
                  { star: 5, pct: 88 },
                  { star: 4, pct: 8 },
                  { star: 3, pct: 2 },
                  { star: 2, pct: 1 },
                  { star: 1, pct: 1 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2.5 text-[10px] font-bold text-neutral-600">
                     <span className="w-3 text-right">{row.star} ★</span>
                    <div className="flex-1 h-2 bg-neutral-200/60 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-800 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-7 text-right text-neutral-400">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Review list cards (Col-span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Pooja Sharma",
                  date: "2026-05-12",
                  comment: "Absolutely top tier! The granularity and coarse spice blends feel 100% traditional.",
                  img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=150&h=150&q=80"
                },
                {
                  name: "Vikram Mehta",
                  date: "2026-05-28",
                  comment: "Perfect packaging, zip lock seal locks the aroma perfectly. Very fast home delivery.",
                  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&h=150&q=80"
                },
                {
                  name: "Sneha Reddy",
                  date: "2026-06-02",
                  comment: "Organic purity that you can easily feel. No synthetic taste enhancers or colors.",
                  img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&h=150&q=80"
                }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white border border-[#EAEAEA] rounded-2xl p-4.5 flex flex-col justify-between text-left space-y-4 hover:border-emerald-800/20 transition">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2">
                      <div>
                        <h4 className="font-extrabold text-xs text-neutral-805">{rev.name}</h4>
                        <span className="text-[8px] text-neutral-400 font-semibold">{rev.date}</span>
                      </div>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <ShieldCheck size={9} /> Verified
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-xs text-neutral-600 font-medium font-sans leading-normal">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Customer Product usage photo attachment */}
                  <div className="h-16 w-full rounded-xl overflow-hidden border border-[#EAEAEA] shadow-inner bg-neutral-100">
                    <img src={rev.img} alt="User upload" className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>

      </div>
      
    </div>
  );
}

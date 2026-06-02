import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Star, Sparkles, ChevronLeft, ChevronRight, Activity, Heart, MapPin, Truck, Package, CreditCard, Award, Headphones } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ShopByCategory } from "../components/ShopByCategory";
import { RegionalFavourites } from "../components/RegionalFavourites";
import { useState, useEffect, useRef } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
    tag: "100% Certified Organic",
    titleLine1: "Pure Taste of",
    titleHighlight: "Nimar Valley",
    desc: "Handpicked organics and traditional snacks, crafted with purity and love directly from the farms.",
    btnText: "Shop Collection",
    btnLink: "/shop",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1920&q=80",
    tag: "Pure & Traditional",
    titleLine1: "Artisanal & Cold",
    titleHighlight: "Pressed Oils",
    desc: "Traditional extraction retaining full nutrients and ensuring the highest quality for your health.",
    btnText: "Explore Oils",
    btnLink: "/shop",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1920&q=80",
    tag: "Community Empowered",
    titleLine1: "Handcrafted Local",
    titleHighlight: "Nimari Snacks",
    desc: "Supporting rural women across the Narmada belt to build sustainable livelihoods.",
    btnText: "Browse Snacks",
    btnLink: "/shop",
  },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const essenceSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: essenceSectionRef,
    offset: ["start end", "end start"]
  });

  const essenceBgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollBy({ left: direction === "right" ? 360 : -360, behavior: "smooth" });
    }
  };

  // Preload all slider images on mount
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const nextSlide = () => {
    setPreviousSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setPreviousSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <>
      {/* HERO SLIDER */}
      <section
        className="relative h-[100svh] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] w-full overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Invisible Image Preload Container for browser decoding */}
        <div className="hidden" aria-hidden="true">
          {HERO_SLIDES.map((slide) => (
            <img
              key={`preload-${slide.id}`}
              src={slide.image}
              alt=""
              loading="eager"
            />
          ))}
        </div>

        {/* Background Images Layer (Seamless cross-fade) */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const isPrev = idx === previousSlide;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive
                    ? "opacity-100 z-10"
                    : isPrev
                      ? "opacity-100 z-0"
                      : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <motion.div
                  initial={{ scale: 1.08 }}
                  animate={{ scale: isActive ? 1 : 1.08 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt="Fresh Organic Products"
                    className="w-full h-full object-cover"
                  />
                  {/* Refined Dark Overlay */}
                  <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Content Overlay (Typography & CTA Buttons) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex items-center pointer-events-none"
          >
            <div className="max-w-[1300px] mx-auto px-6 lg:px-12 w-full pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl text-white pr-12"
              >
                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                  <Sparkles size={14} /> {HERO_SLIDES[currentSlide].tag}
                </span>
                <h1 className="font-serif font-medium text-5xl sm:text-6xl lg:text-[6rem] leading-[1.05] tracking-tight text-white mb-8 drop-shadow-sm">
                  {HERO_SLIDES[currentSlide].titleLine1} <br/>
                  <span className="text-emerald-400">{HERO_SLIDES[currentSlide].titleHighlight}</span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed font-light tracking-wide mb-12">
                  {HERO_SLIDES[currentSlide].desc}
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link
                    to={HERO_SLIDES[currentSlide].btnLink}
                    className="group relative inline-flex items-center gap-3 bg-white text-neutral-900 px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                  >
                    <span>{HERO_SLIDES[currentSlide].btnText}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-6 lg:left-12 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-6 lg:right-12 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-30">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx === currentSlide) return;
                setPreviousSlide(currentSlide);
                setCurrentSlide(idx);
              }}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === idx
                  ? "w-12 h-1 bg-white"
                  : "w-4 h-1 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* WHY RAMAN GREENS */}
      <section className="relative py-10 px-6 lg:px-12 w-full bg-[#F9FCF9] text-neutral-900 overflow-hidden">
        {/* Faint leaf pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                <Sparkles size={14} /> Our Promise
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
                Why Raman Greens?
              </h2>
              <div className="w-10 h-[2px] bg-emerald-600/40 mx-auto" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
            {[
              { icon: Leaf, subtitle: "SINCE 1983", title: "100% Organic", desc: "Certified organic produce sourced directly from farmers. Find out what it means to be fresh from source.", linkText: "Our Story >" },
              { icon: ShieldCheck, subtitle: "PURE & NATURAL", title: "No Preservatives", desc: "Pure, natural ingredients with zero chemical additives, purposely blended for delicious taste.", linkText: "Shop Our Range >" },
              { icon: Activity, subtitle: "TRADITIONAL", title: "Cold Pressed", desc: "Traditional extraction methods retaining full nutrients and ensuring the highest quality.", linkText: "Explore Process >" },
              { icon: Heart, subtitle: "COMMUNITY", title: "Women Empowered", desc: "Supporting rural women across the Narmada belt to build sustainable livelihoods.", linkText: "Read More >" }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center text-center group h-full transition-transform duration-500 hover:-translate-y-2 border border-black/5"
                >
                  <div className="relative mb-10 mt-4">
                    <div className="absolute -top-2 -left-4 w-12 h-12 bg-[#8bc34a] rounded-full z-0 opacity-90 transition-transform duration-500 group-hover:scale-110" />
                    <Icon size={48} strokeWidth={1} className="relative z-10 text-[#1a3626]" />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#8bc34a] uppercase mb-2">
                    {feature.subtitle}
                  </span>

                  <h3 className="font-serif font-bold text-2xl text-[#1a3626] mb-4">{feature.title}</h3>

                  <p className="text-[13px] text-neutral-600 leading-relaxed font-medium flex-grow max-w-[240px]">
                    {feature.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <ShopByCategory />

      {/* STORY STRIP REDESIGNED (Clean & Minimal) */}
      <section className="py-10 md:py-14 bg-[#FAFAFA] relative overflow-hidden">
        {/* Soft Organic Background Blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-[10%] w-[40%] h-[50%] bg-emerald-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 -right-[10%] w-[40%] h-[50%] bg-emerald-500/5 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
                alt="Nimar farms"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:pt-6"
            >
                <span className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                  <Sparkles size={14} /> Our Heritage
                </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 leading-tight mb-6 sm:mb-8">
                From Nimari soil to your table, <span className="text-emerald-700 italic">without shortcuts.</span>
              </h2>

              <p className="text-neutral-500 leading-relaxed mb-12 text-base font-light">
                Raman Greens KNW was born in a small kitchen in Khandwa with one belief: the soul of Nimar
                deserves a stage. We work directly with farmers across the Narmada belt to bring you snacks, organics
                and gifting that taste exactly like home.
              </p>

              {/* Clean Grid of Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {[
                  { icon: MapPin, title: "Direct Farm Sourcing", desc: "Partner farms across 12 villages." },
                  { icon: Activity, title: "Artisanal Process", desc: "Stone-ground & cold-pressed." },
                  { icon: ShieldCheck, title: "100% Pure", desc: "Zero chemical additives." },
                  { icon: Heart, title: "Community First", desc: "Empowering 200+ rural women." }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="text-emerald-700 mt-1">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-[12px] uppercase tracking-[0.15em] transition-colors duration-300 shadow-md group"
              >
                Read Our Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL HERO BANNER */}
      <section
        ref={essenceSectionRef}
        className="relative h-auto py-12 lg:py-0 lg:h-[500px] w-full overflow-hidden flex items-center justify-center z-10 m-0 p-0"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: essenceBgY, height: "130%", top: "-15%" }}
          className="absolute inset-x-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
            alt="Premium Organic Farm"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </motion.div>

        {/* Subtle Dark & Sunrise Gradient Overlay (Fixed, z-10) */}
        <div className="absolute inset-0 bg-neutral-950/45 mix-blend-multiply z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-amber-950/20 to-black/70 z-10 pointer-events-none" />
        <div 
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(245,158,11,0.06) 0%, rgba(0,0,0,0) 80%)" }}
          className="absolute inset-0 z-10 pointer-events-none" 
        />

        {/* Floating Organic Particles/Leaves */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, -4, 0],
          }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          className="absolute top-[18%] left-[8%] text-emerald-400/25 pointer-events-none hidden md:block z-10"
        >
          <Leaf size={24} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -12, 6, 0],
          }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[28%] left-[15%] text-emerald-500/20 pointer-events-none hidden md:block z-10"
        >
          <Leaf size={18} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 10, -8, 0],
          }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1 }}
          className="absolute top-[22%] right-[10%] text-emerald-400/20 pointer-events-none hidden md:block z-10"
        >
          <Leaf size={20} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, -6, 12, 0],
          }}
          transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[22%] right-[18%] text-emerald-500/25 pointer-events-none hidden md:block z-10"
        >
          <Leaf size={26} />
        </motion.div>

        <div className="relative z-20 max-w-[1100px] w-full mx-auto px-6 lg:px-12 flex flex-col items-center justify-center">
          {/* Subtle Golden Sunrise Glow */}
          <div
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0) 70%)" }}
            className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] blur-[90px] pointer-events-none -z-10"
          />
          
          {/* Main content wrapper (Badge, Title, Subtitle, Buttons) */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-center text-center max-w-3xl"
          >
            {/* 1. Small Premium Badge */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="inline-flex items-center gap-2 bg-emerald-600/90 text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase mb-6 shadow-lg shadow-emerald-950/30 border border-emerald-500/20"
            >
              🌱 ROOTED IN NIMAR
            </motion.span>

            {/* 2. Large Luxury Heading */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5 tracking-tight drop-shadow-sm select-none"
            >
              The Essence of <span className="font-serif italic text-emerald-300">Nimar</span>
            </motion.h2>

            {/* 3. Subheading */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="text-neutral-200/95 text-sm sm:text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-light select-none"
            >
              Experience authentic organic farming, farm-fresh produce, and sustainable agriculture from the heart of Madhya Pradesh.
            </motion.p>

            {/* 4. Buttons Row */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="flex flex-wrap gap-4 justify-center items-center mb-8 lg:mb-10"
            >
              {/* Primary Button */}
              <Link
                to="/shop"
                className="relative inline-flex items-center gap-3 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 shadow-xl hover:shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span className="absolute inset-0 bg-emerald-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Explore Collection 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              {/* Secondary Button */}
              <Link
                to="/about"
                className="relative inline-flex items-center gap-3 px-8 py-3.5 bg-transparent text-white border border-white/40 hover:border-white rounded-full font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                  Our Story 
                  <ArrowRight size={14} className="opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* 5. Stats Cards (Bottom Row) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-0 z-20">
            
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center justify-center gap-3 shadow-lg hover:bg-white/15 transition-colors cursor-default"
              >
                <span className="text-lg select-none">🌱</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold tracking-wide text-white">100% Organic</div>
                  <div className="text-[9px] text-neutral-300 font-light mt-0.5 leading-none">Pure soil to table</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center justify-center gap-3 shadow-lg hover:bg-white/15 transition-colors cursor-default"
              >
                <span className="text-lg select-none">🚚</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold tracking-wide text-white">Farm Fresh</div>
                  <div className="text-[9px] text-neutral-300 font-light mt-0.5 leading-none">Directly from Khandwa</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center justify-center gap-3 shadow-lg hover:bg-white/15 transition-colors cursor-default"
              >
                <span className="text-lg select-none">❤️</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold tracking-wide text-white">Trusted by Families</div>
                  <div className="text-[9px] text-neutral-300 font-light mt-0.5 leading-none">Loved by thousands</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.6 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center justify-center gap-3 shadow-lg hover:bg-white/15 transition-colors cursor-default"
              >
                <span className="text-lg select-none">🏆</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold tracking-wide text-white">Premium Quality</div>
                  <div className="text-[9px] text-neutral-300 font-light mt-0.5 leading-none">Certified excellence</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
          
        </div>
      </section>

      {/* BESTSELLERS */}
      <RegionalFavourites />

      {/* TESTIMONIALS */}
      {/* TESTIMONIALS */}
      <section className="relative pt-10 pb-8 md:pt-16 md:pb-12 bg-[#FAFAFA] border-t border-neutral-100/50 overflow-hidden">


        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

          <div className="text-center mb-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              {/* Badge with Leaf icon and dark green background */}
              <span className="inline-flex items-center gap-2 bg-[#133121] text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                <Leaf size={12} className="fill-white text-white" /> TESTIMONIALS
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-neutral-900 leading-tight mb-2 tracking-tight">
                Letters From Our Customers
              </h2>

              {/* Separator: leaf in the center with horizontal lines */}
              <div className="flex items-center justify-center gap-3 my-2">
                <div className="w-12 h-[1px] bg-neutral-300" />
                <Leaf size={16} className="text-[#8bc34a] fill-[#8bc34a]" />
                <div className="w-12 h-[1px] bg-neutral-300" />
              </div>

              <p className="text-sm text-neutral-500 max-w-md mx-auto mt-1 leading-relaxed">
                Real stories from real people who love our products.
              </p>
            </motion.div>
          </div>

          {/* Cards + Arrows Row: Scroll container with absolute arrows */}
          <div className="relative px-0 sm:px-2 md:px-6">

            {/* Scrollable Cards */}
            <div
              ref={testimonialsRef}
              className="testimonials-scroll flex gap-6 overflow-x-auto overflow-y-hidden pb-6 scroll-smooth snap-x snap-mandatory w-full"
            >
              {[
                {
                  n: "Priya S.",
                  l: "Indore",
                  t: "The Nimari sev tastes EXACTLY like the one from my nani's house in Khandwa. Brought tears to my eyes.",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
                },
                {
                  n: "Rahul J.",
                  l: "Mumbai",
                  t: "Their festive hamper was a hit at Diwali. Beautiful packaging, and every snack was flawless.",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
                },
                {
                  n: "Anita V.",
                  l: "Bangalore",
                  t: "The cold-pressed groundnut oil is now a kitchen staple. Authentic, aromatic and absolutely pure.",
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
                },
                {
                  n: "Meena K.",
                  l: "Bhopal",
                  t: "Maine pehli baar yahan se organic gehun liya — quality aur swaad dono exceptional hain. Ab regular customer hoon!",
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
                },
                {
                  n: "Arjun P.",
                  l: "Pune",
                  t: "The Nimari chutney and pickles are absolutely divine. Took me straight back to my Madhya Pradesh roots.",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
                },
                {
                  n: "Sunita R.",
                  l: "Delhi",
                  t: "Gifted the organic dry fruit hamper to my family — everyone loved it. Pure, fresh and beautifully packed.",
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
                },
              ].map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white p-10 rounded-[28px] shadow-[0_15px_50px_rgba(0,0,0,0.025)] border border-neutral-100 flex flex-col flex-shrink-0 w-[80vw] sm:w-[55vw] md:w-[38vw] lg:w-[30%] relative overflow-hidden snap-start"
                >
                  <p className="text-neutral-600 leading-relaxed font-light mb-6 flex-grow text-sm relative z-10 pt-4">
                    "{r.t}"
                  </p>

                  {/* Stars */}
                  <div className="flex text-amber-400 mb-5 relative z-10">
                    {[...Array(5)].map((_, k) => <Star key={k} size={15} fill="currentColor" className="text-amber-400 border-none" />)}
                  </div>

                  <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-neutral-100/60 pt-5">
                    <img
                      src={r.img}
                      alt={r.n}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-neutral-100"
                    />
                    <div>
                      <div className="font-bold text-sm text-neutral-800">{r.n}</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-0.5">
                        <MapPin size={11} className="text-emerald-700" />
                        <span>{r.l}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={() => scrollTestimonials("left")}
              className="absolute left-2 sm:-left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center text-emerald-700 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollTestimonials("right")}
              className="absolute right-2 sm:-right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center text-emerald-700 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>

          </div>

        </div>
      </section>
      {/* FEATURES & NEWSLETTER */}
      <section className="relative overflow-visible bg-[#FAFAFA] pb-12 pt-0">
        
        {/* Features Row */}
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 bg-transparent z-10 mb-6">
          <div className="bg-white border border-neutral-100 rounded-3xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Leaf, title: "100% Natural", desc: "No additives or chemicals" },
                { icon: ShieldCheck, title: "Premium Quality", desc: "Sourced with care" },
                { icon: Truck, title: "Fast Delivery", desc: "Across India" },
                { icon: Heart, title: "Loved by Thousands", desc: "Happy customers everywhere" }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex items-center gap-4 group">
                    {/* Circle icon box with soft lime green accent */}
                    <div className="w-12 h-12 rounded-full bg-[#8bc34a]/10 text-[#8bc34a] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-800 tracking-wide">{feature.title}</h4>
                      <p className="text-[10px] sm:text-xs text-neutral-500 font-light mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter Banner Container - Beautiful full-width banner */}
        <div className="relative py-8 lg:py-10 w-full overflow-visible bg-white border-y border-neutral-200 mt-6">
          {/* Leaf pattern background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
          
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full lg:w-auto">
              {/* Tea Cup Image - Large & Overlapping borders */}
              <div className="relative w-44 h-44 lg:w-56 lg:h-56 -ml-4 lg:-ml-12 flex-shrink-0 z-20">
                <img 
                  src="/images/tea-cup.png" 
                  alt="Premium Nimari Tea" 
                  className="w-full h-full object-contain drop-shadow-2xl" 
                />
              </div>
              <div className="text-center lg:text-left max-w-sm">
                <h3 className="font-serif font-bold text-3xl lg:text-4xl text-[#1a3626] mb-3">
                  Join the Tea Club
                </h3>
                <p className="text-neutral-600 text-[13px] leading-relaxed">
                  You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
                </p>
              </div>
            </div>

            <div className="w-full max-w-lg lg:w-[500px]">
              <form className="flex w-full bg-white rounded-sm overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-neutral-200">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-6 py-4 text-neutral-800 text-sm focus:outline-none placeholder:text-neutral-400"
                />
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wider uppercase text-xs px-8 py-4 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

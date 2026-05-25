import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Star, Sparkles, ChevronLeft, ChevronRight, Activity, Heart, MapPin, Truck, Package, CreditCard, Award, Headphones } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ShopByCategory } from "../components/ShopByCategory";
import { RegionalFavourites } from "../components/RegionalFavourites";
import { useState, useEffect } from "react";

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
    }, 4000);
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
      <section className="relative mt-8 py-10 px-6 lg:px-12 w-full bg-[#F9FCF9] text-neutral-900 overflow-hidden">
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
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                <Sparkles size={14} /> Our Promise
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
                Why Raman Greens?
              </h2>
              <div className="w-10 h-[2px] bg-emerald-600/40 mx-auto" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

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
            >
                <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
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
      <section className="relative h-[280px] sm:h-[350px] lg:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1920&q=80"
            alt="Organic Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
              <Sparkles size={14} /> Explore Our Range
            </span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 sm:mb-10 drop-shadow-md">
              The Essence of Nimar
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-9 py-4 bg-white text-neutral-900 hover:bg-emerald-50 hover:text-emerald-800 rounded-full font-bold text-[11px] uppercase tracking-[0.15em] transition-all duration-300 shadow-xl group"
            >
              Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <RegionalFavourites />

      {/* TESTIMONIALS */}
      <section className="py-10 md:py-16 bg-[#FAFAFA] border-t border-neutral-100/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          <div className="text-center mb-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                <Sparkles size={14} /> Testimonials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
                Letters From Our Customers
              </h2>
              <div className="w-10 h-[2px] bg-emerald-600/40 mx-auto" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: "Priya S.",
                l: "Indore",
                t: "The Nimari sev tastes EXACTLY like the one from my nani's house in Khandwa. Brought tears to my eyes.",
              },
              {
                n: "Rahul J.",
                l: "Mumbai",
                t: "Their festive hamper was a hit at Diwali. Beautiful packaging, and every snack was flawless.",
              },
              {
                n: "Anita V.",
                l: "Bangalore",
                t: "The cold-pressed groundnut oil is now a kitchen staple. Authentic, aromatic and absolutely pure.",
              },
            ].map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-10 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col h-full"
              >
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
                </div>
                <p className="text-neutral-600 leading-relaxed font-light mb-8 flex-grow">"{r.t}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-serif text-lg">
                    {r.n[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-neutral-900">{r.n}</div>
                    <div className="text-xs text-neutral-500 font-light">{r.l}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* NEWSLETTER & FEATURES */}
      <section className="relative overflow-visible bg-white">

        {/* Newsletter Banner Container */}
        <div className="relative bg-[#eceded] border-y border-neutral-100 z-20 overflow-hidden">
          {/* Subtle botanical leaf pattern background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")', backgroundSize: '400px' }} />

          {/* Tea Cup Image - Absolute Top Left */}
          <div className="absolute top-0 left-0 z-10 pointer-events-none w-[280px] md:w-[380px] transform -translate-x-8 -translate-y-[30%]">
            <img
              src="/images/tea-cup.png"
              alt=""
              className="w-full h-auto object-contain mix-blend-multiply opacity-90"
            />
          </div>

          {/* Content Wrapper */}
          <div className="relative max-w-[900px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-20 min-h-[160px] lg:min-h-[180px]">

            {/* Left side: Text */}
            <div className="flex items-center flex-1 relative w-full">
              {/* Heading & Description */}
              <div className="text-center lg:text-left max-w-[340px] py-10 lg:py-0 relative z-20">
                <h3 className="font-serif font-bold text-[26px] lg:text-[30px] text-[#1a3626] mb-2 tracking-tight">
                  Join the Tea Club
                </h3>
                <p className="text-[#666] text-[13px] leading-[1.6] font-medium pr-4">
                  You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
                </p>
              </div>
            </div>

            {/* Email Form - Right Side */}
            <div className="w-full lg:w-[480px] flex-shrink-0 relative z-20 py-8 lg:py-0">
              <form className="flex w-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[3px] border border-neutral-200 overflow-hidden h-[54px] transition-shadow duration-300 hover:shadow-md focus-within:shadow-md focus-within:border-[#1a3626]/30">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-6 text-[#555] text-[13px] font-medium focus:outline-none placeholder:text-[#bbb]"
                />
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold tracking-[0.08em] uppercase text-[12px] px-8 transition-colors duration-300 flex-shrink-0 flex items-center justify-center"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Features Row */}
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-12 bg-white z-10">

          {/* Decorative Fresh Green Leaves - Bottom Right Corner */}
          <div className="absolute right-[-20px] bottom-[-40px] w-[220px] h-[220px] pointer-events-none z-0 hidden lg:block opacity-80">
            <img
              src="https://images.unsplash.com/photo-1596547609652-9cb5fb4bcb5f?auto=format&fit=crop&w=400&q=80"
              alt=""
              className="w-full h-full object-cover mix-blend-multiply rounded-full blur-[1px] transition-transform duration-1000 hover:scale-110 hover:rotate-6"
              style={{ clipPath: 'circle(45% at 60% 60%)' }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full relative z-10">
            {[
              { icon: Truck, title: "FREE\nSHIPPING" },
              { icon: Package, title: "100% HAND\nPACKED" },
              { icon: CreditCard, title: "SECURED\nPAYMENT" },
              { icon: Award, title: "QUALITY\nGUARANTEE" },
              { icon: Headphones, title: "CUSTOMER\nSERVICE" }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex items-center w-full">
                  <div className="group flex flex-col items-center justify-center text-center py-4 px-2 w-full cursor-default">
                    {/* Outlined icon box */}
                    <div className="w-[64px] h-[64px] flex items-center justify-center rounded-[10px] border-2 border-[#8bc34a] text-[#8bc34a] mb-4 transition-all duration-300 group-hover:bg-emerald-50 group-hover:-translate-y-1">
                      <Icon size={28} strokeWidth={1.25} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#333] uppercase whitespace-pre-line leading-[1.6] transition-colors duration-300 group-hover:text-[#1a3626]">
                      {feature.title}
                    </span>
                  </div>
                  {/* Thin Vertical Divider */}
                  {i < 4 && (
                    <div className="hidden md:block w-[1px] h-16 bg-neutral-100 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}

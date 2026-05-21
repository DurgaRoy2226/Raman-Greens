import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, ShieldCheck, Award, Star, Sparkles, ChevronLeft, ChevronRight, MapPin, Users, Map, Heart, Activity } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { CategorySlider } from "../components/CategorySlider";
import { useState, useEffect } from "react";

const floatCardVariants = (delay: number) => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: delay,
    }
  }
});

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1596422846543-74c692e1ee81?auto=format&fit=crop&w=1920&q=80",
  }
];

export function Home() {
  const trending = PRODUCTS.filter((p) => p.trending);
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <>
      {/* HERO SLIDER */}
      <section 
        className="relative h-[100vh] min-h-[600px] w-full overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image with slight scale animation */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                alt="Fresh Fruits and Vegetables"
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                  className="max-w-3xl text-white drop-shadow-2xl"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-white mb-6 border border-white/20 shadow-lg">
                    <Sparkles size={14} className="text-emerald-400" /> 100% Certified Organic
                  </div>
                  
                  <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.1] tracking-tight text-white mb-6">
                    Fresh Organic <br/>
                    <span className="text-emerald-400">Vegetables</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-white/95 max-w-xl leading-relaxed font-medium tracking-[0.2em] uppercase drop-shadow-md">
                    Natural • Organic • Farm Fresh
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      to="/shop"
                      className="group relative inline-flex items-center gap-3 bg-emerald-brand text-white px-9 py-4 rounded-full text-sm font-bold tracking-wide uppercase overflow-hidden transition-all duration-300 hover:bg-emerald-brand-dark hover:shadow-[0_0_40px_rgb(0,143,90,0.4)]"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-4 lg:left-8 flex items-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 lg:right-8 flex items-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? "w-10 h-2 bg-emerald-brand" 
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Feature Cards — Blinkit-style circular gradient ring icons */}
      <section className="relative z-10 py-14 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {[
            {
              emoji: "🕐",
              gradient: "from-yellow-400 to-orange-400",
              ring: "rgba(251,191,36,0.25)",
              t: "24/7 Support Services",
              s: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit.",
            },
            {
              emoji: "🌿",
              gradient: "from-pink-400 to-purple-500",
              ring: "rgba(236,72,153,0.2)",
              t: "Organic Food Services",
              s: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit.",
            },
            {
              emoji: "🎁",
              gradient: "from-red-400 to-pink-500",
              ring: "rgba(239,68,68,0.2)",
              t: "Offer & Discounts",
              s: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit.",
            },
            {
              emoji: "✨",
              gradient: "from-teal-400 to-cyan-500",
              ring: "rgba(20,184,166,0.2)",
              t: "Curated Products",
              s: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit.",
            },
          ].map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center group"
            >
              {/* Circular gradient ring icon */}
              <div className="relative mb-5">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full scale-110 blur-sm opacity-60"
                  style={{ background: `radial-gradient(circle, ${it.ring} 0%, transparent 70%)` }}
                />
                {/* Dashed gradient border circle */}
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(white, white) padding-box,
                                 linear-gradient(135deg, ${it.gradient.replace("from-","").replace(" to-","").split(" ")[0]}, ${it.gradient.split(" ")[2]}) border-box`,
                    border: "3px dashed transparent",
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                  }}
                >
                  {/* Inner gradient circle */}
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${it.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl leading-none">{it.emoji}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-neutral-900 mb-2 leading-snug">
                {it.t}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-[180px]">
                {it.s}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY SLIDER */}
      <CategorySlider />

      {/* TRENDING */}
      <section className="bg-beige-warm py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeading eyebrow="🔥 Trending" title="Khandwa is Loving" subtitle="Fresh batches, flying off our shelves this week." />
            <Link to="/shop" className="text-sm font-semibold text-emerald-brand hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* STORY STRIP REDESIGNED */}
      <section className="relative overflow-hidden py-28 lg:py-36 bg-gradient-to-br from-emerald-brand/5 via-white/80 to-emerald-brand/10">
        {/* Background glow / blur circles */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-brand/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-beige-soft/40 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,12.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1095,48.33,1200,90.2V0Z" fill="#F5F0E8"></path>
          </svg>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V120H1200V0c-105,41.87-210.51,65.2-303.15,34.41-34.6-11.5-68.3-23.34-104.45-29.34C721.3,-6.8,652.27,0.08,583,18.05,512.34,36.43,438.64,77.67,364.8,42.79c-70.47-4.19-136.44-32.13-206.8-37.5C103.59,1.12,47.79,11.09,0,33.29Z" fill="#FFFFFF"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Image & Floating Stats (5 cols on lg) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 px-4">
              {/* Soft visual shadow ring */}
              <div className="absolute -inset-4 bg-emerald-brand/5 rounded-[2.5rem] blur-xl" />

              {/* Main Image Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/60 group z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
                  alt="Nimar farms"
                  className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-brand-dark/40 via-transparent opacity-60" />
              </motion.div>

              {/* Floating Stat 1: 300+ Acres */}
              <motion.div
                variants={floatCardVariants(0)}
                animate="animate"
                className="absolute -top-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 flex items-center gap-3 group/stat hover:bg-white transition-colors duration-300 pointer-events-auto z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                  <Map size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-800 leading-none">300+ Acres</div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-medium">Nimari Black Soil</div>
                </div>
              </motion.div>

              {/* Floating Stat 2: 50+ Farmers */}
              <motion.div
                variants={floatCardVariants(1.2)}
                animate="animate"
                className="absolute top-1/4 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 flex items-center gap-3 group/stat hover:bg-white transition-colors duration-300 pointer-events-auto z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                  <Users size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-800 leading-none">50+ Farmers</div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-medium">Partner Families</div>
                </div>
              </motion.div>

              {/* Floating Stat 3: 12 Villages */}
              <motion.div
                variants={floatCardVariants(0.6)}
                animate="animate"
                className="absolute bottom-1/4 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 flex items-center gap-3 group/stat hover:bg-white transition-colors duration-300 pointer-events-auto z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-800 leading-none">12 Villages</div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-medium">Narmada Belt Sourcing</div>
                </div>
              </motion.div>

              {/* Floating Stat 4: 200+ Women Empowered */}
              <motion.div
                variants={floatCardVariants(1.8)}
                animate="animate"
                className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 flex items-center gap-3 group/stat hover:bg-white transition-colors duration-300 pointer-events-auto z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300">
                  <Heart size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-800 leading-none">200+ Women</div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-medium">Empowered in Nimar</div>
                </div>
              </motion.div>
            </div>

            {/* Story Details Card (7 cols on lg) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/50 backdrop-blur-md"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-brand/10 border border-emerald-brand/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-brand mb-6">
                  <Leaf size={12} className="animate-pulse" /> Our Story & Heritage
                </div>
                
                <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-neutral-800 leading-tight mb-6">
                  From Nimari soil to your table — <span className="text-emerald-brand">without shortcuts</span>.
                </h2>
                
                <p className="text-neutral-600 leading-relaxed mb-8 text-sm md:text-base font-sans">
                  Raman Greens KNW was born in 2018 in a small kitchen in Khandwa with one belief: the soul of Nimar
                  deserves a stage. We work directly with farmers across the Narmada belt to bring you snacks, organics
                  and gifting that taste exactly like home.
                </p>

                {/* 2x2 Grid of Bullet details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    {
                      icon: MapPin,
                      title: "Direct Farm Sourcing",
                      desc: "Sourced directly from partner farms across 12 villages in Nimar.",
                      color: "from-emerald-400/20 to-emerald-500/20 text-emerald-brand"
                    },
                    {
                      icon: Activity,
                      title: "Artisanal Processing",
                      desc: "Traditional stone-ground and cold-pressed methods.",
                      color: "from-amber-400/20 to-amber-500/20 text-amber-600"
                    },
                    {
                      icon: ShieldCheck,
                      title: "100% Preservative Free",
                      desc: "No artificial colors, preservatives, or chemical additives.",
                      color: "from-blue-400/20 to-blue-500/20 text-blue-600"
                    },
                    {
                      icon: Heart,
                      title: "Women Empowerment",
                      desc: "Providing employment to over 200+ rural women.",
                      color: "from-pink-400/20 to-pink-500/20 text-pink-600"
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="flex gap-4 group/item"
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-800 text-sm md:text-base leading-snug group-hover/item:text-emerald-brand transition-colors duration-200">{item.title}</h4>
                          <p className="text-neutral-500 text-xs md:text-sm mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Premium CTA Button */}
                <div className="flex">
                  <Link
                    to="/shop"
                    className="group relative inline-flex items-center gap-3 bg-emerald-brand text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase overflow-hidden shadow-lg shadow-emerald-brand/20 hover:shadow-xl hover:shadow-emerald-brand/35 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="relative z-10">Explore Products</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <SectionHeading eyebrow="⭐ Bestsellers" title="Regional Favourites" subtitle="What every Nimari household keeps in stock." />
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-beige-warm py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="❤️ Reviews" title="A Letter from Our Customers" subtitle="" />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
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
                t: "The cold-pressed groundnut oil is now a kitchen staple. Authentic, aromatic and chemical-free.",
              },
            ].map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-7 rounded-3xl border border-beige-soft"
              >
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
                </div>
                <p className="text-neutral-700 leading-relaxed italic">"{r.t}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-brand text-white flex items-center justify-center font-bold">
                    {r.n[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.n}</div>
                    <div className="text-xs text-neutral-500">{r.l}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="relative bg-gradient-to-br from-emerald-brand to-emerald-brand-dark rounded-3xl p-10 lg:p-16 text-white overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-brand-light/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-80">Newsletter</div>
              <h3 className="font-display font-bold text-3xl lg:text-4xl mt-2">
                Get a taste of Nimar — every Sunday.
              </h3>
              <p className="mt-3 opacity-90 text-sm max-w-md">
                Recipes, festival hampers and farmer stories. Plus 10% off your first order.
              </p>
            </div>
            <form className="flex gap-2 bg-white/15 backdrop-blur p-2 rounded-full">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 placeholder:text-white/70 text-white focus:outline-none"
              />
              <button className="bg-white text-emerald-brand font-semibold px-5 py-2.5 rounded-full hover:bg-beige-soft transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-emerald-brand font-semibold tracking-widest text-xs uppercase">{eyebrow}</div>
      <h2 className="font-display font-bold text-3xl lg:text-5xl mt-2 max-w-2xl leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-neutral-500 max-w-lg">{subtitle}</p>}
    </motion.div>
  );
}

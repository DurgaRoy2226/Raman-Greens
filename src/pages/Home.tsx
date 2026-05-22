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
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1920&q=80",
  },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <>
      {/* HERO SLIDER */}
      <section 
        className="relative h-[100vh] min-h-[700px] w-full overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            {/* Background Image with slight scale animation */}
            <motion.div 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                alt="Fresh Organic Products"
                className="w-full h-full object-cover"
              />
              {/* Refined Dark Overlay */}
              <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-[1300px] mx-auto px-6 lg:px-12 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="max-w-3xl text-white pr-12"
                >
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4"><Sparkles size={14} /> 100% Certified Organic</span>
                  <h1 className="font-serif font-medium text-5xl sm:text-6xl lg:text-[6rem] leading-[1.05] tracking-tight text-white mb-8 drop-shadow-sm">
                    Pure Taste of <br/>
                    <span className="text-emerald-400 italic">Nimar Valley</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed font-light tracking-wide mb-12">
                    Handpicked organics and traditional snacks, crafted with purity and love directly from the farms.
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <Link
                      to="/shop"
                      className="group relative inline-flex items-center gap-3 bg-white text-neutral-900 px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                    >
                      <span>Shop Collection</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-6 lg:left-12 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-6 lg:right-12 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
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
              
              <span className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-md text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4"><Sparkles size={14} /> Our Promise</span>
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
      <section className="py-8 lg:py-10 bg-[#FAFAFA] relative overflow-hidden">
        {/* Soft Organic Background Blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-[10%] w-[40%] h-[50%] bg-emerald-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 -right-[10%] w-[40%] h-[50%] bg-emerald-500/5 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
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
                <span className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-md text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4"><Sparkles size={14} /> Our Heritage</span>
              
              <h2 className="font-serif text-4xl lg:text-5xl font-medium text-neutral-900 leading-tight mb-8 pr-8">
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
      <section className="relative h-[400px] lg:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1920&q=80" 
            alt="Organic Farm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-emerald-300 font-bold tracking-[0.3em] uppercase text-[11px] mb-6">
              Farm to Table
            </span>
            <span className="block text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-600 mb-4">Explore Our Range</span>
            <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-10 drop-shadow-md">
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
      <section className="py-8 bg-[#FAFAFA] border-t border-neutral-100/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-10 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-md text-black px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4"><Sparkles size={14} /> Testimonials</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
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
                <p className="text-neutral-600 leading-relaxed font-light italic mb-8 flex-grow">"{r.t}"</p>
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
      <section className="bg-white border-b border-neutral-100">
        {/* Newsletter Banner */}
        <div className="relative py-12 lg:py-16 w-full overflow-hidden bg-[#f4f7f4]">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
          
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full lg:w-auto">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 -ml-4 lg:-ml-12 flex-shrink-0">
                <img src="/images/tea-cup.png" alt="Tea Cup" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
              <div className="text-center lg:text-left max-w-sm">
                <h3 className="font-serif font-bold text-3xl lg:text-4xl text-[#1a3626] mb-3">
                  Join Our Community
                </h3>
                <p className="text-neutral-600 text-[13px] leading-relaxed">
                  You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
                </p>
              </div>
            </div>

            <div className="w-full max-w-lg lg:w-[500px]">
              <form className="flex w-full bg-white rounded-sm overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-neutral-100">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-6 py-4 text-neutral-800 text-sm focus:outline-none placeholder:text-neutral-400"
                />
                <button className="bg-[#8bc34a] hover:bg-[#7cb041] text-white font-bold tracking-wider uppercase text-xs px-8 py-4 transition-colors">
                  SUBSCRIBE
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Features Row */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:divide-x divide-neutral-100">
            {[
              { icon: Truck, title: "FREE\nSHIPPING" },
              { icon: Package, title: "100% HAND\nPACKED" },
              { icon: CreditCard, title: "SECURED\nPAYMENT" },
              { icon: Award, title: "QUALITY\nGUARANTEE" },
              { icon: Headphones, title: "CUSTOMER\nSERVICE" }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center px-4 md:first:pl-0 md:last:pr-0">
                  <div className="text-[#8bc34a] mb-4">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-neutral-800 uppercase whitespace-pre-line leading-tight">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

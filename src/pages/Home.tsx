import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, ShieldCheck, Award, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { CategorySlider } from "../components/CategorySlider";
import { FeatureProducts } from "../components/FeatureProducts";
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

      {/* FEATURE PRODUCTS */}
      <FeatureProducts />

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

      {/* STORY STRIP */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[480px] rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
            alt="Nimar farms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-brand-dark/80 via-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-dark p-5 rounded-2xl text-white">
            <div className="text-xs font-bold tracking-widest uppercase opacity-80">Our Roots</div>
            <div className="font-display text-xl mt-1">300 acres of Nimari black soil. 50+ partner farmers.</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-emerald-brand font-semibold tracking-widest text-xs uppercase">Our Story</div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl mt-3 leading-tight">
            From Nimari soil to your table — without shortcuts.
          </h2>
          <p className="mt-5 text-neutral-600 leading-relaxed">
            Raman Greens KNW was born in 2018 in a small kitchen in Khandwa with one belief: the soul of Nimar
            deserves a stage. We work directly with farmers across the Narmada belt to bring you snacks, organics
            and gifting that taste exactly like home.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Direct-from-farm sourcing across 12 villages",
              "Stone-ground & cold-pressed processes",
              "Zero artificial preservatives, ever",
              "Empowering 200+ rural women through partnerships",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-brand/10 text-emerald-brand flex items-center justify-center mt-0.5 shrink-0">
                  <Leaf size={11} />
                </div>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
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

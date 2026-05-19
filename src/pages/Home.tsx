<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, ShieldCheck, Award, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
=======
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Truck, ShieldCheck, Award, Star, Sparkles } from "lucide-react";
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
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

<<<<<<< HEAD
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="max-w-2xl text-white"
                >
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-6 border border-white/30">
                    <Sparkles size={12} className="text-amber-300" /> Authentic from Khandwa, Madhya Pradesh
                  </div>
                  <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white">
                    Fresh Fruits & <br/>
                    <span className="text-emerald-400 italic">Vegetables</span>
                  </h1>
                  <p className="mt-6 text-xl text-white/90 max-w-lg leading-relaxed font-semibold tracking-wide uppercase">
                    Natural • Organic • Farm Fresh
                  </p>
=======
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-emerald-brand text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-brand-dark transition-all duration-300 group shadow-xl shadow-emerald-brand/30 hover:scale-105 active:scale-95"
              >
                Shop Nimar's Best
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/gifting"
                className="inline-flex items-center gap-2 bg-white border-2 border-beige-soft px-8 py-4 rounded-full font-bold hover:border-emerald-brand hover:text-emerald-brand transition-all duration-300 shadow-lg shadow-black/5 hover:scale-105 active:scale-95"
              >
                Festive Hampers 🎁
              </Link>
            </div>
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 bg-emerald-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-brand-dark transition shadow-lg shadow-emerald-brand/30"
                    >
                      Shop Now
                      <ArrowRight size={18} />
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

      {/* Trust strip */}
      <div className="bg-white border-b border-beige-soft relative z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { icon: Truck, t: "Free shipping ₹499+", s: "Pan-India delivery" },
            { icon: ShieldCheck, t: "Secure Razorpay", s: "UPI · Cards · Netbanking" },
            { icon: Leaf, t: "100% Authentic", s: "Sourced from Khandwa farms" },
            { icon: Award, t: "Award-winning", s: "MP Fest 2025 winners" },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-emerald-brand/10 text-emerald-brand flex items-center justify-center shrink-0">
                <it.icon size={20} />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-neutral-900">{it.t}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{it.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY GRID */}
      <section id="shop-categories" className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
        <SectionHeading
          eyebrow="Explore"
          title="Curated Categories"
          subtitle="Each shelf, a story from Nimar's villages and bylanes."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Snacks", emoji: "🌶️", cat: "Snacks", img: PRODUCTS[0].image },
            { name: "Organics", emoji: "🌱", cat: "Organics", img: PRODUCTS[2].image },
            { name: "Sweets", emoji: "🍬", cat: "Sweets", img: PRODUCTS[6].image },
            { name: "Gifting", emoji: "🎁", cat: "Gifting", img: PRODUCTS[4].image },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                href={`/${c.cat.toLowerCase()}`}
                className="group relative block h-80 rounded-[2.5rem] overflow-hidden shadow-xl shadow-emerald-brand/5 border border-white/20"
              >
                <div className="absolute inset-0 zoom-img-container">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover zoom-img" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-emerald-brand-dark/90 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-500 origin-left">{c.emoji}</div>
                  <div className="font-display font-bold text-3xl">{c.name}</div>
                  <div className="flex items-center gap-2 text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Explore collection <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section id="trending" className="bg-beige-warm py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeading eyebrow="🔥 Trending" title="Khandwa is Loving" subtitle="Fresh batches, flying off our shelves this week." />
            <Link href="/shop" className="text-sm font-semibold text-emerald-brand hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* STORY STRIP */}
      <section id="story" className="max-w-7xl mx-auto px-4 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
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
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "./ProductCard";

const TABS = ["All", "Snacks", "Organics", "Sweets", "Spices", "Gifting"] as const;

export function RegionalFavourites() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const products = PRODUCTS.filter((p) => {
    if (!p.bestseller && !p.trending) return false;
    if (activeTab === "All") return true;
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/60 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              <Sparkles size={13} /> Curated Collections
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-neutral-900 leading-tight tracking-tight">
              Regional Favourites
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed mt-3 max-w-md font-light">
              Hand-prepared culinary treasures from the heart of Nimar, beloved by our community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-[12px] uppercase tracking-[0.12em] transition-all duration-300 shadow-md group"
            >
              Full Collection
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Tab Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300
                  ${active
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-lg shadow-emerald-700/20"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-emerald-600/40 hover:text-emerald-700 hover:bg-emerald-50/50"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* ── Product Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {products.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">
                <div className="text-5xl mb-4">🌿</div>
                <p className="font-medium text-neutral-600">No featured products in this category yet.</p>
                <Link to="/shop" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
                  Browse all products →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} idx={idx} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

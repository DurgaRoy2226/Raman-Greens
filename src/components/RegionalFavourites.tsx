import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { ProductCard } from "./ProductCard";

const CATEGORIES = ["All", "Snacks", "Organics", "Sweets", "Spices"];

export function RegionalFavourites() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!p.bestseller) return false;
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  }).slice(0, 8);

  return (
    <section className="relative py-32 bg-[#FDFDFC]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        {/* Leaf decorations */}
        <div className="absolute top-1/4 left-8 text-emerald-600/10 pointer-events-none">
          <Leaf size={64} className="opacity-15" />
        </div>
        <div className="absolute bottom-1/4 right-8 text-emerald-600/10 pointer-events-none">
          <Leaf size={64} className="opacity-15" />
        </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full mb-6 border border-emerald-100"
          >
            <Sparkles size={14} className="text-emerald-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
              Curated Collections
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-6 text-center tracking-tight">
            Regional Favourites
          </h2>
          <p className="text-neutral-500 max-w-lg text-center leading-relaxed">
            Experience the soulful essence of Nimar through our most cherished, hand-prepared culinary treasures.
          </p>
        </div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} idx={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20"
          >
            Explore Full Collection
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

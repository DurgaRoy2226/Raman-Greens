import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "./ProductCard";

export function RegionalFavourites() {
  const products = PRODUCTS.filter((p) => p.bestseller || p.trending).slice(0, 8);

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/60 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-2">
                <Sparkles size={13} /> Curated Collections
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-neutral-900 leading-tight tracking-tight">
                Regional Favourites
              </h2>
              
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-[12px] uppercase tracking-[0.12em] transition-all duration-300 shadow-md group self-start sm:self-auto shrink-0"
              >
                Full Collection
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p className="text-neutral-500 text-sm leading-relaxed mt-2 font-light">
              Hand-prepared culinary treasures from the heart of Nimar, beloved by our community.
            </p>
          </motion.div>
        </div>

        {/* ── Product Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

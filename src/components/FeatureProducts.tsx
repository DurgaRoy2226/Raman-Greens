import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

const TABS = ["All Products", "Snacks", "Organics", "Sweets", "Gifting"] as const;
type Tab = typeof TABS[number];

export function FeatureProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("All Products");
  const { dispatch } = useStore();

  const filtered = PRODUCTS.filter(p =>
    activeTab === "All Products" ? true : p.category === activeTab
  ).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Left: Special Menu Banner ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative lg:w-72 shrink-0 rounded-3xl overflow-hidden min-h-[340px] lg:min-h-0"
        >
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
            alt="Special Menu"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

          <div className="relative z-10 flex flex-col justify-end h-full p-7 min-h-[340px] lg:min-h-[460px]">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-sm text-emerald-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 w-fit">
              🔥 Hot This Week
            </div>
            <h3 className="font-display font-bold text-white text-3xl leading-tight mb-2">
              Special<br />Menu
            </h3>
            <p className="text-white/70 text-sm mb-6">On all weekend sale</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 w-fit group"
            >
              Shop Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── Right: Product Grid ───────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Header + Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-display font-bold text-2xl text-neutral-900">Feature Products</h2>
            <div className="flex items-center gap-1 flex-wrap">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                    ${activeTab === tab
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-neutral-500 hover:text-emerald-600 hover:bg-emerald-50"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product, i) => {
              const discountPct = product.oldPrice
                ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="bg-white border border-neutral-100 rounded-2xl overflow-hidden group hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/shop/${product.id}`} className="block relative">
                    <div className="relative h-40 bg-neutral-50 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {discountPct > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{discountPct}%
                        </div>
                      )}
                      {product.bestseller && (
                        <div className="absolute top-2 right-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Best
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">
                      {product.category}
                    </p>
                    <Link to={`/shop/${product.id}`}>
                      <h4 className="text-sm font-semibold text-neutral-800 leading-snug truncate hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-neutral-400 mb-2">{product.weight}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-neutral-900 text-sm">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-xs text-neutral-400 line-through ml-1.5">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                        className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all */}
          <div className="flex justify-center mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition"
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

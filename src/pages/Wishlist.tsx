import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export function Wishlist() {
  const { state } = useStore();
  const wishlistItems = (state.wishlist || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;
  const wishlistProducts = wishlistItems;

  return (
    <div className="bg-beige-warm min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-beige-soft py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex p-3 rounded-2xl bg-emerald-brand/10 text-emerald-brand mb-4">
              <Heart size={28} fill="currentColor" />
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-neutral-900">Your Wishlist</h1>
            <p className="text-neutral-500 mt-3 max-w-lg mx-auto">
              A curated collection of your favorite Nimari treasures, waiting to come home.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
        {wishlistProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] p-12 lg:p-20 text-center shadow-xl shadow-emerald-brand/5 border border-beige-soft max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="font-display font-bold text-2xl text-neutral-800">Your wishlist is empty</h2>
            <p className="text-neutral-500 mt-3 mb-8">
              Explore our collection of authentic snacks, organics and hampers from the heart of Nimar.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 bg-emerald-brand text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-brand/20 hover:scale-105 transition-all"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} idx={i} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Section (Simplified) */}
      {wishlistProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-neutral-800">You might also like</h2>
            <Link to="/shop" className="text-emerald-brand font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {/* We'll just show some products here, for now using a placeholder logic */}
          <p className="text-neutral-400 italic">Exploring Nimar's finest...</p>
        </div>
      )}
    </div>
  );
}

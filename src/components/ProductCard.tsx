import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";

export function ProductCard({ product, idx = 0 }: { product: Product; idx?: number }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
      className="group relative bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-neutral-100 flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-neutral-50/50 group/img">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" 
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              dispatch({ type: "ADD_TO_CART", product }); 
            }}
            className="translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-md text-emerald-800 hover:bg-emerald-800 hover:text-white px-4 py-2 rounded-full font-medium text-sm shadow-xl flex items-center gap-2"
          >
            <Plus size={16} /> Quick Add
          </button>
        </div>

        {/* Minimal Glass Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 items-start z-20 pointer-events-none">
          {product.oldPrice && (
            <span className="bg-white/80 backdrop-blur-md text-emerald-800 text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-sm border border-white/50">
              {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
            </span>
          )}
          {product.bestseller && !product.oldPrice && (
            <span className="bg-white/80 backdrop-blur-md text-emerald-800 text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-sm border border-white/50">
              Bestseller
            </span>
          )}
        </div>
      </Link>

      {/* Elegant Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
        }}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white z-20"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={15} strokeWidth={1.5} className={`transition-colors ${wished ? "fill-red-500 text-red-500" : "text-neutral-500 hover:text-red-500"}`} />
      </button>

      {/* Content - Breathable Spacing */}
      <div className="p-4 flex flex-col flex-grow relative z-20 bg-white">
        <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">
          {product.category}
        </div>
        
        <Link to={`/product/${product.id}`} className="mb-3">
          <h3 className="font-serif font-medium text-[17px] leading-tight text-neutral-900 line-clamp-2 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 mb-5 mt-auto">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, k) => (
              <Star key={k} size={12} className={k < Math.floor(product.rating) ? "fill-amber-400" : "fill-neutral-100 text-neutral-200"} />
            ))}
          </div>
          <span className="text-xs text-neutral-400 font-light ml-1">({product.reviews})</span>
          <span className="ml-auto text-[11px] font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-md">
            {product.weight}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-5 border-t border-neutral-100 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2.5">
              <span className="font-sans font-medium text-lg text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-[12px] line-through text-neutral-400 font-light">₹{product.oldPrice}</span>
              )}
            </div>
          </div>
          
          {/* Subtle Add icon for mobile / alternate addition */}
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "ADD_TO_CART", product });
            }}
            className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-emerald-800 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 border border-neutral-100 hover:border-emerald-800"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

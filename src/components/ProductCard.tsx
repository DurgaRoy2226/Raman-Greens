import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, Plus } from "lucide-react";
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
      className="group relative bg-white rounded-2xl overflow-hidden border border-beige-soft hover:shadow-2xl hover:shadow-emerald-brand/10 transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-beige-warm">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover zoom-img" />
          {product.oldPrice && (
            <span className="absolute top-3 left-3 bg-emerald-brand text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
          {product.bestseller && (
            <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
        }}
        className={`absolute top-3 right-3 ${product.bestseller ? "top-12" : ""} w-9 h-9 rounded-full glass flex items-center justify-center transition hover:scale-110`}
      >
        <Heart size={15} className={wished ? "fill-emerald-brand text-emerald-brand" : "text-neutral-700"} />
      </button>

      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-emerald-brand font-semibold mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-base leading-tight line-clamp-2 hover:text-emerald-brand transition">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-neutral-500">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="font-medium text-neutral-700">{product.rating}</span>
          <span>({product.reviews})</span>
          <span className="ml-auto text-[11px]">{product.weight}</span>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
              )}
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
            className="w-9 h-9 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-full flex items-center justify-center transition active:scale-90 group-hover:scale-110"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

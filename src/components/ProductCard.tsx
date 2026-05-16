import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { useAuthModal } from "../context/AuthModalContext";

export function ProductCard({ product, idx = 0 }: { product: Product; idx?: number }) {
  const { state, dispatch } = useStore();
  const { openModal } = useAuthModal();
  const wished = state.wishlist.includes(product.id);
  const isLoggedIn = !!state.user;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openModal(() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id }));
      return;
    }
    dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      openModal(() => dispatch({ type: "ADD_TO_CART", product }));
      return;
    }
    dispatch({ type: "ADD_TO_CART", product });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-beige-soft hover:shadow-[0_20px_50px_-12px_rgba(0,143,90,0.15)] transition-all duration-500"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-beige-warm">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=70";
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

          {product.oldPrice && (
            <span className="absolute top-4 left-4 bg-emerald-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-emerald-brand/20">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
          {product.bestseller && (
            <span className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-amber-400/20">
              Bestseller
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-4 ${product.bestseller ? "top-14" : "top-4"} right-4 w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 z-10 shadow-md`}
      >
        <Heart
          size={16}
          className={`transition-all duration-300 ${
            wished ? "fill-emerald-brand text-emerald-brand" : "text-neutral-700"
          }`}
        />
      </button>

      <div className="p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-brand font-bold mb-2">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2 hover:text-emerald-brand transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-neutral-800">{product.rating}</span>
          </div>
          <span className="opacity-60">({product.reviews} reviews)</span>
          <span className="ml-auto font-medium">{product.weight}</span>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs line-through text-neutral-400 mb-0.5">₹{product.oldPrice}</span>
            )}
            <span className="font-display font-bold text-xl text-neutral-900">₹{product.price}</span>
          </div>
          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="w-11 h-11 bg-emerald-brand hover:bg-emerald-brand-dark text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-emerald-brand/20 group/btn"
          >
            <Plus size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

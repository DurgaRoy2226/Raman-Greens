import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { WishlistButton, CartButton } from "./SharedUI";

export function ProductCard({ product, idx = 0 }: { product: Product; idx?: number }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-emerald-600/20 shadow-sm hover:shadow-xl hover:shadow-emerald-950/4 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative">

      {/* ── Image ── */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-[#f7f6f3] overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-103"
        />

        {/* Wishlist Button (permanently visible on top-right corner) */}
        <WishlistButton
          wished={wished}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
          }}
          className="absolute top-3 right-3"
        />
      </Link>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[14px] font-medium text-neutral-800 leading-snug line-clamp-2 mb-3 hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base text-neutral-900">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs line-through text-neutral-400">₹{product.oldPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 font-light">{product.weight}</span>
          </div>

          {/* Add to Cart Button (permanently visible at the bottom) */}
          <CartButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "ADD_TO_CART", product });
            }}
          />
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";

export function ProductCard({ product, idx = 0 }: { product: Product; idx?: number }) {
  const { state, dispatch } = useStore();
  const wished = state.wishlist.includes(product.id);

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">

      {/* Image Area */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-[#f9f9f9] overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.oldPrice && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </span>
        )}

        {/* Right Side Sliding Action Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-2 pr-3 transition-all duration-300 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0" style={{ zIndex: 20 }}>
          {/* Like / Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
            }}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 transition-all duration-200 active:scale-95"
            aria-label="Add to wishlist"
            style={{ transitionDelay: "0ms" }}
          >
            <Heart
              size={16}
              strokeWidth={1.8}
              className={wished ? "fill-red-500 text-red-500" : "text-neutral-500 hover:text-red-500"}
            />
          </button>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "ADD_TO_CART", product });
            }}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-neutral-500 transition-all duration-200 active:scale-95"
            aria-label="Add to cart"
            style={{ transitionDelay: "60ms" }}
          >
            <ShoppingCart size={16} strokeWidth={1.8} />
          </button>

          {/* Quick View */}
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 text-neutral-500 transition-all duration-200 active:scale-95"
            aria-label="Quick view"
            style={{ transitionDelay: "120ms" }}
          >
            <Eye size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Category */}
        <span className="text-[11px] text-neutral-400 font-medium mb-1">
          {product.category}
        </span>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[15px] font-bold text-neutral-800 leading-snug line-clamp-2 mb-3 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-[#4CAF50] font-bold text-base">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-neutral-400 text-sm line-through font-normal">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "ADD_TO_CART", product });
            }}
            className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-emerald-600 text-neutral-500 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

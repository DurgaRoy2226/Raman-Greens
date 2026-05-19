import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { Heart } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

export function Wishlist() {
  const { state } = useStore();

  const wishlistProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 min-h-[70vh]">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-emerald-brand fill-emerald-brand" size={32} />
        <h1 className="text-3xl font-bold text-neutral-800">Your Wishlist</h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-beige-soft rounded-2xl p-12 text-center max-w-2xl mx-auto mt-12">
          <Heart className="mx-auto text-neutral-400 mb-4" size={48} strokeWidth={1} />
          <h2 className="text-2xl font-medium text-neutral-800 mb-2">Your wishlist is empty</h2>
          <p className="text-neutral-500 mb-8">Explore our collection and add your favorite products here to save them for later.</p>
          <Link to="/shop" className="bg-emerald-brand text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {wishlistProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

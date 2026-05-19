"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Minus, Plus, Heart, ShoppingBag, Truck, ShieldCheck, Leaf, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === id);
  const { state, dispatch } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [tab, setTab] = useState<"desc" | "nutri" | "ship">("desc");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="font-display text-3xl">Product not found</h2>
        <Link href="/shop" className="text-emerald-brand underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const wished = state.wishlist.includes(product.id);
  const recs = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 text-xs text-neutral-500 flex items-center gap-1">
        <Link href="/" className="hover:text-emerald-brand">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-emerald-brand">Shop</Link>
        <ChevronRight size={12} />
        <Link href={`/shop?cat=${product.category}`} className="hover:text-emerald-brand">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-neutral-800 font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square bg-beige-warm rounded-3xl overflow-hidden cursor-zoom-in"
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
          >
            <img
              src={product.gallery[imgIdx] || product.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: zoomed ? "scale(1.5)" : "scale(1)" }}
            />
            {product.bestseller && (
              <span className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                ⭐ Bestseller
              </span>
            )}
          </motion.div>
          <div className="mt-4 flex gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                  imgIdx === i ? "border-emerald-brand" : "border-transparent"
                }`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-emerald-brand text-xs uppercase tracking-widest font-semibold">{product.category}</div>
          <h1 className="font-display font-bold text-4xl mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-neutral-500">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="font-display font-bold text-4xl">₹{product.price}</span>
            {product.oldPrice && (
              <>
                <span className="line-through text-neutral-400 text-lg">₹{product.oldPrice}</span>
                <span className="bg-emerald-brand/10 text-emerald-brand text-xs font-bold px-2 py-1 rounded-full">
                  Save ₹{product.oldPrice - product.price}
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-neutral-500 mt-1">Inclusive of all taxes · {product.weight}</p>

          <p className="mt-6 text-neutral-700 leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.benefits.slice(0, 4).map((b) => (
              <span key={b} className="text-xs bg-emerald-brand/10 text-emerald-brand-dark px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Leaf size={10} /> {b}
              </span>
            ))}
          </div>

          {/* Qty + cart */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center bg-beige-warm rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-beige-soft rounded-full"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-beige-soft rounded-full"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", product, qty });
              }}
              className="flex-1 bg-emerald-brand text-white font-semibold py-3.5 rounded-full hover:bg-emerald-brand-dark transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-brand/20"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: product.id })}
              className={`w-12 h-12 rounded-full border ${
                wished ? "bg-emerald-brand/10 border-emerald-brand text-emerald-brand" : "border-beige-soft"
              } flex items-center justify-center hover:border-emerald-brand transition`}
            >
              <Heart size={16} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <button
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", product, qty });
              router.push("/checkout");
            }}
            className="mt-3 w-full border-2 border-emerald-brand text-emerald-brand font-semibold py-3 rounded-full hover:bg-emerald-brand hover:text-white transition"
          >
            Buy Now
          </button>

          {/* Trust */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
            {[
              { i: Truck, t: "Free shipping ₹499+" },
              { i: ShieldCheck, t: "Secure checkout" },
              { i: Leaf, t: "Authentic Nimari" },
            ].map((it) => (
              <div key={it.t} className="bg-beige-warm rounded-xl p-3 text-center">
                <it.i size={16} className="mx-auto text-emerald-brand mb-1" />
                <div className="font-medium">{it.t}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10 border-b border-beige-soft">
            <div className="flex gap-6">
              {[
                { k: "desc", l: "Story" },
                { k: "nutri", l: "Nutrition" },
                { k: "ship", l: "Shipping" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as typeof tab)}
                  className={`pb-3 text-sm font-semibold border-b-2 transition ${
                    tab === t.k ? "border-emerald-brand text-emerald-brand" : "border-transparent text-neutral-500"
                  }`}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 text-sm text-neutral-700 leading-relaxed">
            {tab === "desc" && (
              <div>
                <p>{product.description}</p>
                <p className="mt-3">
                  <strong>Origin:</strong> {product.origin}
                </p>
              </div>
            )}
            {tab === "nutri" && (
              <table className="w-full">
                <tbody>
                  {product.nutrition.map((n) => (
                    <tr key={n.label} className="border-b border-beige-soft">
                      <td className="py-2.5 text-neutral-500">{n.label}</td>
                      <td className="py-2.5 font-semibold text-right">{n.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "ship" && (
              <ul className="space-y-2 list-disc pl-5">
                <li>Free shipping on all orders above ₹499.</li>
                <li>Same-day dispatch within Khandwa city.</li>
                <li>Pan-India delivery in 2–5 business days.</li>
                <li>7-day return on damaged or unsealed products.</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-24">
        <h2 className="font-display font-bold text-3xl">Recommended for You</h2>
        <p className="text-neutral-500 mt-1 text-sm">More from {product.category}</p>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {recs.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
        </div>
      </section>
    </div>
  );
}

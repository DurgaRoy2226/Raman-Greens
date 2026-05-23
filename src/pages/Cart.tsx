import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore, COUPONS } from "../context/StoreContext";
import { useState } from "react";

export function Cart() {
  const { state, dispatch } = useStore();
  const [coupon, setCoupon] = useState(state.coupon || "");
  const [msg, setMsg] = useState("");

  const subtotal = state.cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const discount = state.coupon ? subtotal * (COUPONS[state.coupon] || 0) : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const apply = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      dispatch({ type: "APPLY_COUPON", code });
      setMsg(`✓ Code applied: ${(COUPONS[code] * 100).toFixed(0)}% off`);
    } else {
      setMsg("✗ Invalid code. Try NIMAR10, KHANDWA15 or FRESH20.");
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-beige-warm flex items-center justify-center text-4xl">
          🛒
        </div>
        <h2 className="font-display font-bold text-3xl mt-6">Your cart awaits Nimari treats</h2>
        <p className="text-neutral-500 mt-2">Discover hand-crafted snacks, organics & gifts from Khandwa.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-brand text-white px-7 py-3.5 rounded-full font-semibold hover:bg-emerald-brand-dark"
        >
          <ShoppingBag size={16} /> Explore the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-beige-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display font-bold text-4xl">Your Cart</h1>
        <p className="text-neutral-500 mt-1">{state.cart.length} item(s) · keeping Nimar warm 🌿</p>

        <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Items */}
          <div className="space-y-3">
            <AnimatePresence>
              {state.cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img src={item.product.image} alt="" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-display font-semibold hover:text-emerald-brand line-clamp-1 text-sm sm:text-base">
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-neutral-500 mt-0.5">{item.product.category} · {item.product.weight}</div>
                      <div className="font-bold mt-1 text-sm sm:text-base">₹{item.product.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t border-neutral-100 sm:border-t-0">
                    <div className="flex items-center bg-beige-warm rounded-full">
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QTY", id: item.product.id, qty: item.qty - 1 })}
                        className="w-8 h-8 flex items-center justify-center hover:bg-beige-soft rounded-full"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QTY", id: item.product.id, qty: item.qty + 1 })}
                        className="w-8 h-8 flex items-center justify-center hover:bg-beige-soft rounded-full"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.product.id })}
                      className="text-neutral-400 hover:text-red-500 p-1 flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      <span className="text-xs sm:hidden">Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-2xl h-fit lg:sticky lg:top-32">
            <h3 className="font-display font-bold text-xl mb-4">Order Summary</h3>

            {/* Coupon */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full pl-9 pr-3 py-2.5 bg-beige-warm rounded-full text-sm focus:outline-none"
                />
              </div>
              <button onClick={apply} className="bg-neutral-900 text-white px-5 rounded-full text-sm font-semibold hover:bg-emerald-brand transition">
                Apply
              </button>
            </div>
            {msg && <p className="text-xs mt-2 text-emerald-brand">{msg}</p>}
            <p className="text-[11px] text-neutral-400 mt-2">Try: NIMAR10 · KHANDWA15 · FRESH20</p>

            <div className="border-t border-beige-soft mt-5 pt-5 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-brand"><span>Discount</span><span>-₹{discount.toFixed(0)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-lg pt-3 border-t border-beige-soft font-display font-bold">
                <span>Total</span><span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 w-full bg-emerald-brand text-white py-3.5 rounded-full font-semibold hover:bg-emerald-brand-dark transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="block text-center text-sm text-neutral-500 mt-3 hover:text-emerald-brand">
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

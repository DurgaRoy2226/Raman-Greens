"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { useStore, COUPONS } from "../context/StoreContext";

const STEPS = [
  { k: 1, l: "Shipping", icon: MapPin },
  { k: 2, l: "Payment", icon: CreditCard },
  { k: 3, l: "Review", icon: ShieldCheck },
];

export function Checkout() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const [addr, setAddr] = useState({
    name: "Aarav Patil",
    phone: "+91 98765 43210",
    line: "12 Padava Road",
    city: "Khandwa",
    state: "Madhya Pradesh",
    pin: "450001",
  });
  const [pay, setPay] = useState<"upi" | "card" | "netbank" | "cod">("upi");

  const subtotal = state.cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const discount = state.coupon ? subtotal * (COUPONS[state.coupon] || 0) : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  if (state.cart.length === 0 && !done) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center px-4">
        <h2 className="font-display font-bold text-3xl">Your cart is empty</h2>
        <Link href="/shop" className="mt-4 inline-block text-emerald-brand underline">Go shopping</Link>
      </div>
    );
  }

  const placeOrder = () => {
    const order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: state.cart,
      total,
      date: new Date().toISOString().slice(0, 10),
      status: "Processing" as const,
      address: `${addr.line}, ${addr.city}, ${addr.state} - ${addr.pin}`,
    };
    dispatch({ type: "PLACE_ORDER", order });
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-beige-warm min-h-screen py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl mx-auto bg-white p-10 rounded-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto rounded-full bg-emerald-brand text-white flex items-center justify-center"
          >
            <Check size={36} strokeWidth={3} />
          </motion.div>
          <h2 className="font-display font-bold text-3xl mt-6">Order Confirmed!</h2>
          <p className="text-neutral-500 mt-2">Thank you, {addr.name.split(" ")[0]}. A piece of Nimar is on its way 🌿</p>
          <p className="text-emerald-brand font-semibold mt-1">via Razorpay · {pay.toUpperCase()}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => router.push("/dashboard")} className="bg-emerald-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-brand-dark">
              Track Order
            </button>
            <Link href="/shop" className="border border-neutral-200 px-6 py-3 rounded-full font-semibold hover:border-emerald-brand">
              Keep Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-beige-warm min-h-screen">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
        <h1 className="font-display font-bold text-3xl">Secure Checkout</h1>

        {/* Stepper */}
        <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.k} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                    step >= s.k
                      ? "bg-emerald-brand text-white"
                      : "bg-white border border-beige-soft text-neutral-400"
                  }`}
                >
                  {step > s.k ? <Check size={16} /> : <s.icon size={16} />}
                </div>
                <span className={`text-xs font-semibold ${step >= s.k ? "text-emerald-brand" : "text-neutral-400"}`}>
                  {s.l}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-12 sm:w-20 ${step > s.k ? "bg-emerald-brand" : "bg-beige-soft"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-white p-7 rounded-2xl">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display font-bold text-xl mb-1">Shipping Address</h2>
                  <p className="text-neutral-500 text-sm mb-5">Where shall we deliver Nimar's freshness?</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      ["name", "Full Name", "sm:col-span-2"],
                      ["phone", "Phone", ""],
                      ["pin", "Pincode", ""],
                      ["line", "Address Line", "sm:col-span-2"],
                      ["city", "City", ""],
                      ["state", "State", ""],
                    ].map(([k, label, cls]) => (
                      <div key={k} className={cls}>
                        <label className="text-xs font-medium text-neutral-500 mb-1 block">{label}</label>
                        <input
                          value={addr[k as keyof typeof addr]}
                          onChange={(e) => setAddr({ ...addr, [k]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-beige-warm focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-6 w-full sm:w-auto bg-emerald-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-brand-dark"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display font-bold text-xl mb-1">Payment</h2>
                  <p className="text-neutral-500 text-sm mb-5">Powered by Razorpay · 256-bit secure</p>

                  <div className="space-y-2">
                    {[
                      { k: "upi", l: "UPI / GPay / PhonePe", e: "📱" },
                      { k: "card", l: "Credit / Debit Card", e: "💳" },
                      { k: "netbank", l: "Netbanking", e: "🏦" },
                      { k: "cod", l: "Cash on Delivery", e: "💵" },
                    ].map((p) => (
                      <button
                        key={p.k}
                        onClick={() => setPay(p.k as typeof pay)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition text-left ${
                          pay === p.k ? "border-emerald-brand bg-emerald-brand/5" : "border-beige-soft hover:border-emerald-brand/40"
                        }`}
                      >
                        <span className="text-2xl">{p.e}</span>
                        <span className="font-semibold">{p.l}</span>
                        {pay === p.k && (
                          <Check size={18} className="ml-auto text-emerald-brand" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-beige-soft hover:border-emerald-brand">
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-emerald-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-brand-dark"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display font-bold text-xl mb-1">Review & Pay</h2>
                  <p className="text-neutral-500 text-sm mb-5">Just one more step!</p>

                  <div className="space-y-4">
                    <div className="bg-beige-warm p-4 rounded-xl">
                      <div className="text-xs font-bold text-neutral-500 uppercase">Shipping to</div>
                      <div className="text-sm mt-1">
                        <b>{addr.name}</b> · {addr.phone}<br />
                        {addr.line}, {addr.city}, {addr.state} - {addr.pin}
                      </div>
                    </div>
                    <div className="bg-beige-warm p-4 rounded-xl">
                      <div className="text-xs font-bold text-neutral-500 uppercase">Payment</div>
                      <div className="text-sm mt-1 capitalize"><b>{pay}</b> via Razorpay</div>
                    </div>
                    <div className="bg-beige-warm p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-neutral-500 uppercase">Items ({state.cart.length})</div>
                      {state.cart.map((c) => (
                        <div key={c.product.id} className="flex justify-between text-sm">
                          <span>{c.product.name} × {c.qty}</span>
                          <span>₹{c.product.price * c.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-beige-soft hover:border-emerald-brand">
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex-1 bg-emerald-brand text-white px-8 py-3.5 rounded-full font-semibold hover:bg-emerald-brand-dark flex items-center justify-center gap-2"
                    >
                      <Lock size={14} /> Pay ₹{total.toFixed(0)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="bg-white p-6 rounded-2xl h-fit lg:sticky lg:top-32">
            <h3 className="font-display font-bold mb-4">Summary</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {state.cart.map((c) => (
                <div key={c.product.id} className="flex gap-3">
                  <img src={c.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 text-sm">
                    <div className="font-medium line-clamp-1">{c.product.name}</div>
                    <div className="text-xs text-neutral-500">Qty: {c.qty}</div>
                  </div>
                  <div className="font-semibold text-sm">₹{c.product.price * c.qty}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-beige-soft pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>₹{subtotal}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-brand"><span>Discount ({state.coupon})</span><span>-₹{discount.toFixed(0)}</span></div>}
              <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-display font-bold text-lg pt-2"><span>Total</span><span>₹{total.toFixed(0)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

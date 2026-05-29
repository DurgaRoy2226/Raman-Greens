import { useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, User, Heart, LogOut, Truck, Check, Clock } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { Link, useNavigate } from "react-router-dom";

const TABS = [
  { k: "orders", l: "Orders", icon: Package },
  { k: "wishlist", l: "Wishlist", icon: Heart },
  { k: "addresses", l: "Addresses", icon: MapPin },
  { k: "profile", l: "Profile", icon: User },
];

export function Dashboard() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");

  const wishProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));
  const user = state.user || { name: "Guest", email: "guest@example.com" };

  return (
    <div className="bg-beige-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-brand to-emerald-brand-dark text-white flex items-center justify-center font-display font-bold text-3xl">
            {user.name[0]}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-emerald-brand text-xs font-bold uppercase tracking-widest">Welcome back</div>
            <h1 className="font-display font-bold text-3xl mt-1">Namaste, {user.name}!</h1>
            <p className="text-neutral-500 text-sm">{user.email}</p>
          </div>
          <div className="flex gap-3 text-center">
            <Stat n={state.orders.length} l="Orders" />
            <Stat n={state.wishlist.length} l="Wishlist" />
            <Stat n="₹2.4k" l="Saved" />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Tabs */}
          <aside className="bg-white rounded-2xl p-2 lg:p-3 h-fit">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
              {TABS.map((t) => (
                <li key={t.k} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setTab(t.k)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                      tab === t.k ? "bg-emerald-brand text-white" : "hover:bg-beige-warm text-neutral-700"
                    }`}
                  >
                    <t.icon size={16} /> {t.l}
                  </button>
                </li>
              ))}
              <li className="shrink-0 lg:shrink">
                <button
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-500 hover:bg-beige-warm whitespace-nowrap cursor-pointer"
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </aside>

          <main>
            {tab === "orders" && <OrdersPanel />}
            {tab === "wishlist" && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-display font-bold text-2xl mb-4">My Wishlist</h2>
                {wishProducts.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500">
                    <Heart size={36} className="mx-auto mb-3 opacity-30" />
                    No favourites yet. Start adding from the shop!
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishProducts.map((p) => (
                      <Link key={p.id} to={`/product/${p.id}`} className="bg-beige-warm rounded-xl p-3 flex gap-3 items-center hover:bg-beige-soft transition">
                        <img src={p.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm line-clamp-1">{p.name}</div>
                          <div className="text-emerald-brand font-bold mt-1">₹{p.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            {tab === "addresses" && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-display font-bold text-2xl mb-4">Saved Addresses</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { l: "Home", a: "12 Padava Road, Khandwa, MP - 450001" },
                    { l: "Office", a: "Tower 3, Nimar Tech Park, Indore, MP - 452010" },
                  ].map((a) => (
                    <div key={a.l} className="border border-beige-soft p-5 rounded-xl">
                      <div className="text-xs font-bold text-emerald-brand uppercase">{a.l}</div>
                      <div className="text-sm mt-2">{a.a}</div>
                      <div className="text-xs text-neutral-500 mt-3">Aarav Patil · +91 98765 43210</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "profile" && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-display font-bold text-2xl mb-5">Profile Details</h2>
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  {[
                    ["Full Name", user.name],
                    ["Email", user.email],
                    ["Phone", "+91 98765 43210"],
                    ["Member since", "March 2024"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="text-xs text-neutral-500 font-medium">{l}</div>
                      <div className="font-semibold mt-1">{v}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-emerald-brand text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-brand-dark">
                  Edit Profile
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: number | string; l: string }) {
  return (
    <div className="bg-beige-warm px-4 py-2 rounded-xl">
      <div className="font-display font-bold text-xl text-emerald-brand">{n}</div>
      <div className="text-[10px] uppercase tracking-wider text-neutral-500">{l}</div>
    </div>
  );
}

function OrdersPanel() {
  const { state } = useStore();
  return (
    <div className="space-y-4">
      {state.orders.map((o) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 lg:p-6"
        >
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="font-display font-bold text-lg">{o.id}</div>
              <div className="text-xs text-neutral-500">Placed on {o.date}</div>
            </div>
            <StatusBadge status={o.status} />
          </div>

          {/* Tracker */}
          <div className="mt-5 flex items-center">
            {["Processing", "Shipped", "Delivered"].map((s, i) => {
              const reached = ["Processing", "Shipped", "Delivered"].indexOf(o.status) >= i;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      reached ? "bg-emerald-brand text-white" : "bg-beige-warm text-neutral-400"
                    }`}
                  >
                    {reached ? <Check size={14} /> : i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-0.5 mx-2 ${reached && i + 1 <= ["Processing", "Shipped", "Delivered"].indexOf(o.status) ? "bg-emerald-brand" : "bg-beige-soft"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] mt-1.5 uppercase tracking-wider text-neutral-500 font-semibold">
            <span>Processing</span><span>Shipped</span><span>Delivered</span>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto no-scrollbar">
            {o.items.map((it) => (
              <div key={it.product.id} className="shrink-0 flex items-center gap-3 bg-beige-warm p-2 rounded-xl">
                <img src={it.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="text-sm">
                  <div className="font-medium">{it.product.name}</div>
                  <div className="text-xs text-neutral-500">Qty: {it.qty}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-beige-soft">
            <div className="text-sm text-neutral-500">Shipping to: {o.address}</div>
            <div className="font-display font-bold text-lg">₹{o.total}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: "Processing" | "Shipped" | "Delivered" }) {
  const map = {
    Processing: { bg: "bg-amber-100 text-amber-800", icon: Clock },
    Shipped: { bg: "bg-blue-100 text-blue-800", icon: Truck },
    Delivered: { bg: "bg-emerald-100 text-emerald-800", icon: Check },
  };
  const Cur = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${Cur.bg}`}>
      <Cur.icon size={12} /> {status}
    </span>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, MapPin, User, Heart, LogOut, Truck, Check, Clock, ChevronRight, Plus, ExternalLink, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TABS = [
  { k: "orders", l: "My Orders", icon: Package },
  { k: "wishlist", l: "Wishlist", icon: Heart },
  { k: "addresses", l: "Saved Addresses", icon: MapPin },
  { k: "profile", l: "Profile Settings", icon: User },
];

export function Dashboard() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState("orders");
  const router = useRouter();

  const wishProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));
  const user = state.user || { name: "Guest User", email: "guest@ramangreens.com" };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <div className="bg-beige-warm/30 min-h-screen pb-20">
      {/* Header Profile Section */}
      <div className="bg-white border-b border-beige-soft pt-12 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-emerald-brand to-emerald-brand-dark text-white flex items-center justify-center font-display font-bold text-4xl shadow-2xl shadow-emerald-brand/20">
                {user.name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-beige-soft">
                <div className="bg-emerald-brand/10 text-emerald-brand p-1.5 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </motion.div>
            
            <div className="flex-1 text-center md:text-left mt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-brand/10 text-emerald-brand text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-pulse" />
                Verified Member
              </div>
              <h1 className="font-display font-bold text-4xl lg:text-5xl text-neutral-900 tracking-tight">Namaste, {user.name.split(' ')[0]}!</h1>
              <p className="text-neutral-500 mt-2 flex items-center justify-center md:justify-start gap-2">
                {user.email} <span className="w-1 h-1 rounded-full bg-neutral-300" /> Member since March 2024
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto mt-6 md:mt-0">
              <StatCard n={state.orders.length} l="Orders" />
              <StatCard n={state.wishlist.length} l="Wishlist" />
              <StatCard n="₹2.4k" l="Saved" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-16 lg:-mt-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Enhanced Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white rounded-[2rem] p-3 shadow-xl shadow-black/5 border border-white/50 backdrop-blur-xl">
              <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar p-1">
                {TABS.map((t) => (
                  <li key={t.k} className="flex-1 lg:flex-none">
                    <button
                      onClick={() => setTab(t.k)}
                      className={`w-full flex items-center justify-center lg:justify-start gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                        tab === t.k 
                          ? "bg-emerald-brand text-white shadow-lg shadow-emerald-brand/20 scale-[1.02]" 
                          : "text-neutral-600 hover:bg-beige-warm/50 hover:text-emerald-brand"
                      }`}
                    >
                      <t.icon size={18} className={`transition-transform duration-300 ${tab === t.k ? "" : "group-hover:scale-110"}`} />
                      <span className="hidden sm:inline lg:inline">{t.l}</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-2 pt-2 border-t border-beige-soft p-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center lg:justify-start gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors group"
                >
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                  <span className="hidden sm:inline lg:inline">Logout Account</span>
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="hidden lg:block bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[2rem] p-6 text-white overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-brand/20 rounded-full blur-2xl group-hover:bg-emerald-brand/40 transition-colors" />
              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Need help?</div>
                <div className="font-display text-lg mb-4">Our Nimari support team is here for you.</div>
                <button className="bg-white text-neutral-900 px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  Chat Now <Plus size={14} />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tab === "orders" && <OrdersPanel />}
                {tab === "wishlist" && <WishlistPanel wishProducts={wishProducts} />}
                {tab === "addresses" && <AddressesPanel />}
                {tab === "profile" && <ProfilePanel user={user} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ n, l }: { n: number | string; l: string }) {
  return (
    <div className="bg-white p-4 lg:p-5 rounded-3xl border border-beige-soft shadow-sm hover:shadow-md transition-shadow">
      <div className="font-display font-bold text-2xl lg:text-3xl text-emerald-brand">{n}</div>
      <div className="text-[10px] lg:text-[11px] uppercase tracking-widest text-neutral-400 font-bold mt-1">{l}</div>
    </div>
  );
}

function OrdersPanel() {
  const { state } = useStore();
  
  if (state.orders.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 lg:p-20 text-center border border-beige-soft shadow-xl shadow-black/5">
        <div className="w-20 h-20 bg-beige-warm rounded-full flex items-center justify-center mx-auto mb-6">
          <Package size={32} className="text-neutral-300" />
        </div>
        <h2 className="font-display font-bold text-2xl">No orders yet</h2>
        <p className="text-neutral-500 mt-2 mb-8 max-w-xs mx-auto">Start exploring Nimar's finest snacks and organics today.</p>
        <Link to="/shop" className="inline-flex bg-emerald-brand text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {state.orders.map((o) => (
        <div
          key={o.id}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-beige-soft shadow-xl shadow-black/5 group"
        >
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-beige-soft pb-6 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-brand">Order ID</span>
                  <div className="font-display font-bold text-xl text-neutral-900">#{o.id}</div>
                </div>
                <div className="text-sm text-neutral-500 mt-1 flex items-center gap-2">
                  <Clock size={14} /> Placed on {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <StatusBadge status={o.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Progress Tracker */}
              <div className="space-y-6">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Order Progress</div>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-beige-soft" />
                  <div className="space-y-8">
                    {["Processing", "Shipped", "Delivered"].map((s, i) => {
                      const stages = ["Processing", "Shipped", "Delivered"];
                      const currentIdx = stages.indexOf(o.status);
                      const isReached = currentIdx >= i;
                      const isLast = i === stages.length - 1;
                      
                      return (
                        <div key={s} className="flex items-center gap-5 relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors duration-500 ${
                            isReached ? "bg-emerald-brand text-white shadow-lg shadow-emerald-brand/30" : "bg-white border-2 border-beige-soft text-neutral-300"
                          }`}>
                            {isReached ? <Check size={14} strokeWidth={3} /> : i + 1}
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${isReached ? "text-neutral-900" : "text-neutral-400"}`}>{s}</div>
                            {isReached && currentIdx === i && (
                              <div className="text-[10px] text-emerald-brand font-bold uppercase mt-0.5 animate-pulse">Current Stage</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Items Summary</div>
                <div className="space-y-3">
                  {o.items.map((it) => (
                    <div key={it.product.id} className="flex items-center gap-4 bg-beige-warm/40 p-3 rounded-2xl hover:bg-beige-warm/60 transition-colors">
                      <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-beige-soft shrink-0">
                        <img 
                          src={it.product.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-neutral-800 truncate">{it.product.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">Qty: {it.qty} × ₹{it.product.price}</div>
                      </div>
                      <div className="text-sm font-bold text-neutral-900">₹{it.qty * it.product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-beige-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-emerald-brand bg-emerald-brand/10 p-2 rounded-lg">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Shipping To</div>
                  <div className="text-sm font-medium text-neutral-700 max-w-xs">{o.address}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Paid</div>
                <div className="text-3xl font-display font-bold text-emerald-brand tracking-tight">₹{o.total}</div>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-beige-warm/40 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:bg-emerald-brand/5 hover:text-emerald-brand transition-all flex items-center justify-center gap-2">
            View Full Details <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function WishlistPanel({ wishProducts }: { wishProducts: any[] }) {
  const { dispatch } = useStore();
  
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-beige-soft shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-3xl text-neutral-900">My Wishlist</h2>
          <p className="text-sm text-neutral-500 mt-1">Products you've saved for later</p>
        </div>
        <Link to="/shop" className="text-emerald-brand font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Browse Shop <ChevronRight size={16} />
        </Link>
      </div>
      
      {wishProducts.length === 0 ? (
        <div className="text-center py-20 bg-beige-warm/20 rounded-[2rem] border-2 border-dashed border-beige-soft">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Heart size={32} className="text-neutral-200" />
          </div>
          <h3 className="font-display font-bold text-2xl text-neutral-800">Your wishlist is empty</h3>
          <p className="text-neutral-500 mt-2 mb-8 max-w-xs mx-auto">Explore Nimar's best collections and save your favourites here.</p>
          <Link to="/shop" className="bg-emerald-brand text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {wishProducts.map((p) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }} 
              key={p.id}
            >
              <div className="bg-beige-warm/30 rounded-3xl p-4 border border-transparent hover:border-emerald-brand/20 hover:bg-white transition-all duration-300 relative group">
                <Link to={`/product/${p.id}`} className="block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
                    <img 
                      src={p.image} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600";
                      }}
                    />
                  </div>
                  <div className="font-bold text-neutral-900 line-clamp-1">{p.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-emerald-brand font-black">₹{p.price}</div>
                    <div className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                      <Plus size={10} /> Details
                    </div>
                  </div>
                </Link>
                <button 
                  onClick={() => dispatch({ type: "TOGGLE_WISHLIST", id: p.id })}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur p-2 rounded-xl text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-90"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddressesPanel() {
  const [addresses, setAddresses] = useState([
    { id: 1, l: "Home", a: "12 Padava Road, Khandwa, MP - 450001", isDefault: true },
    { id: 2, l: "Office", a: "Tower 3, Nimar Tech Park, Indore, MP - 452010", isDefault: false },
  ]);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-beige-soft shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-3xl text-neutral-900">Delivery Addresses</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage your shipping locations</p>
        </div>
        <button className="bg-emerald-brand text-white px-6 py-3 rounded-2xl text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-emerald-brand/20">
          <Plus size={16} /> Add New
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        {addresses.map((a) => (
          <div key={a.id} className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 ${a.isDefault ? "border-emerald-brand/30 bg-emerald-brand/[0.02]" : "border-beige-soft hover:border-emerald-brand/20 hover:bg-beige-warm/10"}`}>
            {a.isDefault && (
              <div className="absolute -top-3 left-6 bg-emerald-brand text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-brand/20">
                Default Address
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-brand border border-beige-soft">
                {a.l === "Home" ? <MapPin size={20} /> : <Package size={20} />}
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold text-neutral-400 hover:text-emerald-brand uppercase tracking-widest px-2 py-1">Edit</button>
                <button className="text-[10px] font-bold text-neutral-400 hover:text-red-500 uppercase tracking-widest px-2 py-1">Remove</button>
              </div>
            </div>
            <div className="font-bold text-neutral-900 text-lg mb-1">{a.l}</div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">{a.a}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-beige-soft text-xs text-neutral-500">
              <span className="font-bold text-neutral-800">Aarav Patil</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePanel({ user }: { user: any }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-beige-soft shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display font-bold text-3xl text-neutral-900">Profile Settings</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage your personal information</p>
        </div>
        <button className="text-emerald-brand font-bold text-sm bg-emerald-brand/10 px-6 py-2.5 rounded-2xl hover:bg-emerald-brand hover:text-white transition-all">
          Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-6">
          <SectionTitle title="Account Information" />
          <div className="grid gap-6">
            <InfoField label="Full Name" value={user.name} />
            <InfoField label="Email Address" value={user.email} />
            <InfoField label="Phone Number" value="+91 98765 43210" isVerified />
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle title="Security & Preferences" />
          <div className="grid gap-6">
            <div className="p-5 rounded-3xl bg-beige-warm/30 border border-beige-soft">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Login Security</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold">Password</div>
                <button className="text-xs font-bold text-emerald-brand">Change</button>
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Last changed 4 months ago</div>
            </div>
            
            <div className="p-5 rounded-3xl bg-beige-warm/30 border border-beige-soft">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Newsletter</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold">Nimari Weekly Treats</div>
                <div className="w-10 h-5 bg-emerald-brand rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 p-6 rounded-3xl bg-neutral-900 text-white flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-brand/20 rounded-2xl flex items-center justify-center text-emerald-brand">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="font-bold">Two-Factor Authentication</div>
            <div className="text-xs opacity-60">Add an extra layer of security to your account.</div>
          </div>
        </div>
        <button className="bg-emerald-brand px-6 py-2.5 rounded-xl text-xs font-bold hover:scale-105 transition-transform">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 bg-emerald-brand rounded-full" />
      <h3 className="font-display font-bold text-xl text-neutral-800">{title}</h3>
    </div>
  );
}

function InfoField({ label, value, isVerified }: { label: string; value: string; isVerified?: boolean }) {
  return (
    <div>
      <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="font-bold text-neutral-800">{value}</div>
        {isVerified && (
          <div className="bg-emerald-brand/10 text-emerald-brand p-0.5 rounded-full">
            <Check size={10} strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Processing" | "Shipped" | "Delivered" }) {
  const map = {
    Processing: { bg: "bg-amber-100 text-amber-700", icon: Clock },
    Shipped: { bg: "bg-blue-100 text-blue-700", icon: Truck },
    Delivered: { bg: "bg-emerald-100 text-emerald-700", icon: Check },
  };
  const Cur = map[status];
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest ${Cur.bg} shadow-sm`}>
      <Cur.icon size={14} /> {status}
    </span>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Users, TrendingUp, IndianRupee, Edit, Trash2, Plus, Lock } from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";

export function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editing, setEditing] = useState<Product | null>(null);
  const { state, dispatch } = useStore();

  if (!unlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-beige-warm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-brand/10 text-emerald-brand flex items-center justify-center">
            <Lock size={26} />
          </div>
          <h2 className="font-display font-bold text-2xl mt-5">Admin Panel</h2>
          <p className="text-sm text-neutral-500 mt-1">Restricted access · Raman Greens KNW</p>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setUnlocked(true)}
            placeholder="Enter passcode (any value)"
            className="w-full mt-6 px-4 py-3 bg-beige-warm rounded-full text-sm focus:outline-none text-center"
          />
          <button
            onClick={() => setUnlocked(true)}
            className="mt-3 w-full bg-emerald-brand text-white py-3 rounded-full font-semibold hover:bg-emerald-brand-dark"
          >
            Unlock Admin
          </button>
          <p className="mt-4 text-[11px] text-neutral-400">Demo · click unlock</p>
        </motion.div>
      </div>
    );
  }

  const totalRev = state.orders.reduce((s, o) => s + o.total, 0);
  const stockValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  const stats = [
    { l: "Revenue", v: `₹${totalRev.toLocaleString()}`, c: "+12%", i: IndianRupee },
    { l: "Orders", v: state.orders.length, c: "+3", i: Package },
    { l: "Customers", v: 1248, c: "+24", i: Users },
    { l: "Stock Value", v: `₹${(stockValue / 1000).toFixed(1)}k`, c: "stable", i: TrendingUp },
  ];

  const removeProduct = (id: string) => setProducts(products.filter((p) => p.id !== id));
  const saveProduct = (p: Product) => {
    if (products.find((x) => x.id === p.id)) {
      setProducts(products.map((x) => (x.id === p.id ? p : x)));
    } else {
      setProducts([{ ...p, id: `p${Date.now()}` }, ...products]);
    }
    setEditing(null);
  };

  return (
    <div className="bg-beige-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-emerald-brand text-xs font-bold tracking-widest uppercase">Admin</div>
            <h1 className="font-display font-bold text-3xl mt-1">Control Centre</h1>
            <p className="text-neutral-500 text-sm">Real-time view of Raman Greens KNW</p>
          </div>
          <button
            onClick={() =>
              setEditing({
                id: "",
                name: "",
                category: "Snacks",
                price: 0,
                rating: 0,
                reviews: 0,
                image: "",
                gallery: [],
                description: "",
                benefits: [],
                nutrition: [],
                tags: [],
                stock: 0,
                weight: "",
                origin: "Khandwa, MP",
              })
            }
            className="bg-emerald-brand text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-brand-dark inline-flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 rounded-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">{s.l}</div>
                  <div className="font-display font-bold text-3xl mt-2">{s.v}</div>
                  <div className="text-xs text-emerald-brand mt-1 font-semibold">{s.c}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center">
                  <s.i size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sales chart (simple bars) */}
        <div className="mt-6 bg-white rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg">Sales — Last 7 days</h3>
          <div className="mt-5 flex items-end gap-2 h-40">
            {[40, 65, 35, 80, 55, 95, 72].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.1 * i, type: "spring" }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-brand to-emerald-brand-light"
                />
                <span className="text-[10px] text-neutral-500">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="mt-6 bg-white rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-neutral-500 border-b border-beige-soft">
                  <th className="py-3">Order</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {state.orders.map((o) => (
                  <tr key={o.id} className="border-b border-beige-soft last:border-0">
                    <td className="py-3 font-semibold">{o.id}</td>
                    <td>{o.date}</td>
                    <td>₹{o.total}</td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_ORDER_STATUS",
                            id: o.id,
                            status: e.target.value as "Processing" | "Shipped" | "Delivered",
                          })
                        }
                        className="bg-beige-warm text-xs px-3 py-1.5 rounded-full font-semibold"
                      >
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory */}
        <div className="mt-6 bg-white rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Inventory ({products.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-neutral-500 border-b border-beige-soft">
                  <th className="py-3">Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-beige-soft last:border-0">
                    <td className="py-3 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold">{p.name}</span>
                    </td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          p.stock < 25 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => setEditing(p)} className="p-2 hover:text-emerald-brand">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => removeProduct(p.id)} className="p-2 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setEditing(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-2xl mb-4">{editing.id ? "Edit" : "Add"} Product</h3>
            <div className="space-y-3">
              {[
                ["name", "Name"],
                ["price", "Price"],
                ["stock", "Stock"],
                ["weight", "Weight"],
                ["image", "Image URL"],
                ["description", "Description"],
              ].map(([k, l]) => (
                <div key={k}>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">{l}</label>
                  <input
                    value={(editing as Record<string, unknown>)[k] as string | number}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        [k]: ["price", "stock"].includes(k) ? Number(e.target.value) : e.target.value,
                      } as Product)
                    }
                    className="w-full px-4 py-2.5 bg-beige-warm rounded-lg text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as Product["category"] })}
                  className="w-full px-4 py-2.5 bg-beige-warm rounded-lg text-sm"
                >
                  {["Snacks", "Organics", "Sweets", "Spices", "Gifting"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-3 rounded-full border border-beige-soft">
                Cancel
              </button>
              <button
                onClick={() =>
                  saveProduct({
                    ...editing,
                    image: editing.image || "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600",
                    gallery: editing.gallery.length ? editing.gallery : [editing.image || ""],
                  })
                }
                className="flex-1 bg-emerald-brand text-white px-4 py-3 rounded-full font-semibold hover:bg-emerald-brand-dark"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { CheckCircle, Clock, TrendingUp, AlertCircle, Search } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const SAMPLE_ORDERS = [
  { id: "ORD-1091", customer: "Priya Sharma", items: "Tomatoes, Spinach", amount: 320, date: "2026-05-18", status: "Delivered" },
  { id: "ORD-1085", customer: "Rahul Verma", items: "Apples, Bananas", amount: 560, date: "2026-05-17", status: "Processing" },
  { id: "ORD-1079", customer: "Anita Joshi", items: "Capsicum, Carrot", amount: 210, date: "2026-05-16", status: "Shipped" },
  { id: "ORD-1074", customer: "Suresh Patel", items: "Grapes, Mango", amount: 780, date: "2026-05-15", status: "Cancelled" },
  { id: "ORD-1068", customer: "Kavita Singh", items: "Broccoli, Peas", amount: 430, date: "2026-05-14", status: "Delivered" },
  { id: "ORD-1062", customer: "Mohit Kumar", items: "Orange, Kiwi", amount: 650, date: "2026-05-13", status: "Processing" },
  { id: "ORD-1055", customer: "Deepa Nair", items: "Garlic, Ginger", amount: 180, date: "2026-05-12", status: "Shipped" },
  { id: "ORD-1049", customer: "Arjun Mehra", items: "Cauliflower, Beans", amount: 295, date: "2026-05-11", status: "Delivered" },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-600",
};
const STATUS_ICON: Record<string, typeof CheckCircle> = {
  Delivered: CheckCircle,
  Processing: Clock,
  Shipped: TrendingUp,
  Cancelled: AlertCircle,
};

const FILTERS = ["All", "Delivered", "Processing", "Shipped", "Cancelled"];

export function OrdersView({ dm }: { dm: boolean }) {
  const { state, dispatch } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const storeOrders = state.orders.map(o => ({
    id: o.id,
    customer: state.user?.name ?? "Guest",
    items: o.items.map(i => i.product.name).join(", "),
    amount: o.total,
    date: o.date,
    status: o.status,
  }));

  const all = [...storeOrders, ...SAMPLE_ORDERS];
  const filtered = all.filter(o =>
    (filter === "All" || o.status === filter) &&
    (o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()))
  );

  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";
  const row = dm ? "border-gray-700 hover:bg-gray-750" : "border-gray-50 hover:bg-gray-50";

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Orders</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>{all.length} total orders</p>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Delivered", count: all.filter(o => o.status === "Delivered").length, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          { label: "Processing", count: all.filter(o => o.status === "Processing").length, cls: "bg-amber-50 text-amber-700 border-amber-200" },
          { label: "Shipped", count: all.filter(o => o.status === "Shipped").length, cls: "bg-blue-50 text-blue-700 border-blue-200" },
          { label: "Cancelled", count: all.filter(o => o.status === "Cancelled").length, cls: "bg-red-50 text-red-600 border-red-200" },
        ].map(s => (
          <div key={s.label} className={`border rounded-xl px-4 py-3 ${s.cls}`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${dm ? "bg-gray-700 text-gray-200" : "bg-gray-100"}`}>
          <Search size={14} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search orders..." className="bg-transparent outline-none text-sm w-36" />
        </div>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl transition
              ${filter === f ? "bg-emerald-500 text-white" : dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`${card} border rounded-2xl overflow-hidden shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left text-xs font-semibold uppercase tracking-wider border-b ${dm ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-100"}`}>
                {["Order ID", "Customer", "Items", "Amount", "Date", "Status", "Action"].map(h => (
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const SIcon = STATUS_ICON[order.status] ?? Clock;
                const isStore = state.orders.find(o => o.id === order.id);
                return (
                  <tr key={order.id + i} className={`border-b last:border-0 transition-colors ${row}`}>
                    <td className="px-5 py-3.5">
                      <span className="font-mono font-semibold text-emerald-600 text-xs">{order.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {order.customer[0]}
                        </div>
                        <span className={`font-medium text-xs ${text}`}>{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 max-w-[130px]">
                      <span className={`text-xs truncate block ${sub}`}>{order.items}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-semibold ${text}`}>₹{order.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs ${sub}`}>{order.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        <SIcon size={10} /> {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {isStore ? (
                        <select value={order.status}
                          onChange={e => dispatch({ type: "UPDATE_ORDER_STATUS", id: order.id, status: e.target.value as "Processing" | "Shipped" | "Delivered" })}
                          className={`text-xs px-2 py-1 rounded-lg border outline-none ${dm ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-200"}`}>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      ) : (
                        <button className={`text-xs px-3 py-1 rounded-lg font-medium ${dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition`}>
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className={`text-center py-10 ${sub}`}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

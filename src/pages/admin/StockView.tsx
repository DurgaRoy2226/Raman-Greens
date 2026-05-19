import { PRODUCTS } from "../../data/products";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";

export function StockView({ dm }: { dm: boolean }) {
  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";
  const row = dm ? "border-gray-700 hover:bg-gray-750" : "border-gray-50 hover:bg-gray-50";

  const lowStock = PRODUCTS.filter(p => p.stock < 25);
  const inStock = PRODUCTS.filter(p => p.stock >= 25);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Stock Management</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>{PRODUCTS.length} products tracked</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Products", value: PRODUCTS.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "In Stock", value: inStock.length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Low Stock", value: lowStock.length, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${card} border rounded-2xl p-5 shadow-sm flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className={`text-xs font-medium mt-0.5 ${sub}`}>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">Low Stock Alert</p>
            <p className="text-xs text-red-500 mt-0.5">{lowStock.length} products need restocking: {lowStock.slice(0, 3).map(p => p.name).join(", ")}{lowStock.length > 3 ? "..." : ""}</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`${card} border rounded-2xl overflow-hidden shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left text-xs font-semibold uppercase tracking-wider border-b ${dm ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-100"}`}>
                {["Product", "Category", "Price", "Stock", "Stock Value", "Status"].map(h => (
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(p => (
                <tr key={p.id} className={`border-b last:border-0 transition-colors ${row}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                      <span className={`font-semibold text-xs ${text}`}>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full ${dm ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-semibold text-sm ${text}`}>₹{p.price}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-bold text-sm ${p.stock < 25 ? "text-red-500" : "text-emerald-600"}`}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium ${sub}`}>₹{(p.price * p.stock).toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                      ${p.stock === 0 ? "bg-red-100 text-red-600"
                        : p.stock < 25 ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"}`}>
                      {p.stock === 0 ? "Out of Stock" : p.stock < 25 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

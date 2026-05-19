import { TrendingUp, IndianRupee, ShoppingCart, Users } from "lucide-react";

const MONTHLY = [
  { month: "Nov", rev: 18200, orders: 42 },
  { month: "Dec", rev: 24500, orders: 61 },
  { month: "Jan", rev: 21000, orders: 53 },
  { month: "Feb", rev: 31500, orders: 78 },
  { month: "Mar", rev: 27800, orders: 69 },
  { month: "Apr", rev: 38200, orders: 95 },
  { month: "May", rev: 32600, orders: 82 },
];
const maxRev = Math.max(...MONTHLY.map(m => m.rev));

const TOP_PRODUCTS = [
  { name: "Fresh Tomatoes", sales: 312, revenue: 15600, trend: "+18%" },
  { name: "Baby Spinach", sales: 289, revenue: 12980, trend: "+12%" },
  { name: "Premium Mangoes", sales: 245, revenue: 22050, trend: "+22%" },
  { name: "Organic Apples", sales: 198, revenue: 17820, trend: "+9%" },
  { name: "Green Capsicum", sales: 176, revenue: 7040, trend: "+5%" },
];

export function ReportsView({ dm }: { dm: boolean }) {
  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";

  const totalRev = MONTHLY.reduce((s, m) => s + m.rev, 0);
  const totalOrders = MONTHLY.reduce((s, m) => s + m.orders, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Reports & Analytics</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>Last 7 months performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: `₹${(totalRev / 1000).toFixed(1)}k`, icon: IndianRupee, color: "emerald" },
          { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "blue" },
          { label: "Avg Order Value", value: `₹${Math.round(totalRev / totalOrders)}`, icon: TrendingUp, color: "violet" },
          { label: "Customers Served", value: "1,248", icon: Users, color: "amber" },
        ].map(kpi => {
          const Icon = kpi.icon;
          const clr: Record<string, string> = {
            emerald: "bg-emerald-50 text-emerald-600",
            blue: "bg-blue-50 text-blue-600",
            violet: "bg-violet-50 text-violet-600",
            amber: "bg-amber-50 text-amber-600",
          };
          return (
            <div key={kpi.label} className={`${card} border rounded-2xl p-5 shadow-sm`}>
              <div className={`w-10 h-10 rounded-xl ${clr[kpi.color]} flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <p className={`text-2xl font-bold ${text}`}>{kpi.value}</p>
              <p className={`text-xs font-medium mt-1 ${sub}`}>{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Bar Chart */}
      <div className={`${card} border rounded-2xl p-6 shadow-sm mb-5`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`font-bold text-base ${text}`}>Monthly Revenue</h2>
            <p className={`text-xs ${sub} mt-0.5`}>Nov 2025 – May 2026</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">₹{(totalRev / 1000).toFixed(1)}k Total</span>
        </div>
        <div className="flex items-end gap-3 h-44">
          {MONTHLY.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className={`text-[10px] font-semibold ${sub}`}>₹{(m.rev / 1000).toFixed(1)}k</span>
              <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: "120px" }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 transition-all duration-300 cursor-pointer"
                  style={{ height: `${(m.rev / maxRev) * 100}%` }}
                />
              </div>
              <span className={`text-[10px] font-medium ${sub}`}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className={`${card} border rounded-2xl p-6 shadow-sm`}>
        <h2 className={`font-bold text-base mb-4 ${text}`}>Top Selling Products</h2>
        <div className="space-y-4">
          {TOP_PRODUCTS.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <span className={`text-lg font-bold w-6 ${i === 0 ? "text-amber-500" : sub}`}>#{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1.5">
                  <span className={`text-sm font-semibold ${text}`}>{p.name}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{p.trend}</span>
                </div>
                <div className={`h-2 rounded-full ${dm ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                    style={{ width: `${(p.sales / TOP_PRODUCTS[0].sales) * 100}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className={`text-[11px] ${sub}`}>{p.sales} units sold</span>
                  <span className={`text-[11px] font-semibold ${sub}`}>₹{p.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

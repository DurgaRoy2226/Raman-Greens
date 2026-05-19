import { useState } from "react";
import { CheckCircle, Clock, XCircle, Truck, RefreshCw } from "lucide-react";

const REQUESTS = [
  { id: "REQ-201", user: "Priya Sharma", type: "Return", product: "Green Capsicum", reason: "Product not fresh on delivery", date: "2026-05-17", status: "Pending" },
  { id: "REQ-199", user: "Rahul Verma", type: "Refund", product: "Baby Spinach", reason: "Wrong item delivered", date: "2026-05-16", status: "Approved" },
  { id: "REQ-196", user: "Suresh Patel", type: "Exchange", product: "Organic Apples", reason: "Damaged packaging", date: "2026-05-15", status: "Resolved" },
  { id: "REQ-193", user: "Anita Joshi", type: "Delivery", product: "Fresh Tomatoes", reason: "Order not delivered yet", date: "2026-05-14", status: "Pending" },
  { id: "REQ-190", user: "Kavita Singh", type: "Refund", product: "Premium Mangoes", reason: "Quality below expectation", date: "2026-05-13", status: "Rejected" },
  { id: "REQ-187", user: "Mohit Kumar", type: "Exchange", product: "Broccoli", reason: "Received different variety", date: "2026-05-12", status: "Approved" },
];

const TYPE_COLOR: Record<string, string> = {
  Return: "bg-orange-100 text-orange-700",
  Refund: "bg-red-100 text-red-600",
  Exchange: "bg-blue-100 text-blue-700",
  Delivery: "bg-violet-100 text-violet-700",
};
const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Resolved: "bg-gray-100 text-gray-600",
  Rejected: "bg-red-100 text-red-600",
};
const STATUS_ICON: Record<string, typeof Clock> = {
  Pending: Clock,
  Approved: CheckCircle,
  Resolved: RefreshCw,
  Rejected: XCircle,
};

export function RequestsView({ dm }: { dm: boolean }) {
  const [filter, setFilter] = useState("All");
  const filtered = REQUESTS.filter(r => filter === "All" || r.status === filter);

  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Customer Requests</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>{REQUESTS.length} requests received</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["Pending", "Approved", "Resolved", "Rejected"].map(s => {
          const Icon = STATUS_ICON[s];
          const count = REQUESTS.filter(r => r.status === s).length;
          return (
            <div key={s} className={`${card} border rounded-2xl p-4 shadow-sm flex items-center gap-3`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLOR[s]}`}>{count}</span>
              <div>
                <p className={`text-sm font-semibold ${text}`}>{s}</p>
                <Icon size={12} className={sub} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["All", "Pending", "Approved", "Resolved", "Rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition
              ${filter === f ? "bg-emerald-500 text-white" : dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-3">
        {filtered.map(r => {
          const SIcon = STATUS_ICON[r.status];
          return (
            <div key={r.id} className={`${card} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-emerald-600">{r.id}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLOR[r.type]}`}>{r.type}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${STATUS_COLOR[r.status]}`}>
                      <SIcon size={10} /> {r.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">{r.user[0]}</div>
                    <p className={`font-semibold text-sm ${text}`}>{r.user}</p>
                    <span className={`text-xs ${sub}`}>· {r.date}</span>
                  </div>
                  <p className={`text-xs ${sub} mt-1`}>
                    Product: <span className={`font-medium ${dm ? "text-gray-300" : "text-gray-700"}`}>{r.product}</span>
                    {" · "}Reason: {r.reason}
                  </p>
                </div>
                {r.status === "Pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition flex items-center gap-1">
                      <CheckCircle size={12} /> Approve
                    </button>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition flex items-center gap-1">
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                )}
                {r.status === "Approved" && (
                  <button className="px-3 py-1.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition flex items-center gap-1 shrink-0">
                    <Truck size={12} /> Process
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className={`text-center py-12 ${sub}`}>No requests found.</div>
        )}
      </div>
    </div>
  );
}

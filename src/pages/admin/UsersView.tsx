import { useState } from "react";
import { Search, UserCheck, UserX, Mail, Phone, MapPin } from "lucide-react";

const USERS = [
  { id: 1, name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", location: "Mumbai", orders: 12, spent: 4320, joined: "2025-11-01", active: true },
  { id: 2, name: "Rahul Verma", email: "rahul@email.com", phone: "+91 87654 32109", location: "Delhi", orders: 7, spent: 2890, joined: "2025-12-14", active: true },
  { id: 3, name: "Anita Joshi", email: "anita@email.com", phone: "+91 76543 21098", location: "Pune", orders: 3, spent: 980, joined: "2026-01-05", active: false },
  { id: 4, name: "Suresh Patel", email: "suresh@email.com", phone: "+91 65432 10987", location: "Ahmedabad", orders: 19, spent: 7650, joined: "2025-09-20", active: true },
  { id: 5, name: "Kavita Singh", email: "kavita@email.com", phone: "+91 54321 09876", location: "Bangalore", orders: 5, spent: 1750, joined: "2026-02-10", active: true },
  { id: 6, name: "Mohit Kumar", email: "mohit@email.com", phone: "+91 43210 98765", location: "Khandwa", orders: 9, spent: 3200, joined: "2025-10-30", active: false },
  { id: 7, name: "Deepa Nair", email: "deepa@email.com", phone: "+91 32109 87654", location: "Chennai", orders: 14, spent: 5680, joined: "2025-08-15", active: true },
  { id: 8, name: "Arjun Mehra", email: "arjun@email.com", phone: "+91 21098 76543", location: "Hyderabad", orders: 2, spent: 450, joined: "2026-03-22", active: true },
];

export function UsersView({ dm }: { dm: boolean }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = USERS.filter(u =>
    (filter === "All" || (filter === "Active" ? u.active : !u.active)) &&
    (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  );

  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Users</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>{USERS.length} registered users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total Users", value: USERS.length, color: "text-emerald-600" },
          { label: "Active", value: USERS.filter(u => u.active).length, color: "text-blue-600" },
          { label: "Inactive", value: USERS.filter(u => !u.active).length, color: "text-red-500" },
        ].map(s => (
          <div key={s.label} className={`${card} border rounded-2xl p-4 shadow-sm`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className={`text-xs mt-1 font-medium ${sub}`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${dm ? "bg-gray-700 text-gray-200" : "bg-gray-100"}`}>
          <Search size={14} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users..." className="bg-transparent outline-none text-sm w-36" />
        </div>
        {["All", "Active", "Inactive"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl transition
              ${filter === f ? "bg-emerald-500 text-white" : dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(u => (
          <div key={u.id} className={`${card} border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-base">
                  {u.name[0]}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${text}`}>{u.name}</p>
                  <p className={`text-xs ${sub}`}>Joined {u.joined}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                {u.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className={`space-y-1.5 text-xs ${sub}`}>
              <div className="flex items-center gap-2"><Mail size={12} />{u.email}</div>
              <div className="flex items-center gap-2"><Phone size={12} />{u.phone}</div>
              <div className="flex items-center gap-2"><MapPin size={12} />{u.location}</div>
            </div>
            <div className={`flex justify-between mt-4 pt-3 border-t ${dm ? "border-gray-700" : "border-gray-100"}`}>
              <div className="text-center">
                <p className={`font-bold text-sm ${text}`}>{u.orders}</p>
                <p className={`text-[10px] ${sub}`}>Orders</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-emerald-600">₹{u.spent.toLocaleString()}</p>
                <p className={`text-[10px] ${sub}`}>Spent</p>
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"><UserCheck size={13} /></button>
                <button className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"><UserX size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

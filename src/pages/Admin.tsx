import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart2,
  LogOut, Bell, Search, TrendingUp, IndianRupee,
  Menu, X, ChevronDown, Star, AlertCircle, CheckCircle, Clock,
  MessageSquare, FileText, Boxes
} from "lucide-react";

import { ProductsView } from "./admin/ProductsView";
import { OrdersView } from "./admin/OrdersView";
import { UsersView } from "./admin/UsersView";
import { StockView } from "./admin/StockView";
import { ReportsView } from "./admin/ReportsView";
import { FeedbackView } from "./admin/FeedbackView";
import { RequestsView } from "./admin/RequestsView";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Package,         label: "Products",  id: "products"  },
  { icon: ShoppingCart,    label: "Orders",    id: "orders"    },
  { icon: Users,           label: "Users",     id: "users"     },
  { icon: Boxes,           label: "Stock",     id: "stock"     },
  { icon: BarChart2,       label: "Reports",   id: "reports"   },
  { icon: MessageSquare,   label: "Feedback",  id: "feedback"  },
  { icon: FileText,        label: "Requests",  id: "requests"  },
];

const WEEKLY = [42, 68, 53, 89, 61, 97, 74];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const SAMPLE_ORDERS = [
  { id:"ORD-1091", customer:"Priya Sharma",  items:"Tomatoes, Spinach",   amount:320,  date:"2026-05-18", status:"Delivered"  },
  { id:"ORD-1085", customer:"Rahul Verma",   items:"Apples, Bananas",     amount:560,  date:"2026-05-17", status:"Processing" },
  { id:"ORD-1079", customer:"Anita Joshi",   items:"Capsicum, Carrot",    amount:210,  date:"2026-05-16", status:"Shipped"    },
  { id:"ORD-1074", customer:"Suresh Patel",  items:"Grapes, Mango",       amount:780,  date:"2026-05-15", status:"Cancelled"  },
  { id:"ORD-1068", customer:"Kavita Singh",  items:"Broccoli, Peas",      amount:430,  date:"2026-05-14", status:"Delivered"  },
  { id:"ORD-1062", customer:"Mohit Kumar",   items:"Orange, Kiwi",        amount:650,  date:"2026-05-13", status:"Processing" },
];

const STATUS_STYLE: Record<string,string> = {
  Delivered:  "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100  text-amber-700",
  Shipped:    "bg-blue-100   text-blue-700",
  Cancelled:  "bg-red-100    text-red-600",
};
const STATUS_ICON: Record<string, typeof CheckCircle> = {
  Delivered: CheckCircle, Processing: Clock,
  Shipped: TrendingUp,    Cancelled: AlertCircle,
};

// ─── Dashboard Overview (inline) ───────────────────────────────────────────
function DashboardView({ dm, allOrders }: { dm: boolean; allOrders: typeof SAMPLE_ORDERS }) {
  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub  = dm ? "text-gray-400" : "text-gray-500";
  const row  = dm ? "border-gray-700 hover:bg-gray-900" : "border-gray-50 hover:bg-gray-50";

  const totalRev = allOrders.reduce((s,o) => s + o.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Dashboard Overview</h1>
        <p className={`text-sm mt-1 ${sub}`}>Welcome back, Admin · Raman Greens</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Total Revenue",  value:`₹${totalRev.toLocaleString()}`, change:"+12.5%", icon:IndianRupee, color:"emerald" },
          { label:"Total Orders",   value:allOrders.length,                 change:"+8.2%",  icon:ShoppingCart, color:"blue"    },
          { label:"Total Products", value:PRODUCTS.length,                  change:"+3",     icon:Package,      color:"violet"  },
          { label:"Total Users",    value:"1,248",                          change:"+24",    icon:Users,        color:"amber"   },
        ].map(c => {
          const Icon = c.icon;
          const clr: Record<string,{icon:string;badge:string}> = {
            emerald:{ icon:"bg-emerald-100 text-emerald-600", badge:"bg-emerald-50 text-emerald-600" },
            blue:   { icon:"bg-blue-100 text-blue-600",       badge:"bg-blue-50 text-blue-600"       },
            violet: { icon:"bg-violet-100 text-violet-600",   badge:"bg-violet-50 text-violet-600"   },
            amber:  { icon:"bg-amber-100 text-amber-600",     badge:"bg-amber-50 text-amber-600"     },
          };
          return (
            <div key={c.label}
              className={`${card} border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${sub}`}>{c.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${text}`}>{c.value}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 px-2 py-0.5 rounded-full ${clr[c.color].badge}`}>
                    <TrendingUp size={10}/> {c.change} this month
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${clr[c.color].icon} flex items-center justify-center shrink-0`}>
                  <Icon size={22}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Weekly Revenue Bar */}
        <div className={`lg:col-span-2 ${card} border rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`font-bold text-base ${text}`}>Weekly Revenue</h2>
              <p className={`text-xs mt-0.5 ${sub}`}>Sales performance this week</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+18.4%</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {WEEKLY.map((h,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full relative rounded-t-lg overflow-hidden" style={{height:"120px"}}>
                  <div className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-700 cursor-pointer
                    ${h === Math.max(...WEEKLY)
                      ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                      : dm ? "bg-gray-600 hover:bg-emerald-500" : "bg-gray-100 hover:bg-emerald-200"}`}
                    style={{height:`${h}%`}}
                  />
                </div>
                <span className={`text-[10px] font-medium ${sub}`}>{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
          <h2 className={`font-bold text-base mb-4 ${text}`}>Top Categories</h2>
          {[
            { name:"Vegetables", pct:45, color:"bg-emerald-500" },
            { name:"Fruits",     pct:30, color:"bg-blue-500"    },
            { name:"Organics",   pct:15, color:"bg-violet-500"  },
            { name:"Others",     pct:10, color:"bg-amber-400"   },
          ].map(c => (
            <div key={c.name} className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className={`font-medium ${dm?"text-gray-300":"text-gray-700"}`}>{c.name}</span>
                <span className={`font-bold ${sub}`}>{c.pct}%</span>
              </div>
              <div className={`h-2 rounded-full ${dm?"bg-gray-700":"bg-gray-100"}`}>
                <div className={`h-2 rounded-full ${c.color}`} style={{width:`${c.pct}%`}}/>
              </div>
            </div>
          ))}
          <div className={`mt-4 pt-4 border-t ${dm?"border-gray-700":"border-gray-100"} flex items-center gap-2`}>
            <Star size={14} className="text-emerald-500"/>
            <span className={`text-xs ${sub}`}>Best seller: <strong>Fresh Tomatoes</strong></span>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className={`${card} border rounded-2xl shadow-sm`}>
        <div className={`flex items-center justify-between px-6 py-4 border-b ${dm?"border-gray-700":"border-gray-100"}`}>
          <div>
            <h2 className={`font-bold text-base ${text}`}>Recent Orders</h2>
            <p className={`text-xs mt-0.5 ${sub}`}>{allOrders.length} orders total</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left text-xs font-semibold uppercase tracking-wider border-b
                ${dm?"text-gray-500 border-gray-700":"text-gray-400 border-gray-100"}`}>
                {["Order ID","Customer","Items","Amount","Date","Status"].map(h=>(
                  <th key={h} className="px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allOrders.map((o,i) => {
                const SIcon = STATUS_ICON[o.status] ?? Clock;
                return (
                  <tr key={o.id+i} className={`border-b last:border-0 transition-colors ${row}`}>
                    <td className="px-6 py-4"><span className="font-mono font-semibold text-emerald-600 text-xs">{o.id}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {o.customer[0]}
                        </div>
                        <span className={`font-medium text-xs ${text}`}>{o.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className={`text-xs ${sub} max-w-[130px] truncate block`}>{o.items}</span></td>
                    <td className="px-6 py-4"><span className={`font-semibold ${text}`}>₹{o.amount.toLocaleString()}</span></td>
                    <td className="px-6 py-4"><span className={`text-xs ${sub}`}>{o.date}</span></td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]??""}`}>
                        <SIcon size={11}/>{o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Shell ───────────────────────────────────────────────────────
export function Admin() {
  const { state } = useStore();
  const [active, setActive]         = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch]         = useState("");
  const [dm, setDm]                 = useState(false);

  const storeOrders = state.orders.map(o => ({
    id: o.id,
    customer: state.user?.name ?? "Guest",
    items: o.items.map(i => i.product.name).join(", "),
    amount: o.total,
    date: o.date,
    status: o.status,
  }));
  const allOrders = [...storeOrders, ...SAMPLE_ORDERS];

  const bg   = dm ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
  const hdr  = dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inp  = dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-500";

  function renderPage() {
    switch (active) {
      case "products": return <ProductsView dm={dm}/>;
      case "orders":   return <OrdersView   dm={dm}/>;
      case "users":    return <UsersView    dm={dm}/>;
      case "stock":    return <StockView    dm={dm}/>;
      case "reports":  return <ReportsView  dm={dm}/>;
      case "feedback": return <FeedbackView dm={dm}/>;
      case "requests": return <RequestsView dm={dm}/>;
      default:         return <DashboardView dm={dm} allOrders={allOrders}/>;
    }
  }

  return (
    <div style={{fontFamily:"'Inter',sans-serif"}} className={`flex h-screen overflow-hidden ${bg}`}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={()=>setSidebarOpen(false)}/>
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 transition-transform duration-300
        ${sidebarOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        ${dm?"bg-gray-900 border-gray-800":"bg-[#0d2b1e]"} border-r`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">R</div>
          <div>
            <p className="text-white font-bold text-base leading-none">Raman Greens</p>
            <p className="text-emerald-400 text-[11px] mt-0.5">Admin Panel</p>
          </div>
          <button className="ml-auto lg:hidden text-white/60" onClick={()=>setSidebarOpen(false)}><X size={18}/></button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({icon:Icon, label, id}) => (
            <button key={id}
              onClick={()=>{ setActive(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${active===id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={18} className={active===id?"text-white":"text-white/50 group-hover:text-white transition-colors"}/>
              {label}
              {id==="orders" && (
                <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {allOrders.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP HEADER */}
        <header className={`flex items-center gap-4 px-4 lg:px-6 py-4 border-b z-10 shrink-0 ${hdr} shadow-sm`}>
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={()=>setSidebarOpen(true)}>
            <Menu size={20}/>
          </button>

          {/* Search */}
          <div className={`flex items-center gap-2 flex-1 max-w-sm px-4 py-2.5 rounded-xl text-sm ${inp}`}>
            <Search size={16}/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search orders, products..." className="bg-transparent outline-none flex-1 text-sm"/>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Dark Mode Toggle */}
            <button onClick={()=>setDm(!dm)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${dm?"bg-emerald-500":"bg-gray-300"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${dm?"left-6":"left-1"}`}/>
            </button>

            {/* Notifications */}
            <button className={`relative p-2 rounded-xl ${dm?"hover:bg-gray-800":"hover:bg-gray-100"} transition`}>
              <Bell size={20}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
            </button>

            {/* Profile */}
            <div className="relative">
              <button onClick={()=>setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${dm?"hover:bg-gray-800":"hover:bg-gray-100"} transition`}>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">A</div>
                <span className="text-sm font-semibold hidden sm:block">Admin</span>
                <ChevronDown size={14} className="text-gray-400"/>
              </button>
              {profileOpen && (
                <div className={`absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-xl border py-1 z-50
                  ${dm?"bg-gray-800 border-gray-700":"bg-white border-gray-100"}`}>
                  {["My Profile","Settings","Help"].map(item=>(
                    <button key={item} className={`w-full text-left px-4 py-2.5 text-sm ${dm?"hover:bg-gray-700":"hover:bg-gray-50"}`}>{item}</button>
                  ))}
                  <hr className={dm?"border-gray-700 my-1":"border-gray-100 my-1"}/>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-500">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const FEEDBACK = [
  { id: 1, user: "Priya Sharma", product: "Fresh Tomatoes", rating: 5, comment: "Absolutely fresh and delivered on time! Will order again.", date: "2026-05-16", liked: true },
  { id: 2, user: "Rahul Verma", product: "Baby Spinach", rating: 4, comment: "Good quality but packaging could be better.", date: "2026-05-15", liked: true },
  { id: 3, user: "Anita Joshi", product: "Premium Mangoes", rating: 5, comment: "Best mangoes I've had this season. Highly recommend!", date: "2026-05-14", liked: true },
  { id: 4, user: "Suresh Patel", product: "Green Capsicum", rating: 2, comment: "Some capsicums were not fresh. Disappointed.", date: "2026-05-13", liked: false },
  { id: 5, user: "Kavita Singh", product: "Organic Apples", rating: 4, comment: "Very fresh and crispy. Great value for money.", date: "2026-05-12", liked: true },
  { id: 6, user: "Mohit Kumar", product: "Baby Spinach", rating: 3, comment: "Average quality this time. Expected better.", date: "2026-05-11", liked: false },
];

export function FeedbackView({ dm }: { dm: boolean }) {
  const [filter, setFilter] = useState<number | "all">("all");
  const filtered = FEEDBACK.filter(f => filter === "all" || f.rating === filter);

  const card = dm ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const text = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-400" : "text-gray-500";

  const avgRating = (FEEDBACK.reduce((s, f) => s + f.rating, 0) / FEEDBACK.length).toFixed(1);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text}`}>Customer Feedback</h1>
        <p className={`text-sm mt-0.5 ${sub}`}>{FEEDBACK.length} reviews collected</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Avg Rating", value: avgRating, icon: "⭐" },
          { label: "Total Reviews", value: FEEDBACK.length, icon: "💬" },
          { label: "Positive", value: FEEDBACK.filter(f => f.rating >= 4).length, icon: "👍" },
          { label: "Negative", value: FEEDBACK.filter(f => f.rating < 3).length, icon: "👎" },
        ].map(s => (
          <div key={s.label} className={`${card} border rounded-2xl p-4 shadow-sm text-center`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className={`text-xl font-bold ${text}`}>{s.value}</p>
            <p className={`text-xs ${sub} mt-0.5`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter by Rating */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(["all", 5, 4, 3, 2, 1] as (number | "all")[]).map(r => (
          <button key={r} onClick={() => setFilter(r)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition
              ${filter === r ? "bg-emerald-500 text-white" : dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {r === "all" ? "All Reviews" : `${r} ★`}
          </button>
        ))}
      </div>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(f => (
          <div key={f.id} className={`${card} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold">
                  {f.user[0]}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${text}`}>{f.user}</p>
                  <p className={`text-xs ${sub}`}>{f.product} · {f.date}</p>
                </div>
              </div>
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={13} className={s <= f.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                ))}
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${sub}`}>"{f.comment}"</p>
            <div className={`flex gap-3 mt-4 pt-3 border-t ${dm ? "border-gray-700" : "border-gray-100"}`}>
              <button className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition">
                <ThumbsUp size={13} /> Helpful
              </button>
              <button className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium transition">
                <ThumbsDown size={13} /> Report
              </button>
              <button className={`flex items-center gap-1.5 text-xs font-medium ml-auto ${sub} hover:text-emerald-600 transition`}>
                <MessageSquare size={13} /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

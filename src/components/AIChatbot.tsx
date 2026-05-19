import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";

type Msg = { role: "user" | "ai"; text: string; products?: Product[] };

const SUGGESTIONS = [
  "Suggest something spicy for tea time",
  "What's good for gifting?",
  "Show me organic items",
  "Track my last order",
  "Any winter sweets?",
];

function getReply(input: string, orders: { id: string; status: string }[]): Msg {
  const q = input.toLowerCase();

  // order tracking
  if (q.includes("track") || q.includes("order") || q.includes("status")) {
    if (orders.length === 0)
      return { role: "ai", text: "You don't have any orders yet. Let's find you something delicious! 🌿" };
    const last = orders[0];
    return {
      role: "ai",
      text: `Your latest order **${last.id}** is currently **${last.status}**. We're handling it with care from our Khandwa kitchen 🌿`,
    };
  }

  // category-based
  let filter: (p: Product) => boolean = () => false;
  let intro = "";

  if (q.includes("spic") || q.includes("hot") || q.includes("chilli")) {
    filter = (p) => p.tags.includes("spicy") || p.category === "Spices";
    intro = "Looking for some Nimari heat? 🌶️ Try these:";
  } else if (q.includes("tea") || q.includes("snack") || q.includes("crunch")) {
    filter = (p) => p.category === "Snacks" || p.tags.includes("tea-time");
    intro = "Perfect tea-time companions from Khandwa ☕";
  } else if (q.includes("gift") || q.includes("hamper") || q.includes("present")) {
    filter = (p) => p.category === "Gifting";
    intro = "Beautifully curated hampers — handcrafted love from Nimar 🎁";
  } else if (q.includes("organic") || q.includes("healthy") || q.includes("natural")) {
    filter = (p) => p.category === "Organics" || p.tags.includes("healthy");
    intro = "Pure, unprocessed and farm-fresh from Nimar 🌱";
  } else if (q.includes("sweet") || q.includes("winter") || q.includes("dessert")) {
    filter = (p) => p.category === "Sweets" || p.tags.includes("sweet");
    intro = "Grandma-approved sweets to warm your soul 🍬";
  } else if (q.includes("oil") || q.includes("cooking")) {
    filter = (p) => p.tags.includes("cooking") || p.tags.includes("oil");
    intro = "Wholesome cooking essentials, the Nimari way 🥘";
  } else if (q.includes("cheap") || q.includes("budget") || q.includes("under")) {
    filter = (p) => p.price < 200;
    intro = "Wonderful picks under ₹200 — value-packed Nimari treats 💚";
  } else if (q.includes("benefit") || q.includes("nutrition") || q.includes("protein")) {
    filter = (p) => p.benefits.some((b) => b.toLowerCase().includes("protein") || b.toLowerCase().includes("organic"));
    intro = "Power-packed picks for your wellness journey 💪";
  } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return {
      role: "ai",
      text: "Namaste! 🙏 I'm Nimari, your Raman Greens KNW shopping companion. I can help you discover snacks, organics & gifts from Khandwa. What are you craving today?",
    };
  } else {
    // fuzzy match
    filter = (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => q.includes(t)) ||
      p.category.toLowerCase().includes(q);
    intro = "Here are some Nimari treasures you might love:";
  }

  const matches = PRODUCTS.filter(filter).slice(0, 3);
  if (matches.length === 0) {
    return {
      role: "ai",
      text: "Hmm, I couldn't find a perfect match. Try asking about 'spicy snacks', 'organic dal', or 'festive hampers' 🌿",
    };
  }
  return { role: "ai", text: intro, products: matches };
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { state } = useStore();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Namaste! 🙏 I'm **Nimari**, your AI shopping guide from Khandwa. Ask me about products, recipes, gifting ideas or your orders!",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, getReply(text, state.orders)]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-brand text-white shadow-2xl shadow-emerald-brand/40 flex items-center justify-center hover:bg-emerald-brand-dark transition group"
        aria-label="Chat with Nimari AI"
      >
        <MessageCircle size={22} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
          <Sparkles size={10} className="text-amber-900" />
        </span>
        <span className="absolute right-full mr-3 whitespace-nowrap bg-white text-neutral-800 text-xs px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Ask Nimari ✨
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-beige-soft flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-brand to-emerald-brand-dark text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold">Nimari AI</div>
                <div className="text-xs opacity-80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online · Powered by Gemini
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/20 rounded-full">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-beige-warm">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-emerald-brand text-white rounded-br-sm"
                          : "bg-white text-neutral-800 rounded-bl-sm shadow-sm"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: m.text.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"),
                      }}
                    />
                    {m.products && m.products.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {m.products.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 bg-white p-2 rounded-xl border border-beige-soft hover:border-emerald-brand transition shadow-sm"
                          >
                            <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">{p.name}</div>
                              <div className="text-xs text-neutral-500">₹{p.price} · {p.weight}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-emerald-brand rounded-full animate-bounce"
                        style={{ animationDelay: `${d}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {msgs.length <= 2 && (
              <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-beige-soft bg-white">
                {SUGGESTIONS.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-beige-warm hover:bg-emerald-brand hover:text-white transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-beige-soft bg-white flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a product, recipe..."
                className="flex-1 px-4 py-2.5 rounded-full bg-beige-warm border border-transparent focus:border-emerald-brand focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-emerald-brand text-white flex items-center justify-center hover:bg-emerald-brand-dark transition"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

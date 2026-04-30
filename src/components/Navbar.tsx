import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";

export function Navbar() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = state.cart.reduce((s, c) => s + c.qty, 0);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/shop?cat=Snacks", label: "Snacks" },
    { to: "/shop?cat=Organics", label: "Organics" },
    { to: "/shop?cat=Gifting", label: "Gifting" },
    { to: "/dashboard", label: "Account" },
  ];

  const suggestions = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* Top announcement */}
      <div className="bg-emerald-brand text-white text-xs py-2 text-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-12 px-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>🌿 Free shipping on orders ₹499+</span>
              <span>🎁 Use code <b>NIMAR10</b> for 10% off</span>
              <span>📦 Same-day dispatch in Khandwa</span>
              <span>🌶️ New arrivals: Nimari Festive Hampers</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled ? "glass shadow-sm" : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-18 py-3 flex items-center justify-between gap-6">
          <Link to="/"><Logo /></Link>

          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-emerald-brand ${
                      isActive ? "text-emerald-brand" : "text-neutral-700"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2.5 rounded-full hover:bg-beige-soft transition"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link to="/dashboard" className="p-2.5 rounded-full hover:bg-beige-soft transition hidden sm:inline-block">
              <Heart size={18} />
            </Link>
            <Link to="/dashboard" className="p-2.5 rounded-full hover:bg-beige-soft transition hidden sm:inline-block">
              <User size={18} />
            </Link>
            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-beige-soft transition">
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-emerald-brand text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              className="lg:hidden p-2.5 rounded-full hover:bg-beige-soft transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Search dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-beige-soft overflow-hidden bg-white"
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (query) navigate(`/shop?q=${encodeURIComponent(query)}`);
                    setSearchOpen(false);
                  }}
                  className="relative"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for sev, organics, hampers…"
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-beige-soft bg-beige-warm focus:outline-none focus:border-emerald-brand"
                  />
                </form>
                {suggestions.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-beige-warm text-left"
                        >
                          <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-neutral-500">{p.category} · ₹{p.price}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-beige-soft bg-white"
            >
              <ul className="px-4 py-3 space-y-1">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-beige-warm text-sm font-medium"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-beige-warm text-sm font-medium text-emerald-brand"
                  >
                    Admin Panel
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

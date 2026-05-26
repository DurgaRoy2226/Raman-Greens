import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = state.cart.reduce((s, c) => s + c.qty, 0);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const suggestions = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Premium Top Strip */}
      <section className="bg-emerald-950 text-emerald-100/90 text-[11px] font-medium py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/30 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide uppercase text-[10px]">FREE SHIPPING on orders above ₹499</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-medium">
            <Link to="/dashboard" className="hover:text-white transition-colors duration-200">Track Order</Link>
            <span className="text-emerald-800">|</span>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">Help Center</Link>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm border-neutral-100" 
            : "bg-white/95 border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Premium Organic Search Bar (Desktop Center) */}
          <div className="hidden md:block flex-1 max-w-md mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for masala sev, cow ghee, spices..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-neutral-50/70 border border-neutral-200/80 focus:bg-white focus:border-emerald-600 rounded-full pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all duration-300 font-medium text-neutral-700 placeholder-neutral-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {searchOpen && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-100 shadow-xl overflow-hidden z-50 p-2"
                >
                  <div className="text-[10px] font-bold text-neutral-400 px-3 py-1.5 uppercase tracking-wider">Suggested Products</div>
                  <ul className="space-y-0.5">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 text-left transition-colors duration-150"
                        >
                          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-50" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-neutral-800 truncate">{p.name}</div>
                            <div className="text-[10px] text-neutral-500 font-medium">{p.category} · ₹{p.price}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7 text-sm font-semibold">
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative py-2 transition-colors duration-200 hover:text-emerald-700 ${
                        isActive ? "text-emerald-700" : "text-neutral-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {l.label}
                        {isActive && (
                          <motion.span 
                            layoutId="activeNavIndicator"
                            className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-600 rounded-full" 
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile/Tablet Search Toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              <AnimatePresence>
                {state.wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold px-1 shadow-sm border border-white"
                  >
                    {state.wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold px-1 shadow-sm border border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Account */}
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-all duration-200"
              aria-label="Account"
            >
              <User size={19} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Search Input overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-neutral-100 overflow-hidden bg-white px-4 py-3"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for masala sev, ghee..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </form>
              {suggestions.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          navigate(`/product/${p.id}`);
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 text-left transition-colors duration-150"
                      >
                        <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-neutral-800 truncate">{p.name}</div>
                          <div className="text-[10px] text-neutral-500 font-medium">₹{p.price}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-neutral-100 bg-white"
            >
              <ul className="px-4 py-4 space-y-1">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm font-semibold text-neutral-700 hover:text-emerald-700 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm font-semibold text-neutral-700 hover:text-emerald-700 transition-colors"
                  >
                    Account Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-sm font-semibold text-emerald-700 hover:bg-emerald-50/30 transition-colors"
                  >
                    Admin Console
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

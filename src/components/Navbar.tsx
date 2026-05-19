"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";

const NAV_LINKS = [
  { to: "/",       label: "Home",     exact: true  },
  { to: "/about",  label: "About Us", exact: false },
  { to: "/shop",   label: "Products", exact: false },
  { to: "/dashboard", label: "Account", exact: false },
];

export function Navbar() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

<<<<<<< HEAD
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/shop", label: "Product" },
  ];
=======
  const cartCount     = state.cart.reduce((s, c) => s + c.qty, 0);
  const wishlistCount = (state.wishlist || []).length;

  const isActive = (to: string, exact: boolean) => {
    if (to === "/") return pathname === "/";
    if (to.startsWith("/#")) return pathname === "/" && window.location.hash === to.slice(1);
    if (exact) return pathname === to;
    return pathname.startsWith(to.split("?")[0]);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (!to.includes("#")) return;
    const [path, hash] = to.split("#");
    const targetHash = "#" + hash;
    if (pathname !== (path || "/")) { setOpen(false); return; }
    e.preventDefault();
    const el = document.querySelector(targetHash);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); window.history.pushState(null, "", targetHash); }
    setOpen(false);
  };
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c

  const suggestions = query
    ? PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(query.toLowerCase()) ||
               p.tags.some((t) => t.includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* ── Announcement bar ───────────────────────────────────── */}
      <div className="bg-emerald-brand text-white text-[10px] sm:text-xs py-2 text-center overflow-hidden border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee gap-12 px-4">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>🌿 Free shipping on orders ₹499+</span>
              <span>🎁 Use code <b>NIMAR10</b> for 10% off</span>
              <span>📦 Same-day dispatch in Khandwa</span>
              <span>🌶️ New arrivals: Nimari Festive Hampers</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main header ────────────────────────────────────────── */}
      <header
<<<<<<< HEAD
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex-shrink-0"><Logo /></Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center flex-1 justify-end gap-8">
            <ul className="flex items-center gap-8 text-base font-medium">
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative py-2 transition-all duration-300 hover:text-emerald-brand group ${
                        isActive ? "text-emerald-brand font-semibold" : "text-neutral-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {l.label}
                        <span className={`absolute left-0 bottom-0 h-0.5 bg-emerald-brand transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 pl-8 border-l border-neutral-200">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2.5 rounded-full text-neutral-700 hover:text-emerald-brand hover:bg-beige-soft transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <Link to="/wishlist" className="relative p-2.5 rounded-full text-neutral-700 hover:text-emerald-brand hover:bg-beige-soft transition-colors" aria-label="Wishlist">
                <Heart size={20} />
                <AnimatePresence>
                  {state.wishlist.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-emerald-brand text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1 shadow-sm"
                    >
                      {state.wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              <Link to="/cart" className="relative p-2.5 rounded-full text-neutral-700 hover:text-emerald-brand hover:bg-beige-soft transition-colors">
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-emerald-brand text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1 shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              {/* Stylish Account Button */}
              <Link
                to="/dashboard"
                className="ml-4 flex items-center gap-2 bg-emerald-brand text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md font-medium text-sm"
              >
                <User size={18} />
                <span>Account</span>
              </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">
=======
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-emerald-brand/5 py-2" : "bg-white py-3"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 hover-scale transition-transform" aria-label="Raman Greens home">
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.to, l.exact);
              return (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    onClick={(e) => handleLinkClick(e as any, l.to)}
                    className={`relative px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 group inline-flex items-center ${
                      active
                        ? "text-emerald-brand"
                        : "text-neutral-600 hover:text-emerald-brand hover:bg-emerald-brand/5"
                    }`}
                  >
                    <span className="relative">
                      {l.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-emerald-brand rounded-full shadow-[0_0_8px_rgba(0,143,90,0.35)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      ) : (
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-emerald-brand rounded-full transition-all duration-300 group-hover:w-full" />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right-side action icons */}
          <div className="flex items-center gap-1">

            {/* Search */}
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
            <button
              id="navbar-search-btn"
              onClick={() => setSearchOpen((v) => !v)}
<<<<<<< HEAD
              className="p-2 rounded-full hover:bg-beige-soft transition"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-beige-soft transition" aria-label="Wishlist">
              <Heart size={20} />
              <AnimatePresence>
                {state.wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-emerald-brand text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1"
                  >
                    {state.wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-beige-soft transition">
              <ShoppingBag size={20} />
=======
              className="p-2.5 rounded-full hover:bg-beige-warm transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <Search size={19} className="text-neutral-700" />
            </button>

            {/* Wishlist — desktop + tablet */}
            <Link
              href="/wishlist"
              id="navbar-wishlist-btn"
              className={`relative p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center ${
                pathname === "/wishlist"
                  ? "text-emerald-brand bg-emerald-brand/8"
                  : "text-neutral-700 hover:bg-rose-50 hover:text-rose-500"
              }`}
              aria-label="Wishlist"
            >
              <Heart
                size={19}
                className={`transition-all duration-300 ${
                  pathname === "/wishlist" ? "fill-emerald-brand" : "group-hover:fill-rose-200"
                }`}
              />
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wl-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold border-2 border-white"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
<<<<<<< HEAD
            <button
              className="p-2.5 rounded-full hover:bg-beige-soft transition"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
=======

            {/* Account — desktop */}
            <Link
              href="/dashboard"
              id="navbar-account-btn"
              className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center ${
                pathname === "/dashboard"
                  ? "text-emerald-brand bg-emerald-brand/8"
                  : "text-neutral-700 hover:bg-beige-warm"
              }`}
              aria-label="Account"
            >
              <User size={19} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              id="navbar-cart-btn"
              className={`relative p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center ${
                pathname === "/cart"
                  ? "text-emerald-brand bg-emerald-brand/8"
                  : "text-neutral-700 hover:bg-beige-warm"
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 bg-emerald-brand text-white text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold border-2 border-white"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile hamburger */}
            <button
              id="navbar-menu-btn"
              className="lg:hidden p-2.5 rounded-full hover:bg-beige-warm transition-all"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* ── Search dropdown ─────────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-beige-soft overflow-hidden bg-white"
            >
              <div className="max-w-3xl mx-auto px-4 py-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (query) router.push(`/shop?q=${encodeURIComponent(query)}`);
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  className="relative"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for sev, organics, hampers…"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-beige-soft bg-beige-warm focus:outline-none focus:border-emerald-brand focus:ring-4 focus:ring-emerald-brand/5 transition-all text-sm"
                  />
                </form>
                {suggestions.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            router.push(`/product/${p.id}`);
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-beige-warm text-left transition-colors"
                        >
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=70";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-neutral-800 truncate">{p.name}</div>
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

        {/* ── Mobile menu ─────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-x-0 top-[104px] bottom-0 bg-white z-50 overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-2">
                {/* Nav links */}
                {NAV_LINKS.map((l) => {
                  const active = isActive(l.to, l.exact);
                  return (
                    <Link
                      key={l.label}
                      href={l.to}
                      onClick={(e) => { handleLinkClick(e as any, l.to); setOpen(false); }}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
                        active
                          ? "bg-emerald-brand/10 text-emerald-brand border-l-4 border-emerald-brand"
                          : "text-neutral-800 hover:bg-beige-warm hover:text-emerald-brand hover:translate-x-1"
                      }`}
                    >
                      {l.label}
                      {active && <span className="ml-auto w-2 h-2 rounded-full bg-emerald-brand animate-pulse" />}
                    </Link>
<<<<<<< HEAD
                  </li>
                ))}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-beige-warm text-sm font-medium"
                  >
                    Account
                  </Link>
                </li>
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
=======
                  );
                })}

                {/* Wishlist shortcut (mobile) */}
                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl bg-rose-50 text-rose-500 font-bold hover:bg-rose-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={20} />
                    <span>My Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-rose-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart shortcut (mobile) */}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl bg-emerald-brand text-white font-bold shadow-lg shadow-emerald-brand/20 hover:scale-[1.02] transition-transform active:scale-95"
                >
                  <span>View Cart</span>
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    {cartCount > 0 && (
                      <span className="bg-white text-emerald-brand text-xs font-black px-2 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

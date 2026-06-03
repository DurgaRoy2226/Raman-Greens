import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Heart,
  Bell,
  Gift,
  Headphones,
  Smartphone,
  ChevronRight,
  Sprout,
  ChevronDown,
  LogOut
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";

/* ─── Premium Profile Dropdown/Drawer Content ────────────────────────────────── */
function AccountMenuContent({
  closeMenu,
  onDownloadAppClick,
}: {
  closeMenu: () => void;
  onDownloadAppClick: () => void;
}) {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    closeMenu();
    navigate("/");
  };

  const menuItems = [
    { label: "My Profile", icon: User, to: "/dashboard" },
    { label: "My Orders", icon: ShoppingBag, to: "/dashboard" },
    { label: "Wishlist", icon: Heart, to: "/wishlist" },
    { label: "Rewards", icon: Gift, to: "/dashboard" },
    { label: "Notifications", icon: Bell, to: "/dashboard" },
    { label: "Customer Support", icon: Headphones, to: "/contact" },
    { label: "Download App", icon: Smartphone, to: "#", isAppDownload: true },
  ];

  return (
    <div className="flex flex-col h-full text-neutral-850 font-sans">
      {/* Header Area */}
      <div className="p-5 bg-gradient-to-br from-[#0c2d17] to-[#144224] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-600/10 blur-xl pointer-events-none" />
        <div className="absolute top-4 right-4 opacity-10 text-emerald-400 pointer-events-none">
          <Sprout size={56} className="fill-current" />
        </div>

        <div className="relative z-10 flex items-start gap-3">
          {/* Small Profile/Organic Icon */}
          <div className="w-10 h-10 rounded-full bg-[#1e5230] border border-[#2e6d42]/30 flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <Sprout size={16} className="text-emerald-300 fill-emerald-300/30" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-extrabold tracking-widest text-emerald-400 uppercase leading-none mb-1">Namaste</div>
            <h4 className="font-serif font-semibold text-[15px] text-white tracking-wide leading-tight truncate">
              {state.user ? state.user.name : "Welcome to Raman Greens"}
            </h4>
            <p className="text-[10px] text-emerald-200/70 mt-1 leading-relaxed font-light truncate">
              {state.user ? state.user.email : "Manage your organic orders & wishlist"}
            </p>
          </div>
        </div>

        {/* Sign In / Sign Up Buttons (only if not logged in) */}
        {!state.user && (
          <div className="mt-4.5 flex gap-2 relative z-10">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 bg-white hover:bg-emerald-50 text-[#0c2d17] text-center font-bold tracking-wide text-[10px] uppercase py-2 px-3 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="flex-1 bg-[#1a4f2d] hover:bg-[#205f37] text-white border border-[#2e6d42]/30 text-center font-bold tracking-wide text-[10px] uppercase py-2 px-3 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Menu List */}
      <div className="p-3 space-y-0.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.isAppDownload) {
            return (
              <button
                key={item.label}
                onClick={() => {
                  closeMenu();
                  onDownloadAppClick();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold
                           text-neutral-700 hover:text-emerald-800 hover:bg-emerald-50/50 group
                           transition-all duration-200 cursor-pointer border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-50 text-neutral-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors duration-200">
                    <Icon size={14} className="stroke-[2.25]" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 group-hover:text-emerald-800 transition-colors">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">NEW</span>
                  <ChevronRight size={12} className="text-neutral-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={closeMenu}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold
                         text-neutral-700 hover:text-emerald-800 hover:bg-emerald-50/50 group
                         transition-all duration-200 border border-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-50 text-neutral-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors duration-200">
                  <Icon size={14} className="stroke-[2.25]" />
                </div>
                <span className="text-[11px] font-semibold text-neutral-700 group-hover:text-emerald-800 transition-colors">{item.label}</span>
              </div>
              <ChevronRight size={12} className="text-neutral-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          );
        })}

        {/* Logout button (only if logged in) */}
        {state.user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold
                       text-neutral-500 hover:text-red-700 hover:bg-red-50 group
                       transition-all duration-200 cursor-pointer border border-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-50 text-neutral-400 group-hover:bg-red-100 group-hover:text-red-700 transition-colors duration-200">
                <LogOut size={14} className="stroke-[2.25]" />
              </div>
              <span className="text-[11px] font-semibold transition-colors">Logout</span>
            </div>
            <ChevronRight size={12} className="text-neutral-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all duration-200" />
          </button>
        )}
      </div>

      {/* App Promo Banner at the bottom */}
      <div className="m-3 p-3 bg-gradient-to-br from-[#FAF8F5] to-emerald-50/30 rounded-xl border border-emerald-900/5 text-center flex flex-col items-center shadow-sm">
        <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-widest mb-1.5 block">Raman Greens Mobile App</span>
        <p className="text-[10px] text-neutral-500 mb-3.5 leading-tight font-medium">Get 10% off your first order on app</p>
        <button
          onClick={() => {
            closeMenu();
            onDownloadAppClick();
          }}
          className="inline-flex items-center gap-1.5 bg-[#144224] hover:bg-[#0c2d17] text-white font-bold tracking-wider text-[9px] uppercase px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Smartphone size={10} /> Install Now
        </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [appDownloadOpen, setAppDownloadOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your order ORD-4820 has been shipped! 🚚", time: "2 hrs ago", read: false },
    { id: 2, text: "New Arrival: Masala Sev is back in stock! 🌿", time: "5 hrs ago", read: false },
    { id: 3, text: "Use coupon FRESH20 for 20% off your next order! 🏷️", time: "1 day ago", read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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

  // Close account menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
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

          {/* Categories & Search Bar (Desktop Center) */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-6 relative">
            
            {/* Categories Dropdown */}
            <div className="relative shrink-0" ref={categoriesDropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen((v) => !v)}
                className="flex items-center gap-1.5 bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800 font-bold px-3.5 py-2.5 rounded-full text-xs transition duration-200 cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${categoriesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {categoriesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-xl border border-neutral-100 shadow-lg overflow-hidden z-50 py-1"
                  >
                    {[
                      { label: "Organic Powders", cat: "Organics" },
                      { label: "Masale",           cat: "Spices" },
                      { label: "Herbal Products",  cat: "Herbs" },
                      { label: "Snacks",           cat: "Snacks" },
                      { label: "Oils",             cat: "Dairy" },
                      { label: "Seeds",            cat: "Seeds" },
                      { label: "Dry Fruits",       cat: "Snacks" },
                    ].map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => {
                          setCategoriesDropdownOpen(false);
                          navigate(`/shop?cat=${encodeURIComponent(c.label)}`);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition cursor-pointer"
                      >
                        {c.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Input Box */}
            <div className="flex-1 relative" ref={searchRef}>
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
                            type="button"
                            onClick={() => {
                              navigate(`/product/${p.id}`);
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 text-left transition-colors duration-150 cursor-pointer"
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

            {/* Notifications */}
            <div className="relative flex" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(v => !v)}
                className="relative p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell size={19} />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] min-w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold px-0.5 border border-white"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-12 w-80 bg-white rounded-2xl border border-neutral-100 shadow-xl overflow-hidden z-50 p-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllAsRead}
                          className="text-[9px] font-bold text-emerald-700 hover:text-emerald-900 uppercase tracking-wider cursor-pointer"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl text-left text-xs transition duration-200 border border-transparent
                                      ${n.read ? "bg-neutral-50/50 text-neutral-500" : "bg-emerald-50/20 text-neutral-800 font-semibold border-emerald-500/10"}`}
                        >
                          <p className="leading-snug">{n.text}</p>
                          <span className="text-[9px] text-neutral-400 font-medium block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

            {/* User Account / Login Buttons */}
            {state.user ? (
              <div className="relative flex" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 pr-3 rounded-full text-neutral-700 hover:text-emerald-brand hover:bg-neutral-50 border border-neutral-100/80 transition-all duration-200 cursor-pointer"
                  aria-label="Account"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-brand text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {state.user.name[0]}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate hidden md:inline">
                    {state.user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown for Desktop */}
                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="hidden lg:block absolute right-0 mt-3 w-80 bg-white shadow-[0_20px_50px_rgba(12,59,27,0.15)] rounded-2xl border border-neutral-100/80 overflow-hidden z-50"
                    >
                      <AccountMenuContent
                        closeMenu={() => setAccountOpen(false)}
                        onDownloadAppClick={() => setAppDownloadOpen(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Desktop Login / Signup */}
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-xs font-bold text-neutral-700 hover:text-emerald-brand transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-emerald-brand hover:bg-emerald-brand-dark text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
                {/* Mobile User Icon - redirects to Login */}
                <Link
                  to="/login"
                  className="lg:hidden p-2.5 rounded-full text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 transition-colors"
                  aria-label="Login"
                >
                  <User size={19} />
                </Link>
              </>
            )}

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
                
                {state.user ? (
                  <>
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
                      <button
                        onClick={() => {
                          setOpen(false);
                          dispatch({ type: "LOGOUT" });
                          navigate("/");
                        }}
                        className="w-full text-left block px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm font-semibold text-red-600 transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50/50 text-sm font-semibold text-emerald-brand hover:text-emerald-brand-dark transition-colors"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50/50 text-sm font-semibold text-emerald-brand hover:text-emerald-brand-dark transition-colors"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}

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

        {/* Mobile Account Drawer */}
        <AnimatePresence>
          {accountOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setAccountOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col lg:hidden border-l border-emerald-950/10"
              >
                {/* Mobile Close Button */}
                <button
                  onClick={() => setAccountOpen(false)}
                  className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-emerald-950/30 text-white hover:bg-emerald-950/50 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
                {/* Mobile Drawer Content */}
                <AccountMenuContent
                  closeMenu={() => setAccountOpen(false)}
                  onDownloadAppClick={() => setAppDownloadOpen(true)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* App Download Modal */}
        <AnimatePresence>
          {appDownloadOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setAppDownloadOpen(false)}
                className="absolute inset-0 bg-[#0C1F15]/75 backdrop-blur-sm"
              />
              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full relative overflow-hidden shadow-[0_24px_60px_-15px_rgba(12,59,27,0.3)] border border-neutral-100 flex flex-col items-center text-center z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setAppDownloadOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-all duration-200 cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Decorative background shape */}
                <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />

                {/* Organic icon wrapper */}
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                  <Sprout size={28} className="fill-current" />
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 mb-1">Raman Greens KNW</span>
                <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">Get the Organic Experience on App</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6 max-w-xs">
                  Scan the QR code to install or select your app store. Available for iOS and Android.
                </p>

                {/* QR Code Placeholder with premium styling */}
                <div className="p-4 bg-[#FAF8F5]/30 border border-neutral-200/50 rounded-2xl mb-6 relative">
                  <div className="w-32 h-32 bg-white flex items-center justify-center rounded-xl shadow-inner border border-neutral-100">
                    <svg className="w-28 h-28 text-emerald-950" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" />
                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" />
                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" />
                      <rect x="75" y="75" width="10" height="10" />
                      <rect x="35" y="5" width="5" height="5" /><rect x="45" y="0" width="5" height="10" />
                      <rect x="55" y="5" width="10" height="5" /><rect x="35" y="15" width="10" height="5" />
                      <rect x="50" y="15" width="5" height="15" /><rect x="60" y="20" width="5" height="5" />
                      <rect x="5" y="35" width="10" height="5" /><rect x="20" y="35" width="5" height="5" />
                      <rect x="0" y="45" width="5" height="10" /><rect x="10" y="50" width="15" height="5" />
                      <rect x="0" y="60" width="10" height="5" /><rect x="15" y="60" width="10" height="10" />
                      <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="5" />
                      <circle cx="50" cy="50" r="4" fill="currentColor" />
                      <rect x="75" y="35" width="10" height="5" /><rect x="90" y="35" width="5" height="15" />
                      <rect x="70" y="45" width="15" height="5" /><rect x="80" y="55" width="15" height="10" />
                      <rect x="35" y="75" width="5" height="10" /><rect x="45" y="70" width="10" height="5" />
                      <rect x="40" y="85" width="15" height="5" /><rect x="45" y="90" width="5" height="10" />
                      <rect x="60" y="80" width="10" height="15" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    Scan to Install
                  </div>
                </div>

                {/* App badges */}
                <div className="flex items-center gap-3 w-full justify-center">
                  <a href="#ios" className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-xl shadow-md border border-neutral-800 text-left transition-colors duration-150">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.23 12.37,21.23C10.84,21.23 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                    </svg>
                    <div>
                      <div className="text-[7px] text-neutral-400 uppercase font-bold tracking-wider leading-none">Download on the</div>
                      <div className="text-[11px] font-bold leading-none mt-0.5">App Store</div>
                    </div>
                  </a>
                  <a href="#android" className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-xl shadow-md border border-neutral-800 text-left transition-colors duration-150">
                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3l1.816 3.146c.156.27.064.616-.206.772-.27.156-.616.064-.772-.206L16.51 15.82C15.02 16.58 13.56 17 12 17c-1.56 0-3.02-.42-4.51-1.18l-1.85 3.208c-.156.27-.502.362-.772.206-.27-.156-.362-.502-.206-.772L6.477 15.3C3.69 13.78 2 10.97 2 8c0-.33.03-.66.08-.99h19.84c.05.33.08.66.08.99 0 2.97-1.69 5.78-4.477 7.3zM7 11c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm10 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM12 2C8.69 2 6 4.69 6 8h12c0-3.31-2.69-6-6-6z" />
                    </svg>
                    <div>
                      <div className="text-[7px] text-neutral-400 uppercase font-bold tracking-wider leading-none">Get it on</div>
                      <div className="text-[11px] font-bold leading-none mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

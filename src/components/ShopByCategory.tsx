import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: 1,
    title: "Fresh Juices",
    subtitle: "100% natural.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Snacks",
  },
  {
    id: 2,
    title: "Fresh Vegetables",
    subtitle: "Fresh from farm.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Organics",
  },
  {
    id: 3,
    title: "Spices & Herbs",
    subtitle: "Aromatic & pure.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Spices",
  },
  {
    id: 4,
    title: "Healthy Snacks",
    subtitle: "Guilt-free treats.",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Gifting",
  },
];

export function ShopByCategory() {
  return (
<<<<<<< HEAD
    <section className="py-10 sm:py-12 bg-white w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Elegant Heading */}
        <div className="text-center mb-20 flex flex-col items-center">
=======
    <section className="py-8 lg:py-10 bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-8 flex flex-col items-center">
>>>>>>> 5eabd1caa3822538adfe427454e7db99fb673683
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              <Sparkles size={14} /> Discover
            </span>
<<<<<<< HEAD
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
              Shop By Category
=======
            <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl font-medium text-neutral-900 leading-tight mb-4 tracking-tight">
              Shop by Category
>>>>>>> 5eabd1caa3822538adfe427454e7db99fb673683
            </h2>
            <div className="w-10 h-[2px] bg-emerald-600/40 mx-auto" />
          </motion.div>
        </div>

<<<<<<< HEAD
        {/* Circular Icons Row - horizontal scroll on mobile */}
        <div className="w-full relative mb-16 sm:mb-24">
          {/* Fade edge indicators on mobile */}
          <div className="absolute left-0 top-0 bottom-8 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none sm:hidden" />
          <div className="absolute right-0 top-0 bottom-8 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden" />
          <div className="flex gap-6 sm:gap-10 md:gap-16 lg:gap-24 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible pb-4 pt-1 px-4 -mx-4 sm:px-0 sm:mx-0 no-scrollbar">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center group cursor-pointer shrink-0"
              >
                <Link to={cat.path} className="flex flex-col items-center">
                  <div className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-500 group-hover:scale-105">
                    {/* Blob Background */}
                    <div 
                      className={`absolute inset-0 ${cat.color} transition-all duration-700 group-hover:rotate-[20deg]`}
                      style={{ borderRadius: cat.blob }}
                    />
                    {/* Icon */}
                    <Icon size={28} strokeWidth={1.5} className="relative z-10 text-white drop-shadow-sm" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-800 group-hover:text-emerald-800 transition-colors text-center">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
          </div>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {BANNERS.map((banner, i) => (
=======
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
>>>>>>> 5eabd1caa3822538adfe427454e7db99fb673683
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex bg-[#282d35] rounded-xl overflow-hidden h-[240px] md:h-[280px]"
            >
<<<<<<< HEAD
              <div className={`relative rounded-[24px] overflow-hidden h-[220px] sm:h-[260px] flex items-center p-6 sm:p-8 lg:p-10 group ${banner.bg} transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]`}>
                
                {/* Text Content */}
                <div className="relative z-20 flex-1 h-full flex flex-col justify-center">
                  <span className="text-red-500/80 font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">
                    {banner.discount}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-medium text-neutral-900 leading-tight mb-8 whitespace-pre-line">
                    {banner.title}
=======
              <Link to={cat.path} className="flex w-full h-full">

                {/* ── Left: Dark panel ── */}
                <div className="w-[50%] relative z-10 flex flex-col justify-center px-8 lg:px-10">
                  <h3 className="text-white font-bold mb-2 text-2xl lg:text-3xl tracking-tight">
                    {cat.title}
>>>>>>> 5eabd1caa3822538adfe427454e7db99fb673683
                  </h3>

                  <p className="text-neutral-400 text-sm font-light mb-8">
                    {cat.subtitle}
                  </p>

                  {/* Shop Now link */}
                  <div className="inline-flex items-center text-white text-sm font-bold w-fit group-hover:text-gray-200 transition-colors">
                    <span className="border-b-[1.5px] border-white pb-0.5">
                      Shop Now
                    </span>
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* ── Right: Photo ── */}
                <div className="w-[50%] relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

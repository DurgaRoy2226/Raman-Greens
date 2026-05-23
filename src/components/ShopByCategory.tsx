import { Link } from "react-router-dom";
import { Search, Apple, Carrot, Fish, Wheat, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "All Items",
    icon: Search,
    color: "bg-amber-400/50",
    blob: "60% 40% 30% 70% / 60% 30% 70% 40%",
    path: "/shop",
  },
  {
    name: "Fresh Fruits",
    icon: Apple,
    color: "bg-lime-500/40",
    blob: "30% 70% 70% 30% / 30% 30% 70% 70%",
    path: "/shop?cat=Fruits",
  },
  {
    name: "Vegetables",
    icon: Carrot,
    color: "bg-pink-400/50",
    blob: "50% 50% 20% 80% / 25% 80% 20% 75%",
    path: "/shop?cat=Vegetables",
  },
  {
    name: "Fish & Meat",
    icon: Fish,
    color: "bg-stone-500/40",
    blob: "70% 30% 50% 50% / 30% 30% 70% 70%",
    path: "/shop?cat=Meat",
  },
  {
    name: "Staples",
    icon: Wheat,
    color: "bg-blue-400/40",
    blob: "40% 60% 70% 30% / 40% 50% 60% 50%",
    path: "/shop?cat=Staples",
  },
];

const BANNERS = [
  {
    id: 1,
    title: "Bell Pepper\nOrange",
    discount: "-10% OFF",
    bg: "bg-[#FDF7F2]",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80",
    path: "/shop?cat=Vegetables",
  },
  {
    id: 2,
    title: "Fruit Juice\nPackage",
    discount: "-20% OFF",
    bg: "bg-[#F3F8F4]",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=500&q=80",
    path: "/shop?cat=Beverages",
  },
  {
    id: 3,
    title: "Full Fresh\nVegetable",
    discount: "-30% OFF",
    bg: "bg-[#FCF5F7]",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    path: "/shop?cat=Vegetables",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-10 sm:py-12 bg-white w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Elegant Heading */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <span className="block text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-600/80 mb-4">
              Explore Our Range
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-5 tracking-tight">
              Shop By Category
            </h2>
            <div className="w-10 h-[2px] bg-emerald-600/30 mx-auto" />
          </motion.div>
        </div>

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
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className={`relative rounded-[24px] overflow-hidden h-[220px] sm:h-[260px] flex items-center p-6 sm:p-8 lg:p-10 group ${banner.bg} transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]`}>
                
                {/* Text Content */}
                <div className="relative z-20 flex-1 h-full flex flex-col justify-center">
                  <span className="text-red-500/80 font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">
                    {banner.discount}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-medium text-neutral-900 leading-tight mb-8 whitespace-pre-line">
                    {banner.title}
                  </h3>
                  <div>
                    <Link
                      to={banner.path}
                      className="inline-flex items-center gap-2 bg-white text-neutral-900 hover:text-emerald-800 text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] group/btn"
                    >
                      Shop Now
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[120%] z-10 pointer-events-none">
                  <img
                    src={banner.image}
                    alt={banner.title.replace('\n', ' ')}
                    className="w-full h-full object-contain object-right group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ filter: "drop-shadow(-10px 10px 20px rgba(0,0,0,0.08))" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

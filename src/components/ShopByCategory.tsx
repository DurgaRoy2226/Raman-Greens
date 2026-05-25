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
    bgColor: "bg-gradient-to-br from-[#E25C00] via-[#B24700] to-[#7A2E00]",
    overlayColor: "from-[#7A2E00] to-transparent",
    subtitleColor: "text-orange-100/80",
    accentBorder: "border-orange-300/40",
  },
  {
    id: 2,
    title: "Fresh Vegetables",
    subtitle: "Fresh from farm.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Organics",
    bgColor: "bg-gradient-to-br from-[#1F6E30] via-[#154F21] to-[#0E3516]",
    overlayColor: "from-[#0E3516] to-transparent",
    subtitleColor: "text-emerald-100/85",
    accentBorder: "border-emerald-300/40",
  },
  {
    id: 3,
    title: "Spices & Herbs",
    subtitle: "Aromatic & pure.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Spices",
    bgColor: "bg-gradient-to-br from-[#B35900] via-[#8A4500] to-[#5C2E00]",
    overlayColor: "from-[#5C2E00] to-transparent",
    subtitleColor: "text-amber-100/85",
    accentBorder: "border-amber-300/40",
  },
  {
    id: 4,
    title: "Healthy Snacks",
    subtitle: "Guilt-free treats.",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=700&q=85",
    path: "/shop?cat=Gifting",
    bgColor: "bg-gradient-to-br from-[#946231] via-[#6B4620] to-[#422B14]",
    overlayColor: "from-[#422B14] to-transparent",
    subtitleColor: "text-amber-100/70",
    accentBorder: "border-amber-200/30",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-8 lg:py-10 bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              <Sparkles size={14} /> Discover
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-tight mb-4 tracking-tight">
              Shop by Category
            </h2>
            <div className="w-10 h-[2px] bg-emerald-600/40 mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex rounded-xl overflow-hidden h-[240px] md:h-[280px] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link to={cat.path} className="flex w-full h-full">

                {/* ── Left: Color-Matched gradient panel ── */}
                <div className={`w-[50%] relative z-10 flex flex-col justify-center px-8 lg:px-10 ${cat.bgColor} transition-all duration-500`}>
                  <h3 className="text-white font-bold mb-2 text-2xl lg:text-3xl tracking-tight">
                    {cat.title}
                  </h3>

                  <p className={`${cat.subtitleColor} text-sm font-light mb-8 transition-colors duration-500`}>
                    {cat.subtitle}
                  </p>

                  {/* Shop Now link */}
                  <div className="inline-flex items-center text-white text-sm font-bold w-fit group-hover:text-gray-200 transition-colors">
                    <span className={`border-b-[1.5px] ${cat.accentBorder} pb-0.5 group-hover:border-white transition-colors duration-300`}>
                      Shop Now
                    </span>
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* ── Right: Photo with smooth horizontal blending overlay ── */}
                <div className="w-[50%] relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Premium color blending gradient overlay */}
                  <div className={`absolute inset-y-0 left-0 w-24 bg-gradient-to-r ${cat.overlayColor} pointer-events-none z-10 transition-all duration-500`} />
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


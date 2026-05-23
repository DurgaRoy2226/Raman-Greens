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
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
              <Sparkles size={14} /> Discover
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl font-medium text-neutral-900 leading-tight mb-4 tracking-tight">
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
              className="group relative flex bg-[#282d35] rounded-xl overflow-hidden h-[240px] md:h-[280px]"
            >
              <Link to={cat.path} className="flex w-full h-full">

                {/* ── Left: Dark panel ── */}
                <div className="w-[50%] relative z-10 flex flex-col justify-center px-8 lg:px-10">
                  <h3 className="text-white font-bold mb-2 text-2xl lg:text-3xl tracking-tight">
                    {cat.title}
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

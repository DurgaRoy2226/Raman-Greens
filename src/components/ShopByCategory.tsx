import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const BANNERS = [
  {
    id: 1,
    title: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Vegetables",
  },
  {
    id: 2,
    title: "Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Fruits",
  },
  {
    id: 3,
    title: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Snacks",
  },
  {
    id: 4,
    title: "Organics",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Organics",
  },
  {
    id: 5,
    title: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Spices",
  },
  {
    id: 6,
    title: "Herbs & Superfoods",
    image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=600&q=80",
    path: "/shop?cat=Herbs",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-6 lg:py-8 bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Simple Heading as in Image */}
        <div className="text-center mb-6 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#1a3626] mb-2"
          >
            Shop By Category
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center text-[#8bc34a] font-bold text-sm tracking-wide hover:text-[#7cb041] transition-colors"
            >
              View All products <ChevronRight size={16} strokeWidth={3} className="ml-1" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {BANNERS.map((banner, i) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group h-[220px] lg:h-[260px] overflow-hidden bg-neutral-100 rounded-[4px] cursor-pointer"
            >
              <Link to={banner.path} className="absolute inset-0 block w-full h-full">
                {/* Image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title */}
                <div className="absolute bottom-6 left-6 flex items-center text-white">
                  <h3 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-md">
                    {banner.title}
                  </h3>
                  <ChevronRight size={20} strokeWidth={3} className="ml-1 opacity-90 drop-shadow-md group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


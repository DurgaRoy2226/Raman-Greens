import { motion } from "framer-motion";
import { Leaf, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-emerald-brand overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Leaf texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }}
      />
      {/* Radial glows */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#8bc34a]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-emerald-brand-light/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#8bc34a] border border-white/10 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8"
        >
          <Leaf size={13} className="fill-[#8bc34a]" />
          Khandwa, Madhya Pradesh
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight mb-8"
        >
          Growing Nature's Best
          <br />
          <span className="text-[#8bc34a]">Into Pure Goodness</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-14"
        >
          Raman Greens is a food processing &amp; agri-incubation company turning raw farm produce
          into premium, chemical-free products — and turning students into entrepreneurs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center"
        >
          <a
            href="#mission"
            className="group flex flex-col items-center gap-2 text-white/50 hover:text-white/90 transition-colors text-xs font-semibold tracking-widest uppercase"
          >
            Discover Our Story
            <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
              <ArrowDown size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-emerald-brand rounded-[32px] p-12 sm:p-16 text-center overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#8bc34a]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-[#8bc34a] px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8">
              <Leaf size={13} className="fill-[#8bc34a]" />
              Farm to Table Excellence
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight mb-6 max-w-3xl mx-auto">
              Explore Our Natural Product Range
            </h2>

            <p className="text-white/65 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
              From dehydrated vegetable powders to pure essential oils — discover products crafted with care, rooted in tradition, and powered by modern processing.
            </p>

            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-white text-emerald-brand px-9 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-[#8bc34a] hover:text-white transition-all duration-300"
            >
              Explore Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

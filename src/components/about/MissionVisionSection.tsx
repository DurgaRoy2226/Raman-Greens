import { motion } from "framer-motion";
import { Target, Eye, Sprout } from "lucide-react";

export function MissionVisionSection() {
  return (
    <section id="mission" className="py-20 sm:py-28 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-emerald-brand text-white rounded-3xl p-10 sm:p-12 overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8bc34a]/15 blur-2xl" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#8bc34a]/20 flex items-center justify-center mb-6">
              <Target size={22} className="text-[#8bc34a]" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#8bc34a] uppercase mb-3 block">Our Mission</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-snug mb-6">
              Empowering Farmers & Entrepreneurs
            </h2>
            <p className="text-white/75 leading-relaxed font-light text-sm sm:text-base">
              To support farmers and encourage entrepreneurship by converting raw agricultural produce into
              high-value, chemical-free, market-ready products — creating sustainable livelihoods across the Nimar region.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Farmer Support", "Value Addition", "Zero Chemicals", "Rural Empowerment"].map((t) => (
                <span key={t} className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs px-3.5 py-1.5 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-beige-warm rounded-3xl p-10 sm:p-12 overflow-hidden border border-beige-soft group hover:shadow-[0_20px_60px_rgba(12,59,27,0.06)] transition-shadow duration-500"
        >
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#8bc34a]/10 blur-2xl" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-brand/8 flex items-center justify-center mb-6">
              <Eye size={22} className="text-emerald-brand" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-brand-dark uppercase mb-3 block">Our Vision</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900 leading-snug mb-6">
              Creating Entrepreneurs, Not Job Seekers
            </h2>
            <p className="text-neutral-600 leading-relaxed font-light text-sm sm:text-base">
              Through food innovation, incubation support, and hands-on training, we aim to build a generation
              of agri-entrepreneurs who transform Madhya Pradesh's agricultural abundance into thriving businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Incubation", "Food Innovation", "Skill Development", "Commercialization"].map((t) => (
                <span key={t} className="bg-emerald-brand/8 border border-emerald-brand/15 text-emerald-brand text-xs px-3.5 py-1.5 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* About the Company strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-10 bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#8bc34a]/15 flex items-center justify-center shrink-0">
          <Sprout size={30} className="text-emerald-brand" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-3">Who We Are</h3>
          <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
            Raman Greens is a Khandwa-based food processing and agri-incubation company. We specialize in
            vegetable and fruit powder manufacturing, essential oil extraction, product innovation, and incubation
            support — working hand-in-hand with local farmers to unlock the true potential of Nimar's agriculture.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

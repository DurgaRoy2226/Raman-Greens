import { motion } from "framer-motion";
import { GraduationCap, Lightbulb, Package, FlaskConical, TrendingUp, BadgeCheck } from "lucide-react";

const PILLARS = [
  { icon: GraduationCap, title: "Student Incubation Support", desc: "Providing infrastructure, mentorship and workspace to university students ready to launch agri-food startups." },
  { icon: Lightbulb, title: "Product Development Guidance", desc: "Expert guidance from ideation to final product — recipe formulation, shelf-life testing, and compliance." },
  { icon: Package, title: "Packaging & Branding", desc: "Hands-on training in label design, FSSAI-compliant packaging, and brand identity creation." },
  { icon: FlaskConical, title: "Food Processing Training", desc: "Practical sessions covering every machine, safety protocol, and GMP standard in our facility." },
  { icon: BadgeCheck, title: "Product Testing", desc: "In-house and third-party lab testing for moisture, microbial load, nutritional profile, and shelf life." },
  { icon: TrendingUp, title: "Commercialization Support", desc: "Market linkage support — connecting entrepreneurs with distributors, retailers, and e-commerce platforms." },
];

export function IncubationSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#f9fafb] border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-emerald-brand/8 text-emerald-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <GraduationCap size={12} /> Incubation & Entrepreneurship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
              We Build<br />
              <span className="text-emerald-brand">Entrepreneurs</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed lg:mb-2"
          >
            Our incubation programme bridges the gap between agricultural education and real-world commerce.
            Students get access to machines, mentors, and markets — everything needed to launch a sustainable food brand.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8bc34a]/12 text-emerald-brand group-hover:bg-emerald-brand group-hover:text-white flex items-center justify-center transition-all duration-300 mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-neutral-800 text-base mb-2 group-hover:text-emerald-brand transition-colors">{p.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-emerald-brand rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
          <p className="relative z-10 font-serif text-xl sm:text-2xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
            "Our goal is simple — transform every student who walks through our doors into a confident, self-reliant entrepreneur."
          </p>
          <span className="relative z-10 block mt-4 text-[#8bc34a] text-xs font-bold tracking-widest uppercase">
            — Raman Greens Incubation Mission
          </span>
        </motion.div>
      </div>
    </section>
  );
}

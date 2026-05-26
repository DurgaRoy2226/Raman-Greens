import { motion } from "framer-motion";
import { Leaf, ShieldCheck, CreditCard, BadgeCheck, Sprout, Recycle, Heart, Wrench } from "lucide-react";

const REASONS = [
  { icon: Leaf, title: "Fresh & Organic", desc: "100% natural produce sourced directly from partner farms in Nimar." },
  { icon: ShieldCheck, title: "Hygienic Processing", desc: "GMP-compliant facility with stainless-steel machinery and regular sanitization." },
  { icon: CreditCard, title: "Secure Payment", desc: "Transparent pricing with safe, hassle-free payment across all channels." },
  { icon: BadgeCheck, title: "Quality Tested", desc: "Every batch tested in-house and by accredited third-party labs." },
  { icon: Sprout, title: "Farm Fresh Ingredients", desc: "Direct farm-to-factory supply chain ensuring peak-season freshness." },
  { icon: Recycle, title: "Sustainable Processing", desc: "Water recycling, zero-waste packaging, and energy-efficient machinery." },
  { icon: Heart, title: "Customer Satisfaction", desc: "Dedicated support team ensuring every order meets your expectations." },
  { icon: Wrench, title: "Modern Machinery", desc: "21 specialised machines covering the entire production lifecycle." },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#f9fafb] border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-emerald-brand/8 text-emerald-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight mb-4"
          >
            Quality You Can Taste & Trust
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed"
          >
            Eight pillars that set Raman Greens apart — from soil to shelf.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#8bc34a]/12 text-emerald-brand group-hover:bg-emerald-brand group-hover:text-white flex items-center justify-center mb-4 transition-all duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-neutral-800 text-sm mb-2 group-hover:text-emerald-brand transition-colors">{r.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

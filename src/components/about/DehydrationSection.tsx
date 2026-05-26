import { motion } from "framer-motion";
import { Thermometer, CheckCircle2 } from "lucide-react";

const STEPS = [
  { step: "01", title: "Product Preparation", desc: "Washing, peeling, and slicing produce to uniform dimensions for even drying." },
  { step: "02", title: "Tray Loading", desc: "Evenly spreading cut pieces on stainless steel mesh trays to ensure airflow." },
  { step: "03", title: "Dryer Setting", desc: "Setting precise temperature and humidity profiles on the PID-controlled tray dryer." },
  { step: "04", title: "Monitoring", desc: "Continuous weight and moisture checks every 2 hours to maintain quality consistency." },
  { step: "05", title: "Unloading", desc: "Carefully removing dried product at target moisture level without breakage." },
  { step: "06", title: "Inspection & Packaging", desc: "Final visual QC, grinding to powder, and airtight nitrogen-flushed packaging." },
];

const PRODUCTS = [
  "Tomato", "Onion", "Beetroot", "Ginger", "Banana",
  "Papaya", "Garlic", "Green Leafy Vegetables", "Taro (Arbi)",
];

export function DehydrationSection() {
  return (
    <section className="py-20 sm:py-28 bg-emerald-brand overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8bc34a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-white/10 text-[#8bc34a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Thermometer size={12} /> Dehydration Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight mb-4"
          >
            From Farm to Fine Powder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/65 font-light text-sm sm:text-base leading-relaxed"
          >
            A six-stage, quality-controlled process that locks in nutrients, colour, and flavour.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="font-serif text-4xl font-bold text-[#8bc34a]/40 group-hover:text-[#8bc34a]/60 transition-colors leading-none block mb-4">{s.step}</span>
              <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Products processed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-8 sm:p-10"
        >
          <h3 className="font-serif text-xl font-bold text-white mb-6">Products We Dehydrate</h3>
          <div className="flex flex-wrap gap-3">
            {PRODUCTS.map((p) => (
              <span
                key={p}
                className="flex items-center gap-2 bg-white/10 hover:bg-[#8bc34a]/25 border border-white/15 text-white/85 text-sm px-4 py-2 rounded-full font-medium transition-colors cursor-default"
              >
                <CheckCircle2 size={13} className="text-[#8bc34a]" />
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

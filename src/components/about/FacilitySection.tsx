import { motion } from "framer-motion";
import { FlaskConical, Package, Zap, Waves, Scissors, Droplets } from "lucide-react";

const UNITS = [
  { icon: Scissors, label: "Preparation Section", desc: "Washing, sorting, peeling and slicing fresh produce to food-grade standards." },
  { icon: Waves, label: "Paste Processing", desc: "Precision pulping, crushing and blending for consistent paste formulations." },
  { icon: Zap, label: "Dehydration Process", desc: "Controlled tray drying that preserves nutrients while reducing moisture to optimal levels." },
  { icon: FlaskConical, label: "Powder Grinding", desc: "Fine-milling dehydrated produce into smooth, market-ready powder form." },
  { icon: Package, label: "Packaging Section", desc: "Hygienic, airtight pouch and bottle sealing for maximum shelf life." },
  { icon: Droplets, label: "Essential Oil Distillation", desc: "Steam distillation units extracting pure, aromatic oils from botanicals." },
];

export function FacilitySection() {
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
            Processing Facility
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight mb-4"
          >
            End-to-End Processing Units
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed"
          >
            Our integrated facility handles every stage — from raw farm produce to finished packaged product.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNITS.map((unit, i) => {
            const Icon = unit.icon;
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8bc34a]/12 text-emerald-brand group-hover:bg-emerald-brand group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#8bc34a] uppercase block mb-1">Unit {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-bold text-neutral-800 text-base mb-2">{unit.label}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">{unit.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

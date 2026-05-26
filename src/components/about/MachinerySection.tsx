import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const MACHINES = [
  { name: "Fruit & Vegetable Washer", desc: "High-capacity rotary drum washer removing surface contaminants under food-safe conditions." },
  { name: "Sorting Table", desc: "Stainless steel sorting line for size grading and manual quality inspection." },
  { name: "Blanching Machine", desc: "Controlled heat treatment unit to deactivate enzymes and preserve natural colour." },
  { name: "Peeling Machine", desc: "Abrasive peeler handling onion, ginger and taro with minimal wastage." },
  { name: "Slicing / Dicing Machine", desc: "Precision blade system producing uniform slices and dices for even drying." },
  { name: "Multi Fruit & Vegetable Cutter", desc: "Versatile cutter adaptable across multiple produce types in one pass." },
  { name: "Tomato Pulper", desc: "Continuous screw-press extracting smooth pulp while separating skin and seeds." },
  { name: "Tomato Crusher", desc: "Pre-processing crusher reducing whole tomatoes to a uniform mash for downstream operations." },
  { name: "Multi-purpose Processing Machine", desc: "Configurable processing unit that adapts to paste, juice and puree workflows." },
  { name: "Batch Mixing Tank", desc: "Jacketed agitator tank ensuring homogeneous blending of seasonings and additives." },
  { name: "Tray Dryer / Dehydrator", desc: "Multi-tray hot-air circulation dryer with PID temperature control for gentle dehydration." },
  { name: "Grinding Mill / Pulverizer", desc: "Pin-mill pulverizer achieving fine mesh powder from dried vegetable slices." },
  { name: "Vibro Grader", desc: "Vibratory screening unit classifying powder particle size for consistency." },
  { name: "Ribbon Blender", desc: "Horizontal ribbon-flight blender for uniform dry mixing of powders and spice blends." },
  { name: "Screw Conveyor", desc: "Enclosed conveying system for hygienic transfer of powder between process stages." },
  { name: "Pouch Packaging Machine", desc: "Vertical form-fill-seal machine for nitrogen-flushed, tamper-proof pouches." },
  { name: "Pouch Sealing Machine", desc: "Heat-sealer delivering hermetic seals for extended shelf life." },
  { name: "Oil Packaging Machine", desc: "Gravity-fill station with anti-drip nozzles for essential-oil bottling." },
  { name: "Bottle Capping Machine", desc: "Semi-automatic rotary capper ensuring consistent torque on glass and PET bottles." },
  { name: "Cold Storage", desc: "Walk-in refrigerated chamber maintaining 2–8 °C for raw material and finished-goods storage." },
  { name: "Steam Distillation Unit", desc: "Copper-coil distillation apparatus extracting hydrosols and essential oils from botanicals." },
];

export function MachinerySection() {
  return (
    <section className="py-20 sm:py-28 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-emerald-brand/8 text-emerald-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Wrench size={12} /> Industrial Machinery
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight mb-4"
        >
          State-of-the-Art Equipment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed"
        >
          21 specialised machines covering every step — from raw-produce handling to finished-product packaging.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MACHINES.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.07 }}
            className="group bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-[0_12px_40px_rgba(12,59,27,0.07)] hover:-translate-y-1 transition-all duration-300 flex gap-4 items-start"
          >
            {/* Placeholder image / icon block */}
            <div className="w-14 h-14 rounded-xl bg-[#8bc34a]/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-brand transition-colors duration-300">
              <Wrench size={22} className="text-emerald-brand group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 text-sm leading-tight mb-1.5 group-hover:text-emerald-brand transition-colors">
                {m.name}
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

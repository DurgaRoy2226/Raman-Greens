import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const OILS = [
  { name: "Tulsi Oil", emoji: "🌿", desc: "Sacred basil steam-distilled for its antibacterial and aromatic profile." },
  { name: "Rose Water", emoji: "🌹", desc: "Hydrosol byproduct of rose petal distillation — prized for skincare and culinary use." },
  { name: "Lemon Oil", emoji: "🍋", desc: "Cold-pressed from fresh lemon peel, rich in limonene and citrus aroma." },
  { name: "Orange Peel Extract", emoji: "🍊", desc: "Concentrated peel extract delivering natural flavour and antioxidant compounds." },
  { name: "Mint Oil", emoji: "🌱", desc: "High-menthol peppermint oil extracted from fresh mint leaf by steam distillation." },
  { name: "Ginger Extract", emoji: "🫚", desc: "CO₂-extracted ginger oleoresin retaining full gingerol potency for health products." },
];

export function EssentialOilSection() {
  return (
    <section className="py-20 sm:py-28 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <span className="inline-flex items-center gap-1.5 bg-[#8bc34a]/12 text-emerald-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
            <Droplets size={12} /> Essential Oils
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900 leading-tight mb-5">
            Pure Botanical Extracts
          </h2>
          <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed mb-6">
            Our steam distillation unit produces certified-pure essential oils and hydrosols from freshly
            harvested botanicals — zero synthetic additives, full natural potency.
          </p>
          {/* Process mini-steps */}
          <div className="space-y-4">
            {["Botanical harvesting & sorting", "Steam / CO₂ distillation", "Condensation & separation", "Quality testing & bottling"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-brand text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {i + 1}
                </div>
                <span className="text-neutral-700 text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: product cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OILS.map((oil, i) => (
            <motion.div
              key={oil.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-beige-warm/50 border border-beige-soft/60 rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_30px_rgba(12,59,27,0.07)] hover:-translate-y-1 transition-all duration-300 group flex gap-4 items-start"
            >
              <div className="text-3xl select-none">{oil.emoji}</div>
              <div>
                <h3 className="font-bold text-neutral-800 text-sm mb-1.5 group-hover:text-emerald-brand transition-colors">
                  {oil.name}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">{oil.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

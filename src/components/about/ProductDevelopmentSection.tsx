import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const STAGES = [
  { n: "01", title: "Business Analysis", desc: "Market research, competitive benchmarking, and feasibility study." },
  { n: "02", title: "Idea Generation", desc: "Brainstorming sessions with farmers, students, and domain experts." },
  { n: "03", title: "Screening", desc: "Filtering ideas against market demand, production capacity, and cost viability." },
  { n: "04", title: "Concept Development", desc: "Defining product specifications, target customer, and unique value proposition." },
  { n: "05", title: "Product Design", desc: "Recipe formulation, packaging design, and brand identity creation." },
  { n: "06", title: "Product Testing", desc: "Lab testing for safety, nutrition, shelf life, and organoleptic quality." },
  { n: "07", title: "Marketing Development", desc: "Pricing strategy, channel selection, and go-to-market planning." },
  { n: "08", title: "Commercialization", desc: "Full-scale production setup, FSSAI licensing, and supply chain onboarding." },
  { n: "09", title: "Market Introduction", desc: "Product launch via retail, e-commerce, and B2B distribution channels." },
  { n: "10", title: "Post-launch Analysis", desc: "Sales tracking, consumer feedback loops, and continuous product iteration." },
];

export function ProductDevelopmentSection() {
  return (
    <section className="py-20 sm:py-28 px-6 lg:px-12 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-emerald-brand/8 text-emerald-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        >
          <Lightbulb size={12} /> Product Development
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-900 leading-tight mb-4"
        >
          Our 10-Stage Innovation Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed"
        >
          Every product we launch passes through a rigorous, structured pipeline from raw idea to market success.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line — desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-brand/20 via-[#8bc34a]/40 to-transparent -translate-x-1/2" />

        <div className="space-y-8">
          {STAGES.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className={`relative flex flex-col lg:flex-row items-center gap-4 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="w-full lg:w-[calc(50%-2rem)] bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <span className="font-serif text-3xl font-bold text-[#8bc34a]/30 group-hover:text-[#8bc34a]/50 transition-colors leading-none block mb-3">{s.n}</span>
                  <h3 className="font-bold text-neutral-800 text-base mb-1.5 group-hover:text-emerald-brand transition-colors">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">{s.desc}</p>
                </div>

                {/* Center dot — desktop */}
                <div className="hidden lg:flex w-16 h-16 rounded-full bg-white border-2 border-[#8bc34a] text-emerald-brand items-center justify-center font-bold text-sm shrink-0 z-10 shadow-sm">
                  {s.n}
                </div>

                {/* Spacer */}
                <div className="hidden lg:block w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

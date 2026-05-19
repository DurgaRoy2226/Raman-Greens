<<<<<<< HEAD
import { motion } from "framer-motion";

export function About() {
  const machinery = [
    {
      id: 1,
      name: "Precision Processing Line",
      description: "Automated stainless steel processing machinery designed for meticulous sorting, cleaning, and preparation of raw ingredients.",
      image: "/images/food_processing.png"
    },
    {
      id: 2,
      name: "Automated Packaging System",
      description: "Advanced packaging technology that guarantees hygienic, airtight sealing to preserve the freshness and quality of our products.",
      image: "/images/packaging.png"
    },
    {
      id: 3,
      name: "Industrial Dehydrator",
      description: "State-of-the-art commercial dehydration unit ensuring maximum retention of nutrients and flavor while significantly extending shelf life.",
      image: "/images/dehydrator.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-emerald-brand text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Raman Greens</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
          Dedicated to bringing you the finest quality, chemical-free dehydrated products with a perfect blend of tradition and modern technology.
        </p>
      </section>

      {/* Machinery Section */}
      <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Our Advanced Machinery</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            We leverage cutting-edge industrial equipment to ensure our production process is highly efficient, perfectly hygienic, and exceptionally consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machinery.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-beige-soft"
            >
              <div className="relative h-64 overflow-hidden bg-beige-warm">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-emerald-brand transition-colors">
                  {machine.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {machine.description}
                </p>
=======
"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Award, Users, Zap, Wind, Thermometer, Settings2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const MACHINERY = [
  {
    id: "m1",
    name: "Cold-Press Extraction Unit",
    tag: "Organics · Oils",
    desc: "Wood-pressed Kachi Ghani expeller that extracts groundnut and sesame oil without heat, retaining all nutrients and the authentic Nimari aroma.",
    specs: ["No heat generation", "Preserves antioxidants", "≤35°C extraction temp"],
    icon: Wind,
    img: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-500/10 to-amber-500/5",
  },
  {
    id: "m2",
    name: "Stone-Grinding Mill",
    tag: "Spices · Flours",
    desc: "Granite stone chakki mill running at low RPM to grind spices and wheat flour without stripping nutritional value — just like your dadi's chakki.",
    specs: ["Low-RPM granite stones", "Retains bran & germ", "Zero metal contact"],
    icon: Settings2,
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80",
    accent: "from-stone-500/10 to-stone-500/5",
  },
  {
    id: "m3",
    name: "Industrial Fryer & Roaster",
    tag: "Snacks · Chivda",
    desc: "Stainless-steel batch fryer with automated temperature control for perfectly consistent, golden Nimari sev and chivda every single time.",
    specs: ["±2°C temperature accuracy", "SS 304 grade vessel", "Batch size: 50 kg"],
    icon: Thermometer,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    accent: "from-orange-500/10 to-orange-500/5",
  },
  {
    id: "m4",
    name: "Nitrogen-Flush Packaging Line",
    tag: "Packaging · Freshness",
    desc: "Automated VFFS packaging machines with nitrogen flushing to expel oxygen — extending shelf life naturally without preservatives.",
    specs: ["N₂ flush seal", "5× freshness extension", "0.5 g O₂ residual"],
    icon: Zap,
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
    accent: "from-blue-500/10 to-blue-500/5",
  },
  {
    id: "m5",
    name: "Quality Inspection Chamber",
    tag: "Quality · Lab",
    desc: "ISO-compliant in-house lab with moisture analysers, spectrophotometers and microbial testing equipment to certify every batch before dispatch.",
    specs: ["ISO 9001 compliant", "Microbial testing", "Batch traceability"],
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
    accent: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    id: "m6",
    name: "Solar-Powered Drying Tunnels",
    tag: "Organics · Drying",
    desc: "300-metre solar drying tunnels that sun-dry chillies, jaggery and organics without fossil fuels — preserving taste, colour and sustainability.",
    specs: ["100% solar powered", "Dust-free tunnel", "FSSAI certified"],
    icon: Leaf,
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    accent: "from-lime-500/10 to-lime-500/5",
  },
];

const STATS = [
  { n: "2018", l: "Founded" },
  { n: "50+", l: "Partner Farmers" },
  { n: "300ac", l: "Nimari Farmland" },
  { n: "12k+", l: "Happy Families" },
];

const VALUES = [
  { icon: Leaf, title: "100% Authentic", desc: "Every product originates from verified Nimari farms with full traceability." },
  { icon: ShieldCheck, title: "Zero Preservatives", desc: "Natural shelf life through cold-press, stone-grind, and nitrogen-seal technology." },
  { icon: Users, title: "Community First", desc: "200+ rural women employed; fair-trade prices for all partner farmers." },
  { icon: Award, title: "Award Winning", desc: "MP Fest 2025 Gold recipients for best regional organic food brand." },
];

export function About() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-nimar-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-0 right-0 opacity-[0.07] w-[500px] h-[500px]" viewBox="0 0 200 200">
            <path d="M150 10 C 70 30 40 100 30 180 C 120 160 150 80 150 10 Z" fill="#008F5A" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-24 text-center relative">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-brand mb-6">
              <Leaf size={12} /> Khandwa, Madhya Pradesh · Est. 2018
            </div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-tight text-neutral-900">
              About <span className="text-emerald-brand italic">Raman Greens</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Born in a small kitchen in Khandwa, built on Nimari black soil, and delivered to 12,000+ families
              across India — we make real food without shortcuts.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-emerald-brand text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-brand-dark shadow-xl shadow-emerald-brand/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Shop Our Products <ArrowRight size={18} />
              </Link>
              <a
                href="#machinery"
                className="inline-flex items-center gap-2 bg-white border-2 border-beige-soft px-8 py-4 rounded-full font-bold hover:border-emerald-brand hover:text-emerald-brand transition-all duration-300 shadow-lg"
              >
                Our Machinery ⚙️
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.3)}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((s) => (
              <div key={s.l} className="bg-white rounded-3xl p-6 border border-beige-soft shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="font-display font-bold text-3xl text-emerald-brand">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────── */}
      <section id="story" className="max-w-7xl mx-auto px-4 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp(0)} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-brand/10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
            alt="Nimari farms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-brand-dark/80 via-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-dark p-5 rounded-2xl text-white">
            <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-1">Our Roots</div>
            <div className="font-display text-xl">300 acres of Nimari black soil. 50+ partner farmers.</div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <div className="text-emerald-brand font-bold tracking-widest text-xs uppercase mb-3">Our Story</div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl leading-tight text-neutral-900">
            From Nimari soil to your table — without shortcuts.
          </h2>
          <p className="mt-6 text-neutral-600 leading-relaxed">
            Raman Greens KNW was founded in 2018 in Khandwa with a single belief: the soul of Nimar deserves a
            global stage. We work directly with 50+ farmers across the Narmada belt to bring you snacks, organics
            and gifting that taste exactly like home.
          </p>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Every product passes through our in-house quality lab before it reaches your doorstep. No artificial
            colours, no preservatives, no compromise — just the honest flavour of Nimar.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Direct-from-farm sourcing across 12 villages",
              "Stone-ground & cold-pressed processes only",
              "Zero artificial preservatives, ever",
              "Empowering 200+ rural women through partnerships",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-neutral-700">
                <CheckCircle2 size={18} className="text-emerald-brand mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── MISSION & VALUES ──────────────────────────────────── */}
      <section className="bg-beige-warm py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <div className="text-emerald-brand font-bold tracking-widest text-xs uppercase mb-3">What drives us</div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-neutral-900">Our Mission & Values</h2>
            <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
              We exist to prove that ethical, authentic and delicious food can all live in the same product.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="bg-white rounded-3xl p-7 border border-beige-soft shadow-sm hover:shadow-xl hover:shadow-emerald-brand/5 hover:-translate-y-2 transition-all duration-400 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-brand/10 text-emerald-brand flex items-center justify-center mb-5 group-hover:bg-emerald-brand group-hover:text-white transition-all duration-300">
                  <v.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MACHINERY ─────────────────────────────────────────── */}
      <section id="machinery" className="max-w-7xl mx-auto px-4 lg:px-8 py-28">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-brand/10 text-emerald-brand text-xs font-bold uppercase tracking-widest mb-4">
            <Settings2 size={13} /> Advanced Processing Units
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-neutral-900 leading-tight">
            Our <span className="text-emerald-brand italic">Machinery</span>
          </h2>
          <p className="mt-5 text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Modern production technology rooted in traditional wisdom. Every machine is chosen to preserve
            Nimar's authentic flavours while meeting the highest food-safety standards.
          </p>
        </motion.div>

        {/* Machinery grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {MACHINERY.map((m, i) => (
            <motion.div
              key={m.id}
              {...fadeUp(i * 0.08)}
              className="group bg-white rounded-[2rem] overflow-hidden border border-beige-soft shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-emerald-brand/10 hover:-translate-y-3 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                {/* Tag badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-emerald-brand text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {m.tag}
                </div>
                {/* Icon circle */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <m.icon size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-2 group-hover:text-emerald-brand transition-colors duration-300">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-5">{m.desc}</p>

                {/* Spec chips */}
                <div className="flex flex-wrap gap-2">
                  {m.specs.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-bold text-emerald-brand bg-emerald-brand/8 px-3 py-1 rounded-full border border-emerald-brand/15"
                    >
                      {s}
                    </span>
                  ))}
                </div>
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
              </div>
            </motion.div>
          ))}
        </div>
<<<<<<< HEAD
=======

        {/* Bottom callout */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-20 relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-10 lg:p-14 text-white overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-brand/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-emerald-brand/10 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-emerald-brand/80 mb-3">
                Modern Production Technology
              </div>
              <h3 className="font-display font-bold text-3xl lg:text-4xl leading-tight">
                Every batch is tracked, tested and trusted.
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed max-w-md">
                Our ISO-aligned quality pipeline means each product carries a traceable batch code — from farm
                to your doorstep, with zero gaps in accountability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "6", l: "Processing Lines" },
                { n: "ISO", l: "Quality Aligned" },
                { n: "0", l: "Preservatives" },
                { n: "100%", l: "Batch Traced" },
              ].map((s) => (
                <div key={s.l} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="font-display font-bold text-3xl text-emerald-brand">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-emerald-brand py-20 text-white text-center">
        <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto px-4">
          <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-4">Taste the Difference</div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl leading-tight">
            Ready to experience real Nimari food?
          </h2>
          <p className="mt-4 opacity-80 text-lg">
            Explore our full range of snacks, organics and gifting — crafted with the machines you just saw.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-emerald-brand px-8 py-4 rounded-full font-bold hover:bg-beige-warm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/25 transition-all duration-300"
            >
              My Account
            </Link>
          </div>
        </motion.div>
>>>>>>> 752e61b34fc3dfa17f2d0b5db6457739b5bcef7c
      </section>
    </div>
  );
}

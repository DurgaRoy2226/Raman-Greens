import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, Sprout, Package, Factory, Award, ClipboardList, FlaskConical,
  Wind, Sparkles, Droplet, ChevronLeft, ChevronRight, Flame, Search,
  Settings, ArrowRight, ShieldCheck, Lock, CheckSquare, Truck, RefreshCw,
  Smile, Wrench, Lightbulb, PenTool, GraduationCap, TrendingUp, Leaf
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }) };

export function About() {
  const [ci, setCi] = useState(0);

  const stats = [
    { icon: Users, value: "12K+", label: "Happy Customers" },
    { icon: Sprout, value: "50+", label: "Partner Farmers" },
    { icon: Package, value: "30+", label: "Product Categories" },
    { icon: Factory, value: "2+", label: "Processing Units" },
    { icon: Award, value: "6+", label: "Years of Experience" },
  ];

  const facilities = [
    { icon: ClipboardList, name: "Preparation\nSection" },
    { icon: FlaskConical, name: "Paste\nProcessing" },
    { icon: Wind, name: "Dehydration\nProcess" },
    { icon: Sparkles, name: "Powder\nGrinding" },
    { icon: Package, name: "Packaging\nSection" },
    { icon: Droplet, name: "Essential Oil\nDistillation" },
  ];

  const machines = [
    { name: "Fruit & Vegetable Washer Machine", desc: "Used for cleaning vegetables and fruits before processing.", image: "/images/food_processing.png", label: "Food Grade" },
    { name: "Blanching Machine", desc: "Helps maintain color, texture, and nutrients before drying.", image: "/images/food_processing.png", label: "Stainless Steel" },
    { name: "Tray Dryer / Dehydrator", desc: "Used for controlled drying of vegetables and fruits.", image: "/images/dehydrator.png", label: "Industrial Quality" },
    { name: "Pulverizer Machine", desc: "Grinds dried materials into fine powder.", image: "/images/food_processing.png", label: "Food Grade" },
    { name: "Ribbon Blender", desc: "Ensures uniform mixing of food powders.", image: "/images/packaging.png", label: "Hygienic Processing" },
    { name: "Vibro Sifter / Vibro Grader", desc: "Separates fine and coarse particles for better consistency.", image: "/images/food_processing.png", label: "Stainless Steel" },
    { name: "Pouch Packaging Machine", desc: "Used for hygienic and efficient powder packaging.", image: "/images/packaging.png", label: "Food Grade" },
    { name: "Heat Sealing Machine", desc: "Provides airtight sealing for freshness and shelf life.", image: "/images/packaging.png", label: "Industrial Quality" },
    { name: "Steam Distillation Unit", desc: "Used for extracting essential oils and plant extracts.", image: "/images/tea-cup.png", label: "Hygienic Processing" },
    { name: "Batch Mixing Tank", desc: "Used for liquid and paste mixing during processing.", image: "/images/food_processing.png", label: "Stainless Steel" },
    { name: "Multi Vegetable Cutter", desc: "Used for slicing and cutting raw vegetables efficiently.", image: "/images/food_processing.png", label: "Food Grade" },
    { name: "Tomato Pulper Machine", desc: "Extracts pulp from tomatoes and soft vegetables.", image: "/images/food_processing.png", label: "Industrial Quality" },
  ];

  const processedItems = [
    "Tomato", "Onion", "Beetroot", "Ginger",
    "Banana", "Papaya", "Garlic", "Leafy Veg",
    "Taro (Arbi)"
  ];

  const incubation = [
    { icon: Lightbulb, name: "Product\nDevelopment" },
    { icon: PenTool, name: "Packaging &\nBranding" },
    { icon: GraduationCap, name: "Food Processing\nTraining" },
    { icon: CheckSquare, name: "Product\nTesting" },
    { icon: TrendingUp, name: "Commercialization\nSupport" },
  ];

  const whyUs = [
    { icon: Sprout, name: "Fresh &\nOrganic" },
    { icon: ShieldCheck, name: "Hygienic\nProcessing" },
    { icon: Lock, name: "Secure\nPayment" },
    { icon: Award, name: "Quality\nTested" },
    { icon: Truck, name: "Farm Fresh\nIngredients" },
    { icon: RefreshCw, name: "Sustainable\nProcessing" },
    { icon: Smile, name: "Customer\nSatisfaction" },
    { icon: Wrench, name: "Modern\nMachinery" },
  ];

  const visibleMachines = machines.slice(ci, ci + 3).length === 3
    ? machines.slice(ci, ci + 3)
    : [...machines.slice(ci), ...machines.slice(0, 3 - (machines.length - ci))];

  const maxSlide = machines.length - 3;
  const next = () => setCi((p) => Math.min(p + 1, maxSlide));
  const prev = () => setCi((p) => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden">

      {/* ═══════ 1. HERO ═══════ */}
      <section className="relative overflow-hidden">
        {/* Soft green watercolor bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5e9]/60 via-white to-[#f1f8e9]/40 -z-10" />
        <div className="absolute top-0 left-0 w-[340px] h-[420px] opacity-[0.18] -z-[5] pointer-events-none"
          style={{ background: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=60") left top / cover no-repeat' }} />
        <div className="absolute top-0 right-0 w-[300px] h-[400px] opacity-[0.15] -z-[5] pointer-events-none"
          style={{ background: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=60") right top / cover no-repeat', transform: 'scaleX(-1)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" className="space-y-5 relative z-10">
              <motion.span variants={fadeUp} custom={0} className="text-[11px] font-bold tracking-[0.25em] text-[#2e7d32] uppercase">OUR STORY</motion.span>
              <motion.h1 variants={fadeUp} custom={1} className="font-serif text-[44px] sm:text-[56px] md:text-[64px] font-bold text-neutral-900 leading-[1.1]">
                About<br /><span className="text-emerald-brand italic font-serif">Raman Greens</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-[13px] sm:text-[14px] text-neutral-500 leading-relaxed max-w-md font-light">
                Raman Greens is a food processing and incubation-driven company dedicated to supporting farmers, encouraging entrepreneurship, and converting raw agricultural produce into high-value, natural, and healthy products.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 pt-2">
                <Link to="/shop" className="inline-flex items-center gap-2 bg-emerald-brand hover:bg-[#145a2a] text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 shadow-md">
                  Explore Shop <ArrowRight size={13} />
                </Link>
                <a href="#machinery" className="inline-flex items-center gap-2 border border-neutral-300 bg-white hover:border-emerald-brand text-neutral-700 hover:text-emerald-brand px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300">
                  Our Machinery <Settings size={13} />
                </a>
              </motion.div>
            </motion.div>
            {/* Right — Factory image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex justify-center z-10">
              <div className="absolute -inset-4 bg-[#c8e6c9]/25 rounded-[40px] blur-2xl -z-10" />
              <div className="rounded-[24px] overflow-hidden border-2 border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-w-lg w-full">
                <img src="/images/food_processing.png" alt="Raman Greens Processing Facility" className="w-full h-[320px] md:h-[380px] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ 2. STATS ═══════ */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto -mt-4 mb-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(46,125,50,0.08)] hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-brand group-hover:text-white transition-colors duration-300">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[28px] font-bold text-emerald-brand">{s.value}</h3>
                <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase mt-1">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════ 3. ABOUT OUR FACILITY ═══════ */}
      <section className="py-14 bg-white border-y border-neutral-100 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-serif text-[28px] sm:text-[32px] font-bold text-neutral-900 inline-flex items-center gap-2 mb-3">
            About Our Facility <Leaf className="text-[#2e7d32] fill-[#2e7d32]" size={18} />
          </motion.h2>
          <p className="text-neutral-400 text-[12px] sm:text-[13px] font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Our advanced processing unit is equipped with modern technology and follows strict quality standards to ensure purity, hygiene, and consistency in every product.
          </p>
          <div className="flex flex-wrap justify-center">
            {facilities.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center px-6 sm:px-8 py-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] border border-neutral-100 text-[#2e7d32] flex items-center justify-center mb-3 group-hover:bg-[#e8f5e9] group-hover:border-[#c8e6c9] transition-all duration-300">
                      <Icon size={22} strokeWidth={1.4} />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-700 leading-tight text-center whitespace-pre-line">{f.name}</span>
                  </div>
                  {i < facilities.length - 1 && <div className="hidden sm:block w-[1px] h-16 bg-neutral-200/60 self-center" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ 4. OUR MACHINERY ═══════ */}
      <section id="machinery" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-[#fafaf8] border border-neutral-100 rounded-[28px] p-8 md:p-10 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="font-serif text-[28px] font-bold text-neutral-900 inline-flex items-center gap-2 mb-2">
              Our Machinery <Leaf className="text-[#2e7d32]" size={16} />
            </h2>
            <p className="text-neutral-400 text-[12px] font-light">Modern machinery for hygienic and efficient food processing.</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {visibleMachines.map((m, i) => (
                <motion.div key={m.name + ci + i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c8e6c9] transition-all duration-300">
                  <div className="h-44 bg-neutral-100 overflow-hidden relative">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    {m.label && (
                      <span className="absolute top-3 left-3 bg-[#e8f5e9]/90 backdrop-blur-sm text-[#2e7d32] text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm border border-[#c8e6c9]/40">
                        {m.label}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-neutral-800 text-[13px] mb-1.5">{m.name}</h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button onClick={prev} className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow hover:border-emerald-brand text-neutral-500 hover:text-emerald-brand transition-all z-20">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow hover:border-emerald-brand text-neutral-500 hover:text-emerald-brand transition-all z-20">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex justify-center gap-1.5 mt-7">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <button key={idx} onClick={() => setCi(idx)} className={`h-2 rounded-full transition-all duration-300 ${ci === idx ? "bg-emerald-brand w-5" : "bg-neutral-200 w-2"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 5 & 6. DEHYDRATION + WE PROCESS ═══════ */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16">
        {/* Dehydration */}
        <div className="lg:col-span-5 bg-[#fafaf8] border border-neutral-100 rounded-[28px] p-8 shadow-sm">
          <h3 className="font-serif text-[22px] font-bold text-neutral-900 inline-flex items-center gap-2 mb-1">
            Dehydration Process <Leaf className="text-[#2e7d32] fill-[#2e7d32]" size={14} />
          </h3>
          <p className="text-[11px] text-neutral-400 font-light mb-8">Minimal processing, maximum nutrition.</p>
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[
              { label: "Prepare", icon: Leaf }, { label: "Dry", icon: Flame },
              { label: "Check", icon: Search }, { label: "Pack", icon: Package }
            ].map((s, idx, arr) => {
              const I = s.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center border border-[#c8e6c9]/50 hover:bg-emerald-brand hover:text-white transition-colors duration-300">
                      <I size={17} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-600 mt-2">{s.label}</span>
                  </div>
                  {idx < arr.length - 1 && <span className="text-neutral-300 text-sm mb-4">→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* We Process */}
        <div className="lg:col-span-7 bg-[#fafaf8] border border-neutral-100 rounded-[28px] p-8 shadow-sm">
          <h3 className="font-serif text-[22px] font-bold text-neutral-900 inline-flex items-center gap-2 mb-1">
            We Process <Leaf className="text-[#2e7d32] fill-[#2e7d32]" size={14} />
          </h3>
          <p className="text-[11px] text-neutral-400 font-light mb-6">Pure agricultural ingredients carefully sourced and prepared.</p>
          <div className="flex flex-wrap gap-2.5">
            {processedItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center bg-white border border-neutral-100 hover:border-[#c8e6c9] px-4 py-2 rounded-full text-[11px] font-medium text-neutral-700 hover:bg-[#f1f8e9] transition-colors cursor-default shadow-sm">
                {item}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 bg-white border border-neutral-100 px-4 py-2 rounded-full text-[11px] font-semibold text-neutral-400 cursor-default">+ More</span>
          </div>
        </div>
      </section>

      {/* ═══════ 7. INCUBATION ═══════ */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="bg-[#fafaf8] border border-neutral-100 rounded-[28px] p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-neutral-900 inline-flex items-center gap-2">
                Incubation & Entrepreneurship <Leaf className="text-[#2e7d32] fill-[#2e7d32]" size={16} />
              </h2>
              <p className="text-[12px] text-neutral-400 leading-relaxed font-light max-w-sm">
                We support students and entrepreneurs with guidance, training and modern facilities to turn ideas into successful businesses.
              </p>
            </div>
            <div className="lg:col-span-7 flex flex-wrap gap-6 justify-center lg:justify-end">
              {incubation.map((p, i) => {
                const I = p.icon;
                return (
                  <div key={i} className="flex flex-col items-center w-24 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f5f5] border border-neutral-100 text-[#2e7d32] flex items-center justify-center mb-2 group-hover:bg-[#e8f5e9] group-hover:border-[#c8e6c9] transition-all duration-300">
                      <I size={20} strokeWidth={1.4} />
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-600 leading-tight text-center whitespace-pre-line">{p.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 8. WHY CHOOSE US ═══════ */}
      <section className="py-14 bg-white border-y border-neutral-100 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-[28px] font-bold text-neutral-900 text-center inline-flex items-center gap-2 justify-center w-full mb-12">
            Why Choose Us <Leaf className="text-[#2e7d32] fill-[#2e7d32]" size={18} />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whyUs.map((w, i) => {
              const I = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-[#fafaf8] hover:bg-white hover:shadow-md hover:border-[#c8e6c9] border border-neutral-100 rounded-2xl p-5 transition-all duration-300 flex flex-col items-center text-center group">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f5e9] text-[#2e7d32] group-hover:bg-emerald-brand group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300">
                    <I size={18} strokeWidth={1.4} />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight whitespace-pre-line">{w.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ 9. CTA ═══════ */}
      <section className="pt-16 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto relative">
          {/* Decorative leaves */}
          <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-20 pointer-events-none -z-0 rotate-[30deg]">
            <Leaf size={160} className="text-[#2e7d32] fill-[#2e7d32]" />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 opacity-15 pointer-events-none -z-0 rotate-[-20deg]">
            <Leaf size={130} className="text-[#4caf50] fill-[#4caf50]" />
          </div>

          <div className="bg-gradient-to-r from-emerald-brand via-[#145a2a] to-emerald-brand rounded-[28px] p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden z-10">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaves.png")' }} />
            <div className="relative z-10 max-w-xl">
              <h2 className="font-serif text-[24px] sm:text-[30px] md:text-[34px] font-bold text-white inline-flex items-center gap-2 mb-2 flex-wrap">
                Explore Our Natural Product Range <Leaf className="text-[#8bc34a] fill-[#8bc34a]" size={18} />
              </h2>
              <p className="text-[12px] sm:text-[13px] text-white/60 font-light leading-relaxed">
                Discover our range of natural powders, essential oils and food solutions.
              </p>
            </div>
            <Link to="/shop" className="relative z-10 inline-flex items-center gap-2 bg-white hover:bg-[#f1f8e9] text-emerald-brand px-8 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-lg transition-all duration-300 shrink-0">
              Explore Shop <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

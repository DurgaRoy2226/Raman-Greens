import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Smile, Users, Layers, Factory, Award } from "lucide-react";

const STATS = [
  { icon: Smile, value: 500, suffix: "+", label: "Happy Customers" },
  { icon: Users, value: 120, suffix: "+", label: "Partner Farmers" },
  { icon: Layers, value: 30, suffix: "+", label: "Product Categories" },
  { icon: Factory, value: 6, suffix: "", label: "Processing Units" },
  { icon: Award, value: 5, suffix: "+", label: "Years of Experience" },
];

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ icon: Icon, value, suffix, label }: { icon: React.FC<{ size?: number; className?: string }>; value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center group"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#8bc34a]/15 text-emerald-brand flex items-center justify-center mb-4 group-hover:bg-emerald-brand group-hover:text-white transition-all duration-300">
        <Icon size={24} />
      </div>
      <p className="font-serif text-4xl font-bold text-emerald-brand mb-1">
        {count}{suffix}
      </p>
      <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-beige-warm/40 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

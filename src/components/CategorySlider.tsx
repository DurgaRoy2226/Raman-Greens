import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "Vegetables", cat: "Organics",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    bg: "#14532d",
  },
  {
    name: "Fruits", cat: "Organics",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80",
    bg: "#7f1d1d",
  },
  {
    name: "Snacks", cat: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80",
    bg: "#7c2d12",
  },
  {
    name: "Sweets", cat: "Sweets",
    image: "https://images.unsplash.com/photo-1602112816249-fda5b4375b6e?auto=format&fit=crop&w=500&q=80",
    bg: "#831843",
  },
  {
    name: "Spices", cat: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80",
    bg: "#713f12",
  },
  {
    name: "Gifting", cat: "Gifting",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63bc?auto=format&fit=crop&w=500&q=80",
    bg: "#3b0764",
  },
  {
    name: "Organics", cat: "Organics",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=500&q=80",
    bg: "#064e3b",
  },
  {
    name: "Beverages", cat: "Organics",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=500&q=80",
    bg: "#1e3a5f",
  },
  {
    name: "Dairy", cat: "Organics",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80",
    bg: "#78350f",
  },
  {
    name: "Bakery", cat: "Snacks",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    bg: "#1c1917",
  },
];

const DOUBLED  = [...CATEGORIES, ...CATEGORIES];
const CARD_W   = 260;   // landscape width
const CARD_H   = 190;   // landscape height
const GAP      = 16;
const DURATION = CATEGORIES.length * 3; // ~3s per card

const keyframes = `
@keyframes rg-hscroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export function CategorySlider() {
  const [paused, setPaused] = useState(false);

  const totalWidth = DOUBLED.length * (CARD_W + GAP);

  const trackStyle: React.CSSProperties = {
    display: "flex",
    gap: `${GAP}px`,
    width: `${totalWidth}px`,
    animation: `rg-hscroll ${DURATION}s linear infinite`,
    animationPlayState: paused ? "paused" : "running",
  };

  return (
    <section className="py-14 bg-white w-full" style={{ overflow: "hidden" }}>
      <style>{keyframes}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-emerald-brand font-semibold tracking-widest text-xs uppercase mb-1">
            Explore
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight">
            Shop by Categories
          </h2>
        </motion.div>
      </div>

      {/* Scrolling track — zero padding, true edge-to-edge */}
      <div
        style={{ width: "100%", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 800)}
      >
        <div style={trackStyle}>
          {DOUBLED.map((cat, i) => (
            <Link
              key={`${cat.name}-${i}`}
              to={`/shop?cat=${cat.cat}`}
              draggable="false"
              style={{ flexShrink: 0, width: CARD_W }}
              className="group flex flex-col"
            >
              {/* Image card */}
              <div
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 16,
                  overflow: "hidden",
                  backgroundColor: cat.bg,
                  position: "relative",
                  flexShrink: 0,
                }}
                className="shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  draggable="false"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  className="group-hover:scale-110 transition-transform duration-500 group-hover:opacity-95"
                />
              </div>

              {/* Label below card */}
              <p className="mt-2.5 text-[13px] font-semibold text-neutral-700 text-center group-hover:text-emerald-600 transition-colors duration-200">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

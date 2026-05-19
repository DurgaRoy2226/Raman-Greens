export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rgGrad" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#2BB07F" />
            <stop offset="100%" stopColor="#006B43" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#rgGrad)" />
        {/* Leaf */}
        <path
          d="M44 18 C30 20 22 30 20 44 C34 42 42 34 44 18 Z"
          fill="#fff"
          opacity="0.92"
        />
        <path d="M22 42 L42 22" stroke="#008F5A" strokeWidth="1.6" strokeLinecap="round" />
        {/* Letters */}
        <text
          x="32"
          y="56"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="9"
          fill="#fff"
          letterSpacing="1"
        >
          RG·KNW
        </text>
      </svg>
      <div className="leading-tight">
        <div className="font-display font-bold text-lg text-emerald-brand">Raman Greens</div>
        <div className="text-[10px] tracking-[0.25em] text-neutral-500 font-semibold uppercase">KNW · Khandwa</div>
      </div>
    </div>
  );
}

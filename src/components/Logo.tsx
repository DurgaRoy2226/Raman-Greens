export function Logo({ className = "", height = "h-11 md:h-14" }: { className?: string; height?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/images/logo.png"
        alt="Raman Greens Logo"
        className={`object-contain ${height} w-auto`}
      />
    </div>
  );
}


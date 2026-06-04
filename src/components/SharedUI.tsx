import React from "react";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Share2 } from "lucide-react";

interface WishlistButtonProps {
  wished: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
}

export function WishlistButton({ wished, onClick, className = "", size = 15 }: WishlistButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20 cursor-pointer ${
        wished
          ? "bg-emerald-600 text-white"
          : "bg-white/90 backdrop-blur-sm text-neutral-500 hover:bg-white hover:text-emerald-600"
      } ${className}`}
      aria-label="Toggle wishlist"
    >
      <Heart size={size} className={wished ? "fill-white" : ""} />
    </button>
  );
}

interface CartButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
  disabled?: boolean;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function CartButton({ onClick, className = "", size = 15, disabled = false, children, showIcon = true }: CartButtonProps) {
  if (children) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-emerald-600/30 hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-85 text-xs tracking-wider uppercase ${className}`}
      >
        {showIcon && <ShoppingCart size={size} />}
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-emerald-600/30 hover:shadow-lg active:scale-90 cursor-pointer disabled:opacity-50 ${className}`}
      aria-label="Add to cart"
    >
      <ShoppingCart size={size} />
    </button>
  );
}

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
}

export function ArrowButton({ direction, onClick, className = "", size = 15 }: ArrowButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-100/80 shadow-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-neutral-500 hover:bg-white hover:text-emerald-600 cursor-pointer ${className}`}
      aria-label={direction === "left" ? "Slide Left" : "Slide Right"}
    >
      <Icon size={size} />
    </button>
  );
}

interface ShareButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
  title?: string;
}

export function ShareButton({ onClick, className = "", size = 15, title = "Copy Page Link" }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-100/80 shadow-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-neutral-500 hover:bg-white hover:text-emerald-600 cursor-pointer ${className}`}
      title={title}
    >
      <Share2 size={size} />
    </button>
  );
}

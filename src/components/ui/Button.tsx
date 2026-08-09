import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "success" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/30 active:scale-[0.98]",
  secondary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm shadow-teal-500/30 active:scale-[0.98]",
  success: "bg-ok-500 text-white hover:bg-ok-600 active:scale-[0.98]",
  outline: "bg-white text-brand-600 border-2 border-brand-200 hover:border-brand-400 active:scale-[0.98]",
  ghost: "bg-transparent text-ink-700 hover:bg-brand-50 active:scale-[0.98]",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl gap-1.5",
  md: "px-4 py-2.5 text-base rounded-2xl gap-2",
  lg: "px-6 py-3.5 text-lg rounded-2xl gap-2.5",
};

export function Button({ variant = "primary", size = "md", fullWidth, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-semibold transition-all duration-150 select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}

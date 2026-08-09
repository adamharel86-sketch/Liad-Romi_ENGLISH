import React from "react";

interface PillProps {
  emoji?: string;
  children: React.ReactNode;
  tone?: "brand" | "sun" | "coral" | "teal" | "neutral";
  className?: string;
}

const TONE_CLASSES: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700",
  sun: "bg-sun-50 text-sun-600",
  coral: "bg-coral-50 text-coral-600",
  teal: "bg-teal-50 text-teal-600",
  neutral: "bg-ink-900/5 text-ink-700",
};

export function Pill({ emoji, children, tone = "neutral", className = "" }: PillProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${TONE_CLASSES[tone]} ${className}`}>
      {emoji && <span>{emoji}</span>}
      {children}
    </span>
  );
}

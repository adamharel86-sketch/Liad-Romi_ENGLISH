import React from "react";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  trackColor?: string;
  height?: number;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({ value, color = "var(--color-brand-500)", trackColor = "var(--color-brand-100)", height = 10, className = "", animated = true }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full rounded-full overflow-hidden ${className}`} style={{ height, background: trackColor }}>
      <div
        className={animated ? "h-full rounded-full transition-[width] duration-500 ease-out" : "h-full rounded-full"}
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  );
}

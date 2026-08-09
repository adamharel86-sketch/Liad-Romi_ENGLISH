import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  interactive?: boolean;
}

export function Card({ padded = true, interactive = false, className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-[var(--app-radius,1.25rem)] border border-ink-300/15 shadow-[0_2px_10px_rgba(41,22,112,0.06)]",
        padded ? "p-4 sm:p-5" : "",
        interactive ? "transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(41,22,112,0.12)] cursor-pointer active:translate-y-0" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dir?: "ltr" | "rtl";
}

export function Modal({ open, onClose, children, dir = "rtl" }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4 animate-float-up"
      onClick={onClose}
    >
      <div
        dir={dir}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-pop max-h-[85vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

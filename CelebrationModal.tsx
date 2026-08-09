import React from "react";
import { Confetti } from "./Confetti";
import { Button } from "../ui/Button";

interface CelebrationModalProps {
  open: boolean;
  emoji: string;
  titleHe: string;
  subtitleHe?: string;
  onClose: () => void;
}

export function CelebrationModal({ open, emoji, titleHe, subtitleHe, onClose }: CelebrationModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 p-4" onClick={onClose}>
      <div className="relative">
        <Confetti />
        <div dir="rtl" className="relative bg-white rounded-3xl shadow-2xl px-8 py-8 text-center max-w-sm animate-pop">
          <div className="text-6xl mb-3 animate-pulse-ring inline-block rounded-full">{emoji}</div>
          <h2 className="font-display text-2xl font-bold text-ink-900 mb-1">{titleHe}</h2>
          {subtitleHe && <p className="text-ink-500 mb-4">{subtitleHe}</p>}
          <Button onClick={onClose} fullWidth>
            יאללה, המשך! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}

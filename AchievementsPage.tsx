import React, { useMemo } from "react";
import { useStudentContext } from "../context/StudentContext";
import { ACHIEVEMENT_DEFS } from "../data/seed/achievements";
import { listAchievements } from "../data/store/repository";
import { Card } from "../components/ui/Card";
import { Pill } from "../components/ui/Pill";

export function AchievementsPage() {
  const { activeStudent } = useStudentContext();
  const unlocked = useMemo(() => (activeStudent ? new Set(listAchievements(activeStudent.id).map((a) => a.id)) : new Set()), [activeStudent]);

  if (!activeStudent) return null;

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">🏆 הישגים</h1>
      <p className="text-ink-500 mb-6">
        פתחת {unlocked.size} מתוך {ACHIEVEMENT_DEFS.length} הישגים
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ACHIEVEMENT_DEFS.map((def) => {
          const isUnlocked = unlocked.has(def.id);
          return (
            <Card key={def.id} className={`text-center py-6 ${isUnlocked ? "" : "opacity-50"}`}>
              <div className="text-4xl mb-2">{isUnlocked ? def.emoji : "🔒"}</div>
              <div className="font-bold text-ink-900 text-sm mb-1">{def.titleHe}</div>
              <div className="text-xs text-ink-500 mb-2">{def.descriptionHe}</div>
              {isUnlocked && <Pill tone="sun">נפתח! ✅</Pill>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Pill } from "../components/ui/Pill";
import { ProgressBar } from "../components/ui/ProgressBar";
import { buildRecommendedActivities } from "../engine/adaptiveEngine";
import { determineNextLesson, generateDailyChallenge } from "../services/ai/aiService";
import { getDailyChallenge, listAchievements, saveDailyChallenge } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { ACHIEVEMENT_DEFS } from "../data/seed/achievements";
import { GRADE_LABEL_HE } from "../types/models";

export function DashboardPage() {
  const { activeStudent } = useStudentContext();
  const navigate = useNavigate();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "בוקר טוב";
    if (hour < 18) return "צהריים טובים";
    return "ערב טוב";
  });

  const today = todayISODate();
  const dailyChallenge = useMemo(() => {
    if (!activeStudent) return null;
    let dc = getDailyChallenge(activeStudent.id, today);
    if (!dc) {
      dc = generateDailyChallenge(activeStudent, today);
      saveDailyChallenge(dc);
    }
    return dc;
  }, [activeStudent, today]);

  const recommended = useMemo(() => (activeStudent ? buildRecommendedActivities(activeStudent) : []), [activeStudent]);
  const recentAchievements = useMemo(() => (activeStudent ? listAchievements(activeStudent.id).slice(0, 3) : []), [activeStudent]);

  if (!activeStudent) return null;
  const student = activeStudent;

  const isJunior = student.colorTheme === "junior";
  const goalProgress = Math.min(100, Math.round((student.minutesTodayTotal / student.dailyGoalMinutes) * 100));

  function handleContinue() {
    const next = determineNextLesson(student);
    navigate(next.route);
  }

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
          {greeting}, {activeStudent.name}! {activeStudent.avatar}
        </h1>
        <p className="text-ink-500 mt-1">
          {GRADE_LABEL_HE[activeStudent.grade]} · רמה נוכחית: <span className="font-semibold text-brand-600">{activeStudent.currentLevel}</span>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="text-center py-4">
          <div className="text-2xl mb-1">⭐</div>
          <div className="font-bold text-xl text-ink-900">{activeStudent.xp}</div>
          <div className="text-xs text-ink-500">נקודות XP</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl mb-1">🔥</div>
          <div className="font-bold text-xl text-ink-900">{activeStudent.streakDays}</div>
          <div className="text-xs text-ink-500">רצף ימים</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl mb-1">📘</div>
          <div className="font-bold text-xl text-ink-900">{activeStudent.totalLessonsCompleted}</div>
          <div className="text-xs text-ink-500">שיעורים שהושלמו</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl mb-1">🔤</div>
          <div className="font-bold text-xl text-ink-900">{activeStudent.totalWordsLearned}</div>
          <div className="text-xs text-ink-500">מילים שנלמדו</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Continue learning + daily goal */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-ink-900 mb-1">היעד היומי שלך</h2>
            <p className="text-sm text-ink-500 mb-3">
              {activeStudent.minutesTodayTotal} / {activeStudent.dailyGoalMinutes} דקות היום
            </p>
            <ProgressBar value={goalProgress} height={14} />
          </div>
          <Button size="lg" className="mt-5" onClick={handleContinue}>
            {isJunior ? "המשך ללמוד! 🚀" : "המשך ללמוד"}
          </Button>
        </Card>

        {/* Daily challenge */}
        <Card>
          <h2 className="font-bold text-ink-900 mb-2 flex items-center gap-1.5">🎯 האתגר היומי</h2>
          <ul className="space-y-2">
            {dailyChallenge?.tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between text-sm">
                <span className="text-ink-700">{t.labelHe}</span>
                <span className={`font-semibold ${t.progress >= t.target ? "text-ok-500" : "text-ink-500"}`}>
                  {t.progress}/{t.target}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recommended activities */}
      <h2 className="font-bold text-ink-900 mb-3">פעילויות מומלצות להיום</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {recommended.map((act) => (
          <Card key={act.id} interactive onClick={() => navigate(act.route)} className="text-center py-5">
            <div className="text-3xl mb-2">{act.emoji}</div>
            <div className="font-semibold text-sm text-ink-900">{act.titleHe}</div>
          </Card>
        ))}
      </div>

      {/* Recent achievements */}
      {recentAchievements.length > 0 && (
        <div>
          <h2 className="font-bold text-ink-900 mb-3">הישגים אחרונים</h2>
          <div className="flex gap-3 flex-wrap">
            {recentAchievements.map((a) => {
              const def = ACHIEVEMENT_DEFS.find((d) => d.id === a.id);
              if (!def) return null;
              return (
                <Pill key={a.id} tone="sun" emoji={def.emoji}>
                  {def.titleHe}
                </Pill>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

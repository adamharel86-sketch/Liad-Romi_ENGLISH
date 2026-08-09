import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { GRADE_LABEL_HE, type StudentProfile } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Pill } from "../components/ui/Pill";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getPlacementResult, getProgress, listConversations, listSpeakingAttempts, listWritingAttempts } from "../data/store/repository";
import { generateParentReport } from "../services/ai/aiService";
import { todayISODate } from "../data/store/localStore";

const SKILL_LABELS_HE: Record<string, string> = {
  vocabulary: "אוצר מילים",
  reading: "קריאה",
  comprehension: "הבנת הנקרא",
  speaking: "דיבור",
  pronunciation: "הגייה",
  listening: "האזנה",
  grammar: "דקדוק",
  writing: "כתיבה",
  conversation: "שיחה",
  confidence: "ביטחון",
};

export function ParentsPage() {
  const { students } = useStudentContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(students[0]?.id ?? null);

  const activeChild = students.find((s) => s.id === selectedId) ?? students[0];

  if (!activeChild) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center">
        <p className="text-ink-500">אין עדיין פרופילים. חזרו למסך הבחירה.</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-ink-900/[0.02] via-white to-brand-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">👨‍👩‍👧‍👦 אזור ההורים</h1>
            <p className="text-ink-500">מעקב התקדמות אישי לכל ילד</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/welcome")}>⬅️ חזרה</Button>
        </div>

        {/* Child tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-thin pb-1">
          {students.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold whitespace-nowrap transition-colors ${
                s.id === activeChild.id ? "bg-brand-500 text-white shadow-sm" : "bg-white text-ink-700 hover:bg-brand-50 border border-ink-300/15"
              }`}
            >
              <span className="text-xl">{s.avatar}</span>
              <span>{s.name}</span>
              <span className="text-xs opacity-75">{GRADE_LABEL_HE[s.grade]}</span>
            </button>
          ))}
        </div>

        <ChildReport child={activeChild} />
      </div>
    </div>
  );
}

function ChildReport({ child }: { child: StudentProfile }) {
  const progress = useMemo(() => getProgress(child.id), [child.id]);
  const placement = useMemo(() => getPlacementResult(child.id), [child.id]);
  const conversations = useMemo(() => listConversations(child.id), [child.id]);
  const speaking = useMemo(() => listSpeakingAttempts(child.id), [child.id]);
  const writing = useMemo(() => listWritingAttempts(child.id), [child.id]);

  const today = todayISODate();
  const weekStart = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().slice(0, 10);
  }, []);

  const report = useMemo(() => generateParentReport(child, weekStart, today), [child, weekStart, today]);

  const masteredSkills = Object.values(progress.skillMastery).filter((m) => m.attemptsCount > 0);
  const overallMastery = masteredSkills.length ? Math.round(masteredSkills.reduce((s, m) => s + m.masteryPercent, 0) / masteredSkills.length) : 0;
  const placementScore = placement?.scoreBySkill ? Object.values(placement.scoreBySkill).reduce((a, b) => a + (b ?? 0), 0) / Math.max(1, Object.keys(placement.scoreBySkill).length) : 0;
  const progressDelta = Math.round(overallMastery - placementScore);

  if (!child.onboardingComplete) {
    return (
      <Card className="text-center py-10">
        <div className="text-4xl mb-3">✨</div>
        <p className="text-ink-500">{child.name} עדיין לא התחיל/ה להשתמש באפליקציה.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard emoji="⏱️" value={`${report.minutesPracticed}`} label="דקות למידה היום" />
        <StatCard emoji="📘" value={`${report.lessonsCompleted}`} label="שיעורים שהושלמו" />
        <StatCard emoji="🔤" value={`${report.wordsLearned}`} label="מילים שנלמדו" />
        <StatCard emoji="🔥" value={`${report.streakDays}`} label="רצף ימי למידה" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-bold text-ink-900 mb-1">רמת אנגלית נוכחית</h2>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-brand-600">{child.currentLevel}</span>
            {placement && (
              <Pill tone={progressDelta >= 0 ? "teal" : "coral"} emoji={progressDelta >= 0 ? "📈" : "📉"}>
                {progressDelta >= 0 ? `+${progressDelta}%` : `${progressDelta}%`} מאז מבחן הרמה
              </Pill>
            )}
          </div>
          <div className="space-y-2">
            {masteredSkills.slice(0, 6).map((m) => (
              <div key={m.skill}>
                <div className="flex justify-between text-xs text-ink-500 mb-0.5">
                  <span>{SKILL_LABELS_HE[m.skill]}</span>
                  <span>{m.masteryPercent}%</span>
                </div>
                <ProgressBar value={m.masteryPercent} height={6} />
              </div>
            ))}
            {masteredSkills.length === 0 && <p className="text-sm text-ink-500">עדיין אין מספיק נתונים.</p>}
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-ink-900 mb-3">נקודות חוזקה ותחומים לשיפור</h2>
          <div className="mb-3">
            <p className="text-sm font-semibold text-ok-600 mb-1">💪 חוזקות</p>
            <div className="flex flex-wrap gap-1.5">
              {report.strengths.length ? report.strengths.map((s, i) => <Pill key={i} tone="teal">{s}</Pill>) : <span className="text-sm text-ink-500">בבנייה...</span>}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-coral-600 mb-1">🎯 תחומים לשיפור</p>
            <div className="flex flex-wrap gap-1.5">
              {report.improvementAreas.length ? report.improvementAreas.map((s, i) => <Pill key={i} tone="coral">{s}</Pill>) : <span className="text-sm text-ink-500">אין כרגע נושאים בולטים 🎉</span>}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-bold text-ink-900 mb-2">📋 סיכום שבועי (נוצר אוטומטית ע"י AI)</h2>
        <p className="text-ink-700 leading-relaxed mb-4">{report.summaryHe}</p>
        <h3 className="font-semibold text-ink-900 text-sm mb-2">המלצות לשבוע הקרוב</h3>
        <ul className="space-y-1.5">
          {report.recommendationsHe.map((r, i) => (
            <li key={i} className="text-sm text-ink-700 flex gap-2">
              <span>👉</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-bold text-ink-900 mb-3">פעילות אחרונה</h2>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <ActivityStat emoji="💬" value={conversations.length} label="שיחות AI" />
          <ActivityStat emoji="🎤" value={speaking.length} label="תרגולי דיבור" />
          <ActivityStat emoji="📝" value={writing.length} label="מטלות כתיבה" />
        </div>
      </Card>
    </div>
  );
}

function StatCard({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <Card className="text-center py-4">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="font-bold text-xl text-ink-900">{value}</div>
      <div className="text-xs text-ink-500">{label}</div>
    </Card>
  );
}

function ActivityStat({ emoji, value, label }: { emoji: string; value: number; label: string }) {
  return (
    <div className="bg-brand-50 rounded-xl px-3 py-3 text-center">
      <div className="text-xl mb-1">{emoji}</div>
      <div className="font-bold text-ink-900">{value}</div>
      <div className="text-xs text-ink-500">{label}</div>
    </div>
  );
}

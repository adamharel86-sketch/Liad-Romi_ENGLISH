import React, { useMemo, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { writingTasksForGrade } from "../data/seed/writing";
import type { WritingTask, WritingIssue } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { analyzeWriting } from "../services/ai/aiService";
import { saveWritingAttempt, recordSkillAttempt, updateStudent } from "../data/store/repository";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";

type View = "tasks" | "writing" | "reviewing" | "final";

export function WritingPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const [view, setView] = useState<View>("tasks");
  const [task, setTask] = useState<WritingTask | null>(null);
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [improvedVersion, setImprovedVersion] = useState("");
  const [scores, setScores] = useState<{ grammar: number; vocabulary: number; spelling: number; structure: number; clarity: number } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);

  if (!activeStudent) return null;
  const student = activeStudent;
  const tasks = useMemo(() => writingTasksForGrade(student.grade), [student]);

  function startTask(t: WritingTask) {
    setTask(t);
    setText(t.exampleOpening ? t.exampleOpening + " " : "");
    setAttempts(0);
    setView("writing");
  }

  function checkWriting() {
    if (!task) return;
    const result = analyzeWriting(text, task, student.grade);
    setIssues(result.issues);
    setImprovedVersion(result.improvedVersion);
    setScores(result.scores);
    setAttempts((a) => a + 1);
    setView("reviewing");
  }

  function finalize() {
    if (!task || !scores) return;
    saveWritingAttempt({
      id: `write-${Date.now()}`,
      studentId: student.id,
      taskId: task.id,
      draftText: text,
      issues,
      improvedVersion,
      scores,
      submittedAt: new Date().toISOString(),
    });
    recordSkillAttempt(student.id, "writing", issues.filter((i) => i.type !== "structure").length === 0);
    const avgScore = Math.round((scores.grammar + scores.vocabulary + scores.spelling + scores.structure + scores.clarity) / 5);
    const xp = 15 + Math.round(avgScore / 10) * 3;
    awardXp(xp, 8);
    updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
    refreshStudents();
    const unlocked = checkAndUnlockAchievements(student);
    if (unlocked.length > 0) setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
    setView("final");
  }

  if (view === "tasks") {
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-3xl mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">📝 מאמן הכתיבה</h1>
        <p className="text-ink-500 mb-6">בחר/י משימת כתיבה. ה-AI יעזור לך לשפר, אבל אתם כותבים!</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {tasks.map((t) => (
            <Card key={t.id} interactive onClick={() => startTask(t)}>
              <div className="font-bold text-ink-900 mb-1">{t.title}</div>
              <p className="text-sm text-ink-500 mb-2">{t.instructionsHe}</p>
              <p dir="ltr" className="text-xs text-ink-500 italic">{t.instructions}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!task) return null;

  if (view === "writing") {
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto">
        <button className="text-ink-500 text-sm mb-4" onClick={() => setView("tasks")}>⬅️ חזרה למשימות</button>
        <Card>
          <h1 className="font-bold text-xl text-ink-900 mb-1">{task.title}</h1>
          <p className="text-sm text-ink-500 mb-4">{task.instructionsHe}</p>
          <textarea
            dir="ltr"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write here..."
            className="w-full min-h-40 border-2 border-brand-100 rounded-2xl p-4 text-lg focus:outline-none focus:border-brand-400"
          />
          <p className="text-xs text-ink-500 mt-2">
            {text.trim().split(/\s+/).filter(Boolean).length} / {task.minWords} מילים
          </p>
        </Card>
        <Button size="lg" fullWidth className="mt-5" onClick={checkWriting} disabled={!text.trim()}>
          בדוק את הכתיבה שלי 🔍
        </Button>
      </div>
    );
  }

  if (view === "reviewing") {
    const realIssues = issues.filter((i) => i.type !== "structure" || true);
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto">
        <Card className="mb-4">
          <p dir="ltr" className="text-lg text-ink-900 leading-relaxed">{text}</p>
        </Card>

        {realIssues.length === 0 ? (
          <Card className="mb-4 bg-ok-500/10 border-ok-500/30">
            <p className="text-ok-600 font-semibold text-center">כל הכבוד! לא מצאנו טעויות. מוכנ/ה לראות את הגרסה הסופית? 🎉</p>
          </Card>
        ) : (
          <Card className="mb-4">
            <h2 className="font-bold text-ink-900 mb-3">💡 רמזים לשיפור (ניסיון {attempts})</h2>
            <ul className="space-y-3">
              {realIssues.map((issue, i) => (
                <li key={i} className="text-sm">
                  <span dir="ltr" className="font-mono bg-sun-50 text-sun-600 rounded px-1.5 py-0.5">
                    {issue.excerpt || "..."}
                  </span>
                  <p className="text-ink-700 mt-1">{issue.hint}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="grid gap-3">
          <Button
            onClick={() => setView("writing")}
          >
            ✏️ אני רוצה לתקן בעצמי
          </Button>
          <Button variant="secondary" onClick={finalize}>
            הראה לי את הגרסה הסופית ✅
          </Button>
        </div>
      </div>
    );
  }

  // final
  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto">
      <CelebrationModal
        open={!!celebration}
        emoji={celebration?.emoji ?? "🏆"}
        titleHe={celebration?.title ?? ""}
        subtitleHe={celebration?.subtitle}
        onClose={() => setCelebration(null)}
      />
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-4 text-center">✍️ הגרסה המשופרת שלך</h1>

      {issues.length > 0 && (
        <Card className="mb-4">
          <h2 className="font-bold text-ink-900 mb-2 text-sm">הסבר על הטעויות שנותרו</h2>
          <ul className="space-y-2 text-sm">
            {issues.map((issue, i) => (
              <li key={i} className="text-ink-700">
                • {issue.explanation}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="mb-4 bg-brand-50">
        <p dir="ltr" className="text-lg text-ink-900 leading-relaxed">{improvedVersion}</p>
      </Card>

      {scores && (
        <Card className="mb-4">
          <h2 className="font-bold text-ink-900 mb-3 text-sm">ניתוח הכתיבה</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <ScoreRow label="דקדוק" value={scores.grammar} />
            <ScoreRow label="אוצר מילים" value={scores.vocabulary} />
            <ScoreRow label="איות" value={scores.spelling} />
            <ScoreRow label="מבנה משפט" value={scores.structure} />
            <ScoreRow label="בהירות" value={scores.clarity} />
          </div>
        </Card>
      )}

      <Button size="lg" fullWidth onClick={() => setView("tasks")}>
        למשימת כתיבה נוספת 📝
      </Button>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-ink-300/15">
      <span className="text-ink-700">{label}</span>
      <span className="font-bold text-brand-600">{value}</span>
    </div>
  );
}

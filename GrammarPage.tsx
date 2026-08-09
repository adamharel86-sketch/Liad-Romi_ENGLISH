import React, { useMemo, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { grammarTopicsForGrade, GRADE3_SENTENCE_PATTERNS, type GrammarTopic, type SentencePattern } from "../data/seed/grammar";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { generateExercise, evaluateAnswer } from "../services/ai/aiService";
import type { Exercise } from "../types/models";
import { recordSkillAttempt, recordMistake, bumpDailyChallengeProgress, updateStudent } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";

type View = "topics" | "explain" | "practice" | "summary";

const QUESTIONS_PER_TOPIC = 5;

export function GrammarPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const [view, setView] = useState<View>("topics");
  const [topic, setTopic] = useState<GrammarTopic | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exIndex, setExIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);

  if (!activeStudent) return null;
  const student = activeStudent;
  const isGrade3 = student.grade === "grade3";
  const topics = useMemo(() => grammarTopicsForGrade(student.grade), [student]);

  // ------------------ Grade 3: simplified sentence patterns ------------------
  const [g3Index, setG3Index] = useState(0);
  const [g3Correct, setG3Correct] = useState(0);
  const [g3Selected, setG3Selected] = useState<string | null>(null);

  function answerG3(pattern: SentencePattern, opt: string) {
    setG3Selected(opt);
    const correct = opt === pattern.correctAnswer;
    if (correct) setG3Correct((c) => c + 1);
    recordSkillAttempt(student.id, "grammar", correct);
  }

  function nextG3() {
    setG3Selected(null);
    if (g3Index + 1 >= GRADE3_SENTENCE_PATTERNS.length) {
      const xp = 10 + g3Correct * 5;
      awardXp(xp, 5);
      bumpDailyChallengeProgress(student.id, todayISODate(), "grammar", GRADE3_SENTENCE_PATTERNS.length);
      updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
      refreshStudents();
      setView("summary");
    } else {
      setG3Index((i) => i + 1);
    }
  }

  if (isGrade3) {
    if (view === "summary") {
      return (
        <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">כל הכבוד!</h1>
          <p className="text-ink-500 mb-5">ענית נכון על {g3Correct} מתוך {GRADE3_SENTENCE_PATTERNS.length} משפטים</p>
          <Button
            size="lg"
            fullWidth
            onClick={() => {
              setG3Index(0);
              setG3Correct(0);
              setView("topics");
            }}
          >
            תרגול נוסף 🔁
          </Button>
        </div>
      );
    }
    const pattern = GRADE3_SENTENCE_PATTERNS[g3Index];
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-1">✏️ משפטים באנגלית</h1>
        <p className="text-ink-500 mb-5">בחר/י את המילה הנכונה להשלמת המשפט</p>
        <ProgressBar value={((g3Index + 1) / GRADE3_SENTENCE_PATTERNS.length) * 100} className="mb-6" />
        <Card className="text-center py-8">
          <div className="text-5xl mb-4">{pattern.emoji}</div>
          <p dir="ltr" className="text-2xl font-bold text-ink-900 mb-2">{pattern.frame}</p>
          <p className="text-ink-500 mb-6">{pattern.frameHe}</p>
          <div className="grid gap-2 max-w-xs mx-auto">
            {pattern.options.map((opt) => (
              <button
                key={opt}
                dir="ltr"
                disabled={!!g3Selected}
                onClick={() => answerG3(pattern, opt)}
                className={`border-2 rounded-xl px-4 py-2.5 font-semibold text-lg transition-colors ${
                  g3Selected === opt
                    ? opt === pattern.correctAnswer
                      ? "border-ok-500 bg-ok-500/10"
                      : "border-bad-500 bg-bad-500/10"
                    : "border-brand-100 hover:border-brand-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </Card>
        {g3Selected && (
          <Button size="lg" fullWidth className="mt-5" onClick={nextG3}>
            הבא ⬅️
          </Button>
        )}
      </div>
    );
  }

  // ------------------ Grade 4 / 6 / 7: full grammar lab ------------------
  function startTopic(t: GrammarTopic) {
    setTopic(t);
    setView("explain");
  }

  function startPractice() {
    if (!topic) return;
    const generated = Array.from({ length: QUESTIONS_PER_TOPIC }, () =>
      generateExercise({ studentId: student.id, grade: student.grade, skill: "grammar", topic: topic.id })
    );
    setExercises(generated);
    setExIndex(0);
    setCorrectCount(0);
    setAnswer(null);
    setFeedback(null);
    setView("practice");
  }

  function submitAnswer(value: string) {
    const ex = exercises[exIndex];
    setAnswer(value);
    const result = evaluateAnswer(ex, value);
    if (result.correct) setCorrectCount((c) => c + 1);
    else recordMistake(student.id, "grammar", ex.topic, `Mistake on ${ex.topic}`);
    recordSkillAttempt(student.id, "grammar", result.correct);
    setFeedback({ correct: result.correct, message: result.feedback });
  }

  function nextExercise() {
    setAnswer(null);
    setFeedback(null);
    if (exIndex + 1 >= exercises.length) {
      const xp = 15 + correctCount * 5;
      awardXp(xp, 6);
      bumpDailyChallengeProgress(student.id, todayISODate(), "grammar", exercises.length);
      updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
      refreshStudents();
      const unlocked = checkAndUnlockAchievements(student);
      if (unlocked.length > 0) setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
      setView("summary");
    } else {
      setExIndex((i) => i + 1);
    }
  }

  if (view === "topics") {
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">✏️ מעבדת דקדוק</h1>
        <p className="text-ink-500 mb-6">בחר/י נושא לתרגול</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topics.map((t) => (
            <Card key={t.id} interactive onClick={() => startTopic(t)} className="text-center py-5">
              <div className="text-3xl mb-2">{t.emoji}</div>
              <div className="font-semibold text-ink-900 text-sm">{t.titleHe}</div>
              <div dir="ltr" className="text-xs text-ink-500 mt-1">{t.title}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === "explain" && topic) {
    const content = topic.content[activeStudent.grade] ?? Object.values(topic.content)[0]!;
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto">
        <button className="text-ink-500 text-sm mb-4" onClick={() => setView("topics")}>⬅️ חזרה לנושאים</button>
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{topic.emoji}</span>
            <h1 className="font-bold text-xl text-ink-900">{topic.titleHe}</h1>
          </div>
          <p dir="ltr" className="text-ink-700 mb-4">{content.explanation}</p>
          <div className="space-y-2">
            {content.examples.map((ex, i) => (
              <div key={i} dir="ltr" className="bg-brand-50 rounded-xl px-4 py-2 text-ink-900 text-sm">
                {ex}
              </div>
            ))}
          </div>
        </Card>
        <Button size="lg" fullWidth className="mt-5" onClick={startPractice}>
          לתרגול! 💪
        </Button>
      </div>
    );
  }

  if (view === "practice") {
    const ex = exercises[exIndex];
    if (!ex) return null;
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto">
        <ProgressBar value={((exIndex + 1) / exercises.length) * 100} className="mb-6" />
        <Card>
          <p dir="ltr" className="text-lg font-semibold text-ink-900 mb-4">{ex.prompt}</p>
          {ex.options ? (
            <div className="grid gap-2">
              {ex.options.map((opt) => (
                <button
                  key={opt}
                  dir="ltr"
                  disabled={!!feedback}
                  onClick={() => submitAnswer(opt)}
                  className={`text-left border-2 rounded-xl px-4 py-2.5 font-medium transition-colors ${
                    answer === opt
                      ? feedback?.correct
                        ? "border-ok-500 bg-ok-500/10"
                        : "border-bad-500 bg-bad-500/10"
                      : "border-brand-100 hover:border-brand-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <FillBlankInput exercise={ex} onSubmit={submitAnswer} disabled={!!feedback} />
          )}
          {feedback && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${feedback.correct ? "bg-ok-500/10 text-ok-600" : "bg-bad-500/10 text-bad-600"}`} dir="ltr">
              {feedback.message}
            </div>
          )}
        </Card>
        {feedback && (
          <Button size="lg" fullWidth className="mt-5" onClick={nextExercise}>
            {exIndex + 1 >= exercises.length ? "לסיכום 🏁" : "הבא ⬅️"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <CelebrationModal
        open={!!celebration}
        emoji={celebration?.emoji ?? "🏆"}
        titleHe={celebration?.title ?? ""}
        subtitleHe={celebration?.subtitle}
        onClose={() => setCelebration(null)}
      />
      <div className="text-6xl mb-4">🧠✨</div>
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">תרגול הושלם!</h1>
      <p className="text-ink-500 mb-5">ענית נכון על {correctCount} מתוך {exercises.length} שאלות</p>
      <Button size="lg" fullWidth onClick={() => setView("topics")}>
        חזרה לנושאים ✏️
      </Button>
    </div>
  );
}

function FillBlankInput({ exercise, onSubmit, disabled }: { exercise: Exercise; onSubmit: (v: string) => void; disabled: boolean }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <input
        dir="ltr"
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer..."
        className="border-2 border-brand-100 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-400"
      />
      {!disabled && (
        <Button onClick={() => onSubmit(value)} disabled={!value.trim()}>
          בדוק ✅
        </Button>
      )}
    </div>
  );
}

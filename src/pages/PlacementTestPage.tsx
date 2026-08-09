import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { placementQuestionsForGrade } from "../data/seed/placement";
import type { PlacementAnswer } from "../types/models";
import { scorePlacementTest } from "../engine/placementEngine";
import { savePlacementResult } from "../data/store/repository";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";

export function PlacementTestPage() {
  const { activeStudent, patchActiveStudent } = useStudentContext();
  const navigate = useNavigate();
  const questions = useMemo(() => (activeStudent ? placementQuestionsForGrade(activeStudent.grade) : []), [activeStudent]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [result, setResult] = useState<ReturnType<typeof scorePlacementTest> | null>(null);

  if (!activeStudent) return null;
  const student = activeStudent;
  const isJunior = student.colorTheme === "junior";
  const question = questions[index];

  function submitAnswer(answerText: string) {
    if (!question) return;
    const correct = question.correctAnswer === "open" ? answerText.trim().length > 0 : answerText.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    const newAnswer: PlacementAnswer = {
      questionId: question.id,
      answer: answerText,
      correct,
      timeMs: Date.now() - startedAt,
    };
    const updated = [...answers, newAnswer];
    setAnswers(updated);
    setTextAnswer("");
    setStartedAt(Date.now());

    if (index + 1 >= questions.length) {
      const scored = scorePlacementTest(student.grade, questions, updated);
      savePlacementResult({
        studentId: student.id,
        completedAt: new Date().toISOString(),
        answers: updated,
        scoreBySkill: scored.scoreBySkill,
        determinedLevel: scored.determinedLevel,
        summary: scored.summary,
      });
      patchActiveStudent({ placementTestComplete: true, currentLevel: scored.determinedLevel });
      setResult(scored);
    } else {
      setIndex(index + 1);
    }
  }

  if (result) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-teal-50">
        <Card className="max-w-lg w-full text-center animate-pop">
          <div className="text-6xl mb-3">🎉</div>
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">מבחן הרמה הושלם!</h1>
          <p className="text-ink-700 mb-4" dir="ltr">
            {result.summary}
          </p>
          <div className="bg-brand-50 rounded-2xl p-4 mb-5">
            <div className="text-sm text-ink-500 mb-1">הרמה האישית שלך</div>
            <div className="text-3xl font-bold text-brand-600">{result.determinedLevel}</div>
          </div>
          <Button fullWidth size="lg" onClick={() => navigate("/home")}>
            למסך הבית שלי 🏠
          </Button>
        </Card>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div dir="rtl" className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-brand-50 via-white to-teal-50 flex flex-col items-center">
      <div className="max-w-lg w-full">
        <div className="text-center mb-4">
          <p className="text-ink-500 text-sm mb-2">
            {isJunior ? "בואו נראה מה אתה יודע! 🌟" : "מבחן רמה קצר כדי להתאים לך את הלימוד בול"}
          </p>
          <ProgressBar value={((index + 1) / questions.length) * 100} height={10} />
          <p className="text-xs text-ink-500 mt-1">{index + 1} / {questions.length}</p>
        </div>

        <Card className="animate-float-up">
          <p dir="ltr" className="text-lg sm:text-xl font-semibold text-ink-900 mb-5 text-center leading-relaxed">
            {question.prompt}
          </p>

          {question.options ? (
            <div className="grid gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  dir="ltr"
                  onClick={() => submitAnswer(opt)}
                  className="w-full text-left border-2 border-brand-100 rounded-2xl px-4 py-3 font-medium text-ink-900 hover:border-brand-400 hover:bg-brand-50 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <textarea
                dir="ltr"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full border-2 border-brand-100 rounded-2xl p-3 min-h-24 focus:outline-none focus:border-brand-400"
              />
              <Button onClick={() => submitAnswer(textAnswer)} disabled={textAnswer.trim().length === 0}>
                הבא ⬅️
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

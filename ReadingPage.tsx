import React, { useMemo, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { storiesForGrade, type ReadingStory, type ReadingQuestion } from "../data/seed/reading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Pill } from "../components/ui/Pill";
import { Modal } from "../components/ui/Modal";
import { speak } from "../utils/speech";
import { recordSkillAttempt, bumpDailyChallengeProgress, updateStudent } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";

type View = "list" | "reading" | "questions" | "summary";

export function ReadingPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const [view, setView] = useState<View>("list");
  const [story, setStory] = useState<ReadingStory | null>(null);
  const [popoverWord, setPopoverWord] = useState<{ word: string; translation: string } | null>(null);
  const [explainModal, setExplainModal] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);

  const stories = useMemo(() => (activeStudent ? storiesForGrade(activeStudent.grade) : []), [activeStudent]);

  if (!activeStudent) return null;
  const student = activeStudent;

  function openStory(s: ReadingStory) {
    setStory(s);
    setView("reading");
  }

  function lookupWord(raw: string) {
    if (!story) return;
    const clean = raw.replace(/[.,!?"']/g, "").toLowerCase();
    const translation = story.glossary[clean];
    if (translation) setPopoverWord({ word: clean, translation });
  }

  function explainSentence(sentence: string) {
    if (!story) return;
    const words = sentence.toLowerCase().replace(/[.,!?"']/g, "").split(/\s+/);
    const glossed = words
      .map((w) => (story.glossary[w] ? `${w} = ${story.glossary[w]}` : null))
      .filter(Boolean);
    setExplainModal(glossed.length ? `במשפט הזה: ${glossed.join(" · ")}` : "משפט זה משתמש באוצר מילים שכבר מוכר לך! נסה/י לקרוא אותו לאט, מילה-מילה.");
  }

  function startQuestions() {
    setQIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setShortAnswer("");
    setFeedback(null);
    setView("questions");
  }

  function answerQuestion(q: ReadingQuestion, answer: string) {
    const isOpen = q.correctAnswer === "open";
    const correct = isOpen ? answer.trim().length > 3 : answer.trim().toLowerCase() === q.correctAnswer.toLowerCase();
    if (correct) setCorrectCount((c) => c + 1);
    recordSkillAttempt(student.id, "comprehension", correct);
    setFeedback({ correct, explanation: q.explanation });
  }

  function nextQuestion() {
    if (!story) return;
    setSelected(null);
    setShortAnswer("");
    setFeedback(null);
    if (qIndex + 1 >= story.questions.length) {
      finishStory();
    } else {
      setQIndex((i) => i + 1);
    }
  }

  function finishStory() {
    if (!story) return;
    recordSkillAttempt(student.id, "reading", true);
    const xp = 15 + correctCount * 5;
    awardXp(xp, 8);
    updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
    bumpDailyChallengeProgress(student.id, todayISODate(), "reading", 1);
    refreshStudents();
    const unlocked = checkAndUnlockAchievements(student);
    if (unlocked.length > 0) setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
    setView("summary");
  }

  // -------------------- list --------------------
  if (view === "list") {
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">📖 קריאה</h1>
        <p className="text-ink-500 mb-6">בחר/י סיפור, ולחצו על כל מילה כדי לראות תרגום</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {stories.map((s) => (
            <Card key={s.id} interactive onClick={() => openStory(s)}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{s.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-ink-900">{s.titleHe}</div>
                  <div dir="ltr" className="text-sm text-ink-500">{s.title}</div>
                </div>
                <Pill tone="brand">{"⭐".repeat(s.level)}</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // -------------------- reading --------------------
  if (view === "reading" && story) {
    const paragraphs = story.text.split("\n\n");
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto">
        <button className="text-ink-500 text-sm mb-4" onClick={() => setView("list")}>⬅️ חזרה לסיפורים</button>
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{story.emoji}</span>
            <h1 className="font-bold text-xl text-ink-900">{story.titleHe}</h1>
          </div>
          <div dir="ltr" className="space-y-4 text-lg leading-relaxed text-ink-900">
            {paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="group">
                <p>
                  {para.split(" ").map((w, i) => (
                    <span key={i} className="cursor-pointer hover:bg-brand-100 rounded px-0.5" onClick={() => lookupWord(w)}>
                      {w}{" "}
                    </span>
                  ))}
                </p>
                <button
                  dir="rtl"
                  onClick={() => explainSentence(para)}
                  className="text-xs text-brand-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  💡 הסבר לי את המשפט
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => speak(story.text.replace(/\n\n/g, " "))} className="mt-4 text-2xl">🔊</button>
        </Card>
        <Button size="lg" className="mt-5" fullWidth onClick={startQuestions}>
          למעבר לשאלות ➡️
        </Button>

        {popoverWord && (
          <Modal open={!!popoverWord} onClose={() => setPopoverWord(null)}>
            <div className="text-center">
              <div dir="ltr" className="text-2xl font-bold text-ink-900 mb-2">{popoverWord.word}</div>
              <div className="text-xl text-brand-600 mb-4">{popoverWord.translation}</div>
              <Button onClick={() => setPopoverWord(null)}>סגור</Button>
            </div>
          </Modal>
        )}
        {explainModal && (
          <Modal open={!!explainModal} onClose={() => setExplainModal(null)}>
            <p className="text-ink-900 text-center mb-4">{explainModal}</p>
            <Button fullWidth onClick={() => setExplainModal(null)}>הבנתי!</Button>
          </Modal>
        )}
      </div>
    );
  }

  // -------------------- questions --------------------
  if (view === "questions" && story) {
    const q = story.questions[qIndex];
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto">
        <ProgressBar value={((qIndex + 1) / story.questions.length) * 100} className="mb-6" />
        <Card>
          <p dir="ltr" className="text-lg font-semibold text-ink-900 mb-4">{q.question}</p>
          {q.options ? (
            <div className="grid gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  dir="ltr"
                  disabled={!!feedback}
                  onClick={() => {
                    setSelected(opt);
                    answerQuestion(q, opt);
                  }}
                  className={`text-left border-2 rounded-xl px-4 py-2.5 font-medium transition-colors ${
                    selected === opt
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
            <div className="flex flex-col gap-3">
              <textarea
                dir="ltr"
                disabled={!!feedback}
                value={shortAnswer}
                onChange={(e) => setShortAnswer(e.target.value)}
                className="border-2 border-brand-100 rounded-xl p-3 min-h-20 focus:outline-none focus:border-brand-400"
                placeholder="Write your answer..."
              />
              {!feedback && (
                <Button onClick={() => answerQuestion(q, shortAnswer)} disabled={!shortAnswer.trim()}>בדוק ✅</Button>
              )}
            </div>
          )}

          {feedback && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${feedback.correct ? "bg-ok-500/10 text-ok-600" : "bg-bad-500/10 text-bad-600"}`}>
              <p className="font-semibold mb-1">{feedback.correct ? "נכון! ✅" : "כמעט..."}</p>
              <p dir="ltr">{feedback.explanation}</p>
            </div>
          )}
        </Card>
        {feedback && (
          <Button size="lg" fullWidth className="mt-5" onClick={nextQuestion}>
            {qIndex + 1 >= story.questions.length ? "לסיכום 🏁" : "הבא ⬅️"}
          </Button>
        )}
      </div>
    );
  }

  // -------------------- summary --------------------
  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <CelebrationModal
        open={!!celebration}
        emoji={celebration?.emoji ?? "🏆"}
        titleHe={celebration?.title ?? ""}
        subtitleHe={celebration?.subtitle}
        onClose={() => setCelebration(null)}
      />
      <div className="text-6xl mb-4">📖✨</div>
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">סיפור הושלם!</h1>
      <p className="text-ink-500 mb-5">ענית נכון על {correctCount} מתוך {story?.questions.length ?? 0} שאלות הבנה</p>
      <Button size="lg" fullWidth onClick={() => setView("list")}>
        לסיפור הבא 📚
      </Button>
    </div>
  );
}

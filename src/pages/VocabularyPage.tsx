import React, { useMemo, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { TOPIC_LABELS, wordsForGrade } from "../data/seed/vocabulary";
import type { VocabularyWord } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Pill } from "../components/ui/Pill";
import { speak } from "../utils/speech";
import { pickWordsForSession } from "../engine/srs";
import { targetDifficultyForSkill } from "../engine/adaptiveEngine";
import { getWordProgressMap, recordSkillAttempt, reviewWord, bumpDailyChallengeProgress, updateStudent } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";

type GameType = "multiple-choice" | "listen-choose" | "spelling" | "fill-blank";
type View = "topics" | "learn" | "practice" | "summary";

export function VocabularyPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const [view, setView] = useState<View>("topics");
  const [topic, setTopic] = useState<string | null>(null);
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [gameQueue, setGameQueue] = useState<{ word: VocabularyWord; type: GameType }[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);

  const allWords = useMemo(() => (activeStudent ? wordsForGrade(activeStudent.grade) : []), [activeStudent]);
  const progressMap = useMemo(() => (activeStudent ? getWordProgressMap(activeStudent.id) : {}), [activeStudent, view]);

  const topics = useMemo(() => {
    const set = new Map<string, VocabularyWord[]>();
    for (const w of allWords) {
      if (!set.has(w.topic)) set.set(w.topic, []);
      set.get(w.topic)!.push(w);
    }
    return Array.from(set.entries());
  }, [allWords]);

  if (!activeStudent) return null;
  const student = activeStudent;
  const isJunior = student.colorTheme === "junior";

  function startTopic(topicId: string) {
    const difficulty = targetDifficultyForSkill(student, "vocabulary");
    const words = pickWordsForSession(student.id, student.grade, difficulty, 6, topicId);
    setTopic(topicId);
    setSessionWords(words.length ? words : allWords.filter((w) => w.topic === topicId).slice(0, 6));
    setCardIndex(0);
    setView("learn");
  }

  function finishLearning() {
    const words = sessionWords;
    const types: GameType[] = ["multiple-choice", "listen-choose", "spelling", "fill-blank"];
    const queue = words.map((w, i) => ({ word: w, type: types[i % types.length] }));
    setGameQueue(queue);
    setGameIndex(0);
    setCorrectCount(0);
    setFeedback(null);
    setInputValue("");
    setView("practice");
  }

  function makeOptions(correct: string, pool: string[], n = 3): string[] {
    const others = pool.filter((p) => p !== correct);
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, n);
    return [...shuffled, correct].sort(() => Math.random() - 0.5);
  }

  function handleAnswer(isCorrect: boolean, correctText: string) {
    if (!activeStudent) return;
    const current = gameQueue[gameIndex];
    reviewWord(activeStudent.id, current.word.id, isCorrect);
    recordSkillAttempt(activeStudent.id, "vocabulary", isCorrect);
    if (isCorrect) setCorrectCount((c) => c + 1);
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? pick(["מעולה! ⭐", "כל הכבוד! 🎉", "מדויק! 👏"]) : `לא בדיוק. התשובה הנכונה: ${correctText}`,
    });
  }

  function nextGame() {
    setFeedback(null);
    setInputValue("");
    if (gameIndex + 1 >= gameQueue.length) {
      finishSession();
    } else {
      setGameIndex((i) => i + 1);
    }
  }

  function finishSession() {
    if (!activeStudent) return;
    const newWordsLearned = sessionWords.filter((w) => (progressMap[w.id]?.timesSeen ?? 0) === 0).length;
    const xpGain = 10 + correctCount * 5;
    awardXp(xpGain, 5);
    updateStudent(activeStudent.id, {
      totalWordsLearned: activeStudent.totalWordsLearned + newWordsLearned,
      totalLessonsCompleted: activeStudent.totalLessonsCompleted + 1,
    });
    bumpDailyChallengeProgress(activeStudent.id, todayISODate(), "words", sessionWords.length);
    refreshStudents();
    const unlocked = checkAndUnlockAchievements({ ...activeStudent, totalWordsLearned: activeStudent.totalWordsLearned + newWordsLearned });
    if (unlocked.length > 0) {
      setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
    }
    setView("summary");
  }

  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // -------------------- Render: topic list --------------------
  if (view === "topics") {
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-5xl mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">📚 אוצר מילים</h1>
        <p className="text-ink-500 mb-6">בחר/י נושא ותתחיל/י ללמוד מילים חדשות</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topics.map(([topicId, words]) => {
            const label = TOPIC_LABELS[topicId] ?? { en: topicId, he: topicId, emoji: "📘" };
            const known = words.filter((w) => (progressMap[w.id]?.box ?? 0) >= 4).length;
            return (
              <Card key={topicId} interactive onClick={() => startTopic(topicId)} className="text-center py-5">
                <div className="text-3xl mb-2">{label.emoji}</div>
                <div className="font-semibold text-ink-900">{label.he}</div>
                <div className="text-xs text-ink-500 mt-1">{words.length} מילים</div>
                <ProgressBar value={(known / words.length) * 100} className="mt-2" height={6} />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------- Render: learn (flashcards) --------------------
  if (view === "learn") {
    const word = sessionWords[cardIndex];
    if (!word) return null;
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[80vh] flex flex-col">
        <button className="text-ink-500 text-sm mb-4 self-start" onClick={() => setView("topics")}>
          ⬅️ חזרה לנושאים
        </button>
        <ProgressBar value={((cardIndex + 1) / sessionWords.length) * 100} className="mb-6" />
        <Card className="flex-1 flex flex-col items-center justify-center text-center py-10 animate-pop" key={word.id}>
          <div className="text-6xl mb-4">{word.emoji}</div>
          <div dir="ltr" className="text-3xl font-bold text-ink-900 mb-2">{word.word}</div>
          <button onClick={() => speak(word.word)} className="text-2xl mb-4" aria-label="Listen">🔊</button>
          <div className="text-lg text-brand-600 font-semibold mb-3">{word.translationHe}</div>
          <div dir="ltr" className="text-ink-500 text-sm mb-3 max-w-xs">{word.simpleDefinition}</div>
          <div dir="ltr" className="bg-brand-50 rounded-xl px-4 py-2 text-ink-700 text-sm italic max-w-xs">"{word.exampleSentence}"</div>
        </Card>
        <Button
          size="lg"
          className="mt-6"
          onClick={() => {
            if (cardIndex + 1 >= sessionWords.length) finishLearning();
            else setCardIndex((i) => i + 1);
          }}
        >
          {cardIndex + 1 >= sessionWords.length ? "בואו נתרגל! 🎮" : "הבא ⬅️"}
        </Button>
      </div>
    );
  }

  // -------------------- Render: practice games --------------------
  if (view === "practice") {
    const current = gameQueue[gameIndex];
    if (!current) return null;
    const { word, type } = current;
    const pool = allWords.map((w) => w.translationHe);

    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[80vh] flex flex-col">
        <ProgressBar value={((gameIndex + 1) / gameQueue.length) * 100} className="mb-6" />
        <Card className="flex-1 flex flex-col items-center justify-center text-center py-8 animate-pop" key={`${word.id}-${type}`}>
          {type === "multiple-choice" && (
            <>
              <div className="text-4xl mb-3">{word.emoji}</div>
              <p dir="ltr" className="text-2xl font-bold text-ink-900 mb-5">{word.word}</p>
              <p className="text-ink-500 text-sm mb-3">מה הפירוש?</p>
              <div className="grid gap-2 w-full max-w-xs">
                {makeOptions(word.translationHe, pool).map((opt) => (
                  <Button key={opt} variant="outline" disabled={!!feedback} onClick={() => handleAnswer(opt === word.translationHe, word.translationHe)}>
                    {opt}
                  </Button>
                ))}
              </div>
            </>
          )}

          {type === "listen-choose" && (
            <>
              <p className="text-ink-500 text-sm mb-3">הקשיבו ובחרו את המילה הנכונה</p>
              <button onClick={() => speak(word.word)} className="text-5xl mb-5">🔊</button>
              <div className="grid gap-2 w-full max-w-xs">
                {makeOptions(word.word, allWords.map((w) => w.word)).map((opt) => (
                  <Button key={opt} variant="outline" disabled={!!feedback} onClick={() => handleAnswer(opt === word.word, word.word)}>
                    <span dir="ltr">{opt}</span>
                  </Button>
                ))}
              </div>
            </>
          )}

          {type === "spelling" && (
            <>
              <div className="text-4xl mb-3">{word.emoji}</div>
              <p className="text-ink-700 font-semibold mb-1">{word.translationHe}</p>
              <p dir="ltr" className="text-ink-500 text-sm mb-4">{word.simpleDefinition}</p>
              <input
                dir="ltr"
                disabled={!!feedback}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type the English word..."
                className="border-2 border-brand-200 rounded-xl px-4 py-2 w-full max-w-xs text-center text-lg mb-4 focus:outline-none focus:border-brand-400"
              />
              {!feedback && (
                <Button onClick={() => handleAnswer(inputValue.trim().toLowerCase() === word.word.toLowerCase(), word.word)} disabled={!inputValue.trim()}>
                  בדוק ✅
                </Button>
              )}
            </>
          )}

          {type === "fill-blank" && (
            <>
              <p className="text-ink-500 text-sm mb-3">השלימו את המשפט</p>
              <p dir="ltr" className="text-lg font-semibold text-ink-900 mb-5 max-w-xs">
                {word.exampleSentence.replace(new RegExp(word.word, "i"), "____")}
              </p>
              <div className="grid gap-2 w-full max-w-xs">
                {makeOptions(word.word, allWords.map((w) => w.word)).map((opt) => (
                  <Button key={opt} variant="outline" disabled={!!feedback} onClick={() => handleAnswer(opt === word.word, word.word)}>
                    <span dir="ltr">{opt}</span>
                  </Button>
                ))}
              </div>
            </>
          )}

          {feedback && (
            <div className={`mt-5 font-semibold ${feedback.correct ? "text-ok-500" : "text-bad-500"}`}>{feedback.message}</div>
          )}
        </Card>

        {feedback && (
          <Button size="lg" className="mt-6" onClick={nextGame}>
            {gameIndex + 1 >= gameQueue.length ? "לסיכום 🏁" : "הבא ⬅️"}
          </Button>
        )}
      </div>
    );
  }

  // -------------------- Render: summary --------------------
  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
      <CelebrationModal
        open={!!celebration}
        emoji={celebration?.emoji ?? "🏆"}
        titleHe={celebration?.title ?? ""}
        subtitleHe={celebration?.subtitle}
        onClose={() => setCelebration(null)}
      />
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">כל הכבוד!</h1>
      <p className="text-ink-500 mb-5">
        ענית נכון על {correctCount} מתוך {gameQueue.length} שאלות
      </p>
      <Pill tone="sun" emoji="⭐" className="mb-6 text-lg">
        +{10 + correctCount * 5} XP
      </Pill>
      <Button size="lg" fullWidth onClick={() => setView("topics")}>
        חזרה לנושאים 📚
      </Button>
    </div>
  );
}

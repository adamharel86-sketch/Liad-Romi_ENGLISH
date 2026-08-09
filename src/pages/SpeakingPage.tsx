import React, { useMemo, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { speakingPromptsForGrade } from "../data/seed/speaking";
import type { SpeakingPrompt } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { speak, createRecognizer, speechSupported } from "../utils/speech";
import { saveSpeakingAttempt, recordSkillAttempt, bumpDailyChallengeProgress, updateStudent } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?"']/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreAttempt(target: string, transcript: string): { score: number; problemWords: string[] } {
  const targetWords = normalizeWords(target);
  const spokenWords = new Set(normalizeWords(transcript));
  const problemWords: string[] = [];
  let matched = 0;
  for (const w of targetWords) {
    if (spokenWords.has(w)) matched += 1;
    else problemWords.push(w);
  }
  const score = targetWords.length ? Math.round((matched / targetWords.length) * 100) : 0;
  return { score: transcript.trim() ? score : 0, problemWords };
}

export function SpeakingPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const prompts = useMemo(() => (activeStudent ? speakingPromptsForGrade(activeStudent.grade) : []), [activeStudent]);
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<{ score: number; problemWords: string[] } | null>(null);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);

  if (!activeStudent) return null;
  const student = activeStudent;
  const prompt: SpeakingPrompt | undefined = prompts[index];
  const supported = speechSupported();

  function finishAttempt(text: string) {
    if (!prompt) return;
    const scored = scoreAttempt(prompt.text, text);
    setResult(scored);
    setTranscript(text);
    saveSpeakingAttempt({
      id: `sp-${Date.now()}`,
      studentId: student.id,
      promptId: prompt.id,
      transcript: text,
      pronunciationScore: scored.score,
      problemWords: scored.problemWords,
      attemptedAt: new Date().toISOString(),
    });
    recordSkillAttempt(student.id, "pronunciation", scored.score >= 70);
    recordSkillAttempt(student.id, "speaking", scored.score >= 70);
    setSessionScores((s) => [...s, scored.score]);
  }

  function startRecording() {
    setRecording(true);
    const recognizer = createRecognizer(
      (text) => {
        setRecording(false);
        finishAttempt(text);
      },
      () => setRecording(false)
    );
    if (!recognizer.supported) {
      setRecording(false);
      return;
    }
    recognizer.start();
  }

  function retry() {
    setResult(null);
    setTranscript("");
    setManualInput("");
  }

  function nextPrompt() {
    setResult(null);
    setTranscript("");
    setManualInput("");
    if (index + 1 >= prompts.length) {
      const xp = 10 + sessionScores.filter((s) => s >= 70).length * 8;
      awardXp(xp, 5);
      bumpDailyChallengeProgress(student.id, todayISODate(), "speaking", prompts.length);
      updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
      refreshStudents();
      const unlocked = checkAndUnlockAchievements(student);
      if (unlocked.length > 0) setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (done) {
    const avg = Math.round(sessionScores.reduce((a, b) => a + b, 0) / Math.max(1, sessionScores.length));
    return (
      <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <CelebrationModal
          open={!!celebration}
          emoji={celebration?.emoji ?? "🏆"}
          titleHe={celebration?.title ?? ""}
          subtitleHe={celebration?.subtitle}
          onClose={() => setCelebration(null)}
        />
        <div className="text-6xl mb-4">🎤✨</div>
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">תרגול דיבור הושלם!</h1>
        <p className="text-ink-500 mb-5">ציון הגייה ממוצע: {avg}/100</p>
        <Button
          size="lg"
          fullWidth
          onClick={() => {
            setIndex(0);
            setSessionScores([]);
            setDone(false);
          }}
        >
          תרגול נוסף 🔁
        </Button>
      </div>
    );
  }

  if (!prompt) return null;

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-lg mx-auto">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-1">🎤 תרגול דיבור והגייה</h1>
      <p className="text-ink-500 mb-5">הקשיבו למשפט, חזרו עליו, ותקבלו ציון הגייה</p>
      <ProgressBar value={((index + 1) / prompts.length) * 100} className="mb-6" />

      <Card className="text-center py-8">
        <p dir="ltr" className="text-2xl font-bold text-ink-900 mb-2">{prompt.text}</p>
        <p className="text-ink-500 mb-4">{prompt.translationHe}</p>
        <button onClick={() => speak(prompt.text)} className="text-4xl mb-6">🔊</button>

        {!result && (
          <div className="flex flex-col items-center gap-3">
            {supported ? (
              <Button size="lg" onClick={startRecording} disabled={recording}>
                {recording ? "🔴 מקשיב..." : "🎙️ הקלט/י את עצמך"}
              </Button>
            ) : (
              <p className="text-sm text-ink-500">הדפדפן הזה לא תומך בהקלטה - אפשר לכתוב את המשפט למטה כדי לבדוק את עצמכם.</p>
            )}
            <div className="w-full max-w-xs">
              <input
                dir="ltr"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Or type what you said..."
                className="w-full border-2 border-brand-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
              <Button size="sm" variant="outline" className="mt-2" onClick={() => finishAttempt(manualInput)} disabled={!manualInput.trim()}>
                בדוק ✅
              </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-float-up">
            <div className={`text-4xl font-bold mb-1 ${result.score >= 80 ? "text-ok-500" : result.score >= 50 ? "text-sun-600" : "text-bad-500"}`}>
              {result.score}/100
            </div>
            <p className="text-ink-500 text-sm mb-3">Pronunciation Score</p>
            {result.problemWords.length > 0 ? (
              <div className="mb-3">
                <p className="text-sm text-ink-700 mb-1">שימו לב למילים הבאות:</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {result.problemWords.map((w, i) => (
                    <span key={i} dir="ltr" className="bg-coral-50 text-coral-600 rounded-lg px-2 py-1 text-sm font-semibold">
                      {w.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-ok-500 font-semibold mb-3">מדהים! הגייה מושלמת! ⭐</p>
            )}
            <div className="flex gap-2 justify-center mt-4">
              <Button variant="outline" onClick={retry}>ניסיון נוסף 🔁</Button>
              <Button onClick={nextPrompt}>{index + 1 >= prompts.length ? "לסיכום 🏁" : "המשפט הבא ⬅️"}</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

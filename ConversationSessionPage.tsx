import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { CONVERSATION_SCENARIOS } from "../data/seed/conversations";
import type { ConversationTurn } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { generateConversation, scoreConversation } from "../services/ai/aiService";
import { saveConversation, recordSkillAttempt, bumpDailyChallengeProgress, updateStudent } from "../data/store/repository";
import { todayISODate } from "../data/store/localStore";
import { checkAndUnlockAchievements } from "../engine/achievementsEngine";
import { CelebrationModal } from "../components/gamification/CelebrationModal";
import { speak } from "../utils/speech";

export function ConversationSessionPage() {
  const { scenarioId } = useParams();
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const navigate = useNavigate();
  const scenario = CONVERSATION_SCENARIOS.find((s) => s.id === scenarioId);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [input, setInput] = useState("");
  const [ended, setEnded] = useState(false);
  const [scores, setScores] = useState<ReturnType<typeof scoreConversation> | null>(null);
  const [celebration, setCelebration] = useState<{ emoji: string; title: string; subtitle?: string } | null>(null);
  const sessionId = useRef(`conv-${Date.now()}`);
  const startedAt = useRef(new Date().toISOString());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scenario) return;
    setTurns([{ speaker: "ai", text: scenario.starterLine, timestamp: new Date().toISOString() }]);
  }, [scenario?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  if (!activeStudent || !scenario) return null;
  const student = activeStudent;
  const activeScenario = scenario;

  function handleSend() {
    if (!input.trim() || ended) return;
    const studentTurn: ConversationTurn = { speaker: "student", text: input, timestamp: new Date().toISOString() };
    const historySoFar = [...turns, studentTurn];
    const { aiReply, correction } = generateConversation(activeScenario, student.grade, historySoFar, input);
    recordSkillAttempt(student.id, "conversation", !correction);
    const aiTurn: ConversationTurn = { speaker: "ai", text: aiReply, correction, timestamp: new Date().toISOString() };
    const newTurns = [...historySoFar, aiTurn];
    setTurns(newTurns);
    setInput("");

    if (aiReply === activeScenario.closingLine) {
      finishConversation(newTurns);
    }
  }

  function finishConversation(finalTurns: ConversationTurn[]) {
    const result = scoreConversation(student.id, finalTurns);
    setScores(result);
    setEnded(true);
    saveConversation({
      id: sessionId.current,
      studentId: student.id,
      scenarioId: activeScenario.id,
      turns: finalTurns,
      startedAt: startedAt.current,
      endedAt: new Date().toISOString(),
      scores: { vocabulary: result.vocabulary, grammar: result.grammar, fluency: result.fluency, communication: result.communication },
      recommendations: result.recommendations,
    });
    const xp = 20 + Math.round(result.communication / 10) * 2;
    awardXp(xp, 6);
    bumpDailyChallengeProgress(student.id, todayISODate(), "conversation", 1);
    updateStudent(student.id, { totalLessonsCompleted: student.totalLessonsCompleted + 1 });
    refreshStudents();
    const unlocked = checkAndUnlockAchievements(student);
    if (unlocked.length > 0) setCelebration({ emoji: unlocked[0].emoji, title: unlocked[0].titleHe, subtitle: unlocked[0].descriptionHe });
  }

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-screen">
      <button className="text-ink-500 text-sm mb-3 self-start" onClick={() => navigate("/conversations")}>⬅️ חזרה לתרחישים</button>
      <h1 className="font-display text-xl font-bold text-ink-900 mb-3">{scenario.emoji} {scenario.titleHe}</h1>

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        <div ref={scrollRef} dir="ltr" className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
          {turns.map((t, i) => (
            <div key={i} className={`flex ${t.speaker === "student" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm sm:text-base ${t.speaker === "student" ? "bg-brand-500 text-white" : "bg-brand-50 text-ink-900"}`}>
                {t.text}
                {t.speaker === "ai" && <button onClick={() => speak(t.text)} className="ml-2 opacity-60 hover:opacity-100">🔊</button>}
                {t.correction && (
                  <div className="mt-2 text-xs bg-sun-50 text-sun-600 rounded-lg p-2">
                    ✏️ "{t.correction.original}" → "{t.correction.corrected}"
                    <div className="mt-1 text-ink-500">{t.correction.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!ended && (
          <div className="border-t border-ink-300/15 p-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                dir="ltr"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your reply in English..."
                className="flex-1 border-2 border-brand-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-400"
              />
              <Button type="submit">שלח</Button>
            </form>
          </div>
        )}
      </Card>

      {ended && scores && (
        <Card className="mt-4 animate-float-up">
          <CelebrationModal
            open={!!celebration}
            emoji={celebration?.emoji ?? "🏆"}
            titleHe={celebration?.title ?? ""}
            subtitleHe={celebration?.subtitle}
            onClose={() => setCelebration(null)}
          />
          <h2 className="font-bold text-ink-900 mb-3">🎉 ציון השיחה</h2>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <ScoreRow label="אוצר מילים" value={scores.vocabulary} />
            <ScoreRow label="דקדוק" value={scores.grammar} />
            <ScoreRow label="שטף" value={scores.fluency} />
            <ScoreRow label="תקשורת" value={scores.communication} />
          </div>
          <h3 className="font-semibold text-ink-900 text-sm mb-1">המלצות אישיות</h3>
          <ul className="text-sm text-ink-700 space-y-1 mb-4">
            {scores.recommendations.map((r, i) => (
              <li key={i} dir="ltr">• {r}</li>
            ))}
          </ul>
          <Button fullWidth onClick={() => navigate("/conversations")}>לתרחיש נוסף 💬</Button>
        </Card>
      )}
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between bg-brand-50 rounded-lg px-3 py-2">
      <span className="text-ink-700">{label}</span>
      <span className="font-bold text-brand-600">{value}</span>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useStudentContext } from "../context/StudentContext";
import { GRADE_TIER } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { detectMistakes, type DetectedMistake } from "../services/ai/mistakeDetector";
import { recordSkillAttempt, recordMistake, updateStudent } from "../data/store/repository";
import { speak } from "../utils/speech";

interface ChatMessage {
  id: string;
  speaker: "student" | "ai";
  text: string;
  isHebrew?: boolean;
}

const TOPIC_QUESTIONS_JUNIOR = [
  "What is your favorite animal? 🐶",
  "What did you eat for breakfast today? 🍳",
  "What games do you like to play? 🎮",
  "Do you have any brothers or sisters?",
  "What is your favorite color?",
];

const TOPIC_QUESTIONS_BRIDGE = [
  "What did you do last weekend?",
  "What's your favorite subject in school, and why?",
  "Tell me about a game or show you really like right now.",
  "What do you usually do after school?",
  "If you could travel anywhere, where would you go?",
];

const TOPIC_QUESTIONS_TEEN = [
  "What's something you've been interested in lately?",
  "Do you think social media helps or hurts teenagers? Why?",
  "What are you hoping to do this summer?",
  "Tell me about a movie or show that made you think.",
  "What's a skill you'd like to get better at, and why?",
];

export function TutorPage() {
  const { activeStudent, awardXp, refreshStudents } = useStudentContext();
  const tier = activeStudent ? GRADE_TIER[activeStudent.grade] : 1;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [lastMistake, setLastMistake] = useState<DetectedMistake | null>(null);
  const [difficulty, setDifficulty] = useState<"normal" | "easier" | "harder">("normal");
  const [exchanges, setExchanges] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeStudent) return;
    const greetings: Record<number, string> = {
      0: "Hi! 😊 I'm your English friend. What is your name?",
      1: "Hi there! 😊 I'm your AI English tutor. How are you today?",
      2: "Hey! I'm your AI English tutor. What's on your mind today?",
      3: "Hi! I'm your AI English tutor. What would you like to talk about today?",
    };
    setMessages([{ id: "greet", speaker: "ai", text: greetings[tier] }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStudent?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!activeStudent) return null;
  const student = activeStudent;

  function questionPool() {
    if (tier <= 0) return TOPIC_QUESTIONS_JUNIOR;
    if (tier === 1) return TOPIC_QUESTIONS_JUNIOR;
    if (tier === 2) return TOPIC_QUESTIONS_BRIDGE;
    return TOPIC_QUESTIONS_TEEN;
  }

  function pushMessage(msg: Omit<ChatMessage, "id">) {
    setMessages((m) => [...m, { ...msg, id: `${Date.now()}-${Math.random()}` }]);
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    pushMessage({ speaker: "student", text });
    setInput("");
    setExchanges((e) => e + 1);

    const mistakes = detectMistakes(text);
    if (mistakes.length > 0) {
      const m = mistakes[0];
      setLastMistake(m);
      recordMistake(student.id, "grammar", m.corrected.split(" ").slice(-1)[0], m.explanation);
      recordSkillAttempt(student.id, "grammar", false);
      const followUp = pickFollowUpCloze();
      const reply =
        tier <= 1
          ? `Almost! 😊\nWe say:\n"${text.replace(m.original, m.corrected)}"\n${followUp}`
          : `Nice try! One small fix:\n"${text.replace(m.original, m.corrected)}"\n${m.explanation}\n${followUp}`;
      pushMessage({ speaker: "ai", text: reply });
    } else {
      recordSkillAttempt(student.id, "grammar", true);
      recordSkillAttempt(student.id, "confidence", true);
      setLastMistake(null);
      const ack = tier <= 1 ? pick(["Great! 😊", "Nice! 👍", "Cool! 😄"]) : pick(["That makes sense.", "Interesting!", "Got it."]);
      const nextQ = pick(questionPool());
      pushMessage({ speaker: "ai", text: `${ack} ${nextQ}` });
    }

    if (exchanges > 0 && exchanges % 4 === 0) {
      awardXp(10, 3);
      refreshStudents();
    }
  }

  function pickFollowUpCloze(): string {
    if (tier <= 1) return 'Now try: "I ___ to the park yesterday."';
    return "Want to try using it in a new sentence?";
  }

  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function quickAction(action: "hebrew" | "hint" | "easier" | "harder" | "example") {
    if (action === "hebrew") {
      const text = lastMistake
        ? lastMistake.explanationHe
        : "אני כאן כדי לעזור לך לתרגל אנגלית! אפשר לכתוב לי משפט ואני אעזור לתקן ולהמשיך שיחה.";
      pushMessage({ speaker: "ai", text, isHebrew: true });
      return;
    }
    if (action === "hint") {
      pushMessage({ speaker: "ai", text: "Hint: try starting your sentence with 'I' or 'My favorite...' 💡" });
      return;
    }
    if (action === "example") {
      pushMessage({ speaker: "ai", text: `Example: "${pick(questionPool()).replace("?", "")} ...I really like it because it's fun!"` });
      return;
    }
    if (action === "easier") {
      setDifficulty("easier");
      pushMessage({ speaker: "ai", text: "No problem! Let's keep it simple. 😊 What is your favorite food?" });
      return;
    }
    if (action === "harder") {
      setDifficulty("harder");
      pushMessage({ speaker: "ai", text: "Challenge accepted! 💪 Can you describe your day using three different sentences?" });
    }
  }

  return (
    <div dir="rtl" className="p-4 sm:p-8 max-w-2xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-screen">
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-3">🤖 מורה AI אישי</h1>

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        <div ref={scrollRef} dir="ltr" className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.speaker === "student" ? "justify-end" : "justify-start"}`}>
              <div
                dir={m.isHebrew ? "rtl" : "ltr"}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 whitespace-pre-line text-sm sm:text-base ${
                  m.speaker === "student" ? "bg-brand-500 text-white" : "bg-brand-50 text-ink-900"
                }`}
              >
                {m.text}
                {m.speaker === "ai" && !m.isHebrew && (
                  <button onClick={() => speak(m.text.replace(/\n/g, " "))} className="ml-2 opacity-60 hover:opacity-100">🔊</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-300/15 p-3">
          <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-thin pb-1">
            <QuickBtn onClick={() => quickAction("hebrew")}>הסבר לי בעברית 🇮🇱</QuickBtn>
            <QuickBtn onClick={() => quickAction("hint")}>תן לי רמז 💡</QuickBtn>
            <QuickBtn onClick={() => quickAction("easier")}>קל יותר 🟢</QuickBtn>
            <QuickBtn onClick={() => quickAction("harder")}>אתגר אותי 🔴</QuickBtn>
            <QuickBtn onClick={() => quickAction("example")}>תן לי דוגמה ✨</QuickBtn>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              dir="ltr"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type in English..."
              className="flex-1 border-2 border-brand-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-400"
            />
            <Button type="submit">שלח</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function QuickBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="whitespace-nowrap text-xs font-semibold bg-ink-900/5 hover:bg-brand-100 text-ink-700 rounded-full px-3 py-1.5 transition-colors">
      {children}
    </button>
  );
}

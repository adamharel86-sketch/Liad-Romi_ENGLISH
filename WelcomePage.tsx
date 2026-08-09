import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";
import { GRADE_LABEL_HE, type StudentProfile } from "../types/models";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Pill } from "../components/ui/Pill";

const AVATAR_OPTIONS = ["🦁", "🦋", "🐺", "🐵", "🐼", "🦊", "🐯", "🐨", "🦄", "🐸", "🐙", "🦖"];
const INTEREST_OPTIONS = [
  { id: "animals", he: "בעלי חיים", emoji: "🐾" },
  { id: "sports", he: "ספורט", emoji: "⚽" },
  { id: "music", he: "מוזיקה", emoji: "🎵" },
  { id: "gaming", he: "גיימינג", emoji: "🎮" },
  { id: "movies", he: "סרטים", emoji: "🎬" },
  { id: "technology", he: "טכנולוגיה", emoji: "📱" },
  { id: "art", he: "אומנות", emoji: "🎨" },
  { id: "science", he: "מדע", emoji: "🔬" },
  { id: "travel", he: "טיולים", emoji: "✈️" },
  { id: "food", he: "אוכל", emoji: "🍕" },
];

export function WelcomePage() {
  const { students, selectStudent, patchActiveStudent, activeStudent } = useStudentContext();
  const navigate = useNavigate();
  const [onboardingFor, setOnboardingFor] = useState<StudentProfile | null>(null);
  const [avatar, setAvatar] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  function handlePick(student: StudentProfile) {
    selectStudent(student.id);
    if (!student.onboardingComplete) {
      setAvatar(student.avatar);
      setInterests(student.interests);
      setOnboardingFor(student);
      return;
    }
    navigate(student.placementTestComplete ? "/home" : "/placement");
  }

  function finishOnboarding() {
    if (!onboardingFor) return;
    patchActiveStudent({ avatar, interests, onboardingComplete: true });
    navigate("/placement");
  }

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  if (onboardingFor) {
    const isJunior = onboardingFor.colorTheme === "junior";
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-teal-50">
        <Card className="max-w-lg w-full animate-pop">
          <div className="text-center mb-5">
            <div className="text-5xl mb-2">👋</div>
            <h1 className="font-display text-2xl font-bold text-ink-900">
              {isJunior ? `היי ${onboardingFor.name}! בוא נכיר אותך 😊` : `היי ${onboardingFor.name}, כמה שאלות קצרות לפני שנתחיל`}
            </h1>
            <p className="text-ink-500 text-sm mt-1">{GRADE_LABEL_HE[onboardingFor.grade]} · נבנה לך מסלול לימוד אישי</p>
          </div>

          <div className="mb-5">
            <h2 className="font-bold text-ink-900 mb-2 text-sm">בחר/י אווטאר</h2>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-2xl rounded-xl p-2 border-2 transition-all ${avatar === a ? "border-brand-500 bg-brand-50 scale-110" : "border-transparent hover:bg-ink-900/5"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-ink-900 mb-2 text-sm">מה מעניין אותך? (אפשר לבחור כמה)</h2>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((opt) => (
                <button key={opt.id} onClick={() => toggleInterest(opt.id)}>
                  <Pill tone={interests.includes(opt.id) ? "brand" : "neutral"} emoji={opt.emoji}>
                    {opt.he}
                  </Pill>
                </button>
              ))}
            </div>
          </div>

          <Button fullWidth size="lg" onClick={finishOnboarding}>
            בואו נתחיל! 🚀
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-brand-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <div className="text-5xl mb-2">🐝</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 mb-2">WordUp!</h1>
          <p className="text-ink-500">למידת אנגלית חכמה עם AI — בחרו את מי שרוצה ללמוד היום</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {students.map((s) => (
            <Card key={s.id} interactive onClick={() => handlePick(s)} className="text-center py-6">
              <div className="text-5xl mb-3">{s.avatar}</div>
              <div className="font-bold text-ink-900 text-lg">{s.name}</div>
              <div className="text-ink-500 text-sm mb-2">{GRADE_LABEL_HE[s.grade]}</div>
              {s.onboardingComplete ? (
                <Pill tone="brand" emoji="⭐">{s.xp} XP</Pill>
              ) : (
                <Pill tone="sun" emoji="✨">חדש/ה כאן</Pill>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate("/parents")}>
            👨‍👩‍👧‍👦 מעבר לאזור ההורים
          </Button>
        </div>
      </div>
    </div>
  );
}

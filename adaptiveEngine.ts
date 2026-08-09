// Core adaptive-difficulty logic. This is the "brain" that decides what
// a student should practice next, based on grade + actual performance +
// recent mistakes - never grade alone.
import type { DailyChallenge, DailyChallengeTask, GradeLevel, LearningProgress, SkillArea, StudentProfile } from "../types/models";
import { GRADE_TIER } from "../types/models";
import { getProgress } from "../data/store/repository";

// A numeric difficulty target (1-5) derived from grade tier + mastery.
// This is the single source of truth other modules (vocab, grammar,
// reading, writing, speaking) use to pick content difficulty, so a
// grade-7 student who is struggling gets simpler content WITHOUT the
// interface ever looking "childish", and a fast-progressing grade-3
// student gets pushed to harder content invisibly.
export function targetDifficultyForSkill(profile: StudentProfile, skill: SkillArea): number {
  const gradeBase = 1 + GRADE_TIER[profile.grade]; // 1..4
  const progress = getProgress(profile.id);
  const mastery = progress.skillMastery[skill];
  if (!mastery || mastery.attemptsCount < 3) return gradeBase;

  let adjustment = 0;
  if (mastery.masteryPercent >= 85) adjustment = 1.2;
  else if (mastery.masteryPercent >= 70) adjustment = 0.5;
  else if (mastery.masteryPercent < 40) adjustment = -1.2;
  else if (mastery.masteryPercent < 55) adjustment = -0.5;

  const raw = gradeBase + adjustment;
  return Math.max(1, Math.min(5, Math.round(raw)));
}

export function overallDifficultyLevel(profile: StudentProfile): number {
  const progress = getProgress(profile.id);
  const masteries = Object.values(progress.skillMastery).filter((m) => m.attemptsCount > 0);
  if (masteries.length === 0) return 1 + GRADE_TIER[profile.grade];
  const avg = masteries.reduce((s, m) => s + m.masteryPercent, 0) / masteries.length;
  const base = 1 + GRADE_TIER[profile.grade];
  if (avg >= 80) return Math.min(5, base + 1);
  if (avg < 40) return Math.max(1, base - 1);
  return base;
}

// Picks up to `count` skills that most need attention right now, prioritizing
// skills with recorded weaknesses, then skills that haven't been practiced
// recently, so the recommendation feed never goes stale.
export function priorityWeakSkills(progress: LearningProgress, count = 3): SkillArea[] {
  const all = Object.values(progress.skillMastery);
  const withAttempts = all.filter((m) => m.attemptsCount > 0);
  const weak = withAttempts
    .filter((m) => m.masteryPercent < 65)
    .sort((a, b) => a.masteryPercent - b.masteryPercent)
    .map((m) => m.skill);
  const untried = all.filter((m) => m.attemptsCount === 0).map((m) => m.skill);
  const merged = [...weak, ...untried];
  return merged.slice(0, count);
}

export interface RecommendedActivity {
  id: string;
  emoji: string;
  titleEn: string;
  titleHe: string;
  route: string;
  reason: string;
}

// Builds today's recommended-activities feed for the dashboard, mixing a
// fixed daily "well-rounded" set with content targeted at the student's
// actual current weak spots / open mistake patterns.
export function buildRecommendedActivities(profile: StudentProfile): RecommendedActivity[] {
  const progress = getProgress(profile.id);
  const weak = priorityWeakSkills(progress, 2);
  const activities: RecommendedActivity[] = [];

  if (weak.includes("pronunciation") || weak.includes("speaking")) {
    activities.push({ id: "speak", emoji: "🎤", titleEn: "5 minutes of speaking", titleHe: "5 דקות דיבור", route: "/speaking", reason: "Extra speaking practice will help your pronunciation score." });
  } else {
    activities.push({ id: "speak", emoji: "🎤", titleEn: "5 minutes of speaking", titleHe: "5 דקות דיבור", route: "/speaking", reason: "Keep your speaking skills sharp." });
  }

  activities.push({ id: "vocab", emoji: "📚", titleEn: "5 new words", titleHe: "5 מילים חדשות", route: "/vocabulary", reason: "New words waiting in your deck." });

  if (progress.mistakePatterns.some((m) => !m.resolved)) {
    activities.push({ id: "story", emoji: "📖", titleEn: "Short story", titleHe: "סיפור קצר", route: "/reading", reason: "Practice reading while we quietly review a tricky topic." });
  } else {
    activities.push({ id: "story", emoji: "📖", titleEn: "Short story", titleHe: "סיפור קצר", route: "/reading", reason: "A new story picked for your level." });
  }

  activities.push({ id: "chat", emoji: "💬", titleEn: "Chat with the AI", titleHe: "שיחה עם ה-AI", route: "/tutor", reason: "Free conversation practice with your AI tutor." });

  if (weak.includes("grammar")) {
    activities.push({ id: "grammar", emoji: "✏️", titleEn: "Grammar challenge", titleHe: "אתגר דקדוק", route: "/grammar", reason: "A little extra grammar practice, focused on your recent mistakes." });
  } else {
    activities.push({ id: "grammar", emoji: "✏️", titleEn: "Grammar challenge", titleHe: "אתגר דקדוק", route: "/grammar", reason: "Keep leveling up your grammar." });
  }

  return activities;
}

// ------------------------- Daily challenge ---------------------------------
export function buildDailyChallengeTasks(profile: StudentProfile, date: string): DailyChallenge {
  const tier = GRADE_TIER[profile.grade];
  const tasks: DailyChallengeTask[] = [
    { id: "words", label: "Learn 5 words", labelHe: "למד/י 5 מילים", target: 5, progress: 0, type: "words", bonusXp: 10 },
    { id: "grammar", label: tier <= 0 ? "Answer 3 sentence questions" : "Answer 5 grammar questions", labelHe: tier <= 0 ? "ענה/י על 3 שאלות משפט" : "ענה/י על 5 שאלות דקדוק", target: tier <= 0 ? 3 : 5, progress: 0, type: "grammar", bonusXp: 15 },
    { id: "reading", label: "Finish 1 story", labelHe: "סיים/י סיפור אחד", target: 1, progress: 0, type: "reading", bonusXp: 10 },
    { id: "speaking", label: "Practice 3 sentences aloud", labelHe: "תרגל/י 3 משפטים בדיבור", target: 3, progress: 0, type: "speaking", bonusXp: 15 },
  ];
  if (tier >= 1) {
    tasks.push({ id: "conversation", label: "Complete 1 conversation", labelHe: "השלימ/י שיחה אחת", target: 1, progress: 0, type: "conversation", bonusXp: 20 });
  }
  return {
    studentId: profile.id,
    date,
    tasks,
    completed: false,
    bonusXpAwarded: false,
  };
}

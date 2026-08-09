import type {
  Achievement,
  ConversationSession,
  DailyChallenge,
  DailyChallengeTask,
  LearningProgress,
  MistakePattern,
  PlacementTestResult,
  SkillArea,
  SkillMastery,
  SpeakingAttempt,
  StudentProfile,
  WordProgress,
  WritingAttempt,
} from "../../types/models";
import { readJSON, todayISODate, writeJSON } from "./localStore";

const SKILLS: SkillArea[] = [
  "vocabulary",
  "reading",
  "comprehension",
  "speaking",
  "pronunciation",
  "listening",
  "grammar",
  "writing",
  "conversation",
  "confidence",
];

export const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    id: "student-tomer",
    name: "תומר",
    avatar: "🐵",
    grade: "grade3",
    age: 9,
    createdAt: new Date(2026, 0, 1).toISOString(),
    onboardingComplete: false,
    placementTestComplete: false,
    currentLevel: "pre-A1",
    xp: 0,
    streakDays: 0,
    lastActiveDate: null,
    dailyGoalMinutes: 10,
    minutesTodayTotal: 0,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    interests: [],
    colorTheme: "junior",
  },
  {
    id: "student-daniel",
    name: "דניאל",
    avatar: "🦁",
    grade: "grade4",
    age: 10,
    createdAt: new Date(2026, 0, 1).toISOString(),
    onboardingComplete: false,
    placementTestComplete: false,
    currentLevel: "A1",
    xp: 0,
    streakDays: 0,
    lastActiveDate: null,
    dailyGoalMinutes: 15,
    minutesTodayTotal: 0,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    interests: [],
    colorTheme: "junior",
  },
  {
    id: "student-roni",
    name: "רוני",
    avatar: "🐺",
    grade: "grade6",
    age: 12,
    createdAt: new Date(2026, 0, 1).toISOString(),
    onboardingComplete: false,
    placementTestComplete: false,
    currentLevel: "A2",
    xp: 0,
    streakDays: 0,
    lastActiveDate: null,
    dailyGoalMinutes: 15,
    minutesTodayTotal: 0,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    interests: [],
    colorTheme: "bridge",
  },
  {
    id: "student-maya",
    name: "מאיה",
    avatar: "🦋",
    grade: "grade7",
    age: 13,
    createdAt: new Date(2026, 0, 1).toISOString(),
    onboardingComplete: false,
    placementTestComplete: false,
    currentLevel: "A2+",
    xp: 0,
    streakDays: 0,
    lastActiveDate: null,
    dailyGoalMinutes: 15,
    minutesTodayTotal: 0,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    interests: [],
    colorTheme: "teen",
  },
];

function emptyMastery(): Record<SkillArea, SkillMastery> {
  const out = {} as Record<SkillArea, SkillMastery>;
  for (const skill of SKILLS) {
    out[skill] = {
      skill,
      masteryPercent: 0,
      attemptsCount: 0,
      correctCount: 0,
      lastPracticedAt: null,
      trend: "flat",
    };
  }
  return out;
}

// ------------------------- Students -------------------------------------
export function listStudents(): StudentProfile[] {
  return readJSON<StudentProfile[]>("students", []);
}

export function ensureSeedStudents(): StudentProfile[] {
  const existing = listStudents();
  if (existing.length > 0) return existing;
  writeJSON("students", DEFAULT_STUDENTS);
  return DEFAULT_STUDENTS;
}

export function getStudent(id: string): StudentProfile | undefined {
  return listStudents().find((s) => s.id === id);
}

export function saveStudent(profile: StudentProfile): void {
  const all = listStudents();
  const idx = all.findIndex((s) => s.id === profile.id);
  if (idx >= 0) all[idx] = profile;
  else all.push(profile);
  writeJSON("students", all);
}

export function updateStudent(id: string, patch: Partial<StudentProfile>): StudentProfile | undefined {
  const student = getStudent(id);
  if (!student) return undefined;
  const updated = { ...student, ...patch };
  saveStudent(updated);
  return updated;
}

// Applies streak/day-tracking logic + awards XP. Central place so every
// activity in the app books XP consistently.
export function awardXp(id: string, amount: number, minutesSpent = 0): StudentProfile | undefined {
  const student = getStudent(id);
  if (!student) return undefined;
  const today = todayISODate();
  let streakDays = student.streakDays;
  let minutesTodayTotal = student.minutesTodayTotal;

  if (student.lastActiveDate !== today) {
    if (student.lastActiveDate) {
      const diff = Math.round(
        (new Date(today).getTime() - new Date(student.lastActiveDate).getTime()) / 86400000
      );
      streakDays = diff === 1 ? streakDays + 1 : 1;
    } else {
      streakDays = 1;
    }
    minutesTodayTotal = 0;
  }
  minutesTodayTotal += minutesSpent;

  return updateStudent(id, {
    xp: student.xp + amount,
    streakDays,
    lastActiveDate: today,
    minutesTodayTotal,
  });
}

// ------------------------- Learning progress -----------------------------
export function getProgress(studentId: string): LearningProgress {
  return readJSON<LearningProgress>(`progress:${studentId}`, {
    studentId,
    skillMastery: emptyMastery(),
    mistakePatterns: [],
    strengths: [],
    weaknesses: [],
    recentSessionScores: [],
    updatedAt: new Date().toISOString(),
  });
}

export function saveProgress(progress: LearningProgress): void {
  writeJSON(`progress:${progress.studentId}`, progress);
}

export function recordSkillAttempt(studentId: string, skill: SkillArea, correct: boolean): LearningProgress {
  const progress = getProgress(studentId);
  const mastery = progress.skillMastery[skill] ?? {
    skill,
    masteryPercent: 0,
    attemptsCount: 0,
    correctCount: 0,
    lastPracticedAt: null,
    trend: "flat" as const,
  };
  const prevPercent = mastery.masteryPercent;
  mastery.attemptsCount += 1;
  if (correct) mastery.correctCount += 1;
  // Weighted running accuracy that reacts faster than a plain lifetime average.
  const weight = 0.25;
  const target = correct ? 100 : 0;
  mastery.masteryPercent = Math.round(mastery.masteryPercent * (1 - weight) + target * weight);
  mastery.lastPracticedAt = new Date().toISOString();
  mastery.trend = mastery.masteryPercent > prevPercent ? "up" : mastery.masteryPercent < prevPercent ? "down" : "flat";
  progress.skillMastery[skill] = mastery;

  progress.recentSessionScores.push({ date: todayISODate(), score: correct ? 100 : 0, skill });
  if (progress.recentSessionScores.length > 60) progress.recentSessionScores.shift();

  const sorted = Object.values(progress.skillMastery).filter((m) => m.attemptsCount > 0);
  progress.strengths = sorted
    .filter((m) => m.masteryPercent >= 75)
    .sort((a, b) => b.masteryPercent - a.masteryPercent)
    .slice(0, 3)
    .map((m) => m.skill);
  progress.weaknesses = sorted
    .filter((m) => m.masteryPercent < 60)
    .sort((a, b) => a.masteryPercent - b.masteryPercent)
    .slice(0, 3)
    .map((m) => m.skill);

  progress.updatedAt = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function recordMistake(studentId: string, skill: SkillArea, topic: string, description: string): LearningProgress {
  const progress = getProgress(studentId);
  const existing = progress.mistakePatterns.find((m) => m.topic === topic && !m.resolved);
  if (existing) {
    existing.occurrences += 1;
    existing.lastSeenAt = new Date().toISOString();
    if (existing.nextReviewFormats.length === 0) {
      existing.nextReviewFormats = ["multiple-choice", "fill-blank", "translate", "sentence-build"];
    }
  } else {
    const pattern: MistakePattern = {
      id: `${studentId}-${topic}-${Date.now()}`,
      skill,
      topic,
      description,
      occurrences: 1,
      lastSeenAt: new Date().toISOString(),
      resolved: false,
      nextReviewFormats: ["multiple-choice", "fill-blank", "translate", "sentence-build"],
    };
    progress.mistakePatterns.unshift(pattern);
  }
  progress.mistakePatterns = progress.mistakePatterns.slice(0, 40);
  saveProgress(progress);
  return progress;
}

export function markMistakeReviewed(studentId: string, topic: string, gotCorrect: boolean): void {
  const progress = getProgress(studentId);
  const pattern = progress.mistakePatterns.find((m) => m.topic === topic && !m.resolved);
  if (!pattern) return;
  pattern.nextReviewFormats.shift();
  if (gotCorrect && pattern.nextReviewFormats.length === 0) {
    pattern.resolved = true;
  } else if (!gotCorrect) {
    pattern.nextReviewFormats.push("multiple-choice", "fill-blank", "translate", "sentence-build");
    pattern.occurrences += 1;
  }
  saveProgress(progress);
}

// ------------------------- Vocabulary / SRS -------------------------------
export function getWordProgressMap(studentId: string): Record<string, WordProgress> {
  return readJSON<Record<string, WordProgress>>(`words:${studentId}`, {});
}

export function saveWordProgressMap(studentId: string, map: Record<string, WordProgress>): void {
  writeJSON(`words:${studentId}`, map);
}

export function getOrCreateWordProgress(studentId: string, wordId: string): WordProgress {
  const map = getWordProgressMap(studentId);
  if (map[wordId]) return map[wordId];
  const created: WordProgress = {
    wordId,
    studentId,
    timesSeen: 0,
    timesCorrect: 0,
    box: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
  };
  map[wordId] = created;
  saveWordProgressMap(studentId, map);
  return created;
}

const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 8, 16];

export function reviewWord(studentId: string, wordId: string, correct: boolean): WordProgress {
  const map = getWordProgressMap(studentId);
  const current = map[wordId] ?? getOrCreateWordProgress(studentId, wordId);
  current.timesSeen += 1;
  if (correct) {
    current.timesCorrect += 1;
    current.box = Math.min(5, current.box + 1) as WordProgress["box"];
  } else {
    current.box = Math.max(0, current.box - 2) as WordProgress["box"];
  }
  const now = new Date();
  current.lastReviewedAt = now.toISOString();
  const intervalDays = BOX_INTERVAL_DAYS[current.box] ?? 0;
  const next = new Date(now);
  next.setDate(next.getDate() + intervalDays);
  current.nextReviewAt = next.toISOString();
  map[wordId] = current;
  saveWordProgressMap(studentId, map);
  return current;
}

// ------------------------- Placement test ---------------------------------
export function savePlacementResult(result: PlacementTestResult): void {
  writeJSON(`placement:${result.studentId}`, result);
}

export function getPlacementResult(studentId: string): PlacementTestResult | undefined {
  return readJSON<PlacementTestResult | undefined>(`placement:${studentId}`, undefined);
}

// ------------------------- Conversations -----------------------------------
export function saveConversation(session: ConversationSession): void {
  const all = readJSON<ConversationSession[]>(`conversations:${session.studentId}`, []);
  const idx = all.findIndex((c) => c.id === session.id);
  if (idx >= 0) all[idx] = session;
  else all.unshift(session);
  writeJSON(`conversations:${session.studentId}`, all.slice(0, 50));
}

export function listConversations(studentId: string): ConversationSession[] {
  return readJSON<ConversationSession[]>(`conversations:${studentId}`, []);
}

// ------------------------- Speaking -----------------------------------------
export function saveSpeakingAttempt(attempt: SpeakingAttempt): void {
  const all = readJSON<SpeakingAttempt[]>(`speaking:${attempt.studentId}`, []);
  all.unshift(attempt);
  writeJSON(`speaking:${attempt.studentId}`, all.slice(0, 100));
}

export function listSpeakingAttempts(studentId: string): SpeakingAttempt[] {
  return readJSON<SpeakingAttempt[]>(`speaking:${studentId}`, []);
}

// ------------------------- Writing -------------------------------------------
export function saveWritingAttempt(attempt: WritingAttempt): void {
  const all = readJSON<WritingAttempt[]>(`writing:${attempt.studentId}`, []);
  all.unshift(attempt);
  writeJSON(`writing:${attempt.studentId}`, all.slice(0, 50));
}

export function listWritingAttempts(studentId: string): WritingAttempt[] {
  return readJSON<WritingAttempt[]>(`writing:${studentId}`, []);
}

// ------------------------- Achievements ---------------------------------------
export function listAchievements(studentId: string): Achievement[] {
  return readJSON<Achievement[]>(`achievements:${studentId}`, []);
}

export function unlockAchievement(studentId: string, achievementId: string): Achievement | null {
  const all = listAchievements(studentId);
  if (all.some((a) => a.id === achievementId)) return null;
  const achievement: Achievement = { id: achievementId, studentId, unlockedAt: new Date().toISOString(), seen: false };
  all.unshift(achievement);
  writeJSON(`achievements:${studentId}`, all);
  return achievement;
}

export function markAchievementSeen(studentId: string, achievementId: string): void {
  const all = listAchievements(studentId);
  const item = all.find((a) => a.id === achievementId);
  if (item) {
    item.seen = true;
    writeJSON(`achievements:${studentId}`, all);
  }
}

// ------------------------- Daily challenge -------------------------------------
export function getDailyChallenge(studentId: string, date: string): DailyChallenge | undefined {
  return readJSON<DailyChallenge | undefined>(`daily:${studentId}:${date}`, undefined);
}

export function saveDailyChallenge(challenge: DailyChallenge): void {
  writeJSON(`daily:${challenge.studentId}:${challenge.date}`, challenge);
}

export function bumpDailyChallengeProgress(studentId: string, date: string, type: DailyChallengeTask["type"], amount = 1): DailyChallenge | undefined {
  const challenge = getDailyChallenge(studentId, date);
  if (!challenge) return undefined;
  let changed = false;
  challenge.tasks.forEach((t) => {
    if (t.type === type && t.progress < t.target) {
      t.progress = Math.min(t.target, t.progress + amount);
      changed = true;
    }
  });
  if (changed) {
    const allDone = challenge.tasks.every((t) => t.progress >= t.target);
    if (allDone && !challenge.completed) {
      challenge.completed = true;
    }
    saveDailyChallenge(challenge);
  }
  return challenge;
}

export function countCompletedDailyChallenges(studentId: string): number {
  const keys = readJSON<string[]>(`daily-completed-dates:${studentId}`, []);
  return keys.length;
}

export function markDailyChallengeCompletedDate(studentId: string, date: string): void {
  const keys = readJSON<string[]>(`daily-completed-dates:${studentId}`, []);
  if (!keys.includes(date)) {
    keys.push(date);
    writeJSON(`daily-completed-dates:${studentId}`, keys);
  }
}

// ------------------------- Weekly report cache ------------------------------
export function cacheWeeklyReport<T>(studentId: string, weekStart: string, report: T): void {
  writeJSON(`weekly:${studentId}:${weekStart}`, report);
}

export function getCachedWeeklyReport<T>(studentId: string, weekStart: string): T | undefined {
  return readJSON<T | undefined>(`weekly:${studentId}:${weekStart}`, undefined);
}

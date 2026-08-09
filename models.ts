// =========================================================================
// Core data models for the WordUp! English learning app.
// These are intentionally plain TypeScript interfaces (no ORM / backend
// coupling) so the same shapes can later be persisted to a real database
// or served from an API without changing consumers.
// =========================================================================

export type GradeLevel = "grade3" | "grade4" | "grade6" | "grade7";

// Numeric tier ordering used throughout the app to compare difficulty
// bands without repeating string comparisons everywhere.
export const GRADE_TIER: Record<GradeLevel, number> = {
  grade3: 0,
  grade4: 1,
  grade6: 2,
  grade7: 3,
};

export const GRADE_LABEL_HE: Record<GradeLevel, string> = {
  grade3: "כיתה ג'",
  grade4: "כיתה ד'",
  grade6: "כיתה ו'",
  grade7: "כיתה ז'",
};

// Visual/UX maturity band: grade3 & grade4 share the playful "junior" look,
// grade6 is a calmer "bridge" look, grade7 is the mature "teen" look.
export type UiAgeBand = "junior" | "bridge" | "teen";

export const UI_AGE_BAND: Record<GradeLevel, UiAgeBand> = {
  grade3: "junior",
  grade4: "junior",
  grade6: "bridge",
  grade7: "teen",
};

export type SkillArea =
  | "vocabulary"
  | "reading"
  | "comprehension"
  | "speaking"
  | "pronunciation"
  | "listening"
  | "grammar"
  | "writing"
  | "conversation"
  | "confidence";

export type CEFRLevel = "pre-A1" | "A1" | "A1+" | "A2" | "A2+" | "B1" | "B1+" | "B2";

export type ExerciseType =
  | "multiple-choice"
  | "match"
  | "fill-blank"
  | "translate"
  | "listen-choose"
  | "spelling"
  | "sentence-build"
  | "true-false"
  | "short-answer"
  | "speaking-repeat";

// -------------------------------------------------------------------------
// StudentProfile
// -------------------------------------------------------------------------
export interface StudentProfile {
  id: string;
  name: string;
  avatar: string; // emoji or asset key
  grade: GradeLevel;
  age: number;
  createdAt: string;
  onboardingComplete: boolean;
  placementTestComplete: boolean;
  currentLevel: CEFRLevel;
  xp: number;
  streakDays: number;
  lastActiveDate: string | null; // ISO date (yyyy-mm-dd)
  dailyGoalMinutes: number;
  minutesTodayTotal: number;
  totalLessonsCompleted: number;
  totalWordsLearned: number;
  interests: string[]; // topics the student is interested in
  colorTheme: UiAgeBand;
}

// -------------------------------------------------------------------------
// PlacementTest
// -------------------------------------------------------------------------
export interface PlacementQuestion {
  id: string;
  skill: SkillArea;
  prompt: string;
  promptHe?: string;
  options?: string[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface PlacementAnswer {
  questionId: string;
  answer: string;
  correct: boolean;
  timeMs: number;
}

export interface PlacementTestResult {
  studentId: string;
  completedAt: string;
  answers: PlacementAnswer[];
  scoreBySkill: Partial<Record<SkillArea, number>>; // 0-100
  determinedLevel: CEFRLevel;
  summary: string;
}

// -------------------------------------------------------------------------
// LearningProgress / SkillMastery
// -------------------------------------------------------------------------
export interface SkillMastery {
  skill: SkillArea;
  masteryPercent: number; // 0-100
  attemptsCount: number;
  correctCount: number;
  lastPracticedAt: string | null;
  trend: "up" | "down" | "flat";
}

export interface MistakePattern {
  id: string;
  skill: SkillArea;
  topic: string; // e.g. "past-simple-irregular-verbs", or a vocabulary word id
  description: string;
  occurrences: number;
  lastSeenAt: string;
  resolved: boolean;
  nextReviewFormats: ExerciseType[]; // queue of formats to test this again in
}

export interface LearningProgress {
  studentId: string;
  skillMastery: Record<SkillArea, SkillMastery>;
  mistakePatterns: MistakePattern[];
  strengths: SkillArea[];
  weaknesses: SkillArea[];
  recentSessionScores: { date: string; score: number; skill: SkillArea }[];
  updatedAt: string;
}

// -------------------------------------------------------------------------
// VocabularyWord + per-student SRS state
// -------------------------------------------------------------------------
export interface VocabularyWord {
  id: string;
  word: string;
  translationHe: string;
  simpleDefinition: string;
  exampleSentence: string;
  emoji: string;
  topic: string;
  grade: GradeLevel | "both";
  difficulty: 1 | 2 | 3 | 4 | 5;
  partOfSpeech: string;
}

export interface WordProgress {
  wordId: string;
  studentId: string;
  timesSeen: number;
  timesCorrect: number;
  box: 0 | 1 | 2 | 3 | 4 | 5; // Leitner box, 5 = mastered
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  confused_with?: string[]; // word ids this word gets confused with
}

// -------------------------------------------------------------------------
// Exercise / Lesson
// -------------------------------------------------------------------------
export interface Exercise {
  id: string;
  type: ExerciseType;
  skill: SkillArea;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  promptHe?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  explanationHe?: string;
  relatedWordId?: string;
  relatedGrammarTopicId?: string;
}

export interface ExerciseAttempt {
  exerciseId: string;
  studentId: string;
  answerGiven: string;
  correct: boolean;
  attemptedAt: string;
  hintsUsed: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleHe?: string;
  skillFocus: SkillArea[];
  grade: GradeLevel | "both";
  exercises: Exercise[];
  estimatedMinutes: number;
}

// -------------------------------------------------------------------------
// ConversationSession
// -------------------------------------------------------------------------
export interface ConversationScenario {
  id: string;
  emoji: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  aiRole: string;
  studentRole: string;
  grade: GradeLevel | "both";
  starterLine: string;
  suggestedTopics: string[];
  followUps: string[];
  closingLine: string;
}

export interface ConversationTurn {
  speaker: "student" | "ai" | "system";
  text: string;
  correction?: {
    original: string;
    corrected: string;
    explanation: string;
  };
  timestamp: string;
}

export interface ConversationSession {
  id: string;
  studentId: string;
  scenarioId: string;
  turns: ConversationTurn[];
  startedAt: string;
  endedAt: string | null;
  scores?: {
    vocabulary: number;
    grammar: number;
    fluency: number;
    communication: number;
  };
  recommendations?: string[];
}

// -------------------------------------------------------------------------
// SpeakingAttempt
// -------------------------------------------------------------------------
export interface SpeakingPrompt {
  id: string;
  text: string;
  translationHe: string;
  grade: GradeLevel | "both";
  targetSounds: string[]; // phonemes/words to watch, e.g. "TH"
}

export interface SpeakingAttempt {
  id: string;
  studentId: string;
  promptId: string;
  transcript: string;
  pronunciationScore: number; // 0-100
  problemWords: string[];
  attemptedAt: string;
}

// -------------------------------------------------------------------------
// WritingAttempt
// -------------------------------------------------------------------------
export interface WritingTask {
  id: string;
  title: string;
  instructions: string;
  instructionsHe?: string;
  grade: GradeLevel | "both";
  minWords: number;
  exampleOpening?: string;
}

export interface WritingIssue {
  type: "grammar" | "vocabulary" | "spelling" | "structure" | "clarity";
  excerpt: string;
  hint: string;
  explanation?: string;
  resolved: boolean;
}

export interface WritingAttempt {
  id: string;
  studentId: string;
  taskId: string;
  draftText: string;
  issues: WritingIssue[];
  improvedVersion?: string;
  scores: {
    grammar: number;
    vocabulary: number;
    spelling: number;
    structure: number;
    clarity: number;
  };
  submittedAt: string;
}

// -------------------------------------------------------------------------
// Achievement
// -------------------------------------------------------------------------
export interface AchievementDef {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  emoji: string;
  criteria: string; // human readable description of unlock rule
}

export interface Achievement {
  id: string; // matches AchievementDef.id
  studentId: string;
  unlockedAt: string;
  seen: boolean;
}

// -------------------------------------------------------------------------
// DailyChallenge
// -------------------------------------------------------------------------
export interface DailyChallengeTask {
  id: string;
  label: string;
  labelHe: string;
  target: number;
  progress: number;
  type: "words" | "conversation" | "speaking" | "grammar" | "reading" | "writing";
  bonusXp: number;
}

export interface DailyChallenge {
  studentId: string;
  date: string; // yyyy-mm-dd
  tasks: DailyChallengeTask[];
  completed: boolean;
  bonusXpAwarded: boolean;
}

// -------------------------------------------------------------------------
// WeeklyParentReport
// -------------------------------------------------------------------------
export interface WeeklyParentReport {
  studentId: string;
  weekStart: string;
  weekEnd: string;
  minutesPracticed: number;
  lessonsCompleted: number;
  wordsLearned: number;
  speakingMinutes: number;
  strengths: string[];
  improvementAreas: string[];
  streakDays: number;
  weeklyXp: number;
  summaryHe: string;
  recommendationsHe: string[];
}

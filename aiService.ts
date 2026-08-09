// =========================================================================
// Central AI Service
// -------------------------------------------------------------------------
// Every piece of "intelligence" in the app (exercise generation, tutoring
// feedback, conversation roleplay, writing analysis, reports...) flows
// through this one module. Components NEVER call an LLM directly.
//
// TODAY: every function below is implemented with deterministic, rule-based
// demo logic (seed content + the adaptive engine + mistakeDetector.ts) so
// the whole app works with zero network calls / API keys.
//
// TOMORROW: swap the body of each function for a real call to the
// Anthropic Claude API (e.g. `await anthropic.messages.create(...)`) using
// the same input/output shape. Nothing outside this file needs to change.
// =========================================================================
import type {
  ConversationScenario,
  ConversationTurn,
  Exercise,
  ExerciseType,
  GradeLevel,
  SkillArea,
  StudentProfile,
  WeeklyParentReport,
  WritingAttempt,
  WritingIssue,
  WritingTask,
} from "../../types/models";
import { GRADE_TIER } from "../../types/models";
import { detectMistakes, detectWritingIssues } from "./mistakeDetector";
import { wordsForGrade } from "../../data/seed/vocabulary";
import { GRAMMAR_TOPICS, grammarTopicsForGrade, IRREGULAR_VERBS } from "../../data/seed/grammar";
import { storiesForGrade, type ReadingStory } from "../../data/seed/reading";
import { getProgress, listConversations, listSpeakingAttempts, listWritingAttempts } from "../../data/store/repository";
import { buildDailyChallengeTasks, buildRecommendedActivities, targetDifficultyForSkill } from "../../engine/adaptiveEngine";
import { pickWordsForSession } from "../../engine/srs";

function pick<T>(arr: T[], seed = Math.random()): T {
  return arr[Math.floor(seed * arr.length) % arr.length];
}

// -------------------------------------------------------------------------
// generateExercise
// -------------------------------------------------------------------------
export interface GenerateExerciseParams {
  studentId: string;
  grade: GradeLevel;
  skill: SkillArea;
  topic?: string;
  preferredType?: ExerciseType;
}

let exerciseCounter = 0;

export function generateExercise(params: GenerateExerciseParams): Exercise {
  exerciseCounter += 1;
  const { grade, skill, topic } = params;

  if (skill === "grammar") {
    const topics = grammarTopicsForGrade(grade);
    const grammarTopic = topics.find((t) => t.id === topic) ?? pick(topics);
    const content = grammarTopic.content[grade] ?? Object.values(grammarTopic.content)[0]!;
    const exampleSentence = pick(content.examples);
    // Only "fill-blank" and "multiple-choice" have a matching input UI in the
    // Grammar Lab today - keep the rotation limited to those so every
    // generated exercise is always answerable.
    const type: ExerciseType = params.preferredType ?? pick(["fill-blank", "multiple-choice"] as ExerciseType[]);
    const blankWord = exampleSentence.split(" ").filter((w) => w.length > 3)[0]?.replace(/[.,!?]/g, "") ?? exampleSentence.split(" ")[0];
    const prompt = type === "fill-blank" ? exampleSentence.replace(blankWord, "____") : `Choose the correct sentence about: ${grammarTopic.title}`;
    return {
      id: `ex-${exerciseCounter}`,
      type,
      skill,
      topic: grammarTopic.id,
      difficulty: (targetDifficultyForSkill({ id: params.studentId, grade } as StudentProfile, skill) as 1 | 2 | 3 | 4 | 5) ?? 2,
      prompt,
      options: type === "multiple-choice" ? shuffledOptions(exampleSentence, content.examples) : undefined,
      correctAnswer: type === "fill-blank" ? blankWord : exampleSentence,
      explanation: content.explanation,
      explanationHe: undefined,
      relatedGrammarTopicId: grammarTopic.id,
    };
  }

  if (skill === "vocabulary") {
    const [word] = pickWordsForSession(params.studentId, grade, targetDifficultyForSkill({ id: params.studentId, grade } as StudentProfile, "vocabulary"), 1, topic);
    const bank = wordsForGrade(grade);
    const distractors = bank.filter((w) => w.id !== word?.id).slice(0, 3).map((w) => w.translationHe);
    return {
      id: `ex-${exerciseCounter}`,
      type: "multiple-choice",
      skill,
      topic: word?.topic ?? "general",
      difficulty: (word?.difficulty ?? 2) as 1 | 2 | 3 | 4 | 5,
      prompt: `What does "${word?.word}" mean?`,
      options: shuffle([word?.translationHe ?? "", ...distractors]),
      correctAnswer: word?.translationHe ?? "",
      explanation: word?.simpleDefinition ?? "",
      relatedWordId: word?.id,
    };
  }

  // Generic fallback (reading/comprehension/listening exercises are driven
  // by the Reading module directly from seed stories, not this generator).
  return {
    id: `ex-${exerciseCounter}`,
    type: "true-false",
    skill,
    topic: topic ?? "general",
    difficulty: 2,
    prompt: "Practice makes perfect!",
    correctAnswer: "True",
    explanation: "Keep practicing every day to improve.",
  };
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function shuffledOptions(correct: string, pool: string[]): string[] {
  const others = pool.filter((p) => p !== correct);
  return shuffle([correct, ...shuffle(others).slice(0, 2)]);
}

// -------------------------------------------------------------------------
// generateConversation — produces the AI's next turn in a roleplay session
// -------------------------------------------------------------------------
export interface ConversationTurnResult {
  aiReply: string;
  correction?: { original: string; corrected: string; explanation: string };
}

const ACK_JUNIOR = ["Great! 😊", "Nice! 👍", "Cool! 😄", "Awesome! 🎉"];
const ACK_BRIDGE = ["Nice one!", "Got it!", "Sounds good!", "That's interesting!"];
const ACK_TEEN = ["That makes sense.", "I see what you mean.", "Interesting point.", "Good to know."];

export function generateConversation(
  scenario: ConversationScenario,
  grade: GradeLevel,
  history: ConversationTurn[],
  studentMessage: string
): ConversationTurnResult {
  const mistakes = detectMistakes(studentMessage);
  const tier = GRADE_TIER[grade];
  const turnIndex = history.filter((t) => t.speaker === "ai").length;
  const isClosing = turnIndex >= scenario.followUps.length;

  const ack = tier <= 1 ? pick(ACK_JUNIOR) : tier === 2 ? pick(ACK_BRIDGE) : pick(ACK_TEEN);

  if (isClosing) {
    return { aiReply: scenario.closingLine };
  }

  const followUp = scenario.followUps[turnIndex % scenario.followUps.length];
  const openEnded = tier >= 2 ? " Tell me more about it!" : "";

  let aiReply = `${ack} ${followUp}${tier >= 2 ? openEnded : ""}`;
  if (tier <= 1) {
    // Keep junior replies short and simple.
    aiReply = `${ack} ${followUp}`;
  }

  const correction = mistakes[0]
    ? { original: mistakes[0].original, corrected: mistakes[0].corrected, explanation: mistakes[0].explanation }
    : undefined;

  return { aiReply, correction };
}

export function scoreConversation(studentId: string, history: ConversationTurn[]): { vocabulary: number; grammar: number; fluency: number; communication: number; recommendations: string[] } {
  const studentTurns = history.filter((t) => t.speaker === "student");
  const totalWords = studentTurns.reduce((sum, t) => sum + t.text.trim().split(/\s+/).filter(Boolean).length, 0);
  const avgLen = studentTurns.length ? totalWords / studentTurns.length : 0;
  const correctionCount = history.filter((t) => t.correction).length;

  const grammar = Math.max(40, Math.min(100, 95 - correctionCount * 8));
  const fluency = Math.max(40, Math.min(100, 60 + avgLen * 4));
  const vocabulary = Math.max(40, Math.min(100, 65 + Math.min(studentTurns.length, 6) * 5));
  const communication = Math.round((grammar + fluency + vocabulary) / 3);

  const recommendations: string[] = [];
  if (grammar < 75) recommendations.push("Practice a few grammar exercises about the mistakes we found in this chat.");
  if (avgLen < 4) recommendations.push("Try answering with full sentences instead of just a word or two.");
  if (studentTurns.length < 3) recommendations.push("Next time, try to keep the conversation going a little longer!");
  if (recommendations.length === 0) recommendations.push("Great conversation! Try a new scenario to keep challenging yourself.");

  return { vocabulary, grammar, fluency, communication, recommendations: recommendations.slice(0, 3) };
}

// -------------------------------------------------------------------------
// evaluateAnswer
// -------------------------------------------------------------------------
export function evaluateAnswer(exercise: Exercise, answerGiven: string): { correct: boolean; feedback: string; feedbackHe?: string } {
  const normalize = (s: string) => s.trim().toLowerCase();
  const correct = exercise.correctAnswer === "open" ? answerGiven.trim().length > 0 : normalize(answerGiven) === normalize(exercise.correctAnswer);
  const feedback = correct
    ? pick(["Great job! ⭐", "Perfect! 🎉", "You got it! 👏", "Excellent! 🌟"])
    : `Not quite. ${exercise.explanation}`;
  return { correct, feedback };
}

// -------------------------------------------------------------------------
// explainMistake
// -------------------------------------------------------------------------
export function explainMistake(topic: string, grade: GradeLevel): { explanation: string; explanationHe?: string; example: string } {
  const grammarTopic = GRAMMAR_TOPICS.find((t) => t.id === topic);
  if (grammarTopic) {
    const content = grammarTopic.content[grade] ?? Object.values(grammarTopic.content)[0]!;
    return { explanation: content.explanation, example: pick(content.examples) };
  }
  const irregular = IRREGULAR_VERBS.find((v) => v.base === topic || v.past === topic);
  if (irregular) {
    return {
      explanation: `'${irregular.base}' is an irregular verb. In the past, we say '${irregular.past}', not '${irregular.base}ed'.`,
      example: `Yesterday, I ${irregular.past} ${irregular.base === "go" ? "home" : "it"}.`,
    };
  }
  return { explanation: "Let's practice this a bit more together.", example: "" };
}

// -------------------------------------------------------------------------
// generateReadingText
// -------------------------------------------------------------------------
export function generateReadingText(grade: GradeLevel, excludeIds: string[] = []): ReadingStory {
  const stories = storiesForGrade(grade);
  const unseen = stories.filter((s) => !excludeIds.includes(s.id));
  return unseen[0] ?? stories[Math.floor(Math.random() * stories.length)];
}

// -------------------------------------------------------------------------
// analyzeWriting
// -------------------------------------------------------------------------
export function analyzeWriting(text: string, task: WritingTask, grade: GradeLevel): {
  issues: WritingIssue[];
  improvedVersion: string;
  scores: WritingAttempt["scores"];
} {
  const detected = detectWritingIssues(text);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const issues: WritingIssue[] = detected.map((d) => ({
    type: d.category,
    excerpt: d.original,
    hint: GRADE_TIER[grade] <= 1 ? "Look closely - one word needs fixing here! 🔍" : "Look closely at this part - something can be improved.",
    explanation: d.explanation,
    resolved: false,
  }));

  if (wordCount < task.minWords) {
    issues.push({
      type: "structure",
      excerpt: text.slice(-20),
      hint: `Try to write a bit more - aim for at least ${task.minWords} words.`,
      explanation: `Your answer has ${wordCount} words; the task asks for about ${task.minWords}.`,
      resolved: false,
    });
  }

  let improvedVersion = text;
  for (const d of detected) {
    improvedVersion = improvedVersion.replace(d.original, d.corrected);
  }
  if (improvedVersion.length > 0 && !/[.!?]$/.test(improvedVersion.trim())) {
    improvedVersion = improvedVersion.trim() + ".";
  }
  improvedVersion = improvedVersion.charAt(0).toUpperCase() + improvedVersion.slice(1);

  const grammarIssues = detected.filter((d) => d.category === "grammar").length;
  const structureIssues = issues.filter((i) => i.type === "structure").length;

  const scores: WritingAttempt["scores"] = {
    grammar: Math.max(40, 100 - grammarIssues * 15),
    vocabulary: Math.max(50, Math.min(100, 60 + wordCount)),
    spelling: Math.max(50, 100 - detected.filter((d) => d.category === "spelling").length * 20),
    structure: Math.max(40, 100 - structureIssues * 15),
    clarity: Math.max(45, 100 - issues.length * 8),
  };

  return { issues, improvedVersion, scores };
}

// -------------------------------------------------------------------------
// generateDailyChallenge
// -------------------------------------------------------------------------
export function generateDailyChallenge(profile: StudentProfile, date: string) {
  return buildDailyChallengeTasks(profile, date);
}

// -------------------------------------------------------------------------
// determineNextLesson
// -------------------------------------------------------------------------
export function determineNextLesson(profile: StudentProfile): { route: string; skill: SkillArea; reasonHe: string; reasonEn: string } {
  const progress = getProgress(profile.id);
  const openMistake = progress.mistakePatterns.find((m) => !m.resolved);
  if (openMistake) {
    return {
      route: openMistake.skill === "grammar" ? "/grammar" : openMistake.skill === "vocabulary" ? "/vocabulary" : "/tutor",
      skill: openMistake.skill,
      reasonHe: `נמשיך לתרגל את ${openMistake.topic} כדי לחזק את מה שלמדת.`,
      reasonEn: `Let's keep practicing ${openMistake.topic} to lock it in.`,
    };
  }
  const recs = buildRecommendedActivities(profile);
  const first = recs[0];
  return { route: first.route, skill: "vocabulary", reasonHe: "בואו נמשיך במסלול הלמידה היומי שלך.", reasonEn: "Let's continue your daily learning path." };
}

// -------------------------------------------------------------------------
// generateParentReport
// -------------------------------------------------------------------------
export function generateParentReport(profile: StudentProfile, weekStart: string, weekEnd: string): WeeklyParentReport {
  const progress = getProgress(profile.id);
  const conversations = listConversations(profile.id).filter((c) => c.startedAt >= weekStart && c.startedAt <= weekEnd + "T23:59:59");
  const speaking = listSpeakingAttempts(profile.id).filter((s) => s.attemptedAt >= weekStart && s.attemptedAt <= weekEnd + "T23:59:59");
  const writing = listWritingAttempts(profile.id).filter((w) => w.submittedAt >= weekStart && w.submittedAt <= weekEnd + "T23:59:59");

  const strengths = Object.values(progress.skillMastery)
    .filter((m) => m.masteryPercent >= 70 && m.attemptsCount > 0)
    .sort((a, b) => b.masteryPercent - a.masteryPercent)
    .slice(0, 2)
    .map((m) => skillLabelHe(m.skill));

  const improvementAreas = Object.values(progress.skillMastery)
    .filter((m) => m.masteryPercent < 60 && m.attemptsCount > 0)
    .sort((a, b) => a.masteryPercent - b.masteryPercent)
    .slice(0, 2)
    .map((m) => skillLabelHe(m.skill));

  const minutesPracticed = profile.minutesTodayTotal; // demo approximation for "this session"
  const weeklyXp = profile.xp;

  const topMistake = progress.mistakePatterns.find((m) => !m.resolved);

  const summaryHe =
    `השבוע ${profile.name} תרגל/ה אנגלית ולמד/ה ${profile.totalWordsLearned} מילים חדשות בסך הכל. ` +
    (strengths.length ? `ניכר שיפור יפה ב${strengths.join(" וב")}. ` : "") +
    (improvementAreas.length ? `מומלץ להמשיך לעבוד על ${improvementAreas.join(" ו")}` : "המשך כך, ההתקדמות מצוינת!") +
    (topMistake ? `, ובמיוחד על הנושא "${topMistake.topic}".` : ".");

  const recommendationsHe = [
    improvementAreas.length ? `להקדיש כמה דקות נוספות בשבוע הקרוב ל${improvementAreas[0]}.` : "להמשיך לתרגל בקצב הנוכחי - הוא עובד מצוין.",
    conversations.length === 0 ? "לנסות שיחת AI אחת השבוע כדי לתרגל שיחה חופשית." : "להמשיך לתרגל שיחות AI, זה עוזר לביטחון בדיבור.",
    speaking.length === 0 ? "להוסיף תרגול דיבור קצר, גם 5 דקות ביום יעשו הבדל." : "להמשיך עם תרגול ההגייה - הציונים משתפרים.",
  ].slice(0, 3);

  return {
    studentId: profile.id,
    weekStart,
    weekEnd,
    minutesPracticed,
    lessonsCompleted: profile.totalLessonsCompleted,
    wordsLearned: profile.totalWordsLearned,
    speakingMinutes: speaking.length * 2,
    strengths,
    improvementAreas,
    streakDays: profile.streakDays,
    weeklyXp,
    summaryHe,
    recommendationsHe,
  };
}

function skillLabelHe(skill: SkillArea): string {
  const labels: Record<SkillArea, string> = {
    vocabulary: "אוצר מילים",
    reading: "קריאה",
    comprehension: "הבנת הנקרא",
    speaking: "דיבור",
    pronunciation: "הגייה",
    listening: "האזנה",
    grammar: "דקדוק",
    writing: "כתיבה",
    conversation: "שיחה",
    confidence: "ביטחון",
  };
  return labels[skill];
}

import type { AchievementDef, StudentProfile } from "../types/models";
import { ACHIEVEMENT_DEFS } from "../data/seed/achievements";
import {
  countCompletedDailyChallenges,
  getProgress,
  getWordProgressMap,
  listAchievements,
  listConversations,
  listSpeakingAttempts,
  listWritingAttempts,
  unlockAchievement,
} from "../data/store/repository";

function wordsMastered(studentId: string): number {
  const map = getWordProgressMap(studentId);
  return Object.values(map).filter((w) => w.timesCorrect > 0).length;
}

function grammarCorrectCount(studentId: string): number {
  const progress = getProgress(studentId);
  return progress.skillMastery.grammar?.correctCount ?? 0;
}

function bestPronunciationScore(studentId: string): number {
  const attempts = listSpeakingAttempts(studentId);
  return attempts.reduce((max, a) => Math.max(max, a.pronunciationScore), 0);
}

// Evaluates every achievement definition against the student's current
// stats and unlocks any that newly qualify. Returns the list of defs that
// were JUST unlocked by this call (empty if none), so the UI can show a
// celebration only once.
export function checkAndUnlockAchievements(profile: StudentProfile): AchievementDef[] {
  const already = new Set(listAchievements(profile.id).map((a) => a.id));
  const newlyUnlocked: AchievementDef[] = [];

  const stats = {
    wordsLearned: profile.totalWordsLearned || wordsMastered(profile.id),
    streakDays: profile.streakDays,
    grammarCorrect: grammarCorrectCount(profile.id),
    bestPronunciationScore: bestPronunciationScore(profile.id),
    conversationsCompleted: listConversations(profile.id).filter((c) => c.endedAt).length,
    storiesRead: getProgress(profile.id).recentSessionScores.filter((s) => s.skill === "reading").length,
    writingCompleted: listWritingAttempts(profile.id).length,
    dailyChallengesCompleted: countCompletedDailyChallenges(profile.id),
  };

  const checks: Record<string, boolean> = {
    "first-words": stats.wordsLearned >= 10,
    "streak-3": stats.streakDays >= 3,
    "streak-7": stats.streakDays >= 7,
    "grammar-master": stats.grammarCorrect >= 20,
    "speaking-star": stats.bestPronunciationScore >= 85,
    "words-100": stats.wordsLearned >= 100,
    "conversation-hero": stats.conversationsCompleted >= 5,
    "reading-champion": stats.storiesRead >= 10,
    "writing-pro": stats.writingCompleted >= 5,
    "daily-champion": stats.dailyChallengesCompleted >= 5,
  };

  for (const def of ACHIEVEMENT_DEFS) {
    if (already.has(def.id)) continue;
    if (checks[def.id]) {
      const unlocked = unlockAchievement(profile.id, def.id);
      if (unlocked) newlyUnlocked.push(def);
    }
  }

  return newlyUnlocked;
}

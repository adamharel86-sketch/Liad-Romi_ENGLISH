// Spaced-repetition word selection ("Leitner box" style).
// Words the student gets wrong come back sooner and more often; words the
// student consistently gets right are shown less and less.
import type { GradeLevel, VocabularyWord, WordProgress } from "../types/models";
import { getWordProgressMap, getOrCreateWordProgress } from "../data/store/repository";
import { wordsForGrade } from "../data/seed/vocabulary";

export interface WordQueueItem {
  word: VocabularyWord;
  progress: WordProgress;
  priority: number; // higher = more urgent to review
}

export function buildWordQueue(studentId: string, grade: GradeLevel, targetDifficulty: number, topic?: string): WordQueueItem[] {
  const pool = wordsForGrade(grade).filter((w) => (topic ? w.topic === topic : true));
  const progressMap = getWordProgressMap(studentId);
  const now = Date.now();

  const items: WordQueueItem[] = pool.map((word) => {
    const progress = progressMap[word.id] ?? getOrCreateWordProgress(studentId, word.id);
    let priority = 0;

    if (progress.timesSeen === 0) {
      // New words: prioritize ones close to the student's current target
      // difficulty so the deck doesn't feel too easy or too hard.
      priority = 50 - Math.abs(word.difficulty - targetDifficulty) * 10;
    } else if (progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= now) {
      // Overdue for review - the lower the box, the more urgent.
      priority = 100 - progress.box * 15;
    } else {
      priority = -10; // not due yet, deprioritize but keep as filler
    }

    // Words the student has struggled with recently get an extra boost.
    if (progress.timesSeen > 0 && progress.timesCorrect / progress.timesSeen < 0.6) {
      priority += 20;
    }

    return { word, progress, priority };
  });

  return items.sort((a, b) => b.priority - a.priority);
}

export function pickWordsForSession(studentId: string, grade: GradeLevel, targetDifficulty: number, count: number, topic?: string): VocabularyWord[] {
  const queue = buildWordQueue(studentId, grade, targetDifficulty, topic);
  return queue.slice(0, count).map((q) => q.word);
}

export function wordsDueForReview(studentId: string, grade: GradeLevel): VocabularyWord[] {
  const pool = wordsForGrade(grade);
  const progressMap = getWordProgressMap(studentId);
  const now = Date.now();
  return pool.filter((w) => {
    const p = progressMap[w.id];
    return p && p.nextReviewAt && new Date(p.nextReviewAt).getTime() <= now;
  });
}

import type { CEFRLevel, GradeLevel, PlacementAnswer, PlacementQuestion, SkillArea } from "../types/models";
import { GRADE_TIER } from "../types/models";

// Base CEFR expectation per grade — this is only the STARTING POINT.
// Actual performance on the placement test can move the student up or
// down from here; the grade never gates the ceiling or floor.
const GRADE_BASELINE_LEVEL: Record<GradeLevel, CEFRLevel> = {
  grade3: "pre-A1",
  grade4: "A1",
  grade6: "A2",
  grade7: "A2+",
};

const LEVEL_ORDER: CEFRLevel[] = ["pre-A1", "A1", "A1+", "A2", "A2+", "B1", "B1+", "B2"];

function clampLevelIndex(idx: number): number {
  return Math.max(0, Math.min(LEVEL_ORDER.length - 1, idx));
}

export interface ScoredPlacement {
  scoreBySkill: Partial<Record<SkillArea, number>>;
  overallScore: number;
  determinedLevel: CEFRLevel;
  summary: string;
}

export function scorePlacementTest(
  grade: GradeLevel,
  questions: PlacementQuestion[],
  answers: PlacementAnswer[]
): ScoredPlacement {
  const bySkill: Record<string, { correct: number; total: number }> = {};
  let correctCount = 0;
  let totalCount = 0;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;
    // "open" (free-write) questions are counted as attempted/participation
    // rather than right/wrong, since real grading of open writing happens
    // in the writing coach, not the placement test.
    const isOpen = question.correctAnswer === "open";
    const counted = isOpen ? answer.answer.trim().length > 2 : answer.correct;
    bySkill[question.skill] ??= { correct: 0, total: 0 };
    bySkill[question.skill].total += 1;
    if (counted) bySkill[question.skill].correct += 1;
    totalCount += 1;
    if (counted) correctCount += 1;
  }

  const scoreBySkill: Partial<Record<SkillArea, number>> = {};
  for (const [skill, { correct, total }] of Object.entries(bySkill)) {
    scoreBySkill[skill as SkillArea] = total > 0 ? Math.round((correct / total) * 100) : 0;
  }

  const overallScore = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  // Move up/down from the grade's baseline level depending on how well
  // the student actually performed - this is the "don't assume grade ==
  // level" requirement in action.
  const baselineIdx = LEVEL_ORDER.indexOf(GRADE_BASELINE_LEVEL[grade]);
  let delta = 0;
  if (overallScore >= 90) delta = 2;
  else if (overallScore >= 75) delta = 1;
  else if (overallScore >= 45) delta = 0;
  else if (overallScore >= 25) delta = -1;
  else delta = -2;

  const determinedLevel = LEVEL_ORDER[clampLevelIndex(baselineIdx + delta)];

  const summary = buildSummary(grade, overallScore, determinedLevel, scoreBySkill);

  return { scoreBySkill, overallScore, determinedLevel, summary };
}

function buildSummary(
  grade: GradeLevel,
  overallScore: number,
  level: CEFRLevel,
  scoreBySkill: Partial<Record<SkillArea, number>>
): string {
  const strong = Object.entries(scoreBySkill)
    .filter(([, v]) => (v ?? 0) >= 75)
    .map(([k]) => k);
  const weak = Object.entries(scoreBySkill)
    .filter(([, v]) => (v ?? 0) < 50)
    .map(([k]) => k);

  const tierPhrase =
    GRADE_TIER[grade] <= 1
      ? "Great job finishing the test! 🎉"
      : "Nice work completing the placement test!";

  const strongText = strong.length ? ` You're doing great with: ${strong.join(", ")}.` : "";
  const weakText = weak.length ? ` We'll spend extra time on: ${weak.join(", ")}.` : "";

  return `${tierPhrase} Your personal starting level is ${level}.${strongText}${weakText}`;
}

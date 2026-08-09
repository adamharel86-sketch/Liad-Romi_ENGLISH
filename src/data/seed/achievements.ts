import type { AchievementDef } from "../../types/models";

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: "first-words", title: "First 10 Words", titleHe: "10 המילים הראשונות", description: "Learn your first 10 vocabulary words.", descriptionHe: "למד/י 10 מילים ראשונות.", emoji: "🔤", criteria: "wordsLearned >= 10" },
  { id: "streak-3", title: "3-Day Streak", titleHe: "רצף של 3 ימים", description: "Practice English for 3 days in a row.", descriptionHe: "תרגל/י אנגלית 3 ימים ברצף.", emoji: "🔥", criteria: "streakDays >= 3" },
  { id: "streak-7", title: "7-Day Streak", titleHe: "רצף של 7 ימים", description: "Practice English for 7 days in a row.", descriptionHe: "תרגל/י אנגלית 7 ימים ברצף.", emoji: "🔥", criteria: "streakDays >= 7" },
  { id: "grammar-master", title: "Grammar Master", titleHe: "אלוף הדקדוק", description: "Complete 20 grammar exercises correctly.", descriptionHe: "השלימ/י 20 תרגילי דקדוק בהצלחה.", emoji: "🧠", criteria: "grammarCorrect >= 20" },
  { id: "speaking-star", title: "Speaking Star", titleHe: "כוכב/ת הדיבור", description: "Get a pronunciation score above 85.", descriptionHe: "השג/י ציון הגייה מעל 85.", emoji: "⭐", criteria: "bestPronunciationScore >= 85" },
  { id: "words-100", title: "100 Words Learned", titleHe: "100 מילים שנלמדו", description: "Learn 100 vocabulary words.", descriptionHe: "למד/י 100 מילים.", emoji: "📖", criteria: "wordsLearned >= 100" },
  { id: "conversation-hero", title: "Conversation Hero", titleHe: "גיבור/ת השיחה", description: "Complete 5 AI conversation simulations.", descriptionHe: "השלימ/י 5 שיחות AI.", emoji: "💬", criteria: "conversationsCompleted >= 5" },
  { id: "reading-champion", title: "Reading Champion", titleHe: "אלוף/ת הקריאה", description: "Finish 10 reading stories.", descriptionHe: "סיימ/י 10 סיפורי קריאה.", emoji: "📚", criteria: "storiesRead >= 10" },
  { id: "writing-pro", title: "Writing Pro", titleHe: "מקצוענ/ית הכתיבה", description: "Complete 5 writing tasks.", descriptionHe: "השלימ/י 5 מטלות כתיבה.", emoji: "✍️", criteria: "writingCompleted >= 5" },
  { id: "daily-champion", title: "Daily Challenge Champion", titleHe: "אלוף/ת האתגר היומי", description: "Complete the daily challenge 5 times.", descriptionHe: "השלימ/י את האתגר היומי 5 פעמים.", emoji: "🎯", criteria: "dailyChallengesCompleted >= 5" },
];

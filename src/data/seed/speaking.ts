import type { SpeakingPrompt } from "../../types/models";

export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  { id: "sp-g3-1", text: "This is my dog.", translationHe: "זה הכלב שלי.", grade: "grade3", targetSounds: ["TH"] },
  { id: "sp-g3-2", text: "I like pizza.", translationHe: "אני אוהב פיצה.", grade: "grade3", targetSounds: ["L"] },
  { id: "sp-g3-3", text: "The ball is red.", translationHe: "הכדור אדום.", grade: "grade3", targetSounds: ["TH", "R"] },
  { id: "sp-g3-4", text: "I have two hands.", translationHe: "יש לי שתי ידיים.", grade: "grade3", targetSounds: ["H", "ND"] },
  { id: "sp-g3-5", text: "My name is Tom.", translationHe: "שמי טום.", grade: "grade3", targetSounds: ["M", "N"] },
  { id: "sp-g6-1", text: "I usually hang out with my friends after school.", translationHe: "אני בדרך כלל נפגש עם חברים אחרי בית הספר.", grade: "grade6", targetSounds: ["TH", "H"] },
  { id: "sp-g6-2", text: "We are going camping this weekend.", translationHe: "אנחנו יוצאים לקמפינג בסוף השבוע.", grade: "grade6", targetSounds: ["W", "K"] },
  { id: "sp-g6-3", text: "This game has a really exciting story.", translationHe: "למשחק הזה יש סיפור ממש מרגש.", grade: "grade6", targetSounds: ["TH", "ST"] },
  { id: "sp-g6-4", text: "I want to improve my English this year.", translationHe: "אני רוצה לשפר את האנגלית שלי השנה.", grade: "grade6", targetSounds: ["W", "IM"] },
  { id: "sp-g6-5", text: "My favorite subject is science.", translationHe: "מקצוע הלימוד האהוב עליי הוא מדעים.", grade: "grade6", targetSounds: ["SC", "V"] },
  { id: "sp-g4-1", text: "I like to play with my dog.", translationHe: "אני אוהב לשחק עם הכלב שלי.", grade: "grade4", targetSounds: ["TH", "PL"] },
  { id: "sp-g4-2", text: "This is my favorite toy.", translationHe: "זו הצעצוע האהוב עליי.", grade: "grade4", targetSounds: ["TH", "V"] },
  { id: "sp-g4-3", text: "The weather is sunny today.", translationHe: "מזג האוויר שמשי היום.", grade: "grade4", targetSounds: ["W", "TH"] },
  { id: "sp-g4-4", text: "I think that book is great.", translationHe: "אני חושב שהספר הזה נהדר.", grade: "grade4", targetSounds: ["TH", "GR"] },
  { id: "sp-g4-5", text: "Three brothers are playing outside.", translationHe: "שלושה אחים משחקים בחוץ.", grade: "grade4", targetSounds: ["TH", "BR"] },
  { id: "sp-g7-1", text: "I'm really interested in learning about artificial intelligence.", translationHe: "אני מעוניין ללמוד על בינה מלאכותית.", grade: "grade7", targetSounds: ["TH", "R", "L"] },
  { id: "sp-g7-2", text: "She thought the movie's plot was surprisingly clever.", translationHe: "היא חשבה שהעלילה של הסרט הייתה חכמה במיוחד.", grade: "grade7", targetSounds: ["TH", "PL", "CL"] },
  { id: "sp-g7-3", text: "World travel teaches you about different cultures.", translationHe: "טיולים בעולם מלמדים על תרבויות שונות.", grade: "grade7", targetSounds: ["W", "CH", "R"] },
  { id: "sp-g7-4", text: "Through practice, everything gradually gets easier.", translationHe: "בעזרת תרגול, הכל נהיה קל יותר בהדרגה.", grade: "grade7", targetSounds: ["TH", "GR"] },
  { id: "sp-g7-5", text: "The weather forecast predicts a thunderstorm tonight.", translationHe: "תחזית מזג האוויר צופה סופת רעמים הערב.", grade: "grade7", targetSounds: ["TH", "W", "ST"] },
];

export function speakingPromptsForGrade(grade: SpeakingPrompt["grade"]): SpeakingPrompt[] {
  return SPEAKING_PROMPTS.filter((p) => p.grade === grade || p.grade === "both");
}

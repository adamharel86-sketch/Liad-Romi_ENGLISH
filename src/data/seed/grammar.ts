import type { GradeLevel } from "../../types/models";

export interface GrammarTopic {
  id: string;
  title: string;
  titleHe: string;
  emoji: string;
  // Which grades this topic is taught to. A topic simply doesn't appear
  // in the Grammar Lab for grades not listed here — this is how grade 3
  // (no formal grammar) and grade 4 (only the basics) get a genuinely
  // different Grammar Lab than grade 6/7.
  grades: GradeLevel[];
  content: Partial<
    Record<
      GradeLevel,
      {
        explanation: string;
        examples: string[];
      }
    >
  >;
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    titleHe: "הווה פשוט",
    emoji: "🔵",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "We use Present Simple for things that are always true or happen often. Add -s for he/she/it.",
        examples: ["I play soccer.", "She likes ice cream.", "The sun rises in the east."],
      },
      grade6: {
        explanation: "Present Simple describes habits, routines and facts. Remember the -s ending with he/she/it, and use don't/doesn't for negatives.",
        examples: ["I usually walk to school.", "My brother doesn't like spicy food.", "Does she play the guitar?"],
      },
      grade7: {
        explanation: "Present Simple describes habits, routines, facts, and permanent situations. Third-person singular subjects (he/she/it) take an -s/-es ending.",
        examples: ["He studies every evening after dinner.", "Water boils at 100 degrees.", "My sister doesn't like horror movies."],
      },
    },
  },
  {
    id: "present-progressive",
    title: "Present Progressive",
    titleHe: "הווה ממושך",
    emoji: "🟢",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "We use am/is/are + -ing for things happening right now.",
        examples: ["I am eating breakfast.", "They are playing outside.", "It is raining now."],
      },
      grade6: {
        explanation: "Present Progressive (be + verb-ing) is for actions happening right now, or things happening around this time in general.",
        examples: ["I'm reading a great book these days.", "We are practicing for the show this week.", "She isn't listening right now."],
      },
      grade7: {
        explanation: "Present Progressive (be + verb-ing) describes actions in progress at the moment of speaking, or temporary situations.",
        examples: ["She is working on a school project this week.", "We are currently discussing the new rules.", "I'm not watching TV right now."],
      },
    },
  },
  {
    id: "question-forms",
    title: "Question Forms",
    titleHe: "מבנה שאלות",
    emoji: "🟦",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "We use Do/Does or Wh- words (What, Where, When, Why) to ask questions.",
        examples: ["Do you like pizza?", "Where is my pencil?", "What is your favorite animal?"],
      },
      grade6: {
        explanation: "Yes/No questions start with Do/Does/Did/Is/Are. Wh-questions start with a question word, then follow the same word order.",
        examples: ["What did you do yesterday?", "Are you going to the party?", "How often do you play basketball?"],
      },
      grade7: {
        explanation: "Yes/No questions invert the auxiliary and subject; Wh-questions place the question word first, followed by the same inversion.",
        examples: ["Why didn't you finish the assignment?", "How long have you been learning English?", "What would you do in that situation?"],
      },
    },
  },
  {
    id: "pronouns",
    title: "Pronouns",
    titleHe: "כינויי גוף",
    emoji: "🟡",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "Pronouns replace names: I, you, he, she, it, we, they.",
        examples: ["He is my brother.", "This is her book.", "We like them."],
      },
      grade6: {
        explanation: "Pronouns replace nouns so we don't repeat names. Remember subject pronouns (he/she) vs. object pronouns (him/her).",
        examples: ["I gave the book to her.", "They invited us to the party.", "It belongs to him."],
      },
      grade7: {
        explanation: "Pronouns (subject, object, possessive, reflexive) replace nouns to avoid repetition and must agree in number and gender with their antecedent.",
        examples: ["She gave the notes to him herself.", "The decision is theirs to make.", "I taught myself how to code."],
      },
    },
  },
  {
    id: "prepositions",
    title: "Prepositions",
    titleHe: "מילות יחס",
    emoji: "🔷",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "Prepositions show where or when: in, on, at, under, next to.",
        examples: ["The cat is under the table.", "I go to school at 8 o'clock.", "The book is on the shelf."],
      },
      grade6: {
        explanation: "Prepositions of time and place connect nouns to the rest of the sentence: in/on/at, before/after, between/among.",
        examples: ["The game starts at 5 PM.", "I sit between my two friends.", "We're meeting after school."],
      },
      grade7: {
        explanation: "Prepositions of place, time, and movement establish relationships between nouns/pronouns and the rest of the sentence; usage is often idiomatic rather than logical.",
        examples: ["The meeting is scheduled for Tuesday afternoon.", "She succeeded despite the difficulties.", "He's been interested in space since childhood."],
      },
    },
  },
  {
    id: "articles",
    title: "Articles (a / an / the)",
    titleHe: "יידוע",
    emoji: "🔶",
    grades: ["grade4", "grade6", "grade7"],
    content: {
      grade4: {
        explanation: "Use 'a/an' for one unspecific thing, and 'the' for a specific thing.",
        examples: ["I have a dog.", "She ate an apple.", "The dog is very friendly."],
      },
      grade6: {
        explanation: "Use a/an when mentioning something for the first time or something non-specific; use 'the' when it's already known or unique.",
        examples: ["We watched a movie last night. The movie was amazing.", "He wants to be an astronaut.", "The internet is very useful."],
      },
      grade7: {
        explanation: "Indefinite articles (a/an) introduce non-specific or first-mentioned nouns; the definite article (the) refers to something already known or unique.",
        examples: ["He's reading a fascinating book about the ocean.", "The internet has changed the way we communicate.", "She wants to become an engineer."],
      },
    },
  },
  {
    id: "past-simple",
    title: "Past Simple",
    titleHe: "עבר פשוט",
    emoji: "🟠",
    grades: ["grade6", "grade7"],
    content: {
      grade6: {
        explanation: "We use Past Simple for finished actions in the past. Regular verbs add -ed; some verbs are irregular (go → went).",
        examples: ["I played basketball yesterday.", "She watched a movie last night.", "We went to the beach on Sunday."],
      },
      grade7: {
        explanation: "Past Simple expresses completed actions at a specific past time. Regular verbs take -ed; irregular verbs change form entirely and must be memorized.",
        examples: ["They traveled to Italy last summer.", "He didn't finish his homework on time.", "Did you see that documentary last night?"],
      },
    },
  },
  {
    id: "future",
    title: "Future (will / going to)",
    titleHe: "עתיד",
    emoji: "🟣",
    grades: ["grade6", "grade7"],
    content: {
      grade6: {
        explanation: "We use 'will' for predictions and 'going to' for plans you already decided on.",
        examples: ["I will visit my grandma tomorrow.", "We are going to watch a movie tonight.", "It will probably rain later."],
      },
      grade7: {
        explanation: "'Will' expresses predictions, promises, and spontaneous decisions; 'going to' expresses plans and intentions already decided.",
        examples: ["I'm going to apply for the robotics club next month.", "She will probably win the competition.", "What are you going to do after the exams?"],
      },
    },
  },
  {
    id: "comparatives",
    title: "Comparatives & Superlatives",
    titleHe: "השוואה",
    emoji: "🟥",
    grades: ["grade6", "grade7"],
    content: {
      grade6: {
        explanation: "Use -er to compare two things (bigger) and 'the ...-est' for the most (the biggest).",
        examples: ["My dog is bigger than yours.", "This is the biggest pizza I've seen!", "She is taller than her brother."],
      },
      grade7: {
        explanation: "Comparatives (-er / more + adjective) compare two items; superlatives (-est / most + adjective) single out the highest degree among three or more.",
        examples: ["This phone is more expensive than the last model.", "It was the most exciting match of the season.", "The more you practice, the better you get."],
      },
    },
  },
  {
    id: "irregular-verbs",
    title: "Irregular Verbs",
    titleHe: "פעלים לא רגילים",
    emoji: "🟧",
    grades: ["grade6", "grade7"],
    content: {
      grade6: {
        explanation: "Some verbs don't add -ed in the past. Example: go → went, eat → ate, see → saw. You just have to remember them.",
        examples: ["I went to the park.", "She ate a sandwich.", "We saw a great movie."],
      },
      grade7: {
        explanation: "Irregular verbs have unpredictable past simple and past participle forms that must be memorized individually rather than derived by rule.",
        examples: ["He has already taken the test twice.", "They flew to London for the conference.", "I thought about it carefully before deciding."],
      },
    },
  },
];

export interface IrregularVerb {
  base: string;
  past: string;
  participle: string;
  translationHe: string;
}

export const IRREGULAR_VERBS: IrregularVerb[] = [
  { base: "go", past: "went", participle: "gone", translationHe: "ללכת" },
  { base: "eat", past: "ate", participle: "eaten", translationHe: "לאכול" },
  { base: "see", past: "saw", participle: "seen", translationHe: "לראות" },
  { base: "have", past: "had", participle: "had", translationHe: "יש / להיות בעל" },
  { base: "do", past: "did", participle: "done", translationHe: "לעשות" },
  { base: "make", past: "made", participle: "made", translationHe: "להכין / לעשות" },
  { base: "take", past: "took", participle: "taken", translationHe: "לקחת" },
  { base: "come", past: "came", participle: "come", translationHe: "לבוא" },
  { base: "write", past: "wrote", participle: "written", translationHe: "לכתוב" },
  { base: "think", past: "thought", participle: "thought", translationHe: "לחשוב" },
  { base: "buy", past: "bought", participle: "bought", translationHe: "לקנות" },
  { base: "run", past: "ran", participle: "run", translationHe: "לרוץ" },
];

// Very light "sentence pattern" practice for grade 3 — used instead of a
// formal Grammar Lab, since abstract grammar terminology doesn't fit this
// age group. Each pattern is a fill-in-the-blank sentence frame.
export interface SentencePattern {
  id: string;
  emoji: string;
  frame: string; // uses ___ as the blank
  frameHe: string;
  options: string[];
  correctAnswer: string;
}

export const GRADE3_SENTENCE_PATTERNS: SentencePattern[] = [
  { id: "sp-1", emoji: "🍕", frame: "I like ___.", frameHe: "אני אוהב/ת ___.", options: ["pizza", "run", "blue"], correctAnswer: "pizza" },
  { id: "sp-2", emoji: "🐶", frame: "This is my ___.", frameHe: "זה/זו ה___ שלי.", options: ["dog", "eat", "happy"], correctAnswer: "dog" },
  { id: "sp-3", emoji: "🙋", frame: "My name is ___.", frameHe: "שמי ___.", options: ["Tom", "run", "five"], correctAnswer: "Tom" },
  { id: "sp-4", emoji: "👦", frame: "I have two ___.", frameHe: "יש לי שני ___.", options: ["brothers", "blue", "eat"], correctAnswer: "brothers" },
  { id: "sp-5", emoji: "⚽", frame: "Where is the ___?", frameHe: "איפה ה___?", options: ["ball", "happy", "run"], correctAnswer: "ball" },
  { id: "sp-6", emoji: "🎨", frame: "The ball is ___.", frameHe: "הכדור ___.", options: ["red", "eat", "friend"], correctAnswer: "red" },
  { id: "sp-7", emoji: "😊", frame: "I am ___.", frameHe: "אני ___.", options: ["happy", "table", "run"], correctAnswer: "happy" },
  { id: "sp-8", emoji: "🥛", frame: "I drink ___.", frameHe: "אני שותה ___.", options: ["milk", "run", "hat"], correctAnswer: "milk" },
];

export function grammarTopicsForGrade(grade: GradeLevel): GrammarTopic[] {
  return GRAMMAR_TOPICS.filter((t) => t.grades.includes(grade));
}

// Lightweight, rule-based English mistake detector used by the mock AI
// service (AI Tutor, Conversation Mode, Writing Coach). Each rule is a
// regex + a correction template + a kid-friendly explanation.
//
// This is intentionally simple pattern matching rather than real NLP so
// the demo works with zero external dependencies / API calls. When this
// app is connected to the real Claude API (see aiService.ts), these
// rules can be dropped in favor of a single evaluateAnswer()/analyzeWriting()
// model call - the calling code (components) does not need to change.

export interface DetectedMistake {
  original: string;
  corrected: string;
  explanation: string;
  explanationHe: string;
  category: "grammar" | "vocabulary" | "spelling" | "structure";
}

interface Rule {
  pattern: RegExp;
  correct: (match: RegExpMatchArray) => string;
  explanation: string;
  explanationHe: string;
  category: DetectedMistake["category"];
}

const RULES: Rule[] = [
  { pattern: /\bi goed\b/i, correct: () => "I went", explanation: "'Go' is irregular. The past tense is 'went', not 'goed'.", explanationHe: "'Go' הוא פועל לא רגיל. בעבר אומרים 'went' ולא 'goed'.", category: "grammar" },
  { pattern: /\bhe goed\b|\bshe goed\b/i, correct: (m) => `${m[0].split(" ")[0]} went`, explanation: "'Go' is irregular. The past tense is 'went', not 'goed'.", explanationHe: "'Go' הוא פועל לא רגיל. בעבר אומרים 'went'.", category: "grammar" },
  { pattern: /\beated\b/i, correct: () => "ate", explanation: "'Eat' is irregular. The past tense is 'ate', not 'eated'.", explanationHe: "'Eat' הוא פועל לא רגיל. בעבר אומרים 'ate'.", category: "grammar" },
  { pattern: /\bbuyed\b/i, correct: () => "bought", explanation: "'Buy' is irregular. The past tense is 'bought', not 'buyed'.", explanationHe: "'Buy' הוא פועל לא רגיל. בעבר אומרים 'bought'.", category: "grammar" },
  { pattern: /\brunned\b/i, correct: () => "ran", explanation: "'Run' is irregular. The past tense is 'ran', not 'runned'.", explanationHe: "'Run' הוא פועל לא רגיל. בעבר אומרים 'ran'.", category: "grammar" },
  { pattern: /\bseed\b/i, correct: () => "saw", explanation: "'See' is irregular. The past tense is 'saw', not 'seed'.", explanationHe: "'See' הוא פועל לא רגיל. בעבר אומרים 'saw'.", category: "grammar" },
  { pattern: /\btaked\b/i, correct: () => "took", explanation: "'Take' is irregular. The past tense is 'took', not 'taked'.", explanationHe: "'Take' הוא פועל לא רגיל. בעבר אומרים 'took'.", category: "grammar" },
  { pattern: /\bmaked\b/i, correct: () => "made", explanation: "'Make' is irregular. The past tense is 'made', not 'maked'.", explanationHe: "'Make' הוא פועל לא רגיל. בעבר אומרים 'made'.", category: "grammar" },
  { pattern: /\bwrited\b/i, correct: () => "wrote", explanation: "'Write' is irregular. The past tense is 'wrote', not 'writed'.", explanationHe: "'Write' הוא פועל לא רגיל. בעבר אומרים 'wrote'.", category: "grammar" },
  { pattern: /\bthinked\b/i, correct: () => "thought", explanation: "'Think' is irregular. The past tense is 'thought', not 'thinked'.", explanationHe: "'Think' הוא פועל לא רגיל. בעבר אומרים 'thought'.", category: "grammar" },
  { pattern: /\bcomed\b/i, correct: () => "came", explanation: "'Come' is irregular. The past tense is 'came', not 'comed'.", explanationHe: "'Come' הוא פועל לא רגיל. בעבר אומרים 'came'.", category: "grammar" },
  { pattern: /\bdoed\b/i, correct: () => "did", explanation: "'Do' is irregular. The past tense is 'did', not 'doed'.", explanationHe: "'Do' הוא פועל לא רגיל. בעבר אומרים 'did'.", category: "grammar" },
  { pattern: /\bhaved\b/i, correct: () => "had", explanation: "'Have' is irregular. The past tense is 'had', not 'haved'.", explanationHe: "'Have' הוא פועל לא רגיל. בעבר אומרים 'had'.", category: "grammar" },
  { pattern: /\bdid(n't)? went\b/i, correct: (m) => (m[1] ? "didn't go" : "did go"), explanation: "After 'did' or 'didn't', use the base form: 'go', not 'went'.", explanationHe: "אחרי 'did' או 'didn't' משתמשים בצורת הבסיס 'go' ולא 'went'.", category: "grammar" },
  { pattern: /\bmore good\b/i, correct: () => "better", explanation: "The comparative of 'good' is 'better', not 'more good'.", explanationHe: "צורת ההשוואה של 'good' היא 'better'.", category: "grammar" },
  { pattern: /\bgooder\b/i, correct: () => "better", explanation: "The comparative of 'good' is 'better', not 'gooder'.", explanationHe: "צורת ההשוואה של 'good' היא 'better'.", category: "grammar" },
  { pattern: /\bbestest\b/i, correct: () => "best", explanation: "The superlative of 'good' is just 'best'.", explanationHe: "צורת העליון של 'good' היא 'best' בלבד.", category: "grammar" },
  { pattern: /\bi am agree\b/i, correct: () => "I agree", explanation: "In English, 'agree' is a verb by itself - we don't say 'am agree'.", explanationHe: "'agree' הוא פועל בעצמו, לא אומרים 'am agree'.", category: "grammar" },
  { pattern: /\bdon't have no\b/i, correct: () => "don't have any", explanation: "English avoids double negatives - use 'any' instead of a second 'no'.", explanationHe: "באנגלית נמנעים משלילה כפולה - משתמשים ב-'any'.", category: "grammar" },
  { pattern: /\bhe go\b|\bshe go\b|\bit go\b/i, correct: (m) => `${m[0].split(" ")[0]} goes`, explanation: "With he/she/it, add -s to the verb in Present Simple.", explanationHe: "עם he/she/it מוסיפים -s לפועל בהווה פשוט.", category: "grammar" },
  { pattern: /\bhe like\b|\bshe like\b|\bit like\b/i, correct: (m) => `${m[0].split(" ")[0]} likes`, explanation: "With he/she/it, add -s to the verb in Present Simple.", explanationHe: "עם he/she/it מוסיפים -s לפועל בהווה פשוט.", category: "grammar" },
  { pattern: /\bhe don't\b|\bshe don't\b|\bit don't\b/i, correct: (m) => `${m[0].split(" ")[0]} doesn't`, explanation: "With he/she/it we use 'doesn't', not 'don't'.", explanationHe: "עם he/she/it משתמשים ב-'doesn't' ולא 'don't'.", category: "grammar" },
];

export function detectMistakes(text: string): DetectedMistake[] {
  const found: DetectedMistake[] = [];
  for (const rule of RULES) {
    const match = text.match(rule.pattern);
    if (match) {
      found.push({
        original: match[0],
        corrected: rule.correct(match),
        explanation: rule.explanation,
        explanationHe: rule.explanationHe,
        category: rule.category,
      });
    }
  }
  return found;
}

// A slightly broader pass used specifically by the Writing Coach, which
// also flags very short/incomplete sentences and missing capitalization -
// things that are fine to ignore in fast free-chat but matter in writing.
export function detectWritingIssues(text: string): DetectedMistake[] {
  const issues = detectMistakes(text);
  const trimmed = text.trim();

  if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
    issues.push({
      original: trimmed.slice(0, 1),
      corrected: trimmed.slice(0, 1).toUpperCase(),
      explanation: "Sentences should start with a capital letter.",
      explanationHe: "משפטים צריכים להתחיל באות גדולה.",
      category: "structure",
    });
  }
  if (trimmed.length > 0 && !/[.!?]$/.test(trimmed)) {
    issues.push({
      original: trimmed.slice(-1),
      corrected: trimmed.slice(-1) + ".",
      explanation: "Don't forget to end your sentence with a period, question mark, or exclamation mark.",
      explanationHe: "אל תשכחו לסיים משפט בנקודה, סימן שאלה או קריאה.",
      category: "structure",
    });
  }

  return issues;
}

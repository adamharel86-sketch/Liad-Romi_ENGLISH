# WordUp! 🐝 — AI-Powered English Learning App for Kids

An interactive, gamified web app for teaching English to kids across four grade
bands (ג׳ / ד׳ / ו׳ / ז׳), built with React, TypeScript, Tailwind CSS, and an
adaptive learning engine. Fully functional as a demo with no backend — all
data is stored locally in the browser (`localStorage`), and the AI layer is
implemented with clean, swappable rule-based logic that's structured to be
replaced with real Anthropic Claude API calls later.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## What's inside

- **Four independent student profiles** (grade 3, 4, 6, and 7), each with a
  genuinely different experience: vocabulary complexity, sentence length,
  grammar topics offered, conversation depth, and visual maturity (playful
  "junior" look for grades 3–4, calmer "bridge" look for grade 6, clean
  "teen" look for grade 7) all differ — not just labels.
- **Adaptive placement test** per student that sets a real CEFR starting
  level based on performance, not just grade.
- **Adaptive learning engine** (`src/engine/`) that tracks per-skill mastery,
  recurring mistakes, and spaced-repetition vocabulary review, and uses all
  of that — not just grade — to pick difficulty and next activities.
- **AI Tutor**, **Conversation simulator** (10 scenarios), **Vocabulary
  games**, **Reading & comprehension**, **Grammar Lab**, **Writing Coach**,
  **Speaking & pronunciation practice** (Web Speech API), **Achievements**,
  **Daily Challenge**, and a full **Parent Dashboard** with an auto-generated
  Hebrew weekly summary and recommendations per child.
- Hebrew (RTL) navigation/chrome + English (LTR) learning content, correctly
  mixed throughout.

## Architecture

```
src/
  types/models.ts        Data models (StudentProfile, LearningProgress, ...)
  data/seed/              Demo content banks (vocabulary, grammar, reading,
                          conversations, speaking prompts, writing tasks,
                          achievements, placement questions) for all 4 grades
  data/store/             localStorage persistence layer (repository.ts)
  engine/                 Adaptive difficulty, spaced repetition, placement
                          scoring, achievements — pure business logic
  services/ai/            Central AI service (aiService.ts) + rule-based
                          mistake detector. Every "smart" behavior in the
                          app goes through this file.
  context/                React context for the active student session
  components/             Reusable UI (buttons, cards, nav, gamification)
  pages/                  One file per screen/route
```

### Connecting the real Claude API

Everything AI-related is centralized in `src/services/ai/aiService.ts`. Each
exported function (`generateExercise`, `generateConversation`,
`evaluateAnswer`, `explainMistake`, `generateReadingText`, `analyzeWriting`,
`generateDailyChallenge`, `generateParentReport`, `determineNextLesson`) has
a demo implementation today. To go live, replace the body of any of these
functions with a call to the Anthropic Messages API, keeping the same
input/output shape — no other file needs to change, since components only
ever call into this module.

## Demo profiles

Four pre-seeded profiles are ready to explore immediately from the
"בחרו את מי שרוצה ללמוד" screen: תומר (כיתה ג׳), דניאל (כיתה ד׳), רוני
(כיתה ו׳), and מאיה (כיתה ז׳). The parent dashboard (👨‍👩‍👧‍👦) shows all
four side by side regardless of which one is currently "logged in".

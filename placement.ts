import type { GradeLevel, PlacementQuestion } from "../../types/models";

// Ordered from easy to harder within each grade bank. The placement engine
// will adapt (skip ahead / drop back) based on running accuracy rather than
// simply presenting all of them.
const grade4Questions: PlacementQuestion[] = [
  { id: "p4-1", skill: "vocabulary", prompt: "Choose the correct word: This is my ___.", options: ["dog", "run", "happy", "under"], correctAnswer: "dog", difficulty: 1 },
  { id: "p4-2", skill: "grammar", prompt: "Choose the correct sentence.", options: ["She is happy.", "She happy is.", "Happy she is.", "Is she happy she."], correctAnswer: "She is happy.", difficulty: 1 },
  { id: "p4-3", skill: "vocabulary", prompt: "What do you call the meal you eat in the morning?", options: ["Dinner", "Breakfast", "Lunch", "Snack"], correctAnswer: "Breakfast", difficulty: 1 },
  { id: "p4-4", skill: "grammar", prompt: "I ___ to school every day.", options: ["go", "goes", "going", "went"], correctAnswer: "go", difficulty: 2 },
  { id: "p4-5", skill: "reading", prompt: "\"Tom has a red ball. He plays with it every day.\" What color is the ball?", options: ["Blue", "Red", "Green", "Yellow"], correctAnswer: "Red", difficulty: 1 },
  { id: "p4-6", skill: "grammar", prompt: "Yesterday, I ___ a movie.", options: ["watch", "watches", "watched", "watching"], correctAnswer: "watched", difficulty: 2 },
  { id: "p4-7", skill: "vocabulary", prompt: "Choose the opposite of 'hot'.", options: ["Warm", "Cold", "Sunny", "Big"], correctAnswer: "Cold", difficulty: 2 },
  { id: "p4-8", skill: "comprehension", prompt: "\"Maya was scared of the big dog, so she ran home.\" Why did Maya run home?", options: ["She was hungry", "She was scared", "She was tired", "She was happy"], correctAnswer: "She was scared", difficulty: 2 },
  { id: "p4-9", skill: "grammar", prompt: "There ___ three books on the table.", options: ["is", "am", "are", "be"], correctAnswer: "are", difficulty: 3 },
  { id: "p4-10", skill: "writing", prompt: "Write one full sentence about your favorite food.", correctAnswer: "open", difficulty: 2 },
  { id: "p4-11", skill: "vocabulary", prompt: "Choose the word that means 'a person who teaches you'.", options: ["Doctor", "Teacher", "Driver", "Farmer"], correctAnswer: "Teacher", difficulty: 1 },
  { id: "p4-12", skill: "grammar", prompt: "She ___ like vegetables.", options: ["don't", "doesn't", "isn't", "not"], correctAnswer: "doesn't", difficulty: 3 },
];

const grade7Questions: PlacementQuestion[] = [
  { id: "p7-1", skill: "vocabulary", prompt: "Choose the best synonym for 'ambitious'.", options: ["Lazy", "Driven", "Careless", "Bored"], correctAnswer: "Driven", difficulty: 3 },
  { id: "p7-2", skill: "grammar", prompt: "By the time we arrived, the movie ___.", options: ["already started", "had already started", "already starts", "was already start"], correctAnswer: "had already started", difficulty: 4 },
  { id: "p7-3", skill: "reading", prompt: "\"Although she was exhausted, Noa finished the marathon.\" What can we infer about Noa?", options: ["She gave up", "She is determined", "She didn't run", "She was not tired"], correctAnswer: "She is determined", difficulty: 3 },
  { id: "p7-4", skill: "grammar", prompt: "If I ___ more time, I would learn another language.", options: ["have", "had", "will have", "having"], correctAnswer: "had", difficulty: 4 },
  { id: "p7-5", skill: "vocabulary", prompt: "\"The company released an innovative product.\" What does 'innovative' mean?", options: ["Expensive", "Old-fashioned", "Using new ideas", "Difficult to use"], correctAnswer: "Using new ideas", difficulty: 3 },
  { id: "p7-6", skill: "grammar", prompt: "Choose the correct sentence.", options: ["He don't like sports.", "He doesn't likes sports.", "He doesn't like sports.", "He not like sports."], correctAnswer: "He doesn't like sports.", difficulty: 2 },
  { id: "p7-7", skill: "comprehension", prompt: "\"Despite the rain, the game continued.\" What does 'despite' show?", options: ["Cause", "Contrast", "Time", "Result"], correctAnswer: "Contrast", difficulty: 4 },
  { id: "p7-8", skill: "vocabulary", prompt: "Choose the best word: We need to find a ___ to this problem.", options: ["solution", "question", "mistake", "opinion"], correctAnswer: "solution", difficulty: 2 },
  { id: "p7-9", skill: "grammar", prompt: "She has been studying English ___ five years.", options: ["since", "for", "from", "at"], correctAnswer: "for", difficulty: 3 },
  { id: "p7-10", skill: "writing", prompt: "Write 2 sentences giving your opinion about social media.", correctAnswer: "open", difficulty: 3 },
  { id: "p7-11", skill: "grammar", prompt: "This is the ___ movie I have ever seen.", options: ["good", "better", "best", "goodest"], correctAnswer: "best", difficulty: 2 },
  { id: "p7-12", skill: "vocabulary", prompt: "\"He apologized for being late.\" What did he do?", options: ["He said sorry", "He got angry", "He left early", "He celebrated"], correctAnswer: "He said sorry", difficulty: 2 },
];

const grade3Questions: PlacementQuestion[] = [
  { id: "p3-1", skill: "vocabulary", prompt: "Choose the picture word: 🔴 is...", options: ["red", "blue", "run", "cat"], correctAnswer: "red", difficulty: 1 },
  { id: "p3-2", skill: "vocabulary", prompt: "This is my ___. 🐶", options: ["dog", "book", "hat", "run"], correctAnswer: "dog", difficulty: 1 },
  { id: "p3-3", skill: "grammar", prompt: "Choose the correct sentence.", options: ["I like pizza.", "Pizza I like.", "Like I pizza.", "I pizza like."], correctAnswer: "I like pizza.", difficulty: 1 },
  { id: "p3-4", skill: "vocabulary", prompt: "How many is this? 2️⃣", options: ["one", "two", "three", "five"], correctAnswer: "two", difficulty: 1 },
  { id: "p3-5", skill: "reading", prompt: "\"Rex is a dog. Rex is brown.\" What color is Rex?", options: ["Black", "White", "Brown", "Red"], correctAnswer: "Brown", difficulty: 1 },
  { id: "p3-6", skill: "grammar", prompt: "My name ___ Tom.", options: ["is", "am", "are", "be"], correctAnswer: "is", difficulty: 2 },
  { id: "p3-7", skill: "vocabulary", prompt: "Choose the opposite of 'hot'.", options: ["big", "cold", "happy", "small"], correctAnswer: "cold", difficulty: 2 },
  { id: "p3-8", skill: "comprehension", prompt: "\"Sam is happy. Sam has a red ball.\" How does Sam feel?", options: ["Sad", "Happy", "Angry", "Scared"], correctAnswer: "Happy", difficulty: 1 },
  { id: "p3-9", skill: "writing", prompt: "Write one short sentence: 'I like ___.'", correctAnswer: "open", difficulty: 1 },
  { id: "p3-10", skill: "grammar", prompt: "I ___ two brothers.", options: ["have", "has", "is", "am"], correctAnswer: "have", difficulty: 2 },
];

const grade6Questions: PlacementQuestion[] = [
  { id: "p6-1", skill: "vocabulary", prompt: "Choose the best word: I want to ___ my English this year.", options: ["improve", "eat", "sleep", "colors"], correctAnswer: "improve", difficulty: 2 },
  { id: "p6-2", skill: "grammar", prompt: "Yesterday, we ___ to the beach.", options: ["go", "goes", "went", "going"], correctAnswer: "went", difficulty: 2 },
  { id: "p6-3", skill: "reading", prompt: "\"Adi saved money for two months to buy a phone.\" How did Adi get the phone?", options: ["Someone gave it to her", "She saved money herself", "She found it", "She borrowed it"], correctAnswer: "She saved money herself", difficulty: 2 },
  { id: "p6-4", skill: "grammar", prompt: "She ___ playing the guitar every day.", options: ["practice", "practices", "practiced", "practicing"], correctAnswer: "practices", difficulty: 2 },
  { id: "p6-5", skill: "vocabulary", prompt: "Choose the best word: We are going on ___ next week.", options: ["vacation", "argument", "subject", "score"], correctAnswer: "vacation", difficulty: 2 },
  { id: "p6-6", skill: "grammar", prompt: "This game is ___ than the last one.", options: ["good", "better", "best", "gooder"], correctAnswer: "better", difficulty: 3 },
  { id: "p6-7", skill: "comprehension", prompt: "\"It wasn't a fancy trip, but it was a lot of fun.\" How did they feel about the trip?", options: ["They didn't enjoy it", "They had a good time anyway", "They were bored", "They were angry"], correctAnswer: "They had a good time anyway", difficulty: 3 },
  { id: "p6-8", skill: "grammar", prompt: "What ___ you do last weekend?", options: ["do", "did", "does", "doing"], correctAnswer: "did", difficulty: 2 },
  { id: "p6-9", skill: "writing", prompt: "Write 2 sentences about your favorite hobby.", correctAnswer: "open", difficulty: 2 },
  { id: "p6-10", skill: "vocabulary", prompt: "\"We teamed up to win the game.\" What does 'teamed up' mean?", options: ["Fought each other", "Joined together", "Left the game", "Watched the game"], correctAnswer: "Joined together", difficulty: 3 },
];

export function placementQuestionsForGrade(grade: GradeLevel): PlacementQuestion[] {
  if (grade === "grade3") return grade3Questions;
  if (grade === "grade4") return grade4Questions;
  if (grade === "grade6") return grade6Questions;
  return grade7Questions;
}

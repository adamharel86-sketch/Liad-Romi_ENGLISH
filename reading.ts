import type { GradeLevel } from "../../types/models";

export interface ReadingQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "context-meaning";
  question: string;
  questionHe?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ReadingStory {
  id: string;
  title: string;
  titleHe: string;
  grade: GradeLevel;
  emoji: string;
  level: 1 | 2 | 3; // difficulty within grade
  text: string; // paragraphs separated by \n\n
  glossary: Record<string, string>; // word -> Hebrew meaning, for click-to-translate
  questions: ReadingQuestion[];
}

export const READING_STORIES: ReadingStory[] = [
  {
    id: "g4-story-lost-dog",
    title: "Max the Lost Dog",
    titleHe: "מקס הכלב האבוד",
    grade: "grade4",
    emoji: "🐕",
    level: 1,
    text:
      "Lily has a small brown dog. His name is Max. Max likes to run in the park.\n\n" +
      "One day, Max saw a cat. He ran very fast after the cat. Lily called, \"Max! Come back!\" But Max did not stop.\n\n" +
      "Lily looked for Max everywhere. She was scared. Then she heard a bark near the big tree. It was Max! He was tired and hungry.\n\n" +
      "Lily hugged Max and gave him some water. \"I am so happy you are safe,\" she said. They walked home together, slowly and happily.",
    glossary: {
      lost: "אבוד",
      park: "פארק",
      cat: "חתול",
      scared: "מפוחדת",
      bark: "נביחה",
      tired: "עייף",
      hugged: "חיבקה",
      safe: "בטוח",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "What color is Max?", options: ["Black", "Brown", "White", "Gray"], correctAnswer: "Brown", explanation: "The story says: 'Lily has a small brown dog.'" },
      { id: "q2", type: "true-false", question: "Max stopped running when Lily called him.", options: ["True", "False"], correctAnswer: "False", explanation: "The text says 'But Max did not stop.'" },
      { id: "q3", type: "multiple-choice", question: "Why did Max run away?", options: ["He saw a cat", "He was scared", "He wanted food", "He was lost"], correctAnswer: "He saw a cat", explanation: "'One day, Max saw a cat. He ran very fast after the cat.'" },
      { id: "q4", type: "short-answer", question: "How did Lily feel when Max was gone?", correctAnswer: "scared", explanation: "The text says 'She was scared.'" },
      { id: "q5", type: "context-meaning", question: "What does 'hugged' mean in this story?", options: ["Yelled at", "Held closely with arms", "Fed", "Washed"], correctAnswer: "Held closely with arms", explanation: "'Lily hugged Max' means she held him closely to show love." },
    ],
  },
  {
    id: "g4-story-birthday",
    title: "Noa's Birthday Surprise",
    titleHe: "יום ההולדת המפתיע של נועה",
    grade: "grade4",
    emoji: "🎂",
    level: 2,
    text:
      "Today is Noa's birthday. She is nine years old. Her mom baked a big chocolate cake with pink flowers on top.\n\n" +
      "In the afternoon, Noa's friends came to her house. They brought presents and balloons. Everyone sang \"Happy Birthday\" together.\n\n" +
      "Noa opened her presents one by one. She got a new bicycle from her parents! She was so excited that she jumped up and down.\n\n" +
      "After the party, Noa said, \"This was the best birthday ever. Thank you, everyone!\" Her friends smiled and hugged her before they went home.",
    glossary: {
      baked: "אפתה",
      presents: "מתנות",
      balloons: "בלונים",
      bicycle: "אופניים",
      excited: "נרגשת",
      party: "מסיבה",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "How old is Noa?", options: ["Seven", "Eight", "Nine", "Ten"], correctAnswer: "Nine", explanation: "'She is nine years old.'" },
      { id: "q2", type: "true-false", question: "Noa's mom baked a vanilla cake.", options: ["True", "False"], correctAnswer: "False", explanation: "It says 'a big chocolate cake'." },
      { id: "q3", type: "multiple-choice", question: "What present made Noa most excited?", options: ["Balloons", "A book", "A bicycle", "A cake"], correctAnswer: "A bicycle", explanation: "'She got a new bicycle from her parents! She was so excited...'" },
      { id: "q4", type: "short-answer", question: "What did Noa's friends do before going home?", correctAnswer: "hugged her", explanation: "'Her friends smiled and hugged her before they went home.'" },
    ],
  },
  {
    id: "g4-story-rainy-day",
    title: "A Rainy Day Plan",
    titleHe: "תוכנית ליום גשום",
    grade: "grade4",
    emoji: "🌧️",
    level: 1,
    text:
      "It was raining outside, so Dan and his sister Maya could not play in the yard. \"What can we do now?\" asked Maya.\n\n" +
      "Dan had an idea. \"Let's build a fort with pillows and blankets!\" They moved the sofa cushions and made a cozy little house in the living room.\n\n" +
      "Inside the fort, they read comic books and ate popcorn. Maya said, \"Rainy days can be fun too!\" Dan agreed and laughed.",
    glossary: {
      raining: "יורד גשם",
      yard: "חצר",
      fort: "מבצר",
      pillows: "כריות",
      blankets: "שמיכות",
      cozy: "נעים וחמים",
      popcorn: "פופקורן",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "Why couldn't Dan and Maya play outside?", options: ["It was cold", "It was raining", "It was too late", "They were tired"], correctAnswer: "It was raining", explanation: "'It was raining outside, so...they could not play in the yard.'" },
      { id: "q2", type: "true-false", question: "They built a fort with pillows and blankets.", options: ["True", "False"], correctAnswer: "True", explanation: "'Let's build a fort with pillows and blankets!'" },
      { id: "q3", type: "short-answer", question: "What did they eat inside the fort?", correctAnswer: "popcorn", explanation: "'they read comic books and ate popcorn.'" },
    ],
  },
  {
    id: "g7-story-robot-club",
    title: "The Robotics Club Challenge",
    titleHe: "האתגר של מועדון הרובוטיקה",
    grade: "grade7",
    emoji: "🤖",
    level: 2,
    text:
      "When Yonatan joined the robotics club, he wasn't sure he had the right skills. Most of the other students had already built simple robots at home, while he had never even used a screwdriver.\n\n" +
      "During the first month, Yonatan struggled to keep up. His team's robot kept failing during practice runs, and he began to wonder if he should quit. However, his teammate Dana convinced him to stay. \"Everyone struggles at first,\" she said. \"The important thing is that we keep learning from our mistakes.\"\n\n" +
      "Slowly, Yonatan discovered that he was actually talented at solving problems under pressure. When the robot's arm got stuck during a competition, he was the one who figured out a quick fix using spare parts.\n\n" +
      "By the end of the year, Yonatan's team had won second place at the regional competition. More importantly, he had learned that being new at something doesn't mean you can't eventually become one of the best.",
    glossary: {
      skills: "כישורים",
      screwdriver: "מברג",
      struggled: "התמודד בקשיים",
      convinced: "שכנעה",
      talented: "מוכשר",
      pressure: "לחץ",
      regional: "אזורי",
      competition: "תחרות",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "How did Yonatan feel when he first joined the club?", options: ["Confident", "Unsure of his skills", "Bored", "Angry"], correctAnswer: "Unsure of his skills", explanation: "'he wasn't sure he had the right skills.'" },
      { id: "q2", type: "true-false", question: "Yonatan quit the robotics club after struggling.", options: ["True", "False"], correctAnswer: "False", explanation: "Dana convinced him to stay, and he later succeeded." },
      { id: "q3", type: "multiple-choice", question: "What skill did Yonatan discover he had?", options: ["Drawing", "Solving problems under pressure", "Public speaking", "Cooking"], correctAnswer: "Solving problems under pressure", explanation: "'he was actually talented at solving problems under pressure.'" },
      { id: "q4", type: "short-answer", question: "Why do you think Dana's advice helped Yonatan? (opinion)", correctAnswer: "open", explanation: "This is an opinion question - there is no single correct answer, but a good answer explains how encouragement can build confidence." },
      { id: "q5", type: "context-meaning", question: "In the story, what does 'struggled to keep up' mean?", options: ["Enjoyed the activity", "Found it hard to stay at the same level as others", "Won every competition", "Left the club immediately"], correctAnswer: "Found it hard to stay at the same level as others", explanation: "It means he had difficulty matching the pace/skill of his teammates." },
    ],
  },
  {
    id: "g7-story-social-media",
    title: "A Week Without Social Media",
    titleHe: "שבוע בלי רשתות חברתיות",
    grade: "grade7",
    emoji: "📵",
    level: 3,
    text:
      "For a school project, Tamar's class was challenged to spend one full week without using any social media. At first, Tamar thought it would be nearly impossible. She checked her phone constantly and felt anxious whenever she couldn't see her notifications.\n\n" +
      "By the third day, something unexpected happened: Tamar realized she had much more free time than she thought. Instead of scrolling through her feed before bed, she started reading a novel she had ignored for months. She also noticed she was paying more attention during conversations with her family, since she wasn't distracted by her phone.\n\n" +
      "Not everything about the challenge was positive, though. Tamar missed being able to instantly share funny moments with her friends, and she felt slightly out of the loop about weekend plans that were organized in a group chat.\n\n" +
      "When the week ended, Tamar decided not to delete her accounts, but she did set a daily time limit for herself. \"I don't think social media is bad,\" she explained to her class, \"but I learned that I want to control it, instead of letting it control me.\"",
    glossary: {
      challenged: "התמודדה עם אתגר",
      anxious: "חרדה / מתוחה",
      notifications: "התראות",
      novel: "רומן (ספר)",
      distracted: "מוסחת דעת",
      "out of the loop": "לא מעורה / לא מעודכנת",
      "time limit": "הגבלת זמן",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "How did Tamar feel at the start of the challenge?", options: ["Relaxed", "Anxious", "Excited", "Bored"], correctAnswer: "Anxious", explanation: "'she felt anxious whenever she couldn't see her notifications.'" },
      { id: "q2", type: "true-false", question: "Tamar deleted her social media accounts at the end of the week.", options: ["True", "False"], correctAnswer: "False", explanation: "'Tamar decided not to delete her accounts, but she did set a daily time limit.'" },
      { id: "q3", type: "multiple-choice", question: "What is one negative part of the challenge for Tamar?", options: ["She read more books", "She missed sharing moments with friends instantly", "She slept better", "She got better grades"], correctAnswer: "She missed sharing moments with friends instantly", explanation: "'Tamar missed being able to instantly share funny moments with her friends.'" },
      { id: "q4", type: "short-answer", question: "In your opinion, is Tamar's final decision a good compromise? Why?", correctAnswer: "open", explanation: "Opinion question — look for a clear opinion supported by a reason from the text." },
      { id: "q5", type: "context-meaning", question: "What does 'out of the loop' mean in this context?", options: ["Very tired", "Not aware of what's happening in a group", "Extremely happy", "Angry at friends"], correctAnswer: "Not aware of what's happening in a group", explanation: "It's an idiom meaning you're missing information that others know." },
    ],
  },
  {
    id: "g7-story-part-time-job",
    title: "My First Part-Time Job",
    titleHe: "העבודה הראשונה שלי",
    grade: "grade7",
    emoji: "💼",
    level: 2,
    text:
      "Last summer, Ethan got his first part-time job at a local ice cream shop. He was nervous on his first day because he had never worked with customers before.\n\n" +
      "During his first week, Ethan made several mistakes. He mixed up orders and once gave a customer the wrong flavor completely. His manager didn't get angry, though. Instead, she calmly showed him how to double-check every order before handing it over.\n\n" +
      "As the weeks passed, Ethan became faster and more confident. He even started recommending flavor combinations to customers who couldn't decide. By the end of the summer, several regular customers asked for him specifically because he remembered their favorite orders.\n\n" +
      "Looking back, Ethan believes the job taught him more than just how to scoop ice cream. He learned patience, responsibility, and how satisfying it feels to genuinely help someone, even in a small way.",
    glossary: {
      nervous: "לחוץ / עצבני",
      customers: "לקוחות",
      mistakes: "טעויות",
      manager: "מנהלת",
      confident: "בטוח בעצמו",
      recommending: "ממליץ",
      responsibility: "אחריות",
      genuinely: "באמת",
    },
    questions: [
      { id: "q1", type: "multiple-choice", question: "Why was Ethan nervous on his first day?", options: ["He didn't like ice cream", "He had never worked with customers before", "He was late", "His manager was strict"], correctAnswer: "He had never worked with customers before", explanation: "'he had never worked with customers before.'" },
      { id: "q2", type: "true-false", question: "Ethan's manager got angry about his mistakes.", options: ["True", "False"], correctAnswer: "False", explanation: "'His manager didn't get angry, though.'" },
      { id: "q3", type: "multiple-choice", question: "What did Ethan learn from the job, according to the story?", options: ["Only how to scoop ice cream", "Patience, responsibility, and helping others", "How to manage a shop", "Nothing important"], correctAnswer: "Patience, responsibility, and helping others", explanation: "'he learned patience, responsibility, and how satisfying it feels to genuinely help someone.'" },
      { id: "q4", type: "short-answer", question: "How do you know Ethan improved over the summer? Give one example from the text.", correctAnswer: "open", explanation: "Look for evidence like regular customers asking for him or him recommending flavors confidently." },
    ],
  },
];

const GRADE3_STORIES: ReadingStory[] = [
  {
    id: "g3-story-my-dog",
    title: "My Dog",
    titleHe: "הכלב שלי",
    grade: "grade3",
    emoji: "🐶",
    level: 1,
    text:
      "This is my dog. His name is Rex. Rex is brown and white.\n\n" +
      "Rex likes to run in the park. Rex likes to eat. Rex is a good dog.\n\n" +
      "I love my dog.",
    glossary: { dog: "כלב", brown: "חום", park: "פארק", good: "טוב", love: "אוהב/ת" },
    questions: [
      { id: "q1", type: "multiple-choice", question: "What is the dog's name?", options: ["Max", "Rex", "Tom", "Sam"], correctAnswer: "Rex", explanation: "'His name is Rex.'" },
      { id: "q2", type: "true-false", question: "Rex is black.", options: ["True", "False"], correctAnswer: "False", explanation: "'Rex is brown and white.'" },
      { id: "q3", type: "multiple-choice", question: "Where does Rex like to run?", options: ["At home", "In the park", "At school", "In the car"], correctAnswer: "In the park", explanation: "'Rex likes to run in the park.'" },
    ],
  },
  {
    id: "g3-story-my-family",
    title: "My Family",
    titleHe: "המשפחה שלי",
    grade: "grade3",
    emoji: "👨‍👩‍👧",
    level: 1,
    text:
      "This is my family. I have a mom, a dad, and one sister.\n\n" +
      "My mom is nice. My dad is tall. My sister is little.\n\n" +
      "We are happy together.",
    glossary: { family: "משפחה", mom: "אמא", dad: "אבא", sister: "אחות", nice: "נחמד/ה", tall: "גבוה", little: "קטן/ה", happy: "שמח/ה" },
    questions: [
      { id: "q1", type: "multiple-choice", question: "How many sisters does the child have?", options: ["One", "Two", "Three", "None"], correctAnswer: "One", explanation: "'I have a mom, a dad, and one sister.'" },
      { id: "q2", type: "true-false", question: "Dad is little.", options: ["True", "False"], correctAnswer: "False", explanation: "'My dad is tall.'" },
      { id: "q3", type: "multiple-choice", question: "Is the family happy?", options: ["Yes", "No"], correctAnswer: "Yes", explanation: "'We are happy together.'" },
    ],
  },
  {
    id: "g3-story-red-ball",
    title: "The Red Ball",
    titleHe: "הכדור האדום",
    grade: "grade3",
    emoji: "🔴",
    level: 2,
    text:
      "Sam has a red ball. Sam likes to play with the ball.\n\n" +
      "\"Where is the ball?\" asks Sam. The ball is under the bed!\n\n" +
      "Sam is happy. Sam plays with the red ball.",
    glossary: { red: "אדום", ball: "כדור", play: "לשחק", under: "מתחת", bed: "מיטה", happy: "שמח/ה" },
    questions: [
      { id: "q1", type: "multiple-choice", question: "What color is the ball?", options: ["Blue", "Green", "Red", "Yellow"], correctAnswer: "Red", explanation: "'Sam has a red ball.'" },
      { id: "q2", type: "multiple-choice", question: "Where was the ball?", options: ["Under the bed", "In the bag", "On the table", "In the park"], correctAnswer: "Under the bed", explanation: "'The ball is under the bed!'" },
      { id: "q3", type: "true-false", question: "Sam is sad at the end.", options: ["True", "False"], correctAnswer: "False", explanation: "'Sam is happy.'" },
    ],
  },
];

const GRADE6_STORIES: ReadingStory[] = [
  {
    id: "g6-story-new-phone",
    title: "Saving Up for a New Phone",
    titleHe: "חוסכים לטלפון חדש",
    grade: "grade6",
    emoji: "📱",
    level: 2,
    text:
      "Adi really wanted a new phone, but her parents said she needed to save some of the money herself. At first, she thought it would take forever.\n\n" +
      "Adi started doing small jobs at home, like walking the neighbor's dog and helping her grandmother in the garden. Every week, she put the money into a jar on her desk.\n\n" +
      "After two months, Adi counted her money. She was surprised — she almost had enough! Her parents were proud of her and added the rest.\n\n" +
      "When Adi finally got her new phone, it felt even better because she knew she had worked for it.",
    glossary: { save: "לחסוך", forever: "לתמיד", neighbor: "שכן/ה", jar: "צנצנת", proud: "גאה", worked: "עבד/ה" },
    questions: [
      { id: "q1", type: "multiple-choice", question: "What did Adi's parents want her to do?", options: ["Buy the phone immediately", "Save some money herself", "Forget about the phone", "Ask a friend for money"], correctAnswer: "Save some money herself", explanation: "'her parents said she needed to save some of the money herself.'" },
      { id: "q2", type: "true-false", question: "Adi walked the neighbor's dog to earn money.", options: ["True", "False"], correctAnswer: "True", explanation: "'walking the neighbor's dog and helping her grandmother in the garden.'" },
      { id: "q3", type: "multiple-choice", question: "How did Adi feel when she counted the money?", options: ["Disappointed", "Surprised", "Angry", "Bored"], correctAnswer: "Surprised", explanation: "'she was surprised — she almost had enough!'" },
      { id: "q4", type: "short-answer", question: "Why did the phone feel even better to Adi?", correctAnswer: "open", explanation: "Because she had worked for it herself, not just received it." },
    ],
  },
  {
    id: "g6-story-camping-trip",
    title: "Our Camping Trip",
    titleHe: "טיול הקמפינג שלנו",
    grade: "grade6",
    emoji: "🏕️",
    level: 2,
    text:
      "Last weekend, my family went camping near a lake. We set up our tent and made a small fire when it got dark.\n\n" +
      "During the night, we heard strange noises outside the tent. My little brother was scared, but my dad said it was probably just a small animal looking for food.\n\n" +
      "In the morning, we went for a walk and saw beautiful birds and even a family of deer near the trees.\n\n" +
      "It wasn't a fancy trip, but it was one of the most fun weekends we've had together this year.",
    glossary: { camping: "קמפינג", tent: "אוהל", fire: "מדורה", noises: "רעשים", scared: "מפוחד/ת", deer: "צבי", fancy: "מפואר" },
    questions: [
      { id: "q1", type: "multiple-choice", question: "Where did the family go camping?", options: ["Near a lake", "In the desert", "At the beach", "In the city"], correctAnswer: "Near a lake", explanation: "'my family went camping near a lake.'" },
      { id: "q2", type: "true-false", question: "The narrator's brother wasn't scared at all.", options: ["True", "False"], correctAnswer: "False", explanation: "'My little brother was scared.'" },
      { id: "q3", type: "multiple-choice", question: "What did they see in the morning?", options: ["Birds and deer", "A lion", "A boat", "Nothing"], correctAnswer: "Birds and deer", explanation: "'we saw beautiful birds and even a family of deer.'" },
    ],
  },
];

export function storiesForGrade(grade: GradeLevel): ReadingStory[] {
  return [...GRADE3_STORIES, ...READING_STORIES, ...GRADE6_STORIES].filter((s) => s.grade === grade);
}

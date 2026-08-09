import type { GradeLevel, VocabularyWord } from "../../types/models";

// -------------------------------------------------------------------------
// Grade 4 vocabulary bank — everyday, concrete topics, basic words.
// -------------------------------------------------------------------------
const grade4Words: VocabularyWord[] = [
  // Family
  { id: "g4-family-mother", word: "mother", translationHe: "אמא", simpleDefinition: "Your female parent.", exampleSentence: "My mother makes great pancakes.", emoji: "👩", topic: "family", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-family-father", word: "father", translationHe: "אבא", simpleDefinition: "Your male parent.", exampleSentence: "My father plays soccer with me.", emoji: "👨", topic: "family", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-family-sister", word: "sister", translationHe: "אחות", simpleDefinition: "A girl who has the same parents as you.", exampleSentence: "My sister is older than me.", emoji: "👧", topic: "family", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-family-brother", word: "brother", translationHe: "אח", simpleDefinition: "A boy who has the same parents as you.", exampleSentence: "My brother likes video games.", emoji: "👦", topic: "family", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-family-grandma", word: "grandmother", translationHe: "סבתא", simpleDefinition: "Your mother's or father's mother.", exampleSentence: "My grandmother tells funny stories.", emoji: "👵", topic: "family", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-family-pet", word: "pet", translationHe: "חיית מחמד", simpleDefinition: "An animal you keep at home.", exampleSentence: "My pet sleeps on my bed.", emoji: "🐾", topic: "family", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  // School
  { id: "g4-school-teacher", word: "teacher", translationHe: "מורה", simpleDefinition: "A person who helps you learn.", exampleSentence: "Our teacher is very kind.", emoji: "👩‍🏫", topic: "school", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-school-pencil", word: "pencil", translationHe: "עיפרון", simpleDefinition: "A thing you use to write.", exampleSentence: "I need a new pencil.", emoji: "✏️", topic: "school", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-school-classroom", word: "classroom", translationHe: "כיתה", simpleDefinition: "The room where you learn.", exampleSentence: "Our classroom has 25 students.", emoji: "🏫", topic: "school", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-school-homework", word: "homework", translationHe: "שיעורי בית", simpleDefinition: "Work you do at home for school.", exampleSentence: "I finish my homework after lunch.", emoji: "📓", topic: "school", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-school-book", word: "book", translationHe: "ספר", simpleDefinition: "Pages with words you read.", exampleSentence: "This book is about dragons.", emoji: "📖", topic: "school", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-school-friend", word: "recess", translationHe: "הפסקה", simpleDefinition: "A short break to play at school.", exampleSentence: "We play tag at recess.", emoji: "🔔", topic: "school", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  // Food
  { id: "g4-food-apple", word: "apple", translationHe: "תפוח", simpleDefinition: "A round, sweet fruit.", exampleSentence: "I eat an apple every day.", emoji: "🍎", topic: "food", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-food-bread", word: "bread", translationHe: "לחם", simpleDefinition: "Food made from flour and baked.", exampleSentence: "We eat bread with breakfast.", emoji: "🍞", topic: "food", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-food-hungry", word: "hungry", translationHe: "רעב", simpleDefinition: "Wanting to eat food.", exampleSentence: "I am hungry after school.", emoji: "😋", topic: "food", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-food-vegetable", word: "vegetable", translationHe: "ירק", simpleDefinition: "A plant food like carrots or peas.", exampleSentence: "Carrots are my favorite vegetable.", emoji: "🥦", topic: "food", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-food-delicious", word: "delicious", translationHe: "טעים", simpleDefinition: "Tasting very good.", exampleSentence: "This soup is delicious!", emoji: "😍", topic: "food", grade: "grade4", difficulty: 2, partOfSpeech: "adjective" },
  { id: "g4-food-drink", word: "drink", translationHe: "לשתות", simpleDefinition: "To put liquid in your mouth and swallow.", exampleSentence: "I drink water every day.", emoji: "🥤", topic: "food", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  // Animals
  { id: "g4-animal-dog", word: "dog", translationHe: "כלב", simpleDefinition: "A common furry pet that barks.", exampleSentence: "My dog runs very fast.", emoji: "🐶", topic: "animals", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-animal-cat", word: "cat", translationHe: "חתול", simpleDefinition: "A small furry pet that says meow.", exampleSentence: "The cat is sleeping on the sofa.", emoji: "🐱", topic: "animals", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-animal-elephant", word: "elephant", translationHe: "פיל", simpleDefinition: "A huge grey animal with a long trunk.", exampleSentence: "The elephant is the biggest animal at the zoo.", emoji: "🐘", topic: "animals", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-animal-bird", word: "bird", translationHe: "ציפור", simpleDefinition: "An animal that can fly and sing.", exampleSentence: "A bird is singing in the tree.", emoji: "🐦", topic: "animals", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-animal-fish", word: "fish", translationHe: "דג", simpleDefinition: "An animal that lives and swims in water.", exampleSentence: "The fish swims in the tank.", emoji: "🐠", topic: "animals", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-animal-scared", word: "scared", translationHe: "מפוחד", simpleDefinition: "Feeling afraid of something.", exampleSentence: "I am scared of spiders.", emoji: "😨", topic: "animals", grade: "grade4", difficulty: 2, partOfSpeech: "adjective" },
  // Sports
  { id: "g4-sport-run", word: "run", translationHe: "לרוץ", simpleDefinition: "To move very fast on your legs.", exampleSentence: "I run in the park every morning.", emoji: "🏃", topic: "sports", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-sport-ball", word: "ball", translationHe: "כדור", simpleDefinition: "A round toy used in many games.", exampleSentence: "We kick the ball in the yard.", emoji: "⚽", topic: "sports", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-sport-win", word: "win", translationHe: "לנצח", simpleDefinition: "To be the best in a game or race.", exampleSentence: "Our team won the game!", emoji: "🏆", topic: "sports", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-sport-team", word: "team", translationHe: "קבוצה", simpleDefinition: "A group of people who play together.", exampleSentence: "I am on the school swim team.", emoji: "🤝", topic: "sports", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-sport-jump", word: "jump", translationHe: "לקפוץ", simpleDefinition: "To push yourself up into the air.", exampleSentence: "She can jump very high.", emoji: "🤸", topic: "sports", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-sport-practice", word: "practice", translationHe: "להתאמן", simpleDefinition: "To do something again and again to get better.", exampleSentence: "We practice basketball after school.", emoji: "🏀", topic: "sports", grade: "grade4", difficulty: 2, partOfSpeech: "verb" },
  // Hobbies
  { id: "g4-hobby-draw", word: "draw", translationHe: "לצייר", simpleDefinition: "To make a picture with a pencil.", exampleSentence: "I like to draw animals.", emoji: "🎨", topic: "hobbies", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-hobby-sing", word: "sing", translationHe: "לשיר", simpleDefinition: "To make music with your voice.", exampleSentence: "She loves to sing in the shower.", emoji: "🎤", topic: "hobbies", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-hobby-dance", word: "dance", translationHe: "לרקוד", simpleDefinition: "To move your body to music.", exampleSentence: "We dance at every party.", emoji: "💃", topic: "hobbies", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-hobby-collect", word: "collect", translationHe: "לאסוף", simpleDefinition: "To gather many of the same thing.", exampleSentence: "I collect stickers from every country.", emoji: "🧩", topic: "hobbies", grade: "grade4", difficulty: 2, partOfSpeech: "verb" },
  { id: "g4-hobby-build", word: "build", translationHe: "לבנות", simpleDefinition: "To make something out of pieces.", exampleSentence: "He builds towers with blocks.", emoji: "🧱", topic: "hobbies", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-hobby-favorite", word: "favorite", translationHe: "מועדף", simpleDefinition: "The one you like best.", exampleSentence: "Drawing is my favorite hobby.", emoji: "⭐", topic: "hobbies", grade: "grade4", difficulty: 2, partOfSpeech: "adjective" },
  // Home
  { id: "g4-home-kitchen", word: "kitchen", translationHe: "מטבח", simpleDefinition: "The room where you cook food.", exampleSentence: "Mom is cooking in the kitchen.", emoji: "🍳", topic: "home", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-home-bedroom", word: "bedroom", translationHe: "חדר שינה", simpleDefinition: "The room where you sleep.", exampleSentence: "My bedroom is blue and yellow.", emoji: "🛏️", topic: "home", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-home-window", word: "window", translationHe: "חלון", simpleDefinition: "A glass opening you can see through.", exampleSentence: "I can see the garden from my window.", emoji: "🪟", topic: "home", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-home-clean", word: "clean", translationHe: "לנקות / נקי", simpleDefinition: "Not dirty, or to remove dirt.", exampleSentence: "I clean my room every Friday.", emoji: "🧹", topic: "home", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-home-garden", word: "garden", translationHe: "גינה", simpleDefinition: "An outside area with plants and flowers.", exampleSentence: "We grow tomatoes in our garden.", emoji: "🌷", topic: "home", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-home-stairs", word: "stairs", translationHe: "מדרגות", simpleDefinition: "Steps you use to go up or down.", exampleSentence: "I run up the stairs quickly.", emoji: "🪜", topic: "home", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  // Weather
  { id: "g4-weather-sunny", word: "sunny", translationHe: "שמשי", simpleDefinition: "When the sun is shining brightly.", exampleSentence: "It is sunny and warm today.", emoji: "☀️", topic: "weather", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-weather-rainy", word: "rainy", translationHe: "גשום", simpleDefinition: "When rain is falling.", exampleSentence: "I bring an umbrella on rainy days.", emoji: "🌧️", topic: "weather", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-weather-cold", word: "cold", translationHe: "קר", simpleDefinition: "Having a low temperature.", exampleSentence: "It is very cold in winter.", emoji: "❄️", topic: "weather", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-weather-hot", word: "hot", translationHe: "חם", simpleDefinition: "Having a high temperature.", exampleSentence: "Summer days are hot in Israel.", emoji: "🥵", topic: "weather", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-weather-wind", word: "wind", translationHe: "רוח", simpleDefinition: "Air that moves outside.", exampleSentence: "The wind is blowing the leaves.", emoji: "🍃", topic: "weather", grade: "grade4", difficulty: 2, partOfSpeech: "noun" },
  { id: "g4-weather-cloud", word: "cloud", translationHe: "עננה", simpleDefinition: "A white or grey shape in the sky.", exampleSentence: "That cloud looks like a rabbit.", emoji: "☁️", topic: "weather", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  // Friends
  { id: "g4-friend-share", word: "share", translationHe: "לחלוק", simpleDefinition: "To let someone use or have part of your thing.", exampleSentence: "I share my snacks with my friend.", emoji: "🤗", topic: "friends", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-friend-kind", word: "kind", translationHe: "נחמד", simpleDefinition: "Friendly and caring to others.", exampleSentence: "She is very kind to new students.", emoji: "💛", topic: "friends", grade: "grade4", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g4-friend-play", word: "play", translationHe: "לשחק", simpleDefinition: "To have fun with games or toys.", exampleSentence: "We play together every afternoon.", emoji: "🧸", topic: "friends", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-friend-invite", word: "invite", translationHe: "להזמין", simpleDefinition: "To ask someone to come with you.", exampleSentence: "I invite my friends to my birthday party.", emoji: "🎉", topic: "friends", grade: "grade4", difficulty: 2, partOfSpeech: "verb" },
  { id: "g4-friend-help", word: "help", translationHe: "לעזור", simpleDefinition: "To make something easier for someone.", exampleSentence: "Friends help each other with homework.", emoji: "🙌", topic: "friends", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-friend-laugh", word: "laugh", translationHe: "לצחוק", simpleDefinition: "To make sounds when something is funny.", exampleSentence: "We laugh a lot at recess.", emoji: "😂", topic: "friends", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  // Daily routine
  { id: "g4-routine-wake", word: "wake up", translationHe: "להתעורר", simpleDefinition: "To stop sleeping.", exampleSentence: "I wake up at seven o'clock.", emoji: "⏰", topic: "dailyRoutine", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-routine-brush", word: "brush teeth", translationHe: "לצחצח שיניים", simpleDefinition: "To clean your teeth with a brush.", exampleSentence: "I brush my teeth after breakfast.", emoji: "🪥", topic: "dailyRoutine", grade: "grade4", difficulty: 2, partOfSpeech: "verb" },
  { id: "g4-routine-shower", word: "take a shower", translationHe: "להתקלח", simpleDefinition: "To wash your body with water.", exampleSentence: "I take a shower every evening.", emoji: "🚿", topic: "dailyRoutine", grade: "grade4", difficulty: 2, partOfSpeech: "verb" },
  { id: "g4-routine-bed", word: "go to bed", translationHe: "ללכת לישון", simpleDefinition: "To go to sleep.", exampleSentence: "I go to bed at nine o'clock.", emoji: "🌙", topic: "dailyRoutine", grade: "grade4", difficulty: 1, partOfSpeech: "verb" },
  { id: "g4-routine-breakfast", word: "breakfast", translationHe: "ארוחת בוקר", simpleDefinition: "The first meal of the day.", exampleSentence: "I eat cereal for breakfast.", emoji: "🥣", topic: "dailyRoutine", grade: "grade4", difficulty: 1, partOfSpeech: "noun" },
  { id: "g4-routine-schedule", word: "every day", translationHe: "כל יום", simpleDefinition: "Happening each day, without missing one.", exampleSentence: "I read a book every day.", emoji: "📅", topic: "dailyRoutine", grade: "grade4", difficulty: 2, partOfSpeech: "adverb" },
];

// -------------------------------------------------------------------------
// Grade 7 vocabulary bank — abstract and contextual words, teen topics.
// -------------------------------------------------------------------------
const grade7Words: VocabularyWord[] = [
  // Technology
  { id: "g7-tech-device", word: "device", translationHe: "מכשיר", simpleDefinition: "A piece of equipment made for a purpose, like a phone.", exampleSentence: "This device can track your daily steps.", emoji: "📱", topic: "technology", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  { id: "g7-tech-download", word: "download", translationHe: "להוריד", simpleDefinition: "To copy data from the internet to your device.", exampleSentence: "I downloaded a new app for editing videos.", emoji: "⬇️", topic: "technology", grade: "grade7", difficulty: 2, partOfSpeech: "verb" },
  { id: "g7-tech-innovative", word: "innovative", translationHe: "חדשני", simpleDefinition: "Using new ideas or methods.", exampleSentence: "The company released an innovative gadget this year.", emoji: "💡", topic: "technology", grade: "grade7", difficulty: 4, partOfSpeech: "adjective" },
  { id: "g7-tech-artificial", word: "artificial intelligence", translationHe: "בינה מלאכותית", simpleDefinition: "Computer systems that can perform tasks that normally need human thinking.", exampleSentence: "Artificial intelligence can help you learn new languages.", emoji: "🤖", topic: "technology", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  { id: "g7-tech-privacy", word: "privacy", translationHe: "פרטיות", simpleDefinition: "The right to keep your personal information secret.", exampleSentence: "You should protect your privacy online.", emoji: "🔒", topic: "technology", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-tech-update", word: "update", translationHe: "עדכון", simpleDefinition: "A new version of software with improvements.", exampleSentence: "My phone needs a software update.", emoji: "🔄", topic: "technology", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  // Travel
  { id: "g7-travel-destination", word: "destination", translationHe: "יעד", simpleDefinition: "The place you are traveling to.", exampleSentence: "Our final destination was a small island in Greece.", emoji: "🗺️", topic: "travel", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-travel-luggage", word: "luggage", translationHe: "מזוודות", simpleDefinition: "The bags and suitcases you take when traveling.", exampleSentence: "We packed our luggage the night before the flight.", emoji: "🧳", topic: "travel", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-travel-abroad", word: "abroad", translationHe: "בחו״ל", simpleDefinition: "In or to a foreign country.", exampleSentence: "She wants to study abroad next year.", emoji: "✈️", topic: "travel", grade: "grade7", difficulty: 3, partOfSpeech: "adverb" },
  { id: "g7-travel-culture", word: "culture", translationHe: "תרבות", simpleDefinition: "The customs, art, and way of life of a group of people.", exampleSentence: "I love learning about different cultures when I travel.", emoji: "🎭", topic: "travel", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-travel-adventure", word: "adventure", translationHe: "הרפתקה", simpleDefinition: "An exciting or dangerous experience.", exampleSentence: "Hiking in the mountains was a real adventure.", emoji: "🏔️", topic: "travel", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-travel-itinerary", word: "itinerary", translationHe: "מסלול טיול", simpleDefinition: "A planned route or schedule for a trip.", exampleSentence: "Our itinerary includes three cities in one week.", emoji: "📋", topic: "travel", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  // School life
  { id: "g7-school-assignment", word: "assignment", translationHe: "מטלה", simpleDefinition: "A piece of work given to a student.", exampleSentence: "I need to finish my history assignment tonight.", emoji: "📝", topic: "schoolLife", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-school-deadline", word: "deadline", translationHe: "מועד אחרון", simpleDefinition: "The latest time by which something must be finished.", exampleSentence: "The deadline for the project is Friday.", emoji: "⏳", topic: "schoolLife", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-school-classmate", word: "classmate", translationHe: "חבר לכיתה", simpleDefinition: "A student who is in the same class as you.", exampleSentence: "My classmate helped me understand the math problem.", emoji: "🧑‍🤝‍🧑", topic: "schoolLife", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  { id: "g7-school-focus", word: "focus", translationHe: "להתמקד", simpleDefinition: "To give all your attention to one thing.", exampleSentence: "It's hard to focus with so much noise.", emoji: "🎯", topic: "schoolLife", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-school-achieve", word: "achieve", translationHe: "להשיג", simpleDefinition: "To successfully complete or reach a goal.", exampleSentence: "She worked hard to achieve a good grade.", emoji: "🏅", topic: "schoolLife", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-school-curriculum", word: "curriculum", translationHe: "תוכנית לימודים", simpleDefinition: "The subjects taught in a school.", exampleSentence: "Our new curriculum includes more coding classes.", emoji: "📚", topic: "schoolLife", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  // Social situations
  { id: "g7-social-awkward", word: "awkward", translationHe: "מביך / לא נעים", simpleDefinition: "Embarrassing or uncomfortable.", exampleSentence: "It was awkward when I forgot his name.", emoji: "😳", topic: "socialSituations", grade: "grade7", difficulty: 4, partOfSpeech: "adjective" },
  { id: "g7-social-apologize", word: "apologize", translationHe: "להתנצל", simpleDefinition: "To say you are sorry.", exampleSentence: "I apologized for being late to the meeting.", emoji: "🙏", topic: "socialSituations", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-social-peer-pressure", word: "peer pressure", translationHe: "לחץ חברתי", simpleDefinition: "The influence from people your age to act a certain way.", exampleSentence: "It's not easy to say no to peer pressure.", emoji: "👥", topic: "socialSituations", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  { id: "g7-social-confident", word: "confident", translationHe: "בטוח בעצמו", simpleDefinition: "Feeling sure about your own abilities.", exampleSentence: "She felt confident before the presentation.", emoji: "💪", topic: "socialSituations", grade: "grade7", difficulty: 3, partOfSpeech: "adjective" },
  { id: "g7-social-disagree", word: "disagree", translationHe: "לא להסכים", simpleDefinition: "To have a different opinion.", exampleSentence: "I disagree with my friend about the best movie.", emoji: "🤷", topic: "socialSituations", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-social-compromise", word: "compromise", translationHe: "פשרה", simpleDefinition: "An agreement where each side gives up something.", exampleSentence: "We reached a compromise about which game to play.", emoji: "🤝", topic: "socialSituations", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  // Sports
  { id: "g7-sport-opponent", word: "opponent", translationHe: "יריב", simpleDefinition: "The person or team you compete against.", exampleSentence: "Our opponent scored in the last minute.", emoji: "🥊", topic: "sports", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-sport-champion", word: "champion", translationHe: "אלוף", simpleDefinition: "The winner of a competition.", exampleSentence: "She became the champion of the tournament.", emoji: "🏆", topic: "sports", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  { id: "g7-sport-endurance", word: "endurance", translationHe: "סבולת", simpleDefinition: "The ability to keep doing something difficult for a long time.", exampleSentence: "Marathon runners need great endurance.", emoji: "🏃‍♂️", topic: "sports", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  { id: "g7-sport-injury", word: "injury", translationHe: "פציעה", simpleDefinition: "Damage done to a part of your body.", exampleSentence: "He got an injury during the game.", emoji: "🤕", topic: "sports", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-sport-strategy", word: "strategy", translationHe: "אסטרטגיה", simpleDefinition: "A plan for achieving success.", exampleSentence: "The coach explained the team's strategy.", emoji: "♟️", topic: "sports", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-sport-teammate", word: "teammate", translationHe: "חבר לקבוצה", simpleDefinition: "A person who plays on the same team as you.", exampleSentence: "My teammate passed me the ball.", emoji: "🙌", topic: "sports", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  // Music
  { id: "g7-music-lyrics", word: "lyrics", translationHe: "מילות שיר", simpleDefinition: "The words of a song.", exampleSentence: "I don't know all the lyrics to that song yet.", emoji: "🎶", topic: "music", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-music-genre", word: "genre", translationHe: "סוגה / סטייל", simpleDefinition: "A category of music, film, or art.", exampleSentence: "Pop is my favorite music genre.", emoji: "🎧", topic: "music", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-music-rhythm", word: "rhythm", translationHe: "קצב", simpleDefinition: "A regular pattern of sound in music.", exampleSentence: "This song has an amazing rhythm.", emoji: "🥁", topic: "music", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-music-perform", word: "perform", translationHe: "להופיע", simpleDefinition: "To play music or act in front of people.", exampleSentence: "The band will perform at the school festival.", emoji: "🎤", topic: "music", grade: "grade7", difficulty: 2, partOfSpeech: "verb" },
  { id: "g7-music-talented", word: "talented", translationHe: "מוכשר", simpleDefinition: "Having a natural skill at something.", exampleSentence: "She is a talented piano player.", emoji: "🌟", topic: "music", grade: "grade7", difficulty: 3, partOfSpeech: "adjective" },
  { id: "g7-music-audience", word: "audience", translationHe: "קהל", simpleDefinition: "The group of people watching or listening.", exampleSentence: "The audience clapped loudly after the song.", emoji: "👏", topic: "music", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  // Movies
  { id: "g7-movie-plot", word: "plot", translationHe: "עלילה", simpleDefinition: "The main events of a story.", exampleSentence: "The plot of the movie was full of surprises.", emoji: "🎬", topic: "movies", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-movie-character", word: "character", translationHe: "דמות", simpleDefinition: "A person in a story, movie, or game.", exampleSentence: "My favorite character is the brave detective.", emoji: "🦸", topic: "movies", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  { id: "g7-movie-sequel", word: "sequel", translationHe: "סרט המשך", simpleDefinition: "A movie that continues the story of an earlier one.", exampleSentence: "The sequel was even better than the first movie.", emoji: "🎞️", topic: "movies", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-movie-review", word: "review", translationHe: "ביקורת", simpleDefinition: "A written opinion about a movie, book, or product.", exampleSentence: "I read a review before watching the film.", emoji: "⭐", topic: "movies", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-movie-recommend", word: "recommend", translationHe: "להמליץ", simpleDefinition: "To suggest that someone try something good.", exampleSentence: "I recommend this movie to everyone.", emoji: "👍", topic: "movies", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-movie-suspense", word: "suspense", translationHe: "מתח", simpleDefinition: "A feeling of excitement about what will happen next.", exampleSentence: "The movie kept me in suspense until the end.", emoji: "😬", topic: "movies", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  // Science
  { id: "g7-science-experiment", word: "experiment", translationHe: "ניסוי", simpleDefinition: "A scientific test to find out something.", exampleSentence: "We did an experiment with plants in class.", emoji: "🧪", topic: "science", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-science-hypothesis", word: "hypothesis", translationHe: "השערה", simpleDefinition: "An idea you test to see if it's true.", exampleSentence: "Our hypothesis was that plants grow faster with music.", emoji: "🔬", topic: "science", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  { id: "g7-science-discover", word: "discover", translationHe: "לגלות", simpleDefinition: "To find something new.", exampleSentence: "Scientists discovered a new type of frog.", emoji: "🔎", topic: "science", grade: "grade7", difficulty: 3, partOfSpeech: "verb" },
  { id: "g7-science-environment", word: "environment", translationHe: "סביבה", simpleDefinition: "The natural world around us.", exampleSentence: "We should protect the environment.", emoji: "🌍", topic: "science", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-science-energy", word: "energy", translationHe: "אנרגיה", simpleDefinition: "The power needed to do things or make things work.", exampleSentence: "Solar panels create clean energy.", emoji: "⚡", topic: "science", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-science-species", word: "species", translationHe: "מין (ביולוגי)", simpleDefinition: "A group of similar living things.", exampleSentence: "This species of bird only lives in Israel.", emoji: "🦋", topic: "science", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  // Gaming
  { id: "g7-gaming-level-up", word: "level up", translationHe: "לעלות שלב", simpleDefinition: "To reach a higher level in a game.", exampleSentence: "I leveled up three times this weekend.", emoji: "🎮", topic: "gaming", grade: "grade7", difficulty: 2, partOfSpeech: "verb" },
  { id: "g7-gaming-strategy-game", word: "multiplayer", translationHe: "מרובה משתתפים", simpleDefinition: "A game that many people can play together online.", exampleSentence: "This is a multiplayer game with friends.", emoji: "🕹️", topic: "gaming", grade: "grade7", difficulty: 3, partOfSpeech: "adjective" },
  { id: "g7-gaming-achievement", word: "achievement", translationHe: "הישג", simpleDefinition: "A special reward for completing a task in a game.", exampleSentence: "I unlocked a rare achievement in the game.", emoji: "🏅", topic: "gaming", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-gaming-glitch", word: "glitch", translationHe: "תקלה קטנה", simpleDefinition: "A small error in a game or program.", exampleSentence: "There was a glitch that let me walk through walls.", emoji: "🐛", topic: "gaming", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-gaming-competitive", word: "competitive", translationHe: "תחרותי", simpleDefinition: "Wanting to win or be the best.", exampleSentence: "He is very competitive when we play chess.", emoji: "🔥", topic: "gaming", grade: "grade7", difficulty: 3, partOfSpeech: "adjective" },
  { id: "g7-gaming-strategy2", word: "strategy game", translationHe: "משחק אסטרטגיה", simpleDefinition: "A game that needs careful planning to win.", exampleSentence: "Chess is a classic strategy game.", emoji: "♟️", topic: "gaming", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  // Future plans
  { id: "g7-future-career", word: "career", translationHe: "קריירה", simpleDefinition: "The job or work you do for most of your life.", exampleSentence: "She dreams of a career in medicine.", emoji: "💼", topic: "futurePlans", grade: "grade7", difficulty: 3, partOfSpeech: "noun" },
  { id: "g7-future-goal", word: "goal", translationHe: "מטרה", simpleDefinition: "Something you plan to achieve.", exampleSentence: "My goal is to learn three languages.", emoji: "🎯", topic: "futurePlans", grade: "grade7", difficulty: 2, partOfSpeech: "noun" },
  { id: "g7-future-opportunity", word: "opportunity", translationHe: "הזדמנות", simpleDefinition: "A chance to do something good.", exampleSentence: "Studying abroad is a great opportunity.", emoji: "🚪", topic: "futurePlans", grade: "grade7", difficulty: 4, partOfSpeech: "noun" },
  { id: "g7-future-decide", word: "decide", translationHe: "להחליט", simpleDefinition: "To choose something after thinking about it.", exampleSentence: "I haven't decided what to study yet.", emoji: "🤔", topic: "futurePlans", grade: "grade7", difficulty: 2, partOfSpeech: "verb" },
  { id: "g7-future-ambitious", word: "ambitious", translationHe: "שאפתן", simpleDefinition: "Having a strong wish to succeed.", exampleSentence: "He is ambitious about becoming a scientist.", emoji: "🚀", topic: "futurePlans", grade: "grade7", difficulty: 4, partOfSpeech: "adjective" },
  { id: "g7-future-independent", word: "independent", translationHe: "עצמאי", simpleDefinition: "Able to do things by yourself.", exampleSentence: "I want to be more independent as I grow up.", emoji: "🦋", topic: "futurePlans", grade: "grade7", difficulty: 4, partOfSpeech: "adjective" },
];

// -------------------------------------------------------------------------
// Grade 3 vocabulary bank — the most basic words, very concrete, high
// visual/emoji support. Sentences built from these words stay 3-5 words.
// -------------------------------------------------------------------------
const grade3Words: VocabularyWord[] = [
  // Colors
  { id: "g3-color-red", word: "red", translationHe: "אדום", simpleDefinition: "The color of an apple.", exampleSentence: "I have a red ball.", emoji: "🔴", topic: "colors", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g3-color-blue", word: "blue", translationHe: "כחול", simpleDefinition: "The color of the sky.", exampleSentence: "The sky is blue.", emoji: "🔵", topic: "colors", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g3-color-green", word: "green", translationHe: "ירוק", simpleDefinition: "The color of grass.", exampleSentence: "I like green apples.", emoji: "🟢", topic: "colors", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g3-color-yellow", word: "yellow", translationHe: "צהוב", simpleDefinition: "The color of the sun.", exampleSentence: "The sun is yellow.", emoji: "🟡", topic: "colors", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g3-color-black", word: "black", translationHe: "שחור", simpleDefinition: "A very dark color.", exampleSentence: "My cat is black.", emoji: "⚫", topic: "colors", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  // Numbers
  { id: "g3-num-one", word: "one", translationHe: "אחת", simpleDefinition: "The number 1.", exampleSentence: "I have one brother.", emoji: "1️⃣", topic: "numbers", grade: "grade3", difficulty: 1, partOfSpeech: "number" },
  { id: "g3-num-two", word: "two", translationHe: "שתיים", simpleDefinition: "The number 2.", exampleSentence: "I have two hands.", emoji: "2️⃣", topic: "numbers", grade: "grade3", difficulty: 1, partOfSpeech: "number" },
  { id: "g3-num-three", word: "three", translationHe: "שלוש", simpleDefinition: "The number 3.", exampleSentence: "I see three birds.", emoji: "3️⃣", topic: "numbers", grade: "grade3", difficulty: 1, partOfSpeech: "number" },
  { id: "g3-num-five", word: "five", translationHe: "חמש", simpleDefinition: "The number 5.", exampleSentence: "I have five fingers.", emoji: "5️⃣", topic: "numbers", grade: "grade3", difficulty: 1, partOfSpeech: "number" },
  { id: "g3-num-ten", word: "ten", translationHe: "עשר", simpleDefinition: "The number 10.", exampleSentence: "I can count to ten.", emoji: "🔟", topic: "numbers", grade: "grade3", difficulty: 2, partOfSpeech: "number" },
  // Family (very basic)
  { id: "g3-family-mom", word: "mom", translationHe: "אמא", simpleDefinition: "Your mother.", exampleSentence: "This is my mom.", emoji: "👩", topic: "family", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-family-dad", word: "dad", translationHe: "אבא", simpleDefinition: "Your father.", exampleSentence: "My dad is tall.", emoji: "👨", topic: "family", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-family-baby", word: "baby", translationHe: "תינוק", simpleDefinition: "A very young child.", exampleSentence: "The baby is sleeping.", emoji: "👶", topic: "family", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-family-friend", word: "friend", translationHe: "חבר/ה", simpleDefinition: "A person you like and play with.", exampleSentence: "She is my best friend.", emoji: "🧑‍🤝‍🧑", topic: "family", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  // Animals
  { id: "g3-animal-dog", word: "dog", translationHe: "כלב", simpleDefinition: "A pet that barks.", exampleSentence: "I have a dog.", emoji: "🐶", topic: "animals", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-animal-cat", word: "cat", translationHe: "חתול", simpleDefinition: "A pet that says meow.", exampleSentence: "The cat is small.", emoji: "🐱", topic: "animals", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-animal-bird", word: "bird", translationHe: "ציפור", simpleDefinition: "An animal that flies.", exampleSentence: "The bird can fly.", emoji: "🐦", topic: "animals", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-animal-fish", word: "fish", translationHe: "דג", simpleDefinition: "An animal that swims.", exampleSentence: "The fish is orange.", emoji: "🐠", topic: "animals", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  // Food
  { id: "g3-food-pizza", word: "pizza", translationHe: "פיצה", simpleDefinition: "A round food with cheese.", exampleSentence: "I like pizza.", emoji: "🍕", topic: "food", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-food-milk", word: "milk", translationHe: "חלב", simpleDefinition: "A white drink.", exampleSentence: "I drink milk.", emoji: "🥛", topic: "food", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-food-banana", word: "banana", translationHe: "בננה", simpleDefinition: "A yellow fruit.", exampleSentence: "I eat a banana.", emoji: "🍌", topic: "food", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-food-cookie", word: "cookie", translationHe: "עוגייה", simpleDefinition: "A sweet round snack.", exampleSentence: "I want a cookie.", emoji: "🍪", topic: "food", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  // Home
  { id: "g3-home-house", word: "house", translationHe: "בית", simpleDefinition: "The place where you live.", exampleSentence: "This is my house.", emoji: "🏠", topic: "home", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-home-door", word: "door", translationHe: "דלת", simpleDefinition: "You open it to go inside.", exampleSentence: "Open the door, please.", emoji: "🚪", topic: "home", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-home-bed", word: "bed", translationHe: "מיטה", simpleDefinition: "You sleep on it.", exampleSentence: "I sleep in my bed.", emoji: "🛏️", topic: "home", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-home-table", word: "table", translationHe: "שולחן", simpleDefinition: "You eat on it.", exampleSentence: "The food is on the table.", emoji: "🍽️", topic: "home", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  // School
  { id: "g3-school-bag", word: "bag", translationHe: "תיק", simpleDefinition: "You carry your books in it.", exampleSentence: "My bag is blue.", emoji: "🎒", topic: "school", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-school-teacher", word: "teacher", translationHe: "מורה", simpleDefinition: "A person who helps you learn.", exampleSentence: "My teacher is nice.", emoji: "👩‍🏫", topic: "school", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-school-book", word: "book", translationHe: "ספר", simpleDefinition: "You read it.", exampleSentence: "I read a book.", emoji: "📖", topic: "school", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-school-desk", word: "desk", translationHe: "שולחן כתיבה", simpleDefinition: "You sit here and write.", exampleSentence: "I sit at my desk.", emoji: "🪑", topic: "school", grade: "grade3", difficulty: 2, partOfSpeech: "noun" },
  // Clothes
  { id: "g3-clothes-shirt", word: "shirt", translationHe: "חולצה", simpleDefinition: "You wear it on your body.", exampleSentence: "I have a red shirt.", emoji: "👕", topic: "clothes", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-clothes-shoes", word: "shoes", translationHe: "נעליים", simpleDefinition: "You wear them on your feet.", exampleSentence: "My shoes are new.", emoji: "👟", topic: "clothes", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-clothes-hat", word: "hat", translationHe: "כובע", simpleDefinition: "You wear it on your head.", exampleSentence: "I like my hat.", emoji: "🧢", topic: "clothes", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-clothes-socks", word: "socks", translationHe: "גרביים", simpleDefinition: "You wear them under your shoes.", exampleSentence: "My socks are white.", emoji: "🧦", topic: "clothes", grade: "grade3", difficulty: 2, partOfSpeech: "noun" },
  // Body
  { id: "g3-body-hand", word: "hand", translationHe: "יד", simpleDefinition: "Part of your body with fingers.", exampleSentence: "I have two hands.", emoji: "✋", topic: "body", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-body-eye", word: "eyes", translationHe: "עיניים", simpleDefinition: "You see with them.", exampleSentence: "I have two eyes.", emoji: "👀", topic: "body", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-body-head", word: "head", translationHe: "ראש", simpleDefinition: "The top part of your body.", exampleSentence: "My hat is on my head.", emoji: "🗣️", topic: "body", grade: "grade3", difficulty: 2, partOfSpeech: "noun" },
  { id: "g3-body-legs", word: "legs", translationHe: "רגליים", simpleDefinition: "You walk with them.", exampleSentence: "I run with my legs.", emoji: "🦵", topic: "body", grade: "grade3", difficulty: 2, partOfSpeech: "noun" },
  // Weather
  { id: "g3-weather-sun", word: "sun", translationHe: "שמש", simpleDefinition: "It is bright in the sky.", exampleSentence: "The sun is hot.", emoji: "☀️", topic: "weather", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-weather-rain", word: "rain", translationHe: "גשם", simpleDefinition: "Water that falls from the sky.", exampleSentence: "I like the rain.", emoji: "🌧️", topic: "weather", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-weather-cold", word: "cold", translationHe: "קר", simpleDefinition: "Not hot.", exampleSentence: "It is cold today.", emoji: "❄️", topic: "weather", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  { id: "g3-weather-hot", word: "hot", translationHe: "חם", simpleDefinition: "Not cold.", exampleSentence: "It is hot today.", emoji: "🥵", topic: "weather", grade: "grade3", difficulty: 1, partOfSpeech: "adjective" },
  // Games
  { id: "g3-games-ball", word: "ball", translationHe: "כדור", simpleDefinition: "A round toy for games.", exampleSentence: "Where is the ball?", emoji: "⚽", topic: "games", grade: "grade3", difficulty: 1, partOfSpeech: "noun" },
  { id: "g3-games-play", word: "play", translationHe: "לשחק", simpleDefinition: "To have fun with toys or games.", exampleSentence: "I like to play.", emoji: "🧸", topic: "games", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  { id: "g3-games-jump", word: "jump", translationHe: "לקפוץ", simpleDefinition: "To push yourself into the air.", exampleSentence: "I can jump high.", emoji: "🤸", topic: "games", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  { id: "g3-games-run", word: "run", translationHe: "לרוץ", simpleDefinition: "To move very fast.", exampleSentence: "I like to run.", emoji: "🏃", topic: "games", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  // Daily actions
  { id: "g3-daily-eat", word: "eat", translationHe: "לאכול", simpleDefinition: "To put food in your mouth.", exampleSentence: "I eat breakfast.", emoji: "🍽️", topic: "dailyRoutine", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  { id: "g3-daily-drink", word: "drink", translationHe: "לשתות", simpleDefinition: "To have a liquid, like water.", exampleSentence: "I drink water.", emoji: "🥤", topic: "dailyRoutine", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  { id: "g3-daily-sleep", word: "sleep", translationHe: "לישון", simpleDefinition: "To close your eyes and rest.", exampleSentence: "I sleep at night.", emoji: "😴", topic: "dailyRoutine", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
  { id: "g3-daily-like", word: "like", translationHe: "לאהוב / למצוא חן", simpleDefinition: "To enjoy something.", exampleSentence: "I like pizza.", emoji: "❤️", topic: "dailyRoutine", grade: "grade3", difficulty: 1, partOfSpeech: "verb" },
];

// -------------------------------------------------------------------------
// Grade 6 vocabulary bank — bridging level: wider than grade 4, but not
// as abstract/academic as grade 7. Real sentences, everyday teen topics.
// -------------------------------------------------------------------------
const grade6Words: VocabularyWord[] = [
  // School & friends
  { id: "g6-school-subject", word: "subject", translationHe: "מקצוע לימוד", simpleDefinition: "A topic you study in school, like math or art.", exampleSentence: "Science is my favorite subject.", emoji: "📐", topic: "school", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-school-project", word: "project", translationHe: "פרויקט", simpleDefinition: "A piece of school work you plan and build.", exampleSentence: "We are working on a group project this week.", emoji: "🗂️", topic: "school", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-friends-loyal", word: "loyal", translationHe: "נאמן", simpleDefinition: "Always supporting your friends.", exampleSentence: "A good friend is loyal and honest.", emoji: "🤝", topic: "friends", grade: "grade6", difficulty: 3, partOfSpeech: "adjective" },
  { id: "g6-friends-argument", word: "argument", translationHe: "מחלוקת / ריב", simpleDefinition: "A disagreement between people.", exampleSentence: "We had a small argument about the movie.", emoji: "💬", topic: "friends", grade: "grade6", difficulty: 3, partOfSpeech: "noun" },
  // Technology / gaming
  { id: "g6-tech-app", word: "application", translationHe: "אפליקציה", simpleDefinition: "A program you use on a phone or computer.", exampleSentence: "I downloaded a new application for drawing.", emoji: "📱", topic: "technology", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-tech-online", word: "online", translationHe: "מקוון", simpleDefinition: "Connected to the internet.", exampleSentence: "We did an online quiz in class.", emoji: "💻", topic: "technology", grade: "grade6", difficulty: 2, partOfSpeech: "adjective" },
  { id: "g6-gaming-level", word: "level", translationHe: "שלב", simpleDefinition: "A stage in a game.", exampleSentence: "I finally finished the hardest level.", emoji: "🎮", topic: "gaming", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-gaming-team-up", word: "team up", translationHe: "לחבור יחד", simpleDefinition: "To join with others to do something together.", exampleSentence: "We teamed up to beat the final boss.", emoji: "🕹️", topic: "gaming", grade: "grade6", difficulty: 3, partOfSpeech: "verb" },
  // Sports
  { id: "g6-sport-score", word: "score", translationHe: "לקלוע / תוצאה", simpleDefinition: "The points in a game, or to make a point.", exampleSentence: "She scored two goals in the match.", emoji: "🥅", topic: "sports", grade: "grade6", difficulty: 2, partOfSpeech: "verb" },
  { id: "g6-sport-training", word: "training", translationHe: "אימונים", simpleDefinition: "Practice to improve at a sport.", exampleSentence: "I have basketball training on Mondays.", emoji: "🏀", topic: "sports", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  // Music
  { id: "g6-music-instrument", word: "instrument", translationHe: "כלי נגינה", simpleDefinition: "An object used to make music.", exampleSentence: "The guitar is my favorite instrument.", emoji: "🎸", topic: "music", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-music-playlist", word: "playlist", translationHe: "רשימת השמעה", simpleDefinition: "A list of songs you like to play.", exampleSentence: "I made a playlist for the road trip.", emoji: "🎵", topic: "music", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  // Travel / vacations
  { id: "g6-travel-vacation", word: "vacation", translationHe: "חופשה", simpleDefinition: "A trip or time off from school/work.", exampleSentence: "We are going on vacation to the north.", emoji: "🧳", topic: "travel", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-travel-explore", word: "explore", translationHe: "לחקור / לגלות", simpleDefinition: "To travel and discover new places.", exampleSentence: "We explored the old city on our trip.", emoji: "🧭", topic: "travel", grade: "grade6", difficulty: 3, partOfSpeech: "verb" },
  // Animals / nature
  { id: "g6-nature-forest", word: "forest", translationHe: "יער", simpleDefinition: "A large area full of trees.", exampleSentence: "We hiked through the forest last weekend.", emoji: "🌳", topic: "nature", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-nature-wildlife", word: "wildlife", translationHe: "חיות בר", simpleDefinition: "Animals that live in nature.", exampleSentence: "We saw a lot of wildlife on our camping trip.", emoji: "🦌", topic: "nature", grade: "grade6", difficulty: 3, partOfSpeech: "noun" },
  // Movies
  { id: "g6-movies-scene", word: "scene", translationHe: "סצנה", simpleDefinition: "A part of a movie.", exampleSentence: "That was such a funny scene!", emoji: "🎬", topic: "movies", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-movies-actor", word: "actor", translationHe: "שחקן", simpleDefinition: "A person who acts in movies or shows.", exampleSentence: "My favorite actor is in the new film.", emoji: "🎭", topic: "movies", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  // Weekend plans / hobbies
  { id: "g6-weekend-plan", word: "plan", translationHe: "תוכנית", simpleDefinition: "An idea for what you will do.", exampleSentence: "What's your plan for the weekend?", emoji: "🗓️", topic: "weekendPlans", grade: "grade6", difficulty: 2, partOfSpeech: "noun" },
  { id: "g6-weekend-hangout", word: "hang out", translationHe: "להיפגש / לבלות", simpleDefinition: "To spend relaxed time with friends.", exampleSentence: "Let's hang out at the park on Friday.", emoji: "🛹", topic: "weekendPlans", grade: "grade6", difficulty: 3, partOfSpeech: "verb" },
  { id: "g6-hobby-collection", word: "collection", translationHe: "אוסף", simpleDefinition: "A group of similar things you gather.", exampleSentence: "He has a huge card collection.", emoji: "🗃️", topic: "hobbies", grade: "grade6", difficulty: 3, partOfSpeech: "noun" },
  { id: "g6-hobby-improve", word: "improve", translationHe: "להשתפר", simpleDefinition: "To get better at something.", exampleSentence: "I want to improve my drawing skills.", emoji: "📈", topic: "hobbies", grade: "grade6", difficulty: 3, partOfSpeech: "verb" },
];

export const VOCABULARY_BANK: VocabularyWord[] = [...grade3Words, ...grade4Words, ...grade6Words, ...grade7Words];

export const TOPIC_LABELS: Record<string, { en: string; he: string; emoji: string }> = {
  colors: { en: "Colors", he: "צבעים", emoji: "🎨" },
  numbers: { en: "Numbers", he: "מספרים", emoji: "🔢" },
  clothes: { en: "Clothes", he: "בגדים", emoji: "👕" },
  body: { en: "Body", he: "גוף", emoji: "🙋" },
  games: { en: "Games", he: "משחקים", emoji: "🧸" },
  family: { en: "Family", he: "משפחה", emoji: "👨‍👩‍👧‍👦" },
  school: { en: "School", he: "בית ספר", emoji: "🏫" },
  food: { en: "Food", he: "אוכל", emoji: "🍎" },
  animals: { en: "Animals", he: "בעלי חיים", emoji: "🐾" },
  sports: { en: "Sports", he: "ספורט", emoji: "⚽" },
  hobbies: { en: "Hobbies", he: "תחביבים", emoji: "🎨" },
  home: { en: "Home", he: "הבית", emoji: "🏠" },
  weather: { en: "Weather", he: "מזג אוויר", emoji: "☀️" },
  friends: { en: "Friends", he: "חברים", emoji: "🤝" },
  dailyRoutine: { en: "Daily Routine", he: "סדר יום", emoji: "⏰" },
  technology: { en: "Technology", he: "טכנולוגיה", emoji: "📱" },
  travel: { en: "Travel", he: "טיולים", emoji: "✈️" },
  schoolLife: { en: "School Life", he: "חיי בית ספר", emoji: "📚" },
  socialSituations: { en: "Social Situations", he: "מצבים חברתיים", emoji: "👥" },
  music: { en: "Music", he: "מוזיקה", emoji: "🎵" },
  movies: { en: "Movies", he: "סרטים", emoji: "🎬" },
  science: { en: "Science", he: "מדע", emoji: "🔬" },
  gaming: { en: "Gaming", he: "גיימינג", emoji: "🎮" },
  futurePlans: { en: "Future Plans", he: "תוכניות לעתיד", emoji: "🚀" },
  nature: { en: "Nature", he: "טבע", emoji: "🌳" },
  weekendPlans: { en: "Weekend Plans", he: "תוכניות לסוף שבוע", emoji: "🗓️" },
};

export function wordsForGrade(grade: GradeLevel): VocabularyWord[] {
  return VOCABULARY_BANK.filter((w) => w.grade === grade || w.grade === "both");
}

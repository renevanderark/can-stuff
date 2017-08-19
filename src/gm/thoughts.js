const gameOverThoughts = [
  "Noooo!!",
  "The agony!",
  "Why?!",
  "What did you do?",
  "The pain!",
  "The anguish!"
];

const salvationThoughts = [
  "Thank you!", "Bless you!", "Salvation!", "Freedom!", "Joy!", "Hurray!"
];

const strayThoughts = [
  ["Where did I put my keys?", "I must have left them somewhere..."],
  ["What are you waiting for?", "I'm going crazy in here!"],
  ["What were the four noble truths again?", "Suffering...", "...the origin of suffering...", "...the cessation of suffering...", "...the noble 8-fold path."],
  ["Stuck in the wheel of becoming..."],
  ["3.14", "3.141", "3.1415", "3.14159", "3.141592..."],
  ["These games always involve Pi...", "...but never 42...", "...or do they?"],
];

const randomThought = (ary) => ary[Math.floor(Math.random() * ary.length)];
const gameOverThought =  () => randomThought(gameOverThoughts);
const salvationThought =  () => randomThought(salvationThoughts);
const strayThought = () => randomThought(strayThoughts).slice();

export {  gameOverThought, salvationThought, strayThought }

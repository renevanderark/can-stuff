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
  ["Stuck in the wheel of becoming..."]
];

const randomThought = (ary) => ary[Math.floor(Math.random() * ary.length)];
const gameOverThought =  () => randomThought(gameOverThoughts);
const salvationThought =  () => randomThought(salvationThoughts);
const strayThought = () => randomThought(strayThoughts).slice();

export {  gameOverThought, salvationThought, strayThought }

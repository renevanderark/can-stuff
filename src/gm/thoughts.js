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

const randomThought = (ary) => ary[Math.floor(Math.random() * ary.length)];
const gameOverThought =  () => randomThought(gameOverThoughts);
const salvationThought =  () => randomThought(salvationThoughts);

export {  gameOverThought, salvationThought }

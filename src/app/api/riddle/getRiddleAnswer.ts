export const ANSWERS = [
  "111+12",
  "20*4/4",
  "17-6*2",
  "81+8/1",
  "21/7+9",
  "132-59",
  "512/16",
];

export const getRiddleAnswer = (daystamp: number) =>
  ANSWERS[daystamp % ANSWERS.length];

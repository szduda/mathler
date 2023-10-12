export const getRiddleAnswer = (daystamp: number) => {
  const answers = [
    "111+12",
    "17-6*2",
    "20*4/4",
    "81+8/1",
    "21/7+9",
    "132-59",
    "512/16",
  ];
  return answers[daystamp % answers.length];
};

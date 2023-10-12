export const getRiddleAnswer = (daystamp: number) => {
  const answers = ["17-6*2", "20*4/4"];
  return answers[daystamp % answers.length];
};

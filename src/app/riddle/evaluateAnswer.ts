import { evaluate } from "mathjs";

export const evaluateAnswer = (
  answer: string,
  options: {
    round?: false;
  } = {}
) => {
  const floatAnswer = evaluate(answer);
  return options.round ? Math.round(floatAnswer) : floatAnswer;
};

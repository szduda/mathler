import {
  getAcceptedInputs,
  matchSolution,
  rankInput,
  validate,
} from "@/helpers";
import { evaluateAnswer, getRiddleAnswer } from "@/app/riddle";

type SolutionRoute = {
  params: {
    input: string;
  };
};

export const POST = async (
  req: Request,
  { params: { input } }: SolutionRoute
) => {
  const { valid, message } = validate(input);
  if (!valid) {
    return Response.json({ message }, { status: 400 });
  }

  // const id = Math.trunc(Date.now() / (24 * 3600 * 1000));
  const id = Math.trunc(Date.now() / (3600 * 1000));
  const riddleAnswer = getRiddleAnswer(id);
  const riddle = evaluateAnswer(riddleAnswer);

  if (evaluateAnswer(input) !== riddle) {
    return Response.json(
      { message: `Expression value must equal ${riddle}.` },
      { status: 400 }
    );
  }

  if (![...input].some((char) => riddleAnswer.includes(char))) {
    console.log("seems like a big miss");
    return Response.json({ hints: [...input].map((char) => ({ char })) });
  }

  const acceptedInputs = getAcceptedInputs(riddleAnswer);
  console.log("\ninput", [input], "\naccepted solutions", acceptedInputs);

  if (acceptedInputs.includes(input)) {
    console.log("riddle solved!");
    return Response.json({ solved: true }, { status: 200 });
  }

  const matchedSolution = matchSolution(input, acceptedInputs);
  const { score, hints } = rankInput(input, matchedSolution);
  console.log("matched solution", [matchedSolution], "with score", score);

  return Response.json({ hints }, { status: 200 });
};

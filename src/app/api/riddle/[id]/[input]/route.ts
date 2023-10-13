import { evaluateAnswer, getRiddleAnswer } from "@/app/api/riddle";
import {
  getAcceptedInputs,
  matchSolution,
  rankInput,
  validate,
} from "@/helpers";

type SolutionRoute = {
  params: {
    input: string;
    id: string;
  };
};

export const POST = async (
  req: Request,
  { params: { input, id } }: SolutionRoute
) => {
  const _id = Number(id);
  if (!Number.isInteger(_id)) {
    return Response.json({ message: "Invalid ID" }, { status: 400 });
  }

  const { valid, message } = validate(input);
  if (!valid) {
    return Response.json({ message }, { status: 400 });
  }

  const riddleAnswer = getRiddleAnswer(_id);
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

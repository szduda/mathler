import { evaluate } from "mathjs";
import { validate } from "@/helpers";

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

  const solution = getSolution(Date.now());
  const solutionValue = evaluate(solution);

  if (evaluate(input) !== solutionValue) {
    return Response.json(
      { message: `Expression value must equal ${solutionValue}.` },
      { status: 400 }
    );
  }

  const inputParts = [...input];
  const solutionParts = [...solution];
  const solved = inputParts.reduce(
    (acc, current) =>
      acc &&
      inputParts.filter((p) => p === current).length ===
        solutionParts.filter((p) => p === current).length,
    true
  );

  if (solved) {
    return Response.json({ solved: true }, { status: 200 });
  }

  return Response.json(
    {
      hint: {
        correct: [],
        wrongPlaced: [],
      },
    },
    { status: 200 }
  );
};

const getSolution = (timestamp: number) => {
  return "1+10*5";
};

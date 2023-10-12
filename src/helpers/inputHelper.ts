import { evaluateAnswer } from "@/app/riddle";
import { Hint } from "@/features/client/Game/types";

export const INPUT_LENGTH = 6;

// Numbers: non-negative, no leading zeros, up to 3 digits.
const NUMBER = /0|[1-9]\d{0,2}/.source;
// Operators: + - * /
const OPERATOR = /[\+\-\*\/]/.source;

// Use on full length input.
const inputFormatRegex = new RegExp(
  `^(${NUMBER})((${OPERATOR})(${NUMBER}))?(${OPERATOR})(${NUMBER})$`,
  "g"
);

// Use on input single char.
const charsetRegex = new RegExp(`[0-9]|${OPERATOR}`);

// Use to search for the equation elements.
const equationPartsRegex = new RegExp(
  `^(?<n1>${NUMBER})(?<o1>${OPERATOR})?(?<n2>${NUMBER})?(?<o2>${OPERATOR})(?<n3>${NUMBER})$`,
  "g"
);

export const isDigitValid = (digit: string) => {
  const valid = digit.length === 1 && charsetRegex.test(digit);
  charsetRegex.lastIndex = 0;
  return valid;
};

export const validate = (input: string) => {
  if (input.length !== INPUT_LENGTH) {
    return {
      valid: false,
      message: `Input must be ${INPUT_LENGTH} digits long.`,
    };
  }

  const isMatch = inputFormatRegex.test(input);
  inputFormatRegex.lastIndex = 0;

  if (!isMatch) {
    return {
      valid: false,
      message: "Invalid expression.",
    };
  }

  return {
    valid: true,
  };
};

export const rankInput = (input: string, solution: string) => {
  const hints: Hint[] = [...input].map((char, index) => ({
    char,
    correct: solution[index] === char,
    misplaced: false,
  }));

  let allMisplaced = [...input].filter((char, i) =>
    [...solution].filter((_, j) => !hints[j].correct).includes(char)
  );

  hints.forEach(({ char, correct }, index) => {
    const misplaced = allMisplaced.includes(char);
    if (misplaced) {
      allMisplaced = allMisplaced
        .sort((c1, c2) => (c2 === char ? 1 : c1 === char ? -1 : 0))
        .slice(1);
      hints[index].misplaced = misplaced;
    }
  });

  const correctLen = Object.values(hints).filter((hint) => hint.correct).length;
  const misplacedLen = Object.values(hints).filter(
    (hint) => hint.misplaced
  ).length;

  return {
    score: correctLen + 0.25 * misplacedLen,
    hints,
  };
};

export const getAcceptedInputs = (storedSolution: string) => {
  const storedSolutionValue = evaluateAnswer(storedSolution);
  return getValidPermutations(storedSolution).filter(
    (_solution) => evaluateAnswer(_solution) === storedSolutionValue
  );
};

export const matchSolution = (input: string, acceptedInputs: string[]) =>
  acceptedInputs
    .map((possibleSolution) => ({
      possibleSolution,
      score: rankInput(input, possibleSolution).score,
    }))
    .sort((s1, s2) =>
      s1.score === s2.score ? 0 : s2.score > s1.score ? 1 : -1
    )
    .at(0)!.possibleSolution;

const getEquationParts = (input: string) => {
  const groups = equationPartsRegex.exec(input)?.groups ?? {};
  equationPartsRegex.lastIndex = 0;
  const { n1, n2, o1, o2, n3 } = groups ?? {};

  const equationParts = [n1, o1, n2, o2, n3].filter(Boolean);
  return equationParts;
};

const getValidPermutations: (input: string) => string[] = (input) =>
  getPermutations(getEquationParts(input)).filter(
    (permutation) => validate(permutation).valid
  );

const getPermutations: (input: string[]) => string[] = (input) => {
  if (input.length < 2) {
    return input;
  }

  const permutations: string[] = [];

  input.forEach((char, index) => {
    const rest = input.filter((_, subIndex) => subIndex !== index);

    getPermutations(rest).forEach((subPermutation) => {
      const newPermutation = char + subPermutation;
      if (!permutations.includes(newPermutation)) {
        permutations.push(newPermutation);
      }
    });
  });

  return permutations;
};

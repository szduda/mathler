// Numbers: non-negative, no leading zeros, up to 3 digits
const NUMBER = /(0|[1-9]\d{0,2})/.source;
// Operators: + - * /
const OPERATOR = /([\+\-\*\/])/.source;

const inputRegex = new RegExp(
  `^${NUMBER}${OPERATOR}?${NUMBER}?${OPERATOR}${NUMBER}$`,
  "g"
);

export const validate = (input: string) => {
  if (input.length !== 6) {
    return {
      valid: false,
      message: "Input must be 6 digits long.",
    };
  }

  const isMatch = inputRegex.test(input) ?? {};

  // reset regex pointer
  inputRegex.lastIndex = 0;

  if (!isMatch) {
    return {
      valid: false,
      message: "Invalid expression.",
    };
  }

  return { valid: true };
};

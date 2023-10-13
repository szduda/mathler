import {
  validate,
  rankInput,
  matchSolution,
  getAcceptedInputs,
  isDigitValid,
  INPUT_LENGTH,
} from "./inputHelper";

describe("inputHelper", () => {
  describe("isDigitValid", () => {
    it("accepts 0-9+-*/ characters", () => {
      const accepted = [
        ...[...Array(10)].map((_, index) => String(index)),
        "+",
        "-",
        "*",
        "/",
      ];

      accepted.forEach((char) => {
        expect(isDigitValid(char)).toBe(true);
      });
    });

    it("does not accept other characters", () => {
      const rejected = ["a", "A", "%", "=", "!", " ", "\n", "\0"];

      rejected.forEach((char) => {
        expect(isDigitValid(char)).toBe(false);
      });
    });
  });

  describe("getAcceptedInputs", () => {
    it("returns all valid commutative calculations", () => {
      const result = getAcceptedInputs("10*5+1");

      expect(result).toHaveLength(4);
      ["10*5+1", "1+10*5", "1+5*10", "5*10+1"].forEach((variant) => {
        expect(result.includes(variant)).toBe(true);
      });
    });

    it("returns single value if no commutative solution exist", () => {
      const result = getAcceptedInputs("10/5-1");

      expect(result).toHaveLength(1);
      expect(result[0]).toBe("10/5-1");
    });
  });

  describe("matchSolution", () => {
    it("picks the best solution", () => {
      expect(
        matchSolution("1*5+46", ["10*5+1", "1+10*5", "1+5*10", "5*10+1"])
      ).toEqual("1+5*10");

      expect(matchSolution("1*5+46", ["10*5+1", "1+10*5", "5*10+1"])).toEqual(
        "10*5+1"
      );

      expect(matchSolution("1*5+46", ["1+10*5", "5*10+1"])).toEqual("1+10*5");
    });

    it("if the score is equal pick the first", () => {
      expect(matchSolution("1*5+46", ["10*5+1", "1+10*5"])).toEqual("10*5+1");
      expect(matchSolution("1*5+46", ["1+10*5", "10*5+1"])).toEqual("1+10*5");
      expect(matchSolution("1*5+46", ["1+10*5"])).toEqual("1+10*5");
      expect(matchSolution("1*5+46", ["1+10*5"])).toEqual("1+10*5");
    });
  });

  describe("rankInput", () => {
    it("gives 1 point for a matching and 0.25 point for a misplaced char", () => {
      expect(rankInput("10*5+1", "10*5+1").score).toEqual(6);
      expect(rankInput("10*5+1", "1+10*5").score).toEqual(2.25);
      expect(rankInput("10*5+1", "1+5*10").score).toEqual(2.25);
      expect(rankInput("10*5+1", "5*10+1").score).toEqual(3);
      expect(rankInput("", "5*10+1").score).toEqual(0);
      expect(rankInput("2-43/7", "5*10+1").score).toEqual(0);
      expect(rankInput("------", "5*10+1").score).toEqual(0);
      expect(rankInput("5-----", "5*10+1").score).toEqual(1);
      expect(rankInput("5+----", "5*10+1").score).toEqual(1.25);
      expect(rankInput("5+1---", "5*10+1").score).toEqual(2.25);
      expect(rankInput("+-----", "5*10+1").score).toEqual(0.25);
      expect(rankInput("++----", "5*10+1").score).toEqual(0.5);
    });
  });

  describe("validate", () => {
    it("input length", () => {
      const msg = `Input must be ${INPUT_LENGTH} digits long.`;

      let result = validate("12*4+5");
      expect(result.valid).toEqual(true);
      expect(result.message).toBe(undefined);

      result = validate("12*4+50");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("12*40");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);
    });

    it("input format", () => {
      const msg = "Invalid expression.";

      let result = validate("1*4++2");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("123456");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("123456");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("01+105");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("-50+10");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("+12+5+");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);

      result = validate("1234+6");
      expect(result.valid).toEqual(false);
      expect(result.message).toEqual(msg);
    });
  });
});

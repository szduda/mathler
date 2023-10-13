import { render } from "@testing-library/react";
import { RiddleInfo } from "./RiddleInfo";

describe("RiddleInfo", () => {
  const suffixes: Record<string, string> = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    default: "th",
  };
  const testSuffix = (id: number) => {
    const { container } = render(<RiddleInfo id={id} />);
    expect(container.textContent).toBe(
      `the riddle for${id}${
        suffixes?.[String(id)] ?? suffixes.default
      } day of UNIX time`
    );
  };

  it("has proper number suffix", () => {
    [...Array(10)].forEach((_, index) => testSuffix(index));
  });
});

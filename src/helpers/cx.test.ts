import { cx } from "./cx";

describe("cx", () => {
  it("concatenates using space char", () => {
    expect(cx([])).toEqual("");
    expect(cx(["a", true && "b", "c"])).toEqual("a b c");
  });

  it("filters out falsy values", () => {
    expect(cx(["a", false && "b", "c"])).toEqual("a c");
    expect(cx(["a", undefined, "c"])).toEqual("a c");
  });
});

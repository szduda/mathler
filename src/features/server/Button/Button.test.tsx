import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Logo", () => {
  it("has link", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button", { name: "Test" })).toBeInTheDocument();
  });
});

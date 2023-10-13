import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("has link", () => {
    render(<Logo />);
    expect(screen.getByRole("link", { name: "Mathler" })).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import {
  getTimeTillNextRiddle,
  TimeTillNextRiddle,
} from "./TimeTillNextRiddle";

describe("getTimeTillNextRiddle", () => {
  it("returns time span till next day", () => {
    expect(getTimeTillNextRiddle(0)).toEqual({ hours: 24, minutes: 0 });
    expect(getTimeTillNextRiddle(1)).toEqual({ hours: 23, minutes: 59 });
    expect(getTimeTillNextRiddle(2)).toEqual({ hours: 23, minutes: 59 });
    expect(getTimeTillNextRiddle(3600 * 1000)).toEqual({
      hours: 23,
      minutes: 0,
    });
    expect(getTimeTillNextRiddle(3600 * 1000 + 1)).toEqual({
      hours: 22,
      minutes: 59,
    });
    expect(getTimeTillNextRiddle(24 * 3600 * 1000 - 1)).toEqual({
      hours: 0,
      minutes: 0,
    });

    expect(getTimeTillNextRiddle(24 * 3600 * 1000)).toEqual({
      hours: 24,
      minutes: 0,
    });
  });
});

describe("TimeTillNextRiddle", () => {
  it("returns time span string", () => {
    jest.useFakeTimers().setSystemTime(1);
    const { container } = render(<TimeTillNextRiddle />);

    expect(container.textContent).toBe("Next riddle in23h59m");
  });
});

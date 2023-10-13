import { createMocks } from "node-mocks-http";
import { POST } from "./route";
import { evaluateAnswer, getRiddleAnswer } from "../..";
import { getAcceptedInputs } from "@/helpers";

describe("/api/riddle/[id]/[input]", () => {
  const { req } = createMocks({
    method: "POST",
  });

  it("rejects non-numeric seed (id)", async () => {
    const res = await POST(req, { params: { id: "abc", input: "2*5+50" } });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ message: "Invalid ID" });
  });

  it("confirms winning input", async () => {
    const answer = getRiddleAnswer(0);
    const res = await POST(req, { params: { id: "0", input: answer } });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ solved: true });
  });

  it("confirms winning input that is a commutative solution", async () => {
    const answer = getRiddleAnswer(0);
    const altAnswer = getAcceptedInputs(answer).find(
      (input) => input !== answer
    );

    if (!altAnswer) {
      throw new Error(
        "This test requires the fetched answer to have commutative solutions"
      );
    }

    const res = await POST(req, { params: { id: "0", input: altAnswer } });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ solved: true });
  });

  it("discards input of invalid length", async () => {
    const answer = getRiddleAnswer(0);
    const riddle = evaluateAnswer(answer);
    const res = await POST(req, { params: { id: "0", input: "2*5+502" } });

    expect(res.status).toBe(400);
  });

  it("discards input with invalid value", async () => {
    const answer = getRiddleAnswer(0);
    const riddle = evaluateAnswer(answer);
    const res = await POST(req, { params: { id: "0", input: "2*5+50" } });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: `Expression value must equal ${riddle}.`,
    });
  });

  it("discards input that has no hints", async () => {
    const res = await POST(req, { params: { id: "1", input: "119-99" } });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      hints: [
        { char: "1" },
        { char: "1" },
        { char: "9" },
        { char: "-" },
        { char: "9" },
        { char: "9" },
      ],
    });
  });

  it("return hints", async () => {
    const res = await POST(req, { params: { id: "0", input: "112+11" } });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      hints: [
        { char: "1", correct: true, misplaced: false },
        { char: "1", correct: true, misplaced: false },
        { char: "2", correct: false, misplaced: true },
        { char: "+", correct: true, misplaced: false },
        { char: "1", correct: true, misplaced: false },
        { char: "1", correct: false, misplaced: true },
      ],
    });
  });
});

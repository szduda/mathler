import { FC, useState } from "react";

type GameStatus = "standby" | "submitting" | "solved" | "try again" | "invalid";

type SolutionResponse = {
  solved?: boolean;
  message?: string;
  hint?: any;
};

export const SubmitSolution: FC = () => {
  const [status, setStatus] = useState<GameStatus>("standby");

  const input = "5*10+1";

  const submit = async () => {
    setStatus("submitting");
    const res = await fetch(`/solution/${encodeURIComponent(input)}`, {
      method: "POST",
    });
    if (res.status === 200) {
      const { solved, message, hint }: SolutionResponse = await res.json();
      setStatus(solved ? "solved" : message ? "invalid" : "try again");
      console.log("hint", hint);
    } else {
      setStatus("standby");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 gap-12">
        <div>
          Input:{" "}
          <span className="px-2 py-1 bg-white/10 rounded-md">{input}</span>
        </div>
        <div>
          Status:{" "}
          <span className="px-2 py-1 bg-white/10 rounded-md">{status}</span>
        </div>
      </div>
      <button
        className="px-3 py-2 bg-violet-800 rounded-md tracking-wider font-semibold mt-6 transition hover:scale-105 hover:bg-violet-700 active:scale-100"
        onClick={submit}
      >
        Submit solution
      </button>
    </div>
  );
};

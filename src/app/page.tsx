import Link from "next/link";
import { evaluateAnswer, getRiddleAnswer } from "@/app/riddle";
import { Game } from "@/features/client";

export default function Home() {
  // const id = Math.trunc(Date.now() / (24 * 3600 * 1000));
  const id = Math.trunc(Date.now() / (3600 * 1000));
  const riddle = evaluateAnswer(getRiddleAnswer(id));
  const suffix = getNumberSuffix(id);

  return (
    <main className="flex flex-col items-center justify-start pt-12 p-2 max-w-[320px] mx-auto">
      <h1 className="uppercase tracking-widest text-5xl text-neutral-300/50 mb-6">
        Mathler
      </h1>

      <h2 className="text-lg tracking-wide text-center">
        The hidden calculation equals
      </h2>
      <div className="text-3xl rounded-full p-3 bg-black/60 font-black text-white mt-2">
        {riddle}
      </div>
      <Game riddle={riddle} id={id} />
      <Link
        href="/help"
        className="mx-auto inline-block p-2 mt-24 hover:underline tracking-widest text-yellow-400"
      >
        Help
      </Link>
      <div className="mt-4">
        <small>the riddle for</small>
        <span className="tracking-widest font-black pl-1">{id}</span>
        <small>{suffix} day of UNIX time</small>
      </div>
    </main>
  );
}

const getNumberSuffix = (id: number) => {
  const lastNumberInId = [...String(id)].pop() ?? "";
  const suffixes: Record<string, string> = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    default: "th",
  };
  return suffixes?.[lastNumberInId] ?? suffixes.default;
};

export const revalidate = 3600;

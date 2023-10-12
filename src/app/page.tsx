import { evaluateAnswer, getRiddleAnswer } from "@/app/riddle";
import { Game } from "@/features/client";

export default function Home() {
  const id = Math.trunc(Date.now() / (24 * 3600 * 1000));
  const riddle = evaluateAnswer(getRiddleAnswer(id));
  console.log("Compiled with the riddle of", riddle);

  return (
    <main className="flex flex-col items-center justify-start mt-12 p-2 max-w-[320px] mx-auto">
      <h1 className="uppercase tracking-widest text-4xl">Mathler</h1>
      <h2 className="text-lg tracking-wide text-center mt-8">
        The hidden calculation equals:
      </h2>
      <div className="text-3xl rounded-full p-3 bg-black font-black text-white mt-2">
        {riddle}
      </div>
      <Game riddle={riddle} id={id} />
    </main>
  );
}

export const revalidate = 3600;

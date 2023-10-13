import Link from "next/link";
import { evaluateAnswer, getRiddleAnswer } from "@/app/riddle";
import { Game } from "@/features/client";
import { Logo, RiddleInfo } from "@/features/server";

export default function Home() {
  // const id = Math.trunc(Date.now() / (24 * 3600 * 1000));
  const id = Math.trunc(Date.now() / (3600 * 1000));
  const riddle = evaluateAnswer(getRiddleAnswer(id));

  return (
    <main className="flex flex-col items-center justify-start pt-12 p-2 max-w-[320px] mx-auto">
      <h1>
        <Logo />
      </h1>
      <Game riddle={riddle} id={id} />
      <Link
        href="/help"
        className="mx-auto inline-block p-2 mt-24 hover:underline tracking-widest text-yellow-400"
      >
        Help
      </Link>
      <RiddleInfo id={id} />
    </main>
  );
}

export const revalidate = 60;

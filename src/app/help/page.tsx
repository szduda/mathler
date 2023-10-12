import { Button } from "@/features/server";
import Image from "next/image";
import Link from "next/link";

export default function Help() {
  return (
    <main className="flex flex-col items-center justify-start pt-12 p-2 max-w-[320px] md:max-w-[640px] mx-auto">
      <h1 className="uppercase tracking-widest text-5xl text-neutral-300/50 mb-6">
        Mathler
      </h1>
      <h2 className="text-3xl tracking-wide text-center mt-16 text-yellow-400">
        Need Help?
      </h2>
      <div className="mt-6 p-3 rounded-xl bg-neutral-300/25">
        <strong className="opacity-50 tracking-widest uppercase">tl;dr</strong>
        <p>
          Find the hidden calculation which equals the visible number.
          <br />6 digits. 6 tries. You get hints after each turn.
        </p>
      </div>
      <h3 className="text-2xl tracking-wide text-center mt-16">Features</h3>
      <ul className="text-lg list-disc ml-4 [&>li]:mt-3">
        <li>You can play with keyboard or mouse</li>
        <li>
          The riddle changes every 24h, but you can finish your riddle unless
          you refresh or leave the page.
        </li>
      </ul>
      <h3 className="text-2xl tracking-wide text-center mt-16">Rules</h3>
      <ul className="text-lg list-disc ml-4 [&>li]:mt-3">
        <li>
          A valid math calculation consists of 2 to 3 non-negative, smaller than
          1000, numbers with an operator between each pair.
        </li>
        <li>The calculation needs to equal the number of the day.</li>
        <li>
          <p>
            If commutative solutions exist the shape is resolved to the one that
            gives you the best score. All valid shapes are accepted at any point
            of the game.
          </p>

          <Image
            src="/commutative.png"
            className="my-3 mx-auto"
            alt="Game board with hints targetting different commutative solutions, depending on which has the most score."
            width={286}
            height={287}
          />
          <p className="mt-3 text-center">
            An example game of 12.
            <br />
            Both{" "}
            <span className="py-0.5 px-2 rounded-lg bg-white/10 font-bold tracking-widest">
              111 + 12
            </span>{" "}
            and{" "}
            <span className="py-0.5 px-2 rounded-lg bg-white/10 font-bold tracking-widest">
              12 + 111
            </span>
            <br />
            are accepted answers.
          </p>
        </li>
      </ul>
      <div className="my-24">
        <p>That&rsquo;s all, now let&rsquo;s</p>
        <Link href="/">
          <Button>Play The Game</Button>
        </Link>
      </div>
    </main>
  );
}

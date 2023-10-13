import { FC } from "react";
import Link from "next/link";

export const Logo: FC = () => (
  <Link
    href="/"
    className="uppercase tracking-widest text-5xl text-neutral-300/50 mb-6"
  >
    Mathler
  </Link>
);

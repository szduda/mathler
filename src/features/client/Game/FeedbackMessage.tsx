import { FC } from "react";
import { cx } from "@/helpers";

export const FeedbackMessage: FC<{ solved?: boolean; gameover?: boolean }> = ({
  solved,
  gameover,
}) => (
  <h2
    className={cx([
      "text-xl tracking-wide text-center mt-2 transition duration-800 ease-in-out",
      solved || gameover ? "scale-125" : "scale-100 delay-300 duration-1000",
    ])}
  >
    {solved ? (
      <>
        Bravo!
        <br />
        You solved this riddle.
      </>
    ) : gameover ? (
      <>
        So close!
        <br />
        Good luck next time.
      </>
    ) : (
      <>
        &nbsp;
        <br />
        Will you guess it?
      </>
    )}
  </h2>
);

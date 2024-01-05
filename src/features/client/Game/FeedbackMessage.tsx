import { FC } from "react";
import { cx } from "@/helpers";

export const FeedbackMessage: FC<{ solved?: boolean; gameover?: boolean }> = ({
  solved,
  gameover,
}) => (
  <h2
    className={cx([
      "text-xl tracking-wide text-center mt-4",
      solved || gameover ? "scale-125" : "scale-100",
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

import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = ({
  className = "bg-violet-800 hover:bg-violet-700",
  hidden,
  ...props
}) => (
  <button
    className={[
      "block mx-auto mt-6 px-3 py-2 rounded-md transition delay-100 ease-in-out active:scale-100 hover:scale-105",
      "text-center tracking-wider font-semibold",
      className,
    ].join(" ")}
    {...props}
  />
);

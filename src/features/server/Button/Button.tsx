import { ComponentProps, FC } from "react";
import { cx } from "@/helpers";

export const Button: FC<ComponentProps<"button">> = ({
  className = "bg-violet-800 hover:bg-violet-700",
  ...props
}) => (
  <button
    className={cx([
      "block mx-auto mt-6 px-3 py-2 rounded-md transition delay-100 ease-in-out active:scale-100 hover:scale-105",
      "text-center tracking-wider font-semibold",
      className,
    ])}
    {...props}
  />
);

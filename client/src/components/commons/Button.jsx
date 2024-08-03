import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ImSpinner9 } from "react-icons/im";

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          "px-4 py-3 text-white bg-main-700 rounded-md flex justify-center items-center gap-3",
          className,
          disabled && "opacity-50"
        )
      )}
      disabled={disabled}
    >
      {disabled && (
        <span className="animate-spin">
          <ImSpinner9 />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;

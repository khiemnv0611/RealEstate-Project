import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputForm = ({
  style = "form-input",
  containerClassname,
  label,
  id,
  type = "text",
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}
    >
      {label && (
        <label className="font-medium text-main-800" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder: text-sm", inputClassname))}
        {...register(id, validate)}
        placeholder={placeholder}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputForm;

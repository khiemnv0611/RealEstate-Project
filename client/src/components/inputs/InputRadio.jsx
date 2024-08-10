import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputRadio = ({
  style = "form-radio",
  containerClassname,
  optionsClassname,
  label,
  id,
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
  options = [],
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
      <div className={twMerge(clsx(optionsClassname))}>
        {options.map((el) => (
          <div className="flex items-center gap-4" key={el.value}>
            <input
              type="radio"
              name={id}
              id={el.value}
              value={el.value}
              className={twMerge(
                clsx(style, "placeholder: text-sm", inputClassname)
              )}
              {...register(id, validate)}
              placeholder={placeholder}
            />
            <label className="cursor-pointer" htmlFor={el.value}>
              {el.label}
            </label>
          </div>
        ))}
      </div>

      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputRadio;

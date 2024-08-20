import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputSelect = ({
  style = "form-select",
  containerClassname,
  label,
  id,
  type = "text",
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
      <select
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder: text-sm", inputClassname))}
        {...register(id, validate)}
      >
        <option value="">{placeholder}</option>
        {options.map((el) => (
          <option key={el.code} value={el.code}>
            {el.label}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputSelect;

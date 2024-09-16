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
  required,
  onChange
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
          {required && (
            <sup>
              (<span className="text-red-500">*</span>)
            </sup>
          )}
        </label>
      )}
      <select
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder: text-sm", inputClassname))}
        {...register(id, validate)}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((el, idx) => (
          <option key={idx} value={el.code}>
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

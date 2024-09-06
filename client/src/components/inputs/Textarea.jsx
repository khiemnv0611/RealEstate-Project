import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Textarea = ({
  style = "form-textarea",
  containerClassname,
  label,
  id,
  type = "text",
  register,
  errors = {},
  inputClassname,
  validate,
  required,
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
          {required && (
            <sup>
              (<span className="text-red-500">*</span>)
            </sup>
          )}
        </label>
      )}
      <textarea
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder: text-sm", inputClassname))}
        {...register(id, validate)}
        placeholder={placeholder}
        rows={5}
      ></textarea>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default Textarea;

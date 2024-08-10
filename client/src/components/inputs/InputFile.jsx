import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FaCloudUploadAlt } from "react-icons/fa";

const InputFile = ({
  containerClassname,
  label,
  id,
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
      {label && <span className="font-medium text-main-800">{label}</span>}
      <input
        type="file"
        id={id}
        {...register(id, validate)}
        className="hidden"
      />
      <label
        className="bg-gray-100 w-full p-16 flex flex-col gap-2 items-center justify-center"
        htmlFor={id}
      >
        <span className="text-4xl text-gray-500">
          <FaCloudUploadAlt />
        </span>
        <p className="text-gray-500 text-sm italic">
          Chỉ hỗ trợ các hình ảnh có định dạng .JPEG, .PNG, .JPG
        </p>
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputFile;

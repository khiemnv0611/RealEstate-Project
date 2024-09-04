import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const BoxInfo = ({ data, containerClassName, role, roleStyle }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-full bg-gray-200 border-main-700 flex flex-col items-center justify-center p-4 gap-4",
          containerClassName
        )
      )}
    >
      <img
        src={data.avatar}
        alt="avatar"
        className="w-24 h-24 object-cover rounded-full"
      />
      <h1 className="font-bold text-main-700">{data.name}</h1>
      <span className={clsx("italic", roleStyle)}>{role}</span>
      <a
        className="px-6 py-2 bg-main-600 text-white rounded-md font-semibold"
        href={`tel: ${data.phone}`}
      >
        {data.phone}
      </a>
    </div>
  );
};

export default BoxInfo;

import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";

const Topheader = ({ location }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] text-white border-b border-main-400 w-full bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-main-700"
        )
      )}
    >
      <span className="flex items-center gap-2">
        <IoMailOpenOutline />
        <span>
          <span>Email us at : </span>
          <span className="text-gray-300">example@mail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-gray-300 gap-6">
          <FaFacebookF />
          <FaInstagram size={18} />
          <FaLinkedin size={18} />
          <FaYoutube size={20} />
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <CiPhone />
            <span className="text-gray-300">123-456 7890</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Topheader);

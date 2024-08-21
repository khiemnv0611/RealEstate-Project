import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { useUserStore } from "~/store/useUserStore";
import { showOptions } from "~/utils/constants";
import { Link } from "react-router-dom";

const Topheader = ({ location }) => {
  const { current, logOut } = useUserStore();
  const optionBox = useRef();
  const [isShowOptions, setIsShowOptions] = useState(false);
  useEffect(() => {
    const handleOnClick = (e) => {
      if (optionBox.current && optionBox.current.contains(e.target)) {
        setIsShowOptions(true);
      } else setIsShowOptions(false);
    };

    document.addEventListener("click", handleOnClick);

    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }, []);

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
        {current && (
          <div
            ref={optionBox}
            onClick={() => setIsShowOptions(true)}
            className="flex items-center relative gap-4 pl-8 hover:bg-overlay-30 p-2 rounded-md border-l border-main-400 cursor-pointer"
          >
            <div className="flex flex-col gap-2">
              <span className="font-semibold">{current?.name}</span>
              <span>
                ID: <span>{current?.id?.slice(0, 6)}</span>{" "}
              </span>
            </div>
            <img
              src={current?.avatar || "/user.svg"}
              alt="avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            {isShowOptions && (
              <div className="absolute z-50 right-0 left-0 top-full bg-white text-black rounded-md drop-shadow-sm flex flex-col py-2 border">
                {showOptions.map((el) => (
                  <Fragment key={el.id}>
                    {current?.userRoles?.some(
                      (role) => role.roleCode === el.code
                    ) && (
                      <Link
                        className="hover:bg-gray-100 px-6 py-2"
                        to={el.path}
                      >
                        {el.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
                <span
                  onClick={() => logOut()}
                  className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Đăng xuất
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Topheader);

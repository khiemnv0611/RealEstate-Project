import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userSidebar } from "~/utils/constants";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useUserStore } from "~/store/useUserStore";
import { MdAddCard } from "react-icons/md";
import path from "~/utils/path";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [activeTabs, setActiveTabs] = useState([]);
  const { current } = useUserStore();
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => !el == tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };

  return (
    <div className="w-full bg-main-700 text-white sticky top-0 h-screen">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
        <img
          src={current?.avatar || "/user.svg"}
          alt="logo"
          className="w-28 h-28 object-cover rounded-full"
        />
        <span className="text-orange-500 font-bold">{current?.name}</span>
        <span>
          {current?.userRoles?.map((el) => el.roleName.value)?.join(" / ")}
        </span>
        <div className="p-6 flex flex-col items-center border border-transparent shadow-lg rounded-md w-72 gap-3 bg-white text-main-700">
          <div className="flex justify-start w-full">
            <span className="font-semibold">Số dư tài khoản:</span>
          </div>
          <span className="ml-2 font-semibold text-2xl text-red-500">
            {current?.balance?.toLocaleString("vi-VN")} đ
          </span>
          <div className="flex items-center justify-start w-full gap-2">
            <span className="font-semibold">Gói hội viên:</span>
            <span className="px-2 bg-gray-300 rounded-2xl">MemPlans.name</span>
            {/*Miễn phí: gray, Cơ bản: yellow, Tiêu chuẩn: blue, Cao cấp: purple*/}
          </div>
          <div
            className="bg-main-700 text-white border rounded-md w-52 py-2 shadow-lg hover:cursor-pointer hover:text-main-700 hover:bg-white hover:shadow-2xl hover:border-blue-700"
            onClick={() => navigate(`/${path.USER_LAYOUT}/${path.DEPOSIT}`)}
          >
            <div className="flex items-center justify-center gap-4">
              <MdAddCard />
              <span>Nạp tiền</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 flex flex-col gap-0">
        {userSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-4 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
                    isActive && "bg-white text-main-700"
                  )
                }
                to={el.path}
              >
                <span>{el.icon}</span>
                <span className="select-none">{el.name}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <>
                <div
                  onClick={() => handleActiveTabs(el.id)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl cursor-pointer"
                >
                  <span className="flex items-center gap-4">
                    <span>{el.icon}</span>
                    <span className="select-none">{el.name}</span>
                  </span>
                  {activeTabs.some((tabId) => tabId === el.id) ? (
                    <FaCaretDown />
                  ) : (
                    <FaCaretRight />
                  )}
                </div>
                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div className="ml-6">
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
                            isActive && "bg-white text-main-700"
                          )
                        }
                        to={sub.path}
                      >
                        <span className="select-none">{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </Fragment>
        ))}
        <Link
          className={clsx(
            "flex items-center gap-4 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl"
          )}
          to={"/"}
        >
          <span>
            <TiArrowForwardOutline size={25} />
          </span>
          <span className="select-none">Quay lại Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;

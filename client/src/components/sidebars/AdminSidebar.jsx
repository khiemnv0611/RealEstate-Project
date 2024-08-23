import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { adminSidebar } from "~/utils/constants";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";
import { TiArrowForwardOutline } from "react-icons/ti";

const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => !el == tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };

  return (
    <div className="h-screen w-full">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-6">
        <img src="/logo_white.png" alt="logo" className="object-contain" />
        <span className="font-semibold text-2xl italic text-yellow-300">
          Quản trị viên
        </span>
      </div>
      <div className="mt-6 mx-3 flex flex-col gap-0">
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-4 text-lg px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
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
                  className="flex items-center justify-between text-lg px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl cursor-pointer"
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
                  <div>
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 text-lg px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
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
            <Link
              className={clsx(
                "flex items-center gap-4 text-lg px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl"
              )}
              to={"/"}
            >
              <span>
                <TiArrowForwardOutline size={25} />
              </span>
              <span className="select-none">Quay lại Trang Chủ</span>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;

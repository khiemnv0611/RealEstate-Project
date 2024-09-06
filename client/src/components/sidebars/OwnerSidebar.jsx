import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ownerSidebar } from "~/utils/constants";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useUserStore } from "~/store/useUserStore";

const OwnerSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const { current } = useUserStore();
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => !el == tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };

  return (
    <div className="h-full w-full bg-main-700 text-white">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
        <img
          src={current?.avatar || "/user.svg"}
          alt="logo"
          className="w-28 h-28 object-cover rounded-full"
        />
        <span className="text-orange-500 font-bold">{current?.name}</span>
        {/* <span>{current?.phone}</span> */}
        <span>
          {current?.userRoles?.map((el) => el.roleName.value)?.join(" / ")}
        </span>
      </div>
      <div className="mt-6 mx-3 flex flex-col gap-0 h-full">
        {ownerSidebar.map((el) => (
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

export default OwnerSidebar;

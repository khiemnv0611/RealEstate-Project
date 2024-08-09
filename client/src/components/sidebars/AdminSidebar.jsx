import clsx from "clsx";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { adminSidebar } from "~/utils/constants";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-full">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-6">
        <img src="/logo.png" alt="logo" className="object-contain" />
        <span className="font-semibold text-2xl italic text-yellow-300">
          Quản trị viên
        </span>
      </div>
      <div className="mt-6 mx-3">
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 text-lg px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
                    isActive && "bg-white text-main-700"
                  )
                }
              >
                {el.icon}
                {el.name}
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "..";
import { navigations } from "~/utils/constants";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";
import { twMerge } from "tailwind-merge";

const Navigation = ({ location }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-full bg-transparent flex items-center justify-between fixed z-50 top-[85px] px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-white"
        )
      )}
    >
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[120px] object-contain" />
      </Link>
      <div
        className={clsx(
          "flex text-base items-center gap-16",
          location.pathname === "/" ? "text-main-100" : "text-gray-700"
        )}
      >
        {navigations.map((el) => (
          <NavLink
            className={({ isActive }) =>
              clsx(
                isActive && "font-medium",
                location.pathname === "/" ? "text-white" : "text-gray-900"
              )
            }
            key={el.id}
            to={el.path}
          >
            {el.text}
          </NavLink>
        ))}
        <Button
          className={twMerge(
            clsx(
              location.pathname === "/" &&
                "bg-transparent border-main-100 border"
            )
          )}
        >
          Add Listing
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Navigation);

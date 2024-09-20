import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Login } from "..";
import { navigations } from "~/utils/constants";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "~/store/useUserStore";
import { useAppStore } from "~/store/useAppStore";

const Navigation = ({ location, navigate }) => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  return (
    <div
      className={twMerge(
        clsx(
          "w-full bg-transparent flex items-center justify-between fixed z-40 top-[85px] px-[100px] py-5",
          location.pathname !== "/" && "bg-white"
        )
      )}
    >
      <Link to="/">
        <img
          src={location.pathname !== "/" ? "/logo_blue.png" : "/logo_white.png"}
          alt="logo"
          className={twMerge(
            clsx("object-contain", {
              "w-[120px]": true,
            })
          )}
        />
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
        {!current ? (
          <Button
            className={twMerge(
              clsx(
                location.pathname === "/" &&
                  "bg-transparent border-main-100 border"
              )
            )}
            onClick={() => setModal(true, <Login />)}
          >
            Đăng nhập
          </Button>
        ) : (
          <Button
            className={twMerge(
              clsx(
                location.pathname === "/" &&
                  "bg-transparent border-main-100 border"
              )
            )}
            onClick={() => navigate("/add-post")}
          >
            Đăng tin
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);

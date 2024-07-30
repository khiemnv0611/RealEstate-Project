import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation, Topheader } from "~/components";

const PublicLayout = ({ Location }) => {
  return (
    <main>
      <Topheader />
      <Navigation />
      <div className={clsx(location.pathname === "/" ? "pt-0" : "pt-[187px]")}>
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;

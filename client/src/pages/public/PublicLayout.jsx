import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Topheader } from "~/components";

const PublicLayout = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Giả lập việc Topheader và Navigation đã load xong
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Thời gian delay phù hợp với việc load component

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
  return (
    <main>
      <Topheader />
      <Navigation />
      <div
        className={clsx(
          isLoaded
            ? location.pathname === "/"
              ? "pt-0"
              : "pt-[187px]"
            : "pt-0"
        )}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;

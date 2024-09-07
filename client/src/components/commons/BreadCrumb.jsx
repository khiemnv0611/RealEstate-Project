import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicBreakCrumb = ({ location }) => {
  return <span>{location.state.name}</span>;
};

const breadcrumbRoutes = [
  { path: "/", breadcrumb: "Trang chủ" },
  { path: "/properties", breadcrumb: "Dự án" },
  { path: "/properties/:id", breadcrumb: DynamicBreakCrumb },
  { path: "/add-post", breadcrumb: "Đăng tin" },
];

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);

  return (
    <div className="flex items-center">
      {breadcrumbs.map(({ match, breadcrumb, location }, idx) => (
        <NavLink
          key={match.pathname}
          className="h-5"
          state={{ name: location.state?.name }}
          to={match.pathname}
        >
          <span
            className={twMerge(
              "hover:underline",
              Object.keys(match.params).length > 0 && "w-[200px] line-clamp-1"
            )}
          >
            {breadcrumb}
          </span>
          <span>
            {idx < breadcrumbs.length - 1 && `\u00A0\u00A0/\u00A0\u00A0`}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default BreadCrumb;

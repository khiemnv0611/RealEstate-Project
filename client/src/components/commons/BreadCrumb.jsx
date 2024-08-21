import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const breadcrumbRoutes = [
  { path: "/", breadcrumb: "Trang chủ" },
  { path: "/properties", breadcrumb: "Dự án" },
];

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  return (
    <React.Fragment>
      {breadcrumbs.map(({ match, breadcrumb }, idx) => (
        <NavLink className="" key={match.pathname} to={match.pathname}>
          <span className="hover:underline">{breadcrumb}</span>
          {idx < breadcrumbs.length - 1 && " / "}
        </NavLink>
      ))}
    </React.Fragment>
  );
};

export default BreadCrumb;

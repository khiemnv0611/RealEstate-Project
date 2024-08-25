import { clsx } from "clsx";
import React from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hocs/withRouter";

const PaginationItem = ({ content, page, navigate, location }) => {
  const [searchParams] = useSearchParams();
  const handleChangePage = () => {
    const params = Object.fromEntries([...searchParams]);
    params.page = content;
    if (params.price) params.price = searchParams.getAll("price");
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    });
  };
  if (!Number(content))
    return (
      <div className="w-10 h-10 rounded-md bg-main-50 text-main-500 flex items-end justify-center">
        {content}
      </div>
    );
  return (
    <button
      type="button"
      onClick={handleChangePage}
      className={twMerge(
        clsx(
          "w-10 h-10 font-bold rounded-md cursor-pointer bg-main-50 text-main-500 flex items-center justify-center",
          !page && +content === 1 && "bg-main-500 text-white",
          +page && +content === +page && "bg-main-500 text-white"
        )
      )}
    >
      {content}
    </button>
  );
};

export default withRouter(PaginationItem);

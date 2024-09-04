import React from "react";
import { PropertyItem } from "..";

const RelatedPost = ({ title = "", data = [] }) => {
  return (
    <div className="w-full bg-white flex flex-col">
      <h1 className="font-bold text-lg w-full h-12 flex justify-center items-center bg-main-300">
        {title}
      </h1>
      <div className="flex flex-col">
        {data.map((el) => (
          <PropertyItem
            key={el.id}
            {...el}
            hideListingType={title.includes("cần")}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;

import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "~/utils/fn";
import path from "~/utils/path";

const PropertyItem = ({
  id,
  name,
  listingType,
  featuredImage,
  price,
  rPropertyType,
  hideListingType,
}) => {
  return (
    <div className="p-3 bg-white odd:bg-gray-200 even:white grid grid-cols-10 gap-3">
      <img
        src={featuredImage}
        alt=""
        className="col-span-2 w-full object-contain rounded-md"
      />
      <div className="flex flex-col col-span-8 gap-1">
        <Link
          to={`/${path.PROPERTIES}/${id}`}
          className="font-semibold hover:underline text-main-700 leading-4 line-clamp-2 w-full"
          state={{ name }}
        >
          {name}
        </Link>
        <span className="flex justify-between items-center">
          <span className="text-orange-600 font-semibold">
            {formatMoney(price)} VNĐ
          </span>
          {!hideListingType && (
            <span className="text-sm italic">{listingType}</span>
          )}
        </span>
        <span className="text-sm">
          Loại dự án: <span className="font-bold">{rPropertyType.name}</span>
        </span>
      </div>
    </div>
  );
};

export default PropertyItem;

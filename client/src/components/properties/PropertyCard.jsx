import React from "react";
import { formatMoney } from "~/utils/fn";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline, IoShareSocialOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";

const PropertyCard = ({ properties }) => {
  return (
    <div className="border rounded-md">
      <img
        src={properties?.featuredImage}
        alt=""
        className="w-full h-[240px] object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-xl font-semibold line-clamp-2 uppercase text-gray-700">
          {properties?.name}
        </h1>
        <span className="flex items-center gap-2 font-bold text-main-500">
          <FcMoneyTransfer size={18} />
          {`${formatMoney(properties?.price)}`}
          <span>VND</span>
        </span>
        <div className="flex justify-between items-center font-semibold">
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-gray-500">
              <IoBedOutline size={22} />
              <span>{properties?.bedRoom}</span>
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <PiBathtubDuotone size={22} />
              <span>{properties?.bedRoom}</span>
            </span>
          </div>
          <span className="flex items-center gap-3 text-gray-500">
            <SlSizeFullscreen size={17} />
            <span>{properties?.propertySize}m2</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={properties?.rPostedBy?.avatar}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-gray-500">
                {properties?.rPostedBy?.name}
              </span>
            </div>
            <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-green-600">
              Môi giới
            </span>
          </div>
          <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
            <IoShareSocialOutline />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src={properties?.rOwner?.avatar}
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className="text-gray-500">{properties?.rOwner?.name}</span>
          </div>
          <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-purple-600">
            Chủ sở hữu
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

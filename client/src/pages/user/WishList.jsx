import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { Button, Title } from "~/components";
import { IoClose } from "react-icons/io5";

const WishList = () => {
  return (
    <div>
      <Title title="CÁC DỰ ÁN YÊU THÍCH"></Title>
      <div className="p-8">
        <div className="border border-main-700 rounded-md p-4 flex gap-4 items-center relative">
          <IoClose
            title="Bỏ lưu"
            className="absolute top-2 right-2 h-10 w-10 text-gray-600 cursor-pointer rounded-md p-2 hover:bg-gray-200 "
          />
          <img src="" alt="" className="bg-gray-300 h-36 w-36" />
          <div className="flex flex-col justify-between h-36">
            <h1 className="font-bold">Properties.name</h1>
            <span className="flex items-center gap-3">
              <FcMoneyTransfer size={18} />
              <span>Properties.price</span>
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <IoBedOutline size={22} />
                <span>properties.bedRoom</span>
              </span>
              <span className="flex items-center gap-2">
                <PiBathtubDuotone size={22} />
                <span>properties.bedRoom</span>
              </span>
              <span className="flex items-center gap-3">
                <SlSizeFullscreen size={17} />
                <span>
                  properties.propertySize m
                  <span className="align-super text-xs">2</span>
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center gap-2">
                <span>rOwner.name</span>
                <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-purple-600">
                  Chủ sở hữu
                </span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span>rPostedBy.name</span>
                <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-green-600">
                  Môi giới
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;

import React from "react";
import { PropertyItem, Title } from "~/components";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";

const Dashboard = () => {
  return (
    <div>
      <Title title="CÁC DỰ ÁN ĐÃ ĐĂNG"></Title>
      <div className="p-8">
        <div className="border border-main-700 rounded-md p-4 flex items-center justify-between gap-4">
          <div className="flex gap-4 items-center">
            <img src="" alt="" className="bg-gray-300 h-36 w-36" />
            <div className="flex flex-col justify-between h-36 w-[500px]">
              <h1 className="font-bold">Properties.name</h1>
              <div className="flex items-center gap-10">
                <span className="flex items-center gap-3">
                  <FcMoneyTransfer size={18} />
                  <span>Properties.price</span>
                </span>
                <span className="flex items-center gap-3">
                  <SlSizeFullscreen size={17} />
                  <span>
                    properties.propertySize m
                    <span className="align-super text-xs">2</span>
                  </span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2">
                  <IoBedOutline size={22} />
                  <span>properties.bedRoom</span>
                </span>
                <span className="flex items-center gap-2">
                  <PiBathtubDuotone size={22} />
                  <span>properties.bedRoom</span>
                </span>
              </div>
              <span>
                Đã đăng vào lúc <span>Post.createdAt</span>
              </span>
            </div>
          </div>

          <div>
            <span>Properties.status</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

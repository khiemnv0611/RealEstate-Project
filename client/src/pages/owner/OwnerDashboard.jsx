import React, { useState } from "react";
import { Button, PropertyItem, Title } from "~/components";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Dashboard = () => {
  const [mode, setMode] = useState("PENDING");
  return (
    <div>
      <Title title="CÁC DỰ ÁN ĐÃ ĐĂNG"></Title>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setMode("PENDING")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-main-700",
              mode == "PENDING" && "font-bold"
            )
          )}
        >
          Chờ duyệt
        </Button>
        <Button
          onClick={() => setMode("APPROVED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-green-600",
              mode == "APPROVED" && "font-bold"
            )
          )}
        >
          Đã duyệt
        </Button>
        <Button
          onClick={() => setMode("CANCELLED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-red-600",
              mode == "CANCELLED" && "font-bold"
            )
          )}
        >
          Bị hủy
        </Button>
      </div>
      <div className="p-8">
        <div className="border border-main-700 rounded-md p-4 flex items-center justify-between">
          <div className="flex gap-4 items-center">
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
              <span>
                Đã đăng vào lúc{" "}
                <span className="font-semibold">Post.createdAt</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between h-36">
            <span className="text-end">Properties.status</span>
            <Button className="font-semibold border border-main-600 bg-white text-main-600 hover:underline hover:bg-main-600 hover:text-white">
              Chỉnh sửa bài đăng
            </Button>
            <Button className="font-semibold border border-red-600 bg-white text-red-600 hover:underline hover:bg-red-600 hover:text-white">
              Xóa bài đăng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

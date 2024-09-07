import React from "react";
import { Title } from "~/components";

const WishList = () => {
  return (
    <div>
      <Title title="CÁC DỰ ÁN YÊU THÍCH"></Title>
      <div className="p-8">
        <div className="border border-main-700 rounded-md p-4 flex items-center gap-4">
          <img src="" alt="" className="bg-gray-300 h-36 w-36" />
          <div className="flex flex-col justify-between h-36">
            <h1 className="font-bold">Properties.name</h1>
            <span>Properties.price</span>
            <div className="flex justify-center items-center gap-4">
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

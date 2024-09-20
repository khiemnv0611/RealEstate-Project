import React from "react";
import { Search } from "~/components";

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative">
        <img src="/banner.png" alt="banner" className="w-full object-cover" />
        <div className="absolute inset-0 text-white flex flex-col gap-8 items-center justify-center">
          <h1 className="text-5xl">Nơi Hạnh Phúc Bắt Đầu</h1>
          <p className="text-lg flex flex-col items-center justify-center">
            <span>Khám phá tổ ấm lý tưởng cho gia đình bạn</span>
            <span>Nơi từng khoảnh khắc đều trở thành kỷ niệm đáng giá.</span>
          </p>
        </div>
      </div>
      <Search />
      <div className="w-main h-96 mx-auto"></div>
    </div>
  );
};

export default Home;

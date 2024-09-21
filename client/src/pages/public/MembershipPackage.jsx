import React, { useState } from "react";
import LottieAnimations from "../../components/animations/LottieAnimations";

const MembershipPackage = () => {
  const price = 100000;
  const price1 = 500000;
  const price2 = 1000000;

  const animationUrls = [
    "https://lottie.host/7de3de7c-9f1c-4ec4-ac46-12361001f03a/TqD6vgPdRv.json", //0
    "https://lottie.host/f53882b9-05d5-4d1a-90dc-97f6734eebe9/FJVn4cHrZb.json", //1
    "https://lottie.host/86a9338d-42b8-42ed-8feb-39535315362a/kKEbkl1JOe.json", //2
  ];

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/properties_banner.png"
          alt=""
          className="w-full object-contain"
          onLoad={handleImageLoad}
        />
        {isImageLoaded && (
          <div className="absolute inset-0 text-white flex justify-center items-center">
            <h1 className="text-[48px] font-medium -mt-10">Gói Hội viên</h1>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full relative gap-6">
        <div className="min-w-[460px] flex flex-col gap-6 rounded-md -mt-10 bg-white shadow-lg p-6 transition-transform border border-transparent transform hover:-translate-y-4 hover:shadow-2xl hover:border-blue-700 h-96">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 font-bold">
                <span>Hội viên</span>
                <span>MembershipPlans.name</span>
              </div>
              <span>description</span>
            </div>
            <div className="w-24 h-24">
              <LottieAnimations urls={animationUrls} index={0} />
            </div>
          </div>
          <div>
            <span className="text-4xl">
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span>đ/tháng</span>
          </div>
          <div className="px-4 py-3 w-full font-bold text-center border border-main-800 text-main-700 rounded-md hover:bg-main-300">
            Mua ngay
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">limitPost</span>
              <span>tin đăng / tuần</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Thời gian mỗi bài:</span>
              <span className="font-semibold">postDate</span>
            </div>
          </div>
        </div>
        <div className="min-w-[460px] flex flex-col gap-6 rounded-md -mt-10 bg-white shadow-lg p-6 transition-transform border border-transparent transform hover:-translate-y-4 hover:shadow-2xl hover:border-blue-700 h-96">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 font-bold">
                <span>Hội viên</span>
                <span>MembershipPlans.name</span>
              </div>
              <span>description</span>
            </div>
            <div className="w-24 h-24">
              <LottieAnimations urls={animationUrls} index={1} />
            </div>
          </div>
          <div>
            <span className="text-4xl">
              {price1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span>đ/tháng</span>
          </div>
          <div className="px-4 py-3 w-full font-bold text-center border border-main-800 text-main-700 rounded-md hover:bg-main-300">
            Mua ngay
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">limitPost</span>
              <span>tin đăng / tuần</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Thời gian mỗi bài:</span>
              <span className="font-semibold">durian</span>
            </div>
          </div>
        </div>
        <div className="min-w-[460px] flex flex-col gap-6 rounded-md -mt-10 bg-white shadow-lg p-6 transition-transform border border-transparent transform hover:-translate-y-4 hover:shadow-2xl hover:border-blue-700 h-96">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 font-bold">
                <span>Hội viên</span>
                <span>MembershipPlans.name</span>
              </div>
              <span>description</span>
            </div>
            <div className="w-24 h-24">
              <LottieAnimations urls={animationUrls} index={2} />
            </div>
          </div>
          <div>
            <span className="text-4xl">
              {price2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span>đ/tháng</span>
          </div>
          <div className="px-4 py-3 w-full font-bold text-center border border-main-800 text-main-700 rounded-md hover:bg-main-300">
            Mua ngay
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">limitPost</span>
              <span>tin đăng / tuần</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Thời gian mỗi bài:</span>
              <span className="font-semibold">durian</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-16"></div>
    </div>
  );
};

export default MembershipPackage;

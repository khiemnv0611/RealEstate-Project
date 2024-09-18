import React, { useState } from "react";
import { BreadCrumb } from "~/components";

const OurAgents = () => {
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
          <div className="absolute inset-0 text-white flex flex-col justify-center items-center">
            <h1 className="text-[48px] font-medium">Môi Giới</h1>
            <div>
              <BreadCrumb />
            </div>
          </div>
        )}
      </div>
      <div className="w-main mx-auto my-16"></div>
    </div>
  );
};

export default OurAgents;

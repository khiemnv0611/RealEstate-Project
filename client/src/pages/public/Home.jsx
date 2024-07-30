import React from "react";

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative">
        <img src="/banner.png" alt="banner" />
        <div className="absolute inset-0 text-white flex flex-col gap-8 items-center justify-center">
          <h1 className="text-5xl">Find Your Dream Home</h1>
          <p className="text-lg flex flex-col items-center justify-center">
            <span>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere
            </span>
            <span>
              cubilia curae; Proin sodales ultrices nulla blandit volutpat.
            </span>
          </p>
        </div>
      </div>
      <div className="w-main mx-auto">Content</div>
    </div>
  );
};

export default Home;

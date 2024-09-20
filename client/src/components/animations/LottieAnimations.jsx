import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({ url }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setAnimationData(data);
    };
    fetchData();
  }, [url]);

  return (
    <div>
      {animationData ? (
        <Lottie animationData={animationData} loop={true} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const LottieAnimations = ({ urls, index }) => {
  const url = urls[index]; // Lấy URL từ chỉ số

  return (
    <div>
      <LottieAnimation url={url} />
    </div>
  );
};

export default LottieAnimations;

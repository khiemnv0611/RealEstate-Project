import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose } from "react-icons/io5";

const ImageDetail = ({ images = [], onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: (i) => (
      <div className="w-4 h-4 bg-white rounded-full mt-5"></div>
    ),
    dotsClass: "slick-dots custom-dots",
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-overlay-70 w-screen h-screen mx-auto flex flex-col items-center justify-between gap-4"
    >
      <div className="h-10 w-full flex items-center justify-end text-white p-10">
        <IoClose onClick={onClose} className="cursor-pointer" size={40} />
      </div>
      <Slider {...settings} className="w-full max-w-2xl">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="text-white text-2xl font-bold p-4">
        {currentSlide + 1}/{images.length}
      </div>
    </div>
  );
};

export default ImageDetail;

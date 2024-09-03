import React, { memo } from "react";
import { Button, ImageDetail } from "..";
import { FaListUl } from "react-icons/fa";
import { useAppStore } from "~/store/useAppStore";

const Images = ({ images = [] }) => {
  const { setModal } = useAppStore();
  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <div className="w-full relative grid grid-cols-4 grid-rows-2 gap-2">
      {images[0] && (
        <img
          src={images[0]}
          alt="Main Image"
          className="w-full h-full col-span-2 row-span-2 rounded-l-md object-cover"
        />
      )}
      {images[1] && (
        <img
          src={images[1]}
          alt="Thumbnail 1"
          className="w-full h-full col-span-1 row-span-1 object-cover"
        />
      )}
      {images[2] && (
        <img
          src={images[2]}
          alt="Thumbnail 2"
          className="w-full h-full col-span-1 row-span-1 rounded-tr-md object-cover"
        />
      )}
      {images[3] && (
        <img
          src={images[3]}
          alt="Thumbnail 3"
          className="w-full h-full col-span-1 row-span-1 object-cover"
        />
      )}
      {images[4] && (
        <img
          src={images[4]}
          alt="Thumbnail 4"
          className="w-full h-full col-span-1 row-span-1 rounded-br-md object-cover"
        />
      )}
      <div className="absolute bottom-6 right-5">
        <Button
          onClick={() =>
            setModal(
              true,
              <ImageDetail images={images} onClose={handleCloseModal} />
            )
          }
          className="bg-white border-main-500 text-main-500 hover:bg-main-500 hover:text-white hover:border-white font-semibold"
        >
          <FaListUl />
          <span>Hiển thị tất cả ảnh</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(Images);

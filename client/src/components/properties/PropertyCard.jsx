import React, { useState, useEffect } from "react";
import { formatMoney } from "~/utils/fn";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import path from "~/utils/path";
import { addPropertyToWishList, isPropertyInWishList } from "~/apis/user";
import { toast } from "react-toastify";

const PropertyCard = ({ properties }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkWishListStatus = async () => {
      try {
        const response = await isPropertyInWishList(properties.id);
        if (response?.isInWishList) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };
    checkWishListStatus();
  }, [properties.id]);

  const handleFavoriteToggle = async () => {
    try {
      const response = await addPropertyToWishList(properties.id);
      setIsFavorite((prevFavorite) => {
        const newFavorite = !prevFavorite;

        if (newFavorite) {
          toast.success("Đã thêm vào danh sách yêu thích.");
        } else {
          toast.info("Đã xóa khỏi danh sách yêu thích.");
        }

        return newFavorite;
      });
    } catch (error) {
      console.error("Error while updating wishlist", error);
      toast.error("Có lỗi xảy ra khi thêm/xóa khỏi danh sách yêu thích.");
    }
  };

  return (
    <div className="border rounded-md">
      <img
        src={properties?.featuredImage}
        alt=""
        className="w-full h-[240px] object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col gap-5">
        <Link
          to={`/${path.PROPERTIES}/${properties.id}`}
          state={{ name: properties.name }}
          className="text-xl hover:underline font-semibold line-clamp-2 min-h-[2.8em] uppercase text-gray-700"
        >
          {properties?.name}
        </Link>
        <span className="flex items-center justify-between font-bold ">
          <div className="flex items-center gap-2 text-main-500">
            <FcMoneyTransfer size={18} />
            {`${formatMoney(properties?.price)}`}
            <span>VND</span>
          </div>
          <div>
            <FaHeart
              className={`cursor-pointer ${
                isFavorite ? "text-red-500" : "text-gray-300"
              } hover:text-red-500`}
              size={22}
              onClick={handleFavoriteToggle}
            />
          </div>
        </span>
        <div className="flex justify-between items-center font-semibold">
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-gray-500">
              <IoBedOutline size={22} />
              <span>{properties?.bedRoom}</span>
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <PiBathtubDuotone size={22} />
              <span>{properties?.bathRoom}</span>
            </span>
          </div>
          <span className="flex items-center gap-3 text-gray-500">
            <SlSizeFullscreen size={17} />
            <span>
              {properties?.propertySize}m
              <span className="align-super text-xs">2</span>
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={properties?.rPostedBy?.avatar}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="text-gray-500 text-sm">
                {properties?.rPostedBy?.name}
              </span>
            </div>
            <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-green-600">
              Môi giới
            </span>
          </div>
          <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
            <FaEye />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={properties?.rOwner?.avatar}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="text-gray-500 text-sm">
                {properties?.rOwner?.name}
              </span>
            </div>
            <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-purple-600">
              Chủ sở hữu
            </span>
          </div>
          <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
            <FaEye />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

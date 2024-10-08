import React, { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { Button, Title } from "~/components";
import { IoClose } from "react-icons/io5";
import { getWishListByCurrentUser, addPropertyToWishList } from "~/apis/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import path from "~/utils/path";
import { GrLocation } from "react-icons/gr";

const WishList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getWishListByCurrentUser();
      if (response.success) {
        setProperties(response.wishlist);
      } else {
        alert("Could not fetch wishlist.");
      }
    };
    fetchProperties();
  }, []);

  const handleFavoriteToggle = async (property) => {
    try {
      const response = await addPropertyToWishList(property.id, {
        owner: property.rOwner.id,
      });
      if (response.success) {
        toast.success("Đã xóa khỏi danh mục yêu thích.");
        const refresheddata = await getWishListByCurrentUser();
        if (refresheddata.success) {
          setProperties(refresheddata.wishlist);
        } else {
          toast.error("Không thể tải danh sách yêu thích.");
        }
      } else {
        toast.error("Ôi không! Có lỗi xảy ra.");
      }
    } catch (error) {
      console.error("Error while updating wishlist", error);
      toast.error("Có lỗi xảy ra khi thêm/xóa khỏi danh sách yêu thích.");
    }
  };

  return (
    <div className="bg-gray-200 px-8 h-full">
      <Title title="CÁC DỰ ÁN YÊU THÍCH"></Title>
      {properties?.map((property) => (
        <div className="p-8">
          <div className="border shadow-lg rounded-md p-4 flex gap-4 items-center relative bg-white">
            <IoClose
              className="absolute top-2 right-2 h-10 w-10 text-gray-600 cursor-pointer rounded-md p-2 hover:bg-gray-200 "
              onClick={() => handleFavoriteToggle(property)}
            />
            <Link
              to={`/${path.PROPERTIES}/${property.id}`}
              state={{ featuredImage: property.featuredImage }}
            >
              <img
                src={property.featuredImage}
                alt=""
                className="bg-gray-300 h-36 w-36"
              />
            </Link>
            <div className="flex flex-col justify-between h-36">
              <Link
                to={`/${path.PROPERTIES}/${property.id}`}
                state={{ name: property.name }}
                className="font-bold hover:underline"
              >
                {property.name}
              </Link>
              <span className="flex items-center gap-3">
                <FcMoneyTransfer size={18} />
                <span>{property.price}</span>
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <IoBedOutline size={22} />
                  <span>{property.bedRoom}</span>
                </span>
                <span className="flex items-center gap-2">
                  <PiBathtubDuotone size={22} />
                  <span>{property.bedRoom}</span>
                </span>
                <span className="flex items-center gap-3">
                  <SlSizeFullscreen size={17} />
                  <span>
                    {property.propertySize} m
                    <span className="align-super text-xs">2</span>
                  </span>
                </span>
              </div>
              <span className="flex items-center gap-3">
                <GrLocation size={20} />
                <span>
                  {property.address}
                  <span>{property.city ? `, ${property.city}` : ""}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;

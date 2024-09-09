import React, { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { Button, Title } from "~/components";
import { IoClose } from "react-icons/io5";
import { getWishListByCurrentUser, addPropertyToWishList } from "~/apis/user";

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

  const handleFavoriteToggle = async (id) => {
    try {
      const response = await addPropertyToWishList(id);
      if (response.success) {
        // alert("Successfully toggled property in wishlist");
        const refresheddata = await getWishListByCurrentUser();
        if (refresheddata.success) {
          setProperties(refresheddata.wishlist);
        } else {
          alert("Could not fetch wishlist.");
        }
      } else {
        alert("Ôi không!");
      }
    } catch (error) {
      console.error("Error while updating wishlist", error);
      alert("Có lỗi xảy ra khi thêm/xóa khỏi danh sách yêu thích");
    }
  };

  return (
    <div>
      <Title title="CÁC DỰ ÁN YÊU THÍCH"></Title>
      {properties?.map((property) => (
        <div className="p-8">
          <div className="border border-main-700 rounded-md p-4 flex gap-4 items-center relative">
            <IoClose
              title="Bỏ lưu"
              className="absolute top-2 right-2 h-10 w-10 text-gray-600 cursor-pointer rounded-md p-2 hover:bg-gray-200 "
              onClick={() => handleFavoriteToggle(property.id)}
            />
            <img src={property.featuredImage} alt="" className="bg-gray-300 h-36 w-36" />
            <div className="flex flex-col justify-between h-36">
              <h1 className="font-bold">{property.name}</h1>
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
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center gap-2">
                  <span>{property.rOwner.name}</span>
                  <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-purple-600">
                    Chủ sở hữu
                  </span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span>{property.rPostedBy.name}</span>
                  <span className="px-3 py-1 text-sm text-white flex items-center justify-center bg-green-600">
                    Môi giới
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))};
    </div>
  );
};

export default WishList;
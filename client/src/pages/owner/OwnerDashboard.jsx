import React, { useState, useEffect } from "react";
import { Button, PropertyItem, Title } from "~/components";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { apiGetPropertiesByOwner, apiDeleteProperty } from "~/apis/properties";

const Dashboard = () => {
  const [mode, setMode] = useState("PENDING");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await apiGetPropertiesByOwner();
      if (response.success) {
        setProperties(response.properties.rows);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    // Lọc các dự án theo giá trị của mode
    const filterByStatus = () => {
      const filtered = properties.filter(
        (property) => {
          if (mode === "PENDING") return property.status === "Chờ duyệt";
          if (mode === "APPROVED") return property.status === "Đã duyệt";
          if (mode === "CANCELLED") return property.status === "Bị hủy";
          return true;
        }
      );
      setFilteredProperties(filtered);
    };
    
    filterByStatus();
  }, [mode, properties]);

  const handleDeleteProperty = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?");
    if (confirmDelete) {
      const response = await apiDeleteProperty(id);
      if (response.success) {
        setProperties(properties.filter((property) => property.id !== id));
      } else {
        alert("Xóa bài đăng không thành công!");
      }
    }
  };

  return (
    <div>
      <Title title="CÁC DỰ ÁN ĐÃ ĐĂNG"></Title>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setMode("PENDING")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-main-700",
              mode === "PENDING" && "font-bold"
            )
          )}
        >
          Chờ duyệt
        </Button>
        <Button
          onClick={() => setMode("APPROVED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-green-600",
              mode === "APPROVED" && "font-bold"
            )
          )}
        >
          Đã duyệt
        </Button>
        <Button
          onClick={() => setMode("CANCELLED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-red-600",
              mode === "CANCELLED" && "font-bold"
            )
          )}
        >
          Bị hủy
        </Button>
      </div>

      {filteredProperties?.map((property) => (
        <div className="p-8" key={property.id}>
          <div className="border border-main-700 rounded-md p-4 flex items-center justify-between">
            <div className="flex gap-4 items-center">
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
                    <span>{property.bathRoom}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <SlSizeFullscreen size={17} />
                    <span>
                      {property.propertySize}
                      <span className="align-super text-xs">m²</span>
                    </span>
                  </span>
                </div>
                <span>
                  Đã đăng vào lúc{" "}
                  <span className="font-semibold">{new Date(property.createdAt).toLocaleString()}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between h-36">
              <span className="text-end">{property.status}</span>
              <Button className="font-semibold border border-main-600 bg-white text-main-600 hover:underline hover:bg-main-600 hover:text-white">
                Chỉnh sửa bài đăng
              </Button>
              <Button
                onClick={() => handleDeleteProperty(property.id)} 
                className="font-semibold border border-red-600 bg-white text-red-600 hover:underline hover:bg-red-600 hover:text-white"
              >
                Xóa bài đăng
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

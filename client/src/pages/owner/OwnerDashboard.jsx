import React, { useState, useEffect } from "react";
import { Button, PropertyItem, Title } from "~/components";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubDuotone } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { apiGetPropertiesByOwner, apiDeleteProperty } from "~/apis/properties";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import path from "~/utils/path";
import { useUserStore } from "~/store/useUserStore";

const Dashboard = () => {
  const [mode, setMode] = useState("PENDING");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { current } = useUserStore();

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
      const filtered = properties.filter((property) => {
        if (mode === "PENDING") return property.status === "Chờ duyệt";
        if (mode === "APPROVED") return property.status === "Đã duyệt";
        if (mode === "CANCELLED") return property.status === "Bị hủy";
        return true;
      });
      setFilteredProperties(filtered);
    };

    filterByStatus();
  }, [mode, properties]);

  const handleDeleteProperty = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa bài đăng này?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Có, xóa!",
      cancelButtonText: "Hủy",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const response = await apiDeleteProperty(id);
          if (response.success) {
            setProperties(properties.filter((property) => property.id !== id));
            toast.success("Xóa bài đăng thành công.");
          } else {
            toast.error("Xóa bài đăng không thành công!");
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra!");
        }
      }
    });
  };

  return (
    <div className="bg-gray-200 px-8 h-full">
      <Title title={`CÁC DỰ ÁN ĐÃ ĐĂNG ${properties.filter((property) => property.status !== "Bị hủy").length}/${current.membershipPlan.postLimit}`}></Title>
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
          <div className="border shadow-lg rounded-md p-4 flex items-center justify-between bg-white">
            <div className="flex gap-4 items-center">
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
                  <span className="font-semibold">
                    {new Date(property.createdAt).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between h-36">
              <div
                className={twMerge(
                  "px-3 py-1 text-sm rounded-3xl font-semibold flex items-center justify-center max-w-fit self-end",
                  clsx({
                    "bg-blue-400": property.status === "Chờ duyệt",
                    "bg-green-600": property.status === "Đã duyệt",
                    "bg-red-600": property.status === "Bị hủy",
                    "bg-main-100": ![
                      "Chờ duyệt",
                      "Đã duyệt",
                      "Bị hủy",
                    ].includes(property.status),
                  })
                )}
              >
                <span>{property.status}</span>
              </div>
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

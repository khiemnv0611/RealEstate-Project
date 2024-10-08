import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { apiGetProperties } from "~/apis/properties";
import {
  BreadCrumb,
  Button,
  InputSelect,
  PropertyCard,
  Search,
} from "~/components";
import { Pagination } from "~/components/paginations";
import { CiBoxList } from "react-icons/ci";
import { useAppStore } from "~/store/useAppStore";

const Properties = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const [properties, setProperties] = useState();
  const [mode, setMode] = useState("ALL");
  // const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchParams] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const sort = watch("sort");
  const navigate = useNavigate();
  const { setModal } = useAppStore();
  useEffect(() => {
    const fetchProperties = async (params) => {
      const response = await apiGetProperties({
        limit: 9,
        ...params,
      });
      if (response.success) setProperties(response.properties);
    };
    const params = Object.fromEntries([...searchParams]);
    if (params.price) params.price = searchParams.getAll("price");
    if (sort) params.sort = sort;

    if (mode && mode !== "ALL") {
      params.listingType = mode === "RENT" ? "Cho thuê" : "Bán";
    }

    fetchProperties(params);
  }, [searchParams, sort, mode]);

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
            <h1 className="text-[48px] font-medium">Dự Án</h1>
            <div>
              <BreadCrumb />
            </div>
          </div>
        )}
      </div>
      <div className="w-main mx-auto my-16">
        <div className="my-4 flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <span
              onClick={() => setModal(true, <Search direction="vertical" />)}
              className="cursor-pointer "
            >
              <CiBoxList size={22} />
            </span>
            <InputSelect
              register={register}
              id="sort"
              errors={errors}
              placeholder="Thứ tự"
              options={[
                { label: "Mới nhất", code: "-createdAt" },
                { label: "Cũ hơn", code: "createdAt" },
                { label: "A - Z", code: "name" },
                { label: "Z - A", code: "-name" },
              ]}
              containerClassname="flex-row items-center gap-2"
              label="Sắp xếp: "
              inputClassname="w-fit rounded-md"
            />
            <Button
              onClick={() => navigate(location.pathname)}
              className="whitespace-nowrap py-2"
            >
              Làm mới
            </Button>
          </div>
          <div className="flex items-center gap-4">
          <Button
            onClick={() => setMode("ALL")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-gray-900",
                mode == "ALL" && "font-bold"
              )
            )}
          >
            Tất cả
          </Button>
          <Button
            onClick={() => setMode("RENT")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-gray-900",
                mode == "RENT" && "font-bold"
              )
            )}
          >
            Cho Thuê
          </Button>
          <Button
            onClick={() => setMode("SALE")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-gray-900",
                mode == "SALE" && "font-bold"
              )
            )}
          >
            Bán
          </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination
            total={properties?.count}
            limit={properties?.limit}
            page={properties?.page}
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;

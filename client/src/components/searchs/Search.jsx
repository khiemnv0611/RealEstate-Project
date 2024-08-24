import React, { useState } from "react";
import { Button, InputForm, InputSelect, SearchItem } from "..";
import { useForm } from "react-hook-form";
import SelectLib from "../inputs/SelectLib";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import { FaAngleDown } from "react-icons/fa6";
import withRouter from "~/hocs/withRouter";
import path from "~/utils/path";
import { createSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Search = ({ navigate, direction = "horizontal" }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const { propertyTypes } = usePropertiesStore();
  const [isShowPopupPrice, setIsShowPopupPrice] = useState(false);
  const handleSearchParams = (data) => {
    const { start, end, address, propertyType } = data;
    const params = new Object();
    if (address) params.address = address;
    if (propertyType) params.propertyTypeId = data.propertyType.id;
    if (start && !end) params.price = [+start, Math.pow(10, 9)];
    if (end && !start) params.price = [0, +end];
    if (start && end) params.price = [+start, +end];

    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    });
  };
  return (
    <form
      className={twMerge(
        clsx(
          "bg-white py-8 grid grid-cols-4 rounded-md shadow-lg mx-auto -mt-[4em] relative z-20"
        ),
        direction === "vertical" ? "flex flex-col gap-4 h-fit w-[400px]" : "",
        direction === "horizontal" ? "grid grid-cols-4 h-[8em] w-[1096px]" : ""
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchItem className="items-start justify-start" title="Địa chỉ">
        <InputForm
          id="address"
          register={register}
          errors={errors}
          placeholder="Nhập địa chỉ"
          containerClassname="w-[15em]"
          inputClassname="rounded-md border border-gray-300"
        />
      </SearchItem>
      <SearchItem title="Loại hình dự án">
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname="w-[15em]"
          inputClassname="rounded-md border border-gray-300"
          placeholder="Chọn loại hình dự án"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("propertyType", val)}
        />
      </SearchItem>
      <SearchItem title="Mức giá">
        {isShowPopupPrice && (
          <div className="absolute bg-white flex flex-col gap-6 drop-shadow p-4 rounded-md top-full right-0 left-0">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Nhập mức mức giá</span>
              <div className="grid grid-cols-2 gap-3">
                <InputForm id="start" register={register} errors={errors} />
                <InputForm id="end" register={register} errors={errors} />
              </div>
            </div>
            {/* <div className="flex flex-col gap-2">
              <span className="font-semibold">Chọn mức giá</span>
              <input
                className="w-full"
                type="range"
                id="priceRange"
                {...register("priceRange")}
              />
            </div> */}
          </div>
        )}
        <Button
          onClick={() => setIsShowPopupPrice((prev) => !prev)}
          className="bg-white text-gray-500 border border-[#cccccc] w-[240px] h-[38px] flex justify-between px-2 py-0.5"
        >
          <span>Chọn mức giá</span>
          <FaAngleDown className="text-gray-400" />
        </Button>
      </SearchItem>
      <div className="flex items-center justify-center">
        <Button onClick={handleSubmit(handleSearchParams)} className="px-8">
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
};

export default withRouter(Search);

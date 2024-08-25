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
import { useAppStore } from "~/store/useAppStore";

const Search = ({ navigate, direction = "horizontal" }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const { setModal } = useAppStore();
  const { propertyTypes } = usePropertiesStore();
  const [isShowPopupPrice, setIsShowPopupPrice] = useState(false);
  const handleSearchParams = (data) => {
    const { start, end, address, propertyType } = data;
    const params = new Object();
    if (address) params.address = address;
    if (propertyType) params.propertyTypeId = data.propertyType.id;
    if (start && !end) params.price = ["gte", +start]; // greater than equal
    if (end && !start) params.price = ["lte", +end]; // less than equal
    if (start && end) params.price = [+start, +end];
    if (direction === "vertical") setModal(false, null);

    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    });
  };
  return (
    <form
      className={twMerge(
        clsx(
          "bg-white py-4 grid grid-cols-4 rounded-md shadow-lg mx-auto -mt-[4em] relative z-20"
        ),
        direction === "vertical"
          ? "flex flex-col gap-4 h-fit w-[400px] px-8"
          : "",
        direction === "horizontal" ? "grid grid-cols-4 h-[8em] w-[1096px]" : ""
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Địa chỉ"
      >
        <InputForm
          id="address"
          register={register}
          errors={errors}
          placeholder="Nhập địa chỉ"
          containerClassname={direction === "vertical" ? "w-full" : "w-[15em]"}
          inputClassname="rounded-md border border-gray-300"
        />
      </SearchItem>
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Loại hình dự án"
      >
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname={direction === "vertical" ? "w-full" : "w-[15em]"}
          inputClassname="rounded-md border border-gray-300"
          placeholder="Chọn loại hình dự án"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("propertyType", val)}
        />
      </SearchItem>
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Mức giá"
      >
        {isShowPopupPrice && (
          <div className="absolute bg-white flex flex-col gap-6 drop-shadow p-4 rounded-md top-full right-0 left-0">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Nhập mức mức giá</span>
              <div className="grid grid-cols-2 gap-3">
                <InputForm id="start" register={register} errors={errors} />
                <InputForm id="end" register={register} errors={errors} />
              </div>
            </div>
          </div>
        )}
        <Button
          onClick={() => setIsShowPopupPrice((prev) => !prev)}
          className={twMerge(
            clsx(
              "bg-white text-gray-500 border border-[#cccccc] h-[38px] flex justify-between px-2 py-0.5",
              direction === "vertical" ? "w-full hidden" : "w-[15em]"
            )
          )}
        >
          <span>Chọn mức giá</span>
          <FaAngleDown className="text-gray-400" />
        </Button>
        {direction === "vertical" && (
          <div className="grid grid-cols-2 gap-3 w-full">
            <InputForm
              inputClassname="border-gray-300 rounded-md"
              id="start"
              register={register}
              errors={errors}
              placeholder="Nhập giá bắt đầu"
            />
            <InputForm
              inputClassname="border-gray-300 rounded-md"
              id="end"
              register={register}
              errors={errors}
              placeholder="Nhập giá kết thúc"
            />
          </div>
        )}
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

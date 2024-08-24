import React from "react";
import { Button, InputForm, InputSelect, SearchItem } from "..";
import { useForm } from "react-hook-form";
import SelectLib from "../inputs/SelectLib";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import { FaAngleDown } from "react-icons/fa6";

const Search = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const { propertyTypes } = usePropertiesStore();
  const propertyType = watch("propertyType");
  // const onChangeCustom = (id, value) => setValue(id, value)
  return (
    <form className="bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] -mt-[4em] relative z-20">
      <SearchItem title="Thành phố">
        <InputForm
          id="city"
          register={register}
          errors={errors}
          placeholder="Nhập tên thành phố"
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
        <div className="absolute bg-white flex flex-col gap-6 drop-shadow p-4 rounded-md top-full right-0 left-0">
          <div className="flex flex-col gap-2">
            <span>Chọn mức giá</span>
            <div className="grid grid-cols-2 gap-3">
              <InputForm id="start" register={register} errors={errors} />
              <InputForm id="end" register={register} errors={errors} />
            </div>
          </div>
          <div>
            <input className="w-full" type="range" />
          </div>
        </div>
        <Button className="bg-white text-gray-500 border border-[#cccccc] w-[240px] h-[38px] flex justify-between px-2 py-0.5">
          <span>Chọn mức giá</span>
          <FaAngleDown className="text-gray-400" />
        </Button>
      </SearchItem>
      <div className="flex items-center justify-center">
        <Button
          onClick={handleSubmit((data) => console.log(data))}
          className="px-8"
        >
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
};

export default Search;

import React from "react";
import { Button, InputForm, InputSelect, SearchItem } from "..";
import { useForm } from "react-hook-form";

const Search = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] -mt-[4em] relative z-20">
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
        <InputSelect
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname="w-[15em]"
          inputClassname="rounded-md border border-gray-300"
          placeholder="Chọn loại hình dự án"
        />
      </SearchItem>
      <SearchItem title="Mức giá">
        <InputSelect
          id="price"
          register={register}
          errors={errors}
          containerClassname="w-[15em]"
          inputClassname="rounded-md border border-gray-300"
          placeholder="Chọn mức giá"
        />
      </SearchItem>
      <div className="flex items-center justify-center">
        <Button className="px-8">Tìm kiếm</Button>
      </div>
    </div>
  );
};

export default Search;

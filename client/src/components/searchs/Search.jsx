import React from "react";
import { Button, InputForm, SearchItem } from "..";
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
        // id=''
        />
      </SearchItem>
      <SearchItem title="Loại dự án" />
      <SearchItem title="Phạm vị giá" />
      <div className="flex - items-center justify-center">
        <Button>Tìm kiếm</Button>
      </div>
    </div>
  );
};

export default Search;

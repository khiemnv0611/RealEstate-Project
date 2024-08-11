import React from "react";
import {
  Button,
  InputFile,
  InputForm,
  InputText,
  Textarea,
  Title,
} from "~/components";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";

const CreatePropertyType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const handleCreateNewPropertyType = (data) => {
    console.log(data);
  };
  return (
    <div className="px-8">
      <Title title="Thêm Loại Dự Án Mới">
        <Button onClick={handleSubmit(handleCreateNewPropertyType)}>
          <FaPlus />
          <span>Thêm</span>
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4">
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không được để trống" }}
          label="Tên loại dự án"
        />
        <Textarea
          id="discription"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không được để trống." }}
          label="Mô tả"
        />
        <InputFile
          id="images"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không được để trống." }}
          label="Hình ảnh"
          multiple={true}
          getImages={(images) =>
            setValue(
              "images",
              images?.map((el) => el.path)
            )
          }
        />
      </form>
    </div>
  );
};

export default CreatePropertyType;

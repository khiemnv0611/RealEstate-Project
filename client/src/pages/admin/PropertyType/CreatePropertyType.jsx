import React, { useState } from "react";
import { Button, InputFile, InputForm, Textarea, Title } from "~/components";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { apiCreatePropertyType } from "~/apis/propertyType";
import { toast } from "react-toastify";

const CreatePropertyType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const [resetKey, setResetKey] = useState(Date.now()); // Sử dụng thời gian hiện tại làm key duy nhất

  const handleCreateNewPropertyType = async (data) => {
    if (!data.images || data.images.length === 0) {
      setError("images", {
        message: "Trường này không được để trống!",
        type: "required",
      });
    } else {
      const { images, ...payload } = data;
      const response = await apiCreatePropertyType({
        ...payload,
        image: images[0],
      });

      // Thông báo
      if (response.success) {
        toast.success(response.mes);
        reset();
        setResetKey(Date.now()); // Thay đổi key để reset InputFile
      } else toast.error(response.mes);
    }
  };

  const getImages = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };

  return (
    <div className="px-8">
      <Title title="TẠO MỚI LOẠI DỰ ÁN">
        <Button
          className="font-bold"
          onClick={handleSubmit(handleCreateNewPropertyType)}
        >
          <FaPlus />
          <span>Tạo</span>
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
          id="description"
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
          getImages={getImages}
          resetKey={resetKey} // Truyền thuộc tính resetKey
        />
      </form>
    </div>
  );
};

export default CreatePropertyType;

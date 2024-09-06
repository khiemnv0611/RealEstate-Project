import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BreadCrumb,
  InputFile,
  InputForm,
  InputSelect,
  Textarea,
} from "~/components";

const AddPost = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
  } = useForm();

  const getImages = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "avatar",
      images?.map((el) => el.path)
    );
  };

  const [resetKey, setResetKey] = useState(Date.now()); // Sử dụng thời gian hiện tại làm key duy nhất

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/properties_banner.png"
          alt=""
          className="w-full object-contain"
        />
        <div className="absolute inset-0 text-white flex flex-col justify-center items-center">
          <h1 className="text-[48px] font-medium">Đăng Tin</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto p-16">
        <form className="space-y-4">
          <InputForm
            id="name"
            register={register}
            validate={{ required: "Trường này không được để trống" }}
            errors={errors}
            label="Tên dự án"
            placeholder="Nhập tên dự án..."
            required
          />
          <Textarea
            id="description"
            register={register}
            validate={{ required: "Trường này không được để trống" }}
            errors={errors}
            label="Mô tả"
            placeholder="Nhập mô tả..."
            required
          />
          <InputForm
            id="address"
            register={register}
            validate={{ required: "Trường này không được để trống" }}
            errors={errors}
            label="Địa chỉ"
            placeholder="Nhập số nhà, tên đường..."
            required
          />
          <div className="grid grid-cols-3">
            <InputForm
              id="ward"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Phường / Xã"
              placeholder="Nhập phường / xã..."
              inputClassname="w-4/5"
              required
            />
            <InputForm
              id="district"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Quận / Huyện"
              placeholder="Nhập quận / huyện..."
              required
              inputClassname="w-4/5"
            />
            <InputSelect
              register={register}
              id="city"
              errors={errors}
              placeholder="Chọn thành phố"
              label="Thành phố"
              inputClassname="w-4/5"
              required
            />
          </div>
          <InputSelect
            register={register}
            id="listingType"
            errors={errors}
            placeholder="Chọn loại giao dịch"
            label="Loại giao dịch "
            options={[
              { label: "Bán", code: "" },
              { label: "Cho thuê", code: "" },
            ]}
            required
          />
          <InputForm
            id="price"
            register={register}
            validate={{ required: "Trường này không được để trống" }}
            errors={errors}
            label="Giá"
            placeholder="Nhập giá..."
            required
          />
          <InputFile
            id="images"
            register={register}
            errors={errors}
            validate={{ required: "Trường này không được để trống." }}
            label="Hình ảnh"
            getImages={getImages}
            required
            resetKey={resetKey} // Truyền thuộc tính resetKey
          />
          <InputFile
            id="featureImage"
            register={register}
            errors={errors}
            validate={{ required: "Trường này không được để trống." }}
            label="Nội thất"
            getImages={getImages}
            required
            resetKey={resetKey} // Truyền thuộc tính resetKey
          />
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;

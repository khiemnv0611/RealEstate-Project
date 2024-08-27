import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputFile, InputForm, Title } from "~/components";
import { useUserStore } from "~/store/useUserStore";

const Personal = () => {
  const { current } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm();
  useEffect(() => {
    if (current) {
      reset({
        name: current.name,
        address: current.address,
        email: current.email,
        phone: current.phone,
        avatar: current.avatar,
      });
    }
  }, [current]);
  const getImages = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };
  console.log(current);
  return (
    <div className="h-full px-8">
      <Title title="THÔNG TIN CÁ NHÂN"></Title>
      <form className="p-4 max-w-[600px] space-y-4">
        <InputForm
          id="name"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Họ và tên"
          required
          placeholder="Nhập họ và tên..."
        />
        <InputForm
          id="phone"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Số điện thoại"
          required
          placeholder="Nhập số điện thoại..."
          readOnly={!current?.userRoles?.some((el) => el.roleCode === "ROL7")}
        />
        <InputForm
          id="email"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Email"
          required
          placeholder="Nhập email..."
        />
        <InputForm
          id="address"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Địa chỉ"
          required
          placeholder="Nhập địa chỉ..."
        />
        <InputFile
          id="images"
          register={register}
          errors={errors}
          validate={{ required: "Trường này không được để trống." }}
          label="Ảnh đại diện"
          getImages={getImages}
        />
      </form>
    </div>
  );
};

export default Personal;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUpdateProfile } from "~/apis/user";
import { Button, InputFile, InputForm, Title } from "~/components";
import { useUserStore } from "~/store/useUserStore";

const Personal = () => {
  const { current, getCurrent } = useUserStore();
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
  } = useForm();
  const avatar = watch("avatar");

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
      "avatar",
      images?.map((el) => el.path)
    );
  };

  const [initialAvatar, setInitialAvatar] = useState(current.avatar);

  const handleToggleChangeAvatar = () => {
    setIsChangeAvatar((prev) => !prev);

    // Khi người dùng chọn giữ nguyên, khôi phục lại ảnh đại diện ban đầu
    if (isChangeAvatar) {
      setInitialAvatar(current.avatar);
    }
  };

  const onSubmit = async (data) => {
    const { avatar, ...payload } = data;
    if (Array.isArray(avatar)) payload.avatar = avatar;
    const response = await apiUpdateProfile(payload);
    if (response.success) {
      toast.success(response.mes);
      getCurrent();
      setIsChangeAvatar(false);
    } else toast.error(response.mes);
  };

  return (
    <div className="bg-gray-200 px-8 h-full">
      <Title title="THÔNG TIN CÁ NHÂN">
        <Button className="font-bold -my-3" onClick={handleSubmit(onSubmit)}>
          Cập nhật
        </Button>
      </Title>
      <form className="p-4 max-w-[900px] space-y-4 mx-auto mt-10 border shadow-lg bg-white rounded-md">
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
          // readOnly={
          //   !(
          //     current?.userRoles?.length === 1 &&
          //     current?.userRoles[0]?.roleCode === "ROL7"
          //   )
          // }
        />
        <InputForm
          id="email"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Email"
          required
          placeholder="Nhập email..."
          readOnly={
            !(
              current?.userRoles?.length === 1 &&
              current?.userRoles[0]?.roleCode === "ROL7"
            )
          }
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
        <div className="flex flex-col gap-3 w-full">
          <span className="font-medium text-main-800">
            Ảnh đại diện{" "}
            <span
              className="text-xs cursor-pointer hover:underline text-orange-600"
              // onClick={() => setIsChangeAvatar((prev) => !prev)}
              onClick={handleToggleChangeAvatar}
            >
              {isChangeAvatar ? "Giữ nguyên ✋" : "Thay đổi ✍️"}
            </span>
          </span>
          {isChangeAvatar ? (
            <InputFile
              id="avatar"
              register={register}
              errors={errors}
              getImages={getImages}
            />
          ) : (
            <img
              src={current.avatar || "/user.svg"}
              alt=""
              className="w-28 h-28 object-cover rounded-full mx-auto"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Personal;

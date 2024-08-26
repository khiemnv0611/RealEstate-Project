import React from "react";
import { useForm } from "react-hook-form";
import { InputForm, Title } from "~/components";

const Personal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <div className="h-full px-8">
      <Title title="THÔNG TIN CÁ NHÂN"></Title>
      <form className="p-4 flex flex-col gap-4">
        <InputForm
          id="name"
          register={register}
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
          label="Họ và tên"
        />
      </form>
    </div>
  );
};

export default Personal;

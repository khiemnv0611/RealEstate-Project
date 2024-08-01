import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { InputForm } from "..";
import { useForm } from "react-hook-form";
import { Button } from "..";

const Login = () => {
  const [variant, setVariant] = useState("LOGIN");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    reset();
  }, [variant]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-base rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl font-josejinsans font-semibold tracking-tight">
        Đăng nhập vào REIS
      </h1>
      <div className="flex justify-start border-b w-full">
        <span
          onClick={() => setVariant("LOGIN")}
          className={clsx(
            variant === "LOGIN" && "border-b-4 border-main-400",
            "cursor-pointer p-4"
          )}
        >
          Đăng nhập
        </span>
        <span
          onClick={() => setVariant("REGISTER")}
          className={clsx(
            variant === "REGISTER" && "border-b-4 border-main-400",
            "cursor-pointer p-4"
          )}
        >
          Đăng ký
        </span>
      </div>
      <form className="flex flex-col gap-4 w-full px-4">
        <InputForm
          label="Số điện thoại"
          register={register}
          inputClassname="rounded-md"
          id="phone"
          placeholder="Nhập số điện thoại ..."
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
        />
        <InputForm
          label="Mật khẩu"
          register={register}
          inputClassname="rounded-md"
          id="password"
          placeholder="Nhập mật khẩu ..."
          type="password"
          validate={{ required: "Trường này không được để trống" }}
          errors={errors}
        />
        {variant === "REGISTER" && (
          <InputForm
            label="Họ và tên"
            register={register}
            inputClassname="rounded-md"
            id="name"
            placeholder="Nhập mật khẩu ..."
            validate={{ required: "Trường này không được để trống" }}
            errors={errors}
          />
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="py-2 mt-4 font-bold"
        >
          {variant === "LOGIN" ? "Đăng nhập" : "Đăng ký"}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline font-bold w-full text-center">
          Quên mật khẩu?
        </span>
      </form>
    </div>
  );
};

export default Login;

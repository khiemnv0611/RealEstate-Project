import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { InputForm, InputRadio } from "..";
import { useForm } from "react-hook-form";
import { Button } from "..";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "~/utils/firebase";

const Login = () => {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { setModal } = useAppStore();
  const { token, setToken, roles } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    reset();
  }, [variant]);

  //Captcha
  const handleCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // ID của phần tử HTML
        {
          size: "invisible",
          callback: (response) => {
            // Xử lý khi reCAPTCHA được xác minh
          },
          "expired-callback": (response) => {
            // Xử lý khi reCAPTCHA hết hạn
          },
        }
      );
      //console.log("RecaptchaVerifier created:", window.recaptchaVerifier);
    }
  };

  // Send OTP
  const handleSendOTP = (phone) => {
    handleCaptchaVerify();
    const verifier = window.recaptchaVerifier;
    const formatPhone = "+84" + phone.slice(1);
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        toast.success("OTP đã được gửi đến số điện thoại của bạn.");
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          toast.error("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
        } else {
          toast.error("Lỗi khi gửi OTP:", error);
        }
      });
  };

  const onSubmit = async (data) => {
    if (variant === "REGISTER") {
      if (data?.roleCode !== "ROL7") {
        handleSendOTP(data.phone);
      }
      // setIsLoading(true);
      // // Loại bỏ confirmPassword khỏi data trước khi gửi
      // const { confirmPassword, ...registerData } = data;
      // // Gửi dữ liệu đã loại bỏ confirmPassword lên server
      // const response = await apiRegister(registerData); // Lấy apiRegister
      // setIsLoading(false);
      // if (response.success) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Chúc mừng!",
      //     text: response.mes,
      //     showConfirmButton: true,
      //     confirmButtonText: "Đi đến đăng nhập",
      //   }).then(({ isConfirmed }) => {
      //     if (isConfirmed) setVariant("LOGIN");
      //   });
      // } else toast.error(response.mes);
    }

    if (variant === "LOGIN") {
      const { name, role, ...payload } = data;
      const response = await apiSignIn(payload); // Lấy apiSignIn
      setIsLoading(false);
      if (response.success) {
        toast.success(response.mes);
        setToken(response.accessToken);
        setModal(false, null);
      } else toast.error(response.mes);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-base rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl font-josejinsans font-semibold tracking-tight">
        Chào mừng đến với REIS
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
        <div id="recaptcha-container"></div>
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
          validate={{
            required: "Trường này không được để trống",
            pattern: {
              value: /(0[3|5|7|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ.",
            },
          }}
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
          <>
            <InputForm
              label="Nhập lại mật khẩu"
              register={register}
              inputClassname="rounded-md"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu ..."
              type="password"
              validate={{
                required: "Trường này không được để trống",
                validate: (value) =>
                  value === watch("password") || "Mật khẩu không khớp",
              }}
              errors={errors}
            />
            <InputForm
              label="Họ và tên"
              register={register}
              inputClassname="rounded-md"
              id="name"
              placeholder="Nhập họ và tên ..."
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
            />
            <InputRadio
              label="Loại tài khoản"
              register={register}
              id="roleCode"
              validate={{ required: "Trường này không được để trống" }}
              optionsClassname="grid grid-cols-3 gap-4"
              errors={errors}
              options={roles
                ?.filter((el) => el.code !== "ROL1")
                ?.map((el) => ({
                  label: el.value,
                  value: el.code,
                }))}
            />
          </>
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="py-2 mt-4 font-bold"
          disabled={isLoading}
        >
          {isLoading
            ? "Đang xử lý..."
            : variant === "LOGIN"
            ? "Đăng nhập"
            : "Đăng ký"}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline font-bold w-full text-center">
          Quên mật khẩu?
        </span>
      </form>
    </div>
  );
};

export default Login;

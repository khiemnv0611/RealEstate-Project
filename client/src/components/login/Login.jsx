import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { InputForm, InputRadio } from "..";
import { useForm } from "react-hook-form";
import { Button } from "..";
import { apiCheckEmailnPhone, apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "~/utils/firebaseConfig";

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      await handleRegister(data);
    }

    if (variant === "LOGIN") {
      const { name, phone, ...payload } = data;
      const response = await apiSignIn(payload);
      setIsLoading(false);
      if (response.success) {
        toast.success(response.mes);
        setToken(response.accessToken);
        setModal(false, null);
      } else toast.error(response.mes);
    }
  };

  const handleRegister = async (data) => {
    const { confirmPassword, ...payload } = data;
    const { email, phone } = payload;

    // Kiểm tra email trong cơ sở dữ liệu trước
    try {
      const checkEmailnPhoneResponse = await apiCheckEmailnPhone({
        email,
        phone,
      });

      if (!checkEmailnPhoneResponse.success) {
        // Nếu email đã tồn tại trong cơ sở dữ liệu, ngừng xử lý và báo lỗi
        toast.error("Email hoặc số điện thoại này đã được đăng ký.");
        return;
      }

      // Nếu email không tồn tại, tiếp tục xử lý với Firebase
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        const user = userCredential.user;

        toast.promise(
          new Promise((resolve, reject) => {
            // Gửi email xác thực
            sendEmailVerification(user)
              .then(() => {
                let isEmailVerified = false;
                const interval = setInterval(async () => {
                  await user.reload();
                  if (user.emailVerified) {
                    isEmailVerified = true;
                    clearInterval(interval);

                    // Đăng ký vào API hệ thống sau khi xác thực email
                    apiRegister(payload)
                      .then((response) => {
                        if (response.success) {
                          resolve(); // Xác thực thành công
                          setIsLoading(false);

                          Swal.fire({
                            icon: "success",
                            title: "Chúc mừng!",
                            text: "Email đã được xác thực. Bạn có thể đăng nhập.",
                            showConfirmButton: true,
                            confirmButtonText: "Đi đến đăng nhập",
                          }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                              setVariant("LOGIN");
                            }
                          });
                        } else {
                          reject(response.mes); // Đăng ký vào API thất bại
                        }
                      })
                      .catch((error) => {
                        reject(error.message); // Xử lý lỗi API
                      });
                  }
                }, 3000); // Kiểm tra email sau mỗi 3 giây
              })
              .catch((error) => {
                reject("Lỗi khi gửi email xác thực: " + error.message);
              });
          }),
          {
            pending: "Vui lòng kiểm tra email để xác thực tài khoản.",
            success: "Đăng ký thành công. Email đã được xác thực!",
            error: "Có lỗi xảy ra trong quá trình đăng ký.",
          }
        );
      } catch (error) {
        toast.error("Lỗi khi đăng ký tài khoản Firebase: " + error.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Lỗi khi kiểm tra thông tin: " + error.message);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white relative text-base rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-4"
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
      <form className="flex flex-col gap-2 w-full px-4">
        <InputForm
          label="Email"
          register={register}
          inputClassname="rounded-md"
          id="email"
          placeholder="Nhập vào email ..."
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
            <InputForm
              label="Số điện thoại"
              register={register}
              inputClassname="rounded-md"
              id="phone"
              placeholder="Nhập vào số điện thoại ..."
              validate={{
                required: "Trường này không được để trống",
              }}
              errors={errors}
            />
          </>
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="py-2 mt-2 font-bold"
          disabled={isLoading}
        >
          {isLoading
            ? "Đang xử lý..."
            : variant === "LOGIN"
            ? "Đăng nhập"
            : "Đăng ký"}
        </Button>
        <Button
          onClick={() => {
            window.location.href = "http://localhost:5000/api/auth/google";
          }}
          className="bg-white text-black border border-main-700 py-2"
        >
          <img
            src="/google.svg"
            alt="google logo"
            className="w-5 h-5 mr-3 object-cover"
          />
          <span>Đăng nhập với Google</span>
        </Button>

        <span className="cursor-pointer text-main-500 hover:underline font-bold w-full text-center">
          Quên mật khẩu?
        </span>
      </form>
    </div>
  );
};

export default Login;

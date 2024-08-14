import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "..";

const OTPVerifier = ({ phone, cb }) => {
  const [otp, setOtp] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOTP = () => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setIsLoading(false);
        cb();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <div className="p-4 flex flex-col gap-20 justify-center items-center h-full">
      <span className="font-bold">
        Vui lòng nhập mã OTP vừa được gửi đến số điện thoại của bạn.
      </span>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>•</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="h-16 otp-item mx-2 border rounded-md outline-none inline-block border-blue-600 text-lg"
        shouldAutoFocus={true}
      />
      <div className="flex gap-4 items-center justify-center">
        <Button
          disabled={isLoading}
          onClick={handleConfirmOTP}
          className="font-semibold"
        >
          Xác nhận OTP
        </Button>
        <Button onClick={() => setOtp("")} className="bg-orange-400">
          Tạo mới
        </Button>
      </div>
    </div>
  );
};

export default OTPVerifier;

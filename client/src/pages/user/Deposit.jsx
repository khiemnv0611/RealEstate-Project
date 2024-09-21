import React, { useState } from "react";
import { Title } from "~/components";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { createPayment } from "~/apis/payment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Deposit = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState({
    number: false,
    text: false,
    expiryDate: false,
    cvc: false,
    amount: false,
  });

  // Sử dụng Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleCvcChange = (e) => {
    const inputValue = e.target.value;

    // Chỉ chấp nhận số và tối đa 3 ký tự
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 3);
    setCvc(formattedValue);

    // Kiểm tra xem độ dài có đúng 3 ký tự không
    if (formattedValue.length === 3) {
      setError((prev) => ({ ...prev, cvc: false }));
    } else {
      setError((prev) => ({ ...prev, cvc: true }));
    }
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;

    // Loại bỏ tất cả các ký tự không phải số
    const numericValue = inputValue.replace(/\D/g, "");

    // Định dạng lại số với dấu phẩy mỗi 3 chữ số
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setAmount(formattedValue);

    // Chuyển đổi giá trị đã định dạng trở lại thành số để kiểm tra
    const numericAmount = parseInt(numericValue, 10);

    // Kiểm tra nếu giá trị không hợp lệ hoặc không nằm trong khoảng cho phép
    const isValid = numericAmount >= 10000 && numericAmount <= 1000000;

    if (numericValue === "" || !isValid) {
      setError((prev) => ({ ...prev, amount: true }));
    } else {
      setError((prev) => ({ ...prev, amount: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.log("Card elements are not loaded properly.");
      return;
    }

    const numericAmount = parseInt(amount.replace(/,/g, ""), 10);

    if (error.cvc || error.amount || !isChecked) {
      console.log("Validation failed.");
      return;
    }

    try {
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
        });

      if (stripeError) {
        console.log("Stripe payment method error: ", stripeError);
        return;
      }

      const response = await createPayment(
        numericAmount,
        "vnd",
        paymentMethod.id
      );

      if (response.success) {
        // toast.success("Thanh toán thành công!");
        // setAmount("");
        // setCvc("");
        // setIsChecked(false);
        Swal.fire({
          title: "Thành công!",
          text: "Thanh toán thành công!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        // console.log("Payment failed: ", response.mes);
        // toast.error("Thanh toán không thành công: ", response.mes);
        Swal.fire({
          title: "Thất bại!",
          text: `Thanh toán không thành công: ${response.mes}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error while processing payment: ", error.message);
    }
  };

  return (
    <div className="bg-gray-200 px-8 h-full">
      <Title title="NẠP TIỀN VÀO TÀI KHOẢN"></Title>
      <div className="p-4">
        <span>Bạn hãy chọn một trong các hình thức thanh toán dưới đây</span>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div
            onClick={toggleForm}
            className="px-6 py-5 flex gap-4 border items-center cursor-pointer hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <img src="/visa.svg" alt="" className="h-6 w-10 object-cover" />
            Thanh toán bằng thẻ tín dụng (VISA)
          </div>
          <div className="px-6 py-5 flex gap-4 border items-center cursor-pointer border-transparent hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
            <MdOutlineQrCodeScanner size={22} />
            Thanh toán bằng QR (VNPAY)
          </div>
          <div className="px-6 py-5 flex gap-4 border items-center cursor-pointer border-transparent hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
            <img src="/atm.png" alt="" className="h-6 w-6 object-cover" />
            Thanh toán bằng thẻ ATM nội địa
          </div>
          <div className="px-6 py-5 flex gap-4 border items-center cursor-pointer border-transparent hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
            <img src="/momo.svg" alt="" className="h-6 w-6 object-cover" />
            Thanh toán bằng ví MoMo
          </div>
          <div className="px-6 py-5 flex gap-4 border items-center cursor-pointer border-transparent hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
            <BsBank size={22} />
            Chuyển khoản ngân hàng
          </div>
          <div className="px-6 py-5 flex gap-4 border items-center cursor-pointer border-transparent hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
            <img
              src="/ggnapplepay.png"
              alt=""
              className="h-6 w-14 object-cover"
            />
            Thanh toán qua Apple Pay, Google Pay
          </div>
        </div>
        <div
          className={twMerge(
            "flex flex-col items-center justify-center gap-4 mt-4 p-10 rounded-lg transition-opacity shadow-lg duration-500 border bg-white w-main mx-auto",
            clsx({
              "opacity-100": isVisible,
              "opacity-0 pointer-events-none": !isVisible,
            })
          )}
        >
          <span className="font-semibold">Nhập thông tin thẻ</span>
          <img src="/visa-template.png" alt="" />

          <div
            className="max-w-lg"
            style={{
              border: "1px solid #ced4da",
              borderRadius: "8px",
              padding: "12px",
              width: "100%",
            }}
          >
            <CardNumberElement />
            {/* 4242424242424242 */}
          </div>
          <div className="flex w-[512px] justify-between gap-4">
            <div
              style={{
                border: "1px solid #ced4da",
                borderRadius: "8px",
                padding: "12px",
                width: "50%",
              }}
            >
              <CardExpiryElement />
              {/* 12/34 */}
            </div>
            <div
              style={{
                border: "1px solid #ced4da",
                borderRadius: "8px",
                padding: "12px",
                width: "50%",
              }}
            >
              <CardCvcElement />
            </div>
          </div>

          <TextField
            id="amount"
            label="Số tiền muốn nạp"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            error={error.amount}
            helperText={
              error.amount
                ? "Số tiền không hợp lệ. Phải nằm trong khoảng từ 10,000 đến 1,000,000."
                : ""
            }
            className="w-full max-w-lg"
          />
          <FormControl error={error.checkbox} className="w-[512px]">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              }
              label={
                <span>
                  Tôi đồng ý với{" "}
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Các điều khoản và điều kiện
                  </span>
                </span>
              }
            />
            {error.checkbox && (
              <FormHelperText>
                Phải đồng ý với các điều khoản và điều kiện
              </FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Nạp tiền
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

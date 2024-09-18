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

const Deposit = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const [numberValue, setNumberValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
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

  const handleNumberChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setNumberValue(inputValue);

      if (inputValue.length === 16) {
        setError((prev) => ({ ...prev, number: false }));
      } else {
        setError((prev) => ({ ...prev, number: true }));
      }
    }
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;

    // Xóa dấu, số, ký tự đặc biệt và chuyển thành in hoa
    const formattedValue = inputValue
      .replace(/[^a-zA-Z\s]/g, "") // Chỉ giữ lại chữ và khoảng trắng
      .toUpperCase(); // Chuyển thành chữ in hoa

    setTextValue(formattedValue);

    // Kiểm tra lỗi (tên không được rỗng)
    if (formattedValue.trim() === "") {
      setError((prev) => ({ ...prev, text: true }));
    } else {
      setError((prev) => ({ ...prev, text: false }));
    }
  };

  const handleExpiryDateChange = (e) => {
    const inputValue = e.target.value;

    // Chỉ chấp nhận định dạng MM/YY với tối đa 5 ký tự
    const formattedValue = inputValue
      .replace(/[^0-9/]/g, "") // Chỉ giữ lại số và dấu "/"
      .slice(0, 5); // Giới hạn tối đa 5 ký tự

    // Tự động thêm dấu "/" sau khi nhập 2 số đầu
    if (formattedValue.length === 2 && !formattedValue.includes("/")) {
      setExpiryDate(formattedValue + "/");
    } else {
      setExpiryDate(formattedValue);
    }

    // Kiểm tra xem độ dài có đúng 5 ký tự và có định dạng MM/YY không
    if (formattedValue.length === 5 && /^\d{2}\/\d{2}$/.test(formattedValue)) {
      setError((prev) => ({ ...prev, expiryDate: false }));
    } else {
      setError((prev) => ({ ...prev, expiryDate: true }));
    }
  };

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

  const handleSubmit = () => {
    // Kiểm tra tất cả các trường và cập nhật trạng thái lỗi nếu cần
    const hasErrors = {
      number: !numberValue.match(/^\d{16}$/),
      text: textValue.trim() === "",
      expiryDate: !expiryDate.match(/^\d{2}\/\d{2}$/),
      cvc: !cvc.match(/^\d{3}$/),
      amount: amount.replace(/,/g, "").trim() === "", // Loại bỏ dấu phẩy để kiểm tra rỗng
      checkbox: !isChecked,
    };

    // Cập nhật trạng thái lỗi
    setError((prev) => ({
      ...prev,
      ...hasErrors,
    }));

    // Nếu không có lỗi, xử lý dữ liệu
    if (Object.values(hasErrors).every((error) => !error)) {
      const cardData = {
        numberValue,
        textValue,
        expiryDate,
        cvc,
        amount,
        isChecked,
      };

      console.log("Submitted Data: ", cardData);

      // Thực hiện các xử lý tiếp theo với cardData như gửi lên server
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
          <TextField
            id="number-card"
            label="Số thẻ"
            variant="outlined"
            value={numberValue}
            onChange={handleNumberChange}
            error={error.number}
            helperText={error.number ? "Số thẻ phải đúng 16 kí tự" : ""}
            className="w-full max-w-lg"
          />

          <TextField
            id="name-card"
            label="Tên in trên thẻ"
            variant="outlined"
            value={textValue}
            onChange={handleTextChange}
            error={error.text}
            helperText={error.text ? "Tên không đúng định dạng" : ""}
            className="w-full max-w-lg"
          />
          <div className="flex w-[512px] justify-between">
            <TextField
              id="expiry-date"
              placeholder="MM/YY"
              variant="outlined"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              error={error.expiryDate}
              helperText={error.expiryDate ? "Phải nhập đúng định dạng" : ""}
              className="w-[250px]"
            />
            <TextField
              id="cvc"
              placeholder="CVC/CCC"
              variant="outlined"
              value={cvc}
              onChange={handleCvcChange}
              error={error.cvc}
              helperText={error.cvc ? "Phải nhập đúng định dạng" : ""}
              className="w-[250px]"
            />
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

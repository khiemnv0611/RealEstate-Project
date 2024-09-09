import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BreadCrumb,
  Button,
  InputFile,
  InputForm,
  InputSelect,
  Textarea,
} from "~/components";
import { cityDistricts } from "../../utils/constants";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import SelectLib from "../../components/inputs/SelectLib";
import { apiCreateProperty } from "~/apis/properties";
import path from "~/utils/path";

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

  const { propertyTypes } = usePropertiesStore();
  const navigate = useNavigate();

  const getImages = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };

  const getFeaturedImage = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "featuredImage",
      images?.map((el) => el.path)
    );
  };

  const [resetKey, setResetKey] = useState(Date.now()); // Sử dụng thời gian hiện tại làm key duy nhất

  const [cities, setCities] = useState(Object.keys(cityDistricts));
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    if (selectedCity) {
      setDistricts(Object.keys(cityDistricts[selectedCity]) || []);
      setSelectedDistrict(""); // Reset quận khi thành phố thay đổi
      setWards([]); // Reset phường khi thành phố thay đổi
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      setWards(cityDistricts[selectedCity][selectedDistrict] || []);
    }
  }, [selectedDistrict, selectedCity]);

  const onSubmit = async (data) => {
    const { 
      name,
      description,
      address,
      listingType,
      price,
      propertyType,
      images,
      featuredImage,
      bedRoom,
      bathRoom,
      propertySize,
      yearBuilt
    } = data;

    const fullAddress = address.trim() + ", " + selectedDistrict.trim() + ", " + selectedWard.trim()
    const city = selectedCity.trim()

    console.log(data)
    console.log("Full address: " + fullAddress)
    console.log("City: " + city)

    const resdata = {
      name: name,
      description,
      address: fullAddress,
      city,
      listingType,
      price,
      propertyTypeId: propertyType,
      images,
      featuredImage: featuredImage[0],
      bedRoom,
      bathRoom,
      propertySize,
      yearBuilt
    }

    // if (Array.isArray(images)) payload.avatar = avatar;
    // const response = await apiUpdateProfile(payload);
    // if (response.success) {
    //   toast.success(response.mes);
    //   getCurrent();
    //   setIsChangeAvatar(false);
    // } else toast.error(response.mes);

    const res = await apiCreateProperty(resdata)
    if (res.success) {
      toast.success(res.mes);
      navigate(`/${path.PROPERTIES}/${res.property.id}`)
    }
    else toast.error(res.mes);
  };

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
      <div className="w-main mx-auto px-10">
        <form className="space-y-6 my-10">
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
          <SelectLib
            id="propertyType"
            register={register}
            errors={errors}
            // containerClassname={direction === "vertical" ? "w-full" : "w-[15em]"}
            // inputClassname="rounded-md border border-gray-300"
            label="Loại hình dự án"
            placeholder="Chọn loại hình dự án"
            options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
            onChange={(val) => setValue("propertyType", val.id)}
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
            <div className="flex items-center justify-around">
              <label>
                <span className="font-medium text-main-800">Thành phố</span>
                <sup>
                  (<span className="text-red-500">*</span>)
                </sup>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-[38px] text-sm"
              >
                <option value="">-- Chọn thành phố / tỉnh --</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-around">
              <label>
                <span className="font-medium text-main-800">Quận</span>
                <sup>
                  (<span className="text-red-500">*</span>)
                </sup>
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedCity} // Disable nếu không có thành phố nào được chọn
                className="h-[38px] text-sm"
              >
                <option value="">-- Chọn quận / huyện --</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-around">
              <label>
                <span className="font-medium text-main-800">Phường</span>
                <sup>
                  (<span className="text-red-500">*</span>)
                </sup>
              </label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                disabled={!selectedDistrict} // Disable nếu không có quận/huyện nào được chọn
                className="h-[38px] text-sm"
              >
                <option value="">-- Chọn phường / xã --</option>
                {wards.map((ward, index) => (
                  <option key={index} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <InputSelect
            register={register}
            id="listingType"
            errors={errors}
            placeholder="-- Chọn loại giao dịch --"
            label="Loại giao dịch"
            options={[
              { label: "Bán", code: "Bán" },
              { label: "Cho thuê", code: "Cho thuê" },
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
            id="featuredImage"
            register={register}
            errors={errors}
            validate={{ required: "Trường này không được để trống." }}
            label="Ảnh tổng quát dự án"
            getImages={getFeaturedImage}
            required
            resetKey={resetKey} // Truyền thuộc tính resetKey
          />
          <InputFile
            id="images"
            register={register}
            errors={errors}
            validate={{ required: "Trường này không được để trống." }}
            label="Những ảnh chi tiết"
            getImages={getImages}
            required
            resetKey={resetKey} // Truyền thuộc tính resetKey
            multiple
          />
          <div className="grid grid-cols-4">
            <InputForm
              id="bedRoom"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Số phòng ngủ"
              placeholder="Nhập số phòng ngủ..."
              required
              inputClassname="w-4/5"
            />
            <InputForm
              id="bathRoom"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Số phòng tắm"
              placeholder="Nhập số phòng tắm..."
              required
              inputClassname="w-4/5"
            />
            <InputForm
              id="propertySize"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Diện tích"
              placeholder="Nhập diện tích..."
              required
              inputClassname="w-4/5"
            />
            <InputForm
              id="yearBuilt"
              register={register}
              validate={{ required: "Trường này không được để trống" }}
              errors={errors}
              label="Năm xây dựng"
              placeholder="Nhập năm xây dựng..."
              required
              inputClassname="w-4/5"
            />
          </div>
        </form>
        <Button className="mx-auto" onClick={handleSubmit(onSubmit)}>Đăng</Button>
      </div>
    </div>
  );
};

export default AddPost;

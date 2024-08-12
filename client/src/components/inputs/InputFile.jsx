import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { apiUploadImages } from "~/apis/beyond";
import { ImSpinner9 } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const InputFile = ({
  containerClassname,
  label,
  id,
  validate,
  multiple,
  getImages,
  errors,
  resetKey, // Thay đổi thuộc tính này
}) => {
  const { register, watch, setValue } = useForm();

  // Xử lý upLoad ảnh
  const rawImages = watch(id);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (files) => {
    const formData = new FormData();
    setIsLoading(true);
    const uploadPromises = [];
    for (let file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS
      );
      uploadPromises.push(apiUploadImages(formData));
    }
    const response = await Promise.all(uploadPromises);
    setIsLoading(false);
    if (response && response.length > 0) {
      const tempArrayImage = [];
      for (let result of response) {
        if (result.status === 200)
          tempArrayImage.push({
            id: result.data.public_id,
            path: result.data.secure_url,
          });
      }
      setImages(tempArrayImage);
    } else toast.error("Có gì đó không ổn!");
  };

  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages);
    }
  }, [rawImages]);

  useEffect(() => {
    getImages(images);
  }, [images]);

  // Xóa image
  const handleDeleteImage = (e, imageId) => {
    e.preventDefault();
    setImages((prev) => prev.filter((el) => el.id !== imageId));
  };

  // Reset khi resetKey thay đổi
  useEffect(() => {
    setImages([]);
    setValue(id, []); // Reset giá trị của input file
  }, [resetKey]);

  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}
    >
      {label && <span className="font-medium text-main-800">{label}</span>}
      <input
        type="file"
        id={id}
        {...register(id, validate)}
        className="hidden"
        multiple={multiple}
      />
      <label
        className="bg-gray-100 w-full p-16 flex flex-col gap-2 items-center justify-center"
        htmlFor={id}
      >
        {isLoading ? (
          <span className="animate-spin">
            <ImSpinner9 size={25} />
          </span>
        ) : images?.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {images?.map((el, idx) => (
              <div key={idx} className="col-span-1 relative">
                <span
                  onClick={(e) => handleDeleteImage(e, el.id)}
                  className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-1"
                >
                  <IoClose size={18} />
                </span>
                <img src={el.path} alt="" className="w-full object-contain" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className="text-4xl text-gray-500">
              <FaCloudUploadAlt />
            </span>
            <p className="text-gray-500 text-sm italic">
              Chỉ hỗ trợ các hình ảnh có định dạng .JPEG, .PNG, .JPG
            </p>
          </>
        )}
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputFile;

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
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  // Xử lý upLoad ảnh
  const rawImages = watch(id);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async (files) => {
    const formData = new FormData();
    const imageLink = [];
    setIsLoading(true);
    for (let file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS
      );
      const response = await apiUploadImages(formData);
      if (response.status === 200)
        imageLink.push({
          id: response.data.public_id,
          path: response.data.secure_url,
        });
    }
    setIsLoading(false);
    setImages(imageLink);
  };

  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages);
    }
  }, [rawImages]);

  useEffect(() => {
    if (images && images.length > 0) getImages(images);
  }, [images]);

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
                  onClick={() =>
                    setImages((prev) =>
                      prev.filter((item) => item.id !== el.id)
                    )
                  }
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

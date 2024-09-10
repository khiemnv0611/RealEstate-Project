import React, { useEffect, useState } from "react";
import { InputForm } from "..";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { apiComment } from "~/apis/user";
import { toast } from "react-toastify";

const CommentInput = ({ propertyId }) => {
  // const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    value,
    onChange,
    handleSubmit
  } = useForm();

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  useEffect

  const handleEmojiSelect = (emojiObject) => {
    const currentValue = getValues("message") || "";
    setValue("message", currentValue + emojiObject.emoji, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const { message } = data;

    const res = await apiComment(propertyId, { message });

    if (res.success) {
      toast.success("Bình luận thành công!")
    } else toast.error(res.mes);
  };

  return (
    <div className="relative flex justify-between bg-gray-200 rounded-3xl p-1 w-full">
      <InputForm
        id="message"
        errors={errors}
        placeholder="Viết bình luận..."
        inputClassname="bg-transparent border-none text-black text-base focus:outline-none focus:ring-0 focus:border-transparent"
        // value={inputValue}
        // onChange={handleInputChange}
        register={register}
      />
      <div className="flex gap-4 items-center text-gray-500">
        <FaRegSmile
          size={22}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="cursor-pointer"
        />
        <div
          className={`cursor-pointer hover:bg-gray-300 rounded-full p-1.5 ${
            getValues("message") ? "text-blue-400" : "text-gray-500"
          }`}
        >
          <IoSend 
            onClick={handleSubmit(onSubmit)}
            size={22} 
          />
        </div>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-2">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default CommentInput;

import React, { useEffect, useState, useRef } from "react";
import { InputForm } from "..";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { apiComment } from "~/apis/user";
import { toast } from "react-toastify";

const CommentInput = ({ propertyId, onCommentSuccess }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const isEmojiTogglerClicked = useRef(false); // Cờ để kiểm tra sự kiện click vào FaRegSmile

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    getValues,
  } = useForm();

  const messageValue = watch("message", "");

  const handleEmojiSelect = (emojiObject) => {
    const currentValue = getValues("message") || "";
    setValue("message", currentValue + emojiObject.emoji, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    const { message } = data;

    const res = await apiComment(propertyId, { message });

    if (res.success) {
      toast.success("Bình luận thành công!");
      setValue("message", ""); // Clear input after success

      onCommentSuccess();
    } else toast.error(res.mes);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu người dùng vừa click vào FaRegSmile, thì bỏ qua click ngoài
      if (isEmojiTogglerClicked.current) {
        isEmojiTogglerClicked.current = false;
        return;
      }

      // Ẩn EmojiPicker khi nhấn ngoài nó
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-between bg-gray-200 rounded-3xl p-1">
      <InputForm
        id="message"
        errors={errors}
        placeholder="Viết bình luận..."
        inputClassname="bg-transparent border-none text-black text-base focus:outline-none focus:ring-0 focus:border-transparent"
        register={register}
      />
      <div className="flex gap-4 items-center text-gray-500">
        <FaRegSmile
          size={22}
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện click ngoài EmojiPicker
            isEmojiTogglerClicked.current = true; // Đánh dấu rằng FaRegSmile đã được click
            setShowEmojiPicker((prev) => !prev);
          }}
          className="cursor-pointer"
        />
        <div
          className={`cursor-pointer hover:text-blue-400 hover:bg-gray-300 rounded-full p-1.5 ${
            messageValue ? "text-blue-400" : "text-gray-500"
          }`}
        >
          <IoSend onClick={handleSubmit(onSubmit)} size={22} />
        </div>
      </div>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-14 right-2">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default CommentInput;

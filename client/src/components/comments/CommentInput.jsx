import React, { useState } from "react";
import { InputForm } from "..";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";

const CommentInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    formState: { errors },
    value,
    onChange,
  } = useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEmojiSelect = (emojiObject) => {
    setInputValue((prevValue) => prevValue + emojiObject.emoji);
  };
  return (
    <div className="relative flex justify-between bg-gray-200 rounded-3xl p-1 w-full">
      <InputForm
        id="comment"
        errors={errors}
        placeholder="Viết bình luận..."
        inputClassname="bg-transparent border-none text-black text-base focus:outline-none focus:ring-0 focus:border-transparent"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="flex gap-4 items-center text-gray-500">
        <FaRegSmile
          size={22}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="cursor-pointer"
        />
        <div className="cursor-pointer hover:bg-gray-300 hover:text-blue-400 rounded-full p-2">
          <IoSend size={22} />
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

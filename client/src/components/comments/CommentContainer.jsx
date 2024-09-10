import React, { useEffect, useRef, useState } from "react";
import { CommentInput, InputForm } from "..";
import { useUserStore } from "~/store/useUserStore";
import { apiGetComments } from "~/apis/properties";
import { useForm } from "react-hook-form";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { apiReplyComment } from "~/apis/user";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";

const CommentContainer = ({ propertyId }) => {
  const { current, getCurrent } = useUserStore();
  const [comments, setComments] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeReply, setActiveReply] = useState(null);
  const emojiPickerRef = useRef(null);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit
  } = useForm();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await apiGetComments(propertyId);
      if (response.success) setComments(response.data.rows);
    };

    fetchComments();
  }, []);

  const handleEmojiSelect = (emojiObject) => {
    const currentValue = getValues("message") || "";
    setValue("message", currentValue + emojiObject.emoji, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const { message } = data;

    const res = await apiReplyComment(activeReply, { message, propertyId });

    if (res.success) {
      toast.success("Trả lời bình luận thành công!")
    } else toast.error(res.mes);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false); // Ẩn EmojiPicker khi nhấn ngoài nó
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col bg-white border rounded-md">
      <div>

        {comments?.map((comment) => (
          <div>
            <div key={comment.id} className="flex p-3 gap-3">
              <img
                src={comment.rCommentedBy?.avatar || '/default-avatar.png'}
                alt={comment.rCommentedBy?.name || 'Anonymous'}
                className="w-10 h-10 object-cover bg-gray-500 rounded-full"
              />
              <div className="flex flex-col">
                <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
                  <span className="font-bold">{comment.rCommentedBy?.name || 'Anonymous'}</span>
                  <span>{comment.message}</span>
                </div>
                <div className="flex gap-4">
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => setActiveReply(comment.id)}
                  >
                    Phản hồi
                  </span>
                </div>
              </div>
            </div>
  
            {/* Render reply comments */}
            {comment?.replies?.map((reply) => (
              <div key={reply.id} className="flex p-3 pl-16 gap-3">
                <img
                  src={reply.rCommentedBy?.avatar || '/default-avatar.png'}
                  alt={reply.rCommentedBy?.name || 'Anonymous'}
                  className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
                    <span className="font-bold">{reply.rCommentedBy?.name || 'Anonymous'}</span>
                    <span>{reply.text}</span>
                  </div>
                  <div className="flex gap-4">
                    <span>{new Date(reply.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply comment section */}
            {activeReply === comment.id && (
              <div className="flex justify-between bg-gray-200 rounded-3xl ml-16 mr-3">
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
                  <div ref={emojiPickerRef} className="absolute bottom-20 right-2">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

      </div>
      <div className="sticky bottom-0 flex p-3 gap-3">
        <img
          src={current.avatar}
          alt={current.name}
          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
        />
        <CommentInput propertyId={propertyId} />
      </div>
    </div>
  );
};

export default CommentContainer;

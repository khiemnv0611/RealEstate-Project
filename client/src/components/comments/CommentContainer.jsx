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
  const isEmojiTogglerClicked = useRef(false); // Cờ để kiểm tra sự kiện click vào FaRegSmile

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
    handleSubmit,
  } = useForm();

  const messageValue = watch("message", "");

  const fetchComments = async () => {
    const response = await apiGetComments(propertyId);
    if (response.success) {
      setComments(response.data.rows);
      this.forceUpdate();
    } 
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Callback and refresh
  const handleCommentSuccess = () => {
    fetchComments();
  };

  const handleEmojiSelect = (emojiObject) => {
    const currentValue = getValues("message") || "";
    setValue("message", currentValue + emojiObject.emoji, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    const { message } = data;

    const res = await apiReplyComment(activeReply, { message, propertyId });

    if (res.success) {
      toast.success("Trả lời bình luận thành công!");
      setValue("message", ""); // Clear input after success

      fetchComments();
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
    <div className="relative flex flex-col bg-white border rounded-md">
      <div>
        {comments?.map((comment) => (
          <div>
            <div key={comment.id} className="flex p-3 gap-3">
              <img
                src={comment.rCommentedBy?.avatar || "/default-avatar.png"}
                alt={comment.rCommentedBy?.name || "Anonymous"}
                className="w-10 h-10 object-cover bg-gray-500 rounded-full"
              />
              <div className="flex flex-col">
                <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
                  <span className="font-bold">
                    {comment.rCommentedBy?.name || "Anonymous"}
                  </span>
                  <span>{comment.message}</span>
                </div>
                <div className="flex gap-4">
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  <span
                    className="cursor-pointer hover:underline hover:font-semibold"
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
                  src={reply.rCommentedBy?.avatar || "/default-avatar.png"}
                  alt={reply.rCommentedBy?.name || "Anonymous"}
                  className="w-9 h-9 object-cover bg-gray-500 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
                    <span className="font-bold">
                      {reply.rCommentedBy?.name || "Anonymous"}
                    </span>
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
              <div className="ml-16 mr-3 flex gap-3 items-center">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-9 h-9 object-cover bg-gray-500 rounded-full"
                />
                <div className="relative flex justify-between bg-gray-200 rounded-3xl w-full">
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
                    <div
                      ref={emojiPickerRef}
                      className="absolute bottom-12 right-2"
                    >
                      <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 flex p-3 gap-3 bg-white rounded-md items-center">
        <img
          src={current.avatar}
          alt={current.name}
          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
        />
        <div className="w-full">
          <CommentInput propertyId={propertyId} onCommentSuccess={handleCommentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;

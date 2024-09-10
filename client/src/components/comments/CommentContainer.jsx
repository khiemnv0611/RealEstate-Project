import React, { useEffect, useState } from "react";
import { CommentInput } from "..";
import { useUserStore } from "~/store/useUserStore";
import { apiGetComments } from "~/apis/properties";

const CommentContainer = ({ propertyId }) => {
  const { current, getCurrent } = useUserStore();

  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await apiGetComments(propertyId);
      if (response.success) setComments(response.data.rows);
    };

    fetchComments();
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
                  <span>Phản hồi</span>
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

          </div>
        ))}


        {/* <div className="flex p-3 gap-3">
          <img
            src=""
            alt=""
            className="w-10 h-10 object-cover bg-gray-500 rounded-full"
          />
          <div className="flex flex-col">
            <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
              <span className="font-bold">rUser.name</span>
              <span>content content content content content</span>
            </div>
            <div className="flex gap-4">
              <span>comment.createdAt</span>
              <span>Phản hồi</span>
            </div>
          </div>
        </div>

        <div className="flex p-3 pl-16 gap-3">
          <img
            src=""
            alt=""
            className="w-10 h-10 object-cover bg-gray-500 rounded-full"
          />
          <div className="flex flex-col">
            <div className="bg-gray-200 w-fit rounded-3xl p-3 flex flex-col gap-2 h-fit">
              <span className="font-bold">rUser.name</span>
              <span>content content content content content</span>
            </div>
            <div className="flex gap-4">
              <span>comment.createdAt</span>
              <span>Phản hồi</span>
            </div>
          </div>
        </div> */}
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

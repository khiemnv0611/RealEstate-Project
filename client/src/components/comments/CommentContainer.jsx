import React from "react";
import { CommentInput } from "..";

const CommentContainer = () => {
  return (
    <div className="relative flex flex-col bg-white border rounded-md">
      <div>
        <div className="flex p-3 gap-3">
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
        </div>
      </div>
      <div className="sticky bottom-0 flex p-3 gap-3">
        <img
          src=""
          alt=""
          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
        />
        <CommentInput />
      </div>
    </div>
  );
};

export default CommentContainer;

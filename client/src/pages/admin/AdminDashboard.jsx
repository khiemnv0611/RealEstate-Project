import React, { useState } from "react";
import { Title } from "~/components";
import { GrDocumentText } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ManageAccounts, ManagePosts } from ".";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("POSTS");
  const {
    register,
    formState: { errors },
    watch,
    containerClassname,
  } = useForm();

  return (
    <div>
      <div className="bg-gray-200 w-full min-h-screen px-6 gap-4">
        <Title className="ml-2" title="Bảng Điều Khiển" />
        <div className="flex flex-wrap justify-between items-center">
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-purple-400": activeTab === "POSTS", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("POSTS")}
            >
              <div className="rounded-full bg-purple-400 p-4">
                <GrDocumentText size={30} />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">Post.Count</h4>
                <span className="text-gray-500">Bài đăng</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-blue-400": activeTab === "ACCOUNTS", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("ACCOUNTS")}
            >
              <div className="rounded-full bg-blue-400 p-4">
                <FaUsers size={30} />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">User.Count</h4>
                <span className="text-gray-500">Tài khoản</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-yellow-400": activeTab === "ROLES", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("ROLES")}
            >
              <div className="rounded-full bg-yellow-400 p-4">
                <img
                  src="/user-role.svg"
                  alt=""
                  className="w-[30px] h-[30px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">Role.Count</h4>
                <span className="text-gray-500">Vai trò</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-6 mr-6 gap-6">
          {activeTab === "POSTS" && <ManagePosts />}
          {activeTab === "ACCOUNTS" && <ManageAccounts />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

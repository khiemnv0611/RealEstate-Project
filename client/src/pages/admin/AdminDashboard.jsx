import React from "react";
import { Title } from "~/components";
import { GrDocumentText } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

const Dashboard = () => {
  return (
    <div>
      <div className="bg-gray-200 w-full px-6 py-8 gap-4">
        <Title className="ml-2 -mb-4" title="Bảng Điều Khiển" />
        <div className="flex flex-wrap justify-between items-center">
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
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
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
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
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
              <div className="rounded-full bg-pink-400 p-4">
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
        <div>table</div>
      </div>
    </div>
  );
};

export default Dashboard;

import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userSidebar } from "~/utils/constants";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useUserStore } from "~/store/useUserStore";
import { MdAddCard } from "react-icons/md";
import path from "~/utils/path";
import { twMerge } from "tailwind-merge";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MdMoreHoriz } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [activeTabs, setActiveTabs] = useState([]);
  const { current } = useUserStore();
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => !el == tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy gói?",
      text: "Gói vẫn hoạt động đến khi hết thời hạn.",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Có, hủy!",
      cancelButtonText: "Không",
    }).then((response) => {
      if (response.isConfirmed) {
        toast.success("Hủy thành công!");
      }
    });
  };

  return (
    <div className="w-full bg-main-700 text-white sticky top-0 h-screen">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
        <img
          src={current?.avatar || "/user.svg"}
          alt="logo"
          className="w-28 h-28 object-cover rounded-full"
        />
        <span className="text-orange-500 font-bold">{current?.name}</span>
        <span>
          {current?.userRoles?.map((el) => el.roleName.value)?.join(" / ")}
        </span>
        <div className="p-4 flex flex-col items-center border border-transparent shadow-lg rounded-md w-[95%] gap-3 bg-white text-main-700">
          <div className="flex justify-start w-full">
            <span className="font-semibold">Số dư tài khoản:</span>
          </div>
          <span className="ml-2 font-semibold text-2xl text-red-500">
            {current?.balance?.toLocaleString("vi-VN")} đ
          </span>
          <div className="flex items-center justify-start w-full gap-2">
            <span className="font-semibold">Gói hội viên:</span>
            <span className="px-2 bg-gray-300 rounded-2xl">MemPlans.name</span>
            {/*Miễn phí: gray, Cơ bản: yellow, Tiêu chuẩn: blue, Cao cấp: purple*/}
          </div>
          {/*Không hiện ở gói miễn phí*/}
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2">
              <span className="font-semibold">Thời hạn:</span>
              <span>endDate - now</span> {/*endDate = startDate + 30*/}
            </div>
            <IconButton
              onClick={handleClick}
              className="bg-gray-300 hover:bg-gray-500 text-blue-600"
            >
              <MdMoreHoriz />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Nâng cấp gói</MenuItem>
              <MenuItem onClick={handleCancel}>Hủy gói</MenuItem>
            </Menu>
          </div>
          {/**/}
          <div
            className="mt-2 bg-main-700 text-white border rounded-md w-52 py-2 shadow-lg hover:cursor-pointer hover:text-main-700 hover:bg-white hover:shadow-2xl hover:border-blue-700"
            onClick={() => navigate(`/${path.USER_LAYOUT}/${path.DEPOSIT}`)}
          >
            <div className="flex items-center justify-center gap-4">
              <MdAddCard />
              <span>Nạp tiền</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 flex flex-col gap-0">
        {userSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-4 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
                    isActive && "bg-white text-main-700"
                  )
                }
                to={el.path}
              >
                <span>{el.icon}</span>
                <span className="select-none">{el.name}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <>
                <div
                  onClick={() => handleActiveTabs(el.id)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl cursor-pointer"
                >
                  <span className="flex items-center gap-4">
                    <span>{el.icon}</span>
                    <span className="select-none">{el.name}</span>
                  </span>
                  {activeTabs.some((tabId) => tabId === el.id) ? (
                    <FaCaretDown />
                  ) : (
                    <FaCaretRight />
                  )}
                </div>
                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div className="ml-6">
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl",
                            isActive && "bg-white text-main-700"
                          )
                        }
                        to={sub.path}
                      >
                        <span className="select-none">{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </Fragment>
        ))}
        <Link
          className={clsx(
            "flex items-center gap-4 px-4 py-3 hover:bg-white hover:text-main-700 rounded-2xl"
          )}
          to={"/"}
        >
          <span>
            <TiArrowForwardOutline size={25} />
          </span>
          <span className="select-none">Quay lại Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;

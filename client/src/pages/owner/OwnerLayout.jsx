import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Login, OwnerSideBar } from "~/components";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";

const OwnerLayout = () => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!current || !current.userRoles.some((el) => el.roleCode === "ROL3")) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "Bạn chưa đăng nhập!",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Về Trang chủ",
        confirmButtonText: "Đi đến Đăng nhập",
      }).then((response) => {
        if (response.isConfirmed) setModal(true, <Login />);
        if (response.isDismissed) navigate("/");
      });
    }
  }, [current]);

  return (
    <>
      {current?.userRoles?.some((el) => el.roleCode === "ROL7") && (
        <div className="w-full grid grid-cols-11 min-h-screen max-h-screen overflow-auto">
          <div className="col-span-2">
            <OwnerSideBar />
          </div>
          <div className="col-span-9">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerLayout;

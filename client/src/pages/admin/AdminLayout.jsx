import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AdminSidebar } from "~/components";
import { useUserStore } from "~/store/useUserStore";

const AdminLayout = () => {
  const { current } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!current || !current.userRoles.some((el) => el.roleCode === "ROL1")) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "Bạn không có quyền truy cập trang này!",
        showConfirmButton: true,
        confirmButtonText: "Về Trang chủ",
      }).then((response) => {
        if (response.isConfirmed) navigate("/");
        if (response.isDismissed) navigate("/");
      });
    }
  }, [current]);

  return (
    <>
      {current?.userRoles?.some((el) => el.roleCode === "ROL7") && (
        <main className="w-full grid grid-cols-12 min-h-screen max-h-screen overflow-auto">
          <div className="col-span-2">
            <AdminSidebar />
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};

export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "~/components";

const AdminLayout = () => {
  return (
    <main className="w-full grid grid-cols-12 min-h-screen max-h-screen overflow-auto">
      <div className="col-span-2">
        <AdminSidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;

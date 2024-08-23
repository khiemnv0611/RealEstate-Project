import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Home,
  OurAgents,
  Properties,
  PublicLayout,
  Search,
} from "./pages/public";
import path from "./utils/path";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import {
  AdminLayout,
  CreatePropertyType,
  Dashboard,
  ManagePropertyType,
} from "./pages/admin";
import { Personal, UserLayout } from "./pages/user";
import { usePropertiesStore } from "./store/usePropertiesStore";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, getRoles, token } = useUserStore();
  const { getPropertyTypes } = usePropertiesStore();
  useEffect(() => {
    getCurrent();
    getRoles();
    getPropertyTypes({ fields: "id,name,image" });
  }, [token]);
  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
          <Route path={path.SEARCH} element={<Search />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
        </Route>

        {/* Admin routes */}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route
            path={path.CREATE_PROPERTY_TYPE}
            element={<CreatePropertyType />}
          />
          <Route
            path={path.MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyType />}
          />
        </Route>

        {/* User routes */}
        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
};

export default App;

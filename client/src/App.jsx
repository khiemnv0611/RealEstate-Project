import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
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
      <Outlet />
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
        transition={Bounce}
      />
    </>
  );
};

export default App;

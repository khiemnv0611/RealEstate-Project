import React from "react";
import { useAppStore } from "~/store/useAppStore";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div
      onClick={() => setModal(false, null)}
      className="absolute z-[999] w-screen h-screen flex items-center justify-center bg-overlay-50"
    >
      {contentModal}
    </div>
  );
};

export default Modal;

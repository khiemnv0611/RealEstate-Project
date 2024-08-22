import React from "react";
import { useAppStore } from "~/store/useAppStore";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div
      onClick={() => setModal(false, null)}
      className="fixed z-[999] w-full h-full flex items-center justify-center bg-overlay-50"
    >
      {contentModal}
    </div>
  );
};

export default Modal;

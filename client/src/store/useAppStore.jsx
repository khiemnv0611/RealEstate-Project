import { create } from "zustand";

export const useAppStore = create((set) => ({
  isShowModal: false,
  contentModal: null,
  setModal: (isShowModal, contentModal) =>
    set(() => ({ isShowModal, contentModal })),
}));

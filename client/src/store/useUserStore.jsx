import { create } from "zustand";

export const useUserStore = create(() => ({
  token: null,
  current: null,
}));

import { create } from "zustand";
import { apiGetPropertyTypes } from "~/apis/propertyType";

export const usePropertiesStore = create((set) => ({
  propertyTypes: [],
  getPropertyTypes: async (params) => {
    const response = await apiGetPropertyTypes(params);
    if (response.success)
      return set(() => ({ propertyTypes: response.propertyTypes }));
    else return set(() => ({ propertyTypes: [] }));
  },
}));

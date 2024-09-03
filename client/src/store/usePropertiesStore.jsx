import { create } from "zustand";
import { apiGetPropertyTypes } from "~/apis/propertyType";

export const usePropertiesStore = create((set) => ({
  // Properties
  propertyTypes: [],

  // Methos

  getPropertyTypes: async (params) => {
    const response = await apiGetPropertyTypes(params);
    if (response.success)
      return set(() => ({ propertyTypes: response.propertyTypes }));
    else return set(() => ({ propertyTypes: [] }));
  },
}));

import axios from "~/axios";

export const apiCreatePropertyType = (data) =>
  axios({
    url: "/property-type/",
    method: "post",
    data,
  });

export const apiGetPropertyTypes = (params) =>
  axios({
    url: "/property-type/",
    method: "get",
    params,
  });

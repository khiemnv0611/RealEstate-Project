import axios from "~/axios";

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export const apiGetRoles = () =>
  axios({
    url: "/user/roles",
    method: "get",
  });
export const apiUpdateProfile = (data) =>
  axios({
    url: "/user/profile",
    method: "put",
    data,
  });

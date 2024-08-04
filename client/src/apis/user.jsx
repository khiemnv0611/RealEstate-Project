import axios from "~/axios";

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

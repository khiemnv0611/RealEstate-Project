import axios from "~/axios";

export const apiGetProperties = (params) =>
  axios({
    url: "/properties/",
    method: "get",
    params,
  });

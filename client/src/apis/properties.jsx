import axios from "~/axios";

export const apiGetProperties = (params) =>
  axios({
    url: "/properties/",
    method: "get",
    params,
  });

export const apiGetDetailProperty = (id) =>
  axios({
    url: "/properties/one/" + id,
    method: "get",
  });

export const apiCreateProperty = (data) =>
  axios({
    url: "/properties/",
    method: "post",
    data,
  });

export const apiGetPropertiesByOwner = () => 
  axios({
    url: "/properties/ownerproperties/",
    method: "get",
  });

export const apiDeleteProperty = (id) =>
  axios({
    url: "/properties/" + id,
    method: "delete",
  })
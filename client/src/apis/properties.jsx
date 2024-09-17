import axios from "~/axios";

export const apiGetProperties = (params) =>
  axios({
    url: "/properties/",
    method: "get",
    params,
  });

export const apiGetPropertiesCount = () =>
  axios({
    url: "/properties/count",
    method: "get",
  });

export const apiGetPropertiesWithoutPagination = (params) =>
  axios({
    url: "/properties/nopagination",
    method: "get",
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

export const apiGetComments = (id) =>
  axios({
    url: "/properties/comments/" + id,
    method: "get",
  });

export const apiUpdatePropertyStatus = (id, data) =>
  axios({
    url: "/properties/status/" + id,
    method: "put",
    data
  })

export const apiUpdatePropertiesStatus = (data) =>
  axios({
    url: "/properties/status/",
    method: "put",
    data
  })
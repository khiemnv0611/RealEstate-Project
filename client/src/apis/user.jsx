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

export const addPropertyToWishList = (id, data) =>
  axios({
    url: "/user/wish/" + id,
    method: "post",
    data
  })

export const isPropertyInWishList = (id) =>
  axios({
    url: "/user/wish/" + id,
    method: "get",
  })

export const getWishListByCurrentUser = () =>
  axios({
    url: "/user/wishlist",
    method: "get",
  })

export const apiComment = (id, data) =>
  axios({
    url: "/user/comment/" + id,
    method: "post",
    data
  })

export const apiReplyComment = (id, data) =>
  axios({
    url: "/user/comment/reply/" + id,
    method: "post",
    data
  })

export const apiGetNotifications = () =>
  axios({
    url: "/user/notifications",
    method: "get"
  })

export const apiUpdateNotificationStatus = (id, data) =>
  axios({
    url: "/user/notification/" + id,
    method: "put",
    data
  })
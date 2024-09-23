import axios from "~/axios";

export const apiGetPlans = () =>
    axios({
        url: "/membership/",
        method: "get",
    });

export const apiRegisterPlans = (id) =>
    axios({
        url: "/membership/register/" + id,
        method: "post",
    });
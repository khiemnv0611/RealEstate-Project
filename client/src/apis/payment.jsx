import axios from "~/axios";

export const createPayment = (amount, currency) =>
  axios({
    url: "/api/payment/create-payment",
    method: "post",
    data: {
      amount,
      currency,
    },
  });

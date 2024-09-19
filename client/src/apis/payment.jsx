import axios from "~/axios";

export const createPayment = (amount, currency, paymentMethodId) =>
  axios({
    url: "/payment/create-payment",
    method: "post",
    data: {
      amount,
      currency,
      paymentMethodId
    },
  });

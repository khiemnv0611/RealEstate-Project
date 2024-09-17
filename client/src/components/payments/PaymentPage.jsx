// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { createPayment } from "~/apis/payment";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const PaymentForm = () => {
//   const [amount, setAmount] = useState(5000);
//   const [currency, setCurrency] = useState("usd");
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     try {
//       // Gọi API backend để tạo paymentIntent
//       const { clientSecret } = await createPayment(amount, currency);
//       setClientSecret(clientSecret);

//       // Xử lý thanh toán với Stripe
//       if (!stripe || !elements) return;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("Payment failed", error);
//     }
//   };

//   return (
//     <form onSubmit={handlePayment}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// );

// export default PaymentPage;

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  const { amount, currency } = req.body;
  // Test
  // const amount = req.body.amount || 5000; // 50.00 USD trong đơn vị cent
  // const currency = req.body.currency || "usd";

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Số tiền thanh toán (tính bằng đơn vị nhỏ nhất của tiền tệ, ví dụ: cent)
      currency, // Đơn vị tiền tệ (ví dụ: "usd")
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Trả về client secret cho frontend để xử lý thanh toán
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

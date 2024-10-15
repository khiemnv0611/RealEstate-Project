const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const db = require("../models");

exports.createPayment = async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;
  const { uid } = req.user;

  try {
    // Validate Payment Method
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethodId,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Avoid redirect-based payment methods
      },
      confirm: true,
    });

    // Check Payment Intent Status
    if (paymentIntent.status === "requires_confirmation") {
      // Confirm the Payment Intent
      const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
        paymentIntent.id
      );

      if (
        confirmedPaymentIntent.status === "requires_action" ||
        confirmedPaymentIntent.status === "requires_source_action"
      ) {
        return res.status(200).json({
          requiresAction: true,
          paymentIntentId: confirmedPaymentIntent.id,
          clientSecret: confirmedPaymentIntent.client_secret,
        });
      } else if (confirmedPaymentIntent.status === "succeeded") {
        const user = await db.User.findByPk(uid);

        if (!user) {
          return res.status(404).json({
            success: false,
            mes: "Người dùng không tồn tại.",
          });
        }

        await db.sequelize.transaction(async (t) => {
          user.balance += parseFloat(amount);
          await user.save({ transaction: t });

          const transaction = await db.Transactions.create(
            {
              name: user.name,
              amount: amount,
              paymentMethod: "Stripe",
              transactionsType: "Nạp tiền",
              userId: user.id,
              membershipPlansId: null,
            },
            { transaction: t }
          );

          return res.status(200).json({
            success: true,
            mes: "Nạp tiền thành công!",
            balance: user.balance,
            transaction,
          });
        });
      } else if (confirmedPaymentIntent.status === "failed") {
        console.error("Payment Intent Failed:", confirmedPaymentIntent);
        return res.status(400).json({
          success: false,
          mes:
            "Thanh toán không thành công. Chi tiết: " +
            (confirmedPaymentIntent.charges.data[0]?.failure_message ||
              "Vui lòng kiểm tra thông tin."),
        });
      } else {
        return res.status(400).json({
          success: false,
          mes:
            "Trạng thái thanh toán không xác định: " +
            confirmedPaymentIntent.status,
        });
      }
    } else if (
      paymentIntent.status === "requires_action" ||
      paymentIntent.status === "requires_source_action"
    ) {
      return res.status(200).json({
        requiresAction: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === "succeeded") {
      const user = await db.User.findByPk(uid);
      if (!user) {
        return res.status(404).json({
          success: false,
          mes: "Người dùng không tồn tại.",
        });
      }

      await db.sequelize.transaction(async (t) => {
        user.balance += parseFloat(amount);
        await user.save({ transaction: t });

        const transaction = await db.Transactions.create(
          {
            name: user.name,
            amount: amount,
            paymentMethod: "Stripe",
            transactionsType: "Nạp tiền",
            userId: user.id,
            membershipPlansId: null,
          },
          { transaction: t }
        );

        return res.status(200).json({
          success: true,
          mes: "Nạp tiền thành công!",
          balance: user.balance,
          transaction,
        });
      });
    } else if (paymentIntent.status === "failed") {
      console.error("Payment Intent Failed:", paymentIntent);
      return res.status(400).json({
        success: false,
        mes:
          "Thanh toán không thành công. Chi tiết: " +
          (paymentIntent.charges.data[0]?.failure_message ||
            "Vui lòng kiểm tra thông tin."),
      });
    } else {
      return res.status(400).json({
        success: false,
        mes: "Trạng thái thanh toán không xác định: " + paymentIntent.status,
      });
    }
  } catch (error) {
    console.error("Error while creating payment:", error);
    return res.status(500).json({
      success: false,
      mes: "Lỗi khi xử lý thanh toán.",
      errorType: error.type || "Unknown",
      errorCode: error.code || "Unknown",
      errorParam: error.param || "Unknown",
      errorMessage: error.message || "No message provided.",
    });
  }
};

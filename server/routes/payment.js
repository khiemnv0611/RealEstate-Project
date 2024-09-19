const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/payment");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/create-payment", verifyToken, createPayment);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/payment");

router.post("/create-payment", createPayment);

module.exports = router;

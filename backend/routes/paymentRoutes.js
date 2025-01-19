const express = require("express");
const { uploadPaymentSlip } = require("../controllers/paymentController");
const router = express.Router();

router.post("/uploadPaymentSlip", uploadPaymentSlip);

module.exports = router;

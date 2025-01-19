const express = require("express");
const {
  createOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
  getPaymentSlips,
} = require("../controllers/orderController");
const authenticateToken = require("../utils/auth");

const router = express.Router();

// Create a new order (User)
router.post("/orders", authenticateToken, createOrder);

// Update an order within 10 minutes (User)
router.put("/orders/:id", authenticateToken, updateOrder);

// Get all orders (Admin)
router.get("/orders/", authenticateToken, getAllOrders);

// Delete an order (Admin)
router.delete("/orders/:id", authenticateToken, deleteOrder);

router.get("/payment-slips", getPaymentSlips);

module.exports = router;

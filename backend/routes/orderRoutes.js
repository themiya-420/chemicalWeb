const express = require("express");
const {
  createOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");
const authenticateToken = require("../utils/auth");

const router = express.Router();

// Create a new order (User)
router.post("/", authenticateToken, createOrder);

// Update an order within 10 minutes (User)
router.put("/:id", authenticateToken, updateOrder);

// Get all orders (Admin)
router.get("/", authenticateToken, getAllOrders);

// Delete an order (Admin)
router.delete("/:id", authenticateToken, deleteOrder);

module.exports = router;

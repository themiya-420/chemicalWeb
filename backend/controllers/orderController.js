const db = require("../utils/db");

// Create a new order
exports.createOrder = (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const sql = `INSERT INTO orders (user_id, product_id, quantity, created_at) VALUES (?, ?, ?, NOW())`;

  db.query(sql, [userId, productId, quantity], (err) => {
    if (err)
      return res.status(500).json({ message: "Failed to create order." });
    res.status(201).json({ message: "Order created successfully." });
  });
};

// Update an order within 10 minutes
exports.updateOrder = (req, res) => {
  const { quantity } = req.body;
  const orderId = req.params.id;
  const userId = req.user.id;

  const fetchOrderQuery = `SELECT * FROM orders WHERE id = ? AND user_id = ?`;
  db.query(fetchOrderQuery, [orderId, userId], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized." });
    }

    const order = results[0];
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const timeDiff = (now - createdAt) / 1000 / 60; // Time difference in minutes

    if (timeDiff > 10) {
      return res
        .status(403)
        .json({ message: "Order can only be updated within 10 minutes." });
    }

    const updateOrderQuery = `UPDATE orders SET quantity = ? WHERE id = ?`;
    db.query(updateOrderQuery, [quantity, orderId], (err) => {
      if (err)
        return res.status(500).json({ message: "Failed to update order." });
      res.status(200).json({ message: "Order updated successfully." });
    });
  });
};

// Get all orders (Admin only)
exports.getAllOrders = (req, res) => {
  const sql = `SELECT * FROM orders`;
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Failed to retrieve orders." });
    res.status(200).json(results);
  });
};

// Delete an order (Admin only)
exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;
  const sql = `DELETE FROM orders WHERE id = ?`;

  db.query(sql, [orderId], (err) => {
    if (err)
      return res.status(500).json({ message: "Failed to delete order." });
    res.status(200).json({ message: "Order deleted successfully." });
  });
};

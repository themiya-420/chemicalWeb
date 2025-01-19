const multer = require("multer");
const path = require("path");
const db = require("../utils/db");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payment_slips"); // Directory for payment slips
  },
  filename: (req, file, cb) => {
    const fileName = `order_${req.body.orderId}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Upload Payment Slip and Link to Order
exports.uploadPaymentSlip = [
  upload.single("paymentSlip"),
  (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    const paymentSlipPath = `/uploads/payment_slips/${req.file.filename}`;

    // Update the order with the payment slip path
    const sql = `UPDATE orders SET payment_slip = ? WHERE id = ?`;
    db.query(sql, [paymentSlipPath, orderId], (err) => {
      if (err) {
        console.error("Failed to update order with payment slip:", err);
        return res
          .status(500)
          .json({ message: "Failed to upload payment slip." });
      }
      res.status(201).json({
        message: "Payment slip uploaded and linked to order successfully.",
        filePath: paymentSlipPath,
      });
    });
  },
];

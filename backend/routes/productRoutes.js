const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const authenticateToken = require("../utils/auth");
const router = express.Router();

router.post("/", authenticateToken, createProduct);
router.get("/", authenticateToken, getAllProducts);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;

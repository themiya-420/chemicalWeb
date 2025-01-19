const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const authenticateToken = require("../utils/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authenticateToken, getUsers); // Get all users
router.post("/", authenticateToken, createUser); // Add a new user
router.put("/:id", authenticateToken, updateUser); // Update user by ID
router.delete("/:id", authenticateToken, deleteUser); // Delete user by ID

module.exports = router;

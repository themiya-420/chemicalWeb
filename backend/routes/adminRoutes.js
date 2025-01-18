
const express = require('express');
const {
    createUser,
    updateUser,
    deleteUser,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/adminController');
const authenticateToken = require('../utils/auth');
const router = express.Router();

router.post('/users', authenticateToken, createUser);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

router.post('/categories', authenticateToken, createCategory);
router.put('/categories/:id', authenticateToken, updateCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

module.exports = router;

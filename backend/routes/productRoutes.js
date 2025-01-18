
const express = require('express');
const {
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../utils/auth');
const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;


const db = require('../utils/db');

exports.createProduct = (req, res) => {
    const { name, description, price, categoryId, images } = req.body;
    const sql = 'INSERT INTO products (name, description, price, category_id, images) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, categoryId, JSON.stringify(images)], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to create product.' });
        res.status(201).json({ message: 'Product created successfully.' });
    });
};

exports.updateProduct = (req, res) => {
    const { name, description, price, categoryId, images } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, images = ? WHERE id = ?';
    db.query(sql, [name, description, price, categoryId, JSON.stringify(images), req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to update product.' });
        res.status(200).json({ message: 'Product updated successfully.' });
    });
};

exports.deleteProduct = (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to delete product.' });
        res.status(200).json({ message: 'Product deleted successfully.' });
    });
};

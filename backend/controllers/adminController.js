
const db = require('../utils/db');

exports.createUser = (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, role], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to create user.' });
        res.status(201).json({ message: 'User created successfully.' });
    });
};

exports.updateUser = (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
    db.query(sql, [username, hashedPassword, role, req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to update user.' });
        res.status(200).json({ message: 'User updated successfully.' });
    });
};

exports.deleteUser = (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to delete user.' });
        res.status(200).json({ message: 'User deleted successfully.' });
    });
};

exports.createCategory = (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    db.query(sql, [name], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to create category.' });
        res.status(201).json({ message: 'Category created successfully.' });
    });
};

exports.updateCategory = (req, res) => {
    const { name } = req.body;
    const sql = 'UPDATE categories SET name = ? WHERE id = ?';
    db.query(sql, [name, req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to update category.' });
        res.status(200).json({ message: 'Category updated successfully.' });
    });
};

exports.deleteCategory = (req, res) => {
    const sql = 'DELETE FROM categories WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to delete category.' });
        res.status(200).json({ message: 'Category deleted successfully.' });
    });
};

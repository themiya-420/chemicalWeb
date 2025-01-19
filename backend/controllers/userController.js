const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");

const SECRET_KEY = "somethingSecret";

exports.registerUser = async (req, res) => {
  const { username, email, address, phone, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (username, email, address, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [username, email, address, phone, hashedPassword, role],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: err, message: "User registration failed." });
      res.status(201).json({
        data: username,
        role,
        message: "User registered successfully.",
      });
    }
  );
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials." });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ data: user, token });
  });
};

// Get all users
exports.getUsers = (req, res) => {
  const sql = "SELECT id, username, email, phone, address, role FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch users." });
    res.status(200).json(results);
  });
};

// Create a new user
exports.createUser = (req, res) => {
  const { username, email, phone, address, role, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users (username, email, phone, address, role, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [username, email, phone, address, role, hashedPassword],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Failed to create user." });
      res.status(201).json({ message: "User created successfully." });
    }
  );
};

// Update a user
exports.updateUser = (req, res) => {
  const { username, email, phone, address, role, password } = req.body;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;

  const sql = password
    ? "UPDATE users SET username = ?, email = ?, phone = ?, address = ?, role = ?, password = ? WHERE id = ?"
    : "UPDATE users SET username = ?, email = ?, phone = ?, address = ?, role = ? WHERE id = ?";
  const params = password
    ? [username, email, phone, address, role, hashedPassword, req.params.id]
    : [username, email, phone, address, role, req.params.id];

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ message: "Failed to update user." });
    res.status(200).json({ message: "User updated successfully." });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to delete user." });
    res.status(200).json({ message: "User deleted successfully." });
  });
};

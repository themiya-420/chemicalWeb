const db = require("../utils/db");
const multer = require("multer");
const path = require("path");

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  },
});

// Get All Products
exports.getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Failed to fetch products." });
    res.status(200).json(results);
  });
};

// Create Product with Image Upload
exports.createProduct = [
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, description, price, categoryId } = req.body;
    const image1 = req.files["image1"]
      ? `/uploads/${req.files["image1"][0].filename}`
      : null;
    const image2 = req.files["image2"]
      ? `/uploads/${req.files["image2"][0].filename}`
      : null;
    const image3 = req.files["image3"]
      ? `/uploads/${req.files["image3"][0].filename}`
      : null;

    const sql =
      "INSERT INTO products (name, description, price, category_id, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [name, description, price, categoryId, image1, image2, image3],
      (err) => {
        if (err)
          return res.status(500).json({ message: "Failed to create product." });
        res.status(201).json({ message: "Product created successfully." });
      }
    );
  },
];

// Update Product with Image Upload
exports.updateProduct = [
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, description, price, categoryId } = req.body;
    const image1 = req.files["image1"]
      ? `/uploads/${req.files["image1"][0].filename}`
      : null;
    const image2 = req.files["image2"]
      ? `/uploads/${req.files["image2"][0].filename}`
      : null;
    const image3 = req.files["image3"]
      ? `/uploads/${req.files["image3"][0].filename}`
      : null;

    const sql =
      "UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image1 = COALESCE(?, image1), image2 = COALESCE(?, image2), image3 = COALESCE(?, image3) WHERE id = ?";
    db.query(
      sql,
      [
        name,
        description,
        price,
        categoryId,
        image1,
        image2,
        image3,
        req.params.id,
      ],
      (err) => {
        if (err)
          return res.status(500).json({ message: "Failed to update product." });
        res.status(200).json({ message: "Product updated successfully." });
      }
    );
  },
];

// Delete Product
exports.deleteProduct = (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err)
      return res.status(500).json({ message: "Failed to delete product." });
    res.status(200).json({ message: "Product deleted successfully." });
  });
};

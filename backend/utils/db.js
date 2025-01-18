const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "online_store",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");

  // Create database and tables if they don't exist
  const createDatabase = `CREATE DATABASE IF NOT EXISTS online_store`;
  db.query(createDatabase, (err) => {
    if (err) throw err;
    console.log("Database ensured.");

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(15),
        address TEXT,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL
      )`;

    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )`;

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id INT NOT NULL,
        image1 VARCHAR(255),
        image2 VARCHAR(255),
        image3 VARCHAR(255),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )`;

    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )`;

    const createOrderDetailsTable = `
      CREATE TABLE IF NOT EXISTS order_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )`;

    const createAdminLogsTable = `
      CREATE TABLE IF NOT EXISTS admin_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (admin_id) REFERENCES users(id)
      )`;

    db.query(createUsersTable, (err) => {
      if (err) throw err;
      console.log("Users table ensured.");
    });

    db.query(createCategoriesTable, (err) => {
      if (err) throw err;
      console.log("Categories table ensured.");
    });

    db.query(createProductsTable, (err) => {
      if (err) throw err;
      console.log("Products table ensured.");
    });

    db.query(createOrdersTable, (err) => {
      if (err) throw err;
      console.log("Orders table ensured.");
    });

    db.query(createOrderDetailsTable, (err) => {
      if (err) throw err;
      console.log("Order Details table ensured.");
    });

    db.query(createAdminLogsTable, (err) => {
      if (err) throw err;
      console.log("Admin Logs table ensured.");
    });
  });
});

module.exports = db;

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const db = require("./utils/db");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/", orderRoutes);
app.use("/api", paymentRoutes);

app.use("/uploads", express.static("uploads"));

// Server start
const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

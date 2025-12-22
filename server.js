require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Import routes
const dashboardRoutes = require("./routes/dashboardRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


// Database connect
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Test route
app.use("/", dashboardRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/ledger", ledgerRoutes);
app.use("/payments", paymentRoutes);


// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

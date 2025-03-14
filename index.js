require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require('./routes/orderRoutes.js')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

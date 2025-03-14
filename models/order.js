const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    sellerId: String,
    customerName: String,
    items: [{ productId: String, quantity: Number }],
    totalAmount: Number,
    status: { type: String, enum: ["New", "Ongoing", "Completed", "Canceled"], default: "New" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
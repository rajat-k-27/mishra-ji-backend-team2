const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop", // Refers to the Shop model
    required: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  shopLocation: {
    type: String, // Location of the shop (optional, since Shop has location)
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures the price can't be negative
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

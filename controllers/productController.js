const Product = require("../models/product.js");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

// Add product function with Cloudinary Image Upload
exports.addProduct = async (req, res) => {
  try {
    const { shopId, productName, category, shopLocation, price } = req.body;

    if (!shopId || !productName || !category || !price || !shopLocation) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Convert buffer to base64 for Cloudinary upload
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload Image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "products", // Cloudinary folder name
    });

    if(!result) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    // shopId = new mongoose.Types.ObjectId(shopId);


    // Create new product with Cloudinary image URL
    const product = new Product({
      shopId,
      productName,
      category,
      image: result.secure_url, // Store Cloudinary image URL
      shopLocation,
      price,
    });

    // Save product to database
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

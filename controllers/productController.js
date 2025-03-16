import Product from "../models/product.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Add product function with Cloudinary Image Upload
export const addProduct = async (req, res) => {
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

    if (!result || !result.secure_url) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

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
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all products with filtering, sorting, and searching
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, shopId, sortBy, order, q } = req.query;
    
    let query = {};

    // Apply filters only if provided
    if (category) query.category = category;
    if (shopId) query.shopId = shopId; // Filter by shopId
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Search products by name
    if (q) {
      query.productName = { $regex: q, $options: "i" }; // Case-insensitive search
    }

    // Sorting logic
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    // Fetch products with filters and sorting
    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ success: false, message: "Error fetching category products", error: error.message });
  }
};

// Search products by name
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const products = await Product.find({
      productName: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Error searching products", error: error.message });
  }
};

export default { addProduct, getProducts, getProductsByCategory, searchProducts };

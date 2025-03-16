import express from "express";
import { addProduct, getProducts, getProductsByCategory, searchProducts } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Add a new product
router.post("/add", upload.single("image"), addProduct);

// Get all products
router.get("/", getProducts);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Search products
router.get("/search", searchProducts);

export default router;

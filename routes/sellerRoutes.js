import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { saveSellerDetails, getAllShops, getShopDetails } from "../controllers/sellerController.js";
import { storage } from "../utils/cloudinaryConfig.js";

const upload = multer({ storage }); // Use Cloudinary storage

const router = express.Router();

// Update seller (shop) details
router.put("/update", authMiddleware, upload.single("shopPhoto"), saveSellerDetails);

// Get all shops
router.get("/", getAllShops);

// Get shop details along with products
router.get("/:id", getShopDetails);

export default router;

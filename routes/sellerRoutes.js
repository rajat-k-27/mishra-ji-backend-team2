import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { saveSellerDetails } from "../controllers/sellerController.js";
import { storage } from "../utils/cloudinaryConfig.js";

const upload = multer({ storage }); // Use Cloudinary storage

const router = express.Router();

router.put("/update", authMiddleware, upload.single("shopPhoto"), saveSellerDetails);

export default router;

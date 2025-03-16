import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.get("/", getWishlist);

export default router; 

import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";

//  Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;  //  Extract from authenticated request
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    let wishlist = await Wishlist.findOne({ uid: userId }); //  Using `uid` instead of `userId`

    if (!wishlist) {
      wishlist = new Wishlist({ uid: userId, products: [] });
    }

    if (!wishlist.products.some(id => id.equals(productObjectId))) {
      wishlist.products.push(productObjectId);
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// ✅ Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;  //  Extract from authenticated request
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    let wishlist = await Wishlist.findOne({ uid: userId }); //  Using `uid`

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(id => !id.equals(productObjectId));
    await wishlist.save();

    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};

//  Get Wishlist (Authenticated)
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;  //  Extract from authenticated request

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const wishlist = await Wishlist.findOne({ uid: userId }).populate("products"); //  Using `uid`

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ wishlist: wishlist.products });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};

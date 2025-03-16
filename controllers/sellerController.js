import Seller from "../models/Seller.js";
import Product from "../models/product.js";

// Save or Update Seller (Shop) Details
export const saveSellerDetails = async (req, res) => {
  try {
    const { userId, deliveryOption, operatingHours, productType, status, inventoryManagement } = req.body;

    let shopPhotoUrl = req.file ? req.file.path : null; // Get Cloudinary URL

    let seller = await Seller.findOne({ userId });
    if (!seller) {
      seller = new Seller({ userId, deliveryOption, operatingHours, productType, status, inventoryManagement, shopPhoto: shopPhotoUrl });
    } else {
      Object.assign(seller, { deliveryOption, operatingHours, productType, status, inventoryManagement });
      if (shopPhotoUrl) seller.shopPhoto = shopPhotoUrl;
    }

    await seller.save();
    res.status(200).json({ message: "Seller details updated successfully", seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Shops (Sellers)
export const getAllShops = async (req, res) => {
  try {
    const shops = await Seller.find(); // Seller represents the shop itself
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error });
  }
};

// Get Shop (Seller) Details Along with Products
export const getShopDetails = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.params.id }).populate({
      path: "userId",
      populate: { path: "products" }, // Ensure products inside the shop are populated
    });

    if (!seller) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Send shop (seller) details
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shop details", error });
  }
};

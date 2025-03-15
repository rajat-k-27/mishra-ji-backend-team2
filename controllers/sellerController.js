import Seller from "../models/Seller.js";

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

import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "SellerAuth", required: true, unique: true },
  deliveryOption: { type: Boolean },
  operatingHours: { type: String },
  productType: { type: String },
  status: { type: String, enum: ["approved", "rejected", "pending"], default: "pending" },
  inventoryManagement: { type: String },
  shopPhoto: { type: String },
});

export default mongoose.model("Seller", SellerSchema);

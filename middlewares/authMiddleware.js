import jwt from "jsonwebtoken";
import SellerAuth from "../models/SellerAuth.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await SellerAuth.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;

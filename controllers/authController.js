import SellerAuth from "../models/SellerAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerSeller = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, businessName } = req.body;

    let user = await SellerAuth.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new SellerAuth({ fullName, email, password, phoneNumber, address, businessName });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SellerAuth.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

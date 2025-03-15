import express from "express";
import {addProduct} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/add",upload.single("image"), addProduct);

export default router;
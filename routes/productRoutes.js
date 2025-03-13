const express = require("express");
const productController = require("../controllers/productController.js");
const upload = require("../middlewares/multer.js");

const router = express.Router();

router.post("/add",upload.single("image"), productController.addProduct);

module.exports = router;
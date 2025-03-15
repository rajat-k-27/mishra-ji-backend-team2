import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shop_photos", // Change folder name as needed
    format: async (req, file) => "jpg", // Convert all images to JPG
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export { cloudinary, storage };

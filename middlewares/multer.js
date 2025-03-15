import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as a Buffer

const upload = multer({ storage });

export default upload;

const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory as a Buffer

const upload = multer({ storage });

module.exports = upload;

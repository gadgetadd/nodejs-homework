const multer = require('multer');
const path = require("path");

const tempDir = path.join(__dirname, '../', 'temp');

const supportedMimeTypes = ["image/gif", "image/jpeg", "image/png", "image/bmp", "image/tiff"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (!supportedMimeTypes.includes(file.mimetype)) {
        return cb(null, false);
    }
    cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
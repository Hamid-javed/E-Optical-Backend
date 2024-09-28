const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require("uuid");

// Cloudinary storage configuration (for images only)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        const filename = file.originalname.replace(/\.[^/.]+$/, ""); // Remove file extension for public_id
        const folder = 'post_media';  // Folder name in Cloudinary
        let format = 'auto'; // Default format to auto-detect image format

        if (file.mimetype.startsWith('image/')) {
            format = file.mimetype.split('/')[1];  // Set format based on the image MIME type
        }
        return {
            folder,
            format,
            public_id: `${filename}-${uniqueSuffix}` // Unique filename
        };
    }
});

// File type filter for multer (images only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|bmp|tiff/;  // Only image types allowed
    const mimetype = allowedTypes.test(file.mimetype);  // Validate MIME type

    if (mimetype) {
        cb(null, true);  // Accept file if it's an image
    } else {
        cb(new Error('Only image files are allowed!'), false);  // Reject file if it's not an image
    }
};

// Multer middleware for handling image uploads
// Change from single to multiple file uploads
exports.images = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: fileFilter  // Only accept images
}).array('images', 10); // Handle multiple file uploads (max 10 images)


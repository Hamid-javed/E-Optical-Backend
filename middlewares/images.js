const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require("uuid");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        const filename = file.originalname.replace(/\.[^/.]+$/, ""); 
        const folder = 'Optical_media'; 
        let format = 'auto'; 

        if (file.mimetype.startsWith('image/')) {
            format = file.mimetype.split('/')[1]; 
        }
        return {
            folder,
            format,
            public_id: `${filename}-${uniqueSuffix}` 
        };
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|bmp|tiff/;  
    const mimetype = allowedTypes.test(file.mimetype);  

    if (mimetype) {
        cb(null, true);  
    } else {
        cb(new Error('Only image files are allowed!'), false);  
    }
};

exports.images = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: fileFilter  // Only accept images
}).array('images', 10); // Handle multiple file uploads (max 10 images)


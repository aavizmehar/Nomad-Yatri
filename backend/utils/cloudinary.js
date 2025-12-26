const cloudinary = require("cloudinary").v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: "auto",
                folder: "nomadyatra" 
            },
            (error, result) => {
                if (error) {
                    console.error("❌ Cloudinary upload error:", error);
                    return reject(error);
                }
                console.log("✅ File uploaded to Cloudinary:", result.secure_url);
                resolve(result);
            }
        );
        
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

module.exports = uploadOnCloudinary;
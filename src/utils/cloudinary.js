const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: "dpgxmgl3d",
  api_key: "623249572435685",
  api_secret: "hkZUGMD7bKekKfCldylKrxqrKgs", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;

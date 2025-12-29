const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const AppError = require("../utils/AppError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/contacts");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/upload", upload.single("photo"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      return res.status(500).json({
        success: true,
        message: err,
      });
    }
    res.status(200).json({
      success: true,
      message: "uploaded",
      data: result,
    });
  });
});
module.exports = router;

exports.UploadContactPhoto = upload.single("photo");

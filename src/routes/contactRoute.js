const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/img/contacts" });
const {
  createContact,
  getAllContacts,
  getAsingleContact,
  updateContact,
  getAllContactsForAUser,
  UploadContactPhoto,
} = require("../controllers/contactController");
const { protect } = require("../controllers/authController");
router
  .route("/")
  .post(protect, UploadContactPhoto, createContact)
  .get(protect, getAllContactsForAUser);
router.get("/:id", getAsingleContact);
router.patch("/:id", updateContact);

module.exports = router;

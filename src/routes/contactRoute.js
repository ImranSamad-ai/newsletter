const express = require("express");
const router = express.Router();
const {
  createContact,

  getAsingleContact,
  updateContact,
  getAllContactsForAUser,
} = require("../controllers/contactController");
const { protect } = require("../controllers/authController");
router
  .route("/")
  .post(protect, createContact)
  .get(protect, getAllContactsForAUser);
router.get("/:id", getAsingleContact);
router.patch("/:id", updateContact);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  createReminder,
  getReminders,
} = require("../controllers/reminderController");

router.route("/").post(protect, createReminder).get(protect, getReminders);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  createReminder,
  getReminders,
  updateReminder,
} = require("../controllers/reminderController");

router.route("/").post(protect, createReminder).get(protect, getReminders);

router.patch("/:id", protect, updateReminder);

// router.patch("completed/:id", protect, done);
module.exports = router;

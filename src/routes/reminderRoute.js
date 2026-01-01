const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  createReminder,
  getReminders,
  done,
  editReminder,
} = require("../controllers/reminderController");

router
  .route("/")
  .post(protect, createReminder)
  .get(protect, getReminders)
  .patch(protect, editReminder);

router.patch("/completed", protect, done);
module.exports = router;

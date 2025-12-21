const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const { createReminder } = require("../controllers/reminderController");

router.route("/").post(protect, createReminder);

module.exports = router;

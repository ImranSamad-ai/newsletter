const express = require("express");
const router = express.Router();
const { createblog, getblogs } = require("../controllers/blogController");
const { protect } = require("../controllers/authController");

router.route("/").post(protect, createblog).get(protect, getblogs);

module.exports = router;

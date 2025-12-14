const express = require("express");
const { signUp, login, protect } = require("../controllers/authController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;

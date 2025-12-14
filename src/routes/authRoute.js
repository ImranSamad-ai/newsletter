const express = require("express");
const { signUp, login, protect } = require("../controllers/authController");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;

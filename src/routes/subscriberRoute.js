const express = require("express");
const router = express.Router();
const {
  createSubscriber,
  getSubscriber,
  deleteSubscriber,
} = require("../controllers/sunscriberController");

router
  .route("/")
  .post(createSubscriber)
  .get(getSubscriber)
  .delete(deleteSubscriber);

module.exports = router;

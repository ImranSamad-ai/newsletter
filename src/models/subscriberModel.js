const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
});

const subscriber = mongoose.model("subscriber", subscriberSchema);
module.exports = subscriber;

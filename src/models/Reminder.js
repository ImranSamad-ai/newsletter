const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

module.exports = mongoose.model("Reminder", reminderSchema);

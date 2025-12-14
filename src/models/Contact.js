const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    company: String,
    role: String,
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    notes: String,
    tags: [String],
    lastInteracted: Date,
  },
  { timestamps: true }
);

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;

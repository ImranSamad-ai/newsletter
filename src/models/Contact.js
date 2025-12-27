const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    company: String,
    role: String,

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    photo: {
      type: String,
    },

    notes: [String],
    priority: String,
    lastInteracted: [Date],
  },
  { timestamps: true }
);

//
// ✅ Compound unique index (email per user)
//
contactSchema.index({ user: 1, email: 1 }, { unique: true });

//
// ✅ Optional phone, unique per user ONLY if present
//
contactSchema.index(
  { user: 1, phone: 1 },
  {
    unique: true,
    partialFilterExpression: { phone: { $exists: true, $ne: null } },
  }
);

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;

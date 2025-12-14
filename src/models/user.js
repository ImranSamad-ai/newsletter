const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "You need to provide a password"],
  },

  roles: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password === (await bcrypt.hash(this.password, 12));
    }
    next();
  } catch (error) {
    console.log(error);
  }
});
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// "name": "imran",
// "email": "mrn@gmail.com",
// "password": "dyor"

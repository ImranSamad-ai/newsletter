const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("now connected to the server");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://wdbUser:SVvNP.wNiXk-rf2@cluster0.jikdcsc.mongodb.net/"
    );
    console.log("now connected to the server");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

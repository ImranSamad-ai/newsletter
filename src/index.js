require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const contactRoute = require("./routes/contactRoute");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const reminderRoute = require("./routes/reminderRoute");
const corsOptions = {
  origin: "*", //"http://localhost:5173", // <-- Add your frontend URL here
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/contact", contactRoute);
app.use("/reminder", reminderRoute);

app.all("/contact", (req, res, next) => {
  next(AppError(`cannot find the ${req.baseUrl} on the server.`, 404));
});
app.use(globalErrorHandler);
module.exports = app;

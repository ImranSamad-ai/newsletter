const express = require("express");
const cors = require("cors");
const app = express();
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const contactRoute = require("./routes/contactRoute");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");

app.use(
  cors({
    origin: "*", // or use "*" to allow all
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/contact", contactRoute);

app.all("/contact", (req, res, next) => {
  next(AppError(`cannot find the ${req.baseUrl} on the server.`, 404));
});
app.use(globalErrorHandler);
module.exports = app;

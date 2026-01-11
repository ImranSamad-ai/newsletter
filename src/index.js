require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
/////////////////////

const webpush = require("web-push");
const schedule = require("node-schedule");
const bodyParser = require("body-parser");

///////////////
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
app.use(bodyParser.json());
app.use(express.json());

// /////////////////////

// REPLACE THESE with the keys you generated
const publicVapidKey =
  "BOKn7rqp9YlAyqCCfJ4cagNlam2OucC27i2DzNj2ZPH8JuELQvC3siNX6us60L3vxQqTbgNAXoOC6taBG7wO7to";
const privateVapidKey = "t-tGHFaMbxSDbZOWnQmyDBHLPVI4s3yz6RmkWnJR3ys";

webpush.setVapidDetails(
  "mailto:imranabdussamad35@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// In a real app, store this subscription in a database!
let userSubscription = null;

// 1. Route for the frontend to send the "Subscription Object"
app.post("/subscribe", (req, res) => {
  userSubscription = req.body;
  res.status(201).json({});
});

// 2. Route to schedule a notification
app.post("/schedule-push", (req, res) => {
  const { time, message } = req.body; // 'time' should be a JS Date string

  if (!userSubscription) {
    return res.status(400).json({ error: "No user subscribed yet." });
  }

  console.log(`Notification scheduled for: ${time}`);

  // The Magic: This triggers the push at the exact 'time' selected
  schedule.scheduleJob(new Date(time), function () {
    const payload = JSON.stringify({ title: "Reminder", body: message });

    webpush
      .sendNotification(userSubscription, payload)
      .catch((err) => console.error("Push Error:", err));

    console.log("Push notification sent!");
  });

  res.json({ success: true, info: `Scheduled for ${time}` });
});

// ///////////////////////////

app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/contact", contactRoute);
app.use("/reminder", reminderRoute);

app.all("/contact", (req, res, next) => {
  next(AppError(`cannot find the ${req.baseUrl} on the server.`, 404));
});
app.use(globalErrorHandler);
module.exports = app;

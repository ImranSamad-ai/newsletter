const express = require("express");
const webpush = require("web-push");
const schedule = require("node-schedule");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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

app.post(
  async function scheduleMyNotification() {
    const selectedTime = document.getElementById("timePicker").value; // e.g., "2026-01-10T22:00:00"

    await fetch("/schedule-push", {
      method: "POST",
      body: JSON.stringify({
        time: selectedTime,
        message: "It's time for your task!",
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Notification Scheduled!");
  },
  (req, res) => {
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
  }
);

app.listen(3000, () => console.log("Server started on port 3000"));

const scheduleReminder = (req, res) => {
  async function scheduleMyNotification() {
    const appointmentTime = req.body.appointmentTime;

    await fetch("/schedule-push", {
      method: "POST",
      body: JSON.stringify({
        time: appointmentTime,
        message: "It's time for your task!",
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Notification Scheduled!");
  }
};

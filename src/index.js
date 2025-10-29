const express = require("express");
const cors = require("cors");
const app = express();
const subscriberRoute = require("./routes/subscriberRoute");

app.use(
  cors({
    origin: "http://localhost:5173", // or use "*" to allow all
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/subc", subscriberRoute);

module.exports = app;

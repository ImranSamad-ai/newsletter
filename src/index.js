const express = require("express");
const app = express();
const subscriberRoute = require("./routes/subscriberRoute");

app.use(express.json());
app.use("/subc", subscriberRoute);

module.exports = app;

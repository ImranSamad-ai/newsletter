const reminderModel = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  const newReminder = reminderModel.create(req.body);
  res.send(newReminder);
};

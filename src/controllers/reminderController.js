const reminderModel = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  const { priority, completed, remindAt, message, title } = await req.body;

  const newReminder = reminderModel.create({
    priority,
    completed,
    remindAt,
    message,
    title,
  });

  res.send(newReminder);
};

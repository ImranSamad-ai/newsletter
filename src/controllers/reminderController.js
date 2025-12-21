const reminderModel = require("../models/Reminder");
const userModel = require("../models/user");

exports.createReminder = async (req, res) => {
  try {
    const newReminder = await reminderModel.create({
      priority: req.body.priority,
      remindAt: req.body.remindAt,
      message: req.body.message,
      title: req.body.title,
      channel: req.body.channel,
      contact: req.body.contact,
      user: req.body.user,
    });

    res.status(200).json({ data: newReminder, message: "successful" });
  } catch (error) {
    res.status(401).json({ data: error, message: "failed" });
  }
};

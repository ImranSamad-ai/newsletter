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

exports.getReminders = async (req, res) => {
  try {
    const user = req.user._id;
    const reminders = await reminderModel.find({ user });

    res.status(200).json({
      reminders,
      message: "Contact reminder",
    });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};
exports.editReminder = async (req, res) => {
  try {
    const user = req.user._id;

    const reminders = await reminderModel.findByIdAndUpdate(
      user,
      {
        priority: req.body.priority,
        remindAt: req.body.remindAt,
        message: req.body.message,
        title: req.body.title,
        channel: req.body.channel,
        contact: req.body.contact,
      },
      { new: true }
    );

    res.status(200).json({
      reminders,
      message: "Contact reminder",
    });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};
exports.done = async (req, res) => {
  try {
    const user = req.body._id;

    const reminders = await reminderModel.findByIdAndUpdate(
      user,
      { completed: req.body.completed },
      { new: true }
    );

    res.status(200).json({
      reminders,
      message: "Contact reminder",
    });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};
